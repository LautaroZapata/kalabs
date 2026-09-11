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

/**
 * El texto largo de una página interior.
 *
 * Los servicios y los proyectos tienen cada uno su URL, y una URL sin cuerpo
 * no la rankea nadie: la home entera son 385 palabras y es una sola dirección
 * para tres oficios distintos. Lo que va acá es lo que un buscador puede leer
 * y una persona puede terminar de leer sin irse.
 */
export type Bloque = { titulo: string; cuerpo: string };
export type Pregunta = { pregunta: string; respuesta: string };

/** Lo que toda página interior declara para el `<head>` y las migas. */
export type Ficha = {
  /** El último tramo de la URL. Sin tildes y sin mayúsculas: es una dirección. */
  slug: string;
  /** El `<title>`. La plantilla del layout le agrega « · Kalabs». */
  seoTitulo: string;
  /** La `<meta name="description">`. Entre 140 y 160 caracteres. */
  seoDescripcion: string;
  /** El H1 de la página. Acá sí lleva la palabra que alguien busca. */
  h1: string;
  /** El párrafo de entrada, debajo del H1. */
  intro: string;
};

export type Proyecto = Ficha & {
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
  /** El año en que salió a producción. Va en la ficha y en el JSON-LD. */
  anio: string;
  /** Con qué está hecho. Lista corta: no es un currículum. */
  stack: string[];
  /** El caso contado: problema, qué se hizo, qué cambió. */
  bloques: Bloque[];
};

export const PROYECTOS: Proyecto[] = [
  {
    num: "01",
    slug: "viagrua",
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
    anio: "2025",
    stack: ["Next.js", "Supabase", "Tiempo real", "PWA"],
    seoTitulo: "ViaGrúa: software de gestión de flotas en Uruguay",
    seoDescripcion:
      "Caso de ViaGrúa: sistema a medida para gestionar flotas de grúas en tiempo real. Choferes, traslados y unidades en una pantalla. Hecho en Montevideo.",
    h1: "ViaGrúa: gestión de flotas de grúas en tiempo real",
    intro:
      "Una empresa de auxilio y traslados coordinaba su flota por teléfono: llamar a cada chofer para saber quién estaba libre, anotar el traslado en papel y volver a llamar para confirmar. Lo reemplazamos por un sistema a medida donde el estado de cada unidad se ve de una.",
    bloques: [
      {
        titulo: "El problema",
        cuerpo:
          "Coordinar una flota por llamadas tiene un techo: a partir de cierta cantidad de unidades, el que despacha pasa el día al teléfono y aun así no sabe dónde está todo. La información existía —cada chofer la tenía— pero no estaba en ningún lado junta. Cada traslado mal asignado es una grúa que cruza Montevideo al pedo y un cliente esperando de más.",
      },
      {
        titulo: "Qué construimos",
        cuerpo:
          "Un panel único con tres vistas: unidades, choferes y servicios. Cada chofer entra desde el celular, marca que está disponible y toma el traslado que le asignan; el panel del despacho se actualiza solo, sin refrescar. Los estados son pocos y explícitos —libre, en camino, en servicio, fuera de turno— porque un sistema con quince estados no lo completa nadie. Funciona como PWA: se instala en el teléfono y sigue andando con señal mala.",
      },
      {
        titulo: "Qué cambió",
        cuerpo:
          "El despacho dejó de llamar para preguntar. Asignar un traslado pasó de una conversación de dos minutos a un toque, y el historial —quién hizo qué, cuándo y cuánto tardó— quedó registrado sin que nadie lo escriba. Eso último no estaba en el pedido original y terminó siendo lo que más usan: al cierre del mes hay números en vez de memoria.",
      },
    ],
  },
  {
    num: "02",
    slug: "republica-oriental-de-los-gastos",
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
    anio: "2025",
    stack: ["Next.js", "Supabase", "Gráficos", "Multi-moneda"],
    seoTitulo: "República Oriental de los Gastos: app de finanzas personales",
    seoDescripcion:
      "Caso de ROG: aplicación web de finanzas personales pensada para Uruguay. Presupuesto, ahorro y gastos del mes en pesos y dólares, en una pantalla.",
    h1: "República Oriental de los Gastos: finanzas personales en pesos y dólares",
    intro:
      "Las apps de gastos que hay dan por sentado que vivís con una sola moneda. Acá se cobra en pesos, se ahorra en dólares y se paga el alquiler en unidades indexadas. ROG es una aplicación web que asume eso desde el primer día en vez de pedirte que conviertas a mano.",
    bloques: [
      {
        titulo: "El problema",
        cuerpo:
          "Llevar las cuentas en una planilla funciona hasta que dejás de actualizarla, que suele ser la tercera semana. Y las apps internacionales fallan en lo básico para acá: una sola moneda, categorías que no existen en el país y ninguna noción de que el sueldo puede venir partido. El resultado es que la mayoría termina sin saber en qué se le fue el mes.",
      },
      {
        titulo: "Qué construimos",
        cuerpo:
          "Una pantalla de resumen que responde tres preguntas antes de tocar nada: cuánto entró, cuánto salió y cuánto queda. Debajo, el detalle por categoría y por cuenta. Las cuentas pueden estar en pesos o en dólares y el total se muestra en las dos, con la cotización del día. Cargar un gasto son tres toques —monto, categoría, listo— porque una carga que lleva más que eso no la hace nadie dos meses seguidos.",
      },
      {
        titulo: "Cómo está hecho",
        cuerpo:
          "Next.js del lado del sitio y Supabase para los datos, con las reglas de acceso a nivel de base: cada persona ve lo suyo y no hay forma de pedir lo ajeno desde el cliente. Los gráficos se calculan en el servidor, así que la pantalla de resumen abre rápida incluso con dos años de movimientos cargados.",
      },
    ],
  },
  {
    num: "03",
    slug: "oleohidraulica-caceres",
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
    anio: "2025",
    stack: ["Next.js", "Sitio estático", "SEO local", "Formulario"],
    seoTitulo: "Oleohidráulica Cáceres: sitio web institucional industrial",
    seoDescripcion:
      "Caso de Oleohidráulica Cáceres: web institucional para una empresa industrial uruguaya con veinte años de oficio y ANCAP, UTE y la Armada entre sus clientes.",
    h1: "Oleohidráulica Cáceres: una web institucional a la altura del oficio",
    intro:
      "Una empresa que fabrica y repara equipos oleohidráulicos para ANCAP, UTE y la Armada no tenía dónde mandar a un cliente nuevo que la buscara. El trabajo era traducir veinte años de taller a una página que se pudiera mostrar en una licitación.",
    bloques: [
      {
        titulo: "El problema",
        cuerpo:
          "En la industria la reputación viaja de boca en boca, y eso alcanza hasta que alguien que no te conoce te busca antes de llamarte. Sin sitio, la única referencia era un teléfono. Para una empresa que trabaja con entes del Estado, no tener dónde mostrar la trayectoria y la lista de clientes es una desventaja concreta frente a competidores más chicos pero mejor presentados.",
      },
      {
        titulo: "Qué construimos",
        cuerpo:
          "Un sitio institucional corto y directo: qué fabrican, qué reparan, para quién trabajan y cómo contactarlos. Los logos de los clientes van arriba y grandes, porque son el argumento más fuerte que tienen. Nada de carrusel de fotos genéricas ni de textos sobre la excelencia: el rubro premia la especificidad. El formulario llega al correo de la empresa y avisa al que escribe que su consulta entró.",
      },
      {
        titulo: "Cómo está hecho",
        cuerpo:
          "Sitio estático en Next.js, servido desde CDN: abre rápido incluso desde el celular de alguien que está en planta con señal floja. Estructura semántica y datos estructurados para que un buscador entienda que es una empresa industrial uruguaya y no un catálogo cualquiera, que es justo lo que hace falta para aparecer cuando alguien busca el servicio por nombre.",
      },
    ],
  },
];

export type Servicio = Ficha & {
  num: string;
  /** Nombre del servicio. Lo usa el desplegable del formulario. */
  titulo: string;
  cuerpo: string;
  entregables: string[];
  /** Cuál de las tres láminas lo dibuja. El dibujo vive en `Lamina.tsx`. */
  lamina: "sitio" | "flujo" | "grilla";
  /** Qué se ve en la lámina, para quien no la ve. */
  laminaAlt: string;
  /** El cuerpo de la página propia del servicio. */
  bloques: Bloque[];
  /**
   * Las preguntas que llegan por correo antes de contratar, contestadas.
   *
   * No son de adorno: alimentan el `FAQPage` de datos estructurados, que es lo
   * que hace que la respuesta pueda aparecer directamente en el buscador. Y
   * cada pregunta es, literalmente, una búsqueda que alguien hizo.
   */
  faq: Pregunta[];
};

export const SERVICIOS: Servicio[] = [
  {
    num: "01",
    slug: "desarrollo-web",
    titulo: "Desarrollo web",
    cuerpo:
      "Sitios para negocios que necesitan que los encuentren. Rápidos en el celular, sin plantillas y con la medición configurada desde el primer día. Se entregan en producción, con el dominio andando y soporte del otro lado.",
    entregables: ["Institucional", "Tienda o catálogo", "Panel de administración", "Medición"],
    lamina: "sitio",
    laminaAlt:
      "Una página web armándose bloque por bloque dentro de un navegador.",
    seoTitulo: "Desarrollo y diseño web en Montevideo, Uruguay",
    seoDescripcion:
      "Diseño y desarrollo de páginas web a medida en Montevideo. Sitios institucionales, tiendas y catálogos: rápidos en el celular, medibles y sin plantillas.",
    h1: "Desarrollo web en Montevideo",
    intro:
      "Hacemos páginas web para negocios uruguayos que necesitan que los encuentren y que, una vez que los encontraron, la web no los haga quedar mal. Sin plantillas compradas, sin constructores que se rompen al año, y con el sitio en producción y andando el día que se entrega.",
    bloques: [
      {
        titulo: "Qué tipo de sitios hacemos",
        cuerpo:
          "Sitios institucionales para empresas que necesitan una dirección seria adonde mandar a un cliente. Catálogos y tiendas para quien vende y hoy responde precios uno por uno por WhatsApp. Landings para una campaña puntual. Y paneles de administración para cuando el sitio tiene que dejar de ser un folleto y empezar a cargar contenido solo.",
      },
      {
        titulo: "Rápido en el celular, no en una prueba de laboratorio",
        cuerpo:
          "En Uruguay la mayoría del tráfico entra desde un teléfono, muchas veces con datos móviles y no con wifi. Un sitio que tarda cuatro segundos en abrir pierde a la mitad antes de mostrar nada. Por eso trabajamos con sitios estáticos servidos desde CDN, imágenes convertidas y dimensionadas, y tipografías cargadas sin que el texto salte. La velocidad no es un extra que se cobra aparte: es el piso.",
      },
      {
        titulo: "Que Google lo pueda leer",
        cuerpo:
          "Un sitio bonito que el buscador no entiende es un folleto caro. Cada web sale con estructura semántica, títulos y descripciones escritos uno por uno, datos estructurados que declaran de qué es el negocio y dónde trabaja, sitemap y robots configurados, y las URLs canónicas resueltas. Si el negocio atiende en una ciudad, además dejamos lista la ficha de Google Business Profile, que es lo que mete al negocio en el mapa.",
      },
      {
        titulo: "Con medición desde el primer día",
        cuerpo:
          "Se entrega con analítica configurada y los eventos que importan marcados: quién completó el formulario, quién tocó el botón de WhatsApp, de dónde vino. Sin eso no hay forma de saber si el sitio funciona, y a los tres meses la conversación sobre qué mejorar es una discusión de opiniones en vez de una de números.",
      },
      {
        titulo: "Cómo trabajamos",
        cuerpo:
          "Primero una charla para entender qué tiene que resolver el sitio, sin costo. Después un presupuesto cerrado: el precio no se mueve salvo que cambie el alcance, y si cambia se avisa antes. Durante el desarrollo hay un enlace de preview donde se ve el avance real, no capturas. Al entregar queda el dominio configurado, el sitio en producción y una ventana de soporte para los ajustes que siempre aparecen cuando la gente empieza a usarlo.",
      },
    ],
    faq: [
      {
        pregunta: "¿Cuánto cuesta hacer una página web en Uruguay?",
        respuesta:
          "Depende del alcance, y cualquiera que te tire un número sin preguntar nada te lo está inventando. Una landing de una sección no cuesta lo mismo que un catálogo con panel de administración. Lo que sí podemos garantizar es que el presupuesto se cierra antes de empezar y no se mueve durante el proyecto. La primera consulta, donde definimos el alcance, no tiene costo.",
      },
      {
        pregunta: "¿Cuánto tarda?",
        respuesta:
          "Una landing o un sitio institucional chico suele estar en dos a tres semanas. Un catálogo o una tienda, entre cuatro y seis. La variable que más mueve el plazo casi nunca es el desarrollo: son los textos y las fotos del cliente. Si eso ya está listo, el plazo se acorta solo.",
      },
      {
        pregunta: "¿Trabajan con WordPress o con Wix?",
        respuesta:
          "No. Trabajamos con Next.js y sitios estáticos, que salen más rápidos, no dependen de plugins que se rompen y no tienen una cuota mensual atada a la plataforma. Si ya tenés un sitio en WordPress o en Wix y querés migrarlo, lo podemos hacer conservando las URLs para no perder el posicionamiento que ya tengas.",
      },
      {
        pregunta: "¿El sitio queda a mi nombre?",
        respuesta:
          "Sí. El dominio se registra a nombre del negocio y el código queda en un repositorio al que tenés acceso. No dejamos a nadie atado: si mañana querés seguir con otro, te llevás todo sin pedir permiso.",
      },
      {
        pregunta: "¿Atienden fuera de Montevideo?",
        respuesta:
          "Sí, trabajamos con clientes de todo el país y también del exterior. Las reuniones son por videollamada salvo que haga falta ir, y el proceso es el mismo esté el cliente en Pocitos o en Salto.",
      },
    ],
  },
  {
    num: "02",
    slug: "automatizaciones",
    titulo: "Automatizaciones",
    cuerpo:
      "Las tareas manuales que se repiten todas las semanas pasan a ejecutarse solas. Empezamos por la que más horas consume.",
    entregables: ["Bots de WhatsApp y Telegram", "Reportes", "Integraciones", "Alertas"],
    lamina: "flujo",
    laminaAlt:
      "Tres pasos encadenados con un dato que los recorre solo, una y otra vez.",
    seoTitulo: "Automatización de procesos y bots de WhatsApp en Uruguay",
    seoDescripcion:
      "Automatizamos las tareas repetitivas de tu empresa: bots de WhatsApp y Telegram, reportes automáticos, integraciones y alertas. Estudio en Montevideo.",
    h1: "Automatizaciones para empresas en Uruguay",
    intro:
      "Toda empresa tiene una tarea que alguien hace a mano todas las semanas y que nadie quiere hacer. Copiar pedidos de WhatsApp a una planilla, armar el mismo reporte todos los lunes, avisar uno por uno que llegó la mercadería. Eso se puede ejecutar solo, y casi siempre se amortiza en meses.",
    bloques: [
      {
        titulo: "Bots de WhatsApp y Telegram",
        cuerpo:
          "En Uruguay el negocio pasa por WhatsApp, y eso está bien hasta que el volumen supera a la persona que contesta. Un bot puede tomar el pedido, responder las preguntas de siempre —horarios, precios, si hay stock, dónde están—, agendar un turno y pasarle la conversación a una persona cuando hace falta una persona de verdad. No es para reemplazar la atención: es para que quien atiende llegue a la consulta que importa sin haber contestado cuarenta veces a qué hora abren.",
      },
      {
        titulo: "Reportes que se arman solos",
        cuerpo:
          "Si alguien de tu equipo dedica la mañana del lunes a juntar números de tres lugares y pegarlos en una planilla, esa mañana se puede recuperar entera. Conectamos las fuentes, armamos el reporte y lo dejamos programado: llega al correo o al grupo de WhatsApp a la hora que definas, ya hecho. Y como lo genera siempre el mismo proceso, deja de tener los errores de copiar y pegar.",
      },
      {
        titulo: "Integraciones entre sistemas",
        cuerpo:
          "El caso típico: la facturación está en un lado, los pedidos en otro y el stock en una planilla, y hay alguien que pasa datos de uno a otro todo el día. Conectamos lo que ya usás para que el dato viaje solo. No proponemos cambiar todo el software de la empresa; proponemos que las piezas que ya funcionan dejen de necesitar un intermediario humano.",
      },
      {
        titulo: "Alertas cuando algo se sale de lo normal",
        cuerpo:
          "Avisos automáticos cuando el stock baja de un umbral, cuando un pago no entró, cuando un pedido lleva demasiado sin despachar o cuando el sitio se cae. La gracia de una alerta bien puesta es que te enterás antes que el cliente, que es la diferencia entre resolver un problema y pedir disculpas por uno.",
      },
      {
        titulo: "Por dónde empezamos",
        cuerpo:
          "Por la tarea que más horas consume, no por la más fácil de automatizar. En la primera charla hacemos una cuenta simple: cuántas veces por semana se hace, cuánto lleva cada vez y cuánto vale esa hora. Con eso se ve solo qué conviene automatizar primero y qué no vale la pena tocar. A veces la respuesta honesta es que no amerita, y también te lo decimos.",
      },
    ],
    faq: [
      {
        pregunta: "¿Qué tareas conviene automatizar primero?",
        respuesta:
          "Las que se repiten seguido, siguen siempre los mismos pasos y no requieren criterio. Cargar datos de un lado a otro, mandar el mismo mensaje, generar el mismo reporte. Las que dependen de una decisión distinta cada vez conviene dejarlas en manos de una persona: automatizar una decisión que cambia termina generando más trabajo del que ahorra.",
      },
      {
        pregunta: "¿Un bot de WhatsApp puede usar mi número actual?",
        respuesta:
          "Depende de cómo lo tengas. Con la API oficial de WhatsApp Business se puede usar el número del negocio, pero ese número deja de poder usarse en la app común del teléfono. En la primera charla revisamos tu caso y te decimos qué implica, incluidos los costos que cobra la plataforma aparte del desarrollo.",
      },
      {
        pregunta: "¿Tengo que cambiar los sistemas que ya uso?",
        respuesta:
          "No es la idea. Casi siempre se puede conectar lo que ya está. Solo recomendamos reemplazar algo cuando esa herramienta es justamente la que genera el trabajo manual y no tiene forma de conectarse con nada.",
      },
      {
        pregunta: "¿Qué pasa si la automatización falla?",
        respuesta:
          "Se diseña asumiendo que en algún momento algo va a fallar. Cada proceso deja registro de lo que hizo, reintenta cuando el error es pasajero y avisa a una persona cuando no lo es. Una automatización silenciosa que se rompe sin que nadie se entere es peor que no tenerla.",
      },
    ],
  },
  {
    num: "03",
    slug: "sistemas-a-medida",
    titulo: "Sistemas a medida",
    cuerpo:
      "Turnos, pedidos o control de stock. Una función bien resuelta antes que un sistema entero que después nadie abre.",
    entregables: ["Turnos y agenda", "Pedidos", "Control de stock", "Fichas de clientes"],
    lamina: "grilla",
    laminaAlt:
      "Una grilla de turnos que se va ocupando casillero por casillero.",
    seoTitulo: "Sistemas de gestión a medida en Montevideo, Uruguay",
    seoDescripcion:
      "Software de gestión a medida para empresas uruguayas: turnos y agenda, pedidos, control de stock y fichas de clientes. Desarrollo propio, sin licencias.",
    h1: "Sistemas de gestión a medida",
    intro:
      "Cuando el software enlatado no hace lo que tu negocio necesita y la planilla ya no da abasto, el camino es un sistema propio. Pero no uno enorme: empezamos por la función que más duele, la dejamos andando, y recién después crece.",
    bloques: [
      {
        titulo: "Turnos y agenda",
        cuerpo:
          "Para consultorios, talleres, peluquerías, estudios y cualquier negocio que venda tiempo. El cliente reserva solo desde el celular, el sistema no deja superponer dos turnos y manda el recordatorio antes. Las ausencias sin aviso bajan cuando llega un mensaje el día anterior, y ese solo efecto suele pagar el sistema.",
      },
      {
        titulo: "Pedidos",
        cuerpo:
          "Tomar el pedido, verlo en una pantalla ordenado por estado y saber en qué punto está cada uno. Reemplaza la cadena de WhatsApp donde el pedido de ayer quedó tapado por los mensajes de hoy. Quien produce ve lo que tiene que hacer y quien vende ve qué prometer sin tener que preguntar.",
      },
      {
        titulo: "Control de stock",
        cuerpo:
          "Qué hay, dónde está y cuándo hay que reponer. Con alertas cuando algo baja del mínimo y con el movimiento registrado, así se puede reconstruir qué pasó en vez de discutirlo. No hace falta que sea un sistema de inventario completo: la mayoría de los negocios necesita saber bien diez cosas, no llevar quinientas.",
      },
      {
        titulo: "Fichas de clientes",
        cuerpo:
          "El historial de cada cliente en un lugar: qué compró, qué se le hizo, qué se le prometió y quién lo atendió la última vez. Es lo que evita que la información se vaya de la empresa cuando se va la persona que la tenía en la cabeza.",
      },
      {
        titulo: "Una función primero, el sistema después",
        cuerpo:
          "El error más caro en software a medida es querer resolver todo en la primera versión. Se van seis meses, sale un sistema enorme, y el equipo sigue usando la planilla porque el sistema es más incómodo que la planilla. Preferimos al revés: una función bien resuelta, en producción, usándose. Si funciona, se le agrega la siguiente. Si no, perdiste semanas y no meses.",
      },
      {
        titulo: "Sin licencias mensuales",
        cuerpo:
          "El sistema es tuyo. No hay cuota por usuario ni una plataforma que suba el precio el año que viene. Se paga el desarrollo y después solamente el hosting, que para la escala de un negocio chico o mediano es una cifra menor. El código queda en un repositorio al que tenés acceso.",
      },
    ],
    faq: [
      {
        pregunta: "¿Conviene un sistema a medida o uno enlatado?",
        respuesta:
          "Si existe un producto que hace el 90% de lo que necesitás, compralo: va a salir más barato y te lo mantiene otro. El sistema a medida tiene sentido cuando tu proceso es distinto al del resto del rubro, cuando el enlatado te obliga a trabajar de una forma que no es la tuya, o cuando la suma de licencias por usuario ya supera lo que costaría desarrollarlo. Te lo decimos derecho en la primera charla, aunque la respuesta sea que no nos contrates.",
      },
      {
        pregunta: "¿Se puede conectar con mi facturación?",
        respuesta:
          "En general sí, según qué uses. Muchos sistemas de facturación uruguayos tienen forma de conectarse, y cuando no la tienen se puede resolver con exportaciones automáticas. Es de las primeras cosas que revisamos, porque cargar dos veces lo mismo es exactamente lo que veníamos a evitar.",
      },
      {
        pregunta: "¿Funciona en el celular?",
        respuesta:
          "Sí. Se hace pensando en el teléfono primero, porque en la mayoría de los negocios quien carga los datos está parado en un mostrador o en un taller, no sentado frente a una computadora. Se abre desde el navegador y se puede instalar en la pantalla de inicio como una app.",
      },
      {
        pregunta: "¿Y si después necesito cambiar algo?",
        respuesta:
          "Es lo esperable: los sistemas que se usan cambian. Después de entregar queda una ventana de soporte incluida para ajustes, y lo que venga después se presupuesta aparte. Como el código es tuyo, tampoco dependés de nosotros para hacerlo.",
      },
    ],
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
  /* El que te llega a vos con la consulta. Va sin título ni cintillo: el asunto
     ya dice qué es y de quién, y todo lo demás era decoración que lo mandaba a
     Promociones. */
  aviso: {
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

  /* páginas interiores
     El enlace que las conecta con la home. Sin esto quedan huérfanas: una URL
     que está en el sitemap pero que no enlaza nadie desde adentro del sitio la
     rastrean tarde y la valoran poco. */
  verServicio: (titulo: string) => `Todo sobre ${titulo.toLowerCase()}`,
  verCaso: "Ver el caso",
  migasInicio: "Inicio",
  migasServicios: "Servicios",
  migasObra: "Obra",
  migasNombre: "Miga de pan",
  subFaq: "Preguntas frecuentes",
  subIncluye: "Qué incluye",
  subOtros: "Otros servicios",
  subOtrosCasos: "Otros proyectos",
  subCaso: "El caso",
  subStack: "Con qué está hecho",
  subAnio: "Año",
  subVerSitio: "Ver el sitio en vivo",
  /* El cierre de toda página interior: quien terminó de leer ya sabe si le
     sirve, y en ese punto tiene que haber dónde escribir sin volver a la home. */
  subCierreTitulo: "¿Te sirve algo de esto?",
  subCierreCuerpo:
    "Contanos qué necesitás resolver y lo evaluamos juntos. La primera consulta no tiene costo y si no amerita un desarrollo, te lo decimos.",
  subCierreAccion: "Escribinos",

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
