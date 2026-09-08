"use client";

import { useEffect, useRef, useState } from "react";
import { EVENTO_CONSULTA } from "@/lib/consulta";
import { UI } from "@/lib/content";
import s from "./Portada.module.css";

/* Ritmo del tipeo, en milisegundos. La escritura no es pareja —se le suma un
   azar de hasta 45ms por letra— porque a intervalo fijo se lee como una
   máquina escribiendo y no como alguien contando lo que necesita. El borrado
   sí es parejo y más rápido: nadie borra despacio. */
const LETRA = 45;
const AZAR = 45;
const BORRAR = 24;
/* Con la frase terminada el cursor parpadea, que es lo que hace un cursor
   cuando nadie escribe. Cuatro guiños de 470ms son los ~1,9s que la frase
   necesita para leerse. */
const PARPADEO = 470;
const GUINOS = 4;
const ENTRE = 350; /* el respiro entre una frase y la que sigue */
const ARRANQUE = 900; /* deja leer la pregunta antes de empezar a escribir */

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

  /* El campo se escribe solo mientras nadie lo toca. Arranca con el
     placeholder fijo —es lo que se sirve desde el servidor y lo que ve quien
     entra sin JavaScript— y recién en el efecto empieza a tipear. */
  const [ejemplo, setEjemplo] = useState(UI.portadaPh);
  const [tipeando, setTipeando] = useState(true);
  const campo = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!tipeando) return;
    /* Un texto que se escribe y se borra solo es exactamente lo que molesta a
       quien pidió menos movimiento. */
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const frases = UI.portadaEjemplos;
    let frase = 0;
    let letra = 0;
    let borrando = false;
    let reloj: ReturnType<typeof setTimeout>;

    function paso() {
      const actual = frases[frase];
      letra += borrando ? -1 : 1;
      /* La barra hace de cursor: el placeholder es texto plano y no admite un
         elemento aparte que parpadee. */
      setEjemplo(actual.slice(0, letra) + "▌");

      let espera = borrando ? BORRAR : LETRA + Math.random() * AZAR;

      if (!borrando && letra === actual.length) {
        borrando = true;
        /* Frase completa: el cursor parpadea un rato y recién ahí se borra. */
        let guino = 0;
        const guinar = () => {
          guino += 1;
          setEjemplo(actual + (guino % 2 ? "" : "▌"));
          reloj = setTimeout(guino < GUINOS ? guinar : paso, PARPADEO);
        };
        reloj = setTimeout(guinar, PARPADEO);
        return;
      } else if (borrando && letra === 0) {
        borrando = false;
        frase = (frase + 1) % frases.length;
        espera = ENTRE;
      }

      reloj = setTimeout(paso, espera);
    }

    reloj = setTimeout(paso, ARRANQUE);
    return () => clearTimeout(reloj);
  }, [tipeando]);

  /* Al enfocar se corta y vuelve el placeholder fijo: seguir escribiendo
     debajo del cursor de alguien que está por escribir es pelearle el campo.
     Si se va sin dejar nada, la animación vuelve. */
  function alEnfocar() {
    setTipeando(false);
    setEjemplo(UI.portadaPh);
  }

  function alSalir() {
    if (!campo.current?.value) setTipeando(true);
  }

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
          ref={campo}
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          onFocus={alEnfocar}
          onBlur={alSalir}
          placeholder={ejemplo}
          aria-label={UI.portadaLabel}
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
