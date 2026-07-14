import { useCursorSparkles } from '../hooks/useCursorSparkles.js';

export default function CursorSparkles() {
  const { sparkles, enabled, sparklePath } = useCursorSparkles();

  if (!enabled) {
    return null;
  }

  return (
    <div className="cursor-sparkles" aria-hidden="true">
      {sparkles.map((sparkle) => (
        <span
          key={sparkle.id}
          className={`cursor-sparkle cursor-sparkle--${sparkle.variant}`}
          style={{
            left: `${sparkle.x}px`,
            top: `${sparkle.y}px`,
            '--sparkle-rotate': `${sparkle.rotate}deg`,
            '--sparkle-drift-x': `${sparkle.driftX}px`,
            '--sparkle-drift-y': `${sparkle.driftY}px`,
          }}
        >
          <svg viewBox="0 0 16 12" aria-hidden="true">
            <path d={sparklePath} />
          </svg>
        </span>
      ))}
    </div>
  );
}
