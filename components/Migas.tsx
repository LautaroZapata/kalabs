import type { Miga } from "@/lib/seo";
import { UI } from "@/lib/content";
import s from "./Sub.module.css";

/**
 * El rastro de migas, visible.
 *
 * El `BreadcrumbList` de datos estructurados que arma `lib/seo.ts` sólo cuenta
 * si lo que declara está también en la página: Google no premia un rastro que
 * existe únicamente en el JSON. Acá está el que se ve; el otro lo repite.
 *
 * El último tramo no es un enlace —ya estás ahí— y lo marca `aria-current`.
 */
export default function Migas({ camino }: { camino: Miga[] }) {
  return (
    <nav className={s.migas} aria-label={UI.migasNombre}>
      <ol className={s.migasLista}>
        {camino.map((m, i) => {
          const ultima = i === camino.length - 1;

          return (
            <li key={m.camino} className={`${s.miga} et`}>
              {ultima ? (
                <span aria-current="page">{m.nombre}</span>
              ) : (
                <a href={m.camino}>{m.nombre}</a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
