import { formatPrice } from '~/lib/format';
import { priceRange, sizePrice } from '~/lib/order';
import { config, productById, s } from './env';
import { cart } from './store';
import { closeDialog, openDialog } from './ui';
import { addedToast, flyToBag } from './cart-ui';

const L = config.locale;

/** Builds radio chips for colours/sizes. Shared with the product page. */
export function sizeChip(name: string, id: string, label: string, disabled = false) {
  const wrap = document.createElement('label');
  wrap.className = 'size-chip';
  const input = document.createElement('input');
  input.type = 'radio';
  input.name = name;
  input.value = id;
  input.disabled = disabled;
  const span = document.createElement('span');
  span.textContent = label;
  wrap.append(input, span);
  return wrap;
}

export function initQuickAdd() {
  const d = document.getElementById('quick-add') as HTMLDialogElement | null;
  if (!d) return;
  const form = d.querySelector<HTMLFormElement>('[data-quick-form]')!;
  const err = d.querySelector<HTMLElement>('[data-qa-error]')!;
  const sizeList = d.querySelector<HTMLElement>('[data-qa-size-list]')!;
  const colourList = d.querySelector<HTMLElement>('[data-qa-colour-list]')!;
  const colourSet = d.querySelector<HTMLElement>('[data-qa-colours]')!;
  const img = d.querySelector<HTMLImageElement>('[data-qa-img]')!;
  let current = '';
  let opener: Element | null = null;

  document.addEventListener('click', (e) => {
    const btn = (e.target as Element).closest<HTMLButtonElement>('[data-quick-add]');
    if (!btn) return;
    const p = productById.get(btn.dataset.quickAdd!);
    if (!p || p.price === null) return;
    current = p.id;
    opener = btn;
    d.querySelector('[data-qa-name]')!.textContent = p.name[L];
    const range = priceRange(p)!;
    d.querySelector('[data-qa-price]')!.textContent = range.min === range.max
      ? formatPrice(range.min, L)
      : s('product.from').replace('{price}', formatPrice(range.min, L));
    d.querySelector<HTMLAnchorElement>('[data-qa-link]')!.href = config.productBase + p.slug + '/';
    img.src = p.colourways[0]!.thumb;
    err.textContent = '';
    sizeList.classList.remove('is-invalid');

    colourList.replaceChildren(
      ...p.colourways.map((c, i) => {
        const wrap = document.createElement('label');
        wrap.className = 'swatch';
        wrap.style.setProperty('--sw', c.swatch);
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'qa-colour';
        input.value = c.id;
        input.checked = i === 0;
        input.addEventListener('change', () => (img.src = c.thumb));
        const span = document.createElement('span');
        span.textContent = c.name[L];
        wrap.append(input, span);
        return wrap;
      }),
    );
    colourSet.hidden = p.colourways.length < 2;
    sizeList.replaceChildren(
      ...p.sizes.map((sz) => sizeChip('qa-size', sz.id, sz.label[L], p.stock ? (p.stock[sz.id] ?? 0) <= 0 : false)),
    );
    openDialog(d, btn);
  });

  sizeList.addEventListener('change', (e) => {
    const price = sizePrice(productById.get(current)!, (e.target as HTMLInputElement).value);
    if (price !== null) d.querySelector('[data-qa-price]')!.textContent = formatPrice(price, L);
    err.textContent = '';
    sizeList.classList.remove('is-invalid');
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const size = fd.get('qa-size') as string | null;
    const colour = (fd.get('qa-colour') as string | null) ?? productById.get(current)?.colourways[0]?.id;
    if (!size) {
      err.textContent = s('product.chooseSize');
      sizeList.classList.remove('is-invalid');
      void sizeList.offsetWidth;
      sizeList.classList.add('is-invalid');
      sizeList.querySelector<HTMLInputElement>('input:not(:disabled)')?.focus();
      return;
    }
    cart.add({ productId: current, colourId: colour!, sizeId: size, qty: 1 });
    flyToBag(form.querySelector('[type=submit]'), img.src);
    closeDialog(d);
    addedToast();
    (opener as HTMLElement | null)?.focus?.();
  });
}
