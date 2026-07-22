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
          ? '¿La sesión estratégica es un plan?'
          : 'Is the strategy session a plan?',
      answer:
        locale === 'es'
          ? 'No. Es una reunión de diagnóstico: revisamos redes, encontramos oportunidades y entrego un plan de acción. Sin editar, grabar ni publicar.'
          : 'No. It is a diagnosis meeting: we review channels, spot opportunities and I deliver an action plan. No editing, recording or publishing.',
    },
    {
      question:
        locale === 'es'
          ? '¿Puedo subir de nivel después?'
          : 'Can I upgrade later?',
      answer:
        locale === 'es'
          ? 'Sí. Muchas marcas empiezan con la sesión o con estrategia de contenido, y luego pasan a producción o gestión mensual.'
          : 'Yes. Many brands start with the session or content strategy, then move into production or monthly management.',
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
      id: 'estrategia',
      index: '01',
      name: tp('pkgStrategyName'),
      pitch: tp('pkgStrategyPitch'),
      includes: [
        tp('pkgStrategyInc1'),
        tp('pkgStrategyInc2'),
        tp('pkgStrategyInc3'),
        tp('pkgStrategyInc4'),
        tp('pkgStrategyInc5'),
        tp('pkgStrategyInc6'),
      ],
      note: tp('pkgStrategyNote'),
    },
    {
      id: 'produccion',
      index: '02',
      name: tp('pkgProductionName'),
      pitch: tp('pkgProductionPitch'),
      includes: [
        tp('pkgProductionInc1'),
        tp('pkgProductionInc2'),
        tp('pkgProductionInc3'),
      ],
      note: tp('pkgProductionNote'),
    },
    {
      id: 'gestion-mensual',
      index: '03',
      name: tp('pkgMonthlyName'),
      pitch: tp('pkgMonthlyPitch'),
      includes: [
        tp('pkgMonthlyInc1'),
        tp('pkgMonthlyInc2'),
        tp('pkgMonthlyInc3'),
        tp('pkgMonthlyInc4'),
      ],
      note: tp('pkgMonthlyNote'),
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
        <ServicesHubView />
        <VerticalArtConnector mark="heart" />
        <PricingHubView
          badge={tp('badge')}
          title={tp('title')}
          summary={tp('summary')}
          disclaimer={tp('disclaimer')}
          includesLabel={tp('includesLabel')}
          ctaLabel={tp('cta')}
          packages={packages}
          faqs={faqs}
        />
      </div>
    </>
  );
}
