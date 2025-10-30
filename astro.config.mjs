import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://noahisme.vercel.app",
  integrations: [
    tailwind({ applyBaseStyles: false }),
    react({
      include: ['**/react/*'],  // Only hydrate specific React components
    }),
    mdx(),
    sitemap({
      entryLimit: 1000,
      changefreq: "monthly",
      i18n: {
        defaultLocale: "id",
        locales: {
          id: "id-ID",
        },
      },
    })
  ],
  output: "static",
  build: {
    inlineStylesheets: "auto",
    assets: '_astro'
  },
  vite: {
    build: {
      cssCodeSplit: true,
      minify: 'esbuild',  // Use esbuild (faster and built-in)
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            // Aggressive code splitting
            if (id.includes('node_modules')) {
              if (id.includes('react') || id.includes('react-dom')) {
                return 'react-vendor';
              }
              if (id.includes('framer-motion')) {
                return 'framer';
              }
              return 'vendor';
            }
          }
        }
      }
    },
    ssr: {
      noExternal: ['react-icons']
    }
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  },
  compressHTML: true,
  prefetch: false  // Disable prefetch to reduce initial JS
});
