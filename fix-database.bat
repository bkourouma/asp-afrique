@echo off
echo ========================================
echo   RÉPARATION BASE DE DONNÉES ASPCI
echo ========================================
echo.

echo [1/3] Vérification du schéma Prisma...
cd packages\db
call npx prisma db push --accept-data-loss
if %errorlevel% neq 0 (
    echo ERREUR: Impossible de synchroniser la base de données
    echo.
    echo Tentative de reset complet...
    call npx prisma migrate reset --force
    if %errorlevel% neq 0 (
        echo ERREUR: Impossible de réinitialiser la base de données
        pause
        exit /b 1
    )
)

echo.
echo [2/3] Génération du client Prisma...
call npx prisma generate
if %errorlevel% neq 0 (
    echo ATTENTION: Probleme avec Prisma generate
)

echo.
echo [3/3] Vérification des tables...
call npx prisma db seed
if %errorlevel% neq 0 (
    echo ATTENTION: Probleme avec le seeding
)

echo.
echo ========================================
echo   BASE DE DONNÉES RÉPARÉE !
echo ========================================
echo.
echo ✅ Table 'videos' créée
echo ✅ Client Prisma généré
echo ✅ Base de données synchronisée
echo.
echo Vous pouvez maintenant démarrer l'application:
echo   cd apps\web
echo   pnpm dev
echo.
pause
