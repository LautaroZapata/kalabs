import { ImageResponse } from "next/og";
import { SITE, PORTADA, UI } from "@/lib/content";

export const alt = `${SITE.nombre} — ${SITE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* Los tokens de globals.css no llegan hasta acá: la imagen se compone fuera
   del documento, sin CSS. Se repiten a mano. */
const INK = "#0f1214";
const PAPEL = "#f7f2e7";
const INK_4 = "#262c2f";
const EMBER = "#ff6b1a";
const TERRA = "#9c3f26";

/**
 * Google Fonts devuelve WOFF2 a los navegadores modernos y TTF a los que no lo
 * declaran. Satori sólo lee TTF/OTF/WOFF, así que se pide la hoja con un
 * User-Agent viejo para que conteste con el TTF.
 */
async function bricolage(peso: 600 | 800): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@96,${peso}`,
      { headers: { "User-Agent": "Mozilla/4.0" } },
    ).then((r) => r.text());
    const url = css.match(/src:\s*url\((https:[^)]+)\)/)?.[1];
    if (!url) return null;
    return await fetch(url).then((r) => r.arrayBuffer());
  } catch {
    /* Si Google no contesta, la imagen sale con la sans por defecto. Peor
       tipografía, pero el build no se cae por una imagen social. */
    return null;
  }
}

export default async function Imagen() {
  const [media, negra] = await Promise.all([bricolage(600), bricolage(800)]);
  const hayFuente = Boolean(media && negra);
  const familia = hayFuente ? "Bricolage" : "sans-serif";

  /* La misma pregunta que abre el sitio: si alguien ve la tarjeta en un chat,
     lo primero que lee es lo mismo que va a leer al entrar. */
  const [antes, medio, despues] = UI.portadaPregunta;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: PAPEL,
          color: INK,
          padding: "64px 72px",
          fontFamily: familia,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 26,
            color: INK_4,
          }}
        >
          <span style={{ fontWeight: 800, color: INK, fontSize: 34 }}>
            {SITE.nombre}
          </span>
          <span style={{ display: "flex", gap: 24, letterSpacing: "0.1em" }}>
            {PORTADA.cintillo.map((dato) => (
              <span key={dato}>{dato.toUpperCase()}</span>
            ))}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            fontSize: 104,
            fontWeight: 800,
            lineHeight: 1.04,
            letterSpacing: "-0.04em",
            maxWidth: 900,
          }}
        >
          <span>{antes}</span>
          <span style={{ color: TERRA }}>{medio}</span>
          <span>{despues}</span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 28,
            color: INK_4,
          }}
        >
          <span style={{ maxWidth: 720 }}>{SITE.descripcion}</span>
          {/* La única mancha de color pleno, igual que en el sitio. */}
          <span
            style={{
              display: "flex",
              background: EMBER,
              color: INK,
              padding: "14px 26px",
              borderRadius: 999,
              fontWeight: 600,
            }}
          >
            {SITE.email}
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: hayFuente
        ? [
            {
              name: "Bricolage",
              data: media as ArrayBuffer,
              weight: 600 as const,
              style: "normal" as const,
            },
            {
              name: "Bricolage",
              data: negra as ArrayBuffer,
              weight: 800 as const,
              style: "normal" as const,
            },
          ]
        : undefined,
    },
  );
}
