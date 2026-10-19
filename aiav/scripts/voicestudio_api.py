"""Levanta el backend de VoiceStudio (voz: TTS, clonación, transcripción) sólo en loopback.

Sólo el backend FastAPI, sin Electron ni Bun. La API queda en 127.0.0.1:3900
(`/openapi.json` la describe entera). Siempre arranca con:

- analítica apagada por variable (OMNIVOICE_ANALYTICS_DISABLED=1), además del
  opt-in que ya viene en falso;
- bind fijo a 127.0.0.1: el backend no tiene autenticación;
- datos y caché de modelos en models/voicestudio-data, no en el perfil de usuario.

MOSS-TTS-Nano queda bloqueado: baja y ejecuta código de Hugging Face sin
versión fija (trust_remote_code). Si ya estaba corriendo, se usa tal cual.

    python scripts\\voicestudio_api.py          # levanta y muestra /health
"""
import json
import os
import subprocess
import sys
import time
import urllib.request
from pathlib import Path

LAB = Path(__file__).resolve().parents[1]
VS = LAB / "models" / "VoiceStudio"
DATOS = LAB / "models" / "voicestudio-data"
URL = "http://127.0.0.1:3900"


def api(path, data=None, timeout=30):
    body = json.dumps(data).encode() if data is not None else None
    req = urllib.request.Request(URL + path, data=body, headers={"Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return json.loads(r.read())


def vs_arriba():
    try:
        api("/health", timeout=3)
        return True
    except OSError:
        return False


def entorno():
    env = dict(os.environ)
    if env.get("OMNIVOICE_TTS_BACKEND") == "moss-tts-nano":
        sys.exit("moss-tts-nano está bloqueado en el lab: ejecuta código remoto sin versión fija")
    env.update(
        OMNIVOICE_ANALYTICS_DISABLED="1",
        OMNIVOICE_BIND_HOST="127.0.0.1",
        OMNIVOICE_DATA_DIR=str(DATOS / "data"),
        OMNIVOICE_CACHE_DIR=str(DATOS / "cache"),
    )
    return env


def asegurar_vs():
    if vs_arriba():
        return
    print("levantando VoiceStudio…", flush=True)
    (DATOS / "data").mkdir(parents=True, exist_ok=True)
    (DATOS / "cache").mkdir(parents=True, exist_ok=True)
    python = VS / ".venv" / "Scripts" / "python.exe"
    args = [str(python), "-m", "uvicorn", "main:app", "--app-dir", "backend",
            "--host", "127.0.0.1", "--port", "3900"]
    log = open(DATOS / "backend.log", "ab")
    subprocess.Popen(args, cwd=VS, env=entorno(), stdout=log, stderr=subprocess.STDOUT)
    for _ in range(180):
        if vs_arriba():
            return
        time.sleep(1)
    sys.exit("VoiceStudio no levantó en 3 min: ver models/voicestudio-data/backend.log")


if __name__ == "__main__":
    asegurar_vs()
    print(json.dumps(api("/health"), ensure_ascii=False))
    print(json.dumps(api("/api/settings/analytics"), ensure_ascii=False))
