# AIAV — lab interno de video/imagen con IA (Kalabs)

Lab interno, **no es un prospecto de cliente**. Por eso el ritual de identidad
visual de `kalabs/CLAUDE.md` no aplica acá: no hay landing, no hay público,
no hay eje estético que elegir. Cuando un experimento de acá se convierta en
pieza para un prospecto, ese prospecto sí pasa por el ritual completo.

Objetivo: generar video e imagen en local con modelos de pesos abiertos,
probar ideas, skills y adaptaciones (LoRA) para nuevos productos de Kalabs.

## Look: SIEMPRE

**Antes de generar cualquier imagen o video, leer `docs/look.md`.** Todo video
del lab sale revelado con `scripts/revelado.py`: bloom moderado, efecto sueño
(difusión), halación y grano visible, curva de film y color vivo con vibrance
(el usuario lo quiere intenso, no apagado). Las referencias (Gastón Luna, Leiti, Okos, Patrick Mainstone, Jep) y la
investigación de colorimetría están ahí. La luz realista se pide en el prompt
de la imagen (fuente, hora, dirección, profundidad de campo): el revelado no la
inventa. Nada de "crisp", "ultra detailed", "vivid" ni "8k".

Salida por defecto: 2K (2560×1440). Escalado con `--mezcla 0.4 --grano 0` y
el grano lo pone el revelado.

## Hardware objetivo

Medido 2026-10-11 en esta máquina:

- GPU RTX 3060 12GB (compute 8.6, driver 610.74)
- CPU Ryzen 7 5800X 8c/16t
- RAM 36GB DDR4
- Modelos en `aiav/models` (NVMe en C:). Hasta el 2026-10-12 estaban en
  `E:/aiav-models`, pero E: es un SSD por USB y frenaba todo; se movieron.
  Ojo con el espacio: C: tiene ~125 GB libres después de la mudanza.

Regla: clips 480p–720p, 3–5 s, GGUF/FP8 + offload a CPU. Nada de 14B BF16,
LTX-2.x full ni MiniMax H3 en local (ver `docs/modelos.md`).

Camino de calidad (medido 2026-10-13, ver `docs/modelos.md`): primer cuadro
con Z-Image → borrador con `--rapido` (5B FastWan, 3 min) → final con
`--modelo a14b` (~20 min por 5 s, el más limpio) → Real-ESRGAN o SeedVR2.
Prompts en inglés; el negativo por defecto es el oficial de Wan, en chino.
Las LoRA propias se entrenan sobre el 5B (~8,5 s/paso en 480p): no sirven en el A14B.

## Estructura

- `scripts/check_env.py` — verifica torch + CUDA + VRAM.
- `scripts/comfy_api.py` — lo común de la API de ComfyUI. Lo levanta solo si no
  está corriendo, siempre con `--use-sage-attention`.
- `scripts/comfy_video.py` — video con Wan2.2 (`workflows/wan22_*_api.json`).
  5B T2V o I2V (`--image`), A14B I2V (`--modelo a14b`), LoRA (`--lora`),
  borrador FastWan de 3 pasos (`--rapido`) e interpolación RIFE (`--rife 2`).
- `scripts/comfy_t2i.py` — imagen con Z-Image Turbo, para el primer cuadro del I2V.
- `scripts/heroe_web.py` — clip → héroe: loop sin salto (fundido), MP4 liviano
  (crf 26, tune grain, faststart) y póster `.jpg`.
- `scripts/comfy_upscale.py` — ampliación de video con SeedVR2 3B (coherencia
  temporal). `upscale_video.py` (Real-ESRGAN cuadro a cuadro) queda de respaldo.
- `scripts/voicestudio_api.py` — levanta el backend de VoiceStudio (voz) en
  `127.0.0.1:3900`, con analítica apagada y MOSS-TTS-Nano bloqueado.
- `scripts/comparar.py` — hoja de contacto: varios videos, mismos instantes, con zoom opcional.
- `scripts/preparar_dataset.py` + `scripts/entrenar_lora.py` — fine-tune LoRA
  del 5B con ai-toolkit (`models/ai-toolkit`, venv propio). Datasets en
  `aiav/datasets/` (ignorado por git).
- `scripts/smoke_t2v.py` — prueba mínima por diffusers (Wan2.1 1.3B, 480p, 2 s).
  Ojo: el repo de diffusers trae el text encoder en fp32 y pesa 29GB.
- `scripts/download_models.py` — baja pesos a `aiav/models/ComfyUI/models` por
  packs (`--extras`, `--zimage`, `--a14b`, `--seedvr`, `--entrenar`).
- `workflows/` — workflows de ComfyUI en formato API que sí funcionaron acá.
- `outputs/` — salidas locales (ignorado por git).
- `docs/modelos.md` — tabla de modelos open-weights, Elo de Artificial Analysis y VRAM real.

## Uso

Python del lab vive en `aiav/.venv` (3.12). Siempre activarlo primero:

```powershell
.\.venv\Scripts\Activate.ps1
python scripts\check_env.py
python scripts\smoke_t2v.py --prompt "un faro al atardecer, olas" --out outputs\smoke.mp4
```

ComfyUI y Wan2GP viven en `aiav/models`, ignorados por git (son pesados y
con historial propio):

- `aiav/models/ComfyUI` (git, usa el `.venv` del lab; nodo ComfyUI-GGUF)
- `aiav/models/Wan2GP`
- `aiav/models/ai-toolkit` (git, venv propio en `venv/` con torch 2.13 cu130:
  no comparte el `.venv` porque fija versiones que romperían ComfyUI). Lee los
  pesos de `ComfyUI/models` vía `MODELS_PATH`, sin copias.
- Los pesos de ComfyUI viven una sola vez en `aiav/models/ComfyUI/models`
  (`download_models.py` baja directo ahí). Nada de copias en otras carpetas.
- `aiav/models/VoiceStudio` (git, `.venv` propio con torch 2.8 cu128, armado
  con `uv sync --locked`) — voz: TTS, clonación, diseño de voz, transcripción,
  doblaje. Sólo el backend FastAPI, sin Electron ni Bun. Lo levanta
  `scripts/voicestudio_api.py` en `127.0.0.1:3900`; datos y caché de modelos
  en `aiav/models/voicestudio-data`. Ver "VoiceStudio" abajo.
- `aiav/models/hf-cache` — cache de Hugging Face que crea `smoke_t2v.py`. Se
  vació el 2026-10-12; correrlo de nuevo baja los 29GB de diffusers.

ComfyUI lo levantan los scripts solos (ver README). Los pesos nunca se
commitean: `aiav/models/` está en `.gitignore`.

## Convenciones

- Gestor JS del repo madre sigue siendo pnpm; este subproyecto Python usa
  venv + pip por excepción (documentada acá, no global).
- Nada de números inventados: tiempos y VRAM se miden en esta máquina y se
  anotan en `docs/modelos.md` con fecha.
- Licencias: Wan (Apache 2.0, comercial OK). HunyuanVideo y LTX-Community
  tienen restricciones: revisar antes de vender algo hecho con ellos.

## VoiceStudio

`github.com/debpalash/VoiceStudio`, AGPL-3.0. Instalado el 2026-10-13 en el
commit `36862c1`, versión 0.5.7. Revisado antes de instalar: la analítica
(PostHog) es opt-in y viene apagada, el backend escucha sólo en loopback, no
hay `postinstall` ni `shell=True`, y los binarios de `bin/` vienen vacíos.

Reglas del lab:

- **Siempre por `scripts/voicestudio_api.py`.** Fija analítica apagada, bind a
  `127.0.0.1` y datos dentro de `aiav/models`. El backend **no tiene
  autenticación**: nunca prender "network share" ni cambiar
  `OMNIVOICE_BIND_HOST`.
- **MOSS-TTS-Nano bloqueado**: carga código de Hugging Face con
  `trust_remote_code` sin versión fija. Su paquete no viene en el lock y el
  lanzador corta si se pide. MOSS v1.5 sí fija el commit.
- **Nada de `curl … | sh` ni `irm … | iex`** para actualizar: `git pull` +
  `uv sync --locked` + `uv run --no-sync python scripts/setup.py`.
- **Modelos: preguntar antes de bajar**, con tamaño y licencia (`GET /models`
  trae `license_info`).
- **Licencias de modelos.** El motor por defecto, `k2-fsa/OmniVoice` (y su
  GGUF), es **CC-BY-NC: no sirve para trabajo de clientes**. NLLB y
  OuteTTS también son no comerciales. Para piezas que se venden, motores
  Apache/MIT: VoxCPM2 (5 GB, 30 idiomas, clonación y diseño), CosyVoice3
  (9,8 GB), KittenTTS (sólo inglés), Whisper de Systran para transcribir.
  VoiceStudio marca todo como "sin revisar"; la licencia del modelo se lee en
  su ficha antes de vender.
- **Clonar una voz sólo con permiso escrito** de su dueño.
- Trae su propio `.claude/` (agentes y skills del repo): no abrir Claude Code
  dentro de esa carpeta.
