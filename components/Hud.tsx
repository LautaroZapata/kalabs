"use client";

import { useEffect, useRef, useState } from "react";
import { INDICE, SITE } from "@/lib/content";
import s from "./Hud.module.css";

/**
 * Riel de estado fijo al pie: hora de Montevideo, sección activa y avance.
 * Es la parte "retrofuturista" que además sirve: reemplaza a un menú.
 */
export default function Hud() {
  const [reloj, setReloj] = useState<string>("--:--:--");
  const [activa, setActiva] = useState(INDICE[0]);
  const barra = useRef<HTMLDivElement>(null);

  /* Hora local de Montevideo (UTC−3), calculada en el cliente para no
     romper la hidratación con la hora del servidor. */
  useEffect(() => {
    const tic = () => {
      setReloj(
        new Intl.DateTimeFormat("es-UY", {
          timeZone: "America/Montevideo",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(new Date())
      );
    };
    tic();
    const t = window.setInterval(tic, 1000);
    return () => window.clearInterval(t);
  }, []);

  /* Sección visible. */
  useEffect(() => {
    const nodos = INDICE.map((i) => document.getElementById(i.id)).filter(
      (n): n is HTMLElement => Boolean(n)
    );
    if (!nodos.length) return;

    const io = new IntersectionObserver(
      (entradas) => {
        const visible = entradas
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const found = INDICE.find((i) => i.id === visible.target.id);
        if (found) setActiva(found);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.01, 0.5, 1] }
    );

    nodos.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  /* Avance de lectura. */
  useEffect(() => {
    let raf = 0;
    const pintar = () => {
      raf = 0;
      const alto = document.documentElement.scrollHeight - window.innerHeight;
      const p = alto > 0 ? Math.min(1, Math.max(0, window.scrollY / alto)) : 0;
      if (barra.current) barra.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(pintar);
    };
    pintar();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className={s.hud} role="status" aria-live="off">
      <div ref={barra} className={s.progress} style={{ width: "100%", transform: "scaleX(0)" }} aria-hidden="true" />

      <div className={`${s.cell} ${s.now} monoSm`}>
        <span className={s.dot} aria-hidden="true" />
        <span>
          <b>{activa.num}</b> {activa.label}
        </span>
      </div>

      <div className={`${s.cell} ${s.grow} ${s.hideSm} monoSm`}>
        <span>{activa.nota}</span>
      </div>

      <div className={`${s.cell} ${s.hideSm} monoSm`}>
        <span>Turno {SITE.turno}</span>
      </div>

      <div className={`${s.cell} ${s.clock} monoSm`}>
        <span className="sr">Hora en Montevideo:</span>
        <span>MVD {reloj}</span>
      </div>
    </div>
  );
}
