# Kalabs

## Identidad visual: ritual obligatorio antes de cada prospecto

**SIEMPRE, SIN EXCEPCIONES.** Ningún prospecto nuevo empieza a escribirse hasta
completar estos cinco pasos. Un prospecto que parece hecho por IA no vende: la
identidad visual es lo único que separa un negocio del de al lado.

### Los cinco pasos

1. **Leer el rubro y el material del cliente** (fotos, logo, local, competencia).
   Sin eso no hay decisión estética posible.
2. **Elegir un eje estético fuerte y nombrarlo.** Una sola dirección, declarada
   en una frase. Ejemplo: "carnicería de barrio, papel de envolver y tipografía
   de cartel pintado a mano". Si el eje no se puede nombrar, todavía no existe.
3. **Recorrer la tabla de recursos de abajo y elegir.** Máximo **un** recurso de
   identidad, **uno** de motion y **uno** de componentes. Más que eso infla el
   bundle y diluye el eje.
4. **Dejar la decisión escrita** en el `CLAUDE.md` del prospecto, con el eje
   estético, los recursos elegidos y el motivo. Sirve para que el próximo cambio
   no rompa la dirección.
5. **Pasar la lista negra anti-genérico** antes de dar por cerrado el diseño.

### Tabla de recursos

Las skills de la columna "Skill instalada" ya están en `~/.claude/skills` y se
invocan por nombre: no hay que instalar nada antes de empezar. Si alguna falta,
se agrega con `pnpm dlx skills add <owner/repo> -g -a claude-code -s <skill>`,
nunca con `npx`. Son skills de terceros y corren con permisos completos del
agente: leer el `SKILL.md` antes de confiar en una nueva.

#### Identidad y dirección estética

| Recurso | Skill instalada | Qué aporta | Cuándo elegirlo |
| --- | --- | --- | --- |
| **Genjutsu** | `paint` | Pipeline anti-AI-slop completo: brainstorm de dirección de arte → sistema de diseño → implementación → auditoría. Se suma `css-native` para animación sin dependencias. | Punto de partida por defecto cuando el cliente no tiene marca y hay que inventar el universo visual entero. |
| **Design DNA** | `design-dna` | Analiza screenshots o URLs de referencia y devuelve un JSON con tres dimensiones: tokens, estilo cualitativo y efectos visuales (canvas, WebGL, shaders, scroll). Después genera diseño desde ese JSON. | El cliente ya tiene marca, local pintado o packaging, o trae una referencia que le gusta. |
| **Skeudesign** | `skeuomorphic-ui`, `high-contrast-skeuomorphic-clean` | Superficies con relieve: gradientes apilados, sombras internas y externas, bordes reflectantes, microtextura, texto grabado. | Oficios y productos físicos: barbería, panadería, taller, cerrajería. Hace que el sitio se sienta tocable. |
| **Retro UI** | `vintage` (skill) + registro `retroui.dev` | Nostalgia 50s-90s con textura granulada y tipografía pixel; el registro suma 50+ componentes neobrutalistas (bordes gruesos, sombras duras, color fuerte, 7 temas). | Marcas con historia o con ganas de ser ruidosas. El neobrutalismo es el opuesto exacto del look IA. |
| **Spline** | `spline-interactive` | Escena 3D hecha en editor visual y exportada a React. | Un solo héroe 3D, nunca decoración. Pesa: justificarlo o descartarlo. |
| **Flair.ai** | — (servicio web) | Fotos de producto y escenas de marca generadas. | El cliente no tiene fotos usables y el rubro las necesita sí o sí. |

#### Motion

Elegir **una sola librería**. Convivir dos es deuda, no diseño. Los dos skills de
principios se suman a la elegida y no cuentan contra el cupo.

| Recurso | Skill instalada | Qué aporta | Cuándo elegirlo |
| --- | --- | --- | --- |
| **GSAP** | `gsap-core`, `gsap-timeline`, `gsap-scrolltrigger`, `gsap-react` | Skills oficiales de GreenSock. Timelines, ScrollTrigger, pinning, scrub, `useGSAP` con limpieza en React. | El sitio cuenta una historia mientras se baja. Coreografías largas y encadenadas. |
| **Motion.dev** | `motion-framer` | Motion (ex Framer Motion): componentes declarativos, variants, gestos, layout animations, `AnimatePresence`. | Default razonable en Next. Transiciones de entrada, layout y presencia. |
| **Anime.js** | `animejs` | Motor liviano, fuerte en SVG: morphing, animación de trazo, stagger, keyframes. | Animar un logo o un trazo SVG sin arrastrar GSAP entero. |
| **React Spring** | `react-spring-physics` | Física de resortes y gestos, inercia. | Interacciones que responden al dedo o al mouse: drag, swipe, arrastre. |
| **Principios** | `motion-design` (LottieFiles), `motion-principles` (genjutsu) | Duraciones, easings, stagger, patrones de entrada y salida, accesibilidad y performance. | Siempre, junto a la librería elegida. |

#### Componentes

Ninguno es un paquete: todos son registros estilo shadcn. Se copia **el
componente que se usa**, con `pnpm dlx shadcn@latest add <url>`, nunca la
librería entera.

| Recurso | Skill instalada | Qué aporta | Cuándo elegirlo |
| --- | --- | --- | --- |
| **Magic UI** | `magic-ui` (oficial), `animated-component-libraries` | 150+ componentes TypeScript/Tailwind/Motion. La skill cubre selección, instalación por registro `@magicui/*` y chequeos de accesibilidad. | Héroe y secciones de impacto cuando falta tiempo. |
| **Kokonut UI** | `building-components` (de kokonut-labs) | Guía para construir componentes accesibles y componibles, con tokens de diseño propios. Es método, no catálogo. | Rubros que piden seriedad: estudios jurídicos, salud, contables. |
| **Smooth UI** | — (registro `smoothui.dev`) | 75+ componentes animados con Motion, MIT, respeta `prefers-reduced-motion`. | Pulir botones, inputs y tarjetas ya construidos. |
| **Skiper UI** | — (registro `skiper-ui.com`) | Componentes poco comunes sobre shadcn: card swipers, efectos de scroll (sus marquees quedan fuera: ver excluyentes). 24 gratis, el resto pago. | Cuando el eje pide un gesto raro que Magic UI no tiene. Verificar que el componente sea de los gratis. |
| **unlumen UI** | — (registro `ui.unlumen.com`) | 132 componentes cuya premisa es movimiento que responde a la página, no a un temporizador: scroll reveal, count-up, scramble text, matriz de LEDs. | Cuando el scroll tiene que sentirse vivo sin montar GSAP. |

#### Herramientas externas

| Recurso | Qué es | Cómo usarlo |
| --- | --- | --- |
| **Manus.im** | Agente generalista: bocetos, variantes, assets sueltos. | Explorar direcciones antes del paso 2. Nunca para producir el sitio final. |
| **10Web.io** | Generador de sitios del mundo WordPress. | Solo como referencia de rubro y de qué hace la competencia. No se entrega nada suyo. |
| **Neurosinc.com** | No es un recurso de diseño: es un producto de audio de neuro-sincronización. Su sitio es una landing one-page minimalista, fondo claro, titulares grandes, mucho aire, narrativa de scroll por secciones numeradas. | Referencia de landing de producto premium y de ritmo de scroll. Mirarlo, no copiarlo. |

### Lista negra anti-genérico

Si el prospecto tiene alguna de estas, el diseño no está terminado:

- Degradado violeta o azul sobre fondo oscuro.
- Héroe centrado + tres tarjetas iguales + CTA, en ese orden.
- Inter, Geist o la tipografía por defecto del framework en todo el sitio.
- Fotos de stock genéricas cuando el cliente tiene fotos reales del local.
- Iconos de librería sin criterio, uno por tarjeta.
- Bordes redondeados iguales en absolutamente todo.
- Cero decisiones propias: si el sitio funciona igual con otro rubro encima, no
  hay identidad.

#### Excluyentes

Estas tres no se discuten ni se justifican por el eje estético. Si aparece
alguna, el prospecto se rehace antes de mostrarse:

- **Nada de tags sobre los títulos.** Ni la barrita, ni el guion, ni el puntito,
  ni la palabrita en mayúsculas espaciadas que va arriba de un título a modo de
  "eyebrow". Es la firma más evidente de un sitio hecho con IA. El título
  arranca solo.
- **Nada de métricas de relleno.** Ni la fila de cuatro cajitas con números
  ("+500 clientes", "10 años", "98 % satisfacción"), ni cifras que aparecen de la
  nada sin que el cliente las haya dado. Un número entra sólo si es real, lo
  confirmó el cliente y cuenta algo que el texto no puede contar.
- **Nada de marquesinas automáticas.** Ni la cinta de logos, palabras o rubros
  que corre sola en loop. Si algo tiene que moverse, que responda al scroll o a
  la mano del usuario, no a un temporizador.

### Base fija, al margen de lo elegido

Se revisan **siempre**: `frontend-design` (dirección estética, anti-look-genérico)
y `better-typography` al empezar; `web-design-guidelines` y `web-design-reviewer`
al cerrar. El catálogo largo de skills y recursos vive en
`docs/skills-diseno.md`.

## Gestor de paquetes

**Siempre pnpm.** Nunca `npm` ni `yarn`, en ningún comando ni en documentación.

| En vez de | Usar |
| --- | --- |
| `npm install` | `pnpm install` |
| `npm install <pkg>` | `pnpm add <pkg>` |
| `npm install -D <pkg>` | `pnpm add -D <pkg>` |
| `npm uninstall <pkg>` | `pnpm remove <pkg>` |
| `npm run <script>` | `pnpm <script>` |
| `npx <bin>` | `pnpm dlx <bin>` |

El único lockfile válido es `pnpm-lock.yaml`; `package-lock.json` y `yarn.lock`
están en `.gitignore`. La versión de pnpm queda fijada en el campo
`packageManager` del `package.json`.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
