Aperçu du site de l'association

Fichiers créés dans le dossier `public/` :

- `index.html` — page principale HTML5 responsive.
- `css/style.css` — styles modernes (mobile-first) pour le site.

Comment prévisualiser rapidement :

1. Ouvrir `public/index.html` dans votre navigateur (double-clic) pour un aperçu statique.

2. Préféré : utiliser une extension Live Server (VS Code) ou un petit serveur HTTP pour préserver les chemins et permettre les requêtes modernes :

   - Avec Python 3 (si installé) :

```powershell
Set-Location -Path 'c:\Users\pc\mon-association\public'; python -m http.server 8000
```

   Puis ouvrir http://localhost:8000

3. Le formulaire est un exemple côté client (alerte de confirmation). Pour un envoi réel, connecter le formulaire à un endpoint serveur (fetch POST /api/contact).

Personnalisation rapide :
- Modifier les textes en français dans `index.html`.
- Remplacer les images (actuellement des liens Unsplash) par vos propres images dans `public/` et mettre à jour les `src`.

Si tu veux, je peux :
- Ajouter un mini backend pour recevoir les messages (ex : route API Node/Express simple),
- Générer des variantes (couleurs, police Google Fonts),
- Transformer en template Next/React si tu veux l'intégrer au projet existant.
