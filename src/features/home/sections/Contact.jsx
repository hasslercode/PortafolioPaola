'use client';

import { useI18n } from '@/features/home/HomeContentProvider';
import { OptimizedImage } from '@/components/ui/OptimizedImage';

const CTA_PHOTO = '/assets/fotopaola4.jpg';

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
        <div className="cta-portrait">
          <OptimizedImage
            src={CTA_PHOTO}
            alt={contact.imageAlt}
            className="cta-portrait__img"
            width={300}
            height={375}
            sizes="(max-width: 1024px) 240px, 270px"
            loading="lazy"
          />
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
          <a
            href="https://www.instagram.com/paolaahoyosc"
            className="contact-item-final"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="contact-icon-box" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" /></svg>
            </span>
            <span>{contact.instagram}</span>
          </a>
        </address>
      </div>
    </section>
  );
}
