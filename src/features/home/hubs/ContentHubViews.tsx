'use client';

import { useMemo, useState } from 'react';
import { Link } from '@/i18n/routing';
import { useI18n } from '@/features/home/HomeContentProvider';
import { useContentActions } from '@/features/home/PageChrome';
import VerticalArtConnector from '@/features/home/components/VerticalArtConnector';
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
};

export function PricingHubView({
  badge,
  title,
  summary,
  disclaimer,
  includesLabel,
  ctaLabel,
  packages,
  faqs,
}: {
  badge: string;
  title: string;
  summary: string;
  disclaimer: string;
  includesLabel: string;
  ctaLabel: string;
  packages: InvestmentPackage[];
  faqs: Array<{ question: string; answer: string }>;
}) {
  const { locale } = useI18n();
  const { openContact } = useContentActions();
  const isEn = locale === 'en';

  return (
    <>
      <section className="services-wow services-wow--compact" id="inversion">
        <div className="container">
          <div className="services-wow__header">
            <span className="badge-pill-wow">{badge}</span>
            <div className="section-header-wow">
              <h1 className="wow-main-title">{title}</h1>
              <p className="wow-subtitle">{summary}</p>
            </div>
          </div>

          <div className="plan-rail">
            {packages.map((pkg) => {
              const variant =
                pkg.featured || pkg.id === 'gestion-mensual'
                  ? 'premium'
                  : pkg.id === 'produccion'
                    ? 'production'
                    : 'strategy';

              return (
                <article
                  key={pkg.id}
                  className={`offer-card offer-card--${variant} offer-card--plan${
                    pkg.featured || pkg.id === 'gestion-mensual'
                      ? ' offer-card--featured'
                      : ''
                  }`}
                  id={pkg.id}
                >
                  <span className="offer-card__ghost" aria-hidden="true">
                    {pkg.index}
                  </span>

                  <div className="offer-card__head">
                    <span className="offer-card__eyebrow">
                      {pkg.featured || pkg.id === 'gestion-mensual'
                        ? isEn
                          ? 'Premium'
                          : 'Premium'
                        : `${pkg.index}`}
                    </span>
                    <h2 className="offer-card__title offer-card__title--plan">
                      {pkg.name}
                    </h2>
                  </div>

                  <p className="offer-card__pitch">{pkg.pitch}</p>

                  <p className="offer-card__includes-label">{includesLabel}</p>
                  <ul className={`offer-card__includes offer-card__includes--${variant}`}>
                    {pkg.includes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>

                  {pkg.note ? (
                    <p className="offer-card__tagline">{pkg.note}</p>
                  ) : null}

                  <div className="offer-card__cta">
                    <button
                      type="button"
                      className={
                        pkg.featured || pkg.id === 'gestion-mensual'
                          ? 'btn-pill-premium btn-pill-premium--on-dark'
                          : 'btn-pill-premium'
                      }
                      onClick={() => openContact(`investment_${pkg.id}`)}
                    >
                      {pkg.ctaLabel || ctaLabel}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          <p className="wow-subtitle investment-disclaimer">{disclaimer}</p>
        </div>
      </section>

      <VerticalArtConnector mark="sparkle" />

      <div className="container servicios-hub-faqs" id="faqs">
        <FaqSection
          title={isEn ? 'FAQ' : 'Preguntas frecuentes'}
          items={faqs}
        />
      </div>

      <VerticalArtConnector mark="heart" />

      <div id="cta" className="container servicios-hub-cta">
        <button
          type="button"
          className="btn-pill-premium"
          onClick={() => openContact('pricing_cta')}
        >
          {isEn ? "Let's talk about your brand" : 'Hablemos de tu marca'}
        </button>
      </div>
    </>
  );
}
