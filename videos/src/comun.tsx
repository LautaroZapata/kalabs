import type { ComponentType, ReactNode } from "react";
import { CameraMotionBlur } from "@remotion/motion-blur";
import { AbsoluteFill, Sequence } from "remotion";
import { ConFuentes, PAPEL, TINTA } from "./base";
import { Circulo, Empuje, Firma, FIRMA, Golpes, Plano } from "./kinetico";
import { CIELO, NOCHE } from "./paneles";
import { Post, type Golpe } from "./taller";

/* ==========================================================================
   Lo que comparten los videos de paneles: el marco y las dos estructuras,
   promocional y consejo.
   ========================================================================== */

/**
 * Fuentes, posproducción por fuera y desenfoque de movimiento por dentro.
 * `muestras` son los subcuadros que se promedian por cuadro; 1 lo apaga,
 * para mirar cuadros sueltos rápido.
 */
export function Pelicula({ golpes, muestras, children }: { golpes: Golpe[]; muestras: number; children: ReactNode }) {
  return (
    <ConFuentes>
      <Post golpes={golpes}>
        <CameraMotionBlur samples={muestras} shutterAngle={180}>
          <AbsoluteFill style={{ background: CIELO }}>{children}</AbsoluteFill>
        </CameraMotionBlur>
      </Post>
    </ConFuentes>
  );
}

/** El titular de la escena, arriba y dentro de la zona segura. */
export function Titular({ renglones, desde, marca, claro }: { renglones: string[]; desde: number; marca?: string; claro?: boolean }) {
  return (
    <div style={{ position: "absolute", left: 90, top: 250, width: 900 }}>
      <Golpes renglones={renglones} color={claro ? PAPEL : TINTA} desde={desde} paso={3} tope={104} marca={marca} />
    </div>
  );
}

/* --------------------------------------------------------------------------
   Promocional: una escena de paneles con su titular, y la firma.
   -------------------------------------------------------------------------- */

export type Promo = { Escena: ComponentType; dura: number; golpes: Golpe[] };

export const duracionPromo = (p: Promo) => p.dura + FIRMA;

export function VideoPromo({ promo: p, muestras }: { promo: Promo; muestras: number }) {
  const Escena = p.Escena;
  return (
    <Pelicula golpes={[...p.golpes, { en: p.dura + 4, fuerza: 0.6 }]} muestras={muestras}>
      <Sequence durationInFrames={p.dura + 14}>
        <Escena />
      </Sequence>
      <Sequence from={p.dura}>
        <Circulo>
          <Firma />
        </Circulo>
      </Sequence>
    </Pelicula>
  );
}

/* --------------------------------------------------------------------------
   Consejo: pregunta, demostración con paneles, consejo y firma.
   -------------------------------------------------------------------------- */

export type Consejo = {
  pregunta: string[];
  Demo: ComponentType;
  demo: number;
  golpes: Golpe[];
  consejo: string[];
  marca: string;
  /** Pregunta y consejo sobre tinta en vez de papel. */
  oscuro?: boolean;
};

const PREGUNTA = 54;
const CONSEJO = 100;

export const duracionConsejo = (c: Consejo) => PREGUNTA + c.demo + CONSEJO + FIRMA;
/** La portada: el consejo ya escrito entero. */
export const portadaConsejo = (c: Consejo) => PREGUNTA + c.demo + 70;

function Lamina({ renglones, marca, dura, oscuro }: { renglones: string[]; marca?: string; dura: number; oscuro?: boolean }) {
  return (
    <Empuje dura={dura} hasta={1.04}>
      <Plano fondo={oscuro ? NOCHE : CIELO}>
        <Golpes renglones={renglones} color={oscuro ? PAPEL : TINTA} marca={marca} desde={3} paso={3} tope={210} />
      </Plano>
    </Empuje>
  );
}

export function VideoConsejo({ consejo: c, muestras }: { consejo: Consejo; muestras: number }) {
  const demo = PREGUNTA;
  const cierre = demo + c.demo;
  const firma = cierre + CONSEJO;
  const golpes: Golpe[] = [
    { en: 3, fuerza: 0.5 },
    ...c.golpes.map((g) => ({ ...g, en: demo + g.en })),
    { en: cierre, fuerza: 0.4 },
    { en: firma + 4, fuerza: 0.6 },
  ];
  const Demo = c.Demo;
  return (
    <Pelicula golpes={golpes} muestras={muestras}>
      <Sequence durationInFrames={PREGUNTA}>
        <Lamina renglones={c.pregunta} dura={PREGUNTA} oscuro={c.oscuro} />
      </Sequence>
      <Sequence from={demo} durationInFrames={c.demo}>
        <Demo />
      </Sequence>
      <Sequence from={cierre} durationInFrames={CONSEJO + 14}>
        <Lamina renglones={c.consejo} marca={c.marca} dura={CONSEJO} oscuro={c.oscuro} />
      </Sequence>
      <Sequence from={firma}>
        <Circulo>
          <Firma />
        </Circulo>
      </Sequence>
    </Pelicula>
  );
}
