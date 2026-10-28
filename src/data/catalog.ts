/**
 * ─────────────────────────────────────────────────────────────────────────
 *  CATALOGUE
 *
 *  Categories and sizes are fixed in ./taxonomy.ts. Products come from
 *  ./products.ts (Nooma's own list) while site.catalogSource is 'file'.
 *  With 'admin' they are read once at build time from the admin database.
 * ─────────────────────────────────────────────────────────────────────────
 */
import type { Product } from './types';
import { site } from '~/config/site';
import { categories, sizes } from './taxonomy';
import { products as fileProducts } from './products';
import { loadProducts } from './remote';

export { categories, sizes };

export const products: Product[] =
  site.catalogSource === 'file' ? fileProducts : await loadProducts(fileProducts, categories, sizes);
