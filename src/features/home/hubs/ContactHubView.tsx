'use client';

import Contact from '@/features/home/sections/Contact';
import TargetAudience from '@/features/home/sections/TargetAudience';
import SectionDivider from '@/features/home/components/SectionDivider';
import { useContentActions } from '@/features/home/PageChrome';

/** Contact hub — same CTA banner design as home. */
export function ContactHubView() {
  const { openContact } = useContentActions();

  return (
    <>
      <TargetAudience />
      <SectionDivider />
      <div className="cta-footer-container-final" style={{ background: 'transparent' }}>
        <div className="container">
          <Contact onOpenContact={(source: string) => openContact(source)} />
        </div>
      </div>
    </>
  );
}
