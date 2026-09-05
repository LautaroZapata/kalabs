"use client";

import { useEffect, useRef } from "react";
import { animate } from "motion";

/**
 * Arrastre con inercia sobre un contenedor que ya tiene scroll nativo.
 *
 * Se mantiene el scroll del navegador —así siguen andando el teclado, la
 * rueda del trackpad y el gesto táctil, que ya trae su propia inercia— y sólo
 * se agrega el arrastre con el mouse, que es lo que el navegador no da.
 */
export function useArrastre<T extends HTMLElement>(claseAgarrando: string) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const quieto = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let activo = false;
    let xInicial = 0;
    let scrollInicial = 0;
    let xPrevia = 0;
    let tPrevia = 0;
    let velocidad = 0; // px por ms
    let glide: { stop: () => void } | null = null;

    const frenar = () => {
      glide?.stop();
      glide = null;
      el.style.scrollSnapType = "";
    };

    const abajo = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      frenar();
      activo = true;
      xInicial = xPrevia = e.clientX;
      scrollInicial = el.scrollLeft;
      tPrevia = performance.now();
      velocidad = 0;
      el.classList.add(claseAgarrando);
      /* El imán del scroll-snap pelea contra la asignación de scrollLeft y el
         arrastre deja de seguir al cursor. Se apaga mientras dura el gesto y
         se devuelve al terminar, para que la ficha igual asiente sola. */
      el.style.scrollSnapType = "none";
    };

    const mover = (e: PointerEvent) => {
      if (!activo) return;
      e.preventDefault();
      const ahora = performance.now();
      const dt = ahora - tPrevia;
      if (dt > 0) velocidad = (e.clientX - xPrevia) / dt;
      xPrevia = e.clientX;
      tPrevia = ahora;
      el.scrollLeft = scrollInicial - (e.clientX - xInicial);
    };

    const arriba = () => {
      if (!activo) return;
      activo = false;
      el.classList.remove(claseAgarrando);

      const tope = el.scrollWidth - el.clientWidth;
      const devolverIman = () => {
        el.style.scrollSnapType = "";
      };

      if (quieto || Math.abs(velocidad) < 0.08 || tope <= 0) {
        devolverIman();
        return;
      }

      const desde = el.scrollLeft;
      const hasta = Math.min(tope, Math.max(0, desde - velocidad * 280));
      glide = animate(desde, hasta, {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (v) => {
          el.scrollLeft = v;
        },
        onComplete: devolverIman,
      });
    };

    el.addEventListener("pointerdown", abajo);
    window.addEventListener("pointermove", mover, { passive: false });
    window.addEventListener("pointerup", arriba);
    window.addEventListener("pointercancel", arriba);
    // cualquier scroll que no venga del arrastre corta la inercia
    el.addEventListener("wheel", frenar, { passive: true });

    return () => {
      frenar();
      el.removeEventListener("pointerdown", abajo);
      window.removeEventListener("pointermove", mover);
      window.removeEventListener("pointerup", arriba);
      window.removeEventListener("pointercancel", arriba);
      el.removeEventListener("wheel", frenar);
    };
  }, [claseAgarrando]);

  return ref;
}
