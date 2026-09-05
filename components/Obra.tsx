import Greca from "./Greca";
import { PROYECTOS } from "@/lib/content";
import s from "./Obra.module.css";

export default function Obra() {
  return (
    <section id="obra" className={s.wrap} aria-labelledby="obra-t">
      <div className={s.head}>
        <h2 id="obra-t" className={s.title}>
          Obra{" "}
          <em>hecha</em>
        </h2>
        <div>
          <p className="mono" style={{ color: "var(--bone-dim)", marginBottom: "0.6rem" }}>
            01 — Tres cosas que existen y andan
          </p>
          <p className={`${s.hint} monoSm`}>
            <span aria-hidden="true">↔</span> Arrastrá el riel
          </p>
        </div>
      </div>

      {/* El riel es foco de teclado para poder recorrerlo sin mouse. */}
      <div
        className={s.rail}
        role="region"
        aria-label="Proyectos, desplazamiento horizontal"
        tabIndex={0}
      >
        {PROYECTOS.map((p) => (
          <article
            key={p.num}
            className={`${s.card} ${s[`card--${p.ancho}`]} ${s[`card--off${p.offset}`]}`}
          >
            <span className={`${s.num} display`} aria-hidden="true">
              {p.num}
            </span>

            <div className={s.spine}>
              <Greca
                id={`greca-spine-${p.num}`}
                variant="escalera"
                line="var(--terra-dim)"
                accent="var(--teal-dim)"
                height="100%"
                scale={1.6}
              />
            </div>

            <div className={s.body}>
              <h3 className={s.nombre}>{p.nombre}</h3>
              {p.nombreLargo && <p className={`${s.largo} monoSm`}>{p.nombreLargo}</p>}
              <p className={s.pitch}>{p.pitch}</p>
              <p className={s.detalle}>{p.detalle}</p>

              <div className={s.meta}>
                <span className={`${s.estado} monoSm`}>
                  <span aria-hidden="true">●</span> {p.estado}
                </span>
                <span className={`${s.stack} monoSm`}>{p.stack.join(" / ")}</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* junta tejida entre secciones */}
      <Greca
        id="greca-junta-obra"
        variant="zigzag"
        line="var(--terra)"
        accent="var(--ember)"
        height={22}
        scale={1.4}
        className={s.junta}
      />
    </section>
  );
}
