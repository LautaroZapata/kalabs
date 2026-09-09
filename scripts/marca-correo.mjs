/**
 * Genera el PNG del isotipo que va en la cabecera del acuse.
 *
 *   pnpm dlx playwright@latest install chromium
 *   node scripts/marca-correo.mjs
 *
 * Es un PNG y no el SVG que ya vive en components/Marca.tsx porque Gmail
 * descarta los SVG de los correos: llegan como adjunto roto o directamente no
 * llegan. Un correo sólo puede contar con PNG, JPG y GIF.
 *
 * Sale a 3x del tamaño con el que se muestra —31×30 en el correo, 93×90 en el
 * archivo— para que no se vea pastoso en pantallas densas, que en correo es
 * donde más se lee. Pesa unos pocos kB, así que la densidad sale gratis.
 *
 * Fondo transparente y trazo en brasa fija: la cabecera del acuse es tinta
 * (#161a1c) y no hay `currentColor` que llegue hasta un cliente de correo.
 *
 * Playwright no es dependencia del proyecto —mismo criterio que capturas.mjs—:
 * se corre a mano cuando el isotipo cambie, que es casi nunca. El PNG se
 * versiona para que el build no dependa de un navegador.
 */
import { chromium } from "playwright";
import { fileURLToPath } from "node:url";
import path from "node:path";

const raiz = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const salida = path.join(raiz, "public", "marca-correo.png");

const EMBER = "#ff6b1a";
const ESCALA = 3;
const ANCHO = 31;
const ALTO = 30;

/* El mismo `path` de components/Marca.tsx. Se repite acá por la misma razón
   que en opengraph-image.tsx: esto se compone fuera del árbol de React. */
const TRAZO = `<path transform="matrix(3.355663,0,0,3.355663,-1500.083401,-5850.937023)" d="M966.508,1743.601L1025.877,1802.97C1025.877,1802.97 995.231,1930.64 984.649,1994.269C974.162,2057.327 962.385,2184.745 962.385,2184.745C962.385,2184.745 977.731,2212.419 981.351,2227.622C986.161,2247.824 992.345,2294.137 991.245,2305.956C990.687,2311.958 979.206,2302.6 974.754,2298.535C962.111,2286.991 927.341,2249.611 915.385,2236.693C910.866,2231.809 906.04,2226.111 903.017,2221.026C900.304,2216.463 897.245,2206.183 897.245,2206.183C897.245,2206.183 901.917,2139.943 901.367,2123.727C901.18,2118.198 899.435,2108.201 893.946,2108.884C855.329,2113.694 733.843,2135.958 669.664,2152.587C614.716,2166.824 508.873,2208.657 508.873,2208.657L447.03,2148.464L597.926,2094.042L851.069,2042.919C851.069,2042.919 821.659,1962.524 813.963,1924.181C806.637,1887.681 804.206,1842.274 804.893,1812.864C805.41,1790.716 818.086,1747.724 818.086,1747.724C818.086,1747.724 870.171,1798.847 883.227,1813.689C889.081,1820.344 894.521,1828.119 896.42,1836.777C902.329,1863.713 918.683,1975.304 918.683,1975.304C918.683,1975.304 932.976,1862.201 940.947,1823.584C946.605,1796.172 966.508,1743.601 966.508,1743.601Z" fill="${EMBER}"/>`;

const navegador = await chromium.launch();
const pagina = await navegador.newPage({
  viewport: { width: ANCHO, height: ALTO },
  deviceScaleFactor: ESCALA,
});

await pagina.setContent(
  `<html><body style="margin:0">
     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1943 1894" width="${ANCHO}" height="${ALTO}">${TRAZO}</svg>
   </body></html>`,
);

await pagina.screenshot({ path: salida, omitBackground: true });
console.log(`marca-correo.png  ${ANCHO * ESCALA}×${ALTO * ESCALA}`);

await navegador.close();
