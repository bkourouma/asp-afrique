@echo off
REM ╔════════════════════════════════════════════════════════════════════════════╗
REM ║                                                                            ║
REM ║              START FRONTEND + BACKEND                                     ║
REM ║                                                                            ║
REM ║  Ce script démarre le frontend (Next.js) et le backend (Fastify)         ║
REM ║                                                                            ║
REM ╚════════════════════════════════════════════════════════════════════════════╝

setlocal enabledelayedexpansion

REM Afficher le titre
cls
echo.
echo ╔════════════════════════════════════════════════════════════════════════════╗
echo ║                                                                            ║
echo ║              START FRONTEND + BACKEND                                     ║
echo ║                                                                            ║
echo ║  Ce script démarre le frontend (Next.js) et le backend (Fastify)         ║
echo ║                                                                            ║
echo ╚════════════════════════════════════════════════════════════════════════════╝
echo.

REM Vérifier que nous sommes à la racine du projet
if not exist "package.json" (
    echo [ERREUR] package.json non trouvé!
    echo Assurez-vous d'executer ce script depuis la racine du projet.
    pause
    exit /b 1
)

echo [INFO] Verification des prerequis...
echo.

REM Vérifier Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERREUR] Node.js n'est pas installe!
    pause
    exit /b 1
)
echo [OK] Node.js trouve:
node --version

REM Vérifier pnpm
pnpm --version >nul 2>&1
if errorlevel 1 (
    echo [ERREUR] pnpm n'est pas installe!
    pause
    exit /b 1
)
echo [OK] pnpm trouve:
pnpm --version

echo.
echo [INFO] Demarrage du frontend et du backend...
echo.

REM Créer deux fenêtres de terminal
echo [1/2] Demarrage du frontend (Next.js)...
start "Frontend - Next.js" cmd /k "cd /d %CD%\apps\web && pnpm dev"

echo [2/2] Demarrage du backend (Fastify)...
timeout /t 3 /nobreak
start "Backend - Fastify" cmd /k "cd /d %CD%\apps\api && pnpm dev"

echo.
echo [OK] Les deux serveurs sont en cours de demarrage!
echo.
echo ╔════════════════════════════════════════════════════════════════════════════╗
echo ║                                                                            ║
echo ║  Frontend (Next.js):                                                      ║
echo ║    - Local: http://localhost:3001                                         ║
echo ║    - Network: http://192.168.1.70:3001                                    ║
echo ║                                                                            ║
echo ║  Backend (Fastify):                                                       ║
echo ║    - Port: A determiner (probablement 3000 ou 5000)                       ║
echo ║                                                                            ║
echo ║  Identifiants de test:                                                    ║
echo ║    - Email: admin@aspc-ci.org                                             ║
echo ║    - Mot de passe: Admin123!                                              ║
echo ║                                                                            ║
echo ╚════════════════════════════════════════════════════════════════════════════╝
echo.

pause

