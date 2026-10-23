/** Accent- and form-insensitive matching for Arabic and English queries. */
export function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f\u064b-\u065f\u0670\u0640]/g, '') // Latin accents, Arabic harakat, tatweel
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/ؤ/g, 'و')
    .replace(/ئ/g, 'ي')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Every query word must appear somewhere in the haystack. */
export function matches(haystack: string, query: string): boolean {
  const words = normalize(query).split(' ').filter(Boolean);
  if (!words.length) return false;
  return words.every((w) => haystack.includes(w));
}
