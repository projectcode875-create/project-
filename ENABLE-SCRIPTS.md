# 🔓 Enable PowerShell Scripts - One-Time Fix

## The Problem

PowerShell scripts are **disabled by default** on Windows for security. You need to enable them once.

---

## ✅ SOLUTION - Enable Scripts (One-Time Setup)

### Method 1: Enable Script Execution (Recommended)

**Run PowerShell as Administrator:**
1. Press `Windows Key`
2. Type "PowerShell"
3. **Right-click** on "Windows PowerShell"
4. Click **"Run as Administrator"**

**In the Administrator PowerShell window, run:**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Press `Y` when asked to confirm.

**Close the Admin PowerShell** and open a normal PowerShell window.

---

### Method 2: Run Backend Manually (Works Immediately)

If you don't want to change execution policy, run the backend directly:

```powershell
# Navigate to backend folder
cd c:\Users\pathao\Desktop\project-\backend

# Run the server directly
venv\Scripts\python.exe main.py
```

The backend will start at **http://localhost:8000**

---

## 🚀 Complete Step-by-Step Guide

### Option A: Using Scripts (After Enabling Execution Policy)

**Step 1: Enable scripts (one time):**
- Open PowerShell as Administrator
- Run: `Set-ExecutionPolicy RemoteSigned -Scope CurrentUser`
- Type `Y` and press Enter

**Step 2: Start backend:**
```powershell
cd c:\Users\pathao\Desktop\project-
.\start-backend.ps1
```

### Option B: Manual Method (No Admin Rights Needed)

**For Backend:**
```powershell
cd c:\Users\pathao\Desktop\project-\backend
venv\Scripts\python.exe main.py
```

**For Frontend (after Node.js installed):**
```powershell
cd c:\Users\pathao\Desktop\project-\frontend
npm run dev
```

---

## 📋 Quick Commands - Copy & Paste

### Start Backend (Manual Method):
```powershell
cd c:\Users\pathao\Desktop\project-\backend
venv\Scripts\python.exe main.py
```

### Start Frontend (Manual Method - after Node.js):
```powershell
cd c:\Users\pathao\Desktop\project-\frontend
npm run dev
```

---

## ✅ What You Should See

**When backend starts successfully:**
```
INFO:     Started server process
INFO:     Uvicorn running on http://0.0.0.0:8000
```

**When frontend starts successfully:**
```
VITE v5.x.x ready in xxx ms
➜  Local:   http://localhost:5173/
```

---

## 🎯 Right Now - Do This:

**Copy and paste this into PowerShell:**

```powershell
cd c:\Users\pathao\Desktop\project-\backend
venv\Scripts\python.exe main.py
```

Press Enter. The backend will start!

---

## 📊 Current Setup Status

```
✅ Python 3.14.0 installed
✅ Backend virtual environment created
✅ Backend dependencies installed
✅ Backend ready to run
⏳ PowerShell execution policy - needs enabling OR use manual method
⏳ Node.js - needs installation for frontend
```

---

**TL;DR:**

Either:
1. **Enable scripts** (Admin PowerShell): `Set-ExecutionPolicy RemoteSigned -Scope CurrentUser`
2. **OR run manually**: `cd backend` then `venv\Scripts\python.exe main.py`
