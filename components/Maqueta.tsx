"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import type { Proyecto } from "@/lib/content";
import s from "./Maqueta.module.css";

/**
 * La imagen del proyecto: captura real del sitio en vivo con una viñeta
 * animada montada encima.
 *
 * Antes acá había maquetas dibujadas en SVG. Servían como sustituto, pero
 * cualquiera nota que no son el producto. La captura es la prueba; la viñeta
 * pone en movimiento lo que el proyecto hace —una grúa que llega, un mes que
 * se llena, un pistón que trabaja— sin tapar lo que hay abajo.
 *
 * Las capturas se sacan con scripts/capturas.mjs.
 */

const CURVA = [0.16, 1, 0.3, 1] as const;

/* ---------------- ViaGrúa: la grúa cruza el pie de la imagen ---------------- */
function Grua({ quieto }: { quieto: boolean | null }) {
  return (
    <div className={s.calzada} aria-hidden="true">
      <motion.svg
        viewBox="0 0 120 44"
        className={s.grua}
        initial={quieto ? false : { x: "-30%" }}
        animate={quieto ? { x: "22%" } : { x: ["-30%", "122%"] }}
        transition={
          quieto
            ? { duration: 0 }
            : { duration: 9, ease: "linear", repeat: Infinity, repeatDelay: 1.5 }
        }
      >
        {/* pluma */}
        <path d="M60 26 L96 10 L104 14 L64 30 Z" className={s.gruaCuerpo} />
        <line x1="96" y1="11" x2="96" y2="22" className={s.gruaCable} />
        <path d="M92 22 h8 v5 h-8 Z" className={s.gruaCuerpo} />
        {/* plataforma y cabina */}
        <path d="M6 26 h58 v8 H6 Z" className={s.gruaCuerpo} />
        <path d="M6 12 h20 l6 10 v4 H6 Z" className={s.gruaCabina} />
        <rect x="10" y="15" width="11" height="6" className={s.gruaVidrio} />
        {/* ruedas */}
        <circle cx="18" cy="37" r="6" className={s.gruaRueda} />
        <circle cx="52" cy="37" r="6" className={s.gruaRueda} />
      </motion.svg>
    </div>
  );
}

/* ---------------- ROG: el mes que se llena ---------------- */
const ALTURAS = [10, 18, 13, 24, 30] as const;

function Barras({ quieto }: { quieto: boolean | null }) {
  return (
    <svg viewBox="0 0 74 40" className={s.vineta} aria-hidden="true">
      <line x1="4" y1="35" x2="70" y2="35" className={s.eje} />
      {ALTURAS.map((h, i) => (
        <motion.rect
          key={i}
          x={7 + i * 13}
          width="9"
          className={i === ALTURAS.length - 1 ? s.barraAlta : s.barra}
          initial={quieto ? false : { height: 0, y: 35 }}
          animate={quieto ? { height: h, y: 35 - h } : { height: [0, h], y: [35, 35 - h] }}
          transition={
            quieto
              ? { duration: 0 }
              : {
                  duration: 0.7,
                  ease: CURVA,
                  delay: i * 0.13,
                  repeat: Infinity,
                  repeatDelay: 2.4,
                  repeatType: "reverse",
                }
          }
        />
      ))}
    </svg>
  );
}

/* ---------------- Oleo Cáceres: el pistón hidráulico ---------------- */
function Piston({ quieto }: { quieto: boolean | null }) {
  return (
    <svg viewBox="0 0 74 40" className={s.vineta} aria-hidden="true">
      {/* camisa del cilindro */}
      <rect x="4" y="13" width="34" height="16" className={s.camisa} />
      <rect x="4" y="13" width="34" height="16" className={s.camisaBorde} />
      {/* vástago que entra y sale */}
      <motion.g
        initial={quieto ? false : { x: 0 }}
        animate={quieto ? { x: 18 } : { x: [0, 24, 0] }}
        transition={
          quieto
            ? { duration: 0 }
            : { duration: 3.4, ease: [0.45, 0, 0.55, 1], repeat: Infinity, repeatDelay: 0.5 }
        }
      >
        <rect x="38" y="18" width="22" height="6" className={s.vastago} />
        <rect x="58" y="14" width="6" height="14" className={s.cabeza} />
      </motion.g>
      <line x1="4" y1="34" x2="70" y2="34" className={s.eje} />
    </svg>
  );
}

const VINETAS = { grua: Grua, barras: Barras, piston: Piston };

export default function Maqueta({ proyecto }: { proyecto: Proyecto }) {
  const quieto = useReducedMotion();
  const Vineta = VINETAS[proyecto.vineta];

  return (
    <figure className={s.wrap}>
      <Image
        src={proyecto.imagen}
        alt={proyecto.imagenAlt}
        width={1600}
        height={1000}
        className={s.img}
        sizes="(min-width: 900px) 50vw, 100vw"
      />

      {/* Velo: baja el contraste del pie de la captura para que la viñeta se
          lea sin tener que ponerle una caja opaca encima. */}
      <div className={s.velo} aria-hidden="true" />

      {proyecto.vineta === "grua" ? (
        <Grua quieto={quieto} />
      ) : (
        <div className={s.caja} aria-hidden="true">
          <Vineta quieto={quieto} />
        </div>
      )}
    </figure>
  );
}
