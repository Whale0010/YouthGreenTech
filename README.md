# 🌱 Youth Green Tech — Documentation Complète

## 📋 Table des Matières

1. [Vue d'ensemble](#vue-densemble)
2. [Architecture](#architecture)
3. [Installation](#installation)
4. [Utilisation](#utilisation)
5. [Système de Membres](#système-de-membres)
6. [Formulaire de Contact](#formulaire-de-contact)
7. [Déploiement](#déploiement)
8. [Sécurité](#sécurité)
9. [Troubleshooting](#troubleshooting)

---

## 👋 Vue d'ensemble

**Youth Green Tech** est un site web 100% statique pour une association jeunesse dédiée aux technologies vertes et l'innovation écologique.

### 🎯 Caractéristiques Principales

- ✅ **100% Gratuit** — Hébergé gratuitement sur GitHub Pages
- ✅ **Aucun Backend** — Site statique avec localStorage pour les données
- ✅ **Sécurisé** — Chiffrement bcrypt, protection XSS, tokens de session
- ✅ **Responsive** — Mobile-first, optimisé pour tous les appareils
- ✅ **Accessible** — WCAG 2.1, ARIA labels, keyboard navigation
- ✅ **SEO** — Meta tags, Open Graph, structured data
- ✅ **Rapide** — CSS minifié, assets optimisés
- ✅ **Offline-Ready** — Fonctionne sans internet après chargement

### 📊 Contenu

- **Page d'accueil** — Présentation association + activités
- **Espace Membre** — Dashboard personnel, profil, statistiques
- **Formulaire de Contact** — 100% local, stocké dans localStorage
- **Authentification** — Inscription, connexion, récupération profil

---

## 🏗️ Architecture

### Stack Technologique

```
Frontend:
├── HTML5 (Sémantique)
├── CSS3 (Minifié + Responsive)
├── JavaScript Vanilla (async/await)
├── bcrypt.js (CDN pour hashage)
└── localStorage (Base de données locale)

Hébergement:
├── GitHub Pages (Gratuit)
├── Custom Domain (optionnel)
└── HTTPS (automatique)
```

### Structure des Fichiers

```
public/
├── index.html                 # Page d'accueil
├── register.html              # Page d'inscription
├── login.html                 # Page de connexion
├── dashboard.html             # Tableau de bord membre
├── profile.html               # Gestion du profil
├── MEMBERS_SYSTEM.md          # Documentation système
│
├── js/
│   └── members.js             # Moteur d'authentification (frontend)
│
├── css/
│   ├── style.min.css          # Styles minifiés (main)
│   ├── auth.css               # Styles authentification
│   └── dashboard.css          # Styles dashboard
│
└── DEPLOYMENT.md              # Guide de déploiement
```

### Schéma de Données

```
LocalStorage:
├── youthGreenTech_users        → Array de tous les utilisateurs
│  └── { id, email, passwordHash, displayName, interests, avatar, ... }
│
├── youthGreenTech_session      → Session actuelle (1 utilisateur)
│  └── { userId, email, displayName, token, loginTime, expiresAt }
│
└── youthGreenTechSubmissions   → Formulaires de contact
   └── [{ name, email, subject, message, timestamp }, ...]
```

---

## 📦 Installation

### Prérequis
- Git installé
- Un compte GitHub
- Un navigateur moderne (Chrome, Firefox, Safari, Edge)

### Étapes

#### 1. Cloner le projet
```bash
git clone https://github.com/votre-username/mon-association.git
cd mon-association
```

#### 2. Lancer le serveur local
```bash
# Avec Python 3
python -m http.server 8000

# Ou avec Node.js (si installé)
npx http-server

# Ou avec Live Server (VS Code)
# Clic droit sur index.html → Open with Live Server
```

#### 3. Accéder au site
```
http://localhost:8000
```

#### 4. Tester le système de membres
- Aller à `/register.html` pour créer un compte
- Ou accéder à `/login.html` et utiliser:
  - Email: `demo@example.com`
  - Mot de passe: `DemoPass123`

---

## 🎯 Utilisation

### Page d'Accueil (`index.html`)

La page d'accueil contient:
- Hero section avec CTA
- Section mission + 3 piliers
- Grille d'activités (6 cartes)
- Section statistiques
- Formulaire de contact local
- Footer avec liens

**Formspree Ancien :** ❌ Remplacé par localStorage
**Contact Form:** 100% local, zéro serveur externe

### Authentification

#### Créer un Compte

```
1. Accédez à /register.html
2. Remplissez le formulaire:
   - Nom d'affichage (2-100 caractères)
   - Email (validation stricte)
   - Mot de passe (≥8 chars, 1 maj, 1 min, 1 chiffre)
   - Confirmez le mot de passe
   - Sélectionnez intérêts
   - Acceptez les conditions
3. Cliquez "S'inscrire"
4. Redirection automatique vers connexion
```

#### Se Connecter

```
1. Accédez à /login.html
2. Entrez email + mot de passe
3. Cochez "Se souvenir" (optionnel, 30 min session)
4. Cliquez "Connexion"
5. Redirection vers /dashboard.html
```

#### Accéder au Dashboard

```
1. Si connecté: /dashboard.html affiche:
   - Avatar personnalisé (initiales)
   - Bienvenue + dernier login
   - Statistiques (formations, objectifs, badges, réseau)
   - Infos membre + intérêts
   - Activités récentes
   - Info session + expiration
```

#### Gérer le Profil

```
1. Depuis dashboard: Cliquez "Profil"
2. Trois onglets:
   - 👤 Infos Personnelles: Nom, téléphone, bio
   - 💡 Intérêts: 6 domaines à cocher
   - 🔒 Sécurité: Changer MDP, gérer sessions, export données
```

#### Déconnexion

```
- Cliquez "Déconnexion" n'importe où
- Session effacée de localStorage
- Redirection vers /login.html
- Auto-logout après 30 min d'inactivité
```

### Formulaire de Contact

**Nouvelle Approche:** 100% localStorage (ancien: Formspree externe)

```
1. Remplissez le formulaire sur la page d'accueil
2. Les données sont validées côté client
3. Stockées dans localStorage (clé: youthGreenTechSubmissions)
4. Affichage succès après envoi
5. Admin peut exporter données en JSON via console
```

**Récupérer les Contacts (Console):**
```javascript
JSON.parse(localStorage.getItem('youthGreenTechSubmissions'))
```

---

## 🔐 Système de Membres

### Fonctionnalités

| Feature | Détails |
|---------|---------|
| **Inscription** | Email validation, strength indicator, conditions |
| **Connexion** | Bcrypt verify, session tokens, remember me |
| **Dashboard** | Stats, infos, activités, session countdown |
| **Profil** | Édition nom, bio, téléphone, intérêts |
| **Sécurité** | Changer MDP, logout sessions, supprimer compte |
| **Sessions** | 30 min timeout, extension sur activité |
| **Données** | Export JSON, delete avec confirmation |

### Comptes de Test

#### Compte Démo (Auto-créé)
```
Email: demo@example.com
Password: DemoPass123
```
Auto-généré à la première visite de `/login.html`

#### Créer Compte de Test
```
1. /register.html
2. Remplissez: test@example.com / TestPass123
3. Profil créé avec succès
```

### Validations

#### Email
- Format: RFC-5322 (ex: user@domain.co.uk)
- Max 255 caractères
- Pas de doublons

#### Mot de passe
- ≥ 8 caractères
- ≥ 1 majuscule
- ≥ 1 minuscule
- ≥ 1 chiffre
- Hashé avec bcrypt (cost 10)

#### Autres champs
- Nom: 2-100 caractères
- Bio: max 500 caractères
- Téléphone: max 20 caractères

### Sécurité

```javascript
// Hachage des mots de passe
const hash = await bcrypt.hash(password, 10);
const isValid = await bcrypt.compare(password, hash);

// Protection XSS
escapeHtml(userInput) // Échappe & < > " '

// Tokens de session
generateToken() // 32 caractères aléatoires

// Expiration session
30 minutes + extension sur activité
```

---

## 📩 Formulaire de Contact

### Avant (Ancien)
```
❌ Formspree (service externe)
❌ Dépendance externe
❌ Données quittent le navigateur
❌ Pas gratuit à long terme
```

### Après (Nouveau)
```
✅ 100% localStorage
✅ Zéro serveur externe
✅ Données restent locales
✅ Gratuit indéfiniment
✅ Peut être exporté
```

### Récupérer les Données

**En Console:**
```javascript
// Voir tous les contacts
const contacts = JSON.parse(localStorage.getItem('youthGreenTechSubmissions'));
console.table(contacts);

// Exporter en JSON
const json = JSON.stringify(contacts, null, 2);
console.log(json);

// Télécharger en fichier
const blob = new Blob([json], { type: 'application/json' });
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = `contacts_${new Date().toISOString()}.json`;
a.click();
```

### Limitation
- localStorage ~ 5-10 MB limite
- Supports ~1000 contacts (avant limite)
- Supprimés si cache du navigateur vidé

---

## 🚀 Déploiement

### GitHub Pages (Gratuit)

#### Étape 1: Préparer le repo
```bash
git status
git add .
git commit -m "Version finale - système de membres complet"
git push origin main
```

#### Étape 2: Activer GitHub Pages
1. Repo → Settings
2. Scroll "Pages"
3. Source: `main` branch, `/root` folder
4. Save
5. Attendre 1-2 min

#### Étape 3: Accéder au site
```
https://votre-username.github.io/mon-association
```

### Domaine Personnalisé (Optionnel)

#### 1. Acheter domaine
- GoDaddy, Namecheap, Google Domains, etc.
- Prix: ~10€/an

#### 2. Configurer DNS
Ajouter record CNAME:
```
Type: CNAME
Name: www
Value: votre-username.github.io
```

#### 3. Ajouter dans GitHub
1. Repo → Settings → Pages
2. Custom domain: `www.youthgreentech.fr`
3. Save
4. Cocher "Enforce HTTPS"

#### 4. Attendre propagation DNS
- Peut prendre 24-48h
- Tester avec: `nslookup www.youthgreentech.fr`

---

## 🔒 Sécurité

### Best Practices Implémentées

✅ **Authentification**
- Bcrypt password hashing (cost 10)
- Session tokens (32 chars random)
- Auto-logout (30 min inactivity)

✅ **Données**
- XSS protection (HTML escaping)
- Validation email + password
- No sensitive data in localStorage

✅ **Communication**
- HTTPS enforced (GitHub Pages)
- No external API calls (excepto CDN de confiance)
- localStorage isolated per domain

### Limitations & Risques

⚠️ **Client-Side Only**
- Pas de vraie sécurité backend
- User peut voir/modifier localStorage
- Pas de server-side validation

⚠️ **localStorage Limitations**
- Partagé avec JS malveillant
- Supprimé si cache vidé
- Limité à ~5-10MB

⚠️ **Plus Sécurisé**
- Ajouter backend (Node, Python, etc.)
- Ajouter HTTPS + CSP headers
- Ajouter rate limiting
- Ajouter 2FA

---

## ⚠️ Troubleshooting

### Problème: "Session expirée"
```
Solution:
1. Rafraîchir la page
2. Revenir à /login.html
3. Se reconnecter
4. Vérifier localStorage: console → localStorage
```

### Problème: Mot de passe rejeté
```
Exigences:
✓ ≥ 8 caractères
✓ ≥ 1 majuscule
✓ ≥ 1 minuscule
✓ ≥ 1 chiffre

Exemple valide: Password123
```

### Problème: Email déjà utilisé
```
Solution:
1. Utiliser autre email
2. Ou supprimer compte en /profile.html
3. Puis se réinscrire

Récupération "mot de passe oublié":
- Pas encore implémenté (frontend only)
- Supprimer le compte et se réinscrire
```

### Problème: localStorage vide
```
Raison possible:
- Cache navigateur vidé
- Private/Incognito mode
- localStorage désactivé

Solution:
- Vérifier: F12 → Application → localStorage
- Ou réactiver localStorage
- Ou désactiver private browsing
```

### Problème: Formulaire de contact ne s'envoie pas
```
Solutions:
1. Vérifier tous les champs remplis
2. Ouvrir console (F12) pour voir erreur
3. Vérifier localStorage: 
   JSON.parse(localStorage.getItem('youthGreenTechSubmissions'))
```

### Problème: Compte démo inexistant
```
Solution:
1. Aller à /login.html
2. Compte auto-créé au chargement
3. Si absent: console →
   JSON.parse(localStorage.getItem('youthGreenTech_users'))
```

---

## 📞 Support

Pour issues/questions:

1. **Consulter la doc:**
   - `/MEMBERS_SYSTEM.md` — Système d'auth détaillé
   - `/DEPLOYMENT.md` — Guide de déploiement

2. **Déboguer en console:**
   - Ouvrir F12 → Console
   - Copier/coller les commandes ci-dessous

3. **Commandes Utiles:**
```javascript
// Voir tous les utilisateurs
console.table(JSON.parse(localStorage.getItem('youthGreenTech_users')))

// Voir session actuelle
console.table(JSON.parse(localStorage.getItem('youthGreenTech_session')))

// Voir tous les contacts
console.table(JSON.parse(localStorage.getItem('youthGreenTechSubmissions')))

// Réinitialiser localStorage
localStorage.clear()

// Voir espace utilisé
Object.keys(localStorage).reduce((total, key) => {
  total += localStorage[key].length;
  return total;
}, 0) // Résultat en bytes
```

---

## 📝 Checklist Mise en Prod

- [ ] Tester inscription → login → dashboard sur Chrome
- [ ] Tester inscription → login → dashboard sur Firefox
- [ ] Tester sur mobile (iPhone, Android)
- [ ] Tester formulaire de contact + export
- [ ] Vérifier localStorage ne contient pas de données sensibles
- [ ] Vérifier HTTPS activé
- [ ] Vérifier DNS configuré
- [ ] Tester compte démo (demo@example.com / DemoPass123)
- [ ] Tester expiration session (30 min)
- [ ] Tester logout + reconnexion
- [ ] Vérifier SEO tags (Open Graph, Meta)
- [ ] Valider HTML/CSS (W3C)
- [ ] Tester accessibilité (WCAG 2.1)
- [ ] Backup localStorage avant production

---

**Créé avec ❤️ pour Youth Green Tech — 100% Gratuit & Sécurisé**
