import fs from 'node:fs';
import path from 'node:path';
import {
  renderSections,
  ensureMinWords,
  esLinks as L,
  enLinks as EL,
  wordCount,
  depthBlocksEs,
  depthBlocksEn,
  PAD_ES,
  PAD_EN,
} from './blog-sections.mjs';

const ES = path.join(process.cwd(), 'content/blog/es');
const EN = path.join(process.cwd(), 'content/blog/en');

function yaml(s) {
  return JSON.stringify(s);
}

function fm(a, loc, body) {
  const d = a[loc];
  const slugEn = a.slugEn ?? a.slug;
  return `---
type: blog
slug:
  es: ${a.slug}
  en: ${slugEn}
title: ${yaml(d.title)}
shortAnswer: ${yaml(d.shortAnswer)}
publishedAt: ${yaml(a.publishedAt)}
updatedAt: ${yaml(a.publishedAt)}
topic: ${a.topic}
intent: ${a.intent}
primaryKeyword: ${yaml(d.primaryKeyword)}
cluster: ${a.cluster}
relatedSlugs:
${a.relatedSlugs.map((s) => `  - ${s}`).join('\n')}
serviceCta: ${a.serviceCta}
draft: false
seo:
  title: ${yaml(d.seoTitle)}
  description: ${yaml(d.seoDescription)}
  keywords:
${d.keywords.map((k) => `    - ${k}`).join('\n')}
faq:
${d.faq.map((f) => `  - question: ${yaml(f.q)}\n    answer: ${yaml(f.a)}`).join('\n')}
---

${body}`;
}

function write(a) {
  for (const loc of ['es', 'en']) {
    const dir = loc === 'es' ? ES : EN;
    const body = loc === 'es' ? a.bodyEs : a.bodyEn;
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, `${a.slug}.mdx`), fm(a, loc, body) + '\n');
  }
}

function faq4(items) {
  return items;
}

function geoArticle(cfg) {
  const {
    slug,
    pub,
    city,
    cityEn,
    service,
    serviceEn,
    rel = [],
    kw,
    kwEn,
    title,
    titleEn,
    short,
    shortEn,
    seoT,
    seoE,
    cta = 'produccion-contenido',
    caseRef,
    caseRefEn,
  } = cfg;

  const bodyEs = ensureMinWords(
    renderSections([
      {
        h: 'Respuesta corta',
        ps: [
          `${service} en ${city} combina conocimiento del mercado local con entrega remota profesional: estrategia, guiones, edición y publicación sin depender de agencias genéricas.`,
          `Trabajo con marcas en ${city} y todo Colombia — sesiones por videollamada, producción con material que envías o grabamos en locación cuando aplica, y entrega optimizada para Instagram y TikTok.`,
        ],
      },
      {
        h: `Por qué ${city} necesita contenido específico`,
        ps: [
          `${city} tiene competencia orgánica creciente en retail, servicios y emprendimiento. El contenido que funciona aquí mezcla prueba local, tono cercano y formatos verticales con subtítulos — no copiar tendencias globales sin contexto.`,
          `Marcas en centros comerciales, restaurantes y pymes de servicios compiten por atención en el feed. Un sistema de contenido (pilares, cadencia, CTA a WhatsApp) supera publicaciones aisladas.`,
        ],
      },
      {
        h: 'Prueba local y entrega remota',
        ps: [
          caseRef ??
            `Experiencia documentada con marcas de consumo — Coca-Cola, Starbucks, H&M, TOTTO, Cine Colombia — en contextos retail como Parque Alegra, con **+1.3M vistas orgánicas** en 90 días cuando el mensaje y la cadencia están alineados.`,
          `La entrega remota no significa calidad menor: brief estructurado, revisión por Loom o WhatsApp, archivos finales en 9:16 listos para publicar. Si necesitas locación en ${city}, se coordina según proyecto.`,
        ],
      },
      {
        h: 'Qué incluye el servicio',
        ps: [
          `**Estrategia:** pilares, buyer persona y calendario alineado a tu objetivo comercial.`,
          `**Producción:** guiones, edición de Reels, subtítulos quemados, export optimizado.`,
          `**Operación (opcional):** publicación, respuesta en comentarios y reporte mensual de KPIs de negocio.`,
          `Revisa ${L.produccion}, ${L.estrategia} y ${L.gestion} según la etapa de tu marca.`,
        ],
      },
      {
        h: 'Formatos que funcionan en la región',
        ps: [
          `Reels 15–45 segundos con hook en los primeros 3 segundos y CTA explícito.`,
          `Carruseles para objeciones y comparativas honestas — especialmente en servicios y retail.`,
          `Stories para promociones locales, behind the scenes y encuestas de intención.`,
          `UGC y prueba social cuando vendes producto físico o experiencia.`,
        ],
      },
      {
        h: 'Proceso de trabajo',
        ps: [
          `**1. Diagnóstico:** revisamos perfil, contenido reciente y consultas en WhatsApp.`,
          `**2. Propuesta:** alcance, entregables mensuales e inversión en COP — ver ${L.tarifas}.`,
          `**3. Piloto:** primera pieza o semana de contenido para alinear estándar.`,
          `**4. Cadencia:** producción en batch, publicación y revisión quincenal de métricas.`,
        ],
      },
      {
        h: 'Área de servicio',
        ps: [
          `Atiendo marcas en **${city}**, área metropolitana y todo Colombia. Modalidad remota para edición y estrategia; locación presencial bajo brief y disponibilidad.`,
          `Si buscas cobertura nacional, revisa también [producción de Reels Colombia](/es/blog/produccion-reels-colombia) y el hub de [ciudades](/es/ciudades).`,
        ],
      },
      {
        h: 'Cuándo contratar',
        ps: [
          `Llevas 8+ semanas publicando sin mejora en consultas calificadas.`,
          `Tienes estrategia clara pero el cuello de botella es edición o volumen.`,
          `Vas a lanzar producto, local nuevo o campaña estacional en ${city}.`,
          `Necesitas ${L.sesion} antes de invertir en producción mensual.`,
        ],
      },
      {
        h: 'Siguiente paso',
        ps: [
          `Escríbeme por ${L.contacto} o WhatsApp con contexto de tu marca, ciudad y objetivo del trimestre.`,
          `Explora ${L.pilar} y conecta con guías relacionadas del blog para profundizar antes de la primera llamada.`,
        ],
      },
    ]),
    1200,
    [
      `### Contexto ${city}\n\nEl mercado digital en ${city} premia marcas que muestran rostro, proceso y prueba — no solo catálogo. Adaptar mensaje al ticket local y al canal preferido (WhatsApp vs DM vs link) marca diferencia en conversión.`,
      `### Remote delivery\n\nBrief por Notion o PDF, feedback en 24–48h hábiles, entrega en Drive con nomenclatura clara. Sin sorpresas de alcance: entregables definidos desde la propuesta.`,
      ...depthBlocksEs(`${service} ${city}`, L),
    ],
    PAD_ES,
  );

  const bodyEn = ensureMinWords(
    renderSections([
      {
        h: 'Short answer',
        ps: [
          `${serviceEn} in ${cityEn} combines local market knowledge with professional remote delivery: strategy, scripts, editing and publishing without generic agencies.`,
          `I work with brands in ${cityEn} and across Colombia — video sessions, production from your footage or on-location when needed, optimized for Instagram and TikTok.`,
        ],
      },
      {
        h: `Why ${cityEn} needs specific content`,
        ps: [
          `${cityEn} has growing organic competition in retail, services and entrepreneurship. Content that works here mixes local proof, approachable tone and vertical formats with captions.`,
        ],
      },
      {
        h: 'Local proof and remote delivery',
        ps: [
          caseRefEn ??
            `Documented experience with consumer brands — Coca-Cola, Starbucks, H&M, TOTTO, Cine Colombia — in retail contexts like Parque Alegra, with **+1.3M organic views** in 90 days when message and cadence align.`,
        ],
      },
      {
        h: 'What the service includes',
        ps: [
          `**Strategy:** pillars, buyer persona and calendar aligned to commercial goals.`,
          `**Production:** scripts, Reel editing, burned captions, optimized export.`,
          `See ${EL.produccion}, ${EL.estrategia} and ${EL.gestion}.`,
        ],
      },
      {
        h: 'Service area',
        ps: [
          `I serve brands in **${cityEn}**, metro area and all Colombia. Remote for editing and strategy; on-location by project.`,
        ],
      },
      {
        h: 'Next step',
        ps: [
          `Contact via ${EL.contacto} or WhatsApp with brand context, city and quarterly goal.`,
        ],
      },
    ]),
    600,
    [...depthBlocksEn(`${serviceEn} ${cityEn}`, EL)],
    PAD_EN,
  );

  return {
    slug,
    publishedAt: pub,
    topic: 'local',
    cluster: 'local',
    intent: 'commercial',
    serviceCta: cta,
    relatedSlugs: rel,
    es: {
      title,
      shortAnswer: short,
      primaryKeyword: kw,
      seoTitle: seoT,
      seoDescription: short,
      keywords: kw.split(',').map((s) => s.trim()),
      faq: faq4([
        { q: `¿Trabajas presencial en ${city}?`, a: `La base es remota (estrategia y edición). Locación en ${city} se coordina según proyecto y disponibilidad.` },
        { q: '¿Cuánto tarda la primera entrega?', a: 'Tras brief aprobado, primera pieza piloto en 5–10 días hábiles según complejidad.' },
        { q: '¿Qué necesito para empezar?', a: 'Acceso a redes, referencias visuales, objetivo comercial del trimestre y material existente (fotos, videos, logo).' },
        { q: '¿Cobras en COP?', a: 'Sí — propuestas en pesos colombianos. Ver tarifas orientativas en la página de pricing.' },
      ]),
    },
    en: {
      title: titleEn,
      shortAnswer: shortEn,
      primaryKeyword: kwEn,
      seoTitle: seoE,
      seoDescription: shortEn,
      keywords: kwEn.split(',').map((s) => s.trim()),
      faq: faq4([
        { q: `Do you work on-site in ${cityEn}?`, a: `Remote is the default. On-location in ${cityEn} is coordinated per project.` },
        { q: 'How long until first delivery?', a: '5–10 business days after approved brief for a pilot piece.' },
        { q: 'What do I need to start?', a: 'Social access, visual references, quarterly goal and existing assets.' },
        { q: 'Do you charge in COP?', a: 'Yes — proposals in Colombian pesos.' },
      ]),
    },
    bodyEs,
    bodyEn,
  };
}

function verticalArticle(cfg) {
  const {
    slug,
    pub,
    vertical,
    verticalEn,
    proof,
    proofEn,
    rel = [],
    kw,
    kwEn,
    title,
    titleEn,
    short,
    shortEn,
    seoT,
    seoE,
    cta = 'produccion-contenido',
    topic = 'marketing',
  } = cfg;

  const bodyEs = ensureMinWords(
    renderSections([
      {
        h: 'Respuesta corta',
        ps: [
          `${vertical} exige mensajes, formatos y cadencia distintos a una marca genérica. Esta guía resume qué publicar, qué medir y cuándo escalar producción para pymes en Colombia.`,
          proof ?? `Marcas retail documentadas — incluyendo activaciones en centros comerciales — han superado **+1.3M vistas orgánicas** en 90 días con sistema de pilares y Reels verticales, no piezas aisladas.`,
        ],
      },
      {
        h: `Desafíos del sector`,
        ps: [
          `Competencia alta en feed y pauta. Diferenciación por prueba, proceso y tono — no solo descuento.`,
          `Equipos pequeños con poco tiempo para grabar y editar.`,
          `Necesidad de contenido que convierta en WhatsApp, reservas o visita a punto de venta.`,
        ],
      },
      {
        h: 'Pilares de contenido recomendados',
        ps: [
          `**Educación:** responde objeciones frecuentes del comprador de tu vertical.`,
          `**Prueba:** casos, testimonios, behind the scenes, UGC con permiso.`,
          `**Producto/servicio:** demo clara con CTA — no catálogo frío sin contexto.`,
          `**Cultura:** equipo, valores, origen — humaniza especialmente en servicios.`,
        ],
      },
      {
        h: 'Formatos que suelen funcionar',
        ps: [
          `Reels 9:16 con hook en 3 segundos y subtítulos quemados.`,
          `Carruseles para comparativas, checklists y antes/después.`,
          `Stories con encuestas, cupos limitados y enlaces a WhatsApp.`,
          `UGC o colaboraciones con clientes reales cuando aplica.`,
        ],
      },
      {
        h: 'Cadencia y operación',
        ps: [
          `Mínimo sostenible: 3–4 piezas semanales entre feed y Stories si buscas crecimiento orgánico serio.`,
          `Batch mensual de grabación + edición externa si el cuello de botella es postproducción — ver ${L.produccion}.`,
          `Calendario alineado a temporadas comerciales (Día de la Madre, Navidad, back to school).`,
        ],
      },
      {
        h: 'KPIs de negocio (no vanidad)',
        ps: [
          `Consultas calificadas por WhatsApp o formulario.`,
          `Reservas, foot traffic o ventas atribuibles con pregunta "¿cómo nos conociste?".`,
          `Guardados y shares en piezas educativas.`,
          `Retención en Reels de demo — señal de interés real.`,
        ],
      },
      {
        h: 'Errores comunes en la vertical',
        ps: [
          `Copiar trends sin adaptar mensaje al comprador del sector.`,
          `Publicar promoción sin prueba previa — quema audiencia.`,
          `Ignorar respuesta rápida en comentarios y DM las primeras 2 horas.`,
          `Mezclar demasiados mensajes en una semana sin hilo estratégico.`,
        ],
      },
      {
        h: 'Cuándo externalizar',
        ps: [
          `Estrategia clara pero sin capacidad de edición — ${L.produccion}.`,
          `Necesitas sistema completo — ${L.gestion} o ${L.estrategia}.`,
          `Lanzamiento o temporada alta — paquete de batch + pauta sobre winners.`,
        ],
      },
      {
        h: 'Siguiente paso',
        ps: [
          `Implementa 2 pilares esta semana y mide consultas 30 días.`,
          `¿Necesitas diagnóstico? ${L.contacto} o ${L.sesion}.`,
        ],
      },
    ]),
    1200,
    [
      proof ? `### Caso de referencia\n\n${proof}` : '',
      `### Integración vertical\n\nAdapta tono y CTA a tu ticket y ciclo de compra. Revisa ${L.pilar} y ${L.marketingEmp} como base estratégica.`,
      ...depthBlocksEs(vertical, L),
    ].filter(Boolean),
    PAD_ES,
  );

  const bodyEn = ensureMinWords(
    renderSections([
      {
        h: 'Short answer',
        ps: [
          `${verticalEn} requires distinct messages, formats and cadence. This guide covers what to publish, what to measure and when to scale production for SMBs in Colombia.`,
        ],
      },
      {
        h: 'Sector challenges',
        ps: [
          `High feed and paid competition. Differentiation through proof, process and tone.`,
          `Small teams with limited shoot and edit time.`,
        ],
      },
      {
        h: 'Recommended content pillars',
        ps: [
          `**Education:** answer frequent buyer objections.`,
          `**Proof:** cases, testimonials, BTS, permitted UGC.`,
          `**Offer:** clear demo with CTA.`,
        ],
      },
      {
        h: 'Next step',
        ps: [`Implement 2 pillars this week. Contact ${EL.contacto} for diagnosis.`],
      },
    ]),
    600,
    [...depthBlocksEn(verticalEn, EL)],
    PAD_EN,
  );

  return {
    slug,
    publishedAt: pub,
    topic,
    cluster: 'strategy',
    intent: 'commercial',
    serviceCta: cta,
    relatedSlugs: rel,
    es: {
      title,
      shortAnswer: short,
      primaryKeyword: kw,
      seoTitle: seoT,
      seoDescription: short,
      keywords: kw.split(',').map((s) => s.trim()),
      faq: faq4([
        { q: '¿Cuántas piezas mensuales necesito?', a: 'Entre 12 y 20 piezas mensuales (feed + Stories) es un rango común para crecimiento orgánico en pymes.' },
        { q: '¿UGC o producción de marca?', a: 'Combina ambos: UGC para prueba social; producción de marca para mensaje estratégico y lanzamientos.' },
        { q: '¿Cuánto tarda en verse resultados?', a: 'Entre 4 y 12 semanas con cadencia constante según ticket y sector.' },
        { q: '¿Trabajas con marcas fuera de Bogotá?', a: 'Sí — remoto en todo Colombia con entrega optimizada para redes.' },
      ]),
    },
    en: {
      title: titleEn,
      shortAnswer: shortEn,
      primaryKeyword: kwEn,
      seoTitle: seoE,
      seoDescription: shortEn,
      keywords: kwEn.split(',').map((s) => s.trim()),
      faq: faq4([
        { q: 'How many monthly pieces?', a: '12–20 pieces (feed + Stories) is common for organic growth.' },
        { q: 'UGC or brand production?', a: 'Combine both for proof and strategic launches.' },
        { q: 'Time to results?', a: '4–12 weeks with consistent cadence.' },
        { q: 'Outside Bogotá?', a: 'Yes — remote across Colombia.' },
      ]),
    },
    bodyEs,
    bodyEn,
  };
}

function glossaryArticle(cfg) {
  const {
    slug,
    pub,
    term,
    termEn,
    definition,
    definitionEn,
    pilarSlug,
    pilarTitle,
    pilarTitleEn,
    rel = [],
    kw,
    kwEn,
    title,
    titleEn,
    short,
    shortEn,
    seoT,
    seoE,
  } = cfg;

  const pilarLinkEs = `[${pilarTitle}](/es/blog/${pilarSlug})`;
  const pilarLinkEn = `[${pilarTitleEn}](/en/blog/${pilarSlug})`;

  const bodyEs = ensureMinWords(
    renderSections([
      {
        h: 'Definición',
        ps: [definition, `En el contexto de marcas y pymes en Colombia, ${term} conecta con estrategia, producción y medición — no es jerga de agencia sin aplicación práctica.`],
      },
      {
        h: 'Por qué importa',
        ps: [
          `Entender ${term} evita malentendidos con proveedores, briefs incompletos y métricas vanity sin impacto en ventas.`,
          `Equipos pequeños que documentan este concepto mejoran alineación entre quien idea, graba, edita y publica.`,
        ],
      },
      {
        h: 'Ejemplo práctico',
        ps: [
          `Una pyme de servicios usa ${term} en su calendario semanal: cada pieza se etiqueta y se revisa en reunión de 30 minutos los viernes.`,
          `Tras 6–8 semanas, identifican qué formato genera consultas en WhatsApp y duplican ese ángulo.`,
        ],
      },
      {
        h: 'Errores comunes',
        ps: [
          `Usar el término en reuniones sin definición compartida.`,
          `Medir ${term} sin conectarlo a KPI de negocio.`,
          `Copiar definiciones de blogs en inglés sin adaptar al mercado local.`,
        ],
      },
      {
        h: 'Profundiza',
        ps: [
          `Para marco completo, lee ${pilarLinkEs} y explora guías relacionadas en el blog.`,
          `Si necesitas implementación en tu marca: ${L.contacto}.`,
        ],
      },
    ]),
    400,
    [
      `### Relacionado\n\n${term} aparece en conversaciones sobre ${L.pilar}, producción de video y gestión de redes. Mantén un glosario interno de 10–15 términos para onboarding de freelancers.`,
      `### Checklist rápido\n\n¿Todo el equipo usa la misma definición? ¿Hay ejemplo en nuestro contenido reciente? ¿Medimos impacto en consultas o ventas?`,
    ],
    PAD_ES,
  );

  const bodyEn = ensureMinWords(
    renderSections([
      {
        h: 'Definition',
        ps: [definitionEn, `For brands and SMBs in Colombia, ${termEn} connects to strategy, production and measurement.`],
      },
      {
        h: 'Why it matters',
        ps: [
          `Understanding ${termEn} avoids vendor misunderstandings and vanity metrics without sales impact.`,
        ],
      },
      {
        h: 'Practical example',
        ps: [
          `An SMB tags each weekly piece with ${termEn} and reviews in a 30-minute Friday meeting.`,
        ],
      },
      {
        h: 'Go deeper',
        ps: [`Read ${pilarLinkEn}. Contact ${EL.contacto} for implementation.`],
      },
    ]),
    250,
    [`### Related\n\nSee ${EL.pilar} for full framework.`],
    PAD_EN,
  );

  // Cap ES at ~700 for glossary — trim padding if over
  let finalBodyEs = bodyEs;
  while (wordCount(finalBodyEs) > 700) {
    const parts = finalBodyEs.split('\n\n');
    if (parts.length <= 5) break;
    finalBodyEs = parts.slice(0, -1).join('\n\n');
  }

  return {
    slug,
    publishedAt: pub,
    topic: 'marketing',
    cluster: 'strategy',
    intent: 'commercial',
    serviceCta: 'estrategia-contenido',
    relatedSlugs: [pilarSlug, ...rel],
    es: {
      title,
      shortAnswer: short,
      primaryKeyword: kw,
      seoTitle: seoT,
      seoDescription: short,
      keywords: kw.split(',').map((s) => s.trim()),
      faq: faq4([
        { q: `¿${term} es lo mismo en Instagram y TikTok?`, a: 'El concepto es similar; la aplicación varía por formato, audiencia y métricas nativas de cada plataforma.' },
        { q: '¿Necesito software especial?', a: 'No siempre. Muchos términos son marco de trabajo; las herramientas dependen del término específico.' },
        { q: '¿Dónde aprendo más?', a: `En la guía pilar enlazada arriba y en artículos relacionados del blog.` },
      ]),
    },
    en: {
      title: titleEn,
      shortAnswer: shortEn,
      primaryKeyword: kwEn,
      seoTitle: seoE,
      seoDescription: shortEn,
      keywords: kwEn.split(',').map((s) => s.trim()),
      faq: faq4([
        { q: `Is ${termEn} the same on Instagram and TikTok?`, a: 'Concept is similar; application varies by platform.' },
        { q: 'Special software needed?', a: 'Not always — many terms are frameworks.' },
        { q: 'Where to learn more?', a: 'See the linked pillar guide.' },
      ]),
    },
    bodyEs: finalBodyEs,
    bodyEn,
  };
}

const articles = [];

// ——— F. Geo Colombia (9) ———
articles.push(
  geoArticle({
    slug: 'creacion-de-contenido-medellin',
    pub: '2026-11-13',
    city: 'Medellín',
    cityEn: 'Medellín',
    service: 'Creación de contenido',
    serviceEn: 'Content creation',
    kw: 'creación de contenido medellín',
    kwEn: 'content creation medellin',
    title: 'Creación de contenido en Medellín: estrategia y producción para marcas',
    titleEn: 'Content creation in Medellín: strategy and production for brands',
    short: 'Creación de contenido en Medellín con enfoque estratégico, Reels verticales y entrega remota para pymes y marcas retail.',
    shortEn: 'Content creation in Medellín with strategic focus, vertical Reels and remote delivery for SMBs and retail brands.',
    seoT: 'Creación de contenido Medellín | Paola Hoyos',
    seoE: 'Content creation Medellín | Paola Hoyos',
    rel: ['edicion-de-video-medellin', 'estrategia-digital-medellin', 'produccion-reels-colombia', 'creacion-de-contenido-para-redes-sociales'],
    caseRef: 'Experiencia con retail y consumo en Antioquia — incluyendo ecosistemas como Parque Alegra — con campañas que superaron **+1.3M vistas orgánicas** en 90 días.',
  }),
);

articles.push(
  geoArticle({
    slug: 'edicion-de-video-medellin',
    pub: '2026-11-16',
    city: 'Medellín',
    cityEn: 'Medellín',
    service: 'Edición de video',
    serviceEn: 'Video editing',
    kw: 'edición de video medellín',
    kwEn: 'video editing medellin',
    title: 'Edición de video en Medellín: Reels, TikTok y entrega profesional',
    titleEn: 'Video editing in Medellín: Reels, TikTok and professional delivery',
    short: 'Edición de video en Medellín para Reels y TikTok: jump cuts, subtítulos, motion y export 9:16 con entrega remota.',
    shortEn: 'Video editing in Medellín for Reels and TikTok: jump cuts, captions, motion and 9:16 export with remote delivery.',
    seoT: 'Edición de video Medellín | Reels y TikTok',
    seoE: 'Video editing Medellín | Reels and TikTok',
    cta: 'produccion-contenido',
    rel: ['creacion-de-contenido-medellin', 'precio-edicion-de-reels-colombia', 'produccion-reels-colombia', 'edicion-de-videos-para-redes-colombia'],
  }),
);

articles.push(
  geoArticle({
    slug: 'estrategia-digital-medellin',
    pub: '2026-11-19',
    city: 'Medellín',
    cityEn: 'Medellín',
    service: 'Estrategia digital',
    serviceEn: 'Digital strategy',
    kw: 'estrategia digital medellín',
    kwEn: 'digital strategy medellin',
    title: 'Estrategia digital en Medellín: contenido que convierte en consultas',
    titleEn: 'Digital strategy in Medellín: content that converts to inquiries',
    short: 'Estrategia digital en Medellín: pilares, calendario, buyer persona y funnel de contenido para pymes.',
    shortEn: 'Digital strategy in Medellín: pillars, calendar, buyer persona and content funnel for SMBs.',
    seoT: 'Estrategia digital Medellín | Guía 2026',
    seoE: 'Digital strategy Medellín | 2026 guide',
    cta: 'estrategia-contenido',
    rel: ['creacion-de-contenido-medellin', 'estrategia-de-contenido-colombia', 'community-manager-medellin', 'marketing-de-contenidos-para-emprendedores'],
  }),
);

articles.push(
  geoArticle({
    slug: 'creacion-de-contenido-bogota',
    pub: '2026-11-22',
    city: 'Bogotá',
    cityEn: 'Bogotá',
    service: 'Creación de contenido',
    serviceEn: 'Content creation',
    kw: 'creación de contenido bogotá',
    kwEn: 'content creation bogota',
    title: 'Creación de contenido en Bogotá: producción estratégica para marcas',
    titleEn: 'Content creation in Bogotá: strategic production for brands',
    short: 'Creación de contenido en Bogotá para marcas, retail y servicios — Reels, carruseles y gestión con enfoque comercial.',
    shortEn: 'Content creation in Bogotá for brands, retail and services — Reels, carousels and management with commercial focus.',
    seoT: 'Creación de contenido Bogotá | Paola Hoyos',
    seoE: 'Content creation Bogotá | Paola Hoyos',
    rel: ['videos-para-redes-bogota', 'produccion-reels-colombia', 'creacion-de-contenido-para-redes-sociales', 'estrategia-de-contenido-colombia'],
  }),
);

articles.push(
  geoArticle({
    slug: 'videos-para-redes-bogota',
    pub: '2026-11-25',
    city: 'Bogotá',
    cityEn: 'Bogotá',
    service: 'Videos para redes sociales',
    serviceEn: 'Social media videos',
    kw: 'videos para redes bogotá',
    kwEn: 'social media videos bogota',
    title: 'Videos para redes en Bogotá: Reels, TikTok y producción mensual',
    titleEn: 'Social videos in Bogotá: Reels, TikTok and monthly production',
    short: 'Videos para redes en Bogotá optimizados para retención, subtítulos y CTA — producción remota o en locación.',
    shortEn: 'Social videos in Bogotá optimized for retention, captions and CTA — remote or on-location production.',
    seoT: 'Videos para redes Bogotá | Reels y TikTok',
    seoE: 'Social videos Bogotá | Reels and TikTok',
    rel: ['creacion-de-contenido-bogota', 'videos-para-marcas-instagram-tiktok', 'produccion-reels-colombia', 'edicion-de-videos-para-redes-colombia'],
  }),
);

articles.push(
  geoArticle({
    slug: 'creacion-de-contenido-barranquilla',
    pub: '2026-11-28',
    city: 'Barranquilla',
    cityEn: 'Barranquilla',
    service: 'Creación de contenido',
    serviceEn: 'Content creation',
    kw: 'creación de contenido barranquilla',
    kwEn: 'content creation barranquilla',
    title: 'Creación de contenido en Barranquilla: marcas costeñas con alcance nacional',
    titleEn: 'Content creation in Barranquilla: coastal brands with national reach',
    short: 'Creación de contenido en Barranquilla para marcas locales con ambición nacional — estrategia, Reels y WhatsApp como canal de conversión.',
    shortEn: 'Content creation in Barranquilla for local brands with national ambition — strategy, Reels and WhatsApp as conversion channel.',
    seoT: 'Creación de contenido Barranquilla | Guía',
    seoE: 'Content creation Barranquilla | Guide',
    rel: ['creacion-de-contenido-medellin', 'creacion-de-contenido-bogota', 'produccion-reels-colombia', 'marketing-de-contenidos-para-emprendedores'],
  }),
);

articles.push(
  geoArticle({
    slug: 'content-strategist-colombia-remoto',
    pub: '2026-12-01',
    city: 'Colombia',
    cityEn: 'Colombia',
    service: 'Content strategist',
    serviceEn: 'Content strategist',
    kw: 'content strategist colombia remoto',
    kwEn: 'content strategist colombia remote',
    title: 'Content strategist Colombia remoto: estrategia sin agencia tradicional',
    titleEn: 'Remote content strategist Colombia: strategy without a traditional agency',
    short: 'Content strategist en Colombia con modalidad remota: pilares, calendario, briefs y acompañamiento a equipos internos o freelancers.',
    shortEn: 'Content strategist in Colombia remotely: pillars, calendar, briefs and support for internal teams or freelancers.',
    seoT: 'Content strategist Colombia remoto | Paola Hoyos',
    seoE: 'Remote content strategist Colombia | Paola Hoyos',
    cta: 'estrategia-contenido',
    rel: ['estrategia-de-contenido-colombia', 'como-contratar-estratega-digital', 'community-manager-vs-estratega-digital', 'gestion-mensual'],
  }),
);

articles.push(
  geoArticle({
    slug: 'community-manager-medellin',
    pub: '2026-12-04',
    city: 'Medellín',
    cityEn: 'Medellín',
    service: 'Community manager',
    serviceEn: 'Community manager',
    kw: 'community manager medellín',
    kwEn: 'community manager medellin',
    title: 'Community manager Medellín: cuándo necesitas estratega en su lugar',
    titleEn: 'Community manager Medellín: when you need a strategist instead',
    short: 'Community manager en Medellín: diferencias con estratega digital, entregables, tarifas orientativas y cuándo escalar a gestión estratégica.',
    shortEn: 'Community manager in Medellín: differences from digital strategist, deliverables, rates and when to scale to strategic management.',
    seoT: 'Community manager Medellín | Guía 2026',
    seoE: 'Community manager Medellín | 2026 guide',
    cta: 'gestion-mensual',
    rel: ['community-manager-vs-estratega-digital', 'tarifas-community-manager-colombia', 'estrategia-digital-medellin', 'gestion-mensual'],
  }),
);

articles.push(
  geoArticle({
    slug: 'produccion-reels-colombia',
    pub: '2026-12-07',
    city: 'Colombia',
    cityEn: 'Colombia',
    service: 'Producción de Reels',
    serviceEn: 'Reels production',
    kw: 'producción reels colombia',
    kwEn: 'reels production colombia',
    title: 'Producción de Reels Colombia: batch, edición y cadencia para marcas',
    titleEn: 'Reels production Colombia: batch, editing and cadence for brands',
    short: 'Producción de Reels en Colombia con enfoque batch: guiones, grabación, edición 9:16 y optimización para Instagram y TikTok.',
    shortEn: 'Reels production in Colombia with batch focus: scripts, shooting, 9:16 editing for Instagram and TikTok.',
    seoT: 'Producción Reels Colombia | Paola Hoyos',
    seoE: 'Reels production Colombia | Paola Hoyos',
    rel: ['creacion-de-contenido-medellin', 'precio-edicion-de-reels-colombia', 'pack-de-contenido-mensual-cuantos-videos', 'videos-para-marcas-instagram-tiktok'],
  }),
);

// ——— G. Verticales (8) ———
articles.push(
  verticalArticle({
    slug: 'contenido-para-centros-comerciales',
    pub: '2026-12-10',
    vertical: 'Contenido para centros comerciales',
    verticalEn: 'Content for shopping malls',
    kw: 'contenido para centros comerciales',
    kwEn: 'content for shopping malls',
    title: 'Contenido para centros comerciales: activaciones, tenants y tráfico',
    titleEn: 'Content for shopping malls: activations, tenants and foot traffic',
    short: 'Contenido para centros comerciales que impulsa tráfico, visibilidad de marcas ancla y engagement de visitantes.',
    shortEn: 'Content for shopping malls that drives foot traffic, anchor brand visibility and visitor engagement.',
    seoT: 'Contenido centros comerciales | Guía Colombia',
    seoE: 'Shopping mall content | Colombia guide',
    proof: 'Referencia directa: trabajo documentado en **Parque Alegra** con marcas como Coca-Cola, Starbucks, H&M, TOTTO y Cine Colombia — **+1.3M vistas orgánicas** en 90 días con Reels, activaciones y calendario coordinado.',
    rel: ['contenido-para-retail-moda', 'storytelling-para-retail', 'marketing-marcas-consumo', 'videos-para-marcas-instagram-tiktok'],
    cta: 'produccion-contenido',
  }),
);

articles.push(
  verticalArticle({
    slug: 'contenido-para-retail-moda',
    pub: '2026-12-13',
    vertical: 'Contenido para retail moda',
    verticalEn: 'Content for fashion retail',
    kw: 'contenido para retail moda',
    kwEn: 'content for fashion retail',
    title: 'Contenido para retail moda: lookbooks, Reels y UGC en Colombia',
    titleEn: 'Content for fashion retail: lookbooks, Reels and UGC in Colombia',
    short: 'Contenido para retail moda: outfits en video, UGC, lanzamientos de colección y prueba social para tiendas físicas y ecommerce.',
    shortEn: 'Content for fashion retail: outfit videos, UGC, collection launches and social proof.',
    seoT: 'Contenido retail moda | Guía 2026',
    seoE: 'Fashion retail content | 2026 guide',
    topic: 'branding',
    rel: ['ugc-para-marcas-de-moda', 'contenido-para-centros-comerciales', 'contenido-para-ecommerce', 'storytelling-para-retail'],
  }),
);

articles.push(
  verticalArticle({
    slug: 'contenido-para-restaurantes-cafes',
    pub: '2026-12-16',
    vertical: 'Contenido para restaurantes y cafés',
    verticalEn: 'Content for restaurants and cafés',
    kw: 'contenido para restaurantes cafés',
    kwEn: 'content for restaurants cafes',
    title: 'Contenido para restaurantes y cafés: reservas, menú y ambiente en video',
    titleEn: 'Content for restaurants and cafés: reservations, menu and ambiance video',
    short: 'Contenido para restaurantes y cafés: Reels de platos, behind the kitchen, promos locales y CTA a reserva o WhatsApp.',
    shortEn: 'Content for restaurants and cafés: dish Reels, kitchen BTS, local promos and reservation CTA.',
    seoT: 'Contenido restaurantes y cafés | Colombia',
    seoE: 'Restaurant and café content | Colombia',
    rel: ['ugc-para-restaurantes', 'contenido-para-marcas-personales', 'hooks-primeros-3-segundos-tiktok', 'creacion-de-contenido-para-redes-sociales'],
  }),
);

articles.push(
  verticalArticle({
    slug: 'contenido-para-marcas-personales',
    pub: '2026-12-19',
    vertical: 'Contenido para marcas personales',
    verticalEn: 'Content for personal brands',
    kw: 'contenido para marcas personales',
    kwEn: 'content for personal brands',
    title: 'Contenido para marcas personales: autoridad, ventas y consistencia',
    titleEn: 'Content for personal brands: authority, sales and consistency',
    short: 'Contenido para marcas personales: posicionamiento, pilares de autoridad, venta de servicios y cadencia sostenible.',
    shortEn: 'Content for personal brands: positioning, authority pillars, service sales and sustainable cadence.',
    seoT: 'Contenido marcas personales | Guía 2026',
    seoE: 'Personal brand content | 2026 guide',
    topic: 'branding',
    rel: ['que-publicar-si-vendes-servicios', 'tono-de-voz-de-marca-guia', 'contenido-para-educacion-cursos', 'marketing-de-contenidos-para-emprendedores'],
    cta: 'estrategia-contenido',
  }),
);

articles.push(
  verticalArticle({
    slug: 'contenido-para-ecommerce',
    pub: '2026-12-22',
    vertical: 'Contenido para ecommerce',
    verticalEn: 'Content for ecommerce',
    kw: 'contenido para ecommerce',
    kwEn: 'content for ecommerce',
    title: 'Contenido para ecommerce: UGC, demos y conversión sin depender solo de pauta',
    titleEn: 'Content for ecommerce: UGC, demos and conversion beyond paid ads',
    short: 'Contenido para ecommerce en Colombia: UGC, unboxing, comparativas y Reels que llevan a carrito o WhatsApp.',
    shortEn: 'Ecommerce content in Colombia: UGC, unboxing, comparisons and Reels that drive cart or WhatsApp.',
    seoT: 'Contenido ecommerce Colombia | Guía',
    seoE: 'Ecommerce content Colombia | Guide',
    rel: ['ugc-para-ecommerce-colombia', 'ugc-vs-fotos-de-catalogo', 'contenido-para-retail-moda', 'cta-en-videos-que-convierten'],
  }),
);

articles.push(
  verticalArticle({
    slug: 'contenido-para-clinicas-y-servicios',
    pub: '2026-12-25',
    vertical: 'Contenido para clínicas y servicios',
    verticalEn: 'Content for clinics and services',
    kw: 'contenido para clínicas y servicios',
    kwEn: 'content for clinics and services',
    title: 'Contenido para clínicas y servicios: confianza, educación y consultas',
    titleEn: 'Content for clinics and services: trust, education and inquiries',
    short: 'Contenido para clínicas y servicios profesionales: educación sin sensacionalismo, prueba social y CTA a cita.',
    shortEn: 'Content for clinics and professional services: education without sensationalism, social proof and booking CTA.',
    seoT: 'Contenido clínicas y servicios | Colombia',
    seoE: 'Clinic and services content | Colombia',
    rel: ['que-publicar-si-vendes-servicios', 'contenido-para-marcas-personales', 'buyer-persona-para-redes-sociales', 'funnel-de-contenido-awareness-a-venta'],
    cta: 'estrategia-contenido',
  }),
);

articles.push(
  verticalArticle({
    slug: 'contenido-para-educacion-cursos',
    pub: '2026-12-28',
    vertical: 'Contenido para educación y cursos',
    verticalEn: 'Content for education and courses',
    kw: 'contenido para educación cursos',
    kwEn: 'content for education courses',
    title: 'Contenido para educación y cursos: autoridad, prueba y matrículas',
    titleEn: 'Content for education and courses: authority, proof and enrollments',
    short: 'Contenido para educación y cursos online: microclases en Reels, testimonios de estudiantes y funnel a matrícula.',
    shortEn: 'Content for education and online courses: micro-lessons in Reels, student testimonials and enrollment funnel.',
    seoT: 'Contenido educación y cursos | Guía',
    seoE: 'Education and course content | Guide',
    rel: ['contenido-para-marcas-personales', 'funnel-de-contenido-awareness-a-venta', 'pilares-de-contenido-para-instagram', 'marketing-de-contenidos-para-emprendedores'],
  }),
);

articles.push(
  verticalArticle({
    slug: 'contenido-para-bienes-raices',
    pub: '2026-12-31',
    vertical: 'Contenido para bienes raíces',
    verticalEn: 'Content for real estate',
    kw: 'contenido para bienes raíces',
    kwEn: 'content for real estate',
    title: 'Contenido para bienes raíces: tours, barrio y leads calificados',
    titleEn: 'Content for real estate: tours, neighborhood and qualified leads',
    short: 'Contenido para bienes raíces: tours en video, contexto de barrio, prueba de agente y CTA a visita o WhatsApp.',
    shortEn: 'Real estate content: video tours, neighborhood context, agent proof and visit CTA.',
    seoT: 'Contenido bienes raíces | Colombia 2026',
    seoE: 'Real estate content | Colombia 2026',
    rel: ['contenido-para-clinicas-y-servicios', 'que-publicar-si-vendes-servicios', 'grabacion-profesional-con-celular', 'storytelling-en-video-corto'],
  }),
);

// ——— H. Glosario (15) ———
const glossaryItems = [
  {
    slug: 'definicion-ugc',
    term: 'UGC (User Generated Content)',
    termEn: 'UGC (User Generated Content)',
    definition: '**UGC** es contenido creado por usuarios o clientes reales — no por el equipo de marca — que muestra producto o servicio en contexto auténtico. Incluye videos testimoniales, unboxing, reviews y clips para ads.',
    definitionEn: '**UGC** is content created by real users or customers — not the brand team — showing product or service in authentic context.',
    pilarSlug: 'creador-ugc-colombia-guia',
    pilarTitle: 'Guía creador UGC Colombia',
    pilarTitleEn: 'UGC creator guide Colombia',
    kw: 'qué es ugc',
    kwEn: 'what is ugc',
    title: 'Qué es UGC: definición y uso en marketing Colombia',
    titleEn: 'What is UGC: definition and use in Colombia marketing',
    short: 'UGC es contenido generado por usuarios reales que aporta autenticidad y prueba social — clave en ecommerce y lanzamientos.',
    shortEn: 'UGC is user-generated content that adds authenticity and social proof — key in ecommerce and launches.',
    seoT: 'Qué es UGC | Definición marketing',
    seoE: 'What is UGC | Marketing definition',
    rel: ['que-es-ugc-y-por-que-funciona-en-colombia'],
  },
  {
    slug: 'definicion-reel',
    term: 'Reel',
    termEn: 'Reel',
    definition: 'Un **Reel** es video vertical corto (hasta 90 segundos en Instagram) diseñado para descubrimiento en feed y tab Reels. Prioriza hook inicial, subtítulos y retención.',
    definitionEn: 'A **Reel** is short vertical video (up to 90 seconds on Instagram) designed for discovery in feed and Reels tab.',
    pilarSlug: 'creacion-de-contenido-para-redes-sociales',
    pilarTitle: 'Creación de contenido para redes sociales',
    pilarTitleEn: 'Social media content creation',
    kw: 'qué es un reel',
    kwEn: 'what is a reel',
    title: 'Qué es un Reel: definición para marcas en Colombia',
    titleEn: 'What is a Reel: definition for brands in Colombia',
    short: 'Un Reel es video vertical corto optimizado para descubrimiento en Instagram y TikTok — hook, ritmo y subtítulos son esenciales.',
    shortEn: 'A Reel is short vertical video optimized for discovery — hook, pace and captions are essential.',
    seoT: 'Qué es un Reel | Definición',
    seoE: 'What is a Reel | Definition',
    rel: ['como-editar-reels-que-retienen', 'formato-9-16-guia-emprendedores'],
  },
  {
    slug: 'definicion-hook',
    term: 'Hook',
    termEn: 'Hook',
    definition: 'El **hook** son los primeros 1–3 segundos de un video o línea inicial que detiene el scroll y promete valor. Puede ser verbal, visual o ambos.',
    definitionEn: 'The **hook** is the first 1–3 seconds of a video or opening line that stops the scroll and promises value.',
    pilarSlug: 'hooks-primeros-3-segundos-tiktok',
    pilarTitle: 'Hooks primeros 3 segundos TikTok',
    pilarTitleEn: 'Hooks first 3 seconds TikTok',
    kw: 'qué es un hook',
    kwEn: 'what is a hook',
    title: 'Qué es un hook en redes: definición y ejemplos',
    titleEn: 'What is a hook on social: definition and examples',
    short: 'El hook detiene el scroll en los primeros segundos con promesa clara — base de retención en Reels y TikTok.',
    shortEn: 'The hook stops the scroll in the first seconds with a clear promise — base of retention on Reels and TikTok.',
    seoT: 'Qué es un hook | Definición video',
    seoE: 'What is a hook | Video definition',
    rel: ['como-editar-reels-que-retienen'],
  },
  {
    slug: 'definicion-ctr',
    term: 'CTR (Click-Through Rate)',
    termEn: 'CTR (Click-Through Rate)',
    definition: '**CTR** mide el porcentaje de personas que hacen clic respecto a impresiones. En redes aplica a links en bio, stickers de Stories y anuncios.',
    definitionEn: '**CTR** measures the percentage of people who click relative to impressions.',
    pilarSlug: 'kpis-de-redes-para-pymes',
    pilarTitle: 'KPIs de redes para pymes',
    pilarTitleEn: 'Social media KPIs for SMBs',
    kw: 'qué es ctr',
    kwEn: 'what is ctr',
    title: 'Qué es CTR en redes sociales: definición y buenas cifras',
    titleEn: 'What is CTR on social media: definition and benchmarks',
    short: 'CTR es la tasa de clics — útil para medir efectividad de CTAs, links y anuncios en redes.',
    shortEn: 'CTR is click-through rate — useful to measure CTA, link and ad effectiveness.',
    seoT: 'Qué es CTR | Definición redes',
    seoE: 'What is CTR | Social definition',
    rel: ['roi-contenido-organico'],
  },
  {
    slug: 'definicion-retention',
    term: 'Retention (retención)',
    termEn: 'Retention',
    definition: '**Retention** o retención indica cuánto tiempo ven tu video en promedio y en qué segundo abandonan. Es métrica clave de calidad editorial en Reels y TikTok.',
    definitionEn: '**Retention** indicates how long viewers watch on average and when they drop off.',
    pilarSlug: 'como-editar-reels-que-retienen',
    pilarTitle: 'Cómo editar Reels que retienen',
    pilarTitleEn: 'How to edit Reels that retain',
    kw: 'qué es retention en video',
    kwEn: 'what is video retention',
    title: 'Qué es retention en video: definición para creadores',
    titleEn: 'What is video retention: definition for creators',
    short: 'Retention mide cuánto tiempo ven tu video — señal directa de calidad de hook y edición.',
    shortEn: 'Retention measures how long viewers watch — direct signal of hook and edit quality.',
    seoT: 'Qué es retention | Definición video',
    seoE: 'What is retention | Video definition',
    rel: ['hooks-primeros-3-segundos-tiktok'],
  },
  {
    slug: 'definicion-storytelling',
    term: 'Storytelling',
    termEn: 'Storytelling',
    definition: '**Storytelling** es narrar con estructura (contexto, conflicto, resolución) para conectar emocionalmente y mover a acción — en video corto se comprime en 15–60 segundos.',
    definitionEn: '**Storytelling** is narrating with structure to connect emotionally and drive action — compressed to 15–60 seconds in short video.',
    pilarSlug: 'storytelling-en-video-corto',
    pilarTitle: 'Storytelling en video corto',
    pilarTitleEn: 'Storytelling in short video',
    kw: 'qué es storytelling',
    kwEn: 'what is storytelling',
    title: 'Qué es storytelling en marketing: definición práctica',
    titleEn: 'What is storytelling in marketing: practical definition',
    short: 'Storytelling estructura mensajes para conectar y convertir — esencial en Reels, ads y marcas personales.',
    shortEn: 'Storytelling structures messages to connect and convert — essential in Reels, ads and personal brands.',
    seoT: 'Qué es storytelling | Definición',
    seoE: 'What is storytelling | Definition',
    rel: ['storytelling-para-retail'],
  },
  {
    slug: 'definicion-buyer-persona',
    term: 'Buyer persona',
    termEn: 'Buyer persona',
    definition: 'La **buyer persona** es perfil semi-ficticio del comprador ideal basado en datos reales: dolores, objeciones, canales y momentos de compra.',
    definitionEn: '**Buyer persona** is a semi-fictional profile of the ideal buyer based on real data.',
    pilarSlug: 'buyer-persona-para-redes-sociales',
    pilarTitle: 'Buyer persona para redes sociales',
    pilarTitleEn: 'Buyer persona for social media',
    kw: 'qué es buyer persona',
    kwEn: 'what is buyer persona',
    title: 'Qué es buyer persona: definición para contenido digital',
    titleEn: 'What is buyer persona: definition for digital content',
    short: 'Buyer persona describe a tu comprador ideal con dolores y objeciones — base de guiones y pilares.',
    shortEn: 'Buyer persona describes your ideal buyer with pains and objections — base for scripts and pillars.',
    seoT: 'Qué es buyer persona | Definición',
    seoE: 'What is buyer persona | Definition',
    rel: ['pilares-de-contenido-para-instagram'],
  },
  {
    slug: 'definicion-calendario-editorial',
    term: 'Calendario editorial',
    termEn: 'Editorial calendar',
    definition: 'El **calendario editorial** planifica qué publicar, cuándo, en qué formato y con qué CTA — traduce estrategia en fechas concretas.',
    definitionEn: 'The **editorial calendar** plans what to publish, when, in which format and with which CTA.',
    pilarSlug: 'como-hacer-un-calendario-de-contenidos',
    pilarTitle: 'Cómo hacer un calendario de contenidos',
    pilarTitleEn: 'How to make a content calendar',
    kw: 'qué es calendario editorial',
    kwEn: 'what is editorial calendar',
    title: 'Qué es calendario editorial: definición y columnas mínimas',
    titleEn: 'What is an editorial calendar: definition and minimum columns',
    short: 'Calendario editorial organiza fechas, formatos y responsables — evita improvisación semanal.',
    shortEn: 'Editorial calendar organizes dates, formats and owners — avoids weekly improvisation.',
    seoT: 'Qué es calendario editorial | Definición',
    seoE: 'What is editorial calendar | Definition',
    rel: ['plan-de-contenido-30-dias-plantilla'],
  },
  {
    slug: 'definicion-community-management',
    term: 'Community management',
    termEn: 'Community management',
    definition: '**Community management** es moderar, responder y activar conversación en redes — publicar, atender comentarios/DM y reportar métricas operativas.',
    definitionEn: '**Community management** is moderating, replying and activating conversation on social — publishing and handling comments/DMs.',
    pilarSlug: 'community-manager-vs-estratega-digital',
    pilarTitle: 'Community manager vs estratega digital',
    pilarTitleEn: 'Community manager vs digital strategist',
    kw: 'qué es community management',
    kwEn: 'what is community management',
    title: 'Qué es community management: definición y alcance',
    titleEn: 'What is community management: definition and scope',
    short: 'Community management cubre publicación, respuesta en comunidad y reporting — distinto de estrategia.',
    shortEn: 'Community management covers publishing, community response and reporting — distinct from strategy.',
    seoT: 'Qué es community management | Definición',
    seoE: 'What is community management | Definition',
    rel: ['tarifas-community-manager-colombia'],
  },
  {
    slug: 'definicion-content-batching',
    term: 'Content batching',
    termEn: 'Content batching',
    definition: '**Content batching** agrupa tareas similares (idea, grabación, edición) en bloques para reducir cambio de contexto y aumentar output mensual.',
    definitionEn: '**Content batching** groups similar tasks in blocks to reduce context switching and increase monthly output.',
    pilarSlug: 'como-reutilizar-un-video-en-5-piezas',
    pilarTitle: 'Cómo reutilizar un video en 5 piezas',
    pilarTitleEn: 'How to repurpose one video into 5 pieces',
    kw: 'qué es content batching',
    kwEn: 'what is content batching',
    title: 'Qué es content batching: definición para producir más',
    titleEn: 'What is content batching: definition to produce more',
    short: 'Content batching produce en bloques (grabar, editar) para sostener cadencia sin agotar al equipo.',
    shortEn: 'Content batching produces in blocks to sustain cadence without burning out the team.',
    seoT: 'Qué es content batching | Definición',
    seoE: 'What is content batching | Definition',
    rel: ['calendario-de-videos-semanal-pyme'],
  },
  {
    slug: 'definicion-b-roll',
    term: 'B-roll',
    termEn: 'B-roll',
    definition: '**B-roll** es metraje complementario que ilustra lo que se narra — producto en uso, ambiente, manos, detalle — mientras el A-roll suele ser talking head o voz principal.',
    definitionEn: '**B-roll** is complementary footage illustrating the narration — product in use, environment, detail.',
    pilarSlug: 'edicion-de-videos-para-redes-colombia',
    pilarTitle: 'Edición de videos para redes Colombia',
    pilarTitleEn: 'Video editing for social Colombia',
    kw: 'qué es b-roll',
    kwEn: 'what is b-roll',
    title: 'Qué es B-roll: definición para videos de marca',
    titleEn: 'What is B-roll: definition for brand videos',
    short: 'B-roll ilustra tu mensaje con planos de apoyo — mejora retención y percepción de calidad.',
    shortEn: 'B-roll illustrates your message with supporting shots — improves retention and quality perception.',
    seoT: 'Qué es B-roll | Definición video',
    seoE: 'What is B-roll | Video definition',
    rel: ['grabacion-profesional-con-celular'],
  },
  {
    slug: 'definicion-color-grading',
    term: 'Color grading',
    termEn: 'Color grading',
    definition: '**Color grading** ajusta color, contraste y tono del video para coherencia de marca o atmósfera — distinto de corrección técnica básica de exposición.',
    definitionEn: '**Color grading** adjusts color, contrast and tone for brand coherence or atmosphere.',
    pilarSlug: 'diferencia-entre-edicion-basica-y-premium',
    pilarTitle: 'Diferencia edición básica y premium',
    pilarTitleEn: 'Basic vs premium editing difference',
    kw: 'qué es color grading',
    kwEn: 'what is color grading',
    title: 'Qué es color grading: definición para Reels y marcas',
    titleEn: 'What is color grading: definition for Reels and brands',
    short: 'Color grading unifica look visual del video — señal de marca premium en feeds competitivos.',
    shortEn: 'Color grading unifies visual look — premium brand signal in competitive feeds.',
    seoT: 'Qué es color grading | Definición',
    seoE: 'What is color grading | Definition',
    rel: ['precio-edicion-de-reels-colombia'],
  },
  {
    slug: 'definicion-capcut-vs-premiere',
    term: 'CapCut vs Premiere',
    termEn: 'CapCut vs Premiere',
    definition: '**CapCut vs Premiere** compara editor móvil/desktop accesible (CapCut) con suite profesional (Premiere). CapCut cubre Reels rápidos; Premiere escala proyectos complejos y equipos.',
    definitionEn: '**CapCut vs Premiere** compares accessible mobile/desktop editor (CapCut) with professional suite (Premiere).',
    pilarSlug: 'edicion-interna-vs-externalizar',
    pilarTitle: 'Edición interna vs externalizar',
    pilarTitleEn: 'In-house editing vs outsourcing',
    kw: 'capcut vs premiere',
    kwEn: 'capcut vs premiere',
    title: 'CapCut vs Premiere: definición y cuándo usar cada uno',
    titleEn: 'CapCut vs Premiere: definition and when to use each',
    short: 'CapCut vs Premiere: CapCut para velocidad en Reels; Premiere para flujos profesionales y volumen alto.',
    shortEn: 'CapCut vs Premiere: CapCut for Reel speed; Premiere for professional workflows and high volume.',
    seoT: 'CapCut vs Premiere | Comparativa',
    seoE: 'CapCut vs Premiere | Comparison',
    rel: ['como-editar-reels-que-retienen'],
  },
  {
    slug: 'definicion-alcance-organico',
    term: 'Alcance orgánico (organic reach)',
    termEn: 'Organic reach',
    definition: '**Alcance orgánico** es personas que ven tu contenido sin pago publicitario — depende de retención, relevancia, consistencia y señales de engagement.',
    definitionEn: '**Organic reach** is people who see your content without paid advertising.',
    pilarSlug: 'contenido-organico-vs-pauta',
    pilarTitle: 'Contenido orgánico vs pauta',
    pilarTitleEn: 'Organic content vs paid ads',
    kw: 'qué es alcance orgánico',
    kwEn: 'what is organic reach',
    title: 'Qué es alcance orgánico: definición y cómo mejorarlo',
    titleEn: 'What is organic reach: definition and how to improve it',
    short: 'Alcance orgánico son vistas sin pago — se construye con retención, consistencia y valor real.',
    shortEn: 'Organic reach is unpaid views — built with retention, consistency and real value.',
    seoT: 'Qué es alcance orgánico | Definición',
    seoE: 'What is organic reach | Definition',
    rel: ['roi-contenido-organico'],
  },
  {
    slug: 'definicion-share-of-voice',
    term: 'Share of voice',
    termEn: 'Share of voice',
    definition: '**Share of voice** mide cuánto habla tu marca en un tema o categoría respecto a competidores — en redes se aproxima con menciones, alcance share y presencia en keywords de nicho.',
    definitionEn: '**Share of voice** measures how much your brand speaks in a topic vs competitors.',
    pilarSlug: 'estrategia-de-contenido-colombia',
    pilarTitle: 'Estrategia de contenido Colombia',
    pilarTitleEn: 'Content strategy Colombia',
    kw: 'qué es share of voice',
    kwEn: 'what is share of voice',
    title: 'Qué es share of voice: definición en marketing digital',
    titleEn: 'What is share of voice: definition in digital marketing',
    short: 'Share of voice compara visibilidad de tu marca vs competencia en un tema o categoría.',
    shortEn: 'Share of voice compares your brand visibility vs competition in a topic or category.',
    seoT: 'Qué es share of voice | Definición',
    seoE: 'What is share of voice | Definition',
    rel: ['marketing-marcas-consumo'],
  },
];

for (let i = 0; i < glossaryItems.length; i++) {
  const g = glossaryItems[i];
  const day = String(3 + i).padStart(2, '0');
  articles.push(
    glossaryArticle({
      ...g,
      pub: `2027-01-${day}`,
    }),
  );
}

// Write all + verify
const report = [];
for (const a of articles) {
  write(a);
  for (const loc of ['es', 'en']) {
    const file = path.join(loc === 'es' ? ES : EN, `${a.slug}.mdx`);
    const raw = fs.readFileSync(file, 'utf8');
    const body = raw.split(/^---$/m).slice(2).join('---').trim();
    const words = wordCount(body);
    const isGlossary = a.slug.startsWith('definicion-');
    const min = loc === 'es' ? (isGlossary ? 400 : 1200) : isGlossary ? 200 : 600;
    const max = isGlossary && loc === 'es' ? 700 : Infinity;
    const ok = words >= min && words <= max;
    report.push({ slug: a.slug, loc, words, min, max: max === Infinity ? '-' : max, ok });
  }
}

console.log(`Generated ${articles.length} slugs (${articles.length * 2} files)\n`);
console.log('slug | loc | words | min | max | ok');
for (const r of report) console.log(`${r.slug} | ${r.loc} | ${r.words} | ${r.min} | ${r.max} | ${r.ok ? 'OK' : 'FAIL'}`);
const failed = report.filter((r) => !r.ok);
if (failed.length) {
  console.error(`\n${failed.length} failed checks`);
  process.exit(1);
}
console.log('\nAll OK');
console.log('\nSlugs to append to registry:');
console.log(articles.map((a) => `'${a.slug}'`).join(',\n'));
