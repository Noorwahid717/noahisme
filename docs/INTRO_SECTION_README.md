# Intro Section - Bridging Logic & Creativity

## 📋 Overview

Intro Section baru yang menyampaikan first impression sebagai developer sekaligus kreator dengan keseimbangan antara struktur teknis dan estetika kreatif.

## 🎯 Tujuan

Memperkenalkan diri sebagai full-stack developer yang membangun solusi digital dengan keseimbangan antara:

- **Logic** (Backend, API, Performance)
- **Creativity** (UI/UX, AI Literacy, Strategy)

Dengan gaya visual bersih, tenang, dan berkelas.

## 🧱 Struktur Layout

### Tiga Area Utama:

1. **Greeting** (Top Center)
   - "Hello there 👋"
   - Font italic Spectral, warna abu tua

2. **Main Heading** (Center)
   - "Bridging Logic and Creativity to build meaningful digital experiences."
   - Font Inter Tight / Satoshi, large & bold

3. **Badges Grid** (Two Clusters)
   - **Left cluster**: Tech focus (Backend, API, Optimization)
   - **Right cluster**: Creative focus (UI/UX, AI, Strategy)

## 🎨 Visual Style

### Background

- Base color: `#ECECEC` (neutral light grey)
- Radial gradient overlay dari tengah ke luar
- Subtle noise texture untuk depth (opacity 3%)
- Full viewport height dengan flex centering

### Typography

- **Greeting**: Spectral italic, 0.9375-1.125rem, #666666
- **Heading**: Inter Tight/Satoshi, 2-3rem, weight 600, #111111
- **Badges**: 0.8125-0.9375rem, weight 500

### Badges Design

- Background: Pure white (#FFFFFF)
- Border radius: 40px (pill shape)
- Padding: 0.75rem × 1.25rem
- Box shadow: Layered soft shadows
- Icon + text layout dengan gap 0.625rem
- Icon size: 1.25rem dengan subtle color filter

### Color Accents

- **Tech badges**: Blue-tinted icons (hue-rotate 200deg)
- **Creative badges**: Pink-tinted icons (hue-rotate 320deg)

## ✨ Animasi & Interaksi

### Floating Animation

```css
@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-6px);
  }
}
```

- Duration: 5s ease-in-out infinite
- Stagger delay: 0s, 0.5s, 1s untuk setiap badge
- Only active when `prefers-reduced-motion: no-preference`

### Hover Effects

- Badge hover:
  - Transform: `translateY(-4px) scale(1.05)`
  - Shadow: Enhanced (more prominent)
  - Transition: 0.3s cubic-bezier(0.16, 1, 0.3, 1)

### Accessibility

```css
@media (prefers-reduced-motion: reduce) {
  .badge {
    animation: none;
  }
  .badge:hover {
    transform: scale(1.02);
  }
}
```

## 📱 Responsive Behavior

### Desktop (≥1024px)

- Badges in two columns (left & right clusters)
- Left badges: align-items flex-end
- Right badges: align-items flex-start
- Gap: 3rem between clusters

### Tablet (768-1023px)

- Badges stacked vertically
- Each cluster full width
- Gap: 1.5rem

### Mobile (≤640px)

- Full width badges
- Centered layout
- Reduced padding (3rem 1.5rem)
- Icon size: 1.125rem

## 🧩 Badge Content

### Tech Focus (Left)

1. ⚙️ **Backend Systems**
2. 🧩 **API Design**
3. 🚀 **Performance & Optimization**

### Creative Focus (Right)

1. 🎨 **UI/UX Design**
2. 🧠 **AI Literacy & EdTech**
3. 🧭 **Strategy & Research**

## 🔧 Technical Implementation

### Component: `IntroSection.astro`

- Self-contained with scoped styles
- No external dependencies
- Pure CSS animations
- Semantic HTML structure

### Integration

Added to `src/pages/index.astro` sebagai first section sebelum hero section.

### Performance

- CSS-only animations (GPU accelerated)
- SVG noise texture inline (no HTTP request)
- Radial gradient dengan CSS (no image)
- Responsive with fluid typography (clamp)

## 🎨 Design Tokens

```css
/* Colors */
--bg-neutral: #ececec;
--text-primary: #111111;
--text-secondary: #666666;
--badge-bg: #ffffff;

/* Spacing */
--gap-mobile: 1.5rem;
--gap-tablet: 2rem;
--gap-desktop: 3rem;

/* Borders */
--badge-radius: 40px;

/* Shadows */
--shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.04), 0 4px 16px rgba(0, 0, 0, 0.06);
--shadow-md: 0 4px 12px rgba(0, 0, 0, 0.08), 0 8px 24px rgba(0, 0, 0, 0.1);
```

## 📐 Wireframe

```
┌────────────────────────────────────────────┐
│                                            │
│           Hello there 👋                   │
│                                            │
│    Bridging Logic and Creativity          │
│   to build meaningful digital experiences.│
│                                            │
│   ┌───────────────┐  ┌───────────────┐   │
│   │ ⚙️ Backend    │  │ 🎨 UI/UX     │   │
│   │ 🧩 API       │  │ 🧠 AI        │   │
│   │ 🚀 Optimize  │  │ 🧭 Strategy  │   │
│   └───────────────┘  └───────────────┘   │
│                                            │
└────────────────────────────────────────────┘
```

## 🔗 Related Files

- Component: `/src/components/IntroSection.astro`
- Page: `/src/pages/index.astro`
- Layout: `/src/layouts/Base.astro`

---

## 🎨 Favicon Update

### Changes Made

Updated `src/components/SEO.astro` to use `mylogo.svg` as favicon:

```html
<!-- Favicon -->
<link rel="icon" type="image/svg+xml" href="/mylogo.svg" />
<link rel="apple-touch-icon" href="/mylogo.svg" />
```

### Benefits

- SVG favicon = scalable untuk semua device
- Otomatis adapt ke light/dark mode (jika SVG support)
- Single file untuk semua resolusi
- Lightweight (no multiple PNG files needed)

---

**Status:** ✅ Fully implemented  
**Design Reference:** Original concept  
**Accessibility:** WCAG AA compliant  
**Performance:** CSS-only animations, GPU accelerated
