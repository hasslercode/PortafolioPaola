#!/usr/bin/env python3
"""Genera 10 ilustraciones estilo Excalidraw (una por diapositiva) y el PDF visual."""
from __future__ import annotations

import math
import os
import random
from pathlib import Path

import cairosvg

ROOT = Path(__file__).resolve().parent
OUT = ROOT / "excalidraw_assets"
OUT.mkdir(exist_ok=True)

W, H = 1600, 900
FONT_REG = "/tmp/Caveat-Regular.ttf"
FONT_BOLD = "/tmp/Caveat-Bold.ttf"

TEAL = "#0B6E6E"
GOLD = "#C9A227"
INK = "#1F2937"
SOFT = "#F7F3EA"
BLUE = "#DBEAFE"
PINK = "#FCE7F3"
GREEN = "#DCFCE7"
PURPLE = "#EDE9FE"
YELLOW = "#FEF3C7"
ORANGE = "#FFEDD5"
CORAL = "#FEE2E2"
WHITE = "#FFFFFF"


def esc(t: str) -> str:
    return (
        t.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace('"', "&quot;")
    )


def jitter(n: float = 2.5) -> float:
    return random.uniform(-n, n)


class Sketch:
    def __init__(self, seed: int = 1):
        random.seed(seed)
        self.parts: list[str] = []
        self._fonts()

    def _fonts(self):
        self.parts.append(
            f"""<defs>
  <style>
    @font-face {{ font-family: 'Caveat'; src: url('file://{FONT_REG}'); font-weight: 400; }}
    @font-face {{ font-family: 'Caveat'; src: url('file://{FONT_BOLD}'); font-weight: 700; }}
  </style>
</defs>"""
        )

    def bg(self, color: str = SOFT):
        self.parts.append(f'<rect width="{W}" height="{H}" fill="{color}"/>')
        # subtle dots
        for _ in range(40):
            x, y = random.randint(20, W - 20), random.randint(20, H - 20)
            self.parts.append(
                f'<circle cx="{x}" cy="{y}" r="1.2" fill="#CBD5E1" opacity="0.35"/>'
            )

    def rect(
        self,
        x,
        y,
        w,
        h,
        fill=WHITE,
        stroke=INK,
        sw=2.5,
        r=18,
        opacity=1,
        dash=None,
    ):
        dash_attr = f' stroke-dasharray="{dash}"' if dash else ""
        self.parts.append(
            f'<rect x="{x+jitter()}" y="{y+jitter()}" width="{w}" height="{h}" rx="{r}" '
            f'fill="{fill}" fill-opacity="{opacity}" stroke="{stroke}" stroke-width="{sw}"'
            f'{dash_attr} stroke-linejoin="round"/>'
        )

    def oval(self, x, y, w, h, fill=WHITE, stroke=INK, sw=2.5, opacity=1):
        self.parts.append(
            f'<ellipse cx="{x+w/2+jitter()}" cy="{y+h/2+jitter()}" rx="{w/2}" ry="{h/2}" '
            f'fill="{fill}" fill-opacity="{opacity}" stroke="{stroke}" stroke-width="{sw}"/>'
        )

    def line(self, x1, y1, x2, y2, stroke=INK, sw=2.2, dash=None):
        dash_attr = f' stroke-dasharray="{dash}"' if dash else ""
        self.parts.append(
            f'<path d="M {x1+jitter(1)} {y1+jitter(1)} Q {(x1+x2)/2+jitter(4)} {(y1+y2)/2+jitter(4)} '
            f'{x2+jitter(1)} {y2+jitter(1)}" fill="none" stroke="{stroke}" stroke-width="{sw}"'
            f'{dash_attr} stroke-linecap="round"/>'
        )

    def arrow(self, x1, y1, x2, y2, stroke=TEAL, sw=2.5):
        self.line(x1, y1, x2, y2, stroke=stroke, sw=sw)
        ang = math.atan2(y2 - y1, x2 - x1)
        for a in (ang + 2.6, ang - 2.6):
            self.parts.append(
                f'<line x1="{x2}" y1="{y2}" x2="{x2+math.cos(a)*14}" y2="{y2+math.sin(a)*14}" '
                f'stroke="{stroke}" stroke-width="{sw}" stroke-linecap="round"/>'
            )

    def text(
        self,
        x,
        y,
        t,
        size=28,
        fill=INK,
        bold=False,
        anchor="start",
        max_w=None,
    ):
        weight = 700 if bold else 400
        words = str(t).split()
        lines: list[str] = []
        if max_w:
            cur = ""
            approx = size * 0.52
            for w in words:
                test = (cur + " " + w).strip()
                if len(test) * approx > max_w and cur:
                    lines.append(cur)
                    cur = w
                else:
                    cur = test
            if cur:
                lines.append(cur)
        else:
            lines = [str(t)]
        for i, line in enumerate(lines):
            self.parts.append(
                f'<text x="{x}" y="{y + i * size * 1.15}" fill="{fill}" font-size="{size}" '
                f'font-family="Caveat, Comic Sans MS, cursive" font-weight="{weight}" '
                f'text-anchor="{anchor}">{esc(line)}</text>'
            )
        return len(lines) * size * 1.15

    def check(self, x, y, label, size=24, fill=INK):
        self.parts.append(
            f'<circle cx="{x}" cy="{y-6}" r="11" fill="{GREEN}" stroke="{TEAL}" stroke-width="2"/>'
        )
        self.parts.append(
            f'<path d="M {x-5} {y-7} L {x-1} {y-2} L {x+6} {y-11}" fill="none" '
            f'stroke="{TEAL}" stroke-width="2.5" stroke-linecap="round"/>'
        )
        self.text(x + 18, y, label, size=size, fill=fill)

    def badge(self, x, y, n, fill=TEAL):
        self.parts.append(
            f'<circle cx="{x}" cy="{y}" r="22" fill="{fill}" stroke="{INK}" stroke-width="2"/>'
        )
        self.text(x, y + 8, str(n), size=26, fill=WHITE, bold=True, anchor="middle")

    def icon_store(self, x, y, s=1.0):
        self.rect(x, y + 28 * s, 90 * s, 55 * s, fill="#FFF7ED", stroke=TEAL, sw=2.2, r=4)
        self.parts.append(
            f'<path d="M {x-5*s} {y+28*s} L {x+45*s} {y} L {x+95*s} {y+28*s}" fill="#FCA5A5" '
            f'stroke="{INK}" stroke-width="2"/>'
        )
        self.rect(x + 35 * s, y + 45 * s, 22 * s, 38 * s, fill=GOLD, stroke=INK, sw=1.8, r=2)
        self.rect(x + 12 * s, y + 40 * s, 18 * s, 16 * s, fill=BLUE, stroke=INK, sw=1.5, r=2)

    def icon_bulb(self, x, y):
        self.oval(x, y, 34, 40, fill=YELLOW, stroke=GOLD)
        self.rect(x + 10, y + 38, 14, 12, fill="#E5E7EB", stroke=INK, sw=1.5, r=2)
        for a in (-40, 0, 40):
            rad = math.radians(a - 90)
            self.line(
                x + 17 + math.cos(rad) * 22,
                y + 18 + math.sin(rad) * 22,
                x + 17 + math.cos(rad) * 30,
                y + 18 + math.sin(rad) * 30,
                stroke=GOLD,
                sw=2,
            )

    def icon_people(self, x, y):
        for dx in (0, 28):
            self.oval(x + dx, y, 18, 18, fill=PINK if dx else BLUE, stroke=TEAL)
            self.oval(x + dx - 4, y + 18, 26, 22, fill=WHITE, stroke=TEAL)

    def icon_target(self, x, y):
        self.oval(x, y, 44, 44, fill=WHITE, stroke=TEAL, sw=2.5)
        self.oval(x + 8, y + 8, 28, 28, fill=CORAL, stroke=GOLD, sw=2)
        self.oval(x + 16, y + 16, 12, 12, fill=TEAL, stroke=INK, sw=1.5)

    def icon_doc(self, x, y):
        self.rect(x, y, 34, 44, fill=WHITE, stroke=TEAL, r=4)
        self.line(x + 8, y + 12, x + 26, y + 12, stroke="#94A3B8", sw=2)
        self.line(x + 8, y + 20, x + 26, y + 20, stroke="#94A3B8", sw=2)
        self.line(x + 8, y + 28, x + 20, y + 28, stroke="#94A3B8", sw=2)

    def icon_mic(self, x, y):
        self.oval(x + 8, y, 20, 28, fill=PURPLE, stroke=TEAL)
        self.line(x + 18, y + 28, x + 18, y + 40, stroke=TEAL, sw=2.5)
        self.line(x + 8, y + 40, x + 28, y + 40, stroke=TEAL, sw=2.5)

    def icon_bot(self, x, y):
        self.rect(x, y + 8, 40, 32, fill=BLUE, stroke=TEAL, r=8)
        self.oval(x + 8, y + 16, 8, 8, fill=TEAL, stroke=INK, sw=1)
        self.oval(x + 24, y + 16, 8, 8, fill=TEAL, stroke=INK, sw=1)
        self.line(x + 20, y, x + 20, y + 8, stroke=TEAL, sw=2)

    def icon_pencil(self, x, y):
        self.parts.append(
            f'<path d="M {x} {y+36} L {x+8} {y} L {x+16} {y+4} L {x+8} {y+40} Z" '
            f'fill="{YELLOW}" stroke="{INK}" stroke-width="2"/>'
        )
        self.parts.append(
            f'<path d="M {x} {y+36} L {x+4} {y+48} L {x+8} {y+40}" fill="{CORAL}" stroke="{INK}" stroke-width="1.5"/>'
        )

    def icon_gear(self, x, y):
        self.oval(x, y, 40, 40, fill=GREEN, stroke=TEAL)
        self.oval(x + 12, y + 12, 16, 16, fill=WHITE, stroke=TEAL)

    def icon_chart(self, x, y):
        self.rect(x, y + 24, 10, 24, fill=TEAL, stroke=INK, sw=1.5, r=2)
        self.rect(x + 14, y + 12, 10, 36, fill=GOLD, stroke=INK, sw=1.5, r=2)
        self.rect(x + 28, y, 10, 48, fill="#14B8A6", stroke=INK, sw=1.5, r=2)

    def icon_megaphone(self, x, y):
        self.parts.append(
            f'<path d="M {x} {y+20} L {x+36} {y} L {x+36} {y+40} Z" fill="{YELLOW}" stroke="{INK}" stroke-width="2"/>'
        )
        self.oval(x + 30, y + 10, 18, 20, fill=CORAL, stroke=INK, sw=1.5)

    def icon_trophy(self, x, y):
        self.oval(x + 6, y, 36, 28, fill=GOLD, stroke=INK)
        self.rect(x + 16, y + 26, 16, 10, fill="#F59E0B", stroke=INK, sw=1.5, r=2)
        self.rect(x + 8, y + 36, 32, 8, fill=YELLOW, stroke=INK, sw=1.5, r=2)

    def save(self, name: str) -> Path:
        svg = (
            f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" '
            f'viewBox="0 0 {W} {H}">' + "".join(self.parts) + "</svg>"
        )
        svg_path = OUT / f"{name}.svg"
        png_path = OUT / f"{name}.png"
        svg_path.write_text(svg, encoding="utf-8")
        cairosvg.svg2png(
            url=str(svg_path),
            write_to=str(png_path),
            output_width=W,
            output_height=H,
        )
        return png_path


# ───────────────────── 10 slides ─────────────────────


def s01():
    s = Sketch(1)
    s.bg("#EEF6F6")
    s.text(80, 70, "PTM  ·  Prueba técnica Analista de Marca", 34, TEAL, True)
    s.rect(70, 100, 900, 120, fill=WHITE, stroke=TEAL, sw=3)
    s.text(100, 150, "«Activa más oportunidades»", 48, TEAL, True)
    s.text(100, 195, "Piloto 360° para comercios de barrio que ya usan PTM", 28, INK)
    s.icon_store(1080, 90, 1.6)
    s.oval(1280, 120, 260, 100, fill=YELLOW, stroke=GOLD, sw=2.5)
    s.text(1410, 160, "Más servicios", 26, INK, True, "middle")
    s.text(1410, 195, "= más ingreso", 26, INK, True, "middle")
    s.arrow(1180, 220, 1320, 200, TEAL, 2.5)

    boxes = [
        (70, 280, BLUE, "Propósito", "Convertir una necesidad\nde negocio en propuesta\nde marca medible", s.icon_bulb),
        (470, 280, PINK, "Audiencias", "Bajo/medio uso,\nequipo comercial\ny opinión pública", s.icon_people),
        (870, 280, GREEN, "Condiciones", "6 semanas · multicanal\nlenguaje simple\ntono optimista", s.icon_target),
        (70, 560, ORANGE, "Entregables", "PDF ≤12 slides\nanexo opcional\narchivos editables", s.icon_doc),
        (470, 560, PURPLE, "Sustentación", "12 min presentar\n+ 8 min preguntas", s.icon_mic),
        (870, 560, CORAL, "Uso de IA", "Permitida con\ndeclaración clara\nde ajustes propios", s.icon_bot),
    ]
    for x, y, fill, title, body, icon in boxes:
        s.rect(x, y, 360, 230, fill=fill, stroke=INK, sw=2.2, opacity=0.95)
        icon(x + 24, y + 28)
        s.text(x + 80, y + 55, title, 30, TEAL, True)
        s.text(x + 24, y + 100, body, 24, INK, max_w=310)
    s.rect(1270, 280, 280, 510, fill=YELLOW, stroke=GOLD, sw=3, opacity=0.9)
    s.icon_trophy(1360, 320)
    s.text(1410, 420, "En resumen", 28, TEAL, True, "middle")
    s.text(
        1410,
        470,
        "Diseñar una campaña\nrealista y medible\nque active más uso\nde servicios en el\nmostrador del barrio.",
        24,
        INK,
        anchor="middle",
        max_w=230,
    )
    s.text(1410, 720, "¡Éxitos!", 40, GOLD, True, "middle")
    return s.save("slide_01")


def s02():
    s = Sketch(2)
    s.bg("#F8FAFC")
    s.text(70, 60, "01  Diagnóstico → oportunidad → SMART", 36, TEAL, True)
    s.rect(60, 100, 460, 360, fill=CORAL, stroke=INK, sw=2.5, opacity=0.9)
    s.text(90, 150, "Problema", 32, "#B91C1C", True)
    for i, t in enumerate(
        [
            "Comercio activo, pero poco explorado",
            "Ingreso adicional se siente lejano",
            "Mensajes técnicos / poco concretos",
            "Canales sueltos, sin viaje único",
        ]
    ):
        s.check(90, 210 + i * 50, t, 24)
    s.arrow(540, 280, 620, 280)
    s.rect(640, 100, 460, 360, fill=GREEN, stroke=INK, sw=2.5, opacity=0.9)
    s.text(670, 150, "Oportunidad", 32, TEAL, True)
    for i, t in enumerate(
        [
            "Partir del mostrador real",
            "Promesa clara y creíble",
            "Viaje 6 semanas coordinado",
            "Medir y ajustar en vivo",
        ]
    ):
        s.check(670, 210 + i * 50, t, 24)
    s.rect(1140, 100, 400, 360, fill=YELLOW, stroke=GOLD, sw=3)
    s.text(1340, 160, "SMART", 34, TEAL, True, "middle")
    s.text(1165, 220, "En 6 semanas:", 26, INK, True)
    s.text(1165, 270, "• +25% 2.ª categoría", 26, INK)
    s.text(1165, 320, "• +40% frecuencia", 26, INK)
    s.text(1165, 370, "  en uso medio", 24, INK)
    s.text(1165, 430, "Universo asumido:", 22, "#64748B")
    s.text(1165, 460, "2.500 comercios piloto", 24, INK, True)

    objs = [
        (60, 520, BLUE, "Claridad", "Que entienda qué gana\ny qué hacer hoy"),
        (560, 520, PINK, "Prueba", "Que pruebe un servicio\nnuevo o lo repita"),
        (1060, 520, PURPLE, "Hábito", "Que vuelva a usarlo\nen el mes"),
    ]
    for x, y, fill, title, body in objs:
        s.rect(x, y, 460, 300, fill=fill, stroke=INK, sw=2.2)
        s.text(x + 30, y + 70, title, 34, TEAL, True)
        s.text(x + 30, y + 140, body, 28, INK, max_w=400)
    return s.save("slide_02")


def s03():
    s = Sketch(3)
    s.bg("#F7F3EA")
    s.text(70, 55, "02  Audiencias del piloto", 36, TEAL, True)
    s.icon_people(520, 25)
    rows = [
        ("P1", "Uso bajo", "«No sé por dónde empezar»", "Probar 1 servicio esta semana", BLUE),
        ("P2", "Uso medio", "«Me quedé en lo de siempre»", "Sumar 2.ª categoría y repetir", PINK),
        ("P3", "Comercial", "«Necesito una historia corta»", "Guiar con prueba y seguimiento", GREEN),
        ("P4", "Pública", "«¿Esto sí le sirve al barrio?»", "Ver prueba social creíble", YELLOW),
    ]
    for i, (code, seg, barrier, desire, fill) in enumerate(rows):
        y = 110 + i * 180
        s.rect(60, y, 1480, 155, fill=fill, stroke=INK, sw=2.2, opacity=0.92)
        s.badge(120, y + 78, code.replace("P", ""), fill=TEAL)
        s.text(180, y + 55, f"{code} · {seg}", 32, TEAL, True)
        s.text(180, y + 100, f"Barrera: {barrier}", 26, INK)
        s.text(900, y + 100, f"→ {desire}", 26, TEAL, True)
    return s.save("slide_03")


def s04():
    s = Sketch(4)
    s.bg("#EEF6F6")
    s.text(70, 55, "03  Promesa, concepto y pilares", 36, TEAL, True)
    s.rect(60, 100, 1480, 110, fill=YELLOW, stroke=GOLD, sw=3)
    s.text(100, 145, "Promesa:", 28, TEAL, True)
    s.text(230, 145, "Con PTM, su mostrador puede generar más oportunidades de ingreso,", 28, INK)
    s.text(100, 185, "paso a paso, con acompañamiento cercano.", 28, INK)

    s.rect(60, 240, 700, 200, fill=WHITE, stroke=TEAL, sw=2.5)
    s.text(90, 290, "Concepto", 30, TEAL, True)
    s.text(90, 340, "«El mostrador que hace más»", 36, GOLD, True)
    s.text(90, 395, "Línea: Active más oportunidades · empiece por una.", 26, INK)

    s.rect(800, 240, 740, 200, fill=BLUE, stroke=INK, sw=2.2)
    s.text(830, 290, "Reason to believe", 30, TEAL, True)
    for i, t in enumerate(
        ["Ya es comercio PTM", "Servicios del día a día", "Equipo que acompaña", "Prueba fácil de medir"]
    ):
        s.check(830, 340 + i * 28, t, 22)

    pillars = [
        (60, 480, CORAL, "1. Claridad útil", "Qué puede activar\ny cómo se ve en plata"),
        (560, 480, GREEN, "2. Prueba fácil", "Una acción concreta\nesta semana"),
        (1060, 480, PURPLE, "3. Acompañamiento", "Comercial + WhatsApp\npara no dejar solo"),
    ]
    for x, y, fill, title, body in pillars:
        s.rect(x, y, 460, 320, fill=fill, stroke=INK, sw=2.2)
        s.text(x + 30, y + 70, title, 32, TEAL, True)
        s.text(x + 30, y + 150, body, 28, INK, max_w=400)
    return s.save("slide_04")


def s05():
    s = Sketch(5)
    s.bg("#F8FAFC")
    s.text(70, 50, "04  Sistema visual + 4 piezas", 36, TEAL, True)
    s.rect(60, 90, 500, 200, fill=WHITE, stroke=TEAL, sw=2.5)
    s.text(90, 140, "Look & feel", 28, TEAL, True)
    s.rect(90, 170, 70, 70, fill=TEAL, stroke=INK, sw=2, r=8)
    s.rect(180, 170, 70, 70, fill=GOLD, stroke=INK, sw=2, r=8)
    s.rect(270, 170, 70, 70, fill="#F0FDFA", stroke=INK, sw=2, r=8)
    s.text(90, 270, "Teal · Oro · Fondo claro  |  tipografía cercana", 22, INK)

    s.rect(600, 90, 940, 200, fill=YELLOW, stroke=GOLD, sw=2.5)
    s.text(640, 160, "CTA único de campaña", 28, TEAL, True)
    s.text(640, 220, "«Quiero activar mi próxima oportunidad»", 34, INK, True)

    pieces = [
        (60, 330, BLUE, "WhatsApp", "Hola, don Carlos\nSu mostrador puede\nhacer más esta semana.\n¿Activamos una?"),
        (450, 330, PINK, "Pop-up app", "Oportunidad lista\nen su PTM\n\n[Activar ahora]"),
        (840, 330, GREEN, "Redes", "Del barrio, para\nel barrio.\nMás servicios =\nmás ingreso."),
        (1230, 330, ORANGE, "Punto de venta", "HOY puede\nactivar más\noportunidades\nPregunte cómo"),
    ]
    for x, y, fill, title, body in pieces:
        s.rect(x, y, 350, 480, fill=fill, stroke=INK, sw=2.2)
        s.text(x + 24, y + 50, title, 30, TEAL, True)
        s.text(x + 24, y + 120, body, 26, INK, max_w=300)
    return s.save("slide_05")


def s06():
    s = Sketch(6)
    s.bg("#F7F3EA")
    s.text(70, 55, "05  Journey 6 semanas", 36, TEAL, True)
    phases = [
        (0, "S1", "Calentamiento", "Diagnóstico\ny expectativa", BLUE),
        (1, "S2-3", "Activación", "Primer servicio\n+ refuerzo", PINK),
        (2, "S4", "Expansión", "Segunda\ncategoría", GREEN),
        (3, "S5", "Hábito", "Repetición\ny rito semanal", PURPLE),
        (4, "S6", "Cierre", "Logro +\npróximo paso", YELLOW),
    ]
    for i, label, title, body, fill in phases:
        x = 50 + i * 310
        s.rect(x, 140, 290, 520, fill=fill, stroke=INK, sw=2.5)
        s.badge(x + 145, 200, i + 1)
        s.text(x + 145, 270, label, 28, TEAL, True, "middle")
        s.text(x + 145, 330, title, 32, INK, True, "middle")
        s.text(x + 145, 420, body, 26, INK, anchor="middle", max_w=240)
        if i < 4:
            s.arrow(x + 295, 400, x + 310, 400, TEAL, 2.5)
    s.rect(50, 700, 1500, 140, fill=WHITE, stroke=TEAL, sw=2.5)
    s.text(
        80,
        780,
        "Mismo CTA en todos los toques · comercial refuerza en S2 y S4 · medición en S3 y S6",
        28,
        INK,
    )
    return s.save("slide_06")


def s07():
    s = Sketch(7)
    s.bg("#EEF6F6")
    s.text(70, 50, "06  Plan 360 + presupuesto $18M", 36, TEAL, True)
    s.icon_gear(720, 20)
    channels = [
        ("WhatsApp/CRM", "23%", "$4.2M"),
        ("Comercial", "20%", "$3.6M"),
        ("SMS", "12%", "$2.2M"),
        ("Punto de venta", "11%", "$2.0M"),
        ("Redes pagas", "10%", "$1.8M"),
        ("Diseño", "8%", "$1.5M"),
        ("Pop-up/digital", "6%", "$1.0M"),
        ("Correo+PR+A/B", "10%", "$1.7M"),
    ]
    for i, (name, pct, mon) in enumerate(channels):
        col, row = i % 4, i // 4
        x, y = 60 + col * 385, 110 + row * 200
        fill = [BLUE, PINK, GREEN, YELLOW, PURPLE, ORANGE, CORAL, "#E0F2FE"][i]
        s.rect(x, y, 360, 170, fill=fill, stroke=INK, sw=2.2)
        s.text(x + 24, y + 55, name, 30, TEAL, True)
        s.text(x + 24, y + 105, f"{pct}  ·  {mon}", 28, INK)

    s.rect(60, 540, 1480, 280, fill=WHITE, stroke=GOLD, sw=3)
    s.text(90, 600, "Riesgos y mitigación", 30, TEAL, True)
    risks = [
        "Baja respuesta → reescribir creativo en S2 y reforzar comercial",
        "Saturación de mensajes → tope semanal y preferencia de canal",
        "Fricción en app → priorizar WhatsApp + visita como plan B",
    ]
    for i, r in enumerate(risks):
        s.check(90, 670 + i * 45, r, 24)
    return s.save("slide_07")


def s08():
    s = Sketch(8)
    s.bg("#F8FAFC")
    s.text(70, 55, "07  Medición: 5 KPIs + 2 A/B", 36, TEAL, True)
    s.icon_chart(700, 20)
    kpis = [
        ("KPI 1", "2.ª categoría", "25%", "Bajo uso"),
        ("KPI 2", "Frecuencia medio", "+40%", "Hábito"),
        ("KPI 3", "Clics Activar", "12%", "CTA"),
        ("KPI 4", "Vía Comercial", "35%", "Del lift"),
        ("KPI 5", "Claridad", "≥4,2", "Mensaje"),
    ]
    for i, (k, name, meta, cad) in enumerate(kpis):
        x = 40 + i * 310
        s.rect(x, 120, 295, 320, fill=[BLUE, PINK, GREEN, PURPLE, YELLOW][i], stroke=INK, sw=2.2)
        s.text(x + 20, 170, k, 24, TEAL, True)
        s.text(x + 20, 220, name, 26, INK, True, max_w=250)
        s.text(x + 20, 300, meta, 40, GOLD, True)
        s.text(x + 20, 370, cad, 22, "#64748B")

    s.rect(60, 480, 720, 340, fill=CORAL, stroke=INK, sw=2.5)
    s.text(90, 540, "A/B 1 · WhatsApp", 30, TEAL, True)
    s.text(90, 600, "Beneficio vs. solo instrucciones", 26, INK, True)
    s.text(90, 660, "Éxito: +20% clics al enlace / 7 días", 24, INK)
    s.text(90, 720, "Ganador → plantilla oficial S4–S6", 24, "#64748B")

    s.rect(820, 480, 720, 340, fill=GREEN, stroke=INK, sw=2.5)
    s.text(850, 540, "A/B 2 · Pop-up", 30, TEAL, True)
    s.text(850, 600, "1 servicio recomendado vs. menú", 26, INK, True)
    s.text(850, 660, "Éxito: +15% inicio de activación", 24, INK)
    s.text(850, 720, "Menos cierre inmediato del pop-up", 24, "#64748B")
    return s.save("slide_08")


def s09():
    s = Sketch(9)
    s.bg("#F7F3EA")
    s.text(70, 55, "08  Datos semana 3 → decisiones", 36, TEAL, True)
    s.rect(60, 110, 900, 420, fill=WHITE, stroke=TEAL, sw=2.5)
    s.text(90, 160, "Escenario de análisis (no dato interno PTM)", 26, "#64748B")
    headers = ["Indicador", "Meta parcial", "Real S3", "Δ"]
    for i, h in enumerate(headers):
        s.text(100 + i * 210, 220, h, 24, TEAL, True)
    s.line(90, 240, 920, 240, stroke="#CBD5E1")
    rows = [
        ("CTR CTA", "8%", "11%", "+3pp"),
        ("2.ª categoría", "12%", "9%", "-3pp"),
        ("Frecuencia", "+20%", "+14%", "-6pp"),
        ("Respuesta WA", "25%", "31%", "+6pp"),
    ]
    for r, row in enumerate(rows):
        for c, val in enumerate(row):
            s.text(100 + c * 210, 290 + r * 50, val, 26, INK)

    findings = [
        (1000, 110, BLUE, "Hallazgo 1", "El gancho creativo\nfunciona (CTR alto)"),
        (1000, 320, PINK, "Hallazgo 2", "Falta puente a la\n2.ª categoría"),
        (1000, 530, YELLOW, "Hallazgo 3", "WhatsApp convierte\natención → diálogo"),
    ]
    for x, y, fill, title, body in findings:
        s.rect(x, y, 540, 180, fill=fill, stroke=INK, sw=2.2)
        s.text(x + 24, y + 55, title, 28, TEAL, True)
        s.text(x + 24, y + 110, body, 26, INK, max_w=480)

    s.rect(60, 570, 900, 250, fill=GREEN, stroke=INK, sw=2.5)
    s.text(90, 630, "3 acciones inmediatas", 30, TEAL, True)
    s.check(90, 690, "Reescribir puente beneficio → servicio concreto", 24)
    s.check(90, 740, "Kit express para comercial en S4", 24)
    s.check(90, 790, "Duplicar formato WA ganador", 24)
    return s.save("slide_09")


def s10():
    s = Sketch(10)
    s.bg("#EEF6F6")
    s.text(70, 50, "09  PR, reputación, supuestos e IA", 34, TEAL, True)
    s.icon_megaphone(780, 15)

    s.rect(60, 100, 500, 280, fill=YELLOW, stroke=GOLD, sw=2.5)
    s.text(90, 150, "Ángulo PR", 28, TEAL, True)
    s.text(90, 210, "El mostrador del barrio\ncomo motor de ingreso\nextra con PTM", 28, INK, max_w=440)

    s.rect(590, 100, 500, 280, fill=BLUE, stroke=INK, sw=2.2)
    s.text(620, 150, "Respuesta redes", 28, TEAL, True)
    s.text(
        620,
        210,
        "«Gracias por escribirnos.\nQueremos que activar un\nservicio sea fácil y claro.\nCuéntenos su caso…»",
        24,
        INK,
        max_w=440,
    )

    s.rect(1100, 100, 440, 280, fill=CORAL, stroke=INK, sw=2.2)
    s.text(1130, 150, "Escalamiento", 28, TEAL, True)
    s.text(1130, 210, "1. Comunidad\n2. Marca + legal\n3. Vocero oficial\n4. Post-crisis 48h", 26, INK, max_w=380)

    s.rect(60, 420, 1000, 400, fill=WHITE, stroke=TEAL, sw=2.5)
    s.text(90, 480, "Supuestos declarados", 30, TEAL, True)
    for i, t in enumerate(
        [
            "Universo piloto ~2.500 (1.600 bajo / 900 medio)",
            "Baseline 2.ª cat. ~8% · frecuencia media ~1.2/sem",
            "CTR base CTA ~6–7%",
            "Tabla S3 = escenario de análisis, no dato interno",
        ]
    ):
        s.check(90, 550 + i * 50, t, 24)

    s.rect(1100, 420, 440, 400, fill=PURPLE, stroke=INK, sw=2.5)
    s.icon_bot(1260, 460)
    s.text(1320, 560, "Uso de IA", 30, TEAL, True, "middle")
    s.text(
        1320,
        620,
        "Apoyo en estructura\ny redacción.\nCriterio, estrategia\ny decisiones:\nPaola Hoyos.",
        24,
        INK,
        anchor="middle",
        max_w=380,
    )
    return s.save("slide_10")


def main():
    print("Generando ilustraciones Excalidraw...")
    imgs = [s01(), s02(), s03(), s04(), s05(), s06(), s07(), s08(), s09(), s10()]
    for p in imgs:
        print(" OK", p.name, f"{p.stat().st_size/1024:.0f} KB")
    print("Listo. Renderizar presentacion_excalidraw.html con render_pdf.py")


if __name__ == "__main__":
    main()
