import { ImageResponse } from "next/og";
import { SITE, PORTADA } from "@/lib/content";

export const alt = `${SITE.nombre} — ${SITE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* Los tokens de globals.css no llegan hasta acá: la imagen se compone fuera
   del documento, sin CSS. Se repiten a mano. */
const INK = "#0f1214";
const BONE = "#efe7d6";
const BONE_DIM = "#b9b2a4";
const EMBER = "#ff6b1a";
const TERRA = "#9c3f26";

/**
 * Google Fonts devuelve WOFF2 a los navegadores modernos y TTF a los que no lo
 * declaran. Satori sólo lee TTF/OTF/WOFF, así que se pide la hoja con un
 * User-Agent viejo para que conteste con el TTF.
 */
async function fraunces(): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@144,700",
      { headers: { "User-Agent": "Mozilla/4.0" } },
    ).then((r) => r.text());
    const url = css.match(/src:\s*url\((https:[^)]+)\)/)?.[1];
    if (!url) return null;
    return await fetch(url).then((r) => r.arrayBuffer());
  } catch {
    /* Si Google no contesta, la imagen sale con la serif por defecto. Peor
       tipografía, pero el build no se cae por una imagen social. */
    return null;
  }
}

export default async function Imagen() {
  const fuente = await fraunces();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: INK,
          color: BONE,
          padding: "64px 72px",
          fontFamily: fuente ? "Fraunces" : "serif",
          /* La orla superior es el único filete naranja: mismo gesto que la
             greca de la portada, reducido a una línea. */
          borderTop: `10px solid ${EMBER}`,
        }}
      >
        {/* Cintillo: los mismos datos que encabezan la portada. */}
        <div
          style={{
            display: "flex",
            gap: 28,
            fontSize: 24,
            letterSpacing: "0.16em",
            color: BONE_DIM,
          }}
        >
          {PORTADA.cintillo.map((dato) => (
            <span key={dato}>{dato.toUpperCase()}</span>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {/* En caja baja, al ras y a la izquierda: nada centrado. */}
          <div style={{ fontSize: 210, lineHeight: 1, letterSpacing: "-0.02em" }}>
            {SITE.nombre.toLowerCase()}
          </div>
          {/* Filete doble, la convención de imprenta que sostiene el sitio. */}
          <div style={{ display: "flex", height: 5, background: TERRA, marginTop: 34 }} />
          <div style={{ display: "flex", height: 2, background: TERRA, marginTop: 5 }} />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 30,
            color: BONE_DIM,
          }}
        >
          <span style={{ maxWidth: 760 }}>{SITE.descripcion}</span>
          <span style={{ color: EMBER }}>{SITE.email}</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fuente
        ? [{ name: "Fraunces", data: fuente, weight: 700 as const, style: "normal" as const }]
        : undefined,
    },
  );
}
