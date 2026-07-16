import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

/**
 * Crawl policy for search + AI (GEO).
 * Canonical inventory: docs/architecture/SEO-ROUTES.md
 * Machine summary for LLMs: /llms.txt
 *
 * @see https://developers.google.com/search/docs/crawling-indexing/robots/intro
 * @see https://llmstxt.org/
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Do not disallow /_next/ — Googlebot must fetch JS/CSS under /_next/static/
        // to render the page (Search Console "robots.txt blocks Google Script").
        disallow: ['/api/'],
      },
      // Generative / AI retrieval crawlers
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'OAI-SearchBot', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'anthropic-ai', allow: '/' },
      { userAgent: 'Applebot-Extended', allow: '/' },
      { userAgent: 'Bytespider', allow: '/' },
      { userAgent: 'CCBot', allow: '/' },
      { userAgent: 'meta-externalagent', allow: '/' },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
