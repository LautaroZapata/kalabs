# Modelos open-weights de video 2026 (relevado 2026-10-11/13)

> Elo de Artificial Analysis, leaderboard `AA-Video-T2V v2.0` (con audio)
> y `Open Weights`. Los Elo cambian semana a semana: verificar antes de decidir.

## Ranking open-weights (AA, con audio)

| # | Modelo | Elo | Nota |
|---|---|---|---|
| 1 | MiniMax H3 | 1220 | Pesa 92–144GB. Solo API para nosotros. |
| 2 | LTX-2.5 Fast / Pro | 1055 / 1053 | Video+audio nativo, 4K. Pide 16–32GB+. Solo API. |
| 3 | LTX-2.3 Fast / Pro | 975 / 958 | Idem generación anterior. Solo API. |
| 4 | LTX-2 Fast / Pro | 924 / 905 | Idem. Solo API. |

General (propietarios incluidos): Wan 3.0 1157, Seedance 2.5 1143, MiniMax H3 1138.

## Qué corre en RTX 3060 12GB (esta máquina)

| Modelo (HF) | VRAM real | Formato | Licencia |
|---|---|---|---|
| Wan2.2-TI2V-5B GGUF Q8_0 (ComfyUI, offload) | 6–8GB | T2V+I2V 480p–720p | Apache 2.0 |
| Wan2.2-I2V-A14B GGUF Q4_K_M + lightx2v 4 pasos (ComfyUI) | ~10GB con offload | I2V 720p, 16 fps | Apache 2.0 |
| Z-Image Turbo int8 (imagen, primer cuadro del I2V) | ~8GB | T2I hasta 1280×704 en 8 pasos | Apache 2.0 |
| SeedVR2 3B int8 (ampliador de video) | chunks automáticos | 720p → 1080p | Apache 2.0 |
| Wan2.1-T2V-1.3B (diffusers) | 8–12GB en 480p | T2V drafts | Apache 2.0 |
| LTX-Video 0.9.8 13B-distilled / 2B-distilled FP8 | 8GB | I2V rapidísimo, 8 steps | LTX Community (<10M ARR gratis) |
| HunyuanVideo-1.5 Q4 GGUF (Wan2GP) | 6–8GB | T2V+I2V 480p | Tencent Community (excluye EU/UK/KR) |
| Mochi-1 / CogVideoX-5B GGUF | 12–16GB | Alternativas | Apache 2.0 |

## Qué NO corre en 12GB

- Wan2.2-A14B MoE en FP8/BF16 (80GB oficial, 40GB FP8). En GGUF Q4_K_M sí
  corre (ver arriba), con offload y ~20 min por clip de 5 s.
- LTX-2.x full (16GB NVFP4 solo Blackwell, 32GB FP8, 80GB BF16)
- MiniMax H3 (92–144GB)
- Wan 3.0 full (ver repo: solo 1.3B viable local)

## Tiempos medidos acá

| Fecha | Modelo | Salida | Pasos | Tiempo | VRAM |
|---|---|---|---|---|---|
| 2026-10-12 | Wan2.2-TI2V-5B GGUF Q8 (ComfyUI, `comfy_t2v.py`) | 832×480, 49 frames (2 s a 24 fps) | 20, uni_pc, cfg 5 | 144 s total (sampler 1:41, ~5 s/paso), en frío | 5,2GB el modelo, entra entero |
| 2026-10-12 | Wan2.2-TI2V-5B GGUF Q8 (ComfyUI, `comfy_t2v.py`) | 1280×704, 121 frames (5 s a 24 fps) | 20, uni_pc, cfg 5 | 17:28 total (sampler 15:01, ~45 s/paso) | ~11GB pico, GPU al 100 % |
| 2026-10-12 | Real-ESRGAN x4plus ncnn (`upscale_video.py`) | 720p → 1920×1080, 121 frames | — | 10:04 (~3 s/frame + mezcla y encode) | Vulkan, con ComfyUI descargado (`/free`) |
| 2026-10-13 | Wan2.2-5B Q8 T2V + SageAttention | 1280×704, 121 frames | 30, uni_pc, cfg 5, shift 5 | 20:07 total (sampler 17:40, 35,3 s/paso) | ~10,5GB, GPU al 100 % |
| 2026-10-13 | Wan2.2-5B Q8 I2V + Sage | 1280×704, 121 frames | 30, igual | 21:47 total (sampler 18:53, 37,8 s/paso) | ~10,5GB |
| 2026-10-13 | Wan2.2-5B Q8 I2V + LoRA FastWan + Sage (`--rapido`) | 1280×704, 121 frames | 3, cfg 1, shift 3 | 3:06 total (18,6 s/paso) | — |
| 2026-10-13 | Wan2.2-I2V-A14B Q4_K_M + lightx2v + Sage (`--modelo a14b`) | 1280×720, 81 frames (5 s a 16 fps) | 4 (2+2), euler, cfg 1 | 20:36 total (~230 s/paso, cambio de experto incluido) | entra con offload; RAM del proceso ~12GB |
| 2026-10-13 | Z-Image Turbo int8 (`comfy_t2i.py`) | 1280×704 | 8, res_multistep, cfg 1 | 33 s en frío, 27 s la siguiente | — |
| 2026-10-13 | SeedVR2 3B int8 (`comfy_upscale.py`) | 1280×704 → 1920×1056, 121 frames | 1 | 22:43 | chunks automáticos |
| 2026-10-13 | Héroe "campo": Z-Image (4 variantes) → A14B I2V + RIFE 2 → Real-ESRGAN → `heroe_web.py` | 1280×720, 81 frames a 16 fps → 161 a 32 fps → 1920×1080, loop de 4 s | 8 / 4 | imágenes 2:10; video 17:12; escalado + loop ~13:30; web 3,9 MB | — |
| 2026-10-13 | Héroe "campo contraluz" con look Kalabs: A14B + RIFE 2 → `upscale_video.py` 2K (mezcla 0,4) → `revelado.py --fundido 1` → `heroe_web.py --fundido 0` | 1280×720 → 2560×1440, loop de 4 s a 32 fps | 4 | video ~20 min (con RAM al límite); escalado 2K 28:57 (~11 s/cuadro, 4× más que a 1080p); revelado 8:28 (~3 s/cuadro); web 13,4 MB | — |

SageAttention 2.2 sola (atención de 24×128 cabezas sobre ~27k tokens, la forma
del 5B en 720p): 596 ms con SDPA contra 238 ms con Sage, 2,5× más rápida, con
coseno 0,99994 contra la salida de referencia. En el paso completo del 5B
rinde 1,3× (45 → 35 s/paso), porque el resto del modelo no se acelera.

### Qué sale mejor (faro, mismo prompt, 2026-10-13)

Las comparaciones (hojas hechas con `comparar.py`) se borraron el 2026-10-13 al limpiar pruebas; quedan las conclusiones.

- **5B T2V con los valores oficiales** (shift 5, 30 pasos, prompt en inglés,
  negativo oficial en chino) contra el de ayer (shift 8, 20 pasos, prompt en
  español): aparece el movimiento de cámara pedido y la luz es coherente.
  Las rocas siguen saliendo "pintadas": es el techo del 5B en T2V.
- **I2V desde Z-Image** le gana al T2V en textura y luz: el primer cuadro trae
  el detalle que el 5B no inventa solo. Defectos del 5B: a mitad del clip mete
  un poste blanco en el borde y un destello naranja que no estaba.
- **A14B Q4 + lightx2v** con el mismo cuadro y en el mismo tiempo (~20 min)
  sale limpio: sin objetos inventados, olas y gaviotas con física creíble.
  **Es el camino para piezas finales.** Detalle: va a 16 fps; si hace falta
  más fluidez, `--rife 2` lo lleva a 32.
- **FastWan** (3 pasos, 3 min): satura el color y empasta la espuma. Sirve
  para probar encuadre y movimiento antes de gastar 20 minutos, no para entregar.
- **SeedVR2 contra Real-ESRGAN**: SeedVR2 da bordes más limpios y no parpadea
  entre cuadros. En cambio sobreafila las rocas (textura de grietas) y tarda
  más del doble. Real-ESRGAN con la mezcla 80/20 sigue siendo el default;
  SeedVR2 queda para tomas con mucho detalle fino (caras, texto, telas).

## Fine-tune (LoRA del 5B) medido acá

ai-toolkit (ostris), `scripts/entrenar_lora.py`. musubi-tuner se descartó:
sólo entrena los A14B, no el TI2V-5B.

| Fecha | Dataset | Ajustes | Tiempo | VRAM |
|---|---|---|---|---|
| 2026-10-13 | 6 clips de 49 cuadros a 1120×480 (prueba de humo con los planos de `outputs/ufc`) | rango 32, lr 1e-4, adamw8bit, transformer y T5 en qfloat8, low_vram, 100 pasos | 14:16 de entrenamiento (8,2–8,6 s/paso) + ~7 min de carga, cuantización y caché | 8,3GB |

Cuentas para una LoRA de verdad, a 8,5 s/paso: 1000 pasos ≈ 2,4 h, 1500 ≈ 3,5 h,
2000 ≈ 4,7 h. Con clips más largos o más resolución sube.

Resultado de la prueba: ComfyUI carga la LoRA sobre el GGUF Q8 sin claves
perdidas, y con 100 pasos ya mueve el resultado hacia el dataset (reja
negra y arena oscura en vez del fondo azul que sale sin LoRA, mismo seed).
La LoRA, el dataset y la comparación se borraron el 2026-10-13. Una LoRA del 5B no sirve en
el A14B: son arquitecturas distintas.

### Héroes para web (2026-10-13)

- Movimiento calmo con cámara fija (pasto, nubes, mariposas) es lo que mejor sale; acción con personas (pelea) es el peor caso.
- Loop: `heroe_web.py` funde el último segundo sobre el primero. Medido en el master, el salto del loop cae dentro del rango normal entre cuadros. Lo que se nota es la compresión: con `tune film` x264 borra el grano en los P-frames y lo deja en el keyframe, y al repetir "salta". Con `tune grain` + crf 26 queda ~17 % sobre el máximo de los vecinos, a 3,9 MB por 4 s en 1080p.
- Para web conviene escalar con `--grano 0`: la compresión se come el grano igual, y sin él el loop y el peso salen más limpios.

1080p nativo con el 5B no se probó: es ~2,3× los tokens de 720p y el modelo
no está entrenado ahí. Ruta: 720p nativo + `upscale_video.py`.

(Pendiente de medir: LTX-distilled 480p; Wan1.3B por diffusers.)
