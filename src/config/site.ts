/**
 * Nooma — central business configuration.
 *
 * Everything a non-developer may need to change before launch lives here.
 * Values marked VERIFIED were supplied by Nooma (Instagram bio + brief).
 * Values set to `null` are unknown: the UI shows a "to be confirmed" state
 * instead of inventing an answer.
 */

export const site = {
  name: { ar: 'نُومة', en: 'Nooma' },
  domain: 'https://nooma.om', // VERIFIED (brief)

  contact: {
    // VERIFIED — use exactly as supplied.
    email: 'noomawholesale2026@gmail.com',
    instagramHandle: 'nooma.om',
    instagramUrl: 'https://www.instagram.com/nooma.om/',
    // VERIFIED — the WhatsApp link shown in the Instagram bio.
    whatsappLink: 'https://wa.me/message/44ZHUR56MI5GD1',
    // VERIFIED as supplied (local format). No country code has been confirmed,
    // so it is shown and dialled exactly as given.
    phoneDisplay: '96102882',
    phoneTel: '96102882',
    /**
     * International WhatsApp number, digits only (e.g. "968XXXXXXXX").
     * NOT CONFIRMED — leave null until Nooma confirms it.
     *  - null  → the order is copied to the clipboard and the verified
     *            wa.me/message link opens; the customer pastes it.
     *  - set   → wa.me/<number>?text=<order> opens with the order prefilled.
     */
    whatsappNumber: null as string | null,
  },

  /** Statements taken from Nooma's Instagram bio — safe to show. */
  claims: {
    shipsWorldwide: true, // "نوصل لجميع دول العالم 🌍"
    basedIn: { ar: 'عُمان', en: 'Oman' },
  },

  commerce: {
    currency: 'OMR',
    /** Prices are stored in baisa-free decimal OMR (3 decimals). */
    currencyDecimals: 3,
    /**
     * Shipping rules are NOT confirmed. While null, the cart shows
     * "shipping confirmed on WhatsApp" and never adds a fee.
     */
    shipping: null as null | {
      flatFee?: number;
      freeOver?: number;
    },
    /** Optional gift note the customer can add to the WhatsApp order. */
    giftNote: true,
    maxQtyPerLine: 10,
  },

  /**
   * Announcement bar. Keep to verified statements only.
   * Set enabled:false to hide it.
   */
  announcement: {
    enabled: true,
    ar: 'نوصل لجميع دول العالم — والطلب سهل عبر الواتساب',
    en: 'We deliver worldwide — ordering is easy on WhatsApp',
  },

  /**
   * True while the catalogue in src/data/catalog.ts is sample data.
   * Shows a visible "sample" notice on products and prices.
   * Set to false ONLY after real products, prices and sizes are in place.
   */
  sampleCatalog: true,
} as const;

export type Locale = 'ar' | 'en';
export const locales: Locale[] = ['ar', 'en'];
export const defaultLocale: Locale = 'ar';
