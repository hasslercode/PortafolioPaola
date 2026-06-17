import FadeUp from '../components/FadeUp.jsx';
import { useI18n } from '../context/I18nProvider.jsx';

const PILLAR_ICONS = [
  'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z',
  'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z',
  'M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z',
  'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z',
];

const PILLAR_VARIANTS = [
  'why-me__icon why-me__icon--pink',
  'why-me__icon why-me__icon--lavender',
  'why-me__icon why-me__icon--sage',
  'why-me__icon why-me__icon--sand',
];

export default function WhyWorkWithMe() {
  const { content } = useI18n();
  const { whyWorkWithMe } = content;

  return (
    <section className="why-me" id="por-que-yo" aria-labelledby="why-me-title">
      <div className="container">
        <FadeUp as="header" className="why-me__header" index={0}>
          <h2 id="why-me-title" className="why-me__title">{whyWorkWithMe.title}</h2>
          <p className="why-me__subtitle">{whyWorkWithMe.subtitle}</p>
        </FadeUp>

        <div className="why-me__grid">
          {whyWorkWithMe.pillars.map((pillar, index) => (
            <FadeUp key={pillar.title} as="article" className="why-me__card" index={index + 1}>
              <span className={PILLAR_VARIANTS[index]} aria-hidden="true">
                <svg viewBox="0 0 24 24"><path d={PILLAR_ICONS[index]} /></svg>
              </span>
              <h3 className="why-me__card-title">{pillar.title}</h3>
              <p className="why-me__card-desc">{pillar.description}</p>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
