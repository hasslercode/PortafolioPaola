# Auditoría SEO / CRO / Marca personal — Paola Hoyos (agosto 2026)

Documento ejecutable. Prioriza señales ya validadas en Google Search Console y los tres outcomes pedidos: **más visibilidad orgánica**, **más oportunidades laborales**, **más credibilidad**.

---

## 1. Resumen ejecutivo

El sitio ya tiene una base técnica sólida (SSG, hreflang, sitemap, JSON-LD, robots para bots de IA, `llms.txt`, hubs comerciales, 100 posts ES). El cuello de botella **no** es “crear 50 artículos nuevos”.

Es:

1. **Convertir tráfico que ya llega** (definición de Reel, UGC Colombia, tarifas/precios) en conocimiento de Paola + Instagram + correo + contratación.
2. **Subir del Top 10 al Top 3** las queries que ya impresionan (CTR + contenido no commodity + interlinking).
3. **Cerrar la brecha reclutador/empresa**: hoy el sitio vende bien servicios freelance; aún comunica poco seniority, trayectoria y LinkedIn para talento enterprise Colombia.
4. **Eliminar deuda de contenido thin/padded** que debilita EEAT site-wide (glosario con párrafos repetidos, 3 stubs, pillar de edición débil).

Esta iteración implementa quick wins seguros en código/contenido. Las decisiones de producto (WhatsApp prod, correo @dominio, CV, universidad, GBP) quedan en `docs/seo/TODO-PRODUCT-DECISIONS.md`.

---

## 2. Investigación y mejores prácticas 2026

### 2.1 Google Search + AI Overviews (oficial)

Fuente: [AI features and your website](https://developers.google.com/search/docs/appearance/ai-features) y [Creating helpful, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content).

- No hay markup, archivo ni “hack” especial para AI Overviews / AI Mode.
- Elegibilidad = indexable + snippet-eligible + mismos fundamentos de Search.
- Google pide contenido **people-first**, **non-commodity** (experiencia de primera mano), crawlable, con datos en texto, structured data alineado al visible.
- Citas en IA se miden dentro del Performance report de Search Console (tipo Web).

**Implicación para Paola:** potenciar posts que ya rankean (Reel, UGC, precios) con definiciones extractables, ejemplos locales, tablas y prueba real — no glosarios genéricos.

### 2.2 GEO (ChatGPT, Gemini, Claude, Perplexity)

Evidencia reciente (estudios GEO tipo Princeton + guías 2026) converge en:

| Señal | Por qué importa |
|---|---|
| Answer-first 40–80 palabras | Facilita extracción/citación |
| H2 en forma de pregunta | Match con prompts conversacionales |
| Estadísticas + rangos locales | Aumentan probabilidad de cita |
| Entity clara (Person + sameAs) | Consistencia de marca en respuestas |
| Crawlers de IA permitidos | Ya OK en `robots.ts` |
| `llms.txt` + hubs citados | Ayuda a parsers; no sustituye SEO |

**No hacer:** spam de “contenido para LLMs”, FAQ schema inventado, keyword stuffing.

### 2.3 Marca personal + portafolios que convierten (2026)

Patrones que siguen funcionando:

1. Posicionamiento nicho arriba del fold (quién + para quién + outcome).
2. Case studies Problem → Solution → Result con métricas.
3. Prueba social + logos con contexto honesto.
4. CTA dual: contacto + redes (aquí: correo + Instagram; LinkedIn para reclutadores).
5. Sin funnels de email complejos (alineado al brief: no newsletter).

### 2.4 Señales que buscan empresas colombianas / reclutadores

En ~10–30 s miran: rol claro, marcas con contexto, trayectoria/fechas, credenciales, LinkedIn, contacto profesional, outcomes de negocio (no solo views). El sitio hoy destaca views/logos; falta timeline laboral y mailbox profesional.

---

## 3. Auditoría completa del sitio

### Fortalezas

- Metadata API + canonical + hreflang ES/EN.
- JSON-LD (Person, Organization, Article, FAQ, Offer, Breadcrumb…).
- Hubs: servicios (5), experiencias (6), tarifas COP, blog, ciudades, resultados, proceso, FAQ.
- GEO: `GeoAnswer`, speakable, `llms.txt`, bots IA permitidos.
- Proof: campañas Parque Alegra / retail, testimonials, pricing transparente.

### Debilidades (pre-fix)

| Área | Hallazgo |
|---|---|
| Contenido | 15 glosarios con padding repetido; fechas 2027 en home teasers |
| GSC star | `definicion-reel` título débil + thin |
| Comercial | `tarifas-creador-ugc` no lideraba con precios; metas truncadas |
| Pillar | `edicion-de-videos-para-redes-colombia` ~360 palabras |
| Thin indexable | 3 stubs legacy |
| CRO | Hero sin Instagram; brands home sin link a casos; LinkedIn enterrado |
| EEAT reclutador | Sin CV/timeline; Gmail; autor box mínimo |
| Docs | `SEO-ROUTES.md` decía que tarifas redirigía (falso) |

### Clusters de contenido actuales

| Cluster | Rol | Prioridad GSC |
|---|---|---|
| Definiciones / Reels | Tráfico info → awareness | **P0** |
| UGC Colombia | Comercial + autoridad | **P0** |
| Precios / tarifas | Bottom-funnel | **P0** |
| Producción / edición | Mid-funnel | **P1** |
| Local (Medellín/Bogotá) | Impresiones LATAM/CO | **P1** |
| Estrategia emprendedores | Amplio | P2 |

---

## 4. Hallazgos críticos

1. El artículo de **definición de Reel** es el motor orgánico — debía ser pieza de autoridad, no glosario padded.
2. Queries en posiciones 5–10 (UGC, tarifas, precio edición) necesitan **CTR titles + contenido answer-first + interlinking a money pages**, no más thin posts.
3. Home promocionaba glosarios 2027 en vez de pilares comerciales.
4. Conversión Instagram/LinkedIn secundaria frente a mailto — fricción móvil.
5. Empresas grandes ven “freelance creator” más que “candidata senior” por falta de trayectoria explícita.

---

## 5. Quick wins (implementados en esta rama)

Ver sección **Cambios implementados**.

---

## 6. Recomendaciones priorizadas (Impacto × Esfuerzo)

| # | Acción | Impacto | Esfuerzo | Estado |
|---|---|---|---|---|
| 1 | Reescribir `definicion-reel` + title CTR | Alto | Bajo | ✅ |
| 2 | Limpiar glosario padded + fechas | Alto (site-wide quality) | Bajo | ✅ |
| 3 | Home teasers → pilares GSC | Medio-Alto | Bajo | ✅ |
| 4 | Tarifas UGC: precios arriba + meta | Alto | Bajo | ✅ |
| 5 | Expandir pillar edición videos | Alto | Medio | ✅ (mejorado; seguir a 1.5k+) |
| 6 | noIndex stubs thin | Medio | Bajo | ✅ |
| 7 | Author box + LinkedIn/IG paths | Alto CRO/EEAT | Bajo | ✅ |
| 8 | Hero CTA Instagram + brands→casos | Alto CRO | Bajo | ✅ |
| 9 | WhatsApp E.164 en prod | Alto CRO | Producto | ⏳ TODO |
| 10 | Correo @paolahoyos.com | Alto trust | Producto | ⏳ TODO |
| 11 | Página/sección “Experiencia laboral” / CV | Alto hiring | Medio | ⏳ TODO |
| 12 | Expandir `tarifas-community-manager` a bridge 1.2k | Medio | Medio | ⏳ backlog |
| 13 | Actualizar titles CTR posiciones 5–10 (GSC export) | Alto | Bajo | ⏳ con datos frescos |
| 14 | Outreach LinkedIn + menciones en directorios CO | Alto GEO off-page | Continuo | ⏳ |
| 15 | Expandir cases a outcomes de negocio | Medio hiring | Medio | ⏳ |

---

## 7. Roadmap 60–90 días

### Días 1–15 (ya en curso / inmediato post-merge)

- Merge + deploy de esta rama.
- Request indexing en GSC para: `definicion-reel`, `tarifas-creador-ugc-colombia`, `edicion-de-videos-para-redes-colombia`, `que-es-ugc…`, home `/es`.
- Configurar `NEXT_PUBLIC_WHATSAPP_E164` en Vercel.
- Export GSC queries posiciones 5–10 → reescribir titles/descriptions top 15.

### Días 16–45

- Expandir pillar edición a 1.500+ palabras con tablas/export specs.
- Expandir bridge `tarifas-community-manager-colombia`.
- Interlinking sistemático cluster UGC ↔ Reels ↔ `/tarifas` ↔ servicios.
- About: bloque “Para reclutadores” + timeline (tras decisión producto).
- Actualizar LinkedIn headline/about para mirror entity del sitio.
- Medir CTR pre/post en Search Console (móvil CO).

### Días 46–90

- 6–8 piezas **solo** en temas con impresiones altas / CTR bajo o posición 5–10 (no greenfield).
- Case studies: añadir 1–2 métricas de negocio donde sea verdadero.
- Evaluar GBP (ver `GBP-DECISION.md`).
- EN blog: traducir o mantener noindex (decidir).
- Revisar AI Overview citations cualitativamente (prompts Perplexity/Gemini).

### Topic clusters a potenciar (no inventar desde cero)

```
Reel / video corto
  ├─ definicion-reel ★
  ├─ como-editar-reels-que-retienen
  ├─ precio-edicion-de-reels-colombia ★
  ├─ edicion-de-videos-para-redes-colombia ★
  └─ → /servicios/produccion-contenido + /tarifas

UGC Colombia
  ├─ que-es-ugc-y-por-que-funciona-en-colombia ★
  ├─ tarifas-creador-ugc-colombia ★
  ├─ creador-ugc-colombia-guia
  └─ → /servicios/ugc-videos-marcas + /tarifas

Estrategia / hiring bridge
  ├─ community-manager-vs-estratega-digital
  ├─ content-strategist-colombia-remoto
  └─ → /sobre-mi + LinkedIn
```

---

## 8. Backlog técnico (archivos)

| Item | Archivos |
|---|---|
| CTR titles batch GSC | `content/blog/es/*.mdx` (seo.title/description) |
| Expand CM tarifas | `content/blog/es/tarifas-community-manager-colombia.mdx` |
| Expand thin stubs o 301 | 3 MDX noIndex + pilares destino |
| AlumniOf schema | `src/lib/seo/jsonld.ts` + confirmación humana |
| Hreflang EN blog | `src/lib/seo/metadata.ts` / blog page |
| Hero A/B variants | `content/home/es.json` + wiring Hero (hoy unused) |
| GA4 events Instagram/LinkedIn | `src/features/home/utils/analytics` |
| CV page | nueva ruta + `messages` + nav (producto) |

---

## 9. Cambios implementados (esta rama)

### Contenido

- Rewrite completo `content/blog/es/definicion-reel.mdx` (title 48 chars, FAQ reales, interlinking).
- Limpieza padding + fechas 2026 en 15 `definicion-*.mdx`.
- Metas truncadas reparadas (UGC cluster).
- Intro + tabla de precios al tope en `tarifas-creador-ugc-colombia.mdx`.
- Expansión `edicion-de-videos-para-redes-colombia.mdx` + relatedSlugs.
- `seo.noIndex: true` en 3 stubs thin.

### Código / CRO / EEAT

- Home teasers priorizan pilares GSC (`src/app/[locale]/page.tsx`).
- `FeaturedBrands hubMode` → casos desde home.
- Hero CTA secundario Instagram + métrica alineada a +1.3M/90d.
- `AuthorByline` con proof + About/Contact/IG/LinkedIn.
- Footer chrome: Tarifas, Ciudades, LinkedIn, TikTok.
- Contact modal: canal LinkedIn.
- Blog `generateMetadata` respeta `seo.noIndex`.
- `public/llms.txt` + `docs/architecture/SEO-ROUTES.md` actualizados.

---

## 10. Próximos pasos

1. Merge → deploy → GSC inspect URL.
2. Resolver TODO de producto (WhatsApp, mailbox, CV, universidad).
3. Batch CTR titles con export GSC real (posiciones 5–10).
4. Medir a 14/30 días: CTR móvil CO, clics a `/contacto` e Instagram, consultas correo.
5. No crear contenido greenfield hasta agotar oportunidades de páginas ya en Top 10.
