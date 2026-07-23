'use client';

import { useMemo, useState } from 'react';
import { Link } from '@/i18n/routing';
import { useI18n } from '@/features/home/HomeContentProvider';
import { useContentActions } from '@/features/home/PageChrome';
import { FaqSection } from '@/components/content/FaqSection';

export type BlogTopic =
  | 'seo'
  | 'instagram'
  | 'tiktok'
  | 'branding'
  | 'marketing'
  | 'video'
  | 'ugc'
  | 'strategy'
  | 'local'
  | 'comparison';

type BlogPostCard = {
  slug: string;
  title: string;
  description: string;
  topic: BlogTopic;
};

const TOPIC_LABELS: Record<BlogTopic, { es: string; en: string }> = {
  seo: { es: 'SEO', en: 'SEO' },
  instagram: { es: 'Instagram', en: 'Instagram' },
  tiktok: { es: 'TikTok', en: 'TikTok' },
  branding: { es: 'Branding', en: 'Branding' },
  marketing: { es: 'Marketing', en: 'Marketing' },
  video: { es: 'Video', en: 'Video' },
  ugc: { es: 'UGC', en: 'UGC' },
  strategy: { es: 'Estrategia', en: 'Strategy' },
  local: { es: 'Colombia', en: 'Colombia' },
  comparison: { es: 'Comparativas', en: 'Comparisons' },
};

const ALL_TOPICS: BlogTopic[] = [
  'strategy',
  'video',
  'ugc',
  'marketing',
  'comparison',
  'local',
  'instagram',
  'tiktok',
  'branding',
  'seo',
];

export function BlogHubView({
  posts,
  eyebrow,
  title,
  summary,
  rssHref,
}: {
  posts: BlogPostCard[];
  eyebrow: string;
  title: string;
  summary: string;
  rssHref: string;
}) {
  const { locale } = useI18n();
  const [topic, setTopic] = useState<BlogTopic | 'all'>('all');
  const isEn = locale === 'en';

  const filtered = useMemo(() => {
    if (topic === 'all') return posts;
    return posts.filter((post) => post.topic === topic);
  }, [posts, topic]);

  return (
    <section className="services-wow" id="blog">
      <div className="container">
        <div className="services-wow__header">
          <span className="badge-pill-wow">{eyebrow}</span>
          <div className="section-header-wow">
            <span
              className="services-scrap services-scrap--heart scrap-heart-shape"
              aria-hidden="true"
            />
            <div className="fluid-orbit-container">
              <div className="fluid-ellipse ellipse-1" />
              <div className="fluid-ellipse ellipse-2" />
              <h1 className="wow-main-title">{title}</h1>
            </div>
            <p className="wow-subtitle">{summary}</p>
            <p className="wow-subtitle">
              <a href={rssHref} rel="alternate" type="application/rss+xml">
                RSS
              </a>
            </p>
          </div>
        </div>

        <nav
          aria-label={isEn ? 'Blog topics' : 'Temas del blog'}
          style={{ marginBottom: '1.75rem' }}
        >
          <ul
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.65rem',
              listStyle: 'none',
              padding: 0,
              margin: 0,
            }}
          >
            <li>
              <button
                type="button"
                className={topic === 'all' ? 'btn-pill-premium' : 'btn-pill'}
                onClick={() => setTopic('all')}
              >
                {isEn ? 'All' : 'Todos'}
              </button>
            </li>
            {ALL_TOPICS.map((key) => (
              <li key={key}>
                <button
                  type="button"
                  className={topic === key ? 'btn-pill-premium' : 'btn-pill'}
                  onClick={() => setTopic(key)}
                >
                  {TOPIC_LABELS[key][locale]}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="services-grid-wow">
          {filtered.map((post, index) => (
            <article
              key={post.slug}
              className={`service-card-wow service-card-wow--${(index % 5) + 1}`}
            >
              <Link
                href={{ pathname: '/blog/[slug]', params: { slug: post.slug } }}
                className="service-card-wow__link"
              >
                <span className="badge-pill-wow" style={{ marginBottom: '0.5rem' }}>
                  {TOPIC_LABELS[post.topic][locale]}
                </span>
                <h2 className="service-title-script" style={{ fontSize: '1.35rem' }}>
                  {post.title}
                </h2>
                <p>{post.description}</p>
                <span className="campaign-card__case-link">
                  {isEn ? 'Read article' : 'Leer artículo'}
                </span>
              </Link>
            </article>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="wow-subtitle" style={{ textAlign: 'center' }}>
            {isEn
              ? 'No articles in this topic yet.'
              : 'Aún no hay artículos en este tema.'}
          </p>
        ) : null}
      </div>
    </section>
  );
}

export type InvestmentPackage = {
  id: string;
  index: string;
  name: string;
  pitch: string;
  includes: string[];
  note?: string;
  ctaLabel?: string;
  featured?: boolean;
  tag?: string;
  delivery?: string;
  priceFrom?: string;
  priceValue?: string;
  /** Public service slug for locale-aware detail link */
  detailSlug?: string;
  detailLabel?: string;
};

export type ProcessStep = {
  index: string;
  title: string;
  detail: string;
};

export type OfferValue = {
  title: string;
  detail: string;
};

const PLAN_ICONS: Record<string, string> = {
  estrategia:
    'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
  produccion:
    'M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4zm0 14H4V8h16v10z',
  'gestion-mensual':
    'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
  ugc: 'M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z',
};

const PROCESS_ICONS = [
  'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z',
  'M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4zm0 14H4V8h16v10z',
  'M5 9.2h3V19H5V9.2zM10.6 5h2.8v14h-2.8V5zm5.6 8H19v6h-2.8v-6z',
];

const INCLUDE_ROW_ICONS = [
  'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z',
  'M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z',
  'M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z',
  'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z',
  'M12 2l-5.5 9h11L12 2zm0 3.84L13.93 9h-3.87L12 5.84zM17.5 13c-2.49 0-4.5 2.01-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.01 4.5-4.5-2.01-4.5-4.5-4.5zm0 7c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zM3 21.5h8v-8H3v8z',
  'M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z',
  'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z',
  'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z',
  'M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 12h-2v-2h2v2zm0-4h-2V6h2v4z',
];

const VALUE_ICONS = [
  'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z',
  'M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z',
  'M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z',
  'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z',
];

export function PricingHubView({
  badge,
  titleLead,
  titleAccent,
  titleTrail,
  summary,
  processEyebrow,
  processTitle,
  processSteps,
  consultCta,
  consultTag,
  consultNote,
  consultDetailSlug,
  consultDetailLabel,
  includesLabel,
  featuredLabel,
  deliveryLabel,
  values,
  helpTitle,
  helpBody,
  helpCta,
  ctaLabel,
  packages,
  faqs,
}: {
  badge: string;
  titleLead: string;
  titleAccent: string;
  titleTrail: string;
  summary: string;
  processEyebrow: string;
  processTitle: string;
  processSteps: ProcessStep[];
  consultCta: string;
  consultTag: string;
  consultNote: string;
  consultDetailSlug?: string;
  consultDetailLabel?: string;
  includesLabel: string;
  featuredLabel: string;
  deliveryLabel: string;
  values: OfferValue[];
  helpTitle: string;
  helpBody: string;
  helpCta: string;
  ctaLabel: string;
  packages: InvestmentPackage[];
  faqs: Array<{ question: string; answer: string }>;
}) {
  const { locale } = useI18n();
  const { openContact } = useContentActions();
  const isEn = locale === 'en';

  return (
    <>
      <section className="offer-suite" id="inversion">
        <div className="container">
          <header className="offer-suite__intro">
            <span className="offer-suite__badge">
              <span aria-hidden="true">✨</span> {badge}
            </span>
            <h1 className="offer-suite__title">
              {titleLead}{' '}
              <em>{titleAccent}</em>
              {titleTrail ? <> {titleTrail}</> : null}
            </h1>
            <p className="offer-suite__summary">{summary}</p>
          </header>

          <div className="offer-board">
            <aside className="offer-process" id="proceso">
              <p className="offer-process__eyebrow">{processEyebrow}</p>
              <h2 className="offer-process__title">{processTitle}</h2>
              <ol className="offer-process__steps">
                {processSteps.map((step, i) => (
                  <li key={step.index}>
                    <span className="offer-process__icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24">
                        <path d={PROCESS_ICONS[i % PROCESS_ICONS.length]} />
                      </svg>
                    </span>
                    <span className="offer-process__copy">
                      <strong>
                        <span className="offer-process__num">{step.index}</span>{' '}
                        {step.title}
                      </strong>
                      <small>{step.detail}</small>
                    </span>
                  </li>
                ))}
              </ol>
              <button
                type="button"
                className="offer-process__consult"
                id="consultoria"
                onClick={() => openContact('advisory_session')}
              >
                <span className="offer-process__consult-top">
                  <span className="offer-process__consult-tag">{consultTag}</span>
                  <span className="offer-process__consult-arrow" aria-hidden="true">→</span>
                </span>
                <span className="offer-process__consult-title">{consultCta}</span>
                <span className="offer-process__consult-note">{consultNote}</span>
              </button>
              {consultDetailSlug ? (
                <Link
                  href={{
                    pathname: '/services/[slug]',
                    params: { slug: consultDetailSlug },
                  }}
                  className="offer-process__detail-link"
                >
                  {consultDetailLabel ||
                    (isEn ? 'How the strategy session works' : 'Cómo funciona la sesión')}
                </Link>
              ) : null}
            </aside>

            <div className="offer-plans">
              {packages.map((pkg) => {
                const featured = Boolean(pkg.featured || pkg.id === 'gestion-mensual');
                const icon = PLAN_ICONS[pkg.id] || PLAN_ICONS.estrategia;

                return (
                  <article
                    key={pkg.id}
                    className={`offer-plan${featured ? ' offer-plan--featured' : ''}`}
                    id={pkg.id}
                  >
                    <div className="offer-plan__top">
                      <span className="offer-plan__icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24">
                          <path d={icon} />
                        </svg>
                      </span>
                      <span className="offer-plan__ghost" aria-hidden="true">
                        {pkg.index}
                      </span>
                    </div>

                    <h3 className="offer-plan__name">{pkg.name}</h3>
                    {pkg.tag ? (
                      <span className="offer-plan__tag">{pkg.tag}</span>
                    ) : featured ? (
                      <span className="offer-plan__tag">{featuredLabel}</span>
                    ) : null}
                    <p className="offer-plan__pitch">{pkg.pitch}</p>
                    {pkg.priceFrom ? (
                      <p className="offer-plan__price">
                        <strong>{pkg.priceFrom}</strong>
                        <span className="offer-plan__price-note">
                          {isEn
                            ? ' · Final quote by scope'
                            : ' · Cotización final según alcance'}
                        </span>
                      </p>
                    ) : null}

                    <p className="offer-plan__includes-label">{includesLabel}</p>
                    {featured ? (
                      <ul className="offer-plan__tags">
                        {pkg.includes.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    ) : (
                      <ul className="offer-plan__includes">
                        {pkg.includes.map((item, i) => (
                          <li key={item}>
                            <span className="offer-plan__inc-icon" aria-hidden="true">
                              <svg viewBox="0 0 24 24">
                                <path d={INCLUDE_ROW_ICONS[i % INCLUDE_ROW_ICONS.length]} />
                              </svg>
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {pkg.delivery ? (
                      <p className="offer-plan__delivery">
                        <span aria-hidden="true">
                          <svg viewBox="0 0 24 24">
                            <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" />
                          </svg>
                        </span>
                        <span>
                          {deliveryLabel}: {pkg.delivery}
                        </span>
                      </p>
                    ) : null}

                    <button
                      type="button"
                      className={`offer-plan__cta${featured ? ' offer-plan__cta--solid' : ''}`}
                      onClick={() => openContact(`investment_${pkg.id}`)}
                    >
                      <span>{pkg.ctaLabel || ctaLabel}</span>
                      <span aria-hidden="true">→</span>
                    </button>
                    {pkg.detailSlug ? (
                      <Link
                        href={{
                          pathname: '/services/[slug]',
                          params: { slug: pkg.detailSlug },
                        }}
                        className="offer-plan__detail-link"
                      >
                        {pkg.detailLabel ||
                          (isEn ? 'See full service details' : 'Ver detalle del servicio')}
                      </Link>
                    ) : null}
                  </article>
                );
              })}
            </div>
          </div>

          <ul className="offer-values">
            {values.map((value, i) => (
              <li key={value.title}>
                <span className="offer-values__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d={VALUE_ICONS[i % VALUE_ICONS.length]} />
                  </svg>
                </span>
                <strong>{value.title}</strong>
                <small>{value.detail}</small>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="container">
        <div className="plan-help">
          <div className="plan-help__copy">
            <span className="plan-help__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z" />
              </svg>
            </span>
            <div>
              <p className="plan-help__title">{helpTitle}</p>
              <p className="plan-help__body">{helpBody}</p>
              <p className="plan-help__proof">
                {isEn
                  ? '+1.3M organic views · Coca-Cola, Starbucks, H&M, TOTTO, Cine Colombia'
                  : '+1.3M vistas orgánicas · Coca-Cola, Starbucks, H&M, TOTTO, Cine Colombia'}
              </p>
            </div>
          </div>
          <button
            type="button"
            className="plan-help__cta"
            onClick={() => openContact('pricing_help')}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
            <span>{helpCta}</span>
          </button>
        </div>
      </div>

      {faqs.length > 0 ? (
        <div className="container servicios-hub-faqs" id="faqs">
          <FaqSection
            title={isEn ? 'FAQ' : 'Preguntas frecuentes'}
            items={faqs}
          />
        </div>
      ) : null}
    </>
  );
}
