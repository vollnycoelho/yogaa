# Sarvaswasthyam Yoga & Fitness Design Guidelines

## Design Approach
**Reference-Based:** Drawing inspiration from premium wellness platforms (Calm, Peloton, Mindbody) with emphasis on tranquility, energy, and trust. Focus on creating a serene yet motivating experience that balances calmness with action.

## Core Design Principles
- **Wellness-First Aesthetics:** Calming, natural palette with energizing accents
- **Clarity Over Clutter:** Clean layouts with purposeful whitespace for mindfulness
- **Trust & Credibility:** Professional polish for booking and payment confidence
- **Dual Experience:** Serene for users, efficient for admins

## Color Palette

**Light Mode:**
- Primary: 150 45% 45% (Calming sage/teal - yoga/nature)
- Secondary: 280 30% 60% (Soft purple - spirituality/balance)
- Accent: 25 85% 60% (Warm coral - energy/vitality)
- Neutral: 210 15% 25% (Deep charcoal for text)
- Background: 40 40% 98% (Warm off-white)

**Dark Mode:**
- Primary: 150 40% 55% (Lighter sage for contrast)
- Secondary: 280 35% 70%
- Accent: 25 75% 65%
- Neutral: 210 15% 85%
- Background: 210 20% 10% (Deep navy-black)

## Typography
- **Primary Font:** 'Inter' (Google Fonts) - headings, navigation, buttons
- **Secondary Font:** 'Lora' (Google Fonts) - body text, descriptions (adds warmth)
- **Heading Scale:** text-5xl/4xl/3xl/2xl/xl with font-semibold
- **Body:** text-base with leading-relaxed for readability

## Layout System
**Spacing:** Use Tailwind units of 2, 4, 6, 8, 12, 16, 20, 24
- Micro: 2, 4 (tight internal component spacing)
- Standard: 6, 8 (component padding, gaps)
- Generous: 12, 16 (section spacing, margins)
- Dramatic: 20, 24 (major section breaks)

**Containers:** max-w-7xl for content, max-w-4xl for forms/text blocks

## Component Library

### Navigation
- Fixed transparent navbar with blur backdrop on scroll
- Logo left, nav center, profile/login right
- Role-based menu items (admin dashboard only for admins)
- Mobile: hamburger with slide-out drawer

### Hero Section (Home)
- Full-width 85vh hero with large lifestyle yoga image (serene studio/outdoor setting)
- Overlay gradient (dark bottom fade for text contrast)
- Centered heading + subheading + dual CTA buttons
- Primary CTA (solid accent), Secondary CTA (outline with backdrop blur)

### Session Cards
- Card-based grid (grid-cols-1 md:grid-cols-2 lg:grid-cols-3)
- Session image at top, rounded-t-lg
- Content padding p-6 with session name, instructor, time, level badge
- Hover: subtle lift (translate-y-1) and shadow increase
- Availability indicator (green dot + text)

### Booking Modal
- Multi-step wizard with progress indicator at top
- Step 1: Session details + calendar picker
- Step 2: User info form
- Step 3: Payment simulation
- Footer buttons: Back (secondary) + Continue/Book (primary)

### Video Library
- Masonry-style grid (not uniform grid - varied heights)
- Thumbnail with play overlay icon
- Video title + duration + difficulty level
- Modal player: YouTube iframe centered with close button

### Dashboards
**User Dashboard:**
- Welcome section with name + quick stats (upcoming/completed sessions)
- Booking cards in timeline layout with cancel option
- Profile management card

**Admin Dashboard:**
- Top row: Stat cards (4 columns) - bookings, revenue, users, sessions
- Charts section: Line graph for bookings trend
- Recent bookings table with action buttons
- Session management: Create/Edit forms in modal, list view with inline edit

### Forms
- Floating labels on focus
- Input styling: border-2, rounded-lg, px-4 py-3
- Validation: Error messages in text-sm text-red-500 below inputs
- Success states: Green border + checkmark icon

### Buttons
- Primary: bg-accent with white text, rounded-lg, px-6 py-3
- Secondary: border-2 with primary color, transparent bg
- Icon buttons: Rounded-full with hover bg change
- No hover states for outline buttons on images (built-in)

### Icons
Use Heroicons (outline style) via CDN for:
- Navigation icons (home, calendar, video, user, settings)
- Action icons (play, edit, delete, check, x)
- Status indicators (check-circle, x-circle, clock)

## Page-Specific Design

### Home/Landing
- Hero with image + CTA
- Benefits section: 3-column icon + heading + text cards
- Featured sessions: Horizontal scroll card row
- Testimonials: 2-column with photos
- CTA section: Centered with class schedule teaser
- Footer: Links, social icons, newsletter signup

### Sessions Page
- Filter sidebar (left): Category checkboxes, level select, time range
- Main grid (right): Session cards with availability
- Sticky filter button on mobile

### Exercises Page
- Search bar at top
- Category tabs (Beginner/Intermediate/Advanced)
- Video grid with play overlay
- VideoModal: Centered iframe with close X, video title above

### Login Page
- Centered card (max-w-md) on gradient background
- Tab switcher: User | Admin
- Form fields with floating labels
- Remember me checkbox
- Primary CTA button full-width

## Images
**Hero Image:** Full-width yoga studio or outdoor yoga session (peaceful, professional, diverse practitioners) - conveys serenity and community

**Session Cards:** Each session needs a representative image (studio classes, outdoor sessions, meditation spaces) - use consistent styling

**Exercise Thumbnails:** YouTube video thumbnails via iframe API

**Testimonials:** Circular headshots (rounded-full) with name + quote

**Optional/Supporting:** Instructor photos, studio space gallery, lifestyle imagery for benefits section

## Animations
**Minimal approach:**
- Fade-in on scroll for sections (only on landing page)
- Button hover scale (scale-105)
- Card hover lift (translate-y-1)
- Modal entrance: fade + scale animation
- NO parallax, NO complex scroll-driven effects

## Accessibility
- Dark mode fully implemented across all components
- Focus visible states on all interactive elements
- ARIA labels for icons and actions
- Color contrast meets WCAG AA standards
- Keyboard navigation support for modals and forms