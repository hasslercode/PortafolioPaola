'use client';

import { useCallback, useEffect, useState } from 'react';
import { useI18n } from '@/features/home/HomeContentProvider';

const MOBILE_QUERY = '(max-width: 992px)';

export function useHeaderMenu() {
  const { content } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);
  const labels = content.header;

  const isMobile = useCallback(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia(MOBILE_QUERY).matches;
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  const toggleMenu = useCallback(() => {
    setMenuOpen((open) => !open);
  }, []);

  useEffect(() => {
    const syncMenuByViewport = () => {
      if (!isMobile()) {
        closeMenu();
      }
    };

    const onScroll = () => {
      if (isMobile() && menuOpen) {
        closeMenu();
      }
    };

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    };

    globalThis.addEventListener('resize', syncMenuByViewport);
    globalThis.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('keydown', onKeyDown);
    syncMenuByViewport();

    return () => {
      globalThis.removeEventListener('resize', syncMenuByViewport);
      globalThis.removeEventListener('scroll', onScroll);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [closeMenu, isMobile, menuOpen]);

  const menuLabel = menuOpen ? labels.menuCloseLabel : labels.menuOpenLabel;

  return { menuOpen, toggleMenu, closeMenu, menuLabel, isMobile };
}
