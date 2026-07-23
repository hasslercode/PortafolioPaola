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
import { GeoAnswer } from '@/components/content/GeoAnswer';

type PageProps = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type ProcessStep = { index: string; title: string; detail: string };

function buildProcessSteps(isEn: boolean): ProcessStep[] {
  return isEn
    ? [
        {
          index: '01',
          title: 'Initial contact',
          detail:
            'You share context via the contact form, email or WhatsApp: brand, goals, current channels and timeline.',
        },
        {
          index: '02',
          title: 'Diagnosis & proposal',
          detail:
            'We review your situation, recommend the right entry point (session, strategy, production or monthly ops) and send a scoped quote in COP.',
        },
        {
          index: '03',
          title: 'Strategy alignment',
          detail:
            'We define message, pillars, tone and priorities. For production-only projects, we align on brief, references and success criteria.',
        },
        {
          index: '04',
          title: 'Production & editing',
          detail:
            'Ideas become scripts, edits or coordinated shoots from your footage. A pilot piece aligns standard before larger packs.',
        },
        {
          index: '05',
          title: 'Delivery & publishing',
          detail:
            'Final files export in the agreed formats. On monthly management, we schedule, publish and document what went live.',
        },
        {
          index: '06',
          title: 'Measure & adjust',
          detail:
            'We read retention, saves and business signals — not vanity alone — and adjust the next cycle with clear priorities.',
        },
      ]
    : [
        {
          index: '01',
          title: 'Contacto inicial',
          detail:
            'Compartes contexto por formulario, correo o WhatsApp: marca, objetivos, canales actuales y plazos.',
        },
        {
          index: '02',
          title: 'Diagnóstico y propuesta',
          detail:
            'Revisamos tu situación, recomendamos el punto de entrada (sesión, estrategia, producción u operación mensual) y enviamos cotización acotada en COP.',
        },
        {
          index: '03',
          title: 'Alineación estratégica',
          detail:
            'Definimos mensaje, pilares, tono y prioridades. En proyectos solo producción, alineamos brief, referencias y criterios de éxito.',
        },
        {
          index: '04',
          title: 'Producción y edición',
          detail:
            'Las ideas se convierten en guiones, ediciones o grabaciones coordinadas a partir de tu material. Una pieza piloto alinea estándar antes de packs mayores.',
        },
        {
          index: '05',
          title: 'Entrega y publicación',
          detail:
            'Archivos finales en formatos acordados. En gestión mensual, programamos, publicamos y documentamos lo que salió al aire.',
        },
        {
          index: '06',
          title: 'Medición y ajuste',
          detail:
            'Leemos retención, guardados y señales comerciales — no solo vanidad — y ajustamos el siguiente ciclo con prioridades claras.',
        },
      ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  return buildPageMetadata({
    locale: locale as SiteLocale,
    title: isEn
      ? 'Work process | Content & video Colombia | Paola Hoyos'
      : 'Proceso de trabajo | Contenido y video Colombia | Paola Hoyos',
    description: isEn
      ? 'Six clear steps from first contact to delivery and measurement for content strategy and video services in Colombia.'
      : 'Seis pasos claros desde el primer contacto hasta entrega y medición para servicios de estrategia y contenido en Colombia.',
    route: { type: 'hub', hub: 'process' },
    keywords: [
      'proceso estrategia contenido',
      'cómo trabajar estratega digital',
      'flujo edición reels colombia',
    ],
  });
}

export default async function ProcessPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const typed = (locale === 'en' ? 'en' : 'es') as SiteLocale;
  const isEn = typed === 'en';
  const title = isEn ? 'Work process' : 'Proceso de trabajo';
  const description = isEn
    ? 'How projects move from contact to delivery and iteration.'
    : 'Cómo avanzan los proyectos desde el contacto hasta entrega e iteración.';

  const steps = buildProcessSteps(isEn);

  const crumbs = buildBreadcrumbs(typed, [
    { name: title, route: { type: 'hub', hub: 'process' } },
  ]);

  const graph = hubGraph({
    locale: typed,
    route: { type: 'hub', hub: 'process' },
    name: title,
    description,
    breadcrumbs: crumbs,
    howToSteps: steps.map((step) => ({
      name: `${step.index} — ${step.title}`,
      text: step.detail,
    })),
  });

  return (
    <>
      <JsonLdScript graph={graph} />
      <div className="container" style={{ paddingTop: '1rem' }}>
        <Breadcrumbs items={crumbs} locale={locale} />
      </div>
      <PageShell
        eyebrow={isEn ? 'How we work' : 'Cómo trabajamos'}
        title={title}
        cta={{ href: '/contact', label: isEn ? 'Start a project' : 'Iniciar proyecto' }}
        afterTitle={
          <GeoAnswer label={isEn ? 'Short answer' : 'Respuesta corta'}>
            {isEn
              ? 'Every project follows the same spine: understand the business, agree scope in writing, produce with premium editing standards, deliver on time and read results to improve the next cycle.'
              : 'Todo proyecto sigue la misma columna vertebral: entender el negocio, acordar alcance por escrito, producir con estándar de edición premium, entregar a tiempo y leer resultados para mejorar el siguiente ciclo.'}
          </GeoAnswer>
        }
      >
        <ol className="offer-process__steps process-page__steps">
          {steps.map((step) => (
            <li key={step.index}>
              <span className="offer-process__copy">
                <strong>
                  <span className="offer-process__num">{step.index}</span>{' '}
                  {step.title}
                </strong>
                <small>{step.detail}</small>
              </span>
            </li>
          ))}
        </ol>

        <div className="page-prose">
          <p>
            {isEn ? 'Not sure which step applies to you?' : '¿No sabes qué paso te aplica?'}{' '}
            <Link href="/faq">
              {isEn ? 'Read the FAQ' : 'Lee las preguntas frecuentes'}
            </Link>
            {' · '}
            <Link href="/pricing">
              {isEn ? 'See investment ranges' : 'Ver rangos de inversión'}
            </Link>
            {' · '}
            <Link href="/services">
              {isEn ? 'Explore services' : 'Explorar servicios'}
            </Link>
          </p>
        </div>
      </PageShell>
    </>
  );
}
