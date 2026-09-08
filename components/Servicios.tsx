import Reveal from "./Reveal";
import { SERVICIOS, UI } from "@/lib/content";
import s from "./Servicios.module.css";

/**
 * Servicios.
 *
 * Las versiones anteriores fallaban todas por lo mismo: eran tres bloques
 * iguales apilados —01, 02, 03— y ese numeral es lo que más delata una landing
 * armada con plantilla. Ninguno de los estudios que miramos como referencia
 * tiene una sección de servicios numerados.
 *
 * Acá son tres fichas que se abren. Cerradas, la sección entera entra en una
 * pantalla y se lee de un vistazo qué hacemos; abierta, cada una cuenta lo
 * suyo. La primera viene abierta para que se vea que se abren.
 *
 * `<details>` nativo: funciona sin JavaScript, el teclado ya sabe manejarlo y
 * el lector de pantalla lo anuncia como lo que es.
 */
export default function Servicios() {
  return (
    <section id="servicios" className={s.servicios} aria-labelledby="servicios-t">
      <p className={`${s.rotulo} et`}>{UI.serviciosAntetitulo}</p>
      <h2 id="servicios-t" className={`${s.titulo} titular`}>
        {UI.serviciosTitulo}
      </h2>

      <div className={s.bloques}>
        {SERVICIOS.map((serv, i) => (
          <Reveal key={serv.num} delay={i * 0.05}>
            <details className={s.bloque} open={i === 0}>
              <summary className={s.summary}>{serv.titulo}</summary>
              <div className={s.cuerpo}>
                <p className="parrafo">{serv.cuerpo}</p>
                <p className="sr">{UI.serviciosEntregables}:</p>
                <ul className={s.entregables}>
                  {serv.entregables.map((e) => (
                    <li key={e} className={`${s.entregable} et`}>
                      {e}
                    </li>
                  ))}
                </ul>
              </div>
            </details>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
