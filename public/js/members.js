/*
  members.js
  Frontend-only member system (localStorage) for Youth Green Tech
  - bcryptjs expected to be loaded via CDN on pages
  - Exposes global `members` object with methods for registration/login/profile
  - STORAGE KEYS: youthGreenTech_users, youthGreenTech_session
  - Session timeout: 30 minutes (configurable)
*/

(function (window) {
  'use strict';

  const STORAGE_USERS = 'youthGreenTech_users';
  const STORAGE_SESSION = 'youthGreenTech_session';
  const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes
  const BCRYPT_SALT_ROUNDS = 10;

  // Simple XSS escape
  function escapeHtml(text) {
    if (!text && text !== 0) return '';
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Utility: load users array
  function loadUsers() {
    try {
      const raw = localStorage.getItem(STORAGE_USERS);
      if (!raw) return [];
      return JSON.parse(raw);
    } catch (e) {
      console.warn('Failed to parse users from localStorage', e);
      return [];
    }
  }

  function saveUsers(users) {
    localStorage.setItem(STORAGE_USERS, JSON.stringify(users || []));
  }

  function loadSession() {
    try {
      const raw = localStorage.getItem(STORAGE_SESSION);
      if (!raw) return null;
      const s = JSON.parse(raw);
      if (!s.expiresAt || Date.now() > s.expiresAt) {
        // session expired
        localStorage.removeItem(STORAGE_SESSION);
        return null;
      }
      return s;
    } catch (e) {
      console.warn('Failed to parse session', e);
      return null;
    }
  }

  function saveSession(session) {
    localStorage.setItem(STORAGE_SESSION, JSON.stringify(session));
  }

  function clearSession() {
    localStorage.removeItem(STORAGE_SESSION);
  }

  function generateUserId() {
    return 'user_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 8);
  }

  function generateToken() {
    // 32 chars secure-ish token
    const array = new Uint8Array(24);
    if (window.crypto && window.crypto.getRandomValues) {
      window.crypto.getRandomValues(array);
    } else {
      for (let i = 0; i < array.length; i++) array[i] = Math.floor(Math.random() * 256);
    }
    return Array.from(array, b => ('0' + b.toString(16)).slice(-2)).join('');
  }

  function generateAvatar(displayName) {
    const initials = (displayName || 'U').split(' ').slice(0,2).map(s => s.charAt(0).toUpperCase()).join('') || 'U';
    const colors = ['#27ae60','#2ecc71','#16a085','#1abc9c','#2c3e50'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    return { initials, color };
  }

  function validateEmail(email) {
    if (!email || typeof email !== 'string') return false;
    // simple RFC-ish check
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email) && email.length <= 255;
  }

  function validatePassword(password) {
    if (!password || typeof password !== 'string') return false;
    // Minimum 8 chars, at least 1 uppercase, 1 lowercase, 1 digit
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return re.test(password);
  }

  // Auto-extend session on activity
  function initActivityListeners() {
    let last = Date.now();
    const reset = () => {
      const s = loadSession();
      if (s) {
        s.expiresAt = Date.now() + SESSION_TIMEOUT;
        saveSession(s);
      }
      last = Date.now();
    };
    ['click','mousemove','keydown','scroll','touchstart'].forEach(evt => {
      window.addEventListener(evt, reset, { passive: true });
    });
  }

  // Public API
  const members = {
    USERS_KEY: STORAGE_USERS,
    SESSION_KEY: STORAGE_SESSION,
    SESSION_TIMEOUT,

    getAllUsers() {
      return loadUsers();
    },

    async registerUser(email, password, displayName, interests) {
      try {
        email = (email || '').toLowerCase().trim();
        displayName = (displayName || '').trim();
        interests = Array.isArray(interests) ? interests : (interests ? [interests] : []);

        if (!displayName || displayName.length < 2) {
          return { success: false, message: 'Le nom doit contenir au moins 2 caractères' };
        }

        if (!validateEmail(email)) {
          return { success: false, message: 'Email invalide' };
        }

        if (!validatePassword(password)) {
          return { success: false, message: 'Mot de passe faible (8+, majuscule, minuscule, chiffre)' };
        }

        const users = loadUsers();
        if (users.some(u => u.email === email)) {
          return { success: false, message: 'Un compte avec cet email existe déjà' };
        }

        if (!window.bcrypt || !window.bcrypt.hash) {
          console.error('bcrypt.js non chargé. Assurez-vous que le CDN est inclus sur la page.');
          return { success: false, message: 'Erreur interne (bcrypt manquant)' };
        }

        const hash = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);

        const user = {
          id: generateUserId(),
          email,
          passwordHash: hash,
          displayName: escapeHtml(displayName),
          interests: interests || [],
          createdAt: new Date().toISOString(),
          lastLogin: null,
          avatar: generateAvatar(displayName),
          bio: '',
          phone: '',
          verified: false
        };

        users.push(user);
        saveUsers(users);

        return { success: true, message: 'Inscription réussie' , userId: user.id };
      } catch (err) {
        console.error('registerUser error', err);
        return { success: false, message: 'Erreur lors de l\'inscription' };
      }
    },

    async loginUser(email, password) {
      try {
        email = (email || '').toLowerCase().trim();
        if (!validateEmail(email) || !password) {
          return { success: false, message: 'Email ou mot de passe invalide' };
        }

        const users = loadUsers();
        const user = users.find(u => u.email === email);
        if (!user) return { success: false, message: 'Identifiants incorrects' };

        if (!window.bcrypt || !window.bcrypt.compare) {
          console.error('bcrypt.js non chargé.');
          return { success: false, message: 'Erreur interne (bcrypt manquant)' };
        }

        const match = await bcrypt.compare(password, user.passwordHash);
        if (!match) return { success: false, message: 'Identifiants incorrects' };

        const token = generateToken();
        const session = {
          userId: user.id,
          email: user.email,
          displayName: user.displayName,
          avatar: user.avatar,
          token: token,
          loginTime: Date.now(),
          expiresAt: Date.now() + SESSION_TIMEOUT
        };

        // update lastLogin
        user.lastLogin = new Date().toISOString();
        saveUsers(users);

        saveSession(session);

        return { success: true, message: 'Connexion réussie', session };
      } catch (err) {
        console.error('loginUser error', err);
        return { success: false, message: 'Erreur lors de la connexion' };
      }
    },

    getCurrentSession() {
      return loadSession();
    },

    isLoggedIn() {
      return !!loadSession();
    },

    getCurrentUser() {
      const s = loadSession();
      if (!s) return null;
      const users = loadUsers();
      return users.find(u => u.id === s.userId) || null;
    },

    logout() {
      clearSession();
    },

    requireAuth(redirectTo = 'login.html') {
      if (!this.isLoggedIn()) {
        window.location.href = redirectTo;
        return false;
      }
      return true;
    },

    async updateUserProfile(updates) {
      try {
        const s = loadSession();
        if (!s) return { success: false, message: 'Non authentifié' };
        const users = loadUsers();
        const user = users.find(u => u.id === s.userId);
        if (!user) return { success: false, message: 'Utilisateur introuvable' };

        // Allowed updates: displayName, bio, phone, interests
        if (updates.displayName) user.displayName = escapeHtml(updates.displayName);
        if (updates.bio !== undefined) user.bio = escapeHtml(updates.bio);
        if (updates.phone !== undefined) user.phone = escapeHtml(updates.phone);
        if (Array.isArray(updates.interests)) user.interests = updates.interests;

        saveUsers(users);
        return { success: true, message: 'Profil mis à jour', user };
      } catch (err) {
        console.error('updateUserProfile error', err);
        return { success: false, message: 'Erreur lors de la mise à jour' };
      }
    },

    async changePassword(currentPassword, newPassword) {
      try {
        const s = loadSession();
        if (!s) return { success: false, message: 'Non authentifié' };
        if (!validatePassword(newPassword)) return { success: false, message: 'Nouveau mot de passe invalide' };

        const users = loadUsers();
        const user = users.find(u => u.id === s.userId);
        if (!user) return { success: false, message: 'Utilisateur introuvable' };

        const ok = await bcrypt.compare(currentPassword, user.passwordHash);
        if (!ok) return { success: false, message: 'Le mot de passe actuel est incorrect' };

        const newHash = await bcrypt.hash(newPassword, BCRYPT_SALT_ROUNDS);
        user.passwordHash = newHash;
        saveUsers(users);
        return { success: true, message: 'Mot de passe mis à jour' };
      } catch (err) {
        console.error('changePassword error', err);
        return { success: false, message: 'Erreur lors du changement de mot de passe' };
      }
    },

    generateUserId,
    generateToken,
    generateAvatar,
    validateEmail,
    validatePassword,

    // Utility to wipe all user data (dangerous)
    secureClear() {
      localStorage.removeItem(STORAGE_USERS);
      localStorage.removeItem(STORAGE_SESSION);
    }
  };

  // Initialize activity listeners to extend session
  initActivityListeners();

  // Expose global
  window.members = members;

  // Backwards compatibility alias `auth` if not present
  if (!window.auth) window.auth = members;

  // Provide a simple global `requireAuth` wrapper for pages that call it
  if (!window.requireAuth) {
    window.requireAuth = function(redirectTo) {
      return members.requireAuth(redirectTo);
    };
  }

  // Expose some small helpers used by pages (escapeHtml, formatDate)
  if (!window.escapeHtml) window.escapeHtml = escapeHtml;
  if (!window.formatDate) window.formatDate = function(isoDate) {
    try {
      return new Date(isoDate).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch (e) {
      return isoDate;
    }
  };

})(window);
