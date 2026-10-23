// Verifies every internal href/src in dist/ resolves to a built file, and lists external links.
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';

const root = 'dist';
const base = (process.env.BASE_PATH ?? '/').replace(/\/?$/, '/');
const files = [];
const walk = (d) => readdirSync(d).forEach((f) => { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') && files.push(p); });
walk(root);
const missing = new Set();
const external = new Map();
for (const f of files) {
  const html = readFileSync(f, 'utf8');
  for (const m of html.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
    let u = m[1].replaceAll('&amp;', '&');
    if (/^(mailto:|tel:|#|data:)/.test(u)) { if (!u.startsWith('#') && !u.startsWith('data:')) external.set(u.split('?')[0], (external.get(u.split('?')[0]) ?? 0) + 1); continue; }
    if (/^https?:/.test(u)) { external.set(u.split('?')[0], (external.get(u.split('?')[0]) ?? 0) + 1); continue; }
    u = u.split('#')[0].split('?')[0];
    if (!u) continue;
    if (base !== '/' && u.startsWith(base)) u = '/' + u.slice(base.length);
    const target = u.startsWith('/') ? join(root, decodeURIComponent(u)) : join(dirname(f), decodeURIComponent(u));
    const ok = existsSync(target) && (statSync(target).isFile() || existsSync(join(target, 'index.html')));
    if (!ok) missing.add(`${u}  (in ${f})`);
  }
}
console.log(`checked ${files.length} pages`);
console.log('missing:', missing.size ? [...missing].join('\n  ') : 'none');
console.log('external/contact links:');
for (const [u, n] of [...external].sort()) console.log(`  ${n}× ${u}`);
process.exit(missing.size ? 1 : 0);
