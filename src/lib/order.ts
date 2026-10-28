/**
 * Pure order logic shared by the browser cart and the unit tests.
 * Prices are always looked up from the catalogue — never trusted from storage.
 */
import type { Locale } from '~/config/site';
import type { ClientProduct } from '~/data/types';
import { formatPrice, roundOmr } from './format';

export interface CartLine {
  productId: string;
  colourId: string;
  sizeId: string;
  qty: number;
}

export interface ResolvedLine extends CartLine {
  key: string;
  product: ClientProduct;
  colourName: string;
  sizeLabel: string;
  unitPrice: number | null;
  lineTotal: number | null;
  thumb: string;
}

export const lineKey = (l: Pick<CartLine, 'productId' | 'colourId' | 'sizeId'>) =>
  `${l.productId}|${l.colourId}|${l.sizeId}`;

export function clampQty(qty: number, max: number): number {
  if (!Number.isFinite(qty)) return 1;
  return Math.min(max, Math.max(1, Math.floor(qty)));
}

/**
 * Drops lines that no longer match the catalogue (removed product, size or
 * colour) and resolves names, prices and totals for display.
 */
export function resolveLines(
  lines: CartLine[],
  catalog: ClientProduct[],
  locale: Locale,
  maxQty: number,
): ResolvedLine[] {
  const byId = new Map(catalog.map((p) => [p.id, p]));
  const out: ResolvedLine[] = [];
  for (const l of lines) {
    const product = byId.get(l.productId);
    if (!product) continue;
    const colour = product.colourways.find((c) => c.id === l.colourId);
    const size = product.sizes.find((s) => s.id === l.sizeId);
    if (!colour || !size) continue;
    const qty = clampQty(l.qty, maxQty);
    const unitPrice = product.price;
    out.push({
      ...l,
      qty,
      key: lineKey(l),
      product,
      colourName: colour.name[locale],
      sizeLabel: size.label[locale],
      unitPrice,
      lineTotal: unitPrice === null ? null : roundOmr(unitPrice * qty),
      thumb: colour.thumb,
    });
  }
  return out;
}

export interface Totals {
  count: number;
  subtotal: number;
  /** true when any line has no confirmed price. */
  hasUnpriced: boolean;
}

export function totals(lines: ResolvedLine[]): Totals {
  let count = 0;
  let subtotal = 0;
  let hasUnpriced = false;
  for (const l of lines) {
    count += l.qty;
    if (l.lineTotal === null) hasUnpriced = true;
    else subtotal += l.lineTotal;
  }
  return { count, subtotal: roundOmr(subtotal), hasUnpriced };
}

export interface OrderMessageStrings {
  greeting: string;
  size: string;
  colour: string;
  qty: string;
  subtotal: string;
  priceTbc: string;
  shippingNote: string;
  giftNote: string;
  sampleNote: string;
  closing: string;
  customer: string;
  orderNo: string;
  name: string;
  phone: string;
  email: string;
  area: string;
  address: string;
}

/** Delivery details the customer types into the order dialog. */
export interface CustomerDetails {
  name: string;
  phone: string;
  email: string;
  area: string;
  address: string;
}

/** One line, trimmed and capped — keeps the message tidy and short. */
const oneLine = (v: string | undefined, max: number) => (v ?? '').replace(/\s+/g, ' ').trim().slice(0, max);

/** Arabic-Indic and Persian digits → ASCII, so "٩٦١٠٢٨٨٢" counts as a number. */
export const asciiDigits = (v: string) =>
  v.replace(/[٠-٩۰-۹]/g, (d) => String((d.charCodeAt(0) & 0xf) % 10));

/** 8–15 digits once spaces, dashes and a leading + are ignored. No country code is ever added. */
export const validPhone = (v: string) => /^\+?\d{8,15}$/.test(asciiDigits(v).replace(/[\s\-().]/g, ''));

export const validEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

/**
 * Builds the WhatsApp order text: what the customer chose plus the delivery
 * details they typed themselves. No internal configuration.
 */
export function buildOrderMessage(
  lines: ResolvedLine[],
  locale: Locale,
  s: OrderMessageStrings,
  opts: { giftNote?: string; sample?: boolean; customer?: CustomerDetails; orderId?: number } = {},
): string {
  const t = totals(lines);
  const rows = lines.map((l, i) => {
    const price = l.lineTotal === null ? s.priceTbc : formatPrice(l.lineTotal, locale);
    return [
      `${i + 1}. ${l.product.name[locale]}`,
      `   ${s.colour}: ${l.colourName} · ${s.size}: ${l.sizeLabel} · ${s.qty}: ${l.qty}`,
      `   ${price}`,
    ].join('\n');
  });
  const parts = [s.greeting, ...(opts.orderId ? [`${s.orderNo}: #${opts.orderId}`] : []), '', ...rows, ''];
  parts.push(
    t.hasUnpriced
      ? `${s.subtotal}: ${formatPrice(t.subtotal, locale)} + ${s.priceTbc}`
      : `${s.subtotal}: ${formatPrice(t.subtotal, locale)}`,
  );
  parts.push(s.shippingNote);
  const name = oneLine(opts.customer?.name, 80);
  const phone = asciiDigits(oneLine(opts.customer?.phone, 24));
  const email = oneLine(opts.customer?.email, 120);
  const area = oneLine(opts.customer?.area, 80);
  const address = oneLine(opts.customer?.address, 200);
  if (name || phone || email || area || address) {
    parts.push('', `${s.customer}:`);
    if (name) parts.push(`${s.name}: ${name}`);
    if (phone) parts.push(`${s.phone}: ${phone}`);
    if (email) parts.push(`${s.email}: ${email}`);
    if (area) parts.push(`${s.area}: ${area}`);
    if (address) parts.push(`${s.address}: ${address}`);
  }
  const note = opts.giftNote?.trim().slice(0, 240);
  if (note) parts.push('', `${s.giftNote}: ${note}`);
  if (opts.sample) parts.push('', s.sampleNote);
  parts.push('', s.closing);
  return parts.join('\n');
}

/** wa.me deep link with prefilled text — only when a verified number exists. */
export function whatsappOrderUrl(number: string, message: string): string {
  const digits = number.replace(/\D/g, '');
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
