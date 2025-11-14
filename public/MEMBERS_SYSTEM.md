# 🔐 Système de Membres Youth Green Tech

## Vue d'ensemble

Système d'authentification **100% frontend** sécurisé avec localStorage, tokens de session et chiffrement des mots de passe.

---

## 🚀 Démarrage Rapide

### Inscription
1. Aller à `/register.html`
2. Remplir les informations (email, mot de passe, nom)
3. Le mot de passe est **hashé avec bcrypt.js** avant stockage
4. Redirection automatique vers la connexion

### Connexion
1. Aller à `/login.html`
2. Entrer email + mot de passe
3. **Compte de test** disponible (voir ci-dessous)
4. Token de session créé pour 30 minutes

### Compte de Test
- **Email:** `demo@example.com`
- **Mot de passe:** `DemoPass123`
- Créé automatiquement à la première visite

---

## 🔒 Sécurité

### Hashage des Mots de Passe
```javascript
// Inscription
const hashedPassword = await bcrypt.hash(password, 10);

// Connexion
const match = await bcrypt.compare(password, storedHash);
```
- ✅ Utilise **bcrypt.js** (CDN)
- ✅ Salt factor: 10 (très sécurisé)
- ✅ Les mots de passe ne sont jamais stockés en clair

### Tokens de Session
```javascript
// Structure du token
{
  userId: 'user_1234567890_abc123',
  email: 'user@example.com',
  displayName: 'Jean Dupont',
  avatar: { initials: 'JD', color: '#27ae60' },
  token: 'AbCdEfGhIjKlMnOpQrStUvWxYz...', // 32 chars aléatoires
  loginTime: 1234567890000,
  expiresAt: 1234567890000 + (30 * 60 * 1000)
}
```

### Stockage Local
- **Clés localStorage:**
  - `youthGreenTech_users`: Tous les utilisateurs (hashs seulement)
  - `youthGreenTech_session`: Session actuelle (token)
  - `youthGreenTechSubmissions`: Formulaires de contact

- ✅ Données **locales uniquement** (pas de serveur)
- ✅ Pas de transmission réseau
- ✅ XSS protection avec `escapeHtml()`

### Expiration de Session
```javascript
// Auto-logout après 30 minutes d'inactivité
SESSION_TIMEOUT = 30 * 60 * 1000;

// L'inactivité est réinitialisée sur:
// - Mouvement de souris
// - Frappe clavier
// - Clic souris
```

---

## 📁 Fichiers

| Fichier | Description |
|---------|------------|
| `/js/members.js` | Classe `members` pour toute logique auth |
| `/register.html` | Page d'inscription |
| `/login.html` | Page de connexion |
| `/dashboard.html` | Tableau de bord membre |
| `/profile.html` | Gestion du profil |
| `/css/auth.css` | Styles auth + dashboard |
| `/css/dashboard.css` | Styles spécifiques dashboard |

---

## 🔑 API AuthManager

### Inscription
```javascript
const result = await auth.registerUser(
  email,
  password,
  displayName,
  interests // Array: ['innovation', ...]
);

// Résultat:
// {
//   success: true,
//   message: 'Inscription réussie!',
//   userId: 'user_...'
// }
```

### Connexion
```javascript
const result = await auth.loginUser(email, password);

// Résultat:
// {
//   success: true,
//   message: 'Connexion réussie!',
//   user: {
//     id: 'user_...',
//     email: 'user@example.com',
//     displayName: 'Jean',
//     avatar: { initials: 'J', color: '#27ae60' }
//   }
// }
```

### Récupérer Utilisateur Actuel
```javascript
const user = auth.getCurrentUser();
// {
//   id: 'user_...',
//   email: 'user@example.com',
//   passwordHash: '$2a$10$...',
//   displayName: 'Jean Dupont',
//   interests: ['innovation'],
//   createdAt: '2025-11-14T10:30:45.123Z',
//   lastLogin: '2025-11-14T10:30:45.123Z',
//   avatar: { initials: 'JD', color: '#27ae60' },
//   bio: '',
//   phone: '',
//   verified: false
// }
```

### Vérifier Authentification
```javascript
if (auth.isLoggedIn()) {
  // Utilisateur connecté
}

// Ou redirection automatique:
requireAuth(); // Redirige vers /login.html si non connecté
```

### Mettre à Jour le Profil
```javascript
const result = auth.updateUserProfile({
  displayName: 'Jean Martin',
  bio: 'Passionné par le tech vert',
  phone: '+33 6 12 34 56 78',
  interests: ['innovation', 'formation']
});
```

### Changer le Mot de Passe
```javascript
const result = await auth.changePassword(
  'ancienMotDePasse123',
  'NouveauMotDePasse456'
);
```

### Déconnexion
```javascript
auth.logout();
// Supprime la session et redirige vers login.html
```

---

## 🛡️ Validation

### Email
```javascript
const isValid = auth.validateEmail(email);
// Vérifie: format valid, ≤ 255 caractères
```

### Mot de Passe
```javascript
const isValid = auth.validatePassword(password);
// Exige:
// - ≥ 8 caractères
// - ≥ 1 majuscule
// - ≥ 1 minuscule
// - ≥ 1 chiffre
```

### Longueurs
| Champ | Min | Max |
|-------|-----|-----|
| Nom | 2 | 100 |
| Email | - | 255 |
| Mot de passe | 8 | - |
| Biographie | - | 500 |
| Téléphone | - | 20 |

---

## 🔄 Flux d'Authentification

### Inscription
```
1. Utilisateur remplit formulaire
2. Validation côté client
3. Email: check si déjà utilisé
4. Mot de passe: hashé avec bcrypt (salt 10)
5. Utilisateur créé et stocké dans localStorage
6. Redirection vers login
```

### Connexion
```
1. Utilisateur entre email + mot de passe
2. Email trouvé dans localStorage
3. Mot de passe comparé avec hash (bcrypt.compare)
4. Token généré (32 chars aléatoires)
5. Session créée et stockée (30 min expiry)
6. Redirection vers dashboard
7. Inactivité détectée → auto-logout
```

### Accès aux Pages Protégées
```
1. Dashboard/Profile demand le rendu
2. Fonction requireAuth() appelée
3. Vérifie session active + non expirée
4. Si OK: page affichée
5. Si KO: redirection vers login.html
```

---

## 💾 Structure localStorage

### Utilisateurs
```json
[
  {
    "id": "user_1234567890_abc123xyz",
    "email": "user@example.com",
    "passwordHash": "$2a$10$N9qo8uLOickgx2ZMRZoMye...",
    "displayName": "Jean Dupont",
    "interests": ["innovation", "formation"],
    "createdAt": "2025-11-14T10:30:45.123Z",
    "lastLogin": "2025-11-14T15:30:45.123Z",
    "avatar": {
      "initials": "JD",
      "color": "#27ae60"
    },
    "bio": "Passionné par la tech verte",
    "phone": "+33 6 12 34 56 78",
    "verified": false
  }
]
```

### Session Active
```json
{
  "userId": "user_1234567890_abc123xyz",
  "email": "user@example.com",
  "displayName": "Jean Dupont",
  "avatar": {
    "initials": "JD",
    "color": "#27ae60"
  },
  "token": "AbCdEfGhIjKlMnOpQrStUvWxYz1234567890",
  "loginTime": 1731590445123,
  "expiresAt": 1731592245123
}
```

---

## 🧪 Tests

### Créer un Compte de Test
```javascript
// En console sur /login.html ou /register.html
const testUser = {
  email: 'test@example.com',
  password: 'TestPass123',
  displayName: 'Test User',
  interests: ['innovation']
};

const result = await auth.registerUser(
  testUser.email,
  testUser.password,
  testUser.displayName,
  testUser.interests
);

console.log(result);
```

### Vérifier localStorage
```javascript
// Voir tous les utilisateurs
JSON.parse(localStorage.getItem('youthGreenTech_users'));

// Voir session actuelle
JSON.parse(localStorage.getItem('youthGreenTech_session'));

// Voir tous les contacts
JSON.parse(localStorage.getItem('youthGreenTechSubmissions'));
```

### Effacer les Données
```javascript
// Déconnexion seulement (garde les utilisateurs)
auth.logout();

// Effacer TOUT (attention: irréversible)
auth.secureClear();
localStorage.clear();
```

---

## ⚠️ Limitations

| Limitation | Raison | Solution |
|-----------|--------|----------|
| Pas de persistance multi-appareil | localStorage local seulement | Ajouter backend/cloud sync |
| Pas de récupération mot de passe | Frontend uniquement | Email verification nécessaire |
| Pas de 2FA | Frontend seulement | Ajouter authenticator app |
| Limite de données | localStorage ~5-10MB | Utiliser IndexedDB pour plus |
| Sessions perdues au clear cache | localStorage effacé | Sauvegarder régulièrement |

---

## 🔐 Recommandations Sécurité

✅ **À Faire:**
- ✅ Toujours valider côté client
- ✅ Utiliser HTTPS en production
- ✅ Nettoyer les données sensibles après logout
- ✅ Mettre à jour les tokens régulièrement
- ✅ Logger les tentatives de connexion suspectes

❌ **À Éviter:**
- ❌ Ne pas stocker les mots de passe en clair
- ❌ Ne pas faire confiance aux données du client uniquement
- ❌ Ne pas exposer les hashes de mots de passe
- ❌ Ne pas laisser les sessions actives indéfiniment

---

## 📊 Cas d'Usage

### Dashboard Personnel
```html
<!-- Accès réservé aux utilisateurs connectés -->
<!-- Affiche informations + statistiques personnelles -->
<!-- Permet gestion du profil et sécurité -->
```

### Formations Réservées
```html
<!-- Accès réservé: /courses.html -->
<!-- requireAuth() en début de page -->
<!-- Contenu personnalisé par utilisateur -->
```

### Événements Privés
```html
<!-- Inscription aux événements: /events.html -->
<!-- Seuls les membres peuvent voir/participer -->
<!-- Historique des événements passés -->
```

---

## 🚀 Prochaines Étapes

1. **Ajouter Backend (NodeJS/Firebase):**
   - Valider côté serveur
   - Persister en BD réelle
   - Ajouter email verification

2. **Améliorer Sécurité:**
   - HTTPS obligatoire
   - Content Security Policy
   - Rate limiting
   - CSRF tokens

3. **Ajouter Fonctionnalités:**
   - 2FA (TOTP)
   - OAuth (Google, GitHub)
   - Récupération de mot de passe
   - Sessions multi-appareil

4. **Analytics:**
   - Logs d'authentification
   - Détection d'anomalies
   - Alertes de sécurité

---

## 📞 Support

Pour des questions:
1. Consulter le code `members.js`
2. Vérifier localStorage en console
3. Lire les logs (F12 → Console)
4. Tester avec le compte de démo

---

**Système créé pour Youth Green Tech — 100% Sécurisé & Frontend**
