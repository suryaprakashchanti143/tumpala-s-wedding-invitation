# 💍 Wedding Invitation Website - Mobile Responsive Edition

A beautiful, modern wedding invitation website with full mobile responsiveness, smooth animations, and image overlays. Perfect for sharing your special day!

## ✨ Features

### 📱 Mobile-First Responsive Design
- ✅ **100% Mobile Responsive** - Works perfectly on all devices
- ✅ **Optimized for Small Screens** (320px to 480px)
- ✅ **Tablet Friendly** (768px to 1024px)
- ✅ **Desktop Professional** (1200px and above)
- ✅ **Touch-Friendly** Navigation and buttons
- ✅ **Fast Loading** - Optimized performance

### 🎨 Modern Design Elements
- Beautiful gradient backgrounds (Gold, Brown, Red - Indian wedding theme)
- Smooth fade-in animations on scroll
- Floating decorative elements
- Hero section with background image support
- Image overlays with semi-transparent gradients
- Glass-effect navigation with backdrop blur
- Responsive typography using CSS clamp()

### 🖼️ Image Integration
- 8 image placeholders for custom photos
- Beautiful overlay effects on all image cards
- Fallback gradients if images are missing
- Automatic image scaling for all devices
- Professional image size recommendations

### 🎯 All Sections Responsive
1. **Hero Section** - Full-screen with background image
2. **Wedding Details** - Image cards with overlay text
3. **Venue Section** - Beautiful venue card layout
4. **Lunch Celebration** - Food-themed cards
5. **Celebration Message** - Joyful animations
6. **Footer** - Clean and elegant

### 🎬 Animations & Transitions
- AOS (Animate On Scroll) library integration
- Smooth scrolling navigation
- Button hover effects with glow
- Floating elements and sparkles
- Heartbeat animations
- Bounce effects on emojis
- Scroll-triggered fade-ins

### ♿ Accessibility
- Respects `prefers-reduced-motion` media query
- Semantic HTML structure
- Proper heading hierarchy
- Good color contrast ratios
- Touch-friendly interface elements

## 📁 Project Structure

```
wedding-invitation/
├── index.html          # Main HTML file
├── style.css          # Responsive CSS styling
├── script.js          # Interactive JavaScript
└── images/            # Image folder
    ├── image1.jpg     # Hero background
    ├── image2.jpg     # Venue card
    ├── image3.jpg     # Muhuratham
    ├── image4.jpg     # Lunch time
    ├── image5.jpg     # Feast
    ├── image6.jpg     # Extra slot
    ├── image7.jpg     # Wedding date
    ├── image8.jpg     # Divine grace
    └── README.md      # Image guide
```

## 🚀 Quick Start

### 1. Open the Website
Simply open `index.html` in any modern web browser:
```bash
# Windows Explorer
Double-click index.html

# Or use any browser
Open → File → Open File → Select index.html
```

### 2. Add Your Images
1. Navigate to the `images/` folder
2. Add 8 images with exact names: `image1.jpg` through `image8.jpg`
3. Follow the recommendations in `images/README.md`
4. Refresh your browser (Ctrl+F5 or Cmd+Shift+R)

### 3. Customize Content
Edit `index.html` to update:
- Wedding date and time
- Venue name and location
- Lunch details
- Personal messages
- Navigation menu

## 🎨 Customization Guide

### Change Colors
Edit the CSS variables in `style.css`:
```css
:root {
    --color-gold: #d4af37;         /* Gold accents */
    --color-brown: #2d1f1a;        /* Dark brown */
    --color-red: #b8453e;          /* Wedding red */
    --color-cream: #f9f5f0;        /* Background */
}
```

### Change Fonts
Update Google Fonts in `index.html`:
```html
<!-- Change to your preferred fonts -->
<link href="https://fonts.googleapis.com/..." rel="stylesheet">
```

### Change Text Content
Edit any text in `index.html`:
- Hero title: "With great joy, I invite you to my wedding!"
- Venue: "Dwaraka Tirumala"
- Dates and times
- Messages and greetings

### Adjust Mobile Padding
Edit padding in `style.css` media queries:
```css
@media (max-width: 480px) {
    section {
        padding: 3rem 1.5rem;  /* Adjust as needed */
    }
}
```

## 📊 Mobile Optimization Details

### Breakpoints:
| Device | Width | Breakpoint |
|--------|-------|-----------|
| Mobile | 320-480px | Primary |
| Tablet | 768-1024px | Secondary |
| Desktop | 1200px+ | Tertiary |

### Mobile Features:
- **Hamburger Menu** - Compact navigation
- **Flexible Grids** - Single column on small screens
- **Responsive Images** - Scale automatically
- **Touch Buttons** - Larger tap targets (44px+ height)
- **Font Scaling** - Uses CSS clamp() for fluidity
- **No Horizontal Scroll** - 100% viewport width safe

### Performance Optimization:
- Minified CSS ready for production
- No heavy external libraries (except AOS)
- Smooth animations with performant properties
- Image compression ready
- Mobile-first CSS approach

## 🔧 Dependencies

### External Libraries:
1. **Google Fonts** - Typography (Playfair Display, Lora, Montserrat)
2. **FontAwesome 6.4.0** - Icons
3. **AOS 2.3.4** - Scroll animations

### No Build Requirements:
✅ Works with just HTML, CSS, JavaScript
✅ No npm/node.js needed
✅ No build process required
✅ Can run locally or on any hosting

## 📲 Testing on Devices

### Desktop (Google Chrome DevTools)
1. Press F12 to open DevTools
2. Click device toggle (top-left)
3. Select different devices:
   - iPhone 12/13/14
   - iPad
   - Galaxy Tab
   - Custom dimensions

### Real Device Testing
1. Share file or host online
2. Open on actual smartphone
3. Test all sections:
   - Hero scrolling
   - Navigation menu
   - Image loading
   - Button clicks
   - Touch interactions

### Common Issues & Fixes:
| Issue | Solution |
|-------|----------|
| Images not loading | Check file names match exactly |
| Hamburger menu stuck | Clear browser cache (Ctrl+Shift+Del) |
| Animations choppy | Disable some animations in CSS |
| Text too small | Adjust clamp() values in CSS |
| Slow loading | Compress images to < 500KB |

## 🎯 For the Best Experience

### Image Recommendations:
- **Format**: JPG (best for photos), PNG (for graphics)
- **Size**: 800x800px for cards, 1920x1080px for hero
- **Quality**: Optimized but high-quality
- **Style**: Consistent theme/colors matching gold & brown palette

### Browser Compatibility:
✅ Chrome 90+
✅ Firefox 88+
✅ Safari 14+
✅ Edge 90+
✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🌐 Hosting Options

### Free Hosting:
1. **GitHub Pages** - Perfect for static sites
2. **Netlify** - Drag & drop deployment
3. **Vercel** - One-click hosting
4. **Firebase Hosting** - Google-powered hosting

### How to Share:
1. Upload all files to hosting
2. Share link with guests
3. Mobile link works perfectly
4. No installation needed

## 💡 Tips & Tricks

1. **Logo/Name**: Edit nav-logo in HTML for personalization
2. **Colors**: Use consistent color scheme throughout
3. **Images**: Use similar quality/style images
4. **Testing**: Test on real phones before sending
5. **Sharing**: Use a custom domain for professional look
6. **Analytics**: Add Google Analytics for visitor tracking
7. **RSVP**: Add Google Form link for RSVPs

## 📝 File Sizes (Optimized)

| File | Size |
|------|------|
| index.html | ~8 KB |
| style.css | ~18 KB |
| script.js | ~5 KB |
| Total (without images) | ~31 KB |
| + 8 Images | ~2-4 MB (compressed) |

## ✅ Checklist Before Sharing

- [ ] All 8 images added to `images/` folder
- [ ] Images properly named (image1.jpg through image8.jpg)
- [ ] All text content updated
- [ ] Tested on mobile (375px width)
- [ ] Tested on tablet (768px width)
- [ ] Tested on desktop (1200px width)
- [ ] Links working (Google Maps links)
- [ ] No broken layouts
- [ ] Navigation menu working
- [ ] Animations smooth
- [ ] Load time acceptable (< 3 seconds)

## 🎨 Color Palette Reference

Used throughout the website:
```
Gold:       #d4af37 (Primary accent)
Gold Light: #f4d47a (Hover states)
Brown:      #2d1f1a (Dark backgrounds)
Brown Light:#4a3228 (Secondary background)
Red:        #b8453e (Call-to-action)
Red Light:  #d94d42 (Hover states)
Cream:      #f9f5f0 (Main background)
```

## 🔍 Troubleshooting

### Images Not Showing
```
1. Check file names (exact: image1.jpg, image2.jpg, etc.)
2. Verify images are in 'images/' folder
3. Try clearing browser cache (Ctrl+Shift+Del)
4. Check browser console for 404 errors (F12)
```

### Mobile Menu Not Working
```
1. Check JavaScript is enabled
2. Clear browser cache
3. Try different browser
4. Check console for JavaScript errors
```

### Animations Not Smooth
```
1. Consider reducing animations on weak devices
2. Close other heavy browser tabs
3. Update browser to latest version
4. Disable browser extensions
```

## 📞 Support

For issues or customization help:
1. Check the README files included
2. Review CSS variables for quick changes
3. Test on different browsers
4. Verify all file names and paths

## 🎉 Ready to Share!

Your wedding invitation website is now:
- ✅ Fully responsive for mobile, tablet, and desktop
- ✅ Beautiful with modern design
- ✅ Ready for custom images
- ✅ Easy to customize
- ✅ Professional and elegant

Share the link with your guests and make it special! 💍✨

---

**Version**: 2.0 (Mobile Optimized)
**Last Updated**: March 2026
**Best Viewed**: On actual mobile devices for testing
**Production Ready**: Yes

Enjoy your wedding! 🎊
