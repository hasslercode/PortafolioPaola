import FadeUp from '../components/FadeUp.jsx';
import { useI18n } from '../context/I18nProvider.jsx';

const SERVICE_ICONS = [
  'M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z',
  'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z',
  'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z',
  'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z',
  'M12 12m-3.2 0a3.2 3.2 0 1 1 6.4 0a3.2 3.2 0 1 1 -6.4 0M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9z',
];

function ServiceTitle({ card }) {
  if (card.titleBefore) {
    return (
      <h3>
        <span>{card.titleBefore}</span>{' '}
        <span className="service-title-script">{card.titleScript}</span>
      </h3>
    );
  }

  return (
    <h3>
      <span>{card.titleLine1}</span>
      <br />
      <span className="service-title-script">{card.titleScript}</span>
    </h3>
  );
}

export default function Services() {
  const { content } = useI18n();
  const { services } = content;

  return (
    <section className="services-wow" id="servicios">
      <div className="container">
        <div className="services-wow__header">
          <span className="badge-pill-wow" aria-hidden="true">{services.badge}</span>
          <div className="section-header-wow">
            <span className="services-scrap services-scrap--heart scrap-heart-shape" aria-hidden="true" />
            <div className="fluid-orbit-container">
              <div className="fluid-ellipse ellipse-1" />
              <div className="fluid-ellipse ellipse-2" />
              <h2 className="wow-main-title">
                <span>{services.titleBefore}</span>{' '}
                <span className="wow-title-script">{services.titleScript}</span>
              </h2>
            </div>
            <p className="wow-subtitle">
              <span>{services.subtitleBefore}</span>{' '}
              <span className="wow-subtitle-accent">{services.subtitleAccent1}</span>{' '}
              <span>{services.subtitleMiddle}</span>{' '}
              <span className="wow-subtitle-accent">{services.subtitleAccent2}</span>{' '}
              <span>{services.subtitleAfter}</span>
            </p>
          </div>
        </div>

        <div className="services-grid-wow">
          {services.cards.map((card, index) => (
            <FadeUp key={card.titleLine1 || card.titleBefore} className={`service-card-wow service-card-wow--${index + 1}`} index={index}>
              <div className="service-icon-wrap">
                <svg viewBox="0 0 24 24"><path d={SERVICE_ICONS[index]} /></svg>
              </div>
              <ServiceTitle card={card} />
              <p>{card.description}</p>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
