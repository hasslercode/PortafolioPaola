import { useEffect } from 'react';

export function useGlobalFadeUp() {
  useEffect(() => {
    const animatedElements = document.querySelectorAll('.fade-up');
    if (!animatedElements.length) {
      return undefined;
    }

    if (!('IntersectionObserver' in globalThis)) {
      animatedElements.forEach((element) => {
        element.classList.add('is-visible');
      });
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

    return () => observer.disconnect();
  });
}
