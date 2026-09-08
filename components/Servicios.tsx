"use client";

import { motion, useReducedMotion } from "motion/react";
import Cabezal from "./Cabezal";
import { entrada } from "./mov/entrada";
import { SERVICIOS, UI } from "@/lib/content";
import s from "./Servicios.module.css";

/**
 * Servicios.
 *
 * Las dos versiones anteriores fallaban por lo mismo, aunque se vieran
 * distinto: eran tres bloques iguales apilados a lo largo de la página. Como
 * lista o como titular, el ojo leía "tres cosas, una atrás de otra", y la
 * sección se comía tres pantallas para decir algo que entra en una.
 *
 * La tercera los metió en una grilla de recuadros con fondo propio, y esa
 * falló por lo contrario: tanto borde convertía la sección en una planilla.
 *
 * Acá no hay cajas. Son columnas de texto separadas por aire, con la
 * jerarquía puesta en el cuerpo de la letra —01 grande a la izquierda, 02 y
 * 03 chicos a la derecha—, la banda de cómo trabajamos cruzando abajo y el
 * plano naranja del cierre como único elemento que se toca.
 */
export default function Servicios() {
  const quieto = useReducedMotion();

  return (
    <section id="servicios" className={s.pagina} aria-labelledby="servicios-t">
      <Cabezal
        id="servicios-t"
        antetitulo={UI.serviciosAntetitulo}
        titulo="Servicios"
      />

      <div className={s.plana}>
        {SERVICIOS.map((serv, i) => {
          /* El módulo principal ocupa el doble de alto, así que sus
             entregables van en lista al pie en vez de en una línea corrida:
             llenan la caja y de paso lo distinguen de los chicos. */
          const destacado = i === 0;

          return (
            <motion.article
              key={serv.num}
              className={`${s.aviso} ${s[`aviso${serv.num}`]}`}
              {...entrada({ quieto, y: 20, margin: "-6% 0px -10% 0px", delay: i * 0.06 })}
            >
              <p className={`${s.servicioNum} dato`} aria-hidden="true">
                {serv.num}
              </p>
              <h3 className={`${s.servicioTitulo} titular titular--sec`}>{serv.titulo}</h3>
              <p className={`${s.cuerpo} parrafo`}>{serv.cuerpo}</p>

              {destacado ? (
                <div className={s.incluyeLista}>
                  <p className={`${s.entregablesTitulo} ${s.incluyeTitulo} dato`}>
                    {UI.serviciosEntregables}
                  </p>
                  <ul>
                    {serv.entregables.map((e) => (
                      <li key={e}>{e}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className={`${s.entregables} dato`}>
                  <span className={s.entregablesTitulo}>{UI.serviciosEntregables}</span>
                  {serv.entregables.join(" · ")}
                </p>
              )}
            </motion.article>
          );
        })}

        {/* La forma de trabajo, cruzando la plana entera: tres pasos en
            columnas, en el orden en que pasan. Estaba en la portada, pero ahí
            llegaba antes de que nadie supiera qué hacemos; acá contesta la
            pregunta que sigue a la lista de servicios. */}
        <motion.aside
          className={`${s.aviso} ${s.avisoComo}`}
          {...entrada({ quieto, y: 20, delay: 0.18 })}
        >
          <h3 className={`${s.comoTitulo} dato dato--caja`}>{UI.serviciosComoTitulo}</h3>
          <ol className={s.comoLista}>
            {UI.serviciosComo.map((paso, i) => (
              <li key={paso} className={s.comoPaso}>
                <span className={`${s.comoNum} dato`} aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={s.comoTexto}>{paso}</span>
              </li>
            ))}
          </ol>
        </motion.aside>

        <motion.a
          href="#contacto"
          className={`${s.aviso} ${s.avisoCta}`}
          {...entrada({ quieto, y: 20, delay: 0.24 })}
        >
          <h3 className={`${s.ctaTitulo} titular titular--sec`}>{UI.serviciosCtaTitulo}</h3>
          <p className={`${s.ctaCuerpo} parrafo`}>{UI.serviciosCtaCuerpo}</p>
          <p className={`${s.ctaAccion} dato`}>
            {UI.serviciosCtaAccion} <span aria-hidden="true">→</span>
          </p>
        </motion.a>
      </div>
    </section>
  );
}
