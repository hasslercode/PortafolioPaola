import { notFound } from 'next/navigation';
import { getAllServiceSlugs, getServiceBySlug } from '@/content/loaders';
import { serviceSlugLocales, type ServiceSlug } from '@/content/registry';

export async function generateServiceSlugParams(locale: string) {
  const slugs = await getAllServiceSlugs();
  return slugs.map((slug) => ({
    slug:
      serviceSlugLocales[slug as ServiceSlug][locale as 'es' | 'en'] ?? slug,
  }));
}

export async function resolveServiceOrNotFound(slug: string, locale: string) {
  const canonical = Object.entries(serviceSlugLocales).find(
    ([, locales]) => locales.es === slug || locales.en === slug,
  )?.[0];

  if (!canonical) notFound();
  const service = await getServiceBySlug(canonical, locale);
  if (!service) notFound();
  return service;
}

export async function getAllLocalizedServiceParams() {
  const locales = ['es', 'en'] as const;
  const params: { locale: string; slug: string }[] = [];

  for (const locale of locales) {
    const localeParams = await generateServiceSlugParams(locale);
    for (const item of localeParams) {
      params.push({ locale, slug: item.slug });
    }
  }

  return params;
}
