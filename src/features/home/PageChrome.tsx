'use client';

import {
  createContext,
  lazy,
  Suspense,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from 'react';
import Header from '@/features/home/components/Header';
import Footer from '@/features/home/sections/Footer';
import Contact from '@/features/home/sections/Contact';
import SectionDivider from '@/features/home/components/SectionDivider';
import { useI18n } from '@/features/home/HomeContentProvider';
import { useModal } from '@/hooks/useModal.js';
import { usePathname } from '@/i18n/routing';
import { trackCtaClick, trackFormStart } from '@/features/home/utils/analytics';

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

type ContentActions = {
  openContact: (source?: string) => void;
  openPortfolio: () => void;
};

const ContentActionsContext = createContext<ContentActions | null>(null);

export function useContentActions() {
  const ctx = useContext(ContentActionsContext);
  if (!ctx) {
    throw new Error('useContentActions must be used within PageChrome');
  }
  return ctx;
}

type PageChromeProps = {
  children: ReactNode;
};

/**
 * Same Header / Contact / Footer / modals as home.
 */
export function PageChrome({ children }: PageChromeProps) {
  const { content } = useI18n();
  const pathname = usePathname();
  const contactModal = useModal();
  const portfolioModal = useModal();
  const showContactBanner = pathname !== '/contact';

  const openContact = useCallback(
    (source = 'page') => {
      trackFormStart(source);
      trackCtaClick(source, content.header.cta);
      contactModal.openModal();
    },
    [contactModal, content.header.cta],
  );

  const actions = useMemo(
    () => ({
      openContact,
      openPortfolio: portfolioModal.openModal,
    }),
    [openContact, portfolioModal.openModal],
  );

  return (
    <ContentActionsContext.Provider value={actions}>
      <div className="page-chrome">
        <a href="#contenido-principal" className="skip-link">
          {content.app.skipLink}
        </a>

        <Header
          onOpenContact={() => openContact('header')}
        />

        <main id="contenido-principal" className="page-chrome__main">
          {children}
        </main>

        {showContactBanner ? (
          <>
            <SectionDivider />
            <div className="cta-footer-container-final page-chrome__footer-wrap">
              <div className="container">
                <Contact onOpenContact={(source: string) => openContact(source)} />
              </div>
              <Footer onOpenPortfolio={portfolioModal.openModal} />
            </div>
          </>
        ) : (
          <div className="cta-footer-container-final page-chrome__footer-wrap">
            <Footer onOpenPortfolio={portfolioModal.openModal} />
          </div>
        )}

        <Suspense fallback={null}>
          <ContactModal open={contactModal.open} onClose={contactModal.closeModal} />
          <PortfolioModal
            open={portfolioModal.open}
            onClose={portfolioModal.closeModal}
          />
        </Suspense>
      </div>
    </ContentActionsContext.Provider>
  );
}
