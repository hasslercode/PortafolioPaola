'use client';

import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import Header from '@/features/home/components/Header';
import SectionDivider from '@/features/home/components/SectionDivider';
import Hero from '@/features/home/sections/Hero';
import { useI18n } from '@/features/home/HomeContentProvider';
import { useModal } from '@/hooks/useModal.js';
import { useGlobalFadeUp } from '@/hooks/useGlobalFadeUp.js';
import { useScrollAnalytics } from '@/hooks/useScrollAnalytics.js';
import { trackCtaClick, trackFormStart } from '@/features/home/utils/analytics';

/** Non-critical polish — after idle */
const CursorSparkles = lazy(
  () => import('@/features/home/components/CursorSparkles'),
);
const Services = lazy(() => import('@/features/home/sections/Services'));
const FeaturedBrands = lazy(() => import('@/features/home/sections/FeaturedBrands'));
const ResultsProof = lazy(() => import('@/features/home/sections/ResultsProof'));
const Testimonials = lazy(() => import('@/features/home/sections/Testimonials'));
const WhyWorkWithMe = lazy(() => import('@/features/home/sections/WhyWorkWithMe'));
const Contact = lazy(() => import('@/features/home/sections/Contact'));
const Footer = lazy(() => import('@/features/home/sections/Footer'));
const BlogPreview = lazy(() =>
  import('@/features/home/sections/BlogPreview').then((m) => ({
    default: m.BlogPreview,
  })),
);
const ContactModal = lazy(() =>
  import('@/features/home/components/Modals').then((m) => ({
    default: m.ContactModal,
  })),
);
const PortfolioModal = lazy(() =>
  import('@/features/home/components/Modals').then((m) => ({
    default: m.PortfolioModal,
  })),
);

function SectionFallback() {
  return <div className="min-h-[1px]" aria-hidden="true" />;
}

function DeferredSections({
  onOpenContact,
  onOpenPortfolio,
  blogTeasers,
}: {
  onOpenContact: (source: string) => void;
  onOpenPortfolio: () => void;
  blogTeasers: Array<{ slug: string; title: string; description: string }>;
}) {
  useGlobalFadeUp();

  return (
    <>
      {/* IA: Servicios (preview) */}
      <Suspense fallback={<SectionFallback />}>
        <Services linked />
      </Suspense>

      <SectionDivider />

      {/* IA: Casos destacados */}
      <Suspense fallback={<SectionFallback />}>
        <FeaturedBrands hubMode />
      </Suspense>

      <SectionDivider />

      {/* IA: Resultados */}
      <Suspense fallback={<SectionFallback />}>
        <ResultsProof onOpenContact={onOpenContact} />
      </Suspense>

      <SectionDivider variant="symbol" />

      {/* IA: Testimonios */}
      <Suspense fallback={<SectionFallback />}>
        <Testimonials />
      </Suspense>

      <SectionDivider />

      {/* IA: Sobre mí (preview) */}
      <Suspense fallback={<SectionFallback />}>
        <WhyWorkWithMe />
      </Suspense>

      {blogTeasers.length > 0 ? (
        <>
          <SectionDivider />
          <Suspense fallback={<SectionFallback />}>
            <BlogPreview posts={blogTeasers} />
          </Suspense>
        </>
      ) : null}

      <SectionDivider />

      {/* IA: CTA */}
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

/** Home aligned to SITE-IA — scrapbook sections from legacy home. */
export default function HomeExperience({
  blogTeasers = [],
}: {
  blogTeasers?: Array<{ slug: string; title: string; description: string }>;
}) {
  const { content } = useI18n();
  const contactModal = useModal();
  const portfolioModal = useModal();
  const [showDeferred, setShowDeferred] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);

  useScrollAnalytics();

  const openContact = useCallback(
    (source: string) => {
      trackFormStart(source);
      contactModal.openModal();
    },
    [contactModal],
  );

  const handleHeroCta = useCallback(() => {
    trackCtaClick('hero', content.hero.cta);
    openContact('hero_cta');
  }, [content.hero.cta, openContact]);

  const handleContactCta = useCallback(
    (location: string, label: string) => {
      trackCtaClick(location, label);
      openContact(location);
    },
    [openContact],
  );

  useEffect(() => {
    document.documentElement.classList.add('content-ready');

    const revealDeferred = () => setShowDeferred(true);
    const revealSparkles = () => setShowSparkles(true);
    if ('requestIdleCallback' in window) {
      requestIdleCallback(revealDeferred, { timeout: 1200 });
      requestIdleCallback(revealSparkles, { timeout: 2500 });
    } else {
      requestAnimationFrame(revealDeferred);
      setTimeout(revealSparkles, 1500);
    }
  }, []);

  return (
    <>
      <a href="#inicio" className="skip-link">
        {content.app.skipLink}
      </a>

      {showSparkles ? (
        <Suspense fallback={null}>
          <CursorSparkles />
        </Suspense>
      ) : null}

      <Header
        onOpenContact={() => handleContactCta('header', content.header.cta)}
      />

      <main id="contenido-principal">
        <Hero onOpenContact={handleHeroCta} />

        <SectionDivider />

        {showDeferred ? (
          <DeferredSections
            blogTeasers={blogTeasers}
            onOpenPortfolio={portfolioModal.openModal}
            onOpenContact={(source) => {
              const label =
                source === 'results_proof'
                  ? content.resultsProof.cta
                  : content.contact.cta;
              handleContactCta(source, label);
            }}
          />
        ) : null}
      </main>

      <Suspense fallback={null}>
        <ContactModal open={contactModal.open} onClose={contactModal.closeModal} />
        {portfolioModal.open ? (
          <PortfolioModal
            open={portfolioModal.open}
            onClose={portfolioModal.closeModal}
          />
        ) : null}
      </Suspense>
    </>
  );
}
