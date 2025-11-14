#!/bin/bash
# Youth Green Tech - Deployment to GitHub Pages
# Usage: bash deploy.sh

set -e

echo "🚀 Youth Green Tech - Déploiement GitHub Pages"
echo "================================================"

# 1. Vérifier git est initialisé
if [ ! -d ".git" ]; then
    echo "❌ Git n'est pas initialisé"
    echo "Exécutez d'abord: git init"
    exit 1
fi

# 2. Vérifier remote origin
REMOTE=$(git remote get-url origin 2>/dev/null || echo "")
if [ -z "$REMOTE" ]; then
    echo "❌ Remote origin n'existe pas"
    echo "Exécutez: git remote add origin <your-repo-url>"
    exit 1
fi

echo "✅ Repository: $REMOTE"

# 3. Commit tous les changements
echo ""
echo "📝 Staging des fichiers..."
git add -A

if git diff --cached --quiet; then
    echo "ℹ️  Aucun changement à commiter"
else
    echo "🔧 Committing changements..."
    git commit -m "Build: Production-ready Youth Green Tech v1.0.0"
fi

# 4. Push vers main/master
BRANCH=$(git rev-parse --abbrev-ref HEAD)
echo ""
echo "📤 Push vers $BRANCH..."
git push origin "$BRANCH"

# 5. Activer GitHub Pages
echo ""
echo "✅ Déploiement GitHub Pages en cours..."
echo "📌 Prochaines étapes :"
echo "   1. Aller à: https://github.com/YOUR_USERNAME/mon-association"
echo "   2. Settings → Pages"
echo "   3. Source: Branch 'main' (ou 'master'), dossier '/ (root)'"
echo "   4. Sauvegarder"
echo ""
echo "🌐 Votre site sera accessible à:"
echo "   https://YOUR_USERNAME.github.io/mon-association/"
echo ""
echo "✅ Déploiement terminé!"
