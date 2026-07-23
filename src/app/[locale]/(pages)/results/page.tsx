import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { buildPageMetadata } from '@/lib/seo/metadata';
import type { SiteLocale } from '@/config/site';
import { routing } from '@/i18n/routing';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { absoluteUrl, buildBreadcrumbs, buildLocalizedPath } from '@/lib/seo/paths';
import { hubGraph } from '@/lib/seo/graphs';
import { JsonLdScript } from '@/components/seo/JsonLdScript';
import { ResultsHubView } from '@/features/home/hubs/ResultsHubView';
import { getAllCaseStudies } from '@/content/loaders';

type PageProps = { params: Promise<{ locale: string }> };

/** Stable content epoch for metrics page */
const LAST_UPDATED = '2026-03-01';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Results' });
  return buildPageMetadata({
    locale: locale as SiteLocale,
    title: t('metaTitle'),
    description: t('metaDescription'),
    route: { type: 'hub', hub: 'results' },
    keywords: [
      'resultados orgánicos colombia',
      'métricas contenido digital',
      'casos coca-cola starbucks hm',
    ],
  });
}

export default async function ResultsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'Results' });
  const typedLocale = (locale === 'en' ? 'en' : 'es') as SiteLocale;
  const cases = await getAllCaseStudies(locale);
  const crumbs = buildBreadcrumbs(typedLocale, [
    { name: t('title'), route: { type: 'hub', hub: 'results' } },
  ]);
  const graph = hubGraph({
    locale: typedLocale,
    route: { type: 'hub', hub: 'results' },
    name: t('title'),
    description: t('metaDescription'),
    breadcrumbs: crumbs,
    itemListName: t('brandListTitle'),
    itemList: cases.map((study) => ({
      name: study.brand,
      url: absoluteUrl(
        buildLocalizedPath(typedLocale, {
          type: 'caseStudy',
          slug: study.canonicalSlug,
        }),
      ),
    })),
  });

  return (
    <>
      <JsonLdScript graph={graph} />
      <div className="container" style={{ paddingTop: '1rem' }}>
        <Breadcrumbs items={crumbs} locale={locale} />
      </div>
      <header className="container results-hub-intro">
        <p className="results-hub-intro__eyebrow">{t('eyebrow')}</p>
        <h1 className="results-hub-intro__title">{t('title')}</h1>
        <p className="results-hub-intro__summary">{t('summary')}</p>
      </header>
      <ResultsHubView lastUpdated={LAST_UPDATED} lastUpdatedLabel={t('lastUpdated')} />
    </>
  );
}
