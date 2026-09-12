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
  un campo de texto que **se escribe solo**: teclea una consulta —«un bot de
  WhatsApp para pedidos», «un sistema de turnos para el taller»—, parpadea el
  cursor, la borra y sigue con la próxima. Es el campo mostrando para qué
  sirve en vez de explicarlo. Se corta al enfocarlo —seguir escribiendo debajo
  del cursor de alguien que está por escribir es pelearle el campo— y vuelve
  si se va sin dejar nada. Con `prefers-reduced-motion` no arranca: un texto
  que se escribe y se borra solo es exactamente lo que molesta a quien pidió
  menos movimiento. Quien llega no viene a leer lo que el estudio dice de sí
  mismo, viene con un problema. Lo que escriba viaja al formulario de contacto
  y cae en el mensaje con el foco al final, así no lo escribe dos veces. Si lo
  manda vacío, baja igual al formulario: un campo que no hace nada cuando lo
  apretás es peor que uno que no está.
- **La obra va en dos tiempos.** Arriba la escena: un plano de brasa con el
  isotipo saliendo por la esquina de abajo a la derecha y un proyecto por vez,
  grande, rotando solo. Abajo el índice: cuatro filas para ir directo a uno, y con
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
- **El equipo son dos personas con sus iniciales**, en su propia sección entre
  los servicios y el banner. Estuvo colgado de la columna de contacto, que era
  más lindo argumento —quien está por escribir quiere saber a quién le
  escribe— y estaba mal: la pastilla «Estudio» de la barra llevaba más abajo
  que «Escribinos», que está a su derecha. **El orden de las secciones es el
  orden en que las nombra la barra**, y eso manda sobre cualquier otra cosa:
  dos enlaces contiguos que bajan al revés hacen dudar de si la navegación
  hace lo que dice. Iniciales y no fotos —dos fotos de perfil recortadas en
  círculo son lo que hace que un estudio parezca una plantilla de agencia—.
- **La portada entra sin JavaScript.** El escalonado lo hace CSS con
  `animation-delay`, así lo primero que se ve no queda en `opacity: 0`
  esperando a que cargue un bundle.

### El isotipo

La K de trazo, en `components/Marca.tsx`. Un solo `path`, en `currentColor`:
el mismo componente sirve en brasa sobre papel (barra, pie), en tinta sobre el
plano de brasa (la esquina de la escena) y en brasa sobre tinta (el favicon).

- **Va en `--ember` y no en el `#f75e1b` del archivo original.** Dos naranjas
  casi iguales conviviendo se leen como un error de impresión, no como dos
  colores.
- **En la escena sale por la esquina, no centrado.** Centrado y grande, la
  captura le tapa el medio y lo que asoma son cuatro puntas negras que no se
  leen como nada; en la esquina se ve el brazo largo y el remate, que es todo
  lo que hace falta para reconocerlo.
- **En la barra y en el pie va con el nombre al lado.** El trazo solo todavía
  no lo reconoce nadie; cuando la marca tenga kilómetros encima, el nombre
  puede irse.
- El `viewBox` quedó recortado al trazo y con una sola matriz: el archivo
  venía con tres transformaciones anidadas y el dibujo a 5.000 unidades del
  origen, que hace imposible escalarlo sin recalcular todo.

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
- **El campo de la portada tiene `aria-label` fijo.** El placeholder cambia
  solo; un lector de pantalla no puede quedar atado a un texto que se está
  escribiendo y borrando, así que el nombre accesible es otro y no se mueve.
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
- Sin base de datos: el formulario envía por una Server Action que manda un
  correo por el SMTP de Gmail. Si algún día hay que guardar los mensajes en vez
  de sólo recibirlos, ahí entra Supabase sin tocar el resto.

### El formulario

Antes armaba un `mailto:`. Eso no era un envío: abría el cliente de correo del
visitante y le dejaba a él la última tecla. En el celular muchas veces no abre
nada, y de los que abre, buena parte no le da a enviar. Cada consulta perdida
ahí no dejaba rastro: no había forma de saber cuántas hubo.

- **Pide el correo.** Con `mailto:` no hacía falta —lo ponía el cliente—, pero
  con envío real, sin ese campo llegan consultas que no se pueden contestar. Va
  en el `Reply-To`, así que apretar «responder» en la bandeja le escribe a quien
  completó el formulario.
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

Necesita `GMAIL_USUARIO` y `GMAIL_CLAVE_APP` en el entorno. Sin esas variables el
envío responde el error de servidor y deja el motivo en el log; no falla el
build.

### El correo del formulario

Cada consulta manda **un** correo: el aviso al estudio. Sale por
`smtp.gmail.com` con la cuenta del estudio, que es la misma bandeja donde caen
`hola@`, `lautaro@` y `matias@` por Cloudflare Email Routing. Es Gmail
mandándose un correo a sí mismo: sin servicio en el medio, sin cuota que
vigilar, sin nada que autenticar en el DNS.

- **El `from` es `hola@kalabs.dev` y no la casilla de Gmail.** Gmail lo respeta
  porque esa dirección está verificada como «Enviar como» en la cuenta. Si
  dejara de estarlo, reescribe el remitente por el de la cuenta sin avisar —es
  el único hilo del que cuelga esto.
- **Quien escribió va en el `Reply-To`.** Apretar «responder» en la bandeja le
  escribe a la persona. Poner su dirección en el `from` sería lo que manda un
  correo a spam: ni el SPF ni el DKIM firman a nombre de nadie más.
- **El correo es el único rastro de la consulta.** No hay base de datos ni copia
  en ningún lado, así que si no sale hay que decirlo en pantalla: el error manda
  a escribir directo a la casilla del estudio.
- **El transporte vive en el módulo, con pool y tres tiempos de espera.** Fluid
  Compute reutiliza la instancia, así que dos consultas seguidas comparten la
  conexión TLS. Sin los tiempos de espera, un SMTP que acepta el socket y se
  queda mudo cuelga la Server Action hasta el tope de la función —300 segundos—
  con la persona mirando el botón en «Enviando…».
- **Si el envío falla, el transporte se descarta.** Una conexión del pool
  envenenada —Gmail cortó la sesión, la clave de aplicación se revocó— haría
  fallar también todas las consultas que vengan después.

#### El acuse que no está

Hubo un segundo correo: un acuse automático para quien escribía, con el diseño
del sitio. Se fue con Brevo y no volvió. Mandarle un correo autenticado a un
desconocido pide un DKIM del dominio propio, y el dominio ya no firma nada:
Gmail gratis firma como `gmail.com`. La confirmación la da la pantalla
(`UI.form.okTitulo`), que no promete un mail que no va a llegar, y la respuesta
la escribe una persona dentro de las 24 horas.

El DNS quedó, entonces, con lo mínimo: los MX de Email Routing para recibir, el
DKIM que Cloudflare pone solo para firmar lo que reenvía, y un SPF que habilita
a Google. DMARC va en `p=none` y no más duro: Gmail gratis firma como
`gmail.com`, así que para `kalabs.dev` no alinea nunca y algo más estricto
rebotaría nuestras propias respuestas.

Las plantillas para escribirle a clientes —primer contacto, presupuesto,
seguimiento, entrega— están en [`docs/plantillas-correo.md`](docs/plantillas-correo.md).
Ésas no son código: van en las plantillas de Gmail, y ahora cargan con el acuse
que antes mandaba el servidor.

### Notas de implementación

- **Un componente por sección, con su CSS Module al lado.** `Barra`,
  `Portada`, `Obra`, `Servicios`, `Estudio`, `Banner`, `Contacto` y `Pie`; `Formulario`
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
