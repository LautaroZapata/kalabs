"use client";

import { motion, useReducedMotion } from "motion/react";
import { entrada } from "./mov/entrada";
import { PROYECTOS, UI } from "@/lib/content";
import s from "./Proyectos.module.css";

export default function Proyectos() {
  const quieto = useReducedMotion();

  return (
    <section id="proyectos" className={s.wrap} aria-labelledby="proyectos-t">
      <div className={s.head}>
        <h2 id="proyectos-t" className={s.title}>
          Proyectos
        </h2>
        <p className={`${s.kicker} mono`}>{UI.proyectosKicker}</p>
      </div>

      {/* Grilla vertical: los tres proyectos se ven de una, sin arrastrar.
          El primero ocupa el ancho completo; es el que más tiene para contar. */}
      <div className={s.grid}>
        {PROYECTOS.map((p, i) => (
          <motion.article
            key={p.num}
            className={`${s.card} ${i === 0 ? s.cardAncha : ""}`}
            {...entrada({ quieto, y: 30, delay: i * 0.08 })}
          >
            <span className={`${s.num} display`} aria-hidden="true">
              {p.num}
            </span>

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
          </motion.article>
        ))}

        {/* La grilla no termina en el vacío: cierra con la invitación. */}
        <motion.a
          href="#contacto"
          className={s.cierre}
          {...entrada({ quieto, y: 30, delay: 0.24 })}
        >
          <p className="monoSm" style={{ color: "var(--ember-dim)" }}>
            {UI.proyectosCierreKicker}
          </p>
          <h3 className={s.cierreTitulo}>{UI.proyectosCierreTitulo}</h3>
          <p className={s.cierreNota}>{UI.proyectosCierreNota}</p>
          <p className={`${s.cierreAccion} mono`}>
            {UI.proyectosCierreAccion} <span aria-hidden="true">→</span>
          </p>
        </motion.a>
      </div>
    </section>
  );
}
