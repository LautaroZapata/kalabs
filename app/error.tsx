"use client";

import Link from "next/link";
import { useEffect } from "react";
import Aviso from "@/components/aviso/Aviso";
import Marca from "@/components/Marca";
import s from "@/components/aviso/Aviso.module.css";
import { UI } from "@/lib/content";

/**
 * La falla: un error en cualquier página por debajo del layout. Reemplaza al
 * contenido roto y deja reintentar sin recargar. El mensaje del error no se
 * muestra —en producción es genérico y en desarrollo puede traer detalles
 * internos—; el código (`digest`) sí, porque es lo que cruza con los logs de
 * Vercel si alguien escribe contando que le pasó.
 */
export default function Falla({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const t = UI.falla;

  return (
    <>
      <title>{`Algo falló · Kalabs`}</title>
      <Aviso
        titulo={t.titulo}
        cuerpo={t.cuerpo}
        acciones={
          <>
            <button
              type="button"
              className="pastilla pastilla--brasa"
              onClick={() => retry()}
            >
              {t.reintentar}
            </button>
            <Link className="pastilla" href="/">
              {UI.volver}
            </Link>
          </>
        }
        cuadro={<Marca className={s.isotipo} />}
        pie={
          error.digest ? (
            <>
              <span>{t.codigo}</span>
              <span translate="no">{error.digest}</span>
            </>
          ) : undefined
        }
      />
    </>
  );
}
