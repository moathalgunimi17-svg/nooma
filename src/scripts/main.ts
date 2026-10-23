import { initDialogs } from './ui';
import { initCartUi } from './cart-ui';
import { initQuickAdd } from './quick-add';
import { initSearch } from './search';

function initHeader() {
  const header = document.querySelector<HTMLElement>('[data-header]');
  if (header) {
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Collections disclosure (desktop nav).
  const btn = document.querySelector<HTMLButtonElement>('.nav-disclosure');
  const panel = btn ? document.getElementById(btn.getAttribute('aria-controls')!) : null;
  if (btn && panel) {
    const set = (open: boolean) => {
      btn.setAttribute('aria-expanded', String(open));
      panel.hidden = !open;
    };
    btn.addEventListener('click', () => set(btn.getAttribute('aria-expanded') !== 'true'));
    document.addEventListener('click', (e) => {
      if (!(e.target as Element).closest('.has-panel')) set(false);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') {
        set(false);
        btn.focus();
      }
    });
    panel.addEventListener('focusout', (e) => {
      if (!panel.contains(e.relatedTarget as Node) && e.relatedTarget !== btn) set(false);
    });
  }

  // Language switch keeps the current filters/search on the shop page.
  document.querySelectorAll<HTMLAnchorElement>('[data-lang-switch]').forEach((a) => {
    a.addEventListener('click', () => {
      if (location.search) a.href = a.href.split('?')[0] + location.search;
    });
  });
}

function initReveal() {
  const els = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (!('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('is-in'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );
  els.forEach((el) => io.observe(el));
}

initDialogs();
initHeader();
initCartUi();
initQuickAdd();
initSearch();
initReveal();
