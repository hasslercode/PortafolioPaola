'use client';

import { Link } from '@/i18n/routing';
import { useI18n } from '@/features/home/HomeContentProvider';
import { trackBlogClick } from '@/features/home/utils/analytics';

export type HomeBlogTeaser = {
  slug: string;
  title: string;
  description: string;
  topic?: string;
};

const TOPIC_LABELS: Record<string, { es: string; en: string }> = {
  production: { es: 'Video', en: 'Video' },
  ugc: { es: 'UGC', en: 'UGC' },
  strategy: { es: 'Estrategia', en: 'Strategy' },
  local: { es: 'Local', en: 'Local' },
  comparison: { es: 'Comparativa', en: 'Comparison' },
  entrepreneurs: { es: 'Emprendedores', en: 'Founders' },
  video: { es: 'Video', en: 'Video' },
  marketing: { es: 'Marketing', en: 'Marketing' },
};

/** Home blog teaser — 3 commercial pillars (SITE-IA). */
export function BlogPreview({ posts }: { posts: HomeBlogTeaser[] }) {
  const { locale } = useI18n();
  const preview = posts.slice(0, 3);
  if (preview.length === 0) return null;

  const title = locale === 'en' ? 'Guides that help you decide' : 'Guías que te ayudan a decidir';
  const subtitle =
    locale === 'en'
      ? 'Clear answers on Reels, UGC and pricing for brands in Colombia.'
      : 'Respuestas claras sobre Reels, UGC y precios para marcas en Colombia.';
  const seeAll = locale === 'en' ? 'View all articles' : 'Ver todos los artículos';
  const read = locale === 'en' ? 'Read' : 'Leer';

  return (
    <section className="blog-hub blog-hub--preview" id="blog-preview" aria-labelledby="blog-preview-title">
      <div className="container blog-hub__container">
        <header className="blog-hub__header">
          <span className="blog-hub__eyebrow">Blog</span>
          <h2 id="blog-preview-title" className="blog-hub__title">
            {title}
          </h2>
          <p className="blog-hub__summary">{subtitle}</p>
        </header>

        <div className="blog-hub__grid">
          {preview.map((post) => {
            const topicKey = post.topic || '';
            const topicLabel = TOPIC_LABELS[topicKey]?.[locale === 'en' ? 'en' : 'es'];

            return (
              <article key={post.slug} className="blog-card blog-card--preview">
                <Link
                  href={{ pathname: '/blog/[slug]', params: { slug: post.slug } }}
                  className="blog-card__link"
                  onClick={() => trackBlogClick(post.slug, 'home_preview')}
                >
                  {topicLabel ? (
                    <span className="blog-card__topic">{topicLabel}</span>
                  ) : null}
                  <h3 className="blog-card__title">{post.title}</h3>
                  <p className="blog-card__excerpt">{post.description}</p>
                  <span className="blog-card__cta">
                    {read}
                    <span aria-hidden="true"> →</span>
                  </span>
                </Link>
              </article>
            );
          })}
        </div>

        <p className="blog-hub__more">
          <Link href="/blog" className="btn-pill">
            {seeAll}
          </Link>
        </p>
      </div>
    </section>
  );
}
