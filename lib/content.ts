export const SITE = {
  nombre: "Kalabs",
  tagline: "Estudio digital nocturno",
  ciudad: "Montevideo",
  pais: "Uruguay",
  coords: "34°54′S 56°10′O",
  turno: "22:00 → 04:00",
  email: "hola@kalabs.uy",
  descripcion:
    "Estudio digital de Montevideo. Desarrollo web, automatizaciones y sistemas a medida para negocios chicos.",
  url: "https://kalabs.uy",
};

export const MANIFIESTO = [
  "Estudio digital",
  "de Montevideo.",
  "Trabajamos de noche",
  "con negocios chicos",
  "que no quieren parecerse a nadie.",
];

export type Indice = { id: string; num: string; label: string; nota: string };

/* Cuatro secciones, nombres directos: el visitante no tiene que descifrar
   una metáfora para saber qué hay en cada una. */
export const INDICE: Indice[] = [
  { id: "indice", num: "00", label: "Kalabs", nota: "Estudio digital" },
  { id: "proyectos", num: "01", label: "Proyectos", nota: "En producción" },
  { id: "servicios", num: "02", label: "Servicios", nota: "Qué hacemos" },
  { id: "contacto", num: "03", label: "Contacto", nota: "Equipo y contacto" },
];

export type Proyecto = {
  num: string;
  nombre: string;
  nombreLargo?: string;
  pitch: string;
  detalle: string;
  stack: string[];
  estado: string;
};

export const PROYECTOS: Proyecto[] = [
  {
    num: "01",
    nombre: "ViaGrúa",
    pitch: "Flotas de grúas en tiempo real.",
    detalle:
      "Choferes, servicios y unidades en una sola vista. Quién está libre y quién está en camino, sin un solo llamado.",
    stack: ["Next.js", "Supabase", "Tiempo real"],
    estado: "En producción",
  },
  {
    num: "02",
    nombre: "ROG",
    nombreLargo: "República Oriental de los Gastos",
    pitch: "Finanzas personales.",
    detalle:
      "Presupuesto, ahorro y flujo del mes en una pantalla. Y el detalle de en qué se fue.",
    stack: ["Next.js", "Supabase"],
    estado: "En producción",
  },
  {
    num: "03",
    nombre: "Mesa",
    pitch: "Registro nutricional del hogar.",
    detalle:
      "Cada integrante carga sus comidas por Telegram. Sin instalar ni aprender nada nuevo.",
    stack: ["Next.js", "Bot de Telegram"],
    estado: "En producción",
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
  rol: string;
  bio: string;
  tag: string;
  estado: "confirmado" | "pendiente";
};

export const EQUIPO: Persona[] = [
  {
    nombre: "Lautaro Zapata",
    rol: "Desarrollo y sistemas",
    bio: "Estudiante de Tecnologías de la Información. Hace la interfaz y la infraestructura. Fundó Kalabs para trabajar con negocios chicos con el estándar de una empresa grande.",
    tag: "Fundador",
    estado: "confirmado",
  },
  {
    nombre: "Mati",
    rol: "Diseño gráfico e identidad",
    bio: "Identidad visual: tipografía, sistema gráfico y todo lo que hace que una marca se reconozca de lejos.",
    tag: "Socio",
    estado: "pendiente",
  },
];

export const ENLACES = [
  { label: "Correo", valor: SITE.email, href: `mailto:${SITE.email}` },
  { label: "WhatsApp", valor: "Escribinos", href: `mailto:${SITE.email}?subject=WhatsApp` },
  { label: "GitHub", valor: "LautaroZapata", href: "https://github.com/LautaroZapata" },
];

/** Microcopy de interfaz. Todo el texto del sitio vive en este archivo. */
export const UI = {
  /* 01 — proyectos */
  proyectosKicker: "01 — En producción",
  proyectosCierreKicker: "Siguiente",
  proyectosCierreTitulo: "Tu proyecto acá",
  proyectosCierreNota: "Si tenés algo entre manos, escribinos. La primera charla no se cobra.",
  proyectosCierreAccion: "Escribinos",

  /* 02 — servicios */
  serviciosKicker: "02 — Servicios",
  serviciosLead:
    "Tres formas de que un negocio chico deje de perder tiempo en lo que puede hacer una máquina.",

  /* 03 — contacto (incluye equipo) */
  equipoKicker: "Equipo",
  cita: "Un negocio chico no necesita parecerse a los demás. Necesita que lo recuerden.",
  contactoKicker: "03 — Contacto",
  contactoCierre: ["Contanos qué necesitás.", "Respondemos en 24 horas."],

  /* varios */
  chapa: "Est. 2025",
  chapaNota: "Montevideo, Uruguay",
  estadoDisponible: "Disponible",
  sello: "Hecho a mano",
  marquesina: ["Kalabs", "Estudio digital", "Montevideo", "Uruguay", "Hablemos"],
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
