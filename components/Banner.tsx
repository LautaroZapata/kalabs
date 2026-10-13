import type { CSSProperties } from "react";
import { UI } from "@/lib/content";
import { ALTO, ANCHO, dibujo } from "./escritorio/geometria";
import s from "./Banner.module.css";

/* Se arma una vez, en el servidor: el cliente recibe el SVG terminado. */
const ESCRITORIO = dibujo();

/**
 * La banda que parte la página: las tres promesas y el escritorio del estudio,
 * donde se construye un sitio a la par de ellas.
 *
 * Es una sola ficha partida en dos. A la izquierda, la mesa con el monitor y
 * el servidor; a la derecha, la promesa del tramo —la entrada chica y la
 * promesa grande— y debajo un riel con tres paradas que marca por cuál va.
 *
 * La sección es alta y la ficha queda pegada a la pantalla mientras se baja.
 * Cada tramo del recorrido cambia la frase y avanza el sitio del monitor: el
 * boceto con «no se cobra», la estructura con «se cierra antes de empezar» y
 * el sitio terminado con «en 24 horas». Con cada uno se prende una luz del
 * servidor.
 *
 * Todo lo mueve el scroll, con `animation-timeline`; nada corre solo. Sin
 * soporte o con movimiento reducido, la sección mide lo que su contenido, el
 * sitio queda terminado y las tres frases se leen una debajo de la otra.
 */
export default function Banner() {
  const total = UI.promesas.length;

  return (
    <section className={s.banner} aria-label="Cómo trabajamos">
      <div className={s.pegado}>
        <div className="caja">
          <div className={s.ficha}>
            <figure className={s.lamina}>
              <svg
                className={s.dibujo}
                viewBox={`0 0 ${ANCHO} ${ALTO}`}
                role="img"
                aria-label={UI.escritorio.descripcion}
                dangerouslySetInnerHTML={{ __html: ESCRITORIO }}
              />
            </figure>

            <div className={s.texto}>
              <ol className={s.promesas}>
                {UI.promesas.map(([antes, marcado, despues], i) => (
                  <li key={i} className={s.promesa} data-tramo={i}>
                    {/* Dos tamaños: la entrada chica y la promesa grande. Cada
                        línea va en su máscara, por donde sube al cambiar. */}
                    <span className={s.linea}>
                      <span className={s.antes}>{antes}</span>
                    </span>
                    <span className={s.linea}>
                      <span className={`${s.grande} titular`}>
                        <span className={s.marcada}>{marcado}</span>
                        {despues}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>

              {/* El riel: tres paradas y el trecho recorrido. Repite lo que la
                  frase ya dice, así que el lector de pantalla no lo lee. */}
              <div className={s.riel} aria-hidden="true">
                <span className={s.cuenta}>
                  {UI.promesas.map((_, i) => (
                    <span key={i} className={s.cuentaTramo} data-tramo={i}>
                      {i + 1}
                    </span>
                  ))}
                  <span className={s.cuentaTotal}>
                    {" "}
                    {UI.escritorio.de} {total}
                  </span>
                </span>
                <span className={s.via}>
                  <span className={s.avance} />
                  {UI.promesas.map((_, i) => (
                    <span
                      key={i}
                      className={s.parada}
                      data-tramo={i}
                      style={{ "--en": i / (total - 1) } as CSSProperties}
                    />
                  ))}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
