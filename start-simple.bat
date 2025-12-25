@echo off
echo ========================================
echo   DEMARRAGE SIMPLE VIDÉOTHÈQUE ASPCI
echo ========================================
echo.

echo [1/3] Installation des dependances...
call pnpm install
if %errorlevel% neq 0 (
    echo ERREUR: Echec de l'installation des dependances
    pause
    exit /b 1
)

echo.
echo [2/3] Creation des dossiers d'upload...
if not exist "apps\web\public\uploads" mkdir "apps\web\public\uploads"
if not exist "apps\web\public\uploads\videos" mkdir "apps\web\public\uploads\videos"
if not exist "apps\web\public\uploads\thumbnails" mkdir "apps\web\public\uploads\thumbnails"

echo.
echo [3/3] Demarrage de l'application...
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
echo Note: Les composants UI seront installés automatiquement
echo.
pause
