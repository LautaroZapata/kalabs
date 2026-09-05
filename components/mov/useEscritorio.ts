"use client";

import { useEffect, useState } from "react";

/**
 * Motion escribe el transform inline, así que pisa cualquier rotación puesta
 * desde CSS. Las rotaciones de las fichas pasan a vivir en JS y este hook dice
 * cuándo usar los valores de escritorio.
 *
 * En el servidor devuelve false (valores de mobile). Como sólo afecta a la
 * rotación, la corrección al hidratar no mueve el layout.
 */
export function useEscritorio(consulta = "(min-width: 900px)") {
  const [ancho, setAncho] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(consulta);
    const leer = () => setAncho(mq.matches);
    leer();
    mq.addEventListener("change", leer);
    return () => mq.removeEventListener("change", leer);
  }, [consulta]);

  return ancho;
}
