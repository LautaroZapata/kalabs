import Link from "next/link";
import type { ReactNode } from "react";
import Marca from "../Marca";
import Pie from "../Pie";
import { SITE } from "@/lib/content";
import s from "./Aviso.module.css";

/**
 * La página de lo que no estaba en los planes: la 404 y la falla.
 *
 * Mismo material que el resto del sitio —papel, tinta, el plano del lago y la
 * brasa— para que quien cae acá sepa que sigue en Kalabs. A la izquierda qué
 * pasó y por dónde seguir; a la derecha un cuadro de película del plano oscuro
 * con la perforación al costado, que es el gesto fílmico de la casa y no un
 * dibujo de «página rota».
 *
 * No lleva la barra de la portada: sus pastillas son anclas a secciones que
 * acá no existen. Queda la marca, que vuelve al inicio.
 *
 * Sin hooks: la usa la 404 (servidor) y la falla (cliente) por igual.
 */
export default function Aviso({
  titulo,
  cuerpo,
  acciones,
  cuadro,
  pie,
}: {
  /* [antes, marcado, después], como los demás titulares de UI. */
  titulo: readonly string[];
  cuerpo: string;
  acciones: ReactNode;
  /* Lo grande del cuadro: el número o la marca. */
  cuadro: ReactNode;
  /* La línea chica al pie del cuadro: la dirección pedida o el código. */
  pie?: ReactNode;
}) {
  const [antes, marcado, despues] = titulo;

  return (
    <div className={s.pagina}>
      <header className={s.barra}>
        <Link className={s.marca} href="/">
          <Marca className={s.iso} />
          {SITE.nombre}
        </Link>
      </header>

      <main id="contenido" className={`caja ${s.main}`}>
        <div className={s.texto}>
          <h1 className={`titular ${s.titulo}`}>
            {antes}
            <span className={`acento ${s.marcado}`}>{marcado}</span>
            {despues}
          </h1>
          <p className={`parrafo ${s.cuerpo}`}>{cuerpo}</p>
          <div className={s.acciones}>{acciones}</div>
        </div>

        <figure className={s.cuadro}>
          <div className={s.toma} aria-hidden="true">
            {cuadro}
          </div>
          {pie && <figcaption className={`et ${s.leyenda}`}>{pie}</figcaption>}
        </figure>
      </main>

      <Pie volver={false} />
    </div>
  );
}
