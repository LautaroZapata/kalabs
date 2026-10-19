"""Arma un dataset para entrenar una LoRA del Wan2.2-5B con ai-toolkit.

Videos: los pasa a 24 fps (el fps del 5B), los corta en tramos de exactamente
--frames cuadros y los achica a --lado de lado corto. ai-toolkit recomienda
clips ya recortados al largo de entrenamiento: si el clip es más largo, saltea
cuadros para encajarlo y el movimiento sale acelerado.
Imágenes: las achica a --lado-img de lado corto (para LoRA de estilo o personaje).

Cada salida lleva un .txt con el mismo nombre. Si no existe, se crea con
"TODO": entrenar_lora.py no arranca mientras quede alguno sin escribir.
Los captions van en inglés, describen lo que se ve y llevan la palabra
disparadora (p. ej. "kls style") al principio.

Uso:
  python scripts/preparar_dataset.py fuentes/ datasets/kalabs_estilo --frames 49 --lado 480
"""
import argparse
from fractions import Fraction
from pathlib import Path

import av
from PIL import Image

VIDEO = {".mp4", ".mov", ".mkv", ".webm", ".avi"}
IMAGEN = {".jpg", ".jpeg", ".png", ".webp"}


def achicar(img, lado):
    s = lado / min(img.size)
    if s >= 1:
        return img
    # Múltiplos de 32: es la divisibilidad de buckets del 5B en ai-toolkit.
    w, h = (max(32, round(d * s / 32) * 32) for d in img.size)
    return img.resize((w, h), Image.LANCZOS)


def caption(dest):
    txt = dest.with_suffix(".txt")
    if not txt.exists():
        txt.write_text("TODO\n", encoding="utf-8")


def cuadros_24fps(path):
    """Cuadros del video re-muestreados a 24 fps por vecino más cercano."""
    with av.open(str(path)) as c:
        s = c.streams.video[0]
        fps = float(s.average_rate or 24)
        siguiente = 0.0
        for i, f in enumerate(c.decode(s)):
            t = i / fps
            while t + 1e-6 >= siguiente:
                yield f.to_image()
                siguiente += 1 / 24


def guardar_clip(frames, dest):
    with av.open(str(dest), "w") as out:
        vs = out.add_stream("libx264", rate=Fraction(24))
        vs.width, vs.height, vs.pix_fmt = frames[0].width, frames[0].height, "yuv420p"
        vs.options = {"crf": "14", "preset": "slow"}
        for img in frames:
            for p in vs.encode(av.VideoFrame.from_image(img)):
                out.mux(p)
        for p in vs.encode():
            out.mux(p)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("src", help="carpeta con videos y/o imágenes")
    ap.add_argument("dst")
    ap.add_argument("--frames", type=int, default=49, help="4n+1; 49 = 2 s, 81 ≈ 3,4 s a 24 fps")
    ap.add_argument("--lado", type=int, default=480)
    ap.add_argument("--lado-img", type=int, default=768)
    ap.add_argument("--max-clips", type=int, default=6, help="tramos como máximo por video, para no sesgar el set")
    args = ap.parse_args()
    if (args.frames - 1) % 4:
        raise SystemExit("--frames tiene que ser 4n+1")

    dst = Path(args.dst)
    dst.mkdir(parents=True, exist_ok=True)
    n_vid = n_img = 0
    for f in sorted(Path(args.src).iterdir()):
        ext = f.suffix.lower()
        if ext in IMAGEN:
            dest = dst / f"{f.stem}.png"
            achicar(Image.open(f).convert("RGB"), args.lado_img).save(dest)
            caption(dest)
            n_img += 1
        elif ext in VIDEO:
            tramo, k = [], 0
            for img in cuadros_24fps(f):
                tramo.append(achicar(img.convert("RGB"), args.lado))
                if len(tramo) == args.frames:
                    dest = dst / f"{f.stem}_{k:02}.mp4"
                    guardar_clip(tramo, dest)
                    caption(dest)
                    tramo, k = [], k + 1
                    n_vid += 1
                    if k == args.max_clips:
                        break
            print(f"{f.name}: {k} tramos de {args.frames} cuadros")
    print(f"listo: {n_vid} clips y {n_img} imágenes en {dst}. Escribir los .txt antes de entrenar.")


if __name__ == "__main__":
    main()
