# Kalabs

Landing/portfolio de una página para **Kalabs**, estudio digital de Montevideo,
Uruguay. Desarrollo web, automatizaciones y sistemas a medida para negocios
chicos.

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

- **La portada es una primera plana, no un hero.** Cintillo con los datos de
  la edición, cabecera a filete doble con el nombre en caja baja y al ras, y
  abajo tres columnas de ancho distinto separadas por corondel: sumario ("En
  este número"), nota de tapa con capitular a dos columnas, y un recuadro.
  Nada centrado, nada flotando en el medio de la pantalla.
- **Las secciones son páginas.** El folio (`p. 2`) es una convención de
  imprenta; la numeración `00/01/02` en mono es un tic de plantilla. El
  cabezal de sección —antetítulo, título, bajada, folio al margen— lo comparten
  las tres páginas interiores para que el sitio se lea como un mismo impreso.
- **Los proyectos se arman como una plana.** Nota principal a todo el ancho
  con la maqueta apaisada y dos secundarias abajo, separadas por filete. Sin
  cajas: las notas de un diario no llevan borde. La caja queda reservada para
  el aviso clasificado, que sí es publicidad.
- **Los servicios son una plana de clasificados, no una lista.** Cinco avisos
  de tamaños distintos encastrados en una grilla de seis columnas: los tres
  rubros, uno que dice lo que **no** se hace y uno de cierre. La jerarquía la
  da el tamaño del módulo, no el orden de lectura, y la sección entra en una
  pantalla.

  Hubo dos versiones antes de esta y las dos fallaban por lo mismo aunque se
  vieran distinto: eran tres bloques iguales apilados a lo largo de la página.
  Como tabla o como titular, el ojo leía "tres cosas, una atrás de otra", y se
  comían tres pantallas para decir algo que entra en una.

  El texto va en el impersonal del clasificado uruguayo —"se hacen", "se
  automatizan", "se arman"—, que es el registro de quien ofrece un oficio y no
  el de quien vende una solución. Y hay un aviso para lo que no se hace:
  define mejor a un estudio que la lista de lo que sí, porque cualquiera dice
  que hace de todo.
- **Los servicios van antes que los proyectos.** Primero qué podemos hacer por
  quien llega, después la prueba de que sabemos hacerlo.
- **Cada proyecto se muestra, no se cuenta.** La nota abre con la **captura
  real** del sitio en vivo y enlaza ahí. Antes había maquetas dibujadas en
  SVG: servían de sustituto, pero cualquiera nota que no son el producto.
  Encima de la captura va una viñeta animada que pone en movimiento lo que el
  proyecto hace —una grúa que cruza, un mes que se llena, un pistón que
  trabaja—. Ninguna nota lleva stack: al cliente que la mira no le dice nada
  que haya Supabase abajo.
- **El folio al pie reemplaza al riel de estado.** El reloj en vivo y la barra
  de progreso eran decoración retrofuturista que no le servía a nadie; el
  folio dice en qué página estás y te lleva a otra, que es lo que un lector
  necesita.
- **La greca aparece una sola vez**, como orla superior de la portada. Son
  cuatro tramas ortogonales (`zigzag`, `rombo`, `escalera`, `trama`)
  construidas a base de escalones —geometría abstracta inspirada en el textil
  sudamericano, sin citar ningún símbolo concreto—. Es lo más propio que tiene
  el sitio, y por eso vale más una que diez repartidas.
- **El equipo son fichas de autor**, de las que van al pie de una nota, y el
  sitio cierra con un colofón declarando con qué tipografías se compuso.
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
| **Newsreader** | Cuerpo, bajadas, datos y folios | Serif editorial, pensada para párrafos largos. El serif es lo que da la sensación de que atrás hay alguien. |

Las reglas que sostienen el sistema:

- **Una sola cursiva: la itálica de Newsreader.** Fraunces nunca va inclinada
  —su inquietud ya viene del eje `WONK`— y la itálica no se usa para enfatizar
  dentro de un párrafo: marca un solo rol, el de la voz que explica (bajadas,
  valores, pies).
- **Los titulares van en caja baja.** La versalita 900 con tracking cerrado es
  el titular que escribe todo el mundo.
- **Los datos van en versalitas, no en monoespaciada.** Una tercera familia
  para escribir "p. 2" era una voz de más.

La capitular de la nota de tapa es de tres líneas, como manda el oficio.

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
  de fondo; cuando es fondo, el texto encima va en hueso. Para la tinta de los
  folios y las líneas de sumario está `--terra-lit`, que es el mismo tono
  aclarado hasta pasar AA. Si hace falta bordo sobre texto, se usa ése.
- Foco de teclado visible en todo el sitio (contorno naranja de 3px).
- Ningún estado se transmite sólo con color: lleva la palabra completa
  (`En producción`, `Socio · a confirmar`).
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
- Sin backend: el formulario arma un `mailto:` con todo cargado. Si algún día
  hay que guardar los mensajes, ahí entra Supabase sin tocar el resto.

### Notas de implementación

- **Con movimiento reducido no alcanza con no animar.** Motion escribe
  `opacity: 0` inline en el HTML servido, así que hay que pedirle explícitamente
  el estado final en el montaje o el bloque queda invisible para siempre. Eso
  resuelve `entrada()` en `components/mov/entrada.ts`.
- **Un componente por sección, con su CSS Module al lado.** `Indice`,
  `Proyectos`, `Servicios` y `Contacto`; `Formulario` toma sus estilos de
  `Contacto.module.css` porque vive dentro de esa ficha.
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
