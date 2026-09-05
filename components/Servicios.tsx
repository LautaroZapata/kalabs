"use client";

import { motion, useReducedMotion } from "motion/react";
import { entrada } from "./mov/entrada";
import { SERVICIOS, UI } from "@/lib/content";
import s from "./Servicios.module.css";

export default function Servicios() {
  const quieto = useReducedMotion();

  return (
    <section id="servicios" className={s.wrap} aria-labelledby="servicios-t">
      <div className={s.head}>
        <div>
          <p className={`${s.kicker} mono`}>{UI.serviciosKicker}</p>
          <h2 id="servicios-t" className={s.title}>
            Servicios
          </h2>
        </div>
        <p className={s.lead}>{UI.serviciosLead}</p>
      </div>

      {/* Una sola grilla para las tres filas. Lo que alterna es el lado del
          numeral, nada más: el ritmo lo da la repetición, no el desorden. */}
      {SERVICIOS.map((serv, i) => (
        <motion.article
          key={serv.num}
          className={`${s.row} ${i % 2 === 1 ? s.rowInv : ""}`}
          {...entrada({ quieto, y: 30, margin: "-8% 0px -14% 0px" })}
        >
          <div className={s.numCell}>
            <span className={s.num} aria-hidden="true">
              {serv.num}
            </span>
          </div>

          <div className={s.content}>
            <h3 className={s.servTitle}>{serv.titulo}</h3>
            <p className={s.bajada}>{serv.bajada}</p>
            <p className={s.cuerpo}>{serv.cuerpo}</p>

            <ul className={`${s.entregables} monoSm`}>
              {serv.entregables.map((e) => (
                <li key={e}>
                  <span aria-hidden="true">▚</span>
                  {e}
                </li>
              ))}
            </ul>
          </div>
        </motion.article>
      ))}
    </section>
  );
}
