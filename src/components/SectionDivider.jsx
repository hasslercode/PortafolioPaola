export default function SectionDivider({ variant = 'lined' }) {
  if (variant === 'symbol') {
    return (
      <div className="section-divider section-divider--symbol" aria-hidden="true">
        <span className="section-divider__symbol">✦</span>
      </div>
    );
  }

  return (
    <div className="section-divider section-divider--lined" aria-hidden="true">
      <span className="section-divider__line" />
      <span className="section-divider__symbol">✦</span>
      <span className="section-divider__line" />
    </div>
  );
}
