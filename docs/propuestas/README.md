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
| `f-servicios-banco.html` | Servicios · Banco | Sólo la sección de servicios, en fila y abiertas. |
| `g-servicios-mostrador.html` | Servicios · Mostrador | Sólo la sección de servicios, un plano de tinta. |

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

## F y G · Dos maneras de mostrar los servicios

Las dos parten del mismo diagnóstico: los bloques que se abren funcionan, pero
plegados ocupan tres renglones y se pasan de largo. Las dos les dan una
pantalla y le agregan a cada servicio un dibujo animado —trazo de una línea,
la brasa como único relleno, sin una sola palabra dentro— con el mismo marco de
16px de la escena de la obra. No entra ningún color, ninguna fuente ni ninguna
curva nueva; el texto es el mismo de `lib/content.ts`.

Los tres dibujos son los mismos en las dos propuestas:

| Servicio | Qué muestra |
| --- | --- |
| Desarrollo web | Una página armándose bloque por bloque dentro de un navegador |
| Automatizaciones | Tres pasos encadenados con un dato que los recorre y vuelve a empezar |
| Sistemas a medida | Una grilla de turnos que se va ocupando casillero por casillero |

### F · Banco

Las tres fichas dejan de abrirse y quedan abiertas, en fila, una columna cada
una: lámina arriba, título, cuerpo y los entregables al pie —alineados entre
las tres aunque los cuerpos midan distinto—. Nada que clickear: la sección se
lee de corrido.

Al pasar el mouse o al llegar con el teclado, la ficha se da vuelta a tinta y
la lámina a papel; es el gesto que hoy hace la ficha al abrirse. En pantallas
medianas van dos columnas y la tercera abajo a lo ancho; en el celular, una.

- **A favor**: todo visible de una, sin interacción. Es la que menos se aleja
  de lo que ya hay.
- **En contra**: tres columnas obligan a que el cuerpo sea corto. El de
  desarrollo web es el más largo de los tres y es el que más se nota.

### G · Mostrador

Un solo plano de tinta del ancho de la caja y del alto de una pantalla. A la
izquierda los tres nombres en tamaño de titular, siempre los tres; a la
derecha, el elegido: su dibujo grande, su cuerpo y sus entregables. El nombre
activo se corre y le crece un filete de brasa al costado, el mismo
desplazamiento que hace la fila del índice de proyectos.

Se cambia pasando el mouse, tocando o con las flechas —son pestañas de verdad,
con `role="tablist"`—. El plano es tinta y no brasa a propósito: la brasa ya es
el plano de la obra, y dos planos naranjas en la misma página compiten.

- **A favor**: es la de más presencia y la que deja el dibujo más grande. Los
  tres nombres se leen enormes desde lejos.
- **En contra**: dos de los tres servicios están escondidos hasta que alguien
  los elija, igual que hoy. Es el mismo trato de «uno por vez» que ya tiene la
  escena de la obra, un poco más arriba en la página.

## Si se elige alguna

El prototipo es HTML suelto. Pasarlo al sitio implica reescribir los
componentes de `components/` y `app/globals.css` con el mismo contenido de
`lib/content.ts`, que no cambia. Las fuentes se cargan por `next/font/google`
en `app/fonts.ts`.
