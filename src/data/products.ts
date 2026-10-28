/**
 * NOOMA'S PRODUCTS — from "Nooma products.xlsx" (codes, models, sizes, selling prices).
 *
 * - Only the selling price is used. Cost and profit never belong in this file.
 * - A size is listed only when the sheet has stock for it. If the sheet has no
 *   selling price for the whole product, it shows "price on request" and can't be added to the bag.
 * - Photos: save them in src/assets/products/ named after the code (PJ001.jpg,
 *   PJ001-2.jpg…). Until then the code is shown where the photo goes.
 * - After changing anything here, run `npm run catalog:sql` and paste
 *   supabase/catalog.sql into Supabase's SQL Editor so orders keep being recorded.
 */
import type { Product } from './types';

/** Sizes → selling price. `null` = no selling price in the sheet yet. */
type Prices = Record<string, number | null>;

const range = (sizes: string[], price: number | null): Prices => Object.fromEntries(sizes.map((s) => [s, price]));

function product(
  code: string,
  name: { ar: string; en: string },
  categoryId: string,
  prices: Prices,
  featured = false,
): Product {
  const sizeIds = Object.keys(prices).sort((a, b) => Number(a) - Number(b));
  const known = sizeIds.flatMap((s) => (prices[s] === null ? [] : [[s, prices[s]!] as const]));
  const priced = known.length === sizeIds.length;
  return {
    id: code.toLowerCase(),
    code,
    slug: code.toLowerCase(),
    name,
    summary: { ar: '', en: '' },
    description: { ar: '', en: '' },
    categoryId,
    price: priced ? Math.min(...known.map(([, p]) => p)) : null,
    sizePrices: priced ? Object.fromEntries(known) : undefined,
    colourways: [{ id: 'main', name: { ar: '', en: '' }, swatch: '#d0d5e6', photos: [] }],
    sizeIds,
    featured,
    sample: false,
  };
}

const kids = ['100', '110', '120'];
const big = ['130', '140', '150', '160'];

export const products: Product[] = [
  product('PJ001', { ar: 'البنت الزرقاء', en: 'Blue Girl' }, 'girls', { ...range(kids, 4.7), ...range(big, 5.7) }, true),
  product('PJ002', { ar: 'البنت البنية', en: 'Brown Girl' }, 'girls', { ...range(kids, 4.5), ...range(big, 5.5) }, true),
  // 100–120 have no stock in the sheet.
  product('PJ003', { ar: 'الزهرة الوردية', en: 'Pink Flower' }, 'everyone', range(big, 5.7), true),
  product('PJ004', { ar: 'دانتيل بنفسجي', en: 'Purple Dentil' }, 'everyone', { ...range(kids, 4.5), ...range(big, 5.5) }, true),
  product('PJ005', { ar: 'وردي سادة', en: 'Pink Clear' }, 'everyone', { ...range(kids, 4.2), ...range(big, 4.5) }),
  product('PJ006', { ar: 'أزرق سادة', en: 'Blue Clear' }, 'everyone', { ...range(kids, 4.2), ...range(big, 4.5) }),
  product('PJ007', { ar: 'خطوط برتقالية', en: 'Orange Lines' }, 'everyone', { ...range(kids, 4.5), ...range(big, 5.5) }),
  product('PJ008', { ar: 'خطوط خضراء', en: 'Green Lines' }, 'everyone', { ...range(kids, 4.2), ...range(big, 4.5) }),
  product('PJ009', { ar: 'خطوط أزرق رمادي', en: 'Line Blue Grey' }, 'everyone', { ...range(kids, 4.2), ...range(big, 4.5) }),
  product('PJ010', { ar: 'الدب الأخضر', en: 'Green Bear' }, 'everyone', { ...range(kids, 4.5), ...range(big, 5.5) }),
  product('PJ011', { ar: 'ماما وبيبي وردي', en: 'Pink Mom & Baby' }, 'mom-baby',
    { ...range(['90', '100', '110'], 5.9), ...range(['120', '130', '140', '150'], 6.9), ...range(['160', '170'], 9) }),
  product('PJ012', { ar: 'ماما وبيبي أزرق', en: 'Blue Mom & Baby' }, 'mom-baby',
    { ...range(['90', '100', '110'], 5.9), ...range(['120', '130', '140', '150'], 6.9), ...range(['160', '170'], 9) }),
  // No selling price in the sheet yet.
  product('PJ013', { ar: 'ماما وبيبي أصفر', en: 'Yellow Mom & Baby' }, 'mom-baby',
    range(['90', '100', '110', '120', '130', '140', '150', '160', '170'], null)),
  // 110 has no stock in the sheet.
  product('PJ014', { ar: 'ماما وبيبي أزرق', en: 'Blue Mom & Baby' }, 'mom-baby',
    { ...range(['90', '100', '120', '130', '140', '150'], 5.5), ...range(['160', '170'], 8) }),
  product('PJ015', { ar: 'الصاروخ', en: 'Rocket' }, 'everyone',
    { ...range(['90', '100', '110'], 5.9), ...range(['120', '130', '140', '150'], 6.9) }),
  product('PJ016', { ar: 'خطوط حمراء ودب', en: 'Red Line & Bear' }, 'everyone',
    { ...range(['90', '100', '110'], 5.9), ...range(['120', '130', '140', '150'], 6.9) }),
];
