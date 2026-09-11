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
 *
 * Las secciones son anclas de la home. Desde una página interior un `#obra`
 * suelto no lleva a ningún lado —busca el ancla en la página donde está—, así
 * que `fuera` antepone la raíz y las convierte en `/#obra`. La barra sigue
 * nombrando lo mismo esté donde esté.
 */
export default function Barra({ fuera = false }: { fuera?: boolean }) {
  const raiz = fuera ? "/" : "";

  return (
    <header className={s.barra}>
      <div className={s.interior}>
        {/* Isotipo y nombre juntos: el trazo solo todavía no lo reconoce nadie.
            Cuando la marca tenga kilómetros encima, el nombre puede irse. */}
        <a className={s.marca} href={`${raiz}#portada`}>
          <Marca className={s.iso} />
          {SITE.nombre}
        </a>

        <nav aria-label="Secciones del sitio" className={s.nav}>
          {INDICE.map((i) => (
            <a
              key={i.id}
              className={`pastilla ${s.oculta}`}
              href={`${raiz}#${i.id}`}
            >
              {i.label}
            </a>
          ))}
          <a className="pastilla pastilla--brasa" href={`${raiz}#contacto`}>
            {UI.barraCta}
          </a>
        </nav>
      </div>
    </header>
  );
}
