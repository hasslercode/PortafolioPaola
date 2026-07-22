'use client';

import Services from '@/features/home/sections/Services';
import TargetAudience from '@/features/home/sections/TargetAudience';
import VerticalArtConnector from '@/features/home/components/VerticalArtConnector';
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
        { href: '#inversion', label: 'Plans' },
      ]
    : [
        { href: '#servicios', label: 'Servicios' },
        { href: '#inversion', label: 'Planes' },
      ];

  return (
    <>
      <nav
        className="container servicios-hub-nav"
        aria-label={isEn ? 'On this page' : 'En esta página'}
      >
        <ul>
          {pillars.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="badge-pill-wow">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <Services linked compact />
      <VerticalArtConnector mark="sparkle" />
      <TargetAudience />
    </>
  );
}
