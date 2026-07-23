import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { buildPageMetadata } from '@/lib/seo/metadata';
import type { SiteLocale } from '@/config/site';
import { routing } from '@/i18n/routing';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { buildBreadcrumbs } from '@/lib/seo/paths';
import { hubGraph } from '@/lib/seo/graphs';
import { JsonLdScript } from '@/components/seo/JsonLdScript';
import { CaseStudiesHubView } from '@/features/home/hubs/CaseStudiesHubView';
import { getAllCaseStudies } from '@/content/loaders';
import { absoluteUrl, buildLocalizedPath } from '@/lib/seo/paths';

type PageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'CaseStudies' });

  return buildPageMetadata({
    locale: locale as SiteLocale,
    title: t('metaTitleMerged'),
    description: t('metaDescriptionMerged'),
    route: { type: 'hub', hub: 'caseStudies' },
  });
}

export default async function CaseStudiesIndexPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'CaseStudies' });
  const typedLocale = locale as SiteLocale;
  const cases = await getAllCaseStudies(locale);
  const crumbs = buildBreadcrumbs(typedLocale, [
    { name: t('badgeMerged'), route: { type: 'hub', hub: 'caseStudies' } },
  ]);
  const graph = hubGraph({
    locale: typedLocale,
    route: { type: 'hub', hub: 'caseStudies' },
    name: t('titleMerged'),
    description: t('metaDescriptionMerged'),
    breadcrumbs: crumbs,
    itemListName: t('titleMerged'),
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
      <CaseStudiesHubView />
    </>
  );
}
