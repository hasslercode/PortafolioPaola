'use client';

import { Link } from '@/i18n/routing';
import { useI18n } from '@/features/home/HomeContentProvider';

export type HomeBlogTeaser = {
  slug: string;
  title: string;
  description: string;
};

/** Home blog teaser — 3 latest articles (SITE-IA). */
export function BlogPreview({ posts }: { posts: HomeBlogTeaser[] }) {
  const { locale } = useI18n();
  const preview = posts.slice(0, 3);
  if (preview.length === 0) return null;

  const title = locale === 'en' ? 'Ideas that convert' : 'Ideas que convierten';
  const subtitle =
    locale === 'en'
      ? 'Practical notes on SEO, social and brand growth.'
      : 'Notas prácticas sobre SEO, redes y crecimiento de marca.';
  const seeAll = locale === 'en' ? 'View all articles' : 'Ver todos los artículos';
  const read = locale === 'en' ? 'Read article' : 'Leer artículo';

  return (
    <section className="services-wow" id="blog-preview" aria-labelledby="blog-preview-title">
      <div className="container">
        <div className="services-wow__header">
          <span className="badge-pill-wow">Blog</span>
          <div className="section-header-wow">
            <span
              className="services-scrap services-scrap--heart scrap-heart-shape"
              aria-hidden="true"
            />
            <div className="fluid-orbit-container">
              <div className="fluid-ellipse ellipse-1" />
              <div className="fluid-ellipse ellipse-2" />
              <h2 id="blog-preview-title" className="wow-main-title">
                {title}
              </h2>
            </div>
            <p className="wow-subtitle">{subtitle}</p>
          </div>
        </div>

        <div className="services-grid-wow">
          {preview.map((post, index) => (
            <article
              key={post.slug}
              className={`service-card-wow service-card-wow--${(index % 5) + 1}`}
            >
              <Link
                href={{ pathname: '/blog/[slug]', params: { slug: post.slug } }}
                className="service-card-wow__link"
              >
                <h3 className="service-title-script" style={{ fontSize: '1.35rem' }}>
                  {post.title}
                </h3>
                <p>{post.description}</p>
                <span className="campaign-card__case-link">{read}</span>
              </Link>
            </article>
          ))}
        </div>

        <p style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link href="/blog" className="btn-pill">
            {seeAll}
          </Link>
        </p>
      </div>
    </section>
  );
}
