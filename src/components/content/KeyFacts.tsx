type KeyFact = { label: string; value: string };

type KeyFactsProps = {
  title: string;
  facts: KeyFact[];
};

/** Verifiable facts table/list for GEO citation. */
export function KeyFacts({ title, facts }: KeyFactsProps) {
  if (!facts.length) return null;

  return (
    <section className="geo-key-facts" aria-labelledby="key-facts-heading">
      <h2 id="key-facts-heading" className="geo-key-facts__title">
        {title}
      </h2>
      <dl className="geo-key-facts__list">
        {facts.map((fact) => (
          <div key={fact.label} className="geo-key-facts__row">
            <dt>{fact.label}</dt>
            <dd>
              <strong>{fact.value}</strong>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
