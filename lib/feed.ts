import { SERVICIOS, UI } from "@/lib/content";

/* ==========================================================================
   El feed de Instagram.

   Las piezas se componen con Satori, fuera del documento: los tokens de
   `globals.css` no llegan hasta acá y se repiten a mano. Si cambia un color en
   el sitio, cambia también en esta lista.
   ========================================================================== */

export const PAPEL = "#f7f2e7";
export const HUESO = "#efe7d6";
export const TINTA = "#0f1214";
export const INK_4 = "#262c2f";
export const BONE_DIM = "#b9b2a4";
export const BRASA = "#ff6b1a";
export const TERRA = "#9c3f26";

/** El filete: lo mismo que `--linea`, pero sobre papel y sobre tinta. */
export const FILETE_TINTA = "1px solid rgba(15, 18, 20, 0.18)";
export const FILETE_PAPEL = "1px solid rgba(247, 242, 231, 0.2)";

/** El formato por defecto del feed: 4:5 vertical. */
export const LIENZO = { width: 1080, height: 1350 };

/** El margen de la casa dentro de la pieza. */
export const MARGEN = 90;

/**
 * Instagram recorta el 4:5 a cuadrado en la grilla del perfil: se come 135 px
 * arriba y 135 abajo. Lo que tiene que leerse en la miniatura vive entre esas
 * dos líneas. El pie de marca puede caer afuera —que la firma se corte en la
 * grilla no rompe nada—, el titular y el llamado no.
 */
export const RECORTE = 135;

/**
 * Los cinco servicios de las piezas.
 *
 * El sitio publica tres —`SERVICIOS`, en content.ts— porque identidad y diseño
 * todavía no tienen sección propia en la página. En el feed van los cinco: es
 * donde se capta y donde el trabajo de diseño tiene que aparecer. Cuando
 * entren al sitio, este arreglo se borra y se lee de `SERVICIOS` directamente.
 */
export const SERVICIOS_FEED: string[] = [
  ...SERVICIOS.map((s) => s.titulo),
  "Identidad de marca",
  "Diseño creativo",
];

/** Las tres promesas. La cuarta entrada del banner es la ciudad, no una promesa. */
export const PROMESAS = UI.banner.slice(0, 3);

/* --------------------------------------------------------------------------
   El catálogo
   -------------------------------------------------------------------------- */

/**
 * Una frase partida en tres para poder marcar el medio en color, igual que
 * `UI.portadaPregunta` y `UI.contactoTitulo`. Se parte acá y no con un
 * `split()` en el render porque Satori arma cada tramo como un ítem de flex y
 * los espacios de los bordes se pierden.
 */
export type Frase = [antes: string, marcada: string, despues: string];

export type Pieza =
  | { slug: string; titulo: string; plantilla: "campo"; consulta: string }
  | { slug: string; titulo: string; plantilla: "idea"; frase: Frase; fondo: "papel" | "brasa" }
  | {
      slug: string;
      titulo: string;
      plantilla: "dato";
      cifra: string;
      unidad: string;
      pie: string;
      fondo: "brasa" | "tinta";
    }
  | {
      slug: string;
      titulo: string;
      plantilla: "servicios-tinta" | "servicios-sangre" | "promesas" | "equipo";
    }
  | { slug: string; titulo: string; plantilla: "servicio"; indice: number }
  | { slug: string; titulo: string; plantilla: "cupo-vitrina" | "cupo-detalle" | "cupo-panel" | "cupo-ficha" }
  | { slug: string; titulo: string; plantilla: "cupo-carrusel"; lamina: number }
  | {
      slug: string;
      titulo: string;
      plantilla: "repeticion" | "diagonal" | "isotipo" | "terminal" | "capas";
    }
  | {
      slug: string;
      titulo: string;
      plantilla:
        | "trama"
        | "barras"
        | "silabas"
        | "circulo"
        | "franjas"
        | "modular"
        | "pregunta"
        | "tachado"
        | "rayas";
    }
  | {
      slug: string;
      titulo: string;
      plantilla:
        | "cartel"
        | "sustitucion"
        | "globo"
        | "discos"
        | "torre"
        | "escala"
        | "negativo";
    }
  | {
      slug: string;
      titulo: string;
      plantilla:
        | "recibo"
        | "llaves"
        | "mitades"
        | "cambio-chico"
        | "garantia"
        | "planilla"
        | "celular"
        | "vuelta"
        | "mapa"
        | "manometro";
    }
  | {
      slug: string;
      titulo: string;
      plantilla:
        | "semicirculo"
        | "columnas"
        | "escalera"
        | "cuadrante"
        | "arcos"
        | "cruz"
        | "candado"
        | "fichas"
        | "triangulo"
        | "puntos";
    }
  | {
      slug: string;
      titulo: string;
      plantilla:
        | "pin"
        | "sobre"
        | "circulos"
        | "diagrama"
        | "luna"
        | "embudo"
        | "copia"
        | "reduccion"
        | "muestras"
        | "eslabones";
    };

/**
 * Cada servicio con un ejemplo concreto y lo que incluye.
 *
 * Los tres primeros salen de `SERVICIOS` —cuerpo y entregables ya estaban
 * escritos—; los dos últimos se escriben acá hasta que entren al sitio.
 *
 * Ojo con los ejemplos: los de Oleohidráulica Cáceres y ViaGrúa son trabajos
 * hechos y se pueden nombrar. Los otros tres están redactados en genérico a
 * propósito, porque todavía no hay un caso propio que mostrar. Cuando lo haya,
 * se cambian por el nombre del cliente.
 */
export const SERVICIOS_DETALLE: {
  titulo: string;
  ejemplo: string;
  incluye: string[];
}[] = [
  {
    titulo: SERVICIOS[0].titulo,
    ejemplo:
      "Oleohidráulica Cáceres: qué fabrican, qué reparan y para quién trabajan, en una sola página.",
    incluye: SERVICIOS[0].entregables,
  },
  {
    titulo: SERVICIOS[1].titulo,
    ejemplo: "Un bot de WhatsApp que toma el pedido y lo deja anotado solo.",
    incluye: SERVICIOS[1].entregables,
  },
  {
    titulo: SERVICIOS[2].titulo,
    ejemplo: "ViaGrúa: quién está libre y quién está en camino, sin un solo llamado.",
    incluye: SERVICIOS[2].entregables,
  },
  {
    titulo: "Identidad de marca",
    ejemplo: "El logo, los colores y la tipografía, para que todo se vea de la misma familia.",
    incluye: ["Logo e isotipo", "Paleta y tipografía", "Manual de uso", "Papelería"],
  },
  {
    titulo: "Diseño creativo",
    ejemplo: "Las piezas de todos los meses, con la misma cara y sin improvisar cada vez.",
    incluye: ["Piezas para redes", "Catálogos", "Packaging", "Cartelería"],
  },
];

export const FEED: Pieza[] = [
  /* La serie del campo: un solo diseño, una consulta distinta en cada pieza.
     Son las de captación —llevan el problema del cliente escrito con sus
     palabras y el llamado abajo—. */
  {
    slug: "campo-whatsapp",
    titulo: "Consulta · bot de WhatsApp",
    plantilla: "campo",
    consulta: "Un bot de WhatsApp para pedidos.",
  },
  {
    slug: "campo-turnos",
    titulo: "Consulta · turnos del taller",
    plantilla: "campo",
    consulta: "Un sistema de turnos para el taller.",
  },
  {
    slug: "campo-google",
    titulo: "Consulta · aparecer en Google",
    plantilla: "campo",
    consulta: "Una web que aparezca en Google.",
  },
  {
    slug: "campo-tienda",
    titulo: "Consulta · vender online",
    plantilla: "campo",
    consulta: "Una tienda para vender online.",
  },
  {
    slug: "campo-marca",
    titulo: "Consulta · identidad de marca",
    plantilla: "campo",
    consulta: "Una identidad para mi marca.",
  },
  {
    slug: "campo-reporte",
    titulo: "Consulta · reporte semanal",
    plantilla: "campo",
    consulta: "Automatizar un reporte semanal.",
  },

  /* Los cinco servicios, en dos registros distintos. */
  { slug: "servicios-tinta", titulo: "Servicios · sobre tinta", plantilla: "servicios-tinta" },
  { slug: "servicios-sangre", titulo: "Servicios · a sangre", plantilla: "servicios-sangre" },

  /* Las tres promesas: el único plano pleno de brasa de la serie. */
  { slug: "promesas", titulo: "Las tres promesas", plantilla: "promesas" },

  /* Una idea por pieza. Se alternan papel y brasa para que la grilla respire. */
  {
    slug: "idea-repite",
    titulo: "Idea · lo que se repite",
    plantilla: "idea",
    /* El punto va pegado a la palabra marcada: Satori arma cada tramo como un
       ítem de flex, y un punto suelto se iba solo a la línea de abajo. */
    frase: ["Si se repite todas las semanas, ", "no lo hagas a mano.", ""],
    fondo: "papel",
  },
  {
    slug: "idea-funcion",
    titulo: "Idea · una función bien resuelta",
    plantilla: "idea",
    frase: ["Una función ", "bien resuelta", " antes que un sistema entero que nadie abre."],
    fondo: "brasa",
  },
  {
    slug: "idea-folleto",
    titulo: "Idea · el folleto en el cajón",
    plantilla: "idea",
    frase: ["Una web que no aparece en Google es ", "un folleto en un cajón.", ""],
    fondo: "papel",
  },

  /* El equipo, con iniciales y sin fotos de perfil: dos fotos recortadas en
     círculo es lo que hace que un estudio parezca plantilla de agencia. */
  { slug: "equipo", titulo: "El equipo", plantilla: "equipo" },

  /* Una pieza por servicio, con un ejemplo concreto y lo que incluye. Son las
     que explican; las de arriba son las que frenan el scroll. */
  ...SERVICIOS_DETALLE.map((s, i) => ({
    slug: `servicio-${i + 1}`,
    titulo: `Servicio · ${s.titulo}`,
    plantilla: "servicio" as const,
    indice: i,
  })),

  /* --------------------------------------------------------------------
     Las que rompen el molde.

     Acá se sale del sistema a propósito: hay rotación, hay tipografía
     monoespaciada, hay repetición y hay el isotipo deformado por el encuadre.
     Nada de esto entra en el sitio —el sitio se sostiene con las reglas—, pero
     el feed compite contra otros mil posts y ahí gana lo que frena el pulgar.
     -------------------------------------------------------------------- */
  {
    slug: "dato-24",
    titulo: "Dato · 24 horas",
    plantilla: "dato",
    cifra: "24",
    unidad: "horas",
    pie: "Es lo que tardamos en contestarte. No es una promesa de folleto: es el plazo.",
    fondo: "brasa",
  },
  {
    slug: "dato-cero",
    titulo: "Dato · la primera consulta",
    plantilla: "dato",
    cifra: "$0",
    unidad: "la primera consulta",
    pie: "Contanos el problema. Si no amerita un desarrollo, te lo decimos y listo.",
    fondo: "tinta",
  },
  { slug: "repeticion", titulo: "Suelta · la repetición", plantilla: "repeticion" },
  { slug: "diagonal", titulo: "Suelta · la diagonal", plantilla: "diagonal" },
  { slug: "isotipo", titulo: "Suelta · el isotipo de cerca", plantilla: "isotipo" },
  { slug: "terminal", titulo: "Suelta · la consola", plantilla: "terminal" },
  { slug: "capas", titulo: "Suelta · las capas", plantilla: "capas" },

  /* --------------------------------------------------------------------
     Formas y tramas.

     Acá el dibujo no es tipografía: es una grilla, una barra, un círculo o
     un campo de líneas. La tipografía sigue estando, pero deja de ser el
     único recurso. Son las que mejor funcionan mezcladas entre piezas de
     texto: la grilla del perfil necesita algo que no sea una letra.
     -------------------------------------------------------------------- */
  { slug: "trama", titulo: "Forma · la trama", plantilla: "trama" },
  { slug: "barras", titulo: "Forma · las barras", plantilla: "barras" },
  { slug: "silabas", titulo: "Forma · las sílabas", plantilla: "silabas" },
  { slug: "circulo", titulo: "Forma · el círculo", plantilla: "circulo" },
  { slug: "franjas", titulo: "Forma · las franjas", plantilla: "franjas" },
  { slug: "modular", titulo: "Forma · la grilla modular", plantilla: "modular" },
  { slug: "pregunta", titulo: "Forma · el signo", plantilla: "pregunta" },
  { slug: "tachado", titulo: "Forma · el tachado", plantilla: "tachado" },
  { slug: "rayas", titulo: "Forma · el campo de líneas", plantilla: "rayas" },

  /* --------------------------------------------------------------------
     De referencia concreta.

     Cada una roba el mecanismo de un estudio que se puede ir a mirar. El
     de dónde sale está anotado arriba de cada componente en
     `components/feed/Referencias.tsx`.
     -------------------------------------------------------------------- */
  { slug: "cartel", titulo: "Ref · el cartel apilado (Paula Scher)", plantilla: "cartel" },
  { slug: "sustitucion", titulo: "Ref · la sustitución (&Walsh)", plantilla: "sustitucion" },
  { slug: "globo", titulo: "Ref · el globo (Hey Studio)", plantilla: "globo" },
  { slug: "discos", titulo: "Ref · los discos (Studio Feixen)", plantilla: "discos" },
  { slug: "torre", titulo: "Ref · la torre (Studio Dumbar)", plantilla: "torre" },
  { slug: "escala", titulo: "Ref · la escala (Ragged Edge)", plantilla: "escala" },
  { slug: "negativo", titulo: "Ref · el negativo (Wolff Olins)", plantilla: "negativo" },

  /* --------------------------------------------------------------------
     Las del oficio.

     Cómo se trabaja —las condiciones de `docs/comercial/contrato.html`— y
     dos obras que se pueden ir a ver. Ninguna lleva rótulo sobre el título.
     Viven en `components/feed/Oficio.tsx`.
     -------------------------------------------------------------------- */
  { slug: "recibo", titulo: "Oficio · el ticket (presupuesto cerrado)", plantilla: "recibo" },
  { slug: "llaves", titulo: "Oficio · la llave (todo queda tuyo)", plantilla: "llaves" },
  { slug: "mitades", titulo: "Oficio · las mitades (forma de pago)", plantilla: "mitades" },
  { slug: "cambio-chico", titulo: "Oficio · qué es un cambio chico", plantilla: "cambio-chico" },
  { slug: "garantia", titulo: "Oficio · el calendario (garantía)", plantilla: "garantia" },
  { slug: "planilla", titulo: "Oficio · la planilla (automatizaciones)", plantilla: "planilla" },
  { slug: "celular", titulo: "Oficio · el celular (desarrollo web)", plantilla: "celular" },
  { slug: "vuelta", titulo: "Oficio · la vuelta (turnos)", plantilla: "vuelta" },
  { slug: "mapa", titulo: "Oficio · el mapa (ViaGrúa)", plantilla: "mapa" },
  { slug: "manometro", titulo: "Oficio · el manómetro (Oleo Cáceres)", plantilla: "manometro" },

  /* --------------------------------------------------------------------
     Las institucionales.

     La línea de las formas con el texto en registro formal: de usted, sin
     voseo. Viven en `components/feed/Institucional.tsx`.
     -------------------------------------------------------------------- */
  { slug: "semicirculo", titulo: "Inst · el semicírculo (el estudio)", plantilla: "semicirculo" },
  { slug: "columnas", titulo: "Inst · las columnas (tres servicios)", plantilla: "columnas" },
  { slug: "escalera", titulo: "Inst · la escalera (el proceso)", plantilla: "escalera" },
  { slug: "cuadrante", titulo: "Inst · el cuadrante (presupuesto cerrado)", plantilla: "cuadrante" },
  { slug: "arcos", titulo: "Inst · los arcos (identidad de marca)", plantilla: "arcos" },
  { slug: "cruz", titulo: "Inst · la cruz (integraciones)", plantilla: "cruz" },
  { slug: "candado", titulo: "Inst · el candado (propiedad)", plantilla: "candado" },
  { slug: "fichas", titulo: "Inst · las fichas (sistemas a medida)", plantilla: "fichas" },
  { slug: "triangulo", titulo: "Inst · el triángulo (primera consulta)", plantilla: "triangulo" },
  { slug: "puntos", titulo: "Inst · los puntos (automatizaciones)", plantilla: "puntos" },

  /* --------------------------------------------------------------------
     Los consejos.

     Lo que conviene saber aunque no nos contraten, por rubro. Antes de
     sumar uno, leer `docs/feed.md`. Viven en `components/feed/Consejos.tsx`.
     -------------------------------------------------------------------- */
  { slug: "pin", titulo: "Consejo web · el perfil de Google", plantilla: "pin" },
  { slug: "sobre", titulo: "Consejo web · correo con dominio propio", plantilla: "sobre" },
  { slug: "circulos", titulo: "Consejo web · una acción por pantalla", plantilla: "circulos" },
  { slug: "diagrama", titulo: "Consejo auto · escribir el proceso", plantilla: "diagrama" },
  { slug: "luna", titulo: "Consejo auto · fuera de horario", plantilla: "luna" },
  { slug: "embudo", titulo: "Consejo sistemas · un solo lugar por dato", plantilla: "embudo" },
  { slug: "copia", titulo: "Consejo sistemas · respaldos", plantilla: "copia" },
  { slug: "reduccion", titulo: "Consejo marca · el logo en chico", plantilla: "reduccion" },
  { slug: "muestras", titulo: "Consejo marca · paleta acotada", plantilla: "muestras" },
  { slug: "eslabones", titulo: "Consejo seguridad · verificación en dos pasos", plantilla: "eslabones" },

  /* --------------------------------------------------------------------
     Los productos.

     Lo que el estudio ofrece hecho, con capturas reales del producto
     (`feed-capturas/`). Viven en `components/feed/Productos.tsx`.
     -------------------------------------------------------------------- */
  { slug: "cupo-vitrina", titulo: "Producto · Cupo, la vitrina", plantilla: "cupo-vitrina" },
  { slug: "cupo-detalle", titulo: "Producto · Cupo, los horarios de cerca", plantilla: "cupo-detalle" },
  { slug: "cupo-panel", titulo: "Producto · Cupo, panel y celular", plantilla: "cupo-panel" },
  { slug: "cupo-ficha", titulo: "Producto · Cupo, la ficha", plantilla: "cupo-ficha" },
  ...[1, 2, 3, 4, 5].map(
    (lamina): Pieza => ({
      slug: `cupo-carrusel-${lamina}`,
      titulo: `Producto · Cupo, carrusel ${lamina} de 5`,
      plantilla: "cupo-carrusel",
      lamina,
    }),
  ),
];
