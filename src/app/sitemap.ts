/**
 * Sitemap with real content dates (HU-TECH-010).
 * Blog posts use updatedAt/publishedAt; hubs/services fall back to content epoch.
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

/** Stable fallback when a collection has no per-doc dates */
const CONTENT_EPOCH = new Date('2026-03-01T00:00:00.000Z');

function entry(
  locale: SiteLocale,
  route: SeoRoute,
  priority: number,
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'],
  lastModified: Date = CONTENT_EPOCH,
): MetadataRoute.Sitemap[number] {
  return {
    url: absoluteUrl(buildLocalizedPath(locale, route)),
    lastModified,
    changeFrequency,
    priority,
    alternates: {
      languages: buildAlternateLanguages(route),
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
      entries.push(entry(locale, item.hub, item.priority, item.freq));
    }

    for (const slug of serviceSlugs) {
      entries.push(
        entry(locale, { type: 'service', slug }, 0.9, 'monthly'),
      );
    }

    for (const slug of caseStudySlugs) {
      entries.push(
        entry(locale, { type: 'caseStudy', slug }, 0.85, 'monthly'),
      );
    }

    for (const slug of blogSlugs) {
      const post = await getBlogBySlug(slug, locale);
      const lastModified = parseContentDate(
        post?.updatedAt ?? post?.publishedAt,
      );
      entries.push(
        entry(locale, { type: 'blogPost', slug }, 0.75, 'monthly', lastModified),
      );
    }
  }

  return entries;
}
