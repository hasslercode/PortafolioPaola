import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { buildPageMetadata } from '@/lib/seo/metadata';
import type { SiteLocale } from '@/config/site';
import { routing, Link } from '@/i18n/routing';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { buildBreadcrumbs } from '@/lib/seo/paths';
import { hubGraph } from '@/lib/seo/graphs';
import { JsonLdScript } from '@/components/seo/JsonLdScript';
import { FaqSection } from '@/components/content/FaqSection';
import { GeoAnswer } from '@/components/content/GeoAnswer';
import { serviceSlugLocales } from '@/content/registry';
import {
  CONSULT_SERVICE_SLUG,
  PACKAGE_TO_SERVICE_SLUG,
} from '@/config/seo-strategy';
import { PRICE_FROM_COP, formatCopFrom } from '@/lib/contact';

type PageProps = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  return buildPageMetadata({
    locale: locale as SiteLocale,
    title: isEn
      ? 'Investment & pricing | Content & video Colombia | Paola Hoyos'
      : 'Tarifas e inversión | Contenido y video Colombia | Paola Hoyos',
    description: isEn
      ? 'Transparent COP “from” ranges for strategy, video editing, UGC-style production and monthly management for entrepreneurs in Colombia.'
      : 'Rangos transparentes en COP “desde” para estrategia, edición de video, UGC y gestión mensual para emprendedores en Colombia.',
    route: { type: 'hub', hub: 'pricing' },
    keywords: [
      'tarifas creación de contenido colombia',
      'precio edición de reels',
      'inversión community manager colombia',
      'cotización estratega digital',
    ],
  });
}

type PriceRow = {
  name: string;
  from: string;
  ideal: string;
  slug: string;
  lowPrice: number;
};

/**
 * HU-CRO-001 — Real /tarifas page with COP “desde” ranges + Offer JSON-LD.
 */
export default async function PricingPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isEn = locale === 'en';
  const typed = (locale === 'en' ? 'en' : 'es') as SiteLocale;
  const t = await getTranslations({ locale, namespace: 'Pricing' });

  const crumbs = buildBreadcrumbs(typed, [
    {
      name: isEn ? 'Investment' : 'Tarifas',
      route: { type: 'hub', hub: 'pricing' },
    },
  ]);

  const rows: PriceRow[] = [
    {
      name: t('pkgSessionName'),
      from: formatCopFrom(PRICE_FROM_COP.sesion, typed),
      ideal: isEn
        ? 'Clarity before investing in production'
        : 'Claridad antes de invertir en producción',
      slug: serviceSlugLocales[CONSULT_SERVICE_SLUG][typed],
      lowPrice: PRICE_FROM_COP.sesion,
    },
    {
      name: t('pkgStrategyName'),
      from: formatCopFrom(PRICE_FROM_COP.estrategia, typed),
      ideal: isEn
        ? 'Message, pillars and calendar without filming'
        : 'Mensaje, pilares y calendario sin grabación',
      slug: serviceSlugLocales[PACKAGE_TO_SERVICE_SLUG.estrategia][typed],
      lowPrice: PRICE_FROM_COP.estrategia,
    },
    {
      name: t('pkgProductionName'),
      from: formatCopFrom(PRICE_FROM_COP.produccion, typed),
      ideal: isEn
        ? 'Premium editing from your recorded footage'
        : 'Edición premium a partir de tu material',
      slug: serviceSlugLocales[PACKAGE_TO_SERVICE_SLUG.produccion][typed],
      lowPrice: PRICE_FROM_COP.produccion,
    },
    {
      name: t('pkgMonthlyName'),
      from: formatCopFrom(PRICE_FROM_COP.mensual, typed),
      ideal: isEn
        ? 'Light strategy + production + publishing'
        : 'Estrategia ligera + producción + publicación',
      slug: serviceSlugLocales[PACKAGE_TO_SERVICE_SLUG['gestion-mensual']][typed],
      lowPrice: PRICE_FROM_COP.mensual,
    },
    {
      name: isEn ? 'UGC for brands' : 'UGC para marcas',
      from: formatCopFrom(PRICE_FROM_COP.ugc, typed),
      ideal: isEn
        ? 'Creator-style videos for ads and organic'
        : 'Videos estilo creador para ads y orgánico',
      slug: serviceSlugLocales[PACKAGE_TO_SERVICE_SLUG.ugc][typed],
      lowPrice: PRICE_FROM_COP.ugc,
    },
  ];

  const faqs = [
    {
      question: isEn
        ? 'Are these final prices?'
        : '¿Estos precios son definitivos?',
      answer: isEn
        ? 'No. They are “from” anchors in COP. The final quote depends on volume, duration, revisions and scope.'
        : 'No. Son anclas “desde” en COP. La cotización final depende de volumen, duración, revisiones y alcance.',
    },
    {
      question: isEn
        ? 'Why not publish a fixed menu?'
        : '¿Por qué no un menú fijo?',
      answer: isEn
        ? 'A 15-second Reel and a 60-second testimonial are not the same job. Anchors help you budget; scope locks the price.'
        : 'Un Reel de 15s y un testimonio de 60s no son el mismo trabajo. Las anclas ayudan a presupuestar; el alcance fija el precio.',
    },
    {
      question: isEn
        ? 'Where should I start?'
        : '¿Por dónde empiezo?',
      answer: isEn
        ? 'Need clarity? Strategy session. Know what to say? Production. Want the month operated? Monthly management.'
        : '¿Necesitas claridad? Sesión estratégica. ¿Ya sabes qué decir? Producción. ¿Quieres que opere el mes? Gestión mensual.',
    },
  ];

  const graph = hubGraph({
    locale: typed,
    route: { type: 'hub', hub: 'pricing' },
    name: isEn ? 'Investment' : 'Tarifas e inversión',
    description: isEn
      ? 'COP from-ranges for digital content services in Colombia.'
      : 'Rangos desde en COP para servicios de contenido digital en Colombia.',
    breadcrumbs: crumbs,
    faqs,
    offers: rows.map((row) => ({
      name: row.name,
      description: row.ideal,
      lowPrice: row.lowPrice > 0 ? row.lowPrice : undefined,
    })),
  });

  return (
    <>
      <JsonLdScript graph={graph} />
      <div className="container" style={{ paddingTop: '1rem' }}>
        <Breadcrumbs items={crumbs} locale={locale} />
      </div>

      <article className="pricing-page container">
        <header className="pricing-page__header">
          <p className="pricing-page__eyebrow">
            {isEn ? 'Investment' : 'Inversión'}
          </p>
          <h1 className="pricing-page__title">
            {isEn
              ? 'Transparent COP ranges for content & video'
              : 'Rangos transparentes en COP para contenido y video'}
          </h1>
          <GeoAnswer label={isEn ? 'Short answer' : 'Respuesta corta'}>
            {isEn
              ? 'These are “from” anchors for entrepreneurs and brands in Colombia. Final quotes depend on scope — volume, length, revisions and whether you need strategy, editing or full monthly ops.'
              : 'Estas son anclas “desde” para emprendedores y marcas en Colombia. La cotización final depende del alcance: volumen, duración, revisiones y si necesitas estrategia, edición u operación mensual.'}
          </GeoAnswer>
        </header>

        <div className="pricing-page__table-wrap">
          <table className="pricing-page__table">
            <thead>
              <tr>
                <th scope="col">{isEn ? 'Plan' : 'Plan'}</th>
                <th scope="col">{isEn ? 'From (COP)' : 'Desde (COP)'}</th>
                <th scope="col">{isEn ? 'Best for' : 'Ideal para'}</th>
                <th scope="col">{isEn ? 'Details' : 'Detalle'}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.slug}>
                  <td>{row.name}</td>
                  <td>
                    <strong>{row.from}</strong>
                  </td>
                  <td>{row.ideal}</td>
                  <td>
                    <Link
                      href={{
                        pathname: '/services/[slug]',
                        params: { slug: row.slug },
                      }}
                    >
                      {isEn ? 'See service' : 'Ver servicio'}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="pricing-page__disclaimer">
          {isEn
            ? 'Final quote according to scope. Community-manager rate guides are only a bridge — the offer here is strategy, production and premium monthly management.'
            : 'Cotización final según alcance. Las guías de tarifas de community manager son solo un puente: la oferta aquí es estrategia, producción y gestión mensual premium.'}{' '}
          <Link
            href={{
              pathname: '/blog/[slug]',
              params: { slug: 'tarifas-community-manager-colombia' },
            }}
          >
            {isEn ? 'Read the rates guide' : 'Leer guía de tarifas'}
          </Link>
          {' · '}
          <Link href="/services">
            {isEn ? 'All services' : 'Todos los servicios'}
          </Link>
          {' · '}
          <Link href="/contact">
            {isEn ? 'Contact' : 'Contacto'}
          </Link>
        </p>

        <FaqSection
          title={isEn ? 'Pricing FAQ' : 'Preguntas sobre inversión'}
          items={faqs}
        />
      </article>
    </>
  );
}
