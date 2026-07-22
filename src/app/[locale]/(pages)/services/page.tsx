import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { buildPageMetadata } from '@/lib/seo/metadata';
import type { SiteLocale } from '@/config/site';
import { routing } from '@/i18n/routing';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { buildBreadcrumbs } from '@/lib/seo/paths';
import { hubGraph } from '@/lib/seo/graphs';
import { JsonLdScript } from '@/components/seo/JsonLdScript';
import { PricingHubView } from '@/features/home/hubs/ContentHubViews';

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
      'sesión estratégica',
      'estrategia de contenido',
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
          ? '¿Por dónde empiezo?'
          : 'Where should I start?',
      answer:
        locale === 'es'
          ? 'Si necesitas claridad, la consultoría. Si ya sabes el mensaje, producción o gestión mensual.'
          : 'Need clarity? Start with consulting. Already know the message? Production or monthly management.',
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
      index: '01',
      name: tp('pkgSessionName'),
      pitch: tp('pkgSessionPitch'),
      includes: [tp('pkgSessionInc1'), tp('pkgSessionInc2'), tp('pkgSessionInc3')],
      priceValue: tp('pkgSessionPrice'),
      ctaLabel: tp('pkgSessionCta'),
    },
    {
      id: 'estrategia',
      index: '02',
      name: tp('pkgStrategyName'),
      pitch: tp('pkgStrategyPitch'),
      includes: [
        tp('pkgStrategyInc1'),
        tp('pkgStrategyInc3'),
        tp('pkgStrategyInc5'),
      ],
      priceValue: tp('pkgStrategyPrice'),
      ctaLabel: tp('pkgStrategyCta'),
    },
    {
      id: 'produccion',
      index: '03',
      name: tp('pkgProductionName'),
      pitch: tp('pkgProductionPitch'),
      includes: [
        tp('pkgProductionInc1'),
        tp('pkgProductionInc2'),
        tp('pkgProductionInc3'),
      ],
      priceValue: tp('pkgProductionPrice'),
      ctaLabel: tp('pkgProductionCta'),
    },
    {
      id: 'gestion-mensual',
      index: '04',
      name: tp('pkgMonthlyName'),
      pitch: tp('pkgMonthlyPitch'),
      includes: [
        tp('pkgMonthlyInc1'),
        tp('pkgMonthlyInc2'),
        tp('pkgMonthlyInc3'),
        tp('pkgMonthlyInc4'),
      ],
      priceValue: tp('pkgMonthlyPrice'),
      ctaLabel: tp('pkgMonthlyCta'),
      featured: true,
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
      description: pkg.pitch,
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
        <PricingHubView
          badge={tp('badge')}
          title={tp('title')}
          summary={tp('summary')}
          disclaimer=""
          includesLabel={tp('includesLabel')}
          fromLabel={tp('fromLabel')}
          featuredLabel={tp('featuredLabel')}
          helpTitle={tp('helpTitle')}
          helpBody={tp('helpBody')}
          helpCta={tp('helpCta')}
          ctaLabel={tp('cta')}
          packages={packages}
          faqs={faqs}
        />
      </div>
    </>
  );
}
