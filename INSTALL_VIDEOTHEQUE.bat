@echo off
echo ========================================
echo   INSTALLATION VIDÉOTHÈQUE ASPCI
echo ========================================
echo.

echo [1/5] Installation des dependances principales...
call pnpm install
if %errorlevel% neq 0 (
    echo ERREUR: Echec de l'installation des dependances
    pause
    exit /b 1
)

echo.
echo [2/5] Installation des dependances Radix UI...
cd apps\web
call pnpm add @radix-ui/react-label@^2.0.2 @radix-ui/react-select@^2.0.0 @radix-ui/react-progress@^1.0.3 @radix-ui/react-tabs@^1.0.4
if %errorlevel% neq 0 (
    echo ATTENTION: Probleme avec l'installation des dependances Radix UI
)

echo.
echo [3/5] Installation des dependances utilitaires...
call pnpm add class-variance-authority@^0.7.0 clsx@^2.0.0 tailwind-merge@^2.0.0 tailwindcss-animate@^1.0.7
if %errorlevel% neq 0 (
    echo ATTENTION: Probleme avec l'installation des dependances utilitaires
)

echo.
echo [4/5] Creation des dossiers d'upload...
if not exist "public\uploads" mkdir "public\uploads"
if not exist "public\uploads\videos" mkdir "public\uploads\videos"
if not exist "public\uploads\thumbnails" mkdir "public\uploads\thumbnails"

echo.
echo [5/5] Generation du client Prisma...
cd ..\..\packages\db
call npx prisma generate
if %errorlevel% neq 0 (
    echo ATTENTION: Probleme avec Prisma generate, continuons...
)
cd ..\..\apps\web

echo.
echo ========================================
echo   INSTALLATION TERMINÉE !
echo ========================================
echo.
echo Pour demarrer l'application:
echo   pnpm dev
echo.
echo URLs importantes:
echo   🌐 Application: http://localhost:3000
echo   📹 Vidéothèque: http://localhost:3000/videos
echo   🔧 Admin: http://localhost:3000/admin/videos
echo.
echo Mot de passe admin: aspci2025
echo.
pause
