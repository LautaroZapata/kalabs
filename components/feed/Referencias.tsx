import { SITE } from "@/lib/content";
import { BRASA, HUESO, INK_4, MARGEN, PAPEL, TERRA, TINTA } from "@/lib/feed";
import { Aire, Firma, Lienzo, Rotulo } from "@/components/feed/comunes";

/* ==========================================================================
   Piezas sacadas de referencias concretas.

   Cada una roba un recurso de un estudio que se puede ir a mirar. No es
   copiar: es tomar el mecanismo —el apilado de Scher, la sustitución de
   &Walsh, la geometría plana de Hey— y meterle nuestra paleta, nuestra
   tipografía y lo que tenemos para decir.

   El comentario de cada bloque dice de dónde sale, para que dentro de un año
   se entienda por qué la pieza es como es.
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
   El cartel — Paula Scher / Pentagram, The Public Theater

   El lienzo entero lleno de líneas apiladas, de borde a borde, sin margen y
   sin aire. Cada línea se dimensiona para cruzar la pieza, así que las de
   menos letras salen más grandes. El bloque de color en el medio corta la
   lectura y la vuelve a arrancar.
   -------------------------------------------------------------------------- */

export function Cartel() {
  /* El cuerpo de cada línea sale de su cantidad de letras: las de menos van
     más grandes, y así todas cruzan la pieza de lado a lado. Es lo que hace
     Scher en los carteles del Public Theater. */
  const lineas = [
    { texto: "WEBS QUE", cuerpo: 250, color: PAPEL },
    { texto: "APARECEN", cuerpo: 250, color: PAPEL },
    { texto: "BOTS QUE", cuerpo: 250, color: BRASA },
    { texto: "CONTESTAN", cuerpo: 222, color: BRASA },
  ];

  return (
    <div style={{ ...A_SANGRE, background: TINTA, paddingTop: 78 }}>
      {lineas.map((linea) => (
        <div
          key={linea.texto}
          style={{
            display: "flex",
            marginLeft: -18,
            fontFamily: "Display",
            fontWeight: 800,
            fontSize: linea.cuerpo,
            /* 1.06 y no menos: la cola de la Q de «QUE» baja mucho y a 0.95
               todavía se metía en el renglón siguiente. Con cuatro líneas de
               este cuerpo el lienzo se llena igual, así que la densidad no se
               pierde por darle aire. */
            lineHeight: 1.06,
            letterSpacing: "-0.05em",
            whiteSpace: "nowrap",
            color: linea.color,
          }}
        >
          {linea.texto}
        </div>
      ))}

      <Aire />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: `30px ${MARGEN}px`,
          background: BRASA,
        }}
      >
        <span style={{ fontWeight: 700, fontSize: 30, color: TINTA }}>
          Webs · Bots · Sistemas a medida
        </span>
        <span
          style={{
            fontFamily: "Display",
            fontWeight: 800,
            fontSize: 40,
            letterSpacing: "-0.025em",
            color: TINTA,
          }}
        >
          {SITE.email}
        </span>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   La sustitución — &Walsh

   Una letra sale de la palabra y entra una forma en su lugar. El truco es que
   la forma tiene que medir lo que medía la letra: si no, no se lee la palabra,
   se lee un error.
   -------------------------------------------------------------------------- */

export function Sustitucion() {
  const cuerpo = 190;

  return (
    <Lienzo fondo={PAPEL}>
      <Rotulo texto="Contanos qué hay que" color={TERRA} />
      <Aire />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginLeft: -18,
          fontFamily: "Display",
          fontWeight: 800,
          fontSize: cuerpo,
          letterSpacing: "-0.05em",
          color: TINTA,
        }}
      >
        <span>RES</span>
        {/* El disco ocupa el lugar de la O y mide como ella. */}
        <span
          style={{
            display: "flex",
            width: 138,
            height: 138,
            marginLeft: 8,
            marginRight: 8,
            borderRadius: 9999,
            background: BRASA,
          }}
        />
        <span>LVER</span>
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
        {`Webs, automatizaciones y sistemas a medida. La primera consulta no tiene costo. ${SITE.email}`}
      </div>
      <Firma tinta={TINTA} />
    </Lienzo>
  );
}

/* --------------------------------------------------------------------------
   El globo — Hey Studio

   Geometría plana y nada más: un rectángulo con tres esquinas redondeadas y
   una en punta ya es un globo de chat. No hace falta dibujar WhatsApp para
   que se entienda que es un mensaje.
   -------------------------------------------------------------------------- */

export function Globo() {
  return (
    <Lienzo fondo={BRASA}>
      <Rotulo texto="Automatizaciones" color={TINTA} />

      {/* El que escribe, a la izquierda; el que contesta, a la derecha. La
          esquina en punta cambia de lado y con eso solo ya se entiende quién
          habla: no hace falta ningún avatar. */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: 52,
          padding: "48px 52px",
          width: 850,
          background: TINTA,
          borderTopLeftRadius: 110,
          borderTopRightRadius: 110,
          borderBottomRightRadius: 110,
          borderBottomLeftRadius: 0,
        }}
      >
        <span
          style={{
            display: "flex",
            flexWrap: "wrap",
            fontFamily: "Display",
            fontWeight: 800,
            fontSize: 66,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            color: PAPEL,
          }}
        >
          «Hola, quiero hacer un pedido»
        </span>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          alignSelf: "flex-end",
          marginTop: 26,
          padding: "40px 46px",
          width: 700,
          background: PAPEL,
          borderTopLeftRadius: 110,
          borderTopRightRadius: 110,
          borderBottomLeftRadius: 110,
          borderBottomRightRadius: 0,
        }}
      >
        <span
          style={{
            display: "flex",
            flexWrap: "wrap",
            fontFamily: "Display",
            fontWeight: 800,
            fontSize: 54,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            color: TINTA,
          }}
        >
          «Listo. Pedido 47 anotado.»
        </span>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          marginTop: 58,
          maxWidth: 900,
          fontFamily: "Display",
          fontWeight: 800,
          fontSize: 100,
          lineHeight: 1,
          letterSpacing: "-0.035em",
          color: TINTA,
        }}
      >
        Y del otro lado no hay nadie.
      </div>

      <Aire />
      <div style={{ display: "flex", marginBottom: 34, fontWeight: 700, fontSize: 34, color: TINTA }}>
        {`El bot toma el pedido y lo deja anotado. ${SITE.email}`}
      </div>
      <Firma tinta={TINTA} marca={TINTA} />
    </Lienzo>
  );
}

/* --------------------------------------------------------------------------
   Los discos — Studio Feixen

   Círculos grandes que se pisan entre sí. Feixen los deforma y los anima;
   acá quedan quietos y planos, que es lo que aguanta nuestra paleta. El
   cruce de dos discos ya arma una tercera forma sin dibujar nada.
   -------------------------------------------------------------------------- */

export function Discos() {
  const discos = [
    { x: 40, y: 150, d: 520, color: TINTA },
    { x: 400, y: 320, d: 520, color: BRASA },
    { x: 130, y: 470, d: 520, color: HUESO },
  ];

  return (
    <div
      style={{
        ...A_SANGRE,
        position: "relative",
        background: PAPEL,
        padding: `104px ${MARGEN}px ${MARGEN}px`,
      }}
    >
      {discos.map((disco, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            position: "absolute",
            left: disco.x,
            top: disco.y,
            width: disco.d,
            height: disco.d,
            borderRadius: 9999,
            background: disco.color,
          }}
        />
      ))}

      <Rotulo texto="Tres cosas que hacemos" color={TERRA} />
      <Aire />

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          marginBottom: 26,
          maxWidth: 900,
          fontFamily: "Display",
          fontWeight: 800,
          fontSize: 96,
          lineHeight: 1,
          letterSpacing: "-0.035em",
          color: TINTA,
        }}
      >
        Web, bot y sistema. Se cruzan.
      </div>
      <div
        style={{
          display: "flex",
          marginBottom: 34,
          maxWidth: 820,
          fontWeight: 600,
          fontSize: 32,
          lineHeight: 1.38,
          color: INK_4,
        }}
      >
        {`Casi nunca es una sola cosa, y casi nunca son las tres. ${SITE.email}`}
      </div>
      <Firma tinta={TINTA} />
    </div>
  );
}

/* --------------------------------------------------------------------------
   La torre — Studio Dumbar

   Dumbar trabaja el tipo como si estuviera en movimiento: apilado, estirado,
   rotado. Acá el movimiento queda congelado en cinco pasos de tres grados.
   -------------------------------------------------------------------------- */

export function Torre() {
  const pasos = [-6, -3, 0, 3, 6];

  return (
    <Lienzo fondo={BRASA}>
      <Rotulo texto="Lo que se repite" color={TINTA} />
      <Aire />

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {pasos.map((grados, i) => (
          <div
            key={grados}
            style={{
              display: "flex",
              /* La rotación agranda la caja del renglón: el margen negativo la
                 vuelve a cerrar para que la pila quede compacta. */
              marginTop: i === 0 ? 0 : -34,
              fontFamily: "Display",
              fontWeight: 800,
              fontSize: 128,
              lineHeight: 1,
              letterSpacing: "-0.045em",
              whiteSpace: "nowrap",
              color: i === 2 ? PAPEL : TINTA,
              transform: `rotate(${grados}deg)`,
            }}
          >
            SE AUTOMATIZA
          </div>
        ))}
      </div>

      <Aire />
      <div style={{ display: "flex", marginBottom: 34, fontWeight: 700, fontSize: 34, color: TINTA }}>
        {`Empezamos por la tarea que más horas te come. ${SITE.email}`}
      </div>
      <Firma tinta={TINTA} marca={TINTA} />
    </Lienzo>
  );
}

/* --------------------------------------------------------------------------
   La escala — Ragged Edge

   Dos cuerpos tipográficos que no se hablan: uno de cartel y uno de nota al
   pie, pegados en el mismo bloque. El salto es el recurso; si los dos fueran
   parecidos, no habría pieza.
   -------------------------------------------------------------------------- */

export function Escala() {
  return (
    <Lienzo fondo={PAPEL}>
      <Rotulo texto="Antes de escribirnos" color={TERRA} />
      <Aire />

      <div style={{ display: "flex", alignItems: "flex-start" }}>
        <span
          style={{
            display: "flex",
            marginLeft: -26,
            marginRight: 34,
            fontFamily: "Display",
            fontWeight: 800,
            fontSize: 400,
            lineHeight: 0.76,
            letterSpacing: "-0.06em",
            color: BRASA,
          }}
        >
          NO
        </span>
        <span
          style={{
            display: "flex",
            flexWrap: "wrap",
            marginTop: 22,
            width: 420,
            fontWeight: 600,
            fontSize: 32,
            lineHeight: 1.42,
            color: INK_4,
          }}
        >
          hace falta que sepas qué tecnología lleva, ni cómo se llama lo que
          necesitás, ni cuánto debería salir. Para eso estamos.
        </span>
      </div>

      <Aire />
      <div
        style={{
          display: "flex",
          marginBottom: 34,
          fontFamily: "Display",
          fontWeight: 800,
          fontSize: 52,
          letterSpacing: "-0.025em",
          color: TERRA,
        }}
      >
        {SITE.email}
      </div>
      <Firma tinta={TINTA} />
    </Lienzo>
  );
}

/* --------------------------------------------------------------------------
   El negativo — Wolff Olins / DixonBaxi

   La pieza partida al medio: a la izquierda papel con tinta, a la derecha
   tinta con papel. La palabra cruza el corte y se invierte en el camino.

   Satori no tiene `clip-path`, así que son dos mitades con `overflow: hidden`,
   cada una con el texto completo en la misma posición absoluta. La de la
   derecha se corre 540 px a la izquierda para que los trazos coincidan.
   -------------------------------------------------------------------------- */

function MitadNegativo({ fondo, tinta, corrimiento }: { fondo: string; tinta: string; corrimiento: number }) {
  return (
    <div
      style={{
        display: "flex",
        position: "absolute",
        left: corrimiento === 0 ? 0 : 540,
        top: 0,
        width: 540,
        height: 1350,
        background: fondo,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: 1080,
          height: 1350,
          marginLeft: corrimiento,
          paddingTop: 470,
          paddingLeft: 44,
        }}
      >
        <span
          style={{
            fontFamily: "Display",
            fontWeight: 800,
            fontSize: 196,
            lineHeight: 0.88,
            letterSpacing: "-0.05em",
            whiteSpace: "nowrap",
            color: tinta,
          }}
        >
          RESOLVER
        </span>
        <span
          style={{
            marginTop: 26,
            fontWeight: 700,
            fontSize: 40,
            letterSpacing: "0.02em",
            whiteSpace: "nowrap",
            color: tinta,
          }}
        >
          es lo único que hacemos.
        </span>
      </div>
    </div>
  );
}

export function Negativo() {
  return (
    <div style={{ ...A_SANGRE, position: "relative", background: PAPEL }}>
      <MitadNegativo fondo={PAPEL} tinta={TINTA} corrimiento={0} />
      <MitadNegativo fondo={TINTA} tinta={PAPEL} corrimiento={-540} />

      <div
        style={{
          display: "flex",
          position: "absolute",
          left: MARGEN,
          top: 104,
          fontWeight: 700,
          fontSize: 21,
          letterSpacing: "0.12em",
          color: TERRA,
        }}
      >
        ESTUDIO DIGITAL · MONTEVIDEO
      </div>

      <div
        style={{
          display: "flex",
          position: "absolute",
          left: MARGEN,
          bottom: MARGEN,
          fontFamily: "Display",
          fontWeight: 800,
          fontSize: 48,
          letterSpacing: "-0.025em",
          color: TERRA,
        }}
      >
        {SITE.email}
      </div>
    </div>
  );
}
