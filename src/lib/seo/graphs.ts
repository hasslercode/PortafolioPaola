import {
  absoluteUrl,
  buildLocalizedPath,
  type BreadcrumbItem,
  type SeoRoute,
} from '@/lib/seo/paths';
import {
  articleNode,
  breadcrumbNode,
  buildGraph,
  caseStudyNode,
  coreGraph,
  faqNode,
  howToNode,
  itemListNode,
  offerNode,
  reviewNode,
  serviceNode,
  videoObjectNode,
  webPageNode,
  type JsonLdNode,
} from '@/lib/seo/jsonld';
import type { SiteLocale } from '@/config/site';

export function homeGraph(
  locale: SiteLocale,
  reviews: Array<{ reviewBody: string; authorName: string; result?: string }> = [],
) {
  const url = absoluteUrl(buildLocalizedPath(locale, { type: 'hub', hub: 'home' }));
  const nodes: JsonLdNode[] = [
    ...coreGraph(locale),
    webPageNode({
      locale,
      url,
      name: locale === 'es' ? 'Inicio' : 'Home',
      description:
        locale === 'es'
          ? 'Estrategia digital, storytelling y crecimiento orgánico para marcas en Colombia.'
          : 'Digital strategy, storytelling and organic growth for brands in Colombia.',
      type: 'WebPage',
      speakable: true,
    }),
    ...reviews.map((review) => reviewNode({ locale, ...review })),
  ];

  return buildGraph(nodes);
}

export function hubGraph(input: {
  locale: SiteLocale;
  route: SeoRoute;
  name: string;
  description: string;
  breadcrumbs: BreadcrumbItem[];
  faqs?: Array<{ question: string; answer: string }>;
  howToSteps?: Array<{ name: string; text: string }>;
  offers?: Array<{
    name: string;
    description?: string;
    lowPrice?: string | number;
    highPrice?: string | number;
  }>;
  itemList?: Array<{ name: string; url: string }>;
  itemListName?: string;
}) {
  const url = absoluteUrl(buildLocalizedPath(input.locale, input.route));
  const nodes: JsonLdNode[] = [
    ...coreGraph(input.locale),
    webPageNode({
      locale: input.locale,
      url,
      name: input.name,
      description: input.description,
      speakable: true,
    }),
    breadcrumbNode(input.locale, input.breadcrumbs),
  ];

  const faq = faqNode(url, input.faqs ?? []);
  if (faq) nodes.push(faq);

  if (input.howToSteps?.length) {
    nodes.push(
      howToNode({
        locale: input.locale,
        url,
        name: input.name,
        description: input.description,
        steps: input.howToSteps,
      }),
    );
  }

  for (const offer of input.offers ?? []) {
    nodes.push(
      offerNode({
        locale: input.locale,
        url,
        ...offer,
      }),
    );
  }

  const itemList = itemListNode({
    pageUrl: url,
    name: input.itemListName ?? input.name,
    items: input.itemList ?? [],
  });
  if (itemList) nodes.push(itemList);

  return buildGraph(nodes);
}

export function servicePageGraph(input: {
  locale: SiteLocale;
  name: string;
  description: string;
  serviceType: string;
  route: SeoRoute;
  breadcrumbs: BreadcrumbItem[];
  faqs?: Array<{ question: string; answer: string }>;
}) {
  const url = absoluteUrl(buildLocalizedPath(input.locale, input.route));
  const nodes: JsonLdNode[] = [
    ...coreGraph(input.locale),
    webPageNode({
      locale: input.locale,
      url,
      name: input.name,
      description: input.description,
      type: ['WebPage', 'Service'],
      speakable: true,
    }),
    serviceNode({
      locale: input.locale,
      name: input.name,
      description: input.description,
      url,
      serviceType: input.serviceType,
    }),
    breadcrumbNode(input.locale, input.breadcrumbs),
  ];

  const faq = faqNode(url, input.faqs ?? []);
  if (faq) nodes.push(faq);

  return buildGraph(nodes);
}

export function caseStudyPageGraph(input: {
  locale: SiteLocale;
  name: string;
  description: string;
  brand: string;
  route: SeoRoute;
  breadcrumbs: BreadcrumbItem[];
  metrics?: Array<{ label: string; value: string }>;
  faqs?: Array<{ question: string; answer: string }>;
  videoUrl?: string;
  videoTitle?: string;
  videoThumbnailUrl?: string;
}) {
  const url = absoluteUrl(buildLocalizedPath(input.locale, input.route));
  const nodes: JsonLdNode[] = [
    ...coreGraph(input.locale),
    caseStudyNode({
      locale: input.locale,
      headline: input.name,
      description: input.description,
      url,
      brand: input.brand,
      metrics: input.metrics,
    }),
    breadcrumbNode(input.locale, input.breadcrumbs),
  ];

  const video = videoObjectNode({
    pageUrl: url,
    name: input.videoTitle ?? input.name,
    description: input.description,
    contentUrl: input.videoUrl ?? '',
    thumbnailUrl: input.videoThumbnailUrl,
  });
  if (video) nodes.push(video);

  const faq = faqNode(url, input.faqs ?? []);
  if (faq) nodes.push(faq);

  return buildGraph(nodes);
}

export function articlePageGraph(input: {
  locale: SiteLocale;
  name: string;
  description: string;
  route: SeoRoute;
  breadcrumbs: BreadcrumbItem[];
  datePublished?: string;
  dateModified?: string;
  keywords?: string[];
  faqs?: Array<{ question: string; answer: string }>;
}) {
  const url = absoluteUrl(buildLocalizedPath(input.locale, input.route));
  const nodes: JsonLdNode[] = [
    ...coreGraph(input.locale),
    articleNode({
      locale: input.locale,
      headline: input.name,
      description: input.description,
      url,
      datePublished: input.datePublished,
      dateModified: input.dateModified,
      keywords: input.keywords,
    }),
    breadcrumbNode(input.locale, input.breadcrumbs),
  ];

  const faq = faqNode(url, input.faqs ?? []);
  if (faq) nodes.push(faq);

  return buildGraph(nodes);
}
