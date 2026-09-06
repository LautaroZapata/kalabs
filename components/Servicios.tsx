"use client";

import { motion, useReducedMotion } from "motion/react";
import Cabezal from "./Cabezal";
import { entrada } from "./mov/entrada";
import { SERVICIOS, UI } from "@/lib/content";
import s from "./Servicios.module.css";

/**
 * Servicios.
 *
 * Antes era una tabla: nombre del servicio de un lado, lista de entregables
 * del otro. El problema no era el layout sino qué encabezaba cada bloque —el
 * nombre de una capacidad nuestra— y qué ocupaba más espacio —una grilla de
 * cuatro ítems—. Un catálogo de lo que sabemos hacer.
 *
 * Ahora cada bloque abre con el problema del que llega, en segunda persona y
 * al cuerpo de un titular de tapa. El nombre del servicio queda de etiqueta,
 * y los entregables bajan a una línea corrida al pie: dejan de ser el
 * contenido y vuelven a ser lo que son, la letra chica.
 */
export default function Servicios() {
  const quieto = useReducedMotion();

  return (
    <section id="servicios" className={s.pagina} aria-labelledby="servicios-t">
      <Cabezal
        id="servicios-t"
        folio="2"
        antetitulo={UI.serviciosAntetitulo}
        titulo="Servicios"
        bajada={UI.serviciosBajada}
      />

      <div className={s.listado}>
        {SERVICIOS.map((serv, i) => (
          <motion.article
            key={serv.num}
            className={s.bloque}
            {...entrada({ quieto, y: 26, margin: "-8% 0px -12% 0px", delay: i * 0.05 })}
          >
            {/* Lo primero y lo más grande: lo que le pasa a quien está
                leyendo. El servicio se nombra después. */}
            <p className={`${s.problema} titular`}>{serv.problema}</p>

            <div className={s.respuesta}>
              <div className={s.etiqueta}>
                <p className={`${s.orden} dato`} aria-hidden="true">
                  {serv.num} / 03
                </p>
                <h3 className={`${s.titulo} titular titular--sec`}>{serv.titulo}</h3>
                <p className={`${s.bajadaServ} bajada`}>{serv.bajada}</p>
              </div>

              <div className={s.desarrollo}>
                <p className={`${s.cuerpo} parrafo`}>{serv.cuerpo}</p>

                {/* Corrida, no tabla: es la letra chica del aviso. */}
                <p className={`${s.entregables} dato`}>
                  <span className={s.entregablesTitulo}>{UI.serviciosEntregables}</span>
                  {serv.entregables.join(" · ")}
                </p>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
