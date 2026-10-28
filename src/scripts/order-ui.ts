/**
 * WhatsApp handoff.
 *  - Verified international number configured → wa.me/<n>?text=… (prefilled).
 *  - Otherwise → copy the message, then open Nooma's verified wa.me/message
 *    link; the customer pastes it. Nothing is ever reported as "ordered".
 * Orders ask for delivery details first; they go into the message only and
 * are kept in sessionStorage for this visit, never sent to a server.
 */
import {
  buildOrderMessage, validEmail, validPhone, whatsappOrderUrl, type CustomerDetails, type ResolvedLine,
} from '~/lib/order';
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

function present(build: (d: CustomerDetails) => string, opener: HTMLElement | null, withDetails: boolean) {
  const d = document.getElementById('order-dialog') as HTMLDialogElement | null;
  if (!d) return;
  const box = d.querySelector<HTMLTextAreaElement>('[data-order-message]')!;
  const open = d.querySelector<HTMLAnchorElement>('[data-order-open]')!;
  const text = d.querySelector<HTMLElement>('[data-order-text]')!;
  const copyBtn = d.querySelector<HTMLButtonElement>('[data-order-copy]')!;
  const copyLabel = copyBtn.querySelector('.btn__label')!;
  const fields = d.querySelector<HTMLFieldSetElement>('[data-order-fields]')!;
  const input = (name: keyof CustomerDetails) => fields.querySelector<HTMLInputElement>(`[name="${name}"]`)!;
  copyLabel.textContent = s('order.copy');

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
    message = build(read());
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

  if (config.whatsappNumber) text.textContent = s(withDetails ? 'order.textDetails' : 'order.text');
  else text.textContent = s(withDetails ? 'order.textDetails' : 'order.textCopy');

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
  present(
    (customer) => buildOrderMessage(lines, config.locale, strings(), { giftNote: cart.giftNote, sample, customer }),
    opener,
    true,
  );
}

/** "Order directly on WhatsApp" from a product page (one item, current selection). */
export function startSingle(lines: ResolvedLine[], fallbackName: string, opener: HTMLElement | null) {
  if (lines.length) {
    const sample = config.sample && lines.some((l) => l.product.sample);
    present((customer) => buildOrderMessage(lines, config.locale, strings(), { sample, customer }), opener, true);
  } else {
    present(() => s('order.single', { x: fallbackName }), opener, false);
  }
}
