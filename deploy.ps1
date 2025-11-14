# Youth Green Tech - Deployment to GitHub Pages (PowerShell)
# Usage: .\deploy.ps1

Write-Host "🚀 Youth Green Tech - Déploiement GitHub Pages" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Green

# 1. Vérifier git est initialisé
if (!(Test-Path ".git")) {
    Write-Host "❌ Git n'est pas initialisé" -ForegroundColor Red
    Write-Host "Exécutez d'abord: git init" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Git repository détecté" -ForegroundColor Green

# 2. Vérifier remote origin
$remote = git remote get-url origin 2>&1
if ($LASTEXITCODE -ne 0 -or $remote -like "*error*") {
    Write-Host "❌ Remote origin n'existe pas" -ForegroundColor Red
    Write-Host "Exécutez: git remote add origin https://github.com/USERNAME/mon-association.git" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Repository: $remote" -ForegroundColor Green

# 3. Commit tous les changements
Write-Host ""
Write-Host "📝 Staging des fichiers..." -ForegroundColor Cyan
git add -A

$status = git status --porcelain
if ($status -eq "") {
    Write-Host "ℹ️  Aucun changement à commiter" -ForegroundColor Yellow
} else {
    Write-Host "🔧 Committing changements..." -ForegroundColor Cyan
    git commit -m "Build: Production-ready Youth Green Tech v1.0.0"
    if ($LASTEXITCODE -ne 0) {
        Write-Host "⚠️  Erreur lors du commit" -ForegroundColor Yellow
    } else {
        Write-Host "✅ Commit réussi" -ForegroundColor Green
    }
}

# 4. Push vers main/master
Write-Host ""
$branch = git rev-parse --abbrev-ref HEAD 2>&1
Write-Host "📤 Push vers '$branch'..." -ForegroundColor Cyan
git push origin $branch

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Push réussi" -ForegroundColor Green
} else {
    Write-Host "❌ Erreur lors du push" -ForegroundColor Red
    exit 1
}

# 5. Instructions finales
Write-Host ""
Write-Host "✅ Déploiement complété!" -ForegroundColor Green
Write-Host "📌 Prochaines étapes :" -ForegroundColor Yellow
Write-Host "   1. Aller à: https://github.com/YOUR_USERNAME/mon-association" -ForegroundColor White
Write-Host "   2. Settings → Pages" -ForegroundColor White
Write-Host "   3. Source: Branch '$branch', dossier '/ (root)'" -ForegroundColor White
Write-Host "   4. Sauvegarder" -ForegroundColor White
Write-Host ""
Write-Host "🌐 Votre site sera accessible à:" -ForegroundColor Green
Write-Host "   https://YOUR_USERNAME.github.io/mon-association/" -ForegroundColor Cyan
Write-Host ""
Write-Host "✅ Fait!" -ForegroundColor Green
