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

/* El isotipo, el mismo `path` de components/Marca.tsx, como data URI. Va en
   brasa fija porque acá no hay `currentColor` que valga: la imagen se compone
   sin CSS. */
const ISO =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1943 1894"><path transform="matrix(3.355663,0,0,3.355663,-1500.083401,-5850.937023)" d="M966.508,1743.601L1025.877,1802.97C1025.877,1802.97 995.231,1930.64 984.649,1994.269C974.162,2057.327 962.385,2184.745 962.385,2184.745C962.385,2184.745 977.731,2212.419 981.351,2227.622C986.161,2247.824 992.345,2294.137 991.245,2305.956C990.687,2311.958 979.206,2302.6 974.754,2298.535C962.111,2286.991 927.341,2249.611 915.385,2236.693C910.866,2231.809 906.04,2226.111 903.017,2221.026C900.304,2216.463 897.245,2206.183 897.245,2206.183C897.245,2206.183 901.917,2139.943 901.367,2123.727C901.18,2118.198 899.435,2108.201 893.946,2108.884C855.329,2113.694 733.843,2135.958 669.664,2152.587C614.716,2166.824 508.873,2208.657 508.873,2208.657L447.03,2148.464L597.926,2094.042L851.069,2042.919C851.069,2042.919 821.659,1962.524 813.963,1924.181C806.637,1887.681 804.206,1842.274 804.893,1812.864C805.41,1790.716 818.086,1747.724 818.086,1747.724C818.086,1747.724 870.171,1798.847 883.227,1813.689C889.081,1820.344 894.521,1828.119 896.42,1836.777C902.329,1863.713 918.683,1975.304 918.683,1975.304C918.683,1975.304 932.976,1862.201 940.947,1823.584C946.605,1796.172 966.508,1743.601 966.508,1743.601Z" fill="${EMBER}"/></svg>`,
  );

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
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontWeight: 800,
              color: INK,
              fontSize: 34,
            }}
          >
            {/* El isotipo va como `img` con data URI y no como `<svg>` suelto:
                Satori dibuja SVG anidado con reglas propias y acá alcanza con
                que entre la silueta. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={ISO} alt="" width={34} height={33} />
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
