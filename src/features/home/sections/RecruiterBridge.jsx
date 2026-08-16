'use client';

import FadeUp from '@/features/home/components/FadeUp';
import { useI18n } from '@/features/home/HomeContentProvider';
import { siteConfig } from '@/config/site';
import { useContentActions } from '@/features/home/PageChrome';
import { trackOutboundClick, trackCtaClick } from '@/features/home/utils/analytics';

/**
 * Hiring bridge — dual ICP: freelance clients + recruiters / in-house roles.
 * Anchored at #reclutadores for About hub + outbound LinkedIn.
 */
export default function RecruiterBridge() {
  const { content, locale } = useI18n();
  const { openContact } = useContentActions();
  const bridge = content.recruiterBridge;
  if (!bridge) return null;

  const guideHref =
    locale === 'en'
      ? '/en/blog/content-strategist-colombia-remoto'
      : '/es/blog/content-strategist-colombia-remoto';

  return (
    <section
      className="recruiter-bridge"
      id="reclutadores"
      aria-labelledby="recruiter-bridge-title"
    >
      <div className="container">
        <FadeUp as="header" className="recruiter-bridge__header" index={0}>
          <p className="recruiter-bridge__eyebrow">{bridge.eyebrow}</p>
          <h2 id="recruiter-bridge-title" className="recruiter-bridge__title">
            {bridge.title}
          </h2>
          <p className="recruiter-bridge__lead">{bridge.lead}</p>
        </FadeUp>

        <ul className="recruiter-bridge__roles">
          {bridge.roles.map((role, index) => (
            <FadeUp key={role} as="li" className="recruiter-bridge__role" index={index + 1}>
              {role}
            </FadeUp>
          ))}
        </ul>

        <FadeUp className="recruiter-bridge__proof" index={4}>
          <p>{bridge.proof}</p>
        </FadeUp>

        <FadeUp className="recruiter-bridge__actions" index={5}>
          <a
            className="btn-pill-premium"
            href={siteConfig.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              trackOutboundClick(siteConfig.social.linkedin);
              trackCtaClick('recruiter_bridge', 'linkedin');
            }}
          >
            {bridge.linkedinCta}
          </a>
          <button
            type="button"
            className="recruiter-bridge__secondary"
            onClick={() => {
              trackCtaClick('recruiter_bridge', 'email');
              openContact('recruiter_bridge');
            }}
          >
            {bridge.emailCta}
          </button>
          <a
            className="campaign-card__case-link"
            href={guideHref}
            onClick={() => trackCtaClick('recruiter_bridge', 'hiring_guide')}
          >
            {bridge.guideCta}
          </a>
        </FadeUp>
      </div>
    </section>
  );
}
