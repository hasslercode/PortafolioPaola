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

const ICONS = {
  people:
    'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z',
  target:
    'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z',
  clapper:
    'M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4zm0 14H4V8h16v10z',
  crown:
    'M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .55-.45 1-1 1H6c-.55 0-1-.45-1-1v-1h14v1z',
  brand:
    'M12 2l2.4 7.2H22l-6 4.8 2.3 7L12 16.8 5.7 21 8 14 2 9.2h7.6L12 2z',
  persona:
    'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z',
  pillars:
    'M4 10h3v10H4V10zm6.5-6h3v16h-3V4zM17 14h3v6h-3v-6z',
  calendar:
    'M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10z',
  goals:
    'M19 3H5c-1.1 0-2 .9-2 2v14l4-4h12c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z',
  tone:
    'M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z',
  check:
    'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z',
};

const VARIANT_ICON = ['people', 'target', 'clapper', 'crown'];

const STRATEGY_ITEM_ICONS = [
  'brand',
  'persona',
  'pillars',
  'calendar',
  'goals',
  'tone',
];

function ServiceTitle({ card }) {
  if (card.titleBefore) {
    return (
      <h3 className="svc-card__title">
        <span>{card.titleBefore}</span>{' '}
        <span className="svc-card__title-em">{card.titleScript}</span>
      </h3>
    );
  }

  return (
    <h3 className="svc-card__title">
      <span>{card.titleLine1}</span>{' '}
      <span className="svc-card__title-em">{card.titleScript}</span>
    </h3>
  );
}

function Icon({ name, className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d={ICONS[name]} />
    </svg>
  );
}

function OfferCardBody({ card, index, variant, featuredLabel }) {
  const num = String(index + 1).padStart(2, '0');
  const iconName = VARIANT_ICON[index] || 'target';
  const includes = Array.isArray(card.includes) ? card.includes : [];
  const isStrategy = variant === 'strategy';
  const listItems = includes;

  return (
    <>
      <span className="svc-card__ghost" aria-hidden="true">
        {num}
      </span>

      {variant === 'premium' ? (
        <span className="svc-card__badge">
          <span aria-hidden="true">★</span> {featuredLabel}
        </span>
      ) : null}

      <div className="svc-card__icon-wrap" aria-hidden="true">
        <Icon name={iconName} />
      </div>

      <ServiceTitle card={card} />

      {isStrategy ? (
        <ul className="svc-card__grid">
          {listItems.map((item, i) => (
            <li key={item}>
              <span className="svc-card__mini-icon" aria-hidden="true">
                <Icon name={STRATEGY_ITEM_ICONS[i % STRATEGY_ITEM_ICONS.length]} />
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : variant === 'premium' ? (
        <ul className="svc-card__pills">
          {listItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : (
        <ul className="svc-card__checks">
          {listItems.map((item) => (
            <li key={item}>
              <span className="svc-card__check" aria-hidden="true">
                <Icon name="check" />
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}

      {card.tagline ? (
        <p className="svc-card__foot">{card.tagline}</p>
      ) : null}
    </>
  );
}

export default function Services({ linked = false, compact = false }) {
  const { content, locale } = useI18n();
  const { services } = content;
  const isEn = locale === 'en';
  const featuredLabel = isEn ? 'Most complete' : 'Más completo';

  return (
    <section
      className={`services-wow services-showcase${compact ? ' services-wow--compact' : ''}`}
      id="servicios"
    >
      <div className="container">
        <div className="services-wow__header">
          {!compact ? (
            <span className="badge-pill-wow" aria-hidden="true">
              {services.badge}
            </span>
          ) : null}
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

        <div className="svc-grid">
          {services.cards.map((card, index) => {
            const slug = HOME_SERVICE_SLUGS[index];
            const variant = SERVICE_VARIANTS[index] || 'strategy';
            const localized = slug
              ? serviceSlugLocales[slug][locale === 'en' ? 'en' : 'es']
              : null;
            const key = card.titleLine1 || card.titleBefore || card.eyebrow;
            const body = (
              <OfferCardBody
                card={card}
                index={index}
                variant={variant}
                featuredLabel={featuredLabel}
              />
            );
            const className = `svc-card svc-card--${variant}`;

            if (linked && localized) {
              return (
                <FadeUp key={key} className={className} index={index}>
                  <Link
                    href={{
                      pathname: '/services/[slug]',
                      params: { slug: localized },
                    }}
                    className="svc-card__link"
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
