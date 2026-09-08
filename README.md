# Kalabs

Landing/portfolio de una página para **Kalabs**, estudio digital de Montevideo,
Uruguay. Desarrollo web, automatizaciones y sistemas a medida.

## Dirección de diseño

**Broadsheet brutalista**: un diario impreso llevado al extremo.

La versión anterior era brutalismo web de manual —grotesca 900 en versalita
con tracking cerrado, mono con mucho tracking para las microetiquetas,
secciones numeradas `00/01/02`, wordmark gigante partido en dos, marquesina
infinita, riel de estado con reloj en vivo—. Cada una de esas decisiones es
defendible por separado; juntas son la receta que produce cualquier modelo
cuando se le pide "brutalista", y se reconoce a un metro.

El cambio de fondo es de dónde sale el maximalismo: ya no de efectos sino de
**densidad de tipografía y de filetes**. Todo lo que acá parece adorno es una
convención de imprenta con siglos encima.

- **La portada presenta y deja pasar.** Cintillo con los datos del estudio,
  cabecera a filete doble con el nombre en caja baja y al ras, y un único
  recuadro al margen derecho con la forma de trabajo. Nada centrado, nada
  flotando en el medio de la pantalla, y ningún párrafo de relleno: lo que hay
  para decir lo dicen Servicios, Proyectos y Contacto.
- **El cabezal de sección se comparte.** Antetítulo, título y bajada, iguales
  en las tres secciones interiores, para que el sitio se lea como una sola
  pieza. La numeración `00/01/02` en mono es un tic de plantilla y no está.
- **No hay cajas.** Ni en servicios, ni en proyectos, ni en el formulario. Lo
  que separa es el aire y, donde hace falta, un filete. Una página llena de
  recuadros con fondo propio se lee como una planilla: cada módulo se defiende
  solo y ninguno respira. Los dos únicos planos de color pleno que quedan son
  el cierre de Servicios y la cita de Contacto, y los dos son eso justamente
  porque son la excepción.
- **Proyectos entra en una pantalla.** Los tres en fila, y el conjunto
  —cabezal, capturas y cierre— dentro de un viewport. La altura no la fija el
  contenido: la sección es una columna flexible y las capturas se estiran para
  llenar lo que sobra, así que en un monitor alto se ven grandes y en uno bajo
  más chicas, pero nunca hay scroll de más. Antes cada proyecto se comía su
  propia pantalla y había que bajar tres veces para enterarse de qué hace el
  estudio. Ninguna nota lleva stack: al cliente que la mira no le dice nada
  que haya Supabase abajo.
- **Los servicios son una composición, no una lista.** Los tres en columnas:
  el 01 se queda con media plana en cuerpo grande, el 02 y el 03 se reparten
  la otra mitad en cuerpo chico. La jerarquía la hace el tamaño de la letra y
  el numeral en bordo, no un recuadro. Abajo cruza la banda de **cómo
  trabajamos** y cierra el plano naranja.

  Hubo tres versiones antes de esta. Las dos primeras fallaban por lo mismo
  aunque se vieran distinto: eran tres bloques iguales apilados a lo largo de
  la página, y el ojo leía "tres cosas, una atrás de otra". La tercera las
  metió en una grilla de recuadros y falló por lo contrario: tanto borde
  convertía la sección en una planilla.

  La forma de trabajo vive acá y no en la portada: ahí llegaba antes de que
  nadie supiera qué hacemos. A todo el ancho los tres pasos entran en columnas
  numeradas y se leen como una secuencia, no como viñetas.
- **El filete de cada sección se dibuja.** No es un `border-top`: es un
  elemento propio que crece en X desde el margen izquierdo cuando la sección
  entra en pantalla, como la regla que se tira antes de componer una página.
  Es el mismo gesto que hace la caja de composición de la portada, y es lo que
  ata las dos puntas del sitio.
- **Los servicios van antes que los proyectos.** Primero qué podemos hacer por
  quien llega, después la prueba de que sabemos hacerlo.
- **Cada proyecto se muestra, no se cuenta.** La captura es del sitio en vivo
  y la nota entera enlaza ahí. Antes había maquetas dibujadas en SVG: servían
  de sustituto, pero cualquiera nota que no son el producto. Encima va una
  viñeta animada que pone en movimiento lo que el proyecto hace —una grúa que
  cruza, un mes que se llena, un pistón que trabaja—.
- **La portada va a sangre; el resto, en la caja.** Los filetes de la portada
  cruzan la pantalla entera, pero su contenido se mete hasta la misma línea
  que las secciones de abajo (`--sangria`), así el wordmark arranca donde
  arrancan los cabezales. Todo lo demás se compone dentro de `--ancho`
  (1440px): sin tope, en un monitor de 2560 la línea de texto se estira hasta
  donde el ojo ya no vuelve solo al margen izquierdo.
- **La caja de composición.** Al costado del nombre hay una página armándose
  sola: bajan los corondeles, entra el titular, se llenan las líneas de texto
  y aparece el recuadro de foto con su aspa; cuando la maqueta está completa
  se levanta y empieza otra de las tres. No es un mockup de navegador ni una
  terminal con código corriendo —los dos clichés del rubro—: es el mismo
  vocabulario del sitio puesto en movimiento. Aparece recién a partir de
  1100px, porque abajo de eso el wordmark ocupa la cabecera entera.
- **La barra al pie reemplaza al riel de estado.** El reloj en vivo y la barra
  de progreso eran decoración retrofuturista que no le servía a nadie; la
  barra dice en qué sección estás y te lleva a otra, que es lo que hace falta.
- **La greca aparece una sola vez**, como orla superior de la portada. Son
  cuatro tramas ortogonales (`zigzag`, `rombo`, `escalera`, `trama`)
  construidas a base de escalones —geometría abstracta inspirada en el textil
  sudamericano, sin citar ningún símbolo concreto—. Es lo más propio que tiene
  el sitio, y por eso vale más una que diez repartidas.
- **El equipo son dos fichas sobrias** al pie: nombre, oficio y el enlace al
  LinkedIn. Sin biografías.
- **La portada entra sin JavaScript.** El escalonado lo hace CSS con
  `animation-delay`, así el contenido más importante no queda en `opacity: 0`
  esperando a que cargue un bundle.

### Paleta

Toda cálida: naranja y bordo sobre cuatro negros. No hay acento frío —la
jerarquía la hacen los tonos de fondo y el peso tipográfico, no un segundo
color.

| Rol | Token | Valor |
| --- | --- | --- |
| Fondo | `--ink` | `#0f1214` — carbón frío |
| Fondo 2 / 3 / 4 | `--ink-2` `--ink-3` `--ink-4` | `#161a1c` `#1e2325` `#262c2f` |
| Texto | `--bone` | `#efe7d6` — hueso cálido |
| Texto apagado | `--bone-dim` | `#b9b2a4` |
| Acento | `--ember` | `#ff6b1a` — lo activo, lo que se toca |
| Acento quemado | `--ember-dim` | `#db6a20` — segunda voz del mismo acento |
| Estructura | `--terra` | `#9c3f26` — bordo: líneas, bordes y planos |
| Estructura oscura | `--terra-dim` | `#6b2b1a` |

### Tipografía

**Dos familias, no más.** Una redonda y una cursiva; cada rol sabe a cuál
pertenece. Las dos de Google Fonts, cargadas con `next/font`.

| Familia | Rol | Por qué |
| --- | --- | --- |
| **Fraunces** | Titulares, siempre vertical | Variable, con dos ejes que casi ninguna otra tiene: `SOFT` redondea los remates y `WONK` mete las formas torcidas de la itálica dentro de la redonda. Con los dos al máximo la letra deja de verse calculada. |
| **Newsreader** | Cuerpo, bajadas y datos | Serif editorial, pensada para párrafos largos. El serif es lo que da la sensación de que atrás hay alguien. |

Las reglas que sostienen el sistema:

- **Una sola cursiva: la itálica de Newsreader.** Fraunces nunca va inclinada
  —su inquietud ya viene del eje `WONK`— y la itálica no se usa para enfatizar
  dentro de un párrafo: marca un solo rol, el de la voz que explica (bajadas,
  valores, pies).
- **Los titulares van en caja baja.** La versalita 900 con tracking cerrado es
  el titular que escribe todo el mundo.
- **Los datos van en versalitas, no en monoespaciada.** Una tercera familia
  para cuatro etiquetas era una voz de más.

### Rugosidad

El "Kalabs" de la cabecera lleva un filtro SVG que le come el borde por
desplazamiento de ruido (`components/Rugosidad.tsx`): el efecto es el de una
letra entintada sobre papel poroso, y el trazo pierde el filo perfecto que
delata a la pantalla.

**Va en un solo elemento de todo el sitio.** Aplicado a todos los titulares la
textura dejaba de ser un acento y se volvía ruido de fondo: a esa escala
compite con el texto en vez de sostenerlo. Un elemento rugoso contra tres
páginas de letra limpia se nota más que veinte.

Se aplica sobre texto vivo: sigue siendo seleccionable, indexable y legible por
un lector de pantalla, y si el navegador no soporta el filtro la letra se ve
nítida y no se pierde nada.

> **Cuidado si se extiende a otro elemento.** `filter` convierte al elemento en
> bloque contenedor de sus descendientes absolutos. Puesto en un titular que
> adentro tenga el `::after` estirado sobre una ficha, ese overlay se recorta al
> titular y la tarjeta deja de ser clicable entera. En esos casos va en un
> `<span>` interno.

## Accesibilidad

- Contraste verificado sobre `--ink`: hueso 15.3:1, hueso apagado 8.9:1,
  naranja 6.6:1, naranja quemado 5.5:1, bordo aclarado 5.5:1 (4.6:1 sobre
  `--ink-3`, el fondo más claro donde aparecen). Hueso sobre bordo 5.4:1.
- **El bordo (`--terra`, 2.8:1) nunca lleva texto.** Es filete, borde y plano
  de fondo; cuando es fondo, el texto encima va en hueso. Para los datos y las
  marcas de listado está `--terra-lit`, que es el mismo tono aclarado hasta
  pasar AA. Si hace falta bordo sobre texto, se usa ése.
- Foco de teclado visible en todo el sitio (contorno naranja de 3px).
- Ningún estado se transmite sólo con color: lleva la palabra completa
  (`En producción`, `Desarrollo y sistemas`).
- Se respeta `prefers-reduced-motion`: no hay entradas por scroll ni escalonado
  de portada. El contenido aparece directamente visible, no oculto esperando un
  disparador.
- Con JavaScript deshabilitado el contenido sigue visible: hay un `<noscript>`
  que neutraliza el estado inicial que Motion escribe en el HTML servido.
- Enlace "Saltar al contenido", jerarquía de encabezados `h1 → h2 → h3` y
  todas las tramas SVG marcadas como decorativas.

## Stack

- Next.js (App Router) + React + TypeScript
- CSS Modules + custom properties — sin framework de estilos, para que el
  layout no arrastre las convenciones de nadie
- [Motion](https://motion.dev) para las entradas por scroll
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
- **Georgia y no Fraunces.** Un correo no puede cargar fuentes con garantías,
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

- **Con movimiento reducido no alcanza con no animar.** Motion escribe
  `opacity: 0` inline en el HTML servido, así que hay que pedirle explícitamente
  el estado final en el montaje o el bloque queda invisible para siempre. Eso
  resuelve `entrada()` en `components/mov/entrada.ts`.
- **Un componente por sección, con su CSS Module al lado.** `Portada`,
  `Servicios`, `Proyectos` y `Contacto`, más `Folio` para la barra del pie;
  `Formulario` toma sus estilos de `Contacto.module.css` porque vive dentro de
  esa ficha.
- **Las capturas se versionan, no se piden en vivo.** Están en
  `public/proyectos/` y se refrescan con `node scripts/capturas.mjs` cuando
  alguno de los proyectos cambia de portada. Playwright no es dependencia del
  sitio: se usa con `pnpm dlx` y nada más, porque meter un navegador de 300 MB
  en las dependencias de un sitio estático no se justifica por tres PNG. Que
  las imágenes estén en el repo también significa que el build no depende de
  que los otros sitios estén levantados.
- **La URL de cada captura es la primera pantalla real**: la portada si el
  proyecto tiene una, el alta si vive detrás de un login.
- **El enlace del proyecto envuelve al título y se estira con `::after`.**
  Toda la ficha es clicable, pero el destino que anuncia un lector de pantalla
  es el nombre del proyecto y el foco de teclado se dibuja sobre el texto, no
  sobre la tarjeta entera.

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
