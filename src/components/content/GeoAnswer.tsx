type GeoAnswerProps = {
  label: string;
  children: React.ReactNode;
  id?: string;
};

/** Answer-first block for GEO / AI Overviews extraction. */
export function GeoAnswer({ label, children, id = 'geo-answer' }: GeoAnswerProps) {
  return (
    <section className="geo-answer" id={id} aria-labelledby={`${id}-label`}>
      <span className="geo-answer__label" id={`${id}-label`}>
        {label}
      </span>
      <div className="geo-answer__body">{children}</div>
    </section>
  );
}
