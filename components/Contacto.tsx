import Formulario from "./Formulario";
import Reveal from "./Reveal";
import { ENLACES, UI } from "@/lib/content";
import s from "./Contacto.module.css";

/**
 * El cierre: la invitación a escribir, los dos canales y el formulario.
 *
 * El equipo estaba acá, colgado de esta misma columna con el `id="estudio"`.
 * Se fue a su propia sección, arriba, por un motivo que sólo se ve usando la
 * barra: «Estudio» está antes que «Escribinos» en la fila de pastillas, pero
 * el equipo quedaba debajo del formulario, así que la pastilla de más a la
 * izquierda llevaba más abajo que la de la derecha. Dos enlaces contiguos que
 * bajan en orden invertido hacen dudar de si la barra hace lo que dice.
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

      </Reveal>

      <Reveal className={s.columnaForm} delay={0.08}>
        <Formulario />
      </Reveal>
    </section>
  );
}
