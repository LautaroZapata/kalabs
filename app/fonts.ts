import { Anton, Archivo, Space_Mono } from "next/font/google";

/** Titulares: condensada, pesada, sin aire. */
export const display = Anton({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-display",
});

/** Cuerpo: limpia pero con carácter. */
export const body = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

/** Etiquetas chicas, datos, estados. */
export const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-mono",
});
