#!/bin/bash
# Vérification de la structure du projet

echo "════════════════════════════════════════════"
echo "✓ Vérification de la structure du projet"
echo "════════════════════════════════════════════"
echo ""

# Fonction pour vérifier un dossier
check_dir() {
  if [ -d "$1" ]; then
    echo "✅ $1"
    return 0
  else
    echo "❌ $1 (MISSING)"
    return 1
  fi
}

# Fonction pour vérifier un fichier
check_file() {
  if [ -f "$1" ]; then
    echo "✅ $1"
    return 0
  else
    echo "❌ $1 (MISSING)"
    return 1
  fi
}

echo "📁 Dossiers requis:"
check_dir "app/components/common"
check_dir "app/components/home"
check_dir "app/components/ui"
check_dir "app/hooks"
check_dir "app/lib"
check_dir "app/types"

echo ""
echo "📄 Fichiers requis (lib):"
check_file "app/lib/constants.js"
check_file "app/lib/validators.js"

echo ""
echo "🎣 Fichiers requis (hooks):"
check_file "app/hooks/useAuth.js"
check_file "app/hooks/useForm.js"

echo ""
echo "🎨 Fichiers requis (components):"
check_file "app/components/home/HeroSection.js"
check_file "app/components/home/MissionSection.js"
check_file "app/components/home/ActionsSection.js"
check_file "app/components/home/StatsSection.js"
check_file "app/components/home/DonationCTA.js"
check_file "app/components/home/Footer.js"
check_file "app/components/ui/Button.js"
check_file "app/components/ui/Card.js"

echo ""
echo "📚 Documentation requis:"
check_file "ARCHITECTURE.md"
check_file "HOOKS.md"
check_file "VALIDATORS.md"
check_file "QUICKSTART.md"
check_file "CHANGES.md"

echo ""
echo "🔑 Fichiers principaux:"
check_file "app/page.js"
check_file "app/layout.js"
check_file "app/loading.js"
check_file "app/error.js"

echo ""
echo "════════════════════════════════════════════"
echo "✨ Vérification terminée!"
echo "════════════════════════════════════════════"
