/**
 * Saves an order in Nooma's admin database through the public place_order()
 * function (supabase/setup.sql). Only ids and quantities are sent — the
 * database looks the prices up itself.
 */
import type { Locale } from '~/config/site';
import type { CartLine, CustomerDetails } from './order';

export interface Backend {
  supabaseUrl: string;
  supabaseAnonKey: string;
}

export interface OrderPayload {
  locale: Locale;
  giftNote?: string;
  customer: CustomerDetails;
  lines: Pick<CartLine, 'productId' | 'colourId' | 'sizeId' | 'qty'>[];
}

export function orderPayload(
  lines: CartLine[],
  customer: CustomerDetails,
  locale: Locale,
  giftNote?: string,
): OrderPayload {
  const note = giftNote?.trim();
  return {
    locale,
    ...(note ? { giftNote: note } : {}),
    customer,
    lines: lines.map(({ productId, colourId, sizeId, qty }) => ({ productId, colourId, sizeId, qty })),
  };
}

/** Returns the new order number. Throws on any failure (network, timeout, rejected input). */
export async function placeOrder(b: Backend, payload: OrderPayload, timeoutMs = 10000): Promise<number> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(`${b.supabaseUrl}/rest/v1/rpc/place_order`, {
      method: 'POST',
      headers: {
        apikey: b.supabaseAnonKey,
        Authorization: `Bearer ${b.supabaseAnonKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ payload }),
      signal: ctrl.signal,
    });
    if (!res.ok) throw new Error(`place_order ${res.status}: ${await res.text()}`);
    const out = (await res.json()) as { id?: number };
    if (typeof out.id !== 'number') throw new Error('place_order: no id');
    return out.id;
  } finally {
    clearTimeout(timer);
  }
}
