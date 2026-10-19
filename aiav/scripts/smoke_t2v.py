"""Prueba mínima text-to-video en local.

Usa Wan2.1-T2V-1.3B por diffusers: el más chico viable en 12GB.
480p, pocos frames, pocos steps. No es calidad final: es termómetro
de que el stack anda y cuánto tarda esta máquina.

Uso:
  python scripts/smoke_t2v.py --prompt "un faro al atardecer, olas" --out outputs/smoke.mp4
"""
import argparse
import os
from pathlib import Path

# La cache de HF va a aiav/models (NVMe), no al perfil de usuario. Tiene que
# quedar fijada antes de importar diffusers/huggingface_hub.
MODELS = Path(os.environ.get("AIAV_MODELS", Path(__file__).resolve().parents[1] / "models"))
os.environ.setdefault("HF_HOME", str(MODELS / "hf-cache"))
os.environ.setdefault("HF_XET_HIGH_PERFORMANCE", "1")

import torch
from diffusers import AutoencoderKLWan, WanPipeline
from diffusers.utils import export_to_video

MODEL_ID = "Wan-AI/Wan2.1-T2V-1.3B-Diffusers"

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--prompt", required=True)
    ap.add_argument("--out", default="outputs/smoke.mp4")
    ap.add_argument("--steps", type=int, default=20)
    ap.add_argument("--frames", type=int, default=33)
    args = ap.parse_args()

    # Wan en fp16 da frames negros: transformer en bf16 y VAE en fp32.
    dtype = torch.bfloat16 if torch.cuda.is_available() else torch.float32
    vae = AutoencoderKLWan.from_pretrained(MODEL_ID, subfolder="vae", torch_dtype=torch.float32)
    pipe = WanPipeline.from_pretrained(MODEL_ID, vae=vae, torch_dtype=dtype)
    if torch.cuda.is_available():
        pipe.enable_model_cpu_offload()
        try:
            pipe.enable_xformers_memory_efficient_attention()
        except Exception:
            pass
    else:
        print("AVISO: sin CUDA, esto va a tardar muchísimo.")

    out = pipe(prompt=args.prompt, num_frames=args.frames, num_inference_steps=args.steps).frames[0]
    export_to_video(out, args.out, fps=16)
    print(f"ok: {args.out}")

if __name__ == "__main__":
    main()
