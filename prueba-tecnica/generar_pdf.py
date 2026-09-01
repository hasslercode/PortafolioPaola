#!/usr/bin/env python3
"""Genera el PDF desde el HTML con Puppeteer. Uso: python3 generar_pdf.py"""

import subprocess
import sys
from pathlib import Path

DIR = Path(__file__).parent


def main():
    if not (DIR / "node_modules").exists():
        print("Instalando dependencias…")
        subprocess.run(["npm", "install"], cwd=DIR, check=True)
    subprocess.run(["npm", "run", "pdf"], cwd=DIR, check=True)


if __name__ == "__main__":
    try:
        main()
    except subprocess.CalledProcessError as e:
        sys.exit(e.returncode)
