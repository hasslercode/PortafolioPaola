/**
 * Content registry — drives static params & IA.
 * Bodies live in content/{collection}/{locale}/{canonicalSlug}.mdx (Phase 5).
 * Content stays decoupled from UI so a CMS can replace loaders later.
 */

export const serviceSlugs = [
  'community-manager',
  'estrategia-digital',
  'storytelling',
  'creacion-contenido',
  'cobertura-eventos',
  'email-marketing',
] as const;

export const caseStudySlugs = [
  'parque-alegra',
  'coca-cola',
  'starbucks',
  'hm',
  'cine-colombia',
] as const;

export const blogSlugs = [
  'tarifas-community-manager-colombia',
  'como-contratar-estratega-digital',
  'roi-contenido-organico',
  'storytelling-para-retail',
  'marketing-marcas-consumo',
] as const;

export type ServiceSlug = (typeof serviceSlugs)[number];
export type CaseStudySlug = (typeof caseStudySlugs)[number];
export type BlogSlug = (typeof blogSlugs)[number];

/** Locale-specific slug aliases (EN public URLs can diverge later). */
export const serviceSlugLocales: Record<
  ServiceSlug,
  { es: string; en: string }
> = {
  'community-manager': {
    es: 'community-manager',
    en: 'community-manager',
  },
  'estrategia-digital': {
    es: 'estrategia-digital',
    en: 'digital-strategy',
  },
  storytelling: {
    es: 'storytelling',
    en: 'storytelling',
  },
  'creacion-contenido': {
    es: 'creacion-contenido',
    en: 'content-creation',
  },
  'cobertura-eventos': {
    es: 'cobertura-eventos',
    en: 'event-coverage',
  },
  'email-marketing': {
    es: 'email-marketing',
    en: 'email-marketing',
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
};
