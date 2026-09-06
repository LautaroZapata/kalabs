"use client";

import { motion, useReducedMotion } from "motion/react";
import Cabezal from "./Cabezal";
import { entrada } from "./mov/entrada";
import { SERVICIOS, UI } from "@/lib/content";
import s from "./Servicios.module.css";

export default function Servicios() {
  const quieto = useReducedMotion();

  return (
    <section id="servicios" className={s.pagina} aria-labelledby="servicios-t">
      <Cabezal
        id="servicios-t"
        folio="3"
        antetitulo={UI.serviciosAntetitulo}
        titulo="Servicios"
        bajada={UI.serviciosBajada}
      />

      {/* Tres entradas de listado, una debajo de otra, separadas por filete.
          El texto del servicio va en dos columnas con corondel: densidad de
          diario, no tres tarjetas iguales en fila. */}
      <div className={s.listado}>
        {SERVICIOS.map((serv, i) => (
          <motion.article
            key={serv.num}
            className={s.entrada}
            {...entrada({ quieto, y: 24, margin: "-8% 0px -12% 0px", delay: i * 0.06 })}
          >
            <div className={s.titulos}>
              <p className={`${s.orden} dato dato--caja`} aria-hidden="true">
                {serv.num}
              </p>
              <h3 className={`${s.titulo} titular`}>{serv.titulo}</h3>
              <p className={`${s.bajadaServ} bajada`}>{serv.bajada}</p>
            </div>

            <div className={s.texto}>
              <p className={`${s.cuerpo} parrafo`}>{serv.cuerpo}</p>

              <div className={s.entregables}>
                <p className={`${s.entregablesTitulo} dato dato--caja`}>
                  {UI.serviciosEntregables}
                </p>
                <ul>
                  {serv.entregables.map((e) => (
                    <li key={e}>{e}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
