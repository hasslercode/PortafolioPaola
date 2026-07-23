/**
 * HU-OBS-003 — Fail if ES money service pages are thin.
 * Run: npm run content:audit
 */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.join(process.cwd(), 'content/services/es');
const MIN: Record<string, number> = {
  'sesion-estrategica.mdx': 1200,
  'estrategia-contenido.mdx': 1500,
  'produccion-contenido.mdx': 1800,
  'gestion-mensual.mdx': 1500,
  'ugc-videos-marcas.mdx': 1500,
};

function bodyOf(raw: string) {
  const parts = raw.split(/^---$/m);
  // frontmatter between first two --- ; body after second
  if (parts.length >= 3) return parts.slice(2).join('---').trim();
  return raw.trim();
}

let failed = false;
for (const [file, min] of Object.entries(MIN)) {
  const raw = fs.readFileSync(path.join(ROOT, file), 'utf8');
  const content = bodyOf(raw);
  const words = content.split(/\s+/).filter(Boolean).length;
  const ok = words >= min;
  console.log(`${ok ? 'OK' : 'FAIL'} ${file}: ${words} words (min ${min})`);
  if (!ok) failed = true;
}

assert.equal(failed, false, 'Thin ES service content detected');
console.log('HU-OBS-003 content:audit OK');
