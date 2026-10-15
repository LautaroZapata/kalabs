"use client";

import { usePathname } from "next/navigation";

/**
 * La dirección que no existe, tal como la pidió el visitante. Ver la que
 * escribió es lo que le deja notar la letra que le sobra.
 */
export default function RutaPedida() {
  const ruta = usePathname() ?? "/";
  let legible = ruta;
  try {
    legible = decodeURI(ruta);
  } catch {}
  return <span translate="no">{legible}</span>;
}
