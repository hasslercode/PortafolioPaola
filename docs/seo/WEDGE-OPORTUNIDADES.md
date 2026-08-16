# Wedge: oportunidades de empresas y trabajo para Paola

**Decisión:** implementar el wedge **ICP dual** (freelance + talento in-house) sin inventar CV/timeline.

## Por qué este wedge (y no otro)

| Opción | Pros | Contras | Veredicto |
|--------|------|---------|-----------|
| Solo SEO freelance (UGC/tarifas) | Ya trae tráfico | No habla el idioma de reclutadores | Insuficiente para empleo |
| Solo LinkedIn off-site | Rápido | No captura Google “content strategist Colombia” | Complemento |
| GBP local | Local pack | Paola es remote nacional | No es el wedge |
| **ICP dual en sitio + cluster hiring** | Empresas ven seniority; Google indexa intent de contratación | Timeline laboral detallado sigue bloqueado (TODO-05) | **Elegido** |

## Qué implementamos en código

1. **`/es/sobre-mi#reclutadores`** — bloque “Para reclutadores y empresas” con roles abiertos, proof retail y CTA LinkedIn + correo.
2. **Hero availability** — “Disponible para proyectos y roles” (señal dual sin matar CRO freelance).
3. **About meta/keywords** — content strategist, reclutadores, Colombia remoto.
4. **`como-contratar-estratega-digital`** — salir de `noIndex` stub → guía comercial indexable (Top 10 decision-intent).
5. **`content-strategist-colombia-remoto`** — sección hiring bridge (contratar como proveedora *o* evaluar para rol in-house).
6. **`llms.txt` + SEO keywords** — entidad legible para GEO/AI y reclutadores.

## Qué sigue bloqueado (producto)

- Timeline empleador→rol→fechas / PDF CV (`TODO-05`)
- Mailbox `@paolahoyos.com` (`TODO-02`)
- Universidad exacta en schema (`TODO-06`)

## KPIs a mirar (14–30 días)

- Clics orgánicos a `/es/sobre-mi` y `/es/blog/como-contratar-estratega-digital`
- Clics LinkedIn desde About / autor / modal
- Impresiones GSC: “content strategist colombia”, “contratar estratega digital”, “estratega de contenido”
- Consultas correo con asunto de rol / proceso de selección
