# Noah Isme Portfolio

Portofolio animatif dan berorientasi aksesibilitas untuk Noah Isme. Fokus pada performa tinggi, meta SEO lengkap, dan pengalaman audio yang mematuhi preferensi pengguna.

## Jalankan secara lokal

```bash
pnpm install
pnpm dev
```

## Skrip penting

- `pnpm lint` – ESLint untuk Astro, TypeScript, dan React.
- `pnpm typecheck` – Validasi tipe dengan `astro check`.
- `pnpm test:unit` – Unit test Vitest + Testing Library.
- `pnpm test:e2e` – Playwright end-to-end & audit aksesibilitas (axe).
- `pnpm test` – Menjalankan unit test dan E2E berurutan.
- `pnpm build` – Build produksi Astro.

## Struktur

```
src/
  components/
  layouts/
  pages/
  content/
  lib/
  styles/
```

### Catatan aksesibilitas & performa

- Audio SFX di-inline melalui modul `src/lib/audio-data.ts` sehingga tidak perlu file biner terpisah.
- Komponen `AudioButton` menghormati `prefers-reduced-motion` dan tidak pernah autoplay.
- Font Inter & Spectral di-host lokal (WOFF2) dan dipreload dengan `font-display: swap`.
- Gambar dioptimasi dengan `astro:assets` untuk decoding async & lazy-loading.
- JSON-LD (Person, WebSite, BreadcrumbList) dan meta OG/Twitter disediakan melalui komponen `<SEO />`.
- `@astrojs/sitemap` menghasilkan `sitemap.xml` dan `robots.txt` otomatis.
