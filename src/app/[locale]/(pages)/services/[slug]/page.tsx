import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { buildPageMetadata } from '@/lib/seo/metadata';
import type { SiteLocale } from '@/config/site';
import {
  getAllLocalizedServiceParams,
  resolveServiceOrNotFound,
} from '@/features/services/routing';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import {
  buildBreadcrumbs,
  resolveCanonicalServiceSlug,
} from '@/lib/seo/paths';
import type { ServiceSlug } from '@/content/registry';
import { MarkdownBody, extractToc } from '@/components/content/MarkdownBody';
import { FaqSection } from '@/components/content/FaqSection';
import { GeoAnswer } from '@/components/content/GeoAnswer';
import { TableOfContents } from '@/components/content/TableOfContents';
import { AuthorByline } from '@/components/content/AuthorByline';
import { DetailWithHomeArt } from '@/features/home/hubs/DetailWithHomeArt';
import { servicePageGraph } from '@/lib/seo/graphs';
import { JsonLdScript } from '@/components/seo/JsonLdScript';

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  return getAllLocalizedServiceParams();
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = await resolveServiceOrNotFound(slug, locale);
  const canonical = resolveCanonicalServiceSlug(slug) as ServiceSlug;

  return buildPageMetadata({
    locale: locale as SiteLocale,
    title: service.seo?.title ?? service.title,
    description: service.seo?.description ?? service.shortAnswer,
    route: { type: 'service', slug: canonical },
    keywords: service.seo?.keywords ?? [],
    absoluteTitle: true,
  });
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const service = await resolveServiceOrNotFound(slug, locale);
  const t = await getTranslations({ locale, namespace: 'Services' });
  const typedLocale = locale as SiteLocale;
  const canonical = resolveCanonicalServiceSlug(slug) as ServiceSlug;
  const crumbs = buildBreadcrumbs(typedLocale, [
    { name: t('badge'), route: { type: 'hub', hub: 'services' } },
    {
      name: service.title,
      route: { type: 'service', slug: canonical },
    },
  ]);
  const toc = extractToc(service.body);

  const graph = servicePageGraph({
    locale: typedLocale,
    name: service.title,
    description: service.shortAnswer,
    serviceType: service.title,
    route: { type: 'service', slug: canonical },
    breadcrumbs: crumbs,
    faqs: service.faq,
  });

  return (
    <>
      <JsonLdScript graph={graph} />
      <div className="container" style={{ paddingTop: '1rem' }}>
        <Breadcrumbs items={crumbs} locale={locale} />
      </div>
      <DetailWithHomeArt
        badge={t('badge')}
        title={service.title}
        subtitle={service.summary}
        ctaLabel={t('cta')}
      >
        <GeoAnswer label={t('shortAnswer')}>
          <p className="text-lg">{service.shortAnswer}</p>
        </GeoAnswer>
        <TableOfContents
          title={typedLocale === 'es' ? 'En esta página' : 'On this page'}
          items={toc}
        />
        <div className="page-prose">
          <MarkdownBody content={service.body} />
        </div>
        <FaqSection title={t('faq')} items={service.faq} />
        <AuthorByline locale={typedLocale} />
      </DetailWithHomeArt>
    </>
  );
}
