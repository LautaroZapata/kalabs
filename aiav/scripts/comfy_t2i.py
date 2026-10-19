"""Imagen con Z-Image Turbo (Apache 2.0) vía ComfyUI: el primer cuadro para el I2V.

Por defecto sale en 1280×704, el tamaño nativo del Wan2.2-5B, así el I2V no recorta.
Para el A14B usar --height 720. Turbo va en 8 pasos y cfg 1 (sin negativo).

Con --image hace imagen a imagen: parte de esa foto y la rehace en la medida
de --denoise (0,5–0,7 cambia la luz y la hora y conserva el encuadre). Sirve
para tener el mismo lugar en otro momento del día.

Uso:
  python scripts/comfy_t2i.py --prompt "a lighthouse at dusk ..." --out outputs/faro.png
  python scripts/comfy_t2i.py --image outputs/lago.png --denoise 0.6 --prompt "same lake at sunset ..."
  python scripts/comfy_t2i.py --prompt "..." --seeds 4 --out outputs/faro.png   # faro_s42.png … faro_s45.png
"""
import argparse
from pathlib import Path

from comfy_api import a_input, correr, workflow


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--prompt", required=True)
    ap.add_argument("--out", default="outputs/imagen.png")
    ap.add_argument("--width", type=int, default=1280)
    ap.add_argument("--height", type=int, default=704)
    ap.add_argument("--steps", type=int, default=8)
    ap.add_argument("--seed", type=int, default=42)
    ap.add_argument("--seeds", type=int, default=1, help="cuántas variantes, con seeds consecutivos")
    ap.add_argument("--image", help="imagen de partida (imagen a imagen)")
    ap.add_argument("--denoise", type=float, default=0.6, help="con --image: cuánto se rehace (0–1)")
    args = ap.parse_args()

    for i in range(args.seeds):
        wf = workflow("z_image_t2i_api.json")
        wf["5"]["inputs"]["text"] = args.prompt
        wf["7"]["inputs"].update(width=args.width, height=args.height)
        wf["8"]["inputs"].update(steps=args.steps, seed=args.seed + i)
        if args.image:
            wf["11"] = {"class_type": "LoadImage", "inputs": {"image": a_input(args.image)}}
            wf["12"] = {"class_type": "ImageScale", "inputs": {"image": ["11", 0], "upscale_method": "lanczos",
                                                               "width": args.width, "height": args.height, "crop": "center"}}
            wf["13"] = {"class_type": "VAEEncode", "inputs": {"pixels": ["12", 0], "vae": ["3", 0]}}
            wf["8"]["inputs"].update(latent_image=["13", 0], denoise=args.denoise)
        out = Path(args.out)
        if args.seeds > 1:
            out = out.with_name(f"{out.stem}_s{args.seed + i}{out.suffix}")
        correr(wf, out, ".png")


if __name__ == "__main__":
    main()
