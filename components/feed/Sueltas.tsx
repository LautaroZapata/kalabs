import { SITE } from "@/lib/content";
import { BRASA, HUESO, INK_4, MARGEN, PAPEL, TERRA, TINTA } from "@/lib/feed";
import { iso } from "@/lib/marca";
import { Aire, Firma, Lienzo, Rotulo } from "@/components/feed/comunes";

/* ==========================================================================
   Las piezas que rompen el molde.

   El sistema del sitio existe para que la página se sostenga sola durante
   años. El feed juega otro partido: compite contra mil posts y gana lo que
   frena el pulgar. Acá se rompe a propósito —rotación, monoespaciada,
   repetición, el isotipo encuadrado hasta la abstracción— y se rompe una
   regla por pieza, no todas juntas. Una pieza que rompe todo no es audaz:
   es un accidente.

   Lo que NO se rompe nunca: la paleta y las dos familias tipográficas. Si se
   caen esas dos cosas, deja de ser Kalabs y pasa a ser cualquiera.
   ========================================================================== */

/* --------------------------------------------------------------------------
   El dato — un número gigante, cortado

   Se rompe: la escala. El sistema pide «una sola cosa grande»; acá esa cosa
   ocupa media pieza y se sale de la caja tipográfica.
   -------------------------------------------------------------------------- */

export function Dato({
  cifra,
  unidad,
  pie,
  fondo,
}: {
  cifra: string;
  unidad: string;
  pie: string;
  fondo: "brasa" | "tinta";
}) {
  const sobreBrasa = fondo === "brasa";
  const texto = sobreBrasa ? TINTA : PAPEL;
  const numero = sobreBrasa ? TINTA : BRASA;

  return (
    <Lienzo fondo={sobreBrasa ? BRASA : TINTA}>
      <Rotulo texto={SITE.tagline} color={sobreBrasa ? TINTA : BRASA} />
      <Aire />

      <div
        style={{
          display: "flex",
          /* El margen negativo saca el aire propio de la caja de la
             tipografía: a este cuerpo son casi setenta píxeles. */
          marginLeft: -68,
          fontFamily: "Display",
          fontWeight: 800,
          /* Dos caracteres a este cuerpo cruzan el lienzo entero. Es el punto:
             el número no ilustra el dato, es el dato. */
          fontSize: 860,
          lineHeight: 0.78,
          letterSpacing: "-0.06em",
          color: numero,
        }}
      >
        {cifra}
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 12,
          fontFamily: "Display",
          fontWeight: 800,
          fontSize: 96,
          letterSpacing: "-0.04em",
          color: texto,
        }}
      >
        {unidad}
      </div>

      <Aire />
      <div
        style={{
          display: "flex",
          marginBottom: 34,
          maxWidth: 820,
          fontWeight: 600,
          fontSize: 32,
          lineHeight: 1.4,
          color: sobreBrasa ? TINTA : HUESO,
        }}
      >
        {pie}
      </div>
      <Firma tinta={texto} marca={sobreBrasa ? TINTA : BRASA} />
    </Lienzo>
  );
}

/* --------------------------------------------------------------------------
   La repetición — la misma palabra hasta el hartazgo

   Se rompe: el aire. El sistema pide márgenes generosos; acá la tipografía
   ocupa el lienzo entero y sale por los cuatro costados. El sentido está en
   la repetición: es lo que hacés todas las semanas.
   -------------------------------------------------------------------------- */

export function Repeticion() {
  /* Siete entran enteras entre el borde de arriba y la barra de abajo: a 141
     px de paso son 1031, y la barra arranca en 1145. Antes eran nueve a mayor
     cuerpo: la palabra se cortaba contra el margen derecho y las filas de los
     extremos quedaban rebanadas. La repetición ya dice lo que tiene que
     decir; no hace falta además mutilarla. */
  const veces = 7;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        paddingTop: 44,
        background: PAPEL,
        fontFamily: "Cuerpo",
        overflow: "hidden",
      }}
    >
      {Array.from({ length: veces }, (_, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            marginLeft: -22,
            fontFamily: "Display",
            fontWeight: 800,
            /* Calibrado para que la palabra toque los dos bordes: la A apoya
               en el izquierdo y la R cierra contra el derecho. A 172 sobraban
               setenta píxeles a la derecha y la fila se veía floja. */
            fontSize: 184,
            lineHeight: 0.82,
            letterSpacing: "-0.05em",
            whiteSpace: "nowrap",
            /* Una sola en brasa: la que sí se automatizó. */
            color: i === 3 ? BRASA : TINTA,
          }}
        >
          AUTOMATIZAR
        </div>
      ))}

      {/* La barra de abajo es el único respiro: sale a sangre, sin curva. */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          padding: `44px ${MARGEN}px 48px`,
          background: TINTA,
        }}
      >
        <div style={{ display: "flex", fontWeight: 700, fontSize: 40, color: PAPEL }}>
          Una vez. Después lo hace solo.
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 10,
            fontFamily: "Display",
            fontWeight: 800,
            fontSize: 48,
            letterSpacing: "-0.025em",
            color: BRASA,
          }}
        >
          {SITE.email}
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   La diagonal — el plano de brasa cruzado

   Se rompe: la ortogonalidad. Nada en el sitio está rotado; acá la banda
   cruza el lienzo en diagonal y el texto se apoya encima.
   -------------------------------------------------------------------------- */

export function Diagonal() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        background: TINTA,
        padding: `104px ${MARGEN}px ${MARGEN}px`,
        fontFamily: "Cuerpo",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          position: "absolute",
          left: -240,
          top: 470,
          width: 1600,
          height: 300,
          background: BRASA,
          transform: "rotate(-15deg)",
        }}
      />

      <Rotulo texto="Si no te encuentran, no existís" color={BRASA} />
      <Aire />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          maxWidth: 940,
          fontFamily: "Display",
          fontWeight: 800,
          fontSize: 132,
          lineHeight: 0.98,
          letterSpacing: "-0.04em",
          color: PAPEL,
        }}
      >
        Tu competencia ya aparece en Google.
      </div>
      <Aire />
      <div
        style={{
          display: "flex",
          marginBottom: 34,
          maxWidth: 780,
          fontWeight: 600,
          fontSize: 32,
          lineHeight: 1.4,
          color: HUESO,
        }}
      >
        {`Una web rápida, medida y hecha para que te encuentren. ${SITE.email}`}
      </div>
      <Firma tinta={PAPEL} />
    </div>
  );
}

/* --------------------------------------------------------------------------
   El isotipo de cerca — la marca hasta la abstracción

   Se rompe: el trato del isotipo. La regla dice que no se encuadre ni se
   recorte a gusto; acá se lo amplía hasta que deja de leerse como una K y
   pasa a ser una forma. Funciona sólo porque el resto del feed sí lo muestra
   entero: si esta pieza fuera la única, no habría marca que reconocer.
   -------------------------------------------------------------------------- */

export function Isotipo() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        position: "relative",
        background: TINTA,
        padding: `104px ${MARGEN}px ${MARGEN}px`,
        fontFamily: "Cuerpo",
        overflow: "hidden",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={iso(BRASA)}
        alt=""
        width={2400}
        height={2340}
        style={{ position: "absolute", left: -820, top: -560 }}
      />

      <div
        style={{
          display: "flex",
          marginBottom: 16,
          fontWeight: 700,
          fontSize: 21,
          letterSpacing: "0.12em",
          color: PAPEL,
        }}
      >
        {`${SITE.nombre.toUpperCase()} · ${SITE.tagline.toUpperCase()} · ${SITE.ciudad.toUpperCase()}`}
      </div>
      <div
        style={{
          display: "flex",
          fontFamily: "Display",
          fontWeight: 800,
          fontSize: 62,
          letterSpacing: "-0.03em",
          color: PAPEL,
        }}
      >
        {SITE.email}
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   La consola — lo que hace el estudio, en su propio idioma

   Se rompe: la prohibición de la monoespaciada. Acá no es tipografía de
   marca, es el dibujo de una terminal: el mismo papel que cumple una captura
   de pantalla en las fichas de proyecto.
   -------------------------------------------------------------------------- */

const CONSOLA: { signo: string; texto: string; color: "brasa" | "papel" | "hueso" }[] = [
  { signo: "$", texto: "pedidos --escuchar whatsapp", color: "brasa" },
  { signo: ">", texto: '"2 grandes de muzza"', color: "hueso" },
  { signo: ">", texto: '"1 sin aceitunas"', color: "hueso" },
  { signo: ">", texto: '"para las 21:30"', color: "hueso" },
  /* El signo va en ASCII a propósito: el subset latino de JetBrains Mono no
     trae el ✓ y Satori lo dibuja como un cuadrado vacío. */
  { signo: "+", texto: "47 pedidos hoy · 0 anotados en papel", color: "papel" },
];

export function Terminal() {
  const tinte = { brasa: BRASA, papel: PAPEL, hueso: "#8d867a" };

  return (
    <Lienzo fondo={TINTA}>
      <Rotulo texto="Automatizaciones" color={BRASA} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: 44,
          padding: "40px 42px 44px",
          borderRadius: 12,
          background: "#161a1c",
          border: "1px solid rgba(247, 242, 231, 0.14)",
        }}
      >
        {CONSOLA.map((linea) => (
          <div
            key={linea.texto}
            style={{
              display: "flex",
              gap: 18,
              marginTop: 14,
              fontFamily: "Mono",
              fontWeight: 700,
              fontSize: 31,
              color: tinte[linea.color],
            }}
          >
            <span style={{ color: BRASA }}>{linea.signo}</span>
            <span>{linea.texto}</span>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          marginTop: 62,
          maxWidth: 900,
          fontFamily: "Display",
          fontWeight: 800,
          fontSize: 104,
          lineHeight: 1,
          letterSpacing: "-0.035em",
          color: PAPEL,
        }}
      >
        Lo que hacés a mano, lo hace un bot.
      </div>

      <Aire />
      <div
        style={{
          display: "flex",
          marginBottom: 34,
          fontFamily: "Display",
          fontWeight: 800,
          fontSize: 48,
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
   Las capas — la misma palabra tres veces, encimada

   Se rompe: la legibilidad. Las tres capas se pisan y la de abajo se lee a
   medias. Es a propósito: lo que se lee entero es la última.
   -------------------------------------------------------------------------- */

export function Capas() {
  const capas = [
    { texto: "RESOLVER", color: HUESO },
    { texto: "RESOLVER", color: BRASA },
    { texto: "RESOLVER", color: TINTA },
  ];

  return (
    <Lienzo fondo={PAPEL}>
      <Rotulo texto="Contanos qué hay que" color={TERRA} />
      <Aire />

      <div style={{ display: "flex", flexDirection: "column" }}>
        {capas.map((capa, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              marginLeft: -22 + i * 26,
              /* Cada capa se monta sobre la anterior: el sistema separa con un
                 filete, acá directamente se pisan. */
              marginTop: i === 0 ? 0 : -92,
              fontFamily: "Display",
              fontWeight: 800,
              fontSize: 196,
              lineHeight: 0.9,
              letterSpacing: "-0.05em",
              whiteSpace: "nowrap",
              color: capa.color,
            }}
          >
            {capa.texto}
          </div>
        ))}
      </div>

      <Aire />
      <div
        style={{
          display: "flex",
          marginBottom: 34,
          maxWidth: 800,
          fontWeight: 600,
          fontSize: 32,
          lineHeight: 1.4,
          color: INK_4,
        }}
      >
        {`Webs, automatizaciones y sistemas a medida. La primera consulta no tiene costo. ${SITE.email}`}
      </div>
      <Firma tinta={TINTA} />
    </Lienzo>
  );
}
