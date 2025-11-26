# 🚀 Start Frontend - Complete Guide

## ⚠️ IMPORTANT: Restart PowerShell First!

After installing Node.js, you **MUST close and reopen PowerShell** for it to work.

---

## ✅ Step-by-Step Instructions

### Step 1: Close All PowerShell Windows
- Close this PowerShell window
- Close ALL open PowerShell windows

### Step 2: Open a NEW PowerShell Window
- Press `Windows Key`
- Type "PowerShell"
- Click "Windows PowerShell"

### Step 3: Verify Node.js Installation

In the NEW PowerShell window, run:
```powershell
node --version
npm --version
```

**You should see:**
```
v20.x.x  (or similar)
10.x.x   (or similar)
```

If you still see "not recognized", Node.js didn't install correctly.

---

## 🎯 Step 4: Navigate to Frontend Folder

```powershell
cd c:\Users\pathao\Desktop\project-\frontend
```

---

## 📦 Step 5: Install Dependencies (First Time Only)

This downloads all the packages the frontend needs:

```powershell
npm install
```

**This will take 2-5 minutes.** You'll see lots of packages being downloaded.

**Wait for it to complete!** You'll see a message like:
```
added xxx packages in xxs
```

---

## ▶️ Step 6: Start the Frontend Server

```powershell
npm run dev
```

**You should see:**
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
```

---

## 🌐 Step 7: Open in Browser

Open your web browser and go to:
```
http://localhost:5173
```

You should see the NewsFlow application! 🎉

---

## 📋 Full Command Sequence (Copy & Paste)

**After restarting PowerShell:**

```powershell
# Verify Node.js
node --version
npm --version

# Navigate to frontend
cd c:\Users\pathao\Desktop\project-\frontend

# Install dependencies (first time)
npm install

# Start server
npm run dev
```

---

## 🔍 Troubleshooting

### "node is not recognized" after restart

**Solution:** Reinstall Node.js
1. Go to https://nodejs.org/
2. Download the **LTS** version again
3. During installation, make sure you see "Add to PATH" option
4. Complete installation
5. **Restart computer** (not just PowerShell)

### npm install fails

**Try:**
```powershell
# Clear npm cache
npm cache clean --force

# Try installing again
npm install
```

### Port 5173 already in use

**Kill process:**
```powershell
Get-Process -Id (Get-NetTCPConnection -LocalPort 5173).OwningProcess | Stop-Process -Force
```

---

## 📊 What Each Command Does

| Command | What It Does |
|---------|--------------|
| `node --version` | Checks if Node.js is installed |
| `npm --version` | Checks if npm is installed |
| `cd frontend` | Go to frontend folder |
| `npm install` | Download all dependencies |
| `npm run dev` | Start the development server |

---

## ✅ Success Checklist

- [ ] Closed all PowerShell windows
- [ ] Opened NEW PowerShell window
- [ ] Verified `node --version` works
- [ ] Navigated to frontend folder
- [ ] Ran `npm install` successfully
- [ ] Ran `npm run dev` successfully
- [ ] Opened http://localhost:5173 in browser
- [ ] Can see NewsFlow application!

---

## 🎯 Right Now - Do This:

1. **Close this PowerShell window**
2. **Open a NEW PowerShell window**
3. **Copy and paste:**

```powershell
cd c:\Users\pathao\Desktop\project-\frontend
npm install
npm run dev
```

4. **Open browser:** http://localhost:5173

---

## 🎊 Final Setup

**Keep BOTH servers running:**

**Terminal 1 - Backend:**
```powershell
cd c:\Users\pathao\Desktop\project-\backend
venv\Scripts\python.exe main.py
```
Running on http://localhost:8000 ✅

**Terminal 2 - Frontend:**
```powershell
cd c:\Users\pathao\Desktop\project-\frontend
npm run dev
```
Running on http://localhost:5173 ⏳

**Browser:**
Open http://localhost:5173 to use the app!
