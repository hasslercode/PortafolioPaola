/** Fuente única de verdad para SEO social y URLs canónicas. */
export const SITE_URL = 'https://www.paolahoyos.com';
export const SITE_NAME = 'Paola Hoyos';
export const OG_IMAGE_PATH = '/assets/og-paola.png';
export const OG_IMAGE_URL = `${SITE_URL}${OG_IMAGE_PATH}`;
export const OG_IMAGE_WIDTH = 1734;
export const OG_IMAGE_HEIGHT = 907;
export const OG_IMAGE_TYPE = 'image/png';
export const OG_IMAGE_ALT = 'Paola Hoyos — Estrategia digital, storytelling y crecimiento orgánico';
export const TWITTER_SITE = '@paolaahoyosc';
export const TWITTER_CARD = 'summary_large_image';

export function injectSeoPlaceholders(html) {
  return html
    .replaceAll('__SITE_URL__', SITE_URL)
    .replaceAll('__OG_IMAGE__', OG_IMAGE_URL)
    .replaceAll('__OG_IMAGE_WIDTH__', String(OG_IMAGE_WIDTH))
    .replaceAll('__OG_IMAGE_HEIGHT__', String(OG_IMAGE_HEIGHT))
    .replaceAll('__OG_IMAGE_TYPE__', OG_IMAGE_TYPE)
    .replaceAll('__OG_IMAGE_ALT__', OG_IMAGE_ALT)
    .replaceAll('__TWITTER_SITE__', TWITTER_SITE);
}
