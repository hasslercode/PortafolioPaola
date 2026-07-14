import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { buildPageMetadata } from '@/lib/seo/metadata';
import type { SiteLocale } from '@/config/site';
import { routing } from '@/i18n/routing';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { buildBreadcrumbs } from '@/lib/seo/paths';
import { hubGraph } from '@/lib/seo/graphs';
import { JsonLdScript } from '@/components/seo/JsonLdScript';
import { ServicesHubView } from '@/features/home/hubs/ServicesHubView';
import { PricingHubView } from '@/features/home/hubs/ContentHubViews';
import SectionDivider from '@/features/home/components/SectionDivider';

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
  const t = await getTranslations({ locale, namespace: 'Services' });
  const tp = await getTranslations({ locale, namespace: 'Pricing' });

  return buildPageMetadata({
    locale: locale as SiteLocale,
    title: t('metaTitleMerged'),
    description: t('metaDescriptionMerged'),
    route: { type: 'hub', hub: 'services' },
    keywords: [
      'servicios estrategia digital colombia',
      'community manager',
      'inversión community manager colombia',
      'creación de contenido',
      tp('pkgSocialName'),
    ],
  });
}

function buildInvestmentFaqs(locale: string) {
  return [
    {
      question:
        locale === 'es'
          ? '¿Estos valores son fijos?'
          : 'Are these amounts fixed?',
      answer:
        locale === 'es'
          ? 'Son rangos de partida. Cada propuesta se personaliza según objetivos, canales y volumen de contenido.'
          : 'These are starting ranges. Every proposal is customized to goals, channels and content volume.',
    },
    {
      question:
        locale === 'es'
          ? '¿Puedo combinar servicios?'
          : 'Can I combine services?',
      answer:
        locale === 'es'
          ? 'Sí. La mayoría de marcas combina consultoría + contenido o gestión mensual + cobertura de eventos.'
          : 'Yes. Most brands combine consulting + content or monthly management + event coverage.',
    },
  ];
}

export default async function ServicesIndexPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'Services' });
  const tp = await getTranslations({ locale, namespace: 'Pricing' });
  const crumbs = buildBreadcrumbs(locale as SiteLocale, [
    { name: t('badge'), route: { type: 'hub', hub: 'services' } },
  ]);
  const faqs = buildInvestmentFaqs(locale);
  const packages = [
    {
      id: 'consultoria',
      name: tp('pkgStrategyName'),
      price: tp('pkgStrategyPrice'),
      period: tp('pkgStrategyPeriod'),
      ideal: tp('pkgStrategyIdeal'),
      lowPrice: 250000,
    },
    {
      id: 'redes',
      name: tp('pkgSocialName'),
      price: tp('pkgSocialPrice'),
      period: tp('pkgSocialPeriod'),
      ideal: tp('pkgSocialIdeal'),
      lowPrice: 1200000,
    },
    {
      id: 'contenido',
      name: tp('pkgContentName'),
      price: tp('pkgContentPrice'),
      period: tp('pkgContentPeriod'),
      ideal: tp('pkgContentIdeal'),
      lowPrice: 600000,
    },
    {
      id: 'eventos',
      name: tp('pkgEventsName'),
      price: tp('pkgEventsPrice'),
      period: tp('pkgEventsPeriod'),
      ideal: tp('pkgEventsIdeal'),
      lowPrice: 500000,
    },
  ];

  const graph = hubGraph({
    locale: locale as SiteLocale,
    route: { type: 'hub', hub: 'services' },
    name: t('titleMerged'),
    description: t('metaDescriptionMerged'),
    breadcrumbs: crumbs,
    offers: packages.map((pkg) => ({
      name: pkg.name,
      description: pkg.ideal,
      lowPrice: pkg.lowPrice,
      highPrice: pkg.lowPrice,
    })),
    faqs,
  });

  return (
    <>
      <JsonLdScript graph={graph} />
      <div className="container" style={{ paddingTop: '1rem' }}>
        <Breadcrumbs items={crumbs} locale={locale} />
      </div>
      <ServicesHubView />
      <SectionDivider />
      <PricingHubView
        badge={tp('badge')}
        title={tp('title')}
        summary={tp('summary')}
        disclaimer={tp('disclaimer')}
        fromLabel={tp('fromLabel')}
        idealLabel={tp('idealLabel')}
        ctaLabel={tp('cta')}
        packages={packages.map(({ id, name, price, period, ideal }) => ({
          id,
          name,
          price,
          period,
          ideal,
        }))}
        faqs={faqs}
      />
    </>
  );
}
