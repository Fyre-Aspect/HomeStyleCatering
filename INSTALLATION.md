# 🔧 Installation & Troubleshooting Guide

## 📋 Prerequisites

Before you begin, make sure you have:

### Required Software
- **Node.js**: Version 18.x or higher
  - Download: https://nodejs.org/
  - Check version: `node --version`
  
- **npm**: Comes with Node.js
  - Check version: `npm --version`

### Optional (but recommended)
- **Git**: For version control
- **VS Code**: For editing code

---

## 🚀 Installation Steps

### Step 1: Verify Node.js Installation

Open PowerShell or Command Prompt and run:

```powershell
node --version
npm --version
```

You should see:
```
v18.x.x (or higher)
9.x.x (or higher)
```

If not installed, download from: https://nodejs.org/

### Step 2: Navigate to Project Directory

```powershell
cd "c:\Users\aamir\Simply Aafiya Website"
```

### Step 3: Install Dependencies

```powershell
npm install
```

This will:
- Download all required packages
- Create `node_modules` folder
- Take 1-3 minutes depending on internet speed

**Expected output**:
```
added 200+ packages
```

### Step 4: Start Development Server

```powershell
npm run dev
```

**Expected output**:
```
  ▲ Next.js 14.x.x
  - Local:        http://localhost:3000
  - Ready in 2.5s
```

### Step 5: Open in Browser

Open your browser and go to:
```
http://localhost:3000
```

You should see the HOMESTYLÉ Catering homepage! 🎉

---

## ❗ Common Issues & Solutions

### Issue 1: "node is not recognized"

**Problem**: Node.js not installed or not in PATH

**Solution**:
1. Download Node.js from https://nodejs.org/
2. Run the installer
3. Restart your terminal
4. Try again

### Issue 2: "npm install" fails

**Problem**: Network issues or permissions

**Solutions**:

**A. Try with clean cache**:
```powershell
npm cache clean --force
npm install
```

**B. Delete node_modules and try again**:
```powershell
Remove-Item -Recurse -Force node_modules
npm install
```

**C. Use different registry** (if corporate network):
```powershell
npm config set registry https://registry.npmjs.org/
npm install
```

### Issue 3: Port 3000 already in use

**Problem**: Another app is using port 3000

**Solution A** - Stop the other app:
```powershell
# Find what's using port 3000
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess

# Kill the process (replace PID with actual number)
Stop-Process -Id PID -Force
```

**Solution B** - Use different port:
```powershell
# Edit package.json, change dev script to:
"dev": "next dev -p 3001"
```

### Issue 4: Module not found errors

**Problem**: Dependencies not installed correctly

**Solution**:
```powershell
# Remove everything and reinstall
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

### Issue 5: TypeScript errors

**Problem**: TypeScript compilation issues

**Solution**:
```powershell
# These are expected before installing dependencies
# After npm install, most should resolve
# Some CSS-related errors are normal in development
```

### Issue 6: Tailwind CSS not working

**Problem**: Styles not applying

**Solution**:
1. Make sure `npm install` completed successfully
2. Restart dev server (Ctrl+C, then `npm run dev`)
3. Clear browser cache (Ctrl+F5)

### Issue 7: Images not loading

**Problem**: Image URLs or Next.js Image config

**Solution**:
1. Check internet connection (placeholder images are from Unsplash)
2. Replace with local images in `/public` folder
3. Update image URLs in `src/data/dishes.ts`

### Issue 8: Build fails

**Problem**: Production build errors

**Check for**:
```powershell
npm run build
```

Common fixes:
- Fix any TypeScript errors shown
- Ensure all imports are correct
- Check for console errors

### Issue 9: "Can't resolve" errors

**Problem**: Import path issues

**Solution**:
- The `@/` paths should work automatically
- If not, check `tsconfig.json` has proper paths configuration
- Restart VS Code and dev server

### Issue 10: Performance is slow

**Solutions**:
- Close other heavy applications
- Use production build: `npm run build` then `npm start`
- Check internet connection (dev server fetches from CDN)
- Disable browser extensions

---

## 🔍 Verification Checklist

After installation, verify:

✅ **Server starts**: `npm run dev` runs without errors
✅ **Homepage loads**: http://localhost:3000 shows hero section
✅ **Navigation works**: Can click Home, Menu, Order
✅ **Menu page loads**: Shows all dishes in grid
✅ **Order page loads**: Shows form
✅ **Mobile menu works**: Click hamburger icon on mobile view
✅ **Carousel works**: Reviews auto-slide
✅ **Styles applied**: Pages look styled (not plain HTML)

---

## 🛠️ Advanced Troubleshooting

### Clear Everything and Start Fresh

If nothing works, nuclear option:

```powershell
# 1. Delete generated files
Remove-Item -Recurse -Force node_modules
Remove-Item -Recurse -Force .next
Remove-Item package-lock.json

# 2. Reinstall
npm install

# 3. Start dev server
npm run dev
```

### Check for Port Conflicts

```powershell
# See what's using port 3000
Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
```

### Verify File Structure

Run this to see if all files are present:
```powershell
Get-ChildItem -Recurse -Path src | Select-Object Name
```

Should show all component files, pages, etc.

### Environment Check

```powershell
# Check Node version
node --version  # Should be 18+

# Check npm version
npm --version   # Should be 9+

# Check if PowerShell needs update
$PSVersionTable.PSVersion  # Should be 5.1+
```

---

## 📝 Development Commands

```powershell
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Update dependencies (careful!)
npm update
```

---

## 🆘 Still Having Issues?

### Check These:

1. **Firewall**: Allow Node.js through Windows Firewall
2. **Antivirus**: Temporarily disable to test
3. **Windows Updates**: Make sure Windows is updated
4. **Disk Space**: Ensure you have 500MB+ free space
5. **Admin Rights**: Try running PowerShell as Administrator

### Collect Debug Info:

```powershell
# Create a debug report
node --version > debug.txt
npm --version >> debug.txt
npm list --depth=0 >> debug.txt
```

### Log Files:

Check for error logs:
- `npm-debug.log`
- `.next/build-manifest.json`

---

## ✅ Success Indicators

You know it's working when:

1. ✅ `npm run dev` shows "Ready in X.Xs"
2. ✅ Browser opens to styled homepage
3. ✅ No red errors in terminal
4. ✅ Navigation links change pages
5. ✅ Images load (though may be placeholders)
6. ✅ Tailwind styles visible (gold colors, etc.)

---

## 🎓 Learning Resources

If you want to customize further:

- **Next.js Docs**: https://nextjs.org/docs
- **React Docs**: https://react.dev/
- **Tailwind CSS**: https://tailwindcss.com/docs
- **TypeScript**: https://www.typescriptlang.org/docs

---

## 🔄 Updating the Project

When you want to update dependencies in the future:

```powershell
# Check for outdated packages
npm outdated

# Update all packages (carefully)
npm update

# Or update specific package
npm install next@latest
```

⚠️ **Warning**: Always test after updating!

---

## 💡 Pro Tips

1. **Use VS Code**: Best editor for this stack
2. **Install Extensions**:
   - ES7+ React/Redux/React-Native snippets
   - Tailwind CSS IntelliSense
   - TypeScript Vue Plugin (Volar)

3. **Hot Reload**: Save file to see changes instantly
4. **Console**: Check browser console for errors (F12)
5. **Network Tab**: Check if resources load (F12 → Network)

---

## 📞 Quick Reference

```powershell
# Project location
cd "c:\Users\aamir\Simply Aafiya Website"

# Quick start
npm install
npm run dev

# Open browser
start http://localhost:3000

# Stop server
Ctrl + C
```

---

## ✨ You're Ready!

If you can run `npm run dev` and see the website at http://localhost:3000, you're all set! 🎉

Next step: Start customizing your content!

See **GETTING_STARTED.md** for what to customize first.
