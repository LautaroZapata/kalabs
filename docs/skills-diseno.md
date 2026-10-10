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

### QA

16. **e2e** (TesterArmy, `tester-army/e2e`, Apache-2.0) — no es skill, es framework de tests end-to-end. El test se escribe como objetivo en lenguaje natural y un agente maneja la app hasta cumplirlo; corre sobre Playwright (Chromium, Firefox, WebKit) y también iOS/Android. Graba la primera corrida y la repite sin llamar al modelo hasta que algo cambia. Arranca con `pnpm dlx e2e init`. Necesita API key de un proveedor de modelos: cada corrida nueva cuesta tokens.
17. **security-audit** (`cloudflare/security-audit-skill`, instalada) — auditoría de seguridad defensiva sobre el código: sólo confirma hallazgos que cruzan un límite real y propone el arreglo mínimo. Modo guía por defecto; la auditoría completa de seis fases es multiagente y cara, sólo a pedido. Snyk la marca "Med Risk": revisada, no hace llamadas de red ni ataca nada en vivo.

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

## Criterio de uso

1. Antes de diseñar, revisar `frontend-design` + `web-design-guidelines`.
2. Si hay multi-tenant o marca por cliente, sumar `theme-factory` / `brand-guidelines`.
3. Para variantes rápidas, `Superdesign` o `UI/UX Pro Max`.
4. Todo cambio visual se verifica con `design-review` y/o Playwright en browser real, no solo por código.
5. Si se usa shadcn/ui, consultar `shadcn-context` para usar componentes reales en vez de reinventarlos.
6. Para assets, usar `design-assets` (paletas, favicons, SVG, optimización de imágenes) y JSON-LD con `seo-local-business` cuando aplique.
7. Para landings, pasar por `landing-page-design` antes de elegir secciones, titulares y CTA.
8. Si hay datos reales que graficar, `TanStack Charts`.
9. Todo flujo que importe (pedido, contacto, panel, filtros) se prueba con `e2e` antes de mostrarlo; si hay panel, login o datos que se escriben, pasa también por `security-audit` en modo guía.
10. Al cerrar un prospecto, pasar `antislop` con `antislop-ui` y `antislop-human` como auditoría (modo después), junto a `web-design-guidelines`; para textos, `antislop-copywriting`.
11. Ante duda entre skills, chequear installs en skills.sh y tabla en top-agent-skills.com.
