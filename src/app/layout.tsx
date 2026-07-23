import type { ReactNode } from 'react';
import type { Metadata, Viewport } from 'next';
import { siteConfig } from '@/config/site';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Estrategia Digital`,
    template: `%s | ${siteConfig.name}`,
  },
  applicationName: siteConfig.name,
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/icon-paola.png', type: 'image/png' },
    ],
    apple: '/icon-paola.png',
  },
  manifest: '/manifest.webmanifest',
};

export const viewport: Viewport = {
  themeColor: '#faf7f5',
  width: 'device-width',
  initialScale: 1,
};

/** Locale-agnostic shell — fonts/theme live under [locale] */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
