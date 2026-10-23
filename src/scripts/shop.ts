import { matches } from '~/lib/search';
import { productById, s } from './env';

const root = document.querySelector<HTMLElement>('[data-shop]');
if (root) {
  const form = root.querySelector<HTMLFormElement>('[data-f-form]')!;
  const grid = root.querySelector<HTMLElement>('[data-f-grid]')!;
  const empty = root.querySelector<HTMLElement>('[data-f-empty]')!;
  const count = root.querySelector<HTMLElement>('[data-f-count]')!;
  const active = root.querySelector<HTMLElement>('[data-f-active]')!;
  const q = root.querySelector<HTMLInputElement>('[data-f-q]')!;
  const cards = [...grid.querySelectorAll<HTMLElement>('[data-product-card]')];
  const fixedCategory = root.dataset.fixedCategory || '';

  const countText = (n: number) => (n === 1 ? s('shop.count1') : n === 2 ? s('shop.count2') : s('shop.count', { n }));

  // Restore state from the URL (shareable, and kept across the language switch).
  const params = new URLSearchParams(location.search);
  q.value = params.get('q') ?? '';
  const c = params.get('c');
  if (c) form.querySelector<HTMLInputElement>(`input[name="c"][value="${CSS.escape(c)}"]`)?.click();
  for (const v of params.getAll('size')) {
    const el = form.querySelector<HTMLInputElement>(`input[name="size"][value="${CSS.escape(v)}"]`);
    if (el) el.checked = true;
  }
  for (const v of params.getAll('colour')) {
    const el = form.querySelector<HTMLInputElement>(`input[name="colour"][value="${CSS.escape(v)}"]`);
    if (el) el.checked = true;
  }
  const sortSel = form.querySelector<HTMLSelectElement>('select[name="sort"]')!;
  const sortParam = params.get('sort');
  if (sortParam && [...sortSel.options].some((o) => o.value === sortParam)) sortSel.value = sortParam;

  function state() {
    const fd = new FormData(form);
    return {
      q: q.value.trim(),
      c: fixedCategory || ((fd.get('c') as string) ?? ''),
      sizes: fd.getAll('size') as string[],
      colours: fd.getAll('colour') as string[],
      sort: (fd.get('sort') as string) || 'featured',
    };
  }

  function chip(label: string, onRemove: () => void) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'chip shop__chip';
    b.setAttribute('aria-label', s('shop.remove', { x: label }));
    b.innerHTML = '<span></span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M7 7l10 10M17 7 7 17"/></svg>';
    b.querySelector('span')!.textContent = label;
    b.addEventListener('click', () => {
      onRemove();
      apply();
    });
    return b;
  }

  function apply() {
    const st = state();
    let shown = 0;
    for (const card of cards) {
      const p = productById.get(card.dataset.id!);
      const ok =
        (!st.c || card.dataset.category === st.c) &&
        (!st.sizes.length || st.sizes.some((sz) => card.dataset.sizes!.split(' ').includes(sz))) &&
        (!st.colours.length || st.colours.some((col) => card.dataset.colours!.split(' ').includes(col))) &&
        (!st.q || (p ? matches(p.search, st.q) : false));
      card.hidden = !ok;
      if (ok) shown++;
    }

    const num = (v: string | undefined) => (v ? Number(v) : Number.POSITIVE_INFINITY);
    const sorted = [...cards].sort((a, b) => {
      switch (st.sort) {
        case 'priceAsc': return num(a.dataset.price) - num(b.dataset.price);
        case 'priceDesc': return (b.dataset.price ? Number(b.dataset.price) : -1) - (a.dataset.price ? Number(a.dataset.price) : -1);
        case 'name': return a.dataset.name!.localeCompare(b.dataset.name!, document.documentElement.lang);
        default: return Number(b.dataset.featured) - Number(a.dataset.featured) || Number(a.dataset.order) - Number(b.dataset.order);
      }
    });
    sorted.forEach((el) => grid.append(el));
    grid.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => el.classList.add('is-in'));

    count.textContent = countText(shown);
    empty.hidden = shown > 0;
    grid.hidden = shown === 0;

    // Active-filter chips, each removable.
    const chips: HTMLElement[] = [];
    if (st.q) chips.push(chip(`“${st.q}”`, () => (q.value = '')));
    if (st.c && !fixedCategory) {
      const input = form.querySelector<HTMLInputElement>(`input[name="c"][value="${CSS.escape(st.c)}"]`);
      const label = input?.nextElementSibling?.textContent ?? st.c;
      chips.push(chip(label, () => form.querySelector<HTMLInputElement>('input[name="c"][value=""]')!.click()));
    }
    for (const name of ['size', 'colour'] as const) {
      form.querySelectorAll<HTMLInputElement>(`input[name="${name}"]:checked`).forEach((input) => {
        chips.push(chip(input.dataset.label ?? input.value, () => (input.checked = false)));
      });
    }
    active.replaceChildren(...chips);
    if (chips.length > 1) {
      const clear = document.createElement('button');
      clear.type = 'button';
      clear.className = 'shop__clear-all';
      clear.textContent = form.querySelector('[data-f-clear]')?.textContent ?? '';
      clear.addEventListener('click', clearAll);
      active.append(clear);
    }
    active.hidden = chips.length === 0;

    // Sync URL without adding history entries.
    const next = new URLSearchParams();
    if (st.q) next.set('q', st.q);
    if (st.c && !fixedCategory) next.set('c', st.c);
    st.sizes.forEach((v) => next.append('size', v));
    st.colours.forEach((v) => next.append('colour', v));
    if (st.sort !== 'featured') next.set('sort', st.sort);
    const qs = next.toString();
    history.replaceState(null, '', qs ? `?${qs}` : location.pathname);
  }

  function clearAll() {
    form.reset();
    q.value = '';
    // form.reset() fires before values reset; apply on next tick.
    setTimeout(apply);
  }

  form.addEventListener('change', apply);
  form.addEventListener('reset', () => setTimeout(apply));
  root.querySelectorAll('[data-f-clear]').forEach((b) => b.addEventListener('click', (e) => {
    if ((b as HTMLButtonElement).type !== 'reset') {
      e.preventDefault();
      clearAll();
    }
  }));
  let timer = 0;
  q.addEventListener('input', () => {
    clearTimeout(timer);
    timer = window.setTimeout(apply, 140);
  });
  apply();
}
