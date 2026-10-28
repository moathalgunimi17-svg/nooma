/**
 * Shared admin helpers: config, the Supabase client, a tiny DOM builder
 * (text is always set as text, never parsed as HTML), toasts and formatting.
 */
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { formatPrice } from '~/lib/format';

export interface AdminConfig {
  backend: { supabaseUrl: string; supabaseAnonKey: string } | null;
  base: string;
  categories: { id: string; name: string }[];
  sizes: { id: string; label: string }[];
  artKeys: string[];
  sampleCatalog: boolean;
}

export const cfg = JSON.parse(document.getElementById('admin-config')!.textContent!) as AdminConfig;

export const sb: SupabaseClient | null = cfg.backend
  ? createClient(cfg.backend.supabaseUrl, cfg.backend.supabaseAnonKey, {
      auth: { persistSession: true, autoRefreshToken: true, storageKey: 'nooma.admin.auth' },
    })
  : null;

type Child = Node | string | number | null | undefined | false;
type Attrs = Record<string, string | number | boolean | null | undefined | ((e: Event) => void)>;

/** h('button', { class: 'btn', onclick: fn }, 'Save') — values are set as text or attributes only. */
export function h<K extends keyof HTMLElementTagNameMap>(tag: K, attrs: Attrs = {}, ...children: Child[]): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v === null || v === undefined || v === false) continue;
    if (typeof v === 'function') el.addEventListener(k.replace(/^on/, ''), v as EventListener);
    else if (k === 'class') el.className = String(v);
    else if (k in el && typeof (el as unknown as Record<string, unknown>)[k] === 'boolean') (el as unknown as Record<string, unknown>)[k] = !!v;
    else if (k === 'value' && 'value' in el) (el as HTMLInputElement).value = String(v);
    else el.setAttribute(k, v === true ? '' : String(v));
  }
  for (const c of children) if (c !== null && c !== undefined && c !== false) el.append(c instanceof Node ? c : String(c));
  return el;
}

export const $ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => root.querySelector<T>(sel)!;
export const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => [...root.querySelectorAll<T>(sel)];

let toastTimer = 0;
export function toast(message: string, kind: 'ok' | 'error' = 'ok') {
  const t = $('[data-toast]');
  t.textContent = message;
  t.dataset.kind = kind;
  t.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => (t.hidden = true), kind === 'error' ? 7000 : 4000);
}

export const money = (n: number | string | null) => (n === null || n === '' ? '—' : formatPrice(Number(n), 'ar'));

const dateFmt = new Intl.DateTimeFormat('ar-OM-u-nu-latn', { dateStyle: 'medium', timeStyle: 'short' });
export const when = (iso: string) => dateFmt.format(new Date(iso));

export const sizeLabel = (id: string) => cfg.sizes.find((s) => s.id === id)?.label ?? id;
export const categoryName = (id: string) => cfg.categories.find((c) => c.id === id)?.name ?? id;

/** Supabase / Postgres error → a sentence the owner can act on. */
export function explain(err: unknown): string {
  const e = err as { message?: string; code?: string } | null;
  const msg = e?.message ?? String(err);
  if (e?.code === '23505' && /slug/.test(msg)) return 'هذا الرابط مستخدم لمنتج آخر. غيّري «رابط المنتج».';
  if (e?.code === '23505') return 'يوجد عنصر بنفس المعرّف. غيّري المعرّف وحاولي مرة أخرى.';
  if (e?.code === '23514') return 'قيمة غير مقبولة في أحد الحقول. راجعي الحقول وحاولي مرة أخرى.';
  if (e?.code === '42501' || /row-level security|permission/i.test(msg)) return 'ليست لديك صلاحية لهذا الإجراء. سجّلي الدخول بحساب الإدارة.';
  if (/Failed to fetch|NetworkError|network/i.test(msg)) return 'تعذّر الاتصال. تأكدي من الإنترنت وحاولي مرة أخرى.';
  return `حدث خطأ: ${msg}`;
}

/** Opens a dialog as a modal and puts focus inside it. */
export function showDialog(d: HTMLDialogElement) {
  if (!d.open) d.showModal();
  d.querySelector<HTMLElement>('[autofocus], input, select, textarea, button')?.focus();
}
