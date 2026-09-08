import { UI } from "@/lib/content";
import s from "./Banner.module.css";

/**
 * La cinta con las tres promesas, cruzando el ancho de la pantalla.
 *
 * Se frena al pasarle el mouse por encima: una cinta que no para no se puede
 * leer, y lo que dice —consulta sin costo, presupuesto cerrado, 24 horas— es
 * justamente lo que alguien quiere terminar de leer.
 *
 * Las tandas van cuatro veces y sólo la primera la lee un lector de pantalla:
 * las otras son copias para que el bucle no muestre el corte, no contenido
 * nuevo.
 *
 * **Cuántas copias**: el bucle salta hacia atrás una copia entera, así que en
 * ese instante las que quedan tienen que seguir tapando la pantalla. Con dos
 * copias quedaba una sola —1148px— y arriba de esa ancho aparecía el hueco: a
 * 1920 se veía casi la mitad de la banda vacía antes del salto. Con cuatro
 * quedan tres, 3444px, que cubre hasta un monitor ultrapanorámico.
 *
 * Si algún día cambian las frases, la regla es: `(copias - 1) × ancho de una
 * copia` tiene que ser mayor que la pantalla más ancha que se quiera soportar.
 */
export default function Banner() {
  return (
    <div className={s.banner}>
      <div className={s.pista}>
        {[0, 1, 2, 3].map((tanda) => (
          <ul
            key={tanda}
            className={s.tanda}
            aria-hidden={tanda > 0 ? "true" : undefined}
          >
            {UI.banner.map((frase) => (
              <li key={frase} className={s.frase}>
                {frase}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
