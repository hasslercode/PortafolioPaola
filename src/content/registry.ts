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
