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

### Generación

5. **Superdesign** (`superdesigndev/superdesign-skill`) — variantes y redesigns. Skill gratis.
6. **UI/UX Pro Max** — base de datos de diseño para cold-start.
7. **claude-design-skill** (ivoidcat, MIT) — advisor con 10 filosofías + starters + verificación en browser. Multi-agente.

### Revisión

8. **design-review** (workflow de `jezweb/claude-skills`, MIT) — QA visual en PRs.
9. **UX Designer Skill** — checklists + WCAG 2.2, poco contexto.
10. **Playwright MCP** — verificación en browser real. Open-source, gratis.

### Assets y sistema

11. **shadcn-context** — componentes reales si se usa shadcn/ui. Gratis.
12. **design-assets** (jezweb, MIT) — paletas, favicons, iconos SVG, optimización de imágenes + `seo-local-business` (JSON-LD para centros).

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
7. Ante duda entre skills, chequear installs en skills.sh y tabla en top-agent-skills.com.
