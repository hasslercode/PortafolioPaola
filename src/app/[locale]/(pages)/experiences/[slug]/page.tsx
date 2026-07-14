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
import { MarkdownBody, extractToc } from '@/components/content/MarkdownBody';
import { FaqSection } from '@/components/content/FaqSection';
import { GeoAnswer } from '@/components/content/GeoAnswer';
import { TableOfContents } from '@/components/content/TableOfContents';
import { AuthorByline } from '@/components/content/AuthorByline';
import { KeyFacts } from '@/components/content/KeyFacts';
import { DetailWithHomeArt } from '@/features/home/hubs/DetailWithHomeArt';
import { caseStudyPageGraph } from '@/lib/seo/graphs';
import { JsonLdScript } from '@/components/seo/JsonLdScript';

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

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
      name: study.title,
      route: { type: 'caseStudy', slug: canonical },
    },
  ]);
  const toc = extractToc(study.body);

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

  return (
    <>
      <JsonLdScript graph={graph} />
      <div className="container" style={{ paddingTop: '1rem' }}>
        <Breadcrumbs items={crumbs} locale={locale} />
      </div>
      <DetailWithHomeArt
        badge={t('badge')}
        title={study.title}
        subtitle={study.brand}
        ctaLabel={t('cta')}
      >
        <GeoAnswer label={t('shortAnswer')}>
          <p className="text-lg">{study.shortAnswer}</p>
        </GeoAnswer>
        <KeyFacts title={t('metrics')} facts={study.metrics} />
        <div className="page-prose">
          <section>
            <h2>{t('problem')}</h2>
            <p>{study.problem}</p>
          </section>
          <section>
            <h2>{t('context')}</h2>
            <p>{study.context}</p>
          </section>
          <section>
            <h2>{t('objective')}</h2>
            <p>{study.objective}</p>
          </section>
          <section>
            <h2>{t('process')}</h2>
            <ol>
              {study.process.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </section>
          <section>
            <h2>{t('results')}</h2>
            <ul>
              {study.results.map((result) => (
                <li key={result}>{result}</li>
              ))}
            </ul>
          </section>
        </div>
        <TableOfContents
          title={typedLocale === 'es' ? 'En este caso' : 'In this case'}
          items={toc}
        />
        <div className="page-prose">
          <MarkdownBody content={study.body} />
        </div>
        <FaqSection
          title={typedLocale === 'es' ? 'Preguntas frecuentes' : 'FAQ'}
          items={study.faq}
        />
        <AuthorByline locale={typedLocale} />
      </DetailWithHomeArt>
    </>
  );
}
