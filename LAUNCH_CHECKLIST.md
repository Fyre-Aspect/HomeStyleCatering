# 🚀 Pre-Launch Checklist for HOMESTYLÉ Catering Website

Use this checklist before launching your website to production.

## ✅ Content Updates

### Dishes
- [ ] Replace placeholder images with real dish photos
- [ ] Update dish names if needed
- [ ] Update dish descriptions
- [ ] Set correct featured dishes
- [ ] Add all menu items you want to display

**File**: `src/data/dishes.ts`

### Reviews
- [ ] Add real customer reviews (if available)
- [ ] Update customer names
- [ ] Update review dates
- [ ] Add more reviews if available

**File**: `src/data/reviews.ts`

### Contact Information
- [ ] Update phone number in Footer
- [ ] Update phone number in Order page
- [ ] Update email address in Footer
- [ ] Update business address/location
- [ ] Update hours of operation

**Files**: 
- `src/components/Footer.tsx`
- `src/components/OrderForm.tsx`

### Business Information
- [ ] Update business name (if needed)
- [ ] Update tagline/subtitle
- [ ] Update "Our Story" section content
- [ ] Check all text for accuracy

**File**: `src/app/page.tsx`

## 🎨 Branding & Design

### Logo
- [ ] Add custom logo (or keep text logo)
- [ ] Ensure logo works on mobile
- [ ] Update favicon (add to `/public` folder)

**File**: `src/components/Navbar.tsx`

### Colors
- [ ] Review color scheme
- [ ] Adjust if needed to match brand

**File**: `tailwind.config.js`

### Images
- [ ] Optimize all images for web
- [ ] Ensure images load quickly
- [ ] Use proper image formats (WebP recommended)
- [ ] Add alt text for accessibility

## 🔧 Technical Setup

### Dependencies
- [ ] Run `npm install` to install all packages
- [ ] Test that everything works locally
- [ ] Run `npm run build` to check for errors

### Environment Variables
- [ ] Create `.env.local` if using API keys
- [ ] Add email service credentials (when ready)
- [ ] Never commit `.env.local` to git

### Testing
- [ ] Test on desktop browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test on mobile devices (iOS, Android)
- [ ] Test on tablet
- [ ] Test all navigation links
- [ ] Test order form submission
- [ ] Test mobile menu
- [ ] Test carousel auto-slide
- [ ] Verify all images load

### SEO & Metadata
- [ ] Update meta descriptions
- [ ] Add Open Graph images
- [ ] Test with Google's Rich Results Test
- [ ] Add Google Analytics (optional)
- [ ] Submit sitemap to Google Search Console

**Files**: 
- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/menu/page.tsx`
- `src/app/order/page.tsx`

### Performance
- [ ] Run Lighthouse audit
- [ ] Optimize images if needed
- [ ] Check page load times
- [ ] Enable caching on hosting

## 📧 Backend Integration

### Email Setup (for order notifications)
- [ ] Choose email service (SendGrid, Resend, etc.)
- [ ] Create account and get API keys
- [ ] Create Next.js API route
- [ ] Update OrderForm.tsx to use API
- [ ] Test email sending
- [ ] Set up email templates

**Reference**: `src/utils/sendOrder.ts`

### Optional: Database
- [ ] Set up database (if storing orders)
- [ ] Create orders table/collection
- [ ] Set up database connection
- [ ] Test database writes

### Optional: SMS Notifications
- [ ] Set up Twilio or similar
- [ ] Implement SMS sending
- [ ] Test SMS delivery

## 🌐 Deployment

### Pre-Deployment
- [ ] Run `npm run build` successfully
- [ ] Fix any build errors
- [ ] Test production build locally (`npm start`)
- [ ] Review all pages one final time

### Hosting Setup
- [ ] Choose hosting platform (Vercel, Netlify, etc.)
- [ ] Create account
- [ ] Connect repository (if using Git)
- [ ] Configure build settings
- [ ] Set environment variables on hosting
- [ ] Deploy!

### Domain Setup
- [ ] Register domain name (if needed)
- [ ] Configure DNS settings
- [ ] Add custom domain to hosting
- [ ] Set up SSL certificate (usually automatic)
- [ ] Test domain resolution

### Post-Deployment
- [ ] Test live website on all devices
- [ ] Test all functionality
- [ ] Check page load speeds
- [ ] Verify SSL certificate
- [ ] Test order form on live site
- [ ] Monitor error logs

## 🔒 Security

- [ ] Use HTTPS only
- [ ] Validate all form inputs
- [ ] Sanitize user data
- [ ] Set up CORS if using external APIs
- [ ] Enable rate limiting for API routes
- [ ] Don't expose sensitive data client-side

## 📱 Social Media

- [ ] Update social media links in Footer
- [ ] Add real social media URLs
- [ ] Test social sharing
- [ ] Add social media icons (if needed)

**File**: `src/components/Footer.tsx`

## 📊 Analytics & Monitoring

### Optional Add-ons
- [ ] Google Analytics
- [ ] Facebook Pixel
- [ ] Hotjar or similar (user behavior)
- [ ] Error tracking (Sentry)
- [ ] Uptime monitoring

## 🎯 Marketing Prep

- [ ] Create social media posts for launch
- [ ] Prepare email announcement
- [ ] Update Google My Business
- [ ] Print QR code for restaurant (if applicable)
- [ ] Prepare promotional materials

## 📝 Legal & Compliance

- [ ] Add Privacy Policy page (if collecting data)
- [ ] Add Terms of Service (if needed)
- [ ] GDPR compliance (if serving EU customers)
- [ ] Cookie consent (if using analytics)
- [ ] Add footer links to legal pages

## ✨ Final Touches

- [ ] Add loading states to forms
- [ ] Add success/error messages
- [ ] Add 404 page
- [ ] Test accessibility (screen readers)
- [ ] Add print styles (optional)
- [ ] Create robots.txt
- [ ] Create sitemap.xml

## 🚀 Launch Day

- [ ] Final smoke test on all pages
- [ ] Check order form one last time
- [ ] Verify phone numbers are correct
- [ ] Verify email addresses are correct
- [ ] Make sure you can receive orders
- [ ] Announce on social media
- [ ] Monitor for any issues
- [ ] Celebrate! 🎉

## 📞 Emergency Contacts

Keep these handy after launch:
- Hosting platform support
- Domain registrar support
- Email service support
- Your developer (if applicable)

## 🔄 Post-Launch Maintenance

### Weekly
- [ ] Check for new orders
- [ ] Monitor website uptime
- [ ] Review analytics

### Monthly
- [ ] Update menu items (if changed)
- [ ] Add new reviews
- [ ] Check for broken links
- [ ] Review performance metrics
- [ ] Update content if needed

### Quarterly
- [ ] Update dependencies (`npm update`)
- [ ] Review SEO performance
- [ ] Plan new features
- [ ] Backup website and database

---

## 🎊 Ready to Launch?

Once you've completed this checklist, you're ready to go live!

**Quick Launch Path**:
1. ✅ Update all content (dishes, reviews, contact)
2. ✅ Test everything locally
3. ✅ Set up hosting (Vercel is easiest)
4. ✅ Deploy
5. ✅ Test live site
6. ✅ Announce to world!

**Good luck with your launch! 🚀**
