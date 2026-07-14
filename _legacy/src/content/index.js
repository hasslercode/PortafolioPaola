import es from './locales/es.js';
import en from './locales/en.js';

export const locales = { es, en };

export const defaultLocale = 'es';

export function formatTemplate(template, vars = {}) {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => vars[key] ?? '');
}
