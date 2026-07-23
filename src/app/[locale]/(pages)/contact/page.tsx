import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { siteConfig, type SiteLocale } from '@/config/site';
import { routing } from '@/i18n/routing';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { buildBreadcrumbs } from '@/lib/seo/paths';
import { hubGraph } from '@/lib/seo/graphs';
import { JsonLdScript } from '@/components/seo/JsonLdScript';
import { ContactHubView } from '@/features/home/hubs/ContactHubView';

type PageProps = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Contact' });
  return buildPageMetadata({
    locale: locale as SiteLocale,
    title: t('metaTitle'),
    description: t('metaDescription'),
    route: { type: 'hub', hub: 'contact' },
    keywords: ['contacto paola hoyos', 'consulta estratégica', 'correo'],
  });
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'Contact' });
  const crumbs = buildBreadcrumbs(locale as SiteLocale, [
    { name: t('title'), route: { type: 'hub', hub: 'contact' } },
  ]);
  const graph = hubGraph({
    locale: locale as SiteLocale,
    route: { type: 'hub', hub: 'contact' },
    name: t('title'),
    description: t('metaDescription'),
    breadcrumbs: crumbs,
  });

  return (
    <>
      <JsonLdScript graph={graph} />
      <div className="container contacto-hub-crumbs">
        <Breadcrumbs items={crumbs} locale={locale} />
      </div>
      <ContactHubView />
      {/* crawlable channels (also in Contact section visually) */}
      <div className="sr-only">
        <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
        <a href={siteConfig.social.instagram}>Instagram</a>
        {siteConfig.contact.whatsapp ? (
          <a
            href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/\D/g, '')}`}
          >
            WhatsApp
          </a>
        ) : null}
      </div>
    </>
  );
}
