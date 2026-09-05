import Greca from "./Greca";
import { SERVICIOS } from "@/lib/content";
import s from "./Oficio.module.css";

/* Cada fila trae su propia junta: distinta trama, distinta altura. */
const JUNTAS = [
  { variant: "trama", height: 10, scale: 1, line: "var(--terra-dim)", accent: "var(--ink-3)" },
  { variant: "zigzag", height: 18, scale: 1.1, line: "var(--teal)", accent: "var(--amber)" },
  { variant: "rombo", height: 26, scale: 1.05, line: "var(--terra)", accent: "var(--ember)" },
] as const;

export default function Oficio() {
  return (
    <section id="oficio" className={s.wrap} aria-labelledby="oficio-t">
      <div className={s.head}>
        <h2 id="oficio-t" className={s.title}>
          Oficio
        </h2>
        <p className={s.lead}>
          02 — Tres formas de resolver lo mismo: que un negocio chico deje de perder plata y
          tiempo en algo que una máquina puede hacer sola.
        </p>
      </div>

      {SERVICIOS.map((serv, i) => {
        const j = JUNTAS[i];
        return (
          <div key={serv.num}>
            <Greca
              id={`greca-oficio-${serv.num}`}
              variant={j.variant}
              line={j.line}
              accent={j.accent}
              height={j.height}
              scale={j.scale}
              className={s.junta}
            />

            <article className={`${s.row} ${s[`row${i + 1}`]}`}>
              <div className={s.numCell}>
                <span className={s.num} aria-hidden="true">
                  {serv.num}
                </span>
              </div>

              <div className={s.content}>
                <h3 className={s.servTitle}>{serv.titulo}</h3>
                <p className={s.bajada}>{serv.bajada}</p>
                <p className={s.cuerpo}>{serv.cuerpo}</p>

                <ul className={`${s.entregables} monoSm`}>
                  {serv.entregables.map((e) => (
                    <li key={e}>
                      <span aria-hidden="true">▚</span>
                      {e}
                    </li>
                  ))}
                </ul>
              </div>

              {/* tercera columna: sólo existe en la fila 03 */}
              {i === 2 && (
                <div className={s.panel}>
                  <Greca
                    id="greca-panel-oficio"
                    variant="rombo"
                    line="var(--terra-dim)"
                    accent="var(--teal-dim)"
                    height="100%"
                    scale={1.6}
                  />
                </div>
              )}
            </article>
          </div>
        );
      })}
    </section>
  );
}
