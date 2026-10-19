import type { ComponentType } from "react";
import { Composition } from "remotion";
import { FPS, LIENZO } from "./base";
import { duracionConsejo, duracionPromo, portadaConsejo, VideoConsejo, VideoPromo } from "./comun";
import { CONSEJOS, PROMOS } from "./escenas";

/* Los videos llegan por nombre y no como objeto: Remotion pasa las props como
   JSON y las escenas, que son componentes, no sobreviven al viaje. */
function Promo({ id, muestras = 8 }: { id: string; muestras?: number; portada?: number }) {
  return <VideoPromo promo={PROMOS[id]} muestras={muestras} />;
}
function Consejo({ id, muestras = 8 }: { id: string; muestras?: number; portada?: number }) {
  return <VideoConsejo consejo={CONSEJOS[id]} muestras={muestras} />;
}

type Entrada = { id: string; component: ComponentType<any>; dura: number; portada: number };

/* El catálogo. `portada` es el cuadro que se baja como tapa del Reel. */
const VIDEOS: Entrada[] = [
  ...Object.entries(PROMOS).map(([id, p]) => ({ id, component: Promo, dura: duracionPromo(p), portada: p.dura - 30 })),
  ...Object.entries(CONSEJOS).map(([id, c]) => ({ id, component: Consejo, dura: duracionConsejo(c), portada: portadaConsejo(c) })),
];

export function Root() {
  return (
    <>
      {VIDEOS.map((v) => (
        <Composition
          key={v.id}
          id={v.id}
          component={v.component}
          durationInFrames={v.dura}
          fps={FPS}
          width={LIENZO.width}
          height={LIENZO.height}
          defaultProps={{ id: v.id, muestras: 8, portada: v.portada }}
        />
      ))}
    </>
  );
}
