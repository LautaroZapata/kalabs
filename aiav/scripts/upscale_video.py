"""Amplía un video a 2K (2560×1440, u otro tamaño) con Real-ESRGAN ncnn-vulkan.

Wan genera nativo en 720p; generar más grande directo duplica objetos y tarda
varias veces más. Mejor generar en 720p y ampliar acá.

Receta (look Kalabs, docs/look.md): realesrgan-x4plus mezclado al 40 % con el
original estirado con lanczos. Más ESRGAN da el "detail" pintado de IA. Sin
grano: lo pone revelado.py, que va después. Para la receta vieja de fotos de IG
(80/20 + grano): --mezcla 0.8 --grano 4.

Uso:
  python scripts/upscale_video.py outputs/heroe/campo_720p.mp4 outputs/heroe/campo_1440p.mp4
"""
import argparse
import subprocess
import tempfile
from fractions import Fraction
from pathlib import Path

import av
import numpy as np
from PIL import Image

LAB = Path(__file__).resolve().parents[1]
ESRGAN = LAB / "models" / "realesrgan" / "realesrgan-ncnn-vulkan.exe"


def cubrir(img, w, h):
    """Escala para cubrir w×h y recorta al centro."""
    s = max(w / img.width, h / img.height)
    img = img.resize((round(img.width * s), round(img.height * s)), Image.LANCZOS)
    x, y = (img.width - w) // 2, (img.height - h) // 2
    return img.crop((x, y, x + w, y + h))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("src")
    ap.add_argument("dst")
    ap.add_argument("--width", type=int, default=2560)
    ap.add_argument("--height", type=int, default=1440)
    ap.add_argument("--mezcla", type=float, default=0.4, help="peso del ampliado frente al original estirado")
    ap.add_argument("--grano", type=float, default=0.0, help="sigma del grano gaussiano; por defecto 0: el grano lo pone revelado.py")
    ap.add_argument("--crf", type=int, default=16)
    ap.add_argument("--barras", type=int, help="alto final con bandas negras (p. ej. 1080 para scope en 16:9)")
    args = ap.parse_args()

    with tempfile.TemporaryDirectory() as tmp:
        tmp = Path(tmp)
        (tmp / "in").mkdir()
        (tmp / "out").mkdir()

        with av.open(args.src) as c:
            s = c.streams.video[0]
            fps = s.average_rate or Fraction(24)
            originales = []
            for i, f in enumerate(c.decode(s)):
                img = f.to_image()
                img.save(tmp / "in" / f"{i:05}.png")
                originales.append(img)
        print(f"{len(originales)} frames de {originales[0].width}×{originales[0].height}, ampliando…", flush=True)

        subprocess.run(
            [str(ESRGAN), "-i", str(tmp / "in"), "-o", str(tmp / "out"), "-n", "realesrgan-x4plus", "-f", "png"],
            check=True, cwd=ESRGAN.parent,
        )

        rng = np.random.default_rng(0)
        with av.open(args.dst, "w") as out:
            vs = out.add_stream("libx264", rate=fps)
            alto = args.barras or args.height
            vs.width, vs.height, vs.pix_fmt = args.width, alto, "yuv420p"
            arriba = (alto - args.height) // 2
            vs.options = {"crf": str(args.crf), "preset": "slow"}
            for i, orig in enumerate(originales):
                hd = np.asarray(cubrir(Image.open(tmp / "out" / f"{i:05}.png").convert("RGB"), args.width, args.height), np.float32)
                base = np.asarray(cubrir(orig, args.width, args.height), np.float32)
                px = args.mezcla * hd + (1 - args.mezcla) * base
                if args.grano:
                    px += rng.normal(0, args.grano, px.shape[:2])[..., None]
                px = np.clip(px, 0, 255).astype(np.uint8)
                if args.barras:
                    lienzo = np.zeros((alto, args.width, 3), np.uint8)
                    lienzo[arriba:arriba + args.height] = px
                    px = lienzo
                frame = av.VideoFrame.from_ndarray(px, format="rgb24")
                for p in vs.encode(frame):
                    out.mux(p)
            for p in vs.encode():
                out.mux(p)
    print(f"ok: {args.dst}")


if __name__ == "__main__":
    main()
