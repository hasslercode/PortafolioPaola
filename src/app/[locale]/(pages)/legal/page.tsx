import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { siteConfig, type SiteLocale } from '@/config/site';
import { routing } from '@/i18n/routing';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { buildBreadcrumbs } from '@/lib/seo/paths';
import { hubGraph } from '@/lib/seo/graphs';
import { JsonLdScript } from '@/components/seo/JsonLdScript';
import { PageShell } from '@/components/layout/PageShell';

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
      ? 'Legal notice | Paola Hoyos'
      : 'Aviso legal | Paola Hoyos',
    description: isEn
      ? 'Legal identification and conditions of use for paolahoyos.com.'
      : 'Identificación legal y condiciones de uso de paolahoyos.com.',
    route: { type: 'hub', hub: 'legal' },
    keywords: ['aviso legal', 'identificación sitio web', 'paola hoyos colombia'],
  });
}

export default async function LegalNoticePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const typed = (locale === 'en' ? 'en' : 'es') as SiteLocale;
  const isEn = typed === 'en';
  const title = isEn ? 'Legal notice' : 'Aviso legal';
  const description = isEn
    ? 'Site owner identification and terms of use.'
    : 'Identificación del titular del sitio y condiciones de uso.';

  const crumbs = buildBreadcrumbs(typed, [
    { name: title, route: { type: 'hub', hub: 'legal' } },
  ]);

  const graph = hubGraph({
    locale: typed,
    route: { type: 'hub', hub: 'legal' },
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
      <PageShell eyebrow={isEn ? 'Legal' : 'Legal'} title={title}>
        <div className="page-prose prose-seo">
          <p className="page-shell__lede">
            {isEn
              ? `In compliance with transparency and consumer information practices, this notice identifies the owner of ${siteConfig.domain} and the general rules for using this website.`
              : `En cumplimiento de buenas prácticas de transparencia e información al usuario, este aviso identifica al titular de ${siteConfig.domain} y las reglas generales de uso de este sitio web.`}
          </p>

          <section>
            <h2>{isEn ? 'Site owner' : 'Titular del sitio'}</h2>
            <p>
              <strong>{siteConfig.legalName}</strong>
              <br />
              {isEn ? 'Trade name:' : 'Nombre comercial:'} {siteConfig.name}
              <br />
              {isEn ? 'Website:' : 'Sitio web:'}{' '}
              <a href={siteConfig.url}>{siteConfig.domain}</a>
              <br />
              {isEn ? 'Email:' : 'Correo:'}{' '}
              <a href={`mailto:${siteConfig.contact.email}`}>
                {siteConfig.contact.email}
              </a>
              <br />
              {isEn ? 'Location:' : 'Ubicación:'}{' '}
              {siteConfig.geo.addressLocality}, {siteConfig.geo.addressRegion},{' '}
              {siteConfig.geo.addressCountry}
            </p>
          </section>

          <section>
            <h2>{isEn ? 'Purpose of the website' : 'Objeto del sitio web'}</h2>
            <p>
              {isEn
                ? 'This site presents professional services in digital content strategy, social video editing and organic growth for brands and entrepreneurs. Information is for general orientation; binding conditions are always those agreed in a specific proposal or contract.'
                : 'Este sitio presenta servicios profesionales de estrategia de contenido digital, edición de video para redes y crecimiento orgánico para marcas y emprendedores. La información es orientativa; las condiciones vinculantes son siempre las acordadas en propuesta o contrato específico.'}
            </p>
          </section>

          <section>
            <h2>{isEn ? 'Intellectual property' : 'Propiedad intelectual'}</h2>
            <p>
              {isEn
                ? 'Texts, images, videos, design and code on this site are protected by applicable copyright law. Reproduction, distribution or public communication without written authorization is prohibited, except for private citation with source attribution.'
                : 'Textos, imágenes, videos, diseño y código de este sitio están protegidos por la normativa de derechos de autor aplicable. Queda prohibida su reproducción, distribución o comunicación pública sin autorización escrita, salvo cita privada con atribución de fuente.'}
            </p>
          </section>

          <section>
            <h2>{isEn ? 'External links' : 'Enlaces externos'}</h2>
            <p>
              {isEn
                ? 'Links to third-party sites (social networks, tools, references) are provided for convenience. Paola Hoyos is not responsible for their content or privacy practices.'
                : 'Enlaces a sitios de terceros (redes sociales, herramientas, referencias) se ofrecen por conveniencia. Paola Hoyos no se responsabiliza por su contenido ni prácticas de privacidad.'}
            </p>
          </section>

          <section>
            <h2>{isEn ? 'Applicable law' : 'Legislación aplicable'}</h2>
            <p>
              {isEn
                ? 'This notice and use of the website are governed by the laws of the Republic of Colombia. For data protection matters, see the privacy policy. For service conditions, see the terms of service.'
                : 'Este aviso y el uso del sitio se rigen por las leyes de la República de Colombia. Para protección de datos, consulta la política de privacidad. Para condiciones de servicio, consulta los términos del servicio.'}
            </p>
          </section>
        </div>
      </PageShell>
    </>
  );
}
