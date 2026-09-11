# Kalabs

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
