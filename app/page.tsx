import Indice from "@/components/Indice";
import Obra from "@/components/Obra";
import Oficio from "@/components/Oficio";
import Taller from "@/components/Taller";
import Senal from "@/components/Senal";
import Hud from "@/components/Hud";
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
    itemOffered: { "@type": "Service", name: s.titulo, description: s.bajada },
  })),
  owns: PROYECTOS.map((p) => ({
    "@type": "SoftwareApplication",
    name: p.nombre,
    description: p.pitch,
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
      <main id="contenido">
        <Indice />
        <Obra />
        <Oficio />
        <Taller />
        <Senal />
      </main>
      <Hud />
    </>
  );
}
