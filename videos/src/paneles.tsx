import { createContext, useContext, type CSSProperties, type ReactNode } from "react";
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { BRASA, INK_4, PAPEL, TINTA } from "./base";

/* ==========================================================================
   Paneles en el espacio.

   La estética de un lanzamiento de producto: tarjetas de interfaz que flotan
   en 3D con sombras suaves, un teléfono con marco de metal y una cámara que
   orbita despacio. Cada panel llega desde la profundidad, se asienta sin
   rebotar y queda respirando apenas.
   ========================================================================== */

/** El fondo: blanco cálido arriba que se apaga hacia el piso. */
export const CIELO = "#fbf9f4";
export const PISO = "#e4dfd4";
/** La cara de los paneles: un blanco apenas más limpio que el fondo. */
export const CARA = "#ffffff";
export const GRIS = "#8d8a84";
export const LINEA = "rgba(15, 18, 20, 0.08)";

/** Llegada de producto: lenta, pesada, sin pasarse. */
export const LLEGADA = { damping: 22, stiffness: 70, mass: 1.2 };

/**
 * El escenario: perspectiva y cámara. Todo lo que va adentro se ubica en
 * píxeles desde el centro de la pantalla (x a la derecha, y hacia abajo, z
 * hacia el que mira). `giro` es la órbita de la cámara, en grados, del
 * primer al último cuadro de la escena.
 *
 * Cada objeto flota en su propia capa 3D, con la misma cámara, y las capas se
 * apilan por profundidad. Si compartieran un solo espacio, el navegador
 * cortaría los planos donde se cruzan: un panel que llega desde el fondo
 * atravesaría el teléfono y se vería partido.
 */
type Camara = { transform: string };
const CamaraCtx = createContext<Camara>({ transform: "none" });

/**
 * Una parada de la cámara: en el cuadro `en` mira al punto (x, y) del mundo
 * con acercamiento `s`. Entre paradas viaja con arranque y frenada suaves.
 * Sirve para recorrer una línea de tiempo o para alejarse de un detalle.
 */
export type Clave = { en: number; s?: number; x?: number; y?: number };

const VIAJE = Easing.bezier(0.65, 0, 0.35, 1);

function porClaves(f: number, claves: Clave[], k: "s" | "x" | "y", def: number) {
  const con = claves.filter((c) => c[k] !== undefined);
  if (!con.length) return def;
  if (con.length === 1) return con[0][k] as number;
  return interpolate(
    f,
    con.map((c) => c.en),
    con.map((c) => c[k] as number),
    { easing: VIAJE, extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
}

/** Tinta con un halo apenas más claro detrás de la escena. */
export const NOCHE = `radial-gradient(ellipse 90% 70% at 50% 45%, #22272a 0%, ${TINTA} 75%)`;

export function Escenario({
  children,
  dura,
  giro = [-7, 5],
  inclina = 8,
  alto = 80,
  acerca = [0.84, 0.9],
  claves,
  oscuro = false,
}: {
  children: ReactNode;
  dura: number;
  giro?: [number, number];
  inclina?: number;
  alto?: number;
  acerca?: [number, number];
  claves?: Clave[];
  oscuro?: boolean;
}) {
  const f = useCurrentFrame();
  const t = interpolate(f, [0, dura], [0, 1], { extrapolateRight: "clamp" });
  const suave = t * t * (3 - 2 * t);
  const ry = giro[0] + (giro[1] - giro[0]) * suave;
  const lejos = acerca[0] + (acerca[1] - acerca[0]) * suave;
  const s = claves ? porClaves(f, claves, "s", lejos) : lejos;
  const x = claves ? porClaves(f, claves, "x", 0) : 0;
  const y = claves ? porClaves(f, claves, "y", 0) : 0;
  const camara = {
    transform: `translateY(${alto}px) scale(${s}) rotateX(${inclina}deg) rotateY(${ry}deg) translate3d(${-x}px, ${-y}px, 0)`,
  };
  const fondo = oscuro ? NOCHE : `linear-gradient(180deg, ${CIELO} 0%, ${CIELO} 55%, ${PISO} 100%)`;
  return (
    <AbsoluteFill style={{ background: fondo, isolation: "isolate" }}>
      <CamaraCtx.Provider value={camara}>{children}</CamaraCtx.Provider>
    </AbsoluteFill>
  );
}

/**
 * La capa de un objeto: perspectiva y cámara propias. `z` ordena las capas;
 * a igual profundidad, tapa la que se declara después.
 */
function Capa({ z, children }: { z: number; children: ReactNode }) {
  const { transform } = useContext(CamaraCtx);
  return (
    <AbsoluteFill style={{ perspective: 2600, perspectiveOrigin: "50% 45%", zIndex: 1000 + Math.round(z) }}>
      <div style={{ position: "absolute", left: 540, top: 900, width: 0, height: 0, transformStyle: "preserve-3d", transform }}>
        {children}
      </div>
    </AbsoluteFill>
  );
}

export type Pose = { x: number; y: number; z?: number; rx?: number; ry?: number; rz?: number };

/**
 * Cómo se mueve algo que flota: llega desde atrás y abajo, inclinado, y ya
 * asentado respira con una deriva lenta. `fase` desfasa la respiración para
 * que los paneles no floten al unísono.
 */
function usePose(p: Pose, desde: number, fase: number, hasta?: number, respira = 1) {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: f - desde, fps, config: LLEGADA });
  /* La salida: se va hacia atrás y arriba, más rápido de lo que llegó. */
  const e = hasta === undefined ? 0 : spring({ frame: f - hasta, fps, config: { damping: 24, stiffness: 110, mass: 1 } });
  const aire = f - desde;
  const y = p.y + (1 - s) * 320 - e * 260 + Math.sin(aire / 34 + fase) * 7 * respira;
  const z = (p.z ?? 0) - (1 - s) * 1500 - e * 1800;
  const rx = (p.rx ?? 0) + (1 - s) * 38 + Math.sin(aire / 47 + fase) * 1.2 * respira;
  const ry = (p.ry ?? 0) - (1 - s) * 18 + Math.cos(aire / 53 + fase) * 1.5 * respira;
  const rz = (p.rz ?? 0) + (1 - s) * -6;
  return {
    visible: s > 0.002 && e < 0.55,
    /* Se apaga en la primera mitad de la salida: así ya no está cuando llega
       lo que la reemplaza en el mismo lugar. */
    opacity: Math.min(1, s * 1.8) * Math.max(0, 1 - e * 1.8),
    transform: `translate3d(${p.x}px, ${y}px, ${z}px) rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg)`,
  };
}

/** Sombra de objeto apoyado en el aire: una cercana y nítida, otra larga y suave. */
export const SOMBRA =
  "0 1px 2px rgba(15,18,20,0.05), 0 10px 22px -6px rgba(15,18,20,0.10), 0 42px 80px -18px rgba(15,18,20,0.24)";

export function Panel({
  pose,
  w,
  h,
  desde,
  hasta,
  fase = 0,
  radio = 34,
  fondo = CARA,
  estilo,
  respira = 1,
  desnudo = false,
  vuelta = 0,
  reverso,
  children,
}: {
  pose: Pose;
  w: number;
  h: number;
  desde: number;
  hasta?: number;
  fase?: number;
  radio?: number;
  fondo?: string;
  estilo?: CSSProperties;
  /** Cuánto flota una vez asentado: 0 lo deja quieto, para lo que va unido por líneas. */
  respira?: number;
  /** Sin tarjeta: ni fondo ni sombra. Para las líneas que unen paneles. */
  desnudo?: boolean;
  /** Media vuelta sobre el eje vertical, de 0 a 1; pasada la mitad muestra el `reverso`. */
  vuelta?: number;
  reverso?: ReactNode;
  children?: ReactNode;
}) {
  const m = usePose(pose, desde, fase, hasta, respira);
  if (!m.visible) return null;
  const dada = vuelta > 0.5;
  return (
    <Capa z={pose.z ?? 0}>
      <div
        style={{
          position: "absolute",
          left: -w / 2,
          top: -h / 2,
          width: w,
          height: h,
          borderRadius: radio,
          background: desnudo ? "transparent" : fondo,
          boxShadow: desnudo ? "none" : `${SOMBRA}, inset 0 0 0 1px ${LINEA}`,
          opacity: m.opacity,
          transform: `${m.transform} rotateY(${vuelta * 180}deg)`,
          overflow: desnudo ? "visible" : "hidden",
          fontFamily: "Cuerpo",
          color: TINTA,
          ...estilo,
        }}
      >
        {dada ? <div style={{ position: "absolute", inset: 0, transform: "scaleX(-1)" }}>{reverso}</div> : children}
      </div>
    </Capa>
  );
}

/**
 * El teléfono: marco de metal cepillado, bisel negro, isla y botones al
 * costado. La pantalla es lo que va adentro.
 */
export function Telefono({
  pose,
  desde,
  hasta,
  fase = 0,
  children,
}: {
  pose: Pose;
  desde: number;
  hasta?: number;
  fase?: number;
  children?: ReactNode;
}) {
  const m = usePose(pose, desde, fase, hasta);
  if (!m.visible) return null;
  const W = 440;
  const H = 910;
  const boton = (lado: "izq" | "der", top: number, alto: number) => (
    <div
      style={{
        position: "absolute",
        [lado === "izq" ? "left" : "right"]: -5,
        top,
        width: 7,
        height: alto,
        borderRadius: 4,
        background: "linear-gradient(90deg, #8e8e8c, #d9d9d6 50%, #8e8e8c)",
      }}
    />
  );
  return (
    <Capa z={pose.z ?? 0}>
      <div
        style={{
          position: "absolute",
          left: -W / 2,
          top: -H / 2,
          width: W,
          height: H,
          opacity: m.opacity,
          transform: m.transform,
        }}
      >
        {boton("izq", 190, 44)}
        {boton("izq", 260, 80)}
        {boton("izq", 356, 80)}
        {boton("der", 280, 120)}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 78,
            padding: 9,
            background: "linear-gradient(120deg, #f2f2f0 0%, #b9b9b6 22%, #ecece9 45%, #a3a3a0 70%, #dededb 100%)",
            boxShadow:
              "0 60px 110px -24px rgba(15,18,20,0.40), 0 24px 40px -12px rgba(15,18,20,0.22), inset 0 0 0 1px rgba(255,255,255,0.7), inset 0 -2px 3px rgba(0,0,0,0.18)",
          }}
        >
          <div style={{ width: "100%", height: "100%", borderRadius: 70, padding: 11, background: "#121314" }}>
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                borderRadius: 60,
                background: "#fbfaf7",
                overflow: "hidden",
                fontFamily: "Cuerpo",
                color: TINTA,
              }}
            >
              {children}
              <div style={{ position: "absolute", left: "50%", top: 16, width: 116, height: 34, marginLeft: -58, borderRadius: 17, background: "#0b0b0c" }} />
              {/* El brillo del vidrio. */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(125deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 38%)",
                  pointerEvents: "none",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Capa>
  );
}

/**
 * La ventana del navegador: barra con los tres puntos y la dirección. Sin
 * marca de ningún navegador: es una ventana, no una captura.
 */
export function Navegador({
  pose,
  desde,
  hasta,
  fase = 0,
  w = 900,
  h = 600,
  direccion = "sunegocio.com.uy",
  children,
}: {
  pose: Pose;
  desde: number;
  hasta?: number;
  fase?: number;
  w?: number;
  h?: number;
  direccion?: string;
  children?: ReactNode;
}) {
  return (
    <Panel pose={pose} w={w} h={h} desde={desde} hasta={hasta} fase={fase} radio={22}>
      <div style={{ height: 58, display: "flex", alignItems: "center", gap: 10, padding: "0 22px", borderBottom: `1px solid ${LINEA}`, background: "#f6f4ef" }}>
        {["#e0ddd6", "#e0ddd6", "#e0ddd6"].map((c, i) => (
          <div key={i} style={{ width: 14, height: 14, borderRadius: 7, background: c }} />
        ))}
        <div
          style={{
            marginLeft: 24,
            flex: 1,
            height: 32,
            borderRadius: 16,
            background: CARA,
            boxShadow: `inset 0 0 0 1px ${LINEA}`,
            display: "flex",
            alignItems: "center",
            padding: "0 16px",
            fontSize: 19,
            fontWeight: 600,
            color: GRIS,
          }}
        >
          {direccion}
        </div>
      </div>
      <div style={{ position: "relative", height: h - 58 }}>{children}</div>
    </Panel>
  );
}

/* --------------------------------------------------------------------------
   Piezas de interfaz
   -------------------------------------------------------------------------- */

export function Rotulo({ children, color = GRIS, tam = 22, estilo }: { children: ReactNode; color?: string; tam?: number; estilo?: CSSProperties }) {
  return <div style={{ fontSize: tam, fontWeight: 700, color, letterSpacing: "-0.01em", ...estilo }}>{children}</div>;
}

export function Grande({ children, tam = 64, estilo }: { children: ReactNode; tam?: number; estilo?: CSSProperties }) {
  return <div style={{ fontSize: tam, fontWeight: 800, letterSpacing: "-0.045em", lineHeight: 1, ...estilo }}>{children}</div>;
}

/** Píldora de estado. `punto` le pone el puntito de color adelante. */
export function Pildora({
  children,
  fondo = TINTA,
  color = "#ffffff",
  punto,
  tam = 22,
  estilo,
}: {
  children: ReactNode;
  fondo?: string;
  color?: string;
  punto?: string;
  tam?: number;
  estilo?: CSSProperties;
}) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        padding: `${tam * 0.45}px ${tam * 0.9}px`,
        borderRadius: 999,
        background: fondo,
        color,
        fontSize: tam,
        fontWeight: 700,
        letterSpacing: "-0.01em",
        whiteSpace: "nowrap",
        ...estilo,
      }}
    >
      {punto ? <div style={{ width: tam * 0.42, height: tam * 0.42, borderRadius: 99, background: punto }} /> : null}
      {children}
    </div>
  );
}

export type Glifo = "check" | "campana" | "calendario" | "doc" | "flecha" | "caja" | "persona" | "lupa" | "sobre" | "tabla" | "reloj" | "candado";

/** Íconos de trazo, dibujados acá: pocos y sólo donde nombran algo. */
export function Icono({ nombre, tam = 36, color = TINTA, grosor = 2.4 }: { nombre: Glifo; tam?: number; color?: string; grosor?: number }) {
  const p = { fill: "none", stroke: color, strokeWidth: grosor, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const trazos: Record<string, ReactNode> = {
    check: <path d="M5 12.5 L10 17 L19 7" {...p} />,
    campana: (
      <>
        <path d="M6 16 V11 a6 6 0 0 1 12 0 V16 L19.5 18 H4.5 Z" {...p} />
        <path d="M10 20.5 a2 2 0 0 0 4 0" {...p} />
      </>
    ),
    calendario: (
      <>
        <rect x="4" y="5.5" width="16" height="14.5" rx="3" {...p} />
        <path d="M4 10 H20 M8.5 3.5 V7 M15.5 3.5 V7" {...p} />
      </>
    ),
    doc: (
      <>
        <path d="M7 3.5 H14 L18.5 8 V20.5 H7 Z" {...p} />
        <path d="M14 3.5 V8 H18.5 M10 13 H15.5 M10 16.5 H15.5" {...p} />
      </>
    ),
    flecha: <path d="M4 12 H19 M13.5 6.5 L19 12 L13.5 17.5" {...p} />,
    caja: (
      <>
        <path d="M4 8 L12 4 L20 8 V16.5 L12 20.5 L4 16.5 Z" {...p} />
        <path d="M4 8 L12 12 L20 8 M12 12 V20.5" {...p} />
      </>
    ),
    persona: (
      <>
        <circle cx="12" cy="8.5" r="3.8" {...p} />
        <path d="M4.5 20 a7.5 7.5 0 0 1 15 0" {...p} />
      </>
    ),
    lupa: (
      <>
        <circle cx="10.5" cy="10.5" r="6" {...p} />
        <path d="M15 15 L20 20" {...p} />
      </>
    ),
    sobre: (
      <>
        <rect x="3.5" y="6" width="17" height="12.5" rx="2.5" {...p} />
        <path d="M4.5 7.5 L12 13 L19.5 7.5" {...p} />
      </>
    ),
    tabla: (
      <>
        <rect x="4" y="4.5" width="16" height="15" rx="2.5" {...p} />
        <path d="M4 9.5 H20 M4 14.5 H20 M10 9.5 V19.5" {...p} />
      </>
    ),
    reloj: (
      <>
        <circle cx="12" cy="12" r="8" {...p} />
        <path d="M12 7.5 V12 L15 14" {...p} />
      </>
    ),
    candado: (
      <>
        <rect x="5" y="10.5" width="14" height="10" rx="2.5" {...p} />
        <path d="M8.5 10.5 V8 a3.5 3.5 0 0 1 7 0 V10.5" {...p} />
      </>
    ),
  };
  return (
    <svg width={tam} height={tam} viewBox="0 0 24 24">
      {trazos[nombre]}
    </svg>
  );
}

/** Un círculo de color con un ícono adentro, como el del avión de la referencia. */
export function Sello({ nombre, fondo = TINTA, tam = 64 }: { nombre: Parameters<typeof Icono>[0]["nombre"]; fondo?: string; tam?: number }) {
  return (
    <div style={{ width: tam, height: tam, borderRadius: tam, background: fondo, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <Icono nombre={nombre} tam={tam * 0.56} color="#ffffff" grosor={2.6} />
    </div>
  );
}

/** Barra de pestañas del pie de una app. `activa` es el índice en brasa. */
export function Pestanas({ items, activa }: { items: [Parameters<typeof Icono>[0]["nombre"], string][]; activa: number }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-around", alignItems: "flex-start", height: "100%", paddingTop: 22 }}>
      {items.map(([ic, t], i) => (
        <div key={t} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <Icono nombre={ic} tam={34} color={i === activa ? BRASA : INK_4} />
          <div style={{ fontSize: 19, fontWeight: 700, color: i === activa ? BRASA : INK_4 }}>{t}</div>
          {i === activa ? <div style={{ width: 44, height: 4, borderRadius: 2, background: BRASA, marginTop: 2 }} /> : null}
        </div>
      ))}
    </div>
  );
}

/** Aparece con un fundido corto cuando llega su cuadro. Para lo que cambia dentro de una pantalla. */
export function Aparece({ desde, children, sube = 16 }: { desde: number; children: ReactNode; sube?: number }) {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: f - desde, fps, config: { damping: 20, stiffness: 140, mass: 0.7 } });
  return <div style={{ opacity: s, transform: `translateY(${(1 - s) * sube}px)` }}>{children}</div>;
}

/* --------------------------------------------------------------------------
   Más objetos
   -------------------------------------------------------------------------- */

/**
 * La computadora portátil: pantalla con bisel negro y, abisagrada abajo, la
 * base de aluminio que se tiende hacia el que mira. Pantalla y base son dos
 * planos de un mismo objeto: la opacidad va en cada uno, porque sobre el
 * contenedor aplanaría la bisagra.
 */
export function Portatil({
  pose,
  desde,
  hasta,
  fase = 0,
  w = 940,
  h = 600,
  children,
}: {
  pose: Pose;
  desde: number;
  hasta?: number;
  fase?: number;
  w?: number;
  h?: number;
  children?: ReactNode;
}) {
  const m = usePose(pose, desde, fase, hasta, 0.6);
  if (!m.visible) return null;
  return (
    <Capa z={pose.z ?? 0}>
      <div style={{ position: "absolute", left: -w / 2, top: -h / 2, width: w, height: h, transform: m.transform, transformStyle: "preserve-3d" }}>
        <div
          style={{
            position: "absolute",
            left: -34,
            right: -34,
            top: h - 2,
            height: 470,
            transformOrigin: "50% 0",
            transform: "rotateX(84deg)",
            borderRadius: "10px 10px 40px 40px",
            background: "linear-gradient(180deg, #d6d5d1 0%, #c3c2be 100%)",
            boxShadow: "inset 0 2px 0 rgba(255,255,255,0.6), 0 40px 90px rgba(15,18,20,0.35)",
            opacity: m.opacity,
          }}
        >
          <div style={{ position: "absolute", left: 70, right: 70, top: 36, height: 240, borderRadius: 14, background: "#b3b2ae" }} />
          <div style={{ position: "absolute", left: "50%", width: 300, marginLeft: -150, top: 296, height: 150, borderRadius: 16, background: "#cbcac6", boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.06)" }} />
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 26,
            padding: 16,
            background: "#161718",
            boxShadow: "0 50px 100px -30px rgba(15,18,20,0.45), inset 0 0 0 2px #3a3b3d",
            opacity: m.opacity,
          }}
        >
          <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: 8, overflow: "hidden", background: "#fbfaf7", fontFamily: "Cuerpo", color: TINTA }}>
            {children}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(125deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0) 35%)" }} />
          </div>
        </div>
      </div>
    </Capa>
  );
}

type Punto = [number, number];

/** La curva entre dos puntos: sale y llega horizontal, o vertical si se pide. */
function curva(a: Punto, b: Punto, vertical = false) {
  const c1: Punto = vertical ? [a[0], a[1] + (b[1] - a[1]) * 0.55] : [a[0] + (b[0] - a[0]) * 0.55, a[1]];
  const c2: Punto = vertical ? [b[0], b[1] - (b[1] - a[1]) * 0.55] : [b[0] - (b[0] - a[0]) * 0.55, b[1]];
  const en = (t: number): Punto => {
    const u = 1 - t;
    return [
      u * u * u * a[0] + 3 * u * u * t * c1[0] + 3 * u * t * t * c2[0] + t * t * t * b[0],
      u * u * u * a[1] + 3 * u * u * t * c1[1] + 3 * u * t * t * c2[1] + t * t * t * b[1],
    ];
  };
  let largo = 0;
  let prev = a;
  for (let i = 1; i <= 40; i++) {
    const q = en(i / 40);
    largo += Math.hypot(q[0] - prev[0], q[1] - prev[1]);
    prev = q;
  }
  return { d: `M ${a[0]} ${a[1]} C ${c1[0]} ${c1[1]}, ${c2[0]} ${c2[1]}, ${b[0]} ${b[1]}`, en, largo };
}

export type Enlace = {
  de: Punto;
  a: Punto;
  /** Cuánto del trazo está dibujado, de 0 a 1. */
  trazo: number;
  color?: string;
  opacidad?: number;
  grosor?: number;
  /** Dónde va el pulso sobre la línea, de 0 a 1; fuera de ese tramo no se ve. */
  pulso?: number;
  vertical?: boolean;
};

/**
 * Las líneas que unen paneles, dibujadas en el plano del mundo (mismas
 * coordenadas que las poses). Van en una capa apenas detrás de los paneles,
 * así cada línea nace y muere debajo de una tarjeta.
 */
export function Enlaces({ lineas, z = -6 }: { lineas: Enlace[]; z?: number }) {
  const W = 3200;
  const H = 2400;
  return (
    <Panel pose={{ x: 0, y: 0, z }} w={W} h={H} desde={-90} respira={0} desnudo>
      <svg width={W} height={H} viewBox={`${-W / 2} ${-H / 2} ${W} ${H}`} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
        {lineas.map((l, i) => {
          const c = curva(l.de, l.a, l.vertical);
          const color = l.color ?? TINTA;
          const p = l.pulso !== undefined && l.pulso > 0 && l.pulso < 1 ? c.en(l.pulso) : null;
          return (
            <g key={i} opacity={l.opacidad ?? 1}>
              <path
                d={c.d}
                fill="none"
                stroke={color}
                strokeWidth={l.grosor ?? 4}
                strokeLinecap="round"
                strokeDasharray={c.largo}
                strokeDashoffset={c.largo * (1 - l.trazo)}
                opacity={l.trazo > 0.001 ? 1 : 0}
              />
              {p ? (
                <>
                  <circle cx={p[0]} cy={p[1]} r={26} fill={BRASA} opacity={0.2} />
                  <circle cx={p[0]} cy={p[1]} r={12} fill={BRASA} />
                </>
              ) : null}
            </g>
          );
        })}
      </svg>
    </Panel>
  );
}

/**
 * La marca de muestra de «Su marca»: dos cuartos de círculo enfrentados, un
 * molinete que se lee como una S sin ser la letra. No es la marca de nadie.
 */
export function LogoMuestra({ tam = 120, color = TINTA, acento = BRASA }: { tam?: number; color?: string; acento?: string }) {
  return (
    <svg width={tam} height={tam} viewBox="0 0 100 100" style={{ display: "block", flexShrink: 0 }}>
      <path d="M 50 50 L 50 6 A 44 44 0 0 0 6 50 Z" fill={color} />
      <path d="M 50 50 L 50 94 A 44 44 0 0 0 94 50 Z" fill={acento} />
    </svg>
  );
}

/** El logotipo completo de muestra: la marca y el nombre al lado. */
export function Logotipo({ tam = 64, color = TINTA, acento = BRASA }: { tam?: number; color?: string; acento?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: tam * 0.3 }}>
      <LogoMuestra tam={tam} color={color} acento={acento} />
      <div style={{ fontFamily: "Cuerpo", fontSize: tam * 0.62, fontWeight: 800, letterSpacing: "-0.04em", color, whiteSpace: "nowrap" }}>Su marca</div>
    </div>
  );
}

/** Un interruptor de permiso: `on` de 0 a 1, para animar el cambio. */
export function Llave({ on, tam = 40 }: { on: number; tam?: number }) {
  const w = tam * 1.7;
  return (
    <div style={{ position: "relative", width: w, height: tam, borderRadius: tam, background: on > 0.5 ? BRASA : "#dcd7cc", flexShrink: 0 }}>
      <div
        style={{
          position: "absolute",
          top: tam * 0.1,
          left: tam * 0.1 + on * (w - tam),
          width: tam * 0.8,
          height: tam * 0.8,
          borderRadius: tam,
          background: PAPEL,
          boxShadow: "0 2px 4px rgba(15,18,20,0.25)",
        }}
      />
    </div>
  );
}
