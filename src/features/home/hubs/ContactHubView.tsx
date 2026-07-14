'use client';

import Contact from '@/features/home/sections/Contact';
import TargetAudience from '@/features/home/sections/TargetAudience';
import VerticalArtConnector from '@/features/home/components/VerticalArtConnector';
import { useContentActions } from '@/features/home/PageChrome';

/** Contact hub — same CTA banner design as home. */
export function ContactHubView() {
  const { openContact } = useContentActions();

  return (
    <div className="contacto-hub">
      <TargetAudience />
      <VerticalArtConnector mark="sparkle" />
      <div className="cta-footer-container-final contacto-hub__cta">
        <div className="container">
          <Contact onOpenContact={(source: string) => openContact(source)} />
        </div>
      </div>
    </div>
  );
}
