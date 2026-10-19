# AIAV — lab de video/imagen IA de Kalabs

Lab interno para generar video e imagen en local (RTX 3060 12GB) con modelos
de pesos abiertos. Para el contexto completo leer `CLAUDE.md`.

## Instalación (ya hecha en esta máquina, 2026-10-11)

```powershell
# 1. venv + torch CUDA + deps
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu126
pip install -r requirements.txt

# 2. verificar
python scripts\check_env.py

# 3. bajar un modelo chico a aiav\models
python scripts\download_models.py --solo-chico

# 4. prueba mínima
python scripts\smoke_t2v.py --prompt "un faro al atardecer, olas" --out outputs\smoke.mp4
```

El camino de uso diario es ComfyUI (abajo); `smoke_t2v.py` sólo verifica diffusers.

## ComfyUI (recomendado para Wan2.2-5B GGUF)

```powershell
# primera vez
git clone https://github.com/comfyanonymous/ComfyUI.git models\ComfyUI
cd models\ComfyUI
..\..\.venv\Scripts\python -m pip install -r requirements.txt
# modelos: ver scripts\download_models.py --comfy
# arrancar
python main.py --listen 127.0.0.1 --port 8188 --reserve-vram 2 --use-sage-attention
```

SageAttention 2.2 (wheel de woct0rdho para Windows) + triton-windows 3.8 van
en el `.venv` del lab. Los scripts levantan ComfyUI solos, ya con Sage:

```powershell
pip install "triton-windows<3.9" https://github.com/woct0rdho/SageAttention/releases/download/v2.2.0-windows.post6/sageattention-2.2.0+cu128torch2.10.0andhigher.post6-cp310-abi3-win_amd64.whl
```

Workflows que funcionan en 12GB quedan exportados en `workflows/`.

## Flujo de calidad

```powershell
python scripts\download_models.py --extras --zimage --seedvr   # RIFE, FastWan, Z-Image, SeedVR2

# 1. primer cuadro con Z-Image Turbo (4 variantes, elegir una)
python scripts\comfy_t2i.py --prompt "..." --seeds 4 --out outputs\toma.png
# 2. borrador de movimiento en 3 pasos (FastWan)
python scripts\comfy_video.py --image outputs\toma_s43.png --prompt "..." --rapido --out outputs\toma_borrador.mp4
# 3. toma final, 30 pasos
python scripts\comfy_video.py --image outputs\toma_s43.png --prompt "..." --out outputs\toma.mp4
# 4. ampliar a 1080p con SeedVR2 y, si hace falta, más fluidez con RIFE
python scripts\comfy_upscale.py outputs\toma.mp4 outputs\toma_1080p.mp4
# comparar variantes en una sola imagen
python scripts\comparar.py outputs\a.mp4 outputs\b.mp4 --out outputs\comparar\ab.png
```

Prompts en inglés: Wan se entrenó con captions en inglés y chino. El negativo
por defecto es el oficial, en chino.

## Fine-tune (LoRA del 5B)

ai-toolkit (ostris) en `models\ai-toolkit`, con venv propio (torch 2.13 cu130):

```powershell
git clone https://github.com/ostris/ai-toolkit.git models\ai-toolkit
cd models\ai-toolkit
py -3.12 -m venv venv
venv\Scripts\python -m pip install torch==2.13.0 torchvision==0.28.0 torchaudio==2.11.0 --index-url https://download.pytorch.org/whl/cu130
venv\Scripts\python -m pip install -r requirements.txt
cd ..\..
python scripts\download_models.py --entrenar      # 5B fp16, lo que se entrena

python scripts\preparar_dataset.py fuentes\ datasets\mi_lora --frames 49 --lado 480
# escribir los .txt (inglés, con la palabra disparadora al principio)
python scripts\entrenar_lora.py datasets\mi_lora --nombre mi_lora --pasos 1500
python scripts\comfy_video.py --prompt "mi_trigger, ..." --lora mi_lora.safetensors:1.0
```

## Wan2GP (alternativa low-VRAM, soporta Hunyuan 1.5 con 6GB)

```powershell
git clone https://github.com/deepbeepmeep/Wan2GP.git models\Wan2GP
# seguir su README (gradio). Pide los mismos pesos de aiav\models.
```

## Modelos y ranking

Ver `docs/modelos.md`: tabla open-weights 2026 + Elo Artificial Analysis +
qué corre y qué no en 12GB.
