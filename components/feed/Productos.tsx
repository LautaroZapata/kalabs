import { readFileSync } from "node:fs";
import path from "node:path";
import type { ReactNode } from "react";
import { BONE_DIM, BRASA, HUESO, INK_4, LIENZO, MARGEN, PAPEL, TINTA } from "@/lib/feed";
import { Aire, Firma } from "@/components/feed/comunes";
import { Base, Texto, Titulo } from "@/components/feed/Institucional";

/* ==========================================================================
   Los productos.

   Lo que el estudio hace para sí mismo y ofrece a otros. A diferencia de las
   institucionales, acá sí va la interfaz: son capturas reales del producto en
   línea (`feed-capturas/`), no pantallas dibujadas. Los negocios que aparecen
   son los de muestra del propio producto, y la pieza lo dice.
   ========================================================================== */

const capturas = new Map<string, string>();

/** Una captura de `feed-capturas/` como data URL: Satori no lee del disco. */
function captura(nombre: string) {
  let url = capturas.get(nombre);
  if (!url) {
    const bytes = readFileSync(path.join(process.cwd(), "feed-capturas", `${nombre}.jpg`));
    url = `data:image/jpeg;base64,${bytes.toString("base64")}`;
    capturas.set(nombre, url);
  }
  return url;
}

/** Proporción de las capturas de celular: 390 × 844 a densidad 2. */
const CELULAR = 1688 / 780;
/** Y la de escritorio: 1425 × 900. */
const ESCRITORIO = 1800 / 2850;

const SOMBRA = "0 40px 90px rgba(15, 18, 20, 0.28), 0 8px 24px rgba(15, 18, 20, 0.18)";

/** Un celular: marco de tinta y la captura adentro. La forma la da la pantalla. */
function Celular({ src, ancho, x, y, giro = 0 }: { src: string; ancho: number; x: number; y: number; giro?: number }) {
  const borde = Math.round(ancho * 0.035);
  const pantalla = ancho - borde * 2;
  return (
    <div
      style={{
        display: "flex",
        position: "absolute",
        left: x,
        top: y,
        padding: borde,
        borderRadius: ancho * 0.15,
        background: TINTA,
        boxShadow: SOMBRA,
        ...(giro ? { transform: `rotate(${giro}deg)` } : {}),
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={captura(src)}
        alt=""
        width={pantalla}
        height={Math.round(pantalla * CELULAR)}
        style={{ borderRadius: ancho * 0.12 }}
      />
    </div>
  );
}

/** Una ventana de navegador sin adornos: la barra con la dirección y la captura. */
function Ventana({ src, ancho, x, y, direccion }: { src: string; ancho: number; x: number; y: number; direccion: string }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        position: "absolute",
        left: x,
        top: y,
        width: ancho,
        borderRadius: 22,
        overflow: "hidden",
        background: "#ffffff",
        boxShadow: SOMBRA,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: 56,
          padding: "0 22px",
          background: HUESO,
          borderBottom: "1px solid rgba(15, 18, 20, 0.12)",
        }}
      >
        <div
          style={{
            display: "flex",
            padding: "6px 18px",
            borderRadius: 999,
            background: PAPEL,
            fontWeight: 600,
            fontSize: 20,
            color: INK_4,
          }}
        >
          {direccion}
        </div>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={captura(src)} alt="" width={ancho} height={Math.round(ancho * ESCRITORIO)} />
    </div>
  );
}

/** La aclaración que llevan todas: lo que se ve es real, los negocios no. */
function Muestra({ color }: { color: string }) {
  return (
    <div style={{ display: "flex", fontWeight: 600, fontSize: 22, color, opacity: 0.75 }}>
      Pantallas reales de Cupo, con negocios de muestra.
    </div>
  );
}

function FirmaCupo({ tinta, marca, web }: { tinta: string; marca?: string; web: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <Firma tinta={tinta} marca={marca} />
      <span style={{ fontWeight: 700, fontSize: 34, color: web }}>cupo.uy</span>
    </div>
  );
}

/* --------------------------------------------------------------------------
   La vitrina — tres negocios, tres colores

   Tres celulares con la página de tres negocios de rubros distintos. Lo que
   se cuenta sin decirlo: el sistema es uno, la marca es la de cada negocio.
   -------------------------------------------------------------------------- */

export function CupoVitrina() {
  return (
    <Base fondo={PAPEL}>
      <Celular src="cupo/ondina" ancho={318} x={52} y={760} giro={-5} />
      <Celular src="cupo/raiz" ancho={318} x={710} y={760} giro={5} />
      <Celular src="cupo/padel" ancho={340} x={370} y={680} />

      <Firma tinta={TINTA} />
      <div style={{ display: "flex", flexDirection: "column", marginTop: 56 }}>
        <Titulo renglones={["Presentamos", "Cupo."]} color={TINTA} cuerpo={120} />
        <div style={{ display: "flex", marginTop: 24 }}>
          <Texto
            texto="Reservas en línea para turnos, canchas y clases. Cada negocio con su nombre, su color y su propio enlace."
            color={INK_4}
            ancho={840}
            abajo={18}
          />
        </div>
        <Muestra color={INK_4} />
      </div>
    </Base>
  );
}

/* --------------------------------------------------------------------------
   El detalle — los horarios, de cerca

   Un tramo de la grilla de horarios real, ampliado y girado, que se sale por
   la derecha. El texto queda abajo, sobre la brasa limpia.
   -------------------------------------------------------------------------- */

export function CupoDetalle() {
  const ancho = 940;
  return (
    <Base fondo={BRASA}>
      <div
        style={{
          display: "flex",
          position: "absolute",
          left: 210,
          top: 96,
          borderRadius: 40,
          overflow: "hidden",
          boxShadow: SOMBRA,
          transform: "rotate(-7deg)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={captura("cupo/horas-tarde")} alt="" width={ancho} height={Math.round((ancho * 460) / 720)} />
      </div>

      <Aire />
      <div style={{ display: "flex", marginBottom: 26 }}>
        <Titulo renglones={["Sus clientes", "reservan solos,", "a cualquier hora."]} color={TINTA} cuerpo={92} />
      </div>
      <Texto
        texto="Cupo muestra sus horarios libres en un enlace propio. Cada reserva entra a su agenda y el recordatorio sale solo."
        color={TINTA}
        ancho={860}
      />
      <FirmaCupo tinta={TINTA} marca={TINTA} web={TINTA} />
    </Base>
  );
}

/* --------------------------------------------------------------------------
   El panel — escritorio y celular

   El panel del negocio en una ventana que se sale por la derecha, y delante
   el celular con la página que ve el cliente. Las dos caras del producto.
   -------------------------------------------------------------------------- */

export function CupoPanel() {
  return (
    <Base fondo={TINTA}>
      <Ventana src="cupo/panel" ancho={1000} x={230} y={60} direccion="demo.cupo.uy/admin" />
      <Celular src="cupo/ondina" ancho={250} x={70} y={190} />

      <Aire />
      <div style={{ display: "flex", marginBottom: 26 }}>
        <Titulo renglones={["Su agenda del día,", "en una sola pantalla."]} color={PAPEL} cuerpo={84} />
      </div>
      <Texto
        texto="Quién atiende ahora, qué sigue y qué horarios quedan libres. Las reservas llegan solas desde su página."
        color={BONE_DIM}
        ancho={860}
        abajo={22}
      />
      <div style={{ display: "flex", marginBottom: 30 }}>
        <Muestra color={BONE_DIM} />
      </div>
      <FirmaCupo tinta={PAPEL} web={PAPEL} />
    </Base>
  );
}

/* --------------------------------------------------------------------------
   La ficha — el producto en seis renglones

   Hoja técnica: el nombre grande, y debajo qué es, para quién y cuánto
   cuesta, separados por filetes. Cada dato sale de `PROMPT.md` de Cupo.
   -------------------------------------------------------------------------- */

const FICHA: [string, string][] = [
  ["Qué es", "Reservas en línea con enlace propio"],
  ["Para quién", "Turnos, canchas y clases"],
  ["Avisos", "Recordatorio automático"],
  ["Puesta en marcha", "La hacemos nosotros"],
  ["Costo", "$ 0 para los 10 negocios fundadores"],
  ["Dirección", "cupo.uy"],
];

export function CupoFicha() {
  return (
    <Base fondo={HUESO}>
      <Celular src="cupo/raiz" ancho={330} x={700} y={120} giro={6} />

      <div
        style={{
          display: "flex",
          marginTop: 10,
          fontFamily: "Display",
          fontWeight: 800,
          fontSize: 230,
          lineHeight: 0.9,
          letterSpacing: "-0.05em",
          color: TINTA,
        }}
      >
        Cupo
      </div>
      <div style={{ display: "flex", marginTop: 26, maxWidth: 520 }}>
        <Texto texto="Un producto de Kalabs, hecho en Montevideo." color={INK_4} ancho={520} abajo={0} />
      </div>

      <Aire />
      <div style={{ display: "flex", flexDirection: "column", marginBottom: 44 }}>
        {FICHA.map(([dato, valor]) => (
          <div
            key={dato}
            style={{
              display: "flex",
              alignItems: "baseline",
              padding: "18px 0",
              borderTop: "2px solid rgba(15, 18, 20, 0.85)",
              background: HUESO,
            }}
          >
            <span style={{ display: "flex", width: 290, fontWeight: 700, fontSize: 24, color: INK_4 }}>{dato}</span>
            <span style={{ display: "flex", flex: 1, fontWeight: 700, fontSize: 34, letterSpacing: "-0.01em", color: TINTA }}>
              {valor}
            </span>
          </div>
        ))}
      </div>
      <Firma tinta={TINTA} />
    </Base>
  );
}

/* --------------------------------------------------------------------------
   El carrusel — cinco láminas, una sola tira

   Se compone como una tira de 5 × 1080 y cada lámina es una ventana sobre
   ella. Lo único que cruza de una lámina a otra es la banda de brasa: corre
   de punta a punta y no corta nada que haya que leer. Todo lo demás —el
   titular, la bajada y la pantalla— vive entero dentro de su lámina y en el
   mismo lugar en todas, para que al deslizar sólo cambie el contenido.

   Un celular partido entre dos láminas se ve roto en cada una por separado:
   la primera versión lo hacía y se descartó.
   -------------------------------------------------------------------------- */

export const LAMINAS = 5;
const ANCHO = LIENZO.width;

/** La caja de la pantalla en cada lámina: misma altura y mismo margen derecho. */
const PANTALLA = { ancho: 380, arriba: 600 };

function Encabezado({ x, renglones, texto }: { x: number; renglones: string[]; texto: string }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        position: "absolute",
        left: x + MARGEN,
        top: 150,
        width: ANCHO - MARGEN * 2,
      }}
    >
      <Titulo renglones={renglones} color={TINTA} cuerpo={96} />
      <div style={{ display: "flex", marginTop: 26 }}>
        <Texto texto={texto} color={INK_4} ancho={820} abajo={0} />
      </div>
    </div>
  );
}

/** El celular de cada lámina, derecho y contra el margen derecho. */
function Pantalla({ lamina, src }: { lamina: number; src: string }) {
  return (
    <Celular
      src={src}
      ancho={PANTALLA.ancho}
      x={ANCHO * (lamina - 1) + ANCHO - MARGEN - PANTALLA.ancho}
      y={PANTALLA.arriba}
    />
  );
}

function Tira({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: "flex", position: "absolute", left: 0, top: 0, width: ANCHO * LAMINAS, height: LIENZO.height }}>
      {children}
    </div>
  );
}

export function CupoCarrusel({ lamina }: { lamina: number }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        background: PAPEL,
        fontFamily: "Cuerpo",
        overflow: "hidden",
      }}
    >
      <div style={{ display: "flex", position: "absolute", left: -ANCHO * (lamina - 1), top: 0 }}>
        <Tira>
          {/* La banda que une las cinco láminas y remata en la última. */}
          <div
            style={{
              display: "flex",
              position: "absolute",
              left: 0,
              top: 860,
              width: ANCHO * 4 + 640,
              height: 300,
              borderTopRightRadius: 150,
              borderBottomRightRadius: 150,
              background: BRASA,
            }}
          />

          {/* 1 · Portada */}
          <Encabezado
            x={0}
            renglones={["Presentamos", "Cupo."]}
            texto="La agenda en línea de Kalabs para negocios con turnos, canchas o clases."
          />
          <div style={{ display: "flex", position: "absolute", left: MARGEN, top: 500 }}>
            <Muestra color={INK_4} />
          </div>
          <Pantalla lamina={1} src="cupo/ondina" />
          <div style={{ display: "flex", position: "absolute", left: MARGEN, top: 1196 }}>
            <Firma tinta={TINTA} />
          </div>

          {/* 2 · El cliente elige */}
          <Encabezado
            x={ANCHO}
            renglones={["Su cliente entra", "a su página."]}
            texto="Elige qué reservar desde el celular, sin descargar nada."
          />
          <Pantalla lamina={2} src="cupo/padel" />

          {/* 3 · Día y hora */}
          <Encabezado
            x={ANCHO * 2}
            renglones={["Después, el día", "y la hora."]}
            texto="Sólo ve los horarios que de verdad están libres."
          />
          <Pantalla lamina={3} src="cupo/padel-horas" />

          {/* 4 · La agenda */}
          <Encabezado
            x={ANCHO * 3}
            renglones={["La reserva entra", "sola a su agenda."]}
            texto="Y el recordatorio al cliente sale solo."
          />
          <Ventana
            src="cupo/panel"
            ancho={ANCHO - MARGEN * 2}
            x={ANCHO * 3 + MARGEN}
            y={PANTALLA.arriba}
            direccion="demo.cupo.uy/admin"
          />

          {/* 5 · Cierre */}
          <Encabezado
            x={ANCHO * 4}
            renglones={["Los primeros 10", "negocios lo usan", "gratis, para siempre."]}
            texto="Sin comisiones. Lo dejamos andando nosotros."
          />
          <div
            style={{
              display: "flex",
              position: "absolute",
              left: ANCHO * 4 + MARGEN,
              top: 940,
              fontFamily: "Display",
              fontWeight: 800,
              fontSize: 120,
              letterSpacing: "-0.04em",
              color: TINTA,
            }}
          >
            cupo.uy
          </div>
          <div style={{ display: "flex", position: "absolute", left: ANCHO * 4 + MARGEN, top: 1196 }}>
            <Firma tinta={TINTA} />
          </div>
        </Tira>
      </div>
    </div>
  );
}
