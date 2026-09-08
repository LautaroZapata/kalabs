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

/** La portada: cintillo y nombre, nada más. */
export const PORTADA = {
  cintillo: ["Montevideo, Uruguay", "Est. 2025", "Estudio digital"],
};

export type Indice = { id: string; label: string };

/* Las secciones del sitio, en orden. Lo usa la barra del pie para marcar
   dónde está el visitante. */
/* Los servicios van antes que los proyectos: primero qué podemos hacer por
   quien llega, después la prueba de que sabemos hacerlo. */
export const INDICE: Indice[] = [
  { id: "portada", label: "Portada" },
  { id: "servicios", label: "Servicios" },
  { id: "proyectos", label: "Proyectos" },
  { id: "contacto", label: "Contacto" },
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
  /** Nombre del servicio. Lo usa el desplegable del formulario. */
  titulo: string;
  cuerpo: string;
  entregables: string[];
};

export const SERVICIOS: Servicio[] = [
  {
    num: "01",
    titulo: "Desarrollo web",
    cuerpo:
      "Sitios para negocios que necesitan que los encuentren. Rápidos en el celular, sin plantillas y con la medición configurada desde el primer día. Se entregan en producción, con el dominio andando y soporte del otro lado.",
    entregables: ["Institucional", "Tienda o catálogo", "Panel de administración", "Medición"],
  },
  {
    num: "02",
    titulo: "Automatizaciones",
    cuerpo:
      "Las tareas manuales que se repiten todas las semanas pasan a ejecutarse solas. Empezamos por la que más horas consume.",
    entregables: ["Bots de WhatsApp y Telegram", "Reportes", "Integraciones", "Alertas"],
  },
  {
    num: "03",
    titulo: "Sistemas a medida",
    cuerpo:
      "Turnos, pedidos o control de stock. Una función bien resuelta antes que un sistema entero que después nadie abre.",
    entregables: ["Turnos y agenda", "Pedidos", "Control de stock", "Fichas de clientes"],
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

export const ENLACES = [
  { label: "Correo", valor: SITE.email, href: `mailto:${SITE.email}` },
  { label: "WhatsApp", valor: "Escribinos", href: `mailto:${SITE.email}?subject=WhatsApp` },
  { label: "GitHub", valor: "LautaroZapata", href: "https://github.com/LautaroZapata" },
];

/** Microcopy de interfaz. Todo el texto del sitio vive en este archivo. */
export const UI = {
  /* proyectos */
  proyectosAntetitulo: "En producción",
  proyectosVer: "Ver el sitio",
  proyectosCierreKicker: "Próximo proyecto",
  proyectosCierreTitulo: "Tu proyecto acá",
  proyectosCierreNota:
    "Si tenés un proyecto en marcha, escribinos. La primera consulta no tiene costo.",
  proyectosCierreAccion: "Escribinos",

  /* servicios */
  serviciosAntetitulo: "Áreas de trabajo",
  serviciosEntregables: "Incluye",
  /* La forma de trabajo bajó de la portada: acá, después de la lista de
     servicios, es donde alguien la busca. Van en el orden en que pasan. */
  serviciosComoTitulo: "Cómo trabajamos",
  serviciosComo: [
    "La primera consulta no tiene costo.",
    "Presupuesto cerrado antes de empezar.",
    "Respuesta dentro de las 24 horas.",
  ],
  serviciosCtaTitulo: "¿No sabés cuál necesitás?",
  serviciosCtaCuerpo:
    "Contanos qué necesitás resolver y lo evaluamos juntos. Si no amerita un desarrollo, te lo decimos.",
  serviciosCtaAccion: "Escribinos",

  /* contacto (incluye equipo) */
  equipoAntetitulo: "Equipo",
  /* La única mancha de color pleno del sitio, y va pegada al formulario: por
     eso el eslogan promete algo y señala la acción que está al lado. */
  cita: "Posicionarte digitalmente está a un click.",
  contactoAntetitulo: "Escribinos",
  form: {
    titulo: "Formulario de contacto",
    respuesta: "Respuesta en 24 horas",
    nombre: "Nombre",
    nombrePh: "Nombre y apellido",
    /* El correo no estaba mientras el formulario armaba un `mailto:`: lo ponía
       el cliente de correo. Ahora que manda el servidor, sin este campo llegan
       consultas que no se pueden contestar. */
    correo: "Correo",
    correoPh: "donde te contestamos",
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
    okKicker: "Recibido",
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
