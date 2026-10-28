/**
 * publish — lets a signed-in Nooma admin rebuild the website.
 *   POST → starts the "Publish site" GitHub workflow (.github/workflows/publish.yml)
 *   GET  → the latest run of that workflow { run: { status, conclusion, created_at, updated_at } | null }
 *
 * Secrets (Supabase → Edge Functions → Secrets), never sent to the browser:
 *   GH_TOKEN  fine-grained GitHub token for this repository only, permission "Actions: Read and write"
 *   GH_REPO   owner/name, e.g. moathalgunimi17-svg/nooma
 * SUPABASE_URL and SUPABASE_ANON_KEY are provided by Supabase automatically.
 */
const WORKFLOW = 'publish.yml';

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors, 'Content-Type': 'application/json' } });

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });
  if (req.method !== 'GET' && req.method !== 'POST') return json({ error: 'method' }, 405);

  // Only users listed in public.admins: ask the database with the caller's own session.
  const auth = req.headers.get('Authorization') ?? '';
  const check = await fetch(`${Deno.env.get('SUPABASE_URL')}/rest/v1/rpc/is_admin`, {
    method: 'POST',
    headers: { apikey: Deno.env.get('SUPABASE_ANON_KEY')!, Authorization: auth, 'Content-Type': 'application/json' },
    body: '{}',
  });
  if (!check.ok || (await check.json()) !== true) return json({ error: 'forbidden' }, 403);

  const token = Deno.env.get('GH_TOKEN');
  const repo = Deno.env.get('GH_REPO');
  if (!token || !repo) return json({ error: 'not_configured' }, 500);
  const gh = (path: string, init: RequestInit = {}) =>
    fetch(`https://api.github.com/repos/${repo}/actions/workflows/${WORKFLOW}${path}`, {
      ...init,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'User-Agent': 'nooma-admin',
        ...(init.body ? { 'Content-Type': 'application/json' } : {}),
      },
    });

  if (req.method === 'POST') {
    const res = await gh('/dispatches', { method: 'POST', body: JSON.stringify({ ref: 'main' }) });
    if (res.status !== 204) return json({ error: 'github', status: res.status, detail: await res.text() }, 502);
    return json({ started: true });
  }

  const res = await gh('/runs?per_page=1');
  if (!res.ok) return json({ error: 'github', status: res.status }, 502);
  const run = ((await res.json()) as { workflow_runs?: Record<string, string>[] }).workflow_runs?.[0];
  return json({
    run: run ? { status: run.status, conclusion: run.conclusion, created_at: run.created_at, updated_at: run.updated_at } : null,
  });
});
