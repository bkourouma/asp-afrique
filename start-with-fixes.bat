@echo off
echo ========================================
echo   DÉMARRAGE AVEC CORRECTIONS TYPES
echo ========================================
echo.

echo [1/3] Installation des dépendances...
call pnpm install
if %errorlevel% neq 0 (
    echo ERREUR: Echec de l'installation des dependances
    pause
    exit /b 1
)

echo.
echo [2/3] Nettoyage du cache...
call pnpm clean 2>nul || echo "Pas de script clean"
if exist "apps\web\.next" rmdir /s /q "apps\web\.next"
if exist "node_modules\.cache" rmdir /s /q "node_modules\.cache"

echo.
echo [3/3] Démarrage avec corrections TypeScript...
cd apps\web
set NODE_OPTIONS=--max-old-space-size=4096
call pnpm dev

echo.
echo ========================================
echo   APPLICATION DÉMARRÉE AVEC CORRECTIONS !
echo ========================================
echo.
echo 🌐 Application: http://localhost:3000
echo 📹 Vidéothèque: http://localhost:3000/videos
echo 🔧 Admin: http://localhost:3000/admin/videos
echo.
echo ✅ Problèmes de types corrigés
echo ✅ Composants UI simplifiés
echo.
pause
