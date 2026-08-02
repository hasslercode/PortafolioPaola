'use client';

import { Link } from '@/i18n/routing';
import FadeUp from '@/features/home/components/FadeUp';
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

/** Home blog teaser — scrapbook cards (styles live in main.css, not seo.css). */
export function BlogPreview({ posts }: { posts: HomeBlogTeaser[] }) {
  const { locale } = useI18n();
  const preview = posts.slice(0, 3);
  if (preview.length === 0) return null;

  const copy =
    locale === 'en'
      ? {
          badge: 'Blog',
          titleBefore: 'Guides that help you',
          titleScript: 'decide',
          subtitle: 'Clear answers on Reels, UGC and pricing for brands in Colombia.',
          seeAll: 'View all articles',
          read: 'Read guide',
        }
      : {
          badge: 'Blog',
          titleBefore: 'Guías que te ayudan a',
          titleScript: 'decidir',
          subtitle: 'Respuestas claras sobre Reels, UGC y precios para marcas en Colombia.',
          seeAll: 'Ver todos los artículos',
          read: 'Leer guía',
        };

  return (
    <section className="home-blog" id="blog-preview" aria-labelledby="home-blog-title">
      <div className="container">
        <FadeUp as="header" className="home-blog__header" index={0}>
          <span className="home-blog__badge" aria-hidden="true">
            {copy.badge}
          </span>
          <h2 id="home-blog-title" className="home-blog__title">
            <span>{copy.titleBefore}</span>{' '}
            <span className="home-blog__title-script">{copy.titleScript}</span>
          </h2>
          <p className="home-blog__subtitle">{copy.subtitle}</p>
        </FadeUp>

        <div className="home-blog__grid">
          {preview.map((post, index) => {
            const topicKey = post.topic || '';
            const topicLabel =
              TOPIC_LABELS[topicKey]?.[locale === 'en' ? 'en' : 'es'] || copy.badge;

            return (
              <FadeUp
                key={post.slug}
                as="article"
                className="home-blog__card"
                index={index + 1}
              >
                <Link
                  href={{ pathname: '/blog/[slug]', params: { slug: post.slug } }}
                  className="home-blog__link"
                  onClick={() => trackBlogClick(post.slug, 'home_preview')}
                >
                  <div className="home-blog__card-top">
                    <span className="home-blog__index" aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="home-blog__topic">{topicLabel}</span>
                  </div>
                  <h3 className="home-blog__card-title">{post.title}</h3>
                  <p className="home-blog__excerpt">{post.description}</p>
                  <span className="home-blog__cta">
                    <span>{copy.read}</span>
                    <span className="home-blog__cta-arrow" aria-hidden="true">
                      →
                    </span>
                  </span>
                </Link>
              </FadeUp>
            );
          })}
        </div>

        <FadeUp as="p" className="home-blog__more" index={4}>
          <Link href="/blog" className="btn-pill-premium">
            {copy.seeAll}
          </Link>
        </FadeUp>
      </div>
    </section>
  );
}
