# Start Frontend Server
# Make sure you've run setup.ps1 first!

Write-Host ('=' * 60) -ForegroundColor Cyan
Write-Host "Starting NewsFlow Frontend Server" -ForegroundColor Cyan
Write-Host ('=' * 60) -ForegroundColor Cyan
Write-Host ""

Set-Location -Path "frontend"

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "✗ Dependencies not installed!" -ForegroundColor Red
    Write-Host "  Please run setup.ps1 first from the project root directory" -ForegroundColor Yellow
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "Starting Vite development server..." -ForegroundColor Yellow
Write-Host ""
Write-Host "Frontend will be available at: http://localhost:5173" -ForegroundColor Green
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Gray
Write-Host ""
Write-Host ('=' * 60) -ForegroundColor Cyan
Write-Host ""

# Run dev server
& npm run dev
