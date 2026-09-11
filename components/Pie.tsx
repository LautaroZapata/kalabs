import Marca from "./Marca";
import { ENLACES, PROYECTOS, SERVICIOS, SITE, UI } from "@/lib/content";
import s from "./Pie.module.css";

/* El correo ya está en su propia línea del pie: repetirlo en la columna sería
   el mismo enlace dos veces a dos renglones de distancia. */
const SOCIALES = ENLACES.filter((e) => !e.href.startsWith("mailto:"));

/**
 * El pie: tinta, con la curva de la casa arriba, para que el papel termine
 * antes del borde de la pantalla y la página se cierre en vez de cortarse.
 *
 * Arriba, el mapa del sitio. No está por prolijidad: las páginas de servicio y
 * de obra tienen que estar enlazadas desde todas las páginas, no sólo desde la
 * sección que les corresponde. Una URL que figura en el sitemap pero que nadie
 * enlaza desde adentro se rastrea tarde y se valora poco; enlazada desde el
 * pie, está a un salto de cualquier lado.
 *
 * `fuera` hace lo mismo que en la barra: antepone la raíz a las anclas para que
 * «Volver al inicio» vuelva de verdad cuando no estamos en la home.
 */
export default function Pie({ fuera = false }: { fuera?: boolean }) {
  const anio = new Date().getFullYear();
  const raiz = fuera ? "/" : "";

  return (
    <footer className={s.pie}>
      <nav className={s.mapa} aria-label="Mapa del sitio">
        <div className={s.columna}>
          <p className={`${s.rotulo} et`}>{UI.migasServicios}</p>
          {SERVICIOS.map((serv) => (
            <a key={serv.slug} href={`/servicios/${serv.slug}`}>
              {serv.titulo}
            </a>
          ))}
        </div>

        <div className={s.columna}>
          <p className={`${s.rotulo} et`}>{UI.migasObra}</p>
          {PROYECTOS.map((p) => (
            <a key={p.slug} href={`/obra/${p.slug}`}>
              {p.nombreLargo ?? p.nombre}
            </a>
          ))}
        </div>

        <div className={s.columna}>
          <p className={`${s.rotulo} et`}>{UI.contactoAntetitulo}</p>
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          {SOCIALES.map((e) => (
            <a key={e.href} href={e.href} rel="noreferrer noopener me">
              {e.valor}
            </a>
          ))}
        </div>
      </nav>

      <div className={s.filete}>
        <span className={s.marca}>
          <Marca className={s.iso} />
          {SITE.nombre}
        </span>
        <span className="et">
          © {anio} · {SITE.ciudad}, {SITE.pais}
        </span>
        <a className={`${s.volver} et`} href={`${raiz}#portada`}>
          {UI.volver} ↑
        </a>
      </div>
    </footer>
  );
}
