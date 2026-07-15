'use client';

import { Link } from '@/i18n/routing';
import { useI18n } from '@/features/home/HomeContentProvider';
import { toSrc } from '@/lib/asset';
import iconPaola from '@/assets/icon-paola-96.webp';

const SOCIAL_LINKS = [
  'https://www.instagram.com/paolaahoyosc',
  'https://www.tiktok.com/@paolahoyosc',
  'https://www.linkedin.com/in/paola-andrea-hoyos-cardona-b7247a182',
];

const SOCIAL_SVGS = [
  <path key="ig" d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6m4.4 3.5a4.5 4.5 0 1 1 0 9a4.5 4.5 0 0 1 0-9m0 2a2.5 2.5 0 1 0 0 5a2.5 2.5 0 0 0 0-5m4.75-.75a.75.75 0 1 1 0 1.5a.75.75 0 0 1 0-1.5z" />,
  <path key="tt" d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.01 1.62 4.13.94.97 2.24 1.57 3.58 1.71v3.32c-1.43-.07-2.85-.59-4.01-1.47-.18-.14-.35-.29-.51-.45v6.52c.04 2.91-1.6 5.71-4.31 6.81-2.83 1.22-6.27.46-8.26-1.85-2.16-2.42-2.31-6.19-.36-8.77 1.83-2.51 5.3-3.4 8.12-2.16v3.4c-1.61-.71-3.62-.2-4.66 1.25-.97 1.3-.87 3.23.23 4.41 1.13 1.24 3.09 1.48 4.5 0.54.83-.54 1.31-1.48 1.31-2.48V.02z" />,
  <path key="li" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />,
];

export default function Footer({ onOpenPortfolio }) {
  const { content, locale } = useI18n();
  const { footer, header } = content;

  const handlePortfolioClick = (event) => {
    event.preventDefault();
    onOpenPortfolio();
  };

  return (
    <footer className="footer-final">
      <div className="container">
        <div className="footer-main-grid">
          <div className="footer-col-brand">
            <div className="footer-brand-block">
              <div className="footer-logo-glow">
                <img src={toSrc(iconPaola)} alt={footer.logoAlt} className="footer-logo-image" width="72" height="72" loading="lazy" decoding="async" />
              </div>
              <p className="footer-brand-name">{footer.brandName}</p>
              <p className="footer-brand-tagline">{footer.brandTagline}</p>
              <p className="footer-brand-desc">{footer.brandDescription}</p>
            </div>
          </div>

          <div className="footer-col-links">
            <h3>{footer.navTitle}</h3>
            <ul>
              <li>
                <Link href="/">{footer.nav.inicio}</Link>
              </li>
              <li>
                <Link href="/experiences">{footer.nav.experiencias}</Link>
              </li>
              <li>
                <Link href="/services">{footer.nav.servicios}</Link>
              </li>
              <li>
                <Link href="/about">{header.nav.sobreMi}</Link>
              </li>
              <li>
                <a href="#" onClick={handlePortfolioClick} aria-haspopup="dialog">
                  {locale === 'en' ? 'Portfolio PDF' : 'PDF del portafolio'}
                </a>
              </li>
              <li>
                <Link href="/contact">{footer.nav.contacto}</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col-socials">
            <h3>{footer.socialTitle}</h3>
            <ul>
              {footer.socials.map((social, index) => (
                <li key={social.name}>
                  <a target="_blank" rel="noopener noreferrer" href={SOCIAL_LINKS[index]} className="social-link-item">
                    <span className="social-icon-circle">
                      <svg viewBox="0 0 24 24">{SOCIAL_SVGS[index]}</svg>
                    </span>
                    <span>{social.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col-mission">
            <h3 className="footer-mission-title">{footer.missionTitle}</h3>
            <ul className="footer-mission-list">
              {footer.missionItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bottom-divider" />

        <div className="footer-bottom-row">
          <p className="copyright-text">{footer.copyright}</p>
          <nav className="footer-legal" aria-label={footer.legalNavAriaLabel}>
            <a href="#">{footer.legal.privacy}</a>
            <span className="footer-legal-sep" aria-hidden="true">
              ✦
            </span>
            <a href="#">{footer.legal.terms}</a>
            <span className="footer-legal-sep" aria-hidden="true">
              ✦
            </span>
            <a href="#">{footer.legal.notice}</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
