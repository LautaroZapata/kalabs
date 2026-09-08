"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import s from "./Composicion.module.css";

/**
 * La caja de composición: una página armándose al costado del nombre.
 *
 * Es lo que hace el estudio, dicho sin ilustrarlo: primero se tiran los
 * corondeles, después entra el titular, las columnas de texto y el recuadro
 * de la foto. Cuando la maqueta está completa se levanta y empieza otra.
 *
 * No es un mockup de navegador ni una terminal con código corriendo —los dos
 * clichés del rubro—: es el mismo vocabulario que usa el resto del sitio
 * (filetes, corondeles, módulos) puesto en movimiento, así que se lee como
 * parte de la página y no como una animación pegada encima.
 *
 * Va sobre una grilla de 120×90 con marcas de corte fijas en las esquinas;
 * lo único que cambia entre maquetas son los bloques de adentro.
 */

type Bloque = {
  x: number;
  y: number;
  w: number;
  h: number;
  t: "tit" | "img" | "txt" | "regla";
};

type Maqueta = Bloque[];

/* El orden del array es el orden en que se compone: primero la estructura,
   después el titular, al final el texto. */
const MAQUETAS: Maqueta[] = [
  /* Nota principal con la foto al costado. */
  [
    { x: 8, y: 9, w: 74, h: 11, t: "tit" },
    { x: 8, y: 26, w: 50, h: 30, t: "img" },
    { x: 62, y: 27, w: 50, h: 2.6, t: "txt" },
    { x: 62, y: 33, w: 50, h: 2.6, t: "txt" },
    { x: 62, y: 39, w: 42, h: 2.6, t: "txt" },
    { x: 62, y: 45, w: 50, h: 2.6, t: "txt" },
    { x: 62, y: 51, w: 34, h: 2.6, t: "txt" },
    { x: 8, y: 62, w: 104, h: 2.6, t: "txt" },
    { x: 8, y: 68, w: 86, h: 2.6, t: "txt" },
  ],
  /* Foto a la cabeza y el texto a dos columnas. */
  [
    { x: 58.5, y: 53, w: 0.7, h: 19, t: "regla" },
    { x: 8, y: 8, w: 104, h: 24, t: "img" },
    { x: 8, y: 38, w: 66, h: 11, t: "tit" },
    { x: 8, y: 55, w: 46, h: 2.6, t: "txt" },
    { x: 8, y: 61, w: 46, h: 2.6, t: "txt" },
    { x: 8, y: 67, w: 38, h: 2.6, t: "txt" },
    { x: 64, y: 55, w: 48, h: 2.6, t: "txt" },
    { x: 64, y: 61, w: 48, h: 2.6, t: "txt" },
    { x: 64, y: 67, w: 42, h: 2.6, t: "txt" },
  ],
  /* Titular a todo lo ancho y tres columnas. */
  [
    { x: 41, y: 27, w: 0.7, h: 28, t: "regla" },
    { x: 77, y: 27, w: 0.7, h: 28, t: "regla" },
    { x: 8, y: 9, w: 104, h: 12, t: "tit" },
    { x: 8, y: 29, w: 30, h: 2.6, t: "txt" },
    { x: 8, y: 35, w: 30, h: 2.6, t: "txt" },
    { x: 8, y: 41, w: 26, h: 2.6, t: "txt" },
    { x: 8, y: 47, w: 30, h: 2.6, t: "txt" },
    { x: 45, y: 29, w: 30, h: 2.6, t: "txt" },
    { x: 45, y: 35, w: 30, h: 2.6, t: "txt" },
    { x: 45, y: 41, w: 30, h: 2.6, t: "txt" },
    { x: 45, y: 47, w: 24, h: 2.6, t: "txt" },
    { x: 80, y: 29, w: 32, h: 24, t: "img" },
    { x: 8, y: 60, w: 104, h: 2.6, t: "txt" },
    { x: 8, y: 66, w: 70, h: 2.6, t: "txt" },
  ],
];

/* Lo que la maqueta tarda en armarse, quedarse quieta y levantarse. */
const ESPERA = 3600;

const CURVA = [0.16, 1, 0.3, 1] as const;

const plana = {
  entra: { transition: { staggerChildren: 0.055, delayChildren: 0.06 } },
  sale: { transition: { staggerChildren: 0.028, staggerDirection: -1 } },
};

/* Los bloques horizontales crecen desde el margen izquierdo, como se llena
   una línea de texto. */
const bloque = {
  inicio: { opacity: 0, scaleX: 0 },
  entra: { opacity: 1, scaleX: 1, transition: { duration: 0.42, ease: CURVA } },
  sale: { opacity: 0, scaleX: 0, transition: { duration: 0.2, ease: "easeIn" as const } },
};

/* El corondel es vertical: baja desde arriba. */
const corondel = {
  inicio: { opacity: 0, scaleY: 0 },
  entra: { opacity: 1, scaleY: 1, transition: { duration: 0.42, ease: CURVA } },
  sale: { opacity: 0, scaleY: 0, transition: { duration: 0.2, ease: "easeIn" as const } },
};

/* El aspa del recuadro de foto: la marca con que una maqueta dice "acá va
   una imagen" desde mucho antes de que existiera la pantalla. */
function Bloque({ b }: { b: Bloque }) {
  return (
    <>
      <rect x={b.x} y={b.y} width={b.w} height={b.h} className={s[b.t]} />
      {b.t === "img" && (
        <>
          <line x1={b.x} y1={b.y} x2={b.x + b.w} y2={b.y + b.h} className={s.aspa} />
          <line x1={b.x + b.w} y1={b.y} x2={b.x} y2={b.y + b.h} className={s.aspa} />
        </>
      )}
    </>
  );
}

export default function Composicion() {
  const quieto = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (quieto) return;
    const t = setTimeout(() => setI((n) => (n + 1) % MAQUETAS.length), ESPERA);
    return () => clearTimeout(t);
  }, [i, quieto]);

  return (
    <div className={s.panel} aria-hidden="true">
      <svg viewBox="0 0 120 90" className={s.svg}>
        {/* Marcas de corte: fijas, son el papel sobre el que se compone. */}
        <g className={s.marca}>
          <path d="M6 6 h7 M6 6 v7" />
          <path d="M114 6 h-7 M114 6 v7" />
          <path d="M6 84 h7 M6 84 v-7" />
          <path d="M114 84 h-7 M114 84 v-7" />
        </g>

        {quieto ? (
          MAQUETAS[0].map((b, n) => <Bloque key={n} b={b} />)
        ) : (
          <AnimatePresence mode="wait">
            <motion.g
              key={i}
              variants={plana}
              initial="inicio"
              animate="entra"
              exit="sale"
            >
              {MAQUETAS[i].map((b, n) => (
                <motion.g
                  key={n}
                  variants={b.t === "regla" ? corondel : bloque}
                  style={{
                    transformBox: "fill-box",
                    transformOrigin: b.t === "regla" ? "center top" : "left center",
                  }}
                >
                  <Bloque b={b} />
                </motion.g>
              ))}
            </motion.g>
          </AnimatePresence>
        )}
      </svg>
    </div>
  );
}
