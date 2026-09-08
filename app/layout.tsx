import type { Metadata, Viewport } from "next";
import { display, body } from "./fonts";
import Rugosidad from "@/components/Rugosidad";
import { SITE, SERVICIOS, EQUIPO } from "@/lib/content";
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
  themeColor: "#0f1214",
  colorScheme: "dark",
};

/**
 * Datos estructurados para búsqueda local. Es lo que le permite a Google
 * entender que atrás de la página hay un estudio en Montevideo y no un texto
 * cualquiera, y lo que alimenta la ficha del negocio.
 *
 * `ProfessionalService` en lugar de `LocalBusiness` a secas: no hay local a la
 * calle ni horario de atención, así que se declara el área de trabajo y no una
 * dirección que no existe.
 */
const datosEstructurados = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: SITE.nombre,
  url: SITE.url,
  email: SITE.email,
  description: SITE.descripcion,
  address: {
    "@type": "PostalAddress",
    addressLocality: SITE.ciudad,
    addressCountry: "UY",
  },
  areaServed: { "@type": "Country", name: SITE.pais },
  knowsLanguage: ["es"],
  employee: EQUIPO.map((persona) => ({
    "@type": "Person",
    name: persona.nombre,
    jobTitle: persona.rol,
    sameAs: persona.linkedin,
  })),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Áreas de trabajo",
    itemListElement: SERVICIOS.map((servicio) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: servicio.titulo,
        description: servicio.cuerpo,
      },
    })),
  },
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
        {/* Motion escribe el estado inicial (opacity:0) en el HTML servido.
            Sin JavaScript nadie lo anima, así que el contenido quedaría
            invisible: esto lo devuelve a la vista. */}
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        {children}
        <Rugosidad />
        <div className="grain" aria-hidden="true" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(datosEstructurados) }}
        />
      </body>
    </html>
  );
}
