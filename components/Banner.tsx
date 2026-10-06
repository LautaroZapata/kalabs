import type { CSSProperties } from "react";
import { UI } from "@/lib/content";
import BandaDibujo from "./BandaDibujo";
import s from "./Banner.module.css";

/**
 * La banda con las tres promesas, cruzando el ancho de la pantalla.
 *
 * Antes era una cinta que corría sola en loop. Ahora es una frase quieta: se
 * lee de un vistazo, sin esperar a que pase lo que uno quería terminar de leer.
 *
 * Lo único que se mueve lo mueve el scroll: al bajar, las palabras pasan de
 * apagadas a encendidas una por una. Sin soporte de `animation-timeline` o con
 * movimiento reducido, la frase queda encendida entera desde el principio.
 *
 * Se parte en palabras para que cada una tenga su tramo del recorrido; el
 * lector de pantalla lee la frase entera desde la etiqueta y no palabra por
 * palabra.
 *
 * A la derecha, en escritorio, un dibujo que se arma con el mismo scroll:
 * cada pieza llega a la par de la promesa que ilustra. Es decorado —la frase
 * ya lo dijo—, por eso va oculto para el lector de pantalla y desaparece
 * cuando no entra al costado.
 */
export default function Banner() {
  const palabras = UI.bandaFrase.flatMap(([texto, marcado], tramo) =>
    texto
      .split(/(?<=\s)/)
      .filter(Boolean)
      .map((p) => ({ p, marcado, tramo })),
  );
  const total = palabras.length;
  const frase = UI.bandaFrase.map(([t]) => t).join("");

  /* Dónde cae cada promesa dentro de la frase, en palabras: [primera, última+1]. */
  const promesas = UI.bandaFrase
    .map(([, marcado], tramo) => ({ marcado, tramo }))
    .filter((t) => t.marcado)
    .map(({ tramo }) => {
      const idx = palabras.flatMap((w, i) => (w.tramo === tramo ? [i] : []));
      return [idx[0], idx[idx.length - 1] + 1];
    });

  const [cobra, cierra, horas] = promesas as [number, number][];

  return (
    <div className={s.banner}>
      <div className={`${s.grilla} caja`}>
        <p className={`${s.frase} titular acento`} aria-label={frase}>
          {palabras.map(({ p, marcado }, i) => (
            <span
              key={i}
              aria-hidden="true"
              className={marcado ? `${s.palabra} ${s.marcada}` : s.palabra}
              style={
                { "--desde": i, "--hasta": i + 1, "--n": total } as CSSProperties
              }
            >
              {p}
            </span>
          ))}
        </p>

        <BandaDibujo
          n={total}
          titulo={[0, cobra[0]]}
          tarjeta={cobra}
          lista={cierra}
          globo={horas}
        />
      </div>
    </div>
  );
}
