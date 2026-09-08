# Tres propuestas de diseño

Prototipos en HTML plano, autocontenidos. Se abren con doble click; no hace
falta levantar el proyecto. Usan las capturas reales de `public/proyectos/` por
ruta relativa, así que hay que abrirlos desde acá para que se vean las imágenes.

| Archivo | Nombre | De dónde sale |
| --- | --- | --- |
| `a-sustraccion.html` | Sustracción | Collins |
| `b-vidriera.html` | Vidriera | DixonBaxi |
| `c-cartel.html` | Cartel | Instrument |
| `d-mezcla.html` | Mezcla | B + C, con el esqueleto de C. Descartada. |
| `e-vidriera-cartel.html` | **Vidriera + Cartel** | B de base, con los proyectos de C. La que sigue. |

La paleta es la misma en las tres y es la de siempre: `#0f1214` tinta,
`#efe7d6` hueso, `#ff6b1a` brasa, `#9c3f26` bordo. Lo que cambia es la
tipografía, la escala y la manera de mostrar la obra.

Las tres bajan la sección de servicios numerados —`01`, `02`, `03`— que era
lo que más delataba la plantilla, y suben la obra a tamaño de pantalla.

## A · Sustracción

Fondo hueso, tinta encima: el sitio actual dado vuelta. Una sola frase serif en
una pantalla vacía y, abajo, en lugar de los ocho laureles de Collins, la
prueba que sí tenemos: tres proyectos en producción y los clientes de Cáceres.
Después cada proyecto se lleva una pantalla entera.

- **Tipografía**: Instrument Serif para titulares, Newsreader para cuerpo, IBM
  Plex Mono para rótulos y datos.
- **La única mancha de tinta plena** es el bloque de contacto al pie.
- **Riesgo**: es la más callada de las tres. Si la obra no aguanta el tamaño
  completo, se nota.

## B · Vidriera

Papel cálido, sans geométrica y una pregunta al medio con un campo de texto
debajo: la portada es una invitación a escribir, no un titular. Abajo, una
cinta horizontal de fichas que se arrastra con el mouse, mezclando capturas con
planos plenos de brasa y bordo.

- **Tipografía**: Bricolage Grotesque para titulares, Hanken Grotesk para
  cuerpo.
- **Servicios** en bloques que se abren, no en tarjetas numeradas.
- **Riesgo**: es la más amable y la más cercana a lo que hace todo el mundo.
  Lo que la salva es la cinta y el uso del color en planos.

## C · Cartel

`KALABS` a tamaño de afiche cortado por los bordes, y debajo un plano brasa con
una `K` gigante de fondo y la obra montada encima, rotando sola con botón de
pausa. El índice de proyectos es una lista de filas; al pasar el mouse la
captura sigue al cursor.

- **Tipografía**: Archivo variable llevada a 900 de peso y 125 de ancho, DM
  Mono para las pastillas y los datos.
- **La brasa deja de ser detalle** y pasa a ser plano: es el color que
  reemplaza al violeta de Instrument.
- **Riesgo**: la más ruidosa. Vive de que la tipografía esté enorme y bien
  cortada; a medias no funciona.

## D · Mezcla (B + C)

Lo que salió de cruzar las dos que gustaron. La regla al mezclarlas fue que
cada pieza tenga un solo trabajo: si dos secciones mostraban lo mismo, una se
cambió de tema.

De **C** viene el esqueleto: `KALABS` a tamaño de afiche cortado por los
bordes, el plano brasa con la `K` gigante detrás, la obra rotando con botón de
pausa, el índice de proyectos en filas con la captura siguiendo al cursor y el
nombre otra vez al pie.

De **B** vienen la temperatura y la mano: los redondeos de 24px, las pastillas
de la barra, la portada que pregunta con un campo de texto, la cinta que se
arrastra y los bloques de servicios que se abren.

El reparto de trabajos quedó así:

| Sección | Qué muestra |
| --- | --- |
| Escena brasa | La obra, una por vez, rotando |
| Cinta arrastrable | Lo que prometemos, en planos plenos de color |
| Índice de filas | Los proyectos listados, con espía al pasar el mouse |

En B la cinta llevaba capturas y en C la escena también: se pisaban. Acá la
cinta pasó a llevar las cuatro promesas —consulta, presupuesto, respuesta,
clientes— más la ficha de «tu proyecto acá», y las capturas quedaron sólo en la
escena y en el espía del índice.

- **Tipografía**: Archivo variable —900 de peso, 125 de ancho para el
  logotipo; 800/112 para titulares—, Hanken Grotesk para cuerpo y DM Mono para
  pastillas, rótulos y datos.
- **Móvil**: el logotipo se calcula a `18.6vw`, que es lo que mide «KALABS»
  con este tracking, y el marco de la escena pasa a apaisado, porque las
  capturas son de sitios de escritorio.

## E · Vidriera con los proyectos de Cartel

La que quedó. D partía del esqueleto de Cartel y no gustó; ésta invierte la
proporción: **el formato es Vidriera de punta a punta** y de Cartel se trae
una sola cosa, cómo se muestran los proyectos.

Se queda de Vidriera:

- La portada: la pregunta y el campo de texto, no un titular.
- Los servicios en bloques que se abren, sin numerar.
- El banner en movimiento con las tres promesas. Se frena al pasarle el mouse
  por encima, que antes no hacía: una cinta que no para no se puede leer.
- Las pastillas, los redondeos de 24px, el formulario sobre papel hueso y el
  pie redondeado.

Se trae de Cartel, traducido:

- La escena: plano brasa, la `K` gigante detrás y un proyecto por vez, con
  botón de pausa y puntos. Los pies de cada captura pasaron de monoespaciada a
  Bricolage, y el marco de 10px a 16px de radio.
- El índice de filas debajo, con la captura que sigue al cursor. Los rótulos
  van en versalitas de Hanken y las etiquetas son las mismas pastillas que usa
  el resto del sitio.

La escena y el índice no se pisan: la escena muestra un proyecto grande y
rotando, el índice los lista los cuatro —los tres en producción más «tu
proyecto acá»— y sirve para ir directo a uno.

- **Tipografía**: Bricolage Grotesque en titulares, Hanken Grotesk en cuerpo.
  Sin monoespaciada: el texto chico va en versalitas de Hanken, así el sitio
  tiene dos voces y no tres. Ninguna de las dos es la de antes —el sitio
  actual usa Fraunces y Newsreader—.
- **Móvil**: el marco de la escena pasa a apaisado y se le saca el dominio al
  pie, porque las capturas son de sitios de escritorio y en vertical no se
  entienden.

## Si se elige alguna

El prototipo es HTML suelto. Pasarlo al sitio implica reescribir los
componentes de `components/` y `app/globals.css` con el mismo contenido de
`lib/content.ts`, que no cambia. Las fuentes se cargan por `next/font/google`
en `app/fonts.ts`.
