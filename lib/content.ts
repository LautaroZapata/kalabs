export const SITE = {
  nombre: "Kalabs",
  tagline: "Estudio digital nocturno",
  ciudad: "Montevideo",
  pais: "Uruguay",
  coords: "34°54′S 56°10′O",
  turno: "22:00 → 04:00",
  email: "hola@kalabs.uy",
  descripcion:
    "Estudio digital de Montevideo. Webs, automatizaciones y sistemas a medida para negocios chicos que quieren destacarse.",
  url: "https://kalabs.uy",
};

export const MANIFIESTO = [
  "Mientras todo busca ser minimalista,",
  "Kalabs elige otra cosa.",
  "Se trabaja de noche, con amigos,",
  "para negocios chicos que quieren destacarse",
  "—no desaparecer en un sitio genérico más.",
];

export type Indice = { id: string; num: string; label: string; nota: string };

export const INDICE: Indice[] = [
  { id: "indice", num: "00", label: "Índice", nota: "dónde estás parado" },
  { id: "obra", num: "01", label: "Obra", nota: "tres cosas que existen" },
  { id: "oficio", num: "02", label: "Oficio", nota: "lo que sabemos hacer" },
  { id: "taller", num: "03", label: "Taller", nota: "quién prende la luz" },
  { id: "senal", num: "04", label: "Señal", nota: "mandá un mensaje" },
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
      "Choferes, servicios y estado de cada unidad en un solo lugar. Quién está libre, quién está en camino y hace cuánto —sin llamar a nadie.",
    stack: ["Next.js", "Supabase", "Tiempo real"],
    estado: "En producción",
    ancho: "largo",
    offset: 0,
  },
  {
    num: "02",
    nombre: "ROG",
    nombreLargo: "República Oriental de los Gastos",
    pitch: "Finanzas personales sin vueltas.",
    detalle:
      "Presupuesto, ahorro y flujo de plata en una sola vista. Hecho para entender en diez segundos en qué se te fue el mes.",
    stack: ["Next.js", "Supabase"],
    estado: "En producción",
    ancho: "corto",
    offset: 2,
  },
  {
    num: "03",
    nombre: "Mesa",
    pitch: "Nutrición compartida del hogar.",
    detalle:
      "Toda la casa registra lo que come desde Telegram. Sin instalar nada nuevo, sin aprender otra app: se escribe donde ya se escribe.",
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
    bajada: "Páginas y sistemas a medida.",
    cuerpo:
      "Pensados para vender, no solo para verse bien. Rápidos en el celular, escritos a mano, sin quince plugins peleándose entre ellos.",
    entregables: ["Landing / sitio", "Tienda o catálogo", "Panel de administración", "Medición real"],
  },
  {
    num: "02",
    titulo: "Automatizaciones",
    bajada: "Bots y procesos que devuelven horas.",
    cuerpo:
      "Si algo se hace copiando y pegando todas las semanas, se puede automatizar. Empezamos por lo que más tiempo te come.",
    entregables: ["Bots de WhatsApp / Telegram", "Reportes automáticos", "Conexión entre herramientas", "Alertas"],
  },
  {
    num: "03",
    titulo: "Sistemas a medida",
    bajada: "Una herramienta simple para un problema puntual.",
    cuerpo:
      "Turnos, pedidos, stock. Nada de suites gigantes que nadie usa: una sola cosa, que hace bien lo que tiene que hacer.",
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
    bio: "Estudiante de Tecnologías de la Información en Uruguay. Construye las cosas que se ven y las que corren atrás. Fundó Kalabs para trabajar con negocios chicos sin tratarlos como clientes chicos.",
    tag: "Fundador",
    estado: "confirmado",
  },
  {
    nombre: "Mati",
    rol: "Diseño gráfico e identidad",
    bio: "Se encarga de que una marca se reconozca de lejos. Tipografía, sistema visual y todo lo que hace que un negocio no parezca la plantilla de al lado.",
    tag: "Socio",
    estado: "pendiente",
  },
];

export const ENLACES = [
  { label: "Mail", valor: SITE.email, href: `mailto:${SITE.email}` },
  { label: "WhatsApp", valor: "Escribinos", href: `mailto:${SITE.email}?subject=WhatsApp` },
  { label: "GitHub", valor: "LautaroZapata", href: "https://github.com/LautaroZapata" },
];
