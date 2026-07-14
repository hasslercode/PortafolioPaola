# Paola Hoyos — Web (Next.js 15 SSG)

Portafolio / consultoría de estrategia digital optimizado para **SEO 2026** y **GEO**.

## Stack

- Next.js 15 App Router (SSG)
- TypeScript
- Tailwind CSS 4
- shadcn/ui (base)
- next-intl (`/es`, `/en` + pathnames)
- MDX content layer (CMS-ready)
- Vercel

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) → redirects to `/es`.

## Architecture

Phases 1–7 docs live in [docs/architecture/](./docs/architecture/). Legacy Vite SPA is archived in `_legacy/`.

## Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Turbopack dev server |
| `npm run build` | Production SSG build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |

## Phases

1. Architecture ✅
2. UI migration ✅
3. SEO ✅
4. Schema JSON-LD ✅
5. Content (MDX) ✅
6. Performance ✅
7. GEO ✅
8. Testing ← **next**
