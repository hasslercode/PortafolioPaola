'use client';

import Contact from '@/features/home/sections/Contact';
import TargetAudience from '@/features/home/sections/TargetAudience';
import VerticalArtConnector from '@/features/home/components/VerticalArtConnector';
import { useContentActions } from '@/features/home/PageChrome';
import { useI18n } from '@/features/home/HomeContentProvider';
import { BriefingForm } from '@/features/contact/BriefingForm';

/** Contact hub — CTA + briefing form (HU-CRO-003). */
export function ContactHubView() {
  const { openContact } = useContentActions();
  const { locale } = useI18n();
  const typedLocale = locale === 'en' ? 'en' : 'es';

  return (
    <div className="contacto-hub">
      <TargetAudience />
      <VerticalArtConnector mark="sparkle" />
      <div className="container contacto-hub__form">
        <BriefingForm locale={typedLocale} />
      </div>
      <div className="cta-footer-container-final contacto-hub__cta">
        <div className="container">
          <Contact onOpenContact={(source: string) => openContact(source)} />
        </div>
      </div>
    </div>
  );
}
