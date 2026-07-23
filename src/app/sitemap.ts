import type { MetadataRoute } from 'next';
import { siteConfig, type SiteLocale } from '@/config/site';
import {
  serviceSlugs,
  caseStudySlugs,
  blogSlugs,
} from '@/content/registry';
import {
  absoluteUrl,
  buildAlternateLanguages,
  buildLocalizedPath,
  type SeoRoute,
} from '@/lib/seo/paths';

function entry(
  locale: SiteLocale,
  route: SeoRoute,
  priority: number,
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'],
): MetadataRoute.Sitemap[number] {
  return {
    url: absoluteUrl(buildLocalizedPath(locale, route)),
    lastModified: new Date(),
    changeFrequency,
    priority,
    alternates: {
      languages: buildAlternateLanguages(route),
    },
  };
}

/**
 * Sitemap aligned to consolidated IA (visible menu includes blog/recursos).
 * Does NOT list redirect shells (/tarifas, /portafolio) — only canonical hubs.
 *
 * Visible: home, experiences, services, blog, about, contact
 * Details: services/[slug], experiences/[slug], blog/[slug]
 *
 * @see docs/architecture/SITE-IA.md
 * @see docs/architecture/SEO-ROUTES.md
 * @see docs/seo/ROADMAP-TOP10-COLOMBIA.md
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  const hubRoutes: Array<{
    hub: SeoRoute;
    priority: number;
    freq: MetadataRoute.Sitemap[number]['changeFrequency'];
  }> = [
    { hub: { type: 'hub', hub: 'home' }, priority: 1, freq: 'weekly' },
    { hub: { type: 'hub', hub: 'caseStudies' }, priority: 0.95, freq: 'monthly' },
    { hub: { type: 'hub', hub: 'services' }, priority: 0.95, freq: 'monthly' },
    { hub: { type: 'hub', hub: 'blog' }, priority: 0.85, freq: 'weekly' },
    { hub: { type: 'hub', hub: 'about' }, priority: 0.8, freq: 'monthly' },
    { hub: { type: 'hub', hub: 'contact' }, priority: 0.8, freq: 'monthly' },
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
      entries.push(
        entry(locale, { type: 'blogPost', slug }, 0.75, 'monthly'),
      );
    }
  }

  return entries;
}
