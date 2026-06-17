import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { defaultLocale, formatTemplate, locales } from '../content/index.js';
import {
  OG_IMAGE_ALT,
  OG_IMAGE_URL,
  SITE_URL,
} from '../config/seo.js';

const STORAGE_KEY = 'paola-locale';

const I18nContext = createContext(null);

function readStoredLocale() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored && locales[stored] ? stored : defaultLocale;
  } catch {
    return defaultLocale;
  }
}

function updateDocumentMeta(content, locale) {
  document.documentElement.lang = locale;

  const setMeta = (selector, value) => {
    const el = document.querySelector(selector);
    if (el && value) {
      el.setAttribute('content', value);
    }
  };

  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) {
    canonical.href = `${SITE_URL}/`;
  }

  document.title = content.meta.title;
  setMeta('meta[name="description"]', content.meta.description);
  setMeta('meta[property="og:title"]', content.meta.ogTitle);
  setMeta('meta[property="og:description"]', content.meta.ogDescription);
  setMeta('meta[property="og:locale"]', locale === 'en' ? 'en_US' : 'es_CO');
  setMeta('meta[property="og:url"]', `${SITE_URL}/`);
  setMeta('meta[property="og:image"]', OG_IMAGE_URL);
  setMeta('meta[property="og:image:secure_url"]', OG_IMAGE_URL);
  setMeta('meta[property="og:image:alt"]', OG_IMAGE_ALT);
  setMeta('meta[name="twitter:title"]', content.meta.twitterTitle);
  setMeta('meta[name="twitter:description"]', content.meta.twitterDescription);
  setMeta('meta[name="twitter:image"]', OG_IMAGE_URL);
  setMeta('meta[name="twitter:image:alt"]', OG_IMAGE_ALT);
}

export function I18nProvider({ children }) {
  const [locale, setLocaleState] = useState(readStoredLocale);

  const content = locales[locale];

  const setLocale = useCallback((nextLocale) => {
    if (!locales[nextLocale]) {
      return;
    }
    setLocaleState(nextLocale);
    try {
      localStorage.setItem(STORAGE_KEY, nextLocale);
    } catch {
      // ignore storage errors
    }
  }, []);

  const t = useCallback((template, vars) => formatTemplate(template, vars), []);

  useEffect(() => {
    updateDocumentMeta(content, locale);
  }, [content, locale]);

  const value = useMemo(
    () => ({ locale, content, setLocale, t }),
    [locale, content, setLocale, t],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
}
