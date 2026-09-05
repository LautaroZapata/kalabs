import Greca from "./Greca";
import { EQUIPO, SITE, UI } from "@/lib/content";
import s from "./Taller.module.css";

export default function Taller() {
  return (
    <section id="taller" className={s.wrap} aria-labelledby="taller-t">
      <Greca
        id="greca-taller-fondo"
        variant="trama"
        line="var(--ink-3)"
        accent="var(--ink)"
        height="100%"
        scale={3}
        className={s.fondo}
      />

      <div className={s.head}>
        <p className={`${s.kicker} mono`}>{UI.tallerKicker}</p>
        <h2 id="taller-t" className={s.title}>
          Taller
        </h2>
      </div>

      <div className={s.mesa}>
        <blockquote className={`${s.pieza} ${s.cita}`}>
          <p className={s.citaTexto}>{UI.citaTaller}</p>
          <p className={`${s.citaPie} monoSm`}>
            Kalabs — {SITE.ciudad}, {SITE.pais} · Turno {SITE.turno}
          </p>
        </blockquote>

        {EQUIPO.map((p, i) => (
          <article
            key={p.nombre}
            className={`${s.pieza} ${s.ficha} ${i === 1 ? s.ficha2 : ""}`}
          >
            <div className={s.fichaTop}>
              <h3 className={s.nombre}>{p.nombre}</h3>
              <span
                className={`${s.chip} ${p.estado === "confirmado" ? s.chipOk : s.chipPend} monoSm`}
              >
                <span aria-hidden="true">{p.estado === "confirmado" ? "●" : "◐"}</span>
                {p.tag}
                {p.estado === "pendiente" ? " · a confirmar" : ""}
              </span>
            </div>
            <p className={`${s.rol} monoSm`}>{p.rol}</p>
            <p className={s.bio}>{p.bio}</p>
          </article>
        ))}
        <div className={`${s.pieza} ${s.telar}`} aria-hidden="true">
          <Greca
            id="greca-telar"
            variant="rombo"
            line="var(--terra)"
            accent="var(--teal-dim)"
            height="100%"
            scale={1.35}
          />
        </div>
      </div>

      <p className={`${s.sello} monoSm`} aria-hidden="true">
        {UI.sello}
      </p>
    </section>
  );
}
