import type { Metadata } from "next";
import { SITE, type Ficha, type Pregunta } from "./content";

/**
 * Lo que las páginas interiores le dicen a un buscador.
 *
 * Vive separado de `content.ts` por la misma regla de siempre: ahí va el texto
 * que alguien lee, acá el andamiaje que lo envuelve. Quien edita una pregunta
 * frecuente no tiene que entender schema.org para hacerlo.
 *
 * La home declara la entidad del estudio (`ProfessionalService`, en
 * `app/page.tsx`) y no se toca. Estas páginas declaran cosas distintas —un
 * servicio, un trabajo— y se cuelgan de aquella por `provider`. Dos bloques
 * peleando por ser el negocio es peor que uno solo bien puesto.
 */

/** La dirección completa de una página interior. Siempre con el host que sirve. */
export function url(camino: string) {
  return `${SITE.url}${camino}`;
}

/**
 * El `<head>` de una página interior, armado desde su ficha.
 *
 * La canónica es lo que más importa acá: sin ella, la misma página servida con
 * un parámetro de campaña pegado atrás cuenta como una URL distinta y las dos
 * compiten entre sí.
 */
export function metadatos(ficha: Ficha, camino: string): Metadata {
  const dir = url(camino);

  return {
    title: ficha.seoTitulo,
    description: ficha.seoDescripcion,
    alternates: { canonical: camino },
    openGraph: {
      type: "article",
      locale: "es_UY",
      url: dir,
      siteName: SITE.nombre,
      title: ficha.seoTitulo,
      description: ficha.seoDescripcion,
    },
    twitter: {
      card: "summary_large_image",
      title: ficha.seoTitulo,
      description: ficha.seoDescripcion,
    },
  };
}

export type Miga = { nombre: string; camino: string };

/**
 * El rastro de migas, en datos.
 *
 * Es lo que hace que en el resultado de búsqueda aparezca
 * «kalabs.dev › Servicios › Desarrollo web» en vez de la URL cruda. Cuesta
 * cuatro líneas y mejora el porcentaje de clicks sin tocar la posición.
 */
export function migas(camino: Miga[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: camino.map((m, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: m.nombre,
      item: url(m.camino),
    })),
  };
}

/**
 * Las preguntas frecuentes, en datos.
 *
 * Google puede mostrar la respuesta directamente bajo el resultado. Requisito
 * que no es opcional: la pregunta y la respuesta tienen que estar visibles en
 * la página. Por eso esto se arma desde el mismo arreglo que renderiza el
 * `<details>`, y no desde una lista paralela que alguien puede olvidarse de
 * actualizar.
 */
export function preguntas(faq: Pregunta[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((p) => ({
      "@type": "Question",
      name: p.pregunta,
      acceptedAnswer: { "@type": "Answer", text: p.respuesta },
    })),
  };
}

/** El estudio, nombrado como referencia desde otra entidad. */
export const estudio = {
  "@type": "ProfessionalService",
  name: SITE.nombre,
  url: SITE.url,
};
