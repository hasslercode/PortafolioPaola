# TODO — Decisiones de producto (bloquean impacto máximo)

Estas acciones **no se implementaron en código** porque requieren confirmación de Paola / negocio / legal. Cada ítem incluye justificación y archivos a tocar cuando se apruebe.

Última actualización: 2026-08-01

---

## P0 — Conversión y confianza (hacer primero)

### TODO-01 — WhatsApp de producción
- **Decisión:** Definir número E.164 real (ej. `57300…`) y setear `NEXT_PUBLIC_WHATSAPP_E164` en Vercel.
- **Por qué:** En Colombia el ICP (pymes/emprendedores) convierte mejor por WhatsApp que por `mailto:`. El modal ya soporta el canal; hoy suele estar oculto si el env está vacío.
- **Archivos:** Vercel env · `.env.example` (doc) · verificar `src/config/site.ts`, `src/lib/contact.ts`, `Modals.jsx`.
- **Criterio de done:** Canal WhatsApp visible en modal + página contacto en prod; evento analytics `whatsapp` en GA4.

### TODO-02 — Correo profesional `@paolahoyos.com`
- **Decisión:** Crear/migrar mailbox (Google Workspace / Zoho / similar) y reemplazar `pahoyoscardona@gmail.com` en UI + schema.
- **Por qué:** Reclutadores y empresas (Bancolombia, Globant, agencias) perciben Gmail como menos senior. EEAT / trust.
- **Archivos:** `src/config/site.ts` · `content/home/{es,en}.json` · `messages/*.json` · `public/llms.txt` · JSON-LD Person email.
- **Criterio de done:** Un solo email canónico en sitio + firmas LinkedIn/IG bio alineadas.

### TODO-03 — Calendly / agenda (opcional, sin funnel email)
- **Decisión:** ¿Ofrecer “Agendar 15 min” además de correo/IG/WA?
- **Por qué:** Reduce fricción vs escribir un email largo. No requiere newsletter.
- **Archivos:** `NEXT_PUBLIC_CALENDLY_URL` · ya cableado en `Modals.jsx`.
- **Criterio de done:** Link “Agendar” visible solo si la URL está configurada.

---

## P1 — Marca personal / hiring enterprise

### TODO-04 — ICP dual: freelance vs empleo
- **Decisión:** ¿El sitio debe optimizar solo “contrátame como proveedora”, también “ábreme un rol in-house”, o ambos con secciones separadas?
- **Por qué:** Tarifas “desde $60k” ayudan a pymes pero pueden sub-posicionar frente a talento senior en Rappi/MELI/Globant. Un bloque “Para reclutadores” resuelve sin matar CRO freelance.
- **Archivos (cuando se decida):** `content/home/es.json` (About / WhyWorkWithMe) · `AboutHubView` · posible ruta `/es/sobre-mi#reclutadores` · LinkedIn CTA en hero About.
- **Propuesta de copy (borrador):**
  > “Además de proyectos freelance, estoy abierta a roles de Content Strategy / Social / Brand Content en empresas de Colombia y LatAm. Experiencia documentada en retail/consumo (+1.3M vistas orgánicas en campañas destacadas).”

### TODO-05 — Timeline laboral / CV descargable
- **Decisión:** Publicar sección “Experiencia” (roles, fechas, alcance) y/o PDF CV distinto de `portafolio.pdf`.
- **Por qué:** Hoy no hay historial empleador→rol→fechas. Reclutadores no pueden calificar seniority en 30 s.
- **Archivos:** nuevo contenido MDX o JSON · `AboutHubView` · link en footer/autor · opcional `/public/pdf/cv-paola-hoyos.pdf`.
- **No inventar:** Solo datos reales que Paola apruebe.

### TODO-06 — Universidad / `alumniOf` en schema
- **Decisión:** Confirmar nombre de universidad + título de maestría/diplomado.
- **Por qué:** Bloqueado en `src/lib/seo/jsonld.ts` (TODO HU-EEAT-001). Mejora EEAT sin inventar credenciales.
- **Archivos:** `jsonld.ts` · copy `whyWorkWithMe` en home · About.

### TODO-07 — Framing de logos de marca
- **Decisión:** ¿Mantener logo wall + disclaimer, o liderar con “ecosistema Parque Alegra / Parque Arauco” antes de nombres globales?
- **Por qué:** Transparencia ya existe (bien). Algunos reclutadores pueden leer logos como “agencia retainer” y luego dudar. Un eyebrow consistente reduce riesgo.
- **Archivos:** `FeaturedBrands.jsx` · case studies MDX · home campaigns copy.

### TODO-08 — Caso MaxGordos
- **Decisión:** Permiso para página de experiencia dedicada (`HU-CONT-013`).
- **Archivos:** `content/case-studies/es|en/maxgordos.mdx` · registry · home campaigns.

---

## P2 — SEO ops / GEO off-site

### TODO-09 — Google Business Profile
- **Decisión:** Sí/No según `docs/seo/GBP-DECISION.md`.
- **Por qué:** Ayuda local Medellín; irrelevante si el posicionamiento es 100% remoto nacional.

### TODO-10 — EN blog: traducir o mantener noindex
- **Decisión:** Invertir en EN real vs dejar `noIndex` en posts EN.
- **Por qué:** Hreflang hacia EN noindex diluye señal; tráfico EN/USA empieza a aparecer en GSC.
- **Archivos:** `content/blog/en/*` · `blog/[slug]/page.tsx`.

### TODO-11 — Rename `/blog` → `/recursos` (301)
- **Decisión:** Migración 301 + nav copy (`HU-IA-011`).
- **Por qué:** Mejor intención comercial; costo de migración.

### TODO-12 — Precios públicos: política de actualización
- **Decisión:** Quién actualiza rangos COP en blog vs `/tarifas` y con qué frecuencia.
- **Por qué:** Inconsistencias dañan trust y pueden generar expectativas incorrectas.

### TODO-13 — Outreach / entity off-page
- **Decisión:** Priorizar menciones en LinkedIn articles, podcasts CO, directorios, guest posts (playbook ya en `OUTREACH-PLAYBOOK.md`).
- **Por qué:** GEO y EEAT dependen fuerte de menciones de terceros; el sitio solo no basta para ChatGPT/Perplexity.

---

## Checklist de aprobación rápida

| ID | Apruebo (sí/no/fecha) | Notas |
|---|---|---|
| TODO-01 WhatsApp | | |
| TODO-02 Mailbox dominio | | |
| TODO-03 Calendly | | |
| TODO-04 ICP dual | | |
| TODO-05 CV / timeline | | |
| TODO-06 Universidad | | |
| TODO-07 Framing logos | | |
| TODO-08 MaxGordos | | |
| TODO-09 GBP | | |
| TODO-10 EN blog | | |
| TODO-11 /recursos | | |
| TODO-12 Política precios | | |
| TODO-13 Outreach owner | | |
