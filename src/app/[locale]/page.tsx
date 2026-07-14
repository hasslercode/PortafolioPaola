import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { buildPageMetadata } from '@/lib/seo/metadata';
import type { SiteLocale } from '@/config/site';
import { routing, type AppLocale } from '@/i18n/routing';
import { HomeContentProvider } from '@/features/home/HomeContentProvider';
import HomeExperience from '@/features/home/HomeExperience';
import { homeGraph } from '@/lib/seo/graphs';
import { JsonLdScript } from '@/components/seo/JsonLdScript';
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
    keywords: [
      'estratega digital colombia',
      'community manager colombia',
      'storytelling',
      'crecimiento orgánico',
      'paola hoyos',
    ],
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

  return (
    <>
      <JsonLdScript graph={homeGraph(locale as SiteLocale, reviews)} />
      <HomeContentProvider locale={locale as AppLocale} content={content}>
        <HomeExperience />
      </HomeContentProvider>
    </>
  );
}
