import { notFound } from "next/navigation";
import Barra from "@/components/Barra";
import Cierre from "@/components/Cierre";
import Datos from "@/components/Datos";
import Migas from "@/components/Migas";
import Pie from "@/components/Pie";
import s from "@/components/Sub.module.css";
import { SERVICIOS, SITE, UI } from "@/lib/content";
import { estudio, metadatos, migas, preguntas, url } from "@/lib/seo";

/**
 * La página propia de cada servicio.
 *
 * La home los nombra a los tres en una pestaña de tres renglones, que alcanza
 * para elegir pero no para que la lea un buscador: un documento con tres
 * oficios adentro no puede rankear por ninguno. Acá cada uno tiene su URL, su
 * titular con la palabra que alguien escribe en Google, su cuerpo largo y sus
 * preguntas frecuentes.
 *
 * Ruta dinámica y no tres archivos: los tres documentos son el mismo molde con
 * distinto texto, y el texto ya vivía en `content.ts`. Tres archivos serían
 * tres copias del molde para mantener sincronizadas a mano.
 */

type Props = { params: Promise<{ servicio: string }> };

/* Los tres caminos se conocen en el build y no hay más: `dynamicParams` en
   falso hace que cualquier otro slug devuelva 404 en vez de renderizar una
   página vacía que después el buscador indexa. */
export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICIOS.map((serv) => ({ servicio: serv.slug }));
}

function buscar(slug: string) {
  return SERVICIOS.find((serv) => serv.slug === slug);
}

export async function generateMetadata({ params }: Props) {
  const { servicio } = await params;
  const serv = buscar(servicio);
  if (!serv) return {};

  return metadatos(serv, `/servicios/${serv.slug}`);
}

export default async function Page({ params }: Props) {
  const { servicio } = await params;
  const serv = buscar(servicio);

  /* Con `dynamicParams` en falso esto no debería pasar nunca, pero el tipo dice
     que puede: sin el `notFound` el resto del componente trabaja con `undefined`. */
  if (!serv) notFound();

  const camino = `/servicios/${serv.slug}`;
  const otros = SERVICIOS.filter((o) => o.slug !== serv.slug);

  /* El servicio como entidad, colgado del estudio. `areaServed` es lo que le
     dice a Google dónde se presta, que es la mitad de una búsqueda local. */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: serv.seoTitulo,
    description: serv.seoDescripcion,
    url: url(camino),
    serviceType: serv.titulo,
    provider: estudio,
    areaServed: [
      { "@type": "City", name: SITE.ciudad },
      { "@type": "Country", name: SITE.pais },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: serv.titulo,
      itemListElement: serv.entregables.map((e) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: e },
      })),
    },
  };

  return (
    <>
      <Datos
        bloques={[
          jsonLd,
          migas([
            { nombre: UI.migasInicio, camino: "/" },
            { nombre: UI.migasServicios, camino: "/#servicios" },
            { nombre: serv.titulo, camino },
          ]),
          preguntas(serv.faq),
        ]}
      />

      <Barra fuera />

      <main id="contenido" className="caja">
        <article className={s.pagina}>
          <Migas
            camino={[
              { nombre: UI.migasInicio, camino: "/" },
              { nombre: UI.migasServicios, camino: "/#servicios" },
              { nombre: serv.titulo, camino },
            ]}
          />

          <header className={s.cabecera}>
            <p className={`${s.rotulo} et`}>{UI.migasServicios}</p>
            <h1 className={`${s.h1} titular`}>{serv.h1}</h1>
          </header>

          <p className={s.intro}>{serv.intro}</p>

          <ul className={s.etiquetas}>
            {serv.entregables.map((e) => (
              <li key={e} className={`${s.etiqueta} et`}>
                {e}
              </li>
            ))}
          </ul>

          <div className={s.cuerpo}>
            {serv.bloques.map((b) => (
              <section key={b.titulo} className={s.bloque}>
                <h2 className={`${s.bloqueTitulo} titular titular--sec`}>
                  {b.titulo}
                </h2>
                <p className={s.bloqueCuerpo}>{b.cuerpo}</p>
              </section>
            ))}
          </div>

          {/* Las preguntas van en `<details>` abiertos por defecto: el requisito
              del `FAQPage` es que la respuesta esté visible, y un acordeón
              cerrado de entrada lo cumple de forma discutible. Abiertos, además,
              son texto que se lee de corrido. */}
          <section className={s.faq} aria-labelledby="faq-t">
            <h2 id="faq-t" className={`${s.faqTitulo} titular`}>
              {UI.subFaq}
            </h2>

            {serv.faq.map((p) => (
              <details key={p.pregunta} className={s.pregunta} open>
                <summary>
                  {p.pregunta}
                  <span className={s.signo} aria-hidden="true">
                    +
                  </span>
                </summary>
                <p className={s.respuesta}>{p.respuesta}</p>
              </details>
            ))}
          </section>

          <nav className={s.otros} aria-labelledby="otros-t">
            <p id="otros-t" className={`${s.rotulo} et`}>
              {UI.subOtros}
            </p>
            <ul className={s.otrosLista}>
              {otros.map((o) => (
                <li key={o.slug}>
                  <a className="pastilla" href={`/servicios/${o.slug}`}>
                    {o.titulo}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <Cierre />
        </article>
      </main>

      <Pie fuera />
    </>
  );
}
