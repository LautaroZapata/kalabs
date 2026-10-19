"""Video con Wan2.2 vía la API de ComfyUI: texto o imagen a video, LoRA y RIFE.

Modelos:
  5b   (default) Wan2.2-TI2V-5B GGUF Q8. T2V o, con --image, I2V. Valores
       oficiales: 1280×704, 24 fps, shift 5, cfg 5, 50 pasos (acá 30 por tiempo).
       --rapido usa la LoRA FastWan: 3 pasos, cfg 1, shift 3. Sirve para
       borradores de encuadre y movimiento; el final se saca sin ella.
  a14b Wan2.2-I2V-A14B GGUF Q4_K_M + LoRA lightx2v (4 pasos). Sólo I2V, 16 fps.

Uso:
  python scripts/comfy_video.py --prompt "a lighthouse at dusk, waves" --out outputs/faro.mp4
  python scripts/comfy_video.py --image outputs/faro.png --prompt "..." --rife 2 --out outputs/faro_i2v.mp4
  python scripts/comfy_video.py --modelo a14b --image outputs/faro.png --prompt "..." --out outputs/faro_a14b.mp4
  python scripts/comfy_video.py --modelo a14b --loop --image outputs/lago.png --prompt "..."   # loop nativo
  python scripts/comfy_video.py --prompt "..." --lora kalabs_estilo.safetensors:0.8
"""
import argparse
import sys

from comfy_api import a_input, correr, workflow


def nodo_libre(wf):
    return str(max(int(k) for k in wf) + 1)


def sumar_loras(wf, modelos, loras):
    """Encadena LoraLoaderModelOnly delante de cada nodo de modelo y reconecta a quien lo usaba."""
    for origen in modelos:
        actual = origen
        for spec in loras:
            nombre, _, peso = spec.partition(":")
            nuevo = nodo_libre(wf)
            wf[nuevo] = {"class_type": "LoraLoaderModelOnly",
                         "inputs": {"model": [actual, 0], "lora_name": nombre, "strength_model": float(peso or 1.0)}}
            actual = nuevo
        if actual == origen:
            continue
        for k, n in wf.items():
            if k != actual and n["inputs"].get("model") == [origen, 0] and n["class_type"] != "LoraLoaderModelOnly":
                n["inputs"]["model"] = [actual, 0]


def sumar_rife(wf, decode, video, multiplicador):
    loader, interp = nodo_libre(wf), str(int(nodo_libre(wf)) + 1)
    wf[loader] = {"class_type": "FrameInterpolationModelLoader", "inputs": {"model_name": "rife_v4.26.safetensors"}}
    wf[interp] = {"class_type": "FrameInterpolate",
                  "inputs": {"interp_model": [loader, 0], "images": [decode, 0], "multiplier": multiplicador}}
    wf[video]["inputs"]["images"] = [interp, 0]
    wf[video]["inputs"]["fps"] *= multiplicador


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--prompt", required=True, help="en inglés: Wan se entrenó con captions en inglés y chino")
    ap.add_argument("--negative", help="reemplaza el negativo oficial (en chino)")
    ap.add_argument("--out", default="outputs/video.mp4")
    ap.add_argument("--modelo", choices=["5b", "a14b"], default="5b")
    ap.add_argument("--image", help="imagen inicial (I2V); se recorta al centro al tamaño del video")
    ap.add_argument("--width", type=int)
    ap.add_argument("--height", type=int)
    ap.add_argument("--frames", type=int, help="4n+1; 5b: 121 = 5 s a 24 fps; a14b: 81 = 5 s a 16 fps")
    ap.add_argument("--steps", type=int)
    ap.add_argument("--cfg", type=float)
    ap.add_argument("--shift", type=float)
    ap.add_argument("--seed", type=int, default=42)
    ap.add_argument("--rapido", action="store_true", help="5b: LoRA FastWan, 3 pasos")
    ap.add_argument("--lora", action="append", default=[], help="archivo en models/loras, con :peso opcional")
    ap.add_argument("--rife", type=int, default=0, help="multiplica los cuadros con RIFE 4.26 (2 = 24→48 fps)")
    ap.add_argument("--loop", action="store_true",
                    help="a14b: la imagen va como primer y último cuadro (WanFirstLastFrameToVideo). El clip vuelve "
                         "solo al principio: loop sin costura, y lo que el modelo tiende a agrandar no puede crecer")
    args = ap.parse_args()

    if args.modelo == "a14b":
        if not args.image:
            sys.exit("a14b es sólo I2V: pasar --image")
        if args.rapido:
            sys.exit("a14b ya corre en 4 pasos con lightx2v; --rapido es para el 5b")
        wf = workflow("wan22_a14b_i2v_api.json")
        wf["9"]["inputs"]["text"] = args.prompt
        if args.negative:
            wf["10"]["inputs"]["text"] = args.negative
        wf["11"]["inputs"]["image"] = a_input(args.image)
        if args.loop:
            wf["12"]["class_type"] = "WanFirstLastFrameToVideo"
            wf["12"]["inputs"]["end_image"] = ["11", 0]
        lat = wf["12"]["inputs"]
        lat.update(width=args.width or 1280, height=args.height or 720, length=args.frames or 81)
        for n in ("13", "14"):
            wf[n]["inputs"]["noise_seed"] = args.seed
            if args.cfg is not None:
                wf[n]["inputs"]["cfg"] = args.cfg
        if args.shift is not None:
            wf["5"]["inputs"]["shift"] = wf["6"]["inputs"]["shift"] = args.shift
        if args.steps:
            # Mitad de los pasos para cada experto, como en el workflow oficial.
            mitad = args.steps // 2
            wf["13"]["inputs"].update(steps=args.steps, end_at_step=mitad)
            wf["14"]["inputs"].update(steps=args.steps, start_at_step=mitad)
        sumar_loras(wf, ["3", "4"], args.lora)
        decode, video = "15", "16"
    else:
        wf = workflow("wan22_5b_t2v_api.json")
        wf["5"]["inputs"]["text"] = args.prompt
        if args.negative:
            wf["6"]["inputs"]["text"] = args.negative
        wf["7"]["inputs"].update(width=args.width or 1280, height=args.height or 704, length=args.frames or 121)
        if args.image:
            wf["20"] = {"class_type": "LoadImage", "inputs": {"image": a_input(args.image)}}
            wf["7"]["inputs"]["start_image"] = ["20", 0]
        k = wf["8"]["inputs"]
        k["seed"] = args.seed
        loras = list(args.lora)
        if args.rapido:
            loras.insert(0, "Wan2_2_5B_FastWanFullAttn_lora_rank_128_bf16.safetensors")
            k.update(steps=3, cfg=1.0)
            wf["4"]["inputs"]["shift"] = 3.0
        if args.steps:
            k["steps"] = args.steps
        if args.cfg is not None:
            k["cfg"] = args.cfg
        if args.shift is not None:
            wf["4"]["inputs"]["shift"] = args.shift
        sumar_loras(wf, ["1"], loras)
        decode, video = "9", "10"

    if args.rife:
        sumar_rife(wf, decode, video, args.rife)
    correr(wf, args.out, ".mp4")


if __name__ == "__main__":
    main()
