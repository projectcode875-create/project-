# 🛑 STOP! Don't Use "source" Command on Windows

## ❌ THIS DOES NOT WORK ON WINDOWS:
```bash
source venv/bin/activate    ← This is Mac/Linux ONLY!
```

---

## ✅ COPY AND PASTE THESE COMMANDS INSTEAD:

### Step 1: Open PowerShell and Navigate to Project

```powershell
cd c:\Users\pathao\Desktop\project-
```

### Step 2: Start the Backend Server

```powershell
.\start-backend.ps1
```

**That's it!** The server will start automatically.

---

## 🎯 Complete Copy-Paste Commands

**Copy this entire block and paste into PowerShell:**

```powershell
# Go to project directory
cd c:\Users\pathao\Desktop\project-

# Start backend server
.\start-backend.ps1
```

**Press Enter** and the backend will start!

---

## 📱 If You See "Execution Policy" Error

If you get an error about scripts being disabled, run this **once** (as Administrator):

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Then try `.\start-backend.ps1` again.

---

## 🔥 What's Happening Behind the Scenes

The `start-backend.ps1` script automatically:
1. ✅ Navigates to `backend` folder
2. ✅ Activates the virtual environment (Windows way)
3. ✅ Runs `python main.py`

You don't need to type `source` or `activate` manually!

---

## 📋 Command Comparison

| Platform | Activation Command |
|----------|-------------------|
| **Windows (YOU!)** | `.\start-backend.ps1` ✅ |
| Mac/Linux | `source venv/bin/activate` |

**You are on Windows, so use the Windows command!**

---

## 🚀 Complete Startup Process

**Terminal 1 - Backend:**
```powershell
cd c:\Users\pathao\Desktop\project-
.\start-backend.ps1
```
✅ Backend runs on http://localhost:8000

**Terminal 2 - Frontend (after installing Node.js):**
```powershell
cd c:\Users\pathao\Desktop\project-
.\start-frontend.ps1
```
✅ Frontend runs on http://localhost:5173

---

## ⚠️ DON'T TYPE THESE (They don't work on Windows):
- ❌ `source venv/bin/activate`
- ❌ `venv/bin/activate`
- ❌ Any command with `source`
- ❌ Any path with forward slashes `/` for activation

## ✅ TYPE THIS INSTEAD:
- ✅ `.\start-backend.ps1`

---

## 💡 Right Now - Do This Exactly:

1. Open PowerShell
2. Type: `cd c:\Users\pathao\Desktop\project-`
3. Press Enter
4. Type: `.\start-backend.ps1`
5. Press Enter
6. ✅ Backend server will start!

**That's all you need!**
