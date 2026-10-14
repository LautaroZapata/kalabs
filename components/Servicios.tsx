"use client";

import { useRef, useState } from "react";
import Lamina from "./Lamina";
import Reveal from "./Reveal";
import { SERVICIOS, UI } from "@/lib/content";
import s from "./Servicios.module.css";

/**
 * Servicios: una ventana de navegador.
 *
 * La misma pantalla encendida del monitor del banner, ahora a tamaño real:
 * vidrio petróleo, las tres luces arriba a la izquierda y los tres servicios
 * como pestañas. La barra de dirección cambia con la pestaña elegida, y
 * adentro está el dibujo grande del servicio, su cuerpo y sus entregables.
 * Es la interfaz misma, no una ilustración de una.
 *
 * Las pestañas son pestañas de verdad —flechas para moverse, Home y End para
 * los extremos— y los tres paneles se renderizan siempre: el que no está
 * elegido va con `hidden`, así el texto de los tres está en el HTML para quien
 * llegue sin JavaScript y para quien lo lea con un buscador.
 */

/* "Sistemas a medida" → "sistemas-a-medida", para la barra de dirección. */
function ruta(titulo: string) {
  return titulo
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");
}

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
      <h2 id="servicios-t" className={`${s.titulo} titular`}>
        {UI.serviciosTitulo}
      </h2>

      <Reveal>
        <div className={s.ventana}>
          <div className={s.barra}>
            <span className={s.luces} aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <div
              className={s.pestanas}
              role="tablist"
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
                  /* Un tablist es una sola parada de tabulador: adentro se
                     mueve con las flechas, no tabulando tres veces. */
                  tabIndex={i === activo ? 0 : -1}
                  ref={(nodo) => {
                    tabs.current[i] = nodo;
                  }}
                  className={s.pestana}
                  onClick={() => setActivo(i)}
                  onKeyDown={(e) => teclas(e, i)}
                >
                  <span className={s.favicon} aria-hidden="true" />
                  {serv.titulo}
                </button>
              ))}
            </div>
          </div>

          {/* La dirección repite la pestaña: decorativa para el lector. */}
          <p className={s.direccion} aria-hidden="true">
            kalabs.dev/servicios/<b>{ruta(SERVICIOS[activo].titulo)}</b>
          </p>

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
              <div className={s.textoPanel}>
                <p className={`${s.cuerpo} parrafo`}>{serv.cuerpo}</p>
                <p className="sr">{UI.serviciosEntregables}:</p>
                <ul className={s.entregables}>
                  {serv.entregables.map((e) => (
                    <li key={e} className={`${s.entregable} et`}>
                      {e}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
