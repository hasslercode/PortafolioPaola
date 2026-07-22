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
import VerticalArtConnector from '@/features/home/components/VerticalArtConnector';

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
      'asesoría estratégica',
      'consultoría de contenido',
      'producción de contenido',
      'gestión mensual redes',
      tp('pkgMonthlyName'),
    ],
  });
}

function buildInvestmentFaqs(locale: string) {
  return [
    {
      question:
        locale === 'es'
          ? '¿Hay precios fijos?'
          : 'Are there fixed prices?',
      answer:
        locale === 'es'
          ? 'No. Los cuatro planes no tienen tarifas fijas: cada propuesta se ajusta a la empresa, objetivos y carga operativa.'
          : 'No. The four plans have no fixed rates: every proposal is tailored to the company, goals and operational load.',
    },
    {
      question:
        locale === 'es'
          ? '¿Puedo combinar o subir de nivel?'
          : 'Can I combine or upgrade plans?',
      answer:
        locale === 'es'
          ? 'Sí. Muchas marcas empiezan con asesoría o consultoría y luego avanzan a producción o gestión mensual cuando ya hay claridad.'
          : 'Yes. Many brands start with advisory or consulting, then move to production or monthly management once direction is clear.',
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
      id: 'asesoria',
      name: tp('pkgAdvisoryName'),
      price: tp('pkgAdvisoryPrice'),
      period: tp('pkgAdvisoryPeriod'),
      ideal: tp('pkgAdvisoryIdeal'),
    },
    {
      id: 'consultoria',
      name: tp('pkgConsultingName'),
      price: tp('pkgConsultingPrice'),
      period: tp('pkgConsultingPeriod'),
      ideal: tp('pkgConsultingIdeal'),
    },
    {
      id: 'produccion',
      name: tp('pkgProductionName'),
      price: tp('pkgProductionPrice'),
      period: tp('pkgProductionPeriod'),
      ideal: tp('pkgProductionIdeal'),
    },
    {
      id: 'gestion-mensual',
      name: tp('pkgMonthlyName'),
      price: tp('pkgMonthlyPrice'),
      period: tp('pkgMonthlyPeriod'),
      ideal: tp('pkgMonthlyIdeal'),
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
    })),
    faqs,
  });

  return (
    <>
      <JsonLdScript graph={graph} />
      <div className="servicios-hub">
        <div className="container servicios-hub-crumbs">
          <Breadcrumbs items={crumbs} locale={locale} />
        </div>
        <ServicesHubView />
        <VerticalArtConnector mark="heart" />
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
      </div>
    </>
  );
}
