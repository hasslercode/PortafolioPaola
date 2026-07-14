import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const assetsDir = path.join(root, 'src/assets');

const TARGETS = [
  { file: 'campaigns/cine-colombia.png', maxWidth: 1024, quality: 82 },
  { file: 'campaigns/hm-store.png', maxWidth: 1024, quality: 82 },
  { file: 'campaigns/maxgordos-burger.png', maxWidth: 1024, quality: 82 },
  { file: 'campaigns/totto-backpack.png', maxWidth: 1000, quality: 82 },
  { file: 'campaigns/coca-cola.png', maxWidth: 940, quality: 82 },
  { file: 'campaigns/reel-cultura.PNG', maxWidth: 800, quality: 85, outputExt: '.jpg' },
  { file: 'campaigns/reel-conversacion.jpg', maxWidth: 800, quality: 85 },
  { file: 'campaigns/reel-curiosidad.jpg', maxWidth: 800, quality: 85 },
  { file: 'campaigns/reel-storytelling.jpg', maxWidth: 800, quality: 85 },
  { file: 'fotopaola.PNG', maxWidth: 900, quality: 85, outputExt: '.jpg' },
];

const RESPONSIVE_TARGETS = [
  { input: 'fotopaola.jpg', outputs: [{ suffix: '-480', width: 480, format: 'webp' }, { suffix: '-720', width: 720, format: 'webp' }] },
  { input: 'icon-paola.png', outputs: [{ suffix: '-128', width: 128, height: 128, format: 'webp' }] },
  { input: 'campaigns/coca-cola.webp', outputs: [{ suffix: '-thumb', width: 300, format: 'webp' }] },
  { input: 'campaigns/totto-backpack.webp', outputs: [{ suffix: '-thumb', width: 300, format: 'webp' }] },
  { input: 'campaigns/cine-colombia.webp', outputs: [{ suffix: '-thumb', width: 300, format: 'webp' }] },
  { input: 'campaigns/hm-store.webp', outputs: [{ suffix: '-thumb', width: 300, format: 'webp' }] },
  { input: 'campaigns/starbucks-cup.png', outputs: [{ suffix: '-thumb', width: 300, format: 'webp' }] },
  { input: 'campaigns/maxgordos-burger.webp', outputs: [{ suffix: '-thumb', width: 300, format: 'webp' }] },
  { input: 'campaigns/reel-vasos.jpg', outputs: [{ suffix: '-thumb', width: 400, format: 'jpg' }] },
  { input: 'campaigns/reel-cultura.jpg', outputs: [{ suffix: '-thumb', width: 400, format: 'jpg' }] },
  { input: 'campaigns/reel-conversacion.jpg', outputs: [{ suffix: '-thumb', width: 400, format: 'jpg' }] },
  { input: 'campaigns/reel-curiosidad.jpg', outputs: [{ suffix: '-thumb', width: 400, format: 'jpg' }] },
  { input: 'campaigns/reel-storytelling.jpg', outputs: [{ suffix: '-thumb', width: 400, format: 'jpg' }] },
];

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function baseName(filePath) {
  return path.basename(filePath, path.extname(filePath));
}

async function optimizeImage(target) {
  const inputPath = path.join(assetsDir, target.file);
  if (!fs.existsSync(inputPath)) {
    console.warn(`⊘ No encontrado: ${target.file}`);
    return null;
  }

  const before = fs.statSync(inputPath).size;
  const metadata = await sharp(inputPath).metadata();
  const hasAlpha = Boolean(metadata.hasAlpha);
  const isJpegOutput = (target.outputExt || path.extname(target.file)) === '.jpg';

  let outputExt = target.outputExt;
  if (!outputExt) {
    outputExt = hasAlpha && !isJpegOutput ? '.webp' : path.extname(target.file);
  }

  const outputName = `${baseName(target.file)}${outputExt}`;
  const outputPath = path.join(path.dirname(inputPath), outputName);
  const tempPath = `${outputPath}.tmp`;

  let pipeline = sharp(inputPath).rotate();

  if (metadata.width && metadata.width > target.maxWidth) {
    pipeline = pipeline.resize({ width: target.maxWidth, withoutEnlargement: true });
  }

  if (outputExt === '.jpg' || outputExt === '.jpeg') {
    pipeline = pipeline.jpeg({ quality: target.quality, mozjpeg: true });
  } else if (outputExt === '.webp') {
    pipeline = pipeline.webp({ quality: target.quality, alphaQuality: 90, effort: 6 });
  } else if (outputExt === '.png') {
    pipeline = pipeline.png({ compressionLevel: 9, effort: 10 });
  }

  await pipeline.toFile(tempPath);

  const after = fs.statSync(tempPath).size;

  if (after >= before && inputPath !== outputPath) {
    fs.unlinkSync(tempPath);
    console.warn(`⊘ ${target.file}: optimización no redujo tamaño, se conserva original`);
    return null;
  }

  fs.renameSync(tempPath, outputPath);
  if (inputPath !== outputPath && fs.existsSync(inputPath)) {
    fs.unlinkSync(inputPath);
  }

  return { file: target.file, output: path.relative(assetsDir, outputPath), before, after };
}

async function createResponsiveVariants(target) {
  const inputPath = path.join(assetsDir, target.input);
  if (!fs.existsSync(inputPath)) {
    console.warn(`⊘ Responsive: no encontrado ${target.input}`);
    return [];
  }

  const results = [];
  for (const output of target.outputs) {
    const ext = output.format === 'webp'
      ? '.webp'
      : output.format === 'jpg'
        ? '.jpg'
        : path.extname(target.input) === '.png'
          ? '.webp'
          : path.extname(target.input);
    const outputName = `${baseName(target.input)}${output.suffix}${ext}`;
    const outputPath = path.join(path.dirname(inputPath), outputName);

    let pipeline = sharp(inputPath).rotate();
    const resize = { width: output.width, withoutEnlargement: true };
    if (output.height) {
      resize.height = output.height;
      resize.fit = 'cover';
    }
    pipeline = pipeline.resize(resize);

    if (ext === '.webp') {
      pipeline = pipeline.webp({ quality: 82, alphaQuality: 90, effort: 6 });
    } else if (ext === '.jpg' || ext === '.jpeg') {
      pipeline = pipeline.jpeg({ quality: 82, mozjpeg: true });
    } else {
      pipeline = pipeline.png({ compressionLevel: 9, effort: 10 });
    }

    await pipeline.toFile(outputPath);
    results.push({
      input: target.input,
      output: path.relative(assetsDir, outputPath),
      size: fs.statSync(outputPath).size,
    });
  }

  return results;
}

const results = [];
for (const target of TARGETS) {
  const result = await optimizeImage(target);
  if (result) {
    results.push(result);
  }
}

const responsiveResults = [];
for (const target of RESPONSIVE_TARGETS) {
  const variants = await createResponsiveVariants(target);
  responsiveResults.push(...variants);
}

console.log('\nOptimización de imágenes:');
for (const { file, output, before, after } of results) {
  const saved = before - after;
  const pct = ((saved / before) * 100).toFixed(1);
  const renamed = file !== output ? ` → ${output}` : '';
  console.log(`  ${file}${renamed}: ${formatSize(before)} → ${formatSize(after)} (−${pct}%)`);
}

console.log('\nVariantes responsive:');
for (const { input, output, size } of responsiveResults) {
  console.log(`  ${input} → ${output} (${formatSize(size)})`);
}

const publicAssetsDir = path.join(root, 'public/assets');
fs.mkdirSync(publicAssetsDir, { recursive: true });

const heroWebp480 = path.join(assetsDir, 'fotopaola-480.webp');
const heroJpg = path.join(assetsDir, 'fotopaola.jpg');
const ogJpgTarget = path.join(publicAssetsDir, 'fotopaola.jpg');
const publicHeroWebp = path.join(publicAssetsDir, 'fotopaola-480.webp');

if (fs.existsSync(heroWebp480)) {
  fs.copyFileSync(heroWebp480, publicHeroWebp);
  const heroWebp720 = path.join(assetsDir, 'fotopaola-720.webp');
  const publicHero720 = path.join(publicAssetsDir, 'fotopaola-720.webp');
  if (fs.existsSync(heroWebp720)) {
    fs.copyFileSync(heroWebp720, publicHero720);
  }
  const publicHeroJpg = path.join(publicAssetsDir, 'fotopaola.jpg');
  if (fs.existsSync(heroJpg)) {
    fs.copyFileSync(heroJpg, publicHeroJpg);
  }
  console.log(`\n✓ LCP preload: public/assets/fotopaola-480.webp (${formatSize(fs.statSync(publicHeroWebp).size)})`);
}

if (fs.existsSync(heroJpg)) {
  await sharp(heroJpg)
    .resize({ width: 800, withoutEnlargement: true })
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile(ogJpgTarget);
  console.log(`✓ OG image en public/assets/fotopaola.jpg (${formatSize(fs.statSync(ogJpgTarget).size)})`);
}

const icon128 = path.join(assetsDir, 'icon-paola-128.webp');
const publicIcon = path.join(root, 'public/icon-paola.png');
if (fs.existsSync(icon128)) {
  await sharp(icon128).png({ compressionLevel: 9 }).resize(128, 128).toFile(publicIcon);
  console.log(`✓ Favicon optimizado: public/icon-paola.png (${formatSize(fs.statSync(publicIcon).size)})`);
}
