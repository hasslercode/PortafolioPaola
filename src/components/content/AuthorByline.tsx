import { siteConfig } from '@/config/site';
import type { SiteLocale } from '@/config/site';
import { Link } from '@/i18n/routing';

type AuthorBylineProps = {
  locale: SiteLocale;
};

/** E-E-A-T / citation cue for LLMs, recruiters, and readers. */
export function AuthorByline({ locale }: AuthorBylineProps) {
  const copy =
    locale === 'es'
      ? {
          by: 'Escrito por',
          role: siteConfig.jobTitle.es,
          proof: `+${siteConfig.metrics.yearsExperience} años · ${siteConfig.metrics.organicViews90d} vistas orgánicas documentadas · Base en ${siteConfig.geo.addressLocality}.`,
          about: 'Sobre mí',
          contact: 'Contacto',
          follow: 'Seguir',
        }
      : {
          by: 'Written by',
          role: siteConfig.jobTitle.en,
          proof: `+${siteConfig.metrics.yearsExperience} years · ${siteConfig.metrics.organicViews90d} documented organic views · Based in ${siteConfig.geo.addressLocality}.`,
          about: 'About',
          contact: 'Contact',
          follow: 'Follow',
        };

  return (
    <aside className="geo-author" aria-label={copy.by}>
      <p className="geo-author__name">
        <span className="geo-author__by">{copy.by}</span>{' '}
        <strong>{siteConfig.legalName}</strong>
      </p>
      <p className="geo-author__role">{copy.role}</p>
      <p className="geo-author__base">{copy.proof}</p>
      <p className="geo-author__links">
        <Link href="/about">{copy.about}</Link>
        <span aria-hidden="true"> · </span>
        <Link href="/contact">{copy.contact}</Link>
        <span aria-hidden="true"> · </span>
        <a href={siteConfig.social.instagram} rel="noopener noreferrer">
          Instagram
        </a>
        <span aria-hidden="true"> · </span>
        <a href={siteConfig.social.linkedin} rel="noopener noreferrer">
          LinkedIn
        </a>
      </p>
    </aside>
  );
}
