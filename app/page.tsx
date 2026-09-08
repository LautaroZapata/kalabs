import Portada from "@/components/Portada";
import Proyectos from "@/components/Proyectos";
import Servicios from "@/components/Servicios";
import Contacto from "@/components/Contacto";
import Folio from "@/components/Folio";
import { PROYECTOS, SERVICIOS, SITE } from "@/lib/content";

/* Datos estructurados: que Google entienda que esto es un estudio de Montevideo. */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: SITE.nombre,
  description: SITE.descripcion,
  url: SITE.url,
  email: SITE.email,
  areaServed: "UY",
  address: {
    "@type": "PostalAddress",
    addressLocality: SITE.ciudad,
    addressCountry: "UY",
  },
  founder: { "@type": "Person", name: "Lautaro Zapata" },
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
