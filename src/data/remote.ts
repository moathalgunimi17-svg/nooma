/**
 * Reads Nooma's products from the admin database at build time.
 * The site is static: a change made in the admin appears after "Publish"
 * rebuilds the site (see .github/workflows/publish.yml).
 */
import { site } from '~/config/site';
import type { ArtKey, CategoryDef, Product, SizeDef } from './types';

export const artKeys: ArtKey[] = [
  'kid-baking', 'kid-brushing', 'kid-camera', 'kid-facemask', 'kid-reading', 'kid-stretch', 'mirror-siblings',
];

/** Row shapes as stored in supabase/setup.sql. */
export interface ColourwayRow {
  id: string;
  name_ar: string;
  name_en: string;
  swatch: string;
  photos: string[] | null;
  art: string;
  sort: number;
}

export interface ProductRow {
  id: string;
  slug: string;
  name_ar: string;
  name_en: string;
  summary_ar: string;
  summary_en: string;
  description_ar: string;
  description_en: string;
  category_id: string;
  price: number | string | null;
  compare_at_price: number | string | null;
  size_ids: string[] | null;
  stock: Record<string, number> | null;
  code?: string | null;
  size_prices?: Record<string, number | string> | null;
  featured: boolean;
  sample: boolean;
  sort: number;
  colourways: ColourwayRow[] | null;
}

const num = (v: number | string | null) => (v === null || v === '' ? null : Number(v));

/**
 * Turns database rows into catalogue products. Rows that can't be shown
 * correctly (unknown category, no known size, no colour) are skipped with a
 * warning rather than breaking the build.
 */
export function rowsToProducts(rows: ProductRow[], categories: CategoryDef[], sizes: SizeDef[]): Product[] {
  const cats = new Set(categories.map((c) => c.id));
  const sizeOrder = new Map(sizes.map((s, i) => [s.id, i]));
  const out: Product[] = [];
  for (const r of [...rows].sort((a, b) => a.sort - b.sort)) {
    const sizeIds = (r.size_ids ?? []).filter((id) => sizeOrder.has(id)).sort((a, b) => sizeOrder.get(a)! - sizeOrder.get(b)!);
    const colourways = [...(r.colourways ?? [])]
      .sort((a, b) => a.sort - b.sort)
      .map((c) => ({
        id: c.id,
        name: { ar: c.name_ar, en: c.name_en },
        swatch: c.swatch,
        photos: c.photos ?? [],
        art: (artKeys as string[]).includes(c.art) ? (c.art as ArtKey) : 'kid-reading',
      }));
    if (!cats.has(r.category_id) || !sizeIds.length || !colourways.length) {
      console.warn(`[catalog] skipped "${r.slug}": needs a known category, at least one size and one colour`);
      continue;
    }
    const price = num(r.price);
    const compareAt = num(r.compare_at_price);
    const sizePrices = r.size_prices
      ? Object.fromEntries(Object.entries(r.size_prices).map(([k, v]) => [k, Number(v)]).filter(([, v]) => Number.isFinite(v)))
      : null;
    out.push({
      id: r.id,
      ...(r.code ? { code: r.code } : {}),
      slug: r.slug,
      name: { ar: r.name_ar, en: r.name_en || r.name_ar },
      summary: { ar: r.summary_ar, en: r.summary_en || r.summary_ar },
      description: { ar: r.description_ar, en: r.description_en || r.description_ar },
      categoryId: r.category_id,
      price,
      ...(sizePrices && Object.keys(sizePrices).length ? { sizePrices } : {}),
      compareAtPrice: price !== null && compareAt !== null && compareAt > price ? compareAt : null,
      colourways,
      sizeIds,
      ...(r.stock ? { stock: r.stock } : {}),
      featured: r.featured,
      sample: r.sample,
    });
  }
  return out;
}

export async function loadProducts(fallback: Product[], categories: CategoryDef[], sizes: SizeDef[]): Promise<Product[]> {
  const b = site.backend;
  if (!b) return fallback;
  const url = `${b.supabaseUrl}/rest/v1/products?select=*,colourways(*)&active=eq.true`;
  const res = await fetch(url, { headers: { apikey: b.supabaseAnonKey, Authorization: `Bearer ${b.supabaseAnonKey}` } });
  // Fail the build rather than publish an empty shop.
  if (!res.ok) throw new Error(`[catalog] could not read products from the admin database: ${res.status} ${await res.text()}`);
  return rowsToProducts((await res.json()) as ProductRow[], categories, sizes);
}
