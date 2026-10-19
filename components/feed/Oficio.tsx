import { SITE } from "@/lib/content";
import {
  BONE_DIM,
  BRASA,
  FILETE_PAPEL,
  FILETE_TINTA,
  HUESO,
  INK_4,
  MARGEN,
  PAPEL,
  TINTA,
} from "@/lib/feed";
import { Aire, Firma, Lienzo } from "@/components/feed/comunes";

/* ==========================================================================
   Las del oficio: cómo se trabaja y qué se hizo.

   Cada pieza cuenta una condición real del estudio —las de
   `docs/comercial/contrato.html`— o una obra que se puede ir a ver. Nada de
   lo que dicen está inventado: si una condición cambia en el contrato, cambia
   acá también.

   Ninguna lleva rótulo arriba del titular. El título arranca solo; lo que
   haría el rótulo lo hace el dibujo.
   ========================================================================== */

const A_SANGRE = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  fontFamily: "Cuerpo",
  overflow: "hidden",
} as const;

function Grande({
  texto,
  color,
  cuerpo = 104,
  ancho = 900,
}: {
  /** Un arreglo fija los cortes de renglón a mano, para que no quede una palabra sola. */
  texto: string | string[];
  color: string;
  cuerpo?: number;
  ancho?: number;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: Array.isArray(texto) ? "column" : "row",
        flexWrap: "wrap",
        maxWidth: ancho,
        fontFamily: "Display",
        fontWeight: 800,
        fontSize: cuerpo,
        lineHeight: 1.02,
        letterSpacing: "-0.035em",
        color,
      }}
    >
      {Array.isArray(texto) ? texto.map((t) => <span key={t}>{t}</span>) : texto}
    </div>
  );
}

function Bajada({ texto, color, ancho = 840 }: { texto: string; color: string; ancho?: number }) {
  return (
    <div
      style={{
        display: "flex",
        marginBottom: 34,
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

/* --------------------------------------------------------------------------
   El ticket — presupuesto cerrado

   Un ticket de almacén, torcido sobre la tinta. La monoespaciada no es de la
   marca: es la impresora térmica, igual que en la consola.
   -------------------------------------------------------------------------- */

export function Recibo() {
  const renglones = ["Diseño", "Desarrollo", "Dominio andando", "Medición", "Soporte 30 días"];

  const guiones = (
    <div style={{ display: "flex", margin: "22px 0", borderTop: `3px dashed ${INK_4}`, opacity: 0.5 }} />
  );

  return (
    <Lienzo fondo={TINTA}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignSelf: "center",
          width: 700,
          marginTop: 6,
          padding: "44px 50px 48px",
          background: PAPEL,
          fontFamily: "Mono",
          fontWeight: 700,
          fontSize: 30,
          color: INK_4,
          transform: "rotate(-3deg)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", fontSize: 34, color: TINTA }}>
          {`${SITE.nombre.toUpperCase()} · ${SITE.ciudad.toUpperCase()}`}
        </div>
        {guiones}
        {renglones.map((r) => (
          <div key={r} style={{ display: "flex", alignItems: "flex-end", marginTop: 12 }}>
            <span>{r}</span>
            <span style={{ display: "flex", flexGrow: 1, margin: "0 12px 8px", borderBottom: `3px dashed ${BONE_DIM}` }} />
            <span>incluido</span>
          </div>
        ))}
        {guiones}
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 34, color: TINTA }}>
          <span>Sorpresas al final</span>
          <span style={{ color: BRASA }}>NINGUNA</span>
        </div>
      </div>

      <Aire />
      <div style={{ display: "flex", marginBottom: 70 }}>
        <Grande texto={["El precio se cierra", "antes de empezar."]} color={PAPEL} cuerpo={100} />
      </div>
      <Firma tinta={PAPEL} />
    </Lienzo>
  );
}

/* --------------------------------------------------------------------------
   La llave — la propiedad es del cliente

   Un aro y un vástago que se van por el borde. Dos formas planas alcanzan
   para que sea una llave; más detalle la vuelve clip-art.
   -------------------------------------------------------------------------- */

export function Llaves() {
  return (
    <div style={{ ...A_SANGRE, position: "relative", background: BRASA, padding: `0 ${MARGEN}px ${MARGEN}px` }}>
      {/* El aro. */}
      <div
        style={{
          display: "flex",
          position: "absolute",
          left: -60,
          top: 170,
          width: 420,
          height: 420,
          borderRadius: 9999,
          border: `70px solid ${TINTA}`,
        }}
      />
      {/* El vástago, que sale por la derecha. */}
      <div
        style={{
          display: "flex",
          position: "absolute",
          left: 350,
          top: 345,
          width: 800,
          height: 70,
          background: TINTA,
        }}
      />
      {/* Los dientes. */}
      <div style={{ display: "flex", position: "absolute", left: 760, top: 415, width: 70, height: 120, background: TINTA }} />
      <div style={{ display: "flex", position: "absolute", left: 890, top: 415, width: 70, height: 80, background: TINTA }} />

      <Aire />
      <div style={{ display: "flex", marginBottom: 30 }}>
        <Grande texto="Las llaves son tuyas." color={TINTA} cuerpo={132} />
      </div>
      <Bajada
        texto="Cuentas, contraseñas, diseños y código quedan a tu nombre. Si un día te vas, te llevás todo."
        color={TINTA}
      />
      <Firma tinta={TINTA} marca={TINTA} />
    </div>
  );
}

/* --------------------------------------------------------------------------
   Las mitades — la forma de pago

   La pieza partida al medio, literal. Las dos palabras se tocan en el corte.
   -------------------------------------------------------------------------- */

export function Mitades() {
  const palabra = {
    display: "flex",
    marginLeft: -14,
    fontFamily: "Display",
    fontWeight: 800,
    fontSize: 300,
    lineHeight: 0.8,
    letterSpacing: "-0.06em",
  } as const;

  const cola = {
    display: "flex",
    fontFamily: "Display",
    fontWeight: 800,
    fontSize: 72,
    letterSpacing: "-0.035em",
  } as const;

  return (
    <div style={A_SANGRE}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          height: 675,
          padding: `0 ${MARGEN}px 34px`,
          background: TINTA,
        }}
      >
        <div style={{ ...palabra, color: PAPEL }}>Mitad</div>
        <div style={{ ...cola, color: BONE_DIM, marginTop: 20 }}>al empezar.</div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          padding: `34px ${MARGEN}px ${MARGEN}px`,
          background: BRASA,
        }}
      >
        <div style={{ ...palabra, color: TINTA }}>Mitad</div>
        <div style={{ ...cola, color: TINTA, marginTop: 20 }}>al terminar.</div>
        <Aire />
        <Bajada texto="Dominio y hosting van con el primer pago. No hay tercera cuota." color={TINTA} ancho={680} />
        <Firma tinta={TINTA} marca={TINTA} />
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   El cambio chico — la definición que evita el abuso

   Una lista con dos estados: lo que entra lleva el cuadro de brasa; lo que no
   entra queda tachado. La definición es la del contrato, palabra por palabra.
   -------------------------------------------------------------------------- */

export function CambioChico() {
  const entra = ["Textos", "Precios", "Horarios", "Fotos", "Datos de contacto", "Ítems de una lista"];
  const noEntra = ["Una pantalla nueva", "Un rediseño", "Conectar otro sistema"];

  const fila = {
    display: "flex",
    alignItems: "center",
    padding: "11px 0",
    borderBottom: FILETE_TINTA,
    fontWeight: 700,
    fontSize: 38,
  } as const;

  return (
    <Lienzo fondo={HUESO}>
      <Grande texto="¿Qué es un cambio chico?" color={TINTA} cuerpo={92} />

      <div style={{ display: "flex", flexDirection: "column", marginTop: 50, borderTop: FILETE_TINTA }}>
        {entra.map((t) => (
          <div key={t} style={{ ...fila, color: TINTA }}>
            <span style={{ display: "flex", width: 26, height: 26, marginRight: 26, background: BRASA }} />
            <span>{t}</span>
          </div>
        ))}
        {noEntra.map((t) => (
          <div key={t} style={{ ...fila, color: INK_4, opacity: 0.45 }}>
            <span style={{ display: "flex", width: 26, height: 26, marginRight: 26, border: `3px solid ${INK_4}` }} />
            <span style={{ textDecoration: "line-through" }}>{t}</span>
          </div>
        ))}
      </div>

      <Aire />
      <Bajada
        texto="Hasta una hora de trabajo, incluido en el plan de soporte. Lo que no entra se cotiza avisando antes."
        color={INK_4}
      />
      <Firma tinta={TINTA} />
    </Lienzo>
  );
}

/* --------------------------------------------------------------------------
   El calendario — la garantía

   Treinta casilleros, uno por día. Es el único número de la pieza y sale del
   contrato: el calendario lo dibuja en vez de decirlo.
   -------------------------------------------------------------------------- */

export function Garantia() {
  const dias = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <Lienzo fondo={PAPEL}>
      <Grande texto="Si algo falla el primer mes, es problema nuestro." color={TINTA} cuerpo={92} />

      <div style={{ display: "flex", flexWrap: "wrap", gap: 9, width: 900, marginTop: 56 }}>
        {dias.map((d) => (
          <div
            key={d}
            style={{
              display: "flex",
              width: 142.5,
              height: 100,
              padding: "10px 14px",
              border: d === 30 ? "none" : FILETE_TINTA,
              background: d === 30 ? BRASA : "transparent",
              fontWeight: 700,
              fontSize: 24,
              color: d === 30 ? TINTA : INK_4,
            }}
          >
            {d}
          </div>
        ))}
      </div>

      <Aire />
      <Bajada texto="Treinta días de garantía desde la entrega. Después, soporte si lo querés." color={INK_4} />
      <Firma tinta={TINTA} />
    </Lienzo>
  );
}

/* --------------------------------------------------------------------------
   La planilla — automatizaciones

   Una hoja de cálculo a sangre, con las celdas llenas de barras grises. Una
   sola celda en brasa: la que se llena sola.
   -------------------------------------------------------------------------- */

export function Planilla() {
  const columnas = ["A", "B", "C", "D", "E"];
  /* El largo de cada barra, por fila y columna: irregular a propósito, para
     que se lea como datos y no como patrón. 0 es celda vacía. */
  const datos = [
    [70, 45, 60, 30, 55],
    [50, 80, 35, 65, 40],
    [85, 30, 70, 50, 0],
    [40, 60, 45, 0, 75],
    [65, 50, 0, 70, 35],
  ];
  const ancho = 1080 / 5.6;

  return (
    <div style={{ ...A_SANGRE, background: PAPEL }}>
      <div style={{ display: "flex", flexDirection: "column", borderBottom: FILETE_TINTA }}>
        <div style={{ display: "flex", height: 60, background: HUESO, borderBottom: FILETE_TINTA }}>
          <div style={{ display: "flex", width: ancho * 0.6, borderRight: FILETE_TINTA }} />
          {columnas.map((c) => (
            <div
              key={c}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: ancho,
                borderRight: FILETE_TINTA,
                fontWeight: 700,
                fontSize: 24,
                color: INK_4,
              }}
            >
              {c}
            </div>
          ))}
        </div>
        {datos.map((fila, i) => (
          <div key={i} style={{ display: "flex", height: 96, borderBottom: i < datos.length - 1 ? FILETE_TINTA : "none" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: ancho * 0.6,
                background: HUESO,
                borderRight: FILETE_TINTA,
                fontWeight: 700,
                fontSize: 24,
                color: INK_4,
              }}
            >
              {i + 1}
            </div>
            {fila.map((largo, j) => {
              const sola = i === 2 && j === 4;
              return (
                <div
                  key={j}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: ancho,
                    padding: "0 20px",
                    borderRight: FILETE_TINTA,
                    background: sola ? BRASA : "transparent",
                  }}
                >
                  {largo > 0 && (
                    <span style={{ display: "flex", width: `${largo}%`, height: 14, background: BONE_DIM }} />
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", flexGrow: 1, padding: `60px ${MARGEN}px ${MARGEN}px` }}>
        <Aire />
        <div style={{ display: "flex", marginBottom: 40 }}>
          <Grande texto={["La planilla de cada", "viernes se puede", "llenar sola."]} color={TINTA} cuerpo={92} />
        </div>
        <Bajada texto="Reportes, alertas e integraciones. Empezamos por la tarea que más horas te come." color={INK_4} />
        <Firma tinta={TINTA} />
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   El celular — desarrollo web

   Un teléfono torcido que se va por abajo. Adentro, la web armada en bloques:
   no hace falta una captura para que se lea «sitio».
   -------------------------------------------------------------------------- */

export function Celular() {
  return (
    <div style={{ ...A_SANGRE, position: "relative", background: TINTA, padding: `104px ${MARGEN}px ${MARGEN}px` }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          position: "absolute",
          left: 540,
          top: 520,
          width: 470,
          height: 980,
          padding: "70px 36px",
          borderRadius: 72,
          border: `14px solid ${PAPEL}`,
          transform: "rotate(9deg)",
        }}
      >
        <div style={{ display: "flex", height: 230, borderRadius: 18, background: BRASA }} />
        <div style={{ display: "flex", width: "85%", height: 28, marginTop: 36, background: PAPEL }} />
        <div style={{ display: "flex", width: "60%", height: 28, marginTop: 16, background: PAPEL }} />
        <div style={{ display: "flex", width: "90%", height: 14, marginTop: 36, background: BONE_DIM }} />
        <div style={{ display: "flex", width: "75%", height: 14, marginTop: 14, background: BONE_DIM }} />
        <div style={{ display: "flex", width: "80%", height: 14, marginTop: 14, background: BONE_DIM }} />
      </div>

      <Grande texto="Te buscan desde el celular, parados en la vereda." color={PAPEL} cuerpo={104} />
      <div style={{ display: "flex", marginTop: 50 }}>
        <Bajada texto="Si la web tarda o no se lee, siguen caminando." color={BONE_DIM} ancho={400} />
      </div>
      <Aire />
      <Firma tinta={PAPEL} />
    </div>
  );
}

/* --------------------------------------------------------------------------
   La vuelta — sistemas a medida

   Arriba, cabeza abajo, cómo se hacía. Abajo, derecho, cómo se hace. La
   rotación reemplaza al rótulo de «antes» y «ahora».
   -------------------------------------------------------------------------- */

export function Vuelta() {
  const cita = {
    display: "flex",
    flexWrap: "wrap",
    fontFamily: "Display",
    fontWeight: 800,
    fontSize: 84,
    lineHeight: 1.05,
    letterSpacing: "-0.035em",
  } as const;

  return (
    <div style={A_SANGRE}>
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          height: 560,
          padding: `0 ${MARGEN}px 60px`,
          background: HUESO,
          transform: "rotate(180deg)",
        }}
      >
        <div style={{ ...cita, flexDirection: "column", color: INK_4, opacity: 0.55 }}>
          <span>«Te llamo y te</span>
          <span>confirmo el turno.»</span>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          padding: `60px ${MARGEN}px ${MARGEN}px`,
          background: TINTA,
        }}
      >
        <div style={{ ...cita, flexDirection: "column", color: PAPEL }}>
          <span>«Tu turno quedó el</span>
          <span>jueves a las</span>
          <span style={{ color: BRASA }}>10:30.»</span>
        </div>
        <Aire />
        <Bajada texto="Una agenda que confirma sola. Vos atendés, el sistema anota." color={BONE_DIM} ancho={560} />
        <Firma tinta={PAPEL} />
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   El mapa — obra: ViaGrúa

   Calles en filete, dos grúas en camino y una libre. El recorrido punteado es
   lo que el panel de ViaGrúa muestra en vivo.
   -------------------------------------------------------------------------- */

export function Mapa() {
  const horizontales = [120, 250, 330, 470, 590, 700];
  const verticales = [90, 260, 410, 520, 700, 880, 990];

  return (
    <div style={{ ...A_SANGRE, position: "relative", background: TINTA, padding: `0 ${MARGEN}px ${MARGEN}px` }}>
      {horizontales.map((y) => (
        <div key={`h${y}`} style={{ display: "flex", position: "absolute", left: 0, top: y, width: 1080, borderTop: FILETE_PAPEL }} />
      ))}
      {verticales.map((x) => (
        <div key={`v${x}`} style={{ display: "flex", position: "absolute", left: x, top: 0, height: 760, borderLeft: FILETE_PAPEL }} />
      ))}

      {/* El recorrido: por la 250 y después baja por la 700. */}
      <div style={{ display: "flex", position: "absolute", left: 260, top: 248, width: 440, borderTop: `6px dashed ${BRASA}` }} />
      <div style={{ display: "flex", position: "absolute", left: 697, top: 250, height: 340, borderLeft: `6px dashed ${BRASA}` }} />

      {[
        { x: 260, y: 250, color: BRASA, d: 44 },
        { x: 700, y: 590, color: PAPEL, d: 56 },
        { x: 410, y: 470, color: BRASA, d: 44 },
        { x: 880, y: 120, color: BONE_DIM, d: 44 },
      ].map((p, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            position: "absolute",
            left: p.x - p.d / 2,
            top: p.y - p.d / 2,
            width: p.d,
            height: p.d,
            borderRadius: 9999,
            background: p.color,
            border: `8px solid ${TINTA}`,
          }}
        />
      ))}

      <Aire />
      <div style={{ display: "flex", marginBottom: 30 }}>
        <Grande texto={["Quién está libre,", "quién va en camino.", "Sin llamar a nadie."]} color={PAPEL} cuerpo={88} />
      </div>
      <Bajada texto="ViaGrúa: flotas de grúas en tiempo real. Lo hicimos nosotros." color={BONE_DIM} ancho={640} />
      <Firma tinta={PAPEL} />
    </div>
  );
}

/* --------------------------------------------------------------------------
   El manómetro — obra: Oleohidráulica Cáceres

   El reloj de presión del rubro, en plano. Cada marca es un cuadrado del
   tamaño del dial girado sobre su centro: así no hace falta transform-origin,
   que Satori no siempre respeta.
   -------------------------------------------------------------------------- */

export function Manometro() {
  const D = 900;
  const marcas = [-90, -67.5, -45, -22.5, 0, 22.5, 45, 67.5, 90];

  const girado = (grados: number) =>
    ({
      display: "flex",
      justifyContent: "center",
      position: "absolute",
      left: 0,
      top: 0,
      width: D,
      height: D,
      transform: `rotate(${grados}deg)`,
    }) as const;

  return (
    <Lienzo fondo={PAPEL}>
      <div style={{ display: "flex", position: "relative", alignSelf: "center", width: D, height: D / 2 + 40, overflow: "hidden" }}>
        <div
          style={{
            display: "flex",
            position: "absolute",
            left: 0,
            top: 0,
            width: D,
            height: D,
            borderRadius: 9999,
            border: `26px solid ${TINTA}`,
          }}
        />
        {marcas.map((g) => (
          <div key={g} style={girado(g)}>
            <span style={{ display: "flex", width: 10, height: g === 45 ? 70 : 44, marginTop: 52, background: g === 45 ? BRASA : INK_4 }} />
          </div>
        ))}
        {/* La aguja, casi al tope. */}
        <div style={girado(58)}>
          <span style={{ display: "flex", width: 16, height: D / 2 - 90, marginTop: 90, background: TINTA }} />
        </div>
        <div
          style={{
            display: "flex",
            position: "absolute",
            left: D / 2 - 44,
            top: D / 2 - 44,
            width: 88,
            height: 88,
            borderRadius: 9999,
            background: BRASA,
          }}
        />
      </div>

      <Aire />
      <div style={{ display: "flex", marginBottom: 40 }}>
        <Grande texto={["Veinte años de oficio,", "contados en una página."]} color={TINTA} cuerpo={88} />
      </div>
      <Bajada
        texto="Oleohidráulica Cáceres trabaja para ANCAP, UTE y la Armada. La web tenía que estar a esa altura."
        color={INK_4}
      />
      <Firma tinta={TINTA} />
    </Lienzo>
  );
}
