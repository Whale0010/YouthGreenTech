# 📋 TESTING CHECKLIST - Youth Green Tech

## ✅ TESTS STATIQUES (Réalisés)
- [x] Chemins relatifs pour CSS/JS (compatible GitHub Pages)
- [x] Syntaxe dashboard.html corrigée (parenthèse superflue)
- [x] Wrappers globaux (`requireAuth`, `escapeHtml`, `formatDate`)
- [x] Hashing bcrypt confirmé pour mots de passe
- [x] Session timeout de 30 minutes configuré
- [x] XSS protection avec `escapeHtml()` actif
- [x] localStorage keys normalisés : `youthGreenTech_*`

## 🧪 TESTS FONCTIONNELS (À EXÉCUTER LOCALEMENT)

### 1. Test Contact Form (Public)
- [ ] Accéder à `http://localhost:8000`
- [ ] Scroller jusqu'à section Contact
- [ ] Remplir tous les champs (email, sujet, message)
- [ ] Cliquer "Envoyer" → vérifier succès message
- [ ] F12 Console : vérifier aucun erreur critique
- [ ] F12 Application → localStorage → `youthGreenTechSubmissions` : nouvelle entrée présente

### 2. Test Inscription
- [ ] Cliquer "Rejoindre Maintenant" → `register.html`
- [ ] Remplir formulaire complet (nom, email valide, mot de passe conforme : 8+ chars, MAJ, min, chiffre)
- [ ] Vérifier "Intérêts" checkbox fonctionne
- [ ] Accepter conditions
- [ ] Soumettre → vérifier message succès
- [ ] Redirection automatique vers `login.html` (2 sec)
- [ ] F12 localStorage → `youthGreenTech_users` contient l'utilisateur
- [ ] **Vérifier passwordHash existe, pas de `password` en clair**

### 3. Test Connexion
- [ ] Sur `login.html`, vérifier compte demo prégénéré s'affiche
- [ ] Se connecter avec les identifiants créés à l'étape 2
- [ ] Vérifier redirection vers `dashboard.html` (1.5 sec)
- [ ] F12 localStorage → `youthGreenTech_session` présent avec `token`, `expiresAt`
- [ ] Vérifier affichage du nom + avatar en header

### 4. Test Dashboard
- [ ] Vérifier welcome message affiche le nom correct
- [ ] Vérifier avatar avec initiales et couleur
- [ ] Vérifier stats (formations, objectifs, badges, réseau)
- [ ] Vérifier info membre (email, nom, dates)
- [ ] Vérifier intérêts affichés
- [ ] Vérifier activité récente
- [ ] Vérifier session info (token, login time, expiry countdown)
- [ ] Session countdown doit compter de 30:00 vers 0:00

### 5. Test Profil
- [ ] Cliquer "Modifier le Profil" → `profile.html`
- [ ] Vérifier 3 tabs : Infos personnelles, Intérêts, Sécurité
- [ ] **Tab 1 - Infos** :
  - [ ] Modifier bio et téléphone
  - [ ] Enregistrer → vérifier succès
  - [ ] Revenir au dashboard → vérifier changements persistent
- [ ] **Tab 2 - Intérêts** :
  - [ ] Sélectionner intérêts (checkboxes)
  - [ ] Enregistrer → vérifier succès
  - [ ] localStorage : intérêts mis à jour
- [ ] **Tab 3 - Sécurité** :
  - [ ] Changer mot de passe (atual valide, nouveau valide)
  - [ ] Vérifier succès
  - [ ] Se reconnecter avec nouveau mot de passe → succès

### 6. Test Navigation & Menu Mobile
- [ ] Réduire fenêtre à 768px (DevTools mobile mode)
- [ ] Vérifier menu burger s'affiche
- [ ] Cliquer burger → menu s'ouvre
- [ ] Cliquer lien dans menu → menu se ferme
- [ ] Tester tous les liens (dashboard, profil, pages publiques)

### 7. Test Déconnexion & Session
- [ ] Sur dashboard, cliquer "Déconnexion"
- [ ] Confirmer alerte
- [ ] Redirection vers `login.html`
- [ ] F12 localStorage → `youthGreenTech_session` supprimé
- [ ] Essayer accéder directement `dashboard.html` → redirection auto vers login

### 8. Test Expiration Session
- [ ] Se connecter (créer session)
- [ ] F12 Application → localStorage → `youthGreenTech_session`
- [ ] Éditer `expiresAt` : mettre timestamp passé (Date.now() - 1000)
- [ ] Recharger `dashboard.html` → redirection vers login
- [ ] Vérifier message expiration

## 📱 TESTS RESPONSIVE

### Mobile (375px - iPhone)
- [ ] Layout empile correctement
- [ ] Menu burger fonctionne
- [ ] Boutons cliquables (min 44px hauteur)
- [ ] Images scale correctement
- [ ] Pas de horizontal scroll

### Tablette (768px - iPad)
- [ ] Colonnes ajustées
- [ ] Navigation lisible
- [ ] Grilles responsive (2-3 colonnes)

### Desktop (1200px+)
- [ ] Layout optimal
- [ ] Hover effects visibles
- [ ] Spacing correct

## ♿ ACCESSIBILITÉ

### Navigation Clavier
- [ ] Tabuler à travers tous les liens → tous accessible
- [ ] Enter sur boutons → soumission form fonctionne
- [ ] Escape sur modals → ferme (si applicable)

### ARIA & Contraste
- [ ] F12 Axe DevTools → pas d'erreurs critiques
- [ ] Contraste texte/fond : ratio 4.5:1 minimum
- [ ] Labels sur tous les inputs
- [ ] Headings structurés (h1 > h2 > h3...)

## 🔒 SÉCURITÉ

- [ ] **Pas de XSS** : essayer injecter `<script>` dans form → échappé
- [ ] **Pas de mots de passe en clair** : localStorage audit montre passwordHash uniquement
- [ ] **Pas de token en URL** : vérifier token ne s'expose jamais
- [ ] **HTTPS ready** : relativistic paths utilisés

## 📊 PERFORMANCE

- [ ] Lighthouse score > 90 (F12 → Lighthouse)
- [ ] FCP < 2s
- [ ] LCP < 2.5s
- [ ] CLS < 0.1

## 🎯 PRODUCTION READY CHECKLIST

- [ ] Tous les tests dessus cochés ✅
- [ ] Aucune erreur console (F12)
- [ ] Pas de TODO ou FIXME en code
- [ ] Git prêt : tous les fichiers commités
- [ ] `.gitignore` en place
- [ ] README.md à jour
- [ ] Configuration GitHub Pages validée

---

**Date de test :** 14 nov 2025  
**Testeur :** Automated + Manual  
**Statut :** À compléter localement
