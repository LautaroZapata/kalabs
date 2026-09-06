import Greca from "./Greca";
import { INDICE, PORTADA, SITE } from "@/lib/content";
import s from "./Portada.module.css";

/**
 * Portada.
 *
 * No es un hero: es la primera plana de un diario. Cintillo con los datos de
 * la edición, cabecera a filete doble con el nombre, y abajo tres columnas
 * separadas por corondel — sumario, nota de tapa con capitular y recuadro.
 *
 * Componente de servidor a propósito: la entrada la hace CSS con retardos
 * escalonados, así el contenido más importante del sitio no depende de que
 * cargue JavaScript ni queda en opacity:0 esperando a nadie.
 */
export default function Portada() {
  return (
    <section id="portada" className={s.portada} aria-label="Portada">
      {/* Orla: el borde ornamental que corona la página. Es la única
          aparición de la greca de la casa —geometría propia, dibujada a
          mano— y por eso vale más una que diez repartidas por el sitio. */}
      <Greca
        id="greca-orla"
        variant="escalera"
        line="var(--terra)"
        accent="var(--terra-dim)"
        height={10}
        scale={0.85}
        className={s.orla}
      />

      {/* cintillo: los datos de la edición, como arriba de toda cabecera */}
      <div className={`${s.cintillo} dato dato--caja`}>
        {PORTADA.cintillo.map((t) => (
          <span key={t}>{t}</span>
        ))}
        <a className={s.cintilloMail} href={`mailto:${SITE.email}`}>
          {SITE.email}
        </a>
      </div>

      {/* cabecera: el nombre a caja baja, entre filete grueso y filete medio */}
      <header className={s.cabecera}>
        <p className={`${s.flancoIzq} dato dato--caja`}>
          Desarrollo web
          <br />
          Automatizaciones
          <br />
          Sistemas a medida
        </p>

        <h1 className={`${s.nombre} titular rugoso`}>{SITE.nombre}</h1>

        <p className={`${s.flancoDer} dato dato--caja`}>
          {SITE.ciudad}
          <br />
          {SITE.pais}
          <br />
          34°54′S
        </p>
      </header>

      {/* cuerpo de la plana: sumario · nota de tapa · recuadro */}
      <div className={s.plana}>
        <nav className={s.sumario} aria-label="Índice del sitio">
          <h2 className={`${s.sumarioTitulo} dato dato--caja`}>En este número</h2>
          <ol>
            {INDICE.filter((i) => i.id !== "portada").map((i) => (
              <li key={i.id}>
                <a className={s.sumarioItem} href={`#${i.id}`}>
                  <span className={`${s.sumarioLabel} titular titular--sec`}>{i.label}</span>
                  <span className={`${s.sumarioNota} bajada`}>{i.nota}</span>
                  <span className={`${s.sumarioFolio} dato`} aria-hidden="true">
                    p.&nbsp;{i.folio}
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <article className={s.nota}>
          <h2 className={`${s.titular} titular rugoso`}>{PORTADA.titular}</h2>
          <p className={`${s.bajadaTapa} bajada`}>{PORTADA.bajada}</p>
          <div className={`${s.cuerpoNota} columnas`}>
            <p className="capitular parrafo">{PORTADA.entrada}</p>
          </div>
        </article>

        <aside className={s.recuadro}>
          <h2 className={`${s.recuadroTitulo} dato dato--caja`}>{PORTADA.recuadro.titulo}</h2>
          <ul>
            {PORTADA.recuadro.puntos.map((p) => (
              <li key={p} className={s.recuadroItem}>
                {p}
              </li>
            ))}
          </ul>
          <a className={`${s.recuadroAccion} dato dato--caja`} href="#contacto">
            Escribinos
          </a>
        </aside>
      </div>
    </section>
  );
}
