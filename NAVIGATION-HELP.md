# 🧭 Navigation Error - You're Already in Backend!

## The Problem

You ran `cd backend` but you're **already in the backend directory**, so PowerShell is looking for `backend\backend` which doesn't exist.

---

## ✅ Solution: Go Back to Project Root First

```powershell
# Go back to project root
cd c:\Users\pathao\Desktop\project-

# Check where you are
pwd

# Now you can navigate properly
cd backend  # This will work now!
```

---

## 🎯 Correct Way to Start Servers

### **Option 1: Use the Start Scripts (EASIEST)**

These scripts handle navigation for you:

```powershell
# Make sure you're in the project root
cd c:\Users\pathao\Desktop\project-

# Start backend
.\start-backend.ps1

# In a NEW PowerShell window, start frontend (after installing Node.js)
.\start-frontend.ps1
```

### **Option 2: Manual Navigation**

**For Backend:**
```powershell
# Start from project root
cd c:\Users\pathao\Desktop\project-

# Go into backend
cd backend

# Run the server
venv\Scripts\python.exe main.py
```

**For Frontend (after installing Node.js):**
```powershell
# Start from project root
cd c:\Users\pathao\Desktop\project-

# Go into frontend
cd frontend

# Run the server
npm run dev
```

---

## 🗺️ Project Directory Structure

```
c:\Users\pathao\Desktop\project-\     ← PROJECT ROOT (start here!)
│
├── backend\                          ← Backend folder
│   ├── venv\                        ← Virtual environment
│   ├── main.py                      ← Backend server file
│   └── requirements.txt
│
├── frontend\                         ← Frontend folder
│   ├── node_modules\                ← Will be created after npm install
│   ├── src\
│   └── package.json
│
├── setup.ps1                         ← Setup script
├── start-backend.ps1                 ← Backend launcher
└── start-frontend.ps1                ← Frontend launcher
```

---

## 🚨 Common Navigation Mistakes

| ❌ Wrong | ✅ Correct |
|---------|----------|
| Already in `backend\`, run `cd backend` | Go to root first: `cd c:\Users\pathao\Desktop\project-` |
| Run `.\start-backend.ps1` from inside `backend\` | Run from project root |
| Use absolute paths inside folders | Navigate to parent/root first |

---

## 💡 Quick Commands Reference

```powershell
# Check current location
pwd

# Go to project root (run this anytime you're lost!)
cd c:\Users\pathao\Desktop\project-

# List files in current directory
ls

# Go back one directory
cd ..

# Start backend (from project root)
.\start-backend.ps1

# Start frontend (from project root, after Node.js installed)
.\start-frontend.ps1
```

---

## 🎯 Right Now - Do This

**Step 1:** Go to project root
```powershell
cd c:\Users\pathao\Desktop\project-
```

**Step 2:** Start backend
```powershell
.\start-backend.ps1
```

**That's it!** The script handles everything else.

---

## 📍 Rule of Thumb

**Always start from the project root:**
- `c:\Users\pathao\Desktop\project-`

The start scripts will navigate to the correct folders automatically!

---

**TL;DR:** Run this command first:
```powershell
cd c:\Users\pathao\Desktop\project-
```

Then you can use `.\start-backend.ps1` or navigate into backend/frontend folders correctly.
