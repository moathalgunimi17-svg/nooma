/** Fixed categories and sizes — shared by the storefront build and the admin. */
import type { CategoryDef, SizeDef } from './types';

export const categories: CategoryDef[] = [
  {
    id: 'girls',
    slug: 'girls',
    name: { ar: 'للبنات', en: 'For girls' },
    blurb: { ar: 'بيجامات البنات', en: "Girls' pajamas" },
    art: 'kid-facemask',
    tint: 'blush',
  },
  {
    id: 'boys',
    slug: 'boys',
    name: { ar: 'للأولاد', en: 'For boys' },
    blurb: { ar: 'بيجامات الأولاد', en: "Boys' pajamas" },
    art: 'kid-camera',
    tint: 'lavender',
  },
  {
    id: 'everyone',
    slug: 'everyone',
    name: { ar: 'للجميع', en: 'For everyone' },
    blurb: { ar: 'بيجامات تناسب الجميع', en: 'Pajamas for everyone' },
    art: 'kid-reading',
    tint: 'butter',
  },
  {
    id: 'mom-baby',
    slug: 'mom-baby',
    name: { ar: 'ماما وبيبي', en: 'Mom & baby' },
    blurb: { ar: 'مقاسات من 90 إلى 170', en: 'Sizes 90 to 170' },
    art: 'mirror-siblings',
    tint: 'peach',
  },
];

/** Nooma's sizes, exactly as in their product sheet. */
export const sizes: SizeDef[] = ['90', '100', '110', '120', '130', '140', '150', '160', '170'].map((n) => ({
  id: n,
  label: { ar: n, en: n },
}));
