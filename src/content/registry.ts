/**
 * Content registry — drives static params & IA.
 * Bodies live in content/{collection}/{locale}/{canonicalSlug}.mdx (Phase 5).
 * Content stays decoupled from UI so a CMS can replace loaders later.
 */

export const serviceSlugs = [
  'sesion-estrategica',
  'estrategia-contenido',
  'produccion-contenido',
  'gestion-mensual',
  'ugc-videos-marcas',
] as const;

export const caseStudySlugs = [
  'parque-alegra',
  'coca-cola',
  'starbucks',
  'hm',
  'cine-colombia',
  'totto',
] as const;

export const blogSlugs = [
  'edicion-de-videos-para-redes-colombia',
  'estrategia-de-contenido-colombia',
  'creacion-de-contenido-para-redes-sociales',
  'creador-ugc-colombia-guia',
  'marketing-de-contenidos-para-emprendedores',
  'videos-para-marcas-instagram-tiktok',
  'tarifas-community-manager-colombia',
  'como-contratar-estratega-digital',
  'roi-contenido-organico',
  'storytelling-para-retail',
  'marketing-marcas-consumo',
  'como-editar-reels-que-retienen',
  'subtitulos-en-reels-mejores-practicas',
  'formato-9-16-guia-emprendedores',
  'guion-para-reels-de-ventas',
  'grabacion-profesional-con-celular',
  'iluminacion-para-videos-en-casa',
  'musica-libre-de-derechos-reels-colombia',
  'hooks-primeros-3-segundos-tiktok',
  'diferencia-entre-edicion-basica-y-premium',
  'pack-de-contenido-mensual-cuantos-videos',
  'storytelling-en-video-corto',
  'cta-en-videos-que-convierten',
  'errores-al-editar-reels-para-negocios',
  'como-briefear-a-tu-editor-de-video',
  'exportar-video-para-instagram-y-tiktok',
  'reels-vs-tiktok-vs-shorts-colombia',
  'calendario-de-videos-semanal-pyme',
  'precio-edicion-de-reels-colombia',
  'que-es-ugc-y-por-que-funciona-en-colombia',
  'ugc-vs-influencer-marketing',
  'como-contratar-creador-ugc',
  'brief-ugc-plantilla',
  'ugc-para-ecommerce-colombia',
  'ugc-para-restaurantes',
  'ugc-para-marcas-de-moda',
  'derechos-de-uso-contenido-ugc',
  'metricas-para-campanas-ugc',
  'ugc-organico-vs-pagado',
  'ejemplos-ugc-marcas-consumo',
  'como-escalar-contenido-ugc-mensual',
  'ugc-para-lanzamiento-de-producto',
  'tarifas-creador-ugc-colombia',
  'pilares-de-contenido-para-instagram',
  'como-hacer-un-calendario-de-contenidos',
  'buyer-persona-para-redes-sociales',
  'tono-de-voz-de-marca-guia',
  'contenido-organico-vs-pauta',
  'kpis-de-redes-para-pymes',
  'auditoria-de-instagram-paso-a-paso',
  'estrategia-de-contenido-para-emprendedores',
  'que-publicar-si-vendes-servicios',
  'funnel-de-contenido-awareness-a-venta',
  'contenido-evergreen-vs-tendencias',
  'como-reutilizar-un-video-en-5-piezas',
  'checklist-antes-de-publicar',
  'errores-de-contenido-que-matan-el-alcance',
  'plan-de-contenido-30-dias-plantilla',
  'community-manager-vs-estratega-digital',
  'agencia-vs-freelance-contenido',
  'gestor-de-redes-vs-creador-de-contenido',
  'edicion-interna-vs-externalizar',
  'tiktok-o-instagram-para-mi-negocio',
  'cuando-contratar-produccion-audiovisual',
  'plan-mensual-vs-paquete-por-videos',
  'ugc-vs-fotos-de-catalogo',
  'como-elegir-proveedor-de-contenido',
  'senales-de-que-tu-contenido-no-esta-funcionando',
  'creacion-de-contenido-medellin',
  'edicion-de-video-medellin',
  'estrategia-digital-medellin',
  'creacion-de-contenido-bogota',
  'videos-para-redes-bogota',
  'creacion-de-contenido-barranquilla',
  'content-strategist-colombia-remoto',
  'community-manager-medellin',
  'produccion-reels-colombia',
  'contenido-para-centros-comerciales',
  'contenido-para-retail-moda',
  'contenido-para-restaurantes-cafes',
  'contenido-para-marcas-personales',
  'contenido-para-ecommerce',
  'contenido-para-clinicas-y-servicios',
  'contenido-para-educacion-cursos',
  'contenido-para-bienes-raices',
  'definicion-ugc',
  'definicion-reel',
  'definicion-hook',
  'definicion-ctr',
  'definicion-retention',
  'definicion-storytelling',
  'definicion-buyer-persona',
  'definicion-calendario-editorial',
  'definicion-community-management',
  'definicion-content-batching',
  'definicion-b-roll',
  'definicion-color-grading',
  'definicion-capcut-vs-premiere',
  'definicion-alcance-organico',
  'definicion-share-of-voice',
  'quien-contratar-para-reels-medellin',
  'instagram-reels-para-negocios-colombia',
  'contenido-tiktok-para-negocios-colombia',
  'social-media-manager-vs-community-manager',
  'gestion-de-redes-sociales-colombia',
] as const;

export type ServiceSlug = (typeof serviceSlugs)[number];
export type CaseStudySlug = (typeof caseStudySlugs)[number];
export type BlogSlug = (typeof blogSlugs)[number];

/** Locale-specific slug aliases (EN public URLs can diverge later). */
export const serviceSlugLocales: Record<
  ServiceSlug,
  { es: string; en: string }
> = {
  'sesion-estrategica': {
    es: 'sesion-estrategica',
    en: 'strategy-session',
  },
  'estrategia-contenido': {
    es: 'estrategia-contenido',
    en: 'content-strategy',
  },
  'produccion-contenido': {
    es: 'produccion-contenido',
    en: 'content-production',
  },
  'gestion-mensual': {
    es: 'gestion-mensual',
    en: 'monthly-management',
  },
  'ugc-videos-marcas': {
    es: 'ugc-videos-marcas',
    en: 'ugc-brand-videos',
  },
};

export const caseStudySlugLocales: Record<
  CaseStudySlug,
  { es: string; en: string }
> = {
  'parque-alegra': { es: 'parque-alegra', en: 'parque-alegra' },
  'coca-cola': { es: 'coca-cola', en: 'coca-cola' },
  starbucks: { es: 'starbucks', en: 'starbucks' },
  hm: { es: 'hm', en: 'hm' },
  'cine-colombia': { es: 'cine-colombia', en: 'cine-colombia' },
  totto: { es: 'totto', en: 'totto' },
};
