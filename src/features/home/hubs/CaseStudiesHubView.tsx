'use client';

import FeaturedBrands from '@/features/home/sections/FeaturedBrands';
import ResultsProof from '@/features/home/sections/ResultsProof';
import SectionDivider from '@/features/home/components/SectionDivider';
import { PortfolioPdfStrip } from '@/features/home/hubs/PortfolioHubView';
import { useContentActions } from '@/features/home/PageChrome';
import { useI18n } from '@/features/home/HomeContentProvider';

/**
 * Experiencias consolidado:
 * 1) Campañas / marcas
 * 2) Resultados + reels (una sola vez)
 * 3) PDF del portafolio
 */
export function CaseStudiesHubView() {
  const { openContact } = useContentActions();
  const { locale } = useI18n();
  const isEn = locale === 'en';

  const anchors = isEn
    ? [
        { href: '#experiencias-destacadas', label: 'Campaigns' },
        { href: '#resultados', label: 'Results' },
        { href: '#portafolio', label: 'PDF' },
      ]
    : [
        { href: '#experiencias-destacadas', label: 'Campañas' },
        { href: '#resultados', label: 'Resultados' },
        { href: '#portafolio', label: 'PDF' },
      ];

  return (
    <>
      <nav
        className="container"
        aria-label={isEn ? 'On this page' : 'En esta página'}
        style={{ paddingTop: '0.5rem', paddingBottom: '0.5rem' }}
      >
        <ul
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.75rem 1.25rem',
            listStyle: 'none',
            padding: 0,
            margin: 0,
          }}
        >
          {anchors.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="badge-pill-wow">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <FeaturedBrands hubMode />
      <SectionDivider variant="symbol" />
      <ResultsProof onOpenContact={(source: string) => openContact(source)} />
      <SectionDivider />
      <PortfolioPdfStrip />
    </>
  );
}
