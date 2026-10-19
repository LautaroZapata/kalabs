import type { ReactNode } from "react";
import { SITE } from "@/lib/content";
import { BONE_DIM, BRASA, FILETE_TINTA, HUESO, INK_4, MARGEN, PAPEL, TINTA } from "@/lib/feed";
import { Aire, Firma } from "@/components/feed/comunes";

/* ==========================================================================
   Las institucionales.

   La línea de las formas —una figura plana grande, el titular y la firma— con
   el texto en registro formal: se trata de usted, sin voseo y sin guiños. Es
   el tono para empresas que comparan proveedores antes de escribir.

   Como las del oficio, cada afirmación sale del contrato o del sitio. Ninguna
   lleva rótulo sobre el título.
   ========================================================================== */

export function Base({ fondo, children }: { fondo: string; children: ReactNode }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        background: fondo,
        padding: `104px ${MARGEN}px ${MARGEN}px`,
        fontFamily: "Cuerpo",
        overflow: "hidden",
      }}
    >
      {children}
    </div>
  );
}

/** Titular con los cortes de renglón puestos a mano. */
export function Titulo({ renglones, color, cuerpo = 100 }: { renglones: string[]; color: string; cuerpo?: number }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        fontFamily: "Display",
        fontWeight: 800,
        fontSize: cuerpo,
        lineHeight: 1.02,
        letterSpacing: "-0.035em",
        color,
      }}
    >
      {renglones.map((r) => (
        <span key={r}>{r}</span>
      ))}
    </div>
  );
}

export function Texto({ texto, color, ancho = 820, abajo = 34 }: { texto: string; color: string; ancho?: number; abajo?: number }) {
  return (
    <div
      style={{
        display: "flex",
        marginBottom: abajo,
        maxWidth: ancho,
        fontWeight: 600,
        fontSize: 32,
        lineHeight: 1.38,
        color,
      }}
    >
      {texto}
    </div>
  );
}

/** Un bloque plano, puesto a mano. */
export function Plano({
  x,
  y,
  w,
  h,
  color,
  radio = 0,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  radio?: number;
}) {
  return (
    <div
      style={{
        display: "flex",
        position: "absolute",
        left: x,
        top: y,
        width: w,
        height: h,
        borderRadius: radio,
        background: color,
      }}
    />
  );
}

/* --------------------------------------------------------------------------
   El semicírculo — presentación del estudio

   Un disco enorme que asoma desde abajo. Es la pieza que va primera en la
   grilla: dice qué es el estudio y nada más.
   -------------------------------------------------------------------------- */

export function Semicirculo() {
  return (
    <Base fondo={PAPEL}>
      <Plano x={-110} y={760} w={1300} h={1300} color={BRASA} radio={9999} />
      <Titulo renglones={["Tecnología a la", "medida de su", "empresa."]} color={TINTA} cuerpo={112} />
      <Aire />
      <Texto
        texto={`Desarrollo web, automatizaciones y sistemas a medida. Estudio digital en ${SITE.ciudad}.`}
        color={TINTA}
        ancho={760}
      />
      <Firma tinta={TINTA} marca={TINTA} />
    </Base>
  );
}

/* --------------------------------------------------------------------------
   Las columnas — los tres servicios

   Tres planos verticales a sangre, uno por servicio, con el nombre girado.
   Es la franja de las franjas, parada.
   -------------------------------------------------------------------------- */

export function Columnas() {
  const columnas = [
    { nombre: "Desarrollo web", fondo: TINTA, tinta: PAPEL },
    { nombre: "Automatizaciones", fondo: BRASA, tinta: TINTA },
    { nombre: "Sistemas a medida", fondo: HUESO, tinta: TINTA },
  ];
  const alto = 640;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: PAPEL,
        fontFamily: "Cuerpo",
        overflow: "hidden",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", padding: `104px ${MARGEN}px 0` }}>
        <Titulo renglones={["Tres servicios,", "un mismo equipo."]} color={TINTA} cuerpo={104} />
        <div style={{ display: "flex", marginTop: 26 }}>
          <Texto texto="Un solo interlocutor desde la primera reunión hasta la entrega." color={INK_4} ancho={720} abajo={0} />
        </div>
      </div>

      <div style={{ display: "flex", marginTop: 50, height: alto }}>
        {columnas.map((c) => (
          <div key={c.nombre} style={{ display: "flex", position: "relative", width: 360, height: alto, background: c.fondo }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                position: "absolute",
                left: (360 - alto) / 2,
                top: (alto - 110) / 2,
                width: alto,
                height: 110,
                padding: "0 50px",
                transform: "rotate(-90deg)",
                whiteSpace: "nowrap",
                fontFamily: "Display",
                fontWeight: 800,
                fontSize: 66,
                letterSpacing: "-0.035em",
                color: c.tinta,
              }}
            >
              {c.nombre}
            </div>
          </div>
        ))}
      </div>

      <Aire />
      <div style={{ display: "flex", padding: `0 ${MARGEN}px ${MARGEN}px` }}>
        <Firma tinta={TINTA} />
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   La escalera — el proceso

   Cuatro peldaños que suben hacia la derecha, cada uno con su etapa. La firma
   se apoya en el primero.
   -------------------------------------------------------------------------- */

export function Escalera() {
  const peldanos = ["Consulta", "Presupuesto", "Desarrollo", "Entrega"];
  const altos = [260, 400, 540, 680];

  return (
    <Base fondo={TINTA}>
      {peldanos.map((p, i) => (
        <div
          key={p}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "absolute",
            left: i * 270,
            top: 1350 - altos[i],
            width: 270,
            height: altos[i],
            padding: "30px 30px 90px",
            background: i % 2 === 0 ? BRASA : HUESO,
            borderLeft: i > 0 ? `2px solid ${TINTA}` : "none",
          }}
        >
          <span style={{ display: "flex", fontWeight: 700, fontSize: 32, color: TINTA }}>{p}</span>
          {i === 0 && <Firma tinta={TINTA} marca={TINTA} />}
        </div>
      ))}

      <Titulo renglones={["Un proceso claro,", "de la consulta", "a la entrega."]} color={PAPEL} cuerpo={100} />
      <div style={{ display: "flex", marginTop: 30 }}>
        <Texto
          texto="Consulta sin costo, presupuesto cerrado por escrito y entrega en producción, con treinta días de garantía."
          color={BONE_DIM}
          ancho={800}
          abajo={0}
        />
      </div>
    </Base>
  );
}

/* --------------------------------------------------------------------------
   El cuadrante — presupuesto cerrado

   Cuatro planos, uno con un cuarto de círculo recortado. El cuarto que falta
   es lo que no va a aparecer en la factura.
   -------------------------------------------------------------------------- */

export function Cuadrante() {
  const w = 445;
  const h = 320;

  return (
    <Base fondo={PAPEL}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, width: 900 }}>
        <div style={{ display: "flex", width: w, height: h, background: TINTA }} />
        <div style={{ display: "flex", position: "relative", width: w, height: h, background: HUESO, overflow: "hidden" }}>
          <Plano x={-h} y={0} w={h * 2} h={h * 2} color={BRASA} radio={9999} />
        </div>
        <div style={{ display: "flex", width: w, height: h, background: BRASA }} />
        <div style={{ display: "flex", width: w, height: h, border: FILETE_TINTA }} />
      </div>

      <Aire />
      <div style={{ display: "flex", marginBottom: 30 }}>
        <Titulo renglones={["Presupuesto cerrado", "antes de comenzar."]} color={TINTA} cuerpo={90} />
      </div>
      <Texto texto="El alcance y el precio quedan definidos por escrito. Sin costos imprevistos." color={INK_4} ancho={760} />
      <Firma tinta={TINTA} />
    </Base>
  );
}

/* --------------------------------------------------------------------------
   Los arcos — identidad de marca

   Tres arcos concéntricos que suben desde abajo, alternando tinta y papel.
   La firma queda en el centro, que es donde va una marca.
   -------------------------------------------------------------------------- */

export function Arcos() {
  const arcos = [
    { w: 900, color: TINTA },
    { w: 660, color: PAPEL },
    { w: 420, color: BRASA },
  ];
  const piso = 600;

  return (
    <Base fondo={BRASA}>
      {arcos.map((a) => (
        <div
          key={a.w}
          style={{
            display: "flex",
            position: "absolute",
            left: (1080 - a.w) / 2,
            top: piso + (900 - a.w) / 2,
            width: a.w,
            height: 1400,
            borderTopLeftRadius: a.w / 2,
            borderTopRightRadius: a.w / 2,
            background: a.color,
          }}
        />
      ))}
      <div style={{ display: "flex", position: "absolute", left: 445, bottom: MARGEN }}>
        <Firma tinta={TINTA} marca={TINTA} />
      </div>

      <Titulo renglones={["Una identidad", "coherente en", "cada pieza."]} color={TINTA} cuerpo={100} />
      <div style={{ display: "flex", marginTop: 26 }}>
        <Texto
          texto="Logotipo, paleta, tipografía y manual de uso, para que su marca se reconozca en todos los soportes."
          color={TINTA}
          ancho={800}
          abajo={0}
        />
      </div>
    </Base>
  );
}

/* --------------------------------------------------------------------------
   La cruz — integraciones

   Un signo más que se sale por arriba y por la derecha. Sumar, conectar: no
   hace falta dibujar cables.
   -------------------------------------------------------------------------- */

export function Cruz() {
  return (
    <Base fondo={TINTA}>
      <Plano x={600} y={-100} w={300} h={780} color={BRASA} />
      <Plano x={310} y={200} w={880} h={300} color={BRASA} />

      <Aire />
      <div style={{ display: "flex", marginBottom: 30 }}>
        <Titulo renglones={["Sus herramientas,", "conectadas", "entre sí."]} color={PAPEL} cuerpo={100} />
      </div>
      <Texto texto="Integraciones entre sus sistemas de gestión, planillas y canales de mensajería." color={BONE_DIM} ancho={760} />
      <Firma tinta={PAPEL} />
    </Base>
  );
}

/* --------------------------------------------------------------------------
   El candado — la propiedad

   El arco y el cuerpo, en plano. Hace pareja con la llave.
   -------------------------------------------------------------------------- */

export function Candado() {
  return (
    <Base fondo={PAPEL}>
      <div
        style={{
          display: "flex",
          position: "absolute",
          left: 330,
          top: 110,
          width: 420,
          height: 420,
          borderTopLeftRadius: 210,
          borderTopRightRadius: 210,
          borderTop: `64px solid ${TINTA}`,
          borderLeft: `64px solid ${TINTA}`,
          borderRight: `64px solid ${TINTA}`,
        }}
      />
      <Plano x={220} y={400} w={640} h={400} color={BRASA} radio={28} />
      <Plano x={495} y={520} w={90} h={90} color={TINTA} radio={9999} />
      <Plano x={522} y={580} w={36} h={110} color={TINTA} />

      <Aire />
      <div style={{ display: "flex", marginBottom: 30 }}>
        <Titulo renglones={["Su información,", "bajo su control."]} color={TINTA} cuerpo={100} />
      </div>
      <Texto texto="Cuentas, contraseñas, código y diseños quedan a nombre de su empresa." color={INK_4} ancho={760} />
      <Firma tinta={TINTA} />
    </Base>
  );
}

/* --------------------------------------------------------------------------
   Las fichas — sistemas a medida

   Tres fichas apiladas con su pestaña. La de adelante está abierta; las de
   atrás esperan su turno.
   -------------------------------------------------------------------------- */

export function Fichas() {
  const fichas = [
    { x: 290, y: 104, fondo: PAPEL, tinta: INK_4, pestana: "Stock" },
    { x: 190, y: 194, fondo: BRASA, tinta: TINTA, pestana: "Pedidos" },
    { x: 90, y: 284, fondo: TINTA, tinta: PAPEL, pestana: "Turnos" },
  ];

  return (
    <Base fondo={HUESO}>
      {fichas.map((f, i) => (
        <div key={f.pestana} style={{ display: "flex", flexDirection: "column", position: "absolute", left: f.x, top: f.y }}>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              marginLeft: 40 + i * 170,
              padding: "14px 30px 10px",
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              background: f.fondo,
              fontWeight: 700,
              fontSize: 26,
              color: f.tinta,
            }}
          >
            {f.pestana}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: 700,
              height: 400,
              padding: "50px 50px",
              background: f.fondo,
              border: f.fondo === PAPEL ? FILETE_TINTA : "none",
            }}
          >
            {i === 2 &&
              [78, 52, 66, 40].map((largo, j) => (
                <div key={j} style={{ display: "flex", alignItems: "center", marginTop: j === 0 ? 0 : 28 }}>
                  <span style={{ display: "flex", width: 22, height: 22, marginRight: 24, borderRadius: 9999, background: j === 1 ? BRASA : BONE_DIM }} />
                  <span style={{ display: "flex", width: `${largo}%`, height: 16, background: j === 1 ? PAPEL : INK_4 }} />
                </div>
              ))}
          </div>
        </div>
      ))}

      <Aire />
      <div style={{ display: "flex", marginBottom: 30 }}>
        <Titulo renglones={["Turnos, pedidos o", "stock, a la medida", "de su operación."]} color={TINTA} cuerpo={88} />
      </div>
      <Texto texto="Sistemas que resuelven una función concreta y se usan todos los días." color={INK_4} ancho={720} />
      <Firma tinta={TINTA} />
    </Base>
  );
}

/* --------------------------------------------------------------------------
   El triángulo — la primera consulta

   Media pieza cortada en diagonal. El texto de abajo vive entero dentro del
   triángulo: el ancho de la bajada está medido para que no cruce el borde.
   -------------------------------------------------------------------------- */

export function Triangulo() {
  const svg =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1350"><polygon points="0,520 0,1350 1080,1350" fill="${BRASA}"/></svg>`,
    );

  return (
    <Base fondo={PAPEL}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={svg} alt="" width={1080} height={1350} style={{ position: "absolute", left: 0, top: 0 }} />

      <Titulo renglones={["La primera", "consulta no", "tiene costo."]} color={TINTA} cuerpo={124} />
      <Aire />
      <Texto texto={`Analizamos su caso y le indicamos si amerita un desarrollo. ${SITE.email}`} color={TINTA} ancho={600} />
      <Firma tinta={TINTA} marca={TINTA} />
    </Base>
  );
}

/* --------------------------------------------------------------------------
   Los puntos — automatizaciones

   Una grilla de puntos quietos y un recorrido que la atraviesa en papel. El
   recorrido es la tarea que se hace sola.
   -------------------------------------------------------------------------- */

export function Puntos() {
  const cols = 8;
  const filas = 5;
  const paso = 900 / (cols - 1);
  /* El recorrido, en [columna, fila]: entra por la izquierda, baja y sale. */
  const camino = new Set(["0,0", "1,0", "2,0", "2,1", "2,2", "3,2", "4,2", "5,2", "5,3", "5,4", "6,4", "7,4"]);

  return (
    <Base fondo={BRASA}>
      {Array.from({ length: filas }).flatMap((_, f) =>
        Array.from({ length: cols }).map((__, c) => {
          const en = camino.has(`${c},${f}`);
          const d = en ? 46 : 22;
          return (
            <Plano
              key={`${c},${f}`}
              x={MARGEN + c * paso - d / 2}
              y={130 + f * 120 - d / 2}
              w={d}
              h={d}
              color={en ? PAPEL : TINTA}
              radio={9999}
            />
          );
        }),
      )}

      <Aire />
      <div style={{ display: "flex", marginBottom: 30 }}>
        <Titulo renglones={["Las tareas", "repetitivas pueden", "ejecutarse solas."]} color={TINTA} cuerpo={92} />
      </div>
      <Texto texto="Reportes, alertas y bots de mensajería que operan sin intervención de su equipo." color={TINTA} ancho={760} />
      <Firma tinta={TINTA} marca={TINTA} />
    </Base>
  );
}
