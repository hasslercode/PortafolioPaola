'use client';

import Services from '@/features/home/sections/Services';
import TargetAudience from '@/features/home/sections/TargetAudience';
import SectionDivider from '@/features/home/components/SectionDivider';
import { useI18n } from '@/features/home/HomeContentProvider';

/**
 * Servicios hub — offerings + audience.
 * Inversión packs live on the same page (fused) below this block.
 */
export function ServicesHubView() {
  const { locale } = useI18n();
  const isEn = locale === 'en';

  const pillars = isEn
    ? [
        { href: '#servicios', label: 'Services' },
        { href: '#inversion', label: 'Investment' },
      ]
    : [
        { href: '#servicios', label: 'Servicios' },
        { href: '#inversion', label: 'Inversión' },
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
          {pillars.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="badge-pill-wow">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div>
        <Services linked />
      </div>
      <SectionDivider />
      <TargetAudience />
    </>
  );
}
