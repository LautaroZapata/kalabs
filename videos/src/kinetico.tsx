import type { ReactNode } from "react";
import { AbsoluteFill, Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SITE } from "@/lib/content";
import { iso, ISO_RATIO } from "@/lib/marca";
import { ABAJO, ajustar, ANCHO, ARRIBA, BRASA, DISPLAY, MARGEN, PAPEL, REBOTE, SECO, TINTA } from "./base";

/* ==========================================================================
   Las piezas del movimiento.

   Tipografía que golpea palabra por palabra, el círculo que trae una escena
   y la firma del cierre. Todo sale de la paleta del estudio: papel, tinta y
   brasa.
   ========================================================================== */

/** El color que se lee sobre cada fondo. */
export const contra = (fondo: string) => (fondo === TINTA ? PAPEL : TINTA);

/** Un plano entero de color, con el contenido centrado en la zona segura. */
export function Plano({ fondo, children, arriba = false }: { fondo: string; children?: ReactNode; arriba?: boolean }) {
  return (
    <AbsoluteFill
      style={{
        background: fondo,
        padding: `${ARRIBA}px ${MARGEN}px ${ABAJO}px`,
        display: "flex",
        flexDirection: "column",
        justifyContent: arriba ? "flex-start" : "center",
      }}
    >
      {children}
    </AbsoluteFill>
  );
}

/** La cámara que empuja: nada queda quieto mientras está en pantalla. */
export function Empuje({ dura, hasta = 1.06, children }: { dura: number; hasta?: number; children: ReactNode }) {
  const f = useCurrentFrame();
  const s = interpolate(f, [0, dura], [1, hasta], { extrapolateRight: "clamp" });
  return <AbsoluteFill style={{ transform: `scale(${s})` }}>{children}</AbsoluteFill>;
}

/**
 * Renglones que entran palabra por palabra: cada una sube, se agranda y se
 * pasa un poco antes de asentarse. La palabra `marca` lleva un plano de brasa
 * que se estira detrás.
 */
export function Golpes({
  renglones,
  color,
  desde = 0,
  paso = 3,
  marca,
  tope = 190,
}: {
  renglones: string[];
  color: string;
  desde?: number;
  paso?: number;
  marca?: string;
  tope?: number;
}) {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cuerpo = ajustar(renglones, ANCHO, tope);
  let n = 0;
  return (
    <div style={{ ...DISPLAY, fontSize: cuerpo, color, display: "flex", flexDirection: "column" }}>
      {renglones.map((r, i) => (
        <div key={i} style={{ display: "flex", gap: "0.24em", whiteSpace: "pre" }}>
          {r.split(" ").map((w, j) => {
            const t = desde + n++ * paso;
            const s = spring({ frame: f - t, fps, config: REBOTE });
            const marcada = w === marca;
            const m = spring({ frame: f - t - 5, fps, config: SECO });
            return (
              <span
                key={j}
                style={{
                  position: "relative",
                  display: "inline-block",
                  opacity: Math.min(1, s * 3),
                  transformOrigin: "left bottom",
                  transform: `translateY(${(1 - s) * 70}%) scale(${0.4 + 0.6 * s}) rotate(${(1 - s) * -10}deg)`,
                }}
              >
                {marcada ? (
                  <span
                    style={{
                      position: "absolute",
                      left: "-0.1em",
                      right: "-0.1em",
                      top: "0.06em",
                      bottom: "-0.04em",
                      background: BRASA,
                      transformOrigin: "left center",
                      transform: `scaleX(${m})`,
                    }}
                  />
                ) : null}
                <span style={{ position: "relative", color: marcada ? TINTA : color }}>{w}</span>
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
}

/** Transición: un círculo de color que crece desde un punto y trae la escena. */
export function Circulo({ x = 540, y = 845, children }: { x?: number; y?: number; children: ReactNode }) {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const r = spring({ frame: f, fps, config: SECO, durationInFrames: 14 }) * 2300;
  return <AbsoluteFill style={{ clipPath: `circle(${r}px at ${x}px ${y}px)` }}>{children}</AbsoluteFill>;
}

/**
 * El cierre de todos los videos: la K cae girando, el nombre sube letra por
 * letra y abajo la condición que invita a escribir.
 */
export function Firma({ extra }: { extra?: string }) {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const k = spring({ frame: f - 3, fps, config: REBOTE });
  const alto = 230;
  const linea = (desde: number) => {
    const s = spring({ frame: f - desde, fps, config: SECO });
    return { opacity: s, transform: `translateY(${(1 - s) * 40}px)` };
  };
  const subrayado = spring({ frame: f - 34, fps, config: SECO });
  return (
    <Plano fondo={BRASA}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <Img
          src={iso(TINTA)}
          style={{
            width: alto * ISO_RATIO,
            height: alto,
            transform: `scale(${k}) rotate(${(1 - k) * -140}deg)`,
          }}
        />
        <div style={{ ...DISPLAY, fontSize: 210, color: TINTA, display: "flex", marginTop: 30 }}>
          {SITE.nombre.split("").map((l, i) => {
            const s = spring({ frame: f - 10 - i * 2, fps, config: REBOTE });
            return (
              <span key={i} style={{ display: "inline-block", transform: `translateY(${(1 - s) * 90}%)`, opacity: Math.min(1, s * 3) }}>
                {l}
              </span>
            );
          })}
        </div>
        <div style={{ fontFamily: "Cuerpo", fontWeight: 700, fontSize: 48, color: TINTA, marginTop: 44, ...linea(24) }}>
          Primera consulta sin costo.
        </div>
        {extra ? (
          <div style={{ fontFamily: "Cuerpo", fontWeight: 600, fontSize: 40, color: TINTA, marginTop: 10, ...linea(28) }}>
            {extra}
          </div>
        ) : null}
        <div style={{ position: "relative", marginTop: 34, ...linea(32) }}>
          <div style={{ fontFamily: "Cuerpo", fontWeight: 700, fontSize: 48, color: TINTA }}>{SITE.email}</div>
          <div
            style={{
              height: 6,
              marginTop: 6,
              background: TINTA,
              transformOrigin: "left center",
              transform: `scaleX(${subrayado})`,
            }}
          />
        </div>
      </div>
    </Plano>
  );
}

/** Lo que dura el cierre, en cuadros: la entrada y dos segundos quieto. */
export const FIRMA = 110;
