@echo off
REM Start Backend Server - Windows Batch Script

echo ============================================================
echo Starting NewsFlow Backend Server
echo ============================================================
echo.

cd /d "%~dp0backend"

if not exist "venv\Scripts\python.exe" (
    echo Error: Virtual environment not found!
    echo Please run setup.bat first
    pause
    exit /b 1
)

echo Starting FastAPI server...
echo Backend will be available at: http://localhost:8000
echo Press Ctrl+C to stop the server
echo.
echo ============================================================
echo.

venv\Scripts\python.exe main.py

pause
