"use client";

import { useEffect, useState } from "react";
import { INDICE, SITE } from "@/lib/content";
import s from "./Folio.module.css";

/**
 * Folio al pie.
 *
 * Reemplaza al HUD con reloj en vivo y barra de progreso: ese riel de estado
 * es el cliché "retrofuturista" que sale por defecto y no aportaba nada que
 * el visitante necesite. Acá cumple la función de un folio impreso —de qué
 * página estás leyendo— y de paso hace de navegación.
 */
export default function Folio() {
  const [activa, setActiva] = useState(INDICE[0]);

  useEffect(() => {
    const nodos = INDICE.map((i) => document.getElementById(i.id)).filter(
      (n): n is HTMLElement => Boolean(n)
    );
    if (!nodos.length) return;

    const io = new IntersectionObserver(
      (entradas) => {
        const visible = entradas
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const found = INDICE.find((i) => i.id === visible.target.id);
        if (found) setActiva(found);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.01, 0.5, 1] }
    );

    nodos.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  return (
    <nav className={`${s.folio} dato dato--caja`} aria-label="Navegación del sitio">
      <span className={s.pie}>
        {SITE.nombre} — {SITE.ciudad}
      </span>

      <ul className={s.paginas}>
        {INDICE.map((i) => {
          const esActiva = i.id === activa.id;
          return (
            <li key={i.id}>
              <a
                className={`${s.pagina} ${esActiva ? s.paginaActiva : ""}`}
                href={`#${i.id}`}
                aria-current={esActiva ? "true" : undefined}
              >
                {i.label}
              </a>
            </li>
          );
        })}
      </ul>

      <span className={s.numero}>
        <span className="sr">Estás en la página </span>p.&nbsp;{activa.folio}
      </span>
    </nav>
  );
}
