/** Dialog, toast and live-region helpers shared by every page. */
import { reducedMotion } from './env';

const openers = new WeakMap<HTMLDialogElement, Element | null>();

export function openDialog(d: HTMLDialogElement | null, opener?: Element | null) {
  if (!d || d.open) return;
  openers.set(d, opener ?? document.activeElement);
  d.classList.remove('is-closing');
  d.showModal();
  document.documentElement.style.overflow = 'hidden';
  d.dispatchEvent(new CustomEvent('nooma:open'));
}

export function closeDialog(d: HTMLDialogElement | null) {
  if (!d || !d.open) return;
  const finish = () => {
    d.classList.remove('is-closing');
    d.close();
  };
  if (reducedMotion() || !d.classList.contains('sheet')) finish();
  else {
    d.classList.add('is-closing');
    setTimeout(finish, 220);
  }
}

export function initDialogs() {
  document.addEventListener('click', (e) => {
    const target = e.target as Element;
    const opener = target.closest<HTMLElement>('[data-open]');
    if (opener) {
      e.preventDefault();
      openDialog(document.getElementById(opener.dataset.open!) as HTMLDialogElement, opener);
      return;
    }
    const closer = target.closest('[data-close]');
    if (closer) {
      closeDialog(closer.closest('dialog'));
      return;
    }
    // Click on the backdrop (the dialog element itself, outside its content box).
    if (target instanceof HTMLDialogElement && target.open) {
      const r = target.getBoundingClientRect();
      const ev = e as MouseEvent;
      const inside = ev.clientX >= r.left && ev.clientX <= r.right && ev.clientY >= r.top && ev.clientY <= r.bottom;
      if (!inside) closeDialog(target);
    }
  });
  document.querySelectorAll('dialog').forEach((d) => {
    d.addEventListener('cancel', (e) => {
      e.preventDefault();
      closeDialog(d);
    });
    d.addEventListener('close', () => {
      if (!document.querySelector('dialog[open]')) document.documentElement.style.overflow = '';
      const back = openers.get(d);
      if (back instanceof HTMLElement && document.contains(back)) back.focus({ preventScroll: true });
    });
  });
}

let toastTimer = 0;
export function toast(message: string, action?: { label: string; run: () => void }, icon = 'check') {
  const region = document.getElementById('toast');
  if (!region) return;
  window.clearTimeout(toastTimer);
  region.replaceChildren();
  const el = document.createElement('div');
  el.className = 'toast';
  const paths: Record<string, string> = {
    check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    info: '<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5M12 8v.01"/>',
  };
  el.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">${paths[icon] ?? paths.check}</svg>`;
  const text = document.createElement('span');
  text.textContent = message;
  el.append(text);
  if (action) {
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = action.label;
    b.addEventListener('click', () => {
      action.run();
      region.replaceChildren();
    });
    el.append(b);
  }
  region.append(el);
  toastTimer = window.setTimeout(() => region.replaceChildren(), action ? 6000 : 3200);
}

export function announce(message: string) {
  const live = document.getElementById('sr-live');
  if (!live) return;
  live.textContent = '';
  requestAnimationFrame(() => (live.textContent = message));
}
