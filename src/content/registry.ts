/**
 * Content registry — drives static params & IA.
 * Bodies live in content/{collection}/{locale}/{canonicalSlug}.mdx (Phase 5).
 * Content stays decoupled from UI so a CMS can replace loaders later.
 * Blog publishing is the 20-guide set in blog-catalog; pruned MDX is archived.
 */

import { KEPT_BLOG_SLUGS } from '@/content/blog-catalog';

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

export const blogSlugs = KEPT_BLOG_SLUGS;

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
