"""Corta los sprites de Davo puerro y Edul en piezas con punto de giro para el
esqueleto del censo (prospectos/censopuerrul/components/Rig.tsx).

Entrada: outputs/puerrul/davo_puerro.png y edul_enano.png (recortados de las
imágenes de Z-Image pixel_s42 y edul_solo_s45, fondo ya quitado).
Salida: public/personajes/<quien>-<pieza>.webp (sin pérdida) + lib/rig.json del censo.
Las cajas están en píxeles de la imagen recortada. Se achica a la mitad con
vecino más cercano para no ensuciar el pixel art.

Uso: python scripts/rig_puerrul.py
"""
import json
import os

import numpy as np
from PIL import Image

LAB = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CENSO = os.path.join(LAB, "..", "prospectos", "censopuerrul")
OUT = os.path.join(CENSO, "public", "personajes")
ESC = 0.5


def piezas(ruta, defs, nombre):
    im = Image.open(ruta).convert("RGBA")
    W, H = im.size
    full = np.array(im)
    usado = np.zeros((H, W), bool)
    meta = {"ancho": round(W * ESC), "alto": round(H * ESC), "piezas": []}
    for p in defs:  # en orden: las primeras se quedan con lo que comparten
        x0, y0, x1, y1 = p["caja"]
        m = np.zeros((H, W), bool)
        m[y0:y1, x0:x1] = True
        for bx in p.get("menos", []):
            m[bx[1]:bx[3], bx[0]:bx[2]] = False
        m &= ~usado
        usado |= m
        a = full.copy()
        a[~m, 3] = 0
        pi = Image.fromarray(a)
        bb = pi.getbbox()
        if not bb:
            continue
        pi = pi.crop(bb).resize((max(1, round((bb[2] - bb[0]) * ESC)), max(1, round((bb[3] - bb[1]) * ESC))), Image.NEAREST)
        pi.save(os.path.join(OUT, f"{nombre}-{p['id']}.webp"), lossless=True, quality=100, method=6)
        px, py = p["pivote"]
        meta["piezas"].append({
            "id": p["id"], "x": round(bb[0] * ESC), "y": round(bb[1] * ESC), "w": pi.width, "h": pi.height,
            "px": round((px - bb[0]) * ESC), "py": round((py - bb[1]) * ESC), "z": p["z"],
        })
    im.resize((round(W * ESC), round(H * ESC)), Image.NEAREST).save(os.path.join(OUT, f"{nombre}.webp"), lossless=True, quality=100, method=6)
    return meta


def main():
    os.makedirs(OUT, exist_ok=True)
    davo = piezas(os.path.join(LAB, "outputs/puerrul/davo_puerro.png"), [
        {"id": "brazo-izq", "caja": (78, 600, 152, 800), "pivote": (132, 612), "z": 3},
        {"id": "brazo-der", "caja": (322, 600, 380, 800), "pivote": (336, 612), "z": 3},
        {"id": "hojas", "caja": (0, 0, 462, 348), "pivote": (225, 345), "z": 1},
        {"id": "cabeza", "caja": (0, 330, 462, 548), "pivote": (225, 545), "z": 4},
        {"id": "pies", "caja": (0, 835, 462, 911), "pivote": (225, 840), "z": 0},
        {"id": "cuerpo", "caja": (0, 520, 462, 840), "pivote": (225, 835), "z": 2},
    ], "davo")
    edul = piezas(os.path.join(LAB, "outputs/puerrul/edul_enano.png"), [
        {"id": "micro", "caja": (0, 0, 205, 752), "menos": [(150, 360, 205, 752)], "pivote": (120, 420), "z": 4},
        {"id": "cabeza", "caja": (205, 80, 492, 392), "pivote": (320, 385), "z": 3},
        {"id": "piernas", "caja": (150, 600, 492, 752), "pivote": (320, 605), "z": 0},
        {"id": "cuerpo", "caja": (140, 360, 492, 610), "pivote": (320, 600), "z": 2},
    ], "edul")
    with open(os.path.join(CENSO, "lib", "rig.json"), "w") as f:
        json.dump({"davo": davo, "edul": edul}, f, indent=1)
    print("davo", davo["ancho"], "×", davo["alto"], "· edul", edul["ancho"], "×", edul["alto"])


if __name__ == "__main__":
    main()
