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

const SERVICE_VARIANTS = ['session', 'strategy', 'production', 'premium'];

function ServiceTitle({ card }) {
  if (card.titleBefore) {
    return (
      <h3 className="offer-card__title">
        <span>{card.titleBefore}</span>{' '}
        <span className="offer-card__title-script">{card.titleScript}</span>
      </h3>
    );
  }

  return (
    <h3 className="offer-card__title">
      <span>{card.titleLine1}</span>{' '}
      <span className="offer-card__title-script">{card.titleScript}</span>
    </h3>
  );
}

function OfferCardBody({ card, index, variant }) {
  const num = String(index + 1).padStart(2, '0');

  return (
    <>
      <span className="offer-card__ghost" aria-hidden="true">
        {num}
      </span>

      <div className="offer-card__head">
        {card.eyebrow ? (
          <span className="offer-card__eyebrow">{card.eyebrow}</span>
        ) : null}
        <ServiceTitle card={card} />
      </div>

      <p className="offer-card__pitch">{card.pitch || card.description}</p>

      {Array.isArray(card.includes) && card.includes.length > 0 ? (
        <ul
          className={`offer-card__includes offer-card__includes--${variant}`}
        >
          {card.includes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}

      {Array.isArray(card.rules) && card.rules.length > 0 ? (
        <div className="offer-card__stamps">
          {card.rules.map((item) => (
            <span key={item} className="offer-card__stamp">
              {item}
            </span>
          ))}
        </div>
      ) : null}

      {card.tagline ? (
        <p className="offer-card__tagline">{card.tagline}</p>
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

        <div className="offer-bento">
          {services.cards.map((card, index) => {
            const slug = HOME_SERVICE_SLUGS[index];
            const variant = SERVICE_VARIANTS[index] || 'strategy';
            const localized = slug
              ? serviceSlugLocales[slug][locale === 'en' ? 'en' : 'es']
              : null;
            const key = card.titleLine1 || card.titleBefore || card.eyebrow;
            const body = (
              <OfferCardBody card={card} index={index} variant={variant} />
            );

            const className = `offer-card offer-card--${variant}`;

            if (linked && localized) {
              return (
                <FadeUp key={key} className={className} index={index}>
                  <Link
                    href={{
                      pathname: '/services/[slug]',
                      params: { slug: localized },
                    }}
                    className="offer-card__link"
                  >
                    {body}
                  </Link>
                </FadeUp>
              );
            }

            return (
              <FadeUp key={key} className={className} index={index}>
                {body}
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
