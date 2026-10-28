/** Admin entry: decides which screen to show, handles sign-in and tabs. */
import { $, $$, cfg, explain, sb } from './core';
import { initOrders } from './orders';
import { initProducts } from './products';
import { initPublish } from './publish';

type View = 'boot' | 'config' | 'login' | 'app';

function show(view: View) {
  $$('[data-view]').forEach((el) => (el.hidden = el.dataset.view !== view));
}

let started = false;

async function enter() {
  // Signed in — but only listed admins may use the panel.
  const { data: isAdmin, error } = await sb!.rpc('is_admin');
  if (error || !isAdmin) {
    await sb!.auth.signOut();
    show('login');
    $('[data-login-error]').textContent = error
      ? explain(error)
      : 'دخلتِ بنجاح، لكن هذا الحساب غير مضاف كأدمن. شغّلي supabase/make-admin.sql في SQL Editor بنفس الإيميل.';
    return;
  }
  show('app');
  if (started) return;
  started = true;
  await Promise.all(cfg.catalogSource === 'admin' ? [initOrders(), initProducts(), initPublish()] : [initOrders()]);
}

function initTabs() {
  $$('[data-tab]').forEach((tab) =>
    tab.addEventListener('click', () => {
      $$('[data-tab]').forEach((t) => t.setAttribute('aria-pressed', String(t === tab)));
      $$('[data-panel]').forEach((p) => (p.hidden = p.dataset.panel !== tab.dataset.tab));
    }),
  );
}

function initLogin() {
  const form = $<HTMLFormElement>('[data-login]');
  const err = $('[data-login-error]');
  const btn = $<HTMLButtonElement>('button[type=submit]', form);
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const email = String(fd.get('email') ?? '').trim();
    const password = String(fd.get('password') ?? '');
    if (!email || !password) {
      err.textContent = 'اكتبي البريد وكلمة المرور.';
      return;
    }
    btn.disabled = true;
    err.textContent = '';
    const { error } = await sb!.auth.signInWithPassword({ email, password });
    btn.disabled = false;
    if (error) {
      err.textContent = /not confirmed/i.test(error.message)
        ? 'الحساب غير مؤكد. في Supabase: Authentication ← Users ← اختاري المستخدم ← Confirm email (أو احذفيه وأضيفيه مع Auto Confirm User).'
        : /invalid/i.test(error.message)
          ? 'البريد أو كلمة المرور غير صحيحة. تأكدي منها، أو غيّري كلمة المرور من Supabase: Authentication ← Users.'
          : explain(error);
      return;
    }
    (form.elements.namedItem('password') as HTMLInputElement).value = '';
    await enter();
  });
  $('[data-signout]').addEventListener('click', async () => {
    await sb!.auth.signOut();
    location.reload();
  });
}

async function boot() {
  if (!sb) return show('config');
  initTabs();
  initLogin();
  const { data } = await sb.auth.getSession();
  if (data.session) await enter();
  else show('login');
}

void boot();
