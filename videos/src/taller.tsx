import type { ReactNode } from "react";
import { AbsoluteFill, random, useCurrentFrame } from "remotion";
import { PAPEL } from "./base";

/* ==========================================================================
   Posproducción: lo que va encima de todo.

   Grano fino que cambia cada cuadro, una viñeta apenas marcada, y el destello
   y la sacudida de cada golpe. La idea del golpe viene de pdoom-video
   (github.com/mexicat/pdoom-video, MIT); acá va medida, porque la escena de
   paneles es de producto y tiene que verse limpia.
   ========================================================================== */

export type Golpe = { en: number; fuerza?: number };

export function Post({ golpes, children }: { golpes: Golpe[]; children: ReactNode }) {
  const f = useCurrentFrame();
  let destello = 0;
  let sacudida = 0;
  for (const g of golpes) {
    const d = f - g.en;
    if (d < 0 || d > 20) continue;
    const k = g.fuerza ?? 1;
    destello += 0.16 * k * Math.exp(-d / 2.5);
    sacudida += 7 * k * Math.exp(-d / 3.5);
  }
  const cuadro = Math.floor(f);
  const sx = (random(`sx-${cuadro}`) - 0.5) * 2 * sacudida;
  const sy = (random(`sy-${cuadro}`) - 0.5) * 2 * sacudida;
  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <AbsoluteFill style={{ transform: `translate(${sx}px, ${sy}px)` }}>{children}</AbsoluteFill>
      <AbsoluteFill
        style={{
          background: "radial-gradient(ellipse 80% 65% at 50% 45%, rgba(0,0,0,0) 60%, rgba(8,9,10,0.10) 100%)",
        }}
      />
      <svg width="1080" height="1920" style={{ position: "absolute", inset: 0, mixBlendMode: "overlay", opacity: 0.12 }}>
        <filter id="grano">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed={cuadro % 97} stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="1080" height="1920" filter="url(#grano)" />
      </svg>
      {destello > 0.001 ? <AbsoluteFill style={{ background: PAPEL, opacity: Math.min(0.5, destello) }} /> : null}
    </AbsoluteFill>
  );
}
