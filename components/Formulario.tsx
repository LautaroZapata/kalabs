"use client";

import { useActionState, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { UI } from "@/lib/content";
import { ESTADO_INICIAL, OPCIONES, VALORES_VACIOS } from "@/lib/consulta";
import { enviarConsulta } from "@/lib/enviar";
import s from "./Contacto.module.css";

/**
 * El envío lo hace `enviarConsulta`, una Server Action. Eso importa por algo
 * concreto: el formulario sigue funcionando con JavaScript deshabilitado —el
 * navegador hace el POST y Next lo atiende igual—, en línea con el resto del
 * sitio, que también entra sin bundle.
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
/* Los dos trazos de la cruz, en el orden en que los haría una mano. */
const TRAZOS = [
  { x1: 4, y1: 4, x2: 16, y2: 16 },
  { x1: 16, y1: 4, x2: 4, y2: 16 },
];

/* La fecha del sello, armada a mano y no con `toLocaleDateString`: el formato
   del navegador depende del sistema de quien mira, y un sello que a veces dice
   09.09.2026 y a veces 9/9/2026 deja de parecer un sello. */
function fecha() {
  const hoy = new Date();
  const dd = String(hoy.getDate()).padStart(2, "0");
  const mm = String(hoy.getMonth() + 1).padStart(2, "0");
  return `${dd}.${mm}.${hoy.getFullYear()}`;
}

export default function Formulario() {
  const quieto = useReducedMotion();
  const [estado, accion, enviando] = useActionState(enviarConsulta, ESTADO_INICIAL);

  /* Si el envío falló, los campos vuelven con lo que ya estaba escrito. */
  const previo = estado.estado === "error" ? estado.valores : VALORES_VACIOS;
  const [necesito, setNecesito] = useState(previo.necesito);

  /* Enviado: el formulario se va y queda el acuse. Dejar los campos llenos
     invita a apretar otra vez y mandar la misma consulta por duplicado. */
  if (estado.estado === "ok") {
    return (
      <div className={s.ficha} role="status">
        <p className={`${s.fichaTop} dato dato--caja`}>
          <span>
            <b aria-hidden="true">¶</b> {UI.form.okFicha}
          </span>
          <span>{UI.form.respuesta}</span>
        </p>

        {/* El sello cae sobre el papel: entra grande y torcido y se asienta,
            que es lo que hace un sello de goma contra el mostrador. Con
            movimiento reducido aparece puesto, sin el golpe. */}
        <motion.p
          className={s.sello}
          aria-hidden="true"
          initial={quieto ? false : { scale: 1.6, rotate: -14, opacity: 0 }}
          animate={{ scale: 1, rotate: -3, opacity: 1 }}
          transition={
            quieto
              ? { duration: 0 }
              : { type: "spring", stiffness: 620, damping: 24, mass: 0.8 }
          }
        >
          <span className={s.selloTexto}>{UI.form.okKicker}</span>
          <span className={s.selloFecha}>{fecha()}</span>
        </motion.p>

        {/* El texto entra después: primero se estampa, después se lee. */}
        <motion.div
          initial={quieto ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={quieto ? { duration: 0 } : { duration: 0.3, delay: 0.22, ease: "easeOut" }}
        >
          <p className={`${s.acuseTitulo} titular titular--sec`}>{UI.form.okTitulo}</p>
          <p className={s.acuseCuerpo}>{UI.form.okCuerpo}</p>
        </motion.div>
      </div>
    );
  }

  return (
    <form className={s.ficha} action={accion} aria-busy={enviando}>
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
          defaultValue={previo.nombre}
          required
          autoComplete="name"
          placeholder={UI.form.nombrePh}
        />
      </label>

      <label className={s.campo}>
        <span className={`${s.label} dato dato--caja`}>{UI.form.correo}</span>
        <input
          className={s.input}
          name="correo"
          type="email"
          defaultValue={previo.correo}
          required
          autoComplete="email"
          placeholder={UI.form.correoPh}
        />
      </label>

      <label className={s.campo}>
        <span className={`${s.label} dato dato--caja`}>{UI.form.negocio}</span>
        <input
          className={s.input}
          name="negocio"
          defaultValue={previo.negocio}
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
          defaultValue={previo.mensaje}
          required
          placeholder={UI.form.mensajePh}
        />
      </label>

      {/* Trampa para robots. No se ve, no se tabula y no la anuncia un lector
          de pantalla; un humano no puede llenarla ni queriendo. Va sin captcha
          a propósito: un captcha le cobra el peaje a la persona equivocada. */}
      <div className={s.trampa} aria-hidden="true">
        <label>
          Apellido
          <input name="apellido" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {estado.estado === "error" && (
        <p className={s.error} role="alert">
          {estado.mensaje}
        </p>
      )}

      <button className={s.enviar} type="submit" disabled={enviando}>
        {enviando ? UI.form.enviando : UI.form.enviar}
      </button>
    </form>
  );
}
