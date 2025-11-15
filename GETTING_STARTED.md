# HOMESTYLÉ Catering Website - Quick Start Guide

## ✨ What You Have

A complete, production-ready website with:
- **Home Page**: Hero, featured dishes, reviews carousel, our story
- **Menu Page**: All dishes in a beautiful grid
- **Order Page**: Comprehensive order form
- **Fully Responsive**: Works on mobile, tablet, and desktop
- **Modern Design**: Beautiful UI with animations

## 🚀 How to Run

### Option 1: Using the Batch File (Windows)
Double-click `start.bat` in the project folder.

### Option 2: Using Command Line

1. Open PowerShell or Command Prompt
2. Navigate to the project folder:
   ```
   cd "c:\Users\aamir\Simply Aafiya Website"
   ```
3. Install dependencies (first time only):
   ```
   npm install
   ```
4. Start the development server:
   ```
   npm run dev
   ```
5. Open your browser to: http://localhost:3000

## 📝 What to Customize

### 1. Dishes (src/data/dishes.ts)
Add, remove, or modify your dishes:
```typescript
{
  id: 'unique-id',
  name: 'Dish Name',
  description: 'Description...',
  image: 'https://your-image-url.jpg',
  category: 'Main Course',
  featured: true,  // Shows on home page
}
```

### 2. Reviews (src/data/reviews.ts)
Add customer reviews:
```typescript
{
  id: '1',
  name: 'Customer Name',
  rating: 5,
  text: 'Review text...',
  date: '2024-11-14',
}
```

### 3. Contact Info
Update in these files:
- `src/components/Footer.tsx` - Footer contact details
- `src/components/OrderForm.tsx` - Phone number

### 4. Images
Replace placeholder images with your actual dish photos in `src/data/dishes.ts`

### 5. Colors
Edit `tailwind.config.js` to change the color scheme

## 🎯 Next Steps

1. **Run the website** - See it in action!
2. **Add your real dishes** - Update the data files
3. **Add real images** - Replace placeholder images
4. **Update contact info** - Add your phone and email
5. **Test on mobile** - Check responsiveness
6. **Deploy** - Use Vercel, Netlify, or your preferred host

## 🔧 Backend Integration (Future)

The order form currently shows an alert. To make it send real emails:

1. Create a Next.js API route
2. Integrate an email service (SendGrid, Resend, etc.)
3. Update the form submission in `OrderForm.tsx`

See `src/utils/sendOrder.ts` for placeholder functions.

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🌐 Deploy

Easy deployment options:
- **Vercel**: `npm i -g vercel && vercel`
- **Netlify**: Connect your GitHub repo
- **Others**: Build and upload the `.next` folder

## ❓ Need Help?

Check the README.md for detailed documentation.

---

**Enjoy your new website! 🎉**
