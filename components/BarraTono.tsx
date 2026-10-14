"use client";

import { useEffect } from "react";

/**
 * La barra es transparente: su color lo decide lo que tiene detrás.
 *
 * Mira por separado debajo del logo y debajo de las pastillas —puede haber
 * una carta oscura de un lado y papel del otro— y marca cada lado como
 * `claro` u `oscuro` en `data-izq` y `data-der`. Lo que hay detrás se lee de
 * verdad: el `data-tono` que declare la sección (un video no tiene color de
 * fondo que leer) o, si no, el color de fondo del primer elemento opaco.
 * Se recalcula con el scroll y el tamaño, a lo sumo una vez por cuadro.
 *
 * Sobre la escena del héroe la barra queda transparente. Fuera de ella toma
 * un fondo esmerilado (`data-fondo`): sin fondo, el texto de las secciones le
 * pasaba por detrás y el logo y las pastillas se perdían. Con fondo, los dos
 * lados toman el tono que domina debajo (dos de tres puntos: los costados y
 * el centro), así una captura oscura en el medio no vuelve oscura la barra
 * sobre una sección de papel.
 */
function luminancia(color: string) {
  const m = color.match(/rgba?\(([^)]+)\)/);
  if (!m) return null;
  const [r, g, b, a = 1] = m[1].split(/[ ,/]+/).filter(Boolean).map(Number);
  if (a < 0.5) return null;
  const lin = (c: number) => ((c /= 255) <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

function tonoEn(x: number, y: number, barra: HTMLElement): "claro" | "oscuro" {
  for (const el of document.elementsFromPoint(x, y)) {
    if (barra.contains(el)) continue;
    const declarado = (el as HTMLElement).dataset?.tono;
    if (declarado === "claro" || declarado === "oscuro") return declarado;
    const cs = getComputedStyle(el);
    let l = luminancia(cs.backgroundColor);
    if (l === null && cs.backgroundImage.includes("gradient")) {
      const primero = cs.backgroundImage.match(/rgba?\([^)]+\)/);
      if (primero) l = luminancia(primero[0]);
    }
    if (l !== null) return l > 0.3 ? "claro" : "oscuro";
  }
  return "claro";
}

export default function BarraTono({ id }: { id: string }) {
  useEffect(() => {
    const barra = document.getElementById(id);
    if (!barra) return;
    let pedido = 0;
    const medir = () => {
      pedido = 0;
      const r = barra.getBoundingClientRect();
      const y = r.top + r.height / 2;
      const sobreEscena = document
        .elementsFromPoint(r.left + r.width / 2, r.bottom - 2)
        .some((el) => (el as HTMLElement).closest?.("[data-escena]"));
      if (sobreEscena) {
        barra.dataset.fondo = "no";
        barra.dataset.izq = tonoEn(r.left + Math.min(90, r.width * 0.12), y, barra);
        barra.dataset.der = tonoEn(r.right - Math.min(120, r.width * 0.15), y, barra);
      } else {
        const puntos = [0.06, 0.5, 0.94].map((f) => tonoEn(r.left + r.width * f, y, barra));
        const tono = puntos.filter((t) => t === "oscuro").length >= 2 ? "oscuro" : "claro";
        barra.dataset.fondo = "si";
        barra.dataset.izq = tono;
        barra.dataset.der = tono;
      }
    };
    const pedir = () => {
      if (!pedido) pedido = requestAnimationFrame(medir);
    };
    medir();
    addEventListener("scroll", pedir, { passive: true });
    addEventListener("resize", pedir);
    /* Las secciones que se animan al entrar cambian lo que hay detrás sin scroll. */
    const reloj = setInterval(pedir, 600);
    return () => {
      removeEventListener("scroll", pedir);
      removeEventListener("resize", pedir);
      clearInterval(reloj);
      cancelAnimationFrame(pedido);
    };
  }, [id]);
  return null;
}
