import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';

/**
 * CWV-first font set (mobile Slow 4G):
 * - Only two families → smaller render-blocking font CSS + fewer woff2 on critical path.
 * - display: optional → no late swap CLS when fonts arrive after ~100ms.
 * - Inter/Caveat removed; CSS aliases map to sans/serif.
 */
export const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '700', '800'],
  variable: '--font-sans-face',
  display: 'optional',
  preload: true,
  adjustFontFallback: true,
});

export const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['700'],
  style: ['normal', 'italic'],
  variable: '--font-serif-face',
  display: 'optional',
  preload: false,
  adjustFontFallback: true,
});

export const fontVariables = [plusJakarta.variable, playfair.variable].join(' ');
