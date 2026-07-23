import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { buildPageMetadata } from '@/lib/seo/metadata';
import type { SiteLocale } from '@/config/site';
import { routing, Link } from '@/i18n/routing';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { buildBreadcrumbs } from '@/lib/seo/paths';
import { hubGraph } from '@/lib/seo/graphs';
import { JsonLdScript } from '@/components/seo/JsonLdScript';
import { PageShell } from '@/components/layout/PageShell';
import { FaqSection } from '@/components/content/FaqSection';
import { buildAggregatedFaqs } from '@/lib/content/aggregated-faqs';

type PageProps = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  return buildPageMetadata({
    locale: locale as SiteLocale,
    title: isEn
      ? 'FAQ | Content & video services Colombia | Paola Hoyos'
      : 'Preguntas frecuentes | Contenido y video Colombia | Paola Hoyos',
    description: isEn
      ? 'Answers about strategy sessions, content production, pricing in COP and monthly management for brands in Colombia.'
      : 'Respuestas sobre sesiones estratégicas, producción de contenido, tarifas en COP y gestión mensual para marcas en Colombia.',
    route: { type: 'hub', hub: 'faq' },
    keywords: [
      'preguntas frecuentes contenido digital',
      'cotización edición reels colombia',
      'community manager vs estratega',
    ],
  });
}

export default async function FaqPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const typed = (locale === 'en' ? 'en' : 'es') as SiteLocale;
  const isEn = typed === 'en';
  const title = isEn ? 'Frequently asked questions' : 'Preguntas frecuentes';
  const description = isEn
    ? 'Commercial and service FAQs for content strategy and video in Colombia.'
    : 'Preguntas comerciales y de servicio sobre estrategia y video en Colombia.';

  const faqs = await buildAggregatedFaqs(typed);

  const crumbs = buildBreadcrumbs(typed, [
    { name: title, route: { type: 'hub', hub: 'faq' } },
  ]);

  const graph = hubGraph({
    locale: typed,
    route: { type: 'hub', hub: 'faq' },
    name: title,
    description,
    breadcrumbs: crumbs,
    faqs,
  });

  return (
    <>
      <JsonLdScript graph={graph} />
      <div className="container" style={{ paddingTop: '1rem' }}>
        <Breadcrumbs items={crumbs} locale={locale} />
      </div>
      <PageShell
        eyebrow={isEn ? 'Help' : 'Ayuda'}
        title={title}
        cta={{ href: '/contact', label: isEn ? 'Contact' : 'Contacto' }}
      >
        <p className="page-shell__lede">
          {isEn
            ? 'Practical answers about services, investment and how we work — gathered from the most common questions on pricing and each service page.'
            : 'Respuestas prácticas sobre servicios, inversión y forma de trabajo — reunidas de las preguntas más frecuentes en tarifas y en cada página de servicio.'}
        </p>

        <FaqSection
          title={isEn ? 'All questions' : 'Todas las preguntas'}
          items={faqs}
        />

        <nav className="page-prose" aria-label={isEn ? 'Related pages' : 'Páginas relacionadas'}>
          <h2>{isEn ? 'Go deeper' : 'Profundiza'}</h2>
          <ul>
            <li>
              <Link href="/services">
                {isEn ? 'All services' : 'Todos los servicios'}
              </Link>
            </li>
            <li>
              <Link href="/pricing">
                {isEn ? 'Investment & pricing' : 'Tarifas e inversión'}
              </Link>
            </li>
            <li>
              <Link href="/process">
                {isEn ? 'Work process' : 'Proceso de trabajo'}
              </Link>
            </li>
            <li>
              <Link href="/contact">
                {isEn ? 'Contact & quote' : 'Contacto y cotización'}
              </Link>
            </li>
          </ul>
        </nav>
      </PageShell>
    </>
  );
}
