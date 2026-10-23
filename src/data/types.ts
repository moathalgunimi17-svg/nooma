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
  /** Real product photos, relative to src/assets/products/. Empty → art fallback. */
  photos: string[];
  /** Brand illustration used until real photos exist. Always labelled as an illustration. */
  art: ArtKey;
}

export interface Product {
  id: string;
  slug: string;
  name: L10n;
  summary: L10n;
  description: L10n;
  categoryId: string;
  /** Price in OMR. null = not yet confirmed (product can be browsed, not added). */
  price: number | null;
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
  name: L10n;
  price: number | null;
  categoryId: string;
  sizes: { id: string; label: L10n }[];
  colourways: { id: string; name: L10n; swatch: string; thumb: string }[];
  stock?: Record<string, number>;
  sample: boolean;
  /** Pre-normalised search text (both languages). */
  search: string;
}
