import { SITE } from "@/lib/content";
import { BRASA, HUESO, INK_4, MARGEN, PAPEL, TERRA, TINTA } from "@/lib/feed";
import { iso } from "@/lib/marca";
import { Aire, Firma, Lienzo, Rotulo } from "@/components/feed/comunes";

/* ==========================================================================
   Formas y tramas.

   Las piezas de más arriba resuelven todo con tipografía. Éstas no: el dibujo
   es una grilla, una barra, un círculo o un campo de líneas, y la tipografía
   pasa a acompañar. Es lo que le falta a la grilla del perfil —nueve piezas de
   letras seguidas se aplanan, por buenas que sean—.

   Todo se construye con rectángulos y radios: Satori no dibuja SVG suelto ni
   tiene grilla CSS, así que cada trama es flex y cajas.
   ========================================================================== */

const A_SANGRE = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  fontFamily: "Cuerpo",
  overflow: "hidden",
} as const;

/* --------------------------------------------------------------------------
   La trama — todos iguales, uno distinto

   La forma dice lo que dice el texto: cuarenta y ocho cuadrados idénticos y
   uno naranja. Es el argumento de venta entero, sin explicarlo.
   -------------------------------------------------------------------------- */

export function Trama() {
  const celdas = 36;
  /* Tiene que caer dentro de los 880 px visibles del campo: a seis por fila y
     154 px de paso, la fila 5 ya está recortada. */
  const distinta = 15;

  return (
    <div style={{ ...A_SANGRE, background: PAPEL }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 14,
          height: 880,
          padding: `104px 0 0 ${MARGEN}px`,
          overflow: "hidden",
        }}
      >
        {Array.from({ length: celdas }, (_, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              width: 140,
              height: 140,
              borderRadius: 20,
              /* En tinta y no en hueso: hueso sobre papel deja la trama lavada
                 y el argumento se pierde. El campo tiene que pesar. */
              background: i === distinta ? BRASA : TINTA,
            }}
          />
        ))}
      </div>

      <Aire />

      <div style={{ display: "flex", flexDirection: "column", padding: `0 ${MARGEN}px ${MARGEN}px` }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            marginBottom: 26,
            maxWidth: 920,
            fontFamily: "Display",
            fontWeight: 800,
            fontSize: 92,
            lineHeight: 1,
            letterSpacing: "-0.035em",
            color: TINTA,
          }}
        >
          Tu web se ve igual que la de todos.
        </div>
        <div
          style={{
            display: "flex",
            marginBottom: 34,
            fontWeight: 600,
            fontSize: 32,
            color: INK_4,
          }}
        >
          {`La tuya puede ser la naranja. ${SITE.email}`}
        </div>
        <Firma tinta={TINTA} />
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   Las barras — el dato dibujado

   Un gráfico de dos barras, sin ejes ni números al pie. La de arriba se sale
   del lienzo a propósito: no entra, igual que las horas.
   -------------------------------------------------------------------------- */

export function Barras() {
  return (
    <Lienzo fondo={PAPEL}>
      <Rotulo texto="Horas por semana" color={TERRA} />
      <Aire />

      <div style={{ display: "flex", flexDirection: "column", marginBottom: 20 }}>
        <div
          style={{
            display: "flex",
            marginBottom: 16,
            fontFamily: "Display",
            fontWeight: 800,
            fontSize: 68,
            letterSpacing: "-0.03em",
            color: TINTA,
          }}
        >
          A mano
        </div>
        {/* Más ancha que la pieza: la barra no entra en el lienzo. */}
        <div style={{ display: "flex", width: 1240, height: 132, background: BRASA }} />
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            marginTop: 44,
            marginBottom: 16,
            fontFamily: "Display",
            fontWeight: 800,
            fontSize: 68,
            letterSpacing: "-0.03em",
            color: TINTA,
          }}
        >
          Automatizado
        </div>
        <div style={{ display: "flex", width: 118, height: 132, background: TINTA }} />
      </div>

      <Aire />
      <div
        style={{
          display: "flex",
          marginBottom: 34,
          maxWidth: 840,
          fontWeight: 600,
          fontSize: 34,
          lineHeight: 1.38,
          color: INK_4,
        }}
      >
        {`Empezamos por la tarea que más horas te come. ${SITE.email}`}
      </div>
      <Firma tinta={TINTA} />
    </Lienzo>
  );
}

/* --------------------------------------------------------------------------
   Las sílabas — la palabra desarmada

   Tres bloques escalonados que se van saliendo por la derecha. Se lee igual,
   porque el ojo completa lo que falta.
   -------------------------------------------------------------------------- */

export function Silabas() {
  const partes = [
    { texto: "RE", sangria: -34, color: PAPEL },
    { texto: "SOL", sangria: 150, color: BRASA },
    { texto: "VER", sangria: 360, color: PAPEL },
  ];

  return (
    <Lienzo fondo={TINTA}>
      <Rotulo texto="Contanos qué hay que" color={BRASA} />
      <Aire />

      <div style={{ display: "flex", flexDirection: "column" }}>
        {partes.map((parte) => (
          <div
            key={parte.texto}
            style={{
              display: "flex",
              marginLeft: parte.sangria,
              fontFamily: "Display",
              fontWeight: 800,
              fontSize: 268,
              lineHeight: 0.84,
              letterSpacing: "-0.05em",
              whiteSpace: "nowrap",
              color: parte.color,
            }}
          >
            {parte.texto}
          </div>
        ))}
      </div>

      <Aire />
      <div
        style={{
          display: "flex",
          marginBottom: 34,
          fontFamily: "Display",
          fontWeight: 800,
          fontSize: 50,
          letterSpacing: "-0.025em",
          color: BRASA,
        }}
      >
        {SITE.email}
      </div>
      <Firma tinta={PAPEL} />
    </Lienzo>
  );
}

/* --------------------------------------------------------------------------
   El círculo — una sola forma

   El plano de brasa deja de ser un rectángulo. Nada más que eso, y ya cambia
   la pieza entera.
   -------------------------------------------------------------------------- */

export function Circulo() {
  return (
    <div
      style={{
        ...A_SANGRE,
        position: "relative",
        background: PAPEL,
        padding: `104px ${MARGEN}px ${MARGEN}px`,
      }}
    >
      <div
        style={{
          display: "flex",
          position: "absolute",
          left: 350,
          top: 470,
          width: 1180,
          height: 1180,
          borderRadius: 9999,
          background: BRASA,
        }}
      />

      <Rotulo texto="Sistemas a medida" color={TERRA} />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          marginTop: 34,
          maxWidth: 880,
          fontFamily: "Display",
          fontWeight: 800,
          fontSize: 128,
          lineHeight: 0.98,
          letterSpacing: "-0.04em",
          color: TINTA,
        }}
      >
        Empezá por una sola cosa.
      </div>

      <Aire />
      <div
        style={{
          display: "flex",
          marginBottom: 34,
          maxWidth: 620,
          fontWeight: 600,
          fontSize: 32,
          lineHeight: 1.38,
          color: TINTA,
        }}
      >
        {`Una función bien resuelta antes que un sistema entero. ${SITE.email}`}
      </div>
      <Firma tinta={TINTA} marca={TINTA} />
    </div>
  );
}

/* --------------------------------------------------------------------------
   Las franjas — el feed como bandera

   Cuatro bandas a sangre, sin margen. Es la pieza más plana de todas y por eso
   se distingue: no hay composición, hay bloques.
   -------------------------------------------------------------------------- */

export function Franjas() {
  const bandas = [
    { texto: "WEBS", fondo: PAPEL, tinta: TINTA },
    { texto: "BOTS", fondo: BRASA, tinta: TINTA },
    { texto: "SISTEMAS", fondo: TINTA, tinta: PAPEL },
    { texto: "MARCAS", fondo: HUESO, tinta: TERRA },
  ];

  return (
    <div style={{ ...A_SANGRE, background: PAPEL }}>
      {bandas.map((banda) => (
        <div
          key={banda.texto}
          style={{
            display: "flex",
            alignItems: "center",
            flexGrow: 1,
            paddingLeft: 72,
            background: banda.fondo,
          }}
        >
          <span
            style={{
              fontFamily: "Display",
              fontWeight: 800,
              fontSize: 152,
              letterSpacing: "-0.045em",
              whiteSpace: "nowrap",
              color: banda.tinta,
            }}
          >
            {banda.texto}
          </span>
        </div>
      ))}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: `34px ${MARGEN}px`,
          background: TINTA,
        }}
      >
        <span
          style={{
            fontFamily: "Display",
            fontWeight: 800,
            fontSize: 46,
            letterSpacing: "-0.025em",
            color: BRASA,
          }}
        >
          {SITE.email}
        </span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={iso(PAPEL)} alt="" width={44} height={43} />
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   La grilla modular — nueve casilleros

   Un sistema, dibujado. Cada casillero es un bloque de color o una palabra;
   el mensaje está repartido y hay que recorrerlo.
   -------------------------------------------------------------------------- */

export function Modular() {
  const casillas: { texto?: string; fondo: string; tinta?: string; marca?: boolean }[] = [
    { texto: "WEB", fondo: HUESO, tinta: TINTA },
    { fondo: BRASA },
    { texto: "BOT", fondo: HUESO, tinta: TINTA },
    { fondo: TINTA },
    { fondo: PAPEL, marca: true },
    { texto: "24 h", fondo: BRASA, tinta: TINTA },
    { texto: "$0", fondo: TINTA, tinta: BRASA },
    { texto: "UY", fondo: HUESO, tinta: TERRA },
    { fondo: TINTA },
  ];

  return (
    <div style={{ ...A_SANGRE, background: PAPEL, justifyContent: "center" }}>
      <div style={{ display: "flex", flexWrap: "wrap", width: 1080 }}>
        {casillas.map((casilla, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 360,
              height: 360,
              background: casilla.fondo,
            }}
          >
            {casilla.marca ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={iso(BRASA)} alt="" width={168} height={164} />
            ) : (
              <span
                style={{
                  fontFamily: "Display",
                  fontWeight: 800,
                  fontSize: 82,
                  letterSpacing: "-0.035em",
                  color: casilla.tinta ?? TINTA,
                }}
              >
                {casilla.texto ?? ""}
              </span>
            )}
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: `48px ${MARGEN}px 0`,
        }}
      >
        <div
          style={{
            display: "flex",
            fontFamily: "Display",
            fontWeight: 800,
            fontSize: 62,
            letterSpacing: "-0.03em",
            color: TINTA,
          }}
        >
          Estudio digital de Montevideo.
        </div>
        <div style={{ display: "flex", marginTop: 12, fontWeight: 600, fontSize: 34, color: TERRA }}>
          {SITE.email}
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   El signo — un glifo como forma

   Un signo de pregunta a tamaño de cartel, recortado por dos bordes. Deja de
   leerse como puntuación y pasa a ser un dibujo.
   -------------------------------------------------------------------------- */

export function Pregunta() {
  return (
    <div
      style={{
        ...A_SANGRE,
        position: "relative",
        background: BRASA,
        padding: `104px ${MARGEN}px ${MARGEN}px`,
      }}
    >
      <div
        style={{
          display: "flex",
          position: "absolute",
          left: 200,
          top: -180,
          fontFamily: "Display",
          fontWeight: 800,
          fontSize: 1180,
          lineHeight: 0.8,
          color: TINTA,
        }}
      >
        ?
      </div>

      <Aire />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          marginBottom: 22,
          maxWidth: 800,
          fontFamily: "Display",
          fontWeight: 800,
          fontSize: 88,
          lineHeight: 1,
          letterSpacing: "-0.035em",
          color: TINTA,
        }}
      >
        Contanos qué hay que resolver.
      </div>
      <div style={{ display: "flex", marginBottom: 34, fontWeight: 700, fontSize: 34, color: TINTA }}>
        {`La primera consulta no tiene costo. ${SITE.email}`}
      </div>
      <Firma tinta={TINTA} marca={TINTA} />
    </div>
  );
}

/* --------------------------------------------------------------------------
   El tachado — la corrección a la vista

   Se deja el error escrito y se lo tacha. El gesto es de corrector, no de
   diseñador, y por eso se lee antes que cualquier titular.
   -------------------------------------------------------------------------- */

export function Tachado() {
  return (
    <Lienzo fondo={PAPEL}>
      <Rotulo texto="Lo que hacés todas las semanas" color={TERRA} />
      <Aire />

      <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
        <div
          style={{
            display: "flex",
            marginLeft: -20,
            fontFamily: "Display",
            fontWeight: 800,
            fontSize: 214,
            lineHeight: 0.92,
            letterSpacing: "-0.05em",
            /* Apagado: si las dos palabras pesan igual, no se lee que una
               reemplaza a la otra, se lee que son dos titulares. */
            color: INK_4,
            opacity: 0.34,
          }}
        >
          A MANO
        </div>
        {/* La tachadura es una barra, no un `text-decoration`: se quiere gruesa
            y en brasa, y sobresaliendo del texto por los dos lados. */}
        <div
          style={{
            display: "flex",
            position: "absolute",
            left: -40,
            top: 88,
            width: 900,
            height: 26,
            background: BRASA,
          }}
        />
        <div
          style={{
            display: "flex",
            marginLeft: -20,
            marginTop: 18,
            fontFamily: "Display",
            fontWeight: 800,
            fontSize: 214,
            lineHeight: 0.92,
            letterSpacing: "-0.05em",
            color: TINTA,
          }}
        >
          SOLO
        </div>
      </div>

      <Aire />
      <div
        style={{
          display: "flex",
          marginBottom: 34,
          maxWidth: 860,
          fontWeight: 600,
          fontSize: 34,
          lineHeight: 1.38,
          color: INK_4,
        }}
      >
        {`Si se repite, se automatiza. Empezamos por la que más horas te come. ${SITE.email}`}
      </div>
      <Firma tinta={TINTA} />
    </Lienzo>
  );
}

/* --------------------------------------------------------------------------
   El campo de líneas — ruido y silencio

   Cuarenta y seis líneas llenan el lienzo y un bloque macizo las interrumpe.
   El bloque es lo único que se lee: es literalmente el argumento.
   -------------------------------------------------------------------------- */

export function Rayas() {
  const lineas = 46;

  return (
    <div style={{ ...A_SANGRE, position: "relative", background: TINTA, justifyContent: "center" }}>
      {Array.from({ length: lineas }, (_, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            width: "100%",
            height: 4,
            marginBottom: 25,
            background: BRASA,
          }}
        />
      ))}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "absolute",
          left: 0,
          right: 0,
          top: 430,
          height: 470,
          padding: `0 ${MARGEN}px`,
          background: TINTA,
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            maxWidth: 880,
            fontFamily: "Display",
            fontWeight: 800,
            fontSize: 104,
            lineHeight: 1,
            letterSpacing: "-0.035em",
            color: PAPEL,
          }}
        >
          Entre todo el ruido, que se te entienda.
        </div>
        <div style={{ display: "flex", marginTop: 22, fontWeight: 700, fontSize: 34, color: BRASA }}>
          {SITE.email}
        </div>
      </div>
    </div>
  );
}
