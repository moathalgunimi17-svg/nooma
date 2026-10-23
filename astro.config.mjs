// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// SITE_URL / BASE_PATH let the same build deploy to nooma.om or to a
// GitHub Pages preview (e.g. BASE_PATH=/nooma/) without code changes.
const site = process.env.SITE_URL ?? 'https://nooma.om';
const base = process.env.BASE_PATH ?? '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  build: { format: 'directory' },
  i18n: {
    defaultLocale: 'ar',
    locales: ['ar', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'ar', locales: { ar: 'ar-OM', en: 'en' } },
      filter: (page) => !page.includes('/cart/'),
    }),
  ],
  image: { responsiveStyles: false },
  devToolbar: { enabled: false },
});
