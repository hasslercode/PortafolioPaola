'use client';

import FadeUp from '@/features/home/components/FadeUp';
import { Link } from '@/i18n/routing';
import { useI18n } from '@/features/home/HomeContentProvider';
import { serviceSlugLocales } from '@/content/registry';

/** Home card order → canonical service slug */
export const HOME_SERVICE_SLUGS = [
  'sesion-estrategica',
  'estrategia-contenido',
  'produccion-contenido',
  'gestion-mensual',
];

const SERVICE_ICONS = [
  'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
  'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z',
  'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z',
  'M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z',
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

function ServiceCardBody({ card, index }) {
  return (
    <>
      <div className="service-card-wow__top">
        {card.eyebrow ? (
          <span className="service-card-wow__eyebrow">{card.eyebrow}</span>
        ) : null}
        <div className="service-icon-wrap">
          <svg viewBox="0 0 24 24">
            <path d={SERVICE_ICONS[index]} />
          </svg>
        </div>
        <ServiceTitle card={card} />
        <p className="service-card-wow__pitch">{card.pitch || card.description}</p>
      </div>

      {Array.isArray(card.includes) && card.includes.length > 0 ? (
        <ul className="service-card-wow__includes">
          {card.includes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}

      {Array.isArray(card.rules) && card.rules.length > 0 ? (
        <ul className="service-card-wow__rules">
          {card.rules.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}

      {card.tagline ? (
        <p className="service-card-wow__tagline">{card.tagline}</p>
      ) : null}
    </>
  );
}

export default function Services({ linked = false, compact = false }) {
  const { content, locale } = useI18n();
  const { services } = content;

  return (
    <section
      className={`services-wow${compact ? ' services-wow--compact' : ''}`}
      id="servicios"
    >
      <div className="container">
        <div className="services-wow__header">
          <span className="badge-pill-wow" aria-hidden="true">
            {services.badge}
          </span>
          <div className="section-header-wow">
            {compact ? (
              <h2 className="wow-main-title">
                <span>{services.titleBefore}</span>{' '}
                <span className="wow-title-script">{services.titleScript}</span>
              </h2>
            ) : (
              <>
                <span
                  className="services-scrap services-scrap--heart scrap-heart-shape"
                  aria-hidden="true"
                />
                <div className="fluid-orbit-container">
                  <div className="fluid-ellipse ellipse-1" />
                  <div className="fluid-ellipse ellipse-2" />
                  <h2 className="wow-main-title">
                    <span>{services.titleBefore}</span>{' '}
                    <span className="wow-title-script">{services.titleScript}</span>
                  </h2>
                </div>
              </>
            )}
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
          {services.cards.map((card, index) => {
            const slug = HOME_SERVICE_SLUGS[index];
            const localized = slug
              ? serviceSlugLocales[slug][locale === 'en' ? 'en' : 'es']
              : null;
            const key = card.titleLine1 || card.titleBefore || card.eyebrow;
            const body = <ServiceCardBody card={card} index={index} />;

            if (linked && localized) {
              return (
                <FadeUp
                  key={key}
                  className={`service-card-wow service-card-wow--rich service-card-wow--${index + 1}`}
                  index={index}
                >
                  <Link
                    href={{
                      pathname: '/services/[slug]',
                      params: { slug: localized },
                    }}
                    className="service-card-wow__link"
                  >
                    {body}
                  </Link>
                </FadeUp>
              );
            }

            return (
              <FadeUp
                key={key}
                className={`service-card-wow service-card-wow--rich service-card-wow--${index + 1}`}
                index={index}
              >
                {body}
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
