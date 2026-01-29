@echo off
title ASP Afrique - Development Server
echo ============================================
echo    ASP Afrique - Starting Development Mode
echo ============================================
echo.

echo Generating Prisma client...
cd packages\db
call pnpm prisma generate
cd ..\..

echo.
echo Frontend will be available at: http://localhost:3000
echo API will be available at: http://localhost:3004
echo.
echo Press Ctrl+C to stop the servers
echo ============================================
echo.

pnpm dev
