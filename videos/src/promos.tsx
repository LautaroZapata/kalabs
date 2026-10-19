import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { BRASA, HUESO, INK_4, PAPEL, TERRA, TINTA } from "./base";
import { Titular } from "./comun";
import {
  Aparece,
  CARA,
  Enlaces,
  Escenario,
  GRIS,
  Grande,
  Icono,
  LINEA,
  LLEGADA,
  Logotipo,
  LogoMuestra,
  Panel,
  Pildora,
  Portatil,
  Rotulo,
  Sello,
  type Glifo,
  type Pose,
} from "./paneles";

/* ==========================================================================
   Promocionales. Cada uno con su propio escenario: la computadora con el
   tablero, el mapa de un flujo y la marca desarmada en sus piezas. Los datos
   son de muestra —«Su negocio», «Su marca»— y no se presentan como cliente.
   ========================================================================== */

const suelto = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** Tarjeta blanca con filete, para agrupar dentro de una pantalla. */
function Caja({ children, estilo }: { children: React.ReactNode; estilo?: React.CSSProperties }) {
  return (
    <div style={{ background: CARA, borderRadius: 16, boxShadow: `inset 0 0 0 1px ${LINEA}, 0 1px 2px rgba(15,18,20,0.04)`, padding: "16px 18px", ...estilo }}>
      {children}
    </div>
  );
}

/* --------------------------------------------------------------------------
   Sistemas a medida: la cámara arranca pegada a la agenda y se aleja hasta
   mostrar el tablero entero en la computadora. Después, lo que pasa en el
   tablero sale de la pantalla como aviso.
   -------------------------------------------------------------------------- */

const TURNOS: [string, string, "Confirmado" | "Pendiente" | "Atendido"][] = [
  ["09:00", "Consulta inicial", "Atendido"],
  ["10:30", "Revisión", "Confirmado"],
  ["12:00", "Entrega", "Confirmado"],
  ["15:30", "Consulta", "Pendiente"],
  ["17:00", "Seguimiento", "Pendiente"],
];

const PASA_A_LISTO = 176;
const BAJA_STOCK = 150;

function Tablero() {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const mueve = spring({ frame: f - PASA_A_LISTO, fps, config: { damping: 20, stiffness: 120 } });
  const envases = interpolate(f, [BAJA_STOCK, BAJA_STOCK + 30], [0.42, 0.14], suelto);
  const menu: [Glifo, string][] = [
    ["calendario", "Agenda"],
    ["doc", "Pedidos"],
    ["caja", "Stock"],
    ["persona", "Clientes"],
  ];
  const ficha = (n: string, estilo?: React.CSSProperties) => (
    <div style={{ padding: "8px 10px", borderRadius: 10, background: "#f4f1ea", fontSize: 15, fontWeight: 700, marginTop: 8, ...estilo }}>{n}</div>
  );
  return (
    <div style={{ display: "flex", height: "100%" }}>
      <div style={{ width: 176, background: "#f1eee7", padding: "24px 16px", borderRight: `1px solid ${LINEA}` }}>
        <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.03em", padding: "0 8px 20px" }}>Su negocio</div>
        {menu.map(([ic, t], i) => (
          <div
            key={t}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 10px",
              borderRadius: 10,
              marginBottom: 4,
              background: i === 0 ? CARA : "transparent",
              boxShadow: i === 0 ? `inset 0 0 0 1px ${LINEA}` : "none",
              fontSize: 17,
              fontWeight: 700,
              color: i === 0 ? TINTA : GRIS,
            }}
          >
            <Icono nombre={ic} tam={22} color={i === 0 ? BRASA : GRIS} />
            {t}
          </div>
        ))}
      </div>
      <div style={{ flex: 1, padding: "22px 24px" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
          <Grande tam={36}>Martes</Grande>
          <Rotulo tam={18}>Hoy</Rotulo>
          <Pildora punto={BRASA} tam={14} estilo={{ marginLeft: "auto" }}>
            Guardado
          </Pildora>
        </div>
        <div style={{ display: "flex", gap: 16, marginTop: 18 }}>
          <Caja estilo={{ flex: 1.15 }}>
            <Rotulo tam={16}>Turnos</Rotulo>
            {TURNOS.map(([hora, que, estado], i) => (
              <Aparece key={hora} desde={6 + i * 6} sube={10}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 0", borderBottom: i < 4 ? `1px solid ${LINEA}` : "none" }}>
                  <div style={{ fontSize: 18, fontWeight: 800, width: 54 }}>{hora}</div>
                  <div style={{ flex: 1, fontSize: 15, fontWeight: 600, color: INK_4 }}>{que}</div>
                  <Pildora tam={12} fondo={estado === "Confirmado" ? BRASA : estado === "Atendido" ? TINTA : HUESO} color={estado === "Pendiente" ? INK_4 : "#fff"}>
                    {estado}
                  </Pildora>
                </div>
              </Aparece>
            ))}
          </Caja>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
            <Caja>
              <Rotulo tam={16}>Pedidos</Rotulo>
              <div style={{ display: "flex", gap: 10, marginTop: 4, position: "relative" }}>
                {["Nuevos", "En preparación", "Listos"].map((c) => (
                  <div key={c} style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: GRIS, marginTop: 6, whiteSpace: "nowrap" }}>{c}</div>
                  </div>
                ))}
                {/* Las fichas van posicionadas para que una pueda cruzar de columna. */}
                <div style={{ position: "absolute", left: 0, top: 22, width: "31%" }}>{ficha("Silva")}</div>
                <div style={{ position: "absolute", left: 0, top: 62, width: "31%" }}>{ficha("Rodríguez")}</div>
                <div style={{ position: "absolute", left: `${34.5 + mueve * 34.5}%`, top: 22, width: "31%" }}>
                  {ficha("Gómez", { background: mueve > 0.5 ? BRASA : "#f4f1ea", color: mueve > 0.5 ? "#fff" : TINTA })}
                </div>
                <div style={{ position: "absolute", left: "69%", top: 62, width: "31%" }}>{ficha("Pérez")}</div>
                <div style={{ height: 96 }} />
              </div>
            </Caja>
            <Caja>
              <Rotulo tam={16}>Stock</Rotulo>
              {(
                [
                  ["Harina", 0.8, TINTA],
                  ["Aceite", 0.52, TINTA],
                  ["Envases", envases, envases < 0.2 ? BRASA : TINTA],
                ] as [string, number, string][]
              ).map(([n, v, c]) => (
                <div key={n} style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 12 }}>
                  <div style={{ width: 74, fontSize: 15, fontWeight: 700 }}>{n}</div>
                  <div style={{ flex: 1, height: 9, borderRadius: 5, background: HUESO }}>
                    <div style={{ width: `${v * 100}%`, height: "100%", borderRadius: 5, background: c }} />
                  </div>
                </div>
              ))}
            </Caja>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Un aviso que sale del tablero: sello, título y de dónde viene. */
function Aviso({ pose, desde, icono, fondo, titulo, origen, fase }: { pose: Pose; desde: number; icono: Glifo; fondo: string; titulo: string; origen: string; fase: number }) {
  return (
    <Panel pose={pose} w={460} h={118} desde={desde} fase={fase} radio={59}>
      <div style={{ display: "flex", alignItems: "center", gap: 20, height: "100%", padding: "0 28px" }}>
        <Sello nombre={icono} fondo={fondo} tam={62} />
        <Grande tam={34}>{titulo}</Grande>
        <Rotulo tam={19} estilo={{ marginLeft: "auto" }}>
          {origen}
        </Rotulo>
      </div>
    </Panel>
  );
}

export const SISTEMAS_DURA = 300;

export function EscenaSistemas() {
  return (
    <AbsoluteFill>
      <Escenario
        dura={SISTEMAS_DURA}
        giro={[-12, 4]}
        inclina={12}
        alto={40}
        claves={[
          { en: 0, s: 2.1, x: -150, y: 40 },
          { en: 40, s: 2.0, x: -140, y: 40 },
          { en: 140, s: 1.02, x: 0, y: 20 },
          { en: SISTEMAS_DURA, s: 1.08, x: 0, y: 20 },
        ]}
      >
        <Portatil pose={{ x: 0, y: 0, rx: -3, ry: -12 }} desde={-80}>
          <Tablero />
        </Portatil>
        <Aviso pose={{ x: 230, y: -280, z: 260, ry: -14, rz: 3 }} desde={PASA_A_LISTO + 6} icono="check" fondo={BRASA} titulo="Pedido listo" origen="Pedidos" fase={1} />
        <Aviso pose={{ x: -220, y: 300, z: 320, ry: 12, rz: -3 }} desde={BAJA_STOCK + 40} icono="caja" fondo={TINTA} titulo="Stock bajo" origen="Envases" fase={2} />
      </Escenario>
      <Titular renglones={["Turnos, pedidos y stock", "en un mismo sistema."]} marca="sistema." desde={146} />
    </AbsoluteFill>
  );
}

/* --------------------------------------------------------------------------
   Automatizaciones: un mapa visto desde arriba. Cuatro pasos unidos por
   líneas y un pulso que los recorre; cada paso se marca hecho cuando llega.
   Después el pulso vuelve a pasar, solo.
   -------------------------------------------------------------------------- */

type Paso = { x: number; y: number; icono: Glifo; titulo: string; bajada: string; hecho: string; fondo: string };

const PASOS: Paso[] = [
  { x: -200, y: -330, icono: "doc", titulo: "Formulario web", bajada: "Llega una consulta", hecho: "Recibida", fondo: TINTA },
  { x: 200, y: -110, icono: "tabla", titulo: "Planilla", bajada: "Se guardan los datos", hecho: "Guardada", fondo: TINTA },
  { x: -200, y: 110, icono: "sobre", titulo: "Correo al cliente", bajada: "Confirmación de recibo", hecho: "Enviado", fondo: BRASA },
  { x: 200, y: 330, icono: "campana", titulo: "Aviso al equipo", bajada: "Quién la atiende", hecho: "Avisado", fondo: BRASA },
];

/** Cuándo pasa el pulso por cada línea, en las dos vueltas. */
const VUELTAS = [84, 196];
const TRAMO = 24;

function Nodo({ paso, i }: { paso: Paso; i: number }) {
  const f = useCurrentFrame();
  const llega = VUELTAS[0] + i * TRAMO;
  /* En la segunda vuelta el estado parpadea apenas, para que se note que volvió a pasar. */
  const otra = VUELTAS[1] + i * TRAMO;
  const destello = interpolate(f, [otra, otra + 4, otra + 16], [0, 1, 0], suelto);
  return (
    <Panel pose={{ x: paso.x, y: paso.y }} w={470} h={146} desde={4 + i * 8} respira={0} radio={32}>
      <div style={{ display: "flex", alignItems: "center", gap: 18, height: "100%", padding: "0 24px" }}>
        <Sello nombre={paso.icono} fondo={paso.fondo} tam={64} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 27, fontWeight: 800, letterSpacing: "-0.03em" }}>{paso.titulo}</div>
          <div style={{ fontSize: 18, fontWeight: 600, color: GRIS, marginTop: 3 }}>{paso.bajada}</div>
        </div>
      </div>
      {f >= llega ? (
        <div style={{ position: "absolute", right: 18, top: 16 }}>
          <Aparece desde={llega} sube={8}>
            <Pildora tam={14} fondo={BRASA} estilo={{ boxShadow: `0 0 0 ${destello * 8}px rgba(255,107,26,${0.25 * destello})` }}>
              {paso.hecho}
            </Pildora>
          </Aparece>
        </div>
      ) : null}
    </Panel>
  );
}

export const AUTOMATIZACIONES_DURA = 300;

export function EscenaAutomatizaciones() {
  const f = useCurrentFrame();
  const lineas = PASOS.slice(0, -1).map((p, i) => {
    const q = PASOS[i + 1];
    const trazo = interpolate(f, [38 + i * 10, 62 + i * 10], [0, 1], suelto);
    /* El pulso: una vuelta, y la otra. */
    const t0 = VUELTAS[0] + i * TRAMO - TRAMO;
    const t1 = VUELTAS[1] + i * TRAMO - TRAMO;
    const en = (t: number) => interpolate(f, [t, t + TRAMO], [0, 1], suelto);
    const pulso = f < t1 ? en(t0) : en(t1);
    return { de: [p.x, p.y] as [number, number], a: [q.x, q.y] as [number, number], trazo, color: INK_4, opacidad: 0.3, grosor: 5, pulso };
  });
  return (
    <AbsoluteFill>
      <Escenario dura={AUTOMATIZACIONES_DURA} giro={[-8, 8]} inclina={24} alto={90} acerca={[1.02, 1.1]}>
        <Enlaces lineas={lineas} />
        {PASOS.map((p, i) => (
          <Nodo key={p.titulo} paso={p} i={i} />
        ))}
      </Escenario>
      <Titular renglones={["Cada tarea repetitiva,", "resuelta automáticamente."]} marca="automáticamente." desde={160} />
    </AbsoluteFill>
  );
}

/* --------------------------------------------------------------------------
   Identidad de marca: las piezas llegan apiladas y se abren en el espacio,
   como un despiece. Sobre tinta, para que el papel de las piezas se lea.
   -------------------------------------------------------------------------- */

type Pieza = { w: number; h: number; radio: number; fondo: string; a: Pose; contenido: React.ReactNode };

const PILA: Pose = { x: 0, y: 40, z: 0 };

const PIEZAS: Pieza[] = [
  {
    w: 380,
    h: 500,
    radio: 8,
    fondo: "#fffdf8",
    a: { x: 240, y: -150, z: -60, ry: -10, rz: 5 },
    contenido: (
      <div style={{ padding: "36px 34px" }}>
        <Logotipo tam={34} />
        <div style={{ marginTop: 44 }}>
          {[1, 0.92, 0.97, 0.6, 0, 0.95, 0.88, 0.5].map((w, i) => (
            <div key={i} style={{ height: 10, width: `${w * 100}%`, borderRadius: 5, background: w ? HUESO : "transparent", marginTop: 16 }} />
          ))}
        </div>
        <div style={{ position: "absolute", left: 34, right: 34, bottom: 30, borderTop: `3px solid ${BRASA}`, paddingTop: 12, fontSize: 15, fontWeight: 700, color: GRIS }}>
          sunegocio.com.uy
        </div>
      </div>
    ),
  },
  {
    w: 560,
    h: 170,
    radio: 18,
    fondo: BRASA,
    a: { x: -180, y: -330, z: 80, ry: 10, rz: -3 },
    contenido: (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
        <Logotipo tam={86} color={TINTA} acento={PAPEL} />
      </div>
    ),
  },
  {
    w: 440,
    h: 250,
    radio: 14,
    fondo: "#fffdf8",
    a: { x: -240, y: 230, z: 160, ry: 12, rz: -7 },
    contenido: (
      <div style={{ padding: "30px 32px", height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column" }}>
        <LogoMuestra tam={56} />
        <div style={{ marginTop: "auto" }}>
          <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.03em" }}>Su nombre</div>
          <div style={{ fontSize: 17, fontWeight: 600, color: GRIS, marginTop: 4 }}>Dirección · sunegocio.com.uy</div>
        </div>
      </div>
    ),
  },
  {
    w: 400,
    h: 140,
    radio: 20,
    fondo: "#fffdf8",
    a: { x: 230, y: 290, z: 200, ry: -12, rz: 4 },
    contenido: (
      <div style={{ display: "flex", gap: 14, padding: 22, height: "100%", boxSizing: "border-box" }}>
        {[TINTA, BRASA, TERRA, HUESO].map((c) => (
          <div key={c} style={{ flex: 1, borderRadius: 12, background: c, boxShadow: `inset 0 0 0 1px ${LINEA}` }} />
        ))}
      </div>
    ),
  },
  {
    w: 230,
    h: 230,
    radio: 115,
    fondo: TINTA,
    a: { x: -300, y: -40, z: 220, ry: 14 },
    contenido: (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", boxShadow: "inset 0 0 0 4px rgba(247,242,231,0.9)", borderRadius: 115 }}>
        <LogoMuestra tam={130} color={PAPEL} />
      </div>
    ),
  },
  {
    w: 320,
    h: 320,
    radio: 44,
    fondo: "#fffdf8",
    a: { x: 70, y: 40, z: 120, ry: -6, rz: 2 },
    contenido: (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
        <LogoMuestra tam={200} />
      </div>
    ),
  },
];

const ABRE = 40;

function PiezaSuelta({ p, i }: { p: Pieza; i: number }) {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const e = spring({ frame: f - ABRE - i * 5, fps, config: LLEGADA });
  const mezcla = (k: keyof Pose) => ((PILA[k] ?? 0) as number) + (((p.a[k] ?? 0) as number) - ((PILA[k] ?? 0) as number)) * e;
  const pose: Pose = { x: mezcla("x"), y: mezcla("y"), z: mezcla("z"), rx: mezcla("rx"), ry: mezcla("ry"), rz: mezcla("rz") };
  return (
    <Panel pose={pose} w={p.w} h={p.h} desde={4} fase={i} radio={p.radio} fondo={p.fondo} respira={e}>
      {p.contenido}
    </Panel>
  );
}

export const IDENTIDAD_DURA = 300;

export function EscenaIdentidad() {
  return (
    <AbsoluteFill>
      <Escenario dura={IDENTIDAD_DURA} giro={[-10, 8]} inclina={9} alto={70} acerca={[0.92, 1.0]} oscuro>
        {PIEZAS.map((p, i) => (
          <PiezaSuelta key={i} p={p} i={i} />
        ))}
      </Escenario>
      <Titular renglones={["Una misma marca", "en cada pieza."]} marca="marca" desde={110} claro />
    </AbsoluteFill>
  );
}
