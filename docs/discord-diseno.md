# Sistema de diseño — para Discord

Copiar y pegar **un bloque por mensaje**. Cada uno entra en el límite de 2000
caracteres y usa sólo lo que Discord renderiza: encabezados, negrita, listas,
citas y bloques de código.

Sin tablas: Discord no las dibuja. Lo que en el README es tabla, acá va en
bloque de código, que sale monoespaciado y alineado.

---

## MENSAJE 1

# Kalabs — Sistema de diseño

**Dirección: broadsheet brutalista.** Un diario impreso llevado al extremo.

El maximalismo no sale de efectos, sale de **densidad de tipografía y de filetes**. Todo lo que parece adorno es una convención de imprenta con siglos encima.

Lo que se evita, porque es la receta que sale cuando a cualquiera le piden "brutalista":
- Grotesca 900 en versalita con tracking cerrado
- Secciones numeradas `00/01/02`
- Wordmark gigante partido en dos
- Marquesina infinita
- Riel de estado con reloj en vivo

Cada una es defendible sola. Juntas se reconocen a un metro.

-# Fuente: README del repo `kalabs`

---

## MENSAJE 2

## Paleta

Toda cálida: naranja y bordo sobre cuatro negros. **No hay acento frío.** La jerarquía la hacen los tonos de fondo y el peso tipográfico, no un segundo color.

```
FONDOS
--ink        #0f1214   carbón frío, el fondo base
--ink-2      #161a1c
--ink-3      #1e2325
--ink-4      #262c2f

TEXTO
--bone       #efe7d6   hueso cálido
--bone-dim   #b9b2a4   texto apagado

ACENTO — lo activo, lo que se toca
--ember      #ff6b1a
--ember-dim  #db6a20   segunda voz del mismo acento

ESTRUCTURA — filetes, bordes y planos
--terra      #9c3f26
--terra-dim  #6b2b1a
--terra-lit  #cc7256   la única versión que admite texto
```

> **Regla dura: el bordo `--terra` nunca lleva texto encima.** Tiene 2.8:1 y no pasa AA. Es filete, borde y plano de fondo. Cuando es fondo, el texto va en hueso. Si hace falta bordo *sobre* texto, se usa `--terra-lit`.

---

## MENSAJE 3

## Tipografía

**Dos familias, no tres.** Una redonda y una cursiva. Cada rol sabe a cuál pertenece. Las dos de Google Fonts, con `next/font`.

**Fraunces** — titulares, siempre vertical
Variable, con dos ejes que casi ninguna otra tiene: `SOFT` redondea los remates y `WONK` mete las formas torcidas de la itálica dentro de la redonda. Con los dos al máximo la letra deja de verse calculada.

**Newsreader** — cuerpo, bajadas y datos
Serif editorial, pensada para párrafos largos. El serif es lo que da la sensación de que atrás hay alguien.

Las reglas que sostienen el sistema:

- **Una sola cursiva: la itálica de Newsreader.** Fraunces nunca va inclinada, su inquietud ya viene del eje `WONK`
- La itálica **no** se usa para enfatizar dentro de un párrafo. Marca un solo rol: la voz que explica (bajadas, valores, pies)
- **Los titulares van en caja baja.** La versalita 900 con tracking cerrado es el titular que escribe todo el mundo
- **Los datos van en versalitas, no en monoespaciada.** Una tercera familia para cuatro etiquetas era una voz de más

---

## MENSAJE 4

## Composición

- **Nada centrado.** Nada flotando en el medio de la pantalla
- **La portada presenta y deja pasar.** Cintillo, cabecera a filete doble con el nombre en caja baja y al ras, y un recuadro al margen derecho. Sin párrafo de relleno: lo que hay para decir lo dicen Servicios, Proyectos y Contacto
- **El cabezal de sección se comparte.** Antetítulo, título y bajada, iguales en las tres secciones interiores, para que se lea como una sola pieza
- **Los proyectos son una plana**, no una grilla de tarjetas. Nota principal a todo el ancho y dos secundarias abajo, separadas por filete. **Las notas no llevan borde**: la caja queda reservada para el módulo de cierre, que sí invita a escribir
- **Los servicios son una composición, no una lista.** Cinco módulos de tamaños distintos en una grilla de seis columnas. La jerarquía la da el tamaño del módulo, no el orden de lectura, y la sección entra en una pantalla
- **Servicios antes que proyectos.** Primero qué podemos hacer por quien llega, después la prueba de que sabemos hacerlo
- **Cada proyecto se muestra, no se cuenta.** Captura real del sitio en vivo, no maqueta dibujada. Y ninguna ficha lleva stack: al cliente no le dice nada que haya Supabase abajo

### Filetes

Un diario no usa "bordes": usa filetes de grosores fijos. **Tres, no más.**

```
--filete       1px  solid  terra-dim
--filete-med   2px  solid  terra
--filete-grue  5px  solid  bone
```

---

## MENSAJE 5

## Textura y ornamento

**La rugosidad va en UN solo elemento de todo el sitio:** el "Kalabs" de la cabecera. Filtro SVG que le come el borde por desplazamiento de ruido — letra entintada sobre papel poroso.

Aplicada a todos los titulares dejaba de ser un acento y se volvía ruido de fondo: a esa escala compite con el texto en vez de sostenerlo. **Un elemento rugoso contra tres páginas de letra limpia se nota más que veinte.**

Se aplica sobre texto vivo: sigue siendo seleccionable, indexable y legible por lector de pantalla.

> ⚠️ Cuidado al extenderla: `filter` convierte al elemento en bloque contenedor de sus descendientes absolutos. Puesta en un titular que adentro tenga un `::after` estirado sobre una ficha, ese overlay se recorta al titular y la tarjeta deja de ser clicable entera. En esos casos va en un `<span>` interno.

**La greca aparece una sola vez**, como orla superior de la portada. Cuatro tramas ortogonales construidas a base de escalones — geometría abstracta inspirada en el textil sudamericano, **sin citar ningún símbolo concreto**.

Es lo más propio que tiene el sitio, y por eso vale más una que diez repartidas.

---

## MENSAJE 6

## Accesibilidad

No es una capa que se agrega al final: define qué color puede llevar texto.

Contraste verificado sobre `--ink`:

```
hueso            15.3:1
hueso apagado     8.9:1
naranja           6.6:1
naranja quemado   5.5:1
bordo aclarado    5.5:1  (4.6:1 sobre ink-3)
hueso s/ bordo    5.4:1
```

- **Ningún estado se transmite sólo con color.** Lleva la palabra completa: `En producción`, `Desarrollo y sistemas`
- Foco de teclado visible en todo el sitio: contorno naranja de 3px
- Jerarquía de encabezados `h1 → h2 → h3`, sin saltos
- Enlace "Saltar al contenido"
- Todas las tramas SVG marcadas como decorativas
- **El enlace de cada proyecto envuelve al título y se estira con `::after`.** Toda la ficha es clicable, pero lo que anuncia el lector de pantalla es el nombre del proyecto, y el foco se dibuja sobre el texto, no sobre la tarjeta entera

---

## MENSAJE 7

## Movimiento

**Se respeta `prefers-reduced-motion`.** Sin entradas por scroll ni escalonado de portada: el contenido aparece directamente visible, no oculto esperando un disparador.

- **La portada entra sin JavaScript.** El escalonado lo hace CSS con `animation-delay`, así lo más importante no queda en `opacity: 0` esperando que cargue un bundle
- Una sola curva para todo, y **sin rebote**: `cubic-bezier(0.22, 1, 0.36, 1)`. Sale rápido y frena largo. Un resorte que pasa de largo y vuelve queda bien en un botón y fuera de lugar en un acuse
- **El movimiento explica, no adorna.** La cruz de las casillas se dibuja trazo por trazo y sale apenas torcida, como marcada a mano. El acuse del formulario traza un filete doble de izquierda a derecha: el gesto de cerrar una nota. No se agrega un objeto nuevo para avisar que algo pasó — se usa el recurso que ya está en todas partes

> ⚠️ Con movimiento reducido no alcanza con no animar. Motion escribe `opacity: 0` inline en el HTML servido, así que hay que pedirle explícitamente el estado final en el montaje o el bloque queda invisible para siempre.

## Correo

Otro medio, otras reglas. **Georgia y no Fraunces** (un correo no puede cargar fuentes con garantías), tablas y estilo en línea, y los documentos que el cliente imprime van sobre **papel claro, no sobre ink**.

-# El sitio es la edición de noche; el documento es el papel.
