"""Convierte un clip en video de héroe: loop sin salto + versión liviana para web + póster.

Loop: los últimos --fundido segundos se funden sobre los primeros, así el
último cuadro empalma con el primero y el clip puede repetir sin corte. El
resultado dura lo mismo menos el fundido.

Salida: <dst>.mp4 (H.264, sin audio, faststart, crf 26 y tune grain por defecto) y
<dst>.jpg (póster: el primer cuadro, para que la página no muestre un hueco
mientras carga el video).

Uso:
  python scripts/heroe_web.py outputs/heroe/campo_1080p.mp4 outputs/heroe/campo_web
"""
import argparse
from pathlib import Path

import av
import numpy as np
from PIL import Image


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("src")
    ap.add_argument("dst", help="ruta sin extensión")
    ap.add_argument("--fundido", type=float, default=1.0, help="segundos de fundido simple para el loop; 0 lo apaga. Para héroes, mejor el loop de revelado.py (flujo óptico) y acá 0")
    ap.add_argument("--crf", type=int, default=18, help="18 sin grano quemado (el grano va en el shader); con grano en el video, 24-26")
    ap.add_argument("--tune", default="film", help="x264: film para video sin grano; grain si el grano viene quemado")
    args = ap.parse_args()

    with av.open(args.src) as c:
        s = c.streams.video[0]
        fps = s.average_rate
        cuadros = [f.to_ndarray(format="rgb24") for f in c.decode(s)]

    k = round(float(fps) * args.fundido)
    if k:
        if 2 * k >= len(cuadros):
            raise SystemExit(f"fundido de {k} cuadros es demasiado para {len(cuadros)}")
        cola = cuadros[-k:]
        cuadros = cuadros[:-k]
        for j in range(k):
            a = (j + 1) / (k + 1)
            cuadros[j] = (cola[j].astype(np.float32) * (1 - a) + cuadros[j].astype(np.float32) * a).round().astype(np.uint8)

    dst = Path(args.dst)
    dst.parent.mkdir(parents=True, exist_ok=True)
    mp4, jpg = dst.parent / f"{dst.name}.mp4", dst.parent / f"{dst.name}.jpg"
    h, w = cuadros[0].shape[:2]
    with av.open(str(mp4), "w", options={"movflags": "faststart"}) as out:
        vs = out.add_stream("libx264", rate=fps)
        vs.width, vs.height, vs.pix_fmt = w, h, "yuv420p"
        # Un cuadro clave cada 24: con uno solo al principio, la imagen se corre de a poco
        # y al volver al cuadro 0 el loop "salta" (medido: 0,05 adentro, 1,51 en el reinicio).
        # ipratio/pbratio 1 y sin aq: todos los cuadros con la misma calidad, si no los
        # cuadros clave "pulsan" sobre el resto. Medido en el lago: sin picos.
        vs.options = {"crf": str(args.crf), "preset": "slow", "tune": args.tune, "g": "24", "keyint_min": "24", "sc_threshold": "0",
                      "x264-params": "ipratio=1.0:pbratio=1.0:aq-mode=0"}
        for px in cuadros:
            for p in vs.encode(av.VideoFrame.from_ndarray(px, format="rgb24")):
                out.mux(p)
        for p in vs.encode():
            out.mux(p)
    Image.fromarray(cuadros[0]).save(jpg, quality=85, optimize=True, progressive=True)

    mb = mp4.stat().st_size / 1e6
    print(f"ok: {mp4} ({w}×{h}, {len(cuadros)} cuadros, {len(cuadros) / float(fps):.2f} s, {mb:.1f} MB)")


if __name__ == "__main__":
    main()
