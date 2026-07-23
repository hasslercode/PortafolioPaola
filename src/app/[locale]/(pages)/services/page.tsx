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
import { serviceSlugLocales } from '@/content/registry';
import {
  CONSULT_SERVICE_SLUG,
  PACKAGE_TO_SERVICE_SLUG,
  PRIMARY_KEYWORDS_ES,
} from '@/config/seo-strategy';

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
      ...PRIMARY_KEYWORDS_ES,
      'servicios estrategia digital colombia',
      tp('pkgMonthlyName'),
    ],
  });
}

function buildInvestmentFaqs(locale: string) {
  return [
    {
      question:
        locale === 'es'
          ? '¿La consultoría es un plan?'
          : 'Is consulting a plan?',
      answer:
        locale === 'es'
          ? 'No. Es solo asesoría: reunión, revisión de redes, oportunidades y plan de acción. No edito, no grabo ni publico.'
          : 'No. It is advisory only: meeting, channel review, opportunities and action plan. No editing, filming or publishing.',
    },
    {
      question:
        locale === 'es'
          ? '¿Por dónde empiezo?'
          : 'Where should I start?',
      answer:
        locale === 'es'
          ? 'Si necesitas claridad, consultoría. Si ya sabes qué decir, producción. Si quieres que lo opere todo el mes, gestión mensual.'
          : 'Need clarity? Consulting. Already know what to say? Production. Want it run all month? Monthly management.',
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

  const processSteps = [
    {
      index: '01',
      title: tp('processStep1Title'),
      detail: tp('processStep1Detail'),
    },
    {
      index: '02',
      title: tp('processStep2Title'),
      detail: tp('processStep2Detail'),
    },
    {
      index: '03',
      title: tp('processStep3Title'),
      detail: tp('processStep3Detail'),
    },
  ];

  const values = [
    { title: tp('value1Title'), detail: tp('value1Detail') },
    { title: tp('value2Title'), detail: tp('value2Detail') },
    { title: tp('value3Title'), detail: tp('value3Detail') },
    { title: tp('value4Title'), detail: tp('value4Detail') },
  ];

  const packages = [
    {
      id: 'estrategia',
      index: '01',
      name: tp('pkgStrategyName'),
      pitch: tp('pkgStrategyPitch'),
      tag: tp('pkgStrategyTag'),
      includes: [
        tp('pkgStrategyInc1'),
        tp('pkgStrategyInc2'),
        tp('pkgStrategyInc3'),
        tp('pkgStrategyInc4'),
        tp('pkgStrategyInc5'),
        tp('pkgStrategyInc6'),
      ],
      delivery: tp('pkgStrategyDelivery'),
      ctaLabel: tp('pkgStrategyCta'),
      detailSlug:
        serviceSlugLocales[PACKAGE_TO_SERVICE_SLUG.estrategia][
          locale === 'en' ? 'en' : 'es'
        ],
    },
    {
      id: 'produccion',
      index: '02',
      name: tp('pkgProductionName'),
      pitch: tp('pkgProductionPitch'),
      tag: tp('pkgProductionTag'),
      includes: [
        tp('pkgProductionInc1'),
        tp('pkgProductionInc2'),
        tp('pkgProductionInc3'),
      ],
      delivery: tp('pkgProductionDelivery'),
      ctaLabel: tp('pkgProductionCta'),
      detailSlug:
        serviceSlugLocales[PACKAGE_TO_SERVICE_SLUG.produccion][
          locale === 'en' ? 'en' : 'es'
        ],
    },
    {
      id: 'gestion-mensual',
      index: '03',
      name: tp('pkgMonthlyName'),
      pitch: tp('pkgMonthlyPitch'),
      tag: tp('pkgMonthlyTag'),
      includes: [
        tp('pkgMonthlyInc1'),
        tp('pkgMonthlyInc2'),
        tp('pkgMonthlyInc3'),
        tp('pkgMonthlyInc4'),
        tp('pkgMonthlyInc5'),
        tp('pkgMonthlyInc6'),
      ],
      delivery: tp('pkgMonthlyDelivery'),
      ctaLabel: tp('pkgMonthlyCta'),
      featured: true,
      detailSlug:
        serviceSlugLocales[PACKAGE_TO_SERVICE_SLUG['gestion-mensual']][
          locale === 'en' ? 'en' : 'es'
        ],
    },
  ];

  const graph = hubGraph({
    locale: locale as SiteLocale,
    route: { type: 'hub', hub: 'services' },
    name: t('titleMerged'),
    description: t('metaDescriptionMerged'),
    breadcrumbs: crumbs,
    offers: [
      {
        name: tp('pkgSessionName'),
        description: tp('pkgSessionPitch'),
      },
      ...packages.map((pkg) => ({
        name: pkg.name,
        description: pkg.pitch,
      })),
    ],
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
          titleLead={tp('titleLead')}
          titleAccent={tp('titleAccent')}
          titleTrail={tp('titleTrail')}
          summary={tp('summary')}
          processEyebrow={tp('processEyebrow')}
          processTitle={tp('processTitle')}
          processSteps={processSteps}
          consultCta={tp('consultCta')}
          consultTag={tp('consultTag')}
          consultNote={tp('consultNote')}
          consultDetailSlug={
            serviceSlugLocales[CONSULT_SERVICE_SLUG][
              locale === 'en' ? 'en' : 'es'
            ]
          }
          includesLabel={tp('includesLabel')}
          featuredLabel={tp('featuredLabel')}
          deliveryLabel={tp('deliveryLabel')}
          values={values}
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
