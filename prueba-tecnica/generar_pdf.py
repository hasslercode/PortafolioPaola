#!/usr/bin/env python3
"""Genera PDF consolidado — Prueba Técnica Línea Estética — Paola Hoyos."""

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY, TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch, cm
from reportlab.platypus import (
    HRFlowable,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)

OUTPUT = "/workspace/prueba-tecnica/Prueba-Tecnica-Linea-Estetica-Paola-Hoyos.pdf"
PURPLE = colors.HexColor("#6B2D8B")
PURPLE_LIGHT = colors.HexColor("#F3E8FA")
DARK = colors.HexColor("#1A1A2E")
GRAY = colors.HexColor("#555555")


def build_styles():
    base = getSampleStyleSheet()
    styles = {}

    styles["cover_title"] = ParagraphStyle(
        "cover_title",
        parent=base["Title"],
        fontSize=26,
        leading=32,
        textColor=PURPLE,
        alignment=TA_CENTER,
        spaceAfter=12,
        fontName="Helvetica-Bold",
    )
    styles["cover_sub"] = ParagraphStyle(
        "cover_sub",
        parent=base["Normal"],
        fontSize=14,
        leading=20,
        textColor=DARK,
        alignment=TA_CENTER,
        spaceAfter=6,
    )
    styles["cover_meta"] = ParagraphStyle(
        "cover_meta",
        parent=base["Normal"],
        fontSize=11,
        leading=16,
        textColor=GRAY,
        alignment=TA_CENTER,
        spaceAfter=4,
    )
    styles["h1"] = ParagraphStyle(
        "h1",
        parent=base["Heading1"],
        fontSize=16,
        leading=22,
        textColor=PURPLE,
        spaceBefore=18,
        spaceAfter=10,
        fontName="Helvetica-Bold",
    )
    styles["h2"] = ParagraphStyle(
        "h2",
        parent=base["Heading2"],
        fontSize=13,
        leading=18,
        textColor=DARK,
        spaceBefore=14,
        spaceAfter=6,
        fontName="Helvetica-Bold",
    )
    styles["h3"] = ParagraphStyle(
        "h3",
        parent=base["Heading3"],
        fontSize=11,
        leading=15,
        textColor=PURPLE,
        spaceBefore=10,
        spaceAfter=4,
        fontName="Helvetica-Bold",
    )
    styles["body"] = ParagraphStyle(
        "body",
        parent=base["Normal"],
        fontSize=10,
        leading=15,
        textColor=DARK,
        alignment=TA_JUSTIFY,
        spaceAfter=8,
    )
    styles["bullet"] = ParagraphStyle(
        "bullet",
        parent=styles["body"],
        leftIndent=14,
        bulletIndent=0,
        spaceAfter=4,
    )
    styles["quote"] = ParagraphStyle(
        "quote",
        parent=styles["body"],
        leftIndent=20,
        rightIndent=20,
        textColor=GRAY,
        fontName="Helvetica-Oblique",
        backColor=PURPLE_LIGHT,
        borderPadding=8,
        spaceBefore=6,
        spaceAfter=10,
    )
    styles["table_header"] = ParagraphStyle(
        "table_header",
        parent=base["Normal"],
        fontSize=9,
        leading=12,
        textColor=colors.white,
        fontName="Helvetica-Bold",
        alignment=TA_CENTER,
    )
    styles["table_cell"] = ParagraphStyle(
        "table_cell",
        parent=base["Normal"],
        fontSize=9,
        leading=12,
        textColor=DARK,
        alignment=TA_CENTER,
    )
    return styles


def bullet_list(items, styles):
    return [Paragraph(f"• {item}", styles["bullet"]) for item in items]


def metric_table(data, styles):
    header = [Paragraph(h, styles["table_header"]) for h in data[0]]
    rows = [[Paragraph(str(c), styles["table_cell"]) for c in row] for row in data[1:]]
    t = Table([header] + rows, repeatRows=1)
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), PURPLE),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                ("ALIGN", (0, 0), (-1, -1), "CENTER"),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("GRID", (0, 0), (-1, -1), 0.5, colors.HexColor("#DDDDDD")),
                ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, PURPLE_LIGHT]),
                ("TOPPADDING", (0, 0), (-1, -1), 6),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
            ]
        )
    )
    return t


def add_cover(story, styles):
    story.append(Spacer(1, 1.8 * inch))
    story.append(Paragraph("Prueba Técnica", styles["cover_title"]))
    story.append(Paragraph("Coordinador@ de Estrategia Digital y Comunidades", styles["cover_sub"]))
    story.append(Spacer(1, 0.3 * inch))
    story.append(Paragraph("<b>Línea Estética</b> — Market de Bienestar y Belleza Integral", styles["cover_sub"]))
    story.append(Spacer(1, 0.6 * inch))
    story.append(Paragraph("Presentado por:", styles["cover_meta"]))
    story.append(Paragraph("<b>Paola Andrea Hoyos Cardona</b>", styles["cover_sub"]))
    story.append(Paragraph("Estratega Digital · Comunicadora Social · Magíster en Comunicación Digital", styles["cover_meta"]))
    story.append(Paragraph("pahoyoscardona@gmail.com · linkedin.com/in/paola-andrea-hoyos-cardona-b7247a182", styles["cover_meta"]))
    story.append(Spacer(1, 0.5 * inch))
    story.append(HRFlowable(width="60%", thickness=2, color=PURPLE, spaceBefore=10, spaceAfter=10))
    story.append(Paragraph("Septiembre 2026", styles["cover_meta"]))
    story.append(PageBreak())


def add_context(story, styles):
    story.append(Paragraph("Contexto y alineación con la marca", styles["h1"]))
    story.append(
        Paragraph(
            "Línea Estética se posiciona como <i>«Tu Market de Bienestar y Belleza Integral»</i>: "
            "desde 2016 conecta a las colombianas con dermocosmética de respaldo científico "
            "(La Roche-Posay, Eucerin, ISDIN, Vichy, CeraVe, K-Beauty, entre otras), con más de 82 tiendas "
            "físicas y canales digitales. Su propósito —<i>«Más que una empresa, somos tu aliado estratégico "
            "en el cuidado de la piel»</i>— y su comunidad <b>#SkincareLovers</b> son el marco de esta propuesta.",
            styles["body"],
        )
    )
    story.append(
        Paragraph(
            "La vacante busca un perfil estratégico, creativo y analítico que conecte marcas con personas, "
            "gestione reputación, lidere influencers, traduzca métricas en decisiones de negocio y una "
            "experiencia digital con activaciones físicas. Esta respuesta integra diagnóstico, estrategia, "
            "gestión de crisis, campaña con creadores y apertura omnicanal — con el enfoque que aplico "
            "en mi trabajo: storytelling con propósito, crecimiento orgánico y resultados medibles.",
            styles["body"],
        )
    )
    story.append(PageBreak())


def add_q1(story, styles):
    story.append(Paragraph("Ejercicio 1 — Diagnóstico y estrategia trimestral", styles["h1"]))

    story.append(Paragraph("1.1 ¿Qué está fallando y por qué?", styles["h2"]))
    story.append(
        Paragraph(
            "Los datos muestran una <b>caída sistémica y acelerada</b> entre junio y agosto en ambos canales. "
            "No es un problema aislado de algoritmo: hay señales de desalineación entre ejecución de contenido, "
            "frecuencia, calidad percibida y objetivos de negocio.",
            styles["body"],
        )
    )

    story.append(Paragraph("Instagram — tendencia", styles["h3"]))
    story.append(
        metric_table(
            [
                ["Métrica", "Jun", "Jul", "Ago", "Δ Jun→Ago"],
                ["Seguidores nuevos", "890", "640", "310", "−65%"],
                ["Alcance total", "156K", "141K", "98K", "−37%"],
                ["Engagement rate", "3.2%", "2.6%", "2.1%", "−34%"],
                ["Comentarios", "410", "380", "290", "−29%"],
                ["Menciones negativas", "12", "19", "31", "+158%"],
                ["Publicaciones", "18", "16", "12", "−33%"],
            ],
            styles,
        )
    )
    story.append(Spacer(1, 0.15 * inch))

    story.append(Paragraph("TikTok — tendencia", styles["h3"]))
    story.append(
        metric_table(
            [
                ["Métrica", "Jun", "Jul", "Ago", "Δ Jun→Ago"],
                ["Seguidores nuevos", "1.200", "950", "180", "−85%"],
                ["Views promedio/video", "8.400", "6.100", "2.300", "−73%"],
                ["Videos publicados", "10", "9", "4", "−60%"],
            ],
            styles,
        )
    )
    story.append(Spacer(1, 0.2 * inch))

    story.append(Paragraph("Diagnóstico integrado (datos + contexto de negocio)", styles["h3"]))
    for item in [
        "<b>Caída de consistencia editorial:</b> menos publicaciones (−33% IG, −60% TikTok) reduce señales al algoritmo, "
        "frecuencia de contacto con la audiencia y oportunidades de descubrimiento. En TikTok, la estancación de 2 meses "
        "coincide con la reducción drástica de videos.",
        "<b>Contenido que no genera valor guardable ni conversación:</b> el engagement cae más rápido que el alcance. "
        "En dermocosmética multimarca, publicar solo producto/promo sin educación ni rutina reduce guardados, "
        "compartidos y tiempo de visualización — métricas clave para recomendación.",
        "<b>Desconexión entre portafolio y narrativa:</b> tres líneas (limpieza, protección solar, antiedad) requieren "
        "segmentación por necesidad de piel, no un feed genérico. Sin arquitectura de contenido por línea, "
        "la audiencia no siente que la marca la entiende.",
        "<b>Señal de alerta reputacional:</b> menciones negativas casi se triplican (12→31) mientras bajan comentarios "
        "totales. Posible correlación con experiencia de producto, expectativas vs. realidad o respuesta tardía en comunidad. "
        "En protección solar, un solo caso mal gestionado escala rápido.",
        "<b>TikTok subexplotado como canal de descubrimiento:</b> views promedio −73% indica que el formato no está "
        "optimizado (gancho en 3s, vertical nativo, persona a cámara, tendencias adaptadas al skincare). "
        "IG retiene comunidad; TikTok debe captar nuevas audiencias — hoy no lo hace.",
        "<b>Falta de puente digital → negocio:</b> métricas de vanidad sin CTA claro (link en bio, códigos, "
        "WhatsApp, tienda física) no traducen comunidad en venta ni recurrencia.",
    ]:
        story.append(Paragraph(f"• {item}", styles["bullet"]))

    story.append(Paragraph("Acciones digitales inmediatas para revertir la tendencia", styles["h3"]))
    for item in [
        "Auditoría de contenido de los últimos 90 días: top/bottom 10 piezas por guardados, shares y retención.",
        "Reactivar calendario mínimo viable: IG 16–20 posts/mes + Stories diarias; TikTok 12–16 videos/mes.",
        "Piloto de 4 formatos nativos (rutina 30s, mito vs. realidad, antes/después educativo, POV tienda) "
        "y escalar solo los que superen benchmark interno.",
        "Protocolo de respuesta comunitaria &lt;2h en comentarios y DMs; escalar menciones negativas a tabla de crisis.",
        "Implementar UTMs + códigos por línea de producto para medir tráfico y conversión desde redes.",
    ]:
        story.append(Paragraph(f"• {item}", styles["bullet"]))

    story.append(PageBreak())
    story.append(Paragraph("1.2 Propuesta de estrategia trimestral (Q4)", styles["h2"]))

    story.append(Paragraph("Objetivo de negocio y soporte digital", styles["h3"]))
    story.append(
        Paragraph(
            "<b>Objetivo de negocio:</b> Incrementar en 20% la venta online y en tienda de las líneas de limpieza, "
            "protección solar y antiedad, elevando la recompra de clientas en un horizonte de 90 días.",
            styles["body"],
        )
    )
    story.append(
        Paragraph(
            "<b>Cómo la estrategia digital lo sostiene:</b> Construir una comunidad educada y activa (#SkincareLovers) "
            "que asocie a Línea Estética con asesoría confiable (no solo catálogo), genere confianza antes de la compra "
            "y dirija tráfico medible hacia e-commerce y tiendas físicas mediante contenido segmentado por necesidad "
            "de piel, prueba social (UGC + creadores) y mecanismos de conversión (códigos, WhatsApp, citas de asesoría).",
            styles["body"],
        )
    )

    story.append(Paragraph("Pilares de contenido", styles["h3"]))
    for item in [
        "<b>Educa tu piel (40%):</b> Ingredientes, mitos, rutinas por tipo de piel y por línea. Formato: carruseles "
        "guardables en IG + TikTok educativo con gancho. Objetivo: autoridad y guardados.",
        "<b>Rutina real (30%):</b> Personas reales (equipo, clientas, microcreadores) mostrando rutinas de 3 pasos "
        "con productos del portafolio. Objetivo: identificación y consideración.",
        "<b>Comunidad SkincareLovers (20%):</b> Preguntas, encuestas, retos de hábito, respuestas a dudas. "
        "Objetivo: engagement y UGC.",
        "<b>Experiencia Línea Estética (10%):</b> Tiendas, asesoría en punto de venta, Modo Planeta (sostenibilidad), "
        "lanzamientos de laboratorios. Objetivo: omnicanalidad y propósito de marca.",
    ]:
        story.append(Paragraph(f"• {item}", styles["bullet"]))

    story.append(Paragraph("Frecuencia de publicaciones", styles["h3"]))
    story.append(
        metric_table(
            [
                ["Canal", "Frecuencia", "Detalle"],
                ["Instagram Feed/Reels", "4–5/semana", "2 Reels + 1 carrusel educativo + 1 comunidad"],
                ["Instagram Stories", "Diario", "Encuestas, Q&A, behind the store, CTA"],
                ["TikTok", "3–4/semana", "Vertical nativo, gancho 0–3s, sin reutilizar IG sin adaptar"],
                ["WhatsApp / CRM", "2/semana", "Novedades y rutinas a base segmentada"],
            ],
            styles,
        )
    )
    story.append(Spacer(1, 0.15 * inch))

    story.append(Paragraph("Mezcla de canales y por qué", styles["h3"]))
    for item in [
        "<b>Instagram (hub de comunidad y conversión):</b> Base de 42K seguidores, ideal para fidelizar, educar "
        "y dirigir a compra. Carruseles y Reels para consideración; Stories para urgencia y cercanía.",
        "<b>TikTok (motor de descubrimiento):</b> Captar nuevas audiencias con contenido de rutina y tendencias "
        "adaptadas. Priorizar retención y shares sobre producción pulida.",
        "<b>WhatsApp Business (cierre):</b> Canal natural del consumidor colombiano de belleza para asesoría "
        "y compra. Conectar desde bio y respuestas a comentarios.",
        "<b>Blog / SEO (Skincare Lovers):</b> Contenido evergreen que sostiene educación y posicionamiento en buscadores.",
        "<b>Tienda física + Modo Planeta:</b> Activaciones que devuelven contenido a redes (QR, puntos morados, eventos).",
    ]:
        story.append(Paragraph(f"• {item}", styles["bullet"]))

    story.append(Paragraph("Cómo se mide el éxito", styles["h3"]))
    story.append(
        metric_table(
            [
                ["Nivel", "KPI", "Meta Q4", "Herramienta"],
                ["Awareness", "Alcance / views promedio", "+25% vs. ago", "Meta Business Suite, TikTok Analytics"],
                ["Engagement", "ER, guardados, shares", "ER IG ≥3%; saves +30%", "Nativas + export mensual"],
                ["Consideración", "Clics perfil, visitas web", "+20%", "UTMs por campaña"],
                ["Conversión", "Ventas atribuidas, cupones", "+20% por línea", "E-commerce + POS"],
                ["Comunidad", "UGC, respuesta <2h", "50 piezas UGC; 90% resp.", "Social listening + CRM"],
                ["Reputación", "Menciones negativas", "Reducir a <15/mes", "Brandwatch / manual"],
            ],
            styles,
        )
    )
    story.append(PageBreak())


def add_q2(story, styles):
    story.append(Paragraph("Ejercicio 2 — Crisis: reacción alérgica al protector solar", styles["h1"]))

    story.append(Paragraph("Respuesta pública sugerida", styles["h2"]))
    story.append(
        Paragraph(
            "«Hola [nombre], lamento muchísimo lo que describes y entendemos lo importante que es sentirse segura "
            "con un producto de protección solar. Tu bienestar es nuestra prioridad. "
            "Te escribimos por mensaje privado para acompañarte de forma personalizada y recopilar la información "
            "necesaria. Si presentas molestias persistentes, te recomendamos consultar a un dermatólogo. "
            "Estamos aquí para ayudarte. 💜»",
            styles["quote"],
        )
    )
    story.append(
        Paragraph(
            "<b>Principios de la respuesta:</b> empatía sin admitir culpa legal prematura; no debatir en público; "
            "invitar a canal privado; recomendación de salud; tono alineado a Línea Estética (cercano, cuidadoso, "
            "profesional). Responder en &lt;30 minutos. No eliminar el comentario ni bloquear a la usuaria.",
            styles["body"],
        )
    )

    story.append(Paragraph("Protocolo interno (activación inmediata)", styles["h2"]))
    story.append(
        metric_table(
            [
                ["Paso", "Área", "Acción", "Tiempo"],
                ["1", "Comunidad", "Responder público + escribir DM", "< 30 min"],
                ["2", "Servicio al cliente", "Abrir caso, solicitar lote, foto, síntomas", "< 2 h"],
                ["3", "Regulatorio / QA", "Verificar lote, reportes similares, retiro si aplica", "< 24 h"],
                ["4", "Dermatología / Marca", "Escalar al laboratorio del producto", "< 48 h"],
                ["5", "Legal", "Revisar redacción si escala mediáticamente", "Según escala"],
                ["6", "Marketing", "Pausar piezas del SKU; preparar FAQ interno", "< 4 h"],
                ["7", "Seguimiento", "Cierre con clienta + registro en base de crisis", "7 días"],
            ],
            styles,
        )
    )
    story.append(Spacer(1, 0.15 * inch))

    story.append(Paragraph("Cómo enfrentar la situación", styles["h2"]))
    for item in [
        "<b>Contener sin silenciar:</b> Monitorear el hilo cada hora; responder con empatía a comentarios de terceros "
        "sin entrar en polémica. Mensaje clave: «Estamos atendiendo el caso de forma individualizada».",
        "<b>Evitar el efecto Streisand:</b> No borrar comentarios legítimos. Sí ocultar insultos o spam que alimenten el hate.",
        "<b>Transparencia controlada:</b> Si hay más casos del mismo lote, activar comunicado oficial. Si es caso aislado, "
        "no sobrecomunicar.",
        "<b>Aprendizaje:</b> Documentar en informe post-crisis: tiempo de respuesta, volumen de menciones, impacto en ER, "
        "acciones correctivas (contenido educativo sobre patch test, tipos de piel sensible).",
        "<b>Refuerzo de confianza:</b> Publicar en la semana siguiente contenido sobre «cómo elegir protector solar según tu piel» "
        "y «prueba de parche» — convierte la crisis en educación sin referenciar el caso.",
    ]:
        story.append(Paragraph(f"• {item}", styles["bullet"]))

    story.append(PageBreak())


def add_q3(story, styles):
    story.append(Paragraph("Ejercicio 3 — Reto 14 días antiedad (TikTok + IG)", styles["h1"]))
    story.append(
        Paragraph(
            "<b>Presupuesto:</b> $6.000.000 COP · <b>Objetivo:</b> awareness + consideración + conversión "
            "de la línea antiedad, no solo views.",
            styles["body"],
        )
    )

    story.append(Paragraph("Gestión del presupuesto", styles["h2"]))
    story.append(
        metric_table(
            [
                ["Concepto", "%", "Valor COP", "Detalle"],
                ["Creadores (fees + producto)", "55%", "$3.300.000", "10 creadores micro/nano"],
                ["Producción / kits", "10%", "$600.000", "Kits rutina antiedad + guía"],
                ["Pauta amplificación", "20%", "$1.200.000", "Spark Ads / IG boost top 3 piezas"],
                ["Landing + tracking", "5%", "$300.000", "Página reto + códigos únicos"],
                ["Gestión y reportes", "10%", "$600.000", "Coordinación, contratos, medición"],
            ],
            styles,
        )
    )
    story.append(Spacer(1, 0.15 * inch))

    story.append(Paragraph("Tipo de creadores y por qué", styles["h2"]))
    for item in [
        "<b>Microcreadores skincare (15K–50K) — 6 perfiles:</b> Audiencia nicho, alta credibilidad en rutinas. "
        "Tasa de engagement superior a macro. Ideales para el reto de 14 días porque documentan hábitos.",
        "<b>Nanocreadores (3K–15K) — 4 perfiles:</b> Contenido auténtico, menor costo, diversidad de tipos de piel "
        "y edades (25–45). Generan UGC creíble.",
        "<b>1 dermatóloga / cosmetóloga creadora (30K–80K):</b> Autoridad para explicar activos (retinol, vitamina C, "
        "péptidos) y legitimar el reto. Pieza de apertura y cierre.",
    ]:
        story.append(Paragraph(f"• {item}", styles["bullet"]))

    story.append(
        Paragraph(
            "<b>¿Por qué este mix y no macroinfluencers?</b> Con $6M, un solo macro consume el presupuesto sin "
            "garantizar conversión. En skincare, la confianza se construye con rostros cercanos y constancia "
            "(14 días). El formato exige documentación diaria/semanal — los micro/nano lo hacen de forma natural.",
            styles["body"],
        )
    )

    story.append(Paragraph("Brief para contenido auténtico (no forzado)", styles["h2"]))
    for item in [
        "<b>Concepto:</b> «14 días cuidando mi piel como acto de cariño propio» — no «anuncio de producto».",
        "<b>Libertad creativa:</b> Cada creador elige su ángulo: rutina nocturna, comparación día 1 vs. 14, "
        "errores que cometía antes, preguntas que le hacían sobre antiedad.",
        "<b>Obligatorios mínimos:</b> Mostrar producto en contexto real; mencionar 1 beneficio aprendido; "
        "usar hashtag #14DíasConLineaEstética; incluir código único; etiquetar @lineaestetica.co.",
        "<b>Prohibidos:</b> Claims médicos («elimina arrugas»), antes/después manipulados, lectura de guion "
        "palabra por palabra, filtros que alteren la piel.",
        "<b>Entregables:</b> 1 video semanal (mín. 4) en TikTok o Reels + 2 Stories/semana. "
        "Formato vertical, luz natural, hablar a cámara.",
        "<b>Tono:</b> Conversacional, como le recomendarías a una amiga. Alineado al tono #SkincareLovers de la marca.",
    ]:
        story.append(Paragraph(f"• {item}", styles["bullet"]))

    story.append(Paragraph("Evitar que el reto se quede solo en awareness", styles["h2"]))
    for item in [
        "<b>Códigos únicos por creador</b> (ej. PAOLA14) con 15% dto. en línea antiedad → medir ventas atribuidas.",
        "<b>Landing page del reto</b> con rutina recomendada, productos y compra directa.",
        "<b>Retargeting</b> con pauta ($1.2M) sobre los 3 videos con mayor retención y comentarios.",
        "<b>Incentivo de conversión:</b> Participantes que compren con código participan en sorteo de kit antiedad completo.",
        "<b>Integración tienda física:</b> QR en tiendas para unirse al reto; asesoría presencial con hoja de rutina.",
        "<b>KPIs de negocio (no solo views):</b> CPA por código, tasa de conversión landing, ticket promedio, "
        "nuevas clientas vs. recurrentes, UGC reutilizable para pauta propia.",
        "<b>Fase 2:</b> Mejores 3 creadores pasan a embajadores trimestrales — reduce CAC a largo plazo.",
    ]:
        story.append(Paragraph(f"• {item}", styles["bullet"]))

    story.append(PageBreak())


def add_q4(story, styles):
    story.append(Paragraph("Ejercicio 4 — Apertura tiendas Bogotá, Medellín y Barranquilla", styles["h1"]))
    story.append(
        Paragraph(
            "<b>Objetivo de negocio:</b> Generar tráfico en la primera semana de apertura y construir base de "
            "clientas recurrentes conectando la comunidad digital (#SkincareLovers) con la experiencia física.",
            styles["body"],
        )
    )

    story.append(Paragraph("Fase 1 — Pre-apertura (4 semanas antes)", styles["h2"]))
    for item in [
        "<b>Teasing por ciudad:</b> Countdown en Stories + Reels «Algo grande llega a [ciudad]» con pistas del "
        "ubicación (centro comercial, referencia local).",
        "<b>Lista de espera digital:</b> Formulario / WhatsApp «Quiero ser de las primeras» con beneficio exclusivo "
        "día 1 (mini kit skincare o asesoría gratuita).",
        "<b>Creadores locales (3 por ciudad):</b> Visita al local en construcción, tour behind the scenes, "
        "encuesta «¿qué esperas de la tienda?».",
        "<b>Contenido educativo localizado:</b> «Rutina de piel para el clima de Barranquilla/Medellín/Bogotá» — "
        "conecta clima con líneas de protección solar e hidratación.",
        "<b>Comunidad:</b> Encuesta en IG «¿En qué ciudad quieres que abramos después?» para amplificar alcance orgánico.",
    ]:
        story.append(Paragraph(f"• {item}", styles["bullet"]))

    story.append(Paragraph("Fase 2 — Activación día de apertura (por ciudad)", styles["h2"]))
    story.append(
        metric_table(
            [
                ["Ciudad", "Activación concreta", "Mecánica"],
                [
                    "Bogotá",
                    "«Ruta del Glow»",
                    "Primeras 100 clientas: asesoría personalizada + diagnóstico de piel + regalo. "
                    "Influencer local hace Live desde tienda 10am–12m.",
                ],
                [
                    "Medellín",
                    "«Café & Skincare»",
                    "Mañana de rutina express con barista partner: compra + café + mini masterclass antiedad. "
                    "Check-in en IG Stories con sticker de ubicación.",
                ],
                [
                    "Barranquilla",
                    "«Sol que protege»",
                    "Foco en protección solar: estación de aplicación SPF, regalo portafolio solar, "
                    "foto en mural #SkincareLovers. Concurso mejor look protegido.",
                ],
            ],
            styles,
        )
    )
    story.append(Spacer(1, 0.15 * inch))
    story.append(
        Paragraph(
            "<b>Elemento transversal:</b> QR en tienda → WhatsApp con rutina personalizada post-visita + "
            "código de bienvenida 10% válido 7 días (urgencia para segunda compra).",
            styles["body"],
        )
    )

    story.append(Paragraph("Fase 3 — Bucle digital post-visita", styles["h2"]))
    for item in [
        "<b>«Mi rutina de tienda»:</b> Invitar a compartir en IG/TikTok la bolsa, productos elegidos o asesoría recibida "
        "con hashtag #MiRutinaLE + mención. Repost en cuenta oficial.",
        "<b>Programa de estrellas / fidelización:</b> Vincular compra física al programa existente de Línea Estética "
        "para acumular beneficios (alineado a su modelo de loyalty por laboratorios).",
        "<b>Email / WhatsApp D+3:</b> «¿Cómo va tu rutina?» + tips de uso + recordatorio de código si no compró online.",
        "<b>Encuesta NPS digital</b> post-visita (1 min) con incentivo de participar en sorteo mensual.",
        "<b>Modo Planeta en tienda:</b> Invitar a traer envases vacíos en la segunda visita — conecta propósito de marca "
        "con recurrencia.",
    ]:
        story.append(Paragraph(f"• {item}", styles["bullet"]))

    story.append(Paragraph("Medición del éxito", styles["h2"]))
    story.append(
        metric_table(
            [
                ["Dimensión", "Indicador", "Meta semana 1"],
                ["Tráfico físico", "Visitantes únicos / día", "Meta acordada con retail por tienda"],
                ["Digital → tienda", "Canjes de código bienvenida", "≥30% de asistentes al evento"],
                ["Conversión", "Ticket promedio vs. tiendas maduras", "≥85% del benchmark"],
                ["Recurrencia", "Segunda compra a 30 días", "≥25% de nuevas clientas"],
                ["Comunidad", "UGC #MiRutinaLE", "≥60 piezas en 2 semanas"],
                ["Satisfacción", "NPS post-visita", "≥70"],
                ["Digital", "Menciones + alcance local", "+40% vs. mes anterior"],
            ],
            styles,
        )
    )

    story.append(Spacer(1, 0.2 * inch))
    story.append(Paragraph("Cierre", styles["h2"]))
    story.append(
        Paragraph(
            "Esta propuesta conecta el diagnóstico de datos con acciones concretas alineadas al propósito de "
            "Línea Estética: ser el aliado de bienestar de sus clientas, no solo un catálogo digital. "
            "Mi enfoque combina storytelling que genera conversación, ejecución disciplinada por métricas "
            "y experiencias que unen lo digital con lo físico — exactamente lo que la vacante demanda.",
            styles["body"],
        )
    )
    story.append(Spacer(1, 0.3 * inch))
    story.append(
        Paragraph(
            "<b>Paola Andrea Hoyos Cardona</b><br/>"
            "Comunicadora Social · Magíster en Comunicación Digital<br/>"
            "Estratega Digital · Storytelling · Crecimiento Orgánico<br/>"
            "pahoyoscardona@gmail.com",
            styles["body"],
        )
    )


def main():
    styles = build_styles()
    doc = SimpleDocTemplate(
        OUTPUT,
        pagesize=letter,
        rightMargin=2 * cm,
        leftMargin=2 * cm,
        topMargin=2 * cm,
        bottomMargin=2 * cm,
        title="Prueba Técnica - Línea Estética - Paola Hoyos",
        author="Paola Andrea Hoyos Cardona",
    )

    story = []
    add_cover(story, styles)
    add_context(story, styles)
    add_q1(story, styles)
    add_q2(story, styles)
    add_q3(story, styles)
    add_q4(story, styles)

    doc.build(story)
    print(f"PDF generado: {OUTPUT}")


if __name__ == "__main__":
    main()
