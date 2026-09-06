import { Fraunces, Newsreader } from "next/font/google";

/**
 * Dos familias, no tres.
 *
 * La versión anterior sumaba una mono para datos y folios, y entre eso, los
 * titulares y el cuerpo convivían tres tipografías: demasiadas voces para un
 * sitio de una página. Ahora hay una redonda y una cursiva, y cada rol sabe a
 * cuál pertenece.
 *
 * Fraunces es la redonda: sólo titulares, siempre vertical. Trae dos ejes que
 * casi ninguna otra tiene —SOFT redondea los remates, WONK activa las formas
 * torcidas de la itálica dentro de la redonda—, así que ya tiene adentro la
 * inquietud que en otras familias habría que pedirle a una cursiva aparte.
 */
export const display = Fraunces({
  subsets: ["latin"],
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
  variable: "--font-display",
});

/**
 * Newsreader es todo lo demás: cuerpo, bajadas, datos y folios. Su itálica es
 * la única cursiva del sistema —no hay itálicas de Fraunces en ninguna parte—
 * y los datos van en versalitas, que es como firma un diario, no en mono.
 */
export const body = Newsreader({
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-body",
});
