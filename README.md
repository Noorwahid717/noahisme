# Mohammad Noor Wahid Portfolio

Portofolio animatif dan berorientasi aksesibilitas untuk Mohammad Noor Wahid. Fokus pada performa tinggi, meta SEO lengkap, dan pengalaman audio yang mematuhi preferensi pengguna.

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

## Deploy ke Vercel

Proyek ini sudah disiapkan untuk Vercel melalui `vercel.json`. Langkah deploy:

1. Pastikan semua dependensi ter-install: `pnpm install`
2. Buat build produksi lokal (opsional untuk verifikasi): `pnpm build`
3. Push branch ke GitHub/GitLab/Bitbucket dan hubungkan repositori di dashboard Vercel.
4. Saat konfigurasi, biarkan _Framework Preset_ terdeteksi sebagai **Astro**. Vercel akan menggunakan:
   - Install command: `pnpm install`
   - Build command: `pnpm build`
   - Output directory: `dist`
5. Untuk deploy manual via CLI:
   ```bash
   pnpm install -g vercel
   vercel login
   vercel --prod
   ```
   Vercel CLI akan membaca pengaturan dari `vercel.json`.

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
