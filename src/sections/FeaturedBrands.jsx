import FadeUp from '../components/FadeUp.jsx';
import { useI18n } from '../context/I18nProvider.jsx';
import logoCocaCola from '../assets/logos/coca-cola.png';
import logoTotto from '../assets/logos/totto.svg';
import logoCineColombia from '../assets/logos/cine-colombia.png';
import logoHm from '../assets/logos/hm.svg';
import logoStarbucks from '../assets/logos/starbucks.svg';
import logoMaxgordos from '../assets/logos/maxgordos.png';
import imgCocaCola from '../assets/campaigns/coca-cola.webp';
import imgCocaColaThumb from '../assets/campaigns/coca-cola-thumb.webp';
import imgTotto from '../assets/campaigns/totto-backpack.webp';
import imgTottoThumb from '../assets/campaigns/totto-backpack-thumb.webp';
import imgCineColombia from '../assets/campaigns/cine-colombia.webp';
import imgCineColombiaThumb from '../assets/campaigns/cine-colombia-thumb.webp';
import imgHm from '../assets/campaigns/hm-store.webp';
import imgHmThumb from '../assets/campaigns/hm-store-thumb.webp';
import imgStarbucks from '../assets/campaigns/starbucks-cup.png';
import imgStarbucksThumb from '../assets/campaigns/starbucks-cup-thumb.webp';
import imgMaxgordos from '../assets/campaigns/maxgordos-burger.webp';
import imgMaxgordosThumb from '../assets/campaigns/maxgordos-burger-thumb.webp';

const CAMPAIGN_LAYOUT = [
  {
    modifier: 'coca',
    logo: logoCocaCola,
    logoClass: 'brand-header__logo brand-header__logo--wide',
    logoWidth: 120,
    logoHeight: 32,
    visualClass: 'campaign-card__visual campaign-card__visual--cutout',
    image: imgCocaCola,
    imageThumb: imgCocaColaThumb,
    imageWidth: 300,
    imageHeight: 520,
  },
  {
    modifier: 'totto',
    logo: logoTotto,
    logoClass: 'brand-header__logo',
    logoWidth: 48,
    logoHeight: 48,
    visualClass: 'campaign-card__visual campaign-card__visual--cutout',
    image: imgTotto,
    imageThumb: imgTottoThumb,
    imageWidth: 300,
    imageHeight: 520,
  },
  {
    modifier: 'cine',
    logo: logoCineColombia,
    logoClass: 'brand-header__logo brand-header__logo--wide',
    logoWidth: 120,
    logoHeight: 32,
    visualClass: 'campaign-card__visual campaign-card__visual--photo',
    image: imgCineColombia,
    imageThumb: imgCineColombiaThumb,
    imageWidth: 300,
    imageHeight: 520,
  },
  {
    modifier: 'hm',
    logo: logoHm,
    logoClass: 'brand-header__logo brand-header__logo--wide',
    logoWidth: 72,
    logoHeight: 32,
    visualClass: 'campaign-card__visual campaign-card__visual--photo',
    image: imgHm,
    imageThumb: imgHmThumb,
    imageWidth: 300,
    imageHeight: 520,
  },
  {
    modifier: 'starbucks',
    logo: logoStarbucks,
    logoClass: 'brand-header__logo',
    logoWidth: 40,
    logoHeight: 40,
    visualClass: 'campaign-card__visual campaign-card__visual--cutout',
    image: imgStarbucks,
    imageThumb: imgStarbucksThumb,
    imageWidth: 300,
    imageHeight: 520,
  },
  {
    modifier: 'maxgordos',
    logo: logoMaxgordos,
    logoClass: 'brand-header__logo brand-header__logo--wide',
    logoWidth: 120,
    logoHeight: 40,
    visualClass: 'campaign-card__visual campaign-card__visual--photo',
    image: imgMaxgordos,
    imageThumb: imgMaxgordosThumb,
    imageWidth: 300,
    imageHeight: 520,
  },
];

function PlayButton() {
  return (
    <>
      <span className="campaign-card__play-overlay" aria-hidden="true" />
      <span className="campaign-card__play-btn campaign-card__play-btn--corner" aria-hidden="true">
        <svg className="campaign-card__play-icon" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
        <span className="campaign-card__arrow-icon" aria-hidden="true">→</span>
      </span>
      <span className="campaign-card__play-btn campaign-card__play-btn--center" aria-hidden="true">
        <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
      </span>
    </>
  );
}

export default function FeaturedBrands() {
  const { content, t } = useI18n();
  const { experience } = content;

  return (
    <section className="featured-brands" id="experiencias-destacadas">
      <div className="container">
        <div className="featured-header">
          <FadeUp className="featured-title-block" index={0}>
            <div className="featured-badge-wrap featured-badge-wrap--desktop">
              <span className="featured-badge" aria-hidden="true">{experience.badge}</span>
            </div>
            <div className="featured-title-container">
              <h2 className="featured-title featured-title--desktop">
                <span className="featured-title__line">{experience.title}</span>
                <span className="featured-script-row">
                  <span className="featured-script">{experience.titleScript}</span>
                  <span className="featured-scrap featured-scrap--heart scrap-heart-shape" aria-hidden="true" />
                </span>
              </h2>
              <h2 className="featured-title featured-title--mobile">
                <span className="featured-title__pink">{experience.titleMobilePink}</span>
                <span className="featured-title__rest">{experience.titleMobileRest}</span>
              </h2>
              <span className="featured-title-underline featured-title-underline--desktop" aria-hidden="true" />
            </div>
          </FadeUp>
          <FadeUp className="featured-copy-block featured-copy-block--desktop" index={1}>
            <p className="featured-copy">
              <span>{experience.copyBefore}</span>{' '}
              <span className="marker-highlight">{experience.copyAccent}</span>
            </p>
            <aside className="featured-note featured-note--prominent" role="note" aria-label={experience.noteLabel}>
              <span className="featured-note-tape" aria-hidden="true" />
              <span className="featured-note-icon" aria-hidden="true">i</span>
              <div>
                <span className="featured-note__label">{experience.noteLabel}</span>
                <p>{experience.note}</p>
              </div>
            </aside>
          </FadeUp>
        </div>

        <div className="brands-grid">
          {experience.campaigns.map((campaign, index) => {
            const layout = CAMPAIGN_LAYOUT[index];
            return (
              <FadeUp key={campaign.name} as="article" className={`campaign-card campaign-card--${layout.modifier}`} index={index}>
                  <div className="campaign-card__inner">
                    <div className="campaign-card__content">
                      <div className="brand-header">
                        <img
                          src={layout.logo}
                          alt={t(experience.logoAlt, { brand: campaign.name })}
                          className={layout.logoClass}
                          width={layout.logoWidth}
                          height={layout.logoHeight}
                          loading="lazy"
                        />
                        <h3 className="brand-header__name">{campaign.name}</h3>
                        <p className="brand-header__category">{campaign.category}</p>
                      </div>
                      <div className="metric-pill">
                        <svg className="metric-pill__icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" /></svg>
                        <span className="metric-pill__body">
                          <strong className="metric-pill__value">{campaign.metric}</strong>
                          <span className="metric-pill__label">{campaign.metricLabel}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className={layout.visualClass}>
                    <picture>
                      <source srcSet={layout.imageThumb} type="image/webp" />
                      <img
                        src={layout.image}
                        alt={t(experience.imageAlt, { brand: campaign.name })}
                        width={layout.imageWidth}
                        height={layout.imageHeight}
                        loading="lazy"
                        decoding="async"
                      />
                    </picture>
                  </div>
                  <a
                    href={campaign.ctaLink}
                    className="campaign-card__play"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={campaign.ctaAriaLabel}
                  >
                    <PlayButton />
                  </a>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
