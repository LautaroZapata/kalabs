export const SITE = {
  nombre: "Kalabs",
  tagline: "Estudio digital",
  ciudad: "Montevideo",
  pais: "Uruguay",
  email: "hola@kalabs.uy",
  descripcion:
    "Estudio digital de Montevideo. Desarrollo web, automatizaciones y sistemas a medida para negocios chicos.",
  url: "https://kalabs.uy",
};

/** La portada: cabecera, titular de tapa y entrada con capitular. */
export const PORTADA = {
  cintillo: ["Montevideo, Uruguay", "Est. 2025", "Estudio digital"],
  titular: "Trabajamos con negocios chicos que no quieren parecerse a nadie.",
  bajada: "Desarrollo web, automatizaciones y sistemas a medida.",
  entrada:
    "Hacemos sitios, automatizaciones y sistemas a medida para negocios de Montevideo. Cosas que salen a producción y quedan andando, no demostraciones. Abajo están los tres que están en la calle hoy, lo que sabemos hacer y cómo escribirnos.",
  recuadro: {
    titulo: "Cómo trabajamos",
    puntos: [
      "La primera conversación no se cobra.",
      "Presupuesto cerrado antes de empezar.",
      "Respondemos en 24 horas.",
    ],
  },
};

export type Indice = { id: string; folio: string; label: string; nota: string };

/* Las secciones son páginas del diario. El folio (p. 2) es una convención de
   imprenta, no la numeración 00/01/02 de siempre. */
export const INDICE: Indice[] = [
  { id: "portada", folio: "1", label: "Portada", nota: "Kalabs" },
  { id: "proyectos", folio: "2", label: "Proyectos", nota: "En producción" },
  { id: "servicios", folio: "3", label: "Servicios", nota: "Qué hacemos" },
  { id: "contacto", folio: "4", label: "Contacto", nota: "Equipo y contacto" },
];

export type Proyecto = {
  num: string;
  nombre: string;
  nombreLargo?: string;
  pitch: string;
  detalle: string;
  estado: string;
  /** El sitio en vivo. La ficha entera enlaza acá. */
  href: string;
  /** Dominio que se muestra en la ficha. */
  sitio: string;
  /** Captura real del proyecto, en public/proyectos/. */
  imagen: string;
  /** Qué se ve en la captura, para el alt. */
  imagenAlt: string;
  /** Viñeta animada que se monta sobre la captura. */
  vineta: "grua" | "barras" | "piston";
};

export const PROYECTOS: Proyecto[] = [
  {
    num: "01",
    nombre: "ViaGrúa",
    pitch: "Flotas de grúas en tiempo real.",
    detalle:
      "Choferes, servicios y unidades en una sola vista. Quién está libre y quién está en camino, sin un solo llamado.",
    estado: "En producción",
    href: "https://via-grua.vercel.app",
    sitio: "via-grua.vercel.app",
    imagen: "/proyectos/viagrua.png",
    imagenAlt:
      "Portada de ViaGrúa: el titular «Sabé qué hace cada chofer sin tener que llamarlo» junto al panel de traslados en un celular.",
    vineta: "grua",
  },
  {
    num: "02",
    nombre: "ROG",
    nombreLargo: "República Oriental de los Gastos",
    pitch: "Finanzas personales.",
    detalle:
      "Presupuesto, ahorro y flujo del mes en una pantalla. Y el detalle de en qué se fue.",
    estado: "En producción",
    href: "https://urugastos.vercel.app",
    sitio: "urugastos.vercel.app",
    imagen: "/proyectos/rog.png",
    imagenAlt:
      "Portada de República Oriental de los Gastos: el resumen mensual con cuentas, presupuesto y ahorro.",
    vineta: "barras",
  },
  {
    num: "03",
    nombre: "Oleo Cáceres",
    nombreLargo: "Oleohidráulica Cáceres",
    pitch: "Sitio institucional industrial.",
    detalle:
      "Veinte años de oficio contados en una página: qué fabrican, qué reparan y para quién trabajan. Con ANCAP, UTE y la Armada entre los clientes, la web tenía que estar a esa altura.",
    estado: "En producción",
    href: "https://oleocaceres-web.vercel.app",
    sitio: "oleocaceres-web.vercel.app",
    imagen: "/proyectos/oleocaceres.png",
    imagenAlt:
      "Portada de Oleohidráulica Cáceres: el nombre de la empresa a gran tamaño y la fila de logos de los clientes con los que trabaja.",
    vineta: "piston",
  },
];

export type Servicio = {
  num: string;
  titulo: string;
  bajada: string;
  cuerpo: string;
  entregables: string[];
};

export const SERVICIOS: Servicio[] = [
  {
    num: "01",
    titulo: "Desarrollo web",
    bajada: "Sitios y aplicaciones a medida.",
    cuerpo: "Para vender, no para decorar. Rápidos en el celular. Sin plantillas.",
    entregables: ["Sitio institucional", "Tienda o catálogo", "Panel de administración", "Medición"],
  },
  {
    num: "02",
    titulo: "Automatizaciones",
    bajada: "Menos tareas repetidas.",
    cuerpo:
      "Lo que hacés todas las semanas a mano lo hace una máquina. Empezamos por lo que más tiempo come.",
    entregables: ["Bots de WhatsApp y Telegram", "Reportes automáticos", "Integraciones", "Alertas"],
  },
  {
    num: "03",
    titulo: "Sistemas a medida",
    bajada: "Una herramienta, un problema.",
    cuerpo:
      "Turnos, pedidos, stock. Una función bien resuelta antes que un sistema entero que nadie abre.",
    entregables: ["Turnos y agenda", "Pedidos", "Control de stock", "Fichas de clientes"],
  },
];

export type Persona = {
  nombre: string;
  /** A qué se dedica, en una línea. Sin biografía: el nombre y el oficio
      alcanzan, y quien quiera más entra al LinkedIn. */
  rol: string;
  tag: string;
  estado: "confirmado" | "pendiente";
  linkedin: string;
};

export const EQUIPO: Persona[] = [
  {
    nombre: "Lautaro Zapata",
    rol: "Desarrollo y sistemas",
    tag: "Fundador",
    estado: "confirmado",
    linkedin: "https://www.linkedin.com/in/lautarozc/",
  },
  {
    nombre: "Mati",
    rol: "Diseño gráfico e identidad",
    tag: "Socio",
    estado: "pendiente",
    linkedin: "https://www.linkedin.com/in/matiassxsa/",
  },
];

export const ENLACES = [
  { label: "Correo", valor: SITE.email, href: `mailto:${SITE.email}` },
  { label: "WhatsApp", valor: "Escribinos", href: `mailto:${SITE.email}?subject=WhatsApp` },
  { label: "GitHub", valor: "LautaroZapata", href: "https://github.com/LautaroZapata" },
];

/** Microcopy de interfaz. Todo el texto del sitio vive en este archivo. */
export const UI = {
  /* p. 2 — proyectos */
  proyectosAntetitulo: "En producción",
  proyectosBajada: "Tres productos que hoy usan personas reales, todos los días.",
  proyectosVer: "Ver el sitio",
  proyectosCierreKicker: "Espacio disponible",
  proyectosCierreTitulo: "Tu proyecto acá",
  proyectosCierreNota: "Si tenés algo entre manos, escribinos. La primera conversación no se cobra.",
  proyectosCierreAccion: "Escribinos",

  /* p. 3 — servicios */
  serviciosAntetitulo: "Qué hacemos",
  serviciosBajada:
    "Tres formas de que un negocio chico deje de perder tiempo en lo que puede hacer una máquina.",
  serviciosEntregables: "Incluye",

  /* p. 4 — contacto (incluye equipo) */
  equipoAntetitulo: "Quiénes",
  cita: "Un negocio chico no necesita parecerse a los demás. Necesita que lo recuerden.",
  contactoAntetitulo: "Escribinos",
  contactoCierre: ["Contanos qué necesitás.", "Respondemos en 24 horas."],
  form: {
    titulo: "Formulario de contacto",
    respuesta: "Respuesta en 24 horas",
    nombre: "Nombre",
    nombrePh: "Nombre y apellido",
    negocio: "Negocio (opcional)",
    negocioPh: "Panadería, estudio, kiosco…",
    servicio: "Servicio de interés",
    servicioOtro: "Todavía no lo tengo definido",
    mensaje: "Mensaje",
    mensajePh: "Contanos brevemente qué necesitás.",
    enviar: "Enviar mensaje",
    aviso: "Se abre tu aplicación de correo con el mensaje redactado. También podés escribirnos a",
  },
};
