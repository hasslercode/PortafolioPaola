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
 * Detail-page frame using the home “wow” section header language.
 */
export function HomeArtArticle({
  badge,
  title,
  subtitle,
  children,
}: HomeArtArticleProps) {
  return (
    <article className="services-wow home-art-article">
      <div className="container">
        <div className="services-wow__header">
          <span className="badge-pill-wow">{badge}</span>
          <div className="section-header-wow">
            <span
              className="services-scrap services-scrap--heart scrap-heart-shape"
              aria-hidden="true"
            />
            <div className="fluid-orbit-container">
              <div className="fluid-ellipse ellipse-1" />
              <div className="fluid-ellipse ellipse-2" />
              <h1 className="wow-main-title home-art-article__title">{title}</h1>
            </div>
            {subtitle ? <div className="wow-subtitle">{subtitle}</div> : null}
          </div>
        </div>

        <div className="home-art-article__body">{children}</div>
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
    <div className="home-art-article__cta">
      <button type="button" className="btn-pill btn-wow-action" onClick={onClick}>
        <span>{label || content.header.cta}</span>
        <span className="btn-wow-action__sparkle" aria-hidden="true">
          ✦
        </span>
      </button>
    </div>
  );
}
