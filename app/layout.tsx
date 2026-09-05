import type { Metadata, Viewport } from "next";
import { display, body, mono } from "./fonts";
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
    <html lang="es-UY" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <a className="skip" href="#contenido">
          Saltar al contenido
        </a>
        {children}
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
