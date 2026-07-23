import type { Metadata } from 'next';
import { preload } from 'react-dom';
import { setRequestLocale } from 'next-intl/server';
import { buildPageMetadata } from '@/lib/seo/metadata';
import type { SiteLocale } from '@/config/site';
import { PRIMARY_KEYWORDS_ES } from '@/config/seo-strategy';
import { routing, type AppLocale } from '@/i18n/routing';
import { HomeContentProvider } from '@/features/home/HomeContentProvider';
import HomeExperience from '@/features/home/HomeExperience';
import { homeGraph } from '@/lib/seo/graphs';
import { JsonLdScript } from '@/components/seo/JsonLdScript';
import { getAllPosts } from '@/content/loaders';
import homeEs from '../../../content/home/es.json';
import homeEn from '../../../content/home/en.json';

const homeContent = {
  es: homeEs,
  en: homeEn,
} as const;

type PageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const content = homeContent[locale as SiteLocale] ?? homeContent.es;

  return buildPageMetadata({
    locale: locale as SiteLocale,
    title: content.meta.title,
    description: content.meta.description,
    route: { type: 'hub', hub: 'home' },
    absoluteTitle: true,
    keywords: [...PRIMARY_KEYWORDS_ES, 'paola hoyos'],
  });
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const content = homeContent[locale as SiteLocale] ?? homeContent.es;
  const reviews = content.testimonials.items.map((item) => ({
    reviewBody: item.quote,
    authorName: item.name,
    result: `${content.testimonials.resultLabel} ${item.result}`,
  }));
  const posts = await getAllPosts(locale);
  const blogTeasers = posts.slice(0, 3).map((post) => ({
    slug: post.slug[locale as SiteLocale] ?? post.slug.es,
    title: post.title,
    description: post.seo.description,
  }));

  // Discover LCP image from the document as early as possible (no /_next/image hop).
  preload('/assets/fotopaola-720.webp', {
    as: 'image',
    imageSrcSet: '/assets/fotopaola-480.webp 480w, /assets/fotopaola-720.webp 720w',
    imageSizes: '(max-width: 768px) 85vw, 360px',
    fetchPriority: 'high',
  });

  return (
    <>
      <JsonLdScript graph={homeGraph(locale as SiteLocale, reviews)} />
      <HomeContentProvider locale={locale as AppLocale} content={content}>
        <HomeExperience blogTeasers={blogTeasers} />
      </HomeContentProvider>
    </>
  );
}
