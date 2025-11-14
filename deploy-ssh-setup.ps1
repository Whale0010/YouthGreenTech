# deploy-ssh-setup.ps1
# Script PowerShell complet pour configuration SSH et push GitHub
# AUCUNE exécution automatique — étapes à copier-coller manuellement

# ============================================================================
# ÉTAPE 1 : Générer une clé SSH (si vous n'en avez pas)
# ============================================================================
# Copier-coller dans PowerShell (une seule fois) :
# ssh-keygen -t ed25519 -C "your-email@example.com"
# 
# Puis appuyez sur Entrée pour le chemin par défaut (~\.ssh\id_ed25519)
# Optionnel : entrez une passphrase pour sécuriser la clé
# ============================================================================

Write-Output @"
╔═══════════════════════════════════════════════════════════════════════════╗
║                    CONFIGURATION SSH - ÉTAPE 1                             ║
║                 Générer une clé SSH (si pas encore faite)                  ║
╚═══════════════════════════════════════════════════════════════════════════╝

COMMANDE À COPIER-COLLER (PowerShell) :
ssh-keygen -t ed25519 -C "your-email@example.com"

ACTIONS MANUELLES APRÈS :
1. Appuyez sur Entrée pour le chemin par défaut
2. Optionnel : entrez une passphrase (ou laissez vide)
3. La clé est créée dans C:\Users\$env:USERNAME\.ssh\id_ed25519

"@

# ============================================================================
# ÉTAPE 2 : Afficher la clé publique (à copier dans GitHub)
# ============================================================================
Write-Output @"
╔═══════════════════════════════════════════════════════════════════════════╗
║                    CONFIGURATION SSH - ÉTAPE 2                             ║
║              Afficher la clé publique (pour GitHub Settings)               ║
╚═══════════════════════════════════════════════════════════════════════════╝

COMMANDE À COPIER-COLLER (PowerShell) :
type $env:USERPROFILE\.ssh\id_ed25519.pub | clip

Cette commande copie la clé dans le presse-papiers.
Collez-la ensuite dans GitHub Settings → SSH and GPG keys → New SSH key

"@

# ============================================================================
# ÉTAPE 3 : Tester la connexion SSH à GitHub
# ============================================================================
Write-Output @"
╔═══════════════════════════════════════════════════════════════════════════╗
║                    CONFIGURATION SSH - ÉTAPE 3                             ║
║                   Tester la connexion SSH à GitHub                         ║
╚═══════════════════════════════════════════════════════════════════════════╝

COMMANDE À COPIER-COLLER (PowerShell) :
ssh -T git@github.com

RÉSULTAT ATTENDU :
'Hi USERNAME! You've successfully authenticated, but GitHub does not provide shell access.'

Si vous recevez 'Permission denied (publickey)', vérifiez que :
1. La clé publique a bien été ajoutée à GitHub Settings
2. L'agent SSH local a la clé privée (ssh-add ~/.ssh/id_ed25519)

"@

# ============================================================================
# ÉTAPE 4 : Configurer Git pour utiliser SSH (remplacer USERNAME)
# ============================================================================
Write-Output @"
╔═══════════════════════════════════════════════════════════════════════════╗
║                    CONFIGURATION GIT - ÉTAPE 4                             ║
║             Configurer le remote SSH pour GitHub (USERNAME)                ║
╚═══════════════════════════════════════════════════════════════════════════╝

COMMANDES À COPIER-COLLER (PowerShell) :
Remplacez USERNAME par votre nom d'utilisateur GitHub avant de les copier.

# Ajouter le remote SSH
git remote add origin git@github.com:USERNAME/mon-association.git

# OU si le remote existe déjà, le remplacer
git remote set-url origin git@github.com:USERNAME/mon-association.git

# Vérifier que le remote est correct
git remote -v

"@

# ============================================================================
# ÉTAPE 5 : Vérifier la configuration Git locale
# ============================================================================
Write-Output @"
╔═══════════════════════════════════════════════════════════════════════════╗
║                    VÉRIFICATION GIT - ÉTAPE 5                              ║
║                  Vérifier la configuration locale                          ║
╚═══════════════════════════════════════════════════════════════════════════╝

COMMANDES À COPIER-COLLER (PowerShell) :
git config user.name
git config user.email
git remote -v
git branch -v

RÉSULTAT ATTENDU :
- user.name : Youth Green Tech (auto)
- user.email : deploy@younggreentech.example
- remote : origin git@github.com:USERNAME/mon-association.git
- branch : main (actuelle)

"@

# ============================================================================
# ÉTAPE 6 : Ajouter, committer et pousser (add / commit / push)
# ============================================================================
Write-Output @"
╔═══════════════════════════════════════════════════════════════════════════╗
║                    DÉPLOIEMENT - ÉTAPE 6                                   ║
║            Ajouter, committer et pousser sur GitHub (main)                 ║
╚═══════════════════════════════════════════════════════════════════════════╝

COMMANDES À COPIER-COLLER (PowerShell) :
S'assurer d'être sur la branche main :
git branch -M main

Vérifier l'état du working tree :
git status --short

Ajouter tous les fichiers :
git add . --all

Committer (si aucun changement, git annoncera 'nothing to commit') :
git commit -m "Youth Green Tech - Déploiement automatique"

Pousser vers origin/main :
git push -u origin main --force

"@

# ============================================================================
# ÉTAPE 7 : Vérifier le push sur GitHub
# ============================================================================
Write-Output @"
╔═══════════════════════════════════════════════════════════════════════════╗
║                    VÉRIFICATION - ÉTAPE 7                                  ║
║                    Vérifier que le push a réussi                           ║
╚═══════════════════════════════════════════════════════════════════════════╝

COMMANDES DE VÉRIFICATION (PowerShell) :
git status --short
git log -1 --oneline
git ls-remote origin main

VÉRIFICATION MANUELLE (GitHub Web) :
1. Ouvrez https://github.com/USERNAME/mon-association
2. Vérifiez que le commit 'Youth Green Tech - Déploiement automatique' est visible
3. Vérifiez la branche courante : doit être 'main'

"@

# ============================================================================
# ÉTAPE 8 : Configurer GitHub Pages (manuel — interface web)
# ============================================================================
Write-Output @"
╔═══════════════════════════════════════════════════════════════════════════╗
║                    GITHUB PAGES - ÉTAPE 8                                  ║
║                  Configuration manuelle (interface web)                    ║
╚═══════════════════════════════════════════════════════════════════════════╝

ACTIONS MANUELLES (sur GitHub web) :
1. Ouvrez https://github.com/USERNAME/mon-association
2. Cliquez sur 'Settings' (roue dentée)
3. Dans la colonne de gauche, cliquez sur 'Pages'
4. Sous 'Build and deployment' → 'Source' :
   - Branch : sélectionnez 'main'
   - Folder : sélectionnez '/ (root)'
5. Cliquez 'Save' ou 'Enable'

GitHub indiquera ensuite :
'Your site is live at https://USERNAME.github.io/mon-association'

Attendre 2~10 minutes pour que le déploiement soit complet.

"@

# ============================================================================
# ÉTAPE 9 : Tester l'URL GitHub Pages
# ============================================================================
Write-Output @"
╔═══════════════════════════════════════════════════════════════════════════╗
║                    TEST - ÉTAPE 9                                          ║
║              Tester l'URL GitHub Pages après déploiement                   ║
╚═══════════════════════════════════════════════════════════════════════════╝

COMMANDE À COPIER-COLLER (PowerShell - après attendre 2 minutes) :
Start-Sleep -Seconds 120
Invoke-WebRequest -UseBasicParsing -Uri 'https://USERNAME.github.io/mon-association' -TimeoutSec 30

RÉSULTAT ATTENDU :
StatusCode : 200
StatusDescription : OK

Si erreur 404 :
- Attendez 5~10 minutes supplémentaires et retestez
- Vérifiez que GitHub Pages est bien activé dans Settings

"@

# ============================================================================
# RÉSUMÉ COMPLET (copier-coller rapide)
# ============================================================================
Write-Output @"
╔═══════════════════════════════════════════════════════════════════════════╗
║                         RÉSUMÉ - COPIER-COLLER RAPIDE                      ║
╚═══════════════════════════════════════════════════════════════════════════╝

SÉQUENCE COMPLÈTE (remplacez USERNAME) :

# 1) Générer SSH (une fois)
ssh-keygen -t ed25519 -C "your-email@example.com"

# 2) Copier clé publique dans presse-papiers (puis ajouter à GitHub Settings)
type \$env:USERPROFILE\.ssh\id_ed25519.pub | clip

# 3) Tester SSH
ssh -T git@github.com

# 4) Configurer remote SSH
git remote set-url origin git@github.com:USERNAME/mon-association.git

# 5) Vérifier config
git config user.name
git config user.email
git remote -v

# 6) Ajouter, committer, pousser
git branch -M main
git add . --all
git commit -m "Youth Green Tech - Déploiement automatique"
git push -u origin main --force

# 7) Vérifier le push
git log -1 --oneline
git ls-remote origin main

# 8) (Manuel) Configurer GitHub Pages via Settings web

# 9) Tester après 2 minutes
Start-Sleep -Seconds 120
Invoke-WebRequest -UseBasicParsing -Uri 'https://USERNAME.github.io/mon-association' -TimeoutSec 30

"@

Write-Output @"
╔═══════════════════════════════════════════════════════════════════════════╗
║                         IMPORTANT - À LIRE                                 ║
╚═══════════════════════════════════════════════════════════════════════════╝

✓ Aucune exécution automatique — toutes les commandes sont à copier-coller
✓ Authentification SSH évite les problèmes de token/credentials
✓ Remplacez USERNAME par votre nom d'utilisateur GitHub AVANT de copier
✓ SSH demande une connexion unique à GitHub (pas de token requis à chaque fois)
✓ Si passphrase SSH, vous serez invité une fois au premier push

PROCHAINES ÉTAPES :
1. Lancez ce script pour voir les instructions
2. Exécutez chaque commande dans PowerShell (copier-coller)
3. Effectuez les actions manuelles (SSH key sur GitHub, Pages dans Settings)
4. Vérifiez le déploiement avec les commandes de test

"@
