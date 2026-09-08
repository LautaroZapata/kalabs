"use client";

import { motion, useReducedMotion } from "motion/react";
import s from "./Cabezal.module.css";

/**
 * Cabezal de sección: antetítulo y título.
 *
 * Lo comparten las tres secciones interiores para que el sitio se lea como
 * una sola pieza y no como tres partes diseñadas por separado.
 *
 * No lleva bajada. Las que había —"Tres áreas de trabajo…", "Contanos qué
 * necesitás…"— repetían lo que ya dice el título o lo que el contenido de
 * abajo dice mejor: eran una línea puesta para llenar el hueco.
 *
 * El filete de arriba no está: se dibuja. Al entrar la sección cruza la
 * pantalla de izquierda a derecha, como la regla que se tira antes de
 * componer una página. Es el mismo gesto que hace la caja de composición de
 * la portada, y es lo que ata las dos puntas del sitio.
 */
export default function Cabezal({
  antetitulo,
  titulo,
  id,
}: {
  antetitulo: string;
  titulo: string;
  id: string;
}) {
  const quieto = useReducedMotion();

  return (
    <header className={s.cabezal}>
      <motion.div
        className={s.filete}
        aria-hidden="true"
        initial={quieto ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-5% 0px -10% 0px" }}
        transition={quieto ? { duration: 0 } : { duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      />
      <p className={`${s.antetitulo} dato dato--caja`}>{antetitulo}</p>
      <h2 id={id} className={`${s.titulo} titular`}>
        {titulo}
      </h2>
    </header>
  );
}
