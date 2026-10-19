/**
 * Baja las piezas del feed de Instagram a PNG.
 *
 * Las compone `app/feed/[pieza]/route.tsx` con next/og; acá sólo se guardan
 * los bytes. Necesita el servidor de desarrollo andando en otra terminal.
 *
 *   pnpm dev
 *   pnpm feed                        → todas
 *   pnpm feed campo-turnos promesas  → sólo ésas
 *
 * El puerto se cambia con FEED_URL si `next dev` levantó en otro:
 *
 *   FEED_URL=http://localhost:3001 pnpm feed
 */
import { mkdir, writeFile } from "node:fs/promises";
import { argv, env, exit } from "node:process";

const BASE = env.FEED_URL ?? "http://localhost:3000";

/**
 * Las piezas van a Drive, no al repo.
 *
 * Son material de trabajo que se sube a Instagram a mano y que Matías tiene
 * que poder abrir sin clonar nada. En el repo vive el diseño —el catálogo y
 * los componentes—, que es lo que se versiona; el PNG se rehace en un
 * comando. Se cambia el destino con FEED_OUT si hace falta otra carpeta.
 */
const SALIDA = env.FEED_OUT ?? "J:/Mi unidad/IG Feed";

async function indice() {
  try {
    const r = await fetch(`${BASE}/feed`);
    if (!r.ok) throw new Error(`el índice contestó ${r.status}`);
    return await r.json();
  } catch (e) {
    console.error(`No se pudo leer el índice en ${BASE}/feed — ${e.message}`);
    console.error("¿Está corriendo `pnpm dev`? Si levantó en otro puerto, pasá FEED_URL.");
    exit(1);
  }
}

const pedidas = argv.slice(2);
const todas = await indice();
const piezas = pedidas.length ? todas.filter((p) => pedidas.includes(p.slug)) : todas;

if (!piezas.length) {
  console.error(`Ninguna pieza coincide con: ${pedidas.join(", ")}`);
  console.error(`Hay estas: ${todas.map((p) => p.slug).join(", ")}`);
  exit(1);
}

await mkdir(SALIDA, { recursive: true });

let fallos = 0;
for (const p of piezas) {
  const r = await fetch(`${BASE}/feed/${p.slug}`);
  if (!r.ok) {
    console.error(`✗ ${p.slug} — ${r.status} ${await r.text()}`);
    fallos += 1;
    continue;
  }
  const archivo = `${SALIDA}/${p.slug}.png`;
  await writeFile(archivo, Buffer.from(await r.arrayBuffer()));
  console.log(`✓ ${archivo}  ${p.titulo}`);
}

console.log(`\n${piezas.length - fallos} de ${piezas.length} en ${SALIDA}/`);
if (fallos) exit(1);
