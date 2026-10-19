import { AbsoluteFill, interpolate, Sequence, useCurrentFrame } from "remotion";
import { BRASA, HUESO, INK_4, PAPEL, TERRA, TINTA } from "./base";
import { Titular } from "./comun";
import {
  Aparece,
  Enlaces,
  Escenario,
  GRIS,
  Grande,
  Icono,
  LINEA,
  Logotipo,
  LogoMuestra,
  Panel,
  Pildora,
  Rotulo,
  Sello,
  type Enlace,
  type Glifo,
} from "./paneles";

/* ==========================================================================
   Las demostraciones de los consejos nuevos. Cada una dura DEMO cuadros y
   tiene su propio escenario: una hoja que se completa, una matriz de
   accesos, una línea de tiempo que la cámara recorre y un manual de marca.
   ========================================================================== */

export const DEMO = 240;

const suelto = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** Píldora flotante con sello: el resumen de lo que acaba de pasar. */
function Nota({ x, y, z = 260, desde, hasta, icono, fondo, texto, fase = 3 }: { x: number; y: number; z?: number; desde: number; hasta?: number; icono: Glifo; fondo: string; texto: string; fase?: number }) {
  return (
    <Panel pose={{ x, y, z, ry: x > 0 ? -12 : 12, rz: x > 0 ? 3 : -3 }} w={texto.length * 17 + 150} h={112} desde={desde} hasta={hasta} fase={fase} radio={56}>
      <div style={{ display: "flex", alignItems: "center", gap: 18, height: "100%", padding: "0 26px" }}>
        <Sello nombre={icono} fondo={fondo} tam={58} />
        <Grande tam={32} estilo={{ whiteSpace: "nowrap" }}>
          {texto}
        </Grande>
      </div>
    </Panel>
  );
}

/* --------------------------------------------------------------------------
   Web: ¿qué debe incluir un presupuesto?
   Una hoja de presupuesto que se completa punto por punto; una franja de
   brasa acompaña el renglón que se está escribiendo.
   -------------------------------------------------------------------------- */

const PUNTOS: [string, string][] = [
  ["Dominio", "Registrado a nombre de su empresa"],
  ["Alojamiento", "Proveedor y costo anual"],
  ["Páginas y funciones", "Qué incluye y qué no"],
  ["Plazo de entrega", "Con fechas por etapa"],
  ["Mantenimiento", "Qué cubre después de la entrega"],
  ["Propiedad", "El código y las cuentas, a su nombre"],
];
const RENGLON = 84;
const PRIMERO = 26;
const CADA = 22;

function DemoPresupuesto() {
  const f = useCurrentFrame();
  const cual = interpolate(
    f,
    PUNTOS.map((_, i) => PRIMERO + i * CADA),
    PUNTOS.map((_, i) => i),
    suelto,
  );
  const franja = interpolate(f, [PRIMERO - 4, PRIMERO + 4, PRIMERO + PUNTOS.length * CADA, PRIMERO + PUNTOS.length * CADA + 10], [0, 1, 1, 0], suelto);
  return (
    <AbsoluteFill>
      <Escenario dura={DEMO} giro={[-7, 5]} acerca={[1.0, 1.08]} alto={100}>
        <Panel pose={{ x: 0, y: 20, rx: 3, ry: -8 }} w={700} h={770} desde={2} radio={10} fondo="#fffdf8">
          <div style={{ padding: "46px 50px" }}>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
              <Grande tam={60}>Presupuesto</Grande>
              <LogoMuestra tam={54} />
            </div>
            <Rotulo tam={21} estilo={{ marginTop: 10 }}>
              Sitio web · Su negocio
            </Rotulo>
            <div style={{ height: 3, background: TINTA, marginTop: 26 }} />
            <div style={{ position: "relative", marginTop: 12 }}>
              <div
                style={{
                  position: "absolute",
                  left: -16,
                  right: -16,
                  top: cual * RENGLON + 6,
                  height: RENGLON - 12,
                  borderRadius: 12,
                  background: "rgba(255,107,26,0.10)",
                  boxShadow: `inset 3px 0 0 ${BRASA}`,
                  opacity: franja,
                }}
              />
              {PUNTOS.map(([t, b], i) => (
                <div key={t} style={{ position: "relative", height: RENGLON, borderBottom: `1px solid ${LINEA}`, display: "flex", alignItems: "center" }}>
                  <Aparece desde={PRIMERO + i * CADA} sube={12}>
                    <div style={{ fontSize: 29, fontWeight: 800, letterSpacing: "-0.02em" }}>{t}</div>
                    <div style={{ fontSize: 20, fontWeight: 600, color: GRIS, marginTop: 3 }}>{b}</div>
                  </Aparece>
                  <div style={{ marginLeft: "auto" }}>
                    {f >= PRIMERO + i * CADA + 10 ? (
                      <Aparece desde={PRIMERO + i * CADA + 10} sube={0}>
                        <Icono nombre="check" tam={36} color={BRASA} grosor={3.2} />
                      </Aparece>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Panel>
        <Nota x={230} y={370} z={300} desde={PRIMERO + PUNTOS.length * CADA + 8} icono="doc" fondo={BRASA} texto="Todo por escrito" />
      </Escenario>
      <Titular renglones={["Lo que no está escrito,", "no está incluido."]} marca="incluido." desde={6} />
    </AbsoluteFill>
  );
}

/* --------------------------------------------------------------------------
   Sistemas: ¿todos ven todo?
   Tres usuarios y cuatro secciones, todos unidos con todos. Después las
   líneas que sobran se apagan y quedan, en brasa, los accesos de cada uno.
   -------------------------------------------------------------------------- */

const USUARIOS: [string, string][] = [
  ["Administración", TINTA],
  ["Ventas", BRASA],
  ["Depósito", TERRA],
];
const SECCIONES: [Glifo, string][] = [
  ["doc", "Caja"],
  ["tabla", "Precios"],
  ["persona", "Clientes"],
  ["caja", "Stock"],
];
/** Qué secciones le quedan a cada usuario. */
const ACCESOS = [
  [0, 1],
  [0, 2],
  [3],
];
const UX = -290;
const SX = 300;
const uy = (i: number) => -250 + i * 250;
const sy = (j: number) => -300 + j * 200;
const ORDENA = 116;

function DemoPermisos() {
  const f = useCurrentFrame();
  const lineas: Enlace[] = [];
  USUARIOS.forEach((_, i) =>
    SECCIONES.forEach((__, j) => {
      const queda = ACCESOS[i].includes(j);
      const n = i * 4 + j;
      const trazo = interpolate(f, [26 + n * 2, 44 + n * 2], [0, 1], suelto);
      const apaga = interpolate(f, [ORDENA, ORDENA + 18], [0, 1], suelto);
      const k = ACCESOS[i].indexOf(j);
      const t = ORDENA + 34 + i * 10 + k * 6;
      lineas.push({
        de: [UX, uy(i)],
        a: [SX, sy(j)],
        trazo,
        color: queda && f >= ORDENA + 8 ? BRASA : TERRA,
        opacidad: queda ? 0.55 + 0.45 * apaga : 0.55 * (1 - apaga),
        grosor: queda && f >= ORDENA + 8 ? 5 : 3,
        pulso: queda ? interpolate(f, [t, t + 22], [0, 1], suelto) : undefined,
      });
    }),
  );
  return (
    <AbsoluteFill>
      <Escenario dura={DEMO} giro={[-7, 6]} inclina={14} acerca={[1.0, 1.06]} alto={60} oscuro>
        <Enlaces lineas={lineas} />
        {USUARIOS.map(([n, c], i) => (
          <Panel key={n} pose={{ x: UX, y: uy(i) }} w={340} h={120} desde={4 + i * 6} respira={0} radio={28}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, height: "100%", padding: "0 22px" }}>
              <Sello nombre="persona" fondo={c} tam={60} />
              <div>
                <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-0.03em" }}>{n}</div>
                <div style={{ fontSize: 17, fontWeight: 600, color: GRIS, marginTop: 2 }}>Usuario</div>
              </div>
            </div>
          </Panel>
        ))}
        {SECCIONES.map(([ic, n], j) => {
          const usada = ACCESOS.some((a) => a.includes(j));
          return (
            <Panel key={n} pose={{ x: SX, y: sy(j) }} w={280} h={104} desde={10 + j * 5} respira={0} radio={24}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, height: "100%", padding: "0 24px" }}>
                <Icono nombre={ic} tam={40} color={f >= ORDENA + 8 && usada ? BRASA : TINTA} />
                <div style={{ fontSize: 27, fontWeight: 800, letterSpacing: "-0.03em" }}>{n}</div>
                <div style={{ marginLeft: "auto", opacity: interpolate(f, [ORDENA + 10, ORDENA + 24], [0, 1], suelto) }}>
                  <Icono nombre="candado" tam={30} color={GRIS} />
                </div>
              </div>
            </Panel>
          );
        })}
        <Nota x={0} y={400} desde={60} hasta={ORDENA - 6} icono="candado" fondo={TERRA} texto="Todos editan todo" />
        <Nota x={0} y={400} desde={ORDENA + 60} icono="check" fondo={BRASA} texto="Accesos por usuario" />
      </Escenario>
      <Sequence durationInFrames={ORDENA}>
        <Titular renglones={["Todos entran", "a todo."]} desde={6} claro />
      </Sequence>
      <Sequence from={ORDENA + 6}>
        <Titular renglones={["Cada usuario,", "sus permisos."]} marca="permisos." desde={4} claro />
      </Sequence>
    </AbsoluteFill>
  );
}

/* --------------------------------------------------------------------------
   Automatizaciones: recordatorio de turnos.
   Una línea de tiempo horizontal que la cámara recorre de parada en parada;
   al final se aleja y se ve el recorrido entero.
   -------------------------------------------------------------------------- */

type Parada = { icono: Glifo; fondo: string; titulo: string; texto: string; cuando: string; pie?: string };

const PARADAS: Parada[] = [
  { icono: "calendario", fondo: TINTA, titulo: "Reserva", texto: "Consulta, martes a las 10:30.", cuando: "La reserva" },
  { icono: "sobre", fondo: BRASA, titulo: "Recordatorio", texto: "Le recordamos su turno de mañana a las 10:30.", cuando: "Un día antes", pie: "Envío automático" },
  { icono: "check", fondo: TINTA, titulo: "Confirmado", texto: "El cliente confirmó su asistencia.", cuando: "La respuesta" },
  { icono: "persona", fondo: BRASA, titulo: "Turno", texto: "Martes, 10:30. En la agenda.", cuando: "El día del turno" },
];
const PASO_X = 700;
const RIEL = 290;
/** Cuándo la cámara llega a cada parada. */
const LLEGA = [0, 70, 112, 154];

function DemoRecordatorios() {
  const f = useCurrentFrame();
  const fin = (PARADAS.length - 1) * PASO_X;
  const claves = [
    { en: 0, x: 0, y: 110, s: 1.25 },
    { en: 34, x: 0 },
    ...LLEGA.slice(1).map((en, i) => ({ en, x: (i + 1) * PASO_X })),
    { en: 180, x: fin, s: 1.25, y: 110 },
    { en: 226, x: fin / 2, s: 0.4, y: 60 },
  ];
  /* El riel se dibuja un poco por delante de la cámara. */
  const avance = interpolate(f, [30, 180], [0.12, 1], suelto);
  return (
    <AbsoluteFill>
      <Escenario dura={DEMO} giro={[-5, 4]} inclina={8} alto={40} claves={claves}>
        <Enlaces lineas={[{ de: [-300, RIEL], a: [fin + 300, RIEL], trazo: avance, color: INK_4, opacidad: 0.35, grosor: 5 }]} />
        {PARADAS.map((p, i) => {
          const x = i * PASO_X;
          const desde = Math.max(2, LLEGA[i] - 20);
          return (
            <div key={p.titulo}>
              <Panel pose={{ x, y: RIEL }} w={40} h={40} radio={20} desde={desde + 6} respira={0} fondo={BRASA} estilo={{ boxShadow: `0 0 0 10px rgba(255,107,26,0.18)` }} />
              <Panel pose={{ x, y: RIEL + 76 }} w={420} h={50} desde={desde + 10} respira={0} desnudo>
                <div style={{ textAlign: "center", fontSize: 28, fontWeight: 700, color: GRIS }}>{p.cuando}</div>
              </Panel>
              <Panel pose={{ x, y: -30, z: 40, ry: -4 }} w={540} h={290} desde={desde} fase={i} radio={30}>
                <div style={{ padding: "30px 34px", height: "100%", boxSizing: "border-box", display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                    <Sello nombre={p.icono} fondo={p.fondo} tam={62} />
                    <Grande tam={42}>{p.titulo}</Grande>
                  </div>
                  <div style={{ fontSize: 25, fontWeight: 600, color: INK_4, marginTop: 20, lineHeight: 1.3 }}>{p.texto}</div>
                  {p.pie ? (
                    <Pildora tam={17} punto={BRASA} estilo={{ marginTop: "auto", alignSelf: "flex-start" }}>
                      {p.pie}
                    </Pildora>
                  ) : null}
                </div>
              </Panel>
            </div>
          );
        })}
      </Escenario>
      <Titular renglones={["Un aviso a tiempo,", "sin que nadie lo envíe."]} marca="aviso" desde={8} />
    </AbsoluteFill>
  );
}

/* --------------------------------------------------------------------------
   Marca: ¿su logo se ve igual en todos lados?
   Tres usos equivocados del mismo logo; se van y llega el manual abierto.
   -------------------------------------------------------------------------- */

const SE_VAN = 108;
const MANUAL = SE_VAN + 8;

function Mal({ x, y, z, rz, desde, rotulo, children }: { x: number; y: number; z: number; rz: number; desde: number; rotulo: string; children: React.ReactNode }) {
  return (
    <Panel pose={{ x, y, z, rz, ry: x > 0 ? -12 : 12 }} w={400} h={290} desde={desde} hasta={SE_VAN} fase={desde} radio={24}>
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>{children}</div>
      <Pildora tam={18} fondo={TERRA} estilo={{ position: "absolute", left: 22, bottom: 20 }}>
        {rotulo}
      </Pildora>
    </Panel>
  );
}

function DemoManual() {
  const centro = { display: "flex", alignItems: "center", justifyContent: "center", height: "78%" } as const;
  return (
    <AbsoluteFill>
      <Escenario dura={DEMO} giro={[-7, 6]} acerca={[1.0, 1.06]} alto={90}>
        <Mal x={-240} y={-210} z={160} rz={-6} desde={8} rotulo="Deformado">
          <div style={centro}>
            <div style={{ transform: "scale(1.5, 0.72)" }}>
              <Logotipo tam={58} />
            </div>
          </div>
        </Mal>
        <Mal x={240} y={0} z={220} rz={5} desde={18} rotulo="Otro color">
          <div style={centro}>
            <Logotipo tam={58} color="#6d7f8c" acento="#c9b458" />
          </div>
        </Mal>
        <Mal x={-170} y={280} z={260} rz={-3} desde={28} rotulo="Sin aire">
          <div style={{ position: "absolute", inset: 0, background: `repeating-linear-gradient(135deg, ${BRASA} 0 26px, #ff8a3d 26px 52px)` }} />
          <div style={{ position: "absolute", right: -40, top: 14 }}>
            <Logotipo tam={70} />
          </div>
        </Mal>

        {/* El manual abierto: logo con su área de respeto, colores y tipografía. */}
        <Panel pose={{ x: 0, y: 30, rx: 4, ry: -6 }} w={940} h={600} desde={MANUAL} radio={14} fondo="#fffdf8">
          <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 60, marginLeft: -30, background: "linear-gradient(90deg, rgba(15,18,20,0) 0%, rgba(15,18,20,0.08) 50%, rgba(15,18,20,0) 100%)" }} />
          <div style={{ display: "flex", height: "100%" }}>
            <div style={{ flex: 1, padding: "40px 44px" }}>
              <Rotulo tam={20}>Logotipo</Rotulo>
              <div style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
                <div style={{ padding: 34, border: `2px dashed ${BRASA}`, borderRadius: 6 }}>
                  <LogoMuestra tam={170} />
                </div>
              </div>
              <Rotulo tam={18} estilo={{ textAlign: "center", marginTop: 18 }}>
                Área de respeto
              </Rotulo>
            </div>
            <div style={{ flex: 1, padding: "40px 44px" }}>
              <Rotulo tam={20}>Colores</Rotulo>
              {(
                [
                  [TINTA, "Tinta"],
                  [BRASA, "Brasa"],
                  [HUESO, "Hueso"],
                ] as [string, string][]
              ).map(([c, n], i) => (
                <Aparece key={n} desde={MANUAL + 22 + i * 6} sube={10}>
                  <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 16 }}>
                    <div style={{ width: 70, height: 50, borderRadius: 10, background: c, boxShadow: `inset 0 0 0 1px ${LINEA}` }} />
                    <div style={{ fontSize: 24, fontWeight: 700 }}>{n}</div>
                  </div>
                </Aparece>
              ))}
              <Rotulo tam={20} estilo={{ marginTop: 36 }}>
                Tipografía
              </Rotulo>
              <Aparece desde={MANUAL + 44} sube={10}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 18, marginTop: 6 }}>
                  <Grande tam={96}>Aa</Grande>
                  <div style={{ fontSize: 20, fontWeight: 600, color: GRIS }}>Una sola familia</div>
                </div>
              </Aparece>
            </div>
          </div>
        </Panel>
        <Panel pose={{ x: 220, y: 400, z: 240, ry: -12, rz: 3 }} w={340} h={160} desde={MANUAL + 40} fase={2} radio={24} fondo={TINTA}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
            <Logotipo tam={48} color={PAPEL} />
          </div>
        </Panel>
        <Panel pose={{ x: -300, y: 390, z: 200, ry: 12, rz: -4 }} w={170} h={170} desde={MANUAL + 52} fase={3} radio={85} fondo={BRASA}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
            <LogoMuestra tam={96} acento={PAPEL} />
          </div>
        </Panel>
      </Escenario>
      <Sequence durationInFrames={SE_VAN + 4}>
        <Titular renglones={["El mismo logo,", "cada vez distinto."]} desde={6} />
      </Sequence>
      <Sequence from={MANUAL + 6}>
        <Titular renglones={["Un manual de uso", "lo ordena."]} marca="manual" desde={4} />
      </Sequence>
    </AbsoluteFill>
  );
}

export { DemoManual, DemoPermisos, DemoPresupuesto, DemoRecordatorios };
