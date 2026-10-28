import { resolveLines, totals, lineKey, type ResolvedLine } from '~/lib/order';
import { formatPrice } from '~/lib/format';
import { catalog, config, productById, s, reducedMotion } from './env';
import { cart } from './store';
import { announce, openDialog, toast } from './ui';
import { startCheckout } from './order-ui';

const L = config.locale;
const money = (n: number) => formatPrice(n, L);

export function resolved(): ResolvedLine[] {
  return resolveLines(cart.lines, catalog, L, config.maxQty);
}

function renderRoot(root: HTMLElement, lines: ResolvedLine[], change?: { type: string; key: string }) {
  const list = root.querySelector<HTMLElement>('[data-cart-lines]')!;
  const empty = root.querySelector<HTMLElement>('[data-cart-empty]')!;
  const summary = root.querySelector<HTMLElement>('[data-cart-summary]')!;
  const tpl = document.getElementById('tpl-cart-line') as HTMLTemplateElement | null;
  if (!tpl) return;

  empty.hidden = lines.length > 0;
  summary.hidden = lines.length === 0;
  list.hidden = lines.length === 0;

  // Keep focus stable: remember which control in which line had focus.
  const active = document.activeElement as HTMLElement | null;
  const focusLine = active?.closest<HTMLElement>('.cart-line')?.dataset.key;
  const focusRole = active ? [...active.attributes].find((a) => a.name.startsWith('data-l-'))?.name : undefined;

  list.replaceChildren(
    ...lines.map((l) => {
      const node = tpl.content.firstElementChild!.cloneNode(true) as HTMLElement;
      node.dataset.key = l.key;
      if (change?.type === 'add' && change.key === l.key) node.classList.add('is-new');
      const url = config.productBase + l.product.slug + '/';
      node.querySelectorAll<HTMLAnchorElement>('[data-l-link]').forEach((a) => (a.href = url));
      const img = node.querySelector<HTMLImageElement>('[data-l-img]')!;
      img.src = l.thumb;
      node.querySelector('[data-l-name]')!.textContent = l.product.name[L];
      node.querySelector('[data-l-meta]')!.textContent = [l.product.code, l.colourName, `${s('product.size')} ${l.sizeLabel}`].filter(Boolean).join(' · ');
      const sample = node.querySelector<HTMLElement>('[data-l-sample]')!;
      if (l.product.sample && config.sample) {
        sample.hidden = false;
        sample.textContent = s('product.sample');
      }
      const qty = node.querySelector<HTMLInputElement>('[data-l-qty]')!;
      qty.value = String(l.qty);
      qty.max = String(config.maxQty);
      qty.setAttribute('aria-label', `${s('product.qty')} — ${l.product.name[L]}`);
      node.querySelector('[data-l-stepper]')!.setAttribute('aria-label', `${s('product.qty')} — ${l.product.name[L]}`);
      node.querySelector('[data-l-dec-label]')!.textContent = s('product.decrease');
      node.querySelector('[data-l-inc-label]')!.textContent = s('product.increase');
      (node.querySelector('[data-l-dec]') as HTMLButtonElement).disabled = l.qty <= 1;
      (node.querySelector('[data-l-inc]') as HTMLButtonElement).disabled = l.qty >= config.maxQty;
      node.querySelector('[data-l-remove-label]')!.textContent = `${s('cart.remove')} — ${l.product.name[L]}`;
      node.querySelector('[data-l-price]')!.textContent = l.lineTotal === null ? s('product.priceTbc') : money(l.lineTotal);
      return node;
    }),
  );

  if (focusLine && focusRole) {
    const target = list.querySelector<HTMLElement>(`.cart-line[data-key="${CSS.escape(focusLine)}"] [${focusRole}]`);
    if (target && !(target as HTMLButtonElement).disabled) target.focus();
    else list.querySelector<HTMLElement>(`.cart-line[data-key="${CSS.escape(focusLine)}"] [data-l-qty]`)?.focus();
  }

  const t = totals(lines);
  root.querySelector('[data-cart-subtotal]')!.textContent = money(t.subtotal);
  root.querySelector('[data-cart-total]')!.textContent = money(t.subtotal);
  const gift = root.querySelector<HTMLTextAreaElement>('[data-gift-note]');
  if (gift && document.activeElement !== gift) gift.value = cart.giftNote;
}

function renderBadges(lines: ResolvedLine[], change?: { type: string }) {
  const { count } = totals(lines);
  document.querySelectorAll<HTMLElement>('[data-cart-count]').forEach((el) => (el.textContent = String(count)));
  document.querySelectorAll<HTMLElement>('[data-cart-label]').forEach((el) => (el.textContent = s('a11y.cartCount', { n: count })));
  document.querySelectorAll<HTMLElement>('[data-cart-items]').forEach((el) => (el.textContent = count ? s('cart.items', { n: count }) : ''));
  document.querySelectorAll<HTMLElement>('.bag-btn').forEach((b) => {
    b.classList.toggle('has-items', count > 0);
    if (change?.type === 'add') {
      b.classList.remove('is-bumped');
      void b.offsetWidth;
      b.classList.add('is-bumped');
    }
  });
}

/** Thumbnail flies from the add button into the header bag. */
export function flyToBag(from: Element | null, src: string) {
  const bag = document.querySelector('.site-header .bag-btn');
  if (!from || !bag || reducedMotion() || !src) return;
  const a = from.getBoundingClientRect();
  const b = bag.getBoundingClientRect();
  const img = document.createElement('img');
  img.src = src;
  img.alt = '';
  img.className = 'fly-ghost';
  img.style.left = `${a.left + a.width / 2 - 32}px`;
  img.style.top = `${a.top + a.height / 2 - 38}px`;
  document.body.append(img);
  const dx = b.left + b.width / 2 - (a.left + a.width / 2);
  const dy = b.top + b.height / 2 - (a.top + a.height / 2);
  const anim = img.animate(
    [
      { transform: 'translate(0,0) scale(1) rotate(0)', opacity: 1 },
      { transform: `translate(${dx * 0.5}px, ${dy * 0.5 - 80}px) scale(0.8) rotate(-12deg)`, opacity: 1, offset: 0.55 },
      { transform: `translate(${dx}px, ${dy}px) scale(0.2) rotate(8deg)`, opacity: 0.3 },
    ],
    { duration: 780, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' },
  );
  anim.onfinish = () => img.remove();
}

export function initCartUi() {
  const roots = [...document.querySelectorAll<HTMLElement>('[data-cart-root]')];
  let first = true;
  cart.subscribe((_, change) => {
    const lines = resolved();
    roots.forEach((r) => renderRoot(r, lines, change));
    renderBadges(lines, change);
    if (!first && change?.type === 'update') announce(s('cart.updated'));
    first = false;
  });

  document.addEventListener('click', (e) => {
    const t = e.target as Element;
    if (t.closest('[data-open-cart]')) {
      const drawer = document.getElementById('cart-drawer') as HTMLDialogElement;
      openDialog(drawer, t.closest('[data-open-cart]'));
      return;
    }
    const line = t.closest<HTMLElement>('.cart-line');
    if (line) {
      const key = line.dataset.key!;
      const current = cart.lines.find((l) => lineKey(l) === key);
      if (!current) return;
      if (t.closest('[data-l-dec]')) cart.setQty(key, current.qty - 1);
      else if (t.closest('[data-l-inc]')) cart.setQty(key, current.qty + 1);
      else if (t.closest('[data-l-remove]')) {
        const name = productById.get(current.productId)?.name[L] ?? '';
        const removed = cart.remove(key);
        if (removed) {
          toast(s('cart.removed', { x: name }), { label: s('cart.undo'), run: () => cart.restore(removed.line, removed.index) }, 'info');
          document.querySelector<HTMLElement>('[data-cart-root] [data-l-qty], [data-cart-root] .btn')?.focus();
        }
      }
      return;
    }
    const checkout = t.closest('[data-checkout]');
    if (checkout) startCheckout(resolved(), checkout as HTMLElement);
  });

  document.addEventListener('change', (e) => {
    const input = e.target as HTMLInputElement;
    if (input.matches('[data-l-qty]')) {
      const key = input.closest<HTMLElement>('.cart-line')!.dataset.key!;
      cart.setQty(key, Number(input.value));
    }
  });
  document.addEventListener('input', (e) => {
    const ta = e.target as HTMLTextAreaElement;
    if (ta.matches('[data-gift-note]')) {
      cart.giftNote = ta.value;
      document.querySelectorAll<HTMLTextAreaElement>('[data-gift-note]').forEach((o) => o !== ta && (o.value = ta.value));
    }
  });
}

/** "Added" toast with a shortcut to the bag. */
export function addedToast() {
  toast(s('product.added'), {
    label: s('cart.viewBag'),
    run: () => openDialog(document.getElementById('cart-drawer') as HTMLDialogElement),
  });
}
