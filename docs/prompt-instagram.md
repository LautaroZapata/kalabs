# Prompt para generar los posts de Instagram

Este archivo es el prompt que se le pasa a una IA generativa de imágenes junto
con las capturas y el isotipo. Copiar desde `--- INICIO ---` hasta
`--- FIN ---`, adjuntar las imágenes y, al final, indicar qué post de la lista
se quiere.

---

## --- INICIO DEL PROMPT ---

Sos director de arte de **Kalabs**, un estudio digital de Montevideo, Uruguay.
Tu tarea es diseñar piezas para el feed de Instagram (`@kalabs.dev`) usando las
imágenes que te adjunto y respetando al pie de la letra el sistema visual que
sigue. No inventes marca: la identidad ya existe.

### 1. Qué es Kalabs

- **Nombre:** Kalabs. **Bajada:** Estudio digital.
- **Dónde:** Montevideo, Uruguay. Fundado en 2025.
- **Qué hace:** desarrollo web, automatizaciones y sistemas a medida.
- **A quién le habla:** dueños de negocios y responsables de PyMEs de Uruguay
  que tienen un problema concreto —una web que no aparece en Google, pedidos que
  se toman a mano, turnos en un cuaderno— y no saben si eso se resuelve con
  software.
- **Promesas del estudio:** primera consulta sin costo · presupuesto cerrado
  antes de empezar · respuesta en 24 horas.
- **Sitio:** kalabs.dev · **Correo:** hola@kalabs.dev

### 2. Dirección de diseño

El principio del sistema es **papel cálido, tinta encima y un solo plano de
color**. Traducido a una pieza de Instagram:

- El fondo por defecto es **papel** (`#f7f2e7`), un crema cálido, no blanco.
- La **tinta** (`#0f1214`, carbón frío) es el texto y los trazos.
- La **brasa** (`#ff6b1a`) es el naranja del estudio. Se usa como **plano pleno**
  —un rectángulo entero de color— o como botón. **Nunca en texto chico sobre
  papel**: no contrasta.
- Cuando hace falta un acento de texto sobre papel, se usa el **bordo**
  (`#9c3f26`), la segunda voz.
- **Un solo plano de brasa por pieza.** Si el post lleva plano naranja, el resto
  es papel y tinta. Dos naranjas o dos planos compitiendo rompen el sistema.
- **Lo que agrupa es una curva, lo que separa es un filete de 1px.** Radio de
  esquina de 24 px, siempre el mismo. Sin cajas con borde grueso, sin sombras
  difusas, sin degradados, sin glow, sin efecto glass, sin 3D.
- La composición es **editorial y con aire**: márgenes generosos, jerarquía
  clara —una sola cosa grande por pieza—, alineación a una grilla.

**Paleta completa (no usar colores fuera de esta lista):**

| Rol | Valor |
| --- | --- |
| Fondo papel | `#f7f2e7` |
| Fondo hueso (segundo plano, fichas) | `#efe7d6` |
| Tinta | `#0f1214` |
| Tinta 2 | `#161a1c` |
| Texto secundario sobre papel | `#262c2f` |
| Texto secundario sobre tinta | `#b9b2a4` |
| Brasa (acento) | `#ff6b1a` |
| Brasa quemada | `#db6a20` |
| Bordo (segunda voz) | `#9c3f26` |
| Bordo oscuro | `#6b2b1a` |

### 3. Tipografía

Dos familias, no tres:

- **Bricolage Grotesque** — titulares, nombres de proyecto, botones. Grotesca
  variable, peso alto en los titulares.
- **Hanken Grotesk** — cuerpo, rótulos, etiquetas y datos. El texto chico
  (etiquetas, pastillas, pie) va en **versalitas** con espaciado abierto.

Si no podés usar esas fuentes exactas, usá una grotesca geométrica moderna
equivalente. **Nunca uses una tipografía monoespaciada**, ni serif, ni
manuscrita, ni condensada de tipo «brutalista».

**Regla de acento:** en un titular se marca **una sola palabra** en color
(bordo o brasa), nunca una línea entera y nunca más de una palabra por pieza.

### 4. El isotipo

La marca es una **K de trazo** que te adjunto como archivo. Reglas:

- Se usa **tal cual**, en un solo color plano (`currentColor`): brasa sobre
  papel, tinta sobre el plano de brasa, o brasa sobre tinta.
- **No la redibujes, no la deformes, no le agregues contorno, sombra ni
  degradado, no la encierres en un círculo.**
- Cuando es grande, **sale por un borde de la pieza** (recortada por la esquina
  inferior derecha), no centrada.
- Cuando es chica, va con el nombre «Kalabs» al lado, en Bricolage.

### 5. Cómo tratar las imágenes que te adjunto

Las capturas son de sitios y sistemas reales hechos por el estudio. Por lo tanto:

- **No las alteres, no las regeneres, no inventes interfaz adentro.** Se usan
  como están: recorte y encuadre sí, contenido inventado no.
- Van **enmarcadas**: dentro de un marco apaisado con el mismo radio de 24 px,
  o dentro de un mockup limpio de laptop o celular sin marca de fabricante.
- Son capturas de escritorio: en un marco vertical se recortan hasta que no se
  entienden. Si el formato es vertical, **anclá la captura arriba a la
  izquierda** en un marco apaisado.
- Nunca las pongas en perspectiva forzada, flotando con reflejo, ni con sombra
  larga.

### 6. Formato y especificaciones técnicas

- **Feed vertical:** 1080 × 1350 px (4:5). Es el formato por defecto.
- **Cuadrado:** 1080 × 1080 px, solo si el post lo pide.
- **Carrusel:** cada lámina en 1080 × 1350, todas con la misma grilla y el mismo
  margen, para que se lean como una serie.
- **Márgenes de seguridad:** 90 px de aire en los cuatro lados; nada de texto en
  los 130 px inferiores del recorte de grilla si la pieza es 4:5.
- **Continuidad de feed:** las piezas se ven de a nueve. Alterná fondo papel y
  plano de brasa para que la grilla respire, y no pongas dos posts de plano
  naranja pleno uno al lado del otro.

### 7. Texto dentro de la pieza

- **Poco texto y grande.** Máximo un titular de hasta 7 palabras, un rótulo en
  versalitas y una línea de apoyo. Si necesitás más, es un carrusel.
- Escribí el texto **exactamente como te lo doy**, sin corregirlo ni
  traducirlo. Es español rioplatense con voseo («contanos», «escribinos»,
  «necesitás»): así queda.
- Si tu render de texto no es fiable, **entregá la pieza con el texto en capas
  separadas o dejá el espacio reservado y marcado**, antes que producir un
  titular con letras deformadas.

### 8. Voz de los textos

Directa, concreta y sin humo. Habla del problema del cliente, no de la
tecnología. Sin emojis en la pieza (en el caption, como mucho uno). Sin
palabras como «innovador», «soluciones digitales», «transformación digital»,
«potenciá tu marca». Si una frase se puede decir con menos palabras, se dice con
menos.

### 9. Qué evitar (checklist de rechazo)

- Degradados, glow, neón, glassmorphism, 3D, partículas, circuitos, cerebros,
  robots o cualquier cliché de «IA / tecnología».
- Azul corporativo, gris frío, blanco puro `#ffffff`, negro puro `#000000`.
- Fotos de stock de gente en oficina dándose la mano.
- Numerales grandes de tipo `01 · 02 · 03` como recurso decorativo de sección.
- Íconos genéricos de librería mezclados con el isotipo.
- Marcos, viñetas, texturas de papel arrugado o ruido pesado. Un grano fino y
  muy sutil está permitido; una textura visible, no.

---

## Los posts

Para cada post te doy: **formato**, **qué imagen usar**, **composición**,
**texto en la pieza** y **caption** para el pie. Generá el que te pida.

### 01 · Presentación del estudio

- **Formato:** 1080 × 1350.
- **Imagen:** solo el isotipo.
- **Composición:** plano pleno de brasa. La K de trazo en tinta, enorme, saliendo
  por la esquina inferior derecha. Titular arriba a la izquierda, en tinta.
- **Texto en la pieza:**
  - Rótulo (versalitas): `MONTEVIDEO, URUGUAY · EST. 2025`
  - Titular: `Kalabs. Estudio digital.`
  - Pie: `Desarrollo web · Automatizaciones · Sistemas a medida`
- **Caption:** «Somos un estudio digital de Montevideo. Hacemos webs,
  automatizaciones y sistemas a medida para negocios que necesitan que algo
  funcione mejor. La primera consulta no tiene costo. → kalabs.dev»

### 02 · Ficha de proyecto — ViaGrúa

- **Formato:** 1080 × 1350.
- **Imagen:** `viagrua.png`.
- **Composición:** fondo papel. Captura enmarcada arriba, ocupando dos tercios.
  Debajo, el nombre en Bricolage grande y la línea de qué es. Rótulo de rubro en
  versalitas sobre bordo.
- **Texto en la pieza:**
  - Rótulo: `PROYECTO · FLOTAS EN TIEMPO REAL`
  - Titular: `ViaGrúa`
  - Apoyo: `Choferes, servicios y unidades en una sola vista.`
- **Caption:** «ViaGrúa: quién está libre y quién está en camino, sin un solo
  llamado. Toda la flota en una pantalla, actualizada en tiempo real. Mirala
  andando en via-grua.vercel.app»

### 03 · Ficha de proyecto — ROG

- **Formato:** 1080 × 1350.
- **Imagen:** `rog.png`.
- **Composición:** igual que la 02, para que se lean como serie.
- **Texto en la pieza:**
  - Rótulo: `PROYECTO · FINANZAS PERSONALES`
  - Titular: `República Oriental de los Gastos`
  - Apoyo: `Presupuesto, ahorro y flujo del mes en una pantalla.`
- **Caption:** «ROG — República Oriental de los Gastos. Cuánto entra, cuánto
  sale y en qué se fue, sin planilla. urugastos.vercel.app»

### 04 · Ficha de proyecto — Oleo Cáceres

- **Formato:** 1080 × 1350.
- **Imagen:** `oleocaceres.png`.
- **Composición:** igual que la 02 y la 03.
- **Texto en la pieza:**
  - Rótulo: `PROYECTO · INSTITUCIONAL INDUSTRIAL`
  - Titular: `Oleohidráulica Cáceres`
  - Apoyo: `Veinte años de oficio contados en una página.`
- **Caption:** «Con ANCAP, UTE y la Armada entre sus clientes, la web tenía que
  estar a esa altura. Qué fabrican, qué reparan y para quién trabajan, en una
  sola página. oleocaceres-web.vercel.app»

### 05 · Servicio — Desarrollo web

- **Formato:** carrusel de 3 láminas, 1080 × 1350.
- **Imagen:** ninguna captura. Dibujo de línea simple, trazo de tinta sobre
  papel: una página web armándose bloque por bloque dentro de un navegador.
- **Composición:** lámina 1, el dibujo grande y el titular. Lámina 2, el cuerpo.
  Lámina 3, la lista de lo que incluye sobre plano de brasa.
- **Texto en la pieza:**
  - L1 — Rótulo: `SERVICIO`. Titular: `Desarrollo web.`
  - L2 — `Sitios para negocios que necesitan que los encuentren. Rápidos en el
    celular, sin plantillas y con la medición configurada desde el primer día.`
  - L3 — `INCLUYE: Institucional · Tienda o catálogo · Panel de administración ·
    Medición`
- **Caption:** «Se entrega en producción, con el dominio andando y soporte del
  otro lado. Nada de “te mando el archivo y arreglate”. Contanos qué necesitás:
  hola@kalabs.dev»

### 06 · Servicio — Automatizaciones

- **Formato:** carrusel de 3 láminas, misma grilla que la 05.
- **Imagen:** dibujo de línea: tres pasos encadenados con un dato que los
  recorre solo, una y otra vez.
- **Texto en la pieza:**
  - L1 — Rótulo: `SERVICIO`. Titular: `Automatizaciones.`
  - L2 — `Las tareas manuales que se repiten todas las semanas pasan a
    ejecutarse solas. Empezamos por la que más horas consume.`
  - L3 — `INCLUYE: Bots de WhatsApp y Telegram · Reportes · Integraciones ·
    Alertas`
- **Caption:** «Si todas las semanas hacés lo mismo a mano, eso se
  automatiza. Empezamos por la tarea que más horas te come y te devolvemos
  esas horas.»

### 07 · Servicio — Sistemas a medida

- **Formato:** carrusel de 3 láminas, misma grilla.
- **Imagen:** dibujo de línea: una grilla de turnos que se va ocupando casillero
  por casillero.
- **Texto en la pieza:**
  - L1 — Rótulo: `SERVICIO`. Titular: `Sistemas a medida.`
  - L2 — `Turnos, pedidos o control de stock. Una función bien resuelta antes
    que un sistema entero que después nadie abre.`
  - L3 — `INCLUYE: Turnos y agenda · Pedidos · Control de stock · Fichas de
    clientes`
- **Caption:** «El sistema más caro es el que se compra entero y se usa a la
  mitad. Arrancamos por la función que te resuelve el problema de hoy.»

### 08 · Las tres promesas

- **Formato:** 1080 × 1080.
- **Imagen:** ninguna. Tipografía sola.
- **Composición:** plano pleno de brasa, texto en tinta. Las tres promesas
  apiladas, separadas por un filete de 1 px, como una cinta detenida.
- **Texto en la pieza:**
  - `Primera consulta sin costo`
  - `Presupuesto cerrado antes de empezar`
  - `Respuesta en 24 horas`
  - Pie en versalitas: `MONTEVIDEO, URUGUAY`
- **Caption:** «Tres cosas que no se negocian. Escribinos y lo charlamos:
  hola@kalabs.dev»

### 09 · El equipo

- **Formato:** 1080 × 1350.
- **Imagen:** ninguna. **Sin fotos de perfil**: dos fotos recortadas en círculo
  es lo que hace que un estudio parezca plantilla de agencia.
- **Composición:** fondo papel. Dos pastillas de esquina redondeada, una arriba
  de la otra, cada una con las iniciales en Bricolage grande en brasa, el nombre
  y el rol.
- **Texto en la pieza:**
  - Rótulo: `EQUIPO`
  - `LZ · Lautaro Zapata — Desarrollo y sistemas`
  - `MS · Matías Sosa — Diseño gráfico e identidad`
- **Caption:** «Dos personas: Lautaro en desarrollo y sistemas, Matías en diseño
  e identidad. Cuando nos escribís, te contesta uno de los dos.»

### 10 · La consulta

- **Formato:** 1080 × 1350.
- **Imagen:** ninguna. Se reproduce el campo de texto de la portada del sitio.
- **Composición:** fondo papel. Arriba el titular con «resolver» en bordo. Abajo
  un campo de texto de esquina redondeada, con una consulta escrita adentro y el
  cursor parpadeando al final.
- **Texto en la pieza:**
  - Titular: `Contanos qué hay que resolver.`
  - Dentro del campo (elegí una y hacé una pieza por cada una):
    `Una web que aparezca en Google.` ·
    `Un bot de WhatsApp para pedidos.` ·
    `Un sistema de turnos para el taller.` ·
    `Automatizar un reporte semanal.` ·
    `Una tienda para vender online.` ·
    `Rehacer mi web, que quedó vieja.`
- **Caption:** «Escribilo tal cual, con tus palabras. No hace falta que sepas
  qué tecnología lleva: para eso estamos. La primera consulta no tiene costo.»

### 11 · Tu proyecto acá

- **Formato:** 1080 × 1350.
- **Imagen:** las tres capturas, chicas, en una fila de tres marcos; el cuarto
  marco vacío, del mismo tamaño, con un filete punteado.
- **Composición:** fondo papel arriba, el cuarto marco vacío marcado en brasa.
- **Texto en la pieza:**
  - Rótulo: `OBRA`
  - Titular sobre el marco vacío: `Tu proyecto acá.`
  - Botón: `Escribinos`
- **Caption:** «Tres proyectos en producción y un lugar libre. Contanos qué
  necesitás resolver y lo evaluamos juntos. Si no amerita un desarrollo, te lo
  decimos. → hola@kalabs.dev»

### 12 · Antes y después

- **Formato:** carrusel de 2 láminas, 1080 × 1350.
- **Imagen:** captura del sitio viejo del cliente (lámina 1) y la captura del
  proyecto nuevo (lámina 2). Si no hay captura del antes, dejá la lámina 1 como
  bloque de texto sobre hueso.
- **Composición:** las dos láminas idénticas en grilla, para que el cambio se
  vea en la imagen y no en el diseño de la pieza.
- **Texto en la pieza:**
  - L1 — Rótulo en versalitas: `ANTES`
  - L2 — Rótulo en versalitas sobre brasa: `DESPUÉS`
- **Caption:** «Misma empresa, misma información, otro resultado. La diferencia
  no es estética: es que ahora carga rápido en el celular y aparece cuando te
  buscan.»

### 13 · Una idea por post (serie de opinión)

- **Formato:** 1080 × 1080.
- **Imagen:** ninguna. Titular solo, centrado, con una palabra en bordo.
- **Composición:** fondo papel o plano de brasa, alternando. Bricolage a cuerpo
  muy grande, una frase por pieza, la K chica abajo con el nombre.
- **Frases de la serie (una por pieza):**
  - `Una función bien resuelta antes que un sistema entero que nadie abre.`
  - `Si se repite todas las semanas, no lo hagas a mano.`
  - `Presupuesto cerrado antes de empezar.`
  - `Una web que no aparece en Google es un folleto en un cajón.`
  - `Si no amerita un desarrollo, te lo decimos.`
- **Caption:** desarrollá la frase en dos o tres oraciones concretas, con un
  ejemplo de un negocio real de Montevideo, y cerrá con `hola@kalabs.dev`.

---

## Hashtags

Máximo cinco por post, en el primer comentario y no en el caption:

`#desarrolloweb #montevideo #uruguay #automatizaciones #pymesuy`

## --- FIN DEL PROMPT ---

---

## Cómo usarlo

1. Copiar el bloque entre `--- INICIO ---` y `--- FIN ---`.
2. Adjuntar el isotipo (`app/icon.svg` o `components/Marca.tsx` exportado a
   PNG) y las capturas de `public/proyectos/`.
3. Cerrar con: «Generá el post 02 (ViaGrúa) en 1080 × 1350».
4. Los textos salen de `lib/content.ts`. Si cambia el contenido del sitio,
   este archivo se actualiza con él.
