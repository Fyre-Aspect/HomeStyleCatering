# ⚡ Quick Reference Card

## 🚀 Quick Start (First Time)

```powershell
cd "c:\Users\aamir\Simply Aafiya Website"
npm install
npm run dev
```

Open: http://localhost:3000

---

## 📁 File Locations

| What to Edit | File Path |
|-------------|-----------|
| **Dishes** | `src/data/dishes.ts` |
| **Reviews** | `src/data/reviews.ts` |
| **Footer Contact** | `src/components/Footer.tsx` |
| **Order Phone** | `src/components/OrderForm.tsx` |
| **Colors** | `tailwind.config.js` |
| **Home Page** | `src/app/page.tsx` |
| **Menu Page** | `src/app/menu/page.tsx` |
| **Order Page** | `src/app/order/page.tsx` |

---

## 💻 Common Commands

```powershell
# Start development server
npm run dev

# Build for production
npm run build

# Run production server
npm start

# Stop server
Ctrl + C

# Reinstall dependencies
Remove-Item -Recurse -Force node_modules
npm install
```

---

## 🎨 Quick Customization

### Add a New Dish

**File**: `src/data/dishes.ts`

```typescript
{
  id: 'unique-dish-id',
  name: 'Dish Name',
  description: 'Brief description...',
  image: 'https://image-url.jpg',
  category: 'Main Course',
  featured: true,  // Shows on home page
}
```

### Add a Review

**File**: `src/data/reviews.ts`

```typescript
{
  id: 'unique-id',
  name: 'Customer Name',
  rating: 5,
  text: 'Their review...',
  date: '2024-11-14',
}
```

### Change Phone Number

**Files**: 
- `src/components/Footer.tsx` (line ~30)
- `src/components/OrderForm.tsx` (line ~90)

Replace: `(555) 123-4567`

---

## 🌐 Pages

| Page | URL | File |
|------|-----|------|
| Home | `/` | `src/app/page.tsx` |
| Menu | `/menu` | `src/app/menu/page.tsx` |
| Order | `/order` | `src/app/order/page.tsx` |

---

## 🧩 Components

| Component | Purpose | Location |
|-----------|---------|----------|
| Navbar | Navigation | `src/components/Navbar.tsx` |
| Footer | Footer info | `src/components/Footer.tsx` |
| Hero | Hero section | `src/components/Hero.tsx` |
| DishCard | Dish display | `src/components/DishCard.tsx` |
| Carousel | Reviews slider | `src/components/Carousel.tsx` |
| OrderForm | Order form | `src/components/OrderForm.tsx` |
| Button | Reusable button | `src/components/Button.tsx` |

---

## 🎨 Color Variables

**File**: `tailwind.config.js`

```javascript
gold: {
  500: '#eab308',  // Main gold
  600: '#ca8a04',  // Darker gold
  700: '#a16207',  // Even darker
}
warmBrown: {
  900: '#43302b',  // Dark brown
  800: '#846358',  // Medium brown
  600: '#bfa094',  // Light brown
}
deepRed: {
  600: '#b91c1c',  // Main red
}
```

---

## 🐛 Quick Fixes

### Server won't start
```powershell
Remove-Item -Recurse -Force node_modules
npm install
npm run dev
```

### Port already in use
```powershell
# Use different port
npm run dev -- -p 3001
```

### Changes not showing
```powershell
# Hard refresh browser
Ctrl + Shift + R

# Or restart server
Ctrl + C
npm run dev
```

### Build errors
```powershell
Remove-Item -Recurse -Force .next
npm run build
```

---

## 📊 Project Stats

- **Pages**: 3 (Home, Menu, Order)
- **Components**: 10 reusable components
- **Lines of Code**: ~2,000+
- **Technologies**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Features**: Responsive, SEO-ready, accessible

---

## ✅ Pre-Launch Checklist

- [ ] Update all dishes in `dishes.ts`
- [ ] Add real images
- [ ] Update contact information
- [ ] Test on mobile
- [ ] Test all links
- [ ] Test order form
- [ ] Set up backend (optional)
- [ ] Deploy to hosting

---

## 🚀 Deploy Commands

### Vercel (Recommended)
```powershell
npm i -g vercel
vercel
```

### Build for production
```powershell
npm run build
```

---

## 📱 Test URLs

After starting dev server:

- **Home**: http://localhost:3000
- **Menu**: http://localhost:3000/menu
- **Order**: http://localhost:3000/order

---

## 🆘 Help

- **Installation issues**: See `INSTALLATION.md`
- **Customization guide**: See `GETTING_STARTED.md`
- **Pre-launch**: See `LAUNCH_CHECKLIST.md`
- **Full docs**: See `README.md`
- **Visual guide**: See `VISUAL_STRUCTURE.md`

---

## 🎯 Important Notes

1. **Always run `npm install` first** (only needed once)
2. **Use `npm run dev` for development** (see live changes)
3. **Use `npm run build` before deploying** (optimize for production)
4. **Keep terminal open while developing** (don't close it!)
5. **Save files to see changes** (hot reload enabled)

---

## 💡 Keyboard Shortcuts (VS Code)

- **Ctrl + Shift + P**: Command palette
- **Ctrl + `**: Open terminal
- **Ctrl + B**: Toggle sidebar
- **Alt + Click**: Multiple cursors
- **Ctrl + /**: Comment/uncomment

---

## 🔗 Useful Links

- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com
- **React Docs**: https://react.dev
- **Node.js**: https://nodejs.org

---

## 📞 Emergency Restart

If everything breaks:

```powershell
# 1. Stop server
Ctrl + C

# 2. Clean everything
Remove-Item -Recurse -Force node_modules
Remove-Item -Recurse -Force .next
Remove-Item package-lock.json

# 3. Reinstall
npm install

# 4. Restart
npm run dev
```

---

## ✨ That's It!

Save this file for quick reference while developing.

**To start working**: 
1. Open terminal
2. Run `npm run dev`
3. Open http://localhost:3000
4. Start editing files!

🎉 **Happy coding!**
