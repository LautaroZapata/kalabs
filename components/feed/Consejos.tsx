import { BONE_DIM, BRASA, HUESO, INK_4, PAPEL, TINTA } from "@/lib/feed";
import { iso, ISO_RATIO } from "@/lib/marca";
import { Aire, Firma } from "@/components/feed/comunes";
import { Base, Plano, Texto, Titulo } from "@/components/feed/Institucional";

/* ==========================================================================
   Los consejos.

   Lo que el estudio sabe, regalado. Los servicios ya se dijeron en las
   institucionales; acá se habla del problema del cliente y de qué conviene
   tener en cuenta, aunque no nos contrate. Es lo que hace que alguien guarde
   la publicación y vuelva al perfil.

   Mismo registro formal y misma línea de formas planas. Ningún consejo cita
   cifras: son recomendaciones de oficio, no estadísticas.

   Antes de sumar uno, leer `docs/feed.md`: ahí está el registro de temas ya
   usados, para no repetir.
   ========================================================================== */

/** Un SVG plano como imagen: para las formas que no salen con cajas. */
function Dibujo({ svg, x = 0, y = 0, w = 1080, h = 1350 }: { svg: string; x?: number; y?: number; w?: number; h?: number }) {
  const src =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}">${svg}</svg>`);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt="" width={w} height={h} style={{ position: "absolute", left: x, top: y }} />
  );
}

/** El pie de todas: titular, bajada y firma, apoyados contra el margen de abajo. */
function Pie({
  renglones,
  texto,
  tinta,
  bajada,
  marca,
  cuerpo = 96,
}: {
  renglones: string[];
  texto: string;
  tinta: string;
  bajada: string;
  marca?: string;
  cuerpo?: number;
}) {
  return (
    /* Un contenedor y no un fragmento: Satori acomoda los hijos de un
       fragmento en fila, y el pie se subía entero a la primera línea. */
    <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
      <Aire />
      <div style={{ display: "flex", marginBottom: 30 }}>
        <Titulo renglones={renglones} color={tinta} cuerpo={cuerpo} />
      </div>
      <Texto texto={texto} color={bajada} ancho={800} />
      <Firma tinta={tinta} marca={marca} />
    </div>
  );
}

/* --------------------------------------------------------------------------
   El pin — web: el perfil de Google
   -------------------------------------------------------------------------- */

export function Pin() {
  return (
    <Base fondo={PAPEL}>
      {/* Las calles, en hueso, y el pin encima. */}
      <Plano x={0} y={250} w={1080} h={70} color={HUESO} />
      <Plano x={330} y={0} w={70} h={500} color={HUESO} />
      <Plano x={0} y={430} w={1080} h={40} color={HUESO} />
      <Dibujo
        svg={`<path d="M640 480 C 580 400 500 330 500 250 A 140 140 0 1 1 780 250 C 780 330 700 400 640 480 Z" fill="${BRASA}"/><circle cx="640" cy="250" r="54" fill="${PAPEL}"/>`}
      />
      <Pie
        renglones={["Su negocio en el", "mapa, con datos", "al día."]}
        texto="Complete su perfil de empresa en Google: horario, teléfono, fotos y dirección. Es lo primero que ve quien lo busca."
        tinta={TINTA}
        bajada={INK_4}
      />
    </Base>
  );
}

/* --------------------------------------------------------------------------
   El sobre — web: el correo con dominio propio
   -------------------------------------------------------------------------- */

export function Sobre() {
  return (
    <Base fondo={BRASA}>
      <Dibujo
        svg={`<rect x="140" y="140" width="800" height="520" fill="${TINTA}"/><polygon points="140,140 940,140 540,440" fill="${PAPEL}"/><polygon points="140,660 450,370 540,440 630,370 940,660" fill="${INK_4}"/>`}
      />
      <Pie
        renglones={["Un correo con su", "dominio genera", "confianza."]}
        texto="contacto@suempresa.com.uy dice más que una casilla gratuita. Cuesta poco y se configura una sola vez."
        tinta={TINTA}
        bajada={TINTA}
        marca={TINTA}
      />
    </Base>
  );
}

/* --------------------------------------------------------------------------
   Los círculos — web: una acción principal por pantalla
   -------------------------------------------------------------------------- */

export function Circulos() {
  const d = 200;
  const paso = 350;

  return (
    <Base fondo={TINTA}>
      {Array.from({ length: 9 }).map((_, i) => {
        const x = 90 + (i % 3) * paso;
        const y = 104 + Math.floor(i / 3) * 230;
        const activo = i === 5;
        return (
          <div
            key={i}
            style={{
              display: "flex",
              position: "absolute",
              left: x,
              top: y,
              width: d,
              height: d,
              borderRadius: 9999,
              background: activo ? BRASA : "transparent",
              border: activo ? "none" : `4px solid ${INK_4}`,
            }}
          />
        );
      })}
      <Pie
        renglones={["Una acción", "principal por", "pantalla."]}
        texto="Si todo pide atención, nada la recibe. Defina qué debe hacer el visitante y destáquelo."
        tinta={PAPEL}
        bajada={BONE_DIM}
      />
    </Base>
  );
}

/* --------------------------------------------------------------------------
   El diagrama — automatizaciones: escribir el proceso primero
   -------------------------------------------------------------------------- */

export function Diagrama() {
  const pasos = [
    { x: 90, y: 150, color: TINTA },
    { x: 420, y: 150, color: TINTA },
    { x: 420, y: 450, color: TINTA },
    { x: 750, y: 450, color: BRASA },
  ];

  return (
    <Base fondo={HUESO}>
      {/* Las uniones van primero para quedar debajo de las cajas. */}
      <Plano x={330} y={236} w={90} h={8} color={TINTA} />
      <Plano x={536} y={330} w={8} h={120} color={TINTA} />
      <Plano x={660} y={536} w={90} h={8} color={TINTA} />
      {pasos.map((p, i) => (
        <Plano key={i} x={p.x} y={p.y} w={240} h={180} color={p.color} radio={i === 3 ? 9999 : 0} />
      ))}
      <Pie
        renglones={["Antes de", "automatizar,", "escriba el proceso."]}
        texto="Paso por paso y con sus excepciones. Si una tarea no se puede describir, todavía no se puede automatizar."
        tinta={TINTA}
        bajada={INK_4}
      />
    </Base>
  );
}

/* --------------------------------------------------------------------------
   La luna — automatizaciones: respuestas fuera de horario
   -------------------------------------------------------------------------- */

export function Luna() {
  return (
    <Base fondo={TINTA}>
      <Plano x={250} y={60} w={620} h={620} color={BRASA} radio={9999} />
      <Plano x={440} y={-10} w={620} h={620} color={TINTA} radio={9999} />
      <Pie
        renglones={["Responda también", "fuera de horario."]}
        texto="Un mensaje automático avisa cuándo va a contestar. El cliente sabe que su consulta llegó y no busca a otro."
        tinta={PAPEL}
        bajada={BONE_DIM}
        cuerpo={100}
      />
    </Base>
  );
}

/* --------------------------------------------------------------------------
   El embudo — sistemas: una sola fuente para cada dato
   -------------------------------------------------------------------------- */

export function Embudo() {
  return (
    <Base fondo={PAPEL}>
      <Dibujo
        svg={`<rect x="0" y="150" width="420" height="80" fill="${INK_4}"/><rect x="0" y="330" width="420" height="80" fill="${INK_4}"/><rect x="0" y="510" width="420" height="80" fill="${INK_4}"/><polygon points="420,150 660,300 660,440 420,590" fill="${HUESO}"/><rect x="660" y="300" width="420" height="140" fill="${BRASA}"/>`}
      />
      <Pie
        renglones={["Un solo lugar", "para cada dato."]}
        texto="Si el stock figura en tres planillas, ninguna es confiable. Centralice la información antes de sumar herramientas."
        tinta={TINTA}
        bajada={INK_4}
        cuerpo={104}
      />
    </Base>
  );
}

/* --------------------------------------------------------------------------
   La copia — sistemas: respaldos
   -------------------------------------------------------------------------- */

export function Copia() {
  return (
    <Base fondo={BRASA}>
      <div
        style={{
          display: "flex",
          position: "absolute",
          left: 330,
          top: 180,
          width: 520,
          height: 520,
          border: `6px dashed ${TINTA}`,
        }}
      />
      <Plano x={200} y={80} w={520} h={520} color={TINTA} />
      <Pie
        renglones={["Toda información", "importante", "necesita una copia."]}
        texto="Respaldos automáticos y fuera de su equipo. Una computadora rota no debería costarle los datos del negocio."
        tinta={TINTA}
        bajada={TINTA}
        marca={TINTA}
        cuerpo={92}
      />
    </Base>
  );
}

/* --------------------------------------------------------------------------
   La escala — identidad: el logotipo en tamaño chico

   El isotipo del estudio a tres tamaños. Es el ejemplo en carne propia.
   -------------------------------------------------------------------------- */

export function Reduccion() {
  const tamanos = [
    { w: 460, color: TINTA },
    { w: 230, color: BRASA },
    { w: 90, color: TINTA },
  ];

  return (
    <Base fondo={PAPEL}>
      <div style={{ display: "flex", alignItems: "flex-end", height: 480 }}>
        {tamanos.map((t) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={t.w} src={iso(t.color)} alt="" width={t.w} height={Math.round(t.w / ISO_RATIO)} style={{ marginRight: 70 }} />
        ))}
      </div>
      <Pie
        renglones={["Un buen logotipo", "se reconoce", "también en chico."]}
        texto="Pruébelo como foto de perfil, en un sello y en blanco y negro antes de aprobarlo."
        tinta={TINTA}
        bajada={INK_4}
      />
    </Base>
  );
}

/* --------------------------------------------------------------------------
   Las muestras — identidad: una paleta acotada
   -------------------------------------------------------------------------- */

export function Muestras() {
  return (
    <Base fondo={HUESO}>
      <div style={{ display: "flex", height: 640, width: 900 }}>
        <div style={{ display: "flex", width: 560, background: TINTA }} />
        <div style={{ display: "flex", width: 240, background: PAPEL }} />
        <div style={{ display: "flex", width: 100, background: BRASA }} />
      </div>
      <Pie
        renglones={["Pocos colores,", "usados siempre", "igual."]}
        texto="Uno principal, uno de apoyo y uno para destacar. La constancia es lo que construye reconocimiento."
        tinta={TINTA}
        bajada={INK_4}
      />
    </Base>
  );
}

/* --------------------------------------------------------------------------
   Los eslabones — seguridad: verificación en dos pasos
   -------------------------------------------------------------------------- */

export function Eslabones() {
  const anillo = (x: number, color: string) => (
    <div
      style={{
        display: "flex",
        position: "absolute",
        left: x,
        top: 140,
        width: 440,
        height: 560,
        borderRadius: 220,
        border: `70px solid ${color}`,
      }}
    />
  );

  return (
    <Base fondo={TINTA}>
      {anillo(160, PAPEL)}
      {anillo(480, BRASA)}
      <Pie
        renglones={["Active la", "verificación en", "dos pasos."]}
        texto="En el correo, las redes y el banco. Aunque alguien obtenga su contraseña, igual necesitará su teléfono."
        tinta={PAPEL}
        bajada={BONE_DIM}
      />
    </Base>
  );
}
