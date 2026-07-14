/**
 * Next.js static imports return StaticImageData `{ src, width, height }`.
 * Vite returned a plain URL string. Normalize for <img src>.
 */
export type AssetImport = string | { src: string };

export function toSrc(asset: AssetImport | undefined | null): string {
  if (!asset) return '';
  return typeof asset === 'string' ? asset : asset.src;
}
