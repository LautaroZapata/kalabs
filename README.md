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

- **Cuatro secciones, nombres directos.** `00 Kalabs → 01 Proyectos →
  02 Servicios → 03 Contacto`. Nada de metáforas de taller: el visitante no
  tiene que descifrar qué hay detrás de "Obra" u "Oficio". El contacto abre el
  sitio (arriba a la derecha) y lo cierra, y el índice funciona como
  navegación.
- **El equipo va dentro del contacto.** Quién trabaja acá y cómo escribirnos
  se leen juntos: se contrata a las personas, no al formulario.
- **La asimetría la da el tamaño de las celdas, no el desorden.** Los
  proyectos van en grilla vertical —el destacado ocupa el ancho completo, los
  otros dos se reparten la fila— y los servicios usan una sola grilla donde lo
  único que alterna es el lado del numeral. Se ve todo sin gestos ni sorpresas.
- **La tipografía es un elemento gráfico.** El wordmark está fracturado —`Ka`
  macizo, `labs` en contorno— y se corre hasta cruzar el hilo de la columna
  vecina, donde se recorta contra un velo.
- **La greca hace trabajo estructural**, no decorativo: es la junta entre
  secciones y el fondo del bloque de equipo. Son cuatro tramas ortogonales
  (`zigzag`, `rombo`, `escalera`, `trama`) construidas a base de escalones
  —geometría abstracta inspirada en el textil sudamericano, sin citar ningún
  símbolo concreto. Se usan con cuentagotas: una greca de más y la pantalla se
  llena de ruido.
- **Riel de estado fijo al pie** con la hora real de Montevideo, la sección
  activa y el avance de lectura. Reemplaza al menú.
- **El movimiento acompaña, no decora.** Las secciones y las fichas entran al
  pisar el viewport; no hay arrastre ni inercia.

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

Una sola grotesca, **Schibsted Grotesk**, llevada a dos extremos: peso 900 con
tracking cerrado (`-0.04em`) para los titulares y 400 para leer. Las etiquetas,
datos y estados van en **JetBrains Mono**. No hay una familia display aparte:
lo que separa titular de cuerpo es el peso, no la tipografía.

## Accesibilidad

- Contraste verificado sobre `--ink`: hueso 15.3:1, hueso apagado 8.9:1,
  naranja 6.6:1, naranja quemado 5.5:1 (4.6:1 sobre `--ink-3`, el fondo más
  claro donde aparece). Hueso sobre bordo 5.4:1.
- **El bordo (`--terra`, 2.8:1) nunca lleva texto.** Es borde, línea, contorno
  decorativo y plano de fondo; cuando es fondo, el texto encima va en hueso.
- Foco de teclado visible en todo el sitio (contorno naranja de 3px).
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
