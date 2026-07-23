# SEO routes inventory (post Top-10 Colombia repositioning)

## Visible primary nav

| Label ES | Label EN | Canonical ES | Canonical EN |
|---|---|---|---|
| Inicio | Home | `/es` | `/en` |
| Experiencias | Experiences | `/es/experiencias` | `/en/experiences` |
| Servicios | Services | `/es/servicios` | `/en/services` |
| Blog / Recursos | Blog | `/es/blog` | `/en/blog` |
| Sobre mí | About | `/es/sobre-mi` | `/en/about` |
| Contacto | Contact | `/es/contacto` | `/en/contact` |

## Detail pages (in sitemap)

- Services: `/servicios/{slug}` · `/services/{slug}` (priority 0.90)
- Experiences: `/experiencias/{slug}` · `/experiences/{slug}` (priority 0.85)
- Blog posts: `/blog/{slug}` (priority 0.75)
- Blog hub: priority 0.85

## Permanent redirects (301/308 — never list as canonical)

| From | To |
|---|---|
| `/es/tarifas`, `/en/pricing`, `/tarifas`, `/pricing` | Services hub *(temporal — restaurar página tarifas en P1)* |
| `/es/portafolio`, `/en/portfolio`, `/portafolio`, `/portfolio` | Experiences hub |
| `/es/casos-estudio`, `/en/case-studies` (+ slugs) | Experiences hub |

## Crawl surfaces

| File | Role |
|---|---|
| `src/app/sitemap.ts` | Canonical URL list + hreflang alternates |
| `src/app/robots.ts` | Allow search + AI bots · points to sitemap |
| `public/llms.txt` | GEO summary for LLM crawlers |
| `src/lib/seo/paths.ts` | Localized path builder |
| `src/lib/seo/metadata.ts` | Canonical + OG + twitter + robots per page |
| `src/config/seo-strategy.ts` | Keyword clusters + package→service map |
| `docs/seo/ROADMAP-TOP10-COLOMBIA.md` | 6–12 month strategy |

## Notes

- Blog is **visible** in primary nav and footer (recursos).
- Services hub links to service detail MDX pages.
- Default OG image: `/assets/og-paola.jpg` (≤100KB).
- Target clusters: content creation, video/reels editing, UGC, entrepreneur marketing (not commodity CM).
