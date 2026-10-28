/** Fixed categories and sizes — shared by the storefront build and the admin. */
import type { CategoryDef, SizeDef } from './types';

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
