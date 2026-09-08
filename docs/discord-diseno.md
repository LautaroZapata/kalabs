# Sistema de diseño — para Discord

Copiar y pegar **un bloque por mensaje**. Cada uno entra en el límite de 2000
caracteres y usa sólo lo que Discord renderiza: encabezados, negrita, listas,
citas y bloques de código.

Sin tablas: Discord no las dibuja. Lo que en el README es tabla, acá va en
bloque de código, que sale monoespaciado y alineado.

---

## MENSAJE 1

# Kalabs — Sistema de diseño

**Dirección: papel cálido, tinta encima y un solo plano de color.** El sitio pregunta antes de contar nada, muestra la obra a tamaño de pantalla y recién después dice qué hacemos.

Hubo dos direcciones antes. La primera, brutalismo web de manual: grotesca 900 en versalita, mono con tracking, secciones `00/01/02`, wordmark partido, marquesina infinita, riel con reloj en vivo — la receta que sale cuando a cualquiera le piden "brutalista". La segunda, un broadsheet: filetes de tres grosores, cintillo, folio al pie, greca de orla. Se leía bien, pero la metáfora de imprenta era decoración y los proyectos quedaban en tres capturas de 400px en fila.

Lo que hay ahora salió de mirar dieciocho portadas de estudios y de tres propuestas completas: base **Vidriera** con la forma de mostrar proyectos de **Cartel**.

-# Fuente: README del repo `kalabs`

---

## MENSAJE 2

## Paleta

La misma de siempre, dada vuelta: lo que era fondo pasó a ser tinta. **Toda cálida, sin acento frío.**

```
PAPEL — el fondo
--papel      #f7f2e7   el fondo del sitio
--bone       #efe7d6   fichas cerradas, formulario

TINTA
--ink        #0f1214   carbón frío
--ink-2      #161a1c
--ink-4      #262c2f   texto secundario sobre papel
--bone-dim   #b9b2a4   texto secundario sobre tinta

ACENTO — el plano pleno y lo que se toca
--ember      #ff6b1a
--ember-dim  #db6a20

SEGUNDA VOZ — rótulos y palabras marcadas
--terra      #9c3f26
--terra-dim  #6b2b1a
```

> **Un solo plano de color pleno: la escena de la obra.** La brasa dejó de ser detalle y pasó a ser fondo. Sobre papel no lleva texto chico: para eso está el bordo, que sí pasa AA.

---

## MENSAJE 3

## Tipografía

**Dos familias, no tres.** Las dos de Google Fonts, con `next/font`.

**Bricolage Grotesque** — titulares, nombres de proyecto, botones
Grotesca variable con eje óptico (`opsz`): a cuerpo grande cierra el espaciado y afina las curvas, a cuerpo chico las abre. Ese eje es lo que le da carácter sin necesidad de una display aparte.

**Hanken Grotesk** — cuerpo, rótulos, etiquetas y datos
Sans de lectura, tranquila. Aguanta párrafos y también versalitas de 0.7rem.

Las reglas que sostienen el sistema:

- **No hay monoespaciada.** El texto chico va en versalitas de Hanken (`.et`): se distingue por espaciado y peso, no por familia
- **`opsz` se pide por eje, no por peso.** Una lista de pesos junto a `axes` es un error de build, no una optimización
- **El acento del titular es una palabra, no una línea.** "resolver" en bordo, "lo que sea" en brasa: una por sección y nada más

---

## MENSAJE 4

## Composición

- **La portada no titula: pregunta.** "Contanos qué hay que resolver", y abajo un campo. Lo que se escribe ahí viaja al formulario y cae en el mensaje con el foco al final
- **La obra va en dos tiempos.** Arriba la escena: plano de brasa, la inicial gigante derivando de fondo y un proyecto por vez, grande. Abajo el índice: cuatro filas, y con mouse la captura sigue al cursor. **No se pisan** — la escena muestra, el índice lista
- **La cuarta fila del índice es "Tu proyecto acá"**, con la misma tipografía que los tres que existen. Dicha aparte se lee como aviso; dicha ahí, como el que sigue
- **Los servicios no van numerados.** Ninguno de los dieciocho estudios de referencia tiene `01 · 02 · 03`. Son tres `<details>` que se abren, así que funcionan sin JavaScript
- **El banner corta la página en dos**: arriba lo que hicimos y lo que hacemos, abajo cómo escribirnos

### Geometría

**Lo que agrupa es una curva; lo que separa, un filete de un pixel.**

```
--r         24px   escena, fichas, formulario, pie
--r-chico   12px   campos del formulario
--linea     1px rgba(15,18,20,.18)
--ancho     1440px  la caja
```

---

## MENSAJE 5

## Lo que se sacó

El rediseño no agregó capas: sacó.

- **La rugosidad**, el filtro SVG que le comía el borde a la letra. Vivía en un solo elemento y era lo más propio del sitio, pero era vocabulario de imprenta: sin diario alrededor, quedaba como un efecto suelto
- **La greca de orla**, las cuatro tramas ortogonales de la portada
- **Los filetes de tres grosores**, el cintillo y el folio al pie
- **La barra fija de navegación al pie.** Marcaba en qué sección estabas, y marcaba bien; en un sitio de una página eso no es información, es decoración. Quedaron cuatro pastillas arriba
- **Motion.** Para un fundido de veinte pixeles alcanzan un `IntersectionObserver` de doce líneas y una transición de CSS

> Regla: si algo del sistema vuelve a parecer un adorno, sacarlo. Es lo que pasó con las dos direcciones anteriores.

---

## MENSAJE 6

## Accesibilidad

No es una capa que se agrega al final: define qué color puede llevar texto.

Contraste verificado:

```
SOBRE PAPEL (#f7f2e7)
tinta            16.4:1
ink-4            11.5:1
bordo             6.0:1

SOBRE TINTA (#0f1214)
hueso            15.3:1
hueso apagado     8.9:1
brasa             6.6:1

tinta s/ brasa    6.6:1
```

- **Ningún estado se transmite sólo con color.** Lleva la palabra completa: `En producción`, `Abierto`
- **El pase de la obra tiene botón de pausa** y arranca pausado con `prefers-reduced-motion`: una imagen que cambia sola y no se puede detener es exactamente lo que pide que se apague
- Con el dedo, los puntos del pase crecen al blanco de 44px con un pseudoelemento transparente, sin cambiar de tamaño a la vista
- Las pastillas de servicio del formulario son radios escondidos: teclado y lector de pantalla funcionan sin reimplementar nada
- Foco de teclado visible en todo el sitio: contorno de brasa de 3px
- Jerarquía `h1 → h2 → h3`, enlace "Saltar al contenido", y la inicial gigante de la escena marcada como decorativa

---

## MENSAJE 7

## Movimiento

**Se respeta `prefers-reduced-motion`** en todo: entradas por scroll, pase de la obra, deriva de la inicial y banner.

- **La portada entra sin JavaScript.** El escalonado lo hace CSS con `animation-delay`, así lo más importante no queda en `opacity: 0` esperando que cargue un bundle
- **El banner se frena al pasarle el mouse.** Una cinta que no para no se puede leer, y lo que dice —consulta sin costo, presupuesto cerrado, 24 horas— es justo lo que alguien quiere terminar de leer
- Una sola curva para todo: `cubic-bezier(0.2, 0.8, 0.2, 1)`. Sale rápido y frena largo. El rebote (`--spring`) queda para lo que se toca: pastillas, botones, puntos
- **El movimiento explica, no adorna.** La captura que sigue al cursor en el índice existe para no tener que abrir cuatro pestañas; la deriva de la inicial es fondo y por eso tarda 28 segundos en cruzar

## Correo

Otro medio, otras reglas. **Georgia y no la tipografía del sitio** (un correo no puede cargar fuentes con garantías), tablas y estilo en línea, y los documentos que el cliente imprime van sobre papel claro.

-# El sitio ahora también es papel: la diferencia con el documento es el plano de brasa.
