'use client';

import { useI18n } from '@/features/home/HomeContentProvider';

const PORTAFOLIO_PDF = '/pdf/portafolio.pdf';

/** Compact PDF CTA — avoids repeating campaigns/reels already on Experiencias. */
export function PortfolioPdfStrip() {
  const { locale } = useI18n();
  const isEn = locale === 'en';

  return (
    <section className="services-wow" id="portafolio">
      <div className="container">
        <div className="services-wow__header">
          <span className="badge-pill-wow">
            {isEn ? 'Portfolio' : 'Portafolio'}
          </span>
          <div className="section-header-wow">
            <span
              className="services-scrap services-scrap--heart scrap-heart-shape"
              aria-hidden="true"
            />
            <div className="fluid-orbit-container">
              <div className="fluid-ellipse ellipse-1" />
              <div className="fluid-ellipse ellipse-2" />
              <h2 className="wow-main-title">
                {isEn ? 'Full portfolio PDF' : 'Portafolio completo en PDF'}
              </h2>
            </div>
            <p className="wow-subtitle">
              {isEn
                ? 'Campaigns and results live above. Download the complete deck here.'
                : 'Las campañas y resultados están arriba. Aquí descargas el dossier completo.'}
            </p>
            <p style={{ marginTop: '1.25rem' }}>
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
        </div>
      </div>
    </section>
  );
}

/** @deprecated Prefer PortfolioPdfStrip on the fused Experiences page. */
export function PortfolioHubView() {
  return <PortfolioPdfStrip />;
}
