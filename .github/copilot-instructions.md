<!-- GitHub Copilot Custom Instructions for VeeandCee Project -->

# VeeandCee - Frontend Development Guidelines

## Project Overview
VeeandCee is a production-ready React + Tailwind CSS cosmetics brand e-commerce application. This document outlines best practices and conventions for development.

## Technology Stack
- **Frontend:** React 18, React Router v6, Tailwind CSS 3
- **Build Tool:** Vite
- **Styling:** Tailwind CSS + custom CSS
- **Icons:** Lucide React
- **Fonts:** Google Fonts (Playfair Display, Inter)

## Design System

### Colors
- **Background:** Cream (#F5F1ED)
- **Primary:** Brown (#8B7355)
- **Dark:** Dark Brown (#6B5A4A)
- **Accent:** Gold (#C9A961)
- **Secondary:** Rose Pink (#D4A5A5)
- **Text:** Charcoal (#4A4A4A)

### Typography
- **Headers:** Playfair Display (serif) - font-family: font-serif
- **Body:** Inter (sans-serif) - font-family: font-sans
- **Classes:** Use Tailwind typography utilities

### Spacing & Layout
- Use Tailwind spacing utilities (px-4, py-8, gap-6, etc.)
- Mobile-first responsive design (sm:, md:, lg: prefixes)
- Max-width container: max-w-7xl

## Project Structure

```
src/
├── components/        # Reusable UI components
├── pages/            # Page-level components
├── index.css         # Global styles
├── App.jsx           # Main app component with routing
└── index.jsx         # React entry point
```

## Component Guidelines

### Component Naming
- Use PascalCase (e.g., ProductCard, CategoryFilter)
- Be descriptive (not just "Card", but "ProductCard")
- Suffixes: Card, Section, Filter, Nav, Form, Modal

### Component Structure
```jsx
export default function ComponentName({ prop1, prop2 }) {
  const [state, setState] = useState(null)
  
  const handleAction = () => { /* logic */ }
  
  return (
    <div className="component-classes">
      {/* JSX */}
    </div>
  )
}
```

### Props Pattern
- Use descriptive prop names
- Document with comments when complex
- Keep components simple and focused

### Styling Conventions
- Use Tailwind utility classes primarily
- Custom CSS in index.css for complex styles
- Class naming: `className="flex items-center gap-4 p-4 rounded-lg"`
- Hover states: `hover:bg-brown/5`, `hover:text-gold`
- Transitions: `transition-colors`, `transition-all`

## Responsive Design

### Breakpoints Used
- **Default:** Mobile (< 640px)
- **sm:** 640px+ (small devices)
- **md:** 768px+ (tablets, older devices)
- **lg:** 1024px+ (desktops)

### Pattern for Responsive Classes
```jsx
// Grid that adapts to screen size
className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"

// Text that scales
className="text-xl sm:text-2xl md:text-3xl lg:text-4xl"

// Padding that adapts
className="px-4 sm:px-6 lg:px-8"
```

## Routing & Navigation

### Route Structure
- `/` - Homepage
- `/shop/:category` - Product catalog
- `/product/:id` - Product detail
- `/cart` - Shopping cart
- `/account` - User account
- `*` - 404 page

### Navigation Patterns
- Use React Router `Link` component for internal navigation
- Use `<a>` tags only for external links
- Pass route params via URL: `/product/${id}`

## Animations & Effects

### Predefined Animations (in index.css)
- `.fade-in` - Fade in on load
- `.slide-in-left` - Slide from left
- `.slide-in-right` - Slide from right
- `.btn-hover` - Button hover effect
- `.card-hover` - Card hover effect

### Usage
```jsx
<div className="fade-in">Content</div>
<button className="btn-hover">Click me</button>
```

## Accessibility (A11y)

### Standards to Follow
- Use semantic HTML (`<button>`, `<nav>`, `<section>`, etc.)
- Add `aria-label` to icon-only buttons
- Ensure color contrast is WCAG AA compliant
- Support keyboard navigation
- Use proper heading hierarchy (h1 → h6)

### Example
```jsx
<button aria-label="Add to wishlist">
  <Heart size={20} />
</button>
```

## Performance Tips

1. **Lazy Loading:** Use React.lazy() for route-based code splitting
2. **Image Optimization:** Use img optimization or CDN
3. **Bundle Size:** Keep components small and focused
4. **Re-renders:** Use proper React hooks (useMemo, useCallback when needed)
5. **CSS:** Tailwind automatically removes unused styles

## Common Patterns

### State Management
- Use `useState` for local component state
- Lift state up for shared data between components
- Consider Context API for global state

### Conditional Rendering
```jsx
{isVisible && <Component />}
{condition ? <ComponentA /> : <ComponentB />}
{items.map(item => <Component key={item.id} {...item} />)}
```

### Styling Patterns
```jsx
// Conditional classes
className={`px-4 py-2 rounded ${isActive ? 'bg-brown text-white' : 'bg-white text-brown'}`}

// Multiple states
className={`
  px-4 py-2 rounded transition-colors
  hover:bg-brown/10
  focus:outline-none focus:ring-2 focus:ring-brown
  disabled:opacity-50 disabled:cursor-not-allowed
`}
```

## Form Handling

### Input Patterns
```jsx
<input
  type="text"
  className="px-4 py-2 border border-brown/20 rounded-lg focus:outline-none focus:border-brown"
  placeholder="Enter text"
  onChange={(e) => setValue(e.target.value)}
/>
```

## API Integration

### Data Fetching Pattern
```jsx
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch('/api/endpoint')
      const data = await response.json()
      setData(data)
    } catch (error) {
      console.error('Error:', error)
    }
  }
  fetchData()
}, [])
```

## Code Quality

### Best Practices
- Keep components under 300 lines
- Use descriptive variable names
- Add comments for complex logic
- DRY principle (Don't Repeat Yourself)
- Remove console.log before production

### File Organization
- One component per file
- Group related components in folders
- Use index.js exports for cleaner imports
- Keep styles in index.css or tailwind classes

## Commit Messages

Use clear, descriptive commit messages:
- ✨ `feat: add wishlist functionality`
- 🐛 `fix: cart quantity calculation`
- 🎨 `style: update color palette`
- ♻️ `refactor: simplify product card`
- 📝 `docs: update README`

## Testing Considerations

- Write unit tests for utility functions
- Test component props and state changes
- E2E tests for critical user flows
- Run tests before deployment

## Deployment Checklist

Before pushing to production:
- [ ] Build completes without errors: `npm run build`
- [ ] No console errors or warnings
- [ ] Responsive design tested on mobile/tablet/desktop
- [ ] All links and navigation work
- [ ] Performance acceptable (Lighthouse score)
- [ ] SEO meta tags in place
- [ ] Environment variables configured
- [ ] Analytics integrated if needed

## Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [React Router](https://reactrouter.com)
- [Vite](https://vitejs.dev)
- [Lucide Icons](https://lucide.dev)

---

**Last Updated:** 2026-06-09
