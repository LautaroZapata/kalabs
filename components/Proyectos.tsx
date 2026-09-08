"use client";

import { motion, useReducedMotion } from "motion/react";
import Cabezal from "./Cabezal";
import Maqueta from "./Maqueta";
import { entrada } from "./mov/entrada";
import { PROYECTOS, UI } from "@/lib/content";
import s from "./Proyectos.module.css";

export default function Proyectos() {
  const quieto = useReducedMotion();

  return (
    <section id="proyectos" className={s.pagina} aria-labelledby="proyectos-t">
      <Cabezal
        id="proyectos-t"
        antetitulo={UI.proyectosAntetitulo}
        titulo="Proyectos"
      />

      {/* Los tres en fila, cada uno en su columna. La sección entera entra en
          una pantalla: las capturas se estiran para llenar el alto que sobra
          y no hay que bajar tres veces para ver de qué se trata. */}
      <div className={s.plana}>
        {PROYECTOS.map((p, i) => (
          <motion.article
            key={p.num}
            className={s.nota}
            {...entrada({ quieto, y: 24, delay: i * 0.06 })}
          >
            {/* Línea de sumario: el lugar del proyecto en la lista. En el
                papel es la línea de sección, no un numeral gigante. */}
            <p className={`${s.slug} dato dato--caja`}>
              <span>
                {p.num} / {String(PROYECTOS.length).padStart(2, "0")}
              </span>
              <span className={s.slugEstado}>{p.estado}</span>
            </p>

            <Maqueta proyecto={p} />

            <div className={s.cuerpo}>
              <div className={s.identidad}>
                <h3 className={`${s.titulo} titular`}>
                  <a
                    className={s.enlace}
                    href={p.href}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {p.nombre}
                  </a>
                </h3>
                {p.nombreLargo && <p className={`${s.largo} bajada`}>{p.nombreLargo}</p>}
              </div>

              <div className={s.texto}>
                <p className={`${s.pitch} titular titular--sec`}>{p.pitch}</p>
                <p className={`${s.detalle} parrafo`}>{p.detalle}</p>
              </div>
            </div>

            <p className={`${s.pieNota} dato dato--caja`}>
              <span className={s.sitio}>{p.sitio}</span>
              <span className={s.visitar} aria-hidden="true">
                {UI.proyectosVer}
                <span className={s.flecha}>→</span>
              </span>
            </p>
          </motion.article>
        ))}

      </div>

      {/* Cierre: una sola línea al pie de la sección. Como bloque se comía el
          alto que necesitan las capturas. */}
      <motion.a
        href="#contacto"
        className={s.aviso}
        {...entrada({ quieto, y: 20, delay: 0.24 })}
      >
        <span className={s.avisoIzq}>
          <span className={`${s.avisoKicker} dato dato--caja`}>
            {UI.proyectosCierreKicker}
          </span>
          <span className={`${s.avisoTitulo} titular`}>{UI.proyectosCierreTitulo}</span>
        </span>
        <span className={s.avisoNota}>{UI.proyectosCierreNota}</span>
        <span className={`${s.avisoAccion} dato dato--caja`}>
          {UI.proyectosCierreAccion} <span aria-hidden="true">→</span>
        </span>
      </motion.a>
    </section>
  );
}
