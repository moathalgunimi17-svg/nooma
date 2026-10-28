/** Products: grid and the add / edit dialog (fields, colours, photos). */
import { $, $$, cfg, categoryName, explain, h, money, sb, showDialog, toast } from './core';
import { markDirty } from './publish';

const BUCKET = 'product-photos';

interface Colour {
  id: string;
  name_ar: string;
  name_en: string;
  swatch: string;
  photos: string[];
  art: string;
  sort: number;
  /** true until saved once — only new colours may change their id. */
  isNew?: boolean;
}

interface ProductRow {
  id: string;
  slug: string;
  name_ar: string;
  name_en: string;
  summary_ar: string;
  summary_en: string;
  description_ar: string;
  description_en: string;
  category_id: string;
  price: number | string | null;
  compare_at_price: number | string | null;
  size_ids: string[];
  featured: boolean;
  sample: boolean;
  active: boolean;
  sort: number;
  colourways: Colour[];
}

let products: ProductRow[] = [];

const ART_NAMES: Record<string, string> = {
  'kid-baking': 'طفل يخبز (أصفر)',
  'kid-brushing': 'طفل يفرّش أسنانه (أزرق)',
  'kid-camera': 'طفل بالكاميرا (لافندر)',
  'kid-facemask': 'طفلة بالماسك (وردي)',
  'kid-reading': 'طفلة تقرأ (مخطط أصفر)',
  'kid-stretch': 'طفلة تتمطّى (مخطط وردي)',
  'mirror-siblings': 'أخوين في المرآة',
};

const rand = (n = 10) => [...crypto.getRandomValues(new Uint8Array(n))].map((b) => (b % 36).toString(36)).join('').slice(0, n);
/** Latin letters, digits and dashes only — what the database and URLs accept. */
const slugify = (s: string) =>
  s.toLowerCase().normalize('NFKD').replace(/[^\w\s-]/g, '').replace(/[_\s]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '').slice(0, 60);

const blank = (): ProductRow => ({
  id: `p-${rand()}`, slug: '', name_ar: '', name_en: '', summary_ar: '', summary_en: '', description_ar: '', description_en: '',
  category_id: cfg.categories[0]!.id, price: null, compare_at_price: null, size_ids: [], featured: false,
  sample: false, active: true, sort: (products.at(-1)?.sort ?? 0) + 1,
  colourways: [{ id: 'c1', name_ar: '', name_en: '', swatch: '#d0d5e6', photos: [], art: 'kid-reading', sort: 0, isNew: true }],
});

export async function loadProducts() {
  const { data, error } = await sb!.from('products').select('*, colourways(*)').order('sort').order('created_at');
  if (error) return toast(explain(error), 'error');
  products = (data as ProductRow[]).map((p) => ({ ...p, colourways: [...p.colourways].sort((a, b) => a.sort - b.sort) }));
  render();
}

function render() {
  $('[data-products-empty]').hidden = products.length > 0;
  $('[data-products]').replaceChildren(
    ...products.map((p) => {
      const cover = p.colourways.find((c) => c.photos.length)?.photos[0];
      return h('li', {},
        h('button', { type: 'button', class: 'admin-product', onclick: () => openEditor(p) },
          h('span', { class: 'admin-product__img', style: `--sw: ${p.colourways[0]?.swatch ?? '#d0d5e6'}` },
            cover ? h('img', { src: cover, alt: '', loading: 'lazy', decoding: 'async' }) : h('span', { class: 'muted' }, 'لا توجد صورة'),
          ),
          h('span', { class: 'admin-product__body' },
            h('strong', {}, p.name_ar),
            h('span', { class: 'muted' }, `${categoryName(p.category_id)} · ${p.price === null ? 'السعر عند الطلب' : money(p.price)}`),
            h('span', { class: 'admin-product__tags' },
              p.active ? null : h('span', { class: 'admin-pill admin-pill--cancelled' }, 'مخفي'),
              p.featured ? h('span', { class: 'admin-pill admin-pill--preparing' }, 'في الرئيسية') : null,
              p.sample ? h('span', { class: 'admin-pill admin-pill--sample' }, 'تجريبي') : null,
            ),
          ),
        ),
      );
    }),
  );
}

/** Resizes on the phone before upload: max 1600px, WebP — quick uploads, small storage. */
async function shrink(file: File): Promise<Blob> {
  const bmp = await createImageBitmap(file);
  const scale = Math.min(1, 1600 / Math.max(bmp.width, bmp.height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(bmp.width * scale);
  canvas.height = Math.round(bmp.height * scale);
  canvas.getContext('2d')!.drawImage(bmp, 0, 0, canvas.width, canvas.height);
  bmp.close();
  return new Promise((ok, fail) => canvas.toBlob((b) => (b ? ok(b) : fail(new Error('toBlob'))), 'image/webp', 0.85));
}

const storagePath = (url: string) => {
  const marker = `/storage/v1/object/public/${BUCKET}/`;
  const i = url.indexOf(marker);
  return i < 0 ? null : decodeURIComponent(url.slice(i + marker.length));
};

function field(id: string, label: string, control: HTMLElement, hint?: string) {
  return h('div', { class: 'field' }, h('label', { for: id }, label), control, hint ? h('small', { class: 'muted' }, hint) : null);
}

function openEditor(source?: ProductRow) {
  const isNew = !source;
  const p: ProductRow = structuredClone(source ?? blank());
  const originalPhotos = new Set((source?.colourways ?? []).flatMap((c) => c.photos));
  const d = $<HTMLDialogElement>('[data-product-dialog]');
  let slugTouched = !isNew;

  const input = (id: string, value: string | number | null, attrs: Record<string, string | number | boolean> = {}) =>
    h('input', { class: 'input', id, value: value ?? '', ...attrs });
  const area = (id: string, value: string, rows = 3, max = 3000) =>
    h('textarea', { class: 'textarea', id, rows, maxlength: max, value });

  const nameAr = input('pd-name-ar', p.name_ar, { maxlength: 120, required: true });
  const nameEn = input('pd-name-en', p.name_en, { maxlength: 120, dir: 'ltr' });
  const slug = input('pd-slug', p.slug, { maxlength: 80, dir: 'ltr', pattern: '[a-z0-9]+(-[a-z0-9]+)*' });
  nameEn.addEventListener('input', () => { if (!slugTouched) slug.value = slugify(nameEn.value); });
  slug.addEventListener('input', () => { slugTouched = true; });
  const category = h('select', { class: 'select', id: 'pd-cat' },
    ...cfg.categories.map((c) => h('option', { value: c.id, selected: c.id === p.category_id }, c.name)));
  const price = input('pd-price', p.price === null ? '' : Number(p.price).toFixed(3), { type: 'number', min: 0, step: '0.001', inputmode: 'decimal', dir: 'ltr' });
  const compareAt = input('pd-compare', p.compare_at_price === null ? '' : Number(p.compare_at_price).toFixed(3), { type: 'number', min: 0, step: '0.001', inputmode: 'decimal', dir: 'ltr' });
  const sizes = h('div', { class: 'admin-checks', id: 'pd-sizes', role: 'group' },
    ...cfg.sizes.map((s) => h('label', { class: 'admin-check' },
      h('input', { type: 'checkbox', value: s.id, checked: p.size_ids.includes(s.id) }), s.label)));
  const toggle = (label: string, on: boolean) => {
    const box = h('input', { type: 'checkbox', checked: on });
    return { box, el: h('label', { class: 'admin-check' }, box, label) };
  };
  const active = toggle('ظاهر في المتجر', p.active);
  const featured = toggle('يظهر في الصفحة الرئيسية', p.featured);
  const sample = toggle('منتج تجريبي (تظهر عليه علامة «نموذج»)', p.sample);
  const summaryAr = input('pd-sum-ar', p.summary_ar, { maxlength: 200 });
  const summaryEn = input('pd-sum-en', p.summary_en, { maxlength: 200, dir: 'ltr' });
  const descAr = area('pd-desc-ar', p.description_ar, 4);
  const descEn = area('pd-desc-en', p.description_en, 4);
  descEn.setAttribute('dir', 'ltr');
  const sort = input('pd-sort', p.sort, { type: 'number', step: 1, inputmode: 'numeric', dir: 'ltr' });

  const coloursBox = h('div', { class: 'admin-colours' });
  const error = h('p', { class: 'field-error', role: 'alert' });

  const renderColours = () => {
    coloursBox.replaceChildren(...p.colourways.map((c, ci) => {
      const files = h('input', { type: 'file', accept: 'image/*', multiple: true, class: 'visually-hidden', id: `pd-files-${ci}` });
      files.addEventListener('change', async () => {
        const list = [...(files.files ?? [])];
        if (!list.length) return;
        status.textContent = `جارٍ رفع ${list.length} صورة…`;
        for (const [i, f] of list.entries()) {
          try {
            const blob = await shrink(f);
            const path = `${p.id}/${c.id}-${Date.now()}-${i}.webp`;
            const { error: upErr } = await sb!.storage.from(BUCKET).upload(path, blob, { contentType: 'image/webp', cacheControl: '31536000' });
            if (upErr) throw upErr;
            c.photos.push(sb!.storage.from(BUCKET).getPublicUrl(path).data.publicUrl);
          } catch (err) {
            toast(explain(err), 'error');
          }
        }
        renderColours();
      });
      const status = h('span', { class: 'muted' });
      const nameArC = h('input', { class: 'input', value: c.name_ar, maxlength: 60, 'aria-label': 'اسم اللون بالعربي', placeholder: 'مثال: وردي' });
      const nameEnC = h('input', { class: 'input', value: c.name_en, maxlength: 60, dir: 'ltr', 'aria-label': 'اسم اللون بالإنجليزي', placeholder: 'e.g. Pink' });
      const idC = h('input', { class: 'input', value: c.id, maxlength: 40, dir: 'ltr', disabled: !c.isNew, 'aria-label': 'معرّف اللون' });
      nameArC.addEventListener('input', () => (c.name_ar = nameArC.value));
      nameEnC.addEventListener('input', () => {
        c.name_en = nameEnC.value;
        if (c.isNew && slugify(nameEnC.value)) idC.value = c.id = slugify(nameEnC.value).slice(0, 40);
      });
      idC.addEventListener('input', () => (c.id = idC.value.trim()));
      const swatch = h('input', { type: 'color', value: c.swatch, 'aria-label': 'لون العيّنة' });
      swatch.addEventListener('input', () => (c.swatch = swatch.value));
      const art = h('select', { class: 'select', 'aria-label': 'الرسمة البديلة' },
        ...cfg.artKeys.map((k) => h('option', { value: k, selected: k === c.art }, ART_NAMES[k] ?? k)));
      art.addEventListener('change', () => (c.art = art.value));
      const move = (i: number, by: number) => {
        const [x] = c.photos.splice(i, 1);
        c.photos.splice(Math.max(0, Math.min(c.photos.length, i + by)), 0, x!);
        renderColours();
      };

      return h('fieldset', { class: 'admin-colour' },
        h('legend', {}, `اللون ${ci + 1}`),
        h('div', { class: 'admin-row' }, nameArC, nameEnC),
        h('div', { class: 'admin-row' },
          h('label', { class: 'admin-swatch' }, swatch, 'لون العيّنة'),
          h('label', { class: 'admin-inline' }, h('span', { class: 'muted' }, 'المعرّف'), idC),
        ),
        h('div', { class: 'admin-photos' },
          ...c.photos.map((url, pi) => h('figure', { class: 'admin-photo' },
            h('img', { src: url, alt: '', loading: 'lazy' }),
            pi === 0 ? h('span', { class: 'admin-photo__cover' }, 'الغلاف') : null,
            h('span', { class: 'admin-photo__tools' },
              h('button', { type: 'button', 'aria-label': 'قبل', disabled: pi === 0, onclick: () => move(pi, -1) }, '→'),
              h('button', { type: 'button', 'aria-label': 'بعد', disabled: pi === c.photos.length - 1, onclick: () => move(pi, 1) }, '←'),
              h('button', { type: 'button', 'aria-label': 'حذف الصورة', onclick: () => { c.photos.splice(pi, 1); renderColours(); } }, '✕'),
            ),
          )),
          h('label', { class: 'admin-photo admin-photo--add', for: `pd-files-${ci}` }, '+ صور'),
          files,
        ),
        status,
        c.photos.length ? null : h('div', { class: 'field' }, h('small', { class: 'muted' }, 'بدون صور تظهر هذه الرسمة مكانها (مع علامة «رسم توضيحي»):'), art),
        p.colourways.length > 1
          ? h('button', { type: 'button', class: 'btn btn--sm btn--ghost admin-danger', onclick: () => { p.colourways.splice(ci, 1); renderColours(); } }, 'حذف هذا اللون')
          : null,
      );
    }));
  };
  renderColours();

  const readForm = (): string | null => {
    p.name_ar = nameAr.value.trim();
    p.name_en = nameEn.value.trim();
    p.slug = slug.value.trim().toLowerCase() || slugify(p.name_en) || p.id;
    p.category_id = category.value;
    p.price = price.value === '' ? null : Number(price.value);
    p.compare_at_price = compareAt.value === '' ? null : Number(compareAt.value);
    p.size_ids = $$<HTMLInputElement>('input:checked', sizes).map((i) => i.value);
    p.active = active.box.checked;
    p.featured = featured.box.checked;
    p.sample = sample.box.checked;
    p.summary_ar = summaryAr.value.trim();
    p.summary_en = summaryEn.value.trim();
    p.description_ar = descAr.value.trim();
    p.description_en = descEn.value.trim();
    p.sort = Number(sort.value) || 0;
    if (!p.name_ar) return 'اكتبي اسم المنتج بالعربي.';
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(p.slug)) return 'رابط المنتج: حروف إنجليزية صغيرة وأرقام وشرطات فقط (مثال: pink-hearts).';
    if (p.price !== null && !(p.price >= 0)) return 'السعر غير صحيح.';
    if (!p.size_ids.length) return 'اختاري مقاساً واحداً على الأقل.';
    if (!p.colourways.length) return 'أضيفي لوناً واحداً على الأقل.';
    for (const c of p.colourways) {
      if (!c.name_ar.trim()) return 'اكتبي اسم كل لون بالعربي.';
      if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(c.id)) return `معرّف اللون «${c.name_ar}»: حروف إنجليزية صغيرة وأرقام وشرطات فقط.`;
    }
    if (new Set(p.colourways.map((c) => c.id)).size !== p.colourways.length) return 'لكل لون معرّف مختلف.';
    return null;
  };

  const save = async (btn: HTMLButtonElement) => {
    const problem = readForm();
    error.textContent = problem ?? '';
    if (problem) return;
    btn.disabled = true;
    try {
      const { colourways, ...row } = p;
      const { error: e1 } = await sb!.from('products').upsert(row);
      if (e1) throw e1;
      const keep = colourways.map((c) => c.id);
      const del = sb!.from('colourways').delete().eq('product_id', p.id);
      const { error: e2 } = keep.length ? await del.not('id', 'in', `(${keep.map((k) => `"${k}"`).join(',')})`) : await del;
      if (e2) throw e2;
      const { error: e3 } = await sb!.from('colourways').upsert(
        colourways.map(({ isNew: _n, ...c }, i) => ({ ...c, name_ar: c.name_ar.trim(), name_en: c.name_en.trim(), product_id: p.id, sort: i })),
      );
      if (e3) throw e3;
      // Photos removed in this edit are deleted from storage once the product is saved.
      const kept = new Set(colourways.flatMap((c) => c.photos));
      const gone = [...originalPhotos].filter((u) => !kept.has(u)).map(storagePath).filter((x): x is string => !!x);
      if (gone.length) await sb!.storage.from(BUCKET).remove(gone);
      d.close();
      await loadProducts();
      markDirty();
      toast('حُفظ المنتج. اضغطي «نشر الآن» ليظهر التعديل في الموقع.');
    } catch (err) {
      error.textContent = explain(err);
    } finally {
      btn.disabled = false;
    }
  };

  const remove = async () => {
    if (!confirm(`حذف «${p.name_ar}» نهائياً مع صوره؟`)) return;
    const { error: e } = await sb!.from('products').delete().eq('id', p.id);
    if (e) return toast(explain(e), 'error');
    const paths = [...originalPhotos].map(storagePath).filter((x): x is string => !!x);
    if (paths.length) await sb!.storage.from(BUCKET).remove(paths);
    d.close();
    await loadProducts();
    markDirty();
    toast('حُذف المنتج. اضغطي «نشر الآن» ليختفي من الموقع.');
  };

  const saveBtn = h('button', { type: 'button', class: 'btn' }, 'حفظ');
  saveBtn.addEventListener('click', () => void save(saveBtn));

  d.replaceChildren(
    h('div', { class: 'admin-dialog__head' },
      h('h2', { id: 'pd-title' }, isNew ? 'منتج جديد' : p.name_ar),
      h('button', { type: 'button', class: 'admin-close', 'aria-label': 'إغلاق', onclick: () => d.close() }, '✕'),
    ),
    h('div', { class: 'admin-form' },
      h('div', { class: 'admin-row' },
        field('pd-name-ar', 'اسم المنتج (عربي) *', nameAr),
        field('pd-name-en', 'اسم المنتج (إنجليزي)', nameEn),
      ),
      h('div', { class: 'admin-row' },
        field('pd-cat', 'الفئة *', category),
        field('pd-slug', 'رابط المنتج *', slug, 'يُكتب تلقائياً من الاسم الإنجليزي'),
      ),
      h('div', { class: 'admin-row' },
        field('pd-price', 'السعر (ر.ع.)', price, 'اتركيه فارغاً = «السعر عند الطلب» ولا يمكن إضافته للحقيبة'),
        field('pd-compare', 'السعر قبل الخصم (اختياري)', compareAt, 'فقط عند وجود تخفيض حقيقي'),
      ),
      h('div', { class: 'field' }, h('span', { class: 'label', id: 'pd-sizes-l' }, 'المقاسات *'), sizes),
      h('div', { class: 'admin-checks' }, active.el, featured.el, sample.el),
      h('h3', {}, 'الألوان والصور'),
      coloursBox,
      h('button', {
        type: 'button', class: 'btn btn--sm btn--soft',
        onclick: () => { p.colourways.push({ id: `c${p.colourways.length + 1}-${rand(3)}`, name_ar: '', name_en: '', swatch: '#d0d5e6', photos: [], art: 'kid-reading', sort: p.colourways.length, isNew: true }); renderColours(); },
      }, '+ لون آخر'),
      h('h3', {}, 'الوصف'),
      h('div', { class: 'admin-row' },
        field('pd-sum-ar', 'وصف قصير (عربي)', summaryAr),
        field('pd-sum-en', 'وصف قصير (إنجليزي)', summaryEn),
      ),
      field('pd-desc-ar', 'التفاصيل (عربي)', descAr),
      field('pd-desc-en', 'التفاصيل (إنجليزي)', descEn),
      field('pd-sort', 'الترتيب في المتجر', sort, 'الرقم الأصغر يظهر أولاً'),
    ),
    error,
    h('div', { class: 'admin-dialog__foot' },
      saveBtn,
      h('button', { type: 'button', class: 'btn btn--ghost', onclick: () => d.close() }, 'إلغاء'),
      isNew ? null : h('a', { class: 'btn btn--soft', href: `${cfg.base}products/${source!.slug}/`, target: '_blank', rel: 'noopener' }, 'عرض في الموقع'),
      isNew ? null : h('button', { type: 'button', class: 'btn btn--ghost admin-danger', onclick: () => void remove() }, 'حذف المنتج'),
    ),
  );
  showDialog(d);
}

export function initProducts() {
  $('[data-product-new]').addEventListener('click', () => openEditor());
  return loadProducts();
}
