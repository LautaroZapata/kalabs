import type { ReactNode } from "react";
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, spring } from "remotion";
import { BRASA, HUESO, INK_4, PAPEL, TERRA, TINTA } from "./base";
import { Titular, type Consejo, type Promo } from "./comun";
import { DEMO, DemoManual, DemoPermisos, DemoPresupuesto, DemoRecordatorios } from "./consejos";
import { AUTOMATIZACIONES_DURA, EscenaAutomatizaciones, EscenaIdentidad, EscenaSistemas, IDENTIDAD_DURA, SISTEMAS_DURA } from "./promos";
import {
  Aparece,
  CARA,
  Escenario,
  GRIS,
  Grande,
  Icono,
  LINEA,
  Navegador,
  Panel,
  Pestanas,
  Pildora,
  Rotulo,
  Sello,
  Telefono,
} from "./paneles";

/* ==========================================================================
   Las escenas. Los datos de las pantallas son de muestra —un negocio
   cualquiera, «Su negocio»— y ninguno se presenta como cliente ni como
   resultado: son la interfaz, no una promesa.
   ========================================================================== */

/* --------------------------------------------------------------------------
   Promocional: desarrollo web
   -------------------------------------------------------------------------- */

/** La foto del sitio de muestra: un plano de brasa con un sol, no una imagen de stock. */
function Foto({ radio = 20, estilo }: { radio?: number; estilo?: React.CSSProperties }) {
  return (
    <div style={{ position: "relative", borderRadius: radio, overflow: "hidden", background: `linear-gradient(160deg, #ff8a3d 0%, ${BRASA} 55%, #d9531a 100%)`, ...estilo }}>
      <div style={{ position: "absolute", width: "46%", aspectRatio: "1", borderRadius: "50%", background: PAPEL, opacity: 0.9, right: "12%", top: "16%" }} />
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "30%", background: TERRA, opacity: 0.55 }} />
    </div>
  );
}

function SitioAncho() {
  return (
    <div style={{ padding: "22px 34px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 26 }}>
        <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-0.03em" }}>Su negocio</div>
        <div style={{ display: "flex", gap: 22, marginLeft: "auto", fontSize: 18, fontWeight: 600, color: GRIS }}>
          <span>Servicios</span>
          <span>Nosotros</span>
          <span>Contacto</span>
        </div>
        <Pildora tam={17}>Reservar</Pildora>
      </div>
      <div style={{ display: "flex", gap: 30, marginTop: 38 }}>
        <div style={{ flex: 1.1 }}>
          <Grande tam={50} estilo={{ lineHeight: 1.02 }}>
            Todo lo que su cliente busca, en una página.
          </Grande>
          <div style={{ fontSize: 19, fontWeight: 600, color: GRIS, marginTop: 16, lineHeight: 1.4 }}>Horarios, servicios y reservas en línea.</div>
          <Pildora fondo={BRASA} tam={20} estilo={{ marginTop: 24 }}>
            Reservar un turno
          </Pildora>
        </div>
        <Foto estilo={{ flex: 1, height: 330 }} />
      </div>
    </div>
  );
}

function SitioMovil() {
  return (
    <div style={{ padding: "84px 26px 0" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.03em" }}>Su negocio</div>
        <div style={{ marginLeft: "auto", display: "flex", flexDirection: "column", gap: 6 }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ width: 28, height: 3, borderRadius: 2, background: TINTA }} />
          ))}
        </div>
      </div>
      <Foto estilo={{ height: 250, marginTop: 24 }} radio={24} />
      <Grande tam={40} estilo={{ marginTop: 24, lineHeight: 1.04 }}>
        Todo lo que su cliente busca, en una página.
      </Grande>
      <div style={{ fontSize: 18, fontWeight: 600, color: GRIS, marginTop: 12 }}>Horarios, servicios y reservas en línea.</div>
      <Pildora fondo={BRASA} tam={22} estilo={{ marginTop: 22, width: "100%", justifyContent: "center", boxSizing: "border-box" }}>
        Reservar un turno
      </Pildora>
    </div>
  );
}

const WEB_DURA = 300;

function EscenaWeb() {
  return (
    <AbsoluteFill>
      <Escenario dura={WEB_DURA} giro={[-6, 7]}>
        <Navegador pose={{ x: -60, y: -40, z: -140, ry: 16, rz: -2 }} w={880} h={560} desde={6}>
          <SitioAncho />
        </Navegador>
        <Telefono pose={{ x: 200, y: 230, z: 190, ry: -14, rz: 3 }} desde={24} fase={1}>
          <SitioMovil />
        </Telefono>
        <Panel pose={{ x: -250, y: 360, z: 300, ry: 12, rz: -3 }} w={470} h={190} desde={42} fase={2}>
          <div style={{ padding: "24px 28px", position: "relative" }}>
            <div style={{ position: "absolute", right: 24, top: 22 }}>
              <Icono nombre="lupa" tam={32} color={GRIS} />
            </div>
            <Rotulo tam={18}>sunegocio.com.uy</Rotulo>
            <Grande tam={34} estilo={{ marginTop: 8 }}>
              Su negocio · Montevideo
            </Grande>
            <Rotulo tam={19} color={INK_4} estilo={{ marginTop: 10 }}>
              Abierto ahora · Reservas en línea
            </Rotulo>
          </div>
        </Panel>
        <Panel pose={{ x: -270, y: -320, z: 260, ry: 14, rz: -4 }} w={440} h={112} desde={56} fase={3} radio={56}>
          <div style={{ display: "flex", alignItems: "center", gap: 20, height: "100%", padding: "0 26px" }}>
            <Sello nombre="campana" fondo={BRASA} tam={60} />
            <Grande tam={34}>Nueva consulta</Grande>
            <Rotulo estilo={{ marginLeft: "auto" }}>Formulario</Rotulo>
          </div>
        </Panel>
      </Escenario>
      <Titular renglones={["Una web que", "trabaja para usted."]} marca="trabaja" desde={76} />
    </AbsoluteFill>
  );
}

/* --------------------------------------------------------------------------
   Consejo: ¿planilla o sistema?
   -------------------------------------------------------------------------- */

const FILAS: [string, string, string][] = [
  ["Cliente", "Día", "Hora"],
  ["Pérez", "Martes", "10:30"],
  ["Gómez", "Martes", "11:00"],
  ["Rodríguez", "Miércoles", "09:00"],
  ["Pérez", "Martes", "10:30"],
  ["Silva", "Jueves", "16:00"],
];
const PLANILLA_SALE = 118;

function Editor({ letra, color, pose, desde }: { letra: string; color: string; pose: { x: number; y: number; z: number }; desde: number }) {
  return (
    <Panel pose={{ ...pose, ry: -10 }} w={78} h={78} desde={desde} hasta={PLANILLA_SALE} radio={39} fondo={color}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", fontSize: 34, fontWeight: 800, color: "#fff" }}>{letra}</div>
    </Panel>
  );
}

function DemoPlanilla() {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const choca = spring({ frame: f - 62, fps, config: { damping: 18, stiffness: 120 } });
  return (
    <AbsoluteFill>
      <Escenario dura={240} giro={[-8, 4]}>
        <Panel pose={{ x: 0, y: 60, ry: -10, rx: 4 }} w={860} h={560} desde={4} hasta={PLANILLA_SALE} radio={18}>
          <div style={{ height: 50, background: "#f3f1ec", borderBottom: `1px solid ${LINEA}`, display: "flex", alignItems: "center", padding: "0 20px", gap: 12 }}>
            {["A", "B", "C"].map((l) => (
              <div key={l} style={{ width: 210, fontSize: 17, fontWeight: 700, color: GRIS }}>
                {l}
              </div>
            ))}
          </div>
          {FILAS.map((fila, i) => (
            <div key={i} style={{ display: "flex", borderBottom: `1px solid ${LINEA}`, height: 76, alignItems: "center", padding: "0 20px", gap: 12 }}>
              {fila.map((c, j) => {
                /* La fila repetida y la hora en disputa: donde se pisan. */
                const pisada = (i === 4 && f >= 62) || (i === 2 && j === 2 && f >= 70);
                return (
                  <div
                    key={j}
                    style={{
                      width: 210,
                      fontSize: i === 0 ? 20 : 24,
                      fontWeight: i === 0 ? 800 : 600,
                      color: pisada ? TERRA : TINTA,
                      background: pisada ? `rgba(156,63,38,${0.12 * choca})` : "transparent",
                      borderRadius: 8,
                      padding: "6px 8px",
                    }}
                  >
                    {i === 2 && j === 2 && f >= 70 ? "¿11:00 o 11:30?" : c}
                  </div>
                );
              })}
            </div>
          ))}
        </Panel>
        <Editor letra="A" color={TINTA} pose={{ x: -300, y: -300, z: 180 }} desde={30} />
        <Editor letra="B" color={BRASA} pose={{ x: 60, y: -320, z: 220 }} desde={38} />
        <Editor letra="C" color={TERRA} pose={{ x: 360, y: -250, z: 200 }} desde={46} />
        <Panel pose={{ x: 180, y: 420, z: 260, ry: -12, rz: 2 }} w={420} h={110} desde={66} hasta={PLANILLA_SALE} radio={55}>
          <div style={{ display: "flex", alignItems: "center", gap: 18, height: "100%", padding: "0 26px" }}>
            <Sello nombre="doc" fondo={TERRA} tam={58} />
            <Grande tam={32}>Turno duplicado</Grande>
          </div>
        </Panel>

        {/* El sistema: cada uno ve y edita lo suyo. */}
        <Navegador pose={{ x: 0, y: 60, ry: 8, rx: 4 }} w={860} h={600} desde={PLANILLA_SALE + 14} direccion="turnos.sunegocio.com.uy">
          <div style={{ padding: "24px 30px" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Grande tam={40}>Turnos</Grande>
              <Pildora punto={BRASA} tam={18} estilo={{ marginLeft: "auto" }}>
                Guardado
              </Pildora>
            </div>
            {[
              ["A", TINTA, "Pérez", "Martes 10:30"],
              ["B", BRASA, "Gómez", "Martes 11:00"],
              ["C", TERRA, "Rodríguez", "Miércoles 09:00"],
              ["A", TINTA, "Silva", "Jueves 16:00"],
            ].map(([l, c, n, h], i) => (
              <Aparece key={i} desde={PLANILLA_SALE + 30 + i * 6}>
                <div style={{ display: "flex", alignItems: "center", gap: 18, padding: "18px 6px", borderBottom: `1px solid ${LINEA}` }}>
                  <div style={{ width: 46, height: 46, borderRadius: 23, background: c, color: "#fff", fontWeight: 800, fontSize: 22, display: "flex", alignItems: "center", justifyContent: "center" }}>{l}</div>
                  <div style={{ fontSize: 26, fontWeight: 700, flex: 1 }}>{n}</div>
                  <div style={{ fontSize: 22, fontWeight: 600, color: INK_4 }}>{h}</div>
                  <Icono nombre="check" tam={30} color={BRASA} grosor={3} />
                </div>
              </Aparece>
            ))}
          </div>
        </Navegador>
      </Escenario>
      <Sequence durationInFrames={PLANILLA_SALE}>
        <Titular renglones={["Varias personas,", "una planilla."]} desde={6} />
      </Sequence>
      <Sequence from={PLANILLA_SALE + 8}>
        <Titular renglones={["Un sistema:", "cada usuario, su acceso."]} marca="sistema:" desde={4} />
      </Sequence>
    </AbsoluteFill>
  );
}

/* --------------------------------------------------------------------------
   Consejo: ¿ya vio su web en el celular?
   -------------------------------------------------------------------------- */

const ANCHO_SALE = 96;
const REACOMODA = 168;

function DemoCelular() {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const r = spring({ frame: f - REACOMODA, fps, config: { damping: 20, stiffness: 90 } });
  return (
    <AbsoluteFill>
      <Escenario dura={240} giro={[-6, 6]}>
        <Navegador pose={{ x: 0, y: 40, ry: -12, rx: 4 }} w={880} h={560} desde={4} hasta={ANCHO_SALE}>
          <SitioAncho />
        </Navegador>
        <Telefono pose={{ x: 0, y: 110, ry: 10, rz: -2 }} desde={ANCHO_SALE + 12}>
          {/* Primero, la página de computadora achicada: todo diminuto. */}
          <div style={{ position: "absolute", inset: 0, opacity: 1 - r }}>
            <div style={{ transform: "scale(0.43)", transformOrigin: "0 0", width: 880, paddingTop: 170 }}>
              <SitioAncho />
            </div>
          </div>
          <div style={{ position: "absolute", inset: 0, opacity: r, transform: `translateY(${(1 - r) * 30}px)` }}>
            <SitioMovil />
          </div>
        </Telefono>
        <Panel pose={{ x: -270, y: -250, z: 240, ry: 14, rz: -4 }} w={400} h={110} desde={136} hasta={REACOMODA} radio={55}>
          <div style={{ display: "flex", alignItems: "center", gap: 18, height: "100%", padding: "0 26px" }}>
            <Sello nombre="lupa" fondo={TERRA} tam={58} />
            <Grande tam={32}>Texto ilegible</Grande>
          </div>
        </Panel>
        <Panel pose={{ x: 270, y: 380, z: 260, ry: -12, rz: 3 }} w={470} h={110} desde={REACOMODA + 14} radio={55}>
          <div style={{ display: "flex", alignItems: "center", gap: 18, height: "100%", padding: "0 26px" }}>
            <Sello nombre="check" fondo={BRASA} tam={58} />
            <Grande tam={32}>Adaptada al teléfono</Grande>
          </div>
        </Panel>
      </Escenario>
      <Sequence durationInFrames={ANCHO_SALE}>
        <Titular renglones={["Así la ve usted."]} desde={6} />
      </Sequence>
      <Sequence from={ANCHO_SALE + 6}>
        <Titular renglones={["Así la ven", "sus clientes."]} desde={4} />
      </Sequence>
    </AbsoluteFill>
  );
}

/* --------------------------------------------------------------------------
   El catálogo
   -------------------------------------------------------------------------- */

export const PROMOS: Record<string, Promo> = {
  "promo-sistemas": { Escena: EscenaSistemas, dura: SISTEMAS_DURA, golpes: [] },
  "promo-automatizaciones": { Escena: EscenaAutomatizaciones, dura: AUTOMATIZACIONES_DURA, golpes: [] },
  "promo-web": { Escena: EscenaWeb, dura: WEB_DURA, golpes: [] },
  "promo-identidad": { Escena: EscenaIdentidad, dura: IDENTIDAD_DURA, golpes: [] },
};

export const CONSEJOS: Record<string, Consejo> = {
  "consejo-planilla": {
    pregunta: ["¿Planilla", "o sistema?"],
    Demo: DemoPlanilla,
    demo: 240,
    golpes: [{ en: 62, fuerza: 0.5 }],
    consejo: ["Una persona,", "una planilla.", "Varias personas,", "un sistema."],
    marca: "sistema.",
  },
  "consejo-celular": {
    pregunta: ["¿Ya vio su web", "en el teléfono?"],
    Demo: DemoCelular,
    demo: 240,
    golpes: [{ en: REACOMODA, fuerza: 0.4 }],
    consejo: ["Revísela", "primero en", "el teléfono."],
    marca: "teléfono.",
  },
  "consejo-presupuesto": {
    pregunta: ["¿Qué debe incluir", "un presupuesto web?"],
    Demo: DemoPresupuesto,
    demo: DEMO,
    golpes: [],
    consejo: ["Pida cada punto", "por escrito", "antes de firmar."],
    marca: "escrito",
  },
  "consejo-permisos": {
    pregunta: ["¿Todos ven todo", "en su sistema?"],
    Demo: DemoPermisos,
    demo: DEMO,
    golpes: [{ en: 116, fuerza: 0.4 }],
    consejo: ["Cada usuario,", "sólo lo que", "necesita."],
    marca: "necesita.",
    oscuro: true,
  },
  "consejo-recordatorios": {
    pregunta: ["¿Sus clientes", "olvidan los turnos?"],
    Demo: DemoRecordatorios,
    demo: DEMO,
    golpes: [],
    consejo: ["Un recordatorio", "automático,", "un día antes."],
    marca: "automático,",
  },
  "consejo-manual": {
    pregunta: ["¿Su logo se ve", "igual en todos lados?"],
    Demo: DemoManual,
    demo: DEMO,
    golpes: [{ en: 122, fuerza: 0.4 }],
    consejo: ["Pida el manual", "de uso junto", "con su logo."],
    marca: "manual",
  },
};
