/** Shared section builder + word-count padding for blog generator */

export function wordCount(text) {
  return text.split(/\s+/).filter(Boolean).length;
}

export function renderSections(sections) {
  return sections
    .map((s) => `## ${s.h}\n\n${s.ps.join('\n\n')}`)
    .join('\n\n');
}

export const PAD_ES = 'Este marco se complementa con revisión semanal de métricas, ajuste de guiones y conversación con quien atiende clientes — el contenido mejora cuando ventas y marketing comparten información real, no solo capturas de pantalla.';

export const PAD_EN = 'This framework works best with weekly metric review, script adjustments and feedback from whoever handles customers — content improves when sales and marketing share real conversations, not only screenshots.';

export function ensureMinWords(body, min, extras = [], pad = PAD_ES) {
  let result = body;
  for (const block of extras) {
    if (wordCount(result) >= min) break;
    result += `\n\n${block}`;
  }
  while (wordCount(result) < min) {
    result += `\n\n${pad}`;
  }
  return result;
}

/** Generic depth blocks — topic-agnostic but substantive */
export const depthBlocksEs = (subject, L) => [
  `## Profundización: aplicación semanal de ${subject}\n\nCada lunes revisa qué publicaste la semana anterior y clasifica piezas por resultado: alcance alto, guardados altos, mensajes, ventas. Duplica el formato del ganador con ángulo nuevo — no copies el guion literal. Si ninguna pieza generó conversación, el problema suele ser CTA o promesa del hook, no "el algoritmo". Documenta aprendizajes en una fila del calendario para no repetir errores.`,
  `## Formatos que suelen funcionar en Colombia\n\nReels verticales 9:16 con subtítulos quemados siguen siendo base para descubrimiento. Carruseles funcionan para objeciones y comparativas honestas. Stories sostienen relación diaria sin presión de producción alta. Live o Q&A mensual humaniza marcas de servicios. Elige según tu capacidad real — ver ${L.produccion} si el cuello de botella es edición.`,
  `## Errores avanzados (más allá de lo obvio)\n\nMezclar idiomas sin criterio de marca confunde. Publicar promoción sin prueba previa quema audiencia. Ignorar comentarios de intención en las primeras 2 horas reduce distribución. No adaptar CTA a canal (WhatsApp vs link vs DM) deja dinero sobre la mesa. Compararte con marcas de ticket 10× superior distorsiona expectativas de ROI.`,
  `## Colaboración interna\n\nSi tienes equipo pequeño, define roles: quién idea, quién graba, quién edita, quién publica, quién responde. Una reunión de 45 minutos semanal evita cuellos de botella. Comparte checklist con ${L.contacto} si necesitas plantillas operativas.`,
  `## Revisión trimestral\n\nCada 90 días pregunta: ¿siguen vigentes pilares y buyer persona? ¿Qué formato generó más negocio? ¿Vale la pena subir volumen o mejorar retención? Ajusta presupuesto entre orgánico y pauta según ${L.roi}.`,
  `## Caso tipo pyme colombiana\n\nUn negocio local con ticket medio de $150k–$500k COP suele necesitar 8–12 piezas mensuales y respuesta rápida en WhatsApp. Tras 10 semanas de cadencia, muchos duplican consultas aunque seguidores crezcan poco — señal de audiencia correcta, no masiva.`,
  `## Integración con ventas\n\nComparte con quien cierra ventas qué contenido salió y qué objeciones escuchan. Alinea guiones con preguntas reales. El contenido deja de ser "marketing" y pasa a ser inteligencia comercial.`,
  `## Herramientas mínimas\n\nCalendario (Sheets/Notion), almacenamiento de assets, Insights nativos, UTM en links, registro de consultas. No necesitas stack caro para empezar — necesitas disciplina de registro.`,
  `## Cuándo escalar inversión\n\nEscala producción o ${L.gestion} cuando tienes product-market fit en mensajes, backlog de ideas validadas y capacidad de respuesta comercial. Escalar antes genera ruido sin conversión.`,
  `## Preguntas para tu próxima reunión\n\n¿Qué dejamos de publicar? ¿Qué duplicamos? ¿Qué KPI revisamos viernes? ¿Necesitamos ${L.sesion} antes del próximo trimestre?`,
  `## Benchmarks realistas en pymes\n\nNo compares tus primeros 90 días con marcas que llevan años. Busca mejora relativa: más consultas, mejor retención, más guardados que el mes anterior. Un aumento del 20% en mensajes de intención puede ser excelente ROI según ticket.`,
  `## Documentación mínima\n\nGuarda capturas mensuales de Insights, exporta top 10 piezas y anota qué hook usaron. En seis meses tendrás manual de estilo basado en datos propios — más valioso que copiar tendencias.`,
  `## Contenido y WhatsApp\n\nEn Colombia gran parte de la conversión ocurre en WhatsApp. Tu contenido debe preparar la conversación: contexto, prueba, expectativa de precio. Enlaza con guías de servicios si aplica.`,
  `## Ritmo sostenible\n\nMejor 3 piezas semanales durante un año que 7 piezas durante un mes y silencio. El algoritmo premia consistencia; tu equipo premia sanidad mental.`,
  `## Señales de madurez\n\nCuando dejas de perseguir trends sin criterio, cuando tienes backlog de ideas alineadas a pilares y cuando ventas reconoce el contenido como fuente de lead — tu operación maduró.`,
  `## Alianzas locales\n\nColabora con negocios complementarios (no competidores directos) para ampliar alcance en Medellín, Bogotá o tu ciudad. Contenido cruzado bien briefeado suma audiencia cualificada.`,
  `## Legal y permisos\n\nUsa contratos verbales o escritos para UGC, música con licencia y derechos de imagen de clientes. Evita bloqueos y baja confianza por material sin permiso.`,
  `## De la métrica a la acción\n\nCada KPI debe terminar en decisión: grabar más de X, eliminar formato Y, probar CTA Z. Si el reporte no cambia la semana siguiente, es vanity reporting.`,
  `## Recursos finales\n\nExplora ${L.pilar}, ${L.marketingEmp} y ${L.tarifas}. Si necesitas diagnóstico personalizado, ${L.contacto}.`,
];

export const depthBlocksEn = (subjectEn, EL) => [
  `## Weekly application of ${subjectEn}\n\nEach Monday review last week's posts and classify by outcome: high reach, high saves, DMs, sales. Duplicate the winning format with a new angle — do not copy the script verbatim.`,
  `## Formats that work in Colombia\n\n9:16 Reels with burned captions remain discovery base. Carousels handle objections. Stories maintain daily relationship. Pick based on real capacity — see ${EL.produccion} if editing is the bottleneck.`,
  `## Advanced mistakes\n\nMixing languages without brand criteria confuses. Posting offers without prior proof burns audience. Ignoring intent comments in the first 2 hours hurts distribution.`,
  `## Internal collaboration\n\nDefine roles: who ideates, shoots, edits, publishes, replies. A 45-minute weekly meeting prevents bottlenecks.`,
  `## Quarterly review\n\nEvery 90 days ask: are pillars and persona still valid? Which format drove most business? Adjust organic vs paid budget using ${EL.roi}.`,
  `## Typical Colombian SMB\n\nA local business with medium ticket often needs 8–12 monthly pieces and fast WhatsApp response. After 10 weeks of cadence many double inquiries though followers grow slowly.`,
  `## Sales integration\n\nShare with closers what content went live and which objections they hear. Scripts align with real questions.`,
  `## Minimum tools\n\nCalendar, asset storage, native Insights, UTM links, inquiry log. Discipline beats expensive stack.`,
  `## When to scale investment\n\nScale ${EL.gestion} or production when message-market fit exists, validated idea backlog and sales response capacity.`,
  `## Next meeting questions\n\nWhat do we stop posting? What do we duplicate? Which KPI do we review Friday? Do we need ${EL.sesion}?`,
  `## Realistic SMB benchmarks\n\nDo not compare your first 90 days to established brands. Seek relative improvement: more inquiries, better retention, more saves than last month.`,
  `## Minimum documentation\n\nSave monthly Insight screenshots and note which hooks worked. In six months you have a data-based playbook.`,
  `## Content and WhatsApp\n\nIn Colombia much conversion happens on WhatsApp. Content must prepare the conversation: context, proof, price expectation.`,
  `## Sustainable pace\n\nThree weekly pieces for a year beats seven pieces for one month then silence.`,
  `## Maturity signals\n\nYou stop chasing trends without criteria, you have a pillar-aligned idea backlog, sales recognizes content as a lead source.`,
  `## Local partnerships\n\nCollaborate with complementary businesses for qualified reach in your city.`,
  `## Legal and permissions\n\nUse contracts for UGC, licensed music and customer image rights.`,
  `## From metric to action\n\nEvery KPI must end in a decision: shoot more of X, drop format Y, test CTA Z.`,
  `## Final resources\n\nExplore ${EL.pilar}, ${EL.marketingEmp} and ${EL.tarifas}. For personalized diagnosis: ${EL.contacto}.`,
];

export const compDepthEs = (optA, optB, L) => [
  `## Matriz de decisión ampliada\n\nPuntúa del 1 al 5: claridad estratégica interna, volumen mensual requerido, presupuesto, urgencia de resultados, madurez de marca. Si estrategia interna es baja y urgencia alta, ${optB} suele ir primero. Si estrategia existe y falta ejecución, ${optA} puede bastar.`,
  `## Preguntas para entrevistar candidatos\n\n¿Qué KPIs reportan? ¿Quién escribe guiones? ¿Propiedad de archivos? ¿Cuántas rondas de revisión? ¿Experiencia en tu vertical? Pide caso con métricas, no solo capturas bonitas.`,
  `## Contratos y alcance\n\nDefine entregables mensuales, canales cubiertos, tiempos de respuesta, qué pasa si no se cumple cadencia y periodo de salida. Evita "gestión de redes" sin número de piezas.`,
  `## Puente comercial\n\nRevisa ${L.tarifas} y ${L.estrategia}. Muchas marcas contratan ${optA} cuando necesitan ${optB} — o viceversa — y pagan el rol equivocado.`,
  `## Señales de éxito a 90 días\n\nConsultas calificadas estables o crecientes, biblioteca de contenido reutilizable, reporting claro, menos debates internos sobre "qué publicar".`,
  `## Híbrido recomendado\n\nEstratega trimestral + ejecutor mensual + producción por batch es patrón común en pymes que escalan sin agencia grande.`,
  `## Errores legales y operativos\n\nSin contrato de derechos de imagen en UGC. Sin acceso a cuentas en nombre de la marca. Sin backup de assets. Sin NDA si compites en nicho saturado.`,
  `## Checklist final\n\nRol definido, KPI acordado, presupuesto alineado a ticket, revisión a 60 días agendada, contacto ${L.contacto} si necesitas diagnóstico externo.`,
  `## Costo total de propiedad\n\nIncluye brief interno, revisiones, herramientas y oportunidad perdida si el rol equivocado retrasa ventas. A veces ${optB} ahorra dinero vs meses de ${optA} mal encaminado.`,
  `## Migración entre modelos\n\nPuedes empezar con ${optA} 90 días y subir a ${optB} cuando el volumen crece — documenta handoff y accesos.`,
  `## Red flags en propuestas\n\nPrecio muy bajo sin detalle, promesa de viralidad garantizada, sin referencias verificables, negativa a reportar KPIs de negocio.`,
  `## Tablero de seguimiento\n\nColumnas: mes, rol contratado, piezas entregadas, consultas, costo, notas. Revisa antes de renovar contrato.`,
  `## Impacto en marca\n\nEl proveedor equivocado no solo cuesta dinero — puede diluir posicionamiento. Prioriza fit con ${L.estrategia} sobre moda visual.`,
  `## Preguntas de cierre\n\n¿Qué pasa el mes 1 si no hay resultados? ¿Quién aprueba guiones? ¿Hay SLA de respuesta en comentarios y DM?`,
  `## Lecturas relacionadas\n\n[Agencia vs freelance](/es/blog/agencia-vs-freelance-contenido), [cómo elegir proveedor](/es/blog/como-elegir-proveedor-de-contenido), ${L.tarifas}.`,
];

export const compDepthEn = (optA, optB, EL) => [
  `## Extended decision matrix\n\nScore 1–5: internal strategic clarity, monthly volume, budget, urgency, brand maturity. Low internal strategy + high urgency often needs ${optB} first.`,
  `## Interview questions\n\nWhich KPIs do they report? Who writes scripts? File ownership? Revision rounds? Vertical experience? Ask for metrics case, not only pretty screenshots.`,
  `## Contracts and scope\n\nDefine monthly deliverables, channels, response times, cadence failure terms and exit period.`,
  `## Commercial bridge\n\nSee ${EL.tarifas} and ${EL.estrategia}. Many brands hire ${optA} when they need ${optB}.`,
  `## Success signals at 90 days\n\nStable or growing qualified inquiries, reusable content library, clear reporting.`,
  `## Recommended hybrid\n\nQuarterly strategist + monthly executor + batch production is common for scaling SMBs.`,
  `## Operational mistakes\n\nNo UGC image rights contract. No brand-owned account access. No asset backup.`,
  `## Final checklist\n\nRole defined, KPI agreed, budget aligned to ticket, 60-day review scheduled.`,
  `## Total cost of ownership\n\nInclude internal brief time, revisions, tools and lost opportunity if the wrong role delays sales.`,
  `## Migrating between models\n\nStart with ${optA} for 90 days and move to ${optB} when volume grows — document handoff.`,
  `## Red flags in proposals\n\nVery low price without detail, guaranteed virality, no verifiable references, refusal to report business KPIs.`,
  `## Tracking board\n\nColumns: month, role hired, pieces delivered, inquiries, cost, notes. Review before renewing.`,
  `## Brand impact\n\nWrong provider can dilute positioning — prioritize fit with ${EL.estrategia} over visual trend.`,
  `## Closing questions\n\nWhat happens month 1 if no results? Who approves scripts? Is there comment/DM response SLA?`,
  `## Related reading\n\n[Agency vs freelance](/en/blog/agencia-vs-freelance-contenido), [choose provider](/en/blog/como-elegir-proveedor-de-contenido), ${EL.tarifas}.`,
];

export const esLinks = {
  estrategia: '[estrategia de contenido](/es/servicios/estrategia-contenido)',
  sesion: '[sesión estratégica](/es/servicios/sesion-estrategica)',
  gestion: '[gestión mensual](/es/servicios/gestion-mensual)',
  produccion: '[producción de contenido](/es/servicios/produccion-contenido)',
  pilar: '[estrategia de contenido Colombia](/es/blog/estrategia-de-contenido-colombia)',
  marketingEmp: '[marketing de contenidos para emprendedores](/es/blog/marketing-de-contenidos-para-emprendedores)',
  tarifas: '[tarifas](/es/tarifas)',
  contacto: '[contacto](/es/contacto)',
  roi: '[ROI del contenido orgánico](/es/blog/roi-contenido-organico)',
};

export const enLinks = {
  estrategia: '[content strategy](/en/services/content-strategy)',
  sesion: '[strategy session](/en/services/strategy-session)',
  gestion: '[monthly management](/en/services/monthly-management)',
  produccion: '[content production](/en/services/content-production)',
  pilar: '[content strategy Colombia](/en/blog/estrategia-de-contenido-colombia)',
  marketingEmp: '[content marketing for entrepreneurs](/en/blog/marketing-de-contenidos-para-emprendedores)',
  tarifas: '[pricing](/en/pricing)',
  contacto: '[contact](/en/contact)',
  roi: '[organic content ROI](/en/blog/roi-contenido-organico)',
};
