# Backlog HU + TDD — Top 10 SEO Colombia (paolahoyos.com)

**Fuente:** `ROADMAP-TOP10-COLOMBIA.md` · `CONTENT-FACTORY-100.md` · `IMPLEMENTATION-SNIPPETS.md`  
**Formato HU:** Como / Quiero / Para  
**Criterios:** TDD — Dado / Cuando / Entonces  
**Estados:** `DONE` (ya en PR) · `READY` · `BLOCKED`  
**Prioridad:** P0 → P3  

---

## Convención de IDs

| Prefijo | Épico |
|---------|-------|
| HU-TECH | Técnico / CWV / schema / metadata |
| HU-IA | Arquitectura información / nav / linking |
| HU-KW | Keywords / posicionamiento |
| HU-CONT | Contenido money + factory |
| HU-CRO | Conversión / WhatsApp / form / precios |
| HU-LOC | Local SEO Colombia |
| HU-EEAT | Confianza / autor / legales |
| HU-EN | Internacionalización EN |
| HU-AUTH | Autoridad off-page / links |
| HU-OBS | Medición / GSC / KPIs |

**Definition of Done global (DoD)**  
1. HU cumple todos los Dado/Cuando/Entonces.  
2. Build SSG pasa (`npm run build`).  
3. URL en sitemap (si indexable) + canonical + hreflang correctos.  
4. Sin regresión LCP hero home.  
5. Copy ES-CO; sin inventar métricas de clientes.

---

# ÉPICO 0 — Fundación P0 (técnico + discovery)

> Objetivo: desbloquear crawl equity, señales de entidad y discovery de contenido comercial.

---

### HU-TECH-001 — OG liviano · `DONE`
**Como** visitante que comparte una URL en redes  
**Quiero** que la imagen Open Graph pese ≤100KB y mida 1200×630  
**Para** que el enlace cargue rápido y no degrade CTR social  

**TDD**
- **Dado** `public/assets/og-paola.jpg` existe y `metadata.ts` lo usa por defecto  
- **Cuando** se genera metadata de cualquier hub  
- **Entonces** `og:image` apunta al JPEG, `type` = `image/jpeg`, width=1200, height=630  
- **Dado** JSON-LD Organization/Person  
- **Cuando** se renderiza el grafo  
- **Entonces** `logo`/`image` no apuntan al PNG de 1.7MB  

**Archivos:** `src/lib/seo/metadata.ts`, `src/lib/seo/jsonld.ts`, `public/assets/og-paola.jpg`  
**Test:** assert metadata OG path + filesize `< 100_000`

---

### HU-TECH-002 — Schema serviceType real · `DONE`
**Como** motor de búsqueda que interpreta entidad ProfessionalService  
**Quiero** `serviceType` alineado a la oferta actual  
**Para** no asociar Email Marketing / Event Coverage eliminados  

**TDD**
- **Dado** `professionalServiceNode()` sin override  
- **Cuando** se serializa JSON-LD  
- **Entonces** incluye Content Strategy, Video Editing, UGC-style, Monthly Management, Strategic Advisory  
- **Y** no incluye Email Marketing ni Event Coverage  

**Archivos:** `src/lib/seo/jsonld.ts`  
**Test:** snapshot JSON-LD core graph

---

### HU-TECH-003 — Reviews con rating · `DONE`
**Como** Quality Rater / rich result parser  
**Quiero** Review con `reviewRating` e `itemReviewed` tipado  
**Para** señales de confianza válidas  

**TDD**
- **Dado** testimonios en home  
- **Cuando** `homeGraph` emite reviews  
- **Entonces** cada Review tiene `reviewRating.ratingValue`, `bestRating=5`, `itemReviewed.@type=ProfessionalService`

---

### HU-TECH-004 — Keywords home/servicios · `DONE`
**Como** emprendedor que busca creación de contenido / video / UGC en Colombia  
**Quiero** que title/description/keywords del home y servicios reflejen esa intención  
**Para** mejorar query–document fit  

**TDD**
- **Dado** home ES  
- **Cuando** leo `<title>` y meta description  
- **Entonces** mencionan Colombia + al menos dos de: contenido, video, UGC, estrategia  
- **Y** no priorizan “community manager” como head term  

**Archivos:** `content/home/es.json`, `src/config/seo-strategy.ts`, `src/app/[locale]/page.tsx`, `messages/es.json`

---

### HU-IA-001 — Blog en navegación primaria · `DONE`
**Como** usuario (y crawler)  
**Quiero** ver Blog/Recursos en header y footer  
**Para** descubrir guías comerciales  

**TDD**
- **Dado** header renderizado  
- **Cuando** inspecciono nav  
- **Entonces** existe link a `/blog`  
- **Dado** footer  
- **Cuando** inspecciono nav  
- **Entonces** link recursos → `/blog`

---

### HU-IA-002 — Preview blog en home · `DONE`
**Como** visitante del home  
**Quiero** ver 3 teasers de artículos con link  
**Para** entrar al cluster de contenidos  

**TDD**
- **Dado** ≥1 post publicado  
- **Cuando** cargo `/es` y se hidratan secciones deferred  
- **Entonces** aparece `#blog-preview` con ≥1 card linkeada a `/blog/[slug]`

---

### HU-IA-003 — Hub servicios → detalle · `DONE`
**Como** prospecto en `/servicios`  
**Quiero** un link crawlable a cada servicio MDX  
**Para** que Google y yo lleguemos a la money page  

**TDD**
- **Dado** packages estrategia/producción/gestión  
- **Cuando** renderizo PricingHubView  
- **Entonces** cada card tiene `a[href]` a `/servicios/{slug}` (o EN equivalente)  
- **Y** consultoría linkea a `/servicios/sesion-estrategica`

---

### HU-IA-004 — Fix link interno /tarifas en MDX · `DONE`
**Como** lector del post de tarifas  
**Quiero** ir a la página canónica de servicios  
**Para** no perder equity en redirect  

**TDD**
- **Dado** body del post tarifas  
- **Cuando** busco links  
- **Entonces** apunta a `/es/servicios` (no `/es/tarifas`)

---

### HU-TECH-005 — Sitemap priority blog · `DONE`
**Como** crawler  
**Quiero** mayor prioridad relativa del blog hub/posts  
**Para** re-crawl más frecuente del contenido comercial  

**TDD**
- **Dado** `sitemap.xml`  
- **Cuando** leo entradas blog  
- **Entonces** hub blog priority ≥ 0.8 y posts ≥ 0.7

---

### HU-TECH-006 — Schema frontmatter clusters · `DONE`
**Como** content editor  
**Quiero** campos `primaryKeyword`, `cluster`, `relatedSlugs`, `serviceCta` y topics nuevos  
**Para** gobernar la content factory  

**TDD**
- **Dado** MDX con `topic: video` y `relatedSlugs`  
- **Cuando** `blogFrontmatterSchema.safeParse`  
- **Entonces** parse OK  

---

### HU-CONT-000 — Semilla pilar video · `DONE`
**Como** buscador de “edición de videos para redes”  
**Quiero** una guía indexable con enlaces a servicio  
**Para** aterrizar intent comercial  

**TDD**
- **Dado** slug `edicion-de-videos-para-redes-colombia` en registry  
- **Cuando** visito `/es/blog/edicion-de-videos-para-redes-colombia`  
- **Entonces** 200, H1 presente, ≥1 link a `/es/servicios/produccion-contenido`

---

# ÉPICO 1 — Contenido money pages (P1)

---

### HU-CONT-001 — Expandir sesión estratégica ≥1200 palabras · `DONE`
**Como** emprendedor indeciso  
**Quiero** entender qué incluye la consultoría, qué no, y resultados esperados  
**Para** decidir si agendar  

**TDD**
- **Dado** `content/services/es/sesion-estrategica.mdx`  
- **Cuando** cuento palabras del body  
- **Entonces** ≥1200  
- **Y** FAQ ≥6  
- **Y** ≥3 links internos (servicios hermanos + contacto + 1 blog)

---

### HU-CONT-002 — Expandir estrategia de contenido ≥1500 palabras · `DONE`
**Como** marca que busca “estrategia de contenido Colombia”  
**Quiero** una money page profunda con proceso, entregables y prueba  
**Para** convertir búsqueda → lead  

**TDD**
- **Dado** MDX estrategia-contenido ES  
- **Cuando** valido SEO frontmatter  
- **Entonces** `primaryKeyword` = estrategia de contenido (o equivalente)  
- **Y** body ≥1500, FAQ ≥6, speakable/GeoAnswer presente en template

---

### HU-CONT-003 — Expandir producción (iterar semilla) ≥1800 palabras · `DONE`
**Como** pyme que busca edición de Reels  
**Quiero** cobertura completa de proceso, brief, exclusiones, UGC vs edición  
**Para** cotizar con claridad  

**TDD**
- **Dado** producción ES (ya expandida)  
- **Cuando** audito gaps vs CONTENT-FACTORY cluster B  
- **Entonces** body ≥1800, incluye sección precios/rangos o link a tarifas, FAQ ≥6

---

### HU-CONT-004 — Expandir gestión mensual ≥1500 palabras · `DONE`
**Como** marca que quiere delegar operación  
**Quiero** saber alcance premium vs CM commodity  
**Para** no comparar solo precio  

**TDD**
- Body ≥1500 · tabla incluye/excluye · link a comparativa CM vs estratega · FAQ ≥6

---

### HU-CONT-005 — Servicio nuevo UGC videos marcas
**Como** marca que busca “creador UGC Colombia”  
**Quiero** una landing/servicio dedicada  
**Para** aterrizar intent UGC sin diluir producción  

**TDD**
- **Dado** slug `ugc-videos-marcas` / EN `ugc-brand-videos` en `registry.ts`  
- **Cuando** build  
- **Entonces** rutas `/es/servicios/ugc-videos-marcas` y EN existen en sitemap  
- **Y** card visible en hub servicios  
- **Y** Service JSON-LD emitido  
- **Y** body ES ≥1500

**Archivos:** `registry.ts`, `serviceSlugLocales`, MDX es/en, `services/page.tsx`, `llms.txt`

---

### HU-CONT-006 — Pilar estrategia de contenido Colombia
**Como** buscador informational→commercial  
**Quiero** guía 2500+ palabras que hubee spokes  
**Para** authority cluster A  

**TDD**
- Slug en registry · body ≥2500 · ≥8 links a spokes (pueden ser placeholders `draft` no) · 1 CTA servicio · FAQ ≥8 · `cluster: strategy`

---

### HU-CONT-007 — Pilar creación de contenido redes
**Como** emprendedor  
**Quiero** guía maestra de creación de contenido  
**Para** entender oferta y siguientes pasos  

**TDD** iguales a HU-CONT-006 con KW `creación de contenido redes sociales`

---

### HU-CONT-008 — Pilar creador UGC Colombia
**Como** marca  
**Quiero** guía UGC localizada CO  
**Para** decidir brief/contratar  

**TDD** ≥2500 · links a servicio UGC · ejemplos CO · FAQ derechos de uso

---

### HU-CONT-009 — Pilar marketing contenidos emprendedores
**Como** emprendedor CO  
**Quiero** guía de marketing de contenidos accionable  
**Para** pasar de improvisar a sistema  

**TDD** ≥2500 · plantilla 30 días · CTA sesión/gestión

---

### HU-CONT-010 — Pilar videos para marcas IG/TikTok
**Como** marca de consumo  
**Quiero** guía de video corto para marcas  
**Para** conectar con producción/UGC  

**TDD** ≥2500 · tabla formatos · links cluster B/C

---

### HU-CONT-011 — Expandir 5 casos existentes ≥800 palabras narrativa
**Como** prospecto escéptico  
**Quiero** leer problema→proceso→resultado real  
**Para** confiar (EEAT Experience)  

**TDD**
- **Dado** cada case-study ES  
- **Cuando** renderizo detalle  
- **Entonces** body o board fields suman narrativa ≥800 palabras equivalentes  
- **Y** métricas visibles · FAQ honestidad (Parque Alegra disclosure se mantiene)

---

### HU-CONT-012 — Caso TOTTO
**Como** visitante que ve card TOTTO sin caso  
**Quiero** página de experiencia TOTTO  
**Para** no caer en dead-end  

**TDD**
- Card FeaturedBrands con slug no-null · MDX en registry · sitemap · 200 OK

---

### HU-CONT-013 — Caso MaxGordos (si permiso marca)
**Como** visitante de card MaxGordos  
**Quiero** caso o remover card  
**Para** no romper trust  

**TDD**
- **Dado** permiso comercial  
- **Cuando** publico caso  
- **Entonces** slug + MDX + link card  
- **Si no** card sin href falso / ocultar

---

# ÉPICO 2 — Tarifas, CRO, contacto (P1)

---

### HU-CRO-001 — Restaurar `/tarifas` como página real · `DONE`
**Como** buscador de precios  
**Quiero** una URL de inversión con rangos COP “desde”  
**Para** auto-calificar sin fricción  

**TDD**
- **Dado** redirects actuales tarifas→servicios  
- **Cuando** implemento página  
- **Entonces** `/es/tarifas` 200 (no 301 a servicios)  
- **Y** canonical propio  
- **Y** tabla ≥3 rangos COP  
- **Y** Offer JSON-LD con `minPrice`  
- **Y** links a cada servicio detalle  

**Archivos:** `next.config.ts` (quitar redirect), `pricing/page.tsx`, `paths.ts`, `sitemap.ts`

---

### HU-CRO-002 — WhatsApp Business CTA · `DONE`
**Como** emprendedor colombiano  
**Quiero** contactar por WhatsApp en 1 tap  
**Para** pedir cotización sin email  

**TDD**
- **Dado** `NEXT_PUBLIC_WHATSAPP_E164` configurado  
- **Cuando** click CTA primario contacto/servicios/home  
- **Entonces** abre `wa.me/{e164}?text=` prearmado  
- **Y** event analytics `cta_whatsapp`  
- **Dado** env vacío  
- **Cuando** render  
- **Entonces** fallback email sin romper build

**Archivos:** `site.ts`, Modals/Contact/Header CTA

---

### HU-CRO-003 — Formulario briefing 4 campos · `DONE`
**Como** lead calificado  
**Quiero** enviar marca, ciudad, necesidad, presupuesto  
**Para** recibir respuesta estructurada  

**TDD**
- **Dado** `/es/contacto`  
- **Cuando** envío form válido  
- **Entonces** success state + tracking `form_submit`  
- **Cuando** campos vacíos  
- **Entonces** errores accesibles (aria-invalid)  
- **Y** form usable sin JS crítico (progressive enhancement preferido)

---

### HU-CRO-004 — Precios “Desde $X COP” en hub · `DONE`
**Como** visitante de servicios  
**Quiero** ver ancla de precio por plan  
**Para** no sentir opacidad  

**TDD**
- Cada package muestra `Desde … COP`  
- Offer schema recibe `lowPrice`  
- Copy disclaimer “cotización final según alcance”

---

### HU-CRO-005 — CTA social proof junto a conversión · `DONE`
**Como** prospecto en duda  
**Quiero** ver testimonio/métrica cerca del CTA  
**Para** reducir fricción  

**TDD**
- Bloque proof visible en viewport del CTA final home y servicios

---

### HU-CRO-006 — Calendly opcional cableado · `DONE`
**Como** lead que prefiere agenda  
**Quiero** link Calendly si está configurado  
**Para** reservar sesión  

**TDD**
- Si `NEXT_PUBLIC_CALENDLY_URL` → botón Agenda  
- Si vacío → oculto

---

# ÉPICO 3 — Content Factory spokes (P1–P2)

> Patrón TDD común para cada spoke (aplicar a HU-CONT-100…):

**Plantilla DoD spoke**
- Body ≥1200 (glosario ≥400)  
- `primaryKeyword` + `cluster` + ≥3 `relatedSlugs`  
- Link a 1 money service  
- FAQ ≥4  
- En sitemap  
- Build OK  

---

### HU-CONT-100…117 — Spokes Video/Reels (18)
**Como** emprendedor que busca long-tail de video  
**Quiero** guías específicas (hooks, subtítulos, 9:16, brief, precios, etc.)  
**Para** rankear cluster B y nutrir producción  

**Lista obligatoria (1 HU por slug):**  
1. `como-editar-reels-que-retienen`  
2. `subtitulos-en-reels-mejores-practicas`  
3. `formato-9-16-guia-emprendedores`  
4. `guion-para-reels-de-ventas`  
5. `grabacion-profesional-con-celular`  
6. `iluminacion-para-videos-en-casa`  
7. `musica-libre-de-derechos-reels-colombia`  
8. `hooks-primeros-3-segundos-tiktok`  
9. `diferencia-entre-edicion-basica-y-premium`  
10. `pack-de-contenido-mensual-cuantos-videos`  
11. `storytelling-en-video-corto`  
12. `cta-en-videos-que-convierten`  
13. `errores-al-editar-reels-para-negocios`  
14. `como-briefear-a-tu-editor-de-video`  
15. `exportar-video-para-instagram-y-tiktok`  
16. `reels-vs-tiktok-vs-shorts-colombia`  
17. `calendario-de-videos-semanal-pyme`  
18. `precio-edicion-de-reels-colombia`  

**TDD (por slug S)**
- **Dado** S registrado en `blogSlugs`  
- **Cuando** GET `/es/blog/S`  
- **Entonces** 200 + DoD spoke + link a `/es/servicios/produccion-contenido`

---

### HU-CONT-200…213 — Spokes UGC (14)
**Como** marca que evalúa UGC  
**Quiero** guías de definición, brief, verticales, derechos, tarifas  
**Para** authority cluster C  

**Slugs:** ver `CONTENT-FACTORY-100.md` §C  
**TDD:** DoD spoke + CTA a `/es/servicios/ugc-videos-marcas` (tras HU-CONT-005)

---

### HU-CONT-300…315 — Spokes Estrategia/Emprendedores (16)
**Como** emprendedor  
**Quiero** guías de pilares, calendario, buyer, ROI, KPIs, auditoría…  
**Para** authority cluster D/A  

**Slugs:** `CONTENT-FACTORY-100.md` §D  
**Incluye:** expandir `roi-contenido-organico` existente a DoD spoke  

**TDD:** DoD + CTA estrategia o gestión

---

### HU-CONT-400…409 — Comparativas (10)
**Como** decisor  
**Quiero** comparativas honestas (CM vs estratega, agencia vs freelance…)  
**Para** elegirnos sin clickbait  

**TDD**
- Intent `comparison`  
- Tabla pros/contras  
- CTA no agresivo  
- ≥1200 palabras  
- Link a tarifas + 1 servicio

---

### HU-CONT-500…508 — Geo Colombia (9)
**Como** buscador local (“contenido Medellín/Bogotá/Barranquilla”)  
**Quiero** landing geo con prueba + remote delivery  
**Para** capturar intent local sin fingir sede falsa  

**TDD**
- Menciona ciudad en H1/title  
- NAP/WhatsApp  
- `areaServed` coherente  
- Link servicio + 1 caso si aplica  
- No inventar dirección física

---

### HU-CONT-600…607 — Verticales (8)
**Como** dueño de retail/F&B/marca personal/etc.  
**Quiero** landing vertical  
**Para** ver relevancia de industria  

**TDD:** DoD spoke/landing ≥1200 · prueba o ejemplo sector · CTA

---

### HU-CONT-700…714 — Glosario GEO (15)
**Como** LLM/crawler y usuario novato  
**Quiero** definiciones citables (UGC, hook, retention…)  
**Para** ganar menciones/GEO  

**TDD**
- 400–700 palabras  
- Definición en primer párrafo  
- Link a 1 pilar  
- `speakable` selector ok

---

### HU-IA-010 — Componente RelatedContent · `DONE`
**Como** lector  
**Quiero** bloque “Sigue explorando” al final del MDX  
**Para** recorrer el cluster  

**TDD**
- **Dado** `relatedSlugs` en frontmatter  
- **Cuando** render post/servicio  
- **Entonces** nav `aria-label="Contenido relacionado"` con links resolubles  
- **Cuando** slug huérfano  
- **Entonces** se omite sin romper página

---

### HU-IA-011 — Rename blog → /recursos (opcional migración)
**Como** visitante  
**Quiero** hub llamado Recursos  
**Para** claridad comercial  

**TDD**
- 301 `/blog` → `/recursos` (o alias canónico documentado)  
- Nav label “Recursos”  
- Sitemap solo canónica  
- hreflang actualizado

---

# ÉPICO 4 — Trust, legal, EEAT (P1–P2)

---

### HU-EEAT-001 — Sobre mí credenciales profundas
**Como** Quality Rater  
**Quiero** universidad, maestría, diplomados con nombres reales  
**Para** Expertise verificable  

**TDD**
- Sección formación con instituciones nombradas (datos reales, no inventar)  
- Person JSON-LD `alumniOf` con Organization real  
- Link a LinkedIn sameAs ok

---

### HU-EEAT-002 — Página proceso de trabajo
**Como** prospecto  
**Quiero** ver proceso 01–0N standalone  
**Para** reducir incertidumbre  

**TDD**
- URL `/es/proceso-de-trabajo` · HowTo o steps claros · CTA

---

### HU-EEAT-003 — Página resultados/métricas
**Como** prospecto  
**Quiero** métricas consolidadas (+1.3M, marcas)  
**Para** proof centralizado  

**TDD**
- Sin claims no sustentados  
- Links a casos  
- lastUpdated visible

---

### HU-EEAT-004 — Privacidad
**Como** visitante / compliance  
**Quiero** `/es/privacidad`  
**Para** trust y footer real  

**TDD**
- Footer deja de usar `href="#"`  
- 200 + index o noindex documentado  
- Menciona email/WhatsApp/datos tratados

---

### HU-EEAT-005 — Términos
**Como** cliente potencial  
**Quiero** `/es/terminos`  
**Para** claridad contractual básica  

**TDD:** link footer · contenido mínimo alcance servicios

---

### HU-EEAT-006 — Aviso legal
**Como** visitante  
**Quiero** `/es/aviso-legal`  
**Para** completar legales footer  

**TDD:** igual patrón footer

---

### HU-EEAT-007 — FAQ hub agregado
**Como** usuario con dudas comerciales  
**Quiero** `/es/preguntas-frecuentes`  
- **Para** resolver objeciones en un solo lugar  

**TDD**
- FAQPage schema  
- ≥15 Q agregadas desde servicios/tarifas  
- Links a money pages

---

### HU-EEAT-008 — Email dominio (ops)
**Como** prospecto  
**Quiero** contactar `@paolahoyos.com`  
**Para** mayor trust  

**TDD**
- `siteConfig.contact.email` actualizado cuando exista mailbox  
- Todas las superficies (schema, contacto, llms.txt) consistentes

---

# ÉPICO 5 — Local SEO Colombia (P2)

---

### HU-LOC-001 — Hub ciudades
**Como** buscador geo  
**Quiero** `/es/ciudades` índice  
**Para** descubrir landings Medellín/Bogotá/Barranquilla  

**TDD**
- ItemList schema  
- 3+ links ciudad  
- copy “base Medellín · atención remota nacional”

---

### HU-LOC-002 — Landing Medellín
**Como** negocio en Medellín  
**Quiero** página local de servicios contenido/video  
**Para** intent “creación de contenido Medellín”  

**TDD:** ver DoD geo HU-CONT-500

---

### HU-LOC-003 — Landing Bogotá
**Como** negocio en Bogotá  
**Quiero** landing local  
**Para** demanda capital  

**TDD:** DoD geo

---

### HU-LOC-004 — Landing Barranquilla
**Como** marca Caribe / Parque Alegra context  
**Quiero** landing Barranquilla  
**Para** conectar caso real  

**TDD:** menciona Parque Alegra con disclosure existente

---

### HU-LOC-005 — NAP + WhatsApp en footer/contacto
**Como** usuario local  
**Quiero** ver canal claro (WA/email) + ciudad base  
**Para** confianza NAP parcial (remote)  

**TDD**
- Footer muestra ciudad + WA/email  
- JSON-LD addressLocality Medellín se mantiene  
- No streetAddress falso

---

### HU-LOC-006 — GBP Service Area (ops, fuera de código)
**Como** Digital Marketing Director  
**Quiero** decidir GBP service-area vs no  
**Para** no violar guidelines  

**TDD (checklist ops)**
- Documentar decisión en `docs/seo/`  
- Si sí: categorías Content Marketing / Video · áreas CO  
- Si no: explícito “no GBP”

---

# ÉPICO 6 — Técnico avanzado / CWV / media (P1–P2)

---

### HU-TECH-010 — sitemap lastModified real · `DONE`
**Como** crawler  
**Quiero** fechas de contenido real  
**Para** señales de freshness honestas  

**TDD**
- **Dado** post con `updatedAt`  
- **Cuando** sitemap  
- **Entonces** `lastModified` = esa fecha (no `new Date()` build)

---

### HU-TECH-011 — ItemList en hubs
**Como** buscador  
**Quiero** ItemList JSON-LD en servicios/blog/experiencias  
**Para** claridad de colección  

**TDD:** graph incluye ItemList con ≥N elementos url

---

### HU-TECH-012 — VideoObject en experiencias
**Como** buscador de video  
**Quiero** VideoObject cuando hay reel embed/thumb  
**Para** elegibilidad rich results video  

**TDD**
- Si hay URL video → VideoObject name/thumbnail/uploadDate  
- Si no → no emitir tipo vacío

---

### HU-TECH-013 — Auditar INP/TBT home mobile
**Como** usuario mobile  
**Quiero** home con INP bueno  
**Para** CWV  

**TDD**
- PSI mobile field o lab documentado  
- Sparkles/observers no bloquean input > umbral  
- Lazy sections OK post-LCP

---

### HU-TECH-014 — Favicon.ico + icon set
**Como** browser/SERP  
**Quiero** favicon estándar  
**Para** brand SERP/tab  

**TDD:** `/favicon.ico` 200 · manifest icons ok

---

### HU-TECH-015 — Offer prices en hubGraph
**Como** rich results  
**Quiero** Offer con min/max COP cuando hay “desde”  
**Para** transparencia comercial  

**TDD:** depende HU-CRO-004 · Offer.priceSpecification presente

---

### HU-IA-020 — Eliminar legal href="#"
**Como** crawler/usuario  
**Quiero** que legales no sean `#`  
**Para** evitar dead ends  

**TDD:** cubierto por HU-EEAT-004..006; Footer sin `#`

---

# ÉPICO 7 — EN quality (P1–P2)

---

### HU-EN-001 — noindex EN blog temporal · `DONE`
**Como** SEO lead  
**Quiero** noindex en `/en/blog/*` mientras bodies sean ES  
**Para** evitar hreflang dilution  

**TDD**
- **Dado** locale=en blog post no traducido  
- **Cuando** metadata  
- **Entonces** robots noindex,follow o noindex  
- **Y** ES indexable

---

### HU-EN-002 — Traducir 100% bodies EN existentes
**Como** lector EN  
**Quiero** contenido realmente en inglés  
**Para** hreflang válido  

**TDD**
- Detección idioma body ≠ spa (smoke)  
- FAQ EN  
- Quitar noindex al completar

---

### HU-EN-003 — Slugs EN localizados blog
**Como** usuario EN  
**Quiero** URLs en inglés  
**Para** CTR/UX  

**TDD**
- `blogSlugLocales` como services  
- 301 desde slug ES bajo /en si aplica  
- hreflang map correcto

---

### HU-EN-004 — Decisión: EN solo si hay demanda
**Como** Director Marketing  
**Quiero** criterio go/no-go EN  
**Para** no gastar en mercado sin search demand  

**TDD (ops):** doc con GSC EN clicks; si < umbral, mantener ES-first

---

# ÉPICO 8 — Autoridad off-page (P3)

---

### HU-AUTH-001 — Playbook outreach 2 links/mes
**Como** Digital Marketing Director  
**Quiero** playbook de guest/PR CO  
**Para** crecer referring domains  

**TDD**
- Doc con 20 targets (Branch, blogs marketing CO, podcasts)  
- Template pitch  
- Tracker CSV/Notion linkeado en docs

---

### HU-AUTH-002 — Owned media loop IG/TikTok/YT → site
**Como** seguidor social  
**Quiero** bio/links a pilares y tarifas  
**Para** referral + brand searches  

**TDD (ops checklist):** bios actualizadas · 1 highlight “Servicios” · UTM

---

### HU-AUTH-003 — Digital PR casos/marcas
**Como** medio  
**Quiero** historia con métricas reales  
**Para** cobertura  

**TDD:** 1 kit prensa en `/es` o PDF · facts verificables

---

# ÉPICO 9 — Observabilidad SEO (continuo)

---

### HU-OBS-001 — GSC properties + filtros CO
**Como** SEO  
**Quiero** Search Console verificado y marcado país CO  
**Para** medir Top 10 progress  

**TDD**
- `NEXT_PUBLIC_GSC_VERIFICATION` en prod  
- Sitemap enviado  
- Export baseline keywords documentado

---

### HU-OBS-002 — Dashboard KPIs mes 3/6/12
**Como** Director  
**Quiero** tablero: indexadas calidad, Top10 cluster, clics, leads, RDs  
**Para** gobernar roadmap  

**TDD:** doc o sheet con targets del roadmap · update mensual

---

### HU-OBS-003 — Alertas thin content · `DONE`
**Como** editor  
**Quiero** fail CI si money page <800 palabras  
**Para** no republicar thin  

**TDD**
- Script `npm run content:audit`  
- Exit 1 si servicio ES < umbral  
- Wire en CI opcional

---

### HU-OBS-004 — Rich Results / Schema smoke · `DONE`
**Como** dev  
**Quiero** test snapshot JSON-LD core  
**Para** no regresar Email Marketing en schema  

**TDD:** vitest/node test sobre `coreGraph('es')`

---

# ÉPICO 10 — IA/rutas futuras (P2–P3)

---

### HU-IA-030 — Rutas /ciudades y /verticales en App Router
**Como** crawler  
**Quiero** collection routes SSG  
**Para** escalar landings  

**TDD**
- `src/app/[locale]/(pages)/cities/...` o pattern documentado  
- pathnames next-intl  
- generateStaticParams  
- sitemap entries

---

### HU-IA-031 — Collection `glossary` o topic glosario
**Como** editor  
**Quiero** tipo de contenido glosario  
**Para** no forzar intent commercial en definiciones  

**TDD:** schema zod + loader + template corto

---

### HU-KW-001 — Actualizar llms.txt tras cada money page nueva
**Como** LLM crawler  
**Quiero** inventario fresco  
**Para** citas correctas  

**TDD:** PR checklist incluye llms.txt si nueva URL money

---

### HU-KW-002 — De-priorizar CM como identidad de marca
**Como** brand strategist  
**Quiero** que home/tagline/jobTitle no se presenten como CM genérico  
**Para** atraer intent correcto  

**TDD**
- Tagline/home sin “Content Management” commodity  
- Bridge post tarifas CM mantiene intención captación pero CTA a estratega/producción  
- `DONE` parcial en P0; auditar residual copy legacy

---

# Matriz de cobertura (checklist “TODO”)

| Bloque | HUs | Estado |
|--------|-----|--------|
| P0 técnico/IA | TECH-001..006, IA-001..004, CONT-000 | DONE |
| Money services | CONT-001..005 | READY |
| Pilares | CONT-006..010 | READY (000 seed DONE) |
| Casos | CONT-011..013 | READY |
| CRO/tarifas | CRO-001..006 | READY |
| Factory video | CONT-100..117 | READY |
| Factory UGC | CONT-200..213 | READY |
| Factory estrategia | CONT-300..315 | READY |
| Comparativas | CONT-400..409 | READY |
| Geo | CONT-500..508 + LOC-001..006 | READY |
| Verticales | CONT-600..607 | READY |
| Glosario | CONT-700..714 | READY |
| Related/IA | IA-010,011,020,030,031 | READY |
| EEAT/legal | EEAT-001..008 | READY |
| Tech adv | TECH-010..015 | READY |
| EN | EN-001..004 | READY |
| Auth off-page | AUTH-001..003 | READY |
| Observabilidad | OBS-001..004 | READY |
| KW brand | KW-001..002 | READY |

**Conteo aproximado:** ~120 HUs atómicas (factory spokes = 1 HU/slug).

---

# Orden de sprint sugerido

| Sprint | HUs | Meta |
|--------|-----|------|
| S0 (hecho) | TECH/IA P0 + CONT-000 | Fundación |
| S1 | CRO-001..004, CONT-001..004, EN-001, TECH-010, OBS-004 | Money + conversión |
| S2 | CONT-005..010, IA-010, EEAT-004..006 | Pilares + legales |
| S3 | CONT-100..108, CONT-011..012, LOC-005 | Video spokes + casos |
| S4 | CONT-200..210, CONT-400..404 | UGC + comparativas |
| S5 | CONT-300..315, CONT-500..502, LOC-001..003 | Estrategia + geo |
| S6 | Verticales + glosario + TECH-012/013 | Profundidad |
| S7–S12 | Rest factory + AUTH + OBS KPIs | Autoridad |

Cadencia contenido: **2–4 HUs CONT publicadas/semana**.

---

# Trazabilidad

| Doc | Rol |
|-----|-----|
| Este archivo | Backlog ejecutable HU+TDD |
| `ROADMAP-TOP10-COLOMBIA.md` | Estrategia y porqués Google |
| `CONTENT-FACTORY-100.md` | Inventario slugs |
| `IMPLEMENTATION-SNIPPETS.md` | Snippets código |
| `src/config/seo-strategy.ts` | Keywords + package map en código |

---

# Regla de oro TDD contenido

```
Dado un slug dinero o spoke en registry
Cuando npm run build && curl /es/...
Entonces 200 + canonical + hreflang + body≥umbral + ≥3 internal links + FAQ schema si FAQ≥1
```

Sin pasar esta regla, HU CONT no se marca Done.
