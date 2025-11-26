# NewsFlow - Quick Setup Script for Windows
# Run this script after installing Python and Node.js

Write-Host ('=' * 80) -ForegroundColor Cyan
Write-Host "NewsFlow - Automated Setup Script" -ForegroundColor Cyan
Write-Host ('=' * 80) -ForegroundColor Cyan
Write-Host ""

# Check prerequisites
Write-Host "[1/6] Checking prerequisites..." -ForegroundColor Yellow

try {
    $pythonVersion = & python --version 2>&1
    Write-Host "  ✓ Python found: $pythonVersion" -ForegroundColor Green
}
catch {
    Write-Host "  ✗ Python not found. Please install Python 3.9+ from python.org" -ForegroundColor Red
    Write-Host "    Download: https://www.python.org/downloads/" -ForegroundColor Yellow
    exit 1
}

try {
    $nodeVersion = & node --version 2>&1
    Write-Host "  ✓ Node.js found: $nodeVersion" -ForegroundColor Green
}
catch {
    Write-Host "  ✗ Node.js not found. Please install Node.js 20.19+ from nodejs.org" -ForegroundColor Red
    Write-Host "    Download: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

Write-Host ""

# Setup Backend
Write-Host "[2/6] Setting up backend virtual environment..." -ForegroundColor Yellow
Set-Location -Path "backend"

# Remove old venv if it exists
if (Test-Path "venv") {
    Write-Host "  - Removing old virtual environment..." -ForegroundColor Gray
    Remove-Item -Recurse -Force "venv"
}

# Create new venv
Write-Host "  - Creating Windows virtual environment..." -ForegroundColor Gray
& python -m venv venv

if ($LASTEXITCODE -ne 0) {
    Write-Host "  ✗ Failed to create virtual environment" -ForegroundColor Red
    exit 1
}

Write-Host "  ✓ Virtual environment created" -ForegroundColor Green
Write-Host ""

# Install Python dependencies
Write-Host "[3/6] Installing Python dependencies..." -ForegroundColor Yellow
& venv\Scripts\pip install -r requirements.txt

if ($LASTEXITCODE -ne 0) {
    Write-Host "  ✗ Failed to install Python dependencies" -ForegroundColor Red
    exit 1
}

Write-Host "  ✓ Python dependencies installed" -ForegroundColor Green
Write-Host ""

# Setup Frontend
Write-Host "[4/6] Installing frontend dependencies..." -ForegroundColor Yellow
Set-Location -Path "..\frontend"

& npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "  ✗ Failed to install npm dependencies" -ForegroundColor Red
    exit 1
}

Write-Host "  ✓ Frontend dependencies installed" -ForegroundColor Green
Write-Host ""

# Return to project root
Set-Location -Path ".."

Write-Host "[5/6] Setup complete!" -ForegroundColor Green
Write-Host ""

# Display next steps
Write-Host "[6/6] How to run the application:" -ForegroundColor Yellow
Write-Host ""
Write-Host "  TERMINAL 1 - Backend Server:" -ForegroundColor Cyan
Write-Host "  ----------------------------" -ForegroundColor Gray
Write-Host "  cd backend" -ForegroundColor White
Write-Host "  venv\Scripts\activate" -ForegroundColor White
Write-Host "  python main.py" -ForegroundColor White
Write-Host ""
Write-Host "  TERMINAL 2 - Frontend Server:" -ForegroundColor Cyan
Write-Host "  -----------------------------" -ForegroundColor Gray
Write-Host "  cd frontend" -ForegroundColor White
Write-Host "  npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "  Then open your browser to: http://localhost:5173" -ForegroundColor Green
Write-Host ""
Write-Host ('=' * 80) -ForegroundColor Cyan
Write-Host "Setup complete." -ForegroundColor Green
Write-Host ('=' * 80) -ForegroundColor Cyan
