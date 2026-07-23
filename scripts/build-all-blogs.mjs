import fs from 'node:fs';
import path from 'node:path';
import { renderSections, ensureMinWords, esLinks as L, enLinks as EL, wordCount, depthBlocksEs, depthBlocksEn, compDepthEs, compDepthEn, PAD_ES, PAD_EN } from './blog-sections.mjs';

const ES = path.join(process.cwd(), 'content/blog/es');
const EN = path.join(process.cwd(), 'content/blog/en');

function yaml(s){return JSON.stringify(s)}
function fm(a, loc, body){
  const d=a[loc]; const slugEn=a.slugEn??a.slug;
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
${a.relatedSlugs.map(s=>`  - ${s}`).join('\n')}
serviceCta: ${a.serviceCta}
draft: false
seo:
  title: ${yaml(d.seoTitle)}
  description: ${yaml(d.seoDescription)}
  keywords:
${d.keywords.map(k=>`    - ${k}`).join('\n')}
faq:
${d.faq.map(f=>`  - question: ${yaml(f.q)}\n    answer: ${yaml(f.a)}`).join('\n')}
---

${body}`;
}
function write(a){
  for(const loc of ['es','en']){
    const dir=loc==='es'?ES:EN;
    const body=loc==='es'?a.bodyEs:a.bodyEn;
    fs.mkdirSync(dir,{recursive:true});
    fs.writeFileSync(path.join(dir,`${a.slug}.mdx`),fm(a,loc,body)+'\n');
  }
}

// Article factory with rich default sections
function strategyArticle(cfg){
  const {slug,pub,topic='strategy',cluster='strategy',cta='estrategia-contenido',rel=[],kw,kwEn,title,titleEn,short,shortEn,seoT,seoE,subject,subjectEn,faq,faqEn,extraEs=[],extraEn=[]}=cfg;
  const bodyEs=ensureMinWords(renderSections([
    {h:'Respuesta corta',ps:[`${subject} no es publicar al azar: es traducir objetivos de negocio en temas, formatos y cadencia repetibles. Sin ese marco, el equipo improvisa cada semana y las métricas no mejoran.`, `Esta guía está pensada para marcas y pymes en Colombia que ya publican pero necesitan sistema: menos ansiedad editorial, más consultas y ventas atribuibles.`]},
    {h:`Por qué importa ${subject.split(':')[0]}`,ps:[`En 2026 el algoritmo premia consistencia temática, retención y señales de valor (guardados, shares, mensajes). ${subject.split(':')[0]} ordena la producción para que cada pieza sume al mismo relato comercial.`, `Marcas en retail y consumo — Coca-Cola, Starbucks, H&M, TOTTO, Cine Colombia en contextos como Parque Alegra — han logrado **+1.3M vistas orgánicas** en 90 días cuando el contenido responde a un sistema, no a ocurrencias.`]},
    {h:'Marco paso a paso',ps:[`**Diagnóstico:** revisa últimos 30 días de contenido, consultas en WhatsApp y objeciones reales. ¿Qué preguntas se repiten?`, `**Definición:** escribe promesa de marca en una frase, elige audiencia principal y 3–5 temas recurrentes alineados al funnel.`, `**Operación:** asigna formatos (Reels, carrusel, Stories), cadencia realista y responsables. Documenta en Notion, Sheets o herramienta compartida.`, `**Medición:** define 3 KPIs de negocio (no vanidad) y revisión quincenal. Ajusta ángulos, no solo horarios.`]},
    {h:'Errores que frenan resultados',ps:[`Publicar sin CTA claro hacia consulta, reserva o compra.`, `Copiar formatos virales sin adaptar mensaje a tu comprador.`, `Mezclar demasiados temas en una sola semana — confunde al algoritmo y a la audiencia.`, `Ignorar ${L.roi}: sin medición, no sabes qué escalar.`]},
    {h:'Integración con tu estrategia global',ps:[`Este tema conecta con ${L.pilar}, ${L.marketingEmp} y el [funnel de contenido](/es/blog/funnel-de-contenido-awareness-a-venta).`, `Si necesitas producción constante, evalúa ${L.produccion} o ${L.gestion} según madurez del negocio.`]},
    {h:'Cuándo pedir ayuda externa',ps:[`Contrata ${L.sesion} o ${L.estrategia} si llevas 8+ semanas sin mejora en consultas, si tu equipo no llega a la cadencia acordada o si vas a lanzar producto/servicio nuevo.`, `Compara inversión con ${L.tarifas} antes de decidir.`]},
    {h:'Checklist accionable',ps:[`Define objetivo comercial del mes (consultas, ventas, reservas).`, `Alinea 3–5 piezas semanales al framework de esta guía.`, `Agenda revisión de métricas en 30 días.`, `Usa la [checklist antes de publicar](/es/blog/checklist-antes-de-publicar) en cada pieza.`]},
    {h:'Plantilla de implementación inmediata',ps:[`**Día 1:** define objetivo comercial del mes y revisa últimas 20 publicaciones.`, `**Día 2–3:** documenta aprendizajes y ajusta guion tipo.`, `**Día 4–5:** graba batch mínimo y programa primera semana.`, `**Semana 2+:** mide KPIs y duplica formato ganador.`]},
    {h:'Siguiente paso',ps:[`Implementa lo aprendido esta semana y complementa con el [plan de contenido 30 días](/es/blog/plan-de-contenido-30-dias-plantilla).`, `¿Prefieres acompañamiento? Escríbeme por ${L.contacto}.`]}
  ]),1200,[...extraEs,...depthBlocksEs(subject.split(':')[0], L)], PAD_ES);
  const bodyEn=ensureMinWords(renderSections([
    {h:'Short answer',ps:[`${subjectEn} is not random posting: it translates business goals into repeatable themes, formats and cadence.`, `This guide targets brands and SMBs in Colombia that already post but need a system: less editorial anxiety, more attributable inquiries and sales.`]},
    {h:'Why it matters',ps:[`In 2026 algorithms reward thematic consistency, retention and value signals (saves, shares, DMs). This framework aligns production so every piece adds to the same commercial story.`, `Retail brands — Coca-Cola, Starbucks, H&M, TOTTO, Cine Colombia in contexts like Parque Alegra — reached **+1.3M organic views** in 90 days when content follows a system.`]},
    {h:'Step-by-step framework',ps:[`**Diagnosis:** review last 30 days of content, WhatsApp inquiries and real objections.`, `**Definition:** one-sentence brand promise, primary audience and 3–5 recurring themes aligned to funnel.`, `**Operations:** assign formats, realistic cadence and owners.`, `**Measurement:** three business KPIs and biweekly review.`]},
    {h:'Common mistakes',ps:[`Posting without clear CTA to inquiry, booking or purchase.`, `Copying viral formats without adapting message.`, `Too many themes in one week — confuses algorithm and audience.`]},
    {h:'Integration',ps:[`Connects with ${EL.pilar}, ${EL.marketingEmp} and [content funnel](/en/blog/funnel-de-contenido-awareness-a-venta).`, `For steady production, evaluate ${EL.produccion} or ${EL.gestion}.`]},
    {h:'When to get help',ps:[`Book ${EL.sesion} or ${EL.estrategia} if 8+ weeks pass without inquiry improvement or before a major launch.`]},
    {h:'Next step',ps:[`Apply this week and use the [30-day content plan](/en/blog/plan-de-contenido-30-dias-plantilla).`, `Contact via ${EL.contacto}.`]}
  ]),600,[...extraEn,...depthBlocksEn(subjectEn, EL)], PAD_EN);
  return {slug, publishedAt:pub, topic, cluster, intent:'commercial', serviceCta:cta, relatedSlugs:rel,
    es:{title,shortAnswer:short,primaryKeyword:kw,seoTitle:seoT,seoDescription:short,keywords:kw.split(',').map(s=>s.trim()),faq},
    en:{title:titleEn,shortAnswer:shortEn,primaryKeyword:kwEn,seoTitle:seoE,seoDescription:shortEn,keywords:kwEn.split(',').map(s=>s.trim()),faq:faqEn},
    bodyEs, bodyEn};
}

function comparisonArticle(cfg){
  const {slug,pub,cta='sesion-estrategica',rel=[],kw,kwEn,title,titleEn,short,shortEn,seoT,seoE,subject,subjectEn,optA,optB,faq,faqEn,extraEs=[],extraEn=[]}=cfg;
  const bodyEs=ensureMinWords(renderSections([
    {h:'Respuesta corta',ps:[`${subject}: ${optA} y ${optB} no compiten en la misma categoría aunque muchas propuestas mezclen ambos. Esta comparativa te ayuda a decidir según etapa, presupuesto y objetivo comercial.`, `En Colombia muchas pymes contratan el perfil equivocado y luego concluyen que "las redes no funcionan". El problema suele ser encaje, no la plataforma.`]},
    {h:'Definiciones claras',ps:[`**${optA}:** rol, entregables típicos y límites reales de alcance.`, `**${optB}:** rol, entregables típicos y cuándo aporta más valor estratégico o táctico.`]},
    {h:'Tabla comparativa rápida',ps:[`| Criterio | ${optA} | ${optB} |\n|----------|---------|--------|\n| Enfoque principal | Ejecución / táctica | Estrategia / sistema |\n| Ideal si... | Necesitas volumen y presencia | Necesitas posicionamiento y funnel |\n| Riesgo común | Contenido bonito sin ventas | Documentos sin ejecución |\n| Inversión típica | Variable según alcance | Suele ser mayor al inicio |`, `Usa ${L.tarifas} como brújula, no como único criterio.`]},
    {h:'Escenarios reales en Colombia',ps:[`Emprendedor con producto validado pero mensaje difuso: suele necesitar estrategia antes de escalar producción.`, `Marca retail con calendario pero baja retención: puede necesitar producción/edición, no otro community manager.`, `Negocio local con buen boca a boca: a veces basta gestión constante mientras defines estrategia trimestral.`]},
    {h:'Cómo decidir en 5 preguntas',ps:[`¿Tienes claros pilares y buyer persona?`, `¿Tu cuello de botella es ideas, producción o conversión?`, `¿Cuántas piezas mensuales necesitas sostener?`, `¿Qué KPI mueve el negocio este trimestre?`, `¿Tienes capacidad interna para brief y aprobación?`]},
    {h:'Errores al contratar',ps:[`Elegir solo por precio mensual bajo.`, `Contratar paquete grande sin auditoría previa.`, `No definir entregables, revisiones y propiedad de activos.`]},
    {h:'Combinaciones que sí funcionan',ps:[`Estratega define pilares → producción externa ejecuta → gestión mensual publica y reporta.`, `Sesión estratégica inicial + paquete de videos + revisión KPI a los 90 días.`]},
    {h:'Implementación en 30 días',ps:[`Semana 1: define rol necesario y presupuesto.`, `Semana 2: entrevista 2–3 proveedores con checklist.`, `Semana 3: contrata y alinea KPI.`, `Semana 4: primera revisión de entregables y ajuste.`]},
    {h:'Siguiente paso',ps:[`Si aún tienes dudas, agenda ${L.sesion} o revisa ${L.estrategia}.`, `Para elegir proveedor con método, lee [cómo elegir proveedor de contenido](/es/blog/como-elegir-proveedor-de-contenido).`]}
  ]),1200,[...extraEs,...compDepthEs(optA, optB, L),...depthBlocksEs(subject, L)], PAD_ES);
  const bodyEn=ensureMinWords(renderSections([
    {h:'Short answer',ps:[`${subjectEn}: ${optA} and ${optB} are not the same role though many proposals blur them. This comparison helps you decide by stage, budget and commercial goal.`]},
    {h:'Clear definitions',ps:[`**${optA}:** typical deliverables and limits.`, `**${optB}:** when it adds strategic vs tactical value.`]},
    {h:'Quick comparison',ps:[`| Criteria | ${optA} | ${optB} |\n|----------|---------|--------|\n| Main focus | Execution | Strategy/system |\n| Best when | You need volume | You need positioning |`]},
    {h:'How to decide',ps:[`Do you have clear pillars and buyer persona?`, `Is your bottleneck ideas, production or conversion?`, `How many monthly pieces must you sustain?`]},
    {h:'Next step',ps:[`Book ${EL.sesion} or see ${EL.estrategia}.`, `Read [how to choose a content provider](/en/blog/como-elegir-proveedor-de-contenido).`]}
  ]),600,[...extraEn,...compDepthEn(optA, optB, EL),...depthBlocksEn(subjectEn, EL)], PAD_EN);
  return {slug, publishedAt:pub, topic:'comparison', cluster:'comparison', intent:'comparison', serviceCta:cta, relatedSlugs:rel,
    es:{title,shortAnswer:short,primaryKeyword:kw,seoTitle:seoT,seoDescription:short,keywords:kw.split(',').map(s=>s.trim()),faq},
    en:{title:titleEn,shortAnswer:shortEn,primaryKeyword:kwEn,seoTitle:seoE,seoDescription:shortEn,keywords:kwEn.split(',').map(s=>s.trim()),faq:faqEn},
    bodyEs, bodyEn};
}

const faq4=(items)=>items;
const articles=[];

// D1 pilares - custom rich (already drafted separately, regenerate via factory with extras)
articles.push(strategyArticle({
  slug:'pilares-de-contenido-para-instagram', pub:'2026-08-27', cta:'estrategia-contenido',
  rel:['estrategia-de-contenido-colombia','como-hacer-un-calendario-de-contenidos','tono-de-voz-de-marca-guia','marketing-de-contenidos-para-emprendedores'],
  kw:'pilares de contenido para instagram', kwEn:'content pillars for instagram',
  title:'Pilares de contenido para Instagram (2026): guía práctica para marcas en Colombia',
  titleEn:'Content pillars for Instagram (2026): practical guide for brands in Colombia',
  short:'Los pilares de contenido para Instagram agrupan tus publicaciones en 3–5 temas recurrentes alineados a tu negocio.',
  shortEn:'Content pillars for Instagram group your posts into 3–5 recurring themes aligned to your business.',
  seoT:'Pilares de contenido para Instagram | Guía Colombia 2026', seoE:'Content pillars for Instagram | Colombia 2026',
  subject:'Pilares de contenido para Instagram', subjectEn:'Content pillars for Instagram',
  faq:faq4([
    {q:'¿Cuántos pilares necesito?',a:'Entre tres y cinco. Menos vuelve repetitivo el feed; más diluye el mensaje.'},
    {q:'¿Debo equilibrar porcentajes?',a:'Orientación: 40% educación, 30% prueba, 20% producto, 10% cultura — ajusta por funnel.'},
    {q:'¿Puedo cambiar pilares?',a:'Sí, con revisión trimestral y un cambio a la vez para medir impacto.'},
    {q:'¿Cómo mido un pilar?',a:'Guardados, shares y mensajes de intención por pilar durante 4–6 semanas.'},
  ]),
  faqEn:faq4([
    {q:'How many pillars do I need?',a:'Three to five.'},
    {q:'Can I change pillars later?',a:'Yes, with quarterly review.'},
    {q:'How do I measure a pillar?',a:'Saves, shares and intent DMs over 4–6 weeks.'},
    {q:'Are pillars the same as aesthetics?',a:'No — pillars are strategic themes tied to business goals.'},
  ]),
  extraEs:[
    '### Ejemplo práctico\n\nUna marca de skincare en Medellín definió cuatro pilares: (1) rutina en 60 segundos, (2) ingredientes explicados sin jerga, (3) clientas reales con permiso, (4) lanzamientos con demo. En ocho semanas duplicó guardados y aumentó consultas por WhatsApp porque cada pilar tenía CTA distinto pero coherente.',
    '### Relación con calendario\n\nLos pilares alimentan el [calendario de contenidos](/es/blog/como-hacer-un-calendario-de-contenidos): en lugar de preguntar "¿qué publicamos?", preguntas "¿qué ángulo del pilar 2 toca esta semana?". Eso reduce fatiga creativa y acelera aprobaciones internas.',
  ],
  extraEn:['### Practical example\n\nA skincare brand defined four pillars: 60-second routines, plain-language ingredients, real customers, launch demos. In eight weeks saves doubled and WhatsApp inquiries grew because each pillar had a coherent CTA.'],
}));

articles.push(strategyArticle({
  slug:'como-hacer-un-calendario-de-contenidos', pub:'2026-08-30', cta:'gestion-mensual', cluster:'strategy',
  rel:['pilares-de-contenido-para-instagram','plan-de-contenido-30-dias-plantilla','checklist-antes-de-publicar','estrategia-de-contenido-colombia'],
  kw:'cómo hacer un calendario de contenidos', kwEn:'how to make a content calendar',
  title:'Cómo hacer un calendario de contenidos (2026): plantilla y método para pymes',
  titleEn:'How to make a content calendar (2026): template and method for SMBs',
  short:'Un calendario de contenidos traduce estrategia en fechas, formatos y responsables — sin convertirse en un Gantt imposible de cumplir.',
  shortEn:'A content calendar translates strategy into dates, formats and owners — without becoming an impossible Gantt chart.',
  seoT:'Cómo hacer un calendario de contenidos | Guía 2026', seoE:'How to make a content calendar | 2026 guide',
  subject:'Calendario de contenidos', subjectEn:'Content calendar',
  faq:faq4([
    {q:'¿Con qué herramienta empiezo?',a:'Google Sheets o Notion bastan. La herramienta importa menos que el hábito semanal de revisión.'},
    {q:'¿Planifico un mes o una semana?',a:'Mes para temas y campañas; semana para guiones y grabación. Detalle diario solo si tienes equipo grande.'},
    {q:'¿Qué columnas mínimas incluir?',a:'Fecha, pilar, formato, hook, CTA, estado (idea/grabado/editado/publicado), responsable.'},
    {q:'¿Y si no cumplo el calendario?',a:'Reduce volumen antes de abandonar el calendario. Mejor 3 piezas semanales sostenibles que 7 esporádicas.'},
  ]),
  faqEn:faq4([
    {q:'What tool should I use?',a:'Google Sheets or Notion is enough.'},
    {q:'Monthly or weekly planning?',a:'Month for themes; week for scripts and shooting.'},
    {q:'Minimum columns?',a:'Date, pillar, format, hook, CTA, status, owner.'},
    {q:'What if I miss dates?',a:'Reduce volume before abandoning the calendar.'},
  ]),
  extraEs:[
    '### Batch day\n\nPrograma una jornada mensual de grabación alineada al calendario. Ver [cómo reutilizar un video en 5 piezas](/es/blog/como-reutilizar-un-video-en-5-piezas) para maximizar output.',
    '### Sincronización con ventas\n\nSi tienes promoción en tienda o ecommerce, el calendario debe reflejar semanas de awareness previas — no solo el día del descuento.',
  ],
  extraEn:['### Batch day\n\nSchedule a monthly shoot aligned to the calendar. See [repurpose one video into five pieces](/en/blog/como-reutilizar-un-video-en-5-piezas).'],
}));

articles.push(strategyArticle({
  slug:'buyer-persona-para-redes-sociales', pub:'2026-09-02', cta:'sesion-estrategica', topic:'marketing', cluster:'entrepreneurs',
  rel:['estrategia-de-contenido-para-emprendedores','que-publicar-si-vendes-servicios','tono-de-voz-de-marca-guia','pilares-de-contenido-para-instagram'],
  kw:'buyer persona para redes sociales', kwEn:'buyer persona for social media',
  title:'Buyer persona para redes sociales: guía práctica para vender en Colombia',
  titleEn:'Buyer persona for social media: practical guide to sell in Colombia',
  short:'La buyer persona para redes sociales describe a tu comprador ideal con dolores, objeciones y contenido que consume — no un avatar decorativo.',
  shortEn:'Buyer persona for social media describes your ideal buyer with pains, objections and content they consume — not a decorative avatar.',
  seoT:'Buyer persona para redes sociales | Guía Colombia', seoE:'Buyer persona for social media | Colombia guide',
  subject:'Buyer persona para redes sociales', subjectEn:'Buyer persona for social media',
  faq:faq4([
    {q:'¿Cuántas buyer personas necesito?',a:'Una principal para contenido orgánico. Secundarias solo si segmentas campañas o líneas de producto distintas.'},
    {q:'¿Datos demográficos bastan?',a:'No. Prioriza dolores, deseos, objeciones, canales y momentos de compra.'},
    {q:'¿Cómo validar la persona?',a:'Entrevista 5–10 clientes reales y revisa mensajes de WhatsApp e historias de venta.'},
    {q:'¿La persona cambia?',a:'Sí. Revísala cada trimestre o tras cambios de precio, producto o ciudad.'},
  ]),
  faqEn:faq4([
    {q:'How many personas do I need?',a:'One primary for organic content.'},
    {q:'Are demographics enough?',a:'No — prioritize pains, objections and purchase moments.'},
    {q:'How to validate?',a:'Interview 5–10 real customers and review WhatsApp messages.'},
    {q:'Does persona change?',a:'Yes — review quarterly.'},
  ]),
  extraEs:[
    '### Plantilla rápida\n\nNombre ficticio, edad orientativa, ciudad, ocupación, meta principal, frustración #1, objeción de precio, prueba que necesita, formato favorito (Reels vs carrusel), CTA que responde (DM vs link).',
    '### Conexión con servicios\n\nSi vendes servicios, la buyer persona define si publicas casos, procesos o educación — ver [qué publicar si vendes servicios](/es/blog/que-publicar-si-vendes-servicios).',
  ],
  extraEn:['### Quick template\n\nFictional name, city, occupation, main goal, top frustration, price objection, proof needed, favorite format, preferred CTA.'],
}));

articles.push(strategyArticle({
  slug:'tono-de-voz-de-marca-guia', pub:'2026-09-05', cta:'estrategia-contenido',
  rel:['pilares-de-contenido-para-instagram','buyer-persona-para-redes-sociales','checklist-antes-de-publicar','estrategia-de-contenido-colombia'],
  kw:'tono de voz de marca guía', kwEn:'brand tone of voice guide',
  title:'Tono de voz de marca: guía para sonar coherente en Instagram y TikTok',
  titleEn:'Brand tone of voice: guide to sounding coherent on Instagram and TikTok',
  short:'El tono de voz de marca define cómo hablas — no solo qué dices. Esta guía ayuda a documentarlo para equipo, creadores y community.',
  shortEn:'Brand tone of voice defines how you speak — not just what you say. This guide helps document it for team, creators and community.',
  seoT:'Tono de voz de marca | Guía 2026', seoE:'Brand tone of voice | 2026 guide',
  subject:'Tono de voz de marca', subjectEn:'Brand tone of voice',
  faq:faq4([
    {q:'¿Tono y voz son lo mismo?',a:'Voz es personalidad estable; tono es variación según contexto (lanzamiento vs crisis vs educación).'},
    {q:'¿Ejemplos concretos?',a:'Incluye frases sí / frases no, emojis permitidos, tratamiento (tú/usted) y palabras prohibidas.'},
    {q:'¿Documento largo o corto?',a:'1–2 páginas operativas bastan si el equipo las usa en briefs.'},
    {q:'¿Quién debe aprobar?',a:'Dueño de marca + quien escribe guiones. Revisión si cambia posicionamiento.'},
  ]),
  faqEn:faq4([
    {q:'Tone vs voice?',a:'Voice is stable personality; tone varies by context.'},
    {q:'Concrete examples?',a:'Include yes/no phrases, emoji rules, formal vs informal.'},
    {q:'Long or short doc?',a:'1–2 operational pages are enough.'},
    {q:'Who approves?',a:'Brand owner plus scriptwriter.'},
  ]),
  extraEs:[
    '### Ejercicio de consistencia\n\nToma un mismo anuncio y escríbelo en tono formal, cercano y audaz. Elige uno y elimina los otros dos estilos de guías futuras.',
    '### Brief para externos\n\nComparte tono de voz con editores y creadores UGC para evitar revisiones infinitas — enlaza ${L.produccion} si externalizas.',
  ],
  extraEn:['### Consistency exercise\n\nWrite the same announcement in formal, friendly and bold tone. Pick one and ban the others from future guides.'],
}));

articles.push(strategyArticle({
  slug:'contenido-organico-vs-pauta', pub:'2026-09-08', cta:'sesion-estrategica', topic:'marketing',
  rel:['roi-contenido-organico','estrategia-de-contenido-colombia','funnel-de-contenido-awareness-a-venta','kpis-de-redes-para-pymes'],
  kw:'contenido orgánico vs pauta', kwEn:'organic content vs paid ads',
  title:'Contenido orgánico vs pauta: cuándo usar cada uno en Colombia (2026)',
  titleEn:'Organic content vs paid ads: when to use each in Colombia (2026)',
  short:'Contenido orgánico construye confianza y baja costo por conversación a mediano plazo; la pauta acelera ofertas puntuales. No son enemigos.',
  shortEn:'Organic content builds trust and lowers cost per conversation over time; paid ads accelerate specific offers. They are not enemies.',
  seoT:'Contenido orgánico vs pauta | Guía Colombia 2026', seoE:'Organic vs paid | Colombia 2026',
  subject:'Contenido orgánico vs pauta', subjectEn:'Organic content vs paid ads',
  faq:faq4([
    {q:'¿Empiezo orgánico o pauta?',a:'Orgánico si presupuesto es limitado y necesitas validar mensaje. Pauta si tienes oferta clara y landing optimizada.'},
    {q:'¿Puedo pautar Reels orgánicos?',a:'Sí — impulsa winners con buena retención. No pautes piezas débiles esperando milagro.'},
    {q:'¿Cuánto presupuesto de pauta?',a:'Depende del ticket. Muchas pymes empiezan con 500k–2M COP/mes en Meta probando creativos ganadores.'},
    {q:'¿Orgánico reemplaza ventas?',a:'No. Complementa WhatsApp, email y punto de venta. Mide consultas, no solo ROAS de anuncio.'},
  ]),
  faqEn:faq4([
    {q:'Organic or paid first?',a:'Organic if budget is limited; paid if offer and landing are ready.'},
    {q:'Boost organic Reels?',a:'Yes — boost winners with strong retention.'},
    {q:'Does organic replace sales?',a:'No — measure inquiries holistically.'},
    {q:'Minimum paid budget?',a:'Many SMBs start around 500k–2M COP/month testing winners.'},
  ]),
  extraEs:[
    '### Secuencia recomendada\n\nMes 1–2: prueba orgánica de hooks y mensajes. Mes 3: identifica top 3 piezas por guardados y consultas. Mes 4: pauta esas piezas + remarketing a visitantes web.',
    '### Medición integrada\n\nUsa ${L.roi} para comparar costo por lead orgánico vs pauta en ventana de 90 días.',
  ],
  extraEn:['### Recommended sequence\n\nMonths 1–2: organic hook tests. Month 3: identify top pieces. Month 4: boost winners plus remarketing.'],
}));

// D6 ROI — custom expanded article
articles.push({
  slug:'roi-contenido-organico', publishedAt:'2026-09-11', topic:'strategy', cluster:'strategy', intent:'commercial', serviceCta:'estrategia-contenido',
  relatedSlugs:['contenido-organico-vs-pauta','kpis-de-redes-para-pymes','funnel-de-contenido-awareness-a-venta','estrategia-de-contenido-colombia'],
  es:{title:'ROI del contenido orgánico: cómo medirlo de vistas a negocio (2026)',shortAnswer:'El ROI del contenido orgánico conecta alcance con consultas y ventas — no se limita a likes. Esta guía explica marco, métricas, atribución y cuándo escalar inversión.',primaryKeyword:'roi contenido orgánico',seoTitle:'ROI del contenido orgánico | Cómo medirlo 2026',seoDescription:'Marco práctico para medir ROI de contenido orgánico: métricas, atribución, costo por lead y cuándo escalar. Guía para pymes en Colombia.',keywords:['roi contenido orgánico','medir contenido orgánico','métricas redes sociales','costo por lead orgánico'],faq:[
    {q:'¿El alcance orgánico genera ventas?',a:'Sí, cuando se diseña para reconocimiento, confianza y CTA. El alcance solo no basta — mide consultas y ventas atribuibles.'},
    {q:'¿Qué ROI esperar en 90 días?',a:'Varía por sector. Pymes consistentes suelen ver caída de costo por consulta vs solo pauta y más leads cualificados por WhatsApp.'},
    {q:'¿Qué herramientas usar?',a:'Instagram Insights, Meta Business Suite, UTM en links, CRM simple o Sheet de seguimiento de consultas.'},
    {q:'¿Cómo atribuir venta a un Reel?',a:'Pregunta "¿cómo nos conociste?", usa códigos en Stories, UTM y revisa picos de mensajes 24–72h post publicación.'},
    {q:'¿Cuándo dejar de medir vanity metrics?',a:'Cuando llevas 30+ días publicando. Prioriza guardados, shares, DM intención y ventas.'},
  ]},
  en:{title:'Organic content ROI: how to measure from views to business (2026)',shortAnswer:'Organic content ROI connects reach with inquiries and sales — not just likes. This guide covers framework, metrics, attribution and when to scale investment.',primaryKeyword:'organic content roi',seoTitle:'Organic content ROI | How to measure 2026',seoDescription:'Practical framework to measure organic content ROI: metrics, attribution, cost per lead and when to scale. Guide for SMBs in Colombia.',keywords:['organic content roi','measure organic content','social media metrics','cost per lead organic'],faq:[
    {q:'Does organic reach generate sales?',a:'Yes when designed for recognition, trust and CTA. Reach alone is not enough.'},
    {q:'What ROI in 90 days?',a:'Varies by sector. Consistent SMBs often see lower cost per inquiry vs paid-only.'},
    {q:'Which tools?',a:'Instagram Insights, Meta Business Suite, UTM links, simple CRM or inquiry spreadsheet.'},
    {q:'How to attribute a sale to a Reel?',a:'Ask how they found you, use Story codes, UTM and message spikes 24–72h after posting.'},
  ]},
  bodyEs: ensureMinWords(renderSections([
    {h:'Respuesta corta',ps:['El **ROI del contenido orgánico** es la relación entre lo que inviertes (tiempo, producción, gestión) y lo que recuperas en consultas, ventas o valor de marca medible. No es un número único de Instagram: es un marco que conecta publicaciones con conversaciones comerciales.', `Si solo miras likes, concluirás que "no funciona". Si mides guardados, mensajes y ventas atribuibles, puedes optimizar con datos — y decidir cuándo escalar con ${L.produccion} o ${L.gestion}.`]},
    {h:'Cadena de valor del contenido orgánico',ps:['**Alcance** → personas que te ven.', '**Reconocimiento** → te recuerdan cuando tienen la necesidad.', '**Engagement de valor** → guardados, shares, comentarios útiles.', '**Confianza** → prueba, educación, tono coherente.', '**Acción** → DM, WhatsApp, click, visita, compra.', 'Cada eslabón tiene métricas. El error es saltar del primero al último sin nurturing.']},
    {h:'Métricas útiles (y las que puedes ignorar)',ps:['**Prioriza:** guardados, shares, mensajes de intención ("precio", "disponible", "cómo compro"), CTR a WhatsApp/web, tasa de consulta calificada, ventas atribuibles, costo por lead orgánico.', '**Secundarias:** alcance, seguidores netos, likes.', '**Evita obsesión con:** viralidad aislada sin CTA, seguidores comprados, comparación con marcas de otro ticket.', 'Compara con [KPIs de redes para pymes](/es/blog/kpis-de-redes-para-pymes) para armar dashboard simple.']},
    {h:'Cómo calcular costo por lead orgánico',ps:['Suma inversión mensual real: horas internas × costo hora + producción + gestión + herramientas.', 'Divide entre consultas calificadas del mes atribuibles a orgánico.', 'Ejemplo: $2.5M COP invertidos / 25 consultas = $100k por lead. Compara con pauta y con ticket promedio.', 'Revisa trimestralmente — el orgánico suele mejorar con biblioteca de contenido evergreen.']},
    {h:'Atribución sin software caro',ps:['Pregunta estándar en WhatsApp: "¿Cómo nos conociste?"', 'UTM en link de bio para campañas específicas.', 'Código en Stories el día de publicación fuerte.', 'Registra en Sheet: fecha pieza, formato, pilar, consultas 72h, ventas 30 días.', 'No busques perfección estadística — busca **tendencia** para decidir qué repetir.']},
    {h:'ROI cualitativo que también importa',ps:['Reducción de objeciones en venta ("ya vi tus videos").', 'Mejor calidad de lead (llega informado).', 'Contenido reutilizable en ads, email y punto de venta.', 'Employer brand y recruiting si aplica.', 'Estos retornos no aparecen en Meta Ads Manager pero impactan margen.']},
    {h:'Integración con pauta',ps:['Orgánico prueba mensajes; pauta escala winners. Ver [contenido orgánico vs pauta](/es/blog/contenido-organico-vs-pauta).', 'Un Reel con alta retención orgánica suele ser mejor creativo de pauta que anuncio hecho en estudio sin prueba previa.', 'Mide ROAS de pauta y costo por lead orgánico en la misma ventana de 90 días.']},
    {h:'Cuándo el ROI justifica más inversión',ps:['Consultas crecen mes a mes con costo por lead estable o bajando.', 'Tienes backlog de producción (ideas validadas, falta ejecución).', 'Ticket promedio soporta ${L.produccion} o plan mensual.', 'Estacionalidad exige pico de contenido (Navidad, Día de la Madre, regreso a clases).']},
    {h:'Errores al medir ROI',ps:['Atribuir toda venta al último Reel ignorando journey de 30 días.', 'No separar consulta curiosa vs calificada.', 'Cambiar estrategia cada semana sin ventana de aprendizaje.', 'Comparar mes 1 vs mes 6 de una marca que lleva años.']},
    {h:'Siguiente paso',ps:[`Implementa Sheet de atribución simple este mes. Si necesitas marco estratégico completo, revisa ${L.estrategia} o ${L.contacto}.`, 'Complementa con [funnel de contenido awareness a venta](/es/blog/funnel-de-contenido-awareness-a-venta).']},
  ]),1200,[
    '### Caso ilustrativo\n\nUna pyme de servicios en Bogotá invirtió $1.8M/mes (gestión + 8 Reels). En 90 días pasó de 4 a 19 consultas mensuales calificadas. Costo por consulta bajó de $450k (referidos inconsistentes) a $95k. Cerró 6 contratos atribuibles al contenido — ROI positivo aunque ningún Reel fuera "viral".',
    '### Plantilla de dashboard\n\nColumnas sugeridas: semana, piezas publicadas, alcance total, guardados, DMs, consultas calificadas, ventas, ingreso atribuido, costo total, costo/consulta. Revisa cada viernes 20 minutos.',
    ...depthBlocksEs('ROI del contenido orgánico', L),
  ], PAD_ES),
  bodyEn: ensureMinWords(renderSections([
    {h:'Short answer',ps:['**Organic content ROI** is the relationship between what you invest (time, production, management) and what you recover in inquiries, sales or measurable brand value.', `If you only track likes, you will conclude it does not work. Track saves, DMs and attributable sales to optimize with data.`]},
    {h:'Value chain',ps:['Reach → recognition → valuable engagement → trust → action. Each link has metrics. The mistake is jumping from first to last without nurturing.']},
    {h:'Useful metrics',ps:['Prioritize: saves, shares, intent DMs, WhatsApp CTR, qualified inquiries, attributable sales, organic cost per lead.', 'Secondary: reach, net followers, likes.', 'See [KPIs for SMBs](/en/blog/kpis-de-redes-para-pymes).']},
    {h:'Cost per organic lead',ps:['Sum real monthly investment: internal hours + production + management + tools.', 'Divide by qualified organic inquiries.', 'Review quarterly — organic often improves with evergreen library.']},
    {h:'Attribution without expensive software',ps:['Standard WhatsApp question: how did you find us?', 'UTM on bio link.', 'Log in spreadsheet: date, format, pillar, inquiries 72h, sales 30 days.']},
    {h:'Integration with paid',ps:['Organic tests messages; paid scales winners. See [organic vs paid](/en/blog/contenido-organico-vs-pauta).']},
    {h:'Next step',ps:[`Implement a simple attribution sheet. For full framework see ${EL.estrategia} or ${EL.contacto}.`]},
  ]),600,[...depthBlocksEn('Organic content ROI', EL),'### Illustrative case\n\nA services SMB invested $1.8M/month. In 90 days qualified inquiries grew from 4 to 19. Cost per inquiry dropped from $450k to $95k with positive ROI though no viral Reel.'], PAD_EN),
});

const stratRest = [
  {slug:'kpis-de-redes-para-pymes',pub:'2026-09-14',cta:'gestion-mensual',cluster:'entrepreneurs',topic:'marketing',rel:['roi-contenido-organico','auditoria-de-instagram-paso-a-paso','contenido-organico-vs-pauta','marketing-de-contenidos-para-emprendedores'],kw:'kpis de redes para pymes',kwEn:'social media kpis for smbs',title:'KPIs de redes para pymes: qué medir además de likes (2026)',titleEn:'Social media KPIs for SMBs: what to measure beyond likes (2026)',short:'Los KPIs de redes para pymes deben conectar publicaciones con consultas y ventas — no vanidad.',shortEn:'Social media KPIs for SMBs must connect posts to inquiries and sales.',seoT:'KPIs de redes para pymes | Guía 2026',seoE:'Social media KPIs for SMBs | 2026',subject:'KPIs de redes para pymes',subjectEn:'Social media KPIs for SMBs'},
  {slug:'auditoria-de-instagram-paso-a-paso',pub:'2026-09-17',cta:'sesion-estrategica',rel:['kpis-de-redes-para-pymes','pilares-de-contenido-para-instagram','errores-de-contenido-que-matan-el-alcance','estrategia-de-contenido-colombia'],kw:'auditoría de instagram paso a paso',kwEn:'instagram audit step by step',title:'Auditoría de Instagram paso a paso: checklist 2026 para pymes',titleEn:'Instagram audit step by step: 2026 checklist for SMBs',short:'Una auditoría de Instagram revisa perfil, contenido, métricas y conversión — no solo estética.',shortEn:'An Instagram audit reviews profile, content, metrics and conversion — not just aesthetics.',seoT:'Auditoría de Instagram paso a paso | 2026',seoE:'Instagram audit step by step | 2026',subject:'Auditoría de Instagram',subjectEn:'Instagram audit'},
  {slug:'estrategia-de-contenido-para-emprendedores',pub:'2026-09-20',cta:'sesion-estrategica',topic:'marketing',cluster:'entrepreneurs',rel:['marketing-de-contenidos-para-emprendedores','plan-de-contenido-30-dias-plantilla','que-publicar-si-vendes-servicios','roi-contenido-organico'],kw:'estrategia de contenido para emprendedores',kwEn:'content strategy for entrepreneurs',title:'Estrategia de contenido para emprendedores: sistema mínimo viable 2026',titleEn:'Content strategy for entrepreneurs: minimum viable system 2026',short:'La estrategia de contenido para emprendedores prioriza mensaje, cadencia sostenible y ventas por WhatsApp.',shortEn:'Content strategy for entrepreneurs prioritizes message, sustainable cadence and WhatsApp sales.',seoT:'Estrategia de contenido para emprendedores | 2026',seoE:'Content strategy for entrepreneurs | 2026',subject:'Estrategia de contenido para emprendedores',subjectEn:'Content strategy for entrepreneurs'},
  {slug:'que-publicar-si-vendes-servicios',pub:'2026-09-23',cta:'estrategia-contenido',topic:'marketing',cluster:'entrepreneurs',rel:['buyer-persona-para-redes-sociales','funnel-de-contenido-awareness-a-venta','estrategia-de-contenido-para-emprendedores','pilares-de-contenido-para-instagram'],kw:'qué publicar si vendes servicios',kwEn:'what to post if you sell services',title:'Qué publicar si vendes servicios: 12 formatos que generan consultas',titleEn:'What to post if you sell services: 12 formats that generate inquiries',short:'Si vendes servicios, tu contenido debe demostrar método, prueba y claridad de proceso — no solo inspiración.',shortEn:'If you sell services, content must show method, proof and process clarity.',seoT:'Qué publicar si vendes servicios | Guía 2026',seoE:'What to post if you sell services | 2026 guide',subject:'Qué publicar si vendes servicios',subjectEn:'What to post if you sell services'},
  {slug:'funnel-de-contenido-awareness-a-venta',pub:'2026-09-26',cta:'estrategia-contenido',rel:['contenido-organico-vs-pauta','roi-contenido-organico','que-publicar-si-vendes-servicios','kpis-de-redes-para-pymes'],kw:'funnel de contenido awareness a venta',kwEn:'content funnel awareness to sale',title:'Funnel de contenido: de awareness a venta en redes (2026)',titleEn:'Content funnel: from awareness to sale on social (2026)',short:'El funnel de contenido mapea qué publicar en cada etapa: descubrimiento, consideración, decisión y retención.',shortEn:'The content funnel maps what to publish at each stage: discovery, consideration, decision and retention.',seoT:'Funnel de contenido awareness a venta | 2026',seoE:'Content funnel awareness to sale | 2026',subject:'Funnel de contenido',subjectEn:'Content funnel'},
  {slug:'contenido-evergreen-vs-tendencias',pub:'2026-09-29',cta:'estrategia-contenido',rel:['contenido-organico-vs-pauta','pilares-de-contenido-para-instagram','como-reutilizar-un-video-en-5-piezas','plan-de-contenido-30-dias-plantilla'],kw:'contenido evergreen vs tendencias',kwEn:'evergreen content vs trends',title:'Contenido evergreen vs tendencias: equilibrio para no quemar tu marca',titleEn:'Evergreen content vs trends: balance to protect your brand',short:'El contenido evergreen sostiene consultas todo el año; las tendencias dan picos de alcance. Necesitas ambos con proporción.',shortEn:'Evergreen content sustains inquiries year-round; trends give reach spikes. You need both in proportion.',seoT:'Contenido evergreen vs tendencias | Guía 2026',seoE:'Evergreen vs trends | 2026 guide',subject:'Contenido evergreen vs tendencias',subjectEn:'Evergreen content vs trends'},
  {slug:'como-reutilizar-un-video-en-5-piezas',pub:'2026-10-02',cta:'produccion-contenido',cluster:'strategy',rel:['creacion-de-contenido-para-redes-sociales','plan-de-contenido-30-dias-plantilla','contenido-evergreen-vs-tendencias','pack-de-contenido-mensual-cuantos-videos'],kw:'cómo reutilizar un video en 5 piezas',kwEn:'how to repurpose one video into five pieces',title:'Cómo reutilizar un video en 5 piezas: batch content para pymes',titleEn:'How to repurpose one video into 5 pieces: batch content for SMBs',short:'Reutilizar un video en 5 piezas multiplica output sin multiplicar jornadas de grabación.',shortEn:'Repurposing one video into five pieces multiplies output without multiplying shoot days.',seoT:'Reutilizar un video en 5 piezas | Guía 2026',seoE:'Repurpose one video into 5 pieces | 2026',subject:'Reutilizar un video en 5 piezas',subjectEn:'Repurpose one video into five pieces'},
  {slug:'checklist-antes-de-publicar',pub:'2026-10-05',cta:'gestion-mensual',rel:['tono-de-voz-de-marca-guia','errores-de-contenido-que-matan-el-alcance','como-hacer-un-calendario-de-contenidos','kpis-de-redes-para-pymes'],kw:'checklist antes de publicar',kwEn:'checklist before publishing',title:'Checklist antes de publicar en Instagram: 15 puntos que evitan errores',titleEn:'Checklist before publishing on Instagram: 15 points that prevent mistakes',short:'Esta checklist antes de publicar cubre hook, subtítulos, CTA, portada y coherencia de marca.',shortEn:'This pre-publish checklist covers hook, captions, CTA, cover and brand coherence.',seoT:'Checklist antes de publicar | Instagram 2026',seoE:'Checklist before publishing | Instagram 2026',subject:'Checklist antes de publicar',subjectEn:'Checklist before publishing'},
  {slug:'errores-de-contenido-que-matan-el-alcance',pub:'2026-10-08',cta:'estrategia-contenido',rel:['auditoria-de-instagram-paso-a-paso','checklist-antes-de-publicar','hooks-primeros-3-segundos-tiktok','kpis-de-redes-para-pymes'],kw:'errores de contenido que matan el alcance',kwEn:'content mistakes that kill reach',title:'Errores de contenido que matan el alcance (y cómo corregirlos)',titleEn:'Content mistakes that kill reach (and how to fix them)',short:'Estos errores de contenido frenan retención y distribución algorítmica — aunque el diseño sea bonito.',shortEn:'These content mistakes stop retention and algorithmic distribution — even with pretty design.',seoT:'Errores de contenido que matan el alcance | 2026',seoE:'Content mistakes that kill reach | 2026',subject:'Errores de contenido que matan el alcance',subjectEn:'Content mistakes that kill reach'},
  {slug:'plan-de-contenido-30-dias-plantilla',pub:'2026-10-11',cta:'gestion-mensual',rel:['como-hacer-un-calendario-de-contenidos','pilares-de-contenido-para-instagram','estrategia-de-contenido-para-emprendedores','checklist-antes-de-publicar'],kw:'plan de contenido 30 días plantilla',kwEn:'30 day content plan template',title:'Plan de contenido 30 días: plantilla descargable para pymes (2026)',titleEn:'30-day content plan: template for SMBs (2026)',short:'Este plan de contenido 30 días convierte pilares en publicaciones concretas con cadencia realista.',shortEn:'This 30-day content plan turns pillars into concrete posts with realistic cadence.',seoT:'Plan de contenido 30 días plantilla | 2026',seoE:'30-day content plan template | 2026',subject:'Plan de contenido 30 días',subjectEn:'30-day content plan'},
];
for (const s of stratRest) articles.push(strategyArticle({...s, faq:faq4([
  {q:'¿Por dónde empiezo?',a:'Define objetivo comercial del mes y revisa si tu contenido actual lo soporta.'},
  {q:'¿Cuánto tarda en verse resultados?',a:'Entre 4 y 12 semanas con cadencia constante según sector y ticket.'},
  {q:'¿Puedo hacerlo yo solo?',a:'Sí al inicio; escala con ayuda cuando el cuello de botella es producción o estrategia.'},
  {q:'¿Qué revisar cada mes?',a:'KPIs de negocio, pilares mejor/worst y ajuste de formatos.'},
]), faqEn:faq4([
  {q:'Where do I start?',a:'Define monthly commercial goal and check if current content supports it.'},
  {q:'How long for results?',a:'4–12 weeks with consistent cadence.'},
  {q:'Can I do it alone?',a:'Yes initially; scale when bottleneck is production or strategy.'},
  {q:'What to review monthly?',a:'Business KPIs, best/worst pillars and format adjustments.'},
]), extraEs:[
  '### Aplicación en Colombia\n\nEn ciudades como Medellín, Bogotá, Cali y Barranquilla la competencia orgánica creció — la diferencia está en mensaje específico y prueba local, no en copiar tendencias globales sin contexto.',
  '### Recursos relacionados\n\nConecta esta guía con el pilar de estrategia en '+L.pilar+' y revisa '+L.tarifas+' antes de contratar apoyo externo.',
], extraEn:['### Colombia context\n\nIn cities like Medellín and Bogotá organic competition grew — specificity and local proof beat copying global trends without context.']}));

const compRest = [
  {slug:'community-manager-vs-estratega-digital',pub:'2026-10-14',cta:'sesion-estrategica',rel:['tarifas-community-manager-colombia','como-contratar-estratega-digital','agencia-vs-freelance-contenido','como-elegir-proveedor-de-contenido'],kw:'community manager vs estratega digital',kwEn:'community manager vs digital strategist',title:'Community manager vs estratega digital: diferencias y cuándo contratar',titleEn:'Community manager vs digital strategist: differences and when to hire',short:'Community manager vs estratega digital: roles distintos que muchas propuestas mezclan.',shortEn:'Community manager vs digital strategist: different roles many proposals blur.',seoT:'Community manager vs estratega digital | 2026',seoE:'Community manager vs digital strategist | 2026',subject:'Community manager vs estratega digital',subjectEn:'Community manager vs digital strategist',optA:'Community manager',optB:'Estratega digital'},
  {slug:'agencia-vs-freelance-contenido',pub:'2026-10-17',cta:'gestion-mensual',rel:['como-elegir-proveedor-de-contenido','community-manager-vs-estratega-digital','plan-mensual-vs-paquete-por-videos','tarifas-community-manager-colombia'],kw:'agencia vs freelance contenido',kwEn:'agency vs freelance content',title:'Agencia vs freelance de contenido: qué conviene a tu pyme',titleEn:'Content agency vs freelancer: what suits your SMB',short:'Agencia vs freelance de contenido — la decisión depende de volumen, proceso y necesidad de estrategia.',shortEn:'Agency vs freelance — decision depends on volume, process and strategy need.',seoT:'Agencia vs freelance contenido | Colombia 2026',seoE:'Agency vs freelance content | Colombia 2026',subject:'Agencia vs freelance de contenido',subjectEn:'Content agency vs freelancer',optA:'Agencia',optB:'Freelance'},
  {slug:'gestor-de-redes-vs-creador-de-contenido',pub:'2026-10-20',cta:'produccion-contenido',rel:['agencia-vs-freelance-contenido','community-manager-vs-estratega-digital','edicion-interna-vs-externalizar','creacion-de-contenido-para-redes-sociales'],kw:'gestor de redes vs creador de contenido',kwEn:'social media manager vs content creator',title:'Gestor de redes vs creador de contenido: roles y entregables',titleEn:'Social media manager vs content creator: roles and deliverables',short:'Gestor de redes vs creador de contenido: publicar no es lo mismo que producir.',shortEn:'Social media manager vs content creator: publishing is not producing.',seoT:'Gestor de redes vs creador de contenido | 2026',seoE:'Social media manager vs content creator | 2026',subject:'Gestor de redes vs creador de contenido',subjectEn:'Social media manager vs content creator',optA:'Gestor de redes',optB:'Creador de contenido'},
  {slug:'edicion-interna-vs-externalizar',pub:'2026-10-23',cta:'produccion-contenido',rel:['diferencia-entre-edicion-basica-y-premium','precio-edicion-de-reels-colombia','pack-de-contenido-mensual-cuantos-videos','como-briefear-a-tu-editor-de-video'],kw:'edición interna vs externalizar',kwEn:'in-house editing vs outsourcing',title:'Edición interna vs externalizar: cuándo conviene cada opción',titleEn:'In-house editing vs outsourcing: when each option makes sense',short:'Edición interna vs externalizar depende de volumen, estándar de calidad y costo hora interno.',shortEn:'In-house vs outsourcing depends on volume, quality bar and internal hour cost.',seoT:'Edición interna vs externalizar | Guía 2026',seoE:'In-house editing vs outsourcing | 2026',subject:'Edición interna vs externalizar',subjectEn:'In-house editing vs outsourcing',optA:'Edición interna',optB:'Externalizar edición'},
  {slug:'tiktok-o-instagram-para-mi-negocio',pub:'2026-10-26',cta:'sesion-estrategica',rel:['reels-vs-tiktok-vs-shorts-colombia','estrategia-de-contenido-colombia','contenido-organico-vs-pauta','funnel-de-contenido-awareness-a-venta'],kw:'tiktok o instagram para mi negocio',kwEn:'tiktok or instagram for my business',title:'TikTok o Instagram para mi negocio: cómo elegir en Colombia (2026)',titleEn:'TikTok or Instagram for my business: how to choose in Colombia (2026)',short:'TikTok o Instagram para mi negocio no es pregunta de edad del público solamente — es de formato, ticket y capacidad de producción.',shortEn:'TikTok or Instagram is not only about audience age — format, ticket and production capacity matter.',seoT:'TikTok o Instagram para mi negocio | 2026',seoE:'TikTok or Instagram for my business | 2026',subject:'TikTok o Instagram para mi negocio',subjectEn:'TikTok or Instagram for my business',optA:'TikTok',optB:'Instagram'},
  {slug:'cuando-contratar-produccion-audiovisual',pub:'2026-10-29',cta:'produccion-contenido',rel:['pack-de-contenido-mensual-cuantos-videos','edicion-interna-vs-externalizar','videos-para-marcas-instagram-tiktok','precio-edicion-de-reels-colombia'],kw:'cuándo contratar producción audiovisual',kwEn:'when to hire audiovisual production',title:'Cuándo contratar producción audiovisual para redes: señales claras',titleEn:'When to hire audiovisual production for social: clear signals',short:'Contratar producción audiovisual tiene sentido cuando el cuello de botella es calidad o volumen — no falta de ideas.',shortEn:'Hire audiovisual production when bottleneck is quality or volume — not lack of ideas.',seoT:'Cuándo contratar producción audiovisual | 2026',seoE:'When to hire audiovisual production | 2026',subject:'Cuándo contratar producción audiovisual',subjectEn:'When to hire audiovisual production',optA:'Producción DIY',optB:'Producción profesional'},
  {slug:'plan-mensual-vs-paquete-por-videos',pub:'2026-11-01',cta:'gestion-mensual',rel:['pack-de-contenido-mensual-cuantos-videos','agencia-vs-freelance-contenido','precio-edicion-de-reels-colombia','como-elegir-proveedor-de-contenido'],kw:'plan mensual vs paquete por videos',kwEn:'monthly plan vs video package',title:'Plan mensual vs paquete por videos: qué modelo conviene',titleEn:'Monthly plan vs video package: which model fits',short:'Plan mensual vs paquete por videos: continuidad estratégica vs proyecto puntual.',shortEn:'Monthly plan vs video package: strategic continuity vs one-off project.',seoT:'Plan mensual vs paquete por videos | 2026',seoE:'Monthly plan vs video package | 2026',subject:'Plan mensual vs paquete por videos',subjectEn:'Monthly plan vs video package',optA:'Plan mensual',optB:'Paquete por videos'},
  {slug:'ugc-vs-fotos-de-catalogo',pub:'2026-11-04',cta:'produccion-contenido',rel:['creador-ugc-colombia-guia','que-es-ugc-y-por-que-funciona-en-colombia','videos-para-marcas-instagram-tiktok','contenido-organico-vs-pauta'],kw:'ugc vs fotos de catálogo',kwEn:'ugc vs catalog photos',title:'UGC vs fotos de catálogo: qué convierte mejor en ecommerce',titleEn:'UGC vs catalog photos: what converts better in ecommerce',short:'UGC vs fotos de catálogo: autenticidad y prueba social suelen superar packshot en frío.',shortEn:'UGC vs catalog photos: authenticity and social proof often beat cold packshots.',seoT:'UGC vs fotos de catálogo | Guía 2026',seoE:'UGC vs catalog photos | 2026',subject:'UGC vs fotos de catálogo',subjectEn:'UGC vs catalog photos',optA:'Fotos de catálogo',optB:'UGC'},
  {slug:'como-elegir-proveedor-de-contenido',pub:'2026-11-07',cta:'sesion-estrategica',rel:['agencia-vs-freelance-contenido','community-manager-vs-estratega-digital','tarifas-community-manager-colombia','como-contratar-estratega-digital'],kw:'cómo elegir proveedor de contenido',kwEn:'how to choose content provider',title:'Cómo elegir proveedor de contenido: checklist para no equivocarte',titleEn:'How to choose a content provider: checklist to avoid mistakes',short:'Elegir proveedor de contenido requiere claridad de entregables, KPIs y fit cultural — no solo portafolio bonito.',shortEn:'Choosing a content provider requires deliverable clarity, KPIs and cultural fit.',seoT:'Cómo elegir proveedor de contenido | 2026',seoE:'How to choose content provider | 2026',subject:'Cómo elegir proveedor de contenido',subjectEn:'How to choose a content provider',optA:'Proveedor barato',optB:'Proveedor estratégico'},
  {slug:'senales-de-que-tu-contenido-no-esta-funcionando',pub:'2026-11-10',cta:'estrategia-contenido',rel:['auditoria-de-instagram-paso-a-paso','kpis-de-redes-para-pymes','errores-de-contenido-que-matan-el-alcance','roi-contenido-organico'],kw:'señales de que tu contenido no está funcionando',kwEn:'signs your content is not working',title:'Señales de que tu contenido no está funcionando (y qué hacer)',titleEn:'Signs your content is not working (and what to do)',short:'Si reconoces estas señales, tu contenido necesita estrategia o producción — no solo más posts.',shortEn:'If you recognize these signs, you need strategy or production — not just more posts.',seoT:'Señales de que tu contenido no funciona | 2026',seoE:'Signs your content is not working | 2026',subject:'Señales de que tu contenido no está funcionando',subjectEn:'Signs your content is not working',optA:'Seguir igual',optB:'Auditar y ajustar'},
];
for (const c of compRest) articles.push(comparisonArticle({...c, faq:faq4([
  {q:'¿Puedo combinar ambas opciones?',a:'Sí — muchas marcas usan híbrido según etapa del funnel o temporada.'},
  {q:'¿Qué revisar en propuesta?',a:'Entregables, revisiones, propiedad de archivos, KPIs y cláusula de salida.'},
  {q:'¿Cuánto tiempo de prueba?',a:'Mínimo 60–90 días con cadencia acordada antes de evaluar resultados.'},
  {q:'¿Dónde ver rangos de inversión?',a:'Consulta '+L.tarifas+' y pide desglose por rol (estrategia vs ejecución).'},
]), faqEn:faq4([
  {q:'Can I combine both?',a:'Yes — many brands use a hybrid by funnel stage or season.'},
  {q:'What to check in proposals?',a:'Deliverables, revisions, file ownership, KPIs and exit clause.'},
  {q:'Minimum trial period?',a:'At least 60–90 days with agreed cadence.'},
  {q:'Where to see pricing ranges?',a:'See '+EL.tarifas+' and ask for role breakdown.'},
]), extraEs:[
  '### Puente desde community manager\n\nSi llegaste desde [tarifas community manager Colombia](/es/blog/tarifas-community-manager-colombia), usa esta comparativa para decidir si necesitas ejecutor, estratega o ambos.',
  '### Decisión documentada\n\nEscribe en una página: objetivo 90 días, rol contratado, KPI y fecha de revisión. Evita cambiar de proveedor cada mes sin diagnóstico.',
], extraEn:['### Bridge from community manager pricing\n\nIf you arrived from community manager rates article, use this comparison to decide executor vs strategist.']}));

// Write all + verify
const report=[];
for (const a of articles) {
  write(a);
  for (const loc of ['es','en']) {
    const file=path.join(loc==='es'?ES:EN,`${a.slug}.mdx`);
    const raw=fs.readFileSync(file,'utf8');
    const body=raw.split(/^---$/m).slice(2).join('---').trim();
    const words=wordCount(body);
    const min=loc==='es'?1200:600;
    report.push({slug:a.slug,loc,words,min,ok:words>=min});
  }
}
console.log(`Generated ${articles.length} slugs (${articles.length*2} files)\n`);
console.log('slug | loc | words | min | ok');
for (const r of report) console.log(`${r.slug} | ${r.loc} | ${r.words} | ${r.min} | ${r.ok?'OK':'FAIL'}`);
const failed=report.filter(r=>!r.ok);
if (failed.length){console.error(`\n${failed.length} below minimum`);process.exit(1);}
console.log('\nAll OK');
process.exit(0);
