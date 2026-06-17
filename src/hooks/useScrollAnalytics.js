import { useEffect } from 'react';
import { trackScrollDepth } from '../utils/analytics.js';

const THRESHOLDS = [50, 90];

export function useScrollAnalytics() {
  useEffect(() => {
    const fired = new Set();

    const onScroll = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop;
      const scrollHeight = doc.scrollHeight - window.innerHeight;

      if (scrollHeight <= 0) {
        return;
      }

      const percent = Math.round((scrollTop / scrollHeight) * 100);

      THRESHOLDS.forEach((threshold) => {
        if (percent >= threshold && !fired.has(threshold)) {
          fired.add(threshold);
          trackScrollDepth(threshold);
        }
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);
}
