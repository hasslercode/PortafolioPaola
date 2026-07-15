'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const DarkThemeCss = dynamic(
  () =>
    import('@/components/theme/DeferredThemeStyles').then((m) => m.DeferredThemeStyles),
  { ssr: false },
);

/**
 * Mount dark-theme CSS after idle so it stays off the LCP critical path.
 * data-theme is still set by the beforeInteractive bootstrap script.
 */
export function DeferredThemeStylesGate() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const enable = () => setReady(true);
    if ('requestIdleCallback' in window) {
      requestIdleCallback(enable, { timeout: 900 });
    } else {
      setTimeout(enable, 50);
    }
  }, []);

  if (!ready) return null;
  return <DarkThemeCss />;
}
