import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { cancelRender, continueRender, delayRender, Easing, interpolate, staticFile } from "remotion";

export { BONE_DIM, BRASA, HUESO, INK_4, PAPEL, TERRA, TINTA } from "@/lib/feed";

/* ==========================================================================
   Lo que comparten todos los videos: formato, ritmo, fuentes y medidas.
   ========================================================================== */

/** Reel: 9:16 a 30 cuadros. */
export const FPS = 30;
export const LIENZO = { width: 1080, height: 1920 };

/**
 * El pulso: 15 cuadros, una negra a 120 BPM. Los cortes caen sobre él para
 * que cualquier tema de la biblioteca de Instagram a ese tempo (o a 60 o a
 * 240) calce sin editar nada.
 */
export const PULSO = 15;

/**
 * La zona segura del Reel. Arriba la tapa el nombre de la cuenta; abajo, la
 * leyenda, los botones y la música. Lo que tiene que leerse vive entre las dos
 * líneas y centrado en ese tramo.
 */
export const ARRIBA = 240;
export const ABAJO = 470;
export const MARGEN = 90;
export const ANCHO = LIENZO.width - MARGEN * 2;

/* --------------------------------------------------------------------------
   Fuente: la Hanken Grotesk variable del sitio, en public/fuentes.
   -------------------------------------------------------------------------- */

const cargando = delayRender("Cargando fuentes");
const fuentes = Promise.all([
  new FontFace("Cuerpo", `url(${staticFile("fuentes/Hanken.ttf")}) format("truetype")`, {
    weight: "100 900",
  }).load(),
]).then((cargadas) => {
  cargadas.forEach((f) => document.fonts.add(f));
  continueRender(cargando);
});
fuentes.catch((e) => cancelRender(e));

/**
 * No monta nada hasta que las fuentes están. Hace falta porque los titulares
 * se miden para ocupar el ancho, y medir con la fuente de reemplazo da un
 * cuerpo equivocado que después no se corrige.
 */
export function ConFuentes({ children }: { children: ReactNode }) {
  const [listo, setListo] = useState(false);
  const [espera] = useState(() => delayRender("Montando con fuentes"));
  useEffect(() => {
    fuentes.then(() => setListo(true));
  }, []);
  useEffect(() => {
    if (listo) continueRender(espera);
  }, [listo, espera]);
  return listo ? <>{children}</> : null;
}

/* --------------------------------------------------------------------------
   Tipografía
   -------------------------------------------------------------------------- */

/**
 * La voz grande: Hanken Grotesk negra, la más redonda de las dos del estudio.
 * Se probó primero con Bricolage angostada y se cambió a pedido: en
 * movimiento, la Hanken se lee más amable y menos de cartel.
 */
export const DISPLAY: CSSProperties = {
  fontFamily: "Cuerpo",
  fontWeight: 800,
  letterSpacing: "-0.045em",
  lineHeight: 0.96,
};

const medidas = new Map<string, number>();

/** Ancho de un texto a 100 px con el estilo dado, medido en el documento. */
function medir(texto: string, estilo: CSSProperties): number {
  const clave = texto + JSON.stringify(estilo);
  const hecha = medidas.get(clave);
  if (hecha !== undefined) return hecha;
  const s = document.createElement("span");
  Object.assign(s.style, estilo, {
    fontSize: "100px",
    position: "absolute",
    visibility: "hidden",
    whiteSpace: "pre",
  });
  s.textContent = texto;
  document.body.appendChild(s);
  const w = s.getBoundingClientRect().width;
  s.remove();
  medidas.set(clave, w);
  return w;
}

/** El cuerpo que hace que el renglón más largo ocupe `ancho`, con tope. */
export function ajustar(renglones: string[], ancho = ANCHO, tope = 400, estilo = DISPLAY) {
  const mayor = Math.max(...renglones.map((r) => medir(r, estilo)));
  return Math.min(tope, (100 * ancho) / mayor);
}

/* --------------------------------------------------------------------------
   Tiempo
   -------------------------------------------------------------------------- */

/** Resorte con rebote: lo que entra se pasa un poco y vuelve. */
export const REBOTE = { damping: 12, stiffness: 200, mass: 0.6 };
/** Resorte seco: llega rápido y sin pasarse. */
export const SECO = { damping: 22, stiffness: 260, mass: 0.5 };

export const RAPIDO = Easing.bezier(0.7, 0, 0.2, 1);

export function tramo(f: number, desde: number, dura: number, curva = RAPIDO) {
  return interpolate(f, [desde, desde + dura], [0, 1], {
    easing: curva,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
}
