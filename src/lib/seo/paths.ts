import { siteConfig, type SiteLocale } from '@/config/site';
import {
  serviceSlugLocales,
  caseStudySlugLocales,
  type ServiceSlug,
  type CaseStudySlug,
} from '@/content/registry';

/**
 * Public path prefixes per locale (no leading locale segment).
 * Canonical hubs only — legacy aliases resolve to the fused pages.
 * Visible menu: Inicio | Experiencias | Servicios | Blog | Sobre mí | Contacto
 * Pricing hub: /tarifas · /pricing (rangos COP — HU-CRO-001)
 * Redirects: /portafolio,/portfolio → experiences
 */
const hubs = {
  home: { es: '', en: '' },
  services: { es: '/servicios', en: '/services' },
  caseStudies: { es: '/experiencias', en: '/experiences' },
  pricing: { es: '/tarifas', en: '/pricing' },
  /** @deprecated Alias — fused into experiences (never emit as a distinct sitemap URL). */
  portfolio: { es: '/experiencias', en: '/experiences' },
  about: { es: '/sobre-mi', en: '/about' },
  contact: { es: '/contacto', en: '/contact' },
  blog: { es: '/blog', en: '/blog' },
} as const;

export type SeoHub = keyof typeof hubs;

export type SeoRoute =
  | { type: 'hub'; hub: SeoHub }
  | { type: 'service'; slug: ServiceSlug }
  | { type: 'caseStudy'; slug: CaseStudySlug }
  | { type: 'blogPost'; slug: string };

/**
 * Build a locale-aware public path: `/es/servicios/estrategia-digital`
 * Critical for hreflang — EN/ES pathnames are not a simple prefix swap.
 */
export function buildLocalizedPath(locale: SiteLocale, route: SeoRoute): string {
  switch (route.type) {
    case 'hub': {
      const suffix = hubs[route.hub][locale];
      return `/${locale}${suffix}`;
    }
    case 'service': {
      const slug = serviceSlugLocales[route.slug][locale];
      return `/${locale}${hubs.services[locale]}/${slug}`;
    }
    case 'caseStudy': {
      const slug = caseStudySlugLocales[route.slug][locale];
      return `/${locale}${hubs.caseStudies[locale]}/${slug}`;
    }
    case 'blogPost': {
      return `/${locale}/blog/${route.slug}`;
    }
    default: {
      const _exhaustive: never = route;
      return _exhaustive;
    }
  }
}

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${siteConfig.url}${normalized}`;
}

/** Absolute URLs for every locale of the same logical route (hreflang map). */
export function buildAlternateLanguages(route: SeoRoute): Record<string, string> {
  return {
    'es-CO': absoluteUrl(buildLocalizedPath('es', route)),
    en: absoluteUrl(buildLocalizedPath('en', route)),
    'x-default': absoluteUrl(buildLocalizedPath('es', route)),
  };
}

export function resolveCanonicalServiceSlug(
  publicSlug: string,
): ServiceSlug | null {
  const entry = Object.entries(serviceSlugLocales).find(
    ([, locales]) => locales.es === publicSlug || locales.en === publicSlug,
  );
  return (entry?.[0] as ServiceSlug | undefined) ?? null;
}

export function resolveCanonicalCaseSlug(
  publicSlug: string,
): CaseStudySlug | null {
  const entry = Object.entries(caseStudySlugLocales).find(
    ([, locales]) => locales.es === publicSlug || locales.en === publicSlug,
  );
  return (entry?.[0] as CaseStudySlug | undefined) ?? null;
}

export type BreadcrumbItem = {
  name: string;
  path: string;
};

export function buildBreadcrumbs(
  locale: SiteLocale,
  items: Array<{ name: string; route?: SeoRoute }>,
): BreadcrumbItem[] {
  const homeLabel = locale === 'es' ? 'Inicio' : 'Home';
  const crumbs: BreadcrumbItem[] = [
    { name: homeLabel, path: buildLocalizedPath(locale, { type: 'hub', hub: 'home' }) },
  ];

  for (const item of items) {
    crumbs.push({
      name: item.name,
      path: item.route
        ? buildLocalizedPath(locale, item.route)
        : crumbs[crumbs.length - 1].path,
    });
  }

  return crumbs;
}
