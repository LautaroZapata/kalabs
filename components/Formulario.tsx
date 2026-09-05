"use client";

import { useState } from "react";
import { SERVICIOS, SITE } from "@/lib/content";
import s from "./Senal.module.css";

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
          <b>▚</b> Formulario 04-A
        </span>
        <span>Respuesta &lt; 24 h</span>
      </p>

      <label className={s.campo}>
        <span className={`${s.label} monoSm`}>Cómo te llamás</span>
        <input
          className={s.input}
          name="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          autoComplete="name"
          placeholder="Nombre y apellido"
        />
      </label>

      <label className={s.campo}>
        <span className={`${s.label} monoSm`}>Tu negocio (opcional)</span>
        <input
          className={s.input}
          name="negocio"
          value={negocio}
          onChange={(e) => setNegocio(e.target.value)}
          autoComplete="organization"
          placeholder="Panadería, estudio, kiosco…"
        />
      </label>

      <label className={s.campo}>
        <span className={`${s.label} monoSm`}>Qué necesitás</span>
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
          <option value="Todavía no sé">No sé todavía — charlemos</option>
        </select>
      </label>

      <label className={s.campo}>
        <span className={`${s.label} monoSm`}>Contanos</span>
        <textarea
          className={s.area}
          name="mensaje"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          required
          placeholder="Qué problema querés sacarte de encima."
        />
      </label>

      <button className={s.enviar} type="submit">
        Mandar señal
      </button>

      <p className={`${s.aviso} monoSm`}>
        Se abre tu app de correo con el mensaje ya escrito. Si preferís, escribinos directo a{" "}
        {SITE.email}.
      </p>
    </form>
  );
}
