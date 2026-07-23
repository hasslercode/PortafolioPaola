'use client';

import { useMemo, useState, type FormEvent } from 'react';
import { siteConfig } from '@/config/site';
import {
  defaultWhatsappMessage,
  whatsappUrl,
} from '@/lib/contact';
import {
  trackFormSubmit,
  trackWhatsappClick,
} from '@/features/home/utils/analytics';

type Locale = 'es' | 'en';

const COPY = {
  es: {
    title: 'Briefing rápido',
    lede: 'Cuatro datos. Te abro el correo con el resumen listo para enviar.',
    brand: 'Marca o negocio',
    brandPh: 'Ej. Boutique en Medellín',
    city: 'Ciudad',
    cityPh: 'Ej. Bogotá',
    need: '¿Qué necesitas?',
    needPlaceholder: 'Elige una opción',
    needOptions: [
      'Estrategia de contenido',
      'Edición / producción de video',
      'UGC / videos para marcas',
      'Gestión mensual',
      'Consultoría',
      'Otro',
    ],
    budget: 'Rango de presupuesto (COP / mes)',
    budgetPlaceholder: 'Elige un rango',
    budgetOptions: [
      'Aún no lo sé',
      'Menos de $2.000.000',
      '$2.000.000 – $3.500.000',
      '$3.500.000 – $5.500.000',
      '$5.500.000 – $9.000.000',
      'Más de $9.000.000',
    ],
    submit: 'Enviar briefing por correo',
    whatsapp: 'Prefiero WhatsApp',
    success: 'Listo. Se abrirá tu correo con el briefing. También puedes escribirme por WhatsApp.',
    required: 'Completa este campo',
    calendly: 'Agendar en Calendly',
  },
  en: {
    title: 'Quick briefing',
    lede: 'Four fields. Opens your email with a ready-to-send summary.',
    brand: 'Brand or business',
    brandPh: 'e.g. Boutique in Medellín',
    city: 'City',
    cityPh: 'e.g. Bogotá',
    need: 'What do you need?',
    needPlaceholder: 'Choose an option',
    needOptions: [
      'Content strategy',
      'Video editing / production',
      'UGC / brand videos',
      'Monthly management',
      'Consulting',
      'Other',
    ],
    budget: 'Budget range (COP / month)',
    budgetPlaceholder: 'Choose a range',
    budgetOptions: [
      'Not sure yet',
      'Under $2,000,000',
      '$2,000,000 – $3,500,000',
      '$3,500,000 – $5,500,000',
      '$5,500,000 – $9,000,000',
      'Over $9,000,000',
    ],
    submit: 'Send briefing by email',
    whatsapp: 'Prefer WhatsApp',
    success: 'Done. Your email client will open with the briefing. You can also message on WhatsApp.',
    required: 'Please complete this field',
    calendly: 'Book on Calendly',
  },
} as const;

/**
 * HU-CRO-003 — 4-field briefing form (mailto progressive enhancement).
 * No backend required; works without JS for email via native form attributes where possible.
 */
export function BriefingForm({ locale }: { locale: Locale }) {
  const t = COPY[locale];
  const [brand, setBrand] = useState('');
  const [city, setCity] = useState('');
  const [need, setNeed] = useState('');
  const [budget, setBudget] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const waHref = useMemo(() => {
    const base = defaultWhatsappMessage(locale);
    const detail = [brand && `Marca: ${brand}`, city && `Ciudad: ${city}`, need && `Necesidad: ${need}`, budget && `Presupuesto: ${budget}`]
      .filter(Boolean)
      .join(' | ');
    return whatsappUrl(detail ? `${base}\n${detail}` : base);
  }, [brand, budget, city, locale, need]);

  function validate() {
    const next: Record<string, string> = {};
    if (!brand.trim()) next.brand = t.required;
    if (!city.trim()) next.city = t.required;
    if (!need.trim()) next.need = t.required;
    if (!budget.trim()) next.budget = t.required;
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate()) return;

    const subject =
      locale === 'es'
        ? `Briefing — ${brand.trim()}`
        : `Briefing — ${brand.trim()}`;
    const body = [
      locale === 'es' ? 'Hola Paola,' : 'Hi Paola,',
      '',
      `${t.brand}: ${brand.trim()}`,
      `${t.city}: ${city.trim()}`,
      `${t.need}: ${need}`,
      `${t.budget}: ${budget}`,
    ].join('\n');

    trackFormSubmit('briefing_form');
    setSent(true);
    window.location.href = `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <section className="briefing-form" aria-labelledby="briefing-form-title">
      <span className="briefing-form__tape" aria-hidden="true" />
      <h2 id="briefing-form-title" className="briefing-form__title">
        {t.title}
      </h2>
      <p className="briefing-form__lede">{t.lede}</p>

      {sent ? (
        <p className="briefing-form__success" role="status">
          {t.success}
        </p>
      ) : null}

      <form className="briefing-form__form" onSubmit={onSubmit} noValidate>
        <div className="briefing-form__field">
          <label htmlFor="brief-brand">{t.brand}</label>
          <input
            id="brief-brand"
            name="brand"
            autoComplete="organization"
            placeholder={t.brandPh}
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            aria-invalid={Boolean(errors.brand)}
            aria-describedby={errors.brand ? 'brief-brand-err' : undefined}
          />
          {errors.brand ? (
            <p id="brief-brand-err" className="briefing-form__error">
              {errors.brand}
            </p>
          ) : null}
        </div>

        <div className="briefing-form__field">
          <label htmlFor="brief-city">{t.city}</label>
          <input
            id="brief-city"
            name="city"
            autoComplete="address-level2"
            placeholder={t.cityPh}
            value={city}
            onChange={(e) => setCity(e.target.value)}
            aria-invalid={Boolean(errors.city)}
            aria-describedby={errors.city ? 'brief-city-err' : undefined}
          />
          {errors.city ? (
            <p id="brief-city-err" className="briefing-form__error">
              {errors.city}
            </p>
          ) : null}
        </div>

        <div className="briefing-form__field">
          <label htmlFor="brief-need">{t.need}</label>
          <select
            id="brief-need"
            name="need"
            value={need}
            onChange={(e) => setNeed(e.target.value)}
            aria-invalid={Boolean(errors.need)}
            aria-describedby={errors.need ? 'brief-need-err' : undefined}
          >
            <option value="">{t.needPlaceholder}</option>
            {t.needOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.need ? (
            <p id="brief-need-err" className="briefing-form__error">
              {errors.need}
            </p>
          ) : null}
        </div>

        <div className="briefing-form__field">
          <label htmlFor="brief-budget">{t.budget}</label>
          <select
            id="brief-budget"
            name="budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            aria-invalid={Boolean(errors.budget)}
            aria-describedby={errors.budget ? 'brief-budget-err' : undefined}
          >
            <option value="">{t.budgetPlaceholder}</option>
            {t.budgetOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.budget ? (
            <p id="brief-budget-err" className="briefing-form__error">
              {errors.budget}
            </p>
          ) : null}
        </div>

        <div className="briefing-form__actions">
          <button type="submit" className="btn-pill-premium">
            {t.submit}
          </button>
          {waHref ? (
            <a
              href={waHref}
              className="btn-pill"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsappClick('briefing_form')}
            >
              {t.whatsapp}
            </a>
          ) : null}
          {siteConfig.contact.calendly ? (
            <a
              href={siteConfig.contact.calendly}
              className="btn-pill"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.calendly}
            </a>
          ) : null}
        </div>
      </form>
    </section>
  );
}
