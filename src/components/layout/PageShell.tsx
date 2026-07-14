import type { ComponentProps, ReactNode } from 'react';
import { Link } from '@/i18n/routing';

type PageShellProps = {
  eyebrow?: string;
  title: string;
  children: ReactNode;
  cta?: {
    href: ComponentProps<typeof Link>['href'];
    label: string;
  };
  afterTitle?: ReactNode;
};

/** Content layout matching home art direction. */
export function PageShell({
  eyebrow,
  title,
  children,
  cta,
  afterTitle,
}: PageShellProps) {
  return (
    <div className="page-shell">
      <div className="page-shell__scrap page-shell__scrap--tape" aria-hidden="true" />
      <div className="page-shell__scrap page-shell__scrap--star" aria-hidden="true">
        ✦
      </div>

      <div className="container page-shell__inner">
        {eyebrow ? <p className="page-shell__eyebrow">{eyebrow}</p> : null}
        <h1 className="page-shell__title">{title}</h1>
        {afterTitle}
        <div className="page-shell__body">{children}</div>
        {cta ? (
          <div className="page-shell__cta">
            <Link href={cta.href} className="btn-pill btn-wow-action">
              <span>{cta.label}</span>
              <span className="btn-wow-action__sparkle" aria-hidden="true">
                ✦
              </span>
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}

type PageCardProps = {
  href: ComponentProps<typeof Link>['href'];
  title: string;
  description: string;
};

export function PageCard({ href, title, description }: PageCardProps) {
  return (
    <li className="page-card">
      <Link href={href} className="page-card__link">
        <strong className="page-card__title">{title}</strong>
        <span className="page-card__desc">{description}</span>
        <span className="page-card__arrow" aria-hidden="true">
          →
        </span>
      </Link>
    </li>
  );
}
