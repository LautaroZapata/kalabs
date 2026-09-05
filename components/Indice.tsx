import Greca from "./Greca";
import { INDICE, MANIFIESTO, SITE, UI } from "@/lib/content";
import s from "./Indice.module.css";

export default function Indice() {
  return (
    <section id="indice" className={s.panel} aria-label="00. Índice">
      {/* riel de canto */}
      <div className={s.rail}>
        <span className={`${s.railText} monoSm`}>{SITE.coords}</span>
        <Greca
          id="greca-rail"
          variant="rombo"
          line="var(--terra-dim)"
          accent="var(--terra-dim)"
          height="100%"
          className={s.railGreca}
        />
        <span className={`${s.railText} monoSm`}>Turno noche</span>
      </div>

      {/* barra superior: el contacto abre el sitio, no lo cierra */}
      <div className={s.head}>
        <p className={`${s.headL} mono`}>
          <b>Kalabs</b> — Estudio digital · {SITE.ciudad}, {SITE.pais}
        </p>
        <a className={s.mail} href={`mailto:${SITE.email}`}>
          {SITE.email}
        </a>
      </div>

      {/* wordmark fracturado */}
      <div className={s.word}>
        <div className={s.slabBordo} aria-hidden="true" />

        {/* tablero tejido: estructura, no adorno */}
        <div className={s.tablero}>
          <div className={s.tableroCaja}>
            <Greca
              id="greca-tablero"
              variant="escalera"
              line="var(--terra-dim)"
              accent="var(--terra-dim)"
              height="100%"
              scale={1.9}
            />
          </div>
          <p className={`${s.tableroPie} monoSm`}>
            <span>
              <b>03</b> servicios
            </span>
            <span>
              <b>03</b> proyectos
            </span>
            <span>Uy / 2025</span>
          </p>
        </div>

        <h1 className={`${s.wordMark} display`}>
          <span className={s.w1}>Ka</span>
          <span className={`${s.w2} outline outline--ember`}>labs</span>
        </h1>
        <p className={`${s.plate} monoSm`}>
          {UI.chapa} <span aria-hidden="true">▚</span> {UI.chapaNota}
        </p>
      </div>

      {/* manifiesto */}
      <div className={s.side}>
        <p className={s.manifiesto}>
          {MANIFIESTO.map((linea) => (
            <span key={linea}>{linea}</span>
          ))}
        </p>
        <p className={`${s.coords} monoSm`}>
          {/* El HUD ya muestra hora y turno: acá alcanza con el lugar y el estado. */}
          <span className="tag">
            <b>UY</b> {SITE.coords}
          </span>
          <span className="tag">
            <b>Estado</b> {UI.estadoDisponible}
          </span>
        </p>
      </div>

      {/* índice = navegación */}
      <nav className={s.foot} aria-label="Índice del sitio">
        {INDICE.map((i) => (
          <a key={i.id} className={s.item} href={`#${i.id}`}>
            <span className={`${s.itemNum} display`}>{i.num}</span>
            <span className={s.itemLabel}>{i.label}</span>
            <span className={`${s.itemNota} monoSm`}>{i.nota}</span>
          </a>
        ))}
      </nav>
    </section>
  );
}
