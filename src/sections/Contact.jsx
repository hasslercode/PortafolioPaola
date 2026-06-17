import { useI18n } from '../context/I18nProvider.jsx';

export default function Contact({ onOpenContact }) {
  const { content } = useI18n();
  const { contact } = content;

  const handleContactClick = (event) => {
    event.preventDefault();
    onOpenContact('contact_footer');
  };

  return (
    <section className="cta-banner-final" id="contacto" aria-labelledby="contact-title">
      <span className="cta-scrap cta-scrap--tape" aria-hidden="true" />
      <div className="cta-left-final">
        <div className="cta-isotype-circle">
          <svg className="cta-ellipse-svg" viewBox="0 0 100 100" aria-hidden="true">
            <ellipse cx="50" cy="50" rx="42" ry="24" transform="rotate(-25 50 50)" stroke="#f08098" strokeWidth="1" fill="none" />
          </svg>
          <span className="cta-circle-star" aria-hidden="true">✦</span>
        </div>
        <div className="cta-text-block-final">
          <h2 id="contact-title" className="cta-title-final">
            <span className="cta-script-title">{contact.titleScript}</span>
            <span>{contact.titleBefore}</span>{' '}
            <span className="cta-title-serif">{contact.titleSerif}</span>
          </h2>
          <p className="cta-desc-final">
            <span>{contact.descriptionBefore}</span>{' '}
            <span className="pink-highlight-bold">{contact.descriptionAccent}</span>
          </p>
        </div>
      </div>
      <div className="cta-vertical-divider" aria-hidden="true" />
      <div className="cta-right-final">
        <div className="cta-consultation-block">
          <h3 className="cta-consultation-title">{contact.consultationTitle}</h3>
          <ul className="cta-consultation-list">
            {contact.consultationItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <a
          href="#contacto"
          className="btn-hablemos-final"
          onClick={handleContactClick}
          aria-haspopup="dialog"
          aria-label={contact.ctaAriaLabel}
        >
          {contact.cta}
        </a>
        <span className="cta-subtext">{contact.ctaSubtext}</span>
        <address className="cta-contact-links">
          <a href="mailto:pahoyoscardona@gmail.com" className="contact-item-final">
            <span className="contact-icon-box" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
            </span>
            <span>{contact.email}</span>
          </a>
          <a href="tel:+573002493331" className="contact-item-final">
            <span className="contact-icon-box" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" /></svg>
            </span>
            <span>{contact.phone}</span>
          </a>
        </address>
      </div>
    </section>
  );
}
