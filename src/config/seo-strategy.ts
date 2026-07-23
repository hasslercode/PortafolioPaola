/**
 * SEO strategy constants — keyword clusters & package→service map.
 * Source of truth for IA commercial targeting (Colombia).
 * @see docs/seo/ROADMAP-TOP10-COLOMBIA.md
 */

import type { ServiceSlug } from '@/content/registry';

/** Hub investment cards → canonical service MDX slugs */
export const PACKAGE_TO_SERVICE_SLUG: Record<string, ServiceSlug> = {
  estrategia: 'estrategia-contenido',
  produccion: 'produccion-contenido',
  'gestion-mensual': 'gestion-mensual',
};

export const CONSULT_SERVICE_SLUG: ServiceSlug = 'sesion-estrategica';

/** Primary commercial keywords (ES-CO) — home / services hubs */
export const PRIMARY_KEYWORDS_ES = [
  'creación de contenido colombia',
  'edición de videos para redes',
  'estrategia de contenido',
  'videos para redes sociales',
  'creador ugc colombia',
  'videos para marcas',
  'marketing para emprendedores',
  'producción de contenido',
  'gestión de redes sociales colombia',
] as const;

export const KNOW_ABOUT_ENTITIES = [
  'Content Strategy',
  'Content Creation',
  'Video Editing for Social Media',
  'Reels and Short-Form Video',
  'UGC-style Brand Content',
  'Organic Growth',
  'Storytelling',
  'Monthly Social Management',
  'Strategic Advisory',
  'Entrepreneur Marketing Colombia',
] as const;
