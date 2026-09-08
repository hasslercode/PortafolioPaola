#!/usr/bin/env python3
"""Render each .slide at 1920x1080 via Chrome screenshot, then assemble PDF."""
from __future__ import annotations

import os
import signal
import subprocess
import time
from pathlib import Path

import pymupdf

ROOT = Path(__file__).resolve().parent
HTML = ROOT / "presentacion.html"
OUT_PDF = ROOT / "Paola-Hoyos-Esencial-Entrevista.pdf"
TMP = Path("/tmp/esencial-slides")
TMP.mkdir(parents=True, exist_ok=True)

W, H = 1920, 1080


def kill_process_tree(proc: subprocess.Popen) -> None:
    try:
        os.killpg(proc.pid, signal.SIGKILL)
    except ProcessLookupError:
        pass
    try:
        proc.kill()
    except ProcessLookupError:
        pass


def render_slide(index: int, out_png: Path) -> None:
    if out_png.exists():
        out_png.unlink()

    html = HTML.read_text(encoding="utf-8")
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
    display: grid !important;
  }}
  body > .slide.content-slide:nth-of-type({index + 1}) {{
    display: flex !important;
  }}
</style>
"""
    temp = ROOT / f"_slide_{index}.html"
    temp.write_text(html.replace("</head>", inject + "\n</head>"), encoding="utf-8")
    profile = TMP / f"profile-{index}"
    profile.mkdir(exist_ok=True)

    cmd = [
        "google-chrome",
        "--headless=new",
        "--no-sandbox",
        "--disable-gpu",
        "--disable-dev-shm-usage",
        "--disable-extensions",
        "--disable-background-networking",
        "--disable-sync",
        "--disable-default-apps",
        "--no-first-run",
        "--hide-scrollbars",
        "--force-device-scale-factor=1",
        f"--window-size={W},{H}",
        f"--user-data-dir={profile}",
        f"--screenshot={out_png}",
        "--virtual-time-budget=2000",
        f"file://{temp}",
    ]

    proc = subprocess.Popen(
        cmd,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
        start_new_session=True,
    )

    deadline = time.time() + 45
    ok = False
    while time.time() < deadline:
        if out_png.exists() and out_png.stat().st_size > 20000:
            # Give Chrome a moment to finish writing
            time.sleep(0.4)
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
        stdout, stderr = "", ""
        try:
            stdout, stderr = proc.communicate(timeout=1)
        except Exception:
            pass
        raise RuntimeError(
            f"Slide {index} failed. size={out_png.stat().st_size if out_png.exists() else 0}\n"
            f"stdout: {stdout}\nstderr: {stderr}"
        )


def main() -> None:
    pngs = []
    for i in range(4):
        out = TMP / f"slide-{i + 1}.png"
        print(f"Rendering slide {i + 1}...", flush=True)
        render_slide(i, out)
        print(f"  -> {out.name} ({out.stat().st_size:,} bytes)", flush=True)
        pngs.append(out)

    # Verify dimensions
    for png in pngs:
        pix = pymupdf.Pixmap(str(png))
        print(f"  dim {png.name}: {pix.width}x{pix.height}", flush=True)
        if pix.width != W or pix.height != H:
            # Crop or warn — Chrome sometimes adds a bit
            print(f"  WARNING unexpected size", flush=True)

    doc = pymupdf.open()
    for png in pngs:
        pix = pymupdf.Pixmap(str(png))
        if pix.n > 3:
            pix = pymupdf.Pixmap(pymupdf.csRGB, pix)
        jpg_bytes = pix.tobytes("jpeg", jpg_quality=85)
        jpg = png.with_suffix(".jpg")
        jpg.write_bytes(jpg_bytes)
        page = doc.new_page(width=W, height=H)
        page.insert_image(page.rect, stream=jpg_bytes)
    doc.save(OUT_PDF, deflate=True, garbage=4)
    doc.close()
    print(f"Wrote {OUT_PDF} ({OUT_PDF.stat().st_size:,} bytes)", flush=True)


if __name__ == "__main__":
    main()
