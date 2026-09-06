import { Fraunces, Newsreader, Martian_Mono } from "next/font/google";

/**
 * Tres familias, lógica de imprenta.
 *
 * Fraunces es variable y trae dos ejes que casi ninguna otra tiene: SOFT
 * (redondea los remates) y WONK (activa las formas torcidas de la itálica en
 * la redonda). Con los dos al máximo la letra deja de verse calculada —que es
 * exactamente lo que delata a una tipografía de sistema.
 */
export const display = Fraunces({
  subsets: ["latin"],
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
  variable: "--font-display",
});

/** Cuerpo de texto: serif editorial, pensada para leer párrafos largos. */
export const body = Newsreader({
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-body",
});

/** Datos, folios y etiquetas: la mono más ancha y más dura del catálogo. */
export const mono = Martian_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});
