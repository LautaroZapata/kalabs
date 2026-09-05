const CURVA = [0.16, 1, 0.3, 1] as const;

type Opciones = {
  /** true cuando el sistema pide movimiento reducido. */
  quieto: boolean | null;
  y?: number;
  rotate?: number;
  delay?: number;
  margin?: string;
};

/**
 * Props de entrada por scroll para un elemento de Motion.
 *
 * Con movimiento reducido no alcanza con no animar: el HTML servido ya trae
 * opacity:0 inline, así que hay que pedirle explícitamente el estado final en
 * el montaje. Si no, el bloque queda invisible hasta entrar en pantalla.
 */
export function entrada({
  quieto,
  y = 26,
  rotate = 0,
  delay = 0,
  margin = "-10% 0px -12% 0px",
}: Opciones) {
  if (quieto) {
    return {
      initial: false as const,
      animate: { opacity: 1, y: 0, rotate },
      transition: { duration: 0 },
    };
  }

  return {
    initial: { opacity: 0, y, rotate: 0 },
    whileInView: { opacity: 1, y: 0, rotate },
    viewport: { once: true, margin },
    transition: { duration: 0.7, ease: CURVA, delay },
  };
}
