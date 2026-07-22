import { useEffect, useRef } from 'react';
import { useI18n } from '../context/I18nProvider.jsx';
import portafolioPdf from '../assets/portafolio.pdf';
import { trackFormSubmit } from '../utils/analytics.js';

export function ContactModal({ open, onClose }) {
  const dialogRef = useRef(null);
  const { content } = useI18n();
  const { contact: modal } = content.modals;

  const handleChannelClick = (channel) => {
    trackFormSubmit(channel);
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }

    if (open) {
      if (typeof dialog.showModal === 'function') {
        if (!dialog.open) {
          dialog.showModal();
        }
      } else {
        dialog.setAttribute('open', 'open');
      }
    } else if (typeof dialog.close === 'function' && dialog.open) {
      dialog.close();
    } else {
      dialog.removeAttribute('open');
    }
  }, [open]);

  return (
    <dialog ref={dialogRef} className="contact-modal" id="contact-modal" aria-labelledby="contact-modal-title" onClose={onClose}>
      <div className="contact-modal__backdrop" onClick={onClose} />
      <div className="contact-modal__panel">
        <span className="contact-modal__scrap contact-modal__scrap--heart-tl scrap-heart-shape" aria-hidden="true" />
        <span className="contact-modal__scrap contact-modal__scrap--sparkle-tl" aria-hidden="true">✦</span>
        <span className="contact-modal__scrap contact-modal__scrap--tape" aria-hidden="true" />
        <span className="contact-modal__scrap contact-modal__scrap--heart-br scrap-heart-shape" aria-hidden="true" />
        <span className="contact-modal__scrap contact-modal__scrap--sparkle-br" aria-hidden="true">✦</span>
        <span className="contact-modal__scrap contact-modal__scrap--grid" aria-hidden="true" />

        <button type="button" className="contact-modal__close" aria-label={modal.closeLabel} onClick={onClose}>
          <span aria-hidden="true">×</span>
        </button>

        <h2 id="contact-modal-title">
          <span>{modal.titleBefore}</span>{' '}
          <span className="contact-modal__title-accent">{modal.titleAccent}</span>
          <span className="contact-modal__title-sparkle" aria-hidden="true">✦</span>
        </h2>
        <p className="contact-modal__intro">
          <span>{modal.introBefore}</span>{' '}
          <span className="contact-modal__intro-accent">{modal.introAccent}</span>{' '}
          <span>{modal.introAfter}</span>
        </p>

        <ul className="contact-modal__channels">
          <li>
            <a
              href="mailto:pahoyoscardona@gmail.com"
              className="contact-modal__channel"
              onClick={() => handleChannelClick('email')}
            >
              <span className="contact-modal__channel-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
              </span>
              <span>{modal.email}</span>
            </a>
          </li>
          <li>
            <a
              href="https://instagram.com/paolaahoyosc"
              className="contact-modal__channel"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleChannelClick('instagram')}
            >
              <span className="contact-modal__channel-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" /></svg>
              </span>
              <span>{modal.instagram}</span>
            </a>
          </li>
        </ul>
      </div>
    </dialog>
  );
}

export function PortfolioModal({ open, onClose }) {
  const dialogRef = useRef(null);
  const { content } = useI18n();
  const { portfolio: modal } = content.modals;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }

    if (open) {
      if (typeof dialog.showModal === 'function') {
        if (!dialog.open) {
          dialog.showModal();
        }
      } else {
        dialog.setAttribute('open', 'open');
      }
    } else if (typeof dialog.close === 'function' && dialog.open) {
      dialog.close();
    } else {
      dialog.removeAttribute('open');
    }
  }, [open]);

  return (
    <dialog ref={dialogRef} className="portfolio-modal" id="portfolio-modal" aria-labelledby="portfolio-modal-title" onClose={onClose}>
      <div className="portfolio-modal__backdrop" onClick={onClose} />
      <div className="portfolio-modal__panel">
        <button type="button" className="portfolio-modal__close" aria-label={modal.closeLabel} onClick={onClose}>
          <span>{modal.close}</span>
        </button>

        <div className="portfolio-modal__header">
          <h2 id="portfolio-modal-title">{modal.title}</h2>
          <div className="portfolio-modal__download">
            <a
              href={portafolioPdf}
              download="portafolio-paola-hoyos.pdf"
              type="application/pdf"
              className="btn-pill-premium"
              aria-label={modal.downloadAriaLabel}
              aria-describedby="portfolio-download-note"
            >
              {modal.download}
            </a>
            <p id="portfolio-download-note" className="portfolio-modal__download-note">
              {modal.downloadNote}
            </p>
          </div>
        </div>

        <div className="portfolio-modal__content">
          <iframe src={`${portafolioPdf}#toolbar=1&navpanes=0&scrollbar=1`} title={modal.iframeTitle} loading="lazy" />
        </div>
      </div>
    </dialog>
  );
}
