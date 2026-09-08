import { UI } from "@/lib/content";
import s from "./Banner.module.css";

/**
 * La cinta con las tres promesas, cruzando el ancho de la pantalla.
 *
 * Se frena al pasarle el mouse por encima: una cinta que no para no se puede
 * leer, y lo que dice —consulta sin costo, presupuesto cerrado, 24 horas— es
 * justamente lo que alguien quiere terminar de leer.
 *
 * Las tandas van dos veces y la segunda está oculta al lector de pantalla: es
 * la copia que hace que el bucle no muestre el corte, no contenido nuevo.
 */
export default function Banner() {
  return (
    <div className={s.banner}>
      <div className={s.pista}>
        {[0, 1].map((tanda) => (
          <ul
            key={tanda}
            className={s.tanda}
            aria-hidden={tanda === 1 ? "true" : undefined}
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
