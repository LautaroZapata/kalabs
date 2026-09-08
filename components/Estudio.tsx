import Marca from "./Marca";
import Reveal from "./Reveal";
import { EQUIPO, SITE, UI } from "@/lib/content";
import s from "./Estudio.module.css";

/**
 * Quiénes somos: dos personas, con lo que hace cada una y el enlace al
 * LinkedIn. Sin biografías —lo que hace dice más que el cargo, y quien quiera
 * más entra al perfil— y con las iniciales en lugar de foto: dos fotos de
 * perfil recortadas en círculo son lo que hace que un estudio parezca una
 * plantilla de agencia.
 *
 * Vive entre los servicios y el banner, que es el orden en que la barra las
 * nombra. Antes esto colgaba de la columna de contacto y quedaba debajo del
 * formulario: la pastilla «Estudio» llevaba más abajo que «Escribinos», que
 * está a su derecha.
 */
export default function Estudio() {
  return (
    <section id="estudio" className={s.estudio} aria-labelledby="estudio-t">
      <p className={`${s.rotulo} et`}>{UI.equipoAntetitulo}</p>

      <div className={s.plana}>
        <Reveal>
          <h2 id="estudio-t" className={`${s.titulo} titular`}>
            {UI.estudioTitulo}
          </h2>
          <p className={`${s.cuerpo} parrafo`}>{UI.estudioCuerpo}</p>
          <p className={s.sede}>
            <Marca className={s.iso} />
            {SITE.ciudad}, {SITE.pais} · Est. 2025
          </p>
        </Reveal>

        <div className={s.gente}>
          {EQUIPO.map((p, i) => (
            <Reveal key={p.nombre} delay={i * 0.06}>
              <a
                className={s.persona}
                href={p.linkedin}
                target="_blank"
                rel="noreferrer noopener"
              >
                <span
                  className={`${s.inicial} ${i % 2 ? s.inicialBrasa : ""}`}
                  aria-hidden="true"
                >
                  {p.nombre
                    .split(" ")
                    .map((parte) => parte[0])
                    .join("")}
                </span>
                <span className={s.datos}>
                  <b className={s.nombre}>{p.nombre}</b>
                  <small className={s.rol}>{p.rol}</small>
                </span>
                <span className={`${s.enlace} et`}>
                  LinkedIn
                  <span aria-hidden="true"> ↗</span>
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
