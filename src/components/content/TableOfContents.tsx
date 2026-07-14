export type TocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

type TableOfContentsProps = {
  items: TocItem[];
  title: string;
};

export function TableOfContents({ items, title }: TableOfContentsProps) {
  if (items.length < 2) return null;

  return (
    <nav className="geo-toc" aria-label={title}>
      <p className="geo-toc__title">{title}</p>
      <ol className="geo-toc__list">
        {items.map((item) => (
          <li
            key={item.id}
            className={item.level === 3 ? 'geo-toc__item geo-toc__item--sub' : 'geo-toc__item'}
          >
            <a href={`#${item.id}`}>{item.text}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
