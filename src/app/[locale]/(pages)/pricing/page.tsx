import { setRequestLocale } from 'next-intl/server';
import { permanentRedirect, routing } from '@/i18n/routing';

type PageProps = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/** 308 → Servicios (Inversión fused). */
export default async function PricingPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  permanentRedirect({ href: '/services', locale });
}
