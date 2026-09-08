"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { SERVICIOS, SITE, UI } from "@/lib/content";
import s from "./Contacto.module.css";

/**
 * Sin backend: el formulario arma un mailto: con todo cargado.
 * Si algún día hace falta guardar los mensajes, acá entra Supabase sin
 * tocar el resto del sitio.
 *
 * El servicio no se elige con un desplegable. Son cuatro opciones: esconderlas
 * detrás de un menú que encima el navegador dibuja a su manera —gris sistema
 * contra todo el resto de la página— era gastar un clic y perder el único
 * lugar donde el visitante ve de un vistazo qué se puede pedir.
 *
 * En su lugar van las casillas de un formulario impreso, y elegir una la marca
 * con una cruz que se dibuja trazo por trazo y sale apenas torcida, como
 * marcada a mano. Debajo siguen siendo radios: teclado, lector de pantalla y
 * el envío del formulario funcionan sin que haya que reimplementar nada.
 */
/* Los tres servicios más la salida para quien todavía no sabe cuál pedir. */
const OPCIONES = [...SERVICIOS.map((s) => s.titulo), UI.form.servicioOtro];

/* Los dos trazos de la cruz, en el orden en que los haría una mano. */
const TRAZOS = [
  { x1: 4, y1: 4, x2: 16, y2: 16 },
  { x1: 16, y1: 4, x2: 4, y2: 16 },
];

export default function Formulario() {
  const quieto = useReducedMotion();
  const [nombre, setNombre] = useState("");
  const [negocio, setNegocio] = useState("");
  const [necesito, setNecesito] = useState(OPCIONES[0]);
  const [mensaje, setMensaje] = useState("");

  function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const asunto = `[Kalabs] ${necesito} — ${negocio || nombre}`;
    const cuerpo = [
      `Nombre: ${nombre}`,
      `Negocio: ${negocio || "—"}`,
      `Necesito: ${necesito}`,
      "",
      mensaje,
    ].join("\n");
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(
      asunto
    )}&body=${encodeURIComponent(cuerpo)}`;
  }

  return (
    <form className={s.ficha} onSubmit={enviar}>
      <p className={`${s.fichaTop} dato dato--caja`}>
        <span>
          <b aria-hidden="true">¶</b> {UI.form.titulo}
        </span>
        <span>{UI.form.respuesta}</span>
      </p>

      <label className={s.campo}>
        <span className={`${s.label} dato dato--caja`}>{UI.form.nombre}</span>
        <input
          className={s.input}
          name="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          autoComplete="name"
          placeholder={UI.form.nombrePh}
        />
      </label>

      <label className={s.campo}>
        <span className={`${s.label} dato dato--caja`}>{UI.form.negocio}</span>
        <input
          className={s.input}
          name="negocio"
          value={negocio}
          onChange={(e) => setNegocio(e.target.value)}
          autoComplete="organization"
          placeholder={UI.form.negocioPh}
        />
      </label>

      <fieldset className={`${s.campo} ${s.grupo}`}>
        <legend className={`${s.label} dato dato--caja`}>{UI.form.servicio}</legend>
        <div className={s.opciones}>
          {OPCIONES.map((opcion) => {
            const elegida = necesito === opcion;

            return (
              <label key={opcion} className={s.opcion}>
                <input
                  className="sr"
                  type="radio"
                  name="necesito"
                  value={opcion}
                  checked={elegida}
                  onChange={(e) => setNecesito(e.target.value)}
                />
                <span className={s.casilla} aria-hidden="true">
                  <svg viewBox="0 0 20 20" className={s.cruz}>
                    {TRAZOS.map((t, i) => (
                      <motion.line
                        key={i}
                        {...t}
                        initial={false}
                        animate={{ pathLength: elegida ? 1 : 0 }}
                        transition={
                          quieto
                            ? { duration: 0 }
                            : { duration: 0.16, ease: "easeOut", delay: elegida ? i * 0.08 : 0 }
                        }
                      />
                    ))}
                  </svg>
                </span>
                <span className={s.opcionTexto}>{opcion}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <label className={s.campo}>
        <span className={`${s.label} dato dato--caja`}>{UI.form.mensaje}</span>
        <textarea
          className={s.area}
          name="mensaje"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          required
          placeholder={UI.form.mensajePh}
        />
      </label>

      <button className={s.enviar} type="submit">
        {UI.form.enviar}
      </button>
    </form>
  );
}
