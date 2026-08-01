'use client';

import { useEffect, useRef } from 'react';
import { useI18n } from '@/features/home/HomeContentProvider';
import {
  trackFormSubmit,
  trackWhatsappClick,
} from '@/features/home/utils/analytics';
import { siteConfig } from '@/config/site';
import {
  defaultWhatsappMessage,
  whatsappUrl,
} from '@/lib/contact';

const portafolioPdf = '/pdf/portafolio.pdf';

export function ContactModal({ open, onClose }) {
  const dialogRef = useRef(null);
  const { content, locale } = useI18n();
  const { contact: modal } = content.modals;
  const typedLocale = locale === 'en' ? 'en' : 'es';
  const waHref = whatsappUrl(defaultWhatsappMessage(typedLocale));

  const handleChannelClick = (channel) => {
    if (channel === 'whatsapp') {
      trackWhatsappClick('contact_modal');
    } else {
      trackFormSubmit(channel);
    }
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
          {waHref ? (
            <li>
              <a
                href={waHref}
                className="contact-modal__channel"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleChannelClick('whatsapp')}
              >
                <span className="contact-modal__channel-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24"><path d="M20.52 3.48A11.86 11.86 0 0 0 12.04 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.15 1.6 5.96L0 24l6.3-1.65a11.86 11.86 0 0 0 5.74 1.46h.01c6.54 0 11.88-5.34 11.88-11.9 0-3.18-1.24-6.16-3.41-8.43zM12.05 21.8h-.01a9.86 9.86 0 0 1-5.02-1.37l-.36-.21-3.74.98 1-3.64-.24-.37a9.86 9.86 0 0 1-1.51-5.28c0-5.45 4.44-9.88 9.9-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.9 6.98c0 5.45-4.44 9.88-9.9 9.88zm5.42-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.04-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35z" /></svg>
                </span>
                <span>WhatsApp</span>
              </a>
            </li>
          ) : null}
          <li>
            <a
              href={`mailto:${siteConfig.contact.email}`}
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
              href={siteConfig.social.instagram}
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
          <li>
            <a
              href={siteConfig.social.linkedin}
              className="contact-modal__channel"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleChannelClick('linkedin')}
            >
              <span className="contact-modal__channel-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1-.004-4.125 2.062 2.062 0 0 1 .004 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              </span>
              <span>LinkedIn</span>
            </a>
          </li>
          {siteConfig.contact.calendly ? (
            <li>
              <a
                href={siteConfig.contact.calendly}
                className="contact-modal__channel"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleChannelClick('calendly')}
              >
                <span className="contact-modal__channel-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z" /></svg>
                </span>
                <span>{typedLocale === 'en' ? 'Book a call' : 'Agendar'}</span>
              </a>
            </li>
          ) : null}
        </ul>
      </div>
    </dialog>
  );
}

export function PortfolioModal({ open, onClose }) {
  const dialogRef = useRef(null);
  const { content } = useI18n();
  const { portfolio: modal } = content.modals;
  // Only attach PDF src while open — avoids ~1.6MB×2 on initial page load.
  const iframeSrc = open ? `${portafolioPdf}#toolbar=1&navpanes=0&scrollbar=1` : undefined;

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
          {iframeSrc ? (
            <iframe src={iframeSrc} title={modal.iframeTitle} />
          ) : null}
        </div>
      </div>
    </dialog>
  );
}
