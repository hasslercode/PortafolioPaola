'use client';

import { useI18n } from '@/features/home/HomeContentProvider';

const PORTAFOLIO_PDF = '/pdf/portafolio.pdf';

/** Compact PDF CTA — avoids repeating campaigns/reels already on Experiencias. */
export function PortfolioPdfStrip() {
  const { locale } = useI18n();
  const isEn = locale === 'en';

  return (
    <section className="portfolio-pdf-strip" id="portafolio">
      <div className="container">
        <span className="badge-pill-wow portfolio-pdf-strip__badge">
          {isEn ? 'Portfolio' : 'Portafolio'}
        </span>
        <h2 className="portfolio-pdf-strip__title">
          {isEn ? 'Full portfolio PDF' : 'Portafolio completo en PDF'}
        </h2>
        <p className="portfolio-pdf-strip__subtitle">
          {isEn
            ? 'Download the complete deck here.'
            : 'Descarga el dossier completo aquí.'}
        </p>
        <p className="portfolio-pdf-strip__cta">
          <a
            href={PORTAFOLIO_PDF}
            className="btn-pill-premium"
            download="portafolio-paola-hoyos.pdf"
            type="application/pdf"
          >
            {isEn ? 'Download PDF' : 'Descargar PDF'}
          </a>
        </p>
      </div>
    </section>
  );
}

/** @deprecated Prefer PortfolioPdfStrip on the fused Experiences page. */
export function PortfolioHubView() {
  return <PortfolioPdfStrip />;
}
