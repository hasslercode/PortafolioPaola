## Accessibility Refactor Report

### Contraste corregido

Tokens nuevos en `styles/variables.css`:

| Token | Valor | Uso |
|---|---|---|
| `--pink-accent-text` | `#B84C6A` | Textos destacados, scripts, acentos sobre fondos claros |
| `--pink-primary` | `#B84C6A` | Botones y superficies interactivas con texto blanco |
| `--pink-primary-hover` | `#A03E56` | Reservado para estados hover |
| `--pink-muted` | `#8F4A58` | Texto secundario rosa (nav activo, tagline) |
| `--pink-progress` | `#C45672` | Barras de progreso |
| `--focus-ring` | `#B84C6A` | Anillo de foco accesible |

Reemplazos aplicados en `styles/layout.css` y `styles/sections.css`:

| Antes | Después | Contexto |
|---|---|---|
| `#E8A7B3` / `#e8a7b3` | `#B84C6A` | Acentos de texto (hero, descripciones, scripts) |
| `#f08098` / `#f4848c` | `#B84C6A` | Subtítulos, métricas, badges de texto, enlaces hover |
| `#BD818B` | `#8F4A58` | Texto muted rosa |
| `#d68e99` / `#d68a96` | `#B84C6A` | Scripts decorativos, barras de skill |
| `#f08098` (fondo) | `#B84C6A` | Badge Servicios, botones primarios |
| `rgba(45,30,27,0.55–0.72)` | `#554947` / `#4A3E3C` | Microcopy, categorías, KPIs, notas |
| `opacity: 0.55` en footer | `rgba(255,255,255,0.78)` | Copyright y enlaces legales sobre fondo oscuro |

Build consolidado regenerado en `assets/styles.css`.

---

### Headings corregidos

| Elemento | Antes | Después |
|---|---|---|
| Logo | `<span class="site-logo__name">` | `<h1 class="site-logo__name">Paola Hoyos</h1>` |
| Hero principal | `<h1 class="hero-premium-title">` | `<h2 class="hero-premium-title">` |
| Experiencias — script | `<h3 class="featured-script">` separado | `<span class="featured-script">` dentro del `<h2>` unificado |
| Competencias — script | `<p class="skills-script-title">` | `<span class="skills-script-title">` dentro del `<h2>` |
| Gráfica de resultados | `<p class="results-proof__chart-title">` | `<h4 class="results-proof__chart-title">` |

Jerarquía resultante:

- **h1** — Paola Hoyos (logo)
- **h2** — Hero, Experiencias, Resultados, Servicios, Herramientas & Competencias, Mi Proceso, Contacto
- **h3** — Cards de campañas, servicios, pasos del proceso, bloque de reels
- **h4** — Título de gráfica, columnas del footer (Navegación, Conectemos, Misión)

---

### ARIA corregidos

| Cambio | Detalle |
|---|---|
| Eliminado | `aria-hidden` redundante en `<dialog>` (contacto y portafolio) |
| Eliminado | Toggle manual de `aria-hidden` en JS de modales |
| Agregado | `aria-hidden="true"` en badges decorativos (Servicios, Ecosistema, Marcas, Mi Proceso, Resultados) |
| Agregado | `aria-hidden="true"` en tagline del logo, label vertical del hero, scraps decorativos |
| Agregado | `aria-haspopup="dialog"` en CTAs y enlaces que abren modales |
| Agregado | `aria-label` descriptivos en CTAs principales (Hablemos, Trabajemos juntas, Impulsa tu marca) |
| Agregado | `aria-label` en botones de play de campañas y reels (vía `content.json`) |
| Mantenido | `aria-label` del logo, menú móvil, modales, navegación legal del footer |
| Corregido | Etiquetas del menú: «Abrir menú» / «Cerrar menú» |

---

### Imágenes corregidas

**22 alts descriptivos agregados o mejorados:**

- 1 retrato hero (`Paola Hoyos, estratega digital…`)
- 6 logotipos de marcas (`Logotipo de…`)
- 6 imágenes de campaña (`Campaña digital para… en Parque Alegra`)
- 4 miniaturas de reels (con métrica contextual)
- 5 iconos de herramientas/skills
- 1 isotipo footer (`Isotipo de Paola Hoyos`)

Los iconos puramente decorativos del header mantienen `alt=""` con nombre accesible en el enlace padre.

---

### Navegación corregida

| Elemento | Mejora |
|---|---|
| Global | `:focus-visible` con anillo `3px solid #B84C6A` y offset `4px` |
| Botones CTA | Foco visible, `aria-label`, `aria-haspopup="dialog"` |
| Menú móvil | `aria-expanded`, `aria-controls`, etiquetas dinámicas |
| Enlaces de campaña/reels | `aria-label` por marca, foco en botones play |
| Enlaces de contacto | Texto visible + iconos con `aria-hidden` |
| Modales | `<dialog>` nativo con cierre por Escape y backdrop |
| Redes sociales | Texto de plataforma visible junto al icono |

---

### Resultado esperado (actualizado — segunda pasada)

| Métrica WAVE | Inicial | Tras 1ª pasada | Estimado tras 2ª pasada |
|---|---|---|---|
| Contrast Errors | 66 | 28 | 3–8 |
| Alerts | 31 | 30 | 5–10 |
| AIM Score | 2.9/10 | 5/10 | 8–9/10 |

#### Segunda pasada — cambios adicionales

**Contraste**
- Acento de texto reforzado: `#943850` / botones `#A03E56`
- Tagline del logo: `--text-muted` en lugar de rosa claro
- Icono de nota legal: fondo `--pink-primary` (texto blanco legible)
- Eliminada opacidad en textos de contenido (`.featured-copy`, `.featured-note p`, `.service-card-wow p`, `.contact-item-final`)

**Texto muy pequeño**
- Token `--text-min: 12px` aplicado globalmente a microcopy, badges, métricas, hero, CTAs y breakpoints móviles (eliminados valores de 6.5px–9px)

**Headings**
- Barra de performance: `h3` → `<p class="perf-text-group__title">` (evita salto h2→h3)
- Gráfica de resultados: `h4` → `<p>` (evita salto h2→h4)
- Footer: `h4` → `h3`

**PDF**
- `aria-label="Descargar portafolio completo en PDF"` en enlace de descarga

---

### Resultado esperado (primera pasada)

| Métrica WAVE | Antes | Estimado después |
|---|---|---|
| Contrast Errors | 66 | 5–12 |
| Alerts | 31 | 8–15 |
| AIM Score | 2.9/10 | 7.5–8.5/10 |

La reducción más significativa proviene de la unificación de tokens de color AA, la corrección de textos semitransparentes y la jerarquía semántica de headings. Los alerts residuales probables corresponden a elementos decorativos visibles (scraps, divisores) y contrastes en gradientes de botones secundarios, que mantienen la estética editorial sin impacto funcional.
