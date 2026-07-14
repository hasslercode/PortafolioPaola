import { getAllPosts } from '@/content/loaders';
import { siteConfig, type SiteLocale } from '@/config/site';
import { absoluteUrl, buildLocalizedPath } from '@/lib/seo/paths';

type RouteContext = {
  params: Promise<{ locale: string }>;
};

function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

export async function GET(_request: Request, context: RouteContext) {
  const { locale: raw } = await context.params;
  const locale = (raw === 'en' ? 'en' : 'es') as SiteLocale;
  const posts = await getAllPosts(locale);

  const channelTitle =
    locale === 'es'
      ? 'Paola Hoyos — Blog de estrategia digital'
      : 'Paola Hoyos — Digital strategy blog';
  const channelDesc =
    locale === 'es'
      ? 'Guías comerciales: tarifas, contratación, ROI y storytelling para marcas en Colombia.'
      : 'Commercial guides: pricing, hiring, ROI and storytelling for brands in Colombia.';

  const items = posts.map((post) => {
    const path = buildLocalizedPath(locale, {
      type: 'blogPost',
      slug: post.canonicalSlug,
    });
    const link = absoluteUrl(path);
    return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <description>${escapeXml(post.shortAnswer)}</description>
      <category>${escapeXml(post.intent)}</category>
    </item>`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(channelTitle)}</title>
    <link>${absoluteUrl(buildLocalizedPath(locale, { type: 'hub', hub: 'blog' }))}</link>
    <description>${escapeXml(channelDesc)}</description>
    <language>${locale === 'es' ? 'es-co' : 'en'}</language>
    <managingEditor>${siteConfig.contact.email} (${siteConfig.name})</managingEditor>
    <webMaster>${siteConfig.contact.email} (${siteConfig.name})</webMaster>
    <atom:link href="${absoluteUrl(`/${locale}/feed.xml`)}" rel="self" type="application/rss+xml" />
    ${items.join('\n')}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
