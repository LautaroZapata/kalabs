/**
 * El escritorio del estudio, en isométrica: la mesa con el monitor, un
 * servidor chico, el teclado, el mouse y la taza.
 *
 * En la pantalla se construye un sitio, un paso por promesa: el boceto, la
 * estructura y el sitio terminado. Cada tramo enciende además una de las tres
 * luces del servidor.
 *
 * Todo se calcula una vez, en el servidor, con el kit de Anatomy (`lib/iso`).
 * Lo que pasa en la pantalla se dibuja en el plano del vidrio (`sideMatrix`),
 * así que un corrimiento o una escala 2D ahí adentro son movimientos de verdad
 * sobre esa cara.
 *
 * Unidades del mundo: x e y en el piso, z hacia arriba. El frente del monitor
 * y del servidor mira a +y y queda a la izquierda.
 */
import * as kit from "../../lib/iso/iso-kit.mjs";

/* El kit es JavaScript y sus tipos inferidos son más estrechos que su uso:
   se lo trata como lo que es, sin tipos, y los tipos van en este archivo. */
const k: any = kit;

type P2 = [number, number];
type P3 = [number, number, number];

export const ANCHO = 560;
export const ALTO = 470;

const AZIMUT = 60;
const ELEVACION = 30;

/* ---------- el mundo ---------- */
const MESA = { x: -128, y: -64, w: 264, d: 136, r: 6 };
const Z_MESA = 0;

const PIE = { x: -50, y: -54, w: 52, d: 30, r: 7 };
const CUELLO = { x: -31, y: -47, w: 14, d: 7, r: 2 };
const MONITOR = { x: -98, y: -38, w: 148, d: 7, r: 2.5 };
const Z_MONITOR = 30;
const MONITOR_ALTO = 92;
const FRENTE_MONITOR = MONITOR.y + MONITOR.d; // y del vidrio

/* El vidrio, en coordenadas de la cara: u = x, v = -z. */
const VIDRIO = { u0: -92, u1: 44, v0: -(Z_MONITOR + MONITOR_ALTO - 6), v1: -(Z_MONITOR + 12) };

const TORRE = { x: 84, y: -52, w: 40, d: 62, r: 3 };
const TORRE_ALTO = 96;
const FRENTE_TORRE = TORRE.y + TORRE.d;

const ALFOMBRA = { x: -92, y: -4, w: 150, d: 50, r: 4 };
const TECLADO = { x: -82, y: 6, w: 100, d: 32, r: 3 };
const MOUSE = { x: 30, y: 14, w: 13, d: 21, r: 6.5 };
const TAZA: P2 = [-110, 34];

/* ---------- cámara ---------- */
const extremos: P3[] = [
  ...k.boxCorners(MESA, -12, 0),
  ...k.boxCorners(MONITOR, Z_MONITOR, Z_MONITOR + MONITOR_ALTO),
  ...k.boxCorners(TORRE, 0, TORRE_ALTO),
];
export const P = k.fitProjection(extremos, ANCHO, ALTO, { pad: 14, azimuth: AZIMUT, elevation: ELEVACION });

/* ---------- ayudas ---------- */
const S = (paths: unknown, opts: Record<string, unknown> = {}) => k.solidSvg(paths, opts);
const L = (d: string, opts: Record<string, unknown> = {}) => k.lineSvg(d, opts);
const fx = (n: number) => Math.round(n * 100) / 100;

/** Un rectángulo redondeado en coordenadas de una cara, como `path`. */
function rr(u: number, v: number, w: number, h: number, r: number) {
  const pts = k.roundedPlan({ x: u, y: v, w, d: h, r }, 4) as P2[];
  return pts.map(([a, b], i) => `${i ? "L" : "M"}${fx(a)} ${fx(b)}`).join("") + "Z";
}

/** La cara que mira a +y a la altura `y`: local (u, v) = mundo (u, y, -v). */
const caraFrente = (y: number) => k.sideMatrix([0, y], 0, P, "left");
/** La cara que mira a +x a la altura `x`: local (u, v) = mundo (x, -u, -v). */
const caraCostado = (x: number) => k.sideMatrix([x, 0], 0, P, "right");

const porProfundidad = <T extends { at: P3 }>(items: T[]) =>
  [...items].sort((a, b) => k.depthOf(a.at, P) - k.depthOf(b.at, P));

/* ==========================================================================
   LA MESA
   ========================================================================== */
function mesa() {
  const out: string[] = [];
  out.push(`<path class="iso-halo" d="${k.haloOf(MESA, -12, 2, P)}"/>`);
  out.push(
    S(k.slabOf(MESA, -12, 12, P, 6, 1.2), {
      tone: "mid",
      inner: L(k.sideSeam(MESA, -9, P, 6), { tone: "faint" }),
    }),
  );
  /* La alfombra del teclado, apenas levantada. */
  out.push(S(k.slabOf(ALFOMBRA, Z_MESA, 0.8, P, 4), { tone: "lo", crease: "none" }));
  out.push(L(k.planOutline(k.insetPlan(ALFOMBRA, 2.5), Z_MESA + 0.8, P, 4), { tone: "faint" }));
  return out.join("");
}

/* ==========================================================================
   EL MONITOR
   ========================================================================== */
function monitor() {
  const out: string[] = [];
  out.push(`<path class="iso-halo" d="${k.haloOf(PIE, Z_MESA, 1, P)}"/>`);
  out.push(S(k.slabOf(PIE, Z_MESA, 3, P, 6, 0.6), { tone: "mid" }));
  out.push(S(k.slabOf(CUELLO, Z_MESA + 3, Z_MONITOR + 10 - 3, P, 3, 0.4), { tone: "mid" }));
  out.push(
    S(k.slabOf(MONITOR, Z_MONITOR, MONITOR_ALTO, P, 3, 0.6), {
      tone: "hi",
      inner: L(k.sideSeam(MONITOR, Z_MONITOR + 6, P, 3), { tone: "faint" }),
    }),
  );
  /* El vidrio y lo que muestra, en el plano del frente. */
  const { u0, u1, v0, v1 } = VIDRIO;
  out.push(
    `<g transform="${caraFrente(FRENTE_MONITOR + 0.05)}">` +
      `<path class="pc-vidrio" d="${rr(u0, v0, u1 - u0, v1 - v0, 1.5)}"/>` +
      `<clipPath id="pc-vidrio"><path d="${rr(u0, v0, u1 - u0, v1 - v0, 1.5)}"/></clipPath>` +
      `<g clip-path="url(#pc-vidrio)">${pantalla()}</g>` +
      `<path class="iso-line" data-tone="lo" d="${rr(u0, v0, u1 - u0, v1 - v0, 1.5)}"/>` +
      /* La luz de encendido, en el borde de abajo. */
      `<circle class="pc-luz-monitor" cx="${u1 - 4}" cy="${-(Z_MONITOR + 6)}" r="0.9"/>` +
      `</g>`,
  );
  return out.join("");
}

/* ---------- la pantalla ----------
   Un navegador con un sitio que se va construyendo, un paso por promesa:
   primero el boceto (las líneas se dibujan solas con el scroll), después la
   estructura (los bloques se rellenan) y al final el sitio terminado, con su
   color y el cursor sobre el botón. Arriba, en la barra, un aviso dice por
   qué promesa va. Las tres capas comparten las mismas posiciones: lo que
   cambia es cuánto está hecho, no dónde está. */
function pantalla() {
  const { u0, u1, v0, v1 } = VIDRIO;
  const w = u1 - u0;
  const barra = 7;
  const x0 = u0 + 5;
  const y0 = v0 + barra + 3;
  const out: string[] = [];

  /* El sitio, como lista de bloques: [x, y, ancho, alto, radio, clase de color]. */
  type Bloque = [number, number, number, number, number, string];
  const bloques: Bloque[] = [
    [x0, y0 + 1, 14, 3.6, 1, "logo"],
    [x0 + 86, y0 + 1.8, 9, 2, 1, "link"],
    [x0 + 99, y0 + 1.8, 9, 2, 1, "link"],
    [x0 + 112, y0 + 1.8, 14, 2, 1, "link"],
    [x0, y0 + 12, 62, 5.2, 1.2, "titulo"],
    [x0, y0 + 19.6, 46, 5.2, 1.2, "titulo"],
    [x0, y0 + 29, 56, 2, 1, "texto"],
    [x0, y0 + 33, 48, 2, 1, "texto"],
    [x0, y0 + 39.5, 24, 7, 3.5, "boton"],
    [x0 + 74, y0 + 10, 52, 37, 2, "foto"],
    [x0, y0 + 52, 39, 10, 1.6, "tarjeta"],
    [x0 + 43.5, y0 + 52, 39, 10, 1.6, "tarjeta"],
    [x0 + 87, y0 + 52, 39, 10, 1.6, "tarjeta"],
  ];
  const caja = ([x, y, bw, bh, r]: Bloque) => rr(x, y, bw, bh, r);

  out.push(`<rect class="pc-fondo" x="${u0}" y="${v0}" width="${w}" height="${v1 - v0}"/>`);

  /* 1 · El boceto: los contornos, que se trazan con el recorrido. */
  out.push(
    `<g class="pc-capa pc-capa--boceto">` +
      bloques.map((b) => `<path class="pc-trazo" pathLength="1" d="${caja(b)}"/>`).join("") +
      /* La cruz del lugar de la foto, como en todo boceto. */
      `<path class="pc-trazo" pathLength="1" d="M${x0 + 74} ${y0 + 10}L${x0 + 126} ${y0 + 47}M${x0 + 126} ${y0 + 10}L${x0 + 74} ${y0 + 47}"/>` +
      `</g>`,
  );

  /* 2 · La estructura: los bloques rellenos, en gris. */
  out.push(
    `<g class="pc-capa pc-capa--estructura">` +
      bloques.map((b) => `<path class="pc-bloque" d="${caja(b)}"/>`).join("") +
      `</g>`,
  );

  /* 3 · El sitio terminado: color, la foto con su paisaje y el cursor. */
  const [fx0, fy0, fw, fh] = [x0 + 74, y0 + 10, 52, 37];
  out.push(
    `<g class="pc-capa pc-capa--terminado">` +
      bloques
        .filter(([, , , , , c]) => c !== "foto")
        .map((b) => `<path class="pc-color pc-color--${b[5]}" d="${caja(b)}"/>`)
        .join("") +
      `<clipPath id="pc-foto"><path d="${rr(fx0, fy0, fw, fh, 2)}"/></clipPath>` +
      `<g clip-path="url(#pc-foto)">` +
      `<rect class="pc-color pc-color--cielo" x="${fx0}" y="${fy0}" width="${fw}" height="${fh}"/>` +
      `<circle class="pc-color pc-color--sol" cx="${fx0 + 36}" cy="${fy0 + 11}" r="5"/>` +
      `<path class="pc-color pc-color--cerro" d="M${fx0} ${fy0 + fh}L${fx0 + 16} ${fy0 + 20}L${fx0 + 26} ${fy0 + 29}L${fx0 + 37} ${fy0 + 17}L${fx0 + fw} ${fy0 + 31}V${fy0 + fh}Z"/>` +
      `</g>` +
      `<g class="pc-cursor" data-paso="2">` +
      `<path class="pc-flecha" d="M${x0 + 18} ${y0 + 43}l0 7.2l1.9 -1.8l1.5 3.2l1.3 -0.6l-1.5 -3.1l2.6 -0.2Z"/>` +
      `</g>` +
      `</g>`,
  );

  /* La barra del navegador: los tres puntos, la dirección y el aviso. */
  out.push(`<rect class="pc-barra" x="${u0}" y="${v0}" width="${w}" height="${barra}"/>`);
  for (let i = 0; i < 3; i++) {
    out.push(`<circle class="pc-punto${i === 0 ? " pc-punto--brasa" : ""}" cx="${u0 + 4 + i * 3.4}" cy="${v0 + barra / 2}" r="1.05"/>`);
  }
  out.push(`<rect class="pc-direccion" x="${u0 + 16}" y="${v0 + 1.6}" width="44" height="3.8" rx="1.9"/>`);
  out.push(`<text class="pc-texto pc-texto--direccion" x="${u0 + 19}" y="${v0 + 4.65}">tunegocio.uy</text>`);
  const avisos = ["Consulta · sin costo", "Presupuesto · cerrado", "Respuesta en 24 h"];
  out.push(
    avisos
      .map(
        (t, i) =>
          `<g class="pc-aviso" data-tramo="${i}">` +
          `<rect class="pc-chip" x="${u1 - 40}" y="${v0 + 1.4}" width="37.5" height="4.2" rx="2.1"/>` +
          `<text class="pc-texto pc-texto--chip" x="${u1 - 21.25}" y="${v0 + 4.6}" text-anchor="middle">${t}</text>` +
          `</g>`,
      )
      .join(""),
  );
  return out.join("");
}

/* ==========================================================================
   EL SERVIDOR
   ========================================================================== */
function torre() {
  const out: string[] = [];
  out.push(`<path class="iso-halo" d="${k.haloOf(TORRE, Z_MESA, 2, P)}"/>`);
  /* Dos patines abajo. */
  for (const y of [TORRE.y + 6, TORRE.y + TORRE.d - 10]) {
    out.push(S(k.slabOf({ x: TORRE.x + 3, y, w: TORRE.w - 6, d: 4, r: 1 }, Z_MESA, 2, P, 2), { tone: "lo" }));
  }
  out.push(
    S(k.slabOf(TORRE, Z_MESA + 2, TORRE_ALTO - 2, P, 3, 0.8), {
      tone: "hi",
      inner: L(k.sideSeam(TORRE, TORRE_ALTO - 8, P, 3), { tone: "faint" }),
    }),
  );

  /* El frente: dos bahías, el botón y las tres luces. */
  const u0 = TORRE.x + 6;
  const w = TORRE.w - 12;
  const bahias = [0, 1]
    .map((i) => {
      const v = -(TORRE_ALTO - 16 - i * 13);
      return (
        `<path class="pc-bahia" d="${rr(u0, v, w, 9, 1)}"/>` +
        `<path class="iso-line" data-tone="lo" d="${rr(u0, v, w, 9, 1)}"/>` +
        `<path class="iso-line" data-tone="faint" d="M${u0 + 3} ${v + 4.5}H${u0 + w - 9}"/>` +
        `<circle class="pc-tornillo" cx="${u0 + w - 3.5}" cy="${v + 4.5}" r="0.7"/>`
      );
    })
    .join("");
  const luces = [0, 1, 2]
    .map((i) => `<circle class="pc-led" data-tramo="${i}" cx="${u0 + 4 + i * 6}" cy="${-(TORRE_ALTO - 48)}" r="1.5"/>`)
    .join("");
  const rejilla = Array.from({ length: 6 }, (_, i) => `<path d="${rr(u0, -(30 - i * 4), w, 1.6, 0.8)}"/>`).join("");
  out.push(
    `<g transform="${caraFrente(FRENTE_TORRE + 0.05)}">` +
      bahias +
      `<circle class="pc-boton" cx="${u0 + w - 4}" cy="${-(TORRE_ALTO - 48)}" r="3.2"/>` +
      `<circle class="iso-line" data-tone="mid" cx="${u0 + w - 4}" cy="${-(TORRE_ALTO - 48)}" r="3.2"/>` +
      `<path class="iso-line" data-tone="hi" d="M${u0 + w - 4} ${-(TORRE_ALTO - 48) - 1.6}V${-(TORRE_ALTO - 48)}"/>` +
      luces +
      `<g class="pc-rejilla">${rejilla}</g>` +
      `</g>`,
  );

  /* El costado: una rejilla larga. */
  const ranuras = Array.from({ length: 9 }, (_, i) => `<path d="${rr(-(TORRE.y + TORRE.d) + 14, -(TORRE_ALTO - 22 - i * 6), TORRE.d - 28, 2.2, 1.1)}"/>`).join("");
  out.push(`<g transform="${caraCostado(TORRE.x + TORRE.w + 0.05)}"><g class="pc-rejilla">${ranuras}</g></g>`);
  return out.join("");
}

/* ==========================================================================
   TECLADO, MOUSE Y TAZA
   ========================================================================== */
function teclado() {
  const out: string[] = [];
  out.push(S(k.slabOf(TECLADO, Z_MESA + 0.8, 3.2, P, 3, 0.5), { tone: "mid" }));
  const zt = Z_MESA + 4;
  const teclas: { at: P3; svg: string }[] = [];
  const filas = 5;
  const cols = 15;
  const paso = (TECLADO.w - 8) / cols;
  for (let f = 0; f < filas; f++) {
    for (let c = 0; c < cols; c++) {
      /* La barra espaciadora ocupa el medio de la última fila. */
      if (f === filas - 1 && c > 4 && c < 10) {
        if (c !== 5) continue;
        const plan = { x: TECLADO.x + 4 + c * paso + 0.6, y: TECLADO.y + 4 + f * 5, w: paso * 5 - 1.2, d: 4, r: 0.8 };
        teclas.push({ at: [plan.x, plan.y, zt], svg: S(k.slabOf(plan, zt, 1.2, P, 2), { tone: "lo" }) });
        continue;
      }
      const plan = { x: TECLADO.x + 4 + c * paso + 0.6, y: TECLADO.y + 4 + f * 5, w: paso - 1.2, d: 4, r: 0.8 };
      teclas.push({ at: [plan.x, plan.y, zt], svg: S(k.slabOf(plan, zt, 1.2, P, 2), { tone: "lo" }) });
    }
  }
  out.push(...porProfundidad(teclas).map((t) => t.svg));

  out.push(`<path class="iso-halo" d="${k.haloOf(MOUSE, Z_MESA + 0.8, 1, P)}"/>`);
  out.push(S(k.slabOf(MOUSE, Z_MESA + 0.8, 3.6, P, 8, 1.2), { tone: "hi" }));
  out.push(L(k.lineOnTop([MOUSE.x + MOUSE.w / 2, MOUSE.y + 1.5], [MOUSE.x + MOUSE.w / 2, MOUSE.y + 8], Z_MESA + 4.4, P), { tone: "lo" }));
  return out.join("");
}

function taza() {
  const [cx, cy] = TAZA;
  const out: string[] = [];
  out.push(`<path class="iso-halo" d="${k.cylinder(cx, cy, 9, Z_MESA, 1, P, 32).fill}"/>`);
  /* El asa, del lado que mira a quien mira, dibujada antes del cuerpo para
     que asome por el costado. */
  const asa = { x: cx - 3, y: cy + 6, w: 6, d: 7, r: 2.5 };
  out.push(S(k.slabOf(asa, Z_MESA + 5, 11, P, 3), { tone: "mid" }));
  out.push(S(k.cylinder(cx, cy, 9, Z_MESA, 22, P, 40, 0.6), { tone: "hi" }));
  out.push(`<path class="pc-cafe" d="${k.planOutline({ x: cx - 7.6, y: cy - 7.6, w: 15.2, d: 15.2, r: 7.6 }, Z_MESA + 21.8, P, 10)}"/>`);
  return out.join("");
}

/* ==========================================================================
   EL DIBUJO ENTERO
   ========================================================================== */

/** El orden del pintor: mesa, monitor, servidor y lo que está adelante. */
export function dibujo() {
  return [mesa(), monitor(), torre(), teclado(), taza()].join("");
}
