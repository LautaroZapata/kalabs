"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { esferaEnEscena, montar, type Ajustes, type Encuadre } from "./motor";
import s from "./Escena.module.css";

/**
 * Vista previa del héroe con video: el clip revelado en loop, dibujado en
 * WebGL con paralaje según la profundidad, y la portada encima, en la franja
 * de cielo de cada escena. Es una prueba local para elegir entre el lago y la
 * sierra; no está en la portada del sitio.
 */
type Variante = "lago" | "sierra";

type Escena = Ajustes & {
  alt: string;
  /** Lo que la barra ve detrás: el video no tiene un color de fondo que leer. */
  tono: "claro" | "oscuro";
};

const ESCENAS: Record<Variante, Escena> = {
  lago: {
    alt: "Un lago de día, con cerros verdes y cielo azul; un muelle de madera largo, entre juncos, lleva hasta una esfera de luz naranja que flota sobre el agua.",
    foco: { x: 0.515, y: 0.5 },
    zoom: 1.06,
    paralaje: 0.022,
    profundidad: "/heroe/lago-profundidad.png",
    tono: "oscuro",
    esfera: { x: 0.516, y: 0.522, r: 0.076 },
    grano: 0.036,
  },
  sierra: {
    alt: "Lomas verdes de día bajo un cielo azul, con un ombú solo en la cima y una esfera de luz naranja que sale por detrás de su copa.",
    foco: { x: 0.53, y: 0.5 },
    zoom: 1.06,
    paralaje: 0.022,
    profundidad: "/heroe/sierra-profundidad.png",
    tono: "oscuro",
  },
};


/** `archivo`: otro video para la misma escena (mismo encuadre), para comparar versiones. */
export default function Escena({
  variante,
  archivo = variante,
  children,
}: {
  variante: Variante;
  archivo?: string;
  children?: ReactNode;
}) {
  const escena = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const relevo = useRef<HTMLVideoElement>(null);
  const lienzo = useRef<HTMLCanvasElement>(null);
  const aj = ESCENAS[variante];

  useEffect(() => {
    const el = escena.current, v = video.current, cv = lienzo.current;
    if (!el || !v || !cv) return;
    const ajustes = ESCENAS[variante];

    /* La portada se calza en la esfera: posición en cada cuadro, y el tamaño
       de letra sólo cuando cambia el diámetro (medir texto es caro). Las
       letras se achican si "RES" o "LVER" no entran a los lados. */
    let ultimoD = -1;
    const calzar = (e: Encuadre) => {
      el.style.setProperty("--ox", `${e.x.toFixed(1)}px`);
      el.style.setProperty("--oy", `${e.y.toFixed(1)}px`);
      if (Math.abs(e.d - ultimoD) < 0.5) return;
      ultimoD = e.d;
      el.style.setProperty("--od", `${e.d.toFixed(1)}px`);
      let f = (e.d * 0.9) / 0.7;
      el.style.setProperty("--of", `${f.toFixed(1)}px`);
      const izq = el.querySelector<HTMLElement>("[data-letras=izq]");
      const der = el.querySelector<HTMLElement>("[data-letras=der]");
      if (izq && der) {
        const margen = Math.max(22, el.clientWidth * 0.045), hueco = f * 0.05;
        const lugarIzq = e.x - e.d / 2 - margen, lugarDer = el.clientWidth - e.x - e.d / 2 - margen;
        const escala = Math.min(1, lugarIzq / (izq.offsetWidth + hueco), lugarDer / (der.offsetWidth + hueco));
        if (escala < 1) {
          f *= escala;
          el.style.setProperty("--of", `${f.toFixed(1)}px`);
        }
      }
    };
    const estatico = () => {
      const e = esferaEnEscena(ajustes, el.clientWidth, el.clientHeight, v.videoWidth || 1920, v.videoHeight || 1080);
      if (e) {
        ultimoD = -1;
        calzar(e);
      }
    };
    estatico();
    void document.fonts?.ready.then(estatico);
    const obs = new ResizeObserver(estatico);
    obs.observe(el);

    /* El grano del texto se mueve como el del video: otra semilla cada tanto. */
    const ruido = el.querySelector("feTurbulence");
    let semilla = 0;
    const granear = setInterval(() => ruido?.setAttribute("seed", String((semilla = (semilla + 1) % 97))), 83);

    const quieto = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (quieto) {
      v.pause();
      clearInterval(granear);
    }
    const desmontar = quieto ? undefined : montar({ escena: el, video: v, relevo: relevo.current ?? undefined, lienzo: cv }, ajustes, calzar);
    return () => {
      desmontar?.();
      obs.disconnect();
      clearInterval(granear);
    };
  }, [variante]);

  const franja = { "--foco": `${aj.foco.x * 100}% ${aj.foco.y * 100}%` } as CSSProperties;

  return (
    <section className={s.marco} aria-label="Portada" data-escena data-tono={aj.tono}>
      <div ref={escena} className={s.escena} style={franja}>
        <video
          ref={video}
          className={s.video}
          src={`/heroe/${archivo}.mp4`}
          poster={`/heroe/${archivo}.jpg`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label={aj.alt}
        />
        {/* El relevo del loop: invisible, lo usa sólo el shader. */}
        <video
          ref={relevo}
          className={s.relevo}
          src={`/heroe/${archivo}.mp4`}
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
        />
        <canvas ref={lienzo} className={s.lienzo} aria-hidden="true" />
        {/* El grano del texto: ruido monocromo mezclado sobre las letras, como
            el del revelado. Lo usa la clase `.film` de la portada. */}
        <svg className={s.filtros} aria-hidden="true" focusable="false">
          <filter id="grano-texto" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="0" result="ruido" />
            <feColorMatrix in="ruido" type="saturate" values="0" result="gris" />
            <feBlend in="SourceGraphic" in2="gris" mode="overlay" result="granado" />
            <feComposite in="granado" in2="SourceGraphic" operator="in" />
          </filter>
        </svg>
        <div className={s.texto}>{children}</div>
      </div>
    </section>
  );
}
