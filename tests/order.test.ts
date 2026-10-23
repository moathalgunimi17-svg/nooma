import { describe, expect, it } from 'vitest';
import { buildOrderMessage, clampQty, lineKey, resolveLines, totals, whatsappOrderUrl } from '~/lib/order';
import { formatPrice, roundOmr } from '~/lib/format';
import { matches, normalize } from '~/lib/search';
import type { ClientProduct } from '~/data/types';

const catalog: ClientProduct[] = [
  {
    id: 'a', slug: 'a', name: { ar: 'بيجامة أ', en: 'Pajama A' }, price: 11.5, categoryId: 'girls',
    sizes: [{ id: '2y', label: { ar: 'سنتان', en: '2 yrs' } }, { id: '3y', label: { ar: '3 سنوات', en: '3 yrs' } }],
    colourways: [{ id: 'pink', name: { ar: 'وردي', en: 'Pink' }, swatch: '#f00', thumb: '/a.webp' }],
    sample: true, search: normalize('بيجامة أ Pajama A وردي pink'),
  },
  {
    id: 'b', slug: 'b', name: { ar: 'بيجامة ب', en: 'Pajama B' }, price: 0.1, categoryId: 'boys',
    sizes: [{ id: '4y', label: { ar: '4 سنوات', en: '4 yrs' } }],
    colourways: [{ id: 'blue', name: { ar: 'أزرق', en: 'Blue' }, swatch: '#00f', thumb: '/b.webp' }],
    sample: false, search: normalize('بيجامة ب Pajama B أزرق blue'),
  },
  {
    id: 'c', slug: 'c', name: { ar: 'بيجامة ج', en: 'Pajama C' }, price: null, categoryId: 'boys',
    sizes: [{ id: '4y', label: { ar: '4 سنوات', en: '4 yrs' } }],
    colourways: [{ id: 'blue', name: { ar: 'أزرق', en: 'Blue' }, swatch: '#00f', thumb: '/c.webp' }],
    sample: false, search: '',
  },
];

const strings = {
  greeting: 'Hello', size: 'Size', colour: 'Colour', qty: 'Qty', subtotal: 'Subtotal',
  priceTbc: 'price to confirm', shippingNote: 'Delivery: TBC', giftNote: 'Gift note', sampleNote: '(sample)', closing: 'Thanks',
};

describe('quantities', () => {
  it('clamps to 1..max and floors', () => {
    expect(clampQty(0, 10)).toBe(1);
    expect(clampQty(-3, 10)).toBe(1);
    expect(clampQty(2.7, 10)).toBe(2);
    expect(clampQty(99, 10)).toBe(10);
    expect(clampQty(Number.NaN, 10)).toBe(1);
  });
});

describe('resolveLines + totals', () => {
  it('uses catalogue prices, never stored ones, and multiplies without float drift', () => {
    const lines = resolveLines([{ productId: 'b', colourId: 'blue', sizeId: '4y', qty: 3 }], catalog, 'en', 10);
    expect(lines[0]!.lineTotal).toBe(0.3); // 0.1 * 3 would be 0.30000000000000004 without rounding
    expect(totals(lines)).toEqual({ count: 3, subtotal: 0.3, hasUnpriced: false });
  });

  it('drops lines whose product, size or colour no longer exists', () => {
    const lines = resolveLines(
      [
        { productId: 'a', colourId: 'pink', sizeId: '2y', qty: 1 },
        { productId: 'gone', colourId: 'pink', sizeId: '2y', qty: 1 },
        { productId: 'a', colourId: 'pink', sizeId: '8y', qty: 1 },
        { productId: 'a', colourId: 'green', sizeId: '2y', qty: 1 },
      ],
      catalog, 'ar', 10,
    );
    expect(lines.map((l) => l.key)).toEqual([lineKey({ productId: 'a', colourId: 'pink', sizeId: '2y' })]);
  });

  it('sums several lines and flags unpriced products', () => {
    const lines = resolveLines(
      [
        { productId: 'a', colourId: 'pink', sizeId: '2y', qty: 2 },
        { productId: 'a', colourId: 'pink', sizeId: '3y', qty: 1 },
        { productId: 'c', colourId: 'blue', sizeId: '4y', qty: 1 },
      ],
      catalog, 'en', 10,
    );
    const t = totals(lines);
    expect(t.count).toBe(4);
    expect(t.subtotal).toBe(34.5);
    expect(t.hasUnpriced).toBe(true);
  });

  it('clamps stored quantities above the per-line maximum', () => {
    const [l] = resolveLines([{ productId: 'a', colourId: 'pink', sizeId: '2y', qty: 50 }], catalog, 'en', 10);
    expect(l!.qty).toBe(10);
    expect(l!.lineTotal).toBe(115);
  });
});

describe('order message', () => {
  const lines = resolveLines([{ productId: 'a', colourId: 'pink', sizeId: '2y', qty: 2 }], catalog, 'en', 10);

  it('lists item, colour, size, quantity and subtotal', () => {
    const msg = buildOrderMessage(lines, 'en', strings);
    expect(msg).toContain('1. Pajama A');
    expect(msg).toContain('Colour: Pink · Size: 2 yrs · Qty: 2');
    expect(msg).toContain(`Subtotal: ${formatPrice(23, 'en')}`);
    expect(msg).toContain('Delivery: TBC');
    expect(msg).not.toContain('(sample)');
  });

  it('adds an optional gift note, trimmed and capped at 240 chars', () => {
    const msg = buildOrderMessage(lines, 'en', strings, { giftNote: `  ${'x'.repeat(300)}  ` });
    expect(msg).toContain(`Gift note: ${'x'.repeat(240)}`);
    expect(msg).not.toContain('x'.repeat(241));
  });

  it('marks sample orders', () => {
    expect(buildOrderMessage(lines, 'en', strings, { sample: true })).toContain('(sample)');
  });

  it('builds a wa.me link only from digits and encodes the text', () => {
    const url = whatsappOrderUrl('+968 9xx-123', 'Hi & bye');
    expect(url).toBe('https://wa.me/9689123?text=Hi%20%26%20bye');
  });
});

describe('formatting & search', () => {
  it('formats OMR with three decimals and Western digits in Arabic', () => {
    expect(formatPrice(12.5, 'en')).toMatch(/12\.500/);
    expect(formatPrice(12.5, 'ar')).toMatch(/12\.500/);
    expect(roundOmr(1.0005)).toBe(1.001);
  });

  it('matches Arabic regardless of hamza/taa marbuta forms, and English case', () => {
    expect(matches(catalog[1]!.search, 'ازرق')).toBe(true);
    expect(matches(catalog[0]!.search, 'بيجامه')).toBe(true);
    expect(matches(catalog[0]!.search, 'PINK')).toBe(true);
    expect(matches(catalog[0]!.search, 'blue')).toBe(false);
    expect(matches(catalog[0]!.search, '   ')).toBe(false);
  });
});
