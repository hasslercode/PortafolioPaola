/**
 * Published blog (20 GSC guides) and permanent redirects for archived guides.
 * Archived MDX lives in content/blog/_archive and is not loaded by the registry.
 */

export const KEPT_BLOG_SLUGS = [
  'definicion-reel',
  'tarifas-creador-ugc-colombia',
  'subtitulos-en-reels-mejores-practicas',
  'creador-ugc-colombia-guia',
  'que-es-ugc-y-por-que-funciona-en-colombia',
  'exportar-video-para-instagram-y-tiktok',
  'precio-edicion-de-reels-colombia',
  'cta-en-videos-que-convierten',
  'como-contratar-creador-ugc',
  'guion-para-reels-de-ventas',
  'definicion-color-grading',
  'definicion-content-batching',
  'tono-de-voz-de-marca-guia',
  'ugc-para-marcas-de-moda',
  'edicion-de-video-medellin',
  'definicion-retention',
  'definicion-capcut-vs-premiere',
  'contenido-organico-vs-pauta',
  'hooks-primeros-3-segundos-tiktok',
  'instagram-reels-para-negocios-colombia',
] as const;

export type KeptBlogSlug = (typeof KEPT_BLOG_SLUGS)[number];

export type BlogRedirectTarget =
  | { kind: 'post'; slug: KeptBlogSlug }
  | { kind: 'services' }
  | { kind: 'pricing' };

export const BLOG_REDIRECTS: Record<string, BlogRedirectTarget> = {
  'agencia-vs-freelance-contenido': { kind: 'services' },
  'auditoria-de-instagram-paso-a-paso': { kind: 'post', slug: 'instagram-reels-para-negocios-colombia' },
  'brief-ugc-plantilla': { kind: 'post', slug: 'como-contratar-creador-ugc' },
  'buyer-persona-para-redes-sociales': { kind: 'post', slug: 'tono-de-voz-de-marca-guia' },
  'calendario-de-videos-semanal-pyme': { kind: 'post', slug: 'definicion-content-batching' },
  'checklist-antes-de-publicar': { kind: 'post', slug: 'exportar-video-para-instagram-y-tiktok' },
  'community-manager-medellin': { kind: 'services' },
  'community-manager-vs-estratega-digital': { kind: 'services' },
  'como-briefear-a-tu-editor-de-video': { kind: 'post', slug: 'precio-edicion-de-reels-colombia' },
  'como-contratar-estratega-digital': { kind: 'services' },
  'como-editar-reels-que-retienen': { kind: 'post', slug: 'definicion-retention' },
  'como-elegir-proveedor-de-contenido': { kind: 'post', slug: 'como-contratar-creador-ugc' },
  'como-escalar-contenido-ugc-mensual': { kind: 'post', slug: 'tarifas-creador-ugc-colombia' },
  'como-hacer-un-calendario-de-contenidos': { kind: 'post', slug: 'definicion-content-batching' },
  'como-reutilizar-un-video-en-5-piezas': { kind: 'post', slug: 'definicion-content-batching' },
  'contenido-evergreen-vs-tendencias': { kind: 'post', slug: 'definicion-content-batching' },
  'contenido-para-bienes-raices': { kind: 'services' },
  'contenido-para-centros-comerciales': { kind: 'services' },
  'contenido-para-clinicas-y-servicios': { kind: 'services' },
  'contenido-para-ecommerce': { kind: 'post', slug: 'que-es-ugc-y-por-que-funciona-en-colombia' },
  'contenido-para-educacion-cursos': { kind: 'services' },
  'contenido-para-marcas-personales': { kind: 'post', slug: 'tono-de-voz-de-marca-guia' },
  'contenido-para-restaurantes-cafes': { kind: 'services' },
  'contenido-para-retail-moda': { kind: 'post', slug: 'ugc-para-marcas-de-moda' },
  'contenido-tiktok-para-negocios-colombia': { kind: 'post', slug: 'instagram-reels-para-negocios-colombia' },
  'content-strategist-colombia-remoto': { kind: 'services' },
  'creacion-de-contenido-barranquilla': { kind: 'services' },
  'creacion-de-contenido-bogota': { kind: 'services' },
  'creacion-de-contenido-medellin': { kind: 'post', slug: 'edicion-de-video-medellin' },
  'creacion-de-contenido-para-redes-sociales': { kind: 'post', slug: 'definicion-reel' },
  'cuando-contratar-produccion-audiovisual': { kind: 'post', slug: 'precio-edicion-de-reels-colombia' },
  'definicion-alcance-organico': { kind: 'post', slug: 'contenido-organico-vs-pauta' },
  'definicion-b-roll': { kind: 'post', slug: 'definicion-reel' },
  'definicion-buyer-persona': { kind: 'post', slug: 'tono-de-voz-de-marca-guia' },
  'definicion-calendario-editorial': { kind: 'post', slug: 'definicion-content-batching' },
  'definicion-community-management': { kind: 'services' },
  'definicion-ctr': { kind: 'post', slug: 'definicion-retention' },
  'definicion-hook': { kind: 'post', slug: 'hooks-primeros-3-segundos-tiktok' },
  'definicion-share-of-voice': { kind: 'post', slug: 'contenido-organico-vs-pauta' },
  'definicion-storytelling': { kind: 'post', slug: 'tono-de-voz-de-marca-guia' },
  'definicion-ugc': { kind: 'post', slug: 'que-es-ugc-y-por-que-funciona-en-colombia' },
  'derechos-de-uso-contenido-ugc': { kind: 'post', slug: 'como-contratar-creador-ugc' },
  'diferencia-entre-edicion-basica-y-premium': { kind: 'post', slug: 'precio-edicion-de-reels-colombia' },
  'edicion-de-videos-de-marca-instagram-tiktok': { kind: 'post', slug: 'precio-edicion-de-reels-colombia' },
  'edicion-de-videos-para-redes-colombia': { kind: 'post', slug: 'precio-edicion-de-reels-colombia' },
  'edicion-interna-vs-externalizar': { kind: 'post', slug: 'precio-edicion-de-reels-colombia' },
  'ejemplos-ugc-marcas-consumo': { kind: 'post', slug: 'ugc-para-marcas-de-moda' },
  'errores-al-editar-reels-para-negocios': { kind: 'post', slug: 'definicion-reel' },
  'errores-de-contenido-que-matan-el-alcance': { kind: 'post', slug: 'hooks-primeros-3-segundos-tiktok' },
  'estrategia-contenido-instagram-tiktok-colombia': { kind: 'post', slug: 'instagram-reels-para-negocios-colombia' },
  'estrategia-de-contenido-colombia': { kind: 'services' },
  'estrategia-de-contenido-para-emprendedores': { kind: 'services' },
  'estrategia-digital-medellin': { kind: 'post', slug: 'edicion-de-video-medellin' },
  'formato-9-16-guia-emprendedores': { kind: 'post', slug: 'exportar-video-para-instagram-y-tiktok' },
  'funnel-de-contenido-awareness-a-venta': { kind: 'post', slug: 'cta-en-videos-que-convierten' },
  'gestion-de-redes-sociales-colombia': { kind: 'services' },
  'gestor-de-redes-vs-creador-de-contenido': { kind: 'post', slug: 'creador-ugc-colombia-guia' },
  'grabacion-profesional-con-celular': { kind: 'post', slug: 'definicion-reel' },
  'iluminacion-para-videos-en-casa': { kind: 'post', slug: 'definicion-reel' },
  'kpis-de-redes-para-pymes': { kind: 'post', slug: 'definicion-retention' },
  'marketing-de-contenidos-para-emprendedores': { kind: 'services' },
  'marketing-marcas-consumo': { kind: 'post', slug: 'ugc-para-marcas-de-moda' },
  'metricas-para-campanas-ugc': { kind: 'post', slug: 'definicion-retention' },
  'musica-libre-de-derechos-reels-colombia': { kind: 'post', slug: 'definicion-reel' },
  'pack-de-contenido-mensual-cuantos-videos': { kind: 'pricing' },
  'parrilla-de-contenido-instagram-tiktok': { kind: 'post', slug: 'definicion-content-batching' },
  'pilares-de-contenido-para-instagram': { kind: 'post', slug: 'tono-de-voz-de-marca-guia' },
  'plan-de-contenido-30-dias-plantilla': { kind: 'post', slug: 'definicion-content-batching' },
  'plan-mensual-vs-paquete-por-videos': { kind: 'pricing' },
  'produccion-reels-colombia': { kind: 'post', slug: 'instagram-reels-para-negocios-colombia' },
  'que-publicar-si-vendes-servicios': { kind: 'post', slug: 'instagram-reels-para-negocios-colombia' },
  'quien-contratar-para-reels-medellin': { kind: 'post', slug: 'edicion-de-video-medellin' },
  'reels-vs-tiktok-vs-shorts-colombia': { kind: 'post', slug: 'instagram-reels-para-negocios-colombia' },
  'roi-contenido-organico': { kind: 'post', slug: 'contenido-organico-vs-pauta' },
  'senales-de-que-tu-contenido-no-esta-funcionando': { kind: 'post', slug: 'definicion-retention' },
  'social-media-manager-vs-community-manager': { kind: 'services' },
  'storytelling-en-video-corto': { kind: 'post', slug: 'definicion-reel' },
  'storytelling-para-retail': { kind: 'post', slug: 'tono-de-voz-de-marca-guia' },
  'tarifas-community-manager-colombia': { kind: 'pricing' },
  'tiktok-o-instagram-para-mi-negocio': { kind: 'post', slug: 'instagram-reels-para-negocios-colombia' },
  'ugc-organico-vs-pagado': { kind: 'post', slug: 'contenido-organico-vs-pauta' },
  'ugc-para-ecommerce-colombia': { kind: 'post', slug: 'que-es-ugc-y-por-que-funciona-en-colombia' },
  'ugc-para-lanzamiento-de-producto': { kind: 'post', slug: 'que-es-ugc-y-por-que-funciona-en-colombia' },
  'ugc-para-restaurantes': { kind: 'post', slug: 'que-es-ugc-y-por-que-funciona-en-colombia' },
  'ugc-vs-fotos-de-catalogo': { kind: 'post', slug: 'que-es-ugc-y-por-que-funciona-en-colombia' },
  'ugc-vs-influencer-marketing': { kind: 'post', slug: 'que-es-ugc-y-por-que-funciona-en-colombia' },
  'videos-para-marcas-instagram-tiktok': { kind: 'post', slug: 'instagram-reels-para-negocios-colombia' },
  'videos-para-redes-bogota': { kind: 'services' },
};

export function isKeptBlogSlug(slug: string): slug is KeptBlogSlug {
  return (KEPT_BLOG_SLUGS as readonly string[]).includes(slug);
}

export function blogRedirectPath(
  locale: 'es' | 'en',
  target: BlogRedirectTarget,
): string {
  if (target.kind === 'post') return `/${locale}/blog/${target.slug}`;
  if (target.kind === 'services') {
    return locale === 'es' ? '/es/servicios' : '/en/services';
  }
  return locale === 'es' ? '/es/tarifas' : '/en/pricing';
}

/** One hop: unprefixed, /es and /en each land on the final URL. */
export function blogRedirectRules(): Array<{
  source: string;
  destination: string;
  permanent: true;
}> {
  const rules: Array<{ source: string; destination: string; permanent: true }> = [];
  for (const [slug, target] of Object.entries(BLOG_REDIRECTS)) {
    const es = blogRedirectPath('es', target);
    const en = blogRedirectPath('en', target);
    rules.push(
      { source: `/blog/${slug}`, destination: es, permanent: true },
      { source: `/es/blog/${slug}`, destination: es, permanent: true },
      { source: `/en/blog/${slug}`, destination: en, permanent: true },
    );
  }
  return rules;
}
