import { describe, expect, it } from 'vitest';
import { rowsToProducts, type ProductRow } from '~/data/remote';
import { categories, sizes } from '~/data/taxonomy';
import { orderPayload } from '~/lib/orders-api';

const row = (over: Partial<ProductRow> = {}): ProductRow => ({
  id: 'p-1', slug: 'one', name_ar: 'واحد', name_en: 'One', summary_ar: 'ملخص', summary_en: '',
  description_ar: 'وصف', description_en: 'Desc', category_id: 'girls', price: '12.500', compare_at_price: null,
  size_ids: ['4y', '2y', 'zz'], stock: null, featured: true, sample: false, sort: 0,
  colourways: [
    { id: 'b', name_ar: 'ب', name_en: 'B', swatch: '#000000', photos: null, art: 'nope', sort: 1 },
    { id: 'a', name_ar: 'أ', name_en: 'A', swatch: '#ffffff', photos: ['https://x.supabase.co/a.webp'], art: 'kid-camera', sort: 0 },
  ],
  ...over,
});

describe('database rows → catalogue', () => {
  it('maps fields, numeric prices, known sizes in catalogue order and sorted colours', () => {
    const [p] = rowsToProducts([row()], categories, sizes);
    expect(p!.price).toBe(12.5);
    expect(p!.sizeIds).toEqual(['2y', '4y']);
    expect(p!.colourways.map((c) => c.id)).toEqual(['a', 'b']);
    expect(p!.colourways[0]!.photos).toEqual(['https://x.supabase.co/a.webp']);
    expect(p!.colourways[1]!.art).toBe('kid-reading'); // unknown art falls back
    expect(p!.summary.en).toBe('ملخص'); // empty English falls back to Arabic
  });

  it('keeps a sale price only when it is above the price', () => {
    expect(rowsToProducts([row({ compare_at_price: 15 })], categories, sizes)[0]!.compareAtPrice).toBe(15);
    expect(rowsToProducts([row({ compare_at_price: 10 })], categories, sizes)[0]!.compareAtPrice).toBeNull();
  });

  it('skips rows that cannot be shown and sorts by sort', () => {
    const out = rowsToProducts(
      [
        row({ id: 'late', slug: 'late', sort: 5 }),
        row({ id: 'cat', slug: 'cat', category_id: 'unknown' }),
        row({ id: 'nosize', slug: 'nosize', size_ids: ['zz'] }),
        row({ id: 'nocolour', slug: 'nocolour', colourways: [] }),
        row({ id: 'early', slug: 'early', sort: 1 }),
      ],
      categories, sizes,
    );
    expect(out.map((p) => p.id)).toEqual(['early', 'late']);
  });
});

describe('order payload', () => {
  it('sends ids and quantities only — never prices', () => {
    const payload = orderPayload(
      [{ productId: 'p', colourId: 'c', sizeId: '2y', qty: 2, unitPrice: 1 } as never],
      { name: 'n', phone: '96102882', email: '', area: 'a', address: '' },
      'ar',
      '  ',
    );
    expect(payload.lines).toEqual([{ productId: 'p', colourId: 'c', sizeId: '2y', qty: 2 }]);
    expect(payload).not.toHaveProperty('giftNote');
    expect(JSON.stringify(payload)).not.toContain('unitPrice');
  });
});
