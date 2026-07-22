'use client';

import { useMemo, useState } from 'react';
import { Link } from '@/i18n/routing';
import { useI18n } from '@/features/home/HomeContentProvider';
import { useContentActions } from '@/features/home/PageChrome';
import { FaqSection } from '@/components/content/FaqSection';

export type BlogTopic = 'seo' | 'instagram' | 'tiktok' | 'branding' | 'marketing';

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
};

const ALL_TOPICS: BlogTopic[] = [
  'seo',
  'instagram',
  'tiktok',
  'branding',
  'marketing',
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
  priceFrom?: string;
  priceValue?: string;
};

export type AdvisorySession = {
  badge: string;
  title: string;
  pitch: string;
  note: string;
  ctaLabel: string;
  includesLabel: string;
  excludesLabel: string;
  includes: Array<{ title: string; detail: string }>;
  excludes: string[];
  highlights: Array<{ title: string; detail: string }>;
  assurance: string;
};

const SESSION_ICON =
  'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z';

const PLAN_ICONS: Record<string, string> = {
  estrategia:
    'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
  produccion:
    'M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4zm0 14H4V8h16v10z',
  'gestion-mensual':
    'M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .55-.45 1-1 1H6c-.55 0-1-.45-1-1v-1h14v1z',
};

const HIGHLIGHT_ICONS = [
  'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
  'M12 2l2.4 7.2H22l-6 4.8 2.3 7L12 16.8 5.7 21 8 14 2 9.2h7.6L12 2z',
  'M19 3H5c-1.1 0-2 .9-2 2v14l4-4h12c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z',
];

const INCLUDE_ICONS = [
  'M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z',
  'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z',
  'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z',
];

const EXCLUDE_ICONS = [
  'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z',
  'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z',
  'M2.01 21L23 12 2.01 3 2 10l15 2-15 2z',
];


export function PricingHubView({
  badge,
  title,
  summary,
  plansTitle,
  plansSummary,
  disclaimer,
  includesLabel,
  fromLabel,
  featuredLabel,
  helpTitle,
  helpBody,
  helpCta,
  ctaLabel,
  session,
  packages,
  faqs,
}: {
  badge: string;
  title: string;
  summary: string;
  plansTitle: string;
  plansSummary: string;
  disclaimer: string;
  includesLabel: string;
  fromLabel: string;
  featuredLabel: string;
  helpTitle: string;
  helpBody: string;
  helpCta: string;
  ctaLabel: string;
  session: AdvisorySession;
  packages: InvestmentPackage[];
  faqs: Array<{ question: string; answer: string }>;
}) {
  const { locale } = useI18n();
  const { openContact } = useContentActions();
  const isEn = locale === 'en';

  return (
    <>
      <section className="services-wow services-wow--compact plan-showcase" id="inversion">
        <div className="container">
          <div className="services-wow__header plan-showcase__intro">
            <span className="badge-pill-wow">{badge}</span>
            <div className="section-header-wow">
              <span className="plan-showcase__scrap plan-showcase__scrap--heart scrap-heart-shape" aria-hidden="true" />
              <span className="plan-showcase__scrap plan-showcase__scrap--sparkle" aria-hidden="true">✦</span>
              <h1 className="wow-main-title">{title}</h1>
              <p className="wow-subtitle">{summary}</p>
            </div>
          </div>

          <article className="session-board" id="consultoria">
            <span className="session-board__grid" aria-hidden="true" />
            <span className="session-board__ghost" aria-hidden="true">01</span>
            <span className="session-board__sparkle session-board__sparkle--a" aria-hidden="true">✦</span>
            <span className="session-board__sparkle session-board__sparkle--b" aria-hidden="true">✦</span>

            <div className="session-board__layout">
              <div className="session-board__overview">
                <div className="session-board__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d={SESSION_ICON} />
                  </svg>
                </div>
                <span className="session-board__badge">{session.badge}</span>
                <h2 className="session-board__title">{session.title}</h2>
                <p className="session-board__pitch">{session.pitch}</p>
                <p className="session-board__note">
                  <span aria-hidden="true">✦</span>
                  <span>{session.note}</span>
                </p>
                <ul className="session-board__highlights">
                  {session.highlights.map((item, i) => (
                    <li key={item.title}>
                      <span className="session-board__hi-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24">
                          <path d={HIGHLIGHT_ICONS[i % HIGHLIGHT_ICONS.length]} />
                        </svg>
                      </span>
                      <span>
                        <strong>{item.title}</strong>
                        <small>{item.detail}</small>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="session-board__includes">
                <p className="session-board__panel-label">
                  <span aria-hidden="true">✓</span>
                  {session.includesLabel}
                </p>
                <ul>
                  {session.includes.map((item, i) => (
                    <li key={item.title}>
                      <span className="session-board__item-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24">
                          <path d={INCLUDE_ICONS[i % INCLUDE_ICONS.length]} />
                        </svg>
                      </span>
                      <span>
                        <strong>{item.title}</strong>
                        <small>{item.detail}</small>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="session-board__side">
                <div className="session-board__excludes">
                  <p className="session-board__panel-label">
                    <span aria-hidden="true">✕</span>
                    {session.excludesLabel}
                  </p>
                  <ul>
                    {session.excludes.map((item, i) => (
                      <li key={item}>
                        <span className="session-board__item-icon" aria-hidden="true">
                          <svg viewBox="0 0 24 24">
                            <path d={EXCLUDE_ICONS[i % EXCLUDE_ICONS.length]} />
                          </svg>
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  type="button"
                  className="session-board__cta"
                  onClick={() => openContact('advisory_session')}
                >
                  <span>{session.ctaLabel}</span>
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </div>

            <p className="session-board__assurance">
              <span className="session-board__assurance-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
                </svg>
              </span>
              <span>{session.assurance}</span>
            </p>
          </article>

          <div className="plan-showcase__plans-header">
            <span className="badge-pill-wow">{isEn ? 'Plans' : 'Planes'}</span>
            <h2 className="plan-showcase__plans-title">{plansTitle}</h2>
            <p className="wow-subtitle">{plansSummary}</p>
          </div>

          <div className="plan-showcase__grid">
            {packages.map((pkg, index) => {
              const featured = Boolean(pkg.featured || pkg.id === 'gestion-mensual');
              const icon = PLAN_ICONS[pkg.id] || PLAN_ICONS.estrategia;

              return (
                <article
                  key={pkg.id}
                  className={`plan-card plan-card--${pkg.id}${featured ? ' plan-card--featured' : ''}`}
                  id={pkg.id}
                  style={{ ['--plan-delay' as string]: `${index * 80}ms` }}
                >
                  <span className="plan-card__shine" aria-hidden="true" />
                  <span className="plan-card__ghost" aria-hidden="true">
                    {pkg.index}
                  </span>

                  {featured ? (
                    <span className="plan-card__badge">
                      <span aria-hidden="true">★</span> {featuredLabel}
                    </span>
                  ) : null}

                  <div className="plan-card__icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <path d={icon} />
                    </svg>
                  </div>

                  <h3 className="plan-card__title">{pkg.name}</h3>
                  <p className="plan-card__pitch">{pkg.pitch}</p>

                  <p className="plan-card__includes-label">{includesLabel}</p>
                  <ul className="plan-card__includes plan-card__includes--pills">
                    {pkg.includes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>

                  {pkg.note ? <p className="plan-card__note">{pkg.note}</p> : null}

                  <div className="plan-card__footer">
                    <div className="plan-card__price">
                      <span className="plan-card__from">{fromLabel}</span>
                      <span className="plan-card__amount">
                        {pkg.priceValue || (isEn ? 'Custom quote' : 'Cotización')}
                      </span>
                    </div>

                    <button
                      type="button"
                      className={`plan-card__cta${featured ? ' plan-card__cta--solid' : ''}`}
                      onClick={() => openContact(`investment_${pkg.id}`)}
                    >
                      <span>{pkg.ctaLabel || ctaLabel}</span>
                      <span aria-hidden="true">→</span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          {disclaimer ? (
            <p className="wow-subtitle investment-disclaimer">{disclaimer}</p>
          ) : null}
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
