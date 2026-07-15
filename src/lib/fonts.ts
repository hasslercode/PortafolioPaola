import { Caveat, Inter, Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';

/**
 * Font subset for CWV / mobile CLS:
 * - display: optional avoids late font swaps that inflate CLS on Slow 4G.
 * - Only Jakarta is preloaded (primary UI face).
 * @see https://nextjs.org/docs/app/building-your-application/optimizing/fonts
 */
export const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-sans-face',
  display: 'optional',
  preload: true,
  adjustFontFallback: true,
});

export const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-serif-face',
  display: 'optional',
  preload: false,
  adjustFontFallback: true,
});

export const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-inter-face',
  display: 'optional',
  preload: false,
  adjustFontFallback: true,
});

export const caveat = Caveat({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-script-face',
  display: 'optional',
  preload: false,
  adjustFontFallback: true,
});

export const fontVariables = [
  plusJakarta.variable,
  playfair.variable,
  inter.variable,
  caveat.variable,
].join(' ');
