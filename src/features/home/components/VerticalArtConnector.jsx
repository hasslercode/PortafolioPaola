'use client';

/**
 * Compact vertical scrapbook connector between hub sections.
 * Continues the ✦ / dash art language without the old heavy section padding.
 */
export default function VerticalArtConnector({ mark = 'sparkle' }) {
  return (
    <div className="art-connector" aria-hidden="true">
      <span className="art-connector__line art-connector__line--top" />
      <span
        className={`art-connector__node art-connector__node--${mark}${
          mark === 'heart' ? ' scrap-heart-shape' : ''
        }`}
      >
        {mark === 'sparkle' ? '✦' : mark === 'dot' ? '·' : null}
      </span>
      <span className="art-connector__line art-connector__line--bottom" />
    </div>
  );
}
