import type { ClientProduct } from '~/data/types';
import type { Locale } from '~/config/site';

export interface ClientConfig {
  locale: Locale;
  whatsappLink: string;
  whatsappNumber: string | null;
  maxQty: number;
  sample: boolean;
  productBase: string;
  cartUrl: string;
  strings: Record<string, string>;
}

function readJson<T>(id: string, fallback: T): T {
  const el = document.getElementById(id);
  if (!el?.textContent) return fallback;
  try {
    return JSON.parse(el.textContent) as T;
  } catch {
    return fallback;
  }
}

export const config = readJson<ClientConfig>('nooma-config', {
  locale: 'ar',
  whatsappLink: '',
  whatsappNumber: null,
  maxQty: 10,
  sample: true,
  productBase: '/products/',
  cartUrl: '/cart/',
  strings: {},
});
export const catalog = readJson<ClientProduct[]>('nooma-catalog', []);
export const productById = new Map(catalog.map((p) => [p.id, p]));

export function s(key: string, vars?: Record<string, string | number>): string {
  let out = config.strings[key] ?? key;
  if (vars) for (const [k, v] of Object.entries(vars)) out = out.replaceAll(`{${k}}`, String(v));
  return out;
}

export const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
