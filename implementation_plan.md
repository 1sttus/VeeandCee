# Admin & UI Enhancements Implementation Plan

## Goal Description
Upgrade the VeeandCee application with the following features:
- Remove all seeded products from the database to allow manual admin entry.
- Add a sticky, glass‑morphed navigation bar on mobile that appears as a popup.
- Provide an admin panel section to update the hero image/text using Cloudinary.
- Convert the desktop search bar into a popup modal.
- Show a top‑of‑screen “item added” popup with a plus‑sign animation that flies toward the cart icon on mobile.
- Ensure mobile dropdown menus auto‑close when clicking outside (including the search popup).
- Set up email notifications via Zoho XMTP for:
  * New user registration
  * User login
  * New order placement
  * New product creation

## User Review Required
> [!IMPORTANT]
> The implementation touches several areas (database seeding, UI components, admin routes, and external email service). Please confirm:
> 1. Preferred admin UI framework (keep existing Next.js pages or use a dedicated `/admin` route). 
> 2. Cloudinary account name and any folder structure for hero assets.
> 3. Zoho XMTP credentials (API key, domain) – we will store them in `.env.local`.
> 4. Do you want the sticky nav to replace the existing header entirely on mobile, or act as an overlay?

## Open Questions
> [!WARNING]
> - What should happen to existing orders/products when we delete the seeded collection? Should we keep order history?
> - Should the “item added” popup be dismissible by the user, or auto‑hide after a timeout?
> - Do you require any rate‑limiting or queuing for Zoho XMTP emails?

## Proposed Changes
---
### Database & Seeding
- **[MODIFY]** `src/lib/seed.js` (or wherever seeding occurs) to comment out product creation and add a script to clear `Product` collection on start (`await Product.deleteMany({})`).
- Add a new admin API route `src/app/api/admin/clear-products/route.js` (POST) that calls `Product.deleteMany({})` with admin auth.

### Mobile Sticky Nav (Glassmorphism)
- **[NEW]** `src/components/StickyNav.jsx` – client component with `useEffect` to add `position: sticky` and CSS backdrop‑filter for glass effect.
- Update `src/app/layout.jsx` to conditionally render `StickyNav` on `useMediaQuery('(max-width: 768px)')`.
- Add CSS class `.glass` with `background: rgba(255,255,255,0.2); backdrop-filter: blur(10px);`.

### Admin Hero Section
- **[NEW]** `src/app/admin/hero/page.jsx` – form with Cloudinary upload widget (use `cloudinary-react` or direct upload API). Store URL and text in a new `Hero` model (`src/models/Hero.js`).
- **[MODIFY]** `src/app/layout.jsx` to fetch the hero data server‑side (`await Hero.findOne()`), pass to the `<HeroSection>` component.
- Add `src/models/Hero.js` schema (`imageUrl`, `heading`, `subheading`).

### Desktop Search Popup
- **[NEW]** `src/components/SearchModal.jsx` – client component with `framer-motion` animation, opened via a search icon button.
- Update desktop header to open this modal.

### Cart Added Popup + Animation
- **[MODIFY]** `src/components/CartToast.jsx` (or create new) – on add to cart, render a toast with a plus icon that animates from the button to the cart icon using `framer-motion` path animation.
- Ensure it only appears on mobile view (`useMediaQuery`).

### Dropdown Auto‑Dismiss
- **[MODIFY]** Existing mobile dropdown components (`MenuDrawer.jsx`, etc.) to add a `useEffect` that listens for clicks outside (`document.addEventListener('click', ...)`) and closes when outside.

### Email Notifications (Zoho XMTP)
- **[NEW]** `src/lib/zohoMailer.js` – wrapper around Zoho XMTP API (`fetch` POST to Zoho endpoint with credentials from env vars).
- Hook into auth routes (`/api/auth/register`, `/api/auth/login`) and order route (`/api/orders/[id]/PUT`) to send emails on success.
- Hook into product creation API (`/api/products/POST`) to notify admins of new product.
- Add required env vars (`ZOHO_XMTP_API_KEY`, `ZOHO_XMTP_DOMAIN`).

## Verification Plan
### Automated Tests
- Run existing Jest tests after changes.
- Add new unit tests for `zohoMailer` and the new admin clear‑products route.
- Verify that `npm run build` succeeds.

### Manual Verification
- Open mobile view, ensure sticky nav appears with glass background.
- Add a product via admin, confirm hero image/text updates on homepage.
- Trigger search on desktop, confirm modal opens.
- Add item to cart on mobile, watch plus‑sign animation and top toast.
- Click outside dropdown/search popup, confirm it dismisses.
- Register a new user, log in, place an order, create a product – check Zoho XMTP inbox for emails.

---
*Implementation steps will be carried out sequentially, updating the `implementation_plan.md` and `task.md` as work progresses.*
