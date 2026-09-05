"use client";

import { useState } from "react";
import { SERVICIOS, SITE, UI } from "@/lib/content";
import s from "./Contacto.module.css";

/**
 * Sin backend: el formulario arma un mailto: con todo cargado.
 * Si algún día hace falta guardar los mensajes, acá entra Supabase sin
 * tocar el resto del sitio.
 */
export default function Formulario() {
  const [nombre, setNombre] = useState("");
  const [negocio, setNegocio] = useState("");
  const [necesito, setNecesito] = useState(SERVICIOS[0].titulo);
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
      <p className={`${s.fichaTop} monoSm`}>
        <span>
          <b>▚</b> {UI.form.titulo}
        </span>
        <span>{UI.form.respuesta}</span>
      </p>

      <label className={s.campo}>
        <span className={`${s.label} monoSm`}>{UI.form.nombre}</span>
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
        <span className={`${s.label} monoSm`}>{UI.form.negocio}</span>
        <input
          className={s.input}
          name="negocio"
          value={negocio}
          onChange={(e) => setNegocio(e.target.value)}
          autoComplete="organization"
          placeholder={UI.form.negocioPh}
        />
      </label>

      <label className={s.campo}>
        <span className={`${s.label} monoSm`}>{UI.form.servicio}</span>
        <select
          className={s.select}
          name="necesito"
          value={necesito}
          onChange={(e) => setNecesito(e.target.value)}
        >
          {SERVICIOS.map((serv) => (
            <option key={serv.num} value={serv.titulo}>
              {serv.num} · {serv.titulo}
            </option>
          ))}
          <option value={UI.form.servicioOtro}>{UI.form.servicioOtro}</option>
        </select>
      </label>

      <label className={s.campo}>
        <span className={`${s.label} monoSm`}>{UI.form.mensaje}</span>
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

      <p className={`${s.aviso} monoSm`}>
        {UI.form.aviso} {SITE.email}.
      </p>
    </form>
  );
}
