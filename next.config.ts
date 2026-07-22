import path from 'path';
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');
const emptyModule = path.join(__dirname, 'src/lib/empty-module.js');

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
    // Cap large breakpoints — hero LCP is ~360–600 CSS px, not 1920.
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  // Next ships baseline polyfills unconditionally (browserslist does not gate them).
  // Lighthouse "Legacy JavaScript" (~12 KiB) — safe to stub for our modern browser targets.
  // @see https://github.com/vercel/next.js/issues/86785
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '../build/polyfills/polyfill-module': emptyModule,
      'next/dist/build/polyfills/polyfill-module': emptyModule,
    };
    return config;
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
      // Old service slugs → hub / new plans
      { source: '/es/servicios/community-manager', destination: '/es/servicios/gestion-mensual', permanent: true },
      { source: '/es/servicios/creacion-contenido', destination: '/es/servicios/produccion-contenido', permanent: true },
      { source: '/es/servicios/estrategia-digital', destination: '/es/servicios/estrategia-contenido', permanent: true },
      { source: '/es/servicios/email-marketing', destination: '/es/servicios', permanent: true },
      { source: '/es/servicios/cobertura-eventos', destination: '/es/servicios', permanent: true },
      { source: '/es/servicios/storytelling', destination: '/es/servicios/sesion-estrategica', permanent: true },
      { source: '/es/servicios/asesoria', destination: '/es/servicios/sesion-estrategica', permanent: true },
      { source: '/es/servicios/consultoria', destination: '/es/servicios/estrategia-contenido', permanent: true },
      { source: '/en/services/community-manager', destination: '/en/services/monthly-management', permanent: true },
      { source: '/en/services/content-creation', destination: '/en/services/content-production', permanent: true },
      { source: '/en/services/digital-strategy', destination: '/en/services/content-strategy', permanent: true },
      { source: '/en/services/email-marketing', destination: '/en/services', permanent: true },
      { source: '/en/services/event-coverage', destination: '/en/services', permanent: true },
      { source: '/en/services/storytelling', destination: '/en/services/strategy-session', permanent: true },
      { source: '/en/services/advisory', destination: '/en/services/strategy-session', permanent: true },
      { source: '/en/services/consulting', destination: '/en/services/content-strategy', permanent: true },
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
