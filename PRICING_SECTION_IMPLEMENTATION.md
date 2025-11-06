# Pricing Section Implementation (REVISED)

## Overview

Implementasi section Pricing dengan **single card + tab switcher design**. User memilih tier (Starter/Growth/Pro) via pill tabs, konten berganti dalam satu card dengan smooth cross-fade animation.

## Architecture

### Single Card Multi-Tier Pattern

- **1 Card Container**: Tetap (max-width 880px)
- **3 Tab Buttons**: Pill switcher (Starter / Growth / Pro)
- **3 Panels**: Konten per tier, hanya 1 visible pada satu waktu
- **Height Lock**: Mencegah layout shift saat transisi

### State Management

- `activeTier`: "starter" | "growth" | "pro"
- Persistence: localStorage + URL query (`?tier=growth`)
- Deep linking support
- Keyboard navigation (Arrow keys, Home, End)

## Components

### PricingSection.astro (REVISED)

Single component yang handle semua logic pricing.

**Structure:**

1. Section Header (Eyebrow + Title + Description)
2. Tab List (`role="tablist"`) - 3 pill buttons
3. Single Card Container
   - 3 Tab Panels (hanya 1 active)
   - Cross-fade transition
4. Footnote
5. Benefits Grid (6 items)
6. FAQ Accordion (5 items)

**Key Features:**

- ARIA-compliant tabs pattern
- Height lock animation (anti layout shift)
- Smooth cross-fade (200-300ms)
- Stagger animation untuk "included" items (30-40ms)
- localStorage persistence
- URL query sync
- Keyboard navigation

## Interaction Flow

### Tab Switch Behavior

1. User clicks tab button
2. Measure old panel height
3. Measure new panel height (position:absolute trick)
4. Set card min-height to max(oldH, newH)
5. Fade out old panel (200ms, translateY 8px)
6. Fade in new panel (300ms delay 60ms, translateY from 8px)
7. Remove min-height after transition
8. Update localStorage & URL

### Keyboard Navigation

- **Arrow Left/Right**: Navigate between tabs
- **Home**: First tab
- **End**: Last tab
- **Enter/Space**: Activate focused tab
- Tab key: Normal focus flow

## Animations

### On-Scroll Entry

- Card: fade + slideY(24px), 600ms, ease(0.22, .61, .36, 1)

### Tab Switch

- **Out**: opacity 1→0 (200ms), translateY 0→8px
- **In**: opacity 0→1 (300ms, delay 60ms), translateY 8px→0

### Included Items Stagger

- Each item: 30ms delay increment
- nth-child(1): 100ms
- nth-child(2): 130ms
- nth-child(3): 160ms
- ... up to 280ms

### CTA Hover

- Arrow translateX(4px)
- Shadow enhancement

### Reduced Motion

- All animations disabled
- Instant panel switch
- Items visible immediately

## Accessibility

### ARIA Pattern

```html
<div role="tablist">
  <button role="tab" aria-selected="true" aria-controls="panel-starter">
  <button role="tab" aria-selected="false" aria-controls="panel-growth">
  <button role="tab" aria-selected="false" aria-controls="panel-pro">
</div>

<div role="tabpanel" id="panel-starter" aria-labelledby="tab-starter">
<div role="tabpanel" id="panel-growth" hidden inert>
<div role="tabpanel" id="panel-pro" hidden inert>
```

### Features

- Hidden panels: `hidden` + `inert` + `aria-hidden="true"`
- Focus ring: 2px visible outline
- Screen reader labels: Full price announcement
- Keyboard navigation: Full support
- Non-breaking spaces: Prevent currency wrap (Rp\u00A0)

## Content per Tier

### Starter

- **Harga**: Rp 1,5–5 juta (atau Rp 100–150k/jam)
- **Target**: Individu, freelancer, bisnis mikro
- **Timeline**: 1–2 minggu
- **Billing**: Per Proyek / Per Jam
- **Included**: 7 items

### Growth

- **Harga**: Rp 7–20 juta
- **Target**: UMKM serius, brand kecil, tim kreatif
- **Timeline**: 3–5 minggu
- **Billing**: Per Proyek
- **Included**: 7 items

### Pro

- **Harga**: Rp 25–60 juta
- **Target**: Perusahaan, yayasan, sekolah, startup tech
- **Timeline**: 6–12 minggu
- **Billing**: Milestone
- **Included**: 7 items

## Design Tokens

### Card

- Max-width: 880px
- Padding: 8 (32px) / 10 (40px) on md
- Border-radius: rounded-3xl (24px)
- Background: surface/50 + backdrop-blur
- Shadow: shadow-soft

### Tab Pills

- Padding: px-6 py-2.5
- Border-radius: rounded-full
- Active state: bg-accent + text-white + shadow-lg
- Inactive: border-divider/30 + bg-surface/50
- Hover: border-accent/40 + bg-accent/5

### Typography

- Price: text-4xl/5xl font-bold
- Tier name: text-2xl/3xl font-bold
- Body: text-base
- Included items: text-sm

### Spacing

- Tab list margin-bottom: 8 (32px)
- Section margin-top: 12 (48px)
- Panel sections: mb-6 (24px) / mb-8 (32px)

## Responsive Design

### Mobile (<640px)

- Tab list: overflow-x-auto, horizontal scroll
- CTA buttons: full-width stack
- Card padding: p-8 (32px)
- Price: text-4xl

### Tablet (≥640px)

- CTA buttons: flex-row (side by side)
- Card padding: p-10 (40px)

### Desktop (≥1024px)

- Benefits: 6 columns
- FAQ: max-w-3xl centered

## Technical Implementation

### Height Lock Algorithm

```javascript
const oldHeight = card.offsetHeight;

// Measure new panel (hidden)
newPanel.hidden = false;
newPanel.style.position = "absolute";
newPanel.style.opacity = "0";
const newHeight = newPanel.offsetHeight;

// Reset
newPanel.hidden = true;
newPanel.style.position = "";

// Lock height
card.style.minHeight = `${Math.max(oldHeight, newHeight)}px`;

// Run transition...
// After complete: card.style.minHeight = '';
```

### URL Persistence

```javascript
// Save to localStorage
localStorage.setItem("pricing-tier", tier);

// Update URL
const url = new URL(window.location.href);
url.searchParams.set("tier", tier);
window.history.replaceState({}, "", url);
```

### Initial State

```javascript
const urlTier = new URLSearchParams(location.search).get("tier");
const savedTier = localStorage.getItem("pricing-tier");
const initialTier = urlTier || savedTier || "starter";
```

## Performance

### Optimizations

- Single card: Reduced DOM nodes
- IntersectionObserver: Lazy animations
- CSS transitions: GPU-accelerated
- No external dependencies
- Pre-render all panels: SEO-friendly

### Bundle Size

- Inline script: ~2KB minified
- No React/Vue overhead
- Vanilla JS state machine

## Testing Checklist

- [x] Build successful
- [x] No TypeScript errors
- [x] Tab switching smooth
- [x] Height lock prevents jump
- [x] Keyboard navigation works
- [x] URL persistence works
- [x] localStorage persistence works
- [x] Reduced motion respected
- [x] ARIA attributes correct
- [x] Focus states visible
- [ ] Cross-browser testing
- [ ] Screen reader testing

## Migration from Old Design

### Removed

- ❌ `PricingCard.astro` (individual cards)
- ❌ Multi-column grid layout
- ❌ Tier-specific accent colors on cards

### Added

- ✅ Tab switcher (role="tablist")
- ✅ Single card design
- ✅ Cross-fade animation
- ✅ Height lock mechanism
- ✅ URL & localStorage sync
- ✅ Keyboard navigation

### Kept

- ✅ Benefits grid (6 items)
- ✅ FAQ accordion (5 items)
- ✅ ScrollReveal animations
- ✅ Same pricing data
- ✅ Same content structure

## Files Modified

### Updated

- `src/components/PricingSection.astro` (complete rewrite)

### Removed (No Longer Used)

- `src/components/PricingCard.astro` (kept for reference, not imported)

### Unchanged

- `src/pages/index.astro` (still imports PricingSection)

## Deep Linking Examples

```
https://domain.com/#pricing           → Default (Starter)
https://domain.com/?tier=growth       → Growth tier
https://domain.com/?tier=pro#pricing  → Pro tier + scroll
```

## Customization

### Change Default Tier

Edit line with `const initialTier`:

```javascript
const initialTier = urlTier || savedTier || "growth"; // default to Growth
```

### Disable Persistence

Remove localStorage lines:

```javascript
// Comment out:
// localStorage.setItem('pricing-tier', tier);
// const savedTier = localStorage.getItem('pricing-tier');
```

### Adjust Animation Speed

Edit transition durations:

```javascript
// Faster (150ms out, 200ms in)
oldPanel.style.transition = "opacity 150ms ...";
newPanel.style.transition = "opacity 200ms ...";
```

## Notes

- Non-breaking spaces (`\u00A0`) prevent price wrapping
- `inert` attribute prevents keyboard focus on hidden panels
- All 3 panels pre-rendered for SEO
- Single source of truth: `tiersJSON` variable
- Smooth on 60Hz and 120Hz displays
