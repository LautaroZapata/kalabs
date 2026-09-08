"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import { PROYECTOS, UI } from "@/lib/content";
import s from "./Obra.module.css";

/**
 * La obra, en dos tiempos.
 *
 * Arriba, la escena: un plano de brasa con la inicial del estudio de fondo y
 * un proyecto por vez, grande, rotando solo. Antes los tres proyectos eran
 * tres capturas de 400px en fila; ninguna se leía y ninguna probaba nada.
 *
 * Abajo, el índice: las cuatro filas —los tres en producción más el que
 * todavía no existe— para ir directo a uno. Con mouse, la captura del proyecto
 * sigue al cursor; ahí la escena de arriba ya mostró de qué se trata, así que
 * el índice puede ser sólo nombres.
 *
 * El pase se pausa solo si el sistema pide movimiento reducido, y hay botón
 * para pararlo a mano: una imagen que cambia sola y no se puede detener es
 * exactamente lo que pide que se apague.
 */

const PASO = 5200;

export default function Obra() {
  const [activo, setActivo] = useState(0);
  const [andando, setAndando] = useState(true);
  /* Qué fila está bajo el cursor, o null. Es lo que decide qué captura muestra
     el espía; la posición no pasa por React —ver más abajo—. */
  const [espiado, setEspiado] = useState<number | null>(null);
  const espia = useRef<HTMLDivElement>(null);

  /* Movimiento reducido: arranca pausado. */
  useEffect(() => {
    const consulta = matchMedia("(prefers-reduced-motion: reduce)");
    if (consulta.matches) setAndando(false);
  }, []);

  useEffect(() => {
    if (!andando) return;
    const reloj = setInterval(
      () => setActivo((n) => (n + 1) % PROYECTOS.length),
      PASO,
    );
    return () => clearInterval(reloj);
  }, [andando]);

  /* La posición del espía se escribe directo en el nodo. Con estado sería un
     render de React por cada pixel que se mueve el mouse. */
  function seguir(e: React.PointerEvent) {
    const nodo = espia.current;
    if (!nodo) return;
    nodo.style.translate = `${e.clientX}px ${e.clientY}px`;
  }

  return (
    <section id="obra" className={s.obra} aria-labelledby="obra-t">
      <h2 className="sr" id="obra-t">
        Obra
      </h2>

      {/* ---------------- la escena ---------------- */}
      <div className={s.escena}>
        <span className={s.letra} aria-hidden="true">
          {"K"}
        </span>

        <div className={s.marco}>
          {PROYECTOS.map((p, i) => (
            <figure
              key={p.num}
              className={s.diapo}
              data-activa={i === activo ? "true" : undefined}
              aria-hidden={i === activo ? undefined : "true"}
            >
              <Image
                src={p.imagen}
                alt={p.imagenAlt}
                fill
                className={s.captura}
                sizes="(min-width: 1000px) 900px, 100vw"
                priority={i === 0}
              />
              <figcaption className={s.pie}>
                {/* Acá el nombre corto: al lado de la captura, «ROG» alcanza.
                    El largo va en el índice, que es donde alguien lo busca. */}
                <span className={s.pieNombre}>
                  {p.nombre} — {p.rubro.toLowerCase()}
                </span>
                <span className={`${s.pieSitio} et`}>{p.sitio}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className={s.mando}>
          <button
            className={s.boton}
            type="button"
            onClick={() => setAndando((a) => !a)}
          >
            <span className="sr">{andando ? UI.obraPausar : UI.obraSeguir}</span>
            <span aria-hidden="true">{andando ? "❚❚" : "▶"}</span>
          </button>

          <div className={s.puntos}>
            {PROYECTOS.map((p, i) => (
              <button
                key={p.num}
                className={s.punto}
                type="button"
                data-activo={i === activo ? "true" : undefined}
                aria-current={i === activo ? "true" : undefined}
                onClick={() => {
                  setActivo(i);
                  setAndando(false);
                }}
              >
                <span className="sr">{UI.obraIr(p.nombre)}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ---------------- el índice ---------------- */}
      <div className={s.indice}>
        <p className={`${s.rotulo} et`}>{UI.obraRotulo}</p>

        <div className={s.lista}>
          {PROYECTOS.map((p, i) => (
            <Reveal key={p.num} as="div" delay={i * 0.04}>
              <a
                className={s.fila}
                href={p.href}
                target="_blank"
                rel="noreferrer noopener"
                onPointerEnter={(e) => {
                  if (e.pointerType === "mouse") setEspiado(i);
                }}
                onPointerLeave={() => setEspiado(null)}
                onPointerMove={seguir}
              >
                <span className={s.num}>{p.num.padStart(3, "0")}</span>
                <span className={`${s.nombre} titular`}>
                  {p.nombreLargo ?? p.nombre}
                </span>
                <span className={s.meta}>
                  <span className={`${s.etiqueta} et`}>{p.estado}</span>
                  <span className="et">{p.rubro}</span>
                </span>
              </a>
            </Reveal>
          ))}

          {/* La cuarta fila no es un proyecto: es la invitación, escrita con la
              misma tipografía y en el mismo renglón que los tres que sí
              existen. Dicho aparte, en un bloque de cierre, se lee como aviso;
              dicho acá, se lee como el que sigue. */}
          <Reveal as="div" delay={0.12}>
            <a className={s.fila} href="#contacto">
              <span className={s.num}>004</span>
              <span className={`${s.nombre} titular`}>
                {UI.proyectosCierreTitulo}
              </span>
              <span className={s.meta}>
                <span className={`${s.etiqueta} et`}>
                  {UI.proyectosCierreEstado}
                </span>
                <span className="et">{UI.proyectosCierreAccion}</span>
              </span>
            </a>
          </Reveal>
        </div>
      </div>

      {/* El espía: la captura que sigue al cursor. Está fuera del flujo y no se
          toca; con dedo no aparece —no hay dónde apoyar un cursor—. */}
      <div
        className={s.espia}
        ref={espia}
        data-visible={espiado !== null ? "true" : undefined}
        aria-hidden="true"
      >
        {PROYECTOS.map((p, i) => (
          <Image
            key={p.num}
            src={p.imagen}
            alt=""
            fill
            className={s.espiaImg}
            data-activa={i === espiado ? "true" : undefined}
            sizes="280px"
          />
        ))}
      </div>
    </section>
  );
}
