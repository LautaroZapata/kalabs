import Greca from "./Greca";
import Composicion from "./Composicion";
import { PORTADA, SITE } from "@/lib/content";
import s from "./Portada.module.css";

/**
 * Portada.
 *
 * Orla, cintillo con los datos del estudio y el nombre a filete doble, con la
 * caja de composición al costado. Nada más: la portada presenta y deja pasar.
 * Lo que hay para decir —qué hacemos, cómo trabajamos, qué hicimos— lo dicen
 * las secciones de abajo.
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

      {/* cintillo: los datos del estudio, como arriba de toda cabecera */}
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
        <h1 className={`${s.nombre} titular rugoso`}>{SITE.nombre}</h1>
        <Composicion />
      </header>
    </section>
  );
}
