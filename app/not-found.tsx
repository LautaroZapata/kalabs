import type { Metadata } from "next";
import Link from "next/link";
import Aviso from "@/components/aviso/Aviso";
import RutaPedida from "@/components/aviso/RutaPedida";
import s from "@/components/aviso/Aviso.module.css";
import { UI } from "@/lib/content";

/* Next ya agrega `noindex` a toda respuesta 404. */
export const metadata: Metadata = {
  title: "Página no encontrada",
};

/**
 * La 404: cualquier dirección que no existe, y cualquier `notFound()` que se
 * llame más adelante. Va dentro del layout, así que trae fuentes, grano y
 * medición como el resto.
 */
export default function NotFound() {
  const t = UI.noExiste;

  return (
    <Aviso
      titulo={t.titulo}
      cuerpo={t.cuerpo}
      acciones={
        <>
          <Link className="pastilla pastilla--brasa" href="/">
            {UI.volver}
          </Link>
          <Link className="pastilla" href="/#contacto">
            {t.escribir}
          </Link>
        </>
      }
      cuadro={<span className={s.numero}>404</span>}
      pie={
        <>
          <span>{t.pedida}</span>
          <RutaPedida />
        </>
      }
    />
  );
}
