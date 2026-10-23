import type { Locale } from '~/config/site';

const BASE = import.meta.env.BASE_URL.replace(/\/?$/, '/');

/**
 * Builds a locale-aware internal URL. `path` is locale-free and
 * slash-delimited, e.g. "shop/" or "products/cloud-dreams/".
 * Arabic lives at the root; English under /en/.
 */
export function href(locale: Locale, path = ''): string {
  const clean = path.replace(/^\/+/, '');
  return BASE + (locale === 'en' ? 'en/' : '') + clean;
}

/** Strips base + locale prefix from a pathname, giving the locale-free path. */
export function stripLocale(pathname: string): string {
  let p = pathname.startsWith(BASE) ? pathname.slice(BASE.length) : pathname.replace(/^\//, '');
  if (p === 'en' || p.startsWith('en/')) p = p.slice(2).replace(/^\//, '');
  return p;
}

/** Same page in the other language — keeps the customer where they are. */
export function alternate(pathname: string, to: Locale): string {
  const path = stripLocale(pathname);
  // The 404 page exists once (Arabic); its language switch leads home instead.
  return href(to, path.startsWith('404') ? '' : path);
}

export const routes = {
  home: '',
  shop: 'shop/',
  collection: (slug: string) => `collections/${slug}/`,
  product: (slug: string) => `products/${slug}/`,
  cart: 'cart/',
  sizeGuide: 'size-guide/',
  about: 'about/',
  contact: 'contact/',
  faq: 'faq/',
  shipping: 'shipping/',
  returns: 'returns/',
  privacy: 'privacy/',
  terms: 'terms/',
} as const;
