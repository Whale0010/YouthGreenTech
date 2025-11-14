# 📝 GUIDE DE MODIFICATION - Youth Green Tech

## Pour les Administrateurs/Webmasters

Ce guide explique comment modifier le contenu du site **sans connaître le code**.

---

## 🏠 PAGE D'ACCUEIL (`public/index.html`)

### 1️⃣ Modifier le Titre Principal (Hero)
Fichier: `public/index.html`

Rechercher:
```html
<h1>Jeunesse pour la Technologie Verte</h1>
```

Remplacer par votre titre:
```html
<h1>Votre Titre Ici</h1>
```

### 2️⃣ Modifier le Sous-Titre
Rechercher:
```html
<p class="hero-subtitle">Développez vos compétences tech en construisant un avenir durable</p>
```

Remplacer par:
```html
<p class="hero-subtitle">Votre sous-titre ici</p>
```

### 3️⃣ Modifier la Description
Rechercher:
```html
<p class="hero-desc">Youth Green Tech est une association jeunesse dédiée à l'innovation écologique...</p>
```

Remplacer par votre texte.

---

## 🎯 SECTION MISSION

Localiser la section `<!-- Mission Section -->` dans `public/index.html`

### Modifier les 3 Piliers:

**Pilier 1 - Innovation Écologique:**
```html
<article class="pillar" aria-label="Innovation écologique">
  <div class="pillar-icon">🌱</div>
  <h3>Innovation Écologique</h3>
  <p>Créer et promouvoir des solutions tech durables...</p>
</article>
```

Vous pouvez modifier:
- L'émojis (🌱)
- Le titre (h3)
- La description (p)

Faire la même chose pour les 2 autres piliers.

---

## 📋 SECTION ACTIVITÉS

Localiser `<!-- Activités Section -->` dans `public/index.html`

Chaque activité suit ce format:
```html
<article class="activity-card" aria-label="Ateliers Coding Écolo">
  <div class="activity-icon">🔧</div>
  <h3>Ateliers Coding Écolo</h3>
  <p>Apprenez Python, JavaScript et développez des solutions...</p>
  <ul class="activity-tags" role="list">
    <li>Gratuit</li>
    <li>Tous niveaux</li>
    <li>Hebdomadaire</li>
  </ul>
</article>
```

Vous pouvez:
- Changer l'émojis
- Changer le titre
- Changer la description
- Modifier les tags (gratuit, tous niveaux, etc.)

Pour **ajouter une nouvelle activité**, copier un bloc `<article>` et l'ajouter à la grille.

---

## 📊 SECTION STATISTIQUES

Localiser `<!-- Stats Section -->` dans `public/index.html`

Exemple de stat:
```html
<div class="stat-card" aria-label="1200 jeunes membres">
  <div class="stat-number" data-count="1200">0</div>
  <p class="stat-label">Jeunes Membres</p>
</div>
```

Pour modifier:
1. Change la valeur dans `data-count="1200"` (nombre de départ)
2. Change le label "Jeunes Membres"
3. Le nombre s'animera automatiquement à la lecture

---

## 📧 SECTION CONTACT

Localiser `<!-- Contact Section -->` dans `public/index.html`

### Modifier Email:
```html
<a href="mailto:hello@youthgreentech.com">hello@youthgreentech.com</a>
```

### Modifier Téléphone:
```html
<a href="tel:+33123456789">+33 (0)1 23 45 67 89</a>
```

### Modifier Adresse:
```html
<p>123 Rue de la Tech Verte<br/>75001 Paris, France</p>
```

### Modifier Réseaux Sociaux:
```html
<a href="https://facebook.com/youthgreentech" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
  <span>f</span>
</a>
```

Modifier les URLs (facebook.com/..., twitter.com/..., etc.)

---

## 💫 AJOUTER UNE NOUVELLE ACTIVITÉ (Copier-Coller Simple)

Dans la section Activités, après une `</article>`, ajouter:

```html
<article class="activity-card" aria-label="Votre Activité">
  <div class="activity-icon">🎯</div>
  <h3>Nom de votre Activité</h3>
  <p>Description courte et engageante de votre activité...</p>
  <ul class="activity-tags" role="list">
    <li>Tag 1</li>
    <li>Tag 2</li>
    <li>Tag 3</li>
  </ul>
</article>
```

C'est tout! La mise en page s'adaptera automatiquement.

---

## 👤 PAGES MEMBRES

### `public/login.html` - Page de Connexion

Modifications possibles:
- Titre: `<h1>Connexion</h1>`
- Sous-titre: `<p class="auth-subtitle">Accédez à votre espace membre</p>`
- Bénéfices listés dans `.auth-benefits`

### `public/register.html` - Page d'Inscription

Modifications possibles:
- Titre et descriptions
- Bénéfices d'adhésion
- Conditions d'utilisation (lien dans le formulaire)

### `public/dashboard.html` - Tableau de Bord Membre

**⚠️ Ne pas modifier** la logique JavaScript (scripts inline)

Modifications sûres:
- Textes des titres sections (h2)
- Labels des stat boxes

### `public/profile.html` - Profil Membre

**⚠️ Ne pas modifier** la logique JavaScript

---

## 🎨 MODIFIER LES COULEURS

Tous les fichiers CSS utilisent des variables de couleur. Modifier `public/css/style.min.css` n'est pas recommandé (fichier minifié).

**Solution** : Ajouter une feuille CSS personnalisée.

1. Créer fichier `public/css/custom.css` :

```css
:root {
  --primary: #E74C3C;           /* Couleur principale (actuellement vert) */
  --primary-light: #EC7063;     /* Vert clair */
  --accent: #C0392B;            /* Accent (actuellement teal) */
  --accent-dark: #A93226;       /* Accent foncé */
}
```

2. Ajouter le lien dans TOUS les `<head>` des pages HTML, après `style.min.css` :

```html
<link rel="stylesheet" href="css/custom.css" />
```

3. Remplacer les valeurs hex par vos couleurs préférées.

---

## 📝 MODIFIER LE FORMULAIRE DE CONTACT

Dans `public/index.html`, section Contact Form:

### Ajouter un nouveau champ:

Avant le bouton d'envoi, ajouter:

```html
<div class="form-group">
  <label for="newfield">Label du champ <span aria-label="requis">*</span></label>
  <input id="newfield" type="text" required aria-required="true" placeholder="Placeholder..." />
</div>
```

**Note**: Le formulaire stocke les données en `localStorage` (navigateur de l'utilisateur). Les données ne sont envoyées à aucun serveur.

---

## 🔐 MODIFIER LE COMPTE DÉMO

Fichier: `public/login.html`

Rechercher:
```javascript
function createDemoAccount() {
  const users = auth.getAllUsers();
  const demoExists = users.some(u => u.email === 'demo@example.com');
  
  if (!demoExists) {
    bcrypt.hash('DemoPass123', 10).then(hashedPassword => {
      const demoUser = {
        id: auth.generateUserId(),
        email: 'demo@example.com',
        passwordHash: hashedPassword,
        displayName: 'Utilisateur Test',
        interests: ['innovation'],
        // ...
```

Modifier:
- `demo@example.com` → votre email de test
- `DemoPass123` → mot de passe de test (8+ chars, MAJ, min, chiffre)
- `'Utilisateur Test'` → nom du compte de test

---

## 📱 FICHIER FAVICON

Remplacer l'émojis dans `<link rel="icon"...` :

Fichier: `public/index.html` (et autres HTML)

Chercher:
```html
<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='75' font-size='75' fill='%2327ae60'>✓</text></svg>" />
```

Remplacer `✓` par votre émojis favori.

---

## 🔄 VERSIONNER VOS CHANGEMENTS

Après modification:

1. Ouvrir Git (ou GitHub Desktop)
2. Ajouter vos changements
3. Commiter avec un message:
   ```
   "Update: Contact info et activités ajoutées"
   ```
4. Push vers la branche
5. GitHub Pages se met à jour automatiquement (quelques secondes)

---

## ⚠️ À NE PAS TOUCHER

- ❌ `public/js/members.js` - Moteur d'authentification
- ❌ `public/js/auth.js` - Fonctions internes
- ❌ Balises `<script>` dans les pages HTML (sauf si vous savez coder)
- ❌ Classes CSS (elles sont essentielles)
- ❌ Structure HTML des formulaires (layout risquerait de casser)

---

## 🆘 BESOIN D'AIDE?

| Problème | Solution |
|----------|----------|
| Le site ne s'affiche pas | Vérifier `http://localhost:8000` ou votre URL GitHub Pages |
| Les changements ne s'affichent pas | Vider le cache du navigateur (Ctrl+Shift+Del) |
| Le formulaire ne sauvegarde pas | Vérifier localStorage est activé dans le navigateur |
| Les couleurs ne changent pas | Vérifier le CSS custom est lié APRÈS style.min.css |
| Erreur en ouvrant les fichiers HTML | Utiliser VS Code + extension Live Server |

---

**Version**: 1.0.0  
**Dernière mise à jour**: 14 novembre 2025  
**Support**: Reportez les bugs sur le repository GitHub
