/**
 * Printable invoice for one order. Fills the sheet in [data-invoice] (its
 * header — logo and Nooma's verified contacts — is rendered by the page) and
 * opens the print dialog; on a phone that is also where "Save as PDF" lives.
 * Internal notes are never printed.
 */
import { $, h, money, sizeLabel } from './core';
import type { Order } from './orders';
import { roundOmr } from '~/lib/format';

const dateOnly = new Intl.DateTimeFormat('ar-OM-u-nu-latn', { dateStyle: 'long' });

function fill(o: Order, delivery: number | null) {
  const subtotal = Number(o.subtotal);
  const row = (label: string, value: string, cls?: string) =>
    h('tr', { class: cls }, h('th', { colspan: 4, scope: 'row' }, label), h('td', {}, value));

  $('[data-invoice-body]').replaceChildren(
    h('div', { class: 'invoice__title' },
      h('h1', {}, 'فاتورة'),
      h('dl', { class: 'invoice__facts' },
        h('dt', {}, 'رقم الطلب'), h('dd', { dir: 'ltr' }, `#${o.id}`),
        h('dt', {}, 'التاريخ'), h('dd', {}, dateOnly.format(new Date(o.created_at))),
      ),
    ),
    o.sample ? h('p', { class: 'invoice__sample' }, 'طلب على منتجات تجريبية') : '',

    h('section', { class: 'invoice__to' },
      h('h2', {}, 'إلى'),
      h('dl', {},
        h('dt', {}, 'الاسم'), h('dd', {}, o.customer_name),
        h('dt', {}, 'الهاتف'), h('dd', {}, h('span', { dir: 'ltr' }, o.customer_phone)),
        o.customer_email ? h('dt', {}, 'البريد') : null,
        o.customer_email ? h('dd', {}, h('span', { dir: 'ltr' }, o.customer_email)) : null,
        h('dt', {}, 'المنطقة'), h('dd', {}, o.customer_area),
        o.customer_address ? h('dt', {}, 'العنوان') : null,
        o.customer_address ? h('dd', {}, o.customer_address) : null,
      ),
    ),

    h('table', { class: 'invoice__items' },
      h('thead', {}, h('tr', {},
        h('th', { scope: 'col' }, '#'),
        h('th', { scope: 'col' }, 'المنتج'),
        h('th', { scope: 'col' }, 'الكمية'),
        h('th', { scope: 'col' }, 'سعر القطعة'),
        h('th', { scope: 'col' }, 'المجموع'),
      )),
      h('tbody', {}, ...o.items.map((i, n) =>
        h('tr', {},
          h('td', {}, n + 1),
          h('td', {}, h('strong', {}, i.nameAr), h('br'), h('span', { class: 'invoice__muted' }, [i.code, i.colourAr, `المقاس ${sizeLabel(i.sizeId)}`].filter(Boolean).join(' · '))),
          h('td', {}, i.qty),
          h('td', {}, money(i.unitPrice)),
          h('td', {}, money(i.lineTotal)),
        ))),
      h('tfoot', {}, ...(delivery === null
        ? [row('الإجمالي (بدون التوصيل)', money(subtotal), 'invoice__total')]
        : [
            row('المجموع الفرعي', money(subtotal)),
            row('التوصيل', money(delivery)),
            row('الإجمالي', money(roundOmr(subtotal + delivery)), 'invoice__total'),
          ])),
    ),

    o.gift_note ? h('p', { class: 'invoice__gift' }, h('strong', {}, 'بطاقة إهداء: '), o.gift_note) : '',
    h('p', { class: 'invoice__thanks' }, 'شكراً لاختياركم نُومة'),
  );
}

export function printInvoice(o: Order, delivery: number | null) {
  fill(o, delivery);
  // The title becomes the PDF's file name when saving instead of printing.
  const title = document.title;
  document.title = `فاتورة نومة ${o.id}`;
  document.body.classList.add('is-printing');
  const done = () => {
    document.title = title;
    document.body.classList.remove('is-printing');
    window.removeEventListener('afterprint', done);
  };
  window.addEventListener('afterprint', done);
  window.print();
}
