/**
 * WhatsApp handoff.
 *  - Verified international number configured → wa.me/<n>?text=… (prefilled).
 *  - Otherwise → copy the message, then open Nooma's verified wa.me/message
 *    link; the customer pastes it. Nothing is ever reported as "ordered".
 * Orders ask for delivery details first (kept in sessionStorage for this visit).
 * With Nooma's admin database connected (site.backend), "Confirm order" saves
 * the order through place_order() and its number goes into the WhatsApp text;
 * without it, the details travel in the WhatsApp message only.
 */
import {
  buildOrderMessage, validEmail, validPhone, whatsappOrderUrl, type CartLine, type CustomerDetails, type ResolvedLine,
} from '~/lib/order';
import { orderPayload, placeOrder } from '~/lib/orders-api';
import { config, s } from './env';
import { cart } from './store';
import { openDialog, toast } from './ui';

const DETAILS_KEY = 'nooma.order.details.v1';
const FIELDS = ['name', 'phone', 'email', 'area', 'address'] as const;
type Checked = 'name' | 'phone' | 'email' | 'area';
const NO_DETAILS: CustomerDetails = { name: '', phone: '', email: '', area: '', address: '' };

function loadDetails(): CustomerDetails {
  const out = { ...NO_DETAILS };
  try {
    const v = JSON.parse(sessionStorage.getItem(DETAILS_KEY) ?? 'null') as Partial<CustomerDetails> | null;
    for (const k of FIELDS) out[k] = String(v?.[k] ?? '');
  } catch {
    /* ignore */
  }
  return out;
}

function saveDetails(d: CustomerDetails) {
  try {
    sessionStorage.setItem(DETAILS_KEY, JSON.stringify(d));
  } catch {
    /* ignore */
  }
}

async function copy(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      // Inside an open modal dialog everything else is inert, so the helper must live in it.
      ([...document.querySelectorAll('dialog[open]')].pop() ?? document.body).append(ta);
      ta.select();
      const ok = document.execCommand('copy');
      ta.remove();
      return ok;
    } catch {
      return false;
    }
  }
}

interface Spec {
  build: (d: CustomerDetails, orderId?: number) => string;
  withDetails: boolean;
  /** Lines to save in the admin database (orders only). */
  lines?: CartLine[];
  giftNote?: string;
  /** Runs once a saved order is handed to WhatsApp. */
  onSent?: () => void;
}

function present(spec: Spec, opener: HTMLElement | null) {
  const { build, withDetails } = spec;
  const d = document.getElementById('order-dialog') as HTMLDialogElement | null;
  if (!d) return;
  const box = d.querySelector<HTMLTextAreaElement>('[data-order-message]')!;
  const open = d.querySelector<HTMLAnchorElement>('[data-order-open]')!;
  const text = d.querySelector<HTMLElement>('[data-order-text]')!;
  const copyBtn = d.querySelector<HTMLButtonElement>('[data-order-copy]')!;
  const copyLabel = copyBtn.querySelector('.btn__label')!;
  const fields = d.querySelector<HTMLFieldSetElement>('[data-order-fields]')!;
  const input = (name: keyof CustomerDetails) => fields.querySelector<HTMLInputElement>(`[name="${name}"]`)!;
  const confirmBtn = d.querySelector<HTMLButtonElement>('[data-order-confirm]')!;
  const confirmLabel = confirmBtn.querySelector('.btn__label')!;
  const openLabel = open.querySelector('.btn__label')!;
  const placed = d.querySelector<HTMLElement>('[data-order-placed]')!;
  copyLabel.textContent = s('order.copy');

  // Save first when the database is connected; WhatsApp comes after.
  const saving = !!config.backend && withDetails && !!spec.lines?.length;
  let orderId: number | undefined;
  confirmBtn.hidden = !saving;
  open.hidden = saving;
  copyBtn.hidden = saving;
  placed.hidden = true;
  fields.disabled = false;
  openLabel.textContent = s('order.open');

  fields.hidden = !withDetails;
  const saved = loadDetails();
  FIELDS.forEach((k) => {
    input(k).value = saved[k];
    input(k).removeAttribute('aria-invalid');
  });
  fields.querySelectorAll<HTMLElement>('[data-err]').forEach((e) => (e.textContent = ''));

  const read = (): CustomerDetails => {
    if (!withDetails) return NO_DETAILS;
    const d = { ...NO_DETAILS };
    for (const k of FIELDS) d[k] = input(k).value;
    return d;
  };

  let message = '';
  const refresh = () => {
    message = build(read(), orderId);
    box.value = message;
    open.href = config.whatsappNumber ? whatsappOrderUrl(config.whatsappNumber, message) : config.whatsappLink;
  };

  const showError = (name: Checked, on: boolean) => {
    const err = fields.querySelector<HTMLElement>(`[data-err="${name}"]`)!;
    err.textContent = on ? err.dataset.msg ?? '' : '';
    input(name).setAttribute('aria-invalid', String(on));
  };
  /** Name, phone and area are required for an order; email and address are optional. */
  const valid = (): boolean => {
    if (!withDetails) return true;
    const v = read();
    const bad: Record<Checked, boolean> = {
      name: v.name.trim().length < 2,
      phone: !validPhone(v.phone),
      email: v.email.trim() !== '' && !validEmail(v.email),
      area: v.area.trim().length < 2,
    };
    (Object.keys(bad) as Checked[]).forEach((k) => showError(k, bad[k]));
    const first = (['name', 'phone', 'email', 'area'] as const).find((k) => bad[k]);
    if (first) input(first).focus();
    return !first;
  };

  fields.oninput = (e) => {
    const el = e.target as HTMLInputElement;
    if (el.getAttribute('aria-invalid') === 'true') showError(el.name as Checked, false);
    saveDetails(read());
    refresh();
  };

  if (saving) text.textContent = s('order.textConfirm');
  else if (config.whatsappNumber) text.textContent = s(withDetails ? 'order.textDetails' : 'order.text');
  else text.textContent = s(withDetails ? 'order.textDetails' : 'order.textCopy');

  confirmBtn.onclick = async () => {
    if (!valid() || confirmBtn.getAttribute('aria-busy') === 'true') return;
    confirmBtn.setAttribute('aria-busy', 'true');
    confirmLabel.textContent = s('order.saving');
    try {
      orderId = await placeOrder(config.backend!, orderPayload(spec.lines!, read(), config.locale, spec.giftNote));
      placed.textContent = s('order.placed', { n: orderId });
      placed.classList.remove('is-error');
    } catch (err) {
      // Never block the customer: WhatsApp still works without a saved order.
      console.warn(err);
      placed.textContent = s('order.saveFail');
      placed.classList.add('is-error');
    }
    confirmBtn.removeAttribute('aria-busy');
    confirmLabel.textContent = s('order.confirm');
    fields.disabled = true;
    placed.hidden = false;
    confirmBtn.hidden = true;
    open.hidden = false;
    copyBtn.hidden = false;
    openLabel.textContent = s('order.sendWa');
    refresh();
    open.focus();
  };

  // On phones, open wa.me in the same tab: it hands straight over to the WhatsApp app,
  // and some in-app browsers (Instagram, Snapchat…) silently ignore target=_blank.
  open.target = matchMedia('(pointer: coarse)').matches ? '_self' : '_blank';
  open.onclick = (e) => {
    if (!valid()) {
      e.preventDefault();
      return;
    }
    // Without a number the customer pastes the message, so copy it on the way out.
    if (!config.whatsappNumber && withDetails) void copy(message);
    if (orderId) spec.onSent?.();
  };

  copyBtn.onclick = async () => {
    if (!valid()) return;
    const ok = await copy(message);
    copyLabel.textContent = ok ? s('order.copied') : s('order.copy');
    if (ok && !config.whatsappNumber) text.textContent = s('order.textCopy');
    if (!ok) {
      toast(s('order.copyFail'), undefined, 'info');
      box.focus();
      box.select();
    }
  };

  refresh();
  if (!config.whatsappNumber && !withDetails) {
    // Copy right away, inside the user's click.
    void copy(message).then((ok) => {
      copyLabel.textContent = ok ? s('order.copied') : s('order.copy');
      if (!ok) {
        text.textContent = s('order.copyFail');
        box.focus();
        box.select();
      }
    });
  }
  openDialog(d, opener);
}

function strings() {
  return {
    greeting: s('order.msg.greeting'),
    size: s('order.msg.size'),
    colour: s('order.msg.colour'),
    qty: s('order.msg.qty'),
    subtotal: s('order.msg.subtotal'),
    priceTbc: s('order.msg.priceTbc'),
    shippingNote: s('order.msg.shipping'),
    giftNote: s('order.msg.gift'),
    sampleNote: s('order.msg.sample'),
    closing: s('order.msg.closing'),
    customer: s('order.msg.customer'),
    orderNo: s('order.msg.number'),
    name: s('order.msg.name'),
    phone: s('order.msg.phone'),
    email: s('order.msg.email'),
    area: s('order.msg.area'),
    address: s('order.msg.address'),
  };
}

export function startCheckout(lines: ResolvedLine[], opener: HTMLElement | null) {
  if (!lines.length) return;
  const sample = config.sample && lines.some((l) => l.product.sample);
  const giftNote = cart.giftNote;
  present(
    {
      build: (customer, orderId) => buildOrderMessage(lines, config.locale, strings(), { giftNote, sample, customer, orderId }),
      withDetails: true,
      lines,
      giftNote,
      // The saved order is on its way to WhatsApp: start the next visit with an empty bag.
      onSent: () => cart.clear(),
    },
    opener,
  );
}

/** "Order directly on WhatsApp" from a product page (one item, current selection). */
export function startSingle(lines: ResolvedLine[], fallbackName: string, opener: HTMLElement | null) {
  if (lines.length) {
    const sample = config.sample && lines.some((l) => l.product.sample);
    present(
      {
        build: (customer, orderId) => buildOrderMessage(lines, config.locale, strings(), { sample, customer, orderId }),
        withDetails: true,
        lines,
      },
      opener,
    );
  } else {
    present({ build: () => s('order.single', { x: fallbackName }), withDetails: false }, opener);
  }
}
