import { Caveat, Inter, Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';

/**
 * Font subset for CWV:
 * - Dropped Cormorant (declared but never consumed in CSS selectors).
 * - Weights limited to what legacy UI actually needs.
 * @see https://nextjs.org/docs/app/building-your-application/optimizing/fonts
 */
/** Only preload the primary UI face — serif/script load with display:swap off the critical path. */
export const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans-face',
  display: 'swap',
  preload: true,
});

export const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-serif-face',
  // optional = no late swap on Slow 4G (CLS on hero title); fallback stays if font is late
  display: 'optional',
  preload: false,
  adjustFontFallback: true,
});

export const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter-face',
  display: 'swap',
  preload: false,
});

export const caveat = Caveat({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-script-face',
  display: 'swap',
  preload: false,
});

export const fontVariables = [
  plusJakarta.variable,
  playfair.variable,
  inter.variable,
  caveat.variable,
].join(' ');
