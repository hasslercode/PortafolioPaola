/**
 * Analytics stubs for Phase 2 UI parity.
 * Real providers wire in later without changing call sites.
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

export function trackCtaClick(location: string, label: string) {
  trackEvent('cta_click', {
    event_category: 'conversion',
    event_label: label,
    cta_location: location,
  });
}

export function trackWhatsAppClick(location: string) {
  trackEvent('whatsapp_click', {
    event_category: 'conversion',
    event_label: 'whatsapp',
    click_location: location,
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

export function trackSectionView(section: string) {
  trackEvent('section_view', { section });
}

export function trackOutboundClick(url: string) {
  trackEvent('outbound_click', { url });
}
