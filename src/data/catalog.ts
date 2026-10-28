/**
 * ─────────────────────────────────────────────────────────────────────────
 *  CATALOGUE
 *
 *  Categories and sizes are fixed here. Products come from Nooma's admin
 *  (the Supabase database) when site.backend is set, read once at build
 *  time; otherwise the SAMPLE products in ./sample-products.ts are used.
 *  While `site.sampleCatalog` is true, sample-flagged products show a
 *  visible "sample" label.
 * ─────────────────────────────────────────────────────────────────────────
 */
import type { Product } from './types';
import { categories, sizes } from './taxonomy';
import { sampleProducts } from './sample-products';
import { loadProducts } from './remote';

export { categories, sizes };

export const products: Product[] = await loadProducts(sampleProducts, categories, sizes);
