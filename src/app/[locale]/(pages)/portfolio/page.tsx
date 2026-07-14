import { setRequestLocale } from 'next-intl/server';
import { permanentRedirect, routing } from '@/i18n/routing';

type PageProps = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/** 308 → Experiencias (Portafolio fused). */
export default async function PortfolioPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  permanentRedirect({ href: '/experiences', locale });
}
