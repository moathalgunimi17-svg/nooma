import type { ImageMetadata } from 'astro';
import { getImage } from 'astro:assets';
import type { ArtKey, ClientProduct, Colourway, Product } from '~/data/types';
import { categories, products, sizes } from '~/data/catalog';
import type { Locale } from '~/config/site';
import { normalize } from './search';

import kidBaking from '~/assets/brand/kid-baking.png';
import kidBrushing from '~/assets/brand/kid-brushing.png';
import kidCamera from '~/assets/brand/kid-camera.png';
import kidFacemask from '~/assets/brand/kid-facemask.png';
import kidReading from '~/assets/brand/kid-reading.png';
import kidStretch from '~/assets/brand/kid-stretch.png';
import sun from '~/assets/brand/sun.png';
import mirror from '~/assets/brand/mirror-siblings.png';

export const art: Record<ArtKey, ImageMetadata> = {
  'kid-baking': kidBaking,
  'kid-brushing': kidBrushing,
  'kid-camera': kidCamera,
  'kid-facemask': kidFacemask,
  'kid-reading': kidReading,
  'kid-stretch': kidStretch,
  'mirror-siblings': mirror,
};

/** Alt text describing what each illustration actually shows. */
export const artAlt: Record<ArtKey, Record<Locale, string>> = {
  'kid-baking': { ar: 'رسم لطفل ببيجامة صفراء بفيونكات يحرّك وعاء خبز', en: 'Drawing of a child in yellow bow-print pajamas stirring a mixing bowl' },
  'kid-brushing': { ar: 'رسم لطفل ببيجامة مربعات زرقاء يفرّش أسنانه', en: 'Drawing of a child in blue gingham pajamas brushing his teeth' },
  'kid-camera': { ar: 'رسم لطفل ببيجامة لافندر بالغيوم يلتقط صورة', en: 'Drawing of a child in lavender cloud pajamas taking a photo' },
  'kid-facemask': { ar: 'رسم لطفلة ببيجامة القلوب الوردية تضع ماسكاً', en: 'Drawing of a girl in pink heart pajamas applying a face mask' },
  'kid-reading': { ar: 'رسم لطفلة ببيجامة مخططة صفراء تقرأ قصة', en: 'Drawing of a girl in yellow striped pajamas reading a story' },
  'kid-stretch': { ar: 'رسم لطفلة ببيجامة مخططة وردية تتمطّى في الصباح', en: 'Drawing of a girl in pink striped pajamas stretching in the morning' },
  'mirror-siblings': { ar: 'رسم لأخوين ببيجامات وردية وزرقاء داخل إطار مرآة', en: 'Drawing of two siblings in pink and blue pajamas inside a mirror frame' },
};

// Real photos are files in src/assets/products/ named after the product code (PJ001.jpg,
// PJ001-2.jpg…), files listed on a colourway, or https URLs uploaded from the admin.
// Until a product has one, its code is shown where the photo goes.
const photoFiles = import.meta.glob<{ default: ImageMetadata }>('/src/assets/products/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP}', { eager: true });

/** A local image, or the URL of a photo uploaded from the admin. */
export type Pic = ImageMetadata | string;

/** "PJ001.jpg", "pj001-2.webp", "PJ001 back.png" → belong to PJ001 (but not PJ0012.jpg). */
const isNamedFor = (file: string, code: string) => {
  const base = file.split('/').pop()!.replace(/\.[^.]+$/, '').toUpperCase();
  return base === code.toUpperCase() || (base.startsWith(code.toUpperCase()) && /^[-_ .]/.test(base.slice(code.length)));
};

const codePhotos = (code: string): Pic[] =>
  Object.keys(photoFiles)
    .filter((k) => isNamedFor(k, code))
    .sort((a, b) => a.localeCompare(b, 'en', { numeric: true }))
    .map((k) => photoFiles[k]!.default);

/** A colourway's photos (the first colourway also gets the photos named after the product code). */
export const colourPhotos = (p: Product, c: Colourway): Pic[] => [
  ...(p.code && c === p.colourways[0] ? codePhotos(p.code) : []),
  ...c.photos
    .map((f) => (/^https:\/\//.test(f) ? f : photoFiles[`/src/assets/products/${f}`]?.default))
    .filter((x): x is Pic => !!x),
];

/** First photo of a colourway, or null while it has none. */
export const coverImage = (p: Product, c: Colourway): Pic | null => colourPhotos(p, c)[0] ?? null;

/** `src` props for <Image>/getImage — remote photos are measured at build time. */
export const picSrc = (p: Pic) => (typeof p === 'string' ? { src: p, inferSize: true as const } : { src: p });

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const getCategory = (id: string) => categories.find((c) => c.id === id);
export const sizeById = new Map(sizes.map((s) => [s.id, s]));

/** Categories that actually contain products — empty ones are never shown. */
export const liveCategories = () => categories.filter((c) => products.some((p) => p.categoryId === c.id));

export async function toClient(p: Product): Promise<ClientProduct> {
  const colourways = await Promise.all(
    p.colourways.map(async (c) => {
      // No photo yet → the brand sun stands in as the small cart picture.
      const img = await getImage({ ...picSrc(coverImage(p, c) ?? sun), width: 160, format: 'webp' });
      return { id: c.id, name: c.name, swatch: c.swatch, thumb: img.src };
    }),
  );
  return {
    id: p.id,
    slug: p.slug,
    ...(p.code ? { code: p.code } : {}),
    name: p.name,
    price: p.price,
    ...(p.sizePrices ? { sizePrices: p.sizePrices } : {}),
    categoryId: p.categoryId,
    sizes: p.sizeIds.map((id) => ({ id, label: sizeById.get(id)!.label })),
    colourways,
    stock: p.stock,
    sample: p.sample,
    search: normalize(
      [p.code ?? '', p.name.ar, p.name.en, p.summary.ar, p.summary.en, ...p.colourways.flatMap((c) => [c.name.ar, c.name.en]),
        getCategory(p.categoryId)?.name.ar ?? '', getCategory(p.categoryId)?.name.en ?? ''].join(' '),
    ),
  };
}

let clientCache: Promise<ClientProduct[]> | null = null;
export const clientCatalog = () => (clientCache ??= Promise.all(products.map(toClient)));
