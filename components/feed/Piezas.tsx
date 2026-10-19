import type { ReactElement } from "react";
import { EQUIPO, SITE, UI } from "@/lib/content";
import {
  BONE_DIM,
  BRASA,
  FILETE_PAPEL,
  FILETE_TINTA,
  HUESO,
  INK_4,
  PAPEL,
  PROMESAS,
  SERVICIOS_DETALLE,
  SERVICIOS_FEED,
  TERRA,
  TINTA,
  type Frase,
  type Pieza,
} from "@/lib/feed";
import { Aire, Firma, Lienzo, Rotulo, Titular } from "@/components/feed/comunes";
import { Capas, Dato, Diagonal, Isotipo, Repeticion, Terminal } from "@/components/feed/Sueltas";
import {
  Barras,
  Circulo,
  Franjas,
  Modular,
  Pregunta,
  Rayas,
  Silabas,
  Tachado,
  Trama,
} from "@/components/feed/Formas";
import {
  Cartel,
  Discos,
  Escala,
  Globo,
  Negativo,
  Sustitucion,
  Torre,
} from "@/components/feed/Referencias";
import {
  CambioChico,
  Celular,
  Garantia,
  Llaves,
  Manometro,
  Mapa,
  Mitades,
  Planilla,
  Recibo,
  Vuelta,
} from "@/components/feed/Oficio";
import {
  Arcos,
  Candado,
  Columnas,
  Cruz,
  Cuadrante,
  Escalera,
  Fichas,
  Puntos,
  Semicirculo,
  Triangulo,
} from "@/components/feed/Institucional";
import {
  Circulos,
  Copia,
  Diagrama,
  Embudo,
  Eslabones,
  Luna,
  Muestras,
  Pin,
  Reduccion,
  Sobre,
} from "@/components/feed/Consejos";
import { CupoCarrusel, CupoDetalle, CupoFicha, CupoPanel, CupoVitrina } from "@/components/feed/Productos";

/* ==========================================================================
   Las piezas del feed que respetan el sistema.

   Satori entiende un subconjunto de CSS: sólo flex, sin grilla, y todo bloque
   con más de un hijo lleva `display: flex` explícito. Nada de lo de acá es un
   componente del sitio: son planos para una imagen, no interfaz.

   Las reglas aplicadas: un solo plano de brasa por pieza, la curva de 24 px
   agrupa, el filete de 1 px separa, y una sola cosa grande. Las piezas que
   rompen estas reglas a propósito viven en `Sueltas.tsx`.
   ========================================================================== */

/* --------------------------------------------------------------------------
   El campo — plano de tinta

   El campo de la portada, congelado. El sitio lo escribe solo; acá el cursor
   queda quieto al final de la consulta. Es la pieza que nadie puede copiar,
   porque sale de algo que sólo existe en el sitio.
   -------------------------------------------------------------------------- */

function Campo({ consulta }: { consulta: string }) {
  return (
    <Lienzo fondo={TINTA}>
      <Rotulo texto="La primera consulta no tiene costo" color={BRASA} />
      <Titular texto="Contanos qué hay que resolver." color={PAPEL} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: 58,
          padding: "44px 44px 52px",
          borderRadius: 24,
          background: PAPEL,
        }}
      >
        <div
          style={{
            display: "flex",
            fontWeight: 700,
            fontSize: 18,
            letterSpacing: "0.12em",
            color: INK_4,
            opacity: 0.55,
          }}
        >
          TU CONSULTA
        </div>
        <div style={{ display: "flex", alignItems: "center", marginTop: 26 }}>
          <span
            style={{
              fontWeight: 600,
              fontSize: 46,
              letterSpacing: "-0.015em",
              color: INK_4,
            }}
          >
            {consulta}
          </span>
          <span
            style={{
              display: "flex",
              width: 5,
              height: 54,
              marginLeft: 10,
              background: BRASA,
            }}
          />
        </div>
      </div>

      {/* La única mancha de color pleno que se toca. */}
      <div
        style={{
          display: "flex",
          alignSelf: "flex-start",
          marginTop: 52,
          padding: "24px 44px",
          borderRadius: 999,
          background: BRASA,
          color: TINTA,
          fontWeight: 700,
          fontSize: 32,
        }}
      >
        {`Escribinos a ${SITE.email}`}
      </div>

      {/* El aire va acá y no antes de la firma: los cinco servicios y la marca
          son el mismo bloque de pie, y separarlos abría un pozo en el medio. */}
      <Aire />

      <div
        style={{
          display: "flex",
          marginBottom: 34,
          maxWidth: 880,
          fontWeight: 600,
          fontSize: 28,
          lineHeight: 1.4,
          color: BONE_DIM,
        }}
      >
        {SERVICIOS_FEED.join(" · ")}
      </div>
      <Firma tinta={PAPEL} />
    </Lienzo>
  );
}

/* --------------------------------------------------------------------------
   Los cinco servicios, sobre tinta
   -------------------------------------------------------------------------- */

function ServiciosTinta() {
  return (
    <Lienzo fondo={TINTA}>
      <Rotulo texto={UI.serviciosAntetitulo} color={BRASA} />
      <Titular texto={UI.serviciosTitulo} color={PAPEL} cuerpo={92} />

      <div style={{ display: "flex", flexDirection: "column", marginTop: 54 }}>
        {SERVICIOS_FEED.map((servicio, i) => (
          <div
            key={servicio}
            style={{
              display: "flex",
              padding: "24px 0",
              borderTop: FILETE_PAPEL,
              borderBottom: i === SERVICIOS_FEED.length - 1 ? FILETE_PAPEL : "none",
            }}
          >
            <span
              style={{
                fontFamily: "Display",
                fontWeight: 800,
                fontSize: 52,
                letterSpacing: "-0.025em",
                /* Una sola palabra marcada por pieza: la del medio. */
                color: i === 2 ? BRASA : PAPEL,
              }}
            >
              {servicio}
            </span>
          </div>
        ))}
      </div>

      <Aire />

      {/* Una pieza de servicios sin llamado es un folleto: acá va el correo. */}
      <div
        style={{
          display: "flex",
          marginBottom: 34,
          fontFamily: "Display",
          fontWeight: 800,
          fontSize: 54,
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
   Los cinco servicios, a sangre

   El contenido es el gráfico: el borde derecho lo dentan los nombres, no una
   decisión decorativa. Las líneas largas se cortan a propósito.
   -------------------------------------------------------------------------- */

function ServiciosSangre() {
  return (
    <Lienzo fondo={PAPEL}>
      <Rotulo texto={UI.serviciosAntetitulo} color={TERRA} />

      <div style={{ display: "flex", flexDirection: "column", marginTop: 44 }}>
        {SERVICIOS_FEED.map((servicio, i) => (
          <div
            key={servicio}
            style={{
              display: "flex",
              /* El margen negativo alinea el asta de la primera letra con el
                 margen de la pieza: la caja de la tipografía trae aire propio. */
              marginLeft: -14,
              fontFamily: "Display",
              fontWeight: 800,
              /* A 150 los nombres largos se salen del lienzo y se cortan; los
                 cortos entran enteros. El borde derecho dentado lo hace el
                 largo de cada servicio, no una decisión de diseño. */
              fontSize: 150,
              lineHeight: 0.94,
              letterSpacing: "-0.04em",
              whiteSpace: "nowrap",
              color: i === 2 ? BRASA : TINTA,
            }}
          >
            {servicio}
          </div>
        ))}
      </div>

      <Aire />

      <div style={{ display: "flex", borderTop: FILETE_TINTA }} />
      <div
        style={{
          display: "flex",
          marginTop: 40,
          maxWidth: 820,
          fontWeight: 600,
          fontSize: 34,
          lineHeight: 1.38,
          color: INK_4,
        }}
      >
        Contanos qué hay que resolver. La primera consulta no tiene costo.
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 26,
          marginBottom: 40,
          fontFamily: "Display",
          fontWeight: 800,
          fontSize: 54,
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
   Las tres promesas — plano pleno de brasa

   Tipografía sola. Es la pieza que rompe la grilla del feed: entre piezas de
   papel y de tinta, ésta es la única naranja plena.
   -------------------------------------------------------------------------- */

function Promesas() {
  return (
    <Lienzo fondo={BRASA}>
      <Rotulo texto={`${SITE.ciudad}, ${SITE.pais}`} color={TINTA} />
      <Aire />

      <div style={{ display: "flex", flexDirection: "column" }}>
        {PROMESAS.map((promesa, i) => (
          <div
            key={promesa}
            style={{
              display: "flex",
              padding: "36px 0",
              borderTop: "1px solid rgba(15, 18, 20, 0.28)",
              borderBottom: i === PROMESAS.length - 1 ? "1px solid rgba(15, 18, 20, 0.28)" : "none",
            }}
          >
            <span
              style={{
                display: "flex",
                flexWrap: "wrap",
                maxWidth: 860,
                fontFamily: "Display",
                fontWeight: 800,
                fontSize: 74,
                lineHeight: 1.02,
                letterSpacing: "-0.03em",
                color: TINTA,
              }}
            >
              {promesa}
            </span>
          </div>
        ))}
      </div>

      <Aire />
      {/* Sobre el plano de brasa, la K va en tinta: no hay dos naranjas. */}
      <Firma tinta={TINTA} marca={TINTA} />
    </Lienzo>
  );
}

/* --------------------------------------------------------------------------
   Una idea por pieza
   -------------------------------------------------------------------------- */

function Idea({ frase, fondo }: { frase: Frase; fondo: "papel" | "brasa" }) {
  const sobreBrasa = fondo === "brasa";
  const [antes, marcada, despues] = frase;

  /* El bordo es la segunda voz sobre papel. Sobre el plano de brasa no
     contrasta —dos naranjas casi iguales—, así que ahí la palabra marcada sale
     en papel. */
  const acento = sobreBrasa ? PAPEL : TERRA;

  return (
    <Lienzo fondo={sobreBrasa ? BRASA : PAPEL}>
      <Rotulo texto={SITE.tagline} color={sobreBrasa ? TINTA : TERRA} />
      <Aire />

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          fontFamily: "Display",
          fontWeight: 800,
          fontSize: 96,
          lineHeight: 1.04,
          letterSpacing: "-0.035em",
          color: TINTA,
        }}
      >
        <span>{antes}</span>
        <span style={{ color: acento }}>{marcada}</span>
        {despues ? <span>{despues}</span> : null}
      </div>

      <Aire />
      <Firma tinta={TINTA} marca={sobreBrasa ? TINTA : BRASA} />
    </Lienzo>
  );
}

/* --------------------------------------------------------------------------
   El equipo — iniciales, sin fotos de perfil
   -------------------------------------------------------------------------- */

function Equipo() {
  return (
    <Lienzo fondo={PAPEL}>
      <Rotulo texto={UI.equipoAntetitulo} color={TERRA} />
      <Titular texto={UI.estudioTitulo} color={TINTA} cuerpo={92} />

      <div style={{ display: "flex", flexDirection: "column", marginTop: 56, gap: 24 }}>
        {EQUIPO.map((persona) => (
          <div
            key={persona.nombre}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 34,
              padding: "38px 44px",
              borderRadius: 24,
              background: HUESO,
            }}
          >
            <span
              style={{
                display: "flex",
                /* Ancho fijo: «LZ» y «MS» no miden lo mismo, y sin la caja los
                   dos nombres arrancaban en columnas distintas. */
                width: 130,
                fontFamily: "Display",
                fontWeight: 800,
                fontSize: 78,
                letterSpacing: "-0.04em",
                color: BRASA,
              }}
            >
              {persona.nombre
                .split(" ")
                .map((parte) => parte[0])
                .join("")}
            </span>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  fontFamily: "Display",
                  fontWeight: 800,
                  fontSize: 46,
                  letterSpacing: "-0.03em",
                  color: TINTA,
                }}
              >
                {persona.nombre}
              </span>
              <span style={{ fontWeight: 600, fontSize: 30, color: INK_4 }}>{persona.rol}</span>
            </div>
          </div>
        ))}
      </div>

      <Aire />
      <div
        style={{
          display: "flex",
          marginBottom: 30,
          maxWidth: 820,
          fontWeight: 600,
          fontSize: 32,
          lineHeight: 1.38,
          color: INK_4,
        }}
      >
        {`Cuando nos escribís, te contesta uno de los dos. ${SITE.email}`}
      </div>
      <Firma tinta={TINTA} />
    </Lienzo>
  );
}

/* --------------------------------------------------------------------------
   Un servicio, con ejemplo

   La pieza que explica: qué es, un caso concreto y qué incluye. No es de las
   que frenan el scroll —para eso están las otras—, es de las que contestan
   «¿y esto qué me resuelve a mí?» cuando alguien ya se detuvo.
   -------------------------------------------------------------------------- */

function Servicio({ indice }: { indice: number }) {
  const { titulo, ejemplo, incluye } = SERVICIOS_DETALLE[indice];

  return (
    <Lienzo fondo={PAPEL}>
      <Rotulo texto="Servicio" color={TERRA} />
      <Titular texto={titulo} color={TINTA} cuerpo={108} />

      {/* El ejemplo va sobre hueso y con la curva de la casa: es lo que
          agrupa. El resto de la pieza queda sobre papel. */}
      <div
        style={{
          display: "flex",
          marginTop: 52,
          padding: "44px 46px",
          borderRadius: 24,
          background: HUESO,
        }}
      >
        <span
          style={{
            display: "flex",
            flexWrap: "wrap",
            fontFamily: "Display",
            fontWeight: 800,
            fontSize: 52,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            color: TINTA,
          }}
        >
          {ejemplo}
        </span>
      </div>

      <Aire />

      <div style={{ display: "flex", flexDirection: "column", marginBottom: 40 }}>
        <div
          style={{
            display: "flex",
            marginBottom: 20,
            fontWeight: 700,
            fontSize: 21,
            letterSpacing: "0.12em",
            color: TERRA,
          }}
        >
          {UI.serviciosEntregables.toUpperCase()}
        </div>
        {incluye.map((cosa, i) => (
          <div
            key={cosa}
            style={{
              display: "flex",
              padding: "16px 0",
              borderTop: FILETE_TINTA,
              borderBottom: i === incluye.length - 1 ? FILETE_TINTA : "none",
            }}
          >
            <span style={{ fontWeight: 600, fontSize: 34, color: INK_4 }}>{cosa}</span>
          </div>
        ))}
        <div
          style={{
            display: "flex",
            marginTop: 30,
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

      <Firma tinta={TINTA} />
    </Lienzo>
  );
}

/* --------------------------------------------------------------------------
   El repartidor
   -------------------------------------------------------------------------- */

export function pieza(ficha: Pieza): ReactElement {
  switch (ficha.plantilla) {
    case "campo":
      return <Campo consulta={ficha.consulta} />;
    case "servicios-tinta":
      return <ServiciosTinta />;
    case "servicios-sangre":
      return <ServiciosSangre />;
    case "servicio":
      return <Servicio indice={ficha.indice} />;
    case "promesas":
      return <Promesas />;
    case "idea":
      return <Idea frase={ficha.frase} fondo={ficha.fondo} />;
    case "equipo":
      return <Equipo />;

    /* Las que rompen el molde. */
    case "dato":
      return (
        <Dato
          cifra={ficha.cifra}
          unidad={ficha.unidad}
          pie={ficha.pie}
          fondo={ficha.fondo}
        />
      );
    case "repeticion":
      return <Repeticion />;
    case "diagonal":
      return <Diagonal />;
    case "isotipo":
      return <Isotipo />;
    case "terminal":
      return <Terminal />;
    case "capas":
      return <Capas />;

    /* Formas y tramas. */
    case "trama":
      return <Trama />;
    case "barras":
      return <Barras />;
    case "silabas":
      return <Silabas />;
    case "circulo":
      return <Circulo />;
    case "franjas":
      return <Franjas />;
    case "modular":
      return <Modular />;
    case "pregunta":
      return <Pregunta />;
    case "tachado":
      return <Tachado />;
    case "rayas":
      return <Rayas />;

    /* De referencia concreta. */
    case "cartel":
      return <Cartel />;
    case "sustitucion":
      return <Sustitucion />;
    case "globo":
      return <Globo />;
    case "discos":
      return <Discos />;
    case "torre":
      return <Torre />;
    case "escala":
      return <Escala />;
    case "negativo":
      return <Negativo />;

    /* Las del oficio. */
    case "recibo":
      return <Recibo />;
    case "llaves":
      return <Llaves />;
    case "mitades":
      return <Mitades />;
    case "cambio-chico":
      return <CambioChico />;
    case "garantia":
      return <Garantia />;
    case "planilla":
      return <Planilla />;
    case "celular":
      return <Celular />;
    case "vuelta":
      return <Vuelta />;
    case "mapa":
      return <Mapa />;
    case "manometro":
      return <Manometro />;

    /* Las institucionales. */
    case "semicirculo":
      return <Semicirculo />;
    case "columnas":
      return <Columnas />;
    case "escalera":
      return <Escalera />;
    case "cuadrante":
      return <Cuadrante />;
    case "arcos":
      return <Arcos />;
    case "cruz":
      return <Cruz />;
    case "candado":
      return <Candado />;
    case "fichas":
      return <Fichas />;
    case "triangulo":
      return <Triangulo />;
    case "puntos":
      return <Puntos />;

    /* Los consejos. */
    case "pin":
      return <Pin />;
    case "sobre":
      return <Sobre />;
    case "circulos":
      return <Circulos />;
    case "diagrama":
      return <Diagrama />;
    case "luna":
      return <Luna />;
    case "embudo":
      return <Embudo />;
    case "copia":
      return <Copia />;
    case "reduccion":
      return <Reduccion />;
    case "muestras":
      return <Muestras />;
    case "eslabones":
      return <Eslabones />;

    /* Los productos. */
    case "cupo-vitrina":
      return <CupoVitrina />;
    case "cupo-detalle":
      return <CupoDetalle />;
    case "cupo-panel":
      return <CupoPanel />;
    case "cupo-ficha":
      return <CupoFicha />;
    case "cupo-carrusel":
      return <CupoCarrusel lamina={ficha.lamina} />;
  }
}
