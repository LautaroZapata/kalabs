"use client";

import { motion, useReducedMotion } from "motion/react";
import Cabezal from "./Cabezal";
import Formulario from "./Formulario";
import { entrada } from "./mov/entrada";
import { ENLACES, EQUIPO, SITE, UI } from "@/lib/content";
import s from "./Contacto.module.css";

/**
 * Contratapa. Cierra el impreso: la firma del estudio, quiénes lo hacen y
 * cómo escribirnos.
 *
 * Antes abría con una marquesina infinita —el recurso más repetido del
 * género— y el equipo era una sección aparte con placas giradas y superpuestas.
 * Acá el equipo son dos fichas de autor, como las que van al pie de una nota.
 */
export default function Contacto() {
  const quieto = useReducedMotion();
  const anio = new Date().getFullYear();

  return (
    <section id="contacto" className={s.pagina} aria-labelledby="contacto-t">
      <Cabezal
        id="contacto-t"
        folio="4"
        antetitulo={UI.contactoAntetitulo}
        titulo="Contacto"
        bajada={UI.contactoCierre.join(" ")}
      />

      <div className={s.plana}>
        {/* ---------------- columna de contacto ---------------- */}
        <motion.div className={s.columna} {...entrada({ quieto, y: 24 })}>
          <a className={s.mailto} href={`mailto:${SITE.email}`}>
            <span className={`${s.mailtoTitular} titular`}>{SITE.email}</span>
          </a>

          <ul className={s.enlaces}>
            {ENLACES.map((e) => (
              <li key={e.label}>
                <a
                  className={s.enlace}
                  href={e.href}
                  {...(e.href.startsWith("http")
                    ? { target: "_blank", rel: "noreferrer noopener" }
                    : {})}
                >
                  <span className="dato dato--caja">{e.label}</span>
                  <span className={s.enlaceVal}>{e.valor}</span>
                </a>
              </li>
            ))}
          </ul>

          {/* La cita cierra la columna: es la única mancha de color pleno. */}
          <blockquote className={s.cita}>
            <p className={`${s.citaTexto} titular titular--sec`}>{UI.cita}</p>
            <footer className={`${s.citaPie} dato dato--caja`}>
              {SITE.nombre} — {SITE.ciudad}, {SITE.pais}
            </footer>
          </blockquote>
        </motion.div>

        {/* ---------------- formulario ---------------- */}
        <motion.div className={s.columnaForm} {...entrada({ quieto, y: 24, delay: 0.1 })}>
          <Formulario />
        </motion.div>
      </div>

      {/* ---------------- fichas de autor ---------------- */}
      <div className={s.autores}>
        <p className={`${s.autoresTitulo} dato dato--caja`}>{UI.equipoAntetitulo}</p>

        <div className={s.autoresGrid}>
          {EQUIPO.map((p, i) => (
            <motion.article
              key={p.nombre}
              className={s.autor}
              {...entrada({ quieto, y: 20, delay: i * 0.08 })}
            >
              <h3 className={`${s.autorNombre} titular titular--sec`}>
                <a
                  className={s.autorEnlace}
                  href={p.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {p.nombre}
                  <span className="sr"> — perfil de LinkedIn</span>
                  <span className={s.autorFlecha} aria-hidden="true">
                    ↗
                  </span>
                </a>
              </h3>
              <p className={`${s.autorRol} dato`}>
                {p.rol}
                <span className={p.estado === "confirmado" ? s.marcaOk : s.marcaPend}>
                  {p.tag}
                  {p.estado === "pendiente" ? " · a confirmar" : ""}
                </span>
              </p>
            </motion.article>
          ))}
        </div>
      </div>

      <footer className={`${s.colofon} dato dato--caja`}>
        <p>
          © {anio} {SITE.nombre} — {SITE.ciudad}, {SITE.pais}
        </p>
        <p>
          Compuesto en Fraunces y Newsreader ·{" "}
          <a href="#portada">Volver a la portada ↑</a>
        </p>
      </footer>
    </section>
  );
}
