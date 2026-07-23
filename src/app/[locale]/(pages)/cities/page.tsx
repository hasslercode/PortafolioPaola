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

type PageProps = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const CITY_POSTS = [
  {
    slug: 'creacion-de-contenido-medellin',
    es: {
      name: 'Medellín',
      title: 'Creación de contenido en Medellín',
      summary:
        'Estrategia, Reels y producción remota para marcas en Medellín y área metropolitana.',
    },
    en: {
      name: 'Medellín',
      title: 'Content creation in Medellín',
      summary:
        'Strategy, Reels and remote production for brands in Medellín and metro area.',
    },
  },
  {
    slug: 'creacion-de-contenido-bogota',
    es: {
      name: 'Bogotá',
      title: 'Creación de contenido en Bogotá',
      summary:
        'Producción estratégica para retail, servicios y emprendimiento en la capital.',
    },
    en: {
      name: 'Bogotá',
      title: 'Content creation in Bogotá',
      summary:
        'Strategic production for retail, services and entrepreneurship in the capital.',
    },
  },
  {
    slug: 'creacion-de-contenido-barranquilla',
    es: {
      name: 'Barranquilla',
      title: 'Creación de contenido en Barranquilla',
      summary:
        'Marcas costeñas con alcance nacional — Reels, WhatsApp y prueba local.',
    },
    en: {
      name: 'Barranquilla',
      title: 'Content creation in Barranquilla',
      summary:
        'Coastal brands with national reach — Reels, WhatsApp and local proof.',
    },
  },
] as const;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  return buildPageMetadata({
    locale: locale as SiteLocale,
    title: isEn
      ? 'Content by city | Colombia | Paola Hoyos'
      : 'Contenido por ciudad | Colombia | Paola Hoyos',
    description: isEn
      ? 'Content strategy and video production for brands in Medellín, Bogotá, Barranquilla and across Colombia — remote delivery.'
      : 'Estrategia de contenido y producción de video para marcas en Medellín, Bogotá, Barranquilla y todo Colombia — entrega remota.',
    route: { type: 'hub', hub: 'cities' },
    keywords: [
      'creación de contenido medellín',
      'creación de contenido bogotá',
      'producción reels colombia',
    ],
  });
}

export default async function CitiesPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const typed = (locale === 'en' ? 'en' : 'es') as SiteLocale;
  const isEn = typed === 'en';
  const title = isEn ? 'Content by city' : 'Contenido por ciudad';
  const description = isEn
    ? 'Local guides for content strategy and video production in Colombia.'
    : 'Guías locales de estrategia de contenido y producción de video en Colombia.';

  const crumbs = buildBreadcrumbs(typed, [
    { name: title, route: { type: 'hub', hub: 'cities' } },
  ]);

  const graph = hubGraph({
    locale: typed,
    route: { type: 'hub', hub: 'cities' },
    name: title,
    description,
    breadcrumbs: crumbs,
  });

  return (
    <>
      <JsonLdScript graph={graph} />
      <div className="container" style={{ paddingTop: '1rem' }}>
        <Breadcrumbs items={crumbs} locale={locale} />
      </div>
      <PageShell
        eyebrow={isEn ? 'Colombia' : 'Colombia'}
        title={title}
        cta={{ href: '/contact', label: isEn ? 'Contact' : 'Contacto' }}
      >
        <p className="page-shell__lede">
          {isEn
            ? 'I work with brands in major Colombian cities and nationwide — strategy sessions, Reels production and monthly management with remote delivery.'
            : 'Trabajo con marcas en las principales ciudades de Colombia y a nivel nacional — sesiones estratégicas, producción de Reels y gestión mensual con entrega remota.'}
        </p>

        <nav className="page-prose" aria-label={isEn ? 'City guides' : 'Guías por ciudad'}>
          <h2>{isEn ? 'Main cities' : 'Ciudades principales'}</h2>
          <ul>
            {CITY_POSTS.map((city) => {
              const copy = city[typed];
              return (
                <li key={city.slug}>
                  <Link href={{ pathname: '/blog/[slug]', params: { slug: city.slug } }}>
                    <strong>{copy.title}</strong>
                  </Link>
                  {' — '}
                  {copy.summary}
                </li>
              );
            })}
          </ul>
        </nav>

        <nav className="page-prose" aria-label={isEn ? 'More resources' : 'Más recursos'}>
          <h2>{isEn ? 'Also explore' : 'También explora'}</h2>
          <ul>
            <li>
              <Link href={{ pathname: '/blog/[slug]', params: { slug: 'produccion-reels-colombia' } }}>
                {isEn ? 'Reels production Colombia' : 'Producción de Reels Colombia'}
              </Link>
            </li>
            <li>
              <Link href={{ pathname: '/blog/[slug]', params: { slug: 'content-strategist-colombia-remoto' } }}>
                {isEn ? 'Remote content strategist' : 'Content strategist remoto'}
              </Link>
            </li>
            <li>
              <Link href="/services">
                {isEn ? 'All services' : 'Todos los servicios'}
              </Link>
            </li>
            <li>
              <Link href="/blog">
                {isEn ? 'Blog' : 'Blog'}
              </Link>
            </li>
          </ul>
        </nav>
      </PageShell>
    </>
  );
}
