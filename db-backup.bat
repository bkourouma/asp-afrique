@echo off
setlocal enabledelayedexpansion

REM ================================================================
REM ASP Afrique - Database Backup Script
REM ================================================================
REM Usage: db-backup.bat [backup_name]
REM Example: db-backup.bat pre-update
REM ================================================================

REM Configuration
set DB_NAME=aspci_afrique_db
set DB_USER=postgres
set DB_HOST=localhost
set DB_PORT=5432
set PGPASSWORD=mysecretpassword
set BACKUP_DIR=%~dp0backups

REM Create backup directory if it doesn't exist
if not exist "%BACKUP_DIR%" mkdir "%BACKUP_DIR%"

REM Generate backup filename
set TIMESTAMP=%date:~6,4%%date:~3,2%%date:~0,2%_%time:~0,2%%time:~3,2%%time:~6,2%
set TIMESTAMP=%TIMESTAMP: =0%
set TIMESTAMP=%TIMESTAMP::=%

if "%~1"=="" (
    set BACKUP_NAME=backup_%TIMESTAMP%
) else (
    set BACKUP_NAME=%~1_%TIMESTAMP%
)

set BACKUP_FILE=%BACKUP_DIR%\%BACKUP_NAME%.sql

echo.
echo ================================================================
echo   ASP Afrique - Database Backup
echo ================================================================
echo.
echo   Database: %DB_NAME%
echo   Host:     %DB_HOST%:%DB_PORT%
echo   Output:   %BACKUP_FILE%
echo.
echo ================================================================
echo.

REM Check if pg_dump is available
where pg_dump >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo ERROR: pg_dump not found in PATH
    echo Please ensure PostgreSQL is installed and pg_dump is in your PATH
    echo.
    echo Typical location: C:\Program Files\PostgreSQL\XX\bin
    echo Add this to your PATH environment variable
    exit /b 1
)

echo Creating backup...
echo.

REM Create the backup using pg_dump
pg_dump -h %DB_HOST% -p %DB_PORT% -U %DB_USER% -d %DB_NAME% -F p -f "%BACKUP_FILE%" --no-owner --no-acl

if %ERRORLEVEL% equ 0 (
    echo.
    echo ================================================================
    echo   BACKUP SUCCESSFUL!
    echo ================================================================
    echo.
    echo   File: %BACKUP_FILE%
    for %%A in ("%BACKUP_FILE%") do echo   Size: %%~zA bytes
    echo.
    echo   To restore this backup, run:
    echo   db-restore.bat "%BACKUP_FILE%"
    echo.
) else (
    echo.
    echo ================================================================
    echo   BACKUP FAILED!
    echo ================================================================
    echo.
    echo   Please check:
    echo   - PostgreSQL is running
    echo   - Database credentials are correct
    echo   - Database exists
    echo.
    exit /b 1
)

endlocal
