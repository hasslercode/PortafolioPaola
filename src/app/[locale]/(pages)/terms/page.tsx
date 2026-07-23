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
      ? 'Terms of service | Paola Hoyos'
      : 'Términos del servicio | Paola Hoyos',
    description: isEn
      ? 'Basic terms for content strategy, video editing and monthly management services offered by Paola Hoyos in Colombia.'
      : 'Condiciones básicas para servicios de estrategia, edición de video y gestión mensual ofrecidos por Paola Hoyos en Colombia.',
    route: { type: 'hub', hub: 'terms' },
    keywords: ['términos de servicio', 'condiciones contratación', 'contenido digital colombia'],
  });
}

export default async function TermsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const typed = (locale === 'en' ? 'en' : 'es') as SiteLocale;
  const isEn = typed === 'en';
  const title = isEn ? 'Terms of service' : 'Términos del servicio';
  const description = isEn
    ? 'General conditions for professional content and video services.'
    : 'Condiciones generales para servicios profesionales de contenido y video.';

  const crumbs = buildBreadcrumbs(typed, [
    { name: title, route: { type: 'hub', hub: 'terms' } },
  ]);

  const graph = hubGraph({
    locale: typed,
    route: { type: 'hub', hub: 'terms' },
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
              ? `These terms govern the professional services offered by ${siteConfig.legalName} through ${siteConfig.domain}. Specific scope, deliverables, timelines and fees are always defined in a written proposal or contract accepted by both parties.`
              : `Estos términos regulan los servicios profesionales ofrecidos por ${siteConfig.legalName} a través de ${siteConfig.domain}. El alcance, entregables, plazos y honorarios específicos siempre se definen en una propuesta o contrato escrito aceptado por ambas partes.`}
          </p>

          <section>
            <h2>{isEn ? 'Services covered' : 'Servicios cubiertos'}</h2>
            <p>
              {isEn
                ? 'Strategy sessions, content strategy documents, social video editing, UGC-oriented production workflows and monthly organic content management for brands and entrepreneurs in Colombia. Paid media management and 24/7 community care are not included unless explicitly contracted.'
                : 'Sesiones estratégicas, documentos de estrategia de contenido, edición de video para redes, flujos de producción orientados a UGC y gestión mensual de contenido orgánico para marcas y emprendedores en Colombia. Pauta publicitaria y community care 24/7 no están incluidos salvo contratación expresa.'}
            </p>
          </section>

          <section>
            <h2>{isEn ? 'Quotes and payment' : 'Cotizaciones y pago'}</h2>
            <p>
              {isEn
                ? 'Published “from” prices on the pricing page are orientation anchors in Colombian pesos (COP). The final quote depends on volume, length, revisions, platforms and timeline. Payment terms (advance, milestones, methods) are stated in each proposal. Work on deliverables begins after agreed initial payment unless otherwise written.'
                : 'Los precios “desde” publicados en tarifas son anclas orientativas en pesos colombianos (COP). La cotización final depende de volumen, duración, revisiones, plataformas y plazos. Las condiciones de pago (anticipo, hitos, medios) se indican en cada propuesta. El trabajo en entregables inicia tras el pago inicial acordado, salvo pacto distinto por escrito.'}
            </p>
          </section>

          <section>
            <h2>{isEn ? 'Revisions and approvals' : 'Revisiones y aprobaciones'}</h2>
            <p>
              {isEn
                ? 'Each project includes the revision rounds specified in the proposal. Additional rounds or scope changes may be quoted separately. Client feedback delays may shift delivery dates proportionally.'
                : 'Cada proyecto incluye las rondas de revisión indicadas en la propuesta. Rondas adicionales o cambios de alcance pueden cotizarse aparte. Retrasos en retroalimentación del cliente pueden desplazar fechas de entrega de forma proporcional.'}
            </p>
          </section>

          <section>
            <h2>{isEn ? 'Intellectual property' : 'Propiedad intelectual'}</h2>
            <p>
              {isEn
                ? 'Upon full payment, the client receives usage rights over final deliverables as defined in the contract. Preliminary files, unused edits, internal templates and methodology remain the property of Paola Hoyos unless otherwise agreed. Portfolio use of non-confidential work may be referenced with client approval.'
                : 'Tras el pago total, el cliente recibe derechos de uso sobre entregables finales según el contrato. Archivos preliminares, ediciones no usadas, plantillas internas y metodología permanecen propiedad de Paola Hoyos salvo pacto distinto. El uso en portafolio de trabajos no confidenciales puede referenciarse con aprobación del cliente.'}
            </p>
          </section>

          <section>
            <h2>{isEn ? 'Cancellation' : 'Cancelación'}</h2>
            <p>
              {isEn
                ? 'Either party may terminate according to the signed agreement. Work completed up to the cancellation date is billable. Non-refundable advances cover reserved calendar time and work already performed.'
                : 'Cualquiera de las partes puede terminar conforme al acuerdo firmado. El trabajo realizado hasta la fecha de cancelación es facturable. Anticipos no reembolsables cubren tiempo de agenda reservado y trabajo ya ejecutado.'}
            </p>
          </section>

          <section>
            <h2>{isEn ? 'Limitation of liability' : 'Limitación de responsabilidad'}</h2>
            <p>
              {isEn
                ? 'Services are provided with professional diligence. Organic results depend on platform algorithms, market conditions and client execution. Liability is limited to the amount paid for the specific service giving rise to the claim, except where law prohibits such limitation.'
                : 'Los servicios se prestan con diligencia profesional. Los resultados orgánicos dependen de algoritmos, condiciones de mercado y ejecución del cliente. La responsabilidad se limita al monto pagado por el servicio específico que originó el reclamo, salvo prohibición legal.'}
            </p>
          </section>

          <section>
            <h2>{isEn ? 'Contact' : 'Contacto'}</h2>
            <p>
              {isEn ? 'Questions about these terms:' : 'Preguntas sobre estos términos:'}{' '}
              <a href={`mailto:${siteConfig.contact.email}`}>
                {siteConfig.contact.email}
              </a>
            </p>
          </section>
        </div>
      </PageShell>
    </>
  );
}
