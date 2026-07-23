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
      ? 'Privacy policy | Paola Hoyos'
      : 'Política de privacidad | Paola Hoyos',
    description: isEn
      ? 'How Paola Hoyos handles contact data, email, WhatsApp and analytics on paolahoyos.com.'
      : 'Cómo Paola Hoyos trata datos de contacto, correo, WhatsApp y analítica en paolahoyos.com.',
    route: { type: 'hub', hub: 'privacy' },
    keywords: ['política de privacidad', 'protección de datos colombia', 'habeas data'],
  });
}

export default async function PrivacyPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const typed = (locale === 'en' ? 'en' : 'es') as SiteLocale;
  const isEn = typed === 'en';
  const title = isEn ? 'Privacy policy' : 'Política de privacidad';
  const description = isEn
    ? 'Information about personal data processing on this website.'
    : 'Información sobre el tratamiento de datos personales en este sitio web.';

  const crumbs = buildBreadcrumbs(typed, [
    { name: title, route: { type: 'hub', hub: 'privacy' } },
  ]);

  const graph = hubGraph({
    locale: typed,
    route: { type: 'hub', hub: 'privacy' },
    name: title,
    description,
    breadcrumbs: crumbs,
  });

  const whatsappNote =
    siteConfig.contact.whatsapp.length > 0
      ? isEn
        ? ` WhatsApp messages sent to the number published on this site.`
        : ` Mensajes de WhatsApp enviados al número publicado en este sitio.`
      : '';

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
              ? `Last updated: July 2026. This policy explains how ${siteConfig.legalName} (“${siteConfig.name}”) processes personal data when you visit ${siteConfig.domain} or contact us about content strategy and video services.`
              : `Última actualización: julio de 2026. Esta política explica cómo ${siteConfig.legalName} (“${siteConfig.name}”) trata datos personales cuando visitas ${siteConfig.domain} o nos contactas por servicios de estrategia y contenido.`}
          </p>

          <section>
            <h2>{isEn ? 'Data controller' : 'Responsable del tratamiento'}</h2>
            <p>
              {isEn ? 'Controller:' : 'Responsable:'}{' '}
              <strong>{siteConfig.legalName}</strong>
              <br />
              {isEn ? 'Contact email:' : 'Correo de contacto:'}{' '}
              <a href={`mailto:${siteConfig.contact.email}`}>
                {siteConfig.contact.email}
              </a>
              <br />
              {isEn ? 'Location:' : 'Ubicación:'}{' '}
              {siteConfig.geo.addressLocality}, {siteConfig.geo.addressCountry}
            </p>
          </section>

          <section>
            <h2>{isEn ? 'Data we may collect' : 'Datos que podemos recopilar'}</h2>
            <ul>
              <li>
                {isEn
                  ? 'Identity and contact data you provide: name, email, company, message content and service interest when you write via the contact form, email or WhatsApp.'
                  : 'Datos de identificación y contacto que tú entregas: nombre, correo, empresa, contenido del mensaje e interés de servicio al escribir por formulario, correo o WhatsApp.'}
              </li>
              <li>
                {isEn
                  ? 'Technical usage data: IP address, browser type, pages visited and approximate location through analytics tools (e.g. Google Analytics), when enabled.'
                  : 'Datos técnicos de uso: dirección IP, tipo de navegador, páginas visitadas y ubicación aproximada mediante herramientas de analítica (p. ej. Google Analytics), cuando estén activas.'}
              </li>
              <li>
                {isEn
                  ? 'Cookies and similar technologies required for site operation, language preference and measurement.'
                  : 'Cookies y tecnologías similares necesarias para operación del sitio, preferencia de idioma y medición.'}
              </li>
            </ul>
          </section>

          <section>
            <h2>{isEn ? 'Purpose and legal basis' : 'Finalidad y base legal'}</h2>
            <p>
              {isEn
                ? 'We use your data to respond to inquiries, prepare quotes, deliver contracted services, improve the website and comply with legal obligations. Processing is based on your consent, pre-contractual steps or legitimate interest in operating a professional services site.'
                : 'Usamos tus datos para responder consultas, preparar cotizaciones, prestar servicios contratados, mejorar el sitio y cumplir obligaciones legales. El tratamiento se basa en tu consentimiento, medidas precontractuales o interés legítimo en operar un sitio de servicios profesionales.'}
            </p>
          </section>

          <section>
            <h2>{isEn ? 'Channels covered' : 'Canales cubiertos'}</h2>
            <p>
              {isEn
                ? `This policy applies to data shared through the contact form on this website, email to ${siteConfig.contact.email}, and${whatsappNote || ' other published contact channels.'}`
                : `Esta política aplica a datos compartidos por el formulario de contacto de este sitio, correo a ${siteConfig.contact.email}, y${whatsappNote || ' otros canales de contacto publicados.'}`}
            </p>
          </section>

          <section>
            <h2>{isEn ? 'Retention and sharing' : 'Conservación y transferencia'}</h2>
            <p>
              {isEn
                ? 'We retain contact records while a commercial relationship is active and for a reasonable period afterward for accounting and legal purposes. We do not sell personal data. Processors (hosting, email, analytics) may access data only to provide their service and under appropriate safeguards.'
                : 'Conservamos registros de contacto mientras exista relación comercial y un periodo razonable después para fines contables y legales. No vendemos datos personales. Encargados del tratamiento (hosting, correo, analítica) pueden acceder solo para prestar su servicio y con salvaguardas adecuadas.'}
            </p>
          </section>

          <section>
            <h2>{isEn ? 'Your rights (Colombia)' : 'Tus derechos (Colombia)'}</h2>
            <p>
              {isEn
                ? 'Under Law 1581 of 2012 and related regulations, you may access, update, rectify or delete your data, and revoke authorization where applicable. To exercise your rights, email'
                : 'Conforme a la Ley 1581 de 2012 y normas complementarias, puedes conocer, actualizar, rectificar o suprimir tus datos y revocar la autorización cuando aplique. Para ejercer tus derechos, escribe a'}{' '}
              <a href={`mailto:${siteConfig.contact.email}`}>
                {siteConfig.contact.email}
              </a>
              {isEn
                ? ' with the subject “Data protection”.'
                : ' con asunto “Protección de datos”.'}
            </p>
          </section>
        </div>
      </PageShell>
    </>
  );
}
