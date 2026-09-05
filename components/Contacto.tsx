"use client";

import { motion, useReducedMotion } from "motion/react";
import Greca from "./Greca";
import Formulario from "./Formulario";
import Reveal from "./mov/Reveal";
import { entrada } from "./mov/entrada";
import { ENLACES, EQUIPO, SITE, UI } from "@/lib/content";
import s from "./Contacto.module.css";

const PALABRAS = UI.marquesina;

function Track({ ariaHidden }: { ariaHidden?: boolean }) {
  return (
    <div className={s.track} aria-hidden={ariaHidden ? "true" : undefined}>
      {PALABRAS.map((p) => (
        <span key={p}>
          {p} <span aria-hidden="true">▚</span>
        </span>
      ))}
    </div>
  );
}

/**
 * Cierre del sitio. Antes eran dos secciones (Taller y Señal): quién trabaja
 * acá y cómo escribirnos. Van juntas porque se leen juntas — se contrata a
 * las personas, no al formulario.
 */
export default function Contacto() {
  const quieto = useReducedMotion();
  const anio = new Date().getFullYear();

  return (
    <section id="contacto" className={s.wrap} aria-labelledby="contacto-t">
      <h2 id="contacto-t" className="sr">
        03. Contacto
      </h2>

      {/* marquesina: dos copias idénticas, la segunda oculta al lector de pantalla */}
      <div className={s.marquee}>
        <Track />
        <Track ariaHidden />
      </div>

      {/* ---------------- equipo ---------------- */}
      <div className={s.equipo}>
        <Greca
          id="greca-equipo-fondo"
          variant="trama"
          line="var(--ink-3)"
          accent="var(--ink)"
          height="100%"
          scale={3}
          className={s.fondo}
        />

        <p className={`${s.kicker} ${s.equipoKicker} mono`}>{UI.equipoKicker}</p>

        <div className={s.mesa}>
          <motion.blockquote className={s.cita} {...entrada({ quieto, y: 30 })}>
            <p className={s.citaTexto}>{UI.cita}</p>
            <p className={`${s.citaPie} monoSm`}>
              Kalabs — {SITE.ciudad}, {SITE.pais} · Turno {SITE.turno}
            </p>
          </motion.blockquote>

          {EQUIPO.map((p, i) => (
            <motion.article
              key={p.nombre}
              className={s.persona}
              {...entrada({ quieto, y: 30, delay: (i + 1) * 0.1 })}
            >
              <div className={s.personaTop}>
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
        </div>
      </div>

      {/* ---------------- contacto ---------------- */}
      <div className={s.body}>
        <Reveal className={s.col}>
          <p className={`${s.kicker} mono`}>{UI.contactoKicker}</p>
          <a className={s.mailto} href={`mailto:${SITE.email}`}>
            <span className={s.mailtoA}>{SITE.email.split("@")[0]}@</span>
            <span className={s.mailtoB}>{SITE.email.split("@")[1]}</span>
          </a>

          <ul className={s.enlaces}>
            {ENLACES.map((e) => (
              <li key={e.label}>
                <a
                  className={`${s.enlace} mono`}
                  href={e.href}
                  {...(e.href.startsWith("http")
                    ? { target: "_blank", rel: "noreferrer noopener" }
                    : {})}
                >
                  <span>{e.label}</span>
                  <span className={s.enlaceVal}>
                    {e.valor} <span aria-hidden="true">↗</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <p className={s.cierre}>
            {UI.contactoCierre[0]} <b>{UI.contactoCierre[1]}</b>
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <Formulario />
        </Reveal>
      </div>

      <footer className={`${s.pie} monoSm`}>
        <p>
          © {anio} Kalabs — {SITE.ciudad}, {SITE.pais}
        </p>
        <p>
          Hecho con Next.js · <a href="#indice">Volver arriba ↑</a>
        </p>
      </footer>
    </section>
  );
}
