"use client";

import { motion, useReducedMotion } from "motion/react";
import type { Proyecto } from "@/lib/content";
import s from "./Maqueta.module.css";

/**
 * Referencia visual de cada proyecto.
 *
 * No son capturas: son maquetas abstractas que dicen de qué va la app sin
 * prometer una interfaz que después no es. Se dibujan solas al entrar en
 * pantalla y reaccionan al hover de la ficha (el CSS lo maneja desde
 * `.card:hover`).
 *
 * Si algún día hay capturas reales, se completa `imagen` en lib/content.ts y
 * este componente las usa en lugar de la maqueta. No hay que tocar nada más.
 */

const VIEW = "0 0 400 200";

/* Trazo que se dibuja de punta a punta. */
function trazo(quieto: boolean | null, delay = 0) {
  if (quieto) return { initial: false as const, animate: { pathLength: 1, opacity: 1 } };
  return {
    initial: { pathLength: 0, opacity: 0 },
    whileInView: { pathLength: 1, opacity: 1 },
    viewport: { once: true, margin: "-10% 0px" },
    transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] as const, delay },
  };
}

/* Pieza que aparece en su lugar. */
function pieza(quieto: boolean | null, delay = 0) {
  if (quieto) return { initial: false as const, animate: { opacity: 1, scale: 1 } };
  return {
    initial: { opacity: 0, scale: 0.4 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: { once: true, margin: "-10% 0px" },
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const, delay },
  };
}

/* ---------------- 01 · ViaGrúa: una unidad recorriendo la ruta ---------------- */

const RUTA = [
  [34, 158],
  [116, 112],
  [196, 134],
  [278, 74],
  [364, 52],
] as const;

const RUTA_D = RUTA.map((p, i) => `${i === 0 ? "M" : "L"} ${p[0]} ${p[1]}`).join(" ");

function Flota({ quieto }: { quieto: boolean | null }) {
  return (
    <svg viewBox={VIEW} className={s.svg} aria-hidden="true">
      {/* grilla de fondo: el mapa */}
      <g className={s.grilla}>
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <line key={`v${i}`} x1={i * 50 + 25} y1="14" x2={i * 50 + 25} y2="186" />
        ))}
        {[0, 1, 2, 3].map((i) => (
          <line key={`h${i}`} x1="14" y1={i * 48 + 26} x2="386" y2={i * 48 + 26} />
        ))}
      </g>

      <motion.path d={RUTA_D} className={s.ruta} {...trazo(quieto)} />

      {RUTA.map(([x, y], i) => (
        <motion.rect
          key={i}
          x={x - 5}
          y={y - 5}
          width="10"
          height="10"
          className={i === RUTA.length - 1 ? s.nodoDestino : s.nodo}
          {...pieza(quieto, 0.5 + i * 0.09)}
        />
      ))}

      {/* la unidad en camino: sólo se mueve cuando el sistema lo permite */}
      {!quieto && (
        <motion.circle
          r="7"
          className={s.unidad}
          initial={{ opacity: 0 }}
          whileInView={{
            opacity: 1,
            cx: RUTA.map((p) => p[0]),
            cy: RUTA.map((p) => p[1]),
          }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{
            opacity: { duration: 0.3, delay: 1 },
            cx: { duration: 4.5, times: [0, 0.25, 0.5, 0.75, 1], repeat: Infinity, repeatDelay: 0.6, delay: 1 },
            cy: { duration: 4.5, times: [0, 0.25, 0.5, 0.75, 1], repeat: Infinity, repeatDelay: 0.6, delay: 1 },
          }}
        />
      )}
    </svg>
  );
}

/* ---------------- 02 · ROG: el mes contra el presupuesto ---------------- */

const BARRAS = [58, 96, 74, 132, 88, 116, 148] as const;
const TOPE = 120; /* la línea de presupuesto, en alto de barra */

function Gastos({ quieto }: { quieto: boolean | null }) {
  const base = 174;
  return (
    <svg viewBox={VIEW} className={s.svg} aria-hidden="true">
      <line x1="20" y1={base} x2="380" y2={base} className={s.eje} />

      {BARRAS.map((h, i) => {
        const x = 30 + i * 51;
        const clase = h > TOPE ? s.barraExcede : s.barra;

        /* Con movimiento reducido la barra es un rect común, ya a su altura:
           nada que animar y nada que pueda quedarse en cero. */
        if (quieto) {
          return <rect key={i} x={x} y={base - h} width="34" height={h} className={clase} />;
        }

        return (
          <motion.rect
            key={i}
            x={x}
            width="34"
            className={clase}
            initial={{ height: 0, y: base }}
            whileInView={{ height: h, y: base - h }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.1 + i * 0.07 }}
          />
        );
      })}

      {/* presupuesto: la línea que no habría que cruzar */}
      <motion.line
        x1="20"
        y1={base - TOPE}
        x2="380"
        y2={base - TOPE}
        className={s.tope}
        {...trazo(quieto, 0.55)}
      />
    </svg>
  );
}

/* ---------------- 03 · Mesa: las comidas entrando por Telegram ---------------- */

const FILAS = [
  { ancho: 236, acento: true },
  { ancho: 178, acento: false },
  { ancho: 288, acento: false },
  { ancho: 208, acento: true },
] as const;

function Mesa({ quieto }: { quieto: boolean | null }) {
  return (
    <svg viewBox={VIEW} className={s.svg} aria-hidden="true">
      {FILAS.map((f, i) => {
        const y = 34 + i * 44;
        return (
          <motion.g
            key={i}
            initial={quieto ? false : { opacity: 0, x: -26 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{
              duration: quieto ? 0 : 0.55,
              ease: [0.16, 1, 0.3, 1],
              delay: quieto ? 0 : i * 0.13,
            }}
          >
            <rect
              x="26"
              y={y}
              width="22"
              height="22"
              className={f.acento ? s.chipAcento : s.chip}
            />
            <rect x="60" y={y + 4} width={f.ancho} height="6" className={s.linea} />
            <rect x="60" y={y + 16} width={f.ancho * 0.52} height="6" className={s.lineaTenue} />
          </motion.g>
        );
      })}
    </svg>
  );
}

const MAQUETAS = { flota: Flota, gastos: Gastos, mesa: Mesa };

export default function Maqueta({ proyecto }: { proyecto: Proyecto }) {
  const quieto = useReducedMotion();

  if (proyecto.imagen) {
    return (
      <div className={s.wrap}>
        <img src={proyecto.imagen} alt={`Captura de ${proyecto.nombre}`} className={s.img} />
      </div>
    );
  }

  const Dibujo = MAQUETAS[proyecto.maqueta];
  return (
    <div className={s.wrap}>
      <Dibujo quieto={quieto} />
    </div>
  );
}
