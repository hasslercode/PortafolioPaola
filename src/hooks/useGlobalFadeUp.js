'use client';

import { useEffect } from 'react';

export function useGlobalFadeUp() {
  useEffect(() => {
    const animatedElements = document.querySelectorAll('.fade-up');
    const dividers = document.querySelectorAll('.section-divider');

    if (!animatedElements.length && !dividers.length) {
      return undefined;
    }

    if (!('IntersectionObserver' in globalThis)) {
      animatedElements.forEach((element) => element.classList.add('is-visible'));
      dividers.forEach((element) => element.classList.add('is-revealed'));
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

    animatedElements.forEach((element, index) => {
      element.style.transitionDelay = `${(index % 5) * 60}ms`;
      observer.observe(element);
    });

    // "Wow" reveal for the dividers between sections: replays each time the
    // divider scrolls into view so the sparkle keeps catching the eye.
    const dividerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('is-revealed', entry.isIntersecting);
        });
      },
      { threshold: 0.65 }
    );

    dividers.forEach((element) => dividerObserver.observe(element));

    return () => {
      observer.disconnect();
      dividerObserver.disconnect();
    };
  });
}
