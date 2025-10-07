# Noah Isme Portfolio

Portofolio animatif dan berorientasi aksesibilitas untuk Noah Isme.

## Jalankan secara lokal

```bash
pnpm install
pnpm dev
```

## Skrip penting

- `pnpm lint` – ESLint untuk Astro, TypeScript, dan React.
- `pnpm typecheck` – Validasi tipe dengan `astro check`.
- `pnpm test` – Playwright end-to-end + audit aksesibilitas dasar.
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

Audio SFX di-inline melalui modul `src/lib/audio-data.ts` sehingga tidak perlu file biner terpisah.
