import type { MetadataRoute } from "next";
import { PROYECTOS, SERVICIOS, SITE } from "@/lib/content";

/* La home es una sola página y sus secciones son anclas, no URLs: las anclas no
   van al sitemap —Google indexa el documento, no sus fragmentos—.

   Lo que sí va son las páginas que sí existen: una por servicio y una por
   proyecto. Salen de `content.ts` y no de una lista escrita a mano acá, así que
   agregar un servicio lo suma al sitemap sin que haya que acordarse.

   Las prioridades son relativas entre sí y sólo dentro de este sitio: la home
   manda, los servicios son lo que se vende y los casos son la prueba. */
export default function sitemap(): MetadataRoute.Sitemap {
  const fecha = new Date();

  return [
    {
      url: SITE.url,
      lastModified: fecha,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...SERVICIOS.map((serv) => ({
      url: `${SITE.url}/servicios/${serv.slug}`,
      lastModified: fecha,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...PROYECTOS.map((p) => ({
      url: `${SITE.url}/obra/${p.slug}`,
      lastModified: fecha,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
