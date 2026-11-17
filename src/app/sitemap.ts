/**
 * Sitemap with real content dates (HU-TECH-010).
 * Blog posts use updatedAt/publishedAt. Hubs, services and case studies use
 * the last git commit that touched their source.
 */

import type { MetadataRoute } from 'next';
import { siteConfig, type SiteLocale } from '@/config/site';
import {
  serviceSlugs,
  caseStudySlugs,
  blogSlugs,
} from '@/content/registry';
import { getBlogBySlug } from '@/content/loaders';
import {
  absoluteUrl,
  buildAlternateLanguages,
  buildLocalizedPath,
  type SeoRoute,
} from '@/lib/seo/paths';
import { lastModifiedFor } from '@/lib/seo/lastmod';

/** Stable fallback when a collection has no per-doc dates */
const CONTENT_EPOCH = new Date('2026-03-01T00:00:00.000Z');

const HUB_SOURCES: Record<string, string[]> = {
  home: ['content/home', 'src/app/[locale]/page.tsx'],
  caseStudies: [
    'src/app/[locale]/(pages)/experiences/page.tsx',
    'content/case-studies',
  ],
  results: ['src/app/[locale]/(pages)/results/page.tsx'],
  services: ['src/app/[locale]/(pages)/services/page.tsx', 'content/services'],
  pricing: ['src/app/[locale]/(pages)/pricing/page.tsx'],
  blog: ['src/app/[locale]/(pages)/blog/page.tsx', 'content/blog/es'],
  cities: ['src/app/[locale]/(pages)/cities/page.tsx'],
  about: ['src/app/[locale]/(pages)/about/page.tsx'],
  contact: ['src/app/[locale]/(pages)/contact/page.tsx'],
  process: ['src/app/[locale]/(pages)/process/page.tsx'],
  faq: ['src/app/[locale]/(pages)/faq/page.tsx'],
  privacy: ['src/app/[locale]/(pages)/privacy/page.tsx'],
  terms: ['src/app/[locale]/(pages)/terms/page.tsx'],
  legal: ['src/app/[locale]/(pages)/legal/page.tsx'],
};

function entry(
  locale: SiteLocale,
  route: SeoRoute,
  priority: number,
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'],
  lastModified: Date = CONTENT_EPOCH,
  hreflangLocales?: SiteLocale[],
): MetadataRoute.Sitemap[number] {
  return {
    url: absoluteUrl(buildLocalizedPath(locale, route)),
    lastModified,
    changeFrequency,
    priority,
    alternates: {
      languages: buildAlternateLanguages(route, hreflangLocales),
    },
  };
}

function parseContentDate(value?: string): Date {
  if (!value) return CONTENT_EPOCH;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? CONTENT_EPOCH : parsed;
}

/**
 * @see docs/seo/BACKLOG-HU-TDD.md HU-TECH-010
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  const hubRoutes: Array<{
    hub: SeoRoute;
    priority: number;
    freq: MetadataRoute.Sitemap[number]['changeFrequency'];
  }> = [
    { hub: { type: 'hub', hub: 'home' }, priority: 1, freq: 'weekly' },
    { hub: { type: 'hub', hub: 'caseStudies' }, priority: 0.95, freq: 'monthly' },
    { hub: { type: 'hub', hub: 'results' }, priority: 0.9, freq: 'monthly' },
    { hub: { type: 'hub', hub: 'services' }, priority: 0.95, freq: 'monthly' },
    { hub: { type: 'hub', hub: 'pricing' }, priority: 0.9, freq: 'monthly' },
    { hub: { type: 'hub', hub: 'blog' }, priority: 0.85, freq: 'weekly' },
    { hub: { type: 'hub', hub: 'cities' }, priority: 0.8, freq: 'monthly' },
    { hub: { type: 'hub', hub: 'about' }, priority: 0.8, freq: 'monthly' },
    { hub: { type: 'hub', hub: 'contact' }, priority: 0.8, freq: 'monthly' },
    { hub: { type: 'hub', hub: 'process' }, priority: 0.75, freq: 'monthly' },
    { hub: { type: 'hub', hub: 'faq' }, priority: 0.75, freq: 'monthly' },
    { hub: { type: 'hub', hub: 'privacy' }, priority: 0.35, freq: 'yearly' },
    { hub: { type: 'hub', hub: 'terms' }, priority: 0.35, freq: 'yearly' },
    { hub: { type: 'hub', hub: 'legal' }, priority: 0.35, freq: 'yearly' },
  ];

  for (const locale of siteConfig.locales) {
    for (const item of hubRoutes) {
      const hubName = item.hub.type === 'hub' ? item.hub.hub : 'home';
      entries.push(
        entry(
          locale,
          item.hub,
          item.priority,
          item.freq,
          lastModifiedFor(HUB_SOURCES[hubName] ?? []),
        ),
      );
    }

    for (const slug of serviceSlugs) {
      entries.push(
        entry(
          locale,
          { type: 'service', slug },
          0.9,
          'monthly',
          lastModifiedFor([
            `content/services/es/${slug}.mdx`,
            `content/services/en/${slug}.mdx`,
          ]),
        ),
      );
    }

    for (const slug of caseStudySlugs) {
      entries.push(
        entry(
          locale,
          { type: 'caseStudy', slug },
          0.85,
          'monthly',
          lastModifiedFor([
            `content/case-studies/es/${slug}.mdx`,
            `content/case-studies/en/${slug}.mdx`,
          ]),
        ),
      );
    }

    for (const slug of blogSlugs) {
      // HU-EN-001: EN blog is noindex until bodies are translated.
      // Keep those URLs out of the sitemap and out of ES hreflang.
      if (locale === 'en') continue;
      const post = await getBlogBySlug(slug, locale);
      if (post?.seo?.noIndex) continue;
      const lastModified = parseContentDate(
        post?.updatedAt ?? post?.publishedAt,
      );
      entries.push(
        entry(
          locale,
          { type: 'blogPost', slug },
          0.75,
          'monthly',
          lastModified,
          ['es'],
        ),
      );
    }
  }

  return entries;
}
