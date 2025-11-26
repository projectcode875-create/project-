@echo off
REM Start Frontend Server - Windows Batch Script
REM This script works even if Node.js is not in PATH

echo ============================================================
echo Starting NewsFlow Frontend Server
echo ============================================================
echo.

cd /d "%~dp0frontend"

REM Check if Node.js exists
if not exist "C:\Program Files\nodejs\node.exe" (
    echo Error: Node.js not found at C:\Program Files\nodejs\
    echo Please reinstall Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo Installing dependencies (if needed)...
"C:\Program Files\nodejs\npm.cmd" install

if errorlevel 1 (
    echo.
    echo Error: Failed to install dependencies
    echo Try running this as Administrator
    pause
    exit /b 1
)

echo.
echo Starting dev server...
echo Frontend will be available at: http://localhost:5173
echo Press Ctrl+C to stop the server
echo.
echo ============================================================
echo.

"C:\Program Files\nodejs\npm.cmd" run dev

pause
