type FaqItem = { question: string; answer: string };

export function FaqSection({
  title,
  items,
}: {
  title: string;
  items: FaqItem[];
}) {
  if (!items.length) return null;

  return (
    <section className="seo-faq" aria-labelledby="faq-heading">
      <h2 id="faq-heading">{title}</h2>
      <div className="seo-faq__list">
        {items.map((item) => (
          <details key={item.question} className="seo-faq__item">
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
