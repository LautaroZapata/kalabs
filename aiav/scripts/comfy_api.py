"""Lo común para hablar con ComfyUI por su API: levantarlo, encolar y traer la salida.

ComfyUI se levanta con SageAttention (2,5× la atención en la 3060, coseno 0,99994
contra SDPA, medido 2026-10-13). Si ya estaba corriendo, se usa tal cual: para
prender o apagar Sage hay que cerrarlo primero.
"""
import json
import shutil
import subprocess
import sys
import time
import urllib.request
from pathlib import Path

LAB = Path(__file__).resolve().parents[1]
COMFY = LAB / "models" / "ComfyUI"
WORKFLOWS = LAB / "workflows"
URL = "http://127.0.0.1:8188"


def api(path, data=None):
    body = json.dumps(data).encode() if data is not None else None
    req = urllib.request.Request(URL + path, data=body, headers={"Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read())


def comfy_arriba():
    try:
        api("/system_stats")
        return True
    except OSError:
        return False


def asegurar_comfy(sage=True):
    if comfy_arriba():
        return
    print("levantando ComfyUI…", flush=True)
    args = [sys.executable, "main.py", "--listen", "127.0.0.1", "--port", "8188", "--reserve-vram", "2"]
    if sage:
        args.append("--use-sage-attention")
    log = open(LAB / "outputs" / "comfy.log", "ab")
    subprocess.Popen(args, cwd=COMFY, stdout=log, stderr=subprocess.STDOUT)
    for _ in range(180):
        if comfy_arriba():
            return
        time.sleep(1)
    sys.exit("ComfyUI no levantó en 3 min: ver outputs/comfy.log")


def workflow(nombre):
    return json.loads((WORKFLOWS / nombre).read_text(encoding="utf-8"))


def a_input(src):
    """Copia un archivo a ComfyUI/input y devuelve el nombre que esperan LoadImage y LoadVideo."""
    src = Path(src).resolve()
    dest = COMFY / "input" / "aiav" / src.name
    dest.parent.mkdir(parents=True, exist_ok=True)
    if src != dest:
        shutil.copy2(src, dest)
    return f"aiav/{src.name}"


def correr(wf, out, ext):
    """Encola wf, espera y copia a out (relativo a aiav/) la primera salida con extensión ext."""
    asegurar_comfy()
    t0 = time.monotonic()
    prompt_id = api("/prompt", {"prompt": wf})["prompt_id"]
    print(f"encolado {prompt_id}", flush=True)

    while True:
        time.sleep(3)
        hist = api(f"/history/{prompt_id}").get(prompt_id)
        if not hist:
            continue
        status = hist.get("status", {})
        if status.get("status_str") == "error":
            sys.exit("ComfyUI falló:\n" + json.dumps(status.get("messages", []), indent=2, ensure_ascii=False))
        if status.get("completed"):
            break

    for node in hist["outputs"].values():
        for item in node.get("images", []) + node.get("videos", []):
            # LoadVideo/LoadImage también aparecen acá, como previews de tipo "input".
            if item.get("type") != "output":
                continue
            src = COMFY / "output" / item.get("subfolder", "") / item["filename"]
            if src.suffix == ext:
                dest = LAB / out
                dest.parent.mkdir(parents=True, exist_ok=True)
                shutil.copy2(src, dest)
                print(f"ok: {dest} ({time.monotonic() - t0:.0f} s)")
                return dest
    sys.exit(f"terminó pero no encontré el {ext}: " + json.dumps(hist["outputs"]))
