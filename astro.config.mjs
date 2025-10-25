import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://noahisme.vercel.app",
  integrations: [
    tailwind({ applyBaseStyles: false }),
    react(),
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
    inlineStylesheets: "auto"
  },
  vite: {
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
            'framer': ['framer-motion'],
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
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover'
  }
});
