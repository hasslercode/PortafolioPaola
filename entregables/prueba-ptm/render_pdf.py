#!/usr/bin/env python3
"""Render HTML slides via Chrome screenshot → PDF with exact 1920×1080 crops."""
from __future__ import annotations

import os
import signal
import subprocess
import time
from pathlib import Path

import pymupdf

ROOT = Path(__file__).resolve().parent
TMP = Path("/tmp/ptm-slides")
TMP.mkdir(parents=True, exist_ok=True)
W, H = 1920, 1080
CHROME = "google-chrome"


def kill_process_tree(proc: subprocess.Popen) -> None:
    try:
        os.killpg(proc.pid, signal.SIGKILL)
    except ProcessLookupError:
        pass
    try:
        proc.kill()
    except ProcessLookupError:
        pass


def render_slide(html_path: Path, index: int, out_png: Path, display_flex: bool = False) -> None:
    if out_png.exists():
        out_png.unlink()

    html = html_path.read_text(encoding="utf-8")
    display = "flex" if display_flex else "grid"
    # Cover uses grid; content slides use flex via .page — force the section visible
    inject = f"""
<style>
  html, body {{
    margin: 0 !important;
    padding: 0 !important;
    background: #fff !important;
    width: {W}px !important;
    height: {H}px !important;
    overflow: hidden !important;
  }}
  body > .slide {{
    display: none !important;
    margin: 0 !important;
  }}
  body > .slide:nth-of-type({index + 1}) {{
    display: {"grid" if index == 0 and "presentacion" in html_path.name else "block"} !important;
  }}
</style>
"""
    # Simpler: always block; cover has internal grid
    inject = f"""
<style>
  html, body {{
    margin: 0 !important;
    padding: 0 !important;
    background: #ffffff !important;
    width: {W}px !important;
    height: {H}px !important;
    overflow: hidden !important;
  }}
  body > .slide {{
    display: none !important;
    margin: 0 !important;
  }}
  body > .slide:nth-of-type({index + 1}) {{
    display: block !important;
  }}
  body > .slide.cover:nth-of-type({index + 1}) {{
    display: grid !important;
  }}
</style>
"""
    temp = ROOT / f"_tmp_{html_path.stem}_{index}.html"
    temp.write_text(html.replace("</head>", inject + "\n</head>"), encoding="utf-8")
    profile = TMP / f"profile-{html_path.stem}-{index}"
    profile.mkdir(exist_ok=True)

    cmd = [
        CHROME,
        "--headless=new",
        "--no-sandbox",
        "--disable-gpu",
        "--disable-dev-shm-usage",
        "--hide-scrollbars",
        "--force-device-scale-factor=1",
        f"--window-size={W},{H}",
        f"--user-data-dir={profile}",
        f"--screenshot={out_png}",
        "--virtual-time-budget=3000",
        f"file://{temp}",
    ]

    proc = subprocess.Popen(
        cmd,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
        start_new_session=True,
    )

    deadline = time.time() + 50
    ok = False
    while time.time() < deadline:
        if out_png.exists() and out_png.stat().st_size > 20000:
            time.sleep(0.5)
            if out_png.stat().st_size > 20000:
                ok = True
                break
        if proc.poll() is not None:
            break
        time.sleep(0.2)

    kill_process_tree(proc)
    try:
        proc.wait(timeout=3)
    except subprocess.TimeoutExpired:
        pass
    temp.unlink(missing_ok=True)

    if not ok or not out_png.exists() or out_png.stat().st_size < 20000:
        raise RuntimeError(f"Slide {index} failed for {html_path.name}")


def crop_exact(png: Path) -> pymupdf.Pixmap:
    pix = pymupdf.Pixmap(str(png))
    if pix.width == W and pix.height == H:
        return pix
    # Chrome sometimes adds a pixel; crop top-left
    clip = pymupdf.IRect(0, 0, min(W, pix.width), min(H, pix.height))
    cropped = pymupdf.Pixmap(pix, clip)
    if cropped.width != W or cropped.height != H:
        # Pad if smaller
        base = pymupdf.Pixmap(pymupdf.csRGB, pymupdf.IRect(0, 0, W, H), 1)
        base.set_rect(base.irect, (247, 243, 236))
        base.copy(cropped, cropped.irect)
        return base
    return cropped


def build_pdf(html_path: Path, n_slides: int, out_pdf: Path) -> None:
    pngs = []
    for i in range(n_slides):
        out = TMP / f"{html_path.stem}-{i + 1}.png"
        print(f"Rendering {html_path.name} slide {i + 1}/{n_slides}...", flush=True)
        render_slide(html_path, i, out)
        pix = crop_exact(out)
        print(f"  -> {pix.width}x{pix.height} ({out.stat().st_size:,} bytes)", flush=True)
        jpg = out.with_suffix(".jpg")
        if pix.n > 3:
            pix = pymupdf.Pixmap(pymupdf.csRGB, pix)
        jpg.write_bytes(pix.tobytes("jpeg", jpg_quality=88))
        pngs.append(jpg)

    doc = pymupdf.open()
    for jpg in pngs:
        page = doc.new_page(width=W, height=H)
        page.insert_image(page.rect, filename=str(jpg))
    doc.save(out_pdf, deflate=True, garbage=4)
    doc.close()
    print(f"Wrote {out_pdf} ({out_pdf.stat().st_size:,} bytes)", flush=True)


def main() -> None:
    build_pdf(
        ROOT / "presentacion.html",
        12,
        ROOT / "Paola_Hoyos_Prueba_AnalistaMarca.pdf",
    )
    build_pdf(
        ROOT / "anexo.html",
        3,
        ROOT / "Paola_Hoyos_Prueba_AnalistaMarca_Anexo.pdf",
    )


if __name__ == "__main__":
    main()
