import Image from "next/image";
import type { CSSProperties } from "react";
import { UI } from "@/lib/content";
import Pantalla from "./Pantalla";
import s from "./Banner.module.css";

/**
 * La banda que parte la página: las tres promesas y el puesto de trabajo del
 * estudio, de noche, donde se construye un sitio a la par de ellas.
 *
 * Es una sola ficha partida en dos. A la izquierda, la foto del escritorio
 * con el monitor encendido; a la derecha, la promesa del tramo —la entrada
 * chica y la promesa grande— y debajo un riel con tres paradas.
 *
 * La foto sale del lab (revelada como el héroe) y la pantalla es SVG encima,
 * calzada al vidrio del monitor: así lo que se construye es software de
 * verdad y no un dibujo. Cada tramo avanza el sitio —el boceto con «no se
 * cobra», la estructura con «se cierra antes de empezar» y la portada
 * terminada con «en 24 horas»— y prende una luz de estado.
 *
 * Todo lo mueve el scroll, con `animation-timeline`; nada corre solo. Sin
 * soporte o con movimiento reducido, la sección mide lo que su contenido, la
 * portada queda terminada y las tres frases se leen una debajo de la otra.
 */
export default function Banner() {
  const total = UI.promesas.length;

  return (
    <section className={s.banner} aria-label="Cómo trabajamos">
      <div className={s.pegado}>
        <div className={s.caja}>
          <div className={s.ficha}>
            <figure className={s.lamina}>
              <div className={s.escena}>
                <Image
                  className={s.foto}
                  src="/banner/puesto.jpg"
                  alt={UI.puesto.descripcion}
                  fill
                  sizes="(min-width: 1001px) 60vw, 100vw"
                  quality={85}
                />
                <Pantalla />
              </div>
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
                    {UI.puesto.de} {total}
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
