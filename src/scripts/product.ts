import { clampQty, resolveLines } from '~/lib/order';
import { catalog, config, productById, s, reducedMotion } from './env';
import { cart } from './store';
import { addedToast, flyToBag } from './cart-ui';
import { startSingle } from './order-ui';

const root = document.querySelector<HTMLElement>('[data-pdp]');
if (root) {
  const product = productById.get(root.dataset.id!)!;
  const form = root.querySelector<HTMLFormElement>('[data-pdp-form]')!;
  const sizeList = root.querySelector<HTMLElement>('[data-size-list]')!;
  const sizeError = root.querySelector<HTMLElement>('[data-size-error]')!;
  const qty = root.querySelector<HTMLInputElement>('[data-qty]')!;
  const dec = root.querySelector<HTMLButtonElement>('[data-qty-dec]')!;
  const inc = root.querySelector<HTMLButtonElement>('[data-qty-inc]')!;
  const addBtn = root.querySelector<HTMLButtonElement>('[data-add]')!;
  const colourName = root.querySelector<HTMLElement>('[data-colour-name]');
  const slides = [...root.querySelectorAll<HTMLElement>('[data-colour-slide]')];
  const thumbs = [...root.querySelectorAll<HTMLButtonElement>('[data-thumb]')];

  const selected = () => {
    const fd = new FormData(form);
    return {
      colour: (fd.get('colour') as string) || product.colourways[0]!.id,
      size: fd.get('size') as string | null,
      qty: clampQty(Number(qty.value), config.maxQty),
    };
  };

  // Colour → swap the image with a soft crossfade, keep thumbs in sync.
  function showColour(id: string) {
    for (const sl of slides) {
      const on = sl.dataset.colourSlide === id;
      if (on && sl.hidden) {
        sl.hidden = false;
        if (!reducedMotion()) sl.animate([{ opacity: 0, transform: 'scale(0.97)' }, { opacity: 1, transform: 'none' }], { duration: 420, easing: 'cubic-bezier(0.22,1,0.36,1)' });
      } else if (!on) sl.hidden = true;
    }
    thumbs.forEach((t) => t.setAttribute('aria-pressed', String(t.dataset.thumb === id)));
    const input = form.querySelector<HTMLInputElement>(`input[name="colour"][value="${CSS.escape(id)}"]`);
    if (input && !input.checked) input.checked = true;
    if (colourName && input) colourName.textContent = input.dataset.name ?? '';
  }
  form.addEventListener('change', (e) => {
    const t = e.target as HTMLInputElement;
    if (t.name === 'colour') showColour(t.value);
    if (t.name === 'size') {
      sizeError.textContent = '';
      sizeList.classList.remove('is-invalid');
    }
  });
  thumbs.forEach((t) => t.addEventListener('click', () => showColour(t.dataset.thumb!)));

  // Quantity stepper.
  const syncQty = () => {
    const v = clampQty(Number(qty.value), config.maxQty);
    qty.value = String(v);
    dec.disabled = v <= 1;
    inc.disabled = v >= config.maxQty;
  };
  dec.addEventListener('click', () => { qty.value = String(Number(qty.value) - 1); syncQty(); });
  inc.addEventListener('click', () => { qty.value = String(Number(qty.value) + 1); syncQty(); });
  qty.addEventListener('change', syncQty);

  function requireSize(): string | null {
    const { size } = selected();
    if (size) return size;
    sizeError.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5v5.5M12 16v.01"/></svg>';
    sizeError.append(s('product.chooseSize'));
    sizeList.classList.remove('is-invalid');
    void sizeList.offsetWidth;
    sizeList.classList.add('is-invalid');
    sizeList.scrollIntoView({ block: 'center', behavior: reducedMotion() ? 'auto' : 'smooth' });
    sizeList.querySelector<HTMLInputElement>('input:not(:disabled)')?.focus({ preventScroll: true });
    return null;
  }

  function add(from: Element | null) {
    if (product.price === null) return;
    const size = requireSize();
    if (!size) return;
    const sel = selected();
    cart.add({ productId: product.id, colourId: sel.colour, sizeId: size, qty: sel.qty });
    const thumb = product.colourways.find((c) => c.id === sel.colour)?.thumb ?? '';
    flyToBag(from, thumb);
    addBtn.dataset.state = 'success';
    const label = addBtn.querySelector('.btn__label')!;
    const original = label.textContent;
    label.textContent = s('product.added');
    setTimeout(() => {
      addBtn.dataset.state = '';
      label.textContent = original;
    }, 1800);
    addedToast();
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    add(addBtn);
  });

  // Direct WhatsApp: the current selection if complete, otherwise a simple enquiry.
  root.querySelector('[data-wa-direct]')!.addEventListener('click', (e) => {
    const sel = selected();
    const lines = sel.size
      ? resolveLines([{ productId: product.id, colourId: sel.colour, sizeId: sel.size, qty: sel.qty }], catalog, config.locale, config.maxQty)
      : [];
    startSingle(lines, root.dataset.name!, e.currentTarget as HTMLElement);
  });

  // Sticky add bar on small screens once the main button scrolls away.
  const bar = document.querySelector<HTMLElement>('[data-pdp-bar]');
  if (bar && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(([entry]) => {
      bar.hidden = entry!.isIntersecting || entry!.boundingClientRect.top > 0;
    });
    io.observe(addBtn);
    bar.querySelector('[data-bar-add]')!.addEventListener('click', (e) => add(e.currentTarget as Element));
  }
}
