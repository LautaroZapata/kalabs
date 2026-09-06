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
        folio="3"
        antetitulo={UI.proyectosAntetitulo}
        titulo="Proyectos"
        bajada={UI.proyectosBajada}
      />

      {/* Jerarquía de plana: una nota principal a todo el ancho y dos
          secundarias abajo. Es cómo se arma una página, no una grilla de
          tarjetas iguales. */}
      <div className={s.plana}>
        {PROYECTOS.map((p, i) => (
          <motion.article
            key={p.num}
            className={`${s.nota} ${i === 0 ? s.notaPrincipal : ""}`}
            {...entrada({ quieto, y: 24, delay: i * 0.08 })}
          >
            <Maqueta proyecto={p} />

            <div className={s.cuerpo}>
              {/* Línea de sumario: el lugar del proyecto en la lista. En el
                  papel es la línea de sección, no un numeral gigante. */}
              <p className={`${s.slug} dato dato--caja`}>
                <span>
                  {p.num} / {String(PROYECTOS.length).padStart(2, "0")}
                </span>
                <span className={s.slugEstado}>{p.estado}</span>
              </p>

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

              <p className={`${s.pitch} titular titular--sec`}>{p.pitch}</p>
              <p className={`${s.detalle} parrafo`}>{p.detalle}</p>

              <p className={`${s.pieNota} dato dato--caja`}>
                <span className={s.sitio}>{p.sitio}</span>
                <span className={s.visitar} aria-hidden="true">
                  {UI.proyectosVer}
                  <span className={s.flecha}>→</span>
                </span>
              </p>
            </div>
          </motion.article>
        ))}

        {/* Aviso clasificado: el espacio que queda libre en la plana. */}
        <motion.a
          href="#contacto"
          className={s.aviso}
          {...entrada({ quieto, y: 24, delay: 0.24 })}
        >
          <span className={`${s.avisoKicker} dato dato--caja`}>
            {UI.proyectosCierreKicker}
          </span>
          <span className={`${s.avisoTitulo} titular`}>{UI.proyectosCierreTitulo}</span>
          <span className={`${s.avisoNota} parrafo`}>{UI.proyectosCierreNota}</span>
          <span className={`${s.avisoAccion} dato dato--caja`}>
            {UI.proyectosCierreAccion} <span aria-hidden="true">→</span>
          </span>
        </motion.a>
      </div>
    </section>
  );
}
