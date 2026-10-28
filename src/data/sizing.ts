/**
 * Garment measurements per size, in cm. NOT YET SUPPLIED BY NOOMA.
 * Every value is null, so the size guide shows "to be confirmed" in each cell.
 * Fill these in (e.g. height: '92–98') when the real size chart arrives —
 * nothing else needs to change.
 */
export interface SizeMeasurements {
  height: string | null;
  chest: string | null;
  waist: string | null;
}

export const sizing: Record<string, SizeMeasurements> = Object.fromEntries(
  ['90', '100', '110', '120', '130', '140', '150', '160', '170'].map((id) => [id, { height: null, chest: null, waist: null }]),
);

export const sizingConfirmed = Object.values(sizing).some((m) => m.height || m.chest || m.waist);
