import Banner from "@/components/Banner";
import Barra from "@/components/Barra";
import Contacto from "@/components/Contacto";
import Estudio from "@/components/Estudio";
import Obra from "@/components/Obra";
import Pie from "@/components/Pie";
import Portada from "@/components/Portada";
import Servicios from "@/components/Servicios";
import { EQUIPO, PROYECTOS, SERVICIOS, SITE } from "@/lib/content";

/**
 * Datos estructurados: que Google entienda que esto es un estudio de
 * Montevideo y no un texto cualquiera. Es lo que alimenta la búsqueda local.
 *
 * Va acá y no en el layout: describe al negocio que presenta esta página. Si
 * algún día hay más páginas, ésta sigue siendo la que lo declara, y una sola.
 * Dos bloques compitiendo por la misma entidad es peor que ninguno.
 *
 * `ProfessionalService` en lugar de `LocalBusiness` a secas: no hay local a la
 * calle ni horario de atención, así que se declara la ciudad y el área de
 * trabajo en vez de inventar una dirección.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: SITE.nombre,
  description: SITE.descripcion,
  url: SITE.url,
  email: SITE.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: SITE.ciudad,
    addressCountry: "UY",
  },
  areaServed: { "@type": "Country", name: SITE.pais },
  knowsLanguage: ["es"],
  /* El equipo sale de EQUIPO y no de un nombre escrito acá: el LinkedIn como
     `sameAs` es lo que le permite a Google atar la persona al estudio. */
  employee: EQUIPO.map((persona) => ({
    "@type": "Person",
    name: persona.nombre,
    jobTitle: persona.rol,
    sameAs: persona.linkedin,
  })),
  makesOffer: SERVICIOS.map((s) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Service", name: s.titulo, description: s.cuerpo },
  })),
  owns: PROYECTOS.map((p) => ({
    "@type": "SoftwareApplication",
    name: p.nombre,
    description: p.pitch,
    url: p.href,
    applicationCategory: "BusinessApplication",
  })),
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Barra />

      {/* Todo se compone dentro de la caja menos el banner, que cruza la
          pantalla entera: es lo que parte la página en dos —arriba lo que
          hicimos, lo que hacemos y quiénes somos, abajo cómo escribirnos—.

          El orden es el mismo que nombra la barra, y no por prolijidad: dos
          pastillas contiguas que bajan en orden invertido hacen dudar de si la
          navegación hace lo que dice. */}
      <main id="contenido">
        <div className="caja">
          <Portada />
          <Obra />
          <Servicios />
          <Estudio />
        </div>
        <Banner />
        <div className="caja">
          <Contacto />
        </div>
      </main>

      <Pie />
    </>
  );
}
