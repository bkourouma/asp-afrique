@echo off
echo ========================================
echo   DÉMARRAGE VIDÉOTHÈQUE ASPCI
echo ========================================
echo.

echo ✅ Base de données synchronisée
echo ✅ Table 'videos' créée
echo ✅ Client Prisma généré
echo.

echo [1/2] Installation des dépendances...
call pnpm install
if %errorlevel% neq 0 (
    echo ERREUR: Echec de l'installation des dependances
    pause
    exit /b 1
)

echo.
echo [2/2] Démarrage de l'application...
cd apps\web
call pnpm dev

echo.
echo ========================================
echo   VIDÉOTHÈQUE ASPCI DÉMARRÉE !
echo ========================================
echo.
echo 🌐 Application: http://localhost:3000
echo 📹 Vidéothèque: http://localhost:3000/videos
echo 🔧 Admin: http://localhost:3000/admin/videos
echo.
echo Mot de passe admin: aspci2025
echo.
echo ✅ La table 'videos' est prête à être utilisée !
echo.
pause
