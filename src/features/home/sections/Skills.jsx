'use client';

import FadeUp from '@/features/home/components/FadeUp';
import { useI18n } from '@/features/home/HomeContentProvider';
import { toSrc } from '@/lib/asset';
import iconPremiere from '@/assets/logos/skills/premiere-pro.svg';
import iconAfterEffects from '@/assets/logos/skills/after-effects.svg';
import iconCanva from '@/assets/logos/skills/canva.svg';
import iconCapcut from '@/assets/logos/skills/capcut.svg';
import iconMeta from '@/assets/logos/skills/meta.svg';

const SKILL_LAYOUT = [
  { icon: iconPremiere, width: 26, height: 26, progress: '80%' },
  { icon: iconAfterEffects, width: 26, height: 26, progress: '75%' },
  { icon: iconCanva, width: 26, height: 26, progress: '90%' },
  { icon: iconCapcut, width: 24, height: 24, progress: '100%' },
  { icon: iconMeta, width: 26, height: 26, progress: '60%' },
  { type: 'svg', progress: '80%' },
];

function EnglishIcon() {
  return (
    <svg className="skill-icon-wow__img" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
      <rect x="2" y="5" width="11" height="9" rx="2.5" fill="#E8A7B3" />
      <path fill="#fff" d="M5.8 8.6h3.4c.9 0 1.4.5 1.4 1.2s-.5 1.2-1.4 1.2H7.1v1.6H5.8V8.6zm1.3 1.2v1h1.5c.3 0 .5-.2.5-.5s-.2-.5-.5-.5H7.1z" />
      <rect x="11" y="11" width="11" height="9" rx="2.5" fill="#BD818B" />
      <path fill="#fff" d="M14.2 14.2h5.6v1.1h-2.1v3.7h-1.3v-3.7h-2.2v-1.1z" />
      <path fill="#fff" d="M14.5 17.8h4.8v1h-4.8z" />
    </svg>
  );
}

export default function Skills() {
  const { content } = useI18n();
  const { skills } = content;

  return (
    <section className="skills-section-wow" id="competencias">
      <span className="skills-scrap skills-scrap--heart skills-scrap--heart-1 scrap-heart-shape" aria-hidden="true" />
      <div className="container skills-grid-wow">
        <FadeUp className="skills-info-block" index={0}>
          <div className="skills-badge-wrap">
            <span className="skills-badge-tag" aria-hidden="true">{skills.badge}</span>
          </div>
          <div className="skills-title-container">
            <h2 className="skills-main-title">
              <span className="skills-main-title__line">{skills.title}</span>
              <span className="skills-script-title">{skills.titleScript}</span>
            </h2>
            <div className="skills-title-line" aria-hidden="true" />
          </div>
          <p className="skills-desc">
            <span>{skills.descriptionBefore}</span>{' '}
            <span className="pink-accent-bold">{skills.descriptionAccent}</span>
          </p>
        </FadeUp>

        <FadeUp className="skills-card-wow" index={1}>
          <span className="skills-scrap skills-scrap--tape-card" aria-hidden="true" />
          <div className="skills-bars-stack">
            {skills.items.map((item, index) => {
              const layout = SKILL_LAYOUT[index];
              return (
                <div key={item.name} className="skill-item-wow">
                  <div className="skill-row-wow">
                    <span className="skill-icon-wow">
                      {layout.type === 'svg' ? (
                        <EnglishIcon />
                      ) : (
                        <img src={toSrc(layout.icon)} alt={item.iconAlt} className="skill-icon-wow__img" width={layout.width} height={layout.height} loading="lazy" />
                      )}
                    </span>
                    <div className="skill-content-wow">
                      <div className="skill-meta-wow">
                        <span className="skill-name-wow">{item.name}</span>
                        <span className="skill-percentage-wow">{item.percentage}</span>
                      </div>
                      <div className="skill-track-wow">
                        <div className="skill-progress-wow" style={{ width: layout.progress }} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
