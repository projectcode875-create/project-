# NewsFlow - Windows Setup Guide

## Quick Start (3 Steps)

### 1️⃣ Install Prerequisites

**Python 3.9+**
- Download: https://www.python.org/downloads/
- ⚠️ During installation, check **"Add Python to PATH"**

**Node.js 20.19+**
- Download: https://nodejs.org/ (get the LTS version)
- Install with default options

### 2️⃣ Run Automated Setup

Open PowerShell in the project directory and run:

```powershell
.\setup.ps1
```

This will:
- Create a Windows-compatible virtual environment
- Install all Python dependencies
- Install all npm dependencies

### 3️⃣ Start the Servers

**Terminal 1 - Backend:**
```powershell
.\start-backend.ps1
```

**Terminal 2 - Frontend:**
```powershell
.\start-frontend.ps1
```

Then open your browser to: **http://localhost:5173**

---

## Manual Setup (If Scripts Don't Work)

### Backend Setup

```powershell
cd backend

# Remove old venv (if exists)
Remove-Item -Recurse -Force venv

# Create new venv
python -m venv venv

# Activate venv
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run server
python main.py
```

### Frontend Setup

```powershell
cd frontend

# Install dependencies
npm install

# Run dev server
npm run dev
```

---

## Troubleshooting

### Script Execution Policy Error

If you see `cannot be loaded because running scripts is disabled`:

```powershell
# Run PowerShell as Administrator and execute:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Port Already in Use

**Kill process on port 8000 (backend):**
```powershell
Get-Process -Id (Get-NetTCPConnection -LocalPort 8000).OwningProcess | Stop-Process -Force
```

**Kill process on port 5173 (frontend):**
```powershell
Get-Process -Id (Get-NetTCPConnection -LocalPort 5173).OwningProcess | Stop-Process -Force
```

### Python Not Found

- Ensure Python is installed
- Restart PowerShell after installation
- Verify: `python --version`

### Node Not Found

- Ensure Node.js is installed  
- Restart PowerShell after installation
- Verify: `node --version`

---

## Project Overview

NewsFlow is a personalized news recommendation system that:
- Scrapes real-time news from OnlineKhabar (Nepal's #1 news portal)
- Uses **TF-IDF** and **Cosine Similarity** for content-based filtering
- Provides personalized article recommendations based on your reading history
- Supports both English and Nepali content

### How It Works

1. **Browse Articles**: View latest news in the "Latest News" section
2. **Mark as Read**: Click articles to mark them as read
3. **Get Recommendations**: System analyzes your reading pattern and suggests similar articles
4. **Continuous Learning**: The more you read, the better the recommendations

### Tech Stack

- **Backend**: Python, FastAPI, scikit-learn, BeautifulSoup4
- **Frontend**: React, Vite, Vanilla CSS
- **Algorithm**: TF-IDF Vectorization + Cosine Similarity

---

## API Endpoints

- `GET /` - Health check
- `GET /articles` - Fetch all articles
- `POST /recommend` - Get personalized recommendations
- `GET /refresh-articles` - Force refresh from OnlineKhabar

---

## Project Structure

```
project-/
├── setup.ps1              # Automated setup script
├── start-backend.ps1      # Start backend server
├── start-frontend.ps1     # Start frontend server
├── backend/
│   ├── main.py           # FastAPI application
│   ├── recommender.py    # TF-IDF recommendation engine
│   ├── scraper.py        # Web scraping module
│   ├── data.py           # Fallback mock data
│   └── requirements.txt  # Python dependencies
└── frontend/
    ├── src/
    │   ├── App.jsx       # Main application
    │   ├── components/   # Reusable components
    │   └── index.css     # Dark mode styling
    ├── package.json      # Node dependencies
    └── vite.config.js    # Vite configuration
```

---

## Development

See the main [README.md](README.md) for detailed technical documentation.

For questions or issues, check the troubleshooting section or refer to [document.txt](document.txt) for detailed technical specifications.

---

**Enjoy personalized news recommendations! 📰🎯**
