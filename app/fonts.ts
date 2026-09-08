import { Bricolage_Grotesque, Hanken_Grotesk } from "next/font/google";

/**
 * Dos familias, no tres.
 *
 * Bricolage Grotesque es la de los titulares. Es una grotesca variable con eje
 * óptico —`opsz`—: a cuerpo grande cierra el espaciado y afina las curvas, y a
 * cuerpo chico las abre. Eso es lo que le da carácter sin necesidad de una
 * display aparte, y es la razón por la que se pide el eje y no sólo el peso.
 *
 * Antes acá había una serif —Fraunces— con una Newsreader de cuerpo. El sitio
 * era un diario impreso; ahora no lo es.
 */
/* Sin `weight`: pedir el eje óptico obliga a traer la variable entera, y con
   ella el peso también queda continuo. Una lista de pesos acá es un error de
   build, no una optimización. */
export const display = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz"],
  variable: "--font-display",
});

/**
 * Hanken Grotesk es todo lo demás: cuerpo, bajadas, rótulos y datos.
 *
 * No hay monoespaciada. El texto chico —etiquetas, pastillas, folios— va en
 * versalitas de esta misma familia: dos voces alcanzan, y una mono para
 * escribir «En producción» era una tercera que no aportaba nada.
 */
export const body = Hanken_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});
