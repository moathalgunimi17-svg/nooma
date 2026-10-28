/**
 * "Publish now": asks the `publish` edge function (supabase/functions/publish)
 * to rebuild the static site from the database, then follows the run.
 * The GitHub token lives only in that function's secrets.
 */
import { $, sb, toast } from './core';

const DIRTY_KEY = 'nooma.admin.unpublished';

interface Run {
  status: 'queued' | 'in_progress' | 'completed' | string;
  conclusion: 'success' | 'failure' | 'cancelled' | null | string;
  created_at: string;
  updated_at: string;
}

let polling = 0;

const statusEl = () => $('[data-publish-status]');

export function markDirty() {
  try { localStorage.setItem(DIRTY_KEY, '1'); } catch { /* ignore */ }
  showDirty();
}

function showDirty() {
  let dirty = false;
  try { dirty = localStorage.getItem(DIRTY_KEY) === '1'; } catch { /* ignore */ }
  $('[data-publish-box]').classList.toggle('is-dirty', dirty);
  if (dirty && !polling) statusEl().textContent = 'لديك تعديلات لم تُنشر بعد في الموقع.';
}

const ago = (iso: string) => {
  const mins = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
  return mins < 1 ? 'قبل لحظات' : mins < 60 ? `قبل ${mins} دقيقة` : new Intl.DateTimeFormat('ar-OM-u-nu-latn', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(iso));
};

async function call(method: 'GET' | 'POST'): Promise<{ run?: Run | null; error?: string }> {
  const { data, error } = await sb!.functions.invoke('publish', { method });
  if (error) {
    const status = (error as { context?: Response }).context?.status;
    if (status === 404) return { error: 'النشر من اللوحة غير مفعّل بعد (لم تُرفع دالة publish). راجعي خطوات الإعداد.' };
    if (status === 403) return { error: 'هذا الحساب ليس له صلاحية النشر.' };
    return { error: 'تعذّر الاتصال بخدمة النشر. حاولي بعد قليل.' };
  }
  return data as { run?: Run | null };
}

function show(run: Run | null | undefined) {
  const btn = $<HTMLButtonElement>('[data-publish]');
  const running = !!run && run.status !== 'completed';
  btn.disabled = running;
  if (!run) return showDirty();
  if (running) {
    statusEl().textContent = 'جارٍ النشر… يظهر التعديل في الموقع خلال دقيقتين تقريباً.';
  } else if (run.conclusion === 'success') {
    statusEl().textContent = `آخر نشر ناجح: ${ago(run.updated_at)}.`;
  } else {
    statusEl().textContent = `فشل آخر نشر (${ago(run.updated_at)}). حاولي مرة أخرى، وإن تكرر راجعي GitHub Actions.`;
  }
}

async function poll() {
  const { run } = await call('GET');
  show(run);
  if (run && run.status !== 'completed') {
    polling = window.setTimeout(poll, 15000);
  } else {
    polling = 0;
    if (run?.conclusion === 'success') {
      try { localStorage.removeItem(DIRTY_KEY); } catch { /* ignore */ }
      $('[data-publish-box]').classList.remove('is-dirty');
    }
  }
}

export async function initPublish() {
  const btn = $<HTMLButtonElement>('[data-publish]');
  btn.addEventListener('click', async () => {
    btn.disabled = true;
    const res = await call('POST');
    if (res.error) {
      btn.disabled = false;
      statusEl().textContent = res.error;
      return toast(res.error, 'error');
    }
    toast('بدأ النشر. يظهر التعديل في الموقع خلال دقيقتين تقريباً.');
    statusEl().textContent = 'جارٍ النشر…';
    clearTimeout(polling);
    // GitHub needs a moment to list the new run.
    polling = window.setTimeout(poll, 8000);
  });
  showDirty();
  const { run, error } = await call('GET');
  if (error) statusEl().textContent = error;
  else {
    show(run);
    if (run && run.status !== 'completed') polling = window.setTimeout(poll, 15000);
  }
}
