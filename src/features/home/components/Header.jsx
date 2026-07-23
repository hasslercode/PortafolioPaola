'use client';

import { useEffect, useRef } from 'react';
import { Link, usePathname } from '@/i18n/routing';
import { useI18n } from '@/features/home/HomeContentProvider';
import { useHeaderMenu } from '@/hooks/useHeaderMenu.js';
import HeaderPreferences from './HeaderPreferences.jsx';
import { toSrc } from '@/lib/asset';
import iconPaola from '@/assets/icon-paola-72.webp';

function navItemClass(active) {
  return `nav-item-refined${active ? ' active' : ''}`;
}

export default function Header({ onOpenContact }) {
  const { content } = useI18n();
  const { header } = content;
  const pathname = usePathname();
  const headerRef = useRef(null);
  const { menuOpen, toggleMenu, closeMenu, menuLabel, isMobile } = useHeaderMenu();

  const isHome = pathname === '/';
  const isCases = pathname.startsWith('/experiences');
  const isServices = pathname.startsWith('/services');
  const isContact = pathname.startsWith('/contact');
  const isAbout = pathname.startsWith('/about');
  const isBlog = pathname.startsWith('/blog');

  useEffect(() => {
    const headerEl = headerRef.current;
    if (!headerEl) {
      return undefined;
    }

    const onDocumentClick = (event) => {
      if (!isMobile() || !menuOpen) {
        return;
      }
      if (!headerEl.contains(event.target)) {
        closeMenu();
      }
    };

    document.addEventListener('click', onDocumentClick);
    return () => document.removeEventListener('click', onDocumentClick);
  }, [closeMenu, isMobile, menuOpen]);

  const handleNavClick = () => {
    if (isMobile()) {
      closeMenu();
    }
  };

  const handleContactClick = (event) => {
    event.preventDefault();
    onOpenContact();
    handleNavClick();
  };

  return (
    <header
      ref={headerRef}
      className={`site-header-refined${menuOpen ? ' menu-open' : ''}`}
    >
      <div className="header-bg-decoration">
        <svg viewBox="0 0 1200 100" fill="none" preserveAspectRatio="none" aria-hidden="true">
          <path className="header-bg-decoration__line" d="M650,90 C780,10 880,65 980,35" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
        <span className="bg-decoration-star">✦</span>
      </div>

      <div className="container nav-container-refined">
        <div className="logo-box-refined">
          <Link href="/" className="site-logo" aria-label={header.logoAriaLabel} onClick={handleNavClick}>
            <img src={toSrc(iconPaola)} alt="" className="site-logo__icon" width="54" height="54" decoding="async" />
            <span className="site-logo__lockup">
              <svg className="site-logo__sparkles" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 18" aria-hidden="true">
                <path className="site-logo__sparkle" d="M8 1.2 8.95 5.35 13.1 6.3 8.95 7.25 8 11.4 7.05 7.25 2.9 6.3 7.05 5.35Z" />
                <path className="site-logo__sparkle site-logo__sparkle--sm" d="M6 0.8 6.72 4.05 9.95 4.8 6.72 5.55 6 8.8 5.28 5.55 2.05 4.8 5.28 4.05Z" transform="translate(15 4)" />
                <path className="site-logo__sparkle site-logo__sparkle--xs" d="M6 0.8 6.72 4.05 9.95 4.8 6.72 5.55 6 8.8 5.28 5.55 2.05 4.8 5.28 4.05Z" transform="translate(27 -1) scale(0.68)" />
              </svg>
              <span className="site-logo__name-wrap">
                <svg className="site-logo__swirl-svg site-logo__swirl-svg--back" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 36" preserveAspectRatio="none" aria-hidden="true">
                  <path className="site-logo__swirl" d="M8 21C1 21-3 15-1 9C1 3 11 1 24 4C32 7 36 10 38 18" />
                </svg>
                <span className="site-logo__name">{header.logoName}</span>
                <svg className="site-logo__swirl-svg site-logo__swirl-svg--front" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 36" preserveAspectRatio="none" aria-hidden="true">
                  <path className="site-logo__swirl" d="M36 18H278" />
                </svg>
              </span>
            </span>
          </Link>
          <span className="site-logo__tagline" aria-hidden="true">
            {header.taglineWords.map((word, index) => (
              <span key={word}>
                <span className="site-logo__tagline-word">{word}</span>
                {index < header.taglineWords.length - 1 && (
                  <svg className="site-logo__sep" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" aria-hidden="true">
                    <path d="M5 .6 5.6 3.6 8.6 4.2 5.6 4.8 5 7.8 4.4 4.8 1.4 4.2 4.4 3.6Z" />
                  </svg>
                )}
              </span>
            ))}
          </span>
        </div>

        {/* Always in DOM — CSS toggles bar vs inline to avoid post-hydration layout. */}
        <HeaderPreferences className="header-prefs--bar" />

        <button
          className="menu-toggle-refined"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="header-menu-panel"
          aria-label={menuLabel}
          onClick={toggleMenu}
        >
          <span className="menu-toggle-line" />
          <span className="menu-toggle-line" />
          <span className="menu-toggle-line" />
        </button>

        <div className="header-menu-panel" id="header-menu-panel">
          <nav className="main-nav-refined" aria-label={header.preferencesAriaLabel}>
            <ul>
              <li className={navItemClass(isHome)}>
                <Link href="/" onClick={handleNavClick}>
                  {header.nav.inicio}
                </Link>
              </li>
              <li className={navItemClass(isCases)}>
                <Link href="/experiences" onClick={handleNavClick}>
                  {header.nav.experiencias}
                </Link>
              </li>
              <li className={navItemClass(isServices)}>
                <Link href="/services" onClick={handleNavClick}>
                  {header.nav.servicios}
                </Link>
              </li>
              <li className={navItemClass(isBlog)}>
                <Link href="/blog" onClick={handleNavClick}>
                  {header.nav.blog}
                </Link>
              </li>
              <li className={navItemClass(isAbout)}>
                <Link href="/about" onClick={handleNavClick}>
                  {header.nav.sobreMi}
                </Link>
              </li>
              <li className={navItemClass(isContact)}>
                <Link href="/contact" onClick={handleNavClick}>
                  {header.nav.contacto}
                </Link>
              </li>
            </ul>
          </nav>

          <HeaderPreferences className="header-prefs--inline" />

          <div className="cta-wrap-refined">
            <a href="#" className="btn-pill-premium" onClick={handleContactClick} aria-haspopup="dialog">{header.cta}</a>
          </div>
        </div>
      </div>
    </header>
  );
}
