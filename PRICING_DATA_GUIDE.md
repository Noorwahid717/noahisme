# Pricing Data Quick Reference

## Cara Update Konten Pricing

Edit file `src/components/PricingSection.astro` dan modifikasi data arrays:

### 1. Mengubah/Menambah Pricing Tier

```typescript
const tiers: PricingTier[] = [
  {
    id: "starter", // identifier unik
    name: "Starter", // nama tier yang ditampilkan
    target: "...", // segmen target klien
    pricePrimary: "Rp X–Y juta", // harga utama
    priceSecondary: "...", // optional: harga alternatif (per jam)
    billingModel: "per_project", // "per_project" | "per_hour" | "milestone"
    shortDesc: "...", // deskripsi 1-2 kalimat
    ctaPrimary: {
      label: "...", // text tombol
      href: "#contact", // URL tujuan
      intent: "book", // "book" | "contact" | "quote"
    },
    ctaSecondary: {
      // optional
      label: "...",
      href: "#contact",
    },
    included: [
      // array fitur (5-7 items recommended)
      "Fitur 1",
      "Fitur 2",
      // ...
    ],
    notes: [
      // optional: footnote per tier
      "Catatan penting...",
    ],
  },
  // ... tier lainnya
];
```

### 2. Mengubah Benefits

```typescript
const benefits: Benefit[] = [
  { icon: "⭐", title: "Senior-level quality" },
  { icon: "🧩", title: "Systems thinking" },
  // ... tambah/edit sesuai kebutuhan (recommended: 4-6 items)
];
```

### 3. Mengubah FAQ

```typescript
const faqs: FAQ[] = [
  {
    q: "Pertanyaan?",
    a: "Jawaban lengkap...",
  },
  // ... tambah/edit sesuai kebutuhan (recommended: 3-5 items)
];
```

## Kustomisasi Visual

### Mengubah Accent Color per Tier

Edit di `PricingCard.astro` line ~45:

```typescript
const accentColors = {
  starter: "from-blue-500/10 to-teal-500/10 border-blue-500/20",
  growth: "from-orange-500/10 to-amber-500/10 border-orange-500/20",
  pro: "from-emerald-500/10 to-accent/10 border-emerald-500/20",
};
```

### Mengubah Layout Grid

Edit di `PricingSection.astro` line ~188:

```html
<!-- Desktop: 3 kolom, Tablet: 2 kolom, Mobile: 1 kolom -->
<div class="pricing-grid grid gap-8 md:grid-cols-2 lg:grid-cols-3">
  <!-- Alternatif: 2 kolom di semua ukuran -->
  <div class="pricing-grid grid gap-8 md:grid-cols-2">
    <!-- Alternatif: 4 kolom untuk banyak tier -->
    <div class="pricing-grid grid gap-8 md:grid-cols-2 xl:grid-cols-4"></div>
  </div>
</div>
```

## Link CTA

Saat ini semua CTA mengarah ke `#contact`. Update sesuai kebutuhan:

- `#contact` → section contact di halaman
- `/contact` → halaman contact terpisah
- `mailto:email@domain.com` → email langsung
- URL Calendly/Cal.com → booking appointment
- WhatsApp link → chat langsung

Contoh WhatsApp link:

```typescript
ctaPrimary: {
  label: "Chat di WhatsApp",
  href: "https://wa.me/628123456789?text=Halo%2C%20saya%20tertarik%20dengan%20paket%20Starter",
  intent: "contact"
}
```

## Tips Konten

### Pricing Display

- Gunakan format "Rp X–Y juta" untuk range
- Gunakan format "Rp X juta" untuk fixed
- Tambahkan context: "mulai dari", "hingga", "rata-rata"
- Hindari terlalu banyak angka yang membingungkan

### Short Description

- 1-2 kalimat maksimal
- Fokus pada "siapa" dan "untuk apa"
- Hindari jargon teknis berlebihan
- Contoh bagus: "Cocok untuk landing page, portfolio, atau website usaha kecil. Fokus tampilan rapi & cepat go-live."

### Included Features

- 5-7 items per tier (tidak terlalu panjang)
- Mulai dari yang paling penting
- Gunakan bahasa yang jelas, bukan buzzword
- Tambahkan context dalam kurung jika perlu
- Contoh: "Implementasi landing/portfolio (static/SSG)"

### Notes/Footnotes

- Cantumkan S&K penting tapi ringkas
- Timeline estimasi
- Requirement dari klien
- Scope boundaries
- Contoh: "Konten & materi brand disediakan klien. Hosting/domain ditanggung klien."

### FAQ

- Jawab pertanyaan yang sering ditanya klien
- Singkat tapi informatif
- Fokus pada value proposition
- Recommended topics:
  - Revisi policy
  - Timeline
  - Technical requirements
  - Payment terms
  - Support/garansi

## A11y Checklist saat Edit

- [ ] CTA button labels descriptive (bukan hanya "Klik di sini")
- [ ] Contrast ratio teks ≥ 4.5:1 untuk body, ≥ 7:1 untuk heading
- [ ] Harga readable oleh screen reader (gunakan format natural)
- [ ] Icon benefits gunakan `aria-hidden="true"`
- [ ] FAQ accordion keyboard-navigable (native `<details>`)

## Performance Tips

- Jangan tambah gambar berat di card (gunakan icon/emoji)
- Max 4-5 tiers untuk performance optimal
- Max 10 included items per tier
- FAQ max 7-8 items (pagination jika lebih)

## Testing Setelah Update

```bash
# Build check
npm run build

# Dev server
npm run dev

# Check responsive
# - Desktop: 1920px, 1440px, 1024px
# - Tablet: 768px
# - Mobile: 375px, 360px

# Check animations
# - Scroll reveal working
# - Hover states smooth
# - FAQ accordion toggle
# - Reduced motion fallback

# Check accessibility
# - Tab through CTA buttons
# - Screen reader announcement
# - Focus visible
```
