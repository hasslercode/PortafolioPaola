import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/**
 * SSG-first config for SEO/GEO 2026.
 * - Content is pre-rendered at build time (HTML in first response).
 * - Client JS is reserved for progressive enhancement only.
 * @see https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  async headers() {
    return [
      {
        source: '/assets/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*.(webp|jpg|jpeg|png|svg|ico|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/es',
        permanent: true,
      },
      // Legacy / unprefixed Spanish hubs → localized ES URLs
      { source: '/servicios', destination: '/es/servicios', permanent: true },
      { source: '/servicios/:slug', destination: '/es/servicios/:slug', permanent: true },
      { source: '/experiencias', destination: '/es/experiencias', permanent: true },
      { source: '/experiencias/:slug', destination: '/es/experiencias/:slug', permanent: true },
      { source: '/portafolio', destination: '/es/experiencias', permanent: true },
      { source: '/es/portafolio', destination: '/es/experiencias', permanent: true },
      { source: '/sobre-mi', destination: '/es/sobre-mi', permanent: true },
      { source: '/contacto', destination: '/es/contacto', permanent: true },
      { source: '/tarifas', destination: '/es/servicios', permanent: true },
      { source: '/es/tarifas', destination: '/es/servicios', permanent: true },
      { source: '/blog', destination: '/es/blog', permanent: true },
      { source: '/blog/:slug', destination: '/es/blog/:slug', permanent: true },
      // Old case-study URLs → Experiencias
      { source: '/casos-estudio', destination: '/es/experiencias', permanent: true },
      { source: '/casos-estudio/:slug', destination: '/es/experiencias/:slug', permanent: true },
      { source: '/es/casos-estudio', destination: '/es/experiencias', permanent: true },
      { source: '/es/casos-estudio/:slug', destination: '/es/experiencias/:slug', permanent: true },
      // Common EN unprefixed → EN
      { source: '/services', destination: '/en/services', permanent: true },
      { source: '/services/:slug', destination: '/en/services/:slug', permanent: true },
      { source: '/experiences', destination: '/en/experiences', permanent: true },
      { source: '/experiences/:slug', destination: '/en/experiences/:slug', permanent: true },
      { source: '/portfolio', destination: '/en/experiences', permanent: true },
      { source: '/en/portfolio', destination: '/en/experiences', permanent: true },
      { source: '/case-studies', destination: '/en/experiences', permanent: true },
      { source: '/case-studies/:slug', destination: '/en/experiences/:slug', permanent: true },
      { source: '/en/case-studies', destination: '/en/experiences', permanent: true },
      { source: '/en/case-studies/:slug', destination: '/en/experiences/:slug', permanent: true },
      { source: '/about', destination: '/en/about', permanent: true },
      { source: '/contact', destination: '/en/contact', permanent: true },
      { source: '/pricing', destination: '/en/services', permanent: true },
      { source: '/en/pricing', destination: '/en/services', permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
