/**
 * Cart store. Persists only product id / colour / size / qty in
 * localStorage — prices are always re-read from the catalogue.
 */
import { clampQty, lineKey, type CartLine } from '~/lib/order';
import { config, productById } from './env';

const KEY = 'nooma.cart.v1';
const GIFT_KEY = 'nooma.gift.v1';
type Listener = (lines: CartLine[], change?: { type: 'add' | 'update' | 'remove'; key: string }) => void;

let lines: CartLine[] = load();
const listeners = new Set<Listener>();

function load(): CartLine[] {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) ?? '[]');
    if (!Array.isArray(raw)) return [];
    return raw
      .filter((l) => l && typeof l.productId === 'string' && typeof l.sizeId === 'string' && typeof l.colourId === 'string')
      .map((l) => ({ productId: l.productId, colourId: l.colourId, sizeId: l.sizeId, qty: clampQty(Number(l.qty), config.maxQty) }))
      .filter((l) => {
        const p = productById.get(l.productId);
        return !!p && p.price !== null && p.sizes.some((s) => s.id === l.sizeId) && p.colourways.some((c) => c.id === l.colourId);
      });
  } catch {
    return [];
  }
}

function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(lines));
  } catch {
    /* storage blocked — the cart still works for this page view */
  }
}

function emit(change?: Parameters<Listener>[1]) {
  for (const fn of listeners) fn(lines, change);
}

export const cart = {
  get lines() {
    return lines;
  },
  subscribe(fn: Listener) {
    listeners.add(fn);
    fn(lines);
    return () => listeners.delete(fn);
  },
  add(line: CartLine) {
    const key = lineKey(line);
    const existing = lines.find((l) => lineKey(l) === key);
    if (existing) existing.qty = clampQty(existing.qty + line.qty, config.maxQty);
    else lines = [...lines, { ...line, qty: clampQty(line.qty, config.maxQty) }];
    save();
    emit({ type: 'add', key });
  },
  setQty(key: string, qty: number) {
    const l = lines.find((x) => lineKey(x) === key);
    if (!l) return;
    l.qty = clampQty(qty, config.maxQty);
    save();
    emit({ type: 'update', key });
  },
  remove(key: string): { line: CartLine; index: number } | null {
    const index = lines.findIndex((x) => lineKey(x) === key);
    if (index < 0) return null;
    const line = lines[index]!;
    lines = lines.filter((_, i) => i !== index);
    save();
    emit({ type: 'remove', key });
    return { line, index };
  },
  restore(line: CartLine, index: number) {
    const next = [...lines];
    next.splice(Math.min(index, next.length), 0, line);
    lines = next;
    save();
    emit({ type: 'add', key: lineKey(line) });
  },
  clear() {
    lines = [];
    save();
    emit();
  },
  get giftNote() {
    try {
      return sessionStorage.getItem(GIFT_KEY) ?? '';
    } catch {
      return '';
    }
  },
  set giftNote(v: string) {
    try {
      sessionStorage.setItem(GIFT_KEY, v.slice(0, 240));
    } catch {
      /* ignore */
    }
  },
};

// Keep tabs in sync.
window.addEventListener('storage', (e) => {
  if (e.key === KEY) {
    lines = load();
    emit();
  }
});
