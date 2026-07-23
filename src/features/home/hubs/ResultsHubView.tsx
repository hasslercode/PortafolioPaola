'use client';

import FeaturedBrands from '@/features/home/sections/FeaturedBrands';
import ResultsProof from '@/features/home/sections/ResultsProof';
import { useContentActions } from '@/features/home/PageChrome';
import { useI18n } from '@/features/home/HomeContentProvider';

type ResultsHubViewProps = {
  lastUpdated: string;
  lastUpdatedLabel: string;
};

/**
 * Consolidated proof page — +1.3M metric, brand list with case links, featured reels.
 */
export function ResultsHubView({ lastUpdated, lastUpdatedLabel }: ResultsHubViewProps) {
  const { openContact } = useContentActions();
  const { locale } = useI18n();
  const isEn = locale === 'en';

  return (
    <>
      <FeaturedBrands hubMode />
      <ResultsProof onOpenContact={(source: string) => openContact(source)} />
      <p className="container results-hub-updated">
        <time dateTime={lastUpdated}>
          {lastUpdatedLabel}:{' '}
          {new Intl.DateTimeFormat(isEn ? 'en-US' : 'es-CO', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }).format(new Date(lastUpdated))}
        </time>
      </p>
    </>
  );
}
