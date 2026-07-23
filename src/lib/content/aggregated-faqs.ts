import 'server-only';

import { getAllServices } from '@/content/loaders';
import type { SiteLocale } from '@/config/site';

const PRICING_FAQS: Record<
  SiteLocale,
  Array<{ question: string; answer: string }>
> = {
  es: [
    {
      question: '¿Estos precios son definitivos?',
      answer:
        'No. Son anclas “desde” en COP. La cotización final depende de volumen, duración, revisiones y alcance.',
    },
    {
      question: '¿Por qué no un menú fijo?',
      answer:
        'Un Reel de 15s y un testimonio de 60s no son el mismo trabajo. Las anclas ayudan a presupuestar; el alcance fija el precio.',
    },
    {
      question: '¿Por dónde empiezo?',
      answer:
        '¿Necesitas claridad? Sesión estratégica. ¿Ya sabes qué decir? Producción. ¿Quieres que opere el mes? Gestión mensual.',
    },
  ],
  en: [
    {
      question: 'Are these final prices?',
      answer:
        'No. They are “from” anchors in COP. The final quote depends on volume, duration, revisions and scope.',
    },
    {
      question: 'Why not publish a fixed menu?',
      answer:
        'A 15-second Reel and a 60-second testimonial are not the same job. Anchors help you budget; scope locks the price.',
    },
    {
      question: 'Where should I start?',
      answer:
        'Need clarity? Strategy session. Know what to say? Production. Want the month operated? Monthly management.',
    },
  ],
};

/** HU-EEAT-007 — aggregate service + pricing FAQs, dedupe by question. */
export async function buildAggregatedFaqs(locale: SiteLocale) {
  const services = await getAllServices(locale);
  const fromServices = services.flatMap((service) => service.faq ?? []);
  const combined = [...PRICING_FAQS[locale], ...fromServices];

  const seen = new Set<string>();
  const result: Array<{ question: string; answer: string }> = [];

  for (const item of combined) {
    const key = item.question.toLowerCase().trim();
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(item);
  }

  return result;
}
