'use client';

import type { ReactNode } from 'react';
import { HomeArtArticle, HomeArtArticleCta } from '@/features/home/hubs/HomeArtArticle';
import { useContentActions } from '@/features/home/PageChrome';

type Props = {
  badge: string;
  title: ReactNode;
  subtitle?: ReactNode;
  ctaLabel: string;
  children: ReactNode;
};

export function DetailWithHomeArt({
  badge,
  title,
  subtitle,
  ctaLabel,
  children,
}: Props) {
  const { openContact } = useContentActions();

  return (
    <HomeArtArticle badge={badge} title={title} subtitle={subtitle}>
      {children}
      <HomeArtArticleCta label={ctaLabel} onClick={() => openContact('detail_cta')} />
    </HomeArtArticle>
  );
}
