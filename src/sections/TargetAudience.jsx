import FadeUp from '../components/FadeUp.jsx';
import { useI18n } from '../context/I18nProvider.jsx';

const PROFILE_ICONS = [
  'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z',
  'M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z',
  'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z',
];

const ICON_VARIANTS = [
  'target-audience__icon target-audience__icon--pink',
  'target-audience__icon target-audience__icon--lavender',
  'target-audience__icon target-audience__icon--sage',
];

export default function TargetAudience() {
  const { content } = useI18n();
  const { targetAudience } = content;

  return (
    <section className="target-audience" id="para-quien" aria-labelledby="target-audience-title">
      <div className="container">
        <FadeUp as="header" className="target-audience__header" index={0}>
          <h2 id="target-audience-title" className="target-audience__title">
            {targetAudience.title}
          </h2>
          <p className="target-audience__subtitle">{targetAudience.subtitle}</p>
        </FadeUp>

        <div className="target-audience__grid" role="list">
          {targetAudience.profiles.map((profile, index) => (
            <FadeUp
              key={profile.title}
              as="article"
              className="target-audience__card"
              index={index + 1}
              role="listitem"
            >
              <span className={ICON_VARIANTS[index]} aria-hidden="true">
                <svg viewBox="0 0 24 24"><path d={PROFILE_ICONS[index]} /></svg>
              </span>
              <h3 className="target-audience__card-title">{profile.title}</h3>
              <p className="target-audience__card-desc">{profile.description}</p>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
