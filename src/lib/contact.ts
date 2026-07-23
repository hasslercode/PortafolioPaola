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

/** Investment anchors (COP) — transparent “desde”, final quote by scope */
export const PRICE_FROM_COP = {
  sesion: 0, // consultoría marcada gratis en UI
  estrategia: 1_200_000,
  produccion: 800_000,
  mensual: 2_500_000,
} as const;

export function formatCopFrom(value: number, locale: 'es' | 'en' = 'es') {
  if (value <= 0) {
    return locale === 'es' ? 'Gratis' : 'Free';
  }
  const formatted = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(value);
  return locale === 'es' ? `Desde ${formatted}` : `From ${formatted}`;
}
