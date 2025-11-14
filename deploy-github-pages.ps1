# deploy-github-pages.ps1
# Script PowerShell préparé pour vous (NE LANCEZ PAS si vous ne voulez pas pousser)
# Remplacez le placeholder $USERNAME par votre nom d'utilisateur GitHub.

param(
    [string]$USERNAME = 'YOUR_GITHUB_USERNAME',
    [string]$REPO = 'mon-association'
)

$REMOTE = "https://github.com/$USERNAME/$REPO.git"
Write-Output "Remote URL target: $REMOTE"

# Configure origin remote (add if missing, otherwise set-url)
if (-not (git remote | Select-String -Pattern '^origin$' -Quiet)) {
    Write-Output "Adding origin remote..."
    git remote add origin $REMOTE
} else {
    Write-Output "Origin exists — setting URL to target..."
    git remote set-url origin $REMOTE
}

# Ensure branch name is main
git branch -M main

# Stage all changes
git add . --all

# Commit if there are changes
$hasChanges = -not ([string](git status --porcelain)).Equals('')
if ($hasChanges) {
    git commit -m "Youth Green Tech - Déploiement automatique"
} else {
    Write-Output "Aucun changement à committer."
}

# Push to origin main (will prompt for credentials if needed)
Write-Output "Pushing to origin main (may prompt for credentials)..."
git push -u origin main --force

if ($LASTEXITCODE -eq 0) {
    Write-Output "Push succeeded."
    Write-Output "Après avoir poussé, configurez GitHub Pages manuellement dans les Settings du dépôt (voir instructions)."
} else {
    Write-Output "Push a échoué. Vérifiez l'URL remote et vos permissions."
}

Write-Output "Script terminé."
