# "Read Full Article" Button Not Working - Troubleshooting

## Quick Fixes

### Fix 1: Hard Refresh Browser (Most Common)
Press **Ctrl + Shift + R** (or **Ctrl + F5**) to force reload the page with new JavaScript.

### Fix 2: Clear Cache
1. Press **F12** to open Developer Tools
2. **Right-click** the refresh button
3. Select **"Empty Cache and Hard Reload"**

### Fix 3: Check for JavaScript Errors
1. Press **F12** to open Developer Tools
2. Click **"Console"** tab
3. Look for **red error messages**
4. Take a screenshot and share if you see errors

### Fix 4: Verify Frontend Server
Make sure frontend is running:
```powershell
# Check if running on port 5173
Test-NetConnection -ComputerName localhost -Port 5173
```

If NOT running, restart frontend:
```powershell
cd c:\Users\pathao\Desktop\project-\frontend
cmd /c 'set PATH=C:\Program Files\nodejs;%PATH% && npm run dev'
```

---

## What Should Happen

When working correctly:
1. **See** "Read Full Article" button on each card
2. **Click** button
3. **Modal opens** with full article content
4. **Click × or outside** to close

---

## Test Steps

1. **Open:** http://localhost:5173
2. **Hard refresh:** Press **Ctrl + Shift + R**
3. **Look for** blue "Read Full Article" button on article cards
4. **Click** the button
5. **Modal should open** with full content

---

## If Still Not Working

**Check these:**
- [ ] Did you hard refresh? (Ctrl + Shift + R)
- [ ] Is there a "Read Full Article" button visible?
- [ ] Does clicking it do nothing?
- [ ] Are there errors in browser Console (F12)?

**Most likely cause:** Browser cached old JavaScript - **hard refresh fixes it!**
