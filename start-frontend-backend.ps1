# ╔════════════════════════════════════════════════════════════════════════════╗
# ║                                                                            ║
# ║              START FRONTEND + BACKEND (PowerShell)                        ║
# ║                                                                            ║
# ║  Ce script démarre le frontend (Next.js) et le backend (Fastify)         ║
# ║  dans deux fenêtres séparées                                              ║
# ║                                                                            ║
# ╚════════════════════════════════════════════════════════════════════════════╝

# Afficher le titre
Clear-Host
Write-Host ""
Write-Host "╔════════════════════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║                                                                            ║" -ForegroundColor Cyan
Write-Host "║              START FRONTEND + BACKEND (PowerShell)                        ║" -ForegroundColor Cyan
Write-Host "║                                                                            ║" -ForegroundColor Cyan
Write-Host "║  Ce script démarre le frontend (Next.js) et le backend (Fastify)         ║" -ForegroundColor Cyan
Write-Host "║  dans deux fenêtres séparées                                              ║" -ForegroundColor Cyan
Write-Host "║                                                                            ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Vérifier que nous sommes à la racine du projet
if (-not (Test-Path "package.json")) {
    Write-Host "[ERREUR] package.json non trouvé!" -ForegroundColor Red
    Write-Host "Assurez-vous d'exécuter ce script depuis la racine du projet." -ForegroundColor Red
    Read-Host "Appuyez sur Entrée pour quitter"
    exit 1
}

Write-Host "[INFO] Vérification des prérequis..." -ForegroundColor Yellow
Write-Host ""

# Vérifier Node.js
try {
    $nodeVersion = node --version
    Write-Host "[OK] Node.js trouvé: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "[ERREUR] Node.js n'est pas installé!" -ForegroundColor Red
    Read-Host "Appuyez sur Entrée pour quitter"
    exit 1
}

# Vérifier pnpm
try {
    $pnpmVersion = pnpm --version
    Write-Host "[OK] pnpm trouvé: $pnpmVersion" -ForegroundColor Green
} catch {
    Write-Host "[ERREUR] pnpm n'est pas installé!" -ForegroundColor Red
    Read-Host "Appuyez sur Entrée pour quitter"
    exit 1
}

Write-Host ""
Write-Host "[INFO] Démarrage du frontend et du backend..." -ForegroundColor Yellow
Write-Host ""

# Obtenir le répertoire courant
$rootDir = Get-Location

# Démarrer le frontend
Write-Host "[1/2] Démarrage du frontend (Next.js)..." -ForegroundColor Green
Start-Process -FilePath "cmd.exe" -ArgumentList "/k", "cd /d $rootDir\apps\web && pnpm dev" -WindowStyle Normal -PassThru | Out-Null

# Attendre 3 secondes
Start-Sleep -Seconds 3

# Démarrer le backend
Write-Host "[2/2] Démarrage du backend (Fastify)..." -ForegroundColor Green
Start-Process -FilePath "cmd.exe" -ArgumentList "/k", "cd /d $rootDir\apps\api && pnpm dev" -WindowStyle Normal -PassThru | Out-Null

Write-Host ""
Write-Host "[OK] Les deux serveurs sont en cours de démarrage!" -ForegroundColor Green
Write-Host ""
Write-Host "╔════════════════════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║                                                                            ║" -ForegroundColor Cyan
Write-Host "║  Frontend (Next.js):                                                      ║" -ForegroundColor Cyan
Write-Host "║    - Local: http://localhost:3001                                         ║" -ForegroundColor Cyan
Write-Host "║    - Network: http://192.168.1.70:3001                                    ║" -ForegroundColor Cyan
Write-Host "║                                                                            ║" -ForegroundColor Cyan
Write-Host "║  Backend (Fastify):                                                       ║" -ForegroundColor Cyan
Write-Host "║    - Port: À déterminer (probablement 3000 ou 5000)                       ║" -ForegroundColor Cyan
Write-Host "║                                                                            ║" -ForegroundColor Cyan
Write-Host "║  Identifiants de test:                                                    ║" -ForegroundColor Cyan
Write-Host "║    - Email: admin@aspc-ci.org                                             ║" -ForegroundColor Cyan
Write-Host "║    - Mot de passe: Admin123!                                              ║" -ForegroundColor Cyan
Write-Host "║                                                                            ║" -ForegroundColor Cyan
Write-Host "║  Fermer cette fenêtre pour terminer le script                             ║" -ForegroundColor Cyan
Write-Host "║                                                                            ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

Read-Host "Appuyez sur Entrée pour quitter"

