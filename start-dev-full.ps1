# ============================================================================
# Script de démarrage du Frontend et Backend
# ============================================================================

Write-Host ""
Write-Host "╔════════════════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║                                                                        ║" -ForegroundColor Cyan
Write-Host "║            🚀 DÉMARRAGE DU FRONTEND ET BACKEND 🚀                    ║" -ForegroundColor Cyan
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

# Démarrer le frontend
Write-Host "🚀 Démarrage du Frontend (Next.js)..." -ForegroundColor Green
Write-Host "   URL: http://localhost:3000" -ForegroundColor Yellow
Write-Host ""

Start-Process -FilePath "cmd.exe" -ArgumentList "/k", "cd /d $PWD\apps\web && pnpm dev" -WindowStyle Normal

# Attendre 5 secondes
Start-Sleep -Seconds 5

# Démarrer le backend
Write-Host "🚀 Démarrage du Backend (Fastify)..." -ForegroundColor Green
Write-Host "   URL: http://localhost:3001" -ForegroundColor Yellow
Write-Host ""

Start-Process -FilePath "cmd.exe" -ArgumentList "/k", "cd /d $PWD\apps\api && pnpm dev" -WindowStyle Normal

Write-Host ""
Write-Host "✅ Frontend et Backend démarrés!" -ForegroundColor Green
Write-Host ""
Write-Host "📍 Accès:" -ForegroundColor Cyan
Write-Host "   Frontend: http://localhost:3000" -ForegroundColor Yellow
Write-Host "   Backend:  http://localhost:3001" -ForegroundColor Yellow
Write-Host ""
Write-Host "🔐 Identifiants de test:" -ForegroundColor Cyan
Write-Host "   Email: admin@aspc-ci.org" -ForegroundColor Yellow
Write-Host "   Mot de passe: Admin123!" -ForegroundColor Yellow
Write-Host ""
Write-Host "Appuyez sur Entrée pour quitter ce script" -ForegroundColor Gray
Read-Host

