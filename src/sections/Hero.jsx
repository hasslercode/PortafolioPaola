import { useEffect, useState } from 'react';
import { useI18n } from '../context/I18nProvider.jsx';

const HERO_IMG_WEBP_480 = `${import.meta.env.BASE_URL}assets/fotopaola-480.webp`;
const HERO_IMG_WEBP_720 = `${import.meta.env.BASE_URL}assets/fotopaola-720.webp`;
const HERO_IMG_JPG = `${import.meta.env.BASE_URL}assets/fotopaola.jpg`;

const PERF_ICONS = [
  { className: 'perf-icon-box perf-icon-box--pink', path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z' },
  { className: 'perf-icon-box perf-icon-box--lavender', path: 'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z' },
  { className: 'perf-icon-box perf-icon-box--pink', path: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' },
  { className: 'perf-icon-box perf-icon-box--sage', path: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z' },
];

export default function Hero({ onOpenContact }) {
  const { content } = useI18n();
  const { hero, performance } = content;
  const [showEnhancements, setShowEnhancements] = useState(false);

  useEffect(() => {
    const reveal = () => setShowEnhancements(true);
    if ('requestIdleCallback' in window) {
      requestIdleCallback(reveal, { timeout: 2000 });
    } else {
      setTimeout(reveal, 300);
    }
  }, []);

  const handleContactClick = (event) => {
    event.preventDefault();
    onOpenContact();
  };

  return (
    <div className="hero-premium-wrapper">
      <section className="hero-premium-section" id="inicio" aria-labelledby="hero-title">
        <div className="container hero-grid-premium">
          <div className="hero-left-premium">
            <p className="hero-premium-tagline">
              <span>{hero.taglineLine1}</span>
              <br className="hero-tagline-break" aria-hidden="true" />
              <span className="cursive-glow">{hero.taglineAccent}</span>
            </p>

            <h1 id="hero-title" className="hero-premium-title">
              <span>{hero.titleLine1}</span>{' '}
              <br className="hero-title-break" aria-hidden="true" />
              <span>{hero.titleLine2Prefix}</span>{' '}
              <span className="hero-title-accent">{hero.titleLine2Accent}</span>
            </h1>

            <p className="hero-premium-subtitle">{hero.subtitle}</p>

            <p className="hero-premium-description">
              <span>{hero.descriptionBefore}</span>{' '}
              <span className="pink-accent-bold">{hero.descriptionAccent}</span>
            </p>

            <div className="hero-cta-group">
              <a
                href="#contacto"
                className="btn-pill btn-wow-action"
                onClick={handleContactClick}
                aria-haspopup="dialog"
                aria-label={hero.ctaAriaLabel}
              >
                <span>{hero.cta}</span>
                <span className="btn-wow-action__sparkle" aria-hidden="true">✦</span>
              </a>
            </div>
          </div>

          <div className="hero-right-premium">
            <div className="hero-image-composite">
              <span className="hero-scrap hero-scrap--tape" aria-hidden="true" />
              <span className="hero-scrap hero-scrap--heart scrap-heart-shape" aria-hidden="true" />
              <div className="premium-arch-backdrop" />
              <picture>
                <source
                  media="(max-width: 768px)"
                  srcSet={HERO_IMG_WEBP_480}
                  type="image/webp"
                />
                <source
                  srcSet={`${HERO_IMG_WEBP_480} 480w, ${HERO_IMG_WEBP_720} 720w`}
                  sizes="(max-width: 768px) 50vw, 33vw"
                  type="image/webp"
                />
                <img
                  src={HERO_IMG_JPG}
                  alt={hero.imageAlt}
                  className="hero-img-premium"
                  width={600}
                  height={840}
                  fetchPriority="high"
                  decoding="async"
                />
              </picture>
              {showEnhancements ? (
                <div className="metrics-card-glassmorphism">
                  <div className="glass-icon-circle">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" /></svg>
                  </div>
                  <div className="glass-metric-info">
                    <span className="glass-metric-value">{hero.metricValue}</span>
                    <span className="glass-metric-label">{hero.metricLabel}</span>
                  </div>
                </div>
              ) : null}
            </div>
            <div className="premium-vertical-label" aria-hidden="true">{hero.verticalLabel}</div>
          </div>
        </div>
      </section>

      <section className="performance-bar-premium">
        <div className="container">
          <div className="performance-bar-pill">
            <span className="perf-scrap perf-scrap--tape-pink" aria-hidden="true" />
            <span className="perf-scrap perf-scrap--heart-outline scrap-heart-shape scrap-heart-shape--lavender" aria-hidden="true" />
            <div className="performance-bar-grid">
              {performance.items.map((item, index) => (
                <div key={item.title} className="perf-item-premium">
                  <div className={PERF_ICONS[index].className}>
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d={PERF_ICONS[index].path} /></svg>
                  </div>
                  <div className="perf-text-group">
                    <p className="perf-text-group__title">{item.title}</p>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
