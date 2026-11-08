#!/usr/bin/env python3
"""Genera los QR de la defensa en docs/assets/qr/tribunal/ (SVG y PNG).
Uso: pip install segno && python3 scripts/generar-qr-tribunal.py"""
from pathlib import Path
import segno

BASE = "https://patrigpor-coder.github.io/flamenco-spritz-web/"
UTM = "utm_source=qr&utm_medium=offline&utm_campaign=defensa_tfm&utm_content="
QR = [
    ("qr1_eventos", "eventos/?"),
    ("qr2_desbloquea", "q/desbloquea/?f=int&s=barra&"),
    ("qr3_navidad", "navidad/?estado=primeros&acceso=anticipado&"),
    ("qr4_panel", "demo/panel/?"),
]
SALIDA = Path(__file__).resolve().parent.parent / "docs" / "assets" / "qr" / "tribunal"
SALIDA.mkdir(parents=True, exist_ok=True)
for nombre, ruta in QR:
    url = BASE + ruta + UTM + nombre
    q = segno.make(url, error="m", micro=False)
    q.save(SALIDA / f"{nombre}.svg", scale=10, border=4, dark="#2B1E33", light="#FFFFFF")
    q.save(SALIDA / f"{nombre}.png", scale=20, border=4, dark="#2B1E33", light="#FFFFFF")
    print(f"{nombre}: versión {q.version}, {q.symbol_size(border=4)[0]} módulos → {url}")
