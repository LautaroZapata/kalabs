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

### Paleta

| Rol | Token | Valor |
| --- | --- | --- |
| Fondo | `--ink` | `#0f1214` — carbón frío |
| Texto | `--bone` | `#efe7d6` — hueso cálido |
| Acento cálido | `--ember` | `#ff6b1a` |
| Acento cálido 2 | `--amber` | `#e9b34a` |
| Acento frío | `--teal` | `#3f9184` |
| Estructura | `--terra` | `#9c3f26` — líneas y bordes |

Tipografías: **Anton** (titulares condensados), **Archivo** (cuerpo),
**Space Mono** (etiquetas y datos).

## Accesibilidad

- Contraste verificado: hueso sobre carbón ~15:1, ámbar ~6.6:1, verde ~5:1.
  El rojo tierra se usa sólo para bordes y líneas, nunca para texto corrido.
- Foco de teclado visible en todo el sitio (contorno ámbar de 3px).
- El riel horizontal de proyectos es enfocable (`role="region"` + `tabindex`)
  para poder recorrerlo sin mouse.
- Ningún estado se transmite sólo con color: los chips llevan la palabra
  completa (`En producción`, `Socio · a confirmar`) y un signo.
- Se respeta `prefers-reduced-motion`: se detienen la marquesina y las
  rotaciones.
- Enlace "Saltar al contenido", jerarquía de encabezados `h1 → h2 → h3` y
  todas las tramas SVG marcadas como decorativas.

## Stack

- Next.js (App Router) + React + TypeScript
- CSS Modules + custom properties — sin framework de estilos, para que el
  layout no arrastre las convenciones de nadie
- Sin backend: el formulario arma un `mailto:` con todo cargado. Si algún día
  hay que guardar los mensajes, ahí entra Supabase sin tocar el resto.

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
