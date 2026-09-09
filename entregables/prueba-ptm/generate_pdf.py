#!/usr/bin/env python3
"""Genera Paola_Hoyos_Prueba_AnalistaMarca.pdf — Prueba técnica Analista de Marca PTM."""

from pathlib import Path

from reportlab.lib.colors import Color, HexColor, white, black
from reportlab.lib.pagesizes import landscape
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas

# --- Fonts ---
pdfmetrics.registerFont(TTFont("Sans", "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"))
pdfmetrics.registerFont(TTFont("SansBold", "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"))
pdfmetrics.registerFont(TTFont("Serif", "/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf"))
pdfmetrics.registerFont(TTFont("SerifBold", "/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf"))

# --- Brand palette (inspirada en comunicación pública PTM: cercanía, utilidad, optimismo) ---
INK = HexColor("#14232B")
TEAL = HexColor("#0E5C63")
TEAL_DARK = HexColor("#0A3F45")
GOLD = HexColor("#E8A317")
GOLD_SOFT = HexColor("#F6D98A")
CREAM = HexColor("#FBF7F0")
MIST = HexColor("#E8F0F1")
SOFT = HexColor("#F3EEE6")
MUTED = HexColor("#5C6B73")
WHITE = white
CARD = HexColor("#FFFFFF")
ALERT = HexColor("#C45C26")

PAGE = landscape((297 * mm, 210 * mm))  # A4 landscape
W, H = PAGE


def wrap(c, text, font, size, max_width):
    """Return list of lines wrapping to max_width."""
    words = text.split()
    lines, cur = [], ""
    for w in words:
        test = (cur + " " + w).strip()
        if c.stringWidth(test, font, size) <= max_width:
            cur = test
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def draw_bg(c, accent=True):
    c.setFillColor(CREAM)
    c.rect(0, 0, W, H, fill=1, stroke=0)
    # soft atmospheric band
    c.setFillColor(MIST)
    c.rect(0, 0, W * 0.28, H, fill=1, stroke=0)
    if accent:
        c.setFillColor(GOLD)
        c.rect(0, H - 6, W, 6, fill=1, stroke=0)
        c.setFillColor(TEAL)
        c.rect(0, 0, W, 4, fill=1, stroke=0)


def footer(c, page, total=12, label="Presentación principal"):
    c.setFillColor(MUTED)
    c.setFont("Sans", 7.5)
    c.drawString(18 * mm, 7 * mm, "PTM · Campaña piloto «Activa más oportunidades» · Paola Hoyos")
    c.drawRightString(W - 18 * mm, 7 * mm, f"{label}  ·  {page}/{total}")


def header(c, kicker, title, y=H - 18 * mm):
    c.setFillColor(TEAL)
    c.setFont("SansBold", 8)
    c.drawString(18 * mm, y, kicker.upper())
    c.setFillColor(INK)
    c.setFont("SerifBold", 18)
    c.drawString(18 * mm, y - 9 * mm, title)
    return y - 16 * mm


def card(c, x, y, w, h, fill=CARD):
    c.setFillColor(fill)
    c.setStrokeColor(HexColor("#D9E2E4"))
    c.setLineWidth(0.6)
    c.roundRect(x, y, w, h, 4, fill=1, stroke=1)


def bullet_block(c, x, y, lines, font="Sans", size=8.5, leading=11.5, color=INK, max_w=None):
    c.setFillColor(color)
    c.setFont(font, size)
    for line in lines:
        if max_w:
            for wl in wrap(c, line, font, size, max_w):
                c.drawString(x, y, wl)
                y -= leading
        else:
            c.drawString(x, y, line)
            y -= leading
    return y


# ===================== SLIDES =====================

def slide_01(c):
    draw_bg(c)
    # Cover composition
    c.setFillColor(TEAL_DARK)
    c.rect(0, 0, W * 0.42, H, fill=1, stroke=0)
    c.setFillColor(GOLD)
    c.rect(0, H - 8, W * 0.42, 8, fill=1, stroke=0)

    c.setFillColor(GOLD_SOFT)
    c.setFont("SansBold", 9)
    c.drawString(18 * mm, H - 28 * mm, "PRUEBA TÉCNICA · ANALISTA DE MARCA")

    c.setFillColor(WHITE)
    c.setFont("SerifBold", 28)
    for i, line in enumerate(["Activa más", "oportunidades"]):
        c.drawString(18 * mm, H - 48 * mm - i * 12 * mm, line)

    c.setFillColor(GOLD_SOFT)
    c.setFont("Sans", 11)
    c.drawString(18 * mm, H - 78 * mm, "Campaña piloto 360° · 6 semanas")

    c.setFillColor(WHITE)
    c.setFont("Sans", 9)
    y = H - 95 * mm
    for t in [
        "Paola Hoyos",
        "Propuesta de marca, comunicación,",
        "contenido y medición",
        "",
        "Audiencia prioritaria: comercios activos",
        "Presupuesto: COP $18.000.000",
    ]:
        c.drawString(18 * mm, y, t)
        y -= 5 * mm

    # Right side: problem + SMART
    c.setFillColor(TEAL)
    c.setFont("SansBold", 8)
    c.drawString(W * 0.42 + 14 * mm, H - 28 * mm, "COMPONENTE 1 · DIAGNÓSTICO Y ESTRATEGIA")

    c.setFillColor(INK)
    c.setFont("SerifBold", 13)
    c.drawString(W * 0.42 + 14 * mm, H - 38 * mm, "1. Problema de marca y negocio")

    problem = (
        "Los comercios activos usan PTM de forma parcial: "
        "operan una o pocas categorías y no activan el valor "
        "integral del portafolio, dejando sin capturar clientes, "
        "ingresos adicionales y utilidad cotidiana."
    )
    c.setFont("Sans", 9)
    c.setFillColor(INK)
    y = H - 46 * mm
    for line in wrap(c, problem, "Sans", 9, W * 0.52):
        c.drawString(W * 0.42 + 14 * mm, y, line)
        y -= 4.2 * mm

    y -= 4 * mm
    c.setFillColor(INK)
    c.setFont("SerifBold", 13)
    c.drawString(W * 0.42 + 14 * mm, y, "2. Objetivo SMART (6 semanas)")
    y -= 7 * mm

    smart = (
        "Al cierre del piloto, lograr que el 25% de los comercios "
        "de bajo uso del universo piloto complete ≥1 transacción "
        "en una segunda categoría, y que el 30% de uso medio "
        "aumente ≥40% la frecuencia semanal en categorías "
        "secundarias, frente a la línea base de las 4 semanas previas."
    )
    c.setFont("Sans", 8.5)
    for line in wrap(c, smart, "Sans", 8.5, W * 0.52):
        c.drawString(W * 0.42 + 14 * mm, y, line)
        y -= 4 * mm

    y -= 5 * mm
    c.setFont("SerifBold", 11)
    c.setFillColor(INK)
    c.drawString(W * 0.42 + 14 * mm, y, "Objetivos de comunicación")
    y -= 6 * mm
    objs = [
        "1. Hacer entendible el beneficio de «más categorías = más movimiento» en un mensaje único.",
        "2. Guiar la activación de un siguiente servicio sin tecnicismos ni fricción.",
        "3. Alinear a Comercial y Atención con un relato accionable y medible.",
    ]
    c.setFont("Sans", 8)
    for o in objs:
        for line in wrap(c, o, "Sans", 8, W * 0.52):
            c.drawString(W * 0.42 + 14 * mm, y, line)
            y -= 3.8 * mm
        y -= 1.5 * mm

    footer(c, 1)


def slide_02(c):
    draw_bg(c)
    y0 = header(c, "Componente 1 · Puntos 3–4", "Audiencias prioritarias y promesa")

    # Priority audiences
    c.setFont("SansBold", 9)
    c.setFillColor(TEAL)
    c.drawString(18 * mm, y0, "3. Priorización de audiencias e insights")

    audiences = [
        (
            "P1 · Bajo uso",
            "Prioridad alta",
            "«Ya tengo PTM, pero siento que solo me sirve para una cosa. "
            "Si activar otra categoría es complicado o me quita tiempo, "
            "prefiero seguir como estoy.»",
            "Insight: no rechazan el portafolio; desconocen el siguiente paso útil y temen perder tiempo.",
        ),
        (
            "P2 · Uso medio",
            "Prioridad alta",
            "«Uso dos o tres servicios cuando me acuerdo, "
            "pero no veo a PTM como el lugar donde resuelvo casi todo.»",
            "Insight: el valor integral aún no es hábito; necesitan prueba de resultado, no más catálogo.",
        ),
        (
            "P3 · Comercial / Atención",
            "Habilitadora",
            "«Si el mensaje cambia por canal, pierdo claridad y el comercio se confunde.»",
            "Insight: necesitan un guion único, corto y accionable para acompañar sin improvisar.",
        ),
        (
            "P4 · Público general",
            "Refuerzo",
            "«Busco soluciones cercanas y rápidas cerca de mi casa.»",
            "Insight: reconocen el punto si ven utilidad concreta (pagar, recargar, retirar) en el barrio.",
        ),
    ]

    card_w = (W - 42 * mm) / 2
    card_h = 38 * mm
    start_y = y0 - 5 * mm
    for i, (title, tag, quote, insight) in enumerate(audiences):
        col = i % 2
        row = i // 2
        x = 18 * mm + col * (card_w + 6 * mm)
        y = start_y - row * (card_h + 4 * mm) - card_h
        card(c, x, y, card_w, card_h)
        c.setFillColor(GOLD if "alta" in tag else TEAL)
        c.roundRect(x + 3 * mm, y + card_h - 7.5 * mm, 28 * mm, 5 * mm, 2, fill=1, stroke=0)
        c.setFillColor(INK if "alta" in tag else WHITE)
        c.setFont("SansBold", 6.5)
        c.drawCentredString(x + 3 * mm + 14 * mm, y + card_h - 6 * mm, tag.upper())
        c.setFillColor(INK)
        c.setFont("SansBold", 9)
        c.drawString(x + 34 * mm, y + card_h - 6 * mm, title)
        c.setFont("Sans", 7.2)
        c.setFillColor(MUTED)
        ty = y + card_h - 12 * mm
        for line in wrap(c, quote, "Sans", 7.2, card_w - 8 * mm):
            c.drawString(x + 3.5 * mm, ty, line)
            ty -= 3.3 * mm
        c.setFillColor(TEAL_DARK)
        c.setFont("SansBold", 7)
        ty -= 1 * mm
        for line in wrap(c, insight, "SansBold", 7, card_w - 8 * mm):
            c.drawString(x + 3.5 * mm, ty, line)
            ty -= 3.2 * mm

    # Promise strip
    by = 18 * mm
    card(c, 18 * mm, by, W - 36 * mm, 28 * mm, MIST)
    c.setFillColor(TEAL)
    c.setFont("SansBold", 8)
    c.drawString(22 * mm, by + 22 * mm, "4. PROMESA DE CAMPAÑA")
    c.setFillColor(INK)
    c.setFont("SerifBold", 10)
    promise = "Con PTM, tu comercio atrae más clientes, genera ingresos extra y resuelve más necesidades desde un solo lugar."
    ty = by + 16 * mm
    for line in wrap(c, promise, "SerifBold", 10, W - 48 * mm):
        c.drawString(22 * mm, ty, line)
        ty -= 4.2 * mm
    c.setFont("Sans", 7.2)
    c.setFillColor(MUTED)
    c.drawString(
        22 * mm,
        by + 7.5 * mm,
        "Pilares: Atrae (más visitas) · Gana (comisión / ingreso adicional) · Resuelve (más servicios en el mismo mostrador)",
    )
    c.drawString(
        22 * mm,
        by + 3.2 * mm,
        "Razones para creer: +20.000 comercios · portafolio real (recargas, corresponsalía, pagos, SOAT…) · acompañamiento comercial · casos de más tráfico al punto",
    )

    footer(c, 2)


def slide_03(c):
    draw_bg(c)
    y0 = header(c, "Componente 1–2 · Puntos 5–7", "Identidad, concepto y guía visual")

    # Point 5
    card(c, 18 * mm, y0 - 32 * mm, W - 36 * mm, 30 * mm, MIST)
    c.setFillColor(TEAL)
    c.setFont("SansBold", 8)
    c.drawString(22 * mm, y0 - 6 * mm, "5. CÓMO LA IDEA FORTALECE IDENTIDAD Y REPUTACIÓN")
    c.setFillColor(INK)
    c.setFont("Sans", 8)
    txt = (
        "La idea refuerza el propósito público de PTM («mejoramos la vida de las personas») "
        "al hablar de utilidad cotidiana, no de features aisladas. Evita sobreprometer «vender más» "
        "sin explicación: cada mensaje muestra un beneficio concreto (atraer, ganar, resolver) "
        "y un siguiente paso. Así se protege la reputación de cercanía y se evita el riesgo de "
        "sonar como una fintech lejana o un catálogo técnico."
    )
    ty = y0 - 12 * mm
    for line in wrap(c, txt, "Sans", 8, W - 48 * mm):
        c.drawString(22 * mm, ty, line)
        ty -= 3.8 * mm

    # Concept
    y = y0 - 42 * mm
    c.setFillColor(TEAL)
    c.setFont("SansBold", 8)
    c.drawString(18 * mm, y, "6. CONCEPTO RECTOR Y FRASE DE CAMPAÑA")
    y -= 8 * mm

    card(c, 18 * mm, y - 28 * mm, 95 * mm, 32 * mm, TEAL_DARK)
    c.setFillColor(GOLD)
    c.setFont("SansBold", 8)
    c.drawString(22 * mm, y - 5 * mm, "CONCEPTO RECTOR")
    c.setFillColor(WHITE)
    c.setFont("SerifBold", 14)
    c.drawString(22 * mm, y - 13 * mm, "El mostrador que hace más")
    c.setFont("Sans", 8)
    c.setFillColor(GOLD_SOFT)
    for i, line in enumerate(
        wrap(
            c,
            "De una sola función a un punto de oportunidades: más servicios, más movimiento, más ingreso.",
            "Sans",
            8,
            85 * mm,
        )
    ):
        c.drawString(22 * mm, y - 20 * mm - i * 3.5 * mm, line)

    card(c, 120 * mm, y - 28 * mm, W - 138 * mm, 32 * mm, GOLD)
    c.setFillColor(INK)
    c.setFont("SansBold", 8)
    c.drawString(124 * mm, y - 5 * mm, "FRASE DE CAMPAÑA")
    c.setFont("SerifBold", 13)
    c.drawString(124 * mm, y - 13 * mm, "Activa más oportunidades")
    c.setFont("Sans", 8)
    for i, line in enumerate(
        wrap(
            c,
            "Se mantiene la frase del brief: es clara, accionable y coherente con el tono cercano de PTM. Se potencia con el concepto «mostrador que hace más».",
            "Sans",
            8,
            W - 150 * mm,
        )
    ):
        c.drawString(124 * mm, y - 20 * mm - i * 3.5 * mm, line)

    # Visual guide
    y = y - 40 * mm
    c.setFillColor(TEAL)
    c.setFont("SansBold", 8)
    c.drawString(18 * mm, y, "7. GUÍA VISUAL BÁSICA (MOODBOARD)")
    y -= 4 * mm

    cols = [
        ("Intención", "Cercanía de barrio + claridad útil. Fotos reales de mostrador, manos operando, gente del barrio. Sin stock frío ni estética «tech púrpura»."),
        ("Jerarquía", "1) Frase de campaña 2) Beneficio en una línea 3) CTA. Máximo un servicio destacado por pieza. Espacio blanco generoso."),
        ("Color", "Teal profundo (confianza) + amarillo activación (oportunidad) + crema cálida. Texto oscuro legible. Acento dorado solo en CTA y highlights."),
        ("Imagen", "Natural, luminosa, cotidiana. Preferir puntos PTM reales. Tipografía: serif corta para titulares, sans limpia para cuerpo."),
    ]
    cw = (W - 42 * mm) / 4
    for i, (t, body) in enumerate(cols):
        x = 18 * mm + i * (cw + 2 * mm)
        card(c, x, 16 * mm, cw, y - 18 * mm)
        # color swatch
        colors = [TEAL, GOLD, TEAL_DARK, HexColor("#D9783A")]
        c.setFillColor(colors[i])
        c.rect(x, 16 * mm + (y - 18 * mm) - 4 * mm, cw, 4 * mm, fill=1, stroke=0)
        c.setFillColor(INK)
        c.setFont("SansBold", 8)
        c.drawString(x + 2.5 * mm, y - 8 * mm, t)
        c.setFont("Sans", 6.8)
        c.setFillColor(MUTED)
        ty = y - 13 * mm
        for line in wrap(c, body, "Sans", 6.8, cw - 5 * mm):
            c.drawString(x + 2.5 * mm, ty, line)
            ty -= 3.1 * mm

    footer(c, 3)


def slide_04(c):
    draw_bg(c)
    y0 = header(c, "Componente 2 · Puntos 8–9", "Sistema de mensajes y CTA")

    pieces = [
        (
            "WhatsApp (comercio)",
            "Hola, {{nombre}}. En PTM ya tienes una categoría activa. En 2 minutos puedes activar una segunda (por ejemplo, pagos o corresponsalía) y empezar a recibir más visitas al punto.\n\n¿Quieres que te enviemos el paso a paso de tu siguiente servicio?\n👉 Responde ACTIVAR o toca este enlace: {{link}}\n\nActiva más oportunidades — PTM",
        ),
        (
            "Pop-up en plataforma",
            "Título: Activa más oportunidades\nCuerpo: Tu comercio ya está en PTM. El siguiente servicio puede traerte más clientes esta misma semana.\nCTA: Activar mi siguiente servicio\nSecundario: Ver cómo funciona (30 seg)",
        ),
        (
            "Publicación redes (IG/FB)",
            "Tus vecinos no solo compran: también pagan, recargan y resuelven trámites cerca de casa.\n\nSi tu comercio ya está en PTM, activar un servicio más puede significar más visitas y un ingreso extra — desde el mismo mostrador.\n\nActiva más oportunidades.\nDesliza y mira cómo empezar hoy.\n#PTM #ComercioDeBarrio",
        ),
        (
            "Material punto de venta",
            "Cabeza: Aquí activas más oportunidades\nSub: Recargas · Pagos · Corresponsalía · y más\nPie: Pregunta en el mostrador cómo activar tu siguiente servicio PTM\nCTA visible: Activa tu siguiente servicio",
        ),
    ]

    cw = (W - 42 * mm) / 2
    ch = 48 * mm
    for i, (title, body) in enumerate(pieces):
        col, row = i % 2, i // 2
        x = 18 * mm + col * (cw + 6 * mm)
        y = y0 - 4 * mm - row * (ch + 4 * mm) - ch
        card(c, x, y, cw, ch)
        c.setFillColor(TEAL)
        c.setFont("SansBold", 8)
        c.drawString(x + 3 * mm, y + ch - 6 * mm, title.upper())
        c.setStrokeColor(GOLD)
        c.setLineWidth(1.5)
        c.line(x + 3 * mm, y + ch - 8 * mm, x + 28 * mm, y + ch - 8 * mm)
        c.setFillColor(INK)
        c.setFont("Sans", 7)
        ty = y + ch - 13 * mm
        for para in body.split("\n"):
            if not para.strip():
                ty -= 2 * mm
                continue
            for line in wrap(c, para, "Sans", 7, cw - 7 * mm):
                c.drawString(x + 3 * mm, ty, line)
                ty -= 3.15 * mm

    # CTA bar
    card(c, 18 * mm, 12 * mm, W - 36 * mm, 22 * mm, TEAL_DARK)
    c.setFillColor(GOLD)
    c.setFont("SansBold", 8)
    c.drawString(22 * mm, 28 * mm, "9. CTA COMÚN")
    c.setFillColor(WHITE)
    c.setFont("SerifBold", 12)
    c.drawString(22 * mm, 21 * mm, "«Activa tu siguiente servicio»")
    c.setFont("Sans", 7)
    c.setFillColor(GOLD_SOFT)
    c.drawString(
        22 * mm,
        15 * mm,
        "Bajo uso → «elige 1 categoría nueva» · Uso medio → «reactiva / aumenta frecuencia» · Comercial → «agenda activación hoy» · Redes/POS → reconocimiento + pregunta en mostrador · WhatsApp/pop-up → acción inmediata con link",
    )

    footer(c, 4)


def slide_05(c):
    draw_bg(c)
    y0 = header(c, "Componente 3 · Punto 10", "Journey de comunicación · 6 semanas")

    stages = [
        ("S1", "Expectativa", "Teaser + alineación interna", "Correo + WhatsApp teaser; kit Comercial; pop-up soft «próximamente»."),
        ("S2", "Lanzamiento", "Promesa + CTA claro", "Oleada principal: WA, SMS, pop-up, RRSS, material POS; guion único."),
        ("S3", "Activación", "Paso a paso por segmento", "Tutoriales cortos; Comercial prioriza bajo uso; recordatorio SMS."),
        ("S4", "Prueba social", "Resultados tempranos", "Casos de comercios del piloto; RRSS + WA; refuerzo uso medio."),
        ("S5", "Aceleración", "Cierre de gaps", "Remarketing a no activados; A/B winners; visita Comercial a rezagados."),
        ("S6", "Seguimiento", "Habito + aprendizaje", "Encuesta NPS utilidad; thank-you; dashboard final; next best action."),
    ]

    sw = (W - 40 * mm) / 6
    for i, (wk, name, focus, tactics) in enumerate(stages):
        x = 18 * mm + i * (sw + 1.5 * mm)
        # connector
        if i < 5:
            c.setStrokeColor(GOLD)
            c.setLineWidth(2)
            c.line(x + sw - 1 * mm, H - 55 * mm, x + sw + 1.5 * mm, H - 55 * mm)
        c.setFillColor(TEAL if i % 2 == 0 else TEAL_DARK)
        c.circle(x + sw / 2, H - 55 * mm, 7, fill=1, stroke=0)
        c.setFillColor(WHITE)
        c.setFont("SansBold", 7)
        c.drawCentredString(x + sw / 2, H - 56.5 * mm, wk)

        card(c, x, 28 * mm, sw, 95 * mm)
        c.setFillColor(GOLD)
        c.setFont("SansBold", 7)
        c.drawCentredString(x + sw / 2, 28 * mm + 88 * mm, name.upper())
        c.setFillColor(INK)
        c.setFont("SansBold", 8)
        ty = 28 * mm + 78 * mm
        for line in wrap(c, focus, "SansBold", 8, sw - 5 * mm):
            c.drawCentredString(x + sw / 2, ty, line)
            ty -= 3.8 * mm
        c.setFillColor(MUTED)
        c.setFont("Sans", 6.8)
        ty -= 2 * mm
        for line in wrap(c, tactics, "Sans", 6.8, sw - 5 * mm):
            c.drawCentredString(x + sw / 2, ty, line)
            ty -= 3.2 * mm

    c.setFillColor(MUTED)
    c.setFont("Sans", 7.5)
    c.drawString(
        18 * mm,
        18 * mm,
        "Lógica: primero claridad interna → promesa simple → ayuda a activar → prueba social → recuperación → aprendizaje medible.",
    )
    footer(c, 5)


def slide_06(c):
    draw_bg(c)
    y0 = header(c, "Componente 3 · Puntos 11–12", "Plan de canales y presupuesto")

    c.setFillColor(TEAL)
    c.setFont("SansBold", 8)
    c.drawString(18 * mm, y0, "11. PLAN DE CANALES (rol · frecuencia · contenido por etapa)")

    headers = ["Canal", "Rol", "Frecuencia", "Contenido clave"]
    rows = [
        ["WhatsApp", "Conversión 1:1", "2–3/sem S2–S5", "Teaser, paso a paso, recordatorio, caso"],
        ["SMS", "Disparo corto", "1/sem S2–S4", "CTA + link corto; urgencia útil"],
        ["Correo", "Contexto / kit", "1 S1, 1 S2, 1 S6", "Explicación, resultados, cierre"],
        ["Pop-up", "Captura en uso", "Siempre-on S2–S5", "Beneficio + CTA activar"],
        ["RRSS", "Reconocimiento", "3/sem S2–S6", "Beneficio, tutorial, prueba social"],
        ["POS", "Refuerzo físico", "Todo el piloto", "Afiche/counter card + frase única"],
        ["Comercial", "Activación asistida", "Diario S2–S5", "Guion 60 seg + checklist"],
    ]

    table_top = y0 - 4 * mm
    col_w = [28 * mm, 32 * mm, 38 * mm, W - 36 * mm - 98 * mm]
    x0 = 18 * mm
    row_h = 6.2 * mm

    # header row
    c.setFillColor(TEAL_DARK)
    c.rect(x0, table_top - row_h, sum(col_w), row_h, fill=1, stroke=0)
    c.setFillColor(WHITE)
    c.setFont("SansBold", 7)
    x = x0
    for i, h in enumerate(headers):
        c.drawString(x + 1.5 * mm, table_top - row_h + 2 * mm, h)
        x += col_w[i]

    for r_i, row in enumerate(rows):
        y = table_top - (r_i + 2) * row_h
        c.setFillColor(WHITE if r_i % 2 == 0 else SOFT)
        c.rect(x0, y, sum(col_w), row_h, fill=1, stroke=0)
        c.setFillColor(INK)
        c.setFont("Sans", 6.8)
        x = x0
        for i, cell in enumerate(row):
            c.setFont("SansBold" if i == 0 else "Sans", 6.8)
            c.drawString(x + 1.5 * mm, y + 2 * mm, cell)
            x += col_w[i]

    # Budget
    by = 14 * mm
    c.setFillColor(TEAL)
    c.setFont("SansBold", 8)
    c.drawString(18 * mm, by + 48 * mm, "12. PRESUPUESTO COP $18.000.000 — criterio: priorizar canales de activación directa")

    budget = [
        ("WhatsApp Business / CRM", "4.200.000", "23%", "Mayor apertura y conversión en comercios"),
        ("Equipo comercial (kit + incentivos)", "3.600.000", "20%", "Activación asistida en bajo uso"),
        ("SMS", "2.200.000", "12%", "Recordatorios de bajo costo"),
        ("Material POS + impresión", "2.000.000", "11%", "Refuerzo en el punto"),
        ("Paid social / boost RRSS", "1.800.000", "10%", "Alcance a clientes del barrio"),
        ("Diseño / piezas / edición", "1.500.000", "8%", "Sistema visual coherente"),
        ("Pop-up / producto digital", "1.000.000", "6%", "Implementación y QA"),
        ("Correo + automatizaciones", "700.000", "4%", "Journey y reportes"),
        ("PR / aliados / contenidos", "600.000", "3%", "Ángulo reputacional"),
        ("Contingencia / tests A/B", "400.000", "2%", "Optimización S4–S5"),
    ]

    bw = (W - 40 * mm) / 5
    for i, (name, amt, pct, why) in enumerate(budget):
        col = i % 5
        row = i // 5
        x = 18 * mm + col * (bw + 1.5 * mm)
        y = by + 22 * mm - row * 22 * mm
        card(c, x, y, bw, 20 * mm)
        c.setFillColor(GOLD)
        c.setFont("SansBold", 8)
        c.drawString(x + 2 * mm, y + 14 * mm, pct)
        c.setFillColor(INK)
        c.setFont("SansBold", 6.2)
        for j, line in enumerate(wrap(c, name, "SansBold", 6.2, bw - 4 * mm)[:2]):
            c.drawString(x + 2 * mm, y + 9.5 * mm - j * 2.8 * mm, line)
        c.setFillColor(MUTED)
        c.setFont("Sans", 6)
        c.drawString(x + 2 * mm, y + 2.5 * mm, f"$ {amt}")

    footer(c, 6)


def slide_07(c):
    draw_bg(c)
    y0 = header(c, "Componente 3 · Punto 13", "Gobierno, dependencias y riesgos")

    # RACI-ish
    card(c, 18 * mm, y0 - 55 * mm, W * 0.55, 52 * mm)
    c.setFillColor(TEAL)
    c.setFont("SansBold", 8)
    c.drawString(22 * mm, y0 - 6 * mm, "RESPONSABLES · DEPENDENCIAS · APROBACIONES")

    items = [
        ("Marca (owner)", "Mensaje único, tono, guion Comercial, validación reputacional."),
        ("Diseño", "Sistema visual, POS, pop-up, piezas RRSS (SLA 5 días hábiles)."),
        ("Digital", "WA/SMS/correo/pop-up, tracking UTM, dashboard semanal."),
        ("Trade / Comercial", "Priorización de rutas, activación asistida, feedback de campo."),
        ("Experiencia / Atención", "FAQ, manejo de objeciones, escalamiento social."),
        ("Aprobaciones", "Marca+Legal (claims) → Comercial (operabilidad) → go-live S2."),
        ("Dependencias críticas", "Base segmentada · links de activación estables · stock material POS · capacitación S1."),
    ]
    ty = y0 - 12 * mm
    for title, body in items:
        c.setFillColor(INK)
        c.setFont("SansBold", 7.5)
        c.drawString(22 * mm, ty, title)
        c.setFont("Sans", 7)
        c.setFillColor(MUTED)
        c.drawString(55 * mm, ty, body[:95])
        ty -= 5.5 * mm

    # Risks
    card(c, W * 0.55 + 12 * mm, y0 - 55 * mm, W * 0.45 - 30 * mm, 52 * mm, HexColor("#FFF6EE"))
    c.setFillColor(ALERT)
    c.setFont("SansBold", 8)
    c.drawString(W * 0.55 + 16 * mm, y0 - 6 * mm, "3 RIESGOS PRINCIPALES")

    risks = [
        (
            "1. Sobrepromesa de ventas",
            "Mitigación: claims solo con beneficio + paso a paso; Legal revisa; CTA «activar», no «vender más ya».",
        ),
        (
            "2. Fricción en activación",
            "Mitigación: tutorial 30–60 seg; Comercial con checklist; hotline WA en S2–S4.",
        ),
        (
            "3. Mensaje diluido por canal",
            "Mitigación: kit de 1 página; auditoría semanal de piezas; veto de Marca a variantes no aprobadas.",
        ),
    ]
    ty = y0 - 14 * mm
    x = W * 0.55 + 16 * mm
    maxw = W * 0.45 - 40 * mm
    for title, body in risks:
        c.setFillColor(INK)
        c.setFont("SansBold", 7.5)
        c.drawString(x, ty, title)
        ty -= 4 * mm
        c.setFont("Sans", 6.8)
        c.setFillColor(MUTED)
        for line in wrap(c, body, "Sans", 6.8, maxw):
            c.drawString(x, ty, line)
            ty -= 3.2 * mm
        ty -= 3 * mm

    # Decision note
    card(c, 18 * mm, 16 * mm, W - 36 * mm, 22 * mm, MIST)
    c.setFillColor(TEAL_DARK)
    c.setFont("SansBold", 8)
    c.drawString(22 * mm, 32 * mm, "REGLA DE GOBIERNO")
    c.setFillColor(INK)
    c.setFont("Sans", 8)
    c.drawString(
        22 * mm,
        24 * mm,
        "Ningún canal publica sin el mensaje núcleo aprobado. Comercial puede adaptar ejemplos de servicio, no la promesa ni el CTA.",
    )
    c.drawString(
        22 * mm,
        19 * mm,
        "War room semanal (30 min): Marca + Digital + Comercial. Kill criteria en slide de medición.",
    )

    footer(c, 7)


def slide_08(c):
    draw_bg(c)
    y0 = header(c, "Componente 4 · Puntos 14–15", "Indicadores y pruebas A/B")

    c.setFillColor(TEAL)
    c.setFont("SansBold", 8)
    c.drawString(18 * mm, y0, "14. CINCO INDICADORES Y METAS (justificación con línea base del caso*)")

    kpis = [
        ("% 2.ª categoría\n(bajo uso)", "25%", "Base* 8% hist. activación 2.ª cat. → meta ×3.1 en 6 sem. con WA+Comercial."),
        ("↑ frecuencia\ncat. secundarias", "+40%", "Base* 1,2 tx/sem en uso medio → meta 1,7 tx/sem (hábito)."),
        ("CTR CTA\n«Activar»", "12%", "Base* pop-up/WA ~6–7% en avisos previos → duplicar con beneficio+paso."),
        ("Activaciones\nasistidas Comercial", "35%", "Del total de 2.ª cat.; Comercial explica ~1/3 del lift en bajo uso."),
        ("CSAT utilidad\nmensaje", "≥4,2/5", "Base* encuestas onboarding ~3,8 → meta claridad sin tecnicismos."),
    ]

    kw = (W - 42 * mm) / 5
    for i, (name, meta, just) in enumerate(kpis):
        x = 18 * mm + i * (kw + 2 * mm)
        card(c, x, y0 - 48 * mm, kw, 44 * mm)
        c.setFillColor(GOLD)
        c.setFont("SerifBold", 16)
        c.drawCentredString(x + kw / 2, y0 - 14 * mm, meta)
        c.setFillColor(INK)
        c.setFont("SansBold", 7)
        ty = y0 - 20 * mm
        for line in name.split("\n"):
            c.drawCentredString(x + kw / 2, ty, line)
            ty -= 3.5 * mm
        c.setFillColor(MUTED)
        c.setFont("Sans", 6.2)
        ty -= 1 * mm
        for line in wrap(c, just, "Sans", 6.2, kw - 4 * mm):
            c.drawCentredString(x + kw / 2, ty, line)
            ty -= 2.9 * mm

    c.setFillColor(MUTED)
    c.setFont("Sans", 6.5)
    c.drawString(18 * mm, y0 - 52 * mm, "*Línea base declarada en supuestos (el brief no incluye tablas numéricas). Justificación de metas 1–3 anclada a esa base.")

    # A/B
    c.setFillColor(TEAL)
    c.setFont("SansBold", 8)
    c.drawString(18 * mm, y0 - 58 * mm, "15. DOS PRUEBAS A/B")

    tests = [
        (
            "A/B 1 · Beneficio vs. Instrucción (WhatsApp)",
            "Hipótesis: el mensaje centrado en «más visitas esta semana» convierte mejor que el centrado solo en pasos técnicos.",
            "Variable: primer bloque del WA (beneficio vs. cómo hacerlo).",
            "Éxito: CTR al link de activación ≥ +20% relativo vs. control en 7 días.",
            "Decisión: el ganador pasa a plantilla oficial S4–S6; el perdedor se archiva.",
        ),
        (
            "A/B 2 · Un servicio vs. menú (pop-up)",
            "Hipótesis: recomendar 1 siguiente servicio según uso actual supera mostrar 4 categorías.",
            "Variable: contenido del pop-up (1 recomendación vs. menú).",
            "Éxito: tasa de inicio de activación ≥ +15% relativo; menor rebote inmediato.",
            "Decisión: si gana 1 servicio, personalización por segmento; si gana menú, mantener catálogo corto.",
        ),
    ]

    tw = (W - 42 * mm) / 2
    for i, (title, hyp, var, success, decision) in enumerate(tests):
        x = 18 * mm + i * (tw + 6 * mm)
        card(c, x, 14 * mm, tw, 52 * mm)
        c.setFillColor(TEAL_DARK)
        c.setFont("SansBold", 7.5)
        c.drawString(x + 3 * mm, 14 * mm + 45 * mm, title)
        c.setFillColor(INK)
        c.setFont("Sans", 6.8)
        ty = 14 * mm + 38 * mm
        for label, text in [("H", hyp), ("V", var), ("M", success), ("D", decision)]:
            c.setFont("SansBold", 6.8)
            c.setFillColor(GOLD if label == "H" else TEAL)
            c.drawString(x + 3 * mm, ty, label)
            c.setFillColor(INK)
            c.setFont("Sans", 6.8)
            for line in wrap(c, text, "Sans", 6.8, tw - 10 * mm):
                c.drawString(x + 8 * mm, ty, line)
                ty -= 3.1 * mm
            ty -= 1.2 * mm

    footer(c, 8)


def slide_09(c):
    draw_bg(c)
    y0 = header(c, "Componente 4 · Punto 16", "Análisis de datos del caso · hallazgos y acciones")

    # Assumed mid-pilot data table
    c.setFillColor(TEAL)
    c.setFont("SansBold", 8)
    c.drawString(18 * mm, y0, "LECTURA DE DATOS (corte semana 3 del piloto — ver supuestos)")

    headers = ["Métrica", "Bajo uso", "Uso medio", "vs. meta parcial"]
    data = [
        ["Apertura WA", "68%", "71%", "En línea"],
        ["CTR «Activar»", "9,1%", "11,4%", "Bajo uso −24% vs. ritmo"],
        ["2.ª categoría iniciada", "14%", "—", "Atrasado vs. curva 25%"],
        ["2.ª categoría con ≥1 tx", "9%", "—", "Gap post-clic"],
        ["Frecuencia cat. sec.", "—", "+18%", "Atrasado vs. +40%"],
        ["Activaciones vía Comercial", "41% del total", "22%", "Comercial jalona bajo uso"],
        ["Reclamos / confusión mensaje", "37 tickets", "12", "Pico en S2"],
    ]

    x0 = 18 * mm
    col_w = [50 * mm, 35 * mm, 35 * mm, 55 * mm]
    row_h = 6 * mm
    top = y0 - 3 * mm
    c.setFillColor(TEAL_DARK)
    c.rect(x0, top - row_h, sum(col_w), row_h, fill=1, stroke=0)
    c.setFillColor(WHITE)
    c.setFont("SansBold", 7)
    x = x0
    for i, h in enumerate(headers):
        c.drawString(x + 1.5 * mm, top - row_h + 1.8 * mm, h)
        x += col_w[i]
    for r_i, row in enumerate(data):
        y = top - (r_i + 2) * row_h
        c.setFillColor(WHITE if r_i % 2 == 0 else SOFT)
        c.rect(x0, y, sum(col_w), row_h, fill=1, stroke=0)
        c.setFillColor(INK)
        c.setFont("Sans", 6.8)
        x = x0
        for i, cell in enumerate(row):
            c.setFont("SansBold" if i == 0 else "Sans", 6.8)
            c.drawString(x + 1.5 * mm, y + 1.8 * mm, cell)
            x += col_w[i]

    # Findings + actions
    findings = [
        (
            "Hallazgo 1",
            "Hay interés (apertura WA alta), pero el CTR en bajo uso no acompaña: el mensaje abre la puerta y no cierra la activación.",
        ),
        (
            "Hallazgo 2",
            "El mayor hueco está entre «iniciar» y «completar 1 tx»: no es solo awareness, es fricción o duda en el momento de uso.",
        ),
        (
            "Hallazgo 3",
            "Comercial concentra el lift en bajo uso; uso medio responde mejor a digital, pero aún lejos del hábito (+18% vs +40%).",
        ),
    ]
    actions = [
        (
            "Acción 1",
            "S4: reemplazar creatividades WA de bajo uso por ganador A/B «beneficio + 1 servicio recomendado» y link profundo al flujo.",
        ),
        (
            "Acción 2",
            "Activar micro-tutorial in-app/WA de 30 seg al iniciar 2.ª categoría + seguimiento a 24 h si no hay 1.ª tx.",
        ),
        (
            "Acción 3",
            "Reasignar 15% del tiempo Comercial de uso medio a bajo uso rezagado; a uso medio, racha de recordatorios de frecuencia (SMS+WA).",
        ),
    ]

    fy = 14 * mm + 52 * mm
    fw = (W - 42 * mm) / 2
    for i, (t, b) in enumerate(findings):
        y = fy - i * 17 * mm
        card(c, 18 * mm, y - 14 * mm, fw, 15 * mm, MIST)
        c.setFillColor(TEAL)
        c.setFont("SansBold", 7)
        c.drawString(21 * mm, y - 3 * mm, t.upper())
        c.setFillColor(INK)
        c.setFont("Sans", 6.6)
        ty = y - 7 * mm
        for line in wrap(c, b, "Sans", 6.6, fw - 8 * mm):
            c.drawString(21 * mm, ty, line)
            ty -= 3 * mm

    for i, (t, b) in enumerate(actions):
        y = fy - i * 17 * mm
        card(c, 18 * mm + fw + 6 * mm, y - 14 * mm, fw, 15 * mm, HexColor("#FFF8E8"))
        c.setFillColor(ALERT)
        c.setFont("SansBold", 7)
        c.drawString(21 * mm + fw + 6 * mm, y - 3 * mm, t.upper())
        c.setFillColor(INK)
        c.setFont("Sans", 6.6)
        ty = y - 7 * mm
        for line in wrap(c, b, "Sans", 6.6, fw - 8 * mm):
            c.drawString(21 * mm + fw + 6 * mm, ty, line)
            ty -= 3 * mm

    footer(c, 9)


def slide_10(c):
    draw_bg(c)
    y0 = header(c, "Componente 5 · Puntos 17–18", "PR y respuesta en redes")

    # PR
    card(c, 18 * mm, y0 - 58 * mm, W * 0.55, 55 * mm)
    c.setFillColor(TEAL)
    c.setFont("SansBold", 8)
    c.drawString(22 * mm, y0 - 6 * mm, "17. ÁNGULO PARA MEDIOS / ALIADOS")

    c.setFillColor(INK)
    c.setFont("SansBold", 8)
    c.drawString(22 * mm, y0 - 13 * mm, "Ángulo")
    c.setFont("Sans", 7.5)
    ang = (
        "Los comercios de barrio como infraestructura de inclusión cotidiana: "
        "cómo una red de más de 20.000 puntos puede activar más servicios "
        "útiles sin que el tendero se vuelva experto en tecnología."
    )
    ty = y0 - 18 * mm
    for line in wrap(c, ang, "Sans", 7.5, W * 0.55 - 12 * mm):
        c.drawString(22 * mm, ty, line)
        ty -= 3.5 * mm

    ty -= 2 * mm
    c.setFont("SansBold", 8)
    c.setFillColor(INK)
    c.drawString(22 * mm, ty, "Titular propuesto")
    ty -= 5 * mm
    c.setFillColor(TEAL_DARK)
    c.setFont("SerifBold", 10)
    for line in wrap(
        c,
        "«Activa más oportunidades»: la apuesta de PTM para que el comercio de barrio ofrezca más servicios desde el mismo mostrador",
        "SerifBold",
        10,
        W * 0.55 - 12 * mm,
    ):
        c.drawString(22 * mm, ty, line)
        ty -= 4.5 * mm

    ty -= 2 * mm
    c.setFillColor(INK)
    c.setFont("SansBold", 8)
    c.drawString(22 * mm, ty, "Tres mensajes de vocería")
    ty -= 5 * mm
    msgs = [
        "1. PTM no pide al comercio «ser digital»: le da un siguiente servicio útil, paso a paso.",
        "2. Más categorías en el punto = más razones para que el vecino vuelva.",
        "3. La campaña se mide en activaciones reales, no en likes: queremos uso, no ruido.",
    ]
    c.setFont("Sans", 7.2)
    for m in msgs:
        for line in wrap(c, m, "Sans", 7.2, W * 0.55 - 12 * mm):
            c.drawString(22 * mm, ty, line)
            ty -= 3.3 * mm
        ty -= 1 * mm

    # Social response
    card(c, W * 0.55 + 10 * mm, y0 - 58 * mm, W * 0.45 - 28 * mm, 55 * mm, MIST)
    c.setFillColor(ALERT)
    c.setFont("SansBold", 8)
    c.drawString(W * 0.55 + 14 * mm, y0 - 6 * mm, "18. RESPUESTA AL COMENTARIO")
    c.setFillColor(MUTED)
    c.setFont("Sans", 6.8)
    x = W * 0.55 + 14 * mm
    maxw = W * 0.45 - 38 * mm
    ty = y0 - 12 * mm
    for line in wrap(
        c,
        "Comentario: «PTM dice que ayuda a vender más, pero nadie explica cómo activar los servicios».",
        "Sans",
        6.8,
        maxw,
    ):
        c.drawString(x, ty, line)
        ty -= 3.1 * mm

    ty -= 2 * mm
    c.setFillColor(TEAL)
    c.setFont("SansBold", 7)
    c.drawString(x, ty, "Respuesta pública (tono cercano y útil)")
    ty -= 4.5 * mm
    c.setFillColor(INK)
    c.setFont("Sans", 7)
    reply = (
        "Tienes razón en pedirlo claro. Activar un servicio en PTM se hace desde la plataforma "
        "en pocos pasos (o con ayuda de tu asesor). Te dejamos aquí la guía de 30 segundos "
        "{{link}} y, si prefieres, escríbenos por WhatsApp {{wa}} con el nombre de tu comercio "
        "y te acompañamos hoy. Gracias por decirlo: justo por eso existe «Activa más oportunidades»."
    )
    for line in wrap(c, reply, "Sans", 7, maxw):
        c.drawString(x, ty, line)
        ty -= 3.2 * mm

    ty -= 2 * mm
    c.setFillColor(MUTED)
    c.setFont("Sans", 6.5)
    for line in wrap(
        c,
        "Nota interna: no discutir en hilo; ofrecer ayuda concreta; escalar a Atención si pide caso puntual.",
        "Sans",
        6.5,
        maxw,
    ):
        c.drawString(x, ty, line)
        ty -= 3 * mm

    # bottom note
    card(c, 18 * mm, 14 * mm, W - 36 * mm, 18 * mm, TEAL_DARK)
    c.setFillColor(GOLD)
    c.setFont("SansBold", 8)
    c.drawString(22 * mm, 26 * mm, "PRINCIPIO REPUTACIONAL")
    c.setFillColor(WHITE)
    c.setFont("Sans", 8)
    c.drawString(
        22 * mm,
        18 * mm,
        "Si alguien dice «no me explican», la marca responde con el cómo — no con defensa. Cada queja pública es un CTA de acompañamiento.",
    )

    footer(c, 10)


def slide_11(c):
    draw_bg(c)
    y0 = header(c, "Componente 5 · Punto 19", "Ruta de escalamiento reputacional")

    c.setFillColor(TEAL)
    c.setFont("SansBold", 8)
    c.drawString(18 * mm, y0, "SI APARECEN 20 COMENTARIOS SIMILARES EN 2 HORAS")

    steps = [
        ("0–15 min", "Detección", "Community / Social escucha alerta al canal #marca-crisis. Congela respuestas improvisadas. Captura evidencia (capturas + URLs)."),
        ("15–30 min", "Diagnóstico", "Marca + Experiencia clasifican: ¿fallo de claridad? ¿bug de activación? ¿promesa percibida? Se define causa probable."),
        ("30–45 min", "Decisión", "Si es claridad: publicar respuesta madre + guía. Si es técnico: Producto/Digital confirma status y Marca emite update. Vocero único."),
        ("45–90 min", "Respuesta", "1 post/comentario pinneable con cómo activar + WA de ayuda. Atención contacta casos nominados. Comercial recibe talking points."),
        ("2–6 h", "Contención", "Monitoreo cada 30 min. Actualizar si hay fix. No borrar críticas de buena fe. Escalar a Dirección si hay medios o volumen ×2."),
        ("24–48 h", "Cierre", "Post-mortem: causa, volumen, CSAT, cambios de copy/flujo. Ajuste de campaña si el claim generó expectativa irreal."),
    ]

    sw = (W - 40 * mm) / 3
    for i, (time, name, body) in enumerate(steps):
        col, row = i % 3, i // 3
        x = 18 * mm + col * (sw + 3 * mm)
        y = y0 - 8 * mm - row * 52 * mm - 48 * mm
        card(c, x, y, sw, 48 * mm)
        c.setFillColor(GOLD)
        c.roundRect(x + 3 * mm, y + 40 * mm, 28 * mm, 5 * mm, 2, fill=1, stroke=0)
        c.setFillColor(INK)
        c.setFont("SansBold", 6.5)
        c.drawCentredString(x + 17 * mm, y + 41.5 * mm, time)
        c.setFont("SansBold", 10)
        c.setFillColor(TEAL_DARK)
        c.drawString(x + 3 * mm, y + 32 * mm, f"{i+1}. {name}")
        c.setFillColor(INK)
        c.setFont("Sans", 7)
        ty = y + 25 * mm
        for line in wrap(c, body, "Sans", 7, sw - 7 * mm):
            c.drawString(x + 3 * mm, ty, line)
            ty -= 3.3 * mm

    card(c, 18 * mm, 14 * mm, W - 36 * mm, 20 * mm, HexColor("#FFF6EE"))
    c.setFillColor(ALERT)
    c.setFont("SansBold", 8)
    c.drawString(22 * mm, 28 * mm, "SEÑALES PARA DETENER O MODIFICAR LA CAMPAÑA")
    c.setFillColor(INK)
    c.setFont("Sans", 7.5)
    c.drawString(
        22 * mm,
        21 * mm,
        "Kill/modify si: (a) tickets de confusión > 2× baseline por 48 h, (b) CTR activación cae >30% tras cambio de claim, (c) menciones negativas «engaño/no explican» > umbral 20/2 h sin contención efectiva.",
    )
    c.drawString(
        22 * mm,
        16 * mm,
        "En ese caso: pausar paid + claims agresivos; mantener solo guía de activación y acompañamiento Comercial.",
    )

    footer(c, 11)


def slide_12(c):
    draw_bg(c)
    y0 = header(c, "Cierre obligatorio", "Supuestos y uso responsable de IA")

    card(c, 18 * mm, y0 - 58 * mm, W * 0.48, 55 * mm)
    c.setFillColor(TEAL)
    c.setFont("SansBold", 8)
    c.drawString(22 * mm, y0 - 6 * mm, "SUPUESTOS DECLARADOS")
    assumptions = [
        "El brief no incluye tablas numéricas de línea base; se declara un universo piloto de 2.500 comercios activos contactables (1.600 bajo uso / 900 uso medio) para hacer medible el SMART.",
        "Línea base pre-piloto (4 semanas): activación histórica de 2.ª categoría 8%; frecuencia cat. secundarias en uso medio 1,2 tx/sem; CTR CTA previo ~6–7%; CSAT claridad 3,8/5.",
        "El corte de semana 3 (slide 9) es un escenario de análisis para demostrar criterio de optimización, no un dato interno real de PTM.",
        "Servicios de ejemplo (recargas, corresponsalía, pagos, SOAT) se usan porque son categorías públicas del portafolio PTM; la campaña no inventa productos.",
        "Presupuesto: costos de envío/impresión/paid son estimaciones de mercado local para un piloto de 6 semanas.",
        "Colores y guía visual son una interpretación de campaña coherente con tono cercano/útil; no sustituyen el brandbook oficial de PTM.",
    ]
    ty = y0 - 12 * mm
    c.setFont("Sans", 6.6)
    c.setFillColor(INK)
    for a in assumptions:
        c.setFillColor(GOLD)
        c.circle(24 * mm, ty + 1, 1.2, fill=1, stroke=0)
        c.setFillColor(INK)
        for line in wrap(c, a, "Sans", 6.6, W * 0.48 - 14 * mm):
            c.drawString(27 * mm, ty, line)
            ty -= 3.0 * mm
        ty -= 1.8 * mm

    card(c, W * 0.48 + 14 * mm, y0 - 58 * mm, W * 0.52 - 32 * mm, 55 * mm, MIST)
    c.setFillColor(TEAL)
    c.setFont("SansBold", 8)
    c.drawString(W * 0.48 + 18 * mm, y0 - 6 * mm, "USO DE IA · QUÉ HICE YO")
    ai = [
        "Usé IA como apoyo para estructurar el PDF, ordenar componentes y revisar densidad de slides.",
        "Decisiones propias: problema en una frase, SMART, priorización P1–P4, insights, promesa/pilares, mantener la frase del brief, CTA único, journey, mix presupuestal, KPIs, diseño de A/B, hallazgos/acciones, ángulo PR, respuesta al comentario y ruta de crisis.",
        "Validación humana: coherencia con comunicación pública de PTM (cercanía, utilidad, comercios de barrio, propósito de mejorar la vida de las personas), tono sin tecnicismos, y que cada slide responda puntos 1–19 sin inventar productos.",
        "Ajustes propios: recorte de copy genérico, claims cuidadosos («activar / atraer / resolver» vs. garantías de ventas), y kill criteria reputacionales.",
    ]
    ty = y0 - 12 * mm
    x = W * 0.48 + 18 * mm
    maxw = W * 0.52 - 42 * mm
    c.setFont("Sans", 6.6)
    for a in ai:
        c.setFillColor(TEAL)
        c.circle(x + 1 * mm, ty + 1, 1.2, fill=1, stroke=0)
        c.setFillColor(INK)
        for line in wrap(c, a, "Sans", 6.6, maxw):
            c.drawString(x + 4 * mm, ty, line)
            ty -= 3.0 * mm
        ty -= 2 * mm

    # closing strip
    card(c, 18 * mm, 14 * mm, W - 36 * mm, 22 * mm, TEAL_DARK)
    c.setFillColor(GOLD)
    c.setFont("SansBold", 9)
    c.drawString(22 * mm, 28 * mm, "PAOLA HOYOS · ANALISTA DE MARCA")
    c.setFillColor(WHITE)
    c.setFont("Sans", 8)
    c.drawString(
        22 * mm,
        20 * mm,
        "Propuesta ejecutable con Marca, Diseño, Digital, Trade y Experiencia. Sustentación: 12 min decisiones + 8 min Q&A.",
    )
    c.setFont("Sans", 7)
    c.setFillColor(GOLD_SOFT)
    c.drawString(
        22 * mm,
        15 * mm,
        "Fuentes de contexto público: ptm.com.co · LinkedIn PTM Plataforma · Facebook @ptmplataforma · comunicaciones sobre Feria del Tendero y propósito de marca.",
    )

    footer(c, 12)


# ===================== ANNEX =====================

def annex_page(c, num, total_annex=3):
    draw_bg(c, accent=True)
    c.setFillColor(GOLD)
    c.setFont("SansBold", 8)
    c.drawString(18 * mm, H - 14 * mm, "ANEXO OPCIONAL")
    footer(c, num, total=total_annex, label="Anexo")


def annex_01(c):
    annex_page(c, 1)
    header(c, "Anexo A", "Parrilla editorial resumida (6 semanas)")

    headers = ["Sem", "WhatsApp", "SMS", "RRSS", "POS / Comercial"]
    rows = [
        ["1", "Teaser + encuesta «qué te falta»", "—", "Expectativa / behind the scenes kit", "Capacitación guion 60s"],
        ["2", "Lanzamiento beneficio+CTA", "CTA link corto", "3 posts: promesa, cómo, CTA", "Entrega material + activación"],
        ["3", "Paso a paso 1 servicio", "Recordatorio no abiertos", "Tutorial 30s + stories", "Rutas bajo uso"],
        ["4", "Caso real piloto + A/B winner", "Uso medio: frecuencia", "Prueba social / UGC comercio", "Cierre gaps S2–S3"],
        ["5", "Remarketing no activados", "Última llamada útil", "Antes/después del mostrador", "Blitz rezagados"],
        ["6", "Agradecimiento + next step", "—", "Resultados + reconocimiento", "Feedback + aprendizajes"],
    ]
    x0 = 18 * mm
    col_w = [12 * mm, 55 * mm, 40 * mm, 55 * mm, 55 * mm]
    row_h = 10 * mm
    top = H - 40 * mm
    c.setFillColor(TEAL_DARK)
    c.rect(x0, top - 7 * mm, sum(col_w), 7 * mm, fill=1, stroke=0)
    c.setFillColor(WHITE)
    c.setFont("SansBold", 7)
    x = x0
    for i, h in enumerate(headers):
        c.drawString(x + 1.2 * mm, top - 5 * mm, h)
        x += col_w[i]
    for r_i, row in enumerate(rows):
        y = top - 7 * mm - (r_i + 1) * row_h
        c.setFillColor(WHITE if r_i % 2 == 0 else SOFT)
        c.rect(x0, y, sum(col_w), row_h, fill=1, stroke=0)
        c.setFillColor(INK)
        x = x0
        for i, cell in enumerate(row):
            c.setFont("SansBold" if i == 0 else "Sans", 7)
            for j, line in enumerate(wrap(c, cell, "SansBold" if i == 0 else "Sans", 7, col_w[i] - 3 * mm)[:2]):
                c.drawString(x + 1.2 * mm, y + row_h - 4 * mm - j * 3.2 * mm, line)
            x += col_w[i]

    c.setFillColor(MUTED)
    c.setFont("Sans", 7)
    c.drawString(18 * mm, 20 * mm, "Nota: pop-up siempre-on desde S2 con la variante ganadora del A/B 2. Correo solo en S1 (kit), S2 (lanzamiento) y S6 (cierre).")


def annex_02(c):
    annex_page(c, 2)
    header(c, "Anexo B", "Presupuesto detallado y criterio de corte −40%")

    c.setFillColor(TEAL)
    c.setFont("SansBold", 8)
    c.drawString(18 * mm, H - 40 * mm, "DISTRIBUCIÓN COP $18.000.000")

    rows = [
        ["WhatsApp / CRM", "4.200.000", "Canal de mayor intención y acompañamiento 1:1"],
        ["Comercial (kit + incentivos)", "3.600.000", "Lift demostrado en bajo uso"],
        ["SMS", "2.200.000", "Recordatorios baratos a no abridores"],
        ["POS impresión", "2.000.000", "Refuerzo físico en el momento de verdad"],
        ["Paid social", "1.800.000", "Reconocimiento del punto multiservicios"],
        ["Diseño / producción", "1.500.000", "Coherencia visual del sistema"],
        ["Pop-up / digital product", "1.000.000", "Captura cuando el comercio ya está dentro"],
        ["Correo + automatización", "700.000", "Expectativa y cierre"],
        ["PR / aliados", "600.000", "Ángulo reputacional controlado"],
        ["Contingencia A/B", "400.000", "Optimización S4–S5"],
        ["TOTAL", "18.000.000", "100%"],
    ]
    x0 = 18 * mm
    col_w = [55 * mm, 30 * mm, 120 * mm]
    top = H - 45 * mm
    row_h = 7 * mm
    for r_i, row in enumerate(rows):
        y = top - (r_i + 1) * row_h
        bold = row[0] == "TOTAL"
        c.setFillColor(TEAL_DARK if bold else (WHITE if r_i % 2 == 0 else SOFT))
        c.rect(x0, y, sum(col_w), row_h, fill=1, stroke=0)
        c.setFillColor(WHITE if bold else INK)
        x = x0
        for i, cell in enumerate(row):
            c.setFont("SansBold" if (bold or i == 0) else "Sans", 7.5)
            c.drawString(x + 1.5 * mm, y + 2.2 * mm, cell)
            x += col_w[i]

    card(c, 18 * mm, 18 * mm, W - 36 * mm, 35 * mm, HexColor("#FFF6EE"))
    c.setFillColor(ALERT)
    c.setFont("SansBold", 9)
    c.drawString(22 * mm, 46 * mm, "SI EL PRESUPUESTO BAJA 40% (a $10.800.000)")
    c.setFillColor(INK)
    c.setFont("Sans", 8)
    lines = [
        "1. Cortar primero: paid social y PR amplio (menor aporte directo a activación del piloto).",
        "2. Preservar: WhatsApp + Comercial + SMS + pop-up (núcleo de conversión).",
        "3. POS: pasar a versión digital imprimible 1 tinta / menor tiraje.",
        "4. Diseño: reutilizar plantillas del sistema; menos piezas, misma frase y CTA.",
    ]
    ty = 38 * mm
    for line in lines:
        c.drawString(22 * mm, ty, line)
        ty -= 4.5 * mm


def annex_03(c):
    annex_page(c, 3)
    header(c, "Anexo C", "Dashboard semanal de piloto")

    # KPI cards
    cards = [
        ("Activación 2.ª cat.", "Meta 25%", "Semanal"),
        ("Frecuencia uso medio", "Meta +40%", "Semanal"),
        ("CTR CTA", "Meta 12%", "Por canal"),
        ("Tickets confusión", "≤ baseline", "Diario"),
        ("CSAT claridad", "≥ 4,2", "S3 y S6"),
    ]
    cw = (W - 42 * mm) / 5
    for i, (n, m, f) in enumerate(cards):
        x = 18 * mm + i * (cw + 2 * mm)
        card(c, x, H - 75 * mm, cw, 28 * mm, TEAL_DARK)
        c.setFillColor(GOLD)
        c.setFont("SansBold", 8)
        c.drawCentredString(x + cw / 2, H - 52 * mm, m)
        c.setFillColor(WHITE)
        c.setFont("Sans", 7)
        c.drawCentredString(x + cw / 2, H - 60 * mm, n)
        c.setFillColor(GOLD_SOFT)
        c.setFont("Sans", 6.5)
        c.drawCentredString(x + cw / 2, H - 68 * mm, f)

    c.setFillColor(TEAL)
    c.setFont("SansBold", 8)
    c.drawString(18 * mm, H - 85 * mm, "PREGUNTAS DE SUSTENTACIÓN · RESPUESTAS CORTAS")

    qa = [
        (
            "¿Presupuesto −40%?",
            "Priorizo WA + Comercial + SMS + pop-up; corto paid/PR y reduzco tiraje POS.",
        ),
        (
            "¿Mayor riesgo reputacional?",
            "Claim de «vender más» sin cómo. Por eso el CTA es activar y la respuesta pública enseña el paso a paso.",
        ),
        (
            "¿Alineación con Comercial?",
            "Kit de 1 página, guion 60s y libertad solo en ejemplos de servicio — no en promesa ni CTA.",
        ),
        (
            "¿Indicador para frenar?",
            "Tickets de confusión ×2 / 48 h o ola de «no explican» ≥20/2 h sin contención.",
        ),
        (
            "¿Qué fue con IA?",
            "Apoyo de estructura/PDF. Estrategia, copy final, metas, crisis y priorización: criterio propio validado con fuentes públicas PTM.",
        ),
    ]
    ty = H - 92 * mm
    for q, a in qa:
        c.setFillColor(TEAL_DARK)
        c.setFont("SansBold", 7.5)
        c.drawString(18 * mm, ty, q)
        c.setFillColor(INK)
        c.setFont("Sans", 7.5)
        c.drawString(70 * mm, ty, a)
        ty -= 6.5 * mm

    card(c, 18 * mm, 16 * mm, W - 36 * mm, 22 * mm, MIST)
    c.setFillColor(TEAL)
    c.setFont("SansBold", 8)
    c.drawString(22 * mm, 32 * mm, "ATRIBUCIONES / FUENTES PÚBLICAS CONSULTADAS")
    c.setFillColor(MUTED)
    c.setFont("Sans", 7)
    c.drawString(
        22 * mm,
        25 * mm,
        "ptm.com.co · LinkedIn company/comercial-card-s-a-s · Facebook.com/ptmplataforma · Portafolio (cobertura fintech) · descripciones públicas de servicios (recargas, corresponsalía, pagos, SOAT).",
    )
    c.drawString(
        22 * mm,
        19 * mm,
        "No se presentan piezas de terceros como propias. Fotografías de producción real quedarían a cargo de Diseño/Trade en ejecución.",
    )


def main():
    out = Path("/workspace/entregables/prueba-ptm/Paola_Hoyos_Prueba_AnalistaMarca.pdf")
    c = canvas.Canvas(str(out), pagesize=PAGE)

    for slide in [
        slide_01,
        slide_02,
        slide_03,
        slide_04,
        slide_05,
        slide_06,
        slide_07,
        slide_08,
        slide_09,
        slide_10,
        slide_11,
        slide_12,
    ]:
        slide(c)
        c.showPage()

    for annex in [annex_01, annex_02, annex_03]:
        annex(c)
        c.showPage()

    c.save()
    print(f"Wrote {out} ({out.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
