@echo off
setlocal enabledelayedexpansion

REM ================================================================
REM ASP Afrique - Database Restore Script
REM ================================================================
REM Usage: db-restore.bat <backup_file.sql>
REM Example: db-restore.bat backups\backup_20260129.sql
REM ================================================================

REM Configuration
set DB_NAME=aspci_afrique_db
set DB_USER=postgres
set DB_HOST=localhost
set DB_PORT=5432
set PGPASSWORD=mysecretpassword

REM Check if backup file is provided
if "%~1"=="" (
    echo.
    echo ================================================================
    echo   ASP Afrique - Database Restore
    echo ================================================================
    echo.
    echo   ERROR: No backup file specified!
    echo.
    echo   Usage: db-restore.bat ^<backup_file.sql^>
    echo.
    echo   Available backups:
    echo.
    if exist "%~dp0backups" (
        dir /b "%~dp0backups\*.sql" 2>nul
        if !ERRORLEVEL! neq 0 echo   (No backups found in backups folder)
    ) else (
        echo   (backups folder does not exist)
    )
    echo.
    exit /b 1
)

set BACKUP_FILE=%~1

REM Check if backup file exists
if not exist "%BACKUP_FILE%" (
    echo.
    echo ERROR: Backup file not found: %BACKUP_FILE%
    echo.
    exit /b 1
)

echo.
echo ================================================================
echo   ASP Afrique - Database Restore
echo ================================================================
echo.
echo   Database: %DB_NAME%
echo   Host:     %DB_HOST%:%DB_PORT%
echo   Backup:   %BACKUP_FILE%
echo.
echo ================================================================
echo.
echo   WARNING: This will REPLACE all data in the database!
echo.
echo ================================================================
echo.

set /p CONFIRM=Are you sure you want to continue? (yes/no):

if /i not "%CONFIRM%"=="yes" (
    echo.
    echo Restore cancelled.
    exit /b 0
)

REM Check if psql is available
where psql >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo.
    echo ERROR: psql not found in PATH
    echo Please ensure PostgreSQL is installed and psql is in your PATH
    echo.
    echo Typical location: C:\Program Files\PostgreSQL\XX\bin
    echo Add this to your PATH environment variable
    exit /b 1
)

echo.
echo Step 1/3: Creating pre-restore backup...
call "%~dp0db-backup.bat" pre-restore

echo.
echo Step 2/3: Dropping existing tables...

REM Drop all tables in the public schema
psql -h %DB_HOST% -p %DB_PORT% -U %DB_USER% -d %DB_NAME% -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public; GRANT ALL ON SCHEMA public TO postgres; GRANT ALL ON SCHEMA public TO public;"

if %ERRORLEVEL% neq 0 (
    echo.
    echo WARNING: Could not drop schema. Continuing anyway...
)

echo.
echo Step 3/3: Restoring from backup...

psql -h %DB_HOST% -p %DB_PORT% -U %DB_USER% -d %DB_NAME% -f "%BACKUP_FILE%"

if %ERRORLEVEL% equ 0 (
    echo.
    echo ================================================================
    echo   RESTORE SUCCESSFUL!
    echo ================================================================
    echo.
    echo   Database has been restored from: %BACKUP_FILE%
    echo.
    echo   A pre-restore backup was created in the backups folder.
    echo.
) else (
    echo.
    echo ================================================================
    echo   RESTORE COMPLETED WITH WARNINGS
    echo ================================================================
    echo.
    echo   Some errors may have occurred during restore.
    echo   Please verify your data.
    echo.
    echo   A pre-restore backup was created in the backups folder
    echo   in case you need to revert.
    echo.
)

endlocal
