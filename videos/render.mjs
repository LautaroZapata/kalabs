/**
 * Baja los videos del feed a MP4, con su portada en PNG.
 *
 *   pnpm render                  → todos
 *   pnpm render web sistemas     → sólo ésos
 *
 * Van a Drive, igual que las piezas fijas (ver scripts/feed.mjs). Se cambia el
 * destino con VIDEO_OUT.
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { argv, env, exit } from "node:process";
import { bundle } from "@remotion/bundler";
import { getCompositions, renderMedia, renderStill } from "@remotion/renderer";
import { conAlias } from "./alias.mjs";

const SALIDA = env.VIDEO_OUT ?? "J:/Mi unidad/IG Feed/Videos";

const serveUrl = await bundle({
  entryPoint: path.resolve("src/index.ts"),
  webpackOverride: conAlias,
});

const pedidas = argv.slice(2);
const todas = await getCompositions(serveUrl);
const videos = pedidas.length ? todas.filter((c) => pedidas.includes(c.id)) : todas;
if (!videos.length) {
  console.error(`Ningún video coincide. Hay estos: ${todas.map((c) => c.id).join(", ")}`);
  exit(1);
}

await mkdir(SALIDA, { recursive: true });

for (const composition of videos) {
  const mp4 = `${SALIDA}/${composition.id}.mp4`;
  await renderMedia({
    composition,
    serveUrl,
    codec: "h264",
    crf: 18,
    pixelFormat: "yuv420p",
    outputLocation: mp4,
  });
  /* La portada: el cuadro donde el mensaje ya está entero. Instagram la
     recorta a 3:4 en la grilla, así que se elige uno con todo adentro. */
  const png = `${SALIDA}/${composition.id}-portada.png`;
  await renderStill({
    composition,
    serveUrl,
    frame: composition.props.portada ?? 0,
    output: png,
  });
  console.log(`✓ ${mp4}`);
}

console.log(`\n${videos.length} en ${SALIDA}/`);
