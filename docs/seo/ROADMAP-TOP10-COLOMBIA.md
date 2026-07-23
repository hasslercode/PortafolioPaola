# Roadmap Top 10 Google Colombia — paolahoyos.com

**Horizonte:** 6–12 meses  
**Mercado:** Google Colombia (`es-CO`)  
**ICP:** pymes, emprendedores, marcas personales y retail que buscan contenido, video, UGC y estrategia  
**Veredicto:** chasis técnico maduro; corpus ~130–250 palabras/página. Sin profundidad de contenido + enlazado + conversión, Top 10 comercial es improbable.

---

## 0. Diagnóstico ejecutivo

| Área | Estado | Bloqueador |
|------|--------|------------|
| Arquitectura SSG / hreflang / redirects | Fuerte | No |
| JSON-LD base | Medio | serviceType obsoleto, Reviews débiles |
| Contenido comercial | Crítico | Outline-level (~28–99 palabras cuerpo) |
| Keywords | Mal alineadas | Persigue “community manager” commodity vs oferta real (estrategia + producción + UGC/video) |
| Enlazado interno | Crítico | Hub servicios sin links a detalle; blog oculto; MDX sin clusters |
| Local SEO CO | Débil | Geo Medellín en meta; sin landings ciudad; NAP incompleto |
| CRO | Débil | Sin WhatsApp/form; precios “Cotización”; fricción |
| EN | Contaminante | Bodies ES bajo `/en/blog` → riesgo hreflang |

### Por qué no rankea hoy (Search Quality / Ahrefs lens)

1. **Helpful Content / EEAT:** páginas money-intent sin profundidad, sin fuentes, sin “experience” demostrable en prosa.
2. **Query–document fit:** queries de compra (“edición de video redes”, “creador UGC Colombia”) no tienen landing dedicada.
3. **Topical authority:** 5 posts thin ≠ cluster. Competidores agencias/UGC publican guías 2–4k palabras.
4. **Internal PageRank:** equity atrapado en home/servicios hub; blog soft-hidden.
5. **CWV social:** OG 1.7MB degrada shares (no LCP home, sí CTR social).

---

## 1. Nueva estrategia de keywords (destruye la actual)

### Posicionamiento incorrecto actual

Home + blog empujan **“community manager Colombia”** (precio-shopper, alta competencia, commoditized). Oferta real = **estratega + producción/edición + gestión premium + UGC/video para marcas**.

### Posicionamiento correcto (Money + Moat)

**Entidad primaria:** Paola Hoyos — estratega de contenido y producción audiovisual para marcas/emprendedores en Colombia.

**Categoría a dominar (12 meses):**  
`creación de contenido + videos para redes + estrategia de contenido + UGC Colombia`  
(no “community manager barato”).

### Mapa de clusters (prioridad)

| Cluster | Intent | Keywords núcleo | Página dinero |
|---------|--------|-----------------|---------------|
| A. Estrategia de contenido | Commercial | estrategia de contenido colombia, calendario de contenidos, pilares de contenido | `/servicios/estrategia-contenido` + pillar |
| B. Producción / edición video | Commercial | edición de reels colombia, edición de videos para redes, grabación profesional reels | `/servicios/produccion-contenido` + pillar |
| C. Videos para marcas / UGC | Commercial | creador ugc colombia, videos ugc para marcas, contenido ugc emprendedores | nueva landing servicio/UGC |
| D. Marketing emprendedores | Commercial/Informational | marketing para emprendedores colombia, contenido para pymes | pillar + blog |
| E. Gestión mensual premium | Commercial | gestión de redes sociales colombia, community + estrategia (comparación) | `/servicios/gestion-mensual` |
| F. Local geo | Local+Commercial | … medellín / bogotá / barranquilla | landings ciudad |
| G. Comparativas | Decision | community manager vs estratega, agencia vs freelance | blog decision |

**De-priorizar:** ranking genérico “community manager colombia” como head term. Mantener 1 guía de tarifas como **puerta de entrada** que redirige a estratega/producción (bridge, no identidad).

---

## 2. Arquitectura SEO objetivo (12 meses)

```
/es
├── /servicios                    ← hub comercial (Ofertas + links detalle)
│   ├── /sesion-estrategica
│   ├── /estrategia-contenido
│   ├── /produccion-contenido     ← expandir a video/UGC
│   ├── /gestion-mensual
│   └── /ugc-videos-marcas        ← NUEVO (Fase 1)
├── /experiencias/[marca]
├── /recursos                     ← rename conceptual del blog (nav visible)
│   ├── pilares (4–6)
│   ├── guías (40–60)
│   ├── comparativas (8–12)
│   └── glosario (15–20)
├── /ciudades                     ← NUEVO hub
│   ├── /medellin
│   ├── /bogota
│   └── /barranquilla
├── /verticales                   ← NUEVO
│   ├── /emprendedores
│   ├── /retail-moda
│   ├── /restaurantes-fnb
│   └── /marcas-personales
├── /sobre-mi                     ← EEAT profundo
├── /contacto                     ← WhatsApp + form
└── /legal/{privacidad,terminos,aviso}
```

**Inventario URL completo:** `docs/seo/CONTENT-FACTORY-100.md` (~90–110 URLs ES prioritarias; EN fase posterior).

---

## 3. Roadmap priorizado por impacto

Escala impacto: **S/M/L/XL** · Dificultad: **1–5**

### P0 — Semana 0–2 (fundación) · Impacto XL · Diff 2

| # | Acción | Impacto | Diff | Por qué Google | Archivos |
|---|--------|---------|------|----------------|----------|
| P0.1 | OG → JPEG ≤100KB | M | 1 | CTR social / shares; menos peso assets | `metadata.ts`, `public/assets/og-paola.jpg` |
| P0.2 | Corregir `serviceType` schema | M | 1 | Entity clarity; evita señales de oferta fantasma | `jsonld.ts` |
| P0.3 | Blog en nav + footer + home preview | L | 2 | Discovery + internal links | `Header.jsx`, `Footer.jsx`, `HomeExperience`, `page.tsx` |
| P0.4 | Hub servicios → links a `/servicios/[slug]` | L | 2 | PageRank a money pages | `ContentHubViews.tsx`, `services/page.tsx` |
| P0.5 | Meta home/servicios con Colombia + intent real | M | 1 | Query matching SERP | `home/es.json`, `messages/es.json`, `page.tsx` |
| P0.6 | Subir priority sitemap blog | M | 1 | Crawl budget relativo | `sitemap.ts` |
| P0.7 | Fix link MDX `/tarifas` → `/servicios` | M | 1 | Evita soft redirect equity loss | blog MDX |
| P0.8 | Keywords home alineadas a oferta | M | 1 | Relevancia temática | `page.tsx`, `site.ts` |

### P1 — Mes 1–2 (contenido money) · Impacto XL · Diff 3–4

| # | Acción | Impacto | Diff | Por qué Google |
|---|--------|---------|------|----------------|
| P1.1 | Expandir 4 servicios a 1.200–1.800 palabras ES + FAQ 6–8 | XL | 3 | Satisfacción intent comercial |
| P1.2 | 4 pilares 2.000–3.500 palabras (clusters A–D) | XL | 4 | Topical authority / hub spokes |
| P1.3 | Restaurar `/tarifas` como página real con rangos COP “desde” | L | 3 | Commercial intent + EEAT transparencia |
| P1.4 | WhatsApp CTA + form briefing | L | 3 | Conversión (no ranking directo; sí engagement/UX signals) |
| P1.5 | Casos: narrativa 800+ palabras + métricas; TOTTO/MaxGordos | L | 3 | Experience proofs |
| P1.6 | noindex temporal EN blog hasta traducción real | M | 2 | Evita hreflang dilution |

### P2 — Mes 2–5 (fábrica 40–60 URLs) · Impacto XL · Diff 4

| # | Acción | Impacto |
|---|--------|---------|
| P2.1 | 30–40 long-tails cluster (reels, ugc, emprendedores, ROI) | XL |
| P2.2 | 3 landings ciudad + 4 verticales | L |
| P2.3 | 8 comparativas decision-intent | L |
| P2.4 | Glosario 15 términos (GEO/AI citation) | M |
| P2.5 | `VideoObject` + embeds reels en experiencias | M |
| P2.6 | Legal pages (privacidad/términos) | M (confianza) |

### P3 — Mes 5–12 (autoridad + links) · Impacto L–XL · Diff 4–5

| # | Acción | Impacto |
|---|--------|---------|
| P3.1 | Guest/PR en medios CO (Branch, blogs marketing) | XL |
| P3.2 | YouTube/IG → site (owned media loop) | L |
| P3.3 | GBP si hay NAP físico o service-area business | M |
| P3.4 | EN real (solo si hay demanda internacional) | M |
| P3.5 | Ampliar a ~100 URLs ES indexables de calidad | XL |

---

## 4. EEAT — qué exige el Quality Rater Guidelines

| Señal | Hoy | Objetivo |
|-------|-----|----------|
| Experience | Logos + métricas | Proceso, behind-the-scenes, “yo grabé/edité X” en 1ª persona |
| Expertise | Job title genérico | Maestría + universidad + diplomados con nombres reales |
| Authoritativeness | Brand mentions | Citas externas, podcasts, colaboraciones documentadas |
| Trust | Gmail personal | Email @paolahoyos.com, legales, precios “desde”, disclosures |

---

## 5. Core Web Vitals / velocidad

| Señal | Acción |
|-------|--------|
| LCP | Mantener hero static webp + preload (ya OK) |
| INP | Reducir observers/sparkles en mobile; defer |
| CLS | Reservar espacio cards/imágenes |
| OG/PDF | OG ≤100KB; PDF lazy (ya) |
| JS | Home client island pesado — auditar TBT en PSI mobile |

---

## 6. CRO (convierte el tráfico que ganes)

1. CTA primario: WhatsApp Business CO (click-to-chat con mensaje prearmado).  
2. Secundario: form 4 campos (marca, ciudad, necesidad, presupuesto rango).  
3. Precios “Desde $X COP” en hub + Offer schema.  
4. Social proof cerca de CTA (testimonio + métrica).  
5. Página `/contacto` crawlable ≠ solo modal.

---

## 7. Local SEO Colombia

- Landings: Medellín (residencia), Bogotá (demanda), Barranquilla (caso Parque Alegra).  
- Copy: “atención remota nacional · base Medellín”.  
- Schema: mantener ProfessionalService; añadir `areaServed` ciudades.  
- NAP: teléfono/WhatsApp en footer + contact.  
- No pelear Local Pack sin dirección pública salvo Service Area Business en GBP.

---

## 8. Schema.org backlog

| Tipo | Dónde | Prioridad |
|------|-------|-----------|
| Service + Offer con `minPrice` | servicios | P1 |
| FAQPage (ya) | expandir | P1 |
| VideoObject | experiencias/reels | P2 |
| HowTo | guías proceso | P2 |
| ItemList | hubs | P1 |
| Review + reviewRating | home | P1 |
| LocalBusiness/ProfessionalService limpio | sitewide | P0 |

---

## 9. KPIs 6–12 meses

| KPI | Mes 3 | Mes 6 | Mes 12 |
|-----|-------|-------|--------|
| URLs indexadas calidad (≥800 palabras) | 25 | 50 | 90+ |
| Keywords Top 10 CO (cluster A–D) | 5 | 20 | 50+ |
| Clics orgánicos GSC /mes | +3× baseline | +8× | +15× |
| Leads orgánico (WA/form) | 8+/mes | 20+/mes | 40+/mes |
| Dominio referring domains | +10 | +25 | +50 |

---

## 10. Orden de ejecución semanal (primeros 90 días)

**Semanas 1–2:** P0 técnico (este PR) + brief WhatsApp + brief precios “desde”.  
**Semanas 3–6:** Expandir 4 servicios + 2 pilares (producción/UGC + estrategia).  
**Semanas 7–10:** 12 long-tails + 2 ciudades + tarifas reales.  
**Semanas 11–14:** 12 long-tails + verticales + casos profundos.  
**Ongoing:** 2–4 piezas/semana + 2 outreach links/mes.

---

## Relacionados

- `docs/seo/BACKLOG-HU-TDD.md` — **plan completo en HUs (Como/Quiero/Para) + TDD Dado/Cuando/Entonces**  
- `docs/seo/CONTENT-FACTORY-100.md` — inventario de URLs  
- `docs/seo/IMPLEMENTATION-SNIPPETS.md` — código listo por recomendación  
- `docs/architecture/SEO-ROUTES.md` — rutas canónicas actuales  
