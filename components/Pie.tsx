import Marca from "./Marca";
import { SITE, UI } from "@/lib/content";
import s from "./Pie.module.css";

/**
 * El pie: tinta, con la curva de la casa arriba, para que el papel termine
 * antes del borde de la pantalla y la página se cierre en vez de cortarse.
 */
export default function Pie() {
  const anio = new Date().getFullYear();

  return (
    <footer className={s.pie}>
      <span className={s.marca}>
        <Marca className={s.iso} />
        {SITE.nombre}
      </span>
      <span className="et">
        © {anio} · {SITE.ciudad}, {SITE.pais}
      </span>
      <a className="et" href={`mailto:${SITE.email}`}>
        {SITE.email}
      </a>
      <a className={`${s.volver} et`} href="#portada">
        {UI.volver} ↑
      </a>
    </footer>
  );
}
