@echo off
REM ============================================================================
REM Script de démarrage du Frontend et Backend
REM ============================================================================

echo.
echo ╔════════════════════════════════════════════════════════════════════════╗
echo ║                                                                        ║
echo ║            🚀 DÉMARRAGE DU FRONTEND ET BACKEND 🚀                    ║
echo ║                                                                        ║
echo ╚════════════════════════════════════════════════════════════════════════╝
echo.

REM Générer le client Prisma
echo 📦 Génération du client Prisma...
cd packages\db
call pnpm prisma generate
if errorlevel 1 (
    echo ❌ ERREUR: Impossible de générer le client Prisma
    cd ..\..
    pause
    exit /b 1
)
cd ..\..

echo ✅ Client Prisma généré
echo.

REM Démarrer le backend
echo 🚀 Démarrage du Backend (Fastify)...
echo    URL: http://localhost:3001
echo.

start "Backend API" cmd /k "cd apps\api && pnpm dev"

REM Attendre 5 secondes
timeout /t 5 /nobreak

REM Démarrer le frontend
echo 🚀 Démarrage du Frontend (Next.js)...
echo    URL: http://localhost:3000
echo.

start "Frontend Web" cmd /k "cd apps\web && pnpm dev"

echo.
echo ✅ Frontend et Backend démarrés!
echo.
echo 📍 Accès:
echo    Frontend: http://localhost:3000
echo    Backend:  http://localhost:3001
echo.
echo 🔐 Identifiants de test:
echo    Email: admin@aspc-ci.org
echo    Mot de passe: Admin123!
echo.
echo Appuyez sur une touche pour quitter ce script
pause

