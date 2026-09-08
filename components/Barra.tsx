import Marca from "./Marca";
import { INDICE, SITE, UI } from "@/lib/content";
import s from "./Barra.module.css";

/**
 * La barra de arriba: el nombre y tres pastillas.
 *
 * Antes la navegación era una barra fija al pie que marcaba en qué sección
 * estaba el visitante. Marcaba bien y no la usaba nadie: en un sitio de una
 * página, saber que estás en «Proyectos» no es información, es decoración.
 *
 * Es pegajosa y el degradado la despega del papel sin encerrarla en una caja.
 * Componente de servidor: son cuatro enlaces, no necesita estado.
 */
export default function Barra() {
  return (
    <header className={s.barra}>
      {/* Isotipo y nombre juntos: el trazo solo todavía no lo reconoce nadie.
          Cuando la marca tenga kilómetros encima, el nombre puede irse. */}
      <a className={s.marca} href="#portada">
        <Marca className={s.iso} />
        {SITE.nombre}
      </a>

      <nav aria-label="Secciones del sitio" className={s.nav}>
        {INDICE.map((i) => (
          <a key={i.id} className={`pastilla ${s.oculta}`} href={`#${i.id}`}>
            {i.label}
          </a>
        ))}
        <a className="pastilla pastilla--brasa" href="#contacto">
          {UI.barraCta}
        </a>
      </nav>
    </header>
  );
}
