# Arquitectura de información (IA ideal)

Fuente de verdad de la navegación y del mapa de contenidos.

```
Home
│
├── Hero
├── Servicios (preview)
├── Casos destacados
├── Resultados
├── Testimonios
├── Sobre mí (preview)
└── CTA

Experiencias + Portafolio  →  /es/experiencias  |  /en/experiences
│
├── Campañas / marcas (Coca-Cola, TOTTO, …)
├── Resultados + reels (una sola sección)
├── PDF del portafolio
└── Detalles por marca (/experiencias/[slug])
(/portafolio redirige aquí)

Servicios + Inversión  →  /es/servicios  |  /en/services
│
├── Gestión RRSS / Estrategia / Contenido / Email / Eventos
├── Consultoría estratégica (desde)
├── Gestión de redes (desde / mes)
├── Creación de contenido (desde)
├── Cobertura de eventos (desde)
├── FAQs
└── CTA
(/tarifas y /pricing redirigen aquí)

Portafolio  →  fusionado en Experiencias (/portafolio redirige)

Sobre mí  →  /es/sobre-mi  |  /en/about
│
├── Historia
├── Formación
├── Filosofía
├── Metodología
└── CTA

Blog  →  /es/blog  |  /en/blog  (oculto de menú y home; URLs activas)
│
├── SEO
├── Instagram
├── TikTok
├── Branding
└── Marketing
```

## Notas de implementación

- Las claves internas del filesystem App Router usan inglés (`experiences`, `services`, `portfolio`, …).
- Las URLs públicas se localizan en `src/i18n/routing.ts` y `src/lib/seo/paths.ts`.
- Contenido MDX de casos: `content/case-studies/` (nombre de colección estable para loaders/CMS).
- Rutas legacy (`/casos-estudio`, `/case-studies`) redirigen 301 a Experiencias.
- `/tarifas` y `/pricing` redirigen a Servicios (página fusionada).
- `/portafolio` y `/portfolio` redirigen a Experiencias (página fusionada).
- Contacto (`/contacto`) está en el menú visible.
- Inventario SEO consolidado: `docs/architecture/SEO-ROUTES.md`.
