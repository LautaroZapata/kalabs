import type { MetadataRoute } from "next";
import { SITE } from "@/lib/content";

/* El sitio es una sola página: las secciones son anclas, no URLs, y las anclas
   no van al sitemap —Google indexa el documento, no sus fragmentos—. Cuando
   los proyectos tengan página propia, cada una se suma acá. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
