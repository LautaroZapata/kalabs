"use client";

import { motion, useReducedMotion } from "motion/react";
import Greca from "./Greca";
import { useEscritorio } from "./mov/useEscritorio";
import { entrada } from "./mov/entrada";
import { EQUIPO, SITE, UI } from "@/lib/content";
import s from "./Taller.module.css";

export default function Taller() {
  const quieto = useReducedMotion();
  const escritorio = useEscritorio();

  /* Giro de cada placa: más marcado en escritorio, casi nulo en mobile. */
  const GIROS = escritorio ? [-2.4, 1.4, -1.2, 1.8] : [-1.6, 1.1, -0.9, 0];

  /* Las placas entran una atrás de otra, como si se fueran apoyando. */
  const entra = (i: number) =>
    entrada({ quieto, y: 34, rotate: GIROS[i], delay: i * 0.12 });

  return (
    <section id="taller" className={s.wrap} aria-labelledby="taller-t">
      <Greca
        id="greca-taller-fondo"
        variant="trama"
        line="var(--ink-3)"
        accent="var(--ink)"
        height="100%"
        scale={3}
        className={s.fondo}
      />

      <div className={s.head}>
        <p className={`${s.kicker} mono`}>{UI.tallerKicker}</p>
        <h2 id="taller-t" className={s.title}>
          Taller
        </h2>
      </div>

      <div className={s.mesa}>
        <motion.blockquote className={`${s.pieza} ${s.cita}`} {...entra(0)}>
          <p className={s.citaTexto}>{UI.citaTaller}</p>
          <p className={`${s.citaPie} monoSm`}>
            Kalabs — {SITE.ciudad}, {SITE.pais} · Turno {SITE.turno}
          </p>
        </motion.blockquote>

        {EQUIPO.map((p, i) => (
          <motion.article
            key={p.nombre}
            className={`${s.pieza} ${s.ficha} ${i === 1 ? s.ficha2 : ""}`}
            {...entra(i + 1)}
          >
            <div className={s.fichaTop}>
              <h3 className={s.nombre}>{p.nombre}</h3>
              <span
                className={`${s.chip} ${p.estado === "confirmado" ? s.chipOk : s.chipPend} monoSm`}
              >
                <span aria-hidden="true">{p.estado === "confirmado" ? "●" : "◐"}</span>
                {p.tag}
                {p.estado === "pendiente" ? " · a confirmar" : ""}
              </span>
            </div>
            <p className={`${s.rol} monoSm`}>{p.rol}</p>
            <p className={s.bio}>{p.bio}</p>
          </motion.article>
        ))}
        <motion.div className={`${s.pieza} ${s.telar}`} aria-hidden="true" {...entra(3)}>
          <Greca
            id="greca-telar"
            variant="rombo"
            line="var(--terra)"
            accent="var(--teal-dim)"
            height="100%"
            scale={1.35}
          />
        </motion.div>
      </div>

      <p className={`${s.sello} monoSm`} aria-hidden="true">
        {UI.sello}
      </p>
    </section>
  );
}
