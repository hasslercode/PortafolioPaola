import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

/**
 * Locale-aware pathnames (physical URLs per language).
 * Internal filesystem keys are English; public URLs localize via this map.
 * @see docs/architecture/SITE-IA.md
 * @see https://next-intl.dev/docs/routing/configuration#pathnames
 */
export const routing = defineRouting({
  locales: ['es', 'en'],
  defaultLocale: 'es',
  localePrefix: 'always',
  pathnames: {
    '/': '/',
    '/services': {
      es: '/servicios',
      en: '/services',
    },
    '/services/[slug]': {
      es: '/servicios/[slug]',
      en: '/services/[slug]',
    },
    '/experiences': {
      es: '/experiencias',
      en: '/experiences',
    },
    '/experiences/[slug]': {
      es: '/experiencias/[slug]',
      en: '/experiences/[slug]',
    },
    '/portfolio': {
      es: '/portafolio',
      en: '/portfolio',
    },
    '/about': {
      es: '/sobre-mi',
      en: '/about',
    },
    '/contact': {
      es: '/contacto',
      en: '/contact',
    },
    '/pricing': {
      es: '/tarifas',
      en: '/pricing',
    },
    '/process': {
      es: '/proceso-de-trabajo',
      en: '/process',
    },
    '/privacy': {
      es: '/privacidad',
      en: '/privacy',
    },
    '/terms': {
      es: '/terminos',
      en: '/terms',
    },
    '/legal': {
      es: '/aviso-legal',
      en: '/legal-notice',
    },
    '/faq': {
      es: '/preguntas-frecuentes',
      en: '/faq',
    },
    '/results': {
      es: '/resultados',
      en: '/results',
    },
    '/blog': '/blog',
    '/blog/[slug]': '/blog/[slug]',
    '/cities': {
      es: '/ciudades',
      en: '/cities',
    },
  },
});

export type AppPathname = keyof typeof routing.pathnames;
export type AppLocale = (typeof routing.locales)[number];

export const { Link, redirect, permanentRedirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
