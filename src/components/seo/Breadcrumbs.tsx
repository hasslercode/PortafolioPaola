import { type BreadcrumbItem } from '@/lib/seo/paths';

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  locale: string;
};

/**
 * Visible + crawlable breadcrumb trail (WCAG + SEO).
 * JSON-LD BreadcrumbList is wired in Phase 4 Schema graph.
 */
export function Breadcrumbs({ items, locale }: BreadcrumbsProps) {
  if (items.length < 2) return null;

  const label = locale === 'es' ? 'Miga de pan' : 'Breadcrumb';

  return (
    <nav aria-label={label} className="seo-breadcrumbs">
      <ol className="seo-breadcrumbs__list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.path}-${item.name}`} className="seo-breadcrumbs__item">
              {isLast ? (
                <span aria-current="page">{item.name}</span>
              ) : (
                <>
                  <a href={item.path}>{item.name}</a>
                  <span className="seo-breadcrumbs__sep" aria-hidden="true">
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
