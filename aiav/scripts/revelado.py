"""Revelado "look Kalabs": la pasada de color que llevan TODOS los videos del lab.

Emula una cadena de film en vez de "corregir": curva con toe y shoulder (los
negros no llegan a cero y las altas se apagan sin recortar), color vivo pero de
film (vibrance, verdes apenas hacia oliva, altas que se desaturan hacia blanco),
difusión tipo Pro-Mist + bloom suave + halación roja alrededor de las altas, y
grano de film al final, más fuerte en medios y sombras que en altas.

Orden (igual que en un emulador de film): suavidad → curva → color → difusión,
bloom y halación (en luz lineal) → viñeta → grano. El loop, si se pide, se arma
ANTES de revelar, para que el grano quede parejo también en el empalme.

Referencias de look y fuentes: docs/look.md.

Uso:
  python scripts/revelado.py outputs/heroe/campo_1440p.mp4 outputs/heroe/campo_revelado.mp4 --fundido 0.3
  python scripts/revelado.py entrada.png salida.png          # un cuadro, para probar ajustes
"""
import argparse
from pathlib import Path

import av
import cv2
import numpy as np

LUMA = np.array([0.2126, 0.7152, 0.0722], np.float32)


def a_lineal(x):
    return np.where(x <= 0.04045, x / 12.92, ((x + 0.055) / 1.055) ** 2.4).astype(np.float32)


def a_pantalla(x):
    x = np.clip(x, 0, None)
    return np.where(x <= 0.0031308, x * 12.92, 1.055 * x ** (1 / 2.4) - 0.055).astype(np.float32)


def blur(x, sigma):
    return cv2.GaussianBlur(x, (0, 0), sigma) if sigma > 0 else x


def blur_ancho(x, sigma):
    """Blur grande calculado a 1/4 de resolución: mismo resultado visual, 16× menos trabajo."""
    h, w = x.shape[:2]
    chico = cv2.resize(x, (w // 4, h // 4), interpolation=cv2.INTER_AREA)
    chico = cv2.GaussianBlur(chico, (0, 0), sigma / 4)
    return cv2.resize(chico, (w, h), interpolation=cv2.INTER_LINEAR)


def suave(t):
    t = np.clip(t, 0, 1)
    return t * t * (3 - 2 * t)


def ventana(h, centro, ancho):
    d = np.abs((h - centro + 180) % 360 - 180)
    return suave(1 - d / ancho)


def curva(L, a):
    """Curva de positivo sobre luma de pantalla: contraste en medios, toe y shoulder suaves."""
    x = 0.5 + (L - 0.5) * (1 + a.contraste)
    s0 = 1 - a.hombro
    alto = s0 + a.hombro * (1 - np.exp(-np.clip(x - s0, 0, None) / a.hombro))
    x = np.where(x > s0, alto, x)
    t0 = a.pie
    bajo = t0 * np.exp(np.clip(x - t0, None, 0) / t0)
    x = np.where(x < t0, bajo, x)
    return a.negro + (a.blanco - a.negro) * np.clip(x, 0, 1)


class Grano:
    def __init__(self, h, w, escala, seed=0):
        self.h, self.w, self.escala = h, w, escala
        self.rng = np.random.default_rng(seed)

    def __call__(self, tam):
        gh, gw = max(1, round(self.h / (tam * self.escala))), max(1, round(self.w / (tam * self.escala)))
        n = self.rng.standard_normal((gh, gw, 4)).astype(np.float32)
        n = cv2.resize(n, (self.w, self.h), interpolation=cv2.INTER_CUBIC)
        n /= n.reshape(-1, 4).std(0) + 1e-6
        return n[..., 0], n[..., 1:]


def revelar(rgb8, a, grano, vin):
    h, w = rgb8.shape[:2]
    k = h / 1440  # los radios están pensados para 1440p
    x = rgb8.astype(np.float32) / 255

    # 1. Suavidad: saca el microdetalle "IA" y baja la claridad local.
    x = blur(x, a.suavidad * k)
    # Las sombras del video traen ruido de color (casi siempre azul): se limpian
    # sólo ahí, con un desenfoque que pesa según lo oscuro del píxel.
    if a.limpiar_sombras:
        Ls = x @ LUMA
        peso = (1 - suave((Ls - 0.06) / 0.3))[..., None] * a.limpiar_sombras
        x = x * (1 - peso) + blur(x, 3.2 * k) * peso
    if a.claridad:
        x = x + a.claridad * (x - blur(x, 14 * k))

    # 2. Curva sobre la luma, aplicada como ganancia en lineal para no torcer el tono.
    lin = a_lineal(np.clip(x, 0, 1)) * 2 ** a.exposicion
    Y = lin @ LUMA
    L = a_pantalla(Y)
    L2 = curva(L, a)
    Y2 = a_lineal(L2)
    lin = lin * (Y2 / np.maximum(Y, 1e-5))[..., None]
    # Camino a blanco: las altas pierden saturación como en el film, y nada se sale de gama.
    lin = lin + (Y2[..., None] - lin) * (a.altas_desat * suave((L2 - 0.62) / 0.33))[..., None]
    lin = lin + (Y2[..., None] - lin) * (a.sombras_desat * suave((0.28 - L2) / 0.24))[..., None]
    pico = lin.max(-1, keepdims=True)
    lin = np.where(pico > 1, Y2[..., None] + (lin - Y2[..., None]) * ((1 - Y2[..., None]) / np.maximum(pico - Y2[..., None], 1e-5)), lin)

    # 3. Color en pantalla: verdes a oliva, cielo a cian, saturación contenida, split toning.
    p = a_pantalla(np.clip(lin, 0, 1))
    hsv = cv2.cvtColor(p, cv2.COLOR_RGB2HSV)
    H, S, V = hsv[..., 0], hsv[..., 1], hsv[..., 2]
    verde = ventana(H, 118, 40)
    azul = ventana(H, 215, 40)
    H = (H - a.verde_tono * verde - a.azul_tono * azul) % 360
    # Saturación y vibrance sólo donde hay luz: en las sombras el "color" es
    # casi todo ruido, y avivarlo lo vuelve azul y visible.
    luz = suave((V - 0.1) / 0.3)
    S = S * (1 + (a.saturacion - 1) * luz) * (1 - a.verde_desat * verde) * (1 - a.azul_desat * azul)
    # Vibrance: levanta más lo apagado que lo ya saturado, así el color se aviva sin ponerse chillón.
    S = S * (1 + a.vibrancia * luz * (1 - np.clip(S, 0, 1)))
    p = cv2.cvtColor(np.dstack([H, np.clip(S, 0, 1), V]).astype(np.float32), cv2.COLOR_HSV2RGB)
    Lp = p @ LUMA
    sombra = ((1 - Lp) ** 2)[..., None]
    alta = (Lp ** 2)[..., None]
    # Sólo las altas se entibian. Las sombras quedan neutras: cualquier azul
    # ahí se suma al ruido y la imagen se ve "lavada" en lo oscuro.
    p = p + a.split * alta * np.array([0.55, 0.15, -0.5], np.float32)

    # 4. Difusión, bloom y halación en lineal: la luz se suma, no se pinta.
    lin = a_lineal(np.clip(p, 0, 1))
    Y = lin @ LUMA
    if a.niebla:
        lin = lin * (1 - a.niebla) + blur_ancho(lin, 30 * k) * a.niebla
    if a.bloom:
        brillo = suave((Y - a.umbral) / (1 - a.umbral))[..., None]
        fuente = lin * brillo
        b = 0.5 * blur_ancho(fuente, 12 * k) + 0.3 * blur_ancho(fuente, 40 * k) + 0.2 * blur_ancho(fuente, 110 * k)
        lin = lin + a.bloom * b * np.array([1.0, 0.96, 0.88], np.float32)
    if a.halacion:
        mascara = suave((Y - 0.55) / 0.4)
        halo = blur(mascara, 5 * k) - 0.6 * mascara
        lin = lin + a.halacion * np.clip(halo, 0, None)[..., None] * np.array([1.0, 0.3, 0.08], np.float32)
    lin = lin * vin

    # 5. Grano de film al final, en pantalla: más en medios y sombras, poco en altas.
    p = a_pantalla(lin)
    if a.grano:
        Lp = np.clip(p @ LUMA, 0, 1)
        # Como en el film: el grano vive en los medios. En los negros casi no
        # se ve (si no, lo oscuro parece ruido de sensor) y ahí es monocromo.
        oscuro = suave((Lp - 0.03) / 0.3)
        amp = a.grano * (0.12 + 0.88 * oscuro) * (0.5 + 0.5 * 4 * Lp * (1 - Lp)) * (1 - 0.4 * Lp)
        n, nc = grano(a.grano_tam)
        p = p + amp[..., None] * (n[..., None] + a.grano_color * oscuro[..., None] * nc)
    return (np.clip(p, 0, 1) * 255 + 0.5).astype(np.uint8)


def fundir(a, b, t):
    """Mezcla a→b en t con flujo óptico: deforma los dos hacia el instante t antes de
    mezclar, así lo que se mueve (pasto, flores) se desplaza en vez de duplicarse.
    El flujo se calcula a 720p y se escala; sobra para movimiento de viento."""
    h, w = a.shape[:2]
    s = 720 / h
    gris = lambda f: cv2.cvtColor(cv2.resize(f, (round(w * s), 720), interpolation=cv2.INTER_AREA), cv2.COLOR_RGB2GRAY)
    dis = cv2.DISOpticalFlow_create(cv2.DISOPTICAL_FLOW_PRESET_MEDIUM)
    flujo = cv2.resize(dis.calc(gris(a), gris(b), None), (w, h), interpolation=cv2.INTER_LINEAR) / s
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    aw = cv2.remap(a, xx - t * flujo[..., 0], yy - t * flujo[..., 1], cv2.INTER_LINEAR, borderMode=cv2.BORDER_REFLECT)
    bw = cv2.remap(b, xx + (1 - t) * flujo[..., 0], yy + (1 - t) * flujo[..., 1], cv2.INTER_LINEAR, borderMode=cv2.BORDER_REFLECT)
    return (aw.astype(np.float32) * (1 - t) + bw.astype(np.float32) * t + 0.5).astype(np.uint8)


def vineta(h, w, fuerza):
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    r = np.hypot((xx - w / 2) / (w / 2), (yy - h / 2) / (h / 2)) / np.sqrt(2)
    return (1 - fuerza * r ** 2.5)[..., None].astype(np.float32)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("src")
    ap.add_argument("dst")
    ap.add_argument("--saltar", type=int, default=0, help="cuadros a descartar al principio (el arranque del loop nativo, donde el modelo despega de la imagen fija)")
    ap.add_argument("--temporal", type=float, default=0, help="suavizado en el tiempo (0–1): los destellos del agua fluyen en vez de prenderse y apagarse")
    ap.add_argument("--vaiven", type=float, default=0,
                    help="loop de ida y vuelta con la velocidad frenando a cero en cada punta (como un péndulo): sin empalme ni mezcla. "
                         "El valor es la velocidad máxima en cuadros por cuadro (1 = la original en el medio del recorrido)")
    ap.add_argument("--nativo", action="store_true", help="el clip ya vuelve a su primer cuadro (comfy_video --loop): funde el final sin buscar corte")
    ap.add_argument("--fundido", type=float, default=0, help="segundos de fundido del loop; con 0,3 alcanza (busca el mejor corte)")
    ap.add_argument("--crf", type=int, default=14)
    # Valores por defecto = look Kalabs (docs/look.md). Cambiarlos por toma, no el default.
    ap.add_argument("--exposicion", type=float, default=0.0, help="en pasos de diafragma")
    ap.add_argument("--contraste", type=float, default=0.08)
    ap.add_argument("--pie", type=float, default=0.2, help="ancho del toe: cuánto se suavizan las sombras")
    ap.add_argument("--hombro", type=float, default=0.22, help="ancho del shoulder: cuánto se apagan las altas")
    ap.add_argument("--negro", type=float, default=0.01, help="piso de negro en pantalla (0 = negro puro)")
    ap.add_argument("--blanco", type=float, default=0.965, help="techo de blanco en pantalla")
    ap.add_argument("--altas_desat", type=float, default=0.3)
    ap.add_argument("--sombras_desat", type=float, default=0.6)
    ap.add_argument("--limpiar_sombras", type=float, default=0.8, help="cuánto se limpia el ruido de las sombras (0–1)")
    ap.add_argument("--saturacion", type=float, default=1.05)
    ap.add_argument("--vibrancia", type=float, default=0.45, help="satura más lo apagado que lo ya intenso")
    ap.add_argument("--verde_tono", type=float, default=6, help="grados hacia amarillo/oliva")
    ap.add_argument("--verde_desat", type=float, default=0.06)
    ap.add_argument("--azul_tono", type=float, default=3, help="grados hacia cian")
    ap.add_argument("--azul_desat", type=float, default=0.0)
    ap.add_argument("--split", type=float, default=0.008, help="sombras a teal, altas cálidas")
    ap.add_argument("--suavidad", type=float, default=0.7, help="blur en px a 1440p contra el detalle IA")
    ap.add_argument("--claridad", type=float, default=-0.15, help="contraste local; negativo suaviza")
    ap.add_argument("--niebla", type=float, default=0.08, help="difusión tipo Pro-Mist, el efecto 'sueño'")
    ap.add_argument("--bloom", type=float, default=0.4)
    ap.add_argument("--umbral", type=float, default=0.4, help="luma lineal desde donde nace el bloom")
    ap.add_argument("--halacion", type=float, default=0.10)
    ap.add_argument("--vineta", type=float, default=0.12)
    ap.add_argument("--grano", type=float, default=0.028, help="desvío del grano en pantalla (0–1)")
    ap.add_argument("--grano_tam", type=float, default=1.6, help="tamaño del grano en px a 1440p")
    ap.add_argument("--grano_color", type=float, default=0.1)
    a = ap.parse_args()

    if Path(a.src).suffix.lower() in (".png", ".jpg", ".jpeg"):
        rgb = cv2.cvtColor(cv2.imread(a.src, cv2.IMREAD_COLOR), cv2.COLOR_BGR2RGB)
        h, w = rgb.shape[:2]
        out = revelar(rgb, a, Grano(h, w, h / 1440), vineta(h, w, a.vineta))
        cv2.imwrite(a.dst, cv2.cvtColor(out, cv2.COLOR_RGB2BGR))
        print(f"ok: {a.dst}")
        return

    with av.open(a.src) as c:
        s = c.streams.video[0]
        fps = s.average_rate
        cuadros = [f.to_ndarray(format="rgb24") for f in c.decode(s)]
    if a.saltar:
        cuadros = cuadros[a.saltar:]
    if a.temporal:
        # Filtro de 3 cuadros, circular: el loop también se suaviza en la unión.
        t = a.temporal * 0.5
        f32 = [c.astype(np.float32) for c in cuadros]
        n = len(f32)
        cuadros = [(f32[i] * (1 - 2 * t) + (f32[i - 1] + f32[(i + 1) % n]) * t + 0.5).astype(np.uint8) for i in range(n)]
        del f32
    if a.vaiven:
        # Posición en el clip: (1 - cos 2πu) / 2 recorre ida y vuelta y frena en
        # las puntas; los cuadros intermedios se mezclan con su vecino, que a
        # estas velocidades es casi idéntico.
        largo = len(cuadros)
        n = int(np.ceil(np.pi * (largo - 1) / a.vaiven))
        orig, cuadros = cuadros, []
        for i in range(n):
            pos = (1 - np.cos(2 * np.pi * i / n)) / 2 * (largo - 1)
            j = int(pos)
            t = pos - j
            f = orig[j] if t < 1e-3 or j + 1 >= largo else (orig[j] * (1 - t) + orig[j + 1] * t + 0.5).astype(np.uint8)
            cuadros.append(f)
        del orig
        print(f"vaiven: {largo} cuadros -> {n} ({n / float(fps):.1f} s)", flush=True)
    k = round(float(fps) * a.fundido)
    if k:
        if 2 * k >= len(cuadros):
            raise SystemExit(f"fundido de {k} cuadros es demasiado para {len(cuadros)}")
        # Corte del loop: el cuadro del último 40 % que más se parece al primero. Así el
        # fundido puede ser corto: uno largo mezcla dos instantes distintos y se ve
        # como doble exposición (blur) al arrancar el video.
        chico = lambda f: cv2.resize(cv2.cvtColor(f, cv2.COLOR_RGB2GRAY), (160, 90), interpolation=cv2.INTER_AREA).astype(np.float32)
        ref = chico(cuadros[0])
        candidatos = range(int(len(cuadros) * 0.6), len(cuadros) - k + 1)
        j = len(cuadros) - k if a.nativo else min(candidatos, key=lambda i: np.abs(chico(cuadros[i]) - ref).mean())
        print(f"corte del loop en el cuadro {j} de {len(cuadros)}", flush=True)
        cola, cuadros = cuadros[j:j + k], cuadros[:j]
        for j in range(k):
            cuadros[j] = fundir(cola[j], cuadros[j], (j + 1) / (k + 1))

    h, w = cuadros[0].shape[:2]
    grano, vin = Grano(h, w, h / 1440), vineta(h, w, a.vineta)
    with av.open(a.dst, "w") as out:
        vs = out.add_stream("libx264", rate=fps)
        vs.width, vs.height, vs.pix_fmt = w, h, "yuv420p"
        vs.options = {"crf": str(a.crf), "preset": "medium", "tune": "grain", "g": "24", "keyint_min": "24", "sc_threshold": "0"}
        for i, f in enumerate(cuadros):
            for p in vs.encode(av.VideoFrame.from_ndarray(revelar(f, a, grano, vin), format="rgb24")):
                out.mux(p)
            if i % 20 == 0:
                print(f"{i}/{len(cuadros)}", flush=True)
        for p in vs.encode():
            out.mux(p)
    print(f"ok: {a.dst} ({w}×{h}, {len(cuadros)} cuadros, {len(cuadros) / float(fps):.2f} s)")


if __name__ == "__main__":
    main()
