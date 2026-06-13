import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const localesDir = path.join(root, 'src/content/locales');

const localeSources = [
  { locale: 'es', source: path.join(root, 'public/content.json') },
  { locale: 'en', source: path.join(root, 'public/content.en.json') },
];

fs.mkdirSync(localesDir, { recursive: true });

for (const { locale, source } of localeSources) {
  const content = JSON.parse(fs.readFileSync(source, 'utf8'));
  const target = path.join(localesDir, `${locale}.js`);
  fs.writeFileSync(target, `export default ${JSON.stringify(content, null, 2)};\n`);
  console.log(`✓ locales/${locale}.js sincronizado desde ${path.basename(source)}`);
}

const legacyTarget = path.join(root, 'src/content/content.js');
const esContent = JSON.parse(fs.readFileSync(localeSources[0].source, 'utf8'));
fs.writeFileSync(legacyTarget, `export default ${JSON.stringify(esContent, null, 2)};\n`);
console.log('✓ content.js sincronizado (español, compatibilidad)');
