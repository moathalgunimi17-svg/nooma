/**
 * ─────────────────────────────────────────────────────────────────────────
 *  SAMPLE CATALOGUE — development data only.
 *
 *  None of these products, prices, sizes or descriptions came from Nooma.
 *  They exist so the storefront, filters, cart and WhatsApp order can be
 *  built and tested. Each record is flagged `sample: true`, and while
 *  `site.sampleCatalog` is true every product and price shows a visible
 *  "sample" label.
 *
 *  To launch: replace the arrays below with Nooma's real products, add
 *  photos under src/assets/products/, then set site.sampleCatalog = false.
 *  The pattern names follow the pajamas drawn in Nooma's own illustrations.
 * ─────────────────────────────────────────────────────────────────────────
 */
import type { CategoryDef, Product, SizeDef } from './types';

export const categories: CategoryDef[] = [
  {
    id: 'girls',
    slug: 'girls',
    name: { ar: 'للبنات', en: 'For girls' },
    blurb: { ar: 'قلوب وألوان وردية هادئة', en: 'Hearts and quiet pinks' },
    art: 'kid-facemask',
    tint: 'blush',
  },
  {
    id: 'boys',
    slug: 'boys',
    name: { ar: 'للأولاد', en: 'For boys' },
    blurb: { ar: 'غيوم ومربعات بدرجات الأزرق', en: 'Clouds and soft blue checks' },
    art: 'kid-camera',
    tint: 'lavender',
  },
  {
    id: 'everyone',
    slug: 'everyone',
    name: { ar: 'للجميع', en: 'For everyone' },
    blurb: { ar: 'خطوط وفيونكات تناسب الكل', en: 'Stripes and bows for anyone' },
    art: 'kid-reading',
    tint: 'butter',
  },
];

export const sizes: SizeDef[] = [
  { id: '2y', label: { ar: 'سنتان', en: '2 yrs' } },
  { id: '3y', label: { ar: '3 سنوات', en: '3 yrs' } },
  { id: '4y', label: { ar: '4 سنوات', en: '4 yrs' } },
  { id: '5y', label: { ar: '5 سنوات', en: '5 yrs' } },
  { id: '6y', label: { ar: '6 سنوات', en: '6 yrs' } },
  { id: '8y', label: { ar: '8 سنوات', en: '8 yrs' } },
];

export const products: Product[] = [
  {
    id: 'p-cloud-dreams',
    slug: 'cloud-dreams',
    name: { ar: 'بيجامة غيوم الأحلام', en: 'Cloud Dreams pajamas' },
    summary: { ar: 'غيوم بيضاء على لافندر هادئ', en: 'White clouds on calm lavender' },
    description: {
      ar: 'طقم بقميص بأزرار وبنطال طويل، تزيّنه غيوم صغيرة على لون لافندر هادئ. بيانات هذا المنتج نموذج تجريبي إلى أن تضيف نُومة تفاصيله الحقيقية.',
      en: 'A button-up top and long trousers scattered with small clouds on calm lavender. This listing is sample data until Nooma adds the real details.',
    },
    categoryId: 'boys',
    price: 11.5,
    colourways: [
      { id: 'lavender', name: { ar: 'لافندر', en: 'Lavender' }, swatch: '#C5CCF0', photos: [], art: 'kid-camera' },
    ],
    sizeIds: ['2y', '3y', '4y', '5y', '6y', '8y'],
    featured: true,
    sample: true,
  },
  {
    id: 'p-little-hearts',
    slug: 'little-hearts',
    name: { ar: 'بيجامة القلوب الصغيرة', en: 'Little Hearts pajamas' },
    summary: { ar: 'قلوب وردية على أرضية فاتحة', en: 'Pink hearts on a pale ground' },
    description: {
      ar: 'قلوب وردية صغيرة على أرضية فاتحة، مع رباط عند الخصر. بيانات هذا المنتج نموذج تجريبي إلى أن تضيف نُومة تفاصيله الحقيقية.',
      en: 'Small pink hearts on a pale ground, with a tie at the waist. This listing is sample data until Nooma adds the real details.',
    },
    categoryId: 'girls',
    price: 11.5,
    colourways: [
      { id: 'blush', name: { ar: 'وردي', en: 'Blush' }, swatch: '#F7B9C0', photos: [], art: 'kid-facemask' },
    ],
    sizeIds: ['2y', '3y', '4y', '5y', '6y'],
    featured: true,
    sample: true,
  },
  {
    id: 'p-classic-stripes',
    slug: 'classic-stripes',
    name: { ar: 'بيجامة الخطوط الكلاسيكية', en: 'Classic Stripes pajamas' },
    summary: { ar: 'خطوط ناعمة بلونين', en: 'Soft stripes in two colours' },
    description: {
      ar: 'خطوط طولية ناعمة بقصّة كلاسيكية وجيب صغير على الصدر، بلونين للاختيار. بيانات هذا المنتج نموذج تجريبي إلى أن تضيف نُومة تفاصيله الحقيقية.',
      en: 'Soft vertical stripes in a classic cut with a small chest pocket, in two colours. This listing is sample data until Nooma adds the real details.',
    },
    categoryId: 'everyone',
    price: 12.5,
    colourways: [
      { id: 'pink', name: { ar: 'وردي', en: 'Pink' }, swatch: '#F4C3C8', photos: [], art: 'kid-stretch' },
      { id: 'butter', name: { ar: 'أصفر زبدي', en: 'Butter' }, swatch: '#F7DC92', photos: [], art: 'kid-reading' },
    ],
    sizeIds: ['2y', '3y', '4y', '5y', '6y', '8y'],
    featured: true,
    sample: true,
  },
  {
    id: 'p-blue-gingham',
    slug: 'blue-gingham',
    name: { ar: 'بيجامة المربعات الزرقاء', en: 'Blue Gingham pajamas' },
    summary: { ar: 'مربعات زرقاء بلمسة خضراء', en: 'Blue checks with a hint of green' },
    description: {
      ar: 'مربعات زرقاء فاتحة بقصّة مستقيمة وأزرار أمامية. بيانات هذا المنتج نموذج تجريبي إلى أن تضيف نُومة تفاصيله الحقيقية.',
      en: 'Pale blue checks in a straight cut with front buttons. This listing is sample data until Nooma adds the real details.',
    },
    categoryId: 'boys',
    price: 10.5,
    colourways: [
      { id: 'blue', name: { ar: 'أزرق', en: 'Blue' }, swatch: '#BFD3F2', photos: [], art: 'kid-brushing' },
    ],
    sizeIds: ['3y', '4y', '5y', '6y', '8y'],
    featured: false,
    sample: true,
  },
  {
    id: 'p-butter-bows',
    slug: 'butter-bows',
    name: { ar: 'بيجامة الفيونكات', en: 'Butter Bows pajamas' },
    summary: { ar: 'فيونكات زرقاء على أصفر زبدي', en: 'Blue bows on butter yellow' },
    description: {
      ar: 'فيونكات صغيرة بلون أزرق هادئ على أرضية صفراء زبدية. بيانات هذا المنتج نموذج تجريبي إلى أن تضيف نُومة تفاصيله الحقيقية.',
      en: 'Little bows in calm blue on a butter-yellow ground. This listing is sample data until Nooma adds the real details.',
    },
    categoryId: 'everyone',
    price: 10.5,
    colourways: [
      { id: 'butter', name: { ar: 'أصفر زبدي', en: 'Butter' }, swatch: '#F8E1A0', photos: [], art: 'kid-baking' },
    ],
    sizeIds: ['2y', '3y', '4y', '5y'],
    featured: true,
    sample: true,
  },
];
