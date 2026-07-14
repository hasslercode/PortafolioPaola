'use client';

import WhyWorkWithMe from '@/features/home/sections/WhyWorkWithMe';
import Skills from '@/features/home/sections/Skills';
import Process from '@/features/home/sections/Process';
import Testimonials from '@/features/home/sections/Testimonials';
import VerticalArtConnector from '@/features/home/components/VerticalArtConnector';
import { useI18n } from '@/features/home/HomeContentProvider';
import { useContentActions } from '@/features/home/PageChrome';

/**
 * Sobre mí — SITE-IA:
 * Historia | Formación | Filosofía | Metodología | CTA
 */
export function AboutHubView() {
  const { locale } = useI18n();
  const { openContact } = useContentActions();
  const isEn = locale === 'en';

  const anchors = [
    { id: 'historia', label: isEn ? 'Story' : 'Historia' },
    { id: 'formacion', label: isEn ? 'Background' : 'Formación' },
    { id: 'filosofia', label: isEn ? 'Philosophy' : 'Filosofía' },
    { id: 'metodologia', label: isEn ? 'Method' : 'Metodología' },
  ];

  return (
    <div className="sobre-hub">
      <nav
        className="container sobre-hub-nav"
        aria-label={isEn ? 'About sections' : 'Secciones sobre mí'}
      >
        <ul>
          {anchors.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} className="campaign-card__case-link">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div id="historia">
        <WhyWorkWithMe />
      </div>

      <VerticalArtConnector mark="sparkle" />

      <div id="formacion">
        <Skills />
      </div>

      <VerticalArtConnector mark="heart" />

      <div id="filosofia">
        <Testimonials />
      </div>

      <VerticalArtConnector mark="sparkle" />

      <div id="metodologia">
        <Process />
      </div>

      <VerticalArtConnector mark="dot" />

      <div id="cta" className="container sobre-hub-cta">
        <button
          type="button"
          className="btn-pill-premium"
          onClick={() => openContact('about_cta')}
        >
          {isEn ? "Let's work together" : 'Trabajemos juntos'}
        </button>
      </div>
    </div>
  );
}
