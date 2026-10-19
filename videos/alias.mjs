/**
 * Los videos leen los textos y la marca de `lib/` del sitio —`SITE`,
 * `SERVICIOS`, las promesas, el isotipo— para no repetirlos. Esos módulos se
 * importan entre sí con `@/`, el alias de Next; acá se le enseña lo mismo al
 * webpack de Remotion. Lo usan el estudio y el render.
 *
 * La raíz sale del directorio de trabajo y no de `import.meta`: Remotion
 * compila `remotion.config.ts` a CommonJS y ahí `import.meta` no existe. Los
 * scripts de `package.json` corren siempre desde `videos/`.
 */
import path from "node:path";

const RAIZ = path.resolve(process.cwd(), "..");

export const conAlias = (c) => ({
  ...c,
  resolve: { ...c.resolve, alias: { ...(c.resolve?.alias ?? {}), "@": RAIZ } },
});
