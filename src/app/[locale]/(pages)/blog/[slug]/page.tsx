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
import { RelatedContent } from '@/components/content/RelatedContent';
import { DetailWithHomeArt } from '@/features/home/hubs/DetailWithHomeArt';
import { articlePageGraph } from '@/lib/seo/graphs';
import { JsonLdScript } from '@/components/seo/JsonLdScript';
import { getAllPosts } from '@/content/loaders';
import { buildLocalizedPath } from '@/lib/seo/paths';
import { serviceSlugLocales, type ServiceSlug } from '@/content/registry';

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
  const enNeedsNoIndex = locale === 'en';
  const contentNoIndex = Boolean(post.seo?.noIndex);
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
    // HU-EN-001: EN blog bodies still mixed/ES — avoid hreflang dilution until HU-EN-002
    // Thin stubs can set seo.noIndex until expanded (helpful-content hygiene).
    noIndex: enNeedsNoIndex || contentNoIndex,
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

  const allPosts = await getAllPosts(locale);
  const related = (post.relatedSlugs ?? [])
    .map((relatedSlug) => {
      const match = allPosts.find(
        (entry) =>
          entry.canonicalSlug === relatedSlug ||
          entry.slug.es === relatedSlug ||
          entry.slug.en === relatedSlug,
      );
      if (!match) return null;
      return {
        href: buildLocalizedPath(typedLocale, {
          type: 'blogPost',
          slug: match.canonicalSlug,
        }),
        title: match.title,
      };
    })
    .filter(Boolean) as Array<{ href: string; title: string }>;

  if (post.serviceCta && post.serviceCta in serviceSlugLocales) {
    const serviceSlug = post.serviceCta as ServiceSlug;
    related.push({
      href: buildLocalizedPath(typedLocale, {
        type: 'service',
        slug: serviceSlug,
      }),
      title:
        typedLocale === 'es'
          ? `Servicio: ${serviceSlugLocales[serviceSlug].es}`
          : `Service: ${serviceSlugLocales[serviceSlug].en}`,
    });
  }

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
        ctaLabel={typedLocale === 'es' ? 'Contactar por correo' : 'Contact by email'}
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
        <RelatedContent
          title={typedLocale === 'es' ? 'Sigue explorando' : 'Keep exploring'}
          items={related}
        />
        <AuthorByline locale={typedLocale} />
      </DetailWithHomeArt>
    </>
  );
}
