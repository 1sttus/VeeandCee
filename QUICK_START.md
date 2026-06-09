# VeeandCee - Quick Start Guide

## 🚀 Installation & Setup (3 steps)

### Step 1: Navigate to the project folder
```bash
cd VeeandCee
```

### Step 2: Install dependencies
```bash
npm install
```

### Step 3: Start the development server
```bash
npm run dev
```

The application will automatically open at **http://localhost:3000**

---

## 📖 Project Overview

This is a **production-ready React + Tailwind CSS** application for the VeeandCee cosmetics brand.

### What's Included?

✅ **5 Complete Pages:**
- Homepage with hero, trending products, testimonials
- Product catalog with filters & pagination
- Product detail page with reviews
- Shopping cart with management
- User account dashboard

✅ **8 Reusable Components:**
- Navbar, Footer, ProductCard
- HeroSection, CategoryFilter
- ReviewCard, TestimonialCard
- MobileNav (bottom navigation)

✅ **Fully Responsive:**
- Mobile, Tablet, Desktop layouts
- Mobile bottom navigation
- Touch-friendly interactions

✅ **Premium Design:**
- Pixel-perfect Figma implementation
- Smooth animations & transitions
- Professional color scheme
- Serif typography

---

## 🎯 Pages & Routes

| Page | Route | Features |
|------|-------|----------|
| Homepage | `/` | Hero, trending products, testimonials, journal |
| Catalog | `/shop/skincare` | Product grid, filters, sorting, pagination |
| Product | `/product/:id` | Images, details, reviews, related items |
| Cart | `/cart` | Items, quantities, order summary |
| Account | `/account` | Profile, orders, addresses, settings |
| 404 | `*` | Not found page |

---

## 📁 File Structure

```
src/
├── components/        # Reusable UI components
├── pages/            # Page components
├── App.jsx           # Main app & routing
├── index.jsx         # React entry point
└── index.css         # Global styles
```

---

## 🎨 Key Features

### 1. Navigation
- Desktop: Horizontal menu with categories
- Mobile: Hamburger menu + bottom navigation
- Quick access icons (search, account, wishlist, cart)

### 2. Product Cards
- Image with hover zoom effect
- Star ratings
- Price display
- Wishlist toggle
- Add to cart button

### 3. Filters & Sorting
- Category filters (cleansers, serums, moisturizers, masks)
- Concern filters (hydration, anti-aging, etc.)
- Price range slider
- Rating filter
- Sort by: newest, price, rating

### 4. Product Details
- Multiple product images with gallery
- Rich product information
- Benefits with icons
- Expandable sections (ingredients, usage, shipping)
- Reviews section
- Related products
- Add to cart with quantity control

### 5. Shopping Cart
- Remove items
- Quantity adjustment
- Order summary
- Shipping & tax info
- Related product recommendations

### 6. User Account
- Loyalty tier status
- Order history
- Saved addresses
- Account settings
- Email preferences

---

## 🔧 Build Commands

```bash
# Development (with hot reload)
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Lint code (if configured)
npm run lint
```

---

## 🎨 Customization

### Change Colors
Edit `tailwind.config.js` colors section:
```javascript
colors: {
  cream: '#F5F1ED',
  brown: '#8B7355',
  'dark-brown': '#6B5A4A',
  'gold': '#C9A961',
  'rose': '#D4A5A5',
}
```

### Add New Page
1. Create `src/pages/NewPage.jsx`
2. Add to `App.jsx` routes
3. Link from navigation

### Modify Components
- Components in `src/components/` are reusable
- Each component is self-contained
- Easy to customize styling

---

## 💡 Integration with Backend

### Update API Calls
Replace mock data with API calls:

```javascript
// In your pages, replace mock data with:
const [products, setProducts] = useState([])

useEffect(() => {
  fetch('/api/products')
    .then(res => res.json())
    .then(data => setProducts(data))
}, [])
```

### Environment Variables
Create `.env` file:
```
VITE_API_URL=http://localhost:3001/api
VITE_STRIPE_PUBLIC_KEY=your_key
```

---

## 📱 Mobile Experience

- Bottom navigation bar (hidden on desktop)
- Hamburger menu for categories
- Touch-optimized buttons
- Full-width layouts
- Fast performance

---

## ⚡ Performance

- **Vite:** Fast build & dev server
- **Tailwind CSS:** Optimized CSS
- **React 18:** Latest features
- **Code splitting:** Automatic by Vite
- **Smooth animations:** CSS transitions

---

## ♿ Accessibility

- Semantic HTML elements
- ARIA labels
- Keyboard navigation
- Color contrast compliant
- Focus states on interactive elements

---

## 🐛 Troubleshooting

**Port 3000 already in use:**
```bash
npm run dev -- --port 3001
```

**Missing dependencies:**
```bash
npm install
```

**Cache issues:**
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 📞 Support

For questions or issues:
1. Check the README.md for detailed documentation
2. Review component files for usage examples
3. Check tailwind.config.js for design tokens

---

## 🎯 Next Steps

1. ✅ Run `npm install`
2. ✅ Run `npm run dev`
3. ✅ Explore all pages at http://localhost:3000
4. ✅ Customize with your content
5. ✅ Integrate with your backend
6. ✅ Deploy to production

---

**Happy building! 🚀**
