"""Verifica el entorno del lab: torch, CUDA, GPU y espacio en C:."""
import shutil
import sys

print(f"python: {sys.version.split()[0]}")

try:
    import torch
except ImportError:
    print("torch: NO INSTALADO (ver README: instalar con índice cu126)")
    sys.exit(1)

print(f"torch: {torch.__version__} (cuda build: {torch.version.cuda})")
print(f"cuda disponible: {torch.cuda.is_available()}")
if torch.cuda.is_available():
    for i in range(torch.cuda.device_count()):
        p = torch.cuda.get_device_properties(i)
        libre, total = torch.cuda.mem_get_info(i)
        print(f"gpu{i}: {p.name} | total {total/1024**3:.1f}GB | libre {libre/1024**3:.1f}GB | cc {p.major}.{p.minor}")

for mod in ["diffusers", "transformers", "accelerate", "huggingface_hub", "cv2", "imageio"]:
    try:
        __import__(mod)
        print(f"{mod}: ok")
    except ImportError:
        print(f"{mod}: FALTA (pip install -r requirements.txt)")

disk = shutil.disk_usage("C:/")
print(f"C: libre {disk.free/1024**3:.0f}GB de {disk.total/1024**3:.0f}GB")
