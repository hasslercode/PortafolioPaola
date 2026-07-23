import type { Metadata } from 'next';
import { siteConfig, type SiteLocale } from '@/config/site';
import {
  absoluteUrl,
  buildAlternateLanguages,
  buildLocalizedPath,
  type SeoRoute,
} from '@/lib/seo/paths';

type BuildMetadataInput = {
  locale: SiteLocale;
  title: string;
  description: string;
  route: SeoRoute;
  keywords?: string[];
  noIndex?: boolean;
  ogImage?: string;
  ogType?: 'website' | 'article';
  absoluteTitle?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
};

/**
 * Metadata API helper for App Router SSG.
 * Emits canonical + hreflang with correct localized pathnames (not a locale swap).
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata
 * @see https://developers.google.com/search/docs/specialty/international/localized-versions
 */
export function buildPageMetadata({
  locale,
  title,
  description,
  route,
  keywords = [],
  noIndex = false,
  ogImage = '/assets/og-paola.jpg',
  ogType = 'website',
  absoluteTitle = false,
  publishedTime,
  modifiedTime,
}: BuildMetadataInput): Metadata {
  const path = buildLocalizedPath(locale, route);
  const url = absoluteUrl(path);
  const absoluteOg = ogImage.startsWith('http')
    ? ogImage
    : absoluteUrl(ogImage);
  const languages = buildAlternateLanguages(route);
  const ogTypeMime = absoluteOg.endsWith('.png')
    ? 'image/png'
    : absoluteOg.endsWith('.webp')
      ? 'image/webp'
      : 'image/jpeg';
  const aboutPath = absoluteUrl(
    buildLocalizedPath(locale, { type: 'hub', hub: 'about' }),
  );

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords: keywords.length ? keywords : undefined,
    authors: [{ name: siteConfig.name, url: aboutPath }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    category: 'Digital Marketing',
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
      languages,
      types: {
        'application/rss+xml': absoluteUrl(`/${locale}/feed.xml`),
      },
    },
    openGraph: {
      type: ogType,
      locale: locale === 'es' ? 'es_CO' : 'en_US',
      alternateLocale: locale === 'es' ? ['en_US'] : ['es_CO'],
      url,
      title,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: absoluteOg,
          width: 1200,
          height: 630,
          alt: title,
          type: ogTypeMime,
        },
      ],
      ...(ogType === 'article'
        ? {
            publishedTime,
            modifiedTime: modifiedTime ?? publishedTime,
            authors: [siteConfig.name],
          }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [absoluteOg],
      creator: '@paolaahoyosc',
      site: '@paolaahoyosc',
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
          },
        },
    verification: {
      google: process.env.NEXT_PUBLIC_GSC_VERIFICATION || undefined,
    },
    other: {
      'geo.region': 'CO',
      'geo.placename': siteConfig.geo.addressLocality,
    },
  };
}
