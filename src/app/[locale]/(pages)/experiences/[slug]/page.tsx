import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { buildPageMetadata } from '@/lib/seo/metadata';
import type { SiteLocale } from '@/config/site';
import {
  getAllLocalizedCaseStudyParams,
  resolveCaseStudyOrNotFound,
} from '@/features/case-studies/routing';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import {
  buildBreadcrumbs,
  resolveCanonicalCaseSlug,
} from '@/lib/seo/paths';
import type { CaseStudySlug } from '@/content/registry';
import { AuthorByline } from '@/components/content/AuthorByline';
import { CaseStudyBoard } from '@/features/home/hubs/CaseStudyBoard';
import { caseStudyPageGraph } from '@/lib/seo/graphs';
import { JsonLdScript } from '@/components/seo/JsonLdScript';
import type { StaticImageData } from 'next/image';
import imgCoca from '@/assets/campaigns/coca-cola-thumb.webp';
import imgHm from '@/assets/campaigns/hm-store-thumb.webp';
import imgCine from '@/assets/campaigns/cine-colombia-thumb.webp';
import imgStarbucks from '@/assets/campaigns/starbucks-cup-thumb.webp';
import imgTotto from '@/assets/campaigns/totto-backpack-thumb.webp';

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

const CASE_VISUALS: Partial<Record<CaseStudySlug, StaticImageData[]>> = {
  'parque-alegra': [imgCoca, imgHm, imgCine],
  'coca-cola': [imgCoca, imgStarbucks, imgTotto],
  hm: [imgHm, imgCoca, imgCine],
  'cine-colombia': [imgCine, imgHm, imgStarbucks],
  starbucks: [imgStarbucks, imgCoca, imgTotto],
  totto: [imgTotto, imgHm, imgCoca],
};

const DEFAULT_VISUALS = [imgCoca, imgHm, imgCine];

export async function generateStaticParams() {
  return getAllLocalizedCaseStudyParams();
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const study = await resolveCaseStudyOrNotFound(slug, locale);
  const canonical = resolveCanonicalCaseSlug(slug) as CaseStudySlug;

  return buildPageMetadata({
    locale: locale as SiteLocale,
    title: study.seo?.title ?? study.title,
    description: study.seo?.description ?? study.shortAnswer,
    route: { type: 'caseStudy', slug: canonical },
    ogType: 'article',
    keywords: study.seo?.keywords ?? [],
    absoluteTitle: true,
  });
}

export default async function CaseStudyDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const study = await resolveCaseStudyOrNotFound(slug, locale);
  const t = await getTranslations({ locale, namespace: 'CaseStudies' });
  const typedLocale = locale as SiteLocale;
  const canonical = resolveCanonicalCaseSlug(slug) as CaseStudySlug;
  const crumbs = buildBreadcrumbs(typedLocale, [
    { name: t('badge'), route: { type: 'hub', hub: 'caseStudies' } },
    {
      name: study.brand,
      route: { type: 'caseStudy', slug: canonical },
    },
  ]);

  const graph = caseStudyPageGraph({
    locale: typedLocale,
    name: study.title,
    description: study.shortAnswer,
    brand: study.brand,
    route: { type: 'caseStudy', slug: canonical },
    breadcrumbs: crumbs,
    metrics: study.metrics,
    faqs: study.faq,
  });

  const visuals = CASE_VISUALS[canonical] ?? DEFAULT_VISUALS;

  return (
    <>
      <JsonLdScript graph={graph} />
      <div className="container case-board__crumbs">
        <Breadcrumbs items={crumbs} locale={locale} />
      </div>
      <CaseStudyBoard
        badge={t('badge')}
        brand={study.brand}
        summaryTitle={study.title}
        shortAnswer={study.shortAnswer}
        shortAnswerLabel={t('shortAnswer')}
        metricsTitle={t('metrics')}
        metrics={study.metrics}
        story={[
          { title: t('problem'), body: study.problem },
          { title: t('context'), body: study.context },
          { title: t('objective'), body: study.objective },
        ]}
        processTitle={t('process')}
        process={study.process}
        resultsTitle={t('results')}
        results={study.results}
        faqTitle={typedLocale === 'es' ? 'Preguntas frecuentes' : 'FAQ'}
        faqs={study.faq}
        ctaLabel={t('cta')}
        visuals={visuals}
        author={<AuthorByline locale={typedLocale} />}
      />
    </>
  );
}
