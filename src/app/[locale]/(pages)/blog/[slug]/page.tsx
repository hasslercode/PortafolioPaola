import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { getBlogBySlug, getAllBlogSlugs } from '@/content/loaders';
import type { SiteLocale } from '@/config/site';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { buildBreadcrumbs } from '@/lib/seo/paths';
import { MarkdownBody, extractToc } from '@/components/content/MarkdownBody';
import { FaqSection } from '@/components/content/FaqSection';
import { GeoAnswer } from '@/components/content/GeoAnswer';
import { TableOfContents } from '@/components/content/TableOfContents';
import { AuthorByline } from '@/components/content/AuthorByline';
import { DetailWithHomeArt } from '@/features/home/hubs/DetailWithHomeArt';
import { articlePageGraph } from '@/lib/seo/graphs';
import { JsonLdScript } from '@/components/seo/JsonLdScript';

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return ['es', 'en'].flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getBlogBySlug(slug, locale);
  if (!post) return {};
  return buildPageMetadata({
    locale: locale as SiteLocale,
    title: post.seo?.title ?? post.title,
    description: post.seo?.description ?? post.shortAnswer,
    route: { type: 'blogPost', slug },
    ogType: 'article',
    keywords: post.seo?.keywords ?? [],
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt ?? post.publishedAt,
    absoluteTitle: true,
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = await getBlogBySlug(slug, locale);
  if (!post) notFound();
  const t = await getTranslations({ locale, namespace: 'Blog' });
  const typedLocale = locale as SiteLocale;
  const crumbs = buildBreadcrumbs(typedLocale, [
    { name: t('title'), route: { type: 'hub', hub: 'blog' } },
    { name: post.title, route: { type: 'blogPost', slug } },
  ]);
  const toc = extractToc(post.body);
  const graph = articlePageGraph({
    locale: typedLocale,
    name: post.title,
    description: post.shortAnswer,
    route: { type: 'blogPost', slug },
    breadcrumbs: crumbs,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    keywords: post.seo?.keywords,
    faqs: post.faq,
  });

  return (
    <>
      <JsonLdScript graph={graph} />
      <div className="container" style={{ paddingTop: '1rem' }}>
        <Breadcrumbs items={crumbs} locale={locale} />
      </div>
      <DetailWithHomeArt
        badge={post.intent}
        title={post.title}
        subtitle={<time dateTime={post.publishedAt}>{post.publishedAt}</time>}
        ctaLabel={typedLocale === 'es' ? 'Agendar consulta' : 'Book a consult'}
      >
        <GeoAnswer label={t('shortAnswer')}>
          <p className="text-lg">{post.shortAnswer}</p>
        </GeoAnswer>
        <TableOfContents
          title={typedLocale === 'es' ? 'En este artículo' : 'In this article'}
          items={toc}
        />
        <div className="page-prose">
          <MarkdownBody content={post.body} />
        </div>
        <FaqSection
          title={typedLocale === 'es' ? 'Preguntas frecuentes' : 'FAQ'}
          items={post.faq}
        />
        <AuthorByline locale={typedLocale} />
      </DetailWithHomeArt>
    </>
  );
}
