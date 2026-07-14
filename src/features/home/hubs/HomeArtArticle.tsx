'use client';

import type { ReactNode } from 'react';
import { useI18n } from '@/features/home/HomeContentProvider';

type HomeArtArticleProps = {
  badge: string;
  title: ReactNode;
  subtitle?: ReactNode;
  children: ReactNode;
};

/**
 * Detail-page frame aligned with scrapbook hubs (compact, left-aligned).
 */
export function HomeArtArticle({
  badge,
  title,
  subtitle,
  children,
}: HomeArtArticleProps) {
  return (
    <article className="case-detail">
      <div className="container">
        <header className="case-detail__header">
          <span className="case-detail__badge">{badge}</span>
          <h1 className="case-detail__title">{title}</h1>
          {subtitle ? <p className="case-detail__subtitle">{subtitle}</p> : null}
        </header>
        <div className="case-detail__body">{children}</div>
      </div>
    </article>
  );
}

export function HomeArtArticleCta({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  const { content } = useI18n();
  return (
    <div className="case-detail__cta">
      <button type="button" className="btn-pill btn-wow-action" onClick={onClick}>
        <span>{label || content.header.cta}</span>
        <span className="btn-wow-action__sparkle" aria-hidden="true">
          ✦
        </span>
      </button>
    </div>
  );
}
