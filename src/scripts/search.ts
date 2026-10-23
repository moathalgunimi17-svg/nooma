import { matches } from '~/lib/search';
import { formatPrice } from '~/lib/format';
import { catalog, config, s } from './env';

const L = config.locale;

export function initSearch() {
  const d = document.getElementById('search-dialog') as HTMLDialogElement | null;
  if (!d) return;
  const input = d.querySelector<HTMLInputElement>('[data-search-input]')!;
  const list = d.querySelector<HTMLElement>('[data-search-results]')!;
  const status = d.querySelector<HTMLElement>('[data-search-status]')!;
  const suggest = d.querySelector<HTMLElement>('[data-search-suggest]')!;
  const hint = status.textContent ?? '';
  let timer = 0;

  d.addEventListener('nooma:open', () => {
    input.value = '';
    run();
    requestAnimationFrame(() => input.focus());
  });

  const run = () => {
    const q = input.value.trim();
    suggest.hidden = q.length > 0;
    if (!q) {
      list.replaceChildren();
      status.textContent = hint;
      return;
    }
    const hits = catalog.filter((p) => matches(p.search, q));
    status.textContent = hits.length ? s('search.results', { n: hits.length }) : s('search.empty', { q });
    list.replaceChildren(
      ...hits.map((p) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.className = 'search-hit';
        a.href = config.productBase + p.slug + '/';
        const img = document.createElement('img');
        img.src = p.colourways[0]!.thumb;
        img.alt = '';
        img.width = 56;
        img.height = 64;
        const text = document.createElement('span');
        const strong = document.createElement('strong');
        strong.textContent = p.name[L];
        const small = document.createElement('small');
        small.textContent = p.colourways.map((c) => c.name[L]).join(' · ');
        text.append(strong, small);
        const price = document.createElement('span');
        price.textContent = p.price === null ? s('product.priceTbc') : formatPrice(p.price, L);
        a.append(img, text, price);
        li.append(a);
        return li;
      }),
    );
  };

  input.addEventListener('input', () => {
    window.clearTimeout(timer);
    timer = window.setTimeout(run, 120);
  });
  // Enter goes to the full shop results page (the form's GET action).
}
