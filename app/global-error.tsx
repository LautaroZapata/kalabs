"use client";

import { useEffect } from "react";
import Aviso from "@/components/aviso/Aviso";
import Marca from "@/components/Marca";
import s from "@/components/aviso/Aviso.module.css";
import { UI } from "@/lib/content";
import { body, display } from "./fonts";
import "./globals.css";

/**
 * La última red: un error en el layout mismo. Reemplaza al documento entero,
 * así que trae su propio `<html>`, las fuentes y los estilos globales. Sin
 * medición: si el layout se cayó, no hay garantía de que el resto ande.
 *
 * El reintento recarga la página: con el layout roto no hay árbol que
 * volver a pedir.
 */
export default function FallaGlobal({
  error,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const t = UI.falla;

  return (
    <html lang="es-UY" className={`${display.variable} ${body.variable}`}>
      <body>
        <title>{`Algo falló · Kalabs`}</title>
        <Aviso
          titulo={t.titulo}
          cuerpo={t.cuerpo}
          acciones={
            <>
              <button
                type="button"
                className="pastilla pastilla--brasa"
                onClick={() => location.reload()}
              >
                {t.reintentar}
              </button>
              {/* Un enlace común y no `Link`: navegar del lado del cliente
                  vuelve a montar el mismo layout que se acaba de caer. */}
              <a className="pastilla" href="/">
                {UI.volver}
              </a>
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
      </body>
    </html>
  );
}
