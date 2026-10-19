"""Hoja de contacto: una fila por video, los mismos instantes en columnas.

Sirve para comparar ajustes (pasos, shift, modelo, LoRA, ampliador) mirando
una sola imagen. Cada fila lleva el nombre del archivo; los cuadros se
escalan al mismo alto aunque los videos tengan tamaños distintos.

Uso:
  python scripts/comparar.py outputs/a.mp4 outputs/b.mp4 --out outputs/comparar/ab.png
  python scripts/comparar.py outputs/a.mp4 --cuadros 6 --alto 360 --recorte 0.4,0.3,0.25   # zoom al centro
"""
import argparse
from pathlib import Path

import av
from PIL import Image, ImageDraw


def cuadros(path, n):
    with av.open(str(path)) as c:
        todos = [f.to_image() for f in c.decode(c.streams.video[0])]
    idx = [round(i * (len(todos) - 1) / max(1, n - 1)) for i in range(n)]
    return [todos[i] for i in idx]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("videos", nargs="+")
    ap.add_argument("--out", default="outputs/comparar/hoja.png")
    ap.add_argument("--cuadros", type=int, default=4)
    ap.add_argument("--alto", type=int, default=270)
    ap.add_argument("--recorte", help="x,y,lado relativos (0–1) para hacer zoom en una zona, p. ej. 0.4,0.3,0.25")
    args = ap.parse_args()

    filas = []
    for v in args.videos:
        imgs = cuadros(v, args.cuadros)
        if args.recorte:
            x, y, lado = (float(p) for p in args.recorte.split(","))
            w, h = imgs[0].size
            caja = (int(x * w), int(y * h), int((x + lado) * w), int(y * h + lado * w))
            imgs = [i.crop(caja) for i in imgs]
        imgs = [i.resize((round(i.width * args.alto / i.height), args.alto), Image.LANCZOS) for i in imgs]
        filas.append((Path(v).name, imgs))

    ancho = max(sum(i.width for i in imgs) for _, imgs in filas)
    rotulo = 22
    hoja = Image.new("RGB", (ancho, len(filas) * (args.alto + rotulo)), "black")
    d = ImageDraw.Draw(hoja)
    for r, (nombre, imgs) in enumerate(filas):
        y = r * (args.alto + rotulo)
        d.text((6, y + 4), nombre, fill="white")
        x = 0
        for i in imgs:
            hoja.paste(i, (x, y + rotulo))
            x += i.width
    Path(args.out).parent.mkdir(parents=True, exist_ok=True)
    hoja.save(args.out)
    print(f"ok: {args.out}")


if __name__ == "__main__":
    main()
