import Portada from "@/components/Portada";
import Proyectos from "@/components/Proyectos";
import Servicios from "@/components/Servicios";
import Contacto from "@/components/Contacto";
import Folio from "@/components/Folio";
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
      {/* La portada va a sangre —los filetes cruzan la pantalla— y las tres
          secciones interiores se componen dentro de la caja. El pie queda
          afuera de <main>, así que sigue de lado a lado. */}
      <main id="contenido">
        <Portada />
        <div className="caja">
          <Servicios />
          <Proyectos />
          <Contacto />
        </div>
      </main>
      <Folio />
    </>
  );
}
