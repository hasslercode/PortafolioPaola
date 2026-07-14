'use client';

import { useEffect, useRef } from 'react';

export function useFadeUp(index = 0) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return undefined;
    }

    element.style.transitionDelay = `${(index % 5) * 60}ms`;

    if (!('IntersectionObserver' in globalThis)) {
      element.classList.add('is-visible');
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -5% 0px' }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [index]);

  return ref;
}
