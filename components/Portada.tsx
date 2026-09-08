"use client";

import { useState } from "react";
import { EVENTO_CONSULTA } from "@/lib/consulta";
import { UI } from "@/lib/content";
import s from "./Portada.module.css";

/**
 * La portada no titula: pregunta.
 *
 * Antes había un nombre a tamaño de cabecera de diario y un cintillo con los
 * datos del estudio. Decía quiénes somos a alguien que todavía no había dicho
 * qué necesita. Acá el primer movimiento es suyo: escribe el problema y el
 * texto viaja al formulario de contacto, ya cargado, para que no lo escriba
 * dos veces.
 *
 * Si lo manda vacío no pasa nada raro: baja igual al formulario. Un campo que
 * no hace nada cuando lo apretás es peor que uno que no está.
 */
export default function Portada() {
  const [texto, setTexto] = useState("");
  const [antes, medio, despues] = UI.portadaPregunta;

  function llevarAlFormulario(e: React.FormEvent) {
    e.preventDefault();

    const limpio = texto.trim();
    if (limpio) {
      document.dispatchEvent(
        new CustomEvent(EVENTO_CONSULTA, { detail: limpio }),
      );
    }

    document.getElementById("contacto")?.scrollIntoView({ block: "start" });
  }

  return (
    <section id="portada" className={s.portada} aria-label="Portada">
      <h1 className={`${s.pregunta} titular`}>
        {antes}
        <b>{medio}</b>
        {despues}
      </h1>

      <form className={s.buscador} onSubmit={llevarAlFormulario}>
        <input
          className={s.campo}
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder={UI.portadaPh}
          aria-label={UI.portadaPh}
          maxLength={5000}
        />
        <button className={s.flecha} type="submit">
          <span className="sr">{UI.portadaEnviar}</span>
          <span aria-hidden="true">→</span>
        </button>
      </form>

      <p className={s.nota}>
        {UI.portadaNota} <b>{UI.portadaNotaFuerte}</b>
      </p>
    </section>
  );
}
