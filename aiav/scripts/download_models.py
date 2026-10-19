"""Baja pesos open-weights directo a aiav/models/ComfyUI/models (ignorado por git).

Una sola copia de cada peso: ComfyUI los lee de ahí, no hay carpetas aparte.

Sin flags (o --comfy / --solo-chico): pack Wan2.2-5B (GGUF Q8 + VAE + T5 FP8), ~13GB.
--extras: RIFE 4.26 (interpolación) + LoRA FastWan del 5B (borradores en 3 pasos), ~0,7GB.
--zimage: Z-Image Turbo int8 + Qwen3-4B FP8 + VAE, para la imagen inicial del I2V, ~12GB.
--a14b: Wan2.2-I2V-A14B GGUF Q4_K_M (high + low) + LoRA lightx2v 4 pasos + VAE 2.1, ~22GB.
--seedvr: SeedVR2 3B int8 + VAE, ampliador de video con coherencia temporal, ~4GB.
--entrenar: Wan2.2-5B fp16 (lo que entrena ai-toolkit; el T5 FP8 se reusa), ~10GB.
--hunyuan: HunyuanVideo-1.5 GGUF Q4 (requiere aceptar licencia en HF).
"""
import argparse
import os
import shutil
import tempfile
from pathlib import Path
from huggingface_hub import snapshot_download, hf_hub_download

BASE = Path(os.environ.get("AIAV_MODELS", Path(__file__).resolve().parents[1] / "models")) / "ComfyUI" / "models"
WAN22 = "Comfy-Org/Wan_2.2_ComfyUI_Repackaged"

PACKS = {
    # (repo, archivo, destino)
    "comfy": [
        ("QuantStack/Wan2.2-TI2V-5B-GGUF", "Wan2.2-TI2V-5B-Q8_0.gguf", "diffusion_models"),
        # El 5B usa el VAE de Wan2.2 (48 canales); wan_2.1_vae solo sirve para 1.3B/14B.
        (WAN22, "split_files/vae/wan2.2_vae.safetensors", "vae"),
        (WAN22, "split_files/text_encoders/umt5_xxl_fp8_e4m3fn_scaled.safetensors", "text_encoders"),
    ],
    "extras": [
        # ComfyUI lo carga con el nodo nativo FrameInterpolationModelLoader.
        ("Comfy-Org/frame_interpolation", "frame_interpolation/rife_v4.26.safetensors", "frame_interpolation"),
        # Destilado de FastVideo para el 5B: 3 pasos, cfg 1, shift 3 (defaults de Wan2GP).
        ("DeepBeepMeep/Wan2.2", "loras_accelerators/Wan2_2_5B_FastWanFullAttn_lora_rank_128_bf16.safetensors", "loras"),
    ],
    "zimage": [
        ("Comfy-Org/z_image_turbo", "split_files/diffusion_models/z_image_turbo_int8_convrot.safetensors", "diffusion_models"),
        ("Comfy-Org/z_image_turbo", "split_files/text_encoders/qwen_3_4b_fp8_mixed.safetensors", "text_encoders"),
        ("Comfy-Org/z_image_turbo", "split_files/vae/ae.safetensors", "vae"),
    ],
    "a14b": [
        ("QuantStack/Wan2.2-I2V-A14B-GGUF", "HighNoise/Wan2.2-I2V-A14B-HighNoise-Q4_K_M.gguf", "diffusion_models"),
        ("QuantStack/Wan2.2-I2V-A14B-GGUF", "LowNoise/Wan2.2-I2V-A14B-LowNoise-Q4_K_M.gguf", "diffusion_models"),
        (WAN22, "split_files/loras/wan2.2_i2v_lightx2v_4steps_lora_v1_high_noise.safetensors", "loras"),
        (WAN22, "split_files/loras/wan2.2_i2v_lightx2v_4steps_lora_v1_low_noise.safetensors", "loras"),
        # El A14B usa el VAE de 2.1 (16 canales), no el de 2.2.
        ("Comfy-Org/Wan_2.1_ComfyUI_repackaged", "split_files/vae/wan_2.1_vae.safetensors", "vae"),
    ],
    "seedvr": [
        ("Comfy-Org/SeedVR2", "diffusion_models/seedvr2_3b_int8_convrot.safetensors", "diffusion_models"),
        ("Comfy-Org/SeedVR2", "vae/seedvr2_ema_vae_fp16.safetensors", "vae"),
    ],
    "entrenar": [
        # ai-toolkit no entrena sobre GGUF: lee este archivo con MODELS_PATH = models/ComfyUI/models.
        (WAN22, "split_files/diffusion_models/wan2.2_ti2v_5B_fp16.safetensors", "diffusion_models"),
    ],
}


def bajar(repo, fname, sub):
    dest = BASE / sub / Path(fname).name
    if dest.exists():
        print(f"ya está: {dest}")
        return
    dest.parent.mkdir(parents=True, exist_ok=True)
    print(f"bajando {repo}:{fname} -> {dest}", flush=True)
    # Baja a un temporal en el mismo disco y mueve plano: sin split_files/ ni .cache/.
    with tempfile.TemporaryDirectory(dir=BASE) as tmp:
        shutil.move(hf_hub_download(repo_id=repo, filename=fname, local_dir=tmp), dest)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--solo-chico", action="store_true")
    ap.add_argument("--comfy", action="store_true")
    ap.add_argument("--extras", action="store_true")
    ap.add_argument("--zimage", action="store_true")
    ap.add_argument("--a14b", action="store_true")
    ap.add_argument("--seedvr", action="store_true")
    ap.add_argument("--entrenar", action="store_true")
    ap.add_argument("--hunyuan", action="store_true")
    args = ap.parse_args()

    if args.hunyuan:
        print("HunyuanVideo-1.5 Q4 GGUF (licencia Tencent, revisar antes de uso comercial)")
        snapshot_download(repo_id="city96/HunyuanVideo-1.5-gguf",
                          allow_patterns=["*Q4*"], local_dir=BASE / "diffusion_models")
        return

    elegidos = [p for p in ("extras", "zimage", "a14b", "seedvr", "entrenar") if getattr(args, p)]
    # Por defecto: pack comfy chico (sirve con --solo-chico y con --comfy).
    if args.comfy or args.solo_chico or not elegidos:
        elegidos.insert(0, "comfy")
    for pack in elegidos:
        for repo, fname, sub in PACKS[pack]:
            bajar(repo, fname, sub)


if __name__ == "__main__":
    main()
