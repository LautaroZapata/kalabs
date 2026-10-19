"""Amplía un video con SeedVR2 3B int8 vía ComfyUI (nodos nativos).

A diferencia de upscale_video.py (Real-ESRGAN cuadro por cuadro), SeedVR2
restaura el clip entero con coherencia temporal: no parpadea textura entre
cuadros. Corrige color contra el original en CIELAB.

1.5 lleva 1280×704 a 1920×1056 (o 1280×720 a 1920×1080).

Uso:
  python scripts/comfy_upscale.py outputs/faro_5s_720p.mp4 outputs/faro_5s_seedvr.mp4
"""
import argparse

from comfy_api import a_input, correr, workflow


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("src")
    ap.add_argument("dst")
    ap.add_argument("--factor", type=float, default=1.5)
    ap.add_argument("--color", choices=["lab", "wavelet", "adain", "none"], default="lab")
    ap.add_argument("--seed", type=int, default=42)
    args = ap.parse_args()

    wf = workflow("seedvr2_upscale_api.json")
    wf["1"]["inputs"]["file"] = a_input(args.src)
    wf["3"]["inputs"]["resize_type.multiplier"] = args.factor
    wf["13"]["inputs"]["color_correction_method"] = args.color
    wf["10"]["inputs"]["seed"] = args.seed
    correr(wf, args.dst, ".mp4")


if __name__ == "__main__":
    main()
