/**
 * Vuelve a sacar las capturas de los proyectos.
 *
 *   pnpm dlx playwright@latest install chromium
 *   pnpm dlx playwright@latest run-server >/dev/null 2>&1 &   # no hace falta
 *   node scripts/capturas.mjs
 *
 * Playwright NO es dependencia del proyecto: se usa con `pnpm dlx` cuando hay
 * que refrescar las imágenes y nada más. Meter un navegador de 300 MB en las
 * dependencias de un sitio estático no se justifica por tres PNG.
 *
 * Correrlo cuando alguno de los proyectos cambie de portada. Las capturas se
 * versionan en public/proyectos/ para que el build no dependa de que los
 * sitios estén levantados.
 */
import { chromium } from "playwright";
import { fileURLToPath } from "node:url";
import path from "node:path";

const raiz = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const salida = path.join(raiz, "public", "proyectos");

/* La URL de cada captura es la primera pantalla que ve alguien que llega:
   la portada si el proyecto tiene una, y el alta si vive detrás de un login. */
const SITIOS = [
  { archivo: "viagrua.png", url: "https://via-grua.vercel.app" },
  { archivo: "rog.png", url: "https://urugastos.vercel.app" },
  { archivo: "oleocaceres.png", url: "https://oleocaceres-web.vercel.app" },
];

const navegador = await chromium.launch();
const contexto = await navegador.newContext({
  /* 1600×1000 a densidad 1: alcanza para servir en pantallas grandes y deja
     los archivos en cientos de kB, no en megas. next/image hace el resto. */
  viewport: { width: 1600, height: 1000 },
  deviceScaleFactor: 1,
  colorScheme: "dark",
  locale: "es-UY",
});

for (const sitio of SITIOS) {
  const pagina = await contexto.newPage();
  try {
    await pagina.goto(sitio.url, { waitUntil: "networkidle", timeout: 45000 });
  } catch {
    /* networkidle puede no llegar nunca si el sitio hace polling. */
    await pagina.waitForLoadState("domcontentloaded");
  }
  /* que terminen las animaciones de entrada antes del disparo */
  await pagina.waitForTimeout(3500);
  await pagina.screenshot({ path: path.join(salida, sitio.archivo) });
  console.log(`${sitio.archivo}  <-  ${sitio.url}`);
  await pagina.close();
}

await navegador.close();
