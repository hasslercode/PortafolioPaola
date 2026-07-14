import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import Header from './components/Header.jsx';
import CursorSparkles from './components/CursorSparkles.jsx';
import SectionDivider from './components/SectionDivider.jsx';
import Hero from './sections/Hero.jsx';
import TargetAudience from './sections/TargetAudience.jsx';
import { useI18n } from './context/I18nProvider.jsx';
import { useModal } from './hooks/useModal.js';
import { useGlobalFadeUp } from './hooks/useGlobalFadeUp.js';
import { useScrollAnalytics } from './hooks/useScrollAnalytics.js';
import { trackCtaClick, trackFormStart } from './utils/analytics.js';

const FeaturedBrands = lazy(() => import('./sections/FeaturedBrands.jsx'));
const ResultsProof = lazy(() => import('./sections/ResultsProof.jsx'));
const WhyWorkWithMe = lazy(() => import('./sections/WhyWorkWithMe.jsx'));
const Testimonials = lazy(() => import('./sections/Testimonials.jsx'));
const Services = lazy(() => import('./sections/Services.jsx'));
const Skills = lazy(() => import('./sections/Skills.jsx'));
const Process = lazy(() => import('./sections/Process.jsx'));
const Contact = lazy(() => import('./sections/Contact.jsx'));
const Footer = lazy(() => import('./sections/Footer.jsx'));
const ContactModal = lazy(() => import('./components/Modals.jsx').then((m) => ({ default: m.ContactModal })));
const PortfolioModal = lazy(() => import('./components/Modals.jsx').then((m) => ({ default: m.PortfolioModal })));

function SectionFallback() {
  return <div className="min-h-[1px]" aria-hidden="true" />;
}

function DeferredSections({ onOpenContact, onOpenPortfolio }) {
  useGlobalFadeUp();

  return (
    <>
      <SectionDivider />

      <Suspense fallback={<SectionFallback />}>
        <FeaturedBrands />
      </Suspense>

      <SectionDivider variant="symbol" />

      <Suspense fallback={<SectionFallback />}>
        <ResultsProof onOpenContact={onOpenContact} />
      </Suspense>

      <SectionDivider />

      <Suspense fallback={<SectionFallback />}>
        <WhyWorkWithMe />
      </Suspense>

      <SectionDivider variant="symbol" />

      <Suspense fallback={<SectionFallback />}>
        <Services />
      </Suspense>

      <SectionDivider />

      <Suspense fallback={<SectionFallback />}>
        <Testimonials />
      </Suspense>

      <SectionDivider variant="symbol" />

      <Suspense fallback={<SectionFallback />}>
        <Skills />
      </Suspense>

      <SectionDivider />

      <Suspense fallback={<SectionFallback />}>
        <Process />
      </Suspense>

      <SectionDivider />

      <div className="cta-footer-container-final">
        <div className="container">
          <Suspense fallback={<SectionFallback />}>
            <Contact onOpenContact={onOpenContact} />
          </Suspense>
        </div>
        <Suspense fallback={<SectionFallback />}>
          <Footer onOpenPortfolio={onOpenPortfolio} />
        </Suspense>
      </div>
    </>
  );
}

export default function App() {
  const { content } = useI18n();
  const contactModal = useModal();
  const portfolioModal = useModal();
  const [showDeferred, setShowDeferred] = useState(false);

  useScrollAnalytics();

  const openContact = useCallback((source) => {
    trackFormStart(source);
    contactModal.openModal();
  }, [contactModal]);

  const handleHeroCta = useCallback(() => {
    trackCtaClick('hero', content.hero.cta);
    openContact('hero_cta');
  }, [content.hero.cta, openContact]);

  const handleContactCta = useCallback((location, label) => {
    trackCtaClick(location, label);
    openContact(location);
  }, [openContact]);

  useEffect(() => {
    document.documentElement.classList.add('content-ready');

    const revealDeferred = () => setShowDeferred(true);
    if ('requestIdleCallback' in window) {
      requestIdleCallback(revealDeferred, { timeout: 1200 });
    } else {
      requestAnimationFrame(revealDeferred);
    }
  }, []);

  return (
    <>
      <a href="#inicio" className="skip-link">
        {content.app.skipLink}
      </a>

      <CursorSparkles />

      <Header
        onOpenContact={() => handleContactCta('header', content.header.cta)}
        onOpenPortfolio={portfolioModal.openModal}
      />

      <main id="contenido-principal">
        <Hero onOpenContact={handleHeroCta} />

        <SectionDivider />

        <TargetAudience />

        {showDeferred ? (
          <DeferredSections
            onOpenContact={(source) => {
              const label = source === 'results_proof'
                ? content.resultsProof.cta
                : content.contact.cta;
              handleContactCta(source, label);
            }}
            onOpenPortfolio={portfolioModal.openModal}
          />
        ) : null}
      </main>

      <Suspense fallback={null}>
        <ContactModal open={contactModal.open} onClose={contactModal.closeModal} />
        <PortfolioModal open={portfolioModal.open} onClose={portfolioModal.closeModal} />
      </Suspense>
    </>
  );
}
