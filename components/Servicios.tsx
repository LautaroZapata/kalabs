"use client";

import { motion, useReducedMotion } from "motion/react";
import Cabezal from "./Cabezal";
import { entrada } from "./mov/entrada";
import { SERVICIOS, UI } from "@/lib/content";
import s from "./Servicios.module.css";

/**
 * Servicios, compuestos como una plana de clasificados.
 *
 * Las dos versiones anteriores fallaban por lo mismo, aunque se vieran
 * distinto: eran tres bloques iguales apilados a lo largo de la página. Como
 * lista o como titular, el ojo leía "tres cosas, una atrás de otra", y la
 * sección se comía tres pantallas para decir algo que entra en una.
 *
 * Acá no hay tres bloques: hay una sola composición. Cinco avisos de tamaños
 * distintos encastrados en una grilla, separados por filetes, como la página
 * de clasificados de un diario. La jerarquía la da el tamaño del módulo, no
 * el orden de lectura.
 *
 * El texto también cambia de registro: el impersonal del clasificado
 * uruguayo —"se hacen", "se automatizan", "se arman"—, que es el de quien
 * ofrece un oficio y no el de quien vende una solución.
 */
export default function Servicios() {
  const quieto = useReducedMotion();

  return (
    <section id="servicios" className={s.pagina} aria-labelledby="servicios-t">
      <Cabezal
        id="servicios-t"
        folio="2"
        antetitulo={UI.serviciosAntetitulo}
        titulo="Servicios"
        bajada={UI.serviciosBajada}
      />

      {/* La grilla lleva el color de los filetes de fondo y cada aviso tapa lo
          suyo: así las separaciones son una línea sola y no dos bordes
          pegados, que es lo que pasa cuando cada módulo trae el suyo. */}
      <div className={s.plana}>
        {SERVICIOS.map((serv, i) => {
          /* El aviso principal ocupa el doble de alto, así que sus
             entregables van en lista al pie en vez de en una línea corrida:
             llenan la caja y de paso distinguen al módulo grande de los
             chicos, como pasa en una plana de clasificados de verdad. */
          const destacado = i === 0;

          return (
            <motion.article
              key={serv.num}
              className={`${s.aviso} ${s[`aviso${serv.num}`]}`}
              {...entrada({ quieto, y: 20, margin: "-6% 0px -10% 0px", delay: i * 0.06 })}
            >
              <p className={`${s.rubroNum} dato`} aria-hidden="true">
                {serv.num}
              </p>
              <h3 className={`${s.rubro} titular titular--sec`}>{serv.rubro}</h3>
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

        {/* Aviso al pie: lo que no se hace. Define mejor a un estudio que la
            lista de lo que sí —cualquiera dice que hace de todo—. */}
        <motion.aside
          className={`${s.aviso} ${s.avisoNo}`}
          {...entrada({ quieto, y: 20, delay: 0.18 })}
        >
          <h3 className={`${s.noTitulo} dato`}>{UI.serviciosNoTitulo}</h3>
          <ul className={s.noLista}>
            {UI.serviciosNo.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
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
