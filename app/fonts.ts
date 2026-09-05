import { Schibsted_Grotesk, JetBrains_Mono } from "next/font/google";

/**
 * Una sola grotesca para titulares y cuerpo, llevada a dos extremos de peso:
 * 900 con tracking cerrado para los titulares, 400 para leer. El sistema
 * queda cohesivo sin necesitar una familia display aparte.
 */
export const sans = Schibsted_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

/** Etiquetas chicas, datos y estados. */
export const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});
