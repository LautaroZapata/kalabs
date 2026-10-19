import type { ReactNode } from "react";
import { SITE } from "@/lib/content";
import { BRASA, MARGEN } from "@/lib/feed";
import { iso } from "@/lib/marca";

/* Las primitivas que comparten todas las piezas del feed.
   Viven acá y no en `Piezas.tsx` para que `Sueltas.tsx` las use sin que los
   dos archivos se importen entre sí. */

export function Lienzo({ fondo, children }: { fondo: string; children: ReactNode }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: fondo,
        padding: `104px ${MARGEN}px ${MARGEN}px`,
        fontFamily: "Cuerpo",
        overflow: "hidden",
      }}
    >
      {children}
    </div>
  );
}

/** Rótulo en versalitas: el texto chico se distingue por el espaciado. */
export function Rotulo({ texto, color }: { texto: string; color: string }) {
  return (
    <div
      style={{
        display: "flex",
        fontWeight: 700,
        fontSize: 21,
        letterSpacing: "0.12em",
        color,
      }}
    >
      {texto.toUpperCase()}
    </div>
  );
}

/** El aire que empuja lo que sigue contra el margen de abajo. */
export function Aire() {
  return <div style={{ display: "flex", flexGrow: 1 }} />;
}

export function Titular({
  texto,
  color,
  cuerpo = 116,
}: {
  texto: string;
  color: string;
  cuerpo?: number;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        marginTop: 34,
        maxWidth: 900,
        fontFamily: "Display",
        fontWeight: 800,
        fontSize: cuerpo,
        lineHeight: 1.02,
        letterSpacing: "-0.035em",
        color,
      }}
    >
      {texto}
    </div>
  );
}

/**
 * El pie: isotipo y palabra. Cuando la K es chica va con el nombre al lado;
 * cuando es grande sale por un borde.
 */
export function Firma({ tinta, marca = BRASA }: { tinta: string; marca?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={iso(marca)} alt="" width={50} height={49} />
      <span
        style={{
          fontFamily: "Display",
          fontWeight: 800,
          fontSize: 44,
          letterSpacing: "-0.03em",
          color: tinta,
        }}
      >
        {SITE.nombre}
      </span>
    </div>
  );
}
