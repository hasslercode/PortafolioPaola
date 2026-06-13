import FadeUp from '../components/FadeUp.jsx';
import { useI18n } from '../context/I18nProvider.jsx';
import reelConversacion from '../assets/campaigns/reel-conversacion-thumb.jpg';
import reelCultura from '../assets/campaigns/reel-cultura-thumb.jpg';
import reelCuriosidad from '../assets/campaigns/reel-curiosidad-thumb.jpg';
import reelStorytelling from '../assets/campaigns/reel-storytelling-thumb.jpg';

const REEL_IMAGES = [reelConversacion, reelCultura, reelCuriosidad, reelStorytelling];

const REEL_ICONS = [
  'results-proof__reel-icon results-proof__reel-icon--pink',
  'results-proof__reel-icon results-proof__reel-icon--lavender',
  'results-proof__reel-icon results-proof__reel-icon--sand',
  'results-proof__reel-icon results-proof__reel-icon--sage',
];

const REEL_ICON_PATHS = [
  'M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z',
  'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z',
  'M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z',
  'M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z',
];

const SECONDARY_KPI_ICONS = [
  { className: 'results-proof__kpi-icon', path: 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z' },
  { className: 'results-proof__kpi-icon results-proof__kpi-icon--pink', path: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' },
  { className: 'results-proof__kpi-icon results-proof__kpi-icon--sage', path: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z' },
];

const CHART_POINTS = [
  { x: 0, y: 44 },
  { x: 25, y: 38 },
  { x: 50, y: 28 },
  { x: 75, y: 18 },
  { x: 100, y: 6 },
];

const TRUST_ICONS = [
  <span key="check" className="results-proof__trust-icon" aria-hidden="true">✓</span>,
  <span key="users" className="results-proof__trust-icon results-proof__trust-icon--lavender" aria-hidden="true">
    <svg viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" /></svg>
  </span>,
  <span key="heart" className="results-proof__trust-icon results-proof__trust-icon--pink" aria-hidden="true">♡</span>,
];

export default function ResultsProof({ onOpenContact }) {
  const { content } = useI18n();
  const { resultsProof } = content;
  const chartLinePath = CHART_POINTS.map((point) => `${point.x},${point.y}`).join(' L ');
  const chartAreaPath = `M ${chartLinePath} L 100,56 L 0,56 Z`;

  const handleContactClick = (event) => {
    event.preventDefault();
    onOpenContact();
  };

  return (
    <section className="results-proof" id="resultados">
      <div className="container">
        <FadeUp as="header" className="results-proof__header" index={0}>
          <span className="results-proof__badge" aria-hidden="true">{resultsProof.badge}</span>
          <h2 className="results-proof__title">
            <span>{resultsProof.titleBefore}</span>{' '}
            <span className="results-proof__accent">{resultsProof.titleAccent}</span>{' '}
            <span>{resultsProof.titleAfter}</span>
            <span className="results-proof__scrap results-proof__scrap--heart" aria-hidden="true">♡</span>
          </h2>
          <p className="results-proof__desc">
            <span>{resultsProof.descriptionBefore}</span>
            <span className="results-proof__highlight">{resultsProof.descriptionAccent}</span>
            <span>{resultsProof.descriptionAfter}</span>
          </p>
          <p className="results-proof__note">
            <span className="results-proof__note-star" aria-hidden="true">✦</span>
            <span>{resultsProof.note}</span>
          </p>
        </FadeUp>

        <FadeUp className="results-proof__metrics" index={1}>
          <article className="results-proof__kpi-main">
            <span className="results-proof__tape" aria-hidden="true" />
            <span className="results-proof__kpi-icon results-proof__kpi-icon--pink" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" /></svg>
            </span>
            <div className="results-proof__kpi-main-text">
              <strong className="results-proof__kpi-value">{resultsProof.primaryKpi.value}</strong>
              <p>
                <span>{resultsProof.primaryKpi.labelBefore}</span>{' '}
                <span className="results-proof__highlight">{resultsProof.primaryKpi.labelAccent}</span>
              </p>
            </div>
          </article>

          <div className="results-proof__kpi-stats">
            {resultsProof.secondaryKpis.map((kpi, index) => (
              <div key={kpi.label} className="results-proof__stat">
                <span className={SECONDARY_KPI_ICONS[index].className} aria-hidden="true">
                  <svg viewBox="0 0 24 24"><path d={SECONDARY_KPI_ICONS[index].path} /></svg>
                </span>
                <div>
                  <strong>{kpi.value}</strong>
                  <span>{kpi.label}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="results-proof__chart">
            <p className="results-proof__chart-title">
              <span>{resultsProof.chart.titleBefore}</span>{' '}
              <span className="results-proof__script">{resultsProof.chart.titleAccent}</span>{' '}
              <span>{resultsProof.chart.titleAfter}</span>
            </p>
            <div className="results-proof__chart-body" role="img" aria-label={resultsProof.chart.ariaLabel}>
              <svg className="results-proof__chart-svg" viewBox="0 0 100 56" preserveAspectRatio="none" aria-hidden="true">
                <defs>
                  <linearGradient id="resultsChartFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#e8a7b3" stopOpacity="0.38" />
                    <stop offset="100%" stopColor="#faf7f5" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path className="results-proof__chart-area" d={chartAreaPath} fill="url(#resultsChartFill)" />
                <path className="results-proof__chart-line" d={`M ${chartLinePath}`} />
                {CHART_POINTS.map((point, index) => (
                  <circle
                    key={point.x}
                    cx={point.x}
                    cy={point.y}
                    r={index === CHART_POINTS.length - 1 ? 2.4 : 2}
                    className={index === CHART_POINTS.length - 1 ? 'results-proof__chart-dot results-proof__chart-dot--peak' : 'results-proof__chart-dot'}
                  />
                ))}
              </svg>
              <div className="results-proof__chart-axis">
                {resultsProof.chart.labels.map((label) => (
                  <div key={label.month} className="results-proof__chart-tick">
                    <span className="results-proof__chart-value">{label.value}</span>
                    <span className="results-proof__chart-month">{label.month}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeUp>

        <p className="results-proof__community">{resultsProof.communityNote}</p>

        <FadeUp className="results-proof__showcase" index={2}>
          <header className="results-proof__showcase-header">
            <span className="results-proof__showcase-badge">{resultsProof.contentBadge}</span>
            <h2 className="results-proof__showcase-title">
              <span className="results-proof__showcase-spark" aria-hidden="true">✦</span>
              <span className="results-proof__showcase-title-inner">
                <span>{resultsProof.contentTitleBefore}</span>{' '}
                <span className="results-proof__script results-proof__showcase-accent">{resultsProof.contentTitleAccent}</span>
              </span>
              <span className="results-proof__showcase-spark" aria-hidden="true">✦</span>
            </h2>
            <p className="results-proof__showcase-sub">{resultsProof.contentSubtitle}</p>
          </header>

          <div className="results-proof__reels">
            {resultsProof.reels.map((reel, index) => (
              <article key={reel.category} className="results-proof__reel">
                <div className="results-proof__reel-thumb">
                  <img src={REEL_IMAGES[index]} alt={reel.imageAlt} width={400} height={622} loading="lazy" decoding="async" />
                  <span className="results-proof__reel-metric">{reel.metric}</span>
                  <a href={reel.ctaLink} className="results-proof__reel-play" target="_blank" rel="noopener noreferrer" aria-label={reel.ctaAriaLabel}>
                    <span className="results-proof__reel-overlay" aria-hidden="true" />
                    <span className="results-proof__reel-play-btn" aria-hidden="true">
                      <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                    </span>
                  </a>
                </div>
                <div className="results-proof__reel-meta">
                  <span className={REEL_ICONS[index]} aria-hidden="true">
                    <svg viewBox="0 0 24 24"><path d={REEL_ICON_PATHS[index]} /></svg>
                  </span>
                  <div>
                    <strong>{reel.category}</strong>
                    <p>{reel.description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </FadeUp>

        <FadeUp className="results-proof__bar" index={3}>
          <div className="results-proof__trust">
            {resultsProof.trustItems.map((item, index) => (
              <div key={item.title} className="results-proof__trust-item">
                {TRUST_ICONS[index]}
                <div>
                  <strong>{item.title}</strong>
                  <span>{item.subtitle}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="results-proof__cta-panel">
            <p className="results-proof__cta-script">{resultsProof.ctaScript}</p>
            <div className="results-proof__cta-col">
              <a
                href="#"
                className="results-proof__cta btn-pill btn-wow-action"
                onClick={handleContactClick}
                aria-haspopup="dialog"
                aria-label={resultsProof.ctaAriaLabel}
              >
                <span>{resultsProof.cta}</span>
                <span className="btn-wow-action__sparkle" aria-hidden="true">✦</span>
              </a>
              <p className="results-proof__cta-disclaimer">
                <span className="results-proof__cta-lock" aria-hidden="true">🔒</span>
                <span>{resultsProof.ctaDisclaimer}</span>
              </p>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
