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

/** Public “desde” anchors (COP) — current offer */
export const PRICE_FROM_COP = {
  sesion: 60_000,
  estrategia: 180_000,
  produccion: 180_000,
  mensual: 1_200_000,
  ugc: 550_000,
} as const;

/** List anchors kept for optional future promo UI */
export const PRICE_LIST_COP = {
  sesion: 60_000,
  estrategia: 180_000,
  produccion: 180_000,
  mensual: 1_200_000,
  ugc: 550_000,
} as const;

export const LAUNCH_SALE_ACTIVE = false;

export function formatCopAmount(value: number, locale: 'es' | 'en' = 'es') {
  return new Intl.NumberFormat(locale === 'en' ? 'en-US' : 'es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatCopFrom(
  value: number,
  locale: 'es' | 'en' = 'es',
  opts?: { perMonth?: boolean },
) {
  if (value <= 0) {
    return locale === 'es' ? 'Gratis' : 'Free';
  }
  const formatted = formatCopAmount(value, locale);
  const base = locale === 'es' ? `Desde ${formatted}` : `From ${formatted}`;
  if (opts?.perMonth) {
    return locale === 'es' ? `${base}/mes` : `${base}/mo`;
  }
  return base;
}
