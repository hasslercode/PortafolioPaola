'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { analyticsConfig } from '@/features/analytics/config';
import { trackBlogView, trackContactPageView } from '@/features/home/utils/analytics';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const GA_ID = analyticsConfig.ga4Id;

function sendPageView(path: string) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;

  const pagePath = `${path}${window.location.search}`;
  window.gtag('event', 'page_view', {
    page_path: pagePath,
    page_location: window.location.href,
    page_title: document.title,
  });

  const blogMatch = path.match(/\/blog\/([^/]+)\/?$/);
  if (blogMatch?.[1]) {
    trackBlogView(blogMatch[1], pagePath);
  }

  if (/\/(contact|contacto)\/?$/.test(path)) {
    trackContactPageView(pagePath);
  }
}

/** SPA page views + content events after client navigations. */
function Ga4RouteTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!GA_ID) return;

    const fire = () => {
      if (typeof window.gtag !== 'function') return;
      sendPageView(pathname);
    };

    if (typeof window.gtag === 'function') {
      fire();
      return;
    }

    // Script may still be loading (afterInteractive)
    const id = window.setInterval(() => {
      if (typeof window.gtag === 'function') {
        window.clearInterval(id);
        fire();
      }
    }, 100);

    const timeout = window.setTimeout(() => window.clearInterval(id), 8000);
    return () => {
      window.clearInterval(id);
      window.clearTimeout(timeout);
    };
  }, [pathname]);

  return null;
}

/**
 * Loads gtag.js for GA4 and tracks App Router navigations.
 * Initial config uses send_page_view: false — Ga4RouteTracker owns page_view.
 */
export function GoogleAnalytics() {
  if (!GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            anonymize_ip: true,
            send_page_view: false
          });
        `}
      </Script>
      <Ga4RouteTracker />
    </>
  );
}
