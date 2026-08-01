import { siteConfig } from '@/config/site';
import { Link, type AppLocale } from '@/i18n/routing';

export function SiteFooter({ locale }: { locale: AppLocale }) {
  const year = new Date().getFullYear();

  return (
    <footer className="site-chrome-footer">
      <div className="site-chrome-footer__inner">
        <p>
          © {year} {siteConfig.name}.{' '}
          {locale === 'es' ? 'Colombia · Remoto' : 'Colombia · Remote'}.
        </p>
        <div className="site-chrome-footer__links">
          <Link href="/experiences">{locale === 'es' ? 'Experiencias' : 'Experiences'}</Link>
          <Link href="/results">{locale === 'es' ? 'Resultados' : 'Results'}</Link>
          <Link href="/services">{locale === 'es' ? 'Servicios' : 'Services'}</Link>
          <Link href="/pricing">{locale === 'es' ? 'Tarifas' : 'Pricing'}</Link>
          <Link href="/cities">{locale === 'es' ? 'Ciudades' : 'Cities'}</Link>
          <Link href="/about">{locale === 'es' ? 'Sobre mí' : 'About'}</Link>
          <Link href="/contact">{locale === 'es' ? 'Contacto' : 'Contact'}</Link>
          <a href="/llms.txt" rel="noopener noreferrer">
            llms.txt
          </a>
          <a href={siteConfig.social.instagram} rel="noopener noreferrer">
            Instagram
          </a>
          <a href={siteConfig.social.linkedin} rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href={siteConfig.social.tiktok} rel="noopener noreferrer">
            TikTok
          </a>
        </div>
      </div>
    </footer>
  );
}
