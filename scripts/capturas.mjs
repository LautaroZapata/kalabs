/**
 * Vuelve a sacar las capturas de los proyectos.
 *
 *   pnpm dlx playwright@latest install chromium
 *   node scripts/capturas.mjs
 *
 * Playwright NO es dependencia del proyecto: se usa con `pnpm dlx` cuando hay
 * que refrescar las imágenes y nada más. Meter un navegador de 300 MB en las
 * dependencias de un sitio estático no se justifica por seis imágenes. Lo
 * mismo `sharp-cli`, que pasa los PNG a WebP.
 *
 * Correrlo cuando alguno de los proyectos cambie de portada. Las capturas se
 * versionan en public/proyectos/ para que el build no dependa de que los
 * sitios estén levantados.
 */
import { chromium } from "playwright";
import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import path from "node:path";

const raiz = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const salida = path.join(raiz, "public", "proyectos");
const temporal = mkdtempSync(path.join(tmpdir(), "capturas-"));

/* La URL de cada captura es la primera pantalla que ve alguien que llega:
   la portada si el proyecto tiene una, y el alta si vive detrás de un login. */
const SITIOS = [
  { nombre: "cupo", url: "https://cupo.uy" },
  { nombre: "oleocaceres", url: "https://oleocaceres-web.vercel.app" },
  { nombre: "viagrua", url: "https://via-grua.vercel.app" },
];

/* Densidad 2 en las dos: en la carta la captura de escritorio se ve a unos
   900 px de ancho y la del celular a unos 220, así que en una pantalla retina
   a densidad 1 se notaba blanda. next/image baja el peso al servirla. */
const FORMATOS = [
  { sufijo: "", viewport: { width: 1440, height: 900 }, isMobile: false },
  { sufijo: "-movil", viewport: { width: 390, height: 844 }, isMobile: true },
];

const navegador = await chromium.launch();

for (const formato of FORMATOS) {
  const contexto = await navegador.newContext({
    viewport: formato.viewport,
    deviceScaleFactor: 2,
    isMobile: formato.isMobile,
    hasTouch: formato.isMobile,
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
    await pagina.waitForTimeout(6000);

    const archivo = `${sitio.nombre}${formato.sufijo}`;
    const png = path.join(temporal, `${archivo}.png`);
    await pagina.screenshot({ path: png });
    execFileSync(
      "pnpm",
      ["dlx", "sharp-cli", "-i", png, "-o", path.join(salida, `${archivo}.webp`), "-f", "webp", "-q", "94"],
      { stdio: "ignore", shell: process.platform === "win32" },
    );
    console.log(`${archivo}.webp  <-  ${sitio.url}`);
    await pagina.close();
  }

  await contexto.close();
}

await navegador.close();
rmSync(temporal, { recursive: true, force: true });
