# ============================================================================
# Script de démarrage complet (Frontend + Backend)
# ============================================================================

Write-Host ""
Write-Host "╔════════════════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║                                                                        ║" -ForegroundColor Cyan
Write-Host "║              🚀 DÉMARRAGE COMPLET (Frontend + Backend) 🚀            ║" -ForegroundColor Cyan
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

# Générer le client Prisma
Write-Host "📦 Génération du client Prisma..." -ForegroundColor Green
Set-Location "packages/db"
& pnpm prisma generate
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ ERREUR: Impossible de générer le client Prisma" -ForegroundColor Red
    Set-Location "../.."
    Read-Host "Appuyez sur Entrée pour quitter"
    exit 1
}
Set-Location "../.."

Write-Host "✅ Client Prisma généré" -ForegroundColor Green
Write-Host ""

# Démarrer l'application
Write-Host "🚀 Démarrage de l'application (Frontend + Backend)..." -ForegroundColor Green
Write-Host ""

& pnpm dev

Write-Host ""
Read-Host "Appuyez sur Entrée pour quitter"

