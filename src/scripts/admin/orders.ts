/** Orders: list, filters, live updates and the order detail dialog. */
import { $, explain, h, money, sb, showDialog, sizeLabel, toast, when } from './core';

export interface OrderItem {
  productId: string;
  slug: string;
  nameAr: string;
  colourAr: string;
  sizeId: string;
  qty: number;
  unitPrice: number;
  lineTotal: number;
}

export interface Order {
  id: number;
  created_at: string;
  status: Status;
  locale: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string | null;
  customer_area: string;
  customer_address: string | null;
  gift_note: string | null;
  items: OrderItem[];
  subtotal: number | string;
  sample: boolean;
  admin_note: string | null;
}

export const STATUSES = {
  new: 'جديد',
  preparing: 'قيد التجهيز',
  shipped: 'تم الشحن',
  delivered: 'تم التوصيل',
  cancelled: 'ملغي',
} as const;
type Status = keyof typeof STATUSES;

let orders: Order[] = [];
let filter: Status | 'all' = 'all';
let query = '';
let unseen = 0;

const list = () => $('[data-orders]');

/** WhatsApp chat with the customer. A local 8-digit number gets +968 — shown on the button, never hidden. */
function waLink(phone: string): { href: string; label: string } | null {
  const digits = phone.replace(/\D/g, '');
  if (phone.startsWith('+') || phone.startsWith('00')) {
    const d = phone.startsWith('00') ? digits.slice(2) : digits;
    return { href: `https://wa.me/${d}`, label: 'واتساب' };
  }
  if (/^[79]\d{7}$/.test(digits)) return { href: `https://wa.me/968${digits}`, label: `واتساب (+968 ${digits})` };
  return null;
}

const itemCount = (o: Order) => o.items.reduce((n, i) => n + i.qty, 0);

function matches(o: Order) {
  if (filter !== 'all' && o.status !== filter) return false;
  if (!query) return true;
  const q = query.toLowerCase();
  return [String(o.id), o.customer_name, o.customer_phone, o.customer_area, o.customer_email ?? '']
    .some((v) => v.toLowerCase().includes(q));
}

function renderFilters() {
  const box = $('[data-status-filters]');
  const count = (s: Status | 'all') => (s === 'all' ? orders.length : orders.filter((o) => o.status === s).length);
  const entries: [Status | 'all', string][] = [['all', 'الكل'], ...(Object.entries(STATUSES) as [Status, string][])];
  box.replaceChildren(
    ...entries.map(([key, label]) =>
      h('button', {
        type: 'button',
        class: `admin-chip admin-chip--${key}`,
        'aria-pressed': String(filter === key),
        onclick: () => { filter = key; render(); },
      }, label, h('span', { class: 'admin-chip__n' }, count(key))),
    ),
  );
}

function card(o: Order) {
  return h('li', {},
    h('button', { type: 'button', class: 'admin-order', 'data-status': o.status, onclick: () => openOrder(o.id) },
      h('span', { class: 'admin-order__top' },
        h('strong', { class: 'admin-order__id', dir: 'ltr' }, `#${o.id}`),
        h('span', { class: `admin-pill admin-pill--${o.status}` }, STATUSES[o.status]),
        o.sample ? h('span', { class: 'admin-pill admin-pill--sample' }, 'تجريبي') : null,
        h('span', { class: 'admin-order__when muted' }, when(o.created_at)),
      ),
      h('span', { class: 'admin-order__who' }, o.customer_name, h('span', { class: 'muted' }, ` · ${o.customer_area}`)),
      h('span', { class: 'admin-order__meta' },
        h('span', { dir: 'ltr' }, o.customer_phone),
        h('span', {}, `${itemCount(o)} قطعة`),
        h('strong', {}, money(o.subtotal)),
      ),
    ),
  );
}

function render() {
  renderFilters();
  const shown = orders.filter(matches);
  list().replaceChildren(...shown.map(card));
  $('[data-orders-empty]').hidden = shown.length > 0;
  const fresh = orders.filter((o) => o.status === 'new').length;
  const badge = $('[data-new-count]');
  badge.hidden = fresh === 0;
  badge.textContent = String(fresh);
  document.title = unseen ? `(${unseen}) لوحة نُومة` : 'لوحة نُومة';
}

export async function loadOrders() {
  const { data, error } = await sb!.from('orders').select('*').order('created_at', { ascending: false }).limit(500);
  if (error) return toast(explain(error), 'error');
  orders = data as Order[];
  render();
}

async function update(id: number, patch: Partial<Order>, okMsg: string) {
  const { data, error } = await sb!.from('orders').update(patch).eq('id', id).select().single();
  if (error) return toast(explain(error), 'error');
  orders = orders.map((o) => (o.id === id ? (data as Order) : o));
  render();
  toast(okMsg);
}

function openOrder(id: number) {
  const o = orders.find((x) => x.id === id);
  if (!o) return;
  unseen = 0;
  render();
  const d = $<HTMLDialogElement>('[data-order-dialog]');
  const wa = waLink(o.customer_phone);
  const note = h('textarea', { class: 'textarea', id: 'od-note', rows: 3, maxlength: 2000, value: o.admin_note ?? '' });
  const status = h('select', { class: 'select', id: 'od-status' },
    ...(Object.entries(STATUSES) as [Status, string][]).map(([k, v]) => h('option', { value: k, selected: k === o.status }, v)),
  );
  status.addEventListener('change', () => update(o.id, { status: status.value as Status }, `الطلب #${o.id}: ${STATUSES[status.value as Status]}`));

  d.replaceChildren(
    h('div', { class: 'admin-dialog__head' },
      h('h2', { id: 'od-title' }, 'طلب ', h('span', { dir: 'ltr' }, `#${o.id}`)),
      h('button', { type: 'button', class: 'admin-close', 'aria-label': 'إغلاق', onclick: () => d.close() }, '✕'),
    ),
    h('p', { class: 'muted' }, when(o.created_at), o.sample ? ' · طلب على منتجات تجريبية' : ''),
    h('div', { class: 'field' }, h('label', { for: 'od-status' }, 'حالة الطلب'), status),

    h('h3', {}, 'العميل'),
    h('dl', { class: 'admin-dl' },
      h('dt', {}, 'الاسم'), h('dd', {}, o.customer_name),
      h('dt', {}, 'الهاتف'), h('dd', {}, h('span', { dir: 'ltr' }, o.customer_phone)),
      o.customer_email ? h('dt', {}, 'البريد') : null,
      o.customer_email ? h('dd', {}, h('a', { href: `mailto:${o.customer_email}`, dir: 'ltr' }, o.customer_email)) : null,
      h('dt', {}, 'المنطقة'), h('dd', {}, o.customer_area),
      o.customer_address ? h('dt', {}, 'العنوان') : null,
      o.customer_address ? h('dd', {}, o.customer_address) : null,
    ),
    h('div', { class: 'admin-actions' },
      wa ? h('a', { class: 'btn btn--wa btn--sm', href: wa.href, target: '_blank', rel: 'noopener' }, wa.label) : null,
      h('a', { class: 'btn btn--soft btn--sm', href: `tel:${o.customer_phone}` }, 'اتصال'),
    ),

    h('h3', {}, 'القطع'),
    h('table', { class: 'admin-table' },
      h('thead', {}, h('tr', {}, h('th', {}, 'المنتج'), h('th', {}, 'الكمية'), h('th', {}, 'المجموع'))),
      h('tbody', {}, ...o.items.map((i) =>
        h('tr', {},
          h('td', {}, h('strong', {}, i.nameAr), h('br'), h('span', { class: 'muted' }, `${i.colourAr} · ${sizeLabel(i.sizeId)} · ${money(i.unitPrice)}`)),
          h('td', {}, `× ${i.qty}`),
          h('td', {}, money(i.lineTotal)),
        ))),
      h('tfoot', {}, h('tr', {}, h('th', { colspan: 2 }, 'المجموع الفرعي (بدون التوصيل)'), h('th', {}, money(o.subtotal)))),
    ),
    o.gift_note ? h('p', { class: 'admin-note' }, h('strong', {}, 'بطاقة إهداء: '), o.gift_note) : '',

    h('div', { class: 'field' }, h('label', { for: 'od-note' }, 'ملاحظات داخلية (لا يراها العميل)'), note),
    h('div', { class: 'admin-actions' },
      h('button', { type: 'button', class: 'btn btn--sm', onclick: () => update(o.id, { admin_note: note.value.trim() || null }, 'حُفظت الملاحظة') }, 'حفظ الملاحظة'),
      h('button', {
        type: 'button', class: 'btn btn--sm btn--ghost admin-danger',
        onclick: async () => {
          if (!confirm(`حذف الطلب #${o.id} نهائياً؟ لا يمكن التراجع.`)) return;
          const { error } = await sb!.from('orders').delete().eq('id', o.id);
          if (error) return toast(explain(error), 'error');
          orders = orders.filter((x) => x.id !== o.id);
          render();
          d.close();
          toast(`حُذف الطلب #${o.id}`);
        },
      }, 'حذف الطلب'),
    ),
  );
  showDialog(d);
}

/** Chime + toast when a new order arrives while the admin is open. */
function chime() {
  try {
    const ctx = new AudioContext();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.frequency.value = 880;
    g.gain.setValueAtTime(0.0001, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5);
    o.connect(g).connect(ctx.destination);
    o.start();
    o.stop(ctx.currentTime + 0.5);
  } catch {
    /* sound is a nicety */
  }
}

export function initOrders() {
  $('[data-order-search]').addEventListener('input', (e) => {
    query = (e.target as HTMLInputElement).value.trim();
    render();
  });
  $('[data-orders-refresh]').addEventListener('click', () => void loadOrders());

  sb!.channel('orders-live')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'orders' }, (payload) => {
      const o = payload.new as Order;
      if (orders.some((x) => x.id === o.id)) return;
      orders = [o, ...orders];
      unseen++;
      render();
      chime();
      toast(`طلب جديد #${o.id} من ${o.customer_name}`);
    })
    .subscribe((state) => {
      $('[data-live-note]').textContent = state === 'SUBSCRIBED'
        ? 'متصل: الطلبات الجديدة تظهر هنا تلقائياً مع تنبيه صوتي.'
        : 'التحديث التلقائي غير متصل الآن — اضغطي «تحديث».';
    });
  return loadOrders();
}
