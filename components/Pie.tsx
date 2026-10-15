import Marca from "./Marca";
import { SITE, UI } from "@/lib/content";
import s from "./Pie.module.css";

/**
 * El pie: tinta, con la curva de la casa arriba, para que el papel termine
 * antes del borde de la pantalla y la página se cierre en vez de cortarse.
 *
 * `volver` sube a la portada por ancla: fuera de la portada (la 404, la falla)
 * esa ancla no existe y el enlace se apaga.
 */
export default function Pie({ volver = true }: { volver?: boolean }) {
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
      {volver && (
        <a className={`${s.volver} et`} href="#portada">
          {UI.volver} ↑
        </a>
      )}
    </footer>
  );
}
