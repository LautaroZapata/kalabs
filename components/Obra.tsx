"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { PROYECTOS, UI } from "@/lib/content";
import s from "./Obra.module.css";

/**
 * La obra: una pila de cartas.
 *
 * Una carta por proyecto. Al bajar, cada una se pega arriba y la siguiente
 * sube y la tapa; la de abajo se achica y se apaga, como fichas que se apilan
 * sobre la mesa. El orden de lectura lo pone el scroll de quien lee, nunca un
 * reloj: antes había un pase automático, y una imagen que cambia sola es
 * exactamente lo que el sitio se prohíbe.
 *
 * Cada carta muestra el proyecto en las dos pantallas en que se usa: la
 * captura de escritorio sale por el borde de la carta y la del celular va
 * adelante. Al entrar, las dos suben a velocidades distintas —el celular más
 * rápido, porque está más cerca— y eso es toda la profundidad que hace falta.
 *
 * Todo el movimiento es CSS atado al scroll (`animation-timeline`), que corre
 * en el compositor y no se atrasa ni en el celular. Donde no hay soporte
 * —Firefox, al día de hoy— este componente calcula sólo el hundimiento de la
 * pila con un listener; la entrada queda quieta, que es una forma digna de
 * llegar. Con movimiento reducido no se mueve nada: la pila se apila igual,
 * porque eso es maquetación, no animación.
 */

const TONOS = ["brasa", "tinta", "hueso"] as const;

export default function Obra() {
  const lista = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const ol = lista.current;
    if (!ol) return;
    if (CSS.supports("animation-timeline: view()")) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cartas = Array.from(ol.querySelectorAll<HTMLElement>("[data-carta]"));
    const total = cartas.length;
    let cuadro = 0;

    function medir() {
      cuadro = 0;
      for (let i = 0; i < total - 1; i++) {
        const actual = cartas[i].getBoundingClientRect();
        const sigue = cartas[i + 1].getBoundingClientRect();
        /* Cuánto de la carta ya tapó la siguiente: 0 cuando recién la toca
           por abajo, 1 cuando llegó a su lugar en la pila. */
        const p = Math.min(1, Math.max(0, 1 - (sigue.top - actual.top) / actual.height));
        /* Los mismos valores que la animación de CSS: ver `.carta`. */
        cartas[i].style.scale = String(1 - p * (total - i) * 0.035);
        cartas[i].style.setProperty("--apagado", (p * 0.45).toFixed(3));
      }
    }

    function alScroll() {
      if (!cuadro) cuadro = requestAnimationFrame(medir);
    }

    medir();
    addEventListener("scroll", alScroll, { passive: true });
    addEventListener("resize", alScroll);
    return () => {
      removeEventListener("scroll", alScroll);
      removeEventListener("resize", alScroll);
      cancelAnimationFrame(cuadro);
    };
  }, []);

  return (
    <section id="obra" className={s.obra} aria-labelledby="obra-t">
      <h2 className="sr" id="obra-t">
        Obra
      </h2>

      <ol
        className={s.pila}
        ref={lista}
        style={{ "--total": PROYECTOS.length } as React.CSSProperties}
      >
        {PROYECTOS.map((p, i) => (
          <li
            key={p.num}
            className={s.lugar}
            style={{ "--i": i } as React.CSSProperties}
          >
            <article
              className={s.carta}
              data-carta
              data-tono={TONOS[i % TONOS.length]}
            >
              <div className={s.texto}>
                <h3 className={`${s.nombre} titular acento`}>
                  {p.nombreLargo ?? p.nombre}
                </h3>
                <p className={`${s.pitch} titular titular--sec`}>{p.pitch}</p>
                <p className={`${s.detalle} parrafo`}>{p.detalle}</p>

                {/* El número y el rubro van al pie, nunca arriba del nombre:
                    el nombre arranca solo. */}
                <div className={s.pie}>
                  <a
                    className={`${s.enlace} pastilla`}
                    href={p.href}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {p.sitio}
                    <span aria-hidden="true">↗</span>
                  </a>
                  <span className={`${s.rubro} et`}>{p.rubro}</span>
                  <span className={s.num}>
                    {p.num} / {String(PROYECTOS.length).padStart(2, "0")}
                  </span>
                </div>
              </div>

              {/* La escena enlaza al sitio también, pero fuera del orden de
                  tabulación: el enlace de texto ya lo nombra. */}
              <a
                className={s.escena}
                href={p.href}
                target="_blank"
                rel="noreferrer noopener"
                tabIndex={-1}
                aria-hidden="true"
              >
                <span className={s.ventana}>
                  <Image
                    src={p.imagen}
                    alt=""
                    fill
                    quality={90}
                    className={s.img}
                    sizes="(min-width: 861px) 62vw, 92vw"
                    priority={i === 0}
                  />
                </span>
                <span className={s.telefono}>
                  <Image
                    src={p.imagenMovil}
                    alt=""
                    fill
                    quality={90}
                    className={s.img}
                    sizes="(min-width: 861px) 240px, 44vw"
                    priority={i === 0}
                  />
                </span>
              </a>
              <span className="sr">{p.imagenAlt}</span>

              <span className={s.sombra} aria-hidden="true" />
            </article>
          </li>
        ))}
      </ol>

      <a className={s.cierre} href="#contacto">
        <span className={`${s.cierreTitulo} titular acento`}>
          {UI.proyectosCierreTitulo}
        </span>
        <span className="pastilla pastilla--brasa">
          {UI.proyectosCierreAccion}
        </span>
      </a>
    </section>
  );
}
