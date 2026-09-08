# Kalabs

Landing/portfolio de una página para **Kalabs**, estudio digital de Montevideo,
Uruguay. Desarrollo web, automatizaciones y sistemas a medida.

## Dirección de diseño

**Papel cálido, tinta encima y un solo plano de color.** El sitio pregunta
antes de contar nada, muestra la obra a tamaño de pantalla y recién después
dice qué hacemos.

Antes de esto hubo dos direcciones. La primera era brutalismo web de manual
—grotesca 900 en versalita, mono con mucho tracking, secciones numeradas
`00/01/02`, wordmark partido en dos, marquesina infinita, riel con reloj en
vivo—: la receta que produce cualquier modelo cuando se le pide «brutalista».
La segunda fue un broadsheet: un diario impreso con filetes de tres grosores,
cintillo, folio al pie y una greca de orla. Se leía bien y era coherente, pero
el vocabulario de imprenta terminó siendo decorativo —la metáfora no
trabajaba— y los proyectos quedaban en tres capturas de 400px en fila.

Lo que hay ahora salió de mirar dieciocho portadas de estudios
([`docs/referencias/`](docs/referencias/)) y de tres propuestas completas
([`docs/propuestas/`](docs/propuestas/)): base **Vidriera** —papel, pastillas,
redondeos, la pregunta de entrada, los servicios que se abren, el banner en
movimiento— con la forma de mostrar los proyectos de **Cartel** —el plano de
brasa con la inicial gigante detrás y el índice de filas—.

- **La portada no titula: pregunta.** «Contanos qué hay que resolver», y abajo
  un campo de texto. Quien llega no viene a leer lo que el estudio dice de sí
  mismo, viene con un problema. Lo que escriba viaja al formulario de contacto
  y cae en el mensaje con el foco al final, así no lo escribe dos veces. Si lo
  manda vacío, baja igual al formulario: un campo que no hace nada cuando lo
  apretás es peor que uno que no está.
- **La obra va en dos tiempos.** Arriba la escena: un plano de brasa con la
  inicial del estudio derivando de fondo y un proyecto por vez, grande,
  rotando solo. Abajo el índice: cuatro filas para ir directo a uno, y con
  mouse la captura sigue al cursor. Las dos piezas no se pisan —la escena
  muestra, el índice lista— y entre las dos el proyecto pasó de una captura de
  400px a llevarse la pantalla.
- **La cuarta fila del índice es «Tu proyecto acá».** Escrita con la misma
  tipografía y en el mismo renglón que los tres que sí existen. Dicha aparte,
  en un bloque de cierre, se lee como aviso; dicha ahí, se lee como el que
  sigue.
- **Los servicios no van numerados.** Ninguno de los dieciocho estudios de
  referencia tiene una sección `01 · 02 · 03`, y ese numeral es lo que más
  delata una landing armada con plantilla. Son tres fichas que se abren:
  cerradas, la sección entera entra en una pantalla; abierta, cada una cuenta
  lo suyo. Son `<details>` nativos, así que funcionan sin JavaScript.
- **El banner corta la página en dos.** Arriba lo que hicimos y lo que
  hacemos, abajo cómo escribirnos. Las tres promesas cruzan en movimiento y la
  cinta **se frena al pasarle el mouse**: una cinta que no para no se puede
  leer, y eso es justo lo que alguien quiere terminar de leer.
- **Un solo plano de color pleno**: la escena de la obra. La brasa dejó de ser
  detalle y pasó a ser fondo; el bordo quedó como segunda voz para rótulos y
  palabras marcadas.
- **Lo que agrupa es una curva, lo que separa es un filete de un pixel.** El
  radio de 24px es el mismo en la escena, en las fichas de servicio, en el
  formulario y en el pie. No hay cajas con borde compitiendo entre sí.
- **La navegación son cuatro pastillas arriba.** Antes era una barra fija al
  pie que marcaba en qué sección estabas. Marcaba bien y no la usaba nadie: en
  un sitio de una página, saber que estás en «Proyectos» no es información.
- **El equipo son dos personas con sus iniciales**, pegado al formulario y no
  en una sección propia: quien está por escribir quiere saber a quién le
  escribe justo en ese momento, no tres pantallas antes. Iniciales y no fotos
  —dos fotos de perfil recortadas en círculo son lo que hace que un estudio
  parezca una plantilla de agencia—.
- **La portada entra sin JavaScript.** El escalonado lo hace CSS con
  `animation-delay`, así lo primero que se ve no queda en `opacity: 0`
  esperando a que cargue un bundle.

### Paleta

La misma de siempre, dada vuelta: lo que era fondo pasó a ser tinta. Toda
cálida, sin acento frío.

| Rol | Token | Valor |
| --- | --- | --- |
| Fondo | `--papel` | `#f7f2e7` |
| Fondo 2 | `--bone` | `#efe7d6` — fichas cerradas, formulario |
| Tinta | `--ink` | `#0f1214` — carbón frío |
| Tinta 2 | `--ink-2` | `#161a1c` |
| Texto secundario | `--ink-4` | `#262c2f` sobre papel |
| Texto secundario | `--bone-dim` | `#b9b2a4` sobre tinta |
| Acento | `--ember` | `#ff6b1a` — el plano pleno y lo que se toca |
| Acento quemado | `--ember-dim` | `#db6a20` |
| Segunda voz | `--terra` | `#9c3f26` — rótulos y palabras marcadas |
| Segunda voz oscura | `--terra-dim` | `#6b2b1a` |

### Tipografía

**Dos familias, no tres.** Las dos de Google Fonts, cargadas con `next/font`.

| Familia | Rol | Por qué |
| --- | --- | --- |
| **Bricolage Grotesque** | Titulares, nombres de proyecto, botones | Grotesca variable con eje óptico (`opsz`): a cuerpo grande cierra el espaciado y afina las curvas, a cuerpo chico las abre. Ese eje es lo que le da carácter sin necesidad de una display aparte. |
| **Hanken Grotesk** | Cuerpo, rótulos, etiquetas y datos | Sans de lectura, ancha de anchos y tranquila. Aguanta párrafos y también versalitas de 0.7rem. |

Las reglas que sostienen el sistema:

- **No hay monoespaciada.** El texto chico —etiquetas, pastillas, pie— va en
  versalitas de Hanken (`.et`): se distingue por espaciado y peso, no por
  familia. Una mono para escribir «En producción» era una tercera voz que no
  aportaba nada.
- **`opsz` se pide por eje, no por peso.** Pedir el eje óptico obliga a traer
  la variable entera, y con ella el peso queda continuo; una lista de pesos
  junto a `axes` es un error de build, no una optimización.
- **El acento del titular es una palabra, no una línea.** «resolver» en bordo,
  «lo que sea» en brasa: una por sección y nada más.

## Accesibilidad

- Contraste verificado sobre `--papel`: tinta 16.4:1, `--ink-4` 11.5:1, bordo
  6.0:1. Sobre `--ink`: hueso 15.3:1, hueso apagado 8.9:1, brasa 6.6:1. Sobre
  el plano de brasa, la tinta da 6.6:1.
- **La brasa nunca lleva texto chico sobre papel.** Es plano de fondo y botón;
  cuando hace falta acento sobre papel se usa el bordo, que pasa AA.
- Foco de teclado visible en todo el sitio (contorno de brasa de 3px), también
  en las pastillas de servicio del formulario, que son radios escondidos.
- El pase de la obra tiene botón de pausa y arranca pausado si el sistema pide
  movimiento reducido: una imagen que cambia sola y no se puede detener es
  exactamente lo que pide que se apague.
- Con el dedo, los puntos del pase crecen al blanco de 44px con un
  pseudoelemento transparente, sin cambiar de tamaño a la vista.
- Ninguna información se transmite sólo con color: el proyecto activo del pase
  se marca con el punto lleno **y** con `aria-current`, y cada fila del índice
  dice de qué es en palabras.
- Con JavaScript deshabilitado el contenido sigue visible: un `<noscript>`
  neutraliza el estado inicial de las entradas por scroll.
- Enlace «Saltar al contenido», jerarquía de encabezados `h1 → h2 → h3` y la
  inicial gigante de la escena marcada como decorativa.

## Stack

- Next.js (App Router) + React + TypeScript
- CSS Modules + custom properties — sin framework de estilos, para que el
  layout no arrastre las convenciones de nadie
- Sin librería de animación. Estaba Motion y se fue con el rediseño: para un
  fundido de veinte pixeles alcanzan un `IntersectionObserver` de doce líneas
  (`components/Reveal.tsx`) y una transición de CSS.
- Sin base de datos: el formulario envía por una Server Action que llama a la
  API de Brevo, la misma cuenta que autentica el dominio para el correo
  saliente. Es un `fetch`, sin dependencia nueva. Si algún día hay que guardar
  los mensajes en vez de sólo recibirlos, ahí entra Supabase sin tocar el resto.

### El formulario

Antes armaba un `mailto:`. Eso no era un envío: abría el cliente de correo del
visitante y le dejaba a él la última tecla. En el celular muchas veces no abre
nada, y de los que abre, buena parte no le da a enviar. Cada consulta perdida
ahí no dejaba rastro: no había forma de saber cuántas hubo.

- **Pide el correo.** Con `mailto:` no hacía falta —lo ponía el cliente—, pero
  con envío real, sin ese campo llegan consultas que no se pueden contestar.
- **Remite el dominio propio y quien escribió va en `replyTo`.** Mandar con el
  `from` de un tercero es lo que hace que el correo caiga en spam; así el
  mensaje llega firmado por `kalabs.dev` y responder desde la bandeja le llega
  a la persona.
- **Anda sin JavaScript.** Es una Server Action: el navegador hace el POST y
  Next lo atiende igual, en línea con la portada, que también entra sin bundle.
- **Trampa para robots, no captcha.** Un campo fuera de pantalla que ningún
  humano ve ni puede tabular. El captcha le cobra el peaje a la persona
  equivocada.
- **Enviado, el formulario se va y queda el acuse.** Dejar los campos llenos
  invita a apretar otra vez y mandar la misma consulta por duplicado.
- **Si falla, los campos vuelven con lo escrito.** Sin JavaScript la página se
  rerenderiza entera, y perder el mensaje redactado por un campo mal puesto es
  la forma más rápida de que se vaya.

Necesita `BREVO_API_KEY` en el entorno. Sin esa variable el envío responde el
error de servidor y deja el motivo en el log; no falla el build.

### Los dos correos

Cada consulta dispara dos: el **aviso** al estudio y el **acuse** a quien
escribió. El acuse antes no existía —veía la confirmación en pantalla y no le
quedaba nada en la casilla—, y un mail que confirma es también la primera
prueba de que del otro lado hay alguien.

- **El aviso es el que no puede fallar.** Si no sale, la consulta se perdió y
  hay que decirlo. El acuse es cortesía: si Brevo lo rechaza queda en el log y
  no se le muestra un error a alguien cuyo mensaje sí llegó.
- **Las dos plantillas viven en `lib/correos.ts` y el texto en `lib/content.ts`**
  (`CORREO`), igual que el resto del sitio: el markup en un archivo, lo que
  dice en otro.
- **Tablas y estilo en línea.** Es la única forma de que un correo se vea igual
  en Gmail, Apple Mail y Outlook, que compone con el motor de Word y descarta
  casi todo lo demás. Nada de flex, de grid ni de hojas de estilo.
- **Georgia y no la tipografía del sitio.** Un correo no puede cargar fuentes
  con garantías,
  así que se usa la serif que ya está instalada en todos lados.
- **Todo lo que escribió un desconocido se escapa antes de entrar al HTML.** El
  cuerpo lo redacta cualquiera que pase por el formulario; sin eso, una
  etiqueta en el campo mensaje se interpreta al abrir el correo en la bandeja
  del estudio.
- **Los dos llevan versión de texto plano.** No es un trámite: es lo que ve
  quien lee en modo texto y lo que miran los filtros de spam al decidir si esto
  es legítimo.

Las plantillas para escribirle a clientes —primer contacto, presupuesto,
seguimiento, entrega— están en [`docs/plantillas-correo.md`](docs/plantillas-correo.md).
Ésas no son código: van en las plantillas de Gmail.

### Notas de implementación

- **Un componente por sección, con su CSS Module al lado.** `Barra`,
  `Portada`, `Obra`, `Servicios`, `Banner`, `Contacto` y `Pie`; `Formulario`
  toma sus estilos de `Contacto.module.css` porque vive dentro de esa ficha, y
  `Reveal` no tiene módulo propio porque su clase (`.rev`) la usan cinco
  secciones distintas y vive en `globals.css`.
- **Sólo tres componentes son de cliente**: `Portada` —por el campo que manda
  el texto al formulario—, `Obra` —el pase y el espía— y `Formulario`. El resto
  se renderiza en el servidor.
- **Lo que se escribe en la portada llega al formulario por un evento del
  documento** (`EVENTO_CONSULTA`, en `lib/consulta.ts`), no por un estado
  compartido: es un texto que viaja una vez y en un solo sentido, y montar un
  contexto para eso obligaría a volver cliente a todo lo que queda en el medio.
- **La posición del espía se escribe directo en el nodo.** Con estado sería un
  render de React por cada pixel que se mueve el mouse.
- **Las capturas se versionan, no se piden en vivo.** Están en
  `public/proyectos/` y se refrescan con `node scripts/capturas.mjs` cuando
  alguno de los proyectos cambia de portada. Playwright no es dependencia del
  sitio: se usa con `pnpm dlx` y nada más, porque meter un navegador de 300 MB
  en las dependencias de un sitio estático no se justifica por tres PNG. Que
  las imágenes estén en el repo también significa que el build no depende de
  que los otros sitios estén levantados.
- **La URL de cada captura es la primera pantalla real**: la portada si el
  proyecto tiene una, el alta si vive detrás de un login.
- **En el celular la captura va en marco apaisado y anclada arriba a la
  izquierda.** Son capturas de sitios de escritorio: en un marco vertical se
  recortan hasta que no se entienden. Ahí también se le saca el dominio al pie,
  que ocupa media captura para decir lo que ya dice el enlace.

## Desarrollo

Este proyecto usa **pnpm**. No uses `npm` ni `yarn`: el lockfile versionado es
`pnpm-lock.yaml` y el gestor queda fijado en el campo `packageManager` del
`package.json`.

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build
pnpm start
```

Desplegable en Vercel sin configuración extra.

## Dónde tocar el contenido

Todo el texto (servicios, proyectos, equipo, manifiesto, enlaces) vive en
`lib/content.ts`. Los componentes leen de ahí; no hay copy suelto en el
markup.
