/**
 * Nooma's size chart (supplied as an image, 2026-10-28).
 * Garment measurements are in cm, measured flat by hand: allow 1–3 cm.
 * "fits" is the chart's own guide per size (age, height, weight).
 */
import type { L10n } from './types';

export interface SizeMeasurements {
  /** weightKg is a range, or a maximum when weightUpTo is set ("up to 62.5 kg"). */
  fits: { age: L10n; heightCm: string | null; weightKg: string; weightUpTo?: boolean };
  halfChest: number;
  shoulder: number;
  sleeve: number;
  topLength: number;
  waist: number;
  pantsLength: number;
}

// The range sits in a left-to-right isolate so Arabic text doesn't flip it to "2–1".
const years = (range: string, ar: 'سنة' | 'سنوات'): L10n => ({ ar: `⁦${range}⁩ ${ar}`, en: `${range} years` });
const adult: L10n = { ar: 'بالغ', en: 'Adult' };

export const fabric: L10n = { ar: 'قطن 100%', en: '100% cotton' };

export const sizing: Record<string, SizeMeasurements> = {
  '90': { fits: { age: years('1–2', 'سنة'), heightCm: '83–90', weightKg: '9–12' }, halfChest: 32, shoulder: 29, sleeve: 29, topLength: 37, waist: 41, pantsLength: 49 },
  '100': { fits: { age: years('2–3', 'سنوات'), heightCm: '90–100', weightKg: '12–15' }, halfChest: 33, shoulder: 30, sleeve: 31.9, topLength: 39.8, waist: 43, pantsLength: 54 },
  '110': { fits: { age: years('3–5', 'سنوات'), heightCm: '100–110', weightKg: '15–18.5' }, halfChest: 34.7, shoulder: 31.5, sleeve: 34.8, topLength: 42.6, waist: 45, pantsLength: 59 },
  '120': { fits: { age: years('5–6', 'سنوات'), heightCm: '110–120', weightKg: '18.5–22.5' }, halfChest: 36.4, shoulder: 33, sleeve: 37.7, topLength: 45.4, waist: 47, pantsLength: 65 },
  '130': { fits: { age: years('6–8', 'سنوات'), heightCm: '120–130', weightKg: '22.5–28' }, halfChest: 38.1, shoulder: 34.5, sleeve: 40.6, topLength: 48.2, waist: 49, pantsLength: 71 },
  '140': { fits: { age: years('8–11', 'سنة'), heightCm: '130–140', weightKg: '28–34' }, halfChest: 39.8, shoulder: 36, sleeve: 43.5, topLength: 51, waist: 51, pantsLength: 78 },
  '150': { fits: { age: years('11–13', 'سنة'), heightCm: '140–150', weightKg: '34–40' }, halfChest: 41.5, shoulder: 37.5, sleeve: 46.4, topLength: 53.8, waist: 53, pantsLength: 85 },
  '160': { fits: { age: adult, heightCm: null, weightKg: '62.5', weightUpTo: true }, halfChest: 50, shoulder: 46, sleeve: 47.5, topLength: 63, waist: 62, pantsLength: 97 },
  '170': { fits: { age: adult, heightCm: null, weightKg: '70', weightUpTo: true }, halfChest: 52, shoulder: 47.8, sleeve: 49.5, topLength: 65.5, waist: 64, pantsLength: 102 },
};
