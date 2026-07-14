import { siteConfig } from '@/config/site';
import type { SiteLocale } from '@/config/site';

type AuthorBylineProps = {
  locale: SiteLocale;
};

/** E-E-A-T / citation cue for LLMs and readers. */
export function AuthorByline({ locale }: AuthorBylineProps) {
  const copy =
    locale === 'es'
      ? {
          by: 'Escrito por',
          role: siteConfig.jobTitle.es,
          base: `Base en ${siteConfig.geo.addressLocality}, trabaja remoto en ${siteConfig.geo.areaServed.join(' y ')}.`,
        }
      : {
          by: 'Written by',
          role: siteConfig.jobTitle.en,
          base: `Based in ${siteConfig.geo.addressLocality}, works remotely across ${siteConfig.geo.areaServed.join(' and ')}.`,
        };

  return (
    <aside className="geo-author" aria-label={copy.by}>
      <p className="geo-author__name">
        <span className="geo-author__by">{copy.by}</span>{' '}
        <strong>{siteConfig.legalName}</strong>
      </p>
      <p className="geo-author__role">{copy.role}</p>
      <p className="geo-author__base">{copy.base}</p>
    </aside>
  );
}
