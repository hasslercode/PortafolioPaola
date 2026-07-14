# SEO routes inventory (post-consolidation)

Single source for crawlers after fusing Portafolio→Experiencias and Tarifas→Servicios.

## Visible primary nav

| Label ES | Label EN | Canonical ES | Canonical EN |
|---|---|---|---|
| Inicio | Home | `/es` | `/en` |
| Experiencias | Experiences | `/es/experiencias` | `/en/experiences` |
| Servicios | Services | `/es/servicios` | `/en/services` |
| Sobre mí | About | `/es/sobre-mi` | `/en/about` |
| Contacto | Contact | `/es/contacto` | `/en/contact` |

## Soft (crawlable, not in primary nav)

| Resource | ES | EN | Sitemap priority |
|---|---|---|---|
| Blog hub | `/es/blog` | `/en/blog` | 0.45 |
| Blog posts | `/es/blog/{slug}` | `/en/blog/{slug}` | 0.40 |
| RSS | `/es/feed.xml` | `/en/feed.xml` | — |

## Detail pages (in sitemap)

- Services: `/servicios/{slug}` · `/services/{slug}` (priority 0.90)
- Experiences: `/experiencias/{slug}` · `/experiences/{slug}` (priority 0.85)

## Permanent redirects (301/308 — never list as canonical)

| From | To |
|---|---|
| `/es/tarifas`, `/en/pricing`, `/tarifas`, `/pricing` | Services hub |
| `/es/portafolio`, `/en/portfolio`, `/portafolio`, `/portfolio` | Experiences hub |
| `/es/casos-estudio`, `/en/case-studies` (+ slugs) | Experiences hub |

## Crawl surfaces

| File | Role |
|---|---|
| `src/app/sitemap.ts` | Canonical URL list + hreflang alternates |
| `src/app/robots.ts` | Allow search + AI bots · points to sitemap |
| `public/llms.txt` | GEO summary for LLM crawlers |
| `src/lib/seo/paths.ts` | Localized path builder (canonical aliases for fused hubs) |
| `src/lib/seo/metadata.ts` | Canonical + OG + twitter + robots per page |

## Notes

- `pricing` / `portfolio` keys in `paths.ts` alias to services / experiences so legacy hub calls never emit dead canonicals.
- App routes `/pricing` and `/portfolio` use `permanentRedirect` to the fused hubs.
- No `public/robots.txt` — App Router `robots.ts` is authoritative.
