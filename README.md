# VeeandCee - Premium Cosmetics Frontend Application

A fully responsive, production-ready React + Tailwind CSS application for the VeeandCee luxury cosmetics brand. This project faithfully implements the high-fidelity Figma designs with pixel-perfect accuracy across all devices.

## 🎯 Features

✅ **Complete Responsive Design**
- Mobile-first approach with optimized layouts for phones, tablets, and desktop
- Mobile bottom navigation for seamless mobile experience
- Adaptive component layouts

✅ **Full-Featured Pages**
- **Homepage** - Hero section, trending products, testimonials, journal articles
- **Product Catalog** - Filterable product grid with sorting, pagination, category filters
- **Product Details** - Rich product information with reviews, ingredients, testimonials
- **Shopping Cart** - Full cart management with quantity controls and order summary
- **Account Dashboard** - User profile, order history, addresses, settings

✅ **Component-Based Architecture**
- Reusable components: ProductCard, HeroSection, ReviewCard, TestimonialCard, etc.
- Clean separation of concerns
- Easy to maintain and extend

✅ **Design Excellence**
- Pixel-perfect implementation of Figma designs
- Custom color palette (cream, brown, gold, rose accents)
- Serif typography (Playfair Display) for headings
- Smooth animations and transitions
- Professional hover states and interactions

✅ **Performance & Accessibility**
- Optimized bundle size with Vite
- ARIA labels and semantic HTML
- Proper heading hierarchy
- Keyboard navigation support
- Fast loading performance

✅ **SEO-Friendly Structure**
- Semantic HTML5 elements
- Descriptive meta tags
- Proper heading hierarchy
- Mobile-responsive design

## 📁 Project Structure

```
veeandcee/
├── public/
│   └── index.html              # Main HTML file with Google Fonts
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Main navigation with mobile menu
│   │   ├── Footer.jsx          # Footer with links & social
│   │   ├── ProductCard.jsx     # Reusable product card component
│   │   ├── HeroSection.jsx     # Hero banner component
│   │   ├── CategoryFilter.jsx  # Sidebar filters for catalog
│   │   ├── ReviewCard.jsx      # Single review display
│   │   ├── TestimonialCard.jsx # Testimonial card
│   │   └── MobileNav.jsx       # Mobile bottom navigation
│   ├── pages/
│   │   ├── Home.jsx            # Homepage with hero & products
│   │   ├── ProductCatalog.jsx  # Product listing page
│   │   ├── ProductDetails.jsx  # Single product detail page
│   │   ├── Cart.jsx            # Shopping cart page
│   │   ├── Account.jsx         # User account dashboard
│   │   └── NotFound.jsx        # 404 page
│   ├── App.jsx                 # Main app with routing
│   ├── index.css               # Global styles & animations
│   └── index.jsx               # React entry point
├── index.html                  # HTML entry point
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── postcss.config.js           # PostCSS configuration
├── package.json                # Dependencies & scripts
└── README.md                   # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm or yarn installed

### Installation

1. **Clone or download the project:**
   ```bash
   cd VeeandCee
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

   The application will open automatically at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

## 🎨 Design System

### Colors
- **Primary Background:** #F5F1ED (Cream)
- **Primary Brown:** #8B7355
- **Dark Brown:** #6B5A4A
- **Gold Accent:** #C9A961
- **Rose Accent:** #D4A5A5
- **Text Dark:** #4A4A4A
- **Text Light:** Charcoal with opacity

### Typography
- **Headlines:** Playfair Display (serif)
- **Body Text:** Inter (sans-serif)
- **All fonts loaded from Google Fonts**

### Components
- Product cards with wishlist toggle
- Expandable filter sidebar
- Product ratings and reviews
- Pagination controls
- Mobile-optimized navigation
- Cart management
- User account dashboard

## 📱 Responsive Breakpoints

The application is fully responsive with the following breakpoints:

- **Mobile:** < 640px (sm)
- **Tablet:** 640px - 1024px (md)
- **Desktop:** > 1024px (lg)

Mobile features:
- Bottom navigation bar (hidden on desktop)
- Hamburger menu for navigation
- Single-column layouts
- Touch-friendly interactive elements
- Optimized font sizes

## 🔧 Technologies Used

- **React 18** - UI library
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Build tool and dev server
- **Lucide React** - Icon library
- **PostCSS** - CSS processing

## 📦 Available Scripts

```bash
# Start development server (opens at http://localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run ESLint (if configured)
npm run lint
```

## 🎯 Key Features Explained

### 1. Navigation
- Desktop: Horizontal menu with categories
- Mobile: Hamburger menu + bottom navigation
- Search, account, wishlist, and cart icons
- Sticky header for easy access

### 2. Product Catalog
- Grid layout with sorting options (newest, price, rating)
- Sidebar filters (category, concern, price range, rating)
- Pagination with numbered pages
- Product cards with ratings and hover effects

### 3. Product Details
- Large product images with thumbnail selector
- Detailed product information
- Expandable sections (ingredients, usage, shipping)
- Customer reviews and testimonials
- Related products recommendations
- Add to cart and buy now options

### 4. Shopping Cart
- Item quantity controls
- Remove items functionality
- Order summary with totals
- Shipping and tax calculations
- Related product recommendations
- Secure checkout indication

### 5. Account Dashboard
- User profile overview
- Loyalty tier status with progress
- Order history
- Saved addresses
- Account settings
- Quick action links

## 🔄 Routing

```
/ 
├── /shop/skincare           - Product catalog (skincare category)
├── /shop/makeup             - Product catalog (makeup category)
├── /shop/body               - Product catalog (body category)
├── /product/:id             - Product detail page
├── /cart                    - Shopping cart
├── /account                 - User account dashboard
└── 404                      - Not found page
```

## ✨ Animations & Interactions

- **Fade-in animations** on page load
- **Hover effects** on cards, buttons, and links
- **Smooth transitions** on color changes
- **Scale animations** on product images
- **Slide transitions** for mobile menu
- **Custom scrollbar** styling

## 🎯 Performance Optimizations

- Lazy loading for images (via img tag)
- Optimized bundle with Vite
- Minified CSS with Tailwind
- Clean component structure
- Efficient re-rendering with React
- Smooth scrolling behavior

## ♿ Accessibility

- Semantic HTML5 elements
- ARIA labels on interactive elements
- Proper heading hierarchy
- Keyboard navigation support
- Color contrast compliance
- Focus states on interactive elements

## 📝 Customization

### Changing Colors
Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      cream: '#F5F1ED',
      brown: '#8B7355',
      // Add your colors here
    }
  }
}
```

### Adding New Pages
1. Create a new file in `src/pages/`
2. Import it in `App.jsx`
3. Add a route in the `<Routes>` section

### Adding New Components
1. Create a new file in `src/components/`
2. Export the component
3. Import and use in your pages

## 🐛 Troubleshooting

**Port 3000 already in use:**
```bash
# Use a different port
npm run dev -- --port 3001
```

**Module not found errors:**
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

**Build errors:**
```bash
# Clear cache and rebuild
rm -rf dist
npm run build
```

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Router Documentation](https://reactrouter.com)
- [Vite Documentation](https://vitejs.dev)

## 🤝 Integration Notes

- **Backend Integration:** Replace mock data in pages with API calls using axios
- **Payment Processing:** Integrate with Stripe or similar for checkout
- **User Authentication:** Add auth provider (Firebase, Auth0, etc.)
- **Database:** Connect to your backend database
- **Image CDN:** Replace placeholder images with actual product images

## 📄 License

This project is built based on the VeeandCee brand design specifications.

---

**Built with ❤️ for VeeandCee - Premium Cosmetics Brand**
