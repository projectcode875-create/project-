# Start Backend Server
# Make sure you've run setup.ps1 first!

Write-Host ('=' * 60) -ForegroundColor Cyan
Write-Host "Starting NewsFlow Backend Server" -ForegroundColor Cyan
Write-Host ('=' * 60) -ForegroundColor Cyan
Write-Host ""

Set-Location -Path "backend"

# Check if venv exists
if (-not (Test-Path "venv\Scripts\python.exe")) {
    Write-Host "✗ Virtual environment not found!" -ForegroundColor Red
    Write-Host "  Please run setup.ps1 first from the project root directory" -ForegroundColor Yellow
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "Activating virtual environment..." -ForegroundColor Yellow
Write-Host "Starting FastAPI server..." -ForegroundColor Yellow
Write-Host ""
Write-Host "Backend will be available at: http://localhost:8000" -ForegroundColor Green
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Gray
Write-Host ""
Write-Host ('=' * 60) -ForegroundColor Cyan
Write-Host ""

# Activate and run
& venv\Scripts\python.exe main.py
