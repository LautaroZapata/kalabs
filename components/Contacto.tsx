import Formulario from "./Formulario";
import Reveal from "./Reveal";
import { ENLACES, EQUIPO, UI } from "@/lib/content";
import s from "./Contacto.module.css";

/**
 * El cierre: la invitación a escribir, los dos canales, el equipo y el
 * formulario.
 *
 * El equipo va acá y no en una sección propia. Son dos personas: darles una
 * sección entera con fichas es inflar el sitio para parecer más grande, y
 * quien está por escribir quiere saber a quién le escribe justo en ese
 * momento, no tres pantallas antes.
 *
 * `id="estudio"` cuelga del equipo porque es lo que busca quien aprieta esa
 * pastilla en la barra: quiénes son.
 */
export default function Contacto() {
  const [antes, medio, despues] = UI.contactoTitulo;

  return (
    <section id="contacto" className={s.contacto} aria-labelledby="contacto-t">
      <Reveal className={s.columna}>
        <h2 id="contacto-t" className={`${s.titulo} titular`}>
          {antes}
          <b>{medio}</b>
          {despues}
        </h2>

        <p className={`${s.cuerpo} parrafo`}>{UI.contactoCuerpo}</p>

        <div className={s.enlaces}>
          {ENLACES.map((e) => (
            <a
              key={e.label}
              className="pastilla"
              href={e.href}
              {...(e.href.startsWith("http")
                ? { target: "_blank", rel: "noreferrer noopener" }
                : {})}
            >
              <span className="sr">{e.label}: </span>
              {e.valor}
            </a>
          ))}
        </div>

        <div id="estudio" className={s.equipo}>
          <p className="sr">{UI.equipoAntetitulo}</p>
          {EQUIPO.map((p, i) => (
            <a
              key={p.nombre}
              className={s.persona}
              href={p.linkedin}
              target="_blank"
              rel="noreferrer noopener"
            >
              {/* Las iniciales, no una foto: dos fotos de perfil recortadas en
                  círculo son lo que hace que un estudio parezca una plantilla
                  de agencia. */}
              <span
                className={`${s.inicial} ${i % 2 ? s.inicialBrasa : ""}`}
                aria-hidden="true"
              >
                {p.nombre
                  .split(" ")
                  .map((parte) => parte[0])
                  .join("")}
              </span>
              <span>
                <b className={s.personaNombre}>{p.nombre}</b>
                <small className={s.personaRol}>{p.rol}</small>
                <span className="sr"> — perfil de LinkedIn</span>
              </span>
            </a>
          ))}
        </div>
      </Reveal>

      <Reveal className={s.columnaForm} delay={0.08}>
        <Formulario />
      </Reveal>
    </section>
  );
}
