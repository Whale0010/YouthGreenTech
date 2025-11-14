# 🚀 Quick Start Guide - Pour les développeurs

## Installation & Setup

```bash
# Installation des dépendances
npm install

# Générer la clé NextAuth (Windows)
$secret = [System.Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes((Get-Random -Minimum 100000 -Maximum 999999).ToString()))
echo "NEXTAUTH_SECRET=$secret"

# Lancer le serveur de développement
npm run dev

# Ouvrir http://localhost:3001
# ⚡ Quickstart — Youth Green Tech

## 🚀 Lancer le Site en 30 Secondes

### Localement

```bash
cd public
python -m http.server 8000
```

Puis ouvrir: **http://localhost:8000**

---

## 🔐 Tester le Système de Membres

### Compte Démo

```
Email: demo@example.com
Mot de passe: DemoPass123
```

**Ou créer un nouveau compte:**

1. Aller à `/register.html`
2. Remplir le formulaire
3. Se connecter

---

## 📁 Structure du Projet

```
public/
├── index.html              ← Page d'accueil
├── register.html           ← Inscription
├── login.html              ← Connexion
├── dashboard.html          ← Dashboard (protégé)
├── profile.html            ← Profil (protégé)
├── MEMBERS_SYSTEM.md       ← Doc système auth
├── DEPLOYMENT.md           ← Guide déploiement
│
├── js/
│   └── members.js          ← Moteur auth
│
└── css/
    ├── style.min.css       ← Styles principaux
    ├── auth.css            ← Styles auth
    └── dashboard.css       ← Styles dashboard
```

---

## 📝 Fichiers Importants

| Fichier | Description |
|---------|------------|
| `README.md` | Documentation complète du projet |
| `DEPLOYMENT.md` | Guide pour déployer en production |
| `MEMBERS_SYSTEM.md` | Documentation système d'auth |
| `public/index.html` | Page d'accueil avec formulaire contact |
| `public/js/members.js` | Classe `members` pour auth |

---

## 🌐 Déployer sur GitHub Pages

### 1. Push vers GitHub

```bash
git add .
git commit -m "Version finale"
git push origin main
```

### 2. Activer GitHub Pages

1. GitHub → Settings → Pages
2. Branch: `main`
3. Folder: `/ (root)`
4. Save

### 3. Accéder au site

```
https://[username].github.io/mon-association
```

---

## 🔒 Sécurité

✅ **Mots de passe:** Hashés avec bcrypt
✅ **Sessions:** 30 min + tokens
✅ **XSS:** Protection HTML escaping
✅ **Données:** 100% localStorage (local uniquement)

---

## 📞 Documentation

- **README.md** — Vue d'ensemble complète
- **MEMBERS_SYSTEM.md** — Système d'authentification
- **DEPLOYMENT.md** — Guide de déploiement production

---

## 🐛 Déboguer

```javascript
// Console (F12)

// Voir les utilisateurs
JSON.parse(localStorage.getItem('youthGreenTech_users'))

// Voir session actuelle
JSON.parse(localStorage.getItem('youthGreenTech_session'))

// Voir contacts
JSON.parse(localStorage.getItem('youthGreenTechSubmissions'))

// Réinitialiser
localStorage.clear()
```

---

## ✨ Prochaines Étapes

1. ✅ Tester localement
2. ✅ Tester inscription/connexion
3. ✅ Tester profil
4. ⏳ Déployer sur GitHub Pages
5. ⏳ Ajouter domaine personnalisé

---

**Questions?** Consulter les fichiers `.md` ou vérifier localStorage en console.
