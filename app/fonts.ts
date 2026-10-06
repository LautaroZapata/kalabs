import { Hanken_Grotesk } from "next/font/google";

/**
 * Una sola familia: Hanken Grotesk. Titulares, cuerpo, rótulos y datos.
 *
 * Antes los titulares iban en Bricolage Grotesque, con eje óptico. Tenía
 * carácter, pero sus curvas caprichosas se leían más jugadas que la barra y el
 * cuerpo, que ya estaban en Hanken. La jerarquía la hacen ahora el peso, el
 * tamaño y el tracking, no un cambio de familia.
 *
 * No hay monoespaciada. El texto chico —etiquetas, pastillas, folios— va en
 * versalitas de esta misma familia.
 */
export const body = Hanken_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});
