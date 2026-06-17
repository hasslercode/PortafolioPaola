/**
 * Google Analytics 4 — event tracking compatible with gtag.js and GTM dataLayer.
 * Events fire only when the corresponding global is present (no-op otherwise).
 */

function pushDataLayer(payload) {
  if (typeof window !== 'undefined' && Array.isArray(window.dataLayer)) {
    window.dataLayer.push(payload);
  }
}

export function trackEvent(eventName, params = {}) {
  if (typeof window === 'undefined') {
    return;
  }

  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }

  pushDataLayer({ event: eventName, ...params });
}

export function trackCtaClick(location, label) {
  trackEvent('cta_click', {
    event_category: 'conversion',
    event_label: label,
    cta_location: location,
  });
}

export function trackWhatsAppClick(location) {
  trackEvent('whatsapp_click', {
    event_category: 'conversion',
    event_label: 'whatsapp',
    click_location: location,
  });
}

export function trackFormStart(source) {
  trackEvent('form_start', {
    event_category: 'lead',
    form_name: 'contact_modal',
    form_source: source,
  });
}

export function trackFormSubmit(channel) {
  trackEvent('form_submit', {
    event_category: 'lead',
    form_name: 'contact_modal',
    lead_channel: channel,
  });
}

export function trackScrollDepth(percent) {
  trackEvent('scroll_depth', {
    event_category: 'engagement',
    scroll_percent: percent,
  });
}
