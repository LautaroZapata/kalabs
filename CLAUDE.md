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
