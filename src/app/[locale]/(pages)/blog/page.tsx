import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { getAllPosts } from '@/content/loaders';
import type { SiteLocale } from '@/config/site';
import { routing } from '@/i18n/routing';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { buildBreadcrumbs } from '@/lib/seo/paths';
import { hubGraph } from '@/lib/seo/graphs';
import { JsonLdScript } from '@/components/seo/JsonLdScript';
import { BlogHubView } from '@/features/home/hubs/ContentHubViews';

type PageProps = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Blog' });
  return buildPageMetadata({
    locale: locale as SiteLocale,
    title: t('metaTitle'),
    description: t('metaDescription'),
    route: { type: 'hub', hub: 'blog' },
  });
}

export default async function BlogIndexPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'Blog' });
  const posts = await getAllPosts(locale);
  const crumbs = buildBreadcrumbs(locale as SiteLocale, [
    { name: t('title'), route: { type: 'hub', hub: 'blog' } },
  ]);
  const graph = hubGraph({
    locale: locale as SiteLocale,
    route: { type: 'hub', hub: 'blog' },
    name: t('title'),
    description: t('metaDescription'),
    breadcrumbs: crumbs,
  });

  return (
    <>
      <JsonLdScript graph={graph} />
      <div className="container" style={{ paddingTop: '1rem' }}>
        <Breadcrumbs items={crumbs} locale={locale} />
      </div>
      <BlogHubView
        eyebrow="Blog"
        title={t('title')}
        summary={t('summary')}
        rssHref={`/${locale}/feed.xml`}
        posts={posts.map((post) => ({
          slug: post.canonicalSlug,
          title: post.title,
          description: post.shortAnswer,
          topic: post.topic,
        }))}
      />
    </>
  );
}
