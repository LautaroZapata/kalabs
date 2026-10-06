import type { Metadata, Viewport } from "next";
import { display, body } from "./fonts";
import { SITE } from "@/lib/content";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.nombre} — ${SITE.tagline}`,
    template: `%s · ${SITE.nombre}`,
  },
  description: SITE.descripcion,
  alternates: { canonical: "/" },
  keywords: [
    "desarrollo web Uruguay",
    "automatizaciones",
    "sistemas a medida",
    "Montevideo",
    "Next.js",
    "estudio digital",
  ],
  authors: [{ name: "Lautaro Zapata" }],
  openGraph: {
    type: "website",
    locale: "es_UY",
    url: SITE.url,
    siteName: SITE.nombre,
    title: `${SITE.nombre} — ${SITE.tagline}`,
    description: SITE.descripcion,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.nombre} — ${SITE.tagline}`,
    description: SITE.descripcion,
  },
};

export const viewport: Viewport = {
  /* El papel del sitio: es lo que pinta la barra del navegador en el celular,
     y tiene que ser el color con el que arranca la página, no el de la tinta. */
  themeColor: "#f7f2e7",
  colorScheme: "light",
  /* La página llega hasta el borde físico de la pantalla. A cambio, el CSS
     tiene que respetar el área segura: `--edge` lo hace. */
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es-UY"
      className={`${display.variable} ${body.variable}`}
    >
      <body>
        <a className="skip" href="#contenido">
          Saltar al contenido
        </a>
        {/* La entrada por scroll arranca en opacity:0 y la enciende un
            IntersectionObserver. Sin JavaScript no la enciende nadie: esto
            devuelve el contenido a la vista. */}
        <noscript>
          <style>{`.rev{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
