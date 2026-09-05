import type { Metadata, Viewport } from "next";
import { sans, mono } from "./fonts";
import { SITE } from "@/lib/content";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.nombre} — ${SITE.tagline}`,
    template: `%s · ${SITE.nombre}`,
  },
  description: SITE.descripcion,
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
  themeColor: "#0f1214",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-UY" className={`${sans.variable} ${mono.variable}`}>
      <body>
        <a className="skip" href="#contenido">
          Saltar al contenido
        </a>
        {/* Motion escribe el estado inicial (opacity:0) en el HTML servido.
            Sin JavaScript nadie lo anima, así que el contenido quedaría
            invisible: esto lo devuelve a la vista. */}
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        {children}
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
