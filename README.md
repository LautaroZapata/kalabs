# Kalabs

Landing/portfolio de una página para **Kalabs**, estudio digital nocturno de
Montevideo, Uruguay. Desarrollo web, automatizaciones y sistemas a medida para
negocios chicos.

## Dirección de diseño

Brutalismo web + retrofuturismo con raíces. La apuesta está en la
**composición**, no sólo en la paleta: una paleta oscura con dos acentos no
alcanza para no sentirse genérico, así que lo que cambia acá es cómo se
organiza el contenido.

Decisiones concretas:

- **El orden no es el de siempre.** El contacto abre el sitio (arriba a la
  derecha) y lo cierra. Los **proyectos van antes que los servicios**. Las
  secciones se numeran `00 → 04` y el índice funciona como navegación.
- **Nada de grillas parejas.** Los proyectos viven en un riel horizontal de
  fichas de anchos distintos montadas a alturas distintas; los servicios son
  tres filas donde *cada fila usa una grilla diferente* (cambian las
  proporciones, el lado del numeral y la sangría del texto).
- **La tipografía es un elemento gráfico.** El wordmark está fracturado —`Ka`
  macizo, `labs` en contorno— y se corre hasta cruzar el hilo de la columna
  vecina, donde se recorta contra un velo. Los numerales de sección se salen
  del contenedor y se cortan contra el borde.
- **El solape es estructural.** En *Taller* las placas se montan una sobre
  otra y giradas, como papeles sobre una mesa.
- **La greca hace trabajo estructural**, no decorativo: es la junta entre
  secciones, el lomo de las fichas y el relleno de los vacíos de la grilla.
  Son cuatro tramas ortogonales (`zigzag`, `rombo`, `escalera`, `trama`)
  construidas a base de escalones —geometría abstracta inspirada en el textil
  sudamericano, sin citar ningún símbolo concreto.
- **Riel de estado fijo al pie** con la hora real de Montevideo, la sección
  activa y el avance de lectura. Reemplaza al menú.
- **El movimiento acompaña, no decora.** El riel de proyectos se arrastra con
  el mouse y sigue de largo con inercia; las secciones entran al pisar el
  viewport; las fichas quedan giradas cuando terminan de asentarse.

### Paleta

| Rol | Token | Valor |
| --- | --- | --- |
| Fondo | `--ink` | `#0f1214` — carbón frío |
| Texto | `--bone` | `#efe7d6` — hueso cálido |
| Acento cálido | `--ember` | `#ff6b1a` |
| Acento cálido 2 | `--amber` | `#e9b34a` |
| Acento frío | `--teal` | `#3f9184` |
| Estructura | `--terra` | `#9c3f26` — líneas y bordes |

### Tipografía

Una sola grotesca, **Schibsted Grotesk**, llevada a dos extremos: peso 900 con
tracking cerrado (`-0.04em`) para los titulares y 400 para leer. Las etiquetas,
datos y estados van en **JetBrains Mono**. No hay una familia display aparte:
lo que separa titular de cuerpo es el peso, no la tipografía.

## Accesibilidad

- Contraste verificado: hueso sobre carbón ~15:1, ámbar ~6.6:1, verde ~5:1.
  El rojo tierra se usa sólo para bordes y líneas, nunca para texto corrido.
- Foco de teclado visible en todo el sitio (contorno ámbar de 3px).
- El riel horizontal de proyectos es enfocable (`role="region"` + `tabindex`)
  para poder recorrerlo sin mouse.
- Ningún estado se transmite sólo con color: los chips llevan la palabra
  completa (`En producción`, `Socio · a confirmar`) y un signo.
- Se respeta `prefers-reduced-motion`: no hay entradas por scroll, marquesina
  ni inercia. El contenido aparece directamente visible, no oculto esperando un
  disparador.
- Con JavaScript deshabilitado el contenido sigue visible: hay un `<noscript>`
  que neutraliza el estado inicial que Motion escribe en el HTML servido.
- Enlace "Saltar al contenido", jerarquía de encabezados `h1 → h2 → h3` y
  todas las tramas SVG marcadas como decorativas.

## Stack

- Next.js (App Router) + React + TypeScript
- CSS Modules + custom properties — sin framework de estilos, para que el
  layout no arrastre las convenciones de nadie
- [Motion](https://motion.dev) para las entradas por scroll y la inercia del
  arrastre
- Sin backend: el formulario arma un `mailto:` con todo cargado. Si algún día
  hay que guardar los mensajes, ahí entra Supabase sin tocar el resto.

### Notas de implementación

Dos cosas que no son obvias y conviene no deshacer:

- **Las rotaciones de las fichas viven en JS, no en CSS.** Motion escribe el
  `transform` inline, así que pisaría cualquier `rotate` puesto desde una hoja
  de estilos. Ver `components/mov/useEscritorio.ts`.
- **El arrastre no reemplaza al scroll nativo, lo complementa.** El contenedor
  mantiene su `overflow-x: auto` —así siguen andando el teclado, la rueda del
  trackpad y el gesto táctil, que ya trae inercia propia— y sólo se agrega el
  arrastre con mouse. El `scroll-snap` se apaga mientras dura el gesto, porque
  el imán pelea contra la asignación de `scrollLeft` y el riel deja de seguir
  al cursor. Ver `components/mov/useArrastre.ts`.

## Desarrollo

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm start
```

Desplegable en Vercel sin configuración extra.

## Dónde tocar el contenido

Todo el texto (servicios, proyectos, equipo, manifiesto, enlaces) vive en
`lib/content.ts`. Los componentes leen de ahí; no hay copy suelto en el
markup.
