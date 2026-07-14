import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { buildPageMetadata } from '@/lib/seo/metadata';
import type { SiteLocale } from '@/config/site';
import { routing } from '@/i18n/routing';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { buildBreadcrumbs } from '@/lib/seo/paths';
import { hubGraph } from '@/lib/seo/graphs';
import { JsonLdScript } from '@/components/seo/JsonLdScript';
import { AboutHubView } from '@/features/home/hubs/AboutHubView';

type PageProps = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'About' });
  return buildPageMetadata({
    locale: locale as SiteLocale,
    title: t('metaTitle'),
    description: t('metaDescription'),
    route: { type: 'hub', hub: 'about' },
    keywords: [
      'paola hoyos',
      'estratega digital colombia',
      'comunicadora social',
      'medellín remoto',
    ],
  });
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'About' });
  const crumbs = buildBreadcrumbs(locale as SiteLocale, [
    { name: t('title'), route: { type: 'hub', hub: 'about' } },
  ]);
  const graph = hubGraph({
    locale: locale as SiteLocale,
    route: { type: 'hub', hub: 'about' },
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
      <AboutHubView />
    </>
  );
}
