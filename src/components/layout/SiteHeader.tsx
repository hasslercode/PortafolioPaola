import { Link, type AppLocale } from '@/i18n/routing';

const navItems = [
  { href: '/' as const, label: { es: 'Inicio', en: 'Home' } },
  { href: '/experiences' as const, label: { es: 'Experiencias', en: 'Experiences' } },
  { href: '/services' as const, label: { es: 'Servicios', en: 'Services' } },
  { href: '/about' as const, label: { es: 'Sobre mí', en: 'About' } },
  { href: '/contact' as const, label: { es: 'Contacto', en: 'Contact' } },
];

export function SiteHeader({ locale }: { locale: AppLocale }) {
  return (
    <header className="site-chrome-header">
      <div className="site-chrome-header__inner">
        <Link href="/" className="site-chrome-header__brand">
          Paola Hoyos
        </Link>
        <nav aria-label={locale === 'es' ? 'Principal' : 'Primary'}>
          <ul className="site-chrome-header__nav">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label[locale]}</Link>
              </li>
            ))}
            <li>
              <Link
                href="/"
                locale={locale === 'es' ? 'en' : 'es'}
                className="site-chrome-header__lang"
                hrefLang={locale === 'es' ? 'en' : 'es-CO'}
              >
                {locale === 'es' ? 'EN' : 'ES'}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
