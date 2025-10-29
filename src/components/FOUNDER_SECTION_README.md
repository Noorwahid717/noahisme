# Founder Section - Denqid Style

## 📋 Overview

Founder Section dengan gaya Denqid yang telah diimplementasikan berdasarkan referensi HTML asli dari denqid.com, disesuaikan dengan data yang relevan dari profil Mohammad Noor Wahid.

## 🎨 Components Created

### 1. `FounderSection.astro`

Container utama dengan layout responsif yang mencakup:

- **Header section** dengan "The founder" label dan garis dekoratif
- **Main title** "Pushing Ideas since 2021" di tengah
- **Grid layout** 2 kolom untuk foto dan informasi

### 2. `FounderCard.astro`

Card foto profil dengan efek:

- Grayscale filter (100% → 80% on hover)
- Rotation -2° (desktop) / -1° (mobile)
- Hover scale & shadow effect
- Sticky positioning saat scroll
- **Identity overlay** dengan nama dan social links
- Social media buttons: GitHub & LinkedIn

### 3. `FounderInfo.astro`

Informasi founder dengan:

- **Bio paragraph** dengan typography besar (h4)
- **Emoji icon** (smiley face) dengan warna accent (#ff3700)
- **Experience timeline** dengan 4 entries + hover effects:
  - Founder: Noah Is Me (2021 – Now)
  - Developer: PT Buroq Sakti Terbang (2023 – 2024)
  - Project: GEMA SMAWA (2024 – Now)
  - Education: Universitas Wahidiyah (2020 – 2024)

## 🎯 Design Features (Denqid-inspired)

### Header Section

- **Label dengan garis**: "The founder" dengan garis horizontal di kiri & kanan
- **Centered title**: "Pushing Ideas since 2021" dengan year dalam warna muted
- Clean, minimalist aesthetic

### Typography

- Header title: `clamp(2rem, 5vw, 3rem)` - centered, bold
- Bio description: `clamp(1.25rem, 2.5vw, 1.5rem)` - h4 style, readable
- Timeline text: `0.875rem - 1rem` dengan consistent spacing

### Colors (Monochrome Palette)

- Primary text: `#111111`
- Muted text: `rgba(0, 0, 0, 0.5)` - 0.6
- Borders: `rgba(0, 0, 0, 0.1)`
- Background card: `#ECECEC`
- Accent (emoji): `#FF3700`
- Social links: `rgba(0, 0, 0, 0.5)` → 0.8 on hover

### Layout

- Max-width: `1440px`
- Horizontal padding: `10-15vw` (responsive)
- Grid: 2 columns on desktop (0.85fr + 1.15fr), stacked on mobile
- Border radius: `24-40px` (large, soft edges)

### Effects & Interactions

- **Photo card**:
  - Grayscale 100% (80% on hover)
  - Rotation -2° with smooth transition
  - Hover: Scale 1.02 + enhanced shadow
- **Social links**:
  - Circle buttons with 40px size
  - Hover: background fade + color darkening
- **Timeline rows**:
  - Border-based separators
  - Hover: subtle background + padding shift
- **Smooth transitions**: `0.3s - 0.4s cubic-bezier(0.16, 1, 0.3, 1)`

## 📱 Responsive Behavior

### Desktop (≥1024px)

- 2-column grid layout
- Photo sticky on scroll (top: 8rem)
- Full rotation effect (-2°)
- Identity overlay positioned absolute (bottom-right)

### Tablet (768px - 1023px)

- 2-column grid maintained
- Reduced gaps and padding
- Timeline maintains 3-column grid

### Mobile (<768px)

- Stacked vertical layout
- Photo centered above text
- Identity moved below photo (static)
- Timeline simplified: stacked or 2-column
- All text center-aligned

## 🔗 Social Media Links

Configured in `FounderCard.astro`:

- **GitHub**: https://github.com/noah-isme
- **LinkedIn**: https://www.linkedin.com/in/mohammad-noor-wahid

Icons: Phosphor Icons (same as Denqid reference)

## 🖼️ Photo Requirements

Location: `/public/images/noah.png`

Note: profile image is now hosted on Supabase:
`https://gyyiuhgcbggxzozasfji.supabase.co/storage/v1/object/public/public-assets/noahisme/noah.png`

- Aspect ratio: 3:4
- Current: 928x1120px PNG ✅
- Auto-applied: Grayscale filter

## 🔧 Integration

Added to `src/pages/index.astro` between Process Steps section and Testimonials section.

Section ID: `#about` for navigation anchoring

## ✨ Unique Features (Denqid-style)

1. **Decorative Header** - "The founder" label dengan garis horizontal dekoratif
2. **Centered Title** - Large centered heading di atas grid content
3. **Sticky Photo Card** - Photo tetap visible saat scrolling
4. **Tilt Animation** - Subtle rotation untuk dynamic visual interest
5. **Identity Overlay** - Nama, social links, dan role di atas/samping foto
6. **Emoji Accent** - Smiley face icon dengan brand color
7. **Interactive Timeline** - Hover effects pada setiap row
8. **Fluid Typography** - Responsive scaling untuk semua text sizes
9. **Layered Shadows** - Depth tanpa harsh edges
10. **Monochrome + Accent** - Clean B&W palette dengan orange accent

## 🎬 Animation Details

- **Card hover**:
  - Rotation: -2° → -1°
  - Scale: 1 → 1.02
  - Timing: `0.4s cubic-bezier(0.16, 1, 0.3, 1)`
- **Photo filter**: Grayscale 100% → 80%
- **Social links**:
  - Color: rgba(0,0,0,0.5) → 0.8
  - Background: transparent → rgba(0,0,0,0.05)
  - Timing: `0.3s ease`
- **Timeline rows**:
  - Background fade on hover
  - Padding shift for depth
  - Timing: `0.3s ease`

## 📐 Reference Compliance

Berdasarkan HTML reference dari `docs/founder.html`:

✅ Decorative header dengan "The founder" label  
✅ Centered main title dengan year muted  
✅ Photo card dengan rotation dan shadow  
✅ Identity section dengan nama dan social links  
✅ Bio description dengan emoji icon  
✅ Timeline/experience table dengan borders  
✅ Monochrome color palette  
✅ Responsive grid layout  
✅ Smooth hover transitions  
✅ Clean, minimalist aesthetic

## 🎨 Customization

Data dapat diubah di masing-masing file:

- **Social links**: `FounderCard.astro` (lines 15-45)
- **Bio text**: `FounderInfo.astro` (lines 11-14)
- **Timeline entries**: `FounderInfo.astro` (lines 27-46)
- **Year founded**: `FounderSection.astro` (line 13)

---

**Status:** ✅ Updated with Denqid reference  
**Data Source:** `docs/PROFILE.md`  
**Design Reference:** `docs/founder.html` (Denqid.com)  
**Relevance:** 100% accurate with actual profile data
