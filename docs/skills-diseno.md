# Skills y recursos de diseño para desarrollo

> Archivo de referencia para tener en cuenta a la hora de desarrollar cualquier cosa. Si un skill sirve para la tarea, usarlo antes de improvisar.

## Regla de gestor de paquetes

**SIEMPRE pnpm. NUNCA npm ni yarn**, en ningún comando ni en documentación.

| En vez de           | Usar                |
| ------------------- | ------------------- |
| `npm install`       | `pnpm install`      |
| `npm install <pkg>` | `pnpm add <pkg>`    |
| `npx <bin>`         | `pnpm dlx <bin>`    |

El único lockfile válido es `pnpm-lock.yaml`. Esto incluye los skills: se instalan con `pnpm dlx skills add ...`, nunca con `npx`.

## Skills gratis

Instalar con `pnpm dlx skills add <id-del-skill>`.

### Base

1. **frontend-design** (`anthropics/skills`) — dirección estética, anti-look-genérico. ~277K installs.
2. **web-design-guidelines** (`vercel-labs/agent-skills`) — auditoría de accesibilidad / UX / forms. Gratis.
3. **theme-factory** (Composio) — tokens por tenant, directo para MiAgendaUY.
4. **brand-guidelines** (oficial) — marca lockeada por cliente.
5. **landing-page-design** (instalada) — una oferta, un público, una acción: preguntas de entrada, estructura de secciones, copy de conversión y SEO, más reglas visuales. Sus reglas visuales ceden ante el eje estético del prospecto y el `CLAUDE.md`.

### Generación

6. **Superdesign** (`superdesigndev/superdesign-skill`) — variantes y redesigns. Skill gratis.
7. **UI/UX Pro Max** — base de datos de diseño para cold-start.
8. **claude-design-skill** (ivoidcat, MIT) — advisor con 10 filosofías + starters + verificación en browser. Multi-agente.

### Revisión

9. **design-review** (workflow de `jezweb/claude-skills`, MIT) — QA visual en PRs.
10. **UX Designer Skill** — checklists + WCAG 2.2, poco contexto.
11. **Playwright MCP** — verificación en browser real. Open-source, gratis.
12. **antislop** (`miqdadbadjuber/anti-slop`, MIT, instalada) — filtro anti-AI-slop, no guía de estilo: no impone colores ni tipografías, exige un motivo escrito para cada técnica y corta lo inventado (métricas, testimonios, links muertos). Seis skills: `antislop` (núcleo, reglas R-01 a R-38 y Delivery Gate), `antislop-ui`, `antislop-copywriting`, `antislop-human` (contraste, teclado, foco; trae `contrast-check.py`), `antislop-layoutmobile` y `antislop-code` (sólo comentarios). Revisada: sin red, los scripts sólo calculan contraste. Al arrancar pregunta si se aplica durante o después; se puede fijar con `%APPDATA%\antislop\settings.json` (`{"mode":"during"}`). No correr su asistente de instalación: quiere agregar un bloque al `CLAUDE.md` y no hace falta. Si choca con Kalabs (por ejemplo, su R-21 pide selector claro/oscuro), gana Kalabs.

### Assets y sistema

13. **shadcn-context** — componentes reales si se usa shadcn/ui. Gratis.
14. **design-assets** (jezweb, MIT) — paletas, favicons, iconos SVG, optimización de imágenes + `seo-local-business` (JSON-LD para centros).

### Gráficos

15. **TanStack Charts** (`@tanstack/charts`, https://tanstack.com/charts/latest) — no es skill, es librería. Gramática de gráficos tipada y tree-shakable estilo Observable Plot, headless, SVG o Canvas. v1 estable en React, ~29 kB gzip una línea básica. Sólo con datos reales (paneles, precios, evolución); nunca de adorno.

### Ilustración

16. **anatomy** (`wheresryan22/anatomy`, MIT, instalada) — explica una idea inventando un objeto físico cuyo funcionamiento *es* la idea (un caché como una cerradura de pernos, un contexto GPU como un plotter) y lo arma en SVG isométrico con 40-150 piezas, sombreado en cuatro tonos y orden de pintado probado por auditoría. WebGL opcional para fuego, agua o luz; modo 3D en beta. Sirve sin framework (script Node que escribe HTML) o en React/Next copiando `kit/` al proyecto. Pide Node 20.10+ y Chrome para sus chequeos. Revisada: sin red, los scripts sólo levantan Chrome headless local para capturas.

### QA

17. **e2e** (TesterArmy, `tester-army/e2e`, Apache-2.0) — no es skill, es framework de tests end-to-end. El test se escribe como objetivo en lenguaje natural y un agente maneja la app hasta cumplirlo; corre sobre Playwright (Chromium, Firefox, WebKit) y también iOS/Android. Graba la primera corrida y la repite sin llamar al modelo hasta que algo cambia. Arranca con `pnpm dlx e2e init`. Necesita API key de un proveedor de modelos: cada corrida nueva cuesta tokens.
18. **security-audit** (`cloudflare/security-audit-skill`, obligatoria en cada cierre) — auditoría de seguridad defensiva sobre el código. Es **OBLIGATORIA y sin excepciones al terminar cualquier prospecto o implementación nueva** para verificar exhaustivamente todas las vulnerabilidades (fugas de secrets/API keys, inyecciones, Server Actions, IDOR, SSRF, auth y headers). Si no está disponible en el entorno, debe descargarse de inmediato (`pnpm dlx skills add cloudflare/security-audit-skill` o clonando en `.agents/skills/security-audit`). Snyk la marca "Med Risk": revisada, no hace llamadas de red ni ataca nada en vivo.

## Bibliotecas de cabecera

No son skills: son las librerías que se usan cuando aparece la necesidad. La tabla con paquetes y criterio está en el `CLAUDE.md` raíz, sección "Bibliotecas de cabecera".

- **Zod** — validaciones.
- **Temporal** — fechas (nativo, `temporal-polyfill` donde falte).
- **TanStack Table** — tablas.
- **Better Auth** — auth.
- **Motion** — animaciones.
- **Fontsource** — tipografías fuera de Next.
- **Chart.js** — gráficos simples (TanStack Charts para los que piden diseño propio).
- **Zustand** — estado global.
- **Pragmatic drag and drop** — drag & drop.
- **nuqs** — estado en la URL.

## Recursos web gratis

- **skills.sh** (https://skills.sh/) — leaderboard por installs. Filtro anti-humo: <100 installs = escepticismo.
- **top-agent-skills.com** (https://top-agent-skills.com/guides/best-skills-for-frontend-design) — ranking con tabla comparativa.
- **rohitg00/awesome-claude-design** — 68 DESIGN.md por familia estética, gratis.
- **ComposioHQ/awesome-claude-skills** y **VoltAgent/awesome-agent-skills** — catálogos masivos.
- **anthropics/skills** (GitHub) + notebook `prompting_for_frontend_aesthetics` (cookbooks) — fuente oficial, gratis.

## Referencias de diseño

Para mirar antes de nombrar el eje. Criterio de uso en el `CLAUDE.md` raíz, sección "Referencias".

- **minimal.gallery** (https://minimal.gallery/) — galería curada de sitios reales por categoría. Gratis.
- **Mobbin** (https://mobbin.com/) — 600K+ pantallas y flujos de apps y webs. Gratis limitado; MCP en Pro+, API en Team.
- **Kage** (https://kage.design/) — 490+ interfaces y 2.500+ componentes de productos reales, cada uno convertible en prompt.
- **Refero Styles** (https://styles.refero.design/) — 2.000+ sistemas de diseño extraídos de sitios de producto, exportables como `DESIGN.md`.
- **designmd.ai** (https://designmd.ai/) — sistemas de diseño en formato `DESIGN.md`, gratis, con CLI y MCP.
- **VibePrompt** (https://vibeprompts.dev/) — 286 prompts de layout Tailwind. Sólo piezas funcionales (login, tablas, formularios); nunca secciones de venta.

## Registros de componentes

Se copia el componente que se usa con `pnpm dlx shadcn@latest add <url>`. Criterio en la tabla "Componentes" del `CLAUDE.md` raíz.

- **beUI** (https://beui.dev/) — Motion + Tailwind 4, gratis MIT, Pro pago único.
- **Arc UI** (https://uiarc.dev/) — 159 componentes y 91 bloques sobre shadcn; Pro USD 199; MCP.
- **Iconography Encyclopedia** (https://encyclopedia.iconography.co/#view=directory) — glosario de diseño de iconos (150+ entradas: grilla, trazo, pixel snapping, coherencia). Referencia, no catálogo.
- **Kobra** (https://kobra.systems/) — 81 componentes sobre shadcn, 10 gratis; fuerte en controles (input OTP).
- **affectUI** (https://www.affectui.com/) — 96 piezas de un archivo, sin Tailwind ni Motion; 39 gratis MIT; MCP.
- **BoardUI** (https://www.boardui.com/) — 85 componentes para dashboards y agentes; gratis MIT, Pro €149-349.
- **transitions.dev** (https://transitions.dev/) — 43+ transiciones en CSS y React. Su agente (`transitions-agent`) sin revisar.
- **EvilCharts** (https://evilcharts.com/) — gráficos shadcn sobre Recharts o ECharts; cuenta como la librería de gráficos del proyecto.

## Tipografías de referencia (más allá de Switzer y Chillax)

> **Regla anti-inercia**: No usar la dupla Switzer (cuerpo) + Chillax (titulares) como comodín por defecto. Chillax tiene glifos alternativos y redondeces que no encajan en rubros serios, técnicos o industriales; y Switzer se convirtió en la "nueva Inter" de las agencias de IA. La tipografía se define por el rubro, el material del cliente y el tono del negocio.

### 1. Sans y grotescas de lectura (Cuerpo y estructura sólida — alternativas a Switzer)

| Familia | Fuente / Paquete | Qué aporta | Dónde usarla |
| --- | --- | --- | --- |
| **Hanken Grotesk** | `next/font/google` | Ancha, abierta, neutra pero con aire propio. Excelente legibilidad en párrafos y versalitas chicas sin competir con el titular. | La que sostiene el sitio de Kalabs. Ideal para servicios, consultoría y cuerpos de texto limpios. |
| **Instrument Sans** | `next/font/google` | Grotesca moderna inspirada en el modernismo editorial de los 70s. Más humana y orgánica que Switzer o Inter. | Portafolios, estudios de diseño, arquitectura, gastronomía cuidada. |
| **Plus Jakarta Sans** | `next/font/google` | Geométrica limpia con aperturas frescas y espíritu contemporáneo. Gran rendimiento en pantalla. | SaaS, productos digitales, salud privada, tecnología sobria. |
| **Albert Sans** | `next/font/google` | Geométrica cálida inspirada en la tipografía escandinava. Amable y luminosa sin verse infantil. | Educación, bienestar, psicología, proyectos cercanos. |
| **Satoshi** | Fontshare / `@fontsource/satoshi` | Geométrica racionalista pura, proporciones pulidas y elegantes si se busca un corte geométrico limpio. | Marcas de producto, diseño industrial, moda sobria. |
| **General Sans** | Fontshare | Grotesca francesa clásica, estructurada, formal y contundente. | Empresas, consultoría de negocios, firmas contables. |

### 2. Display y titulares con carácter (Fuerza y presencia — alternativas a Chillax)

| Familia | Fuente / Paquete | Qué aporta | Dónde usarla |
| --- | --- | --- | --- |
| **Bricolage Grotesque** | `next/font/google` | Variable con eje óptico (`opsz`). A cuerpo grande cierra espaciado y acentúa curvas expresivas; a cuerpo chico abre. | Titulares con carácter propio sin caer en lo juguetón de Chillax. Usada en Kalabs. |
| **Clash Display** | Fontshare / `@fontsource/clash-display` | Display brutalista contemporánea, peso concentrado, esquinas filosas y presencia contundente. | Eventos, moda urbana, música, lanzamientos de impacto, diseño audaz. |
| **Syne** | `next/font/google` | Experimental, artística, pesos `Extra-Bold` y `Black` con contrastes extremos de ancho. | Arte, diseño de autor, gastronomía conceptual, galerías, cultura. |
| **Cabinet Grotesk** | Fontshare | Grotesca display con terminaciones secas y proporciones condensadas. | Donde Chillax queda infantil o blanda: identidad fuerte, afiches, editorial moderno. |
| **Space Grotesk** | `next/font/google` | Grotesca técnica derivada de Space Mono con espaciado proporcional. | Software, infraestructura, ingeniería, laboratorios. |
| **Krona One** | `next/font/google` | Baja, ancha, de proporciones horizontales pesadas y geométricas. | Titulares muy cortos de impacto horizontal, tecnología, automovilismo. |

### 3. Técnicas, condensadas e industriales (Oficios, deporte, taller, logística)

| Familia | Fuente / Paquete | Qué aporta | Dónde usarla |
| --- | --- | --- | --- |
| **Archivo** | `next/font/google` (`axes: ["wdth"]`) | Navaja suiza variable: peso (100–900) y ancho (`wdth` 62%–125%). Permite titulares monolíticos en mayúsculas condensadas y cifras de tabla precisas. | Gimnasios y centros de entrenamiento (Sismo Club), automotoras (Ro Cars), canchas, estadísticas. |
| **Barlow / Barlow Condensed** | `next/font/google` | Inspirada en la señalética de autopistas de California. Industrial, sincera, sin firuletes. | Ligas deportivas (Liga Clandestina), depósitos, logística, transporte, talleres mecánicos. |
| **Bebas Neue** | `next/font/google` | Clásica condensada display en mayúsculas puras. Máxima pegada vertical. | Precios destacados, carteles de almacén, promociones directas, ofertas. |
| **Chivo** | `next/font/google` | Grotesca de alta energía y pesos gruesos sólidos. | Maquinaria, construcción, transporte pesado, proyectos de fuerza. |

### 4. Serifas editoriales y cálidas (Salud, derecho, estética, alta gama, literatura)

| Familia | Fuente / Paquete | Qué aporta | Dónde usarla |
| --- | --- | --- | --- |
| **Fraunces** | `next/font/google` | Serif variable de espíritu 70s con ejes `SOFT` (suavidad) y `opsz`. Calidez humana y artesanía. | Consultorios de salud (Cibils), estética holística, panaderías artesanales, estudios boutique. |
| **Instrument Serif** | `next/font/google` | Serif estilizada con alto contraste de trazo e itálica elegante de revista de moda. | Marcas de indumentaria (Vilary), joyería, hotelería, editoriales premium. |
| **Newsreader** | `next/font/google` | Diseñada específicamente para lectura continua de textos largos y periódicos. | Estudios jurídicos, notarías, manifiestos serios, publicaciones extensas. |
| **Bodoni Moda** | `next/font/google` | Didona monumental de contraste extremo entre trazos gruesos y finos. | Belleza, alta costura, sesiones fotográficas (Brava Studio). |
| **Cormorant Garamond** | `next/font/google` | Tradición clásica, nobleza y fineza en las curvas. | Bodegas, restaurantes de mantel largo, herencia familiar. |

### 5. Monoespaciadas funcionales (Datos duros, fichas técnicas, código)

| Familia | Fuente / Paquete | Qué aporta | Dónde usarla |
| --- | --- | --- | --- |
| **IBM Plex Mono** | `next/font/google` | Ingeniería pura, sobria, balanceada. Diferencia clara entre caracteres. | Fichas técnicas, datos de protocolo, fórmulas (Victoria Grenno). |
| **Space Mono** | `next/font/google` | Geométrica con personalidad retro-computacional. | Proyectos con estética sci-fi, web técnica o hardware. |
| **JetBrains Mono** | `next/font/google` | Diseñada para legibilidad técnica y cifras tabulares (`tabular-nums`). | Paneles de datos, logs, terminales, comparativas numéricas. |

### Duplas probadas por rubro

- **Estudio / Agencia digital**: Bricolage Grotesque (titular) + Hanken Grotesk (cuerpo)
- **Automotora / Taller**: Archivo condensada con `font-stretch` (titular) + Instrument Sans (cuerpo)
- **Consultorio médico / Psicología**: Fraunces (titular cálido) + Plus Jakarta Sans o Albert Sans (cuerpo)
- **Estudio jurídico / Escribanía**: Newsreader (titular formal) + Instrument Sans (cuerpo)
- **Moda / Cosmética premium**: Instrument Serif o Bodoni Moda (titular) + Nunito o Instrument Sans (cuerpo)
- **Club / Centro deportivo**: Archivo o Barlow Condensed (titular en mayúsculas) + Barlow o Hanken (cuerpo)
- **Ingeniería / Paneles de datos**: Space Grotesk (titular) + Plus Jakarta Sans (cuerpo) + IBM Plex Mono (datos)

## Criterio de uso

1. Antes de diseñar, revisar `frontend-design` + `web-design-guidelines`.
2. Si hay multi-tenant o marca por cliente, sumar `theme-factory` / `brand-guidelines`.
3. Para variantes rápidas, `Superdesign` o `UI/UX Pro Max`.
4. Todo cambio visual se verifica con `design-review` y/o Playwright en browser real, no solo por código.
5. Si se usa shadcn/ui, consultar `shadcn-context` para usar componentes reales en vez de reinventarlos.
6. Para assets, usar `design-assets` (paletas, favicons, SVG, optimización de imágenes) y JSON-LD con `seo-local-business` cuando aplique.
7. Para landings, pasar por `landing-page-design` antes de elegir secciones, titulares y CTA.
8. Si hay datos reales que graficar, `TanStack Charts`. Si hay un mecanismo o proceso que explicar, una figura con `anatomy`.
9. Todo flujo que importe (pedido, contacto, panel, filtros) se prueba con `e2e` antes de mostrarlo. **SIEMPRE, al terminar cualquier prospecto o implementación nueva, es OBLIGATORIO ejecutar `security-audit` de Cloudflare para comprobar exhaustivamente todas las vulnerabilidades antes de dar por cerrada la tarea.**
10. Al cerrar un prospecto, pasar `antislop` con `antislop-ui` y `antislop-human` como auditoría (modo después), junto a `web-design-guidelines`; para textos, `antislop-copywriting`.
11. Elegir la tipografía según el oficio y el eje del cliente (consultar la sección de tipografías de referencia y evitar la inercia de Switzer + Chillax).
12. Ante duda entre skills, chequear installs en skills.sh y tabla en top-agent-skills.com.
