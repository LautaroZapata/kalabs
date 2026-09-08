"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { UI } from "@/lib/content";
import {
  ESTADO_INICIAL,
  EVENTO_CONSULTA,
  OPCIONES,
  VALORES_VACIOS,
} from "@/lib/consulta";
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
 * contra todo el resto de la página— es gastar un clic y perder el único lugar
 * donde el visitante ve de un vistazo qué se puede pedir. Van como pastillas,
 * que es el mismo objeto que la barra y las etiquetas; debajo siguen siendo
 * radios, así que teclado, lector de pantalla y envío funcionan sin
 * reimplementar nada.
 */
export default function Formulario() {
  const [estado, accion, enviando] = useActionState(
    enviarConsulta,
    ESTADO_INICIAL,
  );

  /* Si el envío falló, los campos vuelven con lo que ya estaba escrito. */
  const previo = estado.estado === "error" ? estado.valores : VALORES_VACIOS;
  const [necesito, setNecesito] = useState(previo.necesito);
  const [mensaje, setMensaje] = useState(previo.mensaje);
  const area = useRef<HTMLTextAreaElement>(null);

  /* Lo que se escribió en la portada llega acá por un evento y cae en el
     mensaje, con el foco al final del texto: quien ya contó su problema arriba
     no tiene que volver a escribirlo. */
  useEffect(() => {
    function recibir(e: Event) {
      const texto = (e as CustomEvent<string>).detail;
      if (typeof texto !== "string" || !texto) return;

      setMensaje(texto);
      /* Después del repintado: antes el textarea todavía tiene el valor viejo
         y el cursor quedaría en medio del texto. */
      requestAnimationFrame(() => {
        const nodo = area.current;
        if (!nodo) return;
        nodo.focus({ preventScroll: true });
        nodo.setSelectionRange(texto.length, texto.length);
      });
    }

    document.addEventListener(EVENTO_CONSULTA, recibir);
    return () => document.removeEventListener(EVENTO_CONSULTA, recibir);
  }, []);

  /* Enviado: el formulario se va y queda el acuse. Dejar los campos llenos
     invita a apretar otra vez y mandar la misma consulta por duplicado. */
  if (estado.estado === "ok") {
    return (
      <div className={s.acuse} role="status">
        <p className={`${s.acuseRotulo} et`}>{UI.form.okFicha}</p>
        <p className={`${s.acuseTitulo} titular`}>{UI.form.okTitulo}</p>
        <p className={s.acuseCuerpo}>{UI.form.okCuerpo}</p>
      </div>
    );
  }

  return (
    <form className={s.ficha} action={accion} aria-busy={enviando}>
      <label className={s.campo}>
        <span className={`${s.label} et`}>{UI.form.nombre}</span>
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
        <span className={`${s.label} et`}>{UI.form.correo}</span>
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
        <span className={`${s.label} et`}>{UI.form.negocio}</span>
        <input
          className={s.input}
          name="negocio"
          defaultValue={previo.negocio}
          autoComplete="organization"
          placeholder={UI.form.negocioPh}
        />
      </label>

      <fieldset className={s.campo}>
        <legend className={`${s.label} et`}>{UI.form.servicio}</legend>
        <div className={s.opciones}>
          {OPCIONES.map((opcion) => (
            <label key={opcion} className={s.opcion}>
              <input
                className="sr"
                type="radio"
                name="necesito"
                value={opcion}
                checked={necesito === opcion}
                onChange={(e) => setNecesito(e.target.value)}
              />
              <span className={s.opcionTexto}>{opcion}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className={s.campo}>
        <span className={`${s.label} et`}>{UI.form.mensaje}</span>
        <textarea
          className={s.area}
          name="mensaje"
          ref={area}
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
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
