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
import { getAllServices } from '@/content/loaders';
import {
  absoluteUrl,
  buildLocalizedPath,
} from '@/lib/seo/paths';
import {
  CONSULT_SERVICE_SLUG,
  PACKAGE_TO_SERVICE_SLUG,
  PRIMARY_KEYWORDS_ES,
} from '@/config/seo-strategy';
import {
  PRICE_FROM_COP,
  PRICE_LIST_COP,
  LAUNCH_SALE_ACTIVE,
  formatCopFrom,
} from '@/lib/contact';

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
          ? '¿La consultoría incluye entregables?'
          : 'Does consulting include deliverables?',
      answer:
        locale === 'es'
          ? 'No. Es una sesión de asesoría en vivo (45-60 min): revisión de redes, errores, oportunidades y recomendaciones. No incluye documento, estrategia, calendario, seguimiento ni implementación.'
          : 'No. It is a live advisory session (45–60 min): channel review, errors, opportunities and recommendations. No document, strategy, calendar, follow-up or implementation.',
    },
    {
      question:
        locale === 'es'
          ? '¿Por dónde empiezo?'
          : 'Where should I start?',
      answer:
        locale === 'es'
          ? 'Si necesitas claridad, consultoría estratégica. Si quieres dirección documentada, estrategia de contenido. Si ya toca producir, producción. Si quieres operación del mes, gestión estratégica de contenido.'
          : 'Need clarity? Strategic consulting. Need a documented direction? Content strategy. Ready to produce? Production. Want the month operated? Strategic content management.',
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

  const typedLocale = (locale === 'en' ? 'en' : 'es') as SiteLocale;
  const services = await getAllServices(locale);
  const saleFlag = LAUNCH_SALE_ACTIVE
    ? typedLocale === 'es'
      ? 'Lanzamiento'
      : 'Launch deal'
    : undefined;

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
        tp('pkgStrategyInc7'),
        tp('pkgStrategyInc8'),
        tp('pkgStrategyInc9'),
      ],
      delivery: tp('pkgStrategyDelivery'),
      note: tp('pkgStrategyNote'),
      ctaLabel: tp('pkgStrategyCta'),
      priceFrom: formatCopFrom(PRICE_FROM_COP.estrategia, typedLocale),
      priceWas: LAUNCH_SALE_ACTIVE
        ? formatCopFrom(PRICE_LIST_COP.estrategia, typedLocale)
        : undefined,
      saleFlag,
      detailSlug:
        serviceSlugLocales[PACKAGE_TO_SERVICE_SLUG.estrategia][typedLocale],
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
        tp('pkgProductionInc4'),
        tp('pkgProductionInc5'),
        tp('pkgProductionInc6'),
        tp('pkgProductionInc7'),
      ],
      packageIncludes: [
        tp('pkgProductionPkg1'),
        tp('pkgProductionPkg2'),
        tp('pkgProductionPkg3'),
        tp('pkgProductionPkg4'),
      ],
      includesLabelOverride: tp('canIncludeLabel'),
      delivery: tp('pkgProductionDelivery'),
      note: tp('pkgProductionNote'),
      ctaLabel: tp('pkgProductionCta'),
      priceFrom: formatCopFrom(PRICE_FROM_COP.produccion, typedLocale),
      priceWas: LAUNCH_SALE_ACTIVE
        ? formatCopFrom(PRICE_LIST_COP.produccion, typedLocale)
        : undefined,
      saleFlag,
      detailSlug:
        serviceSlugLocales[PACKAGE_TO_SERVICE_SLUG.produccion][typedLocale],
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
        tp('pkgMonthlyInc7'),
        tp('pkgMonthlyInc8'),
        tp('pkgMonthlyInc9'),
      ],
      delivery: tp('pkgMonthlyDelivery'),
      note: tp('pkgMonthlyNote'),
      ctaLabel: tp('pkgMonthlyCta'),
      featured: true,
      priceFrom: formatCopFrom(PRICE_FROM_COP.mensual, typedLocale, {
        perMonth: true,
      }),
      priceWas: LAUNCH_SALE_ACTIVE
        ? formatCopFrom(PRICE_LIST_COP.mensual, typedLocale, { perMonth: true })
        : undefined,
      saleFlag,
      detailSlug:
        serviceSlugLocales[PACKAGE_TO_SERVICE_SLUG['gestion-mensual']][
          typedLocale
        ],
    },
  ];

  const ugcPackage = {
    id: 'ugc',
    index: '04',
    name: typedLocale === 'es' ? 'UGC para marcas' : 'UGC for brands',
    pitch:
      typedLocale === 'es'
        ? 'Videos auténticos estilo creador para marcas y emprendedores en Colombia.'
        : 'Authentic creator-style videos for brands and founders in Colombia.',
    tag: 'UGC',
    includes:
      typedLocale === 'es'
        ? ['Brief UGC', 'Guion ligero', 'Piezas verticales', 'Derechos de uso claros']
        : ['UGC brief', 'Light script', 'Vertical pieces', 'Clear usage rights'],
    delivery:
      typedLocale === 'es'
        ? 'Pack UGC listo para ads/orgánico'
        : 'UGC pack ready for ads/organic',
    ctaLabel: typedLocale === 'es' ? 'Quiero UGC' : 'I want UGC',
    priceFrom: formatCopFrom(PRICE_FROM_COP.ugc, typedLocale),
    priceWas: LAUNCH_SALE_ACTIVE
      ? formatCopFrom(PRICE_LIST_COP.ugc, typedLocale)
      : undefined,
    saleFlag,
    detailSlug: serviceSlugLocales[PACKAGE_TO_SERVICE_SLUG.ugc][typedLocale],
  };

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
        lowPrice: PRICE_FROM_COP.sesion,
      },
      {
        name: packages[0].name,
        description: packages[0].pitch,
        lowPrice: PRICE_FROM_COP.estrategia,
      },
      {
        name: packages[1].name,
        description: packages[1].pitch,
        lowPrice: PRICE_FROM_COP.produccion,
      },
      {
        name: packages[2].name,
        description: packages[2].pitch,
        lowPrice: PRICE_FROM_COP.mensual,
      },
      {
        name: ugcPackage.name,
        description: ugcPackage.pitch,
        lowPrice: PRICE_FROM_COP.ugc,
      },
    ],
    faqs,
    itemListName: t('titleMerged'),
    itemList: services.map((service) => ({
      name: service.title,
      url: absoluteUrl(
        buildLocalizedPath(typedLocale, {
          type: 'service',
          slug: service.canonicalSlug,
        }),
      ),
    })),
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
          showLaunchPromo={LAUNCH_SALE_ACTIVE}
          launchFlag={tp('launchFlag')}
          launchTitle={tp('launchTitle')}
          launchBody={tp('launchBody')}
          processEyebrow={tp('processEyebrow')}
          processTitle={tp('processTitle')}
          processSteps={processSteps}
          consultCta={tp('consultCta')}
          consultTag={formatCopFrom(PRICE_FROM_COP.sesion, typedLocale)}
          consultNote={tp('consultNote')}
          consultIncludes={[
            tp('pkgSessionInc1'),
            tp('pkgSessionInc2'),
            tp('pkgSessionInc3'),
            tp('pkgSessionInc4'),
            tp('pkgSessionInc5'),
            tp('pkgSessionInc6'),
          ]}
          consultExcludes={[
            tp('pkgSessionExc1'),
            tp('pkgSessionExc2'),
            tp('pkgSessionExc3'),
            tp('pkgSessionExc4'),
            tp('pkgSessionExc5'),
          ]}
          includesLabel={tp('includesLabel')}
          excludesLabel={tp('excludesLabel')}
          packageLabel={tp('packageLabel')}
          seeAllIncludes={tp('seeAllIncludes')}
          consultDetailSlug={
            serviceSlugLocales[CONSULT_SERVICE_SLUG][
              locale === 'en' ? 'en' : 'es'
            ]
          }
          featuredLabel={tp('featuredLabel')}
          deliveryLabel={tp('deliveryLabel')}
          values={values}
          helpTitle={tp('helpTitle')}
          helpBody={tp('helpBody')}
          helpCta={tp('helpCta')}
          ctaLabel={tp('cta')}
          packages={packages}
          ugcPackage={ugcPackage}
          ugcEyebrow={tp('ugcEyebrow')}
          ugcTitle={tp('ugcTitle')}
          ugcSummary={tp('ugcSummary')}
          faqs={faqs}
        />
      </div>
    </>
  );
}
