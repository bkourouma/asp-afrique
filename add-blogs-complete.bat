@echo off
echo ========================================
echo    AJOUT DE BLOGS D'EXEMPLE - ASPCI
echo ========================================
echo.

echo Verification des serveurs...
echo.

REM Verifier le port 3002 (API)
netstat -an | findstr :3002 >nul
if %errorlevel% neq 0 (
    echo ERREUR: Le serveur API n'est pas demarre sur le port 3002
    echo Veuillez demarrer le serveur backend avant de continuer
    pause
    exit /b 1
) else (
    echo OK: Serveur API detecte sur le port 3002
)

REM Verifier le port 3000 (Frontend)
netstat -an | findstr :3000 >nul
if %errorlevel% neq 0 (
    echo ATTENTION: Le serveur frontend n'est pas demarre sur le port 3000
    echo Vous pourrez toujours ajouter les blogs, mais ne pourrez pas les voir
) else (
    echo OK: Serveur frontend detecte sur le port 3000
)

echo.
echo Ajout des blogs d'exemple...
echo.

node add-blog-examples.js

echo.
echo Verification des blogs ajoutes...
echo.

node verify-blogs.js

echo.
echo ========================================
echo    OPERATION TERMINEE
echo ========================================
echo.
echo Vous pouvez maintenant:
echo   - Consulter la page admin: http://localhost:3000/admin/blog
echo   - Voir les blogs publics: http://localhost:3000/blog
echo.
pause
