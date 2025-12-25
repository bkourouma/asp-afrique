# ============================================================================
# Script de démarrage de l'application
# ============================================================================

Write-Host ""
Write-Host "╔════════════════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║                                                                        ║" -ForegroundColor Cyan
Write-Host "║                  🚀 DÉMARRAGE DE L'APPLICATION 🚀                     ║" -ForegroundColor Cyan
Write-Host "║                                                                        ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Vérifier si pnpm est installé
$pnpmCheck = Get-Command pnpm -ErrorAction SilentlyContinue
if (-not $pnpmCheck) {
    Write-Host "❌ ERREUR: pnpm n'est pas installé" -ForegroundColor Red
    Write-Host ""
    Write-Host "Installez pnpm avec:" -ForegroundColor Yellow
    Write-Host "  npm install -g pnpm" -ForegroundColor Yellow
    Write-Host ""
    Read-Host "Appuyez sur Entrée pour quitter"
    exit 1
}

Write-Host "✅ pnpm trouvé" -ForegroundColor Green
Write-Host ""

# Afficher le menu
Write-Host "Choisissez une option:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Démarrer le Frontend uniquement (Recommandé)" -ForegroundColor Yellow
Write-Host "2. Démarrer le Frontend + Backend" -ForegroundColor Yellow
Write-Host "3. Vérifier la configuration" -ForegroundColor Yellow
Write-Host "4. Installer les dépendances" -ForegroundColor Yellow
Write-Host "5. Quitter" -ForegroundColor Yellow
Write-Host ""

$choice = Read-Host "Entrez votre choix (1-5)"

switch ($choice) {
    "1" {
        Write-Host ""
        Write-Host "🚀 Démarrage du Frontend..." -ForegroundColor Green
        Write-Host ""
        Set-Location "apps\web"
        & pnpm dev
        break
    }
    "2" {
        Write-Host ""
        Write-Host "🚀 Démarrage du Frontend + Backend..." -ForegroundColor Green
        Write-Host ""
        & pnpm dev
        break
    }
    "3" {
        Write-Host ""
        Write-Host "🔍 Vérification de la configuration..." -ForegroundColor Green
        Write-Host ""
        & node check-setup.js
        Write-Host ""
        Read-Host "Appuyez sur Entrée pour continuer"
        break
    }
    "4" {
        Write-Host ""
        Write-Host "📦 Installation des dépendances..." -ForegroundColor Green
        Write-Host ""
        & pnpm install
        Write-Host ""
        Read-Host "Appuyez sur Entrée pour continuer"
        break
    }
    "5" {
        Write-Host ""
        Write-Host "👋 Au revoir!" -ForegroundColor Green
        Write-Host ""
        exit 0
    }
    default {
        Write-Host ""
        Write-Host "❌ Choix invalide" -ForegroundColor Red
        Write-Host ""
        Read-Host "Appuyez sur Entrée pour quitter"
        exit 1
    }
}

Write-Host ""
Write-Host "✅ Terminé" -ForegroundColor Green
Write-Host ""

