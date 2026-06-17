const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

export function initGa4() {
  if (!MEASUREMENT_ID || typeof window === 'undefined') {
    return false;
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag(...args) {
    window.dataLayer.push(args);
  };

  window.gtag('js', new Date());
  window.gtag('config', MEASUREMENT_ID, {
    send_page_view: true,
    anonymize_ip: true,
  });

  if (!document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}"]`)) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
    document.head.appendChild(script);
  }

  return true;
}

export function isGa4Enabled() {
  return Boolean(MEASUREMENT_ID);
}
