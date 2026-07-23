/**
 * JSON-LD @graph builders — single script per page.
 * @see https://developers.google.com/search/docs/appearance/structured-data
 */

import { siteConfig, type SiteLocale } from '@/config/site';
import { KNOW_ABOUT_ENTITIES } from '@/config/seo-strategy';
import { absoluteUrl, buildLocalizedPath, type BreadcrumbItem } from '@/lib/seo/paths';

const OG_IMAGE = `${siteConfig.url}/assets/og-paola.jpg`;

export type JsonLdNode = Record<string, unknown>;

export function buildGraph(nodes: JsonLdNode[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes.filter(Boolean),
  };
}

export function personId(locale: string) {
  return `${siteConfig.url}/${locale}/#person`;
}

export function organizationId(locale: string) {
  return `${siteConfig.url}/${locale}/#organization`;
}

export function websiteId(locale: string) {
  return `${siteConfig.url}/${locale}/#website`;
}

export function professionalServiceId(locale: string) {
  return `${siteConfig.url}/${locale}/#professional-service`;
}

export function personNode(locale: string = 'es'): JsonLdNode {
  const typedLocale = (locale === 'en' ? 'en' : 'es') as SiteLocale;

  return {
    '@type': 'Person',
    '@id': personId(locale),
    name: siteConfig.legalName,
    alternateName: siteConfig.name,
    jobTitle: siteConfig.jobTitle[typedLocale],
    description: siteConfig.description[typedLocale],
    url: `${siteConfig.url}/${locale}`,
    image: `${siteConfig.url}/assets/fotopaola.jpg`,
    email: siteConfig.contact.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: siteConfig.geo.addressLocality,
      addressRegion: siteConfig.geo.addressRegion,
      addressCountry: siteConfig.geo.addressCountry,
    },
    worksFor: { '@id': organizationId(locale) },
    sameAs: Object.values(siteConfig.social),
    knowsAbout: [...KNOW_ABOUT_ENTITIES],
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Maestría en Comunicación Digital',
    },
  };
}

export function organizationNode(locale: string = 'es'): JsonLdNode {
  return {
    '@type': 'Organization',
    '@id': organizationId(locale),
    name: siteConfig.name,
    url: `${siteConfig.url}/${locale}`,
    logo: {
      '@type': 'ImageObject',
      url: OG_IMAGE,
    },
    image: OG_IMAGE,
    founder: { '@id': personId(locale) },
    email: siteConfig.contact.email,
    sameAs: Object.values(siteConfig.social),
    areaServed: siteConfig.geo.areaServed.map((name) => ({
      '@type': 'AdministrativeArea',
      name,
    })),
  };
}

export function websiteNode(locale: string = 'es'): JsonLdNode {
  return {
    '@type': 'WebSite',
    '@id': websiteId(locale),
    url: `${siteConfig.url}/${locale}`,
    name: siteConfig.name,
    description: siteConfig.description[locale === 'en' ? 'en' : 'es'],
    inLanguage: locale === 'es' ? 'es-CO' : 'en',
    publisher: { '@id': organizationId(locale) },
    potentialAction: {
      '@type': 'CommunicateAction',
      name: locale === 'es' ? 'Contactar por correo' : 'Contact by email',
      target: absoluteUrl(
        buildLocalizedPath(locale === 'en' ? 'en' : 'es', {
          type: 'hub',
          hub: 'contact',
        }),
      ),
    },
  };
}

export function professionalServiceNode(
  locale: string = 'es',
  input: {
    name?: string;
    description?: string;
    url?: string;
    serviceType?: string[];
    priceRange?: string;
  } = {},
): JsonLdNode {
  const typedLocale = (locale === 'en' ? 'en' : 'es') as SiteLocale;

  return {
    '@type': 'ProfessionalService',
    '@id': professionalServiceId(locale),
    name:
      input.name ??
      (typedLocale === 'es'
        ? 'Paola Hoyos — Estrategia Digital y Crecimiento Orgánico'
        : 'Paola Hoyos — Digital Strategy & Organic Growth'),
    description: input.description ?? siteConfig.description[typedLocale],
    url: input.url ?? `${siteConfig.url}/${locale}`,
    image: OG_IMAGE,
    email: siteConfig.contact.email,
    priceRange: input.priceRange ?? '$$',
    currenciesAccepted: 'COP',
    paymentAccepted: 'Invoice, Transfer',
    founder: { '@id': personId(locale) },
    employee: { '@id': personId(locale) },
    areaServed: [
      { '@type': 'Country', name: 'Colombia' },
      { '@type': 'City', name: 'Medellín' },
      { '@type': 'City', name: 'Bogotá' },
      { '@type': 'City', name: 'Barranquilla' },
      { '@type': 'AdministrativeArea', name: 'LatAm' },
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: siteConfig.geo.addressLocality,
      addressRegion: siteConfig.geo.addressRegion,
      addressCountry: siteConfig.geo.addressCountry,
    },
    serviceType: input.serviceType ?? [
      'Content Strategy',
      'Content Production',
      'Video Editing for Social Media',
      'UGC-style Brand Videos',
      'Monthly Social Management',
      'Strategic Advisory',
    ],
    sameAs: Object.values(siteConfig.social),
  };
}

export function breadcrumbNode(
  locale: string,
  items: BreadcrumbItem[],
): JsonLdNode {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${absoluteUrl(items[items.length - 1]?.path ?? `/${locale}`)}#breadcrumb`,
    itemListElement: items.map((entry, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: entry.name,
      item: absoluteUrl(entry.path),
    })),
  };
}

export function faqNode(
  pageUrl: string,
  faqs: Array<{ question: string; answer: string }>,
): JsonLdNode | null {
  if (!faqs.length) return null;

  return {
    '@type': 'FAQPage',
    '@id': `${pageUrl}#faq`,
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function articleNode(input: {
  locale: string;
  headline: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
  image?: string;
  keywords?: string[];
}): JsonLdNode {
  return {
    '@type': 'Article',
    '@id': `${input.url}#article`,
    headline: input.headline,
    description: input.description,
    url: input.url,
    mainEntityOfPage: input.url,
    inLanguage: input.locale === 'es' ? 'es-CO' : 'en',
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    image: input.image ?? OG_IMAGE,
    keywords: input.keywords?.join(', '),
    author: { '@id': personId(input.locale) },
    publisher: { '@id': organizationId(input.locale) },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.geo-answer', '.geo-answer__body', 'h1'],
    },
  };
}

export function caseStudyNode(input: {
  locale: string;
  headline: string;
  description: string;
  url: string;
  brand: string;
  metrics?: Array<{ label: string; value: string }>;
}): JsonLdNode {
  return {
    '@type': ['Article', 'Report'],
    '@id': `${input.url}#case-study`,
    headline: input.headline,
    description: input.description,
    url: input.url,
    about: {
      '@type': 'Brand',
      name: input.brand,
    },
    author: { '@id': personId(input.locale) },
    publisher: { '@id': organizationId(input.locale) },
    inLanguage: input.locale === 'es' ? 'es-CO' : 'en',
    ...(input.metrics?.length
      ? {
          mentions: input.metrics.map((metric) => ({
            '@type': 'QuantitativeValue',
            name: metric.label,
            value: metric.value,
          })),
        }
      : {}),
  };
}

export function reviewNode(input: {
  locale: string;
  reviewBody: string;
  authorName: string;
  result?: string;
  ratingValue?: number;
}): JsonLdNode {
  return {
    '@type': 'Review',
    reviewBody: input.result
      ? `${input.reviewBody} ${input.result}`
      : input.reviewBody,
    author: {
      '@type': 'Person',
      name: input.authorName,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: input.ratingValue ?? 5,
      bestRating: 5,
      worstRating: 1,
    },
    itemReviewed: {
      '@id': professionalServiceId(input.locale),
      '@type': 'ProfessionalService',
      name: siteConfig.name,
    },
  };
}

export function offerNode(input: {
  locale: string;
  name: string;
  description?: string;
  priceCurrency?: string;
  lowPrice?: string | number;
  highPrice?: string | number;
  url?: string;
}): JsonLdNode {
  return {
    '@type': 'Offer',
    '@id': `${input.url ?? professionalServiceId(input.locale)}#offer`,
    name: input.name,
    description: input.description,
    priceCurrency: input.priceCurrency ?? 'COP',
    ...(input.lowPrice != null || input.highPrice != null
      ? {
          priceSpecification: {
            '@type': 'PriceSpecification',
            priceCurrency: input.priceCurrency ?? 'COP',
            minPrice: input.lowPrice,
            maxPrice: input.highPrice,
          },
        }
      : {}),
    availability: 'https://schema.org/InStock',
    seller: { '@id': organizationId(input.locale) },
    url: input.url,
  };
}

export function serviceNode(input: {
  locale: string;
  name: string;
  description: string;
  url: string;
  serviceType: string;
}): JsonLdNode {
  return {
    '@type': 'Service',
    '@id': `${input.url}#service`,
    name: input.name,
    description: input.description,
    url: input.url,
    serviceType: input.serviceType,
    provider: { '@id': professionalServiceId(input.locale) },
    areaServed: { '@type': 'Country', name: 'Colombia' },
  };
}

export function webPageNode(input: {
  locale: string;
  name: string;
  description: string;
  url: string;
  type?: string | string[];
  speakable?: boolean;
}): JsonLdNode {
  return {
    '@type': input.type ?? 'WebPage',
    '@id': `${input.url}#webpage`,
    url: input.url,
    name: input.name,
    description: input.description,
    isPartOf: { '@id': websiteId(input.locale) },
    about: { '@id': personId(input.locale) },
    inLanguage: input.locale === 'es' ? 'es-CO' : 'en',
    ...(input.speakable
      ? {
          speakable: {
            '@type': 'SpeakableSpecification',
            cssSelector: ['.geo-answer', '.geo-answer__body', 'h1'],
          },
        }
      : {}),
  };
}

/** Core entities shared by most pages */
export function coreGraph(locale: string): JsonLdNode[] {
  return [
    personNode(locale),
    organizationNode(locale),
    websiteNode(locale),
    professionalServiceNode(locale),
  ];
}
