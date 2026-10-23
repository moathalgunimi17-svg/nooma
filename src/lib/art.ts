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

// Real photos live in src/assets/products/<file>; until a colourway has one, its brand illustration stands in (labelled).
const photoFiles = import.meta.glob<{ default: ImageMetadata }>('/src/assets/products/*.{jpg,jpeg,png,webp,avif}', { eager: true });

/** A colourway's real photos, or [] when none have been added yet. */
export const colourPhotos = (c: Colourway): ImageMetadata[] =>
  c.photos.map((f) => photoFiles[`/src/assets/products/${f}`]?.default).filter((x): x is ImageMetadata => !!x);

/** First image to show for a colourway: its photo if there is one, otherwise the illustration. */
export const coverImage = (c: Colourway): ImageMetadata => colourPhotos(c)[0] ?? art[c.art];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const getCategory = (id: string) => categories.find((c) => c.id === id);
export const sizeById = new Map(sizes.map((s) => [s.id, s]));

/** Categories that actually contain products — empty ones are never shown. */
export const liveCategories = () => categories.filter((c) => products.some((p) => p.categoryId === c.id));

export async function toClient(p: Product): Promise<ClientProduct> {
  const colourways = await Promise.all(
    p.colourways.map(async (c) => {
      const img = await getImage({ src: coverImage(c), width: 160, format: 'webp' });
      return { id: c.id, name: c.name, swatch: c.swatch, thumb: img.src };
    }),
  );
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    price: p.price,
    categoryId: p.categoryId,
    sizes: p.sizeIds.map((id) => ({ id, label: sizeById.get(id)!.label })),
    colourways,
    stock: p.stock,
    sample: p.sample,
    search: normalize(
      [p.name.ar, p.name.en, p.summary.ar, p.summary.en, ...p.colourways.flatMap((c) => [c.name.ar, c.name.en]),
        getCategory(p.categoryId)?.name.ar ?? '', getCategory(p.categoryId)?.name.en ?? ''].join(' '),
    ),
  };
}

let clientCache: Promise<ClientProduct[]> | null = null;
export const clientCatalog = () => (clientCache ??= Promise.all(products.map(toClient)));
