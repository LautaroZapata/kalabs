"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Entrada por scroll.
 *
 * Reemplaza a un <div> conservando su className, así no agrega un nodo extra
 * que rompa las grillas. Antes esto lo hacía Motion; para un fundido de veinte
 * pixeles no hace falta una librería de animación, así que quedó un
 * IntersectionObserver y una transición de CSS —la clase `.rev` vive en
 * globals.css porque la usan cinco secciones distintas—.
 *
 * `once`: se enciende una vez y se deja de observar. Un bloque que se apaga al
 * salir de pantalla y se vuelve a encender al subir es mareo, no diseño.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  as: Comp = "div",
}: {
  children: ReactNode;
  className?: string;
  /** Segundos de retardo, para escalonar hermanos. */
  delay?: number;
  as?: "div" | "section" | "article" | "li";
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const nodo = ref.current;
    if (!nodo) return;

    const io = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada.isIntersecting) return;
        setVisible(true);
        io.disconnect();
      },
      { threshold: 0.14 },
    );

    io.observe(nodo);
    return () => io.disconnect();
  }, []);

  return (
    <Comp
      /* El tipo del ref depende del tag y TypeScript no puede resolverlo con
         un componente dinámico; el nodo es siempre un HTMLElement. */
      ref={ref as React.Ref<never>}
      className={className ? `rev ${className}` : "rev"}
      data-visible={visible ? "true" : undefined}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </Comp>
  );
}
