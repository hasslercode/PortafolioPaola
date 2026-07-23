import { siteConfig } from '@/config/site';

/** HU-CRO-002 — WhatsApp click-to-chat helper */
export function whatsappUrl(
  text: string,
  phone = siteConfig.contact.whatsapp,
): string | null {
  if (!phone) return null;
  const digits = phone.replace(/\D/g, '');
  if (!digits) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

export function defaultWhatsappMessage(locale: 'es' | 'en' = 'es') {
  return locale === 'es'
    ? 'Hola Paola, quiero cotizar creación de contenido / video para mi marca.'
    : 'Hi Paola, I would like a quote for content / video for my brand.';
}

/** List (regular) vs launch-sale anchors (COP) — HU launch promo */
export const PRICE_LIST_COP = {
  sesion: 0,
  estrategia: 1_800_000,
  produccion: 1_200_000,
  mensual: 4_500_000,
  ugc: 1_500_000,
} as const;

/** Public “desde” = launch discount prices */
export const PRICE_FROM_COP = {
  sesion: 0, // consultoría marcada gratis en UI
  estrategia: 800_000,
  produccion: 600_000,
  mensual: 3_000_000,
  ugc: 550_000,
} as const;

export const LAUNCH_SALE_ACTIVE = true;

export function formatCopAmount(value: number, locale: 'es' | 'en' = 'es') {
  return new Intl.NumberFormat(locale === 'en' ? 'en-US' : 'es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatCopFrom(value: number, locale: 'es' | 'en' = 'es') {
  if (value <= 0) {
    return locale === 'es' ? 'Gratis' : 'Free';
  }
  const formatted = formatCopAmount(value, locale);
  return locale === 'es' ? `Desde ${formatted}` : `From ${formatted}`;
}
