import Image from "next/image";
import { notFound } from "next/navigation";
import Barra from "@/components/Barra";
import Cierre from "@/components/Cierre";
import Datos from "@/components/Datos";
import Migas from "@/components/Migas";
import Pie from "@/components/Pie";
import s from "@/components/Sub.module.css";
import { PROYECTOS, UI } from "@/lib/content";
import { estudio, metadatos, migas, url } from "@/lib/seo";

/**
 * La página propia de cada proyecto: el caso contado.
 *
 * En la home los tres trabajos son una fila que enlaza al sitio del cliente.
 * Eso es bueno para mostrar y malo para dos cosas: el visitante se va del sitio
 * en el primer click, y todo lo que hicimos queda contado en una línea. Acá el
 * caso tiene problema, solución y resultado, y el enlace al sitio en vivo está
 * al final, que es donde alguien que ya leyó quiere ir.
 *
 * Es también la página que responde a las búsquedas por rubro —«software de
 * flotas», «app de finanzas»— que la home no cubre.
 */

type Props = { params: Promise<{ proyecto: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return PROYECTOS.map((p) => ({ proyecto: p.slug }));
}

function buscar(slug: string) {
  return PROYECTOS.find((p) => p.slug === slug);
}

export async function generateMetadata({ params }: Props) {
  const { proyecto } = await params;
  const p = buscar(proyecto);
  if (!p) return {};

  const meta = metadatos(p, `/obra/${p.slug}`);

  /* La captura del proyecto como imagen social, en vez de la placa genérica del
     estudio: el que comparte el caso está compartiendo el trabajo, no la marca. */
  return {
    ...meta,
    openGraph: {
      ...meta.openGraph,
      images: [{ url: p.imagen, alt: p.imagenAlt }],
    },
  };
}

export default async function Page({ params }: Props) {
  const { proyecto } = await params;
  const p = buscar(proyecto);

  if (!p) notFound();

  const camino = `/obra/${p.slug}`;
  const otros = PROYECTOS.filter((o) => o.slug !== p.slug);
  const nombre = p.nombreLargo ?? p.nombre;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: nombre,
    alternateName: p.nombre,
    description: p.seoDescripcion,
    url: p.href,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    datePublished: p.anio,
    image: url(p.imagen),
    /* Quién lo hizo. Es el enlace que ata el trabajo al estudio: sin esto el
       caso es una página sobre un producto ajeno. */
    author: estudio,
    creator: estudio,
  };

  return (
    <>
      <Datos
        bloques={[
          jsonLd,
          migas([
            { nombre: UI.migasInicio, camino: "/" },
            { nombre: UI.migasObra, camino: "/#obra" },
            { nombre: nombre, camino },
          ]),
        ]}
      />

      <Barra fuera />

      <main id="contenido" className="caja">
        <article className={s.pagina}>
          <Migas
            camino={[
              { nombre: UI.migasInicio, camino: "/" },
              { nombre: UI.migasObra, camino: "/#obra" },
              { nombre: nombre, camino },
            ]}
          />

          <header className={s.cabecera}>
            <p className={`${s.rotulo} et`}>{p.rubro}</p>
            <h1 className={`${s.h1} titular`}>{p.h1}</h1>
          </header>

          <p className={s.intro}>{p.intro}</p>

          <div className={s.captura}>
            <Image
              src={p.imagen}
              alt={p.imagenAlt}
              fill
              sizes="(min-width: 1000px) 900px, 100vw"
              priority
            />
          </div>

          <div className={s.ficha}>
            <span className={`${s.fichaDato} et`}>
              {UI.subAnio}: <b>{p.anio}</b>
            </span>
            <a
              className="pastilla"
              href={p.href}
              target="_blank"
              rel="noreferrer noopener"
            >
              {UI.subVerSitio} ↗
            </a>
          </div>

          <div className={s.cuerpo}>
            {p.bloques.map((b) => (
              <section key={b.titulo} className={s.bloque}>
                <h2 className={`${s.bloqueTitulo} titular titular--sec`}>
                  {b.titulo}
                </h2>
                <p className={s.bloqueCuerpo}>{b.cuerpo}</p>
              </section>
            ))}
          </div>

          <section className={s.otros} aria-labelledby="stack-t">
            <p id="stack-t" className={`${s.rotulo} et`}>
              {UI.subStack}
            </p>
            <ul className={s.etiquetas}>
              {p.stack.map((t) => (
                <li key={t} className={`${s.etiqueta} et`}>
                  {t}
                </li>
              ))}
            </ul>
          </section>

          <nav className={s.otros} aria-labelledby="otros-t">
            <p id="otros-t" className={`${s.rotulo} et`}>
              {UI.subOtrosCasos}
            </p>
            <ul className={s.otrosLista}>
              {otros.map((o) => (
                <li key={o.slug}>
                  <a className="pastilla" href={`/obra/${o.slug}`}>
                    {o.nombreLargo ?? o.nombre}
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
