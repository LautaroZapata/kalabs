export const SITE = {
  nombre: "Kalabs",
  tagline: "Estudio digital nocturno",
  ciudad: "Montevideo",
  pais: "Uruguay",
  coords: "34°54′S 56°10′O",
  turno: "22:00 → 04:00",
  email: "hola@kalabs.uy",
  descripcion:
    "Estudio digital de Montevideo. Desarrollo web, automatizaciones y sistemas a medida para pequeños negocios.",
  url: "https://kalabs.uy",
};

export const MANIFIESTO = [
  "Estudio digital de Montevideo.",
  "Trabajamos de noche,",
  "con pequeños negocios",
  "que necesitan destacarse",
  "y no parecerse a los demás.",
];

export type Indice = { id: string; num: string; label: string; nota: string };

export const INDICE: Indice[] = [
  { id: "indice", num: "00", label: "Índice", nota: "Presentación" },
  { id: "obra", num: "01", label: "Obra", nota: "Proyectos realizados" },
  { id: "oficio", num: "02", label: "Oficio", nota: "Servicios" },
  { id: "taller", num: "03", label: "Taller", nota: "Equipo" },
  { id: "senal", num: "04", label: "Señal", nota: "Contacto" },
];

export type Proyecto = {
  num: string;
  nombre: string;
  nombreLargo?: string;
  pitch: string;
  detalle: string;
  stack: string[];
  estado: string;
  ancho: "corto" | "medio" | "largo";
  offset: 0 | 1 | 2;
};

export const PROYECTOS: Proyecto[] = [
  {
    num: "01",
    nombre: "ViaGrúa",
    pitch: "Gestión de flotas de grúas en tiempo real.",
    detalle:
      "Choferes, servicios y estado de cada unidad en una sola vista. Permite saber qué unidad está disponible y cuál está en camino sin realizar un solo llamado.",
    stack: ["Next.js", "Supabase", "Tiempo real"],
    estado: "En producción",
    ancho: "largo",
    offset: 0,
  },
  {
    num: "02",
    nombre: "ROG",
    nombreLargo: "República Oriental de los Gastos",
    pitch: "Finanzas personales.",
    detalle:
      "Presupuesto, ahorro y flujo de dinero en una sola pantalla, con el detalle de en qué se fue el mes.",
    stack: ["Next.js", "Supabase"],
    estado: "En producción",
    ancho: "corto",
    offset: 2,
  },
  {
    num: "03",
    nombre: "Mesa",
    pitch: "Registro nutricional del hogar.",
    detalle:
      "Cada integrante registra sus comidas desde Telegram, sin instalar ni aprender una aplicación nueva.",
    stack: ["Next.js", "Bot de Telegram"],
    estado: "En producción",
    ancho: "medio",
    offset: 1,
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
    cuerpo:
      "Diseñados para vender, no solo para verse bien. Rápidos en el celular y desarrollados sin plantillas ni plugins innecesarios.",
    entregables: ["Sitio institucional", "Tienda o catálogo", "Panel de administración", "Medición de resultados"],
  },
  {
    num: "02",
    titulo: "Automatizaciones",
    bajada: "Procesos que ahorran horas de trabajo.",
    cuerpo:
      "Las tareas que se repiten todas las semanas se pueden automatizar. Empezamos por la que más tiempo consume.",
    entregables: ["Bots de WhatsApp y Telegram", "Reportes automáticos", "Integración entre herramientas", "Alertas"],
  },
  {
    num: "03",
    titulo: "Sistemas a medida",
    bajada: "Herramientas simples para problemas puntuales.",
    cuerpo:
      "Turnos, pedidos o control de stock. Una función resuelta correctamente, en lugar de un sistema completo que nadie utiliza.",
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
    bio: "Estudiante de Tecnologías de la Información. Desarrolla tanto la interfaz como la infraestructura de cada proyecto. Fundó Kalabs para trabajar con pequeños negocios con el mismo estándar que con una empresa grande.",
    tag: "Fundador",
    estado: "confirmado",
  },
  {
    nombre: "Mati",
    rol: "Diseño gráfico e identidad",
    bio: "Responsable de la identidad visual: tipografía, sistema gráfico y todo lo que hace que una marca se reconozca a distancia.",
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
  citaTaller: "Un pequeño negocio no necesita parecerse a los demás. Necesita que lo recuerden.",
  obraKicker: "01 — Proyectos en producción",
  obraHint: "Arrastrar para ver más",
  oficioLead:
    "02 — Tres formas de resolver el mismo problema: que un pequeño negocio deje de perder tiempo y dinero en tareas que puede hacer una máquina.",
  tallerKicker: "03 — Equipo",
  senalKicker: "04 — Contacto",
  senalCierre: ["Contanos qué necesitás.", "Respondemos dentro de las 24 horas."],
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
    mensajePh: "Describí brevemente qué necesitás.",
    enviar: "Enviar mensaje",
    aviso: "Se abrirá tu aplicación de correo con el mensaje redactado. También podés escribirnos directamente a",
  },
};
