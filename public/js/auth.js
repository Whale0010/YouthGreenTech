/**
 * Youth Green Tech - Secure Frontend Auth System
 * 100% Client-Side, localStorage-based, Password Hashing with bcrypt.js
 */

// ===== SESSION & TOKEN MANAGEMENT =====

class AuthManager {
  constructor() {
    this.SESSION_KEY = 'youthGreenTech_session';
    this.USERS_KEY = 'youthGreenTech_users';
    this.SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes
    this.TOKEN_LENGTH = 32;
    
    this.initSessionCheck();
  }

  // ===== USER REGISTRATION =====
  async registerUser(email, password, displayName, interests = []) {
    try {
      // Validate inputs
      if (!this.validateEmail(email)) {
        throw new Error('Email invalide');
      }
      if (!this.validatePassword(password)) {
        throw new Error('Le mot de passe doit contenir au moins 8 caractères (majuscule, minuscule, chiffre)');
      }
      if (displayName.length < 2) {
        throw new Error('Le nom doit contenir au moins 2 caractères');
      }

      // Check if email already exists
      const users = this.getAllUsers();
      if (users.some(u => u.email === email)) {
        throw new Error('Cet email est déjà utilisé');
      }

      // Hash password using bcrypt (from CDN)
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user object
      const user = {
        id: this.generateUserId(),
        email: email,
        passwordHash: hashedPassword,
        displayName: displayName,
        interests: interests,
        createdAt: new Date().toISOString(),
        lastLogin: null,
        avatar: this.generateAvatar(displayName),
        bio: '',
        phone: '',
        verified: false, // Email verification flag
      };

      // Save user
      const users_list = this.getAllUsers();
      users_list.push(user);
      localStorage.setItem(this.USERS_KEY, JSON.stringify(users_list));

      // Log registration
      console.log('✅ Utilisateur inscrit:', email);

      return {
        success: true,
        message: 'Inscription réussie! Veuillez vous connecter.',
        userId: user.id,
      };
    } catch (error) {
      console.error('❌ Erreur inscription:', error.message);
      return {
        success: false,
        message: error.message,
      };
    }
  }

  // ===== USER LOGIN =====
  async loginUser(email, password) {
    try {
      if (!this.validateEmail(email)) {
        throw new Error('Email invalide');
      }

      const users = this.getAllUsers();
      const user = users.find(u => u.email === email);

      if (!user) {
        throw new Error('Email ou mot de passe incorrect');
      }

      // Verify password using bcrypt
      const passwordMatch = await bcrypt.compare(password, user.passwordHash);
      if (!passwordMatch) {
        throw new Error('Email ou mot de passe incorrect');
      }

      // Generate secure session token
      const token = this.generateToken();
      const sessionData = {
        userId: user.id,
        email: user.email,
        displayName: user.displayName,
        avatar: user.avatar,
        token: token,
        loginTime: new Date().getTime(),
        expiresAt: new Date().getTime() + this.SESSION_TIMEOUT,
      };

      // Store session
      localStorage.setItem(this.SESSION_KEY, JSON.stringify(sessionData));

      // Update user's last login
      user.lastLogin = new Date().toISOString();
      const updatedUsers = users.map(u => u.id === user.id ? user : u);
      localStorage.setItem(this.USERS_KEY, JSON.stringify(updatedUsers));

      console.log('✅ Connexion réussie:', email);

      return {
        success: true,
        message: 'Connexion réussie!',
        user: {
          id: user.id,
          email: user.email,
          displayName: user.displayName,
          avatar: user.avatar,
        },
      };
    } catch (error) {
      console.error('❌ Erreur connexion:', error.message);
      return {
        success: false,
        message: error.message,
      };
    }
  }

  // ===== GET CURRENT SESSION =====
  getCurrentSession() {
    const sessionStr = localStorage.getItem(this.SESSION_KEY);
    if (!sessionStr) return null;

    const session = JSON.parse(sessionStr);

    // Check if session expired
    if (new Date().getTime() > session.expiresAt) {
      console.warn('⏰ Session expirée');
      this.logout();
      return null;
    }

    return session;
  }

  // ===== CHECK IF USER LOGGED IN =====
  isLoggedIn() {
    return this.getCurrentSession() !== null;
  }

  // ===== GET CURRENT USER =====
  getCurrentUser() {
    const session = this.getCurrentSession();
    if (!session) return null;

    const users = this.getAllUsers();
    const user = users.find(u => u.id === session.userId);
    return user || null;
  }

  // ===== UPDATE USER PROFILE =====
  updateUserProfile(updates = {}) {
    try {
      const session = this.getCurrentSession();
      if (!session) {
        throw new Error('Vous devez être connecté');
      }

      const users = this.getAllUsers();
      const userIndex = users.findIndex(u => u.id === session.userId);
      if (userIndex === -1) {
        throw new Error('Utilisateur non trouvé');
      }

      // Only allow certain fields to be updated
      const allowedFields = ['displayName', 'bio', 'phone', 'interests'];
      allowedFields.forEach(field => {
        if (field in updates && updates[field] !== undefined) {
          users[userIndex][field] = updates[field];
        }
      });

      // Save updated users
      localStorage.setItem(this.USERS_KEY, JSON.stringify(users));

      // Update session with new display name if changed
      if (updates.displayName) {
        session.displayName = updates.displayName;
        localStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
      }

      console.log('✅ Profil mis à jour');
      return {
        success: true,
        message: 'Profil mis à jour avec succès',
        user: users[userIndex],
      };
    } catch (error) {
      console.error('❌ Erreur mise à jour:', error.message);
      return {
        success: false,
        message: error.message,
      };
    }
  }

  // ===== CHANGE PASSWORD =====
  async changePassword(currentPassword, newPassword) {
    try {
      const user = this.getCurrentUser();
      if (!user) {
        throw new Error('Vous devez être connecté');
      }

      if (!this.validatePassword(newPassword)) {
        throw new Error('Le mot de passe doit contenir au moins 8 caractères');
      }

      // Verify current password
      const passwordMatch = await bcrypt.compare(currentPassword, user.passwordHash);
      if (!passwordMatch) {
        throw new Error('Mot de passe actuel incorrect');
      }

      // Hash new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update user
      const users = this.getAllUsers();
      const userIndex = users.findIndex(u => u.id === user.id);
      users[userIndex].passwordHash = hashedPassword;
      localStorage.setItem(this.USERS_KEY, JSON.stringify(users));

      console.log('✅ Mot de passe changé');
      return {
        success: true,
        message: 'Mot de passe changé avec succès',
      };
    } catch (error) {
      console.error('❌ Erreur changement mot de passe:', error.message);
      return {
        success: false,
        message: error.message,
      };
    }
  }

  // ===== LOGOUT =====
  logout() {
    localStorage.removeItem(this.SESSION_KEY);
    console.log('✅ Déconnecté');
    return {
      success: true,
      message: 'Vous avez été déconnecté',
    };
  }

  // ===== AUTO LOGOUT AFTER INACTIVITY =====
  initSessionCheck() {
    setInterval(() => {
      const session = this.getCurrentSession();
      if (session && new Date().getTime() > session.expiresAt) {
        console.warn('⏰ Session expirée automatiquement');
        this.logout();
          window.location.href = 'login.html';
      }
    }, 60000); // Check every minute

    // Reset timeout on user activity
    document.addEventListener('mousemove', () => this.extendSession());
    document.addEventListener('keypress', () => this.extendSession());
    document.addEventListener('click', () => this.extendSession());
  }

  extendSession() {
    const session = this.getCurrentSession();
    if (session) {
      session.expiresAt = new Date().getTime() + this.SESSION_TIMEOUT;
      localStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
    }
  }

  // ===== HELPER FUNCTIONS =====

  validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email) && email.length <= 255;
  }

  validatePassword(password) {
    // At least 8 chars, 1 uppercase, 1 lowercase, 1 digit
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return re.test(password);
  }

  generateUserId() {
    return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  generateToken() {
    let token = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < this.TOKEN_LENGTH; i++) {
      token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return token;
  }

  generateAvatar(displayName) {
    // Generate a simple avatar with initials and color
    const initials = displayName
      .split(' ')
      .map(n => n.charAt(0).toUpperCase())
      .join('')
      .substr(0, 2);
    
    const colors = ['#27ae60', '#2980b9', '#e74c3c', '#f39c12', '#9b59b6'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    return {
      initials: initials,
      color: color,
    };
  }

  getAllUsers() {
    const usersStr = localStorage.getItem(this.USERS_KEY);
    return usersStr ? JSON.parse(usersStr) : [];
  }

  // ===== SECURITY: Clear sensitive data on logout =====
  secureClear() {
    localStorage.removeItem(this.SESSION_KEY);
    localStorage.removeItem(this.USERS_KEY);
    console.warn('🔐 Données sensibles effacées');
  }
}

// Initialize global auth manager
const auth = new AuthManager();

// Auto-redirect to login if not authenticated (for protected pages)
function requireAuth() {
  if (!auth.isLoggedIn()) {
    window.location.href = 'login.html';
  }
}

// XSS Protection: Escape HTML
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

// Format date helper
function formatDate(isoDate) {
  return new Date(isoDate).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
