/**
 * Site-wide constants — single source of truth for entity data.
 * Used by SEO metadata, JSON-LD, analytics, and CTAs.
 * Location strategy: Medellín (residence) + Colombia / remote (market).
 */
export const siteConfig = {
  name: 'Paola Hoyos',
  legalName: 'Paola Andrea Hoyos Cardona',
  domain: 'www.paolahoyos.com',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.paolahoyos.com',
  defaultLocale: 'es' as const,
  locales: ['es', 'en'] as const,

  tagline: {
    es: 'Estrategia · Storytelling & Resultados',
    en: 'Strategy · Storytelling & Results',
  },

  jobTitle: {
    es: 'Comunicadora Social y Estratega Digital',
    en: 'Social Communicator & Digital Strategist',
  },

  description: {
    es: 'Estrategia digital, creación de contenido y storytelling para marcas, emprendedores y negocios en Colombia que buscan crecer con resultados reales.',
    en: 'Digital strategy, content creation and storytelling for brands and businesses in Colombia seeking real organic growth.',
  },

  contact: {
    email: 'pahoyoscardona@gmail.com',
    calendly: process.env.NEXT_PUBLIC_CALENDLY_URL ?? '',
  },

  social: {
    instagram: 'https://www.instagram.com/paolaahoyosc',
    tiktok: 'https://www.tiktok.com/@paolahoyosc',
    linkedin:
      'https://www.linkedin.com/in/paola-andrea-hoyos-cardona-b7247a182',
  },

  /**
   * Geographic positioning (GEO/SEO):
   * - addressLocality: Medellín (current residence)
   * - areaServed: Colombia + remote for brands nationwide
   * Do NOT over-index on a single city unless building a local landing.
   */
  geo: {
    addressLocality: 'Medellín',
    addressRegion: 'Antioquia',
    addressCountry: 'CO',
    areaServed: ['Colombia', 'LatAm'],
  },

  metrics: {
    organicViews90d: '1.3M+',
    yearsExperience: 4,
  },

  brands: [
    'Coca-Cola',
    'Starbucks',
    'Cine Colombia',
    'H&M',
    'TOTTO',
    'Parque Alegra',
  ] as const,
} as const;

export type SiteLocale = (typeof siteConfig.locales)[number];
