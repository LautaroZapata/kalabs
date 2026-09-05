import Greca from "./Greca";
import Formulario from "./Formulario";
import { ENLACES, SITE, UI } from "@/lib/content";
import s from "./Senal.module.css";

const PALABRAS = UI.marquesina;

function Track({ ariaHidden }: { ariaHidden?: boolean }) {
  return (
    <div className={s.track} aria-hidden={ariaHidden ? "true" : undefined}>
      {PALABRAS.map((p) => (
        <span key={p}>
          {p} <span aria-hidden="true">▚</span>
        </span>
      ))}
    </div>
  );
}

export default function Senal() {
  const anio = new Date().getFullYear();

  return (
    <section id="senal" className={s.wrap} aria-labelledby="senal-t">
      <h2 id="senal-t" className="sr">
        04. Señal — contacto
      </h2>

      {/* marquesina: dos copias idénticas, la segunda oculta al lector de pantalla */}
      <div className={s.marquee}>
        <Track />
        <Track ariaHidden />
      </div>

      <div className={s.body}>
        <div className={s.col}>
          <p className={`${s.kicker} mono`}>{UI.senalKicker}</p>
          <a className={s.mailto} href={`mailto:${SITE.email}`}>
            <span className={s.mailtoA}>{SITE.email.split("@")[0]}@</span>
            <span className={s.mailtoB}>{SITE.email.split("@")[1]}</span>
          </a>

          <ul className={s.enlaces}>
            {ENLACES.map((e) => (
              <li key={e.label}>
                <a
                  className={`${s.enlace} mono`}
                  href={e.href}
                  {...(e.href.startsWith("http")
                    ? { target: "_blank", rel: "noreferrer noopener" }
                    : {})}
                >
                  <span>{e.label}</span>
                  <span className={s.enlaceVal}>
                    {e.valor} <span aria-hidden="true">↗</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <p className={s.cierre}>
            {UI.senalCierre[0]} <b>{UI.senalCierre[1]}</b>
          </p>
        </div>

        <Formulario />
      </div>

      <Greca
        id="greca-junta-senal"
        variant="escalera"
        line="var(--terra-dim)"
        accent="var(--terra)"
        height={16}
        className={s.junta}
      />

      <footer className={`${s.pie} monoSm`}>
        <p>
          © {anio} Kalabs — {SITE.ciudad}, {SITE.pais}
        </p>
        <p>
          Hecho con Next.js ·{" "}
          <a href="#indice">Volver al índice ↑</a>
        </p>
      </footer>
    </section>
  );
}
