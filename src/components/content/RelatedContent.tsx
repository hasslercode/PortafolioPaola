'use client';

type RelatedItem = { href: string; title: string };

/** HU-IA-010 — related cluster links for MDX pages */
export function RelatedContent({
  items,
  title = 'Sigue explorando',
}: {
  items: RelatedItem[];
  title?: string;
}) {
  const valid = items.filter((item) => item.href && item.title);
  if (!valid.length) return null;

  return (
    <nav aria-label={title} className="related-content">
      <h2 className="related-content__title">{title}</h2>
      <ul className="related-content__list">
        {valid.map((item) => (
          <li key={item.href}>
            <a href={item.href}>{item.title}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
