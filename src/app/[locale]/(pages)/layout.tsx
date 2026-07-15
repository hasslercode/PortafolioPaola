import type { ReactNode } from 'react';
import { HomeContentProvider } from '@/features/home/HomeContentProvider';
import { PageChrome } from '@/features/home/PageChrome';
import type { AppLocale } from '@/i18n/routing';
import type { SiteLocale } from '@/config/site';
import homeEs from '../../../../content/home/es.json';
import homeEn from '../../../../content/home/en.json';
import '@/styles/seo.css';

const homeContent = {
  es: homeEs,
  en: homeEn,
} as const;

type PagesLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

/**
 * Content routes share the home scrapbook Header/Footer + art direction tokens.
 */
export default async function PagesLayout({ children, params }: PagesLayoutProps) {
  const { locale } = await params;
  const typed = (locale === 'en' ? 'en' : 'es') as AppLocale;
  const content = homeContent[typed as SiteLocale] ?? homeContent.es;

  return (
    <HomeContentProvider locale={typed} content={content}>
      <PageChrome>{children}</PageChrome>
    </HomeContentProvider>
  );
}
