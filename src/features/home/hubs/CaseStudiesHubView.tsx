'use client';

import FeaturedBrands from '@/features/home/sections/FeaturedBrands';
import ResultsProof from '@/features/home/sections/ResultsProof';
import { PortfolioPdfStrip } from '@/features/home/hubs/PortfolioHubView';
import VerticalArtConnector from '@/features/home/components/VerticalArtConnector';
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
        className="container experiencias-hub-nav"
        aria-label={isEn ? 'On this page' : 'En esta página'}
      >
        <ul>
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
      <VerticalArtConnector mark="sparkle" />
      <ResultsProof onOpenContact={(source: string) => openContact(source)} />
      <VerticalArtConnector mark="heart" />
      <PortfolioPdfStrip />
    </>
  );
}
