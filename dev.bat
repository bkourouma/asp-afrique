@echo off
echo ========================================
echo ASPCI Development Server
echo ========================================

cd /d "%~dp0"

REM Check if .env.local exists
if not exist "apps\web\.env.local" (
    echo Creating .env.local from example...
    copy "apps\web\.env.example" "apps\web\.env.local"
    echo.
    echo IMPORTANT: Edit apps/web/.env.local with your database URL!
    echo Press any key to continue...
    pause >nul
)

REM Kill existing processes
echo Killing existing processes...
taskkill /f /im node.exe 2>nul
taskkill /f /im pnpm.exe 2>nul
for /f "tokens=5" %%a in ('netstat -aon ^| find ":3000" ^| find "LISTENING"') do taskkill /f /pid %%a 2>nul

REM Setup database
echo Setting up database...
cd packages/db
if not exist "node_modules" (
    echo Installing database dependencies...
    pnpm install
)
pnpm db:generate
cd ../..

REM Start web app
echo Starting web application...
cd apps/web
if not exist "node_modules" (
    echo Installing web dependencies...
    pnpm install
)

echo.
echo ========================================
echo Starting Next.js on http://localhost:3000
echo Press Ctrl+C to stop
echo ========================================
echo.

pnpm dev