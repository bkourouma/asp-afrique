@echo off
echo ========================================
echo   DEMARRAGE DE LA VIDÉOTHÈQUE ASPCI
echo ========================================
echo.

echo [1/4] Installation des dependances...
call pnpm install
if %errorlevel% neq 0 (
    echo ERREUR: Echec de l'installation des dependances
    pause
    exit /b 1
)

echo.
echo Installation des dependances Radix UI...
cd apps\web
call pnpm add @radix-ui/react-label @radix-ui/react-select @radix-ui/react-progress @radix-ui/react-tabs class-variance-authority clsx tailwind-merge
if %errorlevel% neq 0 (
    echo ATTENTION: Probleme avec l'installation des dependances Radix UI
)
cd ..\..

echo.
echo [2/4] Generation du client Prisma...
cd packages\db
call npx prisma generate
if %errorlevel% neq 0 (
    echo ATTENTION: Probleme avec Prisma generate, continuons...
)
cd ..\..

echo.
echo [3/4] Creation des dossiers d'upload...
if not exist "apps\web\public\uploads" mkdir "apps\web\public\uploads"
if not exist "apps\web\public\uploads\videos" mkdir "apps\web\public\uploads\videos"
if not exist "apps\web\public\uploads\thumbnails" mkdir "apps\web\public\uploads\thumbnails"

echo.
echo [4/4] Demarrage de l'application...
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
pause
