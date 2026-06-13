import { useEffect, useRef, useState } from 'react';
import { useI18n } from '../context/I18nProvider.jsx';
import { useHeaderMenu } from '../hooks/useHeaderMenu.js';
import HeaderPreferences from './HeaderPreferences.jsx';
import iconPaola from '../assets/icon-paola-128.webp';

const MOBILE_HEADER_QUERY = '(max-width: 992px)';

export default function Header({ onOpenContact, onOpenPortfolio }) {
  const { content } = useI18n();
  const { header } = content;
  const headerRef = useRef(null);
  const { menuOpen, toggleMenu, closeMenu, menuLabel, isMobile } = useHeaderMenu();
  const [compactHeader, setCompactHeader] = useState(false);

  useEffect(() => {
    const mediaQuery = globalThis.matchMedia(MOBILE_HEADER_QUERY);
    const syncLayout = () => setCompactHeader(mediaQuery.matches);
    syncLayout();
    mediaQuery.addEventListener('change', syncLayout);
    return () => mediaQuery.removeEventListener('change', syncLayout);
  }, []);

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

  const handlePortfolioClick = (event) => {
    event.preventDefault();
    onOpenPortfolio();
    handleNavClick();
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
          <a href="#inicio" className="site-logo" aria-label={header.logoAriaLabel}>
            <img src={iconPaola} alt="" className="site-logo__icon" width="54" height="54" loading="eager" decoding="async" />
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
                <h1 className="site-logo__name">{header.logoName}</h1>
                <svg className="site-logo__swirl-svg site-logo__swirl-svg--front" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 36" preserveAspectRatio="none" aria-hidden="true">
                  <path className="site-logo__swirl" d="M36 18H278" />
                </svg>
              </span>
            </span>
          </a>
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

        {compactHeader ? (
          <HeaderPreferences className="header-prefs--bar" />
        ) : null}

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
          <nav className="main-nav-refined">
            <ul>
              <li className="nav-item-refined active"><a href="#inicio" onClick={handleNavClick}>{header.nav.inicio}</a></li>
              <li className="nav-item-refined"><a href="#experiencias-destacadas" onClick={handleNavClick}>{header.nav.experiencias}</a></li>
              <li className="nav-item-refined"><a href="#servicios" onClick={handleNavClick}>{header.nav.servicios}</a></li>
              <li className="nav-item-refined">
                <a href="#" onClick={handlePortfolioClick} aria-haspopup="dialog">{header.nav.portafolio}</a>
              </li>
              <li className="nav-item-refined"><a href="#contacto" onClick={handleNavClick}>{header.nav.contacto}</a></li>
            </ul>
          </nav>

          {!compactHeader ? (
            <HeaderPreferences className="header-prefs--inline" />
          ) : null}

          <div className="cta-wrap-refined">
            <a href="#" className="btn-pill-premium" onClick={handleContactClick} aria-haspopup="dialog">{header.cta}</a>
          </div>
        </div>
      </div>
    </header>
  );
}
