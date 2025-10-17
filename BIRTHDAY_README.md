# Birthday Dashboard for Your Girlfriend 🎂

A beautiful, interactive birthday dashboard built with React, Vite, TypeScript, and shadcn/ui, optimized for iPhone Safari.

## 🎉 Features

- **Countdown Timer** - Real-time countdown to October 19, 2025
- **Confetti Effects** - Animated confetti on page load
- **Interactive Balloons** - Tap to pop balloons with confetti
- **Birthday Candles** - Tap to light/blow out candles
- **Photo Carousel** - Swipeable photo gallery
- **Love Notes** - Tabbed messages organized by category
- **Inside Jokes Feed** - Collection of your special moments
- **Future Plans** - Interactive checklist of things to do together
- **Music Playlist** - Your favorite songs together

## 🚀 Getting Started

### Run the Development Server
```bash
npm run dev
```

Then open http://localhost:5173 in your browser (or on your iPhone via network).

### Build for Production
```bash
npm run build
npm run preview
```

## 📱 iPhone Optimization

The dashboard is fully optimized for iPhone Safari:
- Touch-friendly UI with proper tap targets
- PWA support (add to home screen)
- Safari webkit optimizations
- Responsive mobile-first design
- No zoom on input focus
- Smooth animations at 60fps

## ✏️ Customization Guide

### 1. Update Personal Information

**Hero Welcome** (`/src/features/birthday/components/hero-welcome.tsx`)
- Line 15: Change "To the most amazing person" to her name or a personal message

**Love Notes** (`/src/features/birthday/components/love-notes.tsx`)
- Lines 40-77: Replace with your real love notes and memories
- Add more tabs or cards as needed

### 2. Add Real Photos

**Photo Carousel** (`/src/features/birthday/components/photo-carousel.tsx`)
- Replace the placeholder gradients with real photos:
  - Add photos to `/public/images/` folder
  - Update the `photos` array (lines 9-28) with image paths:
    ```typescript
    {
      id: 1,
      src: '/images/our-first-photo.jpg',
      title: 'Our First Date',
      description: 'Restaurant Name, March 2024',
    }
    ```

### 3. Customize Inside Jokes

**Inside Jokes** (`/src/features/birthday/components/inside-jokes.tsx`)
- Lines 7-21: Replace with your actual inside jokes
- Add more jokes by adding items to the `jokes` array

### 4. Update Future Plans

**Bucket List** (`/src/features/birthday/components/bucket-list.tsx`)
- Lines 8-14: Replace with your real future plans together
- Plans are checkable - she can mark them as completed!

### 5. Add Music Playlist

**Music Playlist** (`/src/features/birthday/components/music-playlist.tsx`)
- Lines 6-12: Replace with actual songs that are meaningful to you both
- Add Spotify/Apple Music links if desired

### 6. Adjust Birthday Date

**Countdown Timer** (`/src/features/birthday/components/countdown-timer.tsx`)
- Line 16: Change `'2025-10-19T00:00:00'` to the correct date if needed

### 7. Change Colors (Optional)

**Theme Colors** (`/src/styles/theme.css`)
- The current theme is Blue & Teal (lines 1-25)
- Adjust OKLCH color values to customize the palette

## 🎨 Adding More Content

You can add more sections by:
1. Creating a new component in `/src/features/birthday/components/`
2. Importing it in `/src/features/birthday/index.tsx`
3. Adding it to the layout (around line 45)

## 📦 PWA Setup (Add to Home Screen)

To add to iPhone home screen:
1. Open in Safari on iPhone
2. Tap the Share button
3. Scroll down and tap "Add to Home Screen"
4. Tap "Add"

The app will open full-screen without Safari UI!

## 🎁 Deployment Options

### Deploy to Netlify (Recommended)
```bash
npm run build
# Upload the 'dist' folder to Netlify
```

### Deploy to Vercel
```bash
npm run build
# Upload the 'dist' folder to Vercel
```

### Deploy to GitHub Pages
1. Update `vite.config.ts` with your repo name
2. Run: `npm run build`
3. Push the dist folder to gh-pages branch

## 💡 Tips

- **Test on actual iPhone**: Use your iPhone's IP address to test on real device
- **Add photos before showing**: Replace all placeholder content first
- **Consider hosting**: Deploy before October 19th so you can share a link
- **Make it personal**: The more customized, the more special it will be!

## 🎂 On Her Birthday

When October 19th arrives, the countdown will automatically change to show a birthday celebration message!

## 📝 Notes

- All placeholder content is marked with 💡 hints
- The confetti triggers automatically on page load
- Interactive elements (balloons, candles) trigger confetti when used
- All components are touch-optimized for iPhone

---

Made with ❤️ for an amazing birthday celebration!
