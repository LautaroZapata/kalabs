export const SITE = {
  nombre: "Kalabs",
  tagline: "Estudio digital",
  ciudad: "Montevideo",
  pais: "Uruguay",
  email: "hola@kalabs.dev",
  descripcion:
    "Estudio digital de Montevideo. Desarrollo web, automatizaciones y sistemas a medida.",
  /* Con www: es el dominio que Vercel tiene como principal y al que redirige
     el apex. La canónica, el sitemap y la imagen OG tienen que nombrar el host
     que efectivamente sirve, no el que rebota. */
  url: "https://www.kalabs.dev",
};

/** Los datos del estudio, sueltos. Los usa la imagen social. */
export const PORTADA = {
  cintillo: ["Montevideo, Uruguay", "Est. 2025", "Estudio digital"],
};

export type Indice = { id: string; label: string };

/* Las secciones del sitio, en orden. Lo usa la barra de arriba.
   La obra va primero: la prueba antes que la promesa. Quien llega quiere ver
   qué hicimos, no leer qué decimos que hacemos. */
export const INDICE: Indice[] = [
  { id: "obra", label: "Obra" },
  { id: "servicios", label: "Servicios" },
  { id: "estudio", label: "Estudio" },
];

export type Proyecto = {
  num: string;
  nombre: string;
  nombreLargo?: string;
  pitch: string;
  detalle: string;
  /** El sitio en vivo. La ficha entera enlaza acá. */
  href: string;
  /** Dominio que se muestra en la ficha. */
  sitio: string;
  /** De qué es el proyecto, en tres palabras. Va en la fila del índice. */
  rubro: string;
  /** Captura real del proyecto, en public/proyectos/. */
  imagen: string;
  /** Qué se ve en la captura, para el alt. */
  imagenAlt: string;
};

export const PROYECTOS: Proyecto[] = [
  {
    num: "01",
    nombre: "ViaGrúa",
    pitch: "Flotas de grúas en tiempo real.",
    detalle:
      "Choferes, servicios y unidades en una sola vista. Quién está libre y quién está en camino, sin un solo llamado.",
    href: "https://via-grua.vercel.app",
    sitio: "via-grua.vercel.app",
    rubro: "Flotas en tiempo real",
    imagen: "/proyectos/viagrua.png",
    imagenAlt:
      "Portada de ViaGrúa: el titular «Sabé qué hace cada chofer sin tener que llamarlo» junto al panel de traslados en un celular.",
  },
  {
    num: "02",
    nombre: "ROG",
    nombreLargo: "República Oriental de los Gastos",
    pitch: "Finanzas personales.",
    detalle:
      "Presupuesto, ahorro y flujo del mes en una pantalla. Y el detalle de en qué se fue.",
    href: "https://urugastos.vercel.app",
    sitio: "urugastos.vercel.app",
    rubro: "Finanzas personales",
    imagen: "/proyectos/rog.png",
    imagenAlt:
      "Portada de República Oriental de los Gastos: el resumen mensual con cuentas, presupuesto y ahorro.",
  },
  {
    num: "03",
    nombre: "Oleo Cáceres",
    nombreLargo: "Oleohidráulica Cáceres",
    pitch: "Sitio institucional industrial.",
    detalle:
      "Veinte años de oficio contados en una página: qué fabrican, qué reparan y para quién trabajan. Con ANCAP, UTE y la Armada entre los clientes, la web tenía que estar a esa altura.",
    href: "https://oleocaceres-web.vercel.app",
    sitio: "oleocaceres-web.vercel.app",
    rubro: "ANCAP · UTE · Armada",
    imagen: "/proyectos/oleocaceres.png",
    imagenAlt:
      "Portada de Oleohidráulica Cáceres: el nombre de la empresa a gran tamaño y la fila de logos de los clientes con los que trabaja.",
  },
];

export type Servicio = {
  num: string;
  /** Nombre del servicio. Lo usa el desplegable del formulario. */
  titulo: string;
  cuerpo: string;
  entregables: string[];
  /** Cuál de las tres láminas lo dibuja. El dibujo vive en `Lamina.tsx`. */
  lamina: "sitio" | "flujo" | "grilla";
  /** Qué se ve en la lámina, para quien no la ve. */
  laminaAlt: string;
};

export const SERVICIOS: Servicio[] = [
  {
    num: "01",
    titulo: "Desarrollo web",
    cuerpo:
      "Sitios para negocios que necesitan que los encuentren. Rápidos en el celular, sin plantillas y con la medición configurada desde el primer día. Se entregan en producción, con el dominio andando y soporte del otro lado.",
    entregables: ["Institucional", "Tienda o catálogo", "Panel de administración", "Medición"],
    lamina: "sitio",
    laminaAlt:
      "Una página web armándose bloque por bloque dentro de un navegador.",
  },
  {
    num: "02",
    titulo: "Automatizaciones",
    cuerpo:
      "Las tareas manuales que se repiten todas las semanas pasan a ejecutarse solas. Empezamos por la que más horas consume.",
    entregables: ["Bots de WhatsApp y Telegram", "Reportes", "Integraciones", "Alertas"],
    lamina: "flujo",
    laminaAlt:
      "Tres pasos encadenados con un dato que los recorre solo, una y otra vez.",
  },
  {
    num: "03",
    titulo: "Sistemas a medida",
    cuerpo:
      "Turnos, pedidos o control de stock. Una función bien resuelta antes que un sistema entero que después nadie abre.",
    entregables: ["Turnos y agenda", "Pedidos", "Control de stock", "Fichas de clientes"],
    lamina: "grilla",
    laminaAlt:
      "Una grilla de turnos que se va ocupando casillero por casillero.",
  },
];

export type Persona = {
  nombre: string;
  /** A qué se dedica, en una línea. Sin biografía y sin cargo: lo que hace
      dice más que el título, y quien quiera más entra al LinkedIn. */
  rol: string;
  linkedin: string;
};

export const EQUIPO: Persona[] = [
  {
    nombre: "Lautaro Zapata",
    rol: "Desarrollo y sistemas",
    linkedin: "https://www.linkedin.com/in/lautarozc/",
  },
  {
    nombre: "Matías Sosa",
    rol: "Diseño gráfico e identidad",
    linkedin: "https://www.linkedin.com/in/matiassxsa/",
  },
];

/* Sin WhatsApp hasta que haya un número del estudio. Estaba, pero apuntaba a
   un `mailto:`: quien lo clickeaba esperando WhatsApp se encontraba con el
   cliente de correo abriéndose. Un canal que no es el que dice ser hace dudar
   del resto del sitio. Cuando haya número, vuelve como `https://wa.me/…`. */
export const ENLACES = [
  { label: "Correo", valor: SITE.email, href: `mailto:${SITE.email}` },
  { label: "Instagram", valor: "@kalabs.dev", href: "https://www.instagram.com/kalabs.dev" },
];

/**
 * El texto de los dos correos que dispara el formulario.
 *
 * Vive acá y no en `correos.ts` por la misma regla que el resto del sitio: el
 * texto en un solo archivo, el markup en otro. `correos.ts` arma las tablas y
 * los filetes; lo que dicen se edita desde acá sin abrir una plantilla HTML.
 */
export const CORREO = {
  /* El que te llega a vos con la consulta. */
  aviso: {
    kicker: "Consulta desde el sitio",
    titulo: "Nueva consulta.",
    mensajeLabel: "Mensaje",
    pie: "Respondé este correo y le llega directo a quien escribió.",
  },

  /* El acuse automático para quien completó el formulario. Antes no existía:
     veía el acuse en pantalla y no le quedaba nada en la casilla. Un mail que
     confirma es también la primera prueba de que del otro lado hay alguien. */
  acuse: {
    asunto: "Recibimos tu mensaje",
    kicker: "Acuse de recibo",
    titulo: "Recibimos tu mensaje.",
    saludo: (nombre: string) => `Hola ${nombre},`,
    cuerpo: [
      "Gracias por escribirnos. Tu consulta ya está en nuestra bandeja y te contestamos dentro de las 24 horas hábiles.",
      "Si necesitás agregar algo, respondé este mismo correo: llega a la misma conversación.",
    ],
    copiaLabel: "Copia de lo que nos mandaste",
    pie: "No hace falta que respondas este correo si no querés agregar nada.",
  },

  /* Común a los dos. */
  verSitio: "Ver el sitio",
} as const;

/** Microcopy de interfaz. Todo el texto del sitio vive en este archivo. */
export const UI = {
  /* barra */
  barraCta: "Escribinos",

  /* portada
     No titula: pregunta. Quien llega no viene a leer lo que el estudio dice de
     sí mismo, viene con un problema; el campo de abajo es para escribirlo, y
     lo que escriba viaja al formulario de contacto. */
  portadaPregunta: ["Contanos qué hay que ", "resolver", "."],
  /* El placeholder de arranque y el que queda cuando el campo está enfocado o
     el sistema pide movimiento reducido. Es también el que ve quien entra sin
     JavaScript, así que tiene que funcionar solo. */
  portadaPh: "Una web, un bot, un sistema…",
  /* El nombre accesible del campo, fijo: el placeholder cambia solo y un
     lector de pantalla no puede quedar atado a un texto que se está
     escribiendo y borrando. */
  portadaLabel: "Qué necesitás resolver",
  /* Lo que el campo se escribe solo, en la voz del que consulta. Consultas
     reales del rubro, no ejemplos de manual: quien llega se tiene que
     reconocer en alguna.
     Ninguna pasa los 37 caracteres: el campo mide 307px en un celular de
     390px y ahí una frase larga se corta contra el borde justo cuando se está
     terminando de escribir, que es el único momento en que importa. */
  portadaEjemplos: [
    "Una web que aparezca en Google.",
    "Un bot de WhatsApp para pedidos.",
    "Un sistema de turnos para el taller.",
    "Automatizar un reporte semanal.",
    "Una tienda para vender online.",
    "Rehacer mi web, que quedó vieja.",
  ],
  portadaEnviar: "Ir al formulario con lo que escribiste",
  portadaNota: "Estudio digital en Montevideo.",
  portadaNotaFuerte: "La primera consulta no tiene costo.",

  /* obra */
  obraRotulo: "Proyectos",
  obraAnterior: "Proyecto anterior",
  obraSiguiente: "Proyecto siguiente",
  obraPausar: "Pausar el pase de proyectos",
  obraSeguir: "Seguir con el pase de proyectos",
  obraIr: (nombre: string) => `Ver ${nombre}`,
  proyectosVer: "Ver el sitio",
  proyectosCierreTitulo: "Tu proyecto acá",
  proyectosCierreAccion: "Escribinos",

  /* servicios */
  serviciosAntetitulo: "Lo que hacemos",
  serviciosTitulo: "Nos ajustamos a lo que necesitás.",
  serviciosEntregables: "Incluye",
  /* El nombre de la lista de servicios para el lector de pantalla: anuncia de
     qué son las tres pestañas antes de leer la primera. */
  serviciosLista: "Servicios",

  /* banner: las tres promesas, en movimiento. Se frena al pasarle el mouse
     por encima —una cinta que no para no se puede leer—. */
  banner: [
    "Primera consulta sin costo",
    "Presupuesto cerrado antes de empezar",
    "Respuesta en 24 horas",
    "Montevideo, Uruguay",
  ],

  /* estudio */
  equipoAntetitulo: "Equipo",
  estudioTitulo: "Quiénes se encargan de Kalabs.",
  estudioCuerpo: "Conocé más acerca de los integrantes del estudio.",

  /* contacto */
  contactoTitulo: ["Preguntanos ", "lo que sea", "."],
  contactoCuerpo:
    "Contanos qué necesitás resolver y lo evaluamos juntos. Si no amerita un desarrollo, te lo decimos.",
  contactoAntetitulo: "Escribinos",
  volver: "Volver al inicio",
  form: {
    titulo: "Formulario de contacto",
    respuesta: "Respuesta en 24 horas",
    nombre: "Nombre",
    nombrePh: "Nombre y apellido",
    /* El correo no estaba mientras el formulario armaba un `mailto:`: lo ponía
       el cliente de correo. Ahora que manda el servidor, sin este campo llegan
       consultas que no se pueden contestar. */
    correo: "Correo",
    /* Un ejemplo con arroba y no «donde te contestamos»: la forma del dato
       dice más rápido qué va acá que una frase explicándolo. */
    correoPh: "nombre@empresa.com",
    negocio: "Empresa (opcional)",
    negocioPh: "Nombre o rubro",
    servicio: "Servicio de interés",
    servicioOtro: "Todavía no lo tengo definido",
    mensaje: "Mensaje",
    mensajePh: "Contanos brevemente qué necesitás.",
    enviar: "Enviar mensaje",
    enviando: "Enviando…",

    /* Acuse de recibo. Reemplaza al formulario una vez enviado: dejar los
       campos llenos invita a apretar de nuevo y mandar todo por duplicado. */
    okFicha: "Acuse de recibo",
    okTitulo: "Tu mensaje está en camino.",
    okCuerpo: "Te contestamos dentro de las 24 horas al correo que dejaste.",

    /* Los errores dicen qué campo y qué hacer. «Error en el formulario» no le
       sirve a nadie. */
    errorNombre: "Falta tu nombre.",
    errorCorreo: "Revisá el correo: no parece una dirección válida.",
    errorMensaje: "Contanos un poco más: al menos una línea.",
    errorLargo: "El mensaje es muy largo. Resumilo y lo charlamos por correo.",
    errorServidor:
      "No pudimos enviarlo. Probá de nuevo en un minuto o escribinos directo a " +
      SITE.email +
      ".",
  },
};
