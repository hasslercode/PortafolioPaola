import { Plus_Jakarta_Sans } from 'next/font/google';

/**
 * Single UI face on the critical path.
 * Serif/script fall back to system Georgia (Playfair removed from next/font)
 * so the font CSS chunk stays tiny and woff2 leaves the LCP chain.
 */
export const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-sans-face',
  display: 'optional',
  preload: true,
  adjustFontFallback: true,
});

export const fontVariables = plusJakarta.variable;
