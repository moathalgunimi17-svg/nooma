/**
 * WhatsApp handoff.
 *  - Verified international number configured → wa.me/<n>?text=… (prefilled).
 *  - Otherwise → copy the message, then open Nooma's verified wa.me/message
 *    link; the customer pastes it. Nothing is ever reported as "ordered".
 */
import { buildOrderMessage, whatsappOrderUrl, type ResolvedLine } from '~/lib/order';
import { config, s } from './env';
import { cart } from './store';
import { openDialog, toast } from './ui';

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
      document.body.append(ta);
      ta.select();
      const ok = document.execCommand('copy');
      ta.remove();
      return ok;
    } catch {
      return false;
    }
  }
}

function present(message: string, opener: HTMLElement | null) {
  const d = document.getElementById('order-dialog') as HTMLDialogElement | null;
  if (!d) return;
  const box = d.querySelector<HTMLTextAreaElement>('[data-order-message]')!;
  const open = d.querySelector<HTMLAnchorElement>('[data-order-open]')!;
  const text = d.querySelector<HTMLElement>('[data-order-text]')!;
  const copyBtn = d.querySelector<HTMLButtonElement>('[data-order-copy]')!;
  const copyLabel = copyBtn.querySelector('.btn__label')!;
  box.value = message;
  copyLabel.textContent = s('order.copy');

  if (config.whatsappNumber) {
    open.href = whatsappOrderUrl(config.whatsappNumber, message);
    text.textContent = s('order.text');
  } else {
    open.href = config.whatsappLink;
    text.textContent = s('order.textCopy');
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

  copyBtn.onclick = async () => {
    const ok = await copy(message);
    copyLabel.textContent = ok ? s('order.copied') : s('order.copy');
    if (!ok) {
      toast(s('order.copyFail'), undefined, 'info');
      box.focus();
      box.select();
    }
  };
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
  };
}

export function startCheckout(lines: ResolvedLine[], opener: HTMLElement | null) {
  if (!lines.length) return;
  const message = buildOrderMessage(lines, config.locale, strings(), {
    giftNote: cart.giftNote,
    sample: config.sample && lines.some((l) => l.product.sample),
  });
  present(message, opener);
}

/** "Order directly on WhatsApp" from a product page (one item, current selection). */
export function startSingle(lines: ResolvedLine[], fallbackName: string, opener: HTMLElement | null) {
  if (lines.length) {
    const message = buildOrderMessage(lines, config.locale, strings(), {
      sample: config.sample && lines.some((l) => l.product.sample),
    });
    present(message, opener);
  } else {
    present(s('order.single', { x: fallbackName }), opener);
  }
}
