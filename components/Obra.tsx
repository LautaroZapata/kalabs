"use client";

import { motion, useReducedMotion } from "motion/react";
import Greca from "./Greca";
import { useArrastre } from "./mov/useArrastre";
import { useEscritorio } from "./mov/useEscritorio";
import { PROYECTOS, UI } from "@/lib/content";
import s from "./Obra.module.css";

export default function Obra() {
  const quieto = useReducedMotion();
  const escritorio = useEscritorio();
  const riel = useArrastre<HTMLDivElement>(s.agarrando);

  /* Las fichas quedan apenas desalineadas entre sí; en mobile van derechas. */
  const giro = (ancho: string) =>
    !escritorio ? 0 : ancho === "largo" ? -0.5 : ancho === "corto" ? 0.7 : 0;

  /* La entrada la dispara el riel, no cada ficha.
     Si dependiera de cada una, las que arrancan fuera de pantalla a la
     derecha nunca entrarían en el viewport y quedarían invisibles hasta que
     alguien las arrastre. */
  const contenedor = {
    oculto: {},
    visible: { transition: { staggerChildren: quieto ? 0 : 0.09 } },
  };

  const ficha = {
    oculto: { opacity: 0, y: quieto ? 0 : 40, rotate: 0 },
    visible: (rot: number) => ({
      opacity: 1,
      y: 0,
      rotate: rot,
      transition: { duration: quieto ? 0 : 0.65, ease: [0.16, 1, 0.3, 1] as const },
    }),
  };

  const propsRiel = quieto
    ? ({ initial: false, animate: "visible" } as const)
    : ({
        initial: "oculto",
        whileInView: "visible",
        viewport: { once: true, margin: "-8% 0px -10% 0px" },
      } as const);

  return (
    <section id="obra" className={s.wrap} aria-labelledby="obra-t">
      <div className={s.head}>
        <h2 id="obra-t" className={s.title}>
          Obra{" "}
          <em>hecha</em>
        </h2>
        <div>
          <p className="mono" style={{ color: "var(--bone-dim)", marginBottom: "0.6rem" }}>
            {UI.obraKicker}
          </p>
          <p className={`${s.hint} monoSm`}>
            <span aria-hidden="true">↔</span> {UI.obraHint}
          </p>
        </div>
      </div>

      {/* El riel es foco de teclado para poder recorrerlo sin mouse. */}
      <motion.div
        ref={riel}
        className={s.rail}
        role="region"
        aria-label="Proyectos, desplazamiento horizontal"
        tabIndex={0}
        variants={contenedor}
        {...propsRiel}
      >
        {PROYECTOS.map((p) => (
          <motion.article
            key={p.num}
            className={`${s.card} ${s[`card--${p.ancho}`]} ${s[`card--off${p.offset}`]}`}
            variants={ficha}
            custom={giro(p.ancho)}
          >
            <span className={`${s.num} display`} aria-hidden="true">
              {p.num}
            </span>

            <div className={s.spine}>
              <Greca
                id={`greca-spine-${p.num}`}
                variant="escalera"
                line="var(--terra-dim)"
                accent="var(--teal-dim)"
                height="100%"
                scale={1.6}
              />
            </div>

            <div className={s.body}>
              <h3 className={s.nombre}>{p.nombre}</h3>
              {p.nombreLargo && <p className={`${s.largo} monoSm`}>{p.nombreLargo}</p>}
              <p className={s.pitch}>{p.pitch}</p>
              <p className={s.detalle}>{p.detalle}</p>

              <div className={s.meta}>
                <span className={`${s.estado} monoSm`}>
                  <span aria-hidden="true">●</span> {p.estado}
                </span>
                <span className={`${s.stack} monoSm`}>{p.stack.join(" / ")}</span>
              </div>
            </div>
          </motion.article>
        ))}

        {/* cierre del riel: el arrastre termina en una invitación, no en el vacío */}
        <motion.a
          href="#senal"
          className={s.cierre}
          variants={ficha}
          custom={0}
        >
          <div className={s.cierreCuerpo}>
            <p className="monoSm" style={{ color: "var(--teal)" }}>
              {UI.obraCierreKicker}
            </p>
            <h3 className={s.cierreTitulo}>{UI.obraCierreTitulo}</h3>
            <p className={s.cierreNota}>{UI.obraCierreNota}</p>
            <p className={`${s.cierreAccion} mono`}>
              {UI.obraCierreAccion} <span aria-hidden="true">→</span>
            </p>
          </div>
          <Greca
            id="greca-cierre-obra"
            variant="zigzag"
            line="var(--terra)"
            accent="var(--ember)"
            height="100%"
            scale={1.2}
            className={s.cierreTrama}
          />
        </motion.a>
      </motion.div>

      {/* junta tejida entre secciones */}
      <Greca
        id="greca-junta-obra"
        variant="zigzag"
        line="var(--terra)"
        accent="var(--ember)"
        height={22}
        scale={1.4}
        className={s.junta}
      />
    </section>
  );
}
