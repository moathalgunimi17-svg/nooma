import type { Locale } from '~/config/site';

export type L10n = Record<Locale, string>;

/** Brand illustration keys — see src/lib/art.ts. */
export type ArtKey =
  | 'kid-baking'
  | 'kid-brushing'
  | 'kid-camera'
  | 'kid-facemask'
  | 'kid-reading'
  | 'kid-stretch'
  | 'mirror-siblings';

export interface CategoryDef {
  id: string;
  slug: string;
  name: L10n;
  blurb: L10n;
  art: ArtKey;
  /** Soft tint behind the art, as a token name from tokens.css. */
  tint: 'blush' | 'lavender' | 'butter' | 'peach';
}

export interface SizeDef {
  id: string;
  label: L10n;
}

export interface Colourway {
  id: string;
  name: L10n;
  /** Swatch colour (display only). */
  swatch: string;
  /** Extra photo files (relative to src/assets/products/) or admin-uploaded URLs. */
  photos: string[];
  /** Kept for products that come from the admin database; not shown on product pages. */
  art?: ArtKey;
}

export interface Product {
  id: string;
  /**
   * Nooma's product code (e.g. "PJ001"). Photos named after it in
   * src/assets/products/ (PJ001.jpg, PJ001-2.jpg…) are picked up automatically;
   * until one exists, the code is shown where the photo goes.
   */
  code?: string;
  slug: string;
  name: L10n;
  summary: L10n;
  description: L10n;
  categoryId: string;
  /** Price in OMR. null = not yet confirmed (product can be browsed, not added). */
  price: number | null;
  /** Price per size id, when sizes cost different amounts. `price` is then the lowest. */
  sizePrices?: Record<string, number>;
  /** Previous price — set ONLY when a real sale is running. */
  compareAtPrice?: number | null;
  colourways: Colourway[];
  sizeIds: string[];
  /**
   * Units in stock per size id. Omit entirely when inventory is not tracked;
   * the store then never shows stock messages.
   */
  stock?: Record<string, number>;
  featured: boolean;
  /** true = development sample, not a real Nooma product. */
  sample: boolean;
}

/** Shape shipped to the browser for cart / search (no long descriptions). */
export interface ClientProduct {
  id: string;
  slug: string;
  code?: string;
  name: L10n;
  price: number | null;
  sizePrices?: Record<string, number>;
  categoryId: string;
  sizes: { id: string; label: L10n }[];
  colourways: { id: string; name: L10n; swatch: string; thumb: string }[];
  stock?: Record<string, number>;
  sample: boolean;
  /** Pre-normalised search text (both languages). */
  search: string;
}
