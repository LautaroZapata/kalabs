"""Une clips de igual tamaño y fps en uno solo, con corte seco entre planos.

Se re-encodea casi sin pérdida (crf 10) para que el escalado posterior
trabaje sobre frames limpios.

--fps baja la cadencia tomando el cuadro más cercano a cada instante: el A14B
sale a 16 fps; con --rife 3 queda en 48 y acá se lleva a 24 (cadencia de cine).

Uso:
  python scripts/unir_clips.py outputs/secuencia.mp4 outputs/plano1.mp4 outputs/plano2.mp4 ...
  python scripts/unir_clips.py --fps 24 outputs/secuencia.mp4 outputs/plano1.mp4 ...
"""
import argparse
from fractions import Fraction

import av


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--fps", type=int, help="cadencia de salida; por defecto, la del primer clip")
    ap.add_argument("dst")
    ap.add_argument("srcs", nargs="+")
    args = ap.parse_args()

    with av.open(args.srcs[0]) as c:
        s = c.streams.video[0]
        w, h, fps_src = s.width, s.height, s.average_rate
    fps = Fraction(args.fps) if args.fps else fps_src
    if fps > fps_src:
        raise SystemExit(f"--fps {fps} es mayor que el original ({fps_src}): para subir, usar RIFE")

    total = 0
    with av.open(args.dst, "w") as out:
        vs = out.add_stream("libx264", rate=fps)
        vs.width, vs.height, vs.pix_fmt = w, h, "yuv420p"
        vs.options = {"crf": "10", "preset": "slow"}
        for src in args.srcs:
            with av.open(src) as c:
                st = c.streams.video[0]
                if st.average_rate != fps_src:
                    raise SystemExit(f"{src} va a {st.average_rate} fps, se esperaba {fps_src}")
                siguiente = 0
                for i, f in enumerate(c.decode(st)):
                    if (f.width, f.height) != (w, h):
                        raise SystemExit(f"{src} es {f.width}×{f.height}, se esperaba {w}×{h}")
                    # Se queda con el cuadro si su instante alcanzó al próximo cuadro de salida.
                    if i * fps < siguiente * fps_src:
                        continue
                    siguiente += 1
                    for p in vs.encode(av.VideoFrame.from_ndarray(f.to_ndarray(format="rgb24"), format="rgb24")):
                        out.mux(p)
                    total += 1
        for p in vs.encode():
            out.mux(p)
    print(f"ok: {args.dst} ({total} frames, {total / float(fps):.2f} s a {fps} fps)")


if __name__ == "__main__":
    main()
