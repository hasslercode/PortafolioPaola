'use client';

import WhyWorkWithMe from '@/features/home/sections/WhyWorkWithMe';
import Skills from '@/features/home/sections/Skills';
import Process from '@/features/home/sections/Process';
import Testimonials from '@/features/home/sections/Testimonials';
import SectionDivider from '@/features/home/components/SectionDivider';
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
    <>
      <nav
        className="container"
        aria-label={isEn ? 'About sections' : 'Secciones sobre mí'}
        style={{ paddingTop: '0.5rem', paddingBottom: '1rem' }}
      >
        <ul
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.75rem 1.25rem',
            listStyle: 'none',
            padding: 0,
            margin: 0,
          }}
        >
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

      <SectionDivider />

      <div id="formacion">
        <Skills />
      </div>

      <SectionDivider variant="symbol" />

      <div id="filosofia">
        <Testimonials />
      </div>

      <SectionDivider />

      <div id="metodologia">
        <Process />
      </div>

      <SectionDivider />

      <div id="cta" className="container" style={{ textAlign: 'center', paddingBottom: '2rem' }}>
        <button
          type="button"
          className="btn-pill-premium"
          onClick={() => openContact('about_cta')}
        >
          {isEn ? "Let's work together" : 'Trabajemos juntos'}
        </button>
      </div>
    </>
  );
}
