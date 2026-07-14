import { notFound } from 'next/navigation';
import {
  getAllCaseStudySlugs,
  getCaseStudyBySlug,
} from '@/content/loaders';
import {
  caseStudySlugLocales,
  type CaseStudySlug,
} from '@/content/registry';

export async function getAllLocalizedCaseStudyParams() {
  const locales = ['es', 'en'] as const;
  const params: { locale: string; slug: string }[] = [];
  const slugs = await getAllCaseStudySlugs();

  for (const locale of locales) {
    for (const slug of slugs) {
      params.push({
        locale,
        slug: caseStudySlugLocales[slug as CaseStudySlug][locale],
      });
    }
  }

  return params;
}

export async function resolveCaseStudyOrNotFound(slug: string, locale: string) {
  const canonical = Object.entries(caseStudySlugLocales).find(
    ([, locales]) => locales.es === slug || locales.en === slug,
  )?.[0];

  if (!canonical) notFound();
  const study = await getCaseStudyBySlug(canonical, locale);
  if (!study) notFound();
  return study;
}
