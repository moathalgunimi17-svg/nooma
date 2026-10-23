import type { Locale } from '~/config/site';

const formatters = new Map<string, Intl.NumberFormat>();

/**
 * Formats an OMR amount. Arabic uses Western digits (as Omani shops do) with
 * the Arabic currency symbol; English uses "OMR 12.500".
 */
export function formatPrice(amount: number, locale: Locale, currency = 'OMR'): string {
  const key = `${locale}:${currency}`;
  let f = formatters.get(key);
  if (!f) {
    f = new Intl.NumberFormat(locale === 'ar' ? 'ar-OM-u-nu-latn' : 'en-OM', {
      style: 'currency',
      currency,
      minimumFractionDigits: 3,
      maximumFractionDigits: 3,
    });
    formatters.set(key, f);
  }
  return f.format(amount);
}

/** Rounds to 3 decimals without floating-point drift (OMR has 1000 baisa). */
export function roundOmr(n: number): number {
  return Math.round(n * 1000) / 1000;
}
