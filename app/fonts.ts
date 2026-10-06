import { Bricolage_Grotesque, Hanken_Grotesk } from "next/font/google";

/**
 * Dos familias, no tres. Hanken manda; Bricolage es el acento.
 *
 * Bricolage Grotesque va sólo donde el sitio levanta la voz: la pregunta de la
 * portada, los nombres de los proyectos, la frase del banner y la marca. Es una
 * grotesca variable con eje óptico —`opsz`—: a cuerpo grande cierra el
 * espaciado y afina las curvas, y por eso se pide el eje y no sólo el peso.
 *
 * Antes era la de todos los titulares, y el sitio se leía más jugado que
 * formal. Ahora los títulos de sección, los servicios y los botones van en
 * Hanken, y Bricolage aparece poco para que se note cuando aparece.
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
 * Hanken Grotesk es todo lo demás: títulos de sección, cuerpo, bajadas,
 * rótulos, botones y datos.
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
