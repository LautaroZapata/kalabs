"""Entrena una LoRA del Wan2.2-TI2V-5B con ai-toolkit (ostris) en la 3060.

ai-toolkit vive en models/ai-toolkit con su propio venv (torch cu130), aparte
del .venv del lab. musubi-tuner no sirve acá: sólo entrena los A14B.

Pesos: ai-toolkit busca los archivos en formato ComfyUI dentro de MODELS_PATH,
que apuntamos a models/ComfyUI/models. Reusa el T5 FP8 que ya está y baja
una sola vez wan2.2_ti2v_5B_fp16.safetensors (10GB) a diffusion_models.
El VAE lo baja de Wan-AI/Wan2.2-TI2V-5B-Diffusers al cache de models/hf-cache.

Memoria (12GB): transformer en qfloat8, T5 en qfloat8, low_vram, captions
cacheados, gradient checkpointing, batch 1. Sin muestras durante el
entrenamiento: se prueba cada checkpoint después en ComfyUI con --lora.

Al terminar copia la LoRA final a models/ComfyUI/models/loras/<nombre>.safetensors
y los checkpoints intermedios a loras/<nombre>/.

Z-Image Turbo (--modelo zimage): LoRA de imagen (personaje o estilo). Usa
el adaptador de entrenamiento de ostris (Apache 2.0) para no romper la
destilación de 8 pasos; se carga sólo al entrenar. El transformer sale del
int8 de ComfyUI que ya está; el text encoder Qwen3-4B y el VAE los baja de
Tongyi-MAI/Z-Image-Turbo al cache de models/hf-cache (~8GB la primera vez).

Uso:
  python scripts/entrenar_lora.py datasets/kalabs_estilo --nombre kalabs_estilo --pasos 1500
  python scripts/entrenar_lora.py datasets/davo --nombre davo --modelo zimage --resolucion 768
  python scripts/entrenar_lora.py datasets/kalabs_estilo --nombre kalabs_estilo --solo-config
"""
import argparse
import json
import os
import shutil
import subprocess
import sys
import urllib.request
from pathlib import Path

LAB = Path(__file__).resolve().parents[1]
TOOLKIT = LAB / "models" / "ai-toolkit"
COMFY_MODELS = LAB / "models" / "ComfyUI" / "models"


def liberar_comfy():
    """Si ComfyUI está corriendo, le pide que suelte la VRAM: entrenar necesita la placa entera."""
    try:
        req = urllib.request.Request("http://127.0.0.1:8188/free", data=b'{"unload_models": true, "free_memory": true}',
                                     headers={"Content-Type": "application/json"})
        urllib.request.urlopen(req, timeout=10)
        print("ComfyUI soltó la VRAM")
    except OSError:
        pass


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("dataset")
    ap.add_argument("--nombre", required=True)
    ap.add_argument("--pasos", type=int, default=1500)
    ap.add_argument("--rango", type=int, default=32)
    ap.add_argument("--lr", type=float, default=1e-4)
    ap.add_argument("--resolucion", type=int, nargs="+", default=[480], help="buckets de lado corto")
    ap.add_argument("--guardar-cada", type=int, default=250)
    ap.add_argument("--i2v", action="store_true", help="entrena también el modo imagen→video (primer cuadro fijo)")
    ap.add_argument("--modelo", choices=["wan5b", "zimage"], default="wan5b")
    ap.add_argument("--solo-config", action="store_true")
    args = ap.parse_args()

    dataset = Path(args.dataset).resolve()
    medios = [f for f in dataset.iterdir() if f.suffix.lower() in {".mp4", ".png", ".jpg", ".jpeg", ".webp"}]
    if not medios:
        sys.exit(f"no hay videos ni imágenes en {dataset}")
    videos = [f for f in medios if f.suffix == ".mp4"]
    if videos and len(videos) != len(medios):
        sys.exit("mezclar videos e imágenes en un mismo dataset no está soportado acá: separarlos en dos carpetas")
    pendientes = [f.name for f in medios
                  if not f.with_suffix(".txt").exists() or "TODO" in f.with_suffix(".txt").read_text(encoding="utf-8")]
    if pendientes:
        sys.exit("faltan captions en: " + ", ".join(pendientes[:10]) + (" …" if len(pendientes) > 10 else ""))

    num_frames = 1
    if videos:
        import av
        with av.open(str(videos[0])) as c:
            num_frames = c.streams.video[0].frames

    salida = LAB / "outputs" / "entrenamiento"
    config = {
        "job": "extension",
        "config": {
            "name": args.nombre,
            "process": [{
                "type": "sd_trainer",
                "training_folder": str(salida),
                "device": "cuda:0",
                "network": {"type": "lora", "linear": args.rango, "linear_alpha": args.rango},
                "save": {"dtype": "float16", "save_every": args.guardar_cada, "max_step_saves_to_keep": 8},
                "datasets": [{
                    "folder_path": str(dataset),
                    "caption_ext": "txt",
                    "caption_dropout_rate": 0.05,
                    "num_frames": num_frames,
                    "fps": 24,
                    "resolution": args.resolucion,
                    "cache_latents_to_disk": True,
                    "do_i2v": args.i2v,
                }],
                "train": {
                    "batch_size": 1,
                    "steps": args.pasos,
                    "gradient_accumulation": 1,
                    "train_unet": True,
                    "train_text_encoder": False,
                    "gradient_checkpointing": True,
                    "noise_scheduler": "flowmatch",
                    "timestep_type": "weighted",
                    "optimizer": "adamw8bit",
                    "lr": args.lr,
                    "optimizer_params": {"weight_decay": 1e-4},
                    "dtype": "bf16",
                    "cache_text_embeddings": True,
                    "disable_sampling": True,
                },
                "model": {
                    "name_or_path": "Wan-AI/Wan2.2-TI2V-5B-Diffusers",
                    "arch": "wan22_5b",
                    "quantize": True,
                    "qtype": "qfloat8",
                    "quantize_te": True,
                    "qtype_te": "qfloat8",
                    "low_vram": True,
                },
                "sample": {
                    "sampler": "flowmatch", "sample_every": 100000, "width": 832, "height": 480,
                    "num_frames": 1, "fps": 24, "prompts": [], "neg": "", "seed": 42,
                    "guidance_scale": 5, "sample_steps": 30,
                },
            }],
        },
        "meta": {"name": "[name]", "version": "1.0"},
    }
    if args.modelo == "zimage":
        proc = config["config"]["process"][0]
        proc["datasets"][0].pop("num_frames"); proc["datasets"][0].pop("fps"); proc["datasets"][0].pop("do_i2v")
        proc["model"] = {
            "name_or_path": "Tongyi-MAI/Z-Image-Turbo",
            "arch": "zimage",
            "assistant_lora_path": "ostris/zimage_turbo_training_adapter/zimage_turbo_training_adapter_v2.safetensors",
            "quantize": True,
            "qtype": "qfloat8",
            "quantize_te": True,
            "qtype_te": "qfloat8",
            "low_vram": True,
            # El int8 convrot de ComfyUI tira 0xC0000005 al decuantizar en
            # Windows (2026-10-18): se usa el bf16 de Hugging Face.
            "model_kwargs": {"use_comfy_weights": False},
        }
        proc["sample"] = {"sampler": "flowmatch", "sample_every": 100000, "width": 768, "height": 768,
                          "prompts": [], "neg": "", "seed": 42, "guidance_scale": 1, "sample_steps": 8}
    destino = salida / args.nombre
    destino.mkdir(parents=True, exist_ok=True)
    cfg_path = destino / "config.json"
    cfg_path.write_text(json.dumps(config, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"config: {cfg_path} ({len(medios)} muestras, {num_frames} cuadros c/u)")
    if args.solo_config:
        return

    liberar_comfy()
    env = dict(os.environ,
               MODELS_PATH=str(COMFY_MODELS),
               HF_HOME=str(LAB / "models" / "hf-cache"),
               PYTHONIOENCODING="utf-8",
               PYTHONUNBUFFERED="1")
    py = TOOLKIT / "venv" / "Scripts" / "python.exe"
    r = subprocess.run([str(py), "run.py", str(cfg_path)], cwd=TOOLKIT, env=env)
    if r.returncode:
        sys.exit(f"ai-toolkit terminó con código {r.returncode}")

    loras = COMFY_MODELS / "loras"
    final = destino / f"{args.nombre}.safetensors"
    if final.exists():
        shutil.copy2(final, loras / final.name)
        print(f"LoRA final: models/ComfyUI/models/loras/{final.name}")
    checkpoints = sorted(destino.glob(f"{args.nombre}_*.safetensors"))
    if checkpoints:
        (loras / args.nombre).mkdir(exist_ok=True)
        for c in checkpoints:
            shutil.copy2(c, loras / args.nombre / c.name)
        print(f"checkpoints: models/ComfyUI/models/loras/{args.nombre}/ ({len(checkpoints)})")


if __name__ == "__main__":
    main()
