"use client";

import { useRef, useState } from "react";
import Lamina from "./Lamina";
import Reveal from "./Reveal";
import { SERVICIOS, UI } from "@/lib/content";
import s from "./Servicios.module.css";

/**
 * Servicios: el mostrador.
 *
 * Un solo plano de tinta del ancho de la caja y del alto de una pantalla. A la
 * izquierda los tres nombres en tamaño de titular, siempre los tres; a la
 * derecha, el elegido: su dibujo, su cuerpo y sus entregables.
 *
 * Antes eran tres fichas que se abrían. Funcionaban, pero plegadas ocupaban
 * tres renglones y se pasaban de largo: la sección donde se dice qué hacemos
 * medía menos que cualquier otra de la página. Es el mismo trato de uno por
 * vez, sin plegar nada —la sección mide siempre lo mismo, esté elegido el que
 * esté— y con los nombres enormes de entrada.
 *
 * El plano es tinta y no brasa a propósito: la brasa ya es el plano de la
 * obra, y dos planos naranjas en la misma página compiten en vez de repartirse
 * el trabajo.
 *
 * Los tres nombres son pestañas de verdad —flechas para moverse, Home y End
 * para los extremos— y los tres paneles se renderizan siempre: el que no está
 * elegido va con `hidden`, así el texto de los tres está en el HTML para quien
 * llegue sin JavaScript y para quien lo lea con un buscador.
 */

const TECLAS: Record<string, number> = {
  ArrowRight: 1,
  ArrowDown: 1,
  ArrowLeft: -1,
  ArrowUp: -1,
};

export default function Servicios() {
  const [activo, setActivo] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  function mover(i: number) {
    setActivo(i);
    tabs.current[i]?.focus();
  }

  function teclas(e: React.KeyboardEvent, i: number) {
    const salto = TECLAS[e.key];

    if (salto) {
      e.preventDefault();
      mover((i + salto + SERVICIOS.length) % SERVICIOS.length);
    } else if (e.key === "Home") {
      e.preventDefault();
      mover(0);
    } else if (e.key === "End") {
      e.preventDefault();
      mover(SERVICIOS.length - 1);
    }
  }

  return (
    <section id="servicios" className={s.servicios} aria-labelledby="servicios-t">
      <p className={`${s.rotulo} et`}>{UI.serviciosAntetitulo}</p>
      <h2 id="servicios-t" className={`${s.titulo} titular`}>
        {UI.serviciosTitulo}
      </h2>

      <Reveal>
        <div className={s.mostrador}>
          <div
            className={s.lista}
            role="tablist"
            aria-orientation="vertical"
            aria-label={UI.serviciosLista}
          >
            {SERVICIOS.map((serv, i) => (
              <button
                key={serv.num}
                type="button"
                role="tab"
                id={`serv-t-${serv.num}`}
                aria-controls={`serv-p-${serv.num}`}
                aria-selected={i === activo}
                /* Un tablist es una sola parada de tabulador: adentro se mueve
                   con las flechas, no tabulando tres veces. */
                tabIndex={i === activo ? 0 : -1}
                ref={(nodo) => {
                  tabs.current[i] = nodo;
                }}
                className={s.nombre}
                onClick={() => setActivo(i)}
                /* Con el mouse alcanza con pasar por encima: es una vidriera,
                   no un formulario. Con el dedo no pasa nada hasta el toque,
                   que ya es el click. */
                onPointerEnter={(e) => {
                  if (e.pointerType === "mouse") setActivo(i);
                }}
                onKeyDown={(e) => teclas(e, i)}
              >
                {serv.titulo}
              </button>
            ))}
          </div>

          {SERVICIOS.map((serv, i) => (
            <div
              key={serv.num}
              role="tabpanel"
              id={`serv-p-${serv.num}`}
              aria-labelledby={`serv-t-${serv.num}`}
              className={s.panel}
              tabIndex={0}
              hidden={i !== activo}
            >
              <Lamina serv={serv} />
              <p className={`${s.cuerpo} parrafo`}>{serv.cuerpo}</p>
              <p className="sr">{UI.serviciosEntregables}:</p>
              <ul className={s.entregables}>
                {serv.entregables.map((e) => (
                  <li key={e} className={`${s.entregable} et`}>
                    {e}
                  </li>
                ))}
              </ul>

              {/* La puerta a la página del servicio. Los tres paneles se
                  renderizan siempre —el que no está elegido va con `hidden`—,
                  así que los tres enlaces están en el HTML y un buscador los
                  encuentra sin tener que apretar una pestaña. */}
              <a
                className={`${s.mas} pastilla pastilla--brasa`}
                href={`/servicios/${serv.slug}`}
              >
                {UI.verServicio(serv.titulo)} →
              </a>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
