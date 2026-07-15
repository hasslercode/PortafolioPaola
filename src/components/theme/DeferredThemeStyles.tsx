'use client';

import '@/styles/dark.css';

/** Side-effect only — imported via next/dynamic({ ssr: false }) after first paint. */
export function DeferredThemeStyles() {
  return null;
}
