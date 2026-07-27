/**
 * Google Analytics 4 — event helpers (gtag.js + dataLayer).
 * No-ops until GA4 scripts hydrate `window.gtag`.
 */

function pushDataLayer(payload: Record<string, unknown>) {
  if (typeof window !== 'undefined' && Array.isArray(window.dataLayer)) {
    window.dataLayer.push(payload);
  }
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(eventName: string, params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return;
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
  pushDataLayer({ event: eventName, ...params });
}

/** Primary conversion CTAs: Hablemos / Contactar / header pill */
export function trackCtaClick(location: string, label: string) {
  trackEvent('cta_click', {
    event_category: 'conversion',
    event_label: label,
    cta_location: location,
  });
  // Distinct conversion event for contact intent (mark as key event in GA4)
  trackEvent('hablemos_click', {
    event_category: 'conversion',
    event_label: label,
    cta_location: location,
  });
}

export function trackFormStart(source: string) {
  trackEvent('form_start', {
    event_category: 'conversion',
    form_source: source,
  });
}

export function trackFormSubmit(source: string) {
  trackEvent('form_submit', {
    event_category: 'conversion',
    form_source: source,
  });
}

export function trackWhatsappClick(location: string) {
  trackEvent('cta_whatsapp', {
    event_category: 'conversion',
    cta_location: location,
  });
}

export function trackSectionView(section: string) {
  trackEvent('section_view', { section });
}

export function trackOutboundClick(url: string) {
  trackEvent('outbound_click', { url });
}

export function trackScrollDepth(percent: number) {
  trackEvent('scroll_depth', {
    event_category: 'engagement',
    scroll_percent: percent,
  });
}

/** Fired when a blog article route is viewed */
export function trackBlogView(slug: string, pagePath?: string) {
  trackEvent('blog_view', {
    event_category: 'engagement',
    blog_slug: slug,
    page_path: pagePath,
  });
}

/** Fired when a user clicks into a blog article from a listing */
export function trackBlogClick(slug: string, location: string) {
  trackEvent('blog_click', {
    event_category: 'engagement',
    blog_slug: slug,
    click_location: location,
  });
}

export function trackContactPageView(pagePath?: string) {
  trackEvent('contact_view', {
    event_category: 'conversion',
    page_path: pagePath,
  });
}
