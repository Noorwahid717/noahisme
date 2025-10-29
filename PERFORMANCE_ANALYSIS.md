# Analisis Performa Lighthouse - About Page

## 📊 Metrics Saat Ini

| Metric         | Score | Status | Target |
| -------------- | ----- | ------ | ------ |
| Performance    | 75    | ⚠️     | 90+    |
| Accessibility  | 94    | ✅     | 90+    |
| Best Practices | 93    | ✅     | 90+    |
| SEO            | 100   | ✅     | 90+    |

### Core Web Vitals Detail

| Metric                             | Current | Target | Status  |
| ---------------------------------- | ------- | ------ | ------- |
| **FCP** (First Contentful Paint)   | 1.2s    | <1.8s  | ✅ Good |
| **LCP** (Largest Contentful Paint) | 4.1s    | <2.5s  | ❌ Poor |
| **TBT** (Total Blocking Time)      | 50ms    | <200ms | ✅ Good |
| **CLS** (Cumulative Layout Shift)  | 0.003   | <0.1   | ✅ Good |
| **SI** (Speed Index)               | 1.4s    | <3.4s  | ✅ Good |

## 🔍 Diagnosis Masalah Utama

### 1. **LCP: 4.1s (Target: <2.5s)** - CRITICAL ❌

**Penyebab:**

- **React vendor bundle (246 KB)** - Blocking render untuk CTAButton
- **Client-side hydration** - CTAButton dengan `client:load` memblock LCP
- **Font loading** - Multiple font subsets (Inter + Spectral) tanpa font-display optimization
- **WaveDivider SVG** - Render blocking di atas fold

**Impact:** +4 point, menunda interaksi utama halaman

### 2. **Component Hydration Overhead**

**Komponen yang bermasalah:**

```typescript
// About page
<CTAButton client:load href="/contact">  // ❌ Blocking LCP
  Mulai Diskusi
</CTAButton>

// Index page
<TiltingCard client:idle {...card} />    // ⚠️ Multiple instances
<ProcessStepCard client:visible {...step} /> // ⚠️ Multiple instances
```

**Masalah:**

- `client:load` memblock main thread saat page load
- React vendor (246 KB) harus di-load dan parse sebelum hydration
- Total Blocking Time: 50ms (masih oke, tapi bisa lebih baik)

### 3. **Font Loading Strategy**

**Font files yang di-load:**

- Inter (6 subsets): latin, latin-ext, cyrillic, cyrillic-ext, greek, greek-ext
- Spectral (3 weights): 400, 600, 700
- Total: **~360 KB fonts**

**Masalah:**

- Tidak ada `font-display: swap` di @font-face
- Font di-load sebelum LCP element visible
- Multiple subsets yang mungkin tidak diperlukan

### 4. **JavaScript Execution**

**Bundle breakdown:**

- `react-vendor.js`: 246 KB (80 KB gzipped) - terbesar
- `vendor.js`: 48 KB
- `CTAButton.js`: 28 KB
- `typed.js`: 12 KB (untuk hero typing effect)
- **Total JS**: ~334 KB raw / ~120 KB gzipped

## 🎯 Rekomendasi Optimasi (Priority Order)

### Priority 1: Fix LCP (Target +15-20 points)

#### A. Optimize CTAButton Hydration

```astro
<!-- ❌ Before: Blocks LCP -->
<CTAButton client:load href="/contact"> Mulai Diskusi </CTAButton>

<!-- ✅ After: Non-blocking -->
<a
  href="/contact"
  class="cta-button-static inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-medium text-white transition-all hover:shadow-lg"
>
  Mulai Diskusi
</a>

<!-- OR: Lazy load below fold -->
<CTAButton client:visible href="/contact"> Mulai Diskusi </CTAButton>
```

**Impact:** -100-150ms LCP, +5-8 points

#### B. Preload Critical Resources

```astro
<!-- In Base.astro <head> -->
<link
  rel="preload"
  href="/fonts/inter-latin-wght-normal.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>
<link rel="preload" href="/_astro/react-vendor.mxy5lWMr.js" as="script" />
```

**Impact:** -50-100ms LCP, +2-3 points

#### C. Optimize Font Loading

```css
/* In fonts.css */
@font-face {
  font-family: "Inter";
  font-display: swap; /* ✅ Add this */
  /* ... */
}
```

**Impact:** -50ms LCP, +1-2 points

### Priority 2: Reduce Font Payload (Target +3-5 points)

#### Remove Unused Font Subsets

```typescript
// Only keep essential subsets
const neededSubsets = ["latin", "latin-ext"]; // Remove cyrillic, greek
```

**Impact:** -120 KB fonts, +3-5 points

### Priority 3: Optimize JavaScript Delivery

#### A. Code Splitting for CTAButton

```typescript
// Create lightweight static version
export const CTAButtonStatic = ({ href, children }) => (
  <a href={href} class="cta-button">{children}</a>
);

// Use in above-fold content
import CTAButtonStatic from '~/components/CTAButtonStatic.astro';
```

**Impact:** -28 KB initial load, +2-3 points

#### B. Change Hydration Strategy

```astro
<!-- Change from client:load to client:visible -->
<TiltingCard client:visible {...card} />
<ProcessStepCard client:visible {...step} />
```

**Impact:** Better TBT, +1-2 points

### Priority 4: Image Optimization

#### Add fetchpriority for LCP image

```astro
<img src={hero.image} fetchpriority="high" <!-- ✅ Prioritize LCP -- />
loading="eager" <!-- ✅ No lazy loading -->
/>
```

## 📈 Expected Results After Optimization

| Metric      | Before | After (Estimated) | Improvement |
| ----------- | ------ | ----------------- | ----------- |
| Performance | 75     | 90-93             | +15-18      |
| FCP         | 1.2s   | 0.9-1.0s          | -200-300ms  |
| LCP         | 4.1s   | 2.2-2.5s          | -1.6-1.9s   |
| TBT         | 50ms   | 20-30ms           | -20-30ms    |
| Bundle Size | 334 KB | 260 KB            | -74 KB      |

## 🚀 Implementation Priority

### Phase 1: Quick Wins (30 min)

1. ✅ Add `font-display: swap` to all @font-face
2. ✅ Change CTAButton from `client:load` to static or `client:visible`
3. ✅ Add preload for critical fonts
4. ✅ Add fetchpriority="high" to hero elements

**Expected gain:** +8-12 points

### Phase 2: Font Optimization (1 hour)

1. ✅ Remove unused font subsets (cyrillic, greek)
2. ✅ Subset fonts to only used characters
3. ✅ Use variable fonts instead of multiple weights

**Expected gain:** +3-5 points

### Phase 3: Code Splitting (2 hours)

1. ✅ Create static version of CTAButton for above-fold
2. ✅ Lazy load heavy components (typed.js, framer-motion)
3. ✅ Split react-vendor into smaller chunks

**Expected gain:** +2-3 points

### Phase 4: Advanced (Optional)

1. Consider static HTML for hero section
2. Implement route-based code splitting
3. Add service worker for caching

## 🔧 Files to Modify

### Critical Files:

1. `src/styles/fonts.css` - Add font-display: swap
2. `src/pages/about.astro` - Replace CTAButton with static
3. `src/layouts/Base.astro` - Add preload hints
4. `astro.config.mjs` - Configure font subsetting

### Optional Files:

5. `src/components/CTAButton.tsx` - Create static variant
6. `src/pages/index.astro` - Optimize hydration strategy
7. `vite.config.ts` - Configure bundle splitting

## 📝 Notes

- LCP adalah masalah utama (4.1s vs target 2.5s)
- React hydration overhead signifikan untuk simple buttons
- Font payload bisa dikurangi 30-40%
- TBT dan CLS sudah bagus, focus ke LCP
- Accessibility dan SEO sudah excellent

## ✅ Action Items Checklist

- [ ] Add font-display: swap
- [ ] Replace client:load with static or client:visible
- [ ] Add resource hints (preload, preconnect)
- [ ] Remove unused font subsets
- [ ] Add fetchpriority to hero elements
- [ ] Test on mobile device (3G throttling)
- [ ] Re-run Lighthouse after each phase
