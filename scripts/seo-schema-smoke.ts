/**
 * HU-OBS-004 — Schema smoke without path aliases (grep source of truth).
 * Run: npm run test:seo
 */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const jsonld = fs.readFileSync(
  path.join(process.cwd(), 'src/lib/seo/jsonld.ts'),
  'utf8',
);

assert.match(jsonld, /Content Strategy/);
assert.match(jsonld, /Video Editing for Social Media/);
assert.match(jsonld, /UGC-style Brand Videos/);
assert.doesNotMatch(jsonld, /Email Marketing/);
assert.doesNotMatch(jsonld, /Event Coverage/);
assert.match(jsonld, /og-paola\.jpg/);
assert.match(jsonld, /reviewRating/);
assert.match(jsonld, /bestRating:\s*5/);

const metadata = fs.readFileSync(
  path.join(process.cwd(), 'src/lib/seo/metadata.ts'),
  'utf8',
);
assert.match(metadata, /og-paola\.jpg/);

console.log('HU-OBS-004 schema smoke OK');
