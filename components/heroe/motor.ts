import { medir, programa, seguirPuntero, type Piezas } from "./comun";

/**
 * El motor de las dos escenas. Dibuja el video en un shader y le suma lo que
 * hace una cámara de verdad: paralaje según la profundidad (lo cercano se
 * corre más que lo lejano cuando se mueve el mouse) y una deriva lenta cuando
 * nadie lo mueve, como una cámara en mano muy quieta.
 *
 * Encima, según la escena, el cursor toca la naturaleza: en el agua deja ondas
 * (sólo refracción, sin luz agregada) y en el pasto suelta ráfagas de viento
 * que lo doblan y lo dejan volver oscilando, como un resorte amortiguado.
 *
 * Todo vive en coordenadas del video. El encuadre (`foco` y `zoom`) es el
 * mismo para el fondo, las ondas y las partículas, así nada se despega.
 */

export type Ajustes = {
  /** Punto del video que queda en el centro de la escena, de 0 a 1. */
  foco: { x: number; y: number };
  /** Zoom mínimo sobre el `cover`: da margen para centrar el foco y para el paralaje. */
  zoom: number;
  /** Cuánto se corre lo más cercano, en fracción del ancho. */
  paralaje: number;
  profundidad: string;
  /** Máscara del agua: donde el cursor deja ondas. */
  agua?: string;
  /** Máscara del pasto, con la fuerza del viento (más en el de adelante). */
  pasto?: string;
  luciernagas?: { n: number; arbol: { x: number; y: number } };
  /** Grano de film en vivo (el video viene sin grano): desvío en pantalla, 0 lo apaga. */
  grano?: number;
  /** La esfera del video: centro en coordenadas del video y radio en fracción de su alto. */
  esfera?: { x: number; y: number; r: number };
};

/** Dónde queda la esfera en la escena, en px de CSS: la portada calza la O ahí. */
export type Encuadre = { x: number; y: number; d: number };

const MAX_ONDAS = 16;

const VS = `#version 300 es
in vec2 a;
out vec2 vUv;
void main() { vUv = a * 0.5 + 0.5; gl_Position = vec4(a, 0.0, 1.0); }`;

const FS = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 o;
uniform sampler2D uVid;
uniform sampler2D uProf;
uniform sampler2D uAgua;
uniform vec2 uInicio;   // dónde arranca la ventana visible del video
uniform vec2 uEscala;   // cuánto del video entra en la escena
uniform vec2 uMirada;   // el desplazamiento de la cámara, suavizado
uniform float uT;
uniform float uAspecto;
uniform int uModo;      // 0 nada, 1 agua, 2 pasto
uniform vec4 uOndas[${MAX_ONDAS}];
uniform vec2 uDir[${MAX_ONDAS}];
uniform float uGrano;     // desvío del grano en pantalla
uniform float uGranoTam;  // tamaño del grano en px del lienzo
uniform float uSemilla;   // cambia en cada cuadro
uniform int uN;
/* Hash sin senos (Dave Hoskins): parejo en los dos ejes. */
float azar(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}
void main() {
  vec2 uv = uInicio + vec2(vUv.x, 1.0 - vUv.y) * uEscala;
  /* Paralaje: la profundidad dice cuánto se corre cada punto (1 = cerca). */
  float prof = texture(uProf, uv).r;
  uv -= uMirada * (prof - 0.35);
  vec2 desvio = vec2(0.0);
  float luz = 0.0;
  if (uModo == 2) {
    float pasto = texture(uAgua, uv).r;
    for (int i = 0; i < ${MAX_ONDAS}; i++) {
      if (i >= uN) break;
      vec4 r = uOndas[i];
      float edad = uT - r.z;
      if (edad < 0.0 || edad > 3.0) continue;
      /* La ráfaga avanza en la dirección del gesto y se abre. */
      vec2 centro = r.xy + uDir[i] * edad * 0.09;
      vec2 d = uv - centro;
      d.x *= uAspecto;
      float radio = 0.05 + edad * 0.04;
      float g = exp(-dot(d, d) / (radio * radio));
      /* Se dobla con el viento y vuelve oscilando hasta quedarse quieto. */
      float resorte = cos(edad * 5.5) * exp(-edad * 1.3);
      desvio += uDir[i] * g * resorte * r.w * 0.012;
      luz += g * max(resorte, 0.0) * r.w;
    }
    desvio *= pasto;
    luz *= pasto;
  }
  if (uModo == 1) {
    float agua = texture(uAgua, uv).r;
    for (int i = 0; i < ${MAX_ONDAS}; i++) {
      if (i >= uN) break;
      vec4 r = uOndas[i];
      float edad = uT - r.z;
      if (edad < 0.0 || edad > 3.5) continue;
      vec2 d = uv - r.xy;
      d.x *= uAspecto;
      d.y /= 0.22;            // el agua en perspectiva
      float dist = length(d);
      /* Paquete de onda dispersivo: la longitud de onda crece con el tiempo,
         como en el agua de verdad, y se apaga rápido. */
      float frente = edad * 0.06;
      float x = dist - frente;
      float env = exp(-x * x / (0.0006 + edad * 0.0018)) * exp(-edad * 1.4) * r.w;
      float w = sin(x * (210.0 / (1.0 + edad * 1.6))) * env;
      vec2 dir = dist > 1e-4 ? d / dist : vec2(0.0);
      dir.x /= uAspecto;
      dir.y *= 0.22;
      desvio += dir * w * 0.0048;
    }
    desvio *= agua;
  }
  vec3 c = texture(uVid, uv + desvio).rgb;
  /* El pasto doblado muestra el envés de las hojas: la ola pasa apenas más clara. */
  c *= 1.0 + 0.09 * luz;
  /* Grano de film, la misma cuenta que revelado.py: vive en los medios, casi
     nada en los negros (si no, lo oscuro parece ruido de sensor), monocromo.
     Ruido de valor con interpolación suave: tiene tamaño, no es por píxel. */
  if (uGrano > 0.0) {
    vec2 p = gl_FragCoord.xy / uGranoTam + uSemilla * vec2(17.3, 41.9);
    vec2 i = floor(p), f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = azar(i), b = azar(i + vec2(1.0, 0.0)), d2 = azar(i + vec2(0.0, 1.0)), e = azar(i + vec2(1.0, 1.0));
    float r = mix(mix(a, b, f.x), mix(d2, e, f.x), f.y);
    float r2 = azar(i * 1.37 + 7.1);
    float n = (r + r2 - 1.0) * 2.45;            // aprox. desvío 1
    float L = clamp(dot(c, vec3(0.2126, 0.7152, 0.0722)), 0.0, 1.0);
    float oscuro = smoothstep(0.03, 0.33, L);
    float amp = uGrano * (0.12 + 0.88 * oscuro) * (0.5 + 2.0 * L * (1.0 - L)) * (1.0 - 0.4 * L);
    c += amp * n;
  }
  o = vec4(c, 1.0);
}`;

const VS_P = `#version 300 es
in vec4 a; // x, y en pantalla (0-1), tamaño en px, brillo
out float vB;
out float vD;
uniform float uDpr;
void main() {
  gl_Position = vec4(a.x * 2.0 - 1.0, 1.0 - a.y * 2.0, 0.0, 1.0);
  gl_PointSize = a.z * uDpr;
  vB = a.w;
  vD = clamp((a.z - 3.0) / 14.0, 0.0, 1.0);
}`;

const FS_P = `#version 300 es
precision mediump float;
in float vB;
in float vD;
out vec4 o;
void main() {
  float r = length(gl_PointCoord - 0.5) * 2.0;
  if (r > 1.0) discard;
  float nucleo = exp(-r * r * mix(22.0, 3.5, vD));
  float halo = exp(-r * r * 2.6) * mix(0.3, 0.1, vD);
  vec3 c = vec3(1.0, 0.8, 0.45) * nucleo * mix(1.2, 0.55, vD) + vec3(1.0, 0.55, 0.18) * halo;
  o = vec4(c * vB, 1.0);
}`;

/** La ventana del video que se ve, con `cover`, el zoom y el foco. */
export function ventana(w: number, h: number, vw: number, vh: number, aj: Ajustes) {
  const al = w / h, av = vw / vh;
  const ex = (al > av ? 1 : al / av) / aj.zoom;
  const ey = (al > av ? av / al : 1) / aj.zoom;
  const ix = Math.min(Math.max(aj.foco.x - ex / 2, 0), 1 - ex);
  const iy = Math.min(Math.max(aj.foco.y - ey / 2, 0), 1 - ey);
  return { ix, iy, ex, ey };
}

/** La esfera llevada a la escena: misma ventana y mismo paralaje que el shader. */
export function esferaEnEscena(aj: Ajustes, w: number, h: number, vw: number, vh: number, mirada = { x: 0, y: 0 }, prof = 0.35): Encuadre | null {
  const e = aj.esfera;
  if (!e) return null;
  const v = ventana(w, h, vw, vh, aj);
  return {
    x: ((e.x + mirada.x * (prof - 0.35) - v.ix) / v.ex) * w,
    y: ((e.y + mirada.y * (prof - 0.35) - v.iy) / v.ey) * h,
    d: ((2 * e.r) / v.ey) * h,
  };
}

export function montar({ escena, video: primero, relevo, lienzo }: Piezas, aj: Ajustes, alEncuadre?: (e: Encuadre) => void) {
  const gl = lienzo.getContext("webgl2", { antialias: false, premultipliedAlpha: false });
  if (!gl) return;
  let pr: WebGLProgram, prP: WebGLProgram | null = null;
  try {
    pr = programa(gl, VS, FS);
    if (aj.luciernagas) prP = programa(gl, VS_P, FS_P);
  } catch {
    return;
  }

  const quad = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, quad);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const vaoFondo = gl.createVertexArray();
  gl.bindVertexArray(vaoFondo);
  const locA = gl.getAttribLocation(pr, "a");
  gl.enableVertexAttribArray(locA);
  gl.vertexAttribPointer(locA, 2, gl.FLOAT, false, 0, 0);

  const textura = (unidad: number, gris = 0) => {
    const t = gl.createTexture()!;
    gl.activeTexture(gl.TEXTURE0 + unidad);
    gl.bindTexture(gl.TEXTURE_2D, t);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([gris, gris, gris, 255]));
    return t;
  };
  const tVid = textura(0), tProf = textura(1, 90), tAgua = textura(2);
  gl.useProgram(pr);
  const u = (n: string) => gl.getUniformLocation(pr, n);
  gl.uniform1i(u("uVid"), 0);
  gl.uniform1i(u("uProf"), 1);
  gl.uniform1i(u("uAgua"), 2);
  gl.uniform1i(u("uModo"), aj.agua ? 1 : aj.pasto ? 2 : 0);

  const leer = (img: ImageData | null, x: number, y: number) => {
    if (!img) return 0;
    const i = (Math.min(img.height - 1, Math.max(0, Math.floor(y * img.height))) * img.width + Math.min(img.width - 1, Math.max(0, Math.floor(x * img.width)))) * 4;
    return img.data[i] / 255;
  };
  const cargar = (src: string, unidad: number, t: WebGLTexture, alLeer?: (d: ImageData) => void) => {
    const img = new Image();
    img.onload = () => {
      gl.activeTexture(gl.TEXTURE0 + unidad);
      gl.bindTexture(gl.TEXTURE_2D, t);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      if (alLeer) {
        const c = document.createElement("canvas");
        c.width = img.naturalWidth;
        c.height = img.naturalHeight;
        const x = c.getContext("2d")!;
        x.drawImage(img, 0, 0);
        alLeer(x.getImageData(0, 0, c.width, c.height));
      }
    };
    img.src = src;
  };
  let mascara: ImageData | null = null;
  /* La profundidad de la esfera, para que el texto que la rodea se corra igual que ella. */
  let profEsfera = 0.35;
  cargar(aj.profundidad, 1, tProf, (img) => {
    if (aj.esfera) profEsfera = leer(img, aj.esfera.x, aj.esfera.y);
  });
  const capa = aj.agua ?? aj.pasto;
  if (capa) cargar(capa, 2, tAgua, (d) => (mascara = d));

  /* El loop sin costura: `loop` hace que el navegador vuelva al principio y se
     congele un instante mientras decodifica, y eso se ve. Acá hay dos copias
     del clip: cuando la que suena está por terminar, la otra ya arranca desde
     el cuadro 0 y el shader cambia de fuente en el primer cuadro nuevo. */
  let video = primero;
  let siguiente: HTMLVideoElement | null = relevo ?? null;
  let cambiando = false;
  if (siguiente) {
    primero.loop = false;
    siguiente.loop = false;
    siguiente.pause();
    siguiente.currentTime = 0;
  }

  /* El video entra como textura sólo cuando hay un cuadro nuevo del que suena. */
  let hayCuadro = false;
  const subir = (v: HTMLVideoElement) => {
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, tVid);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, v);
    hayCuadro = true;
  };
  const porCuadro = typeof primero.requestVideoFrameCallback === "function";
  const pedidos = new Map<HTMLVideoElement, number>();
  const escuchar = (v: HTMLVideoElement) => {
    const alCuadro = () => {
      if (cambiando && v === siguiente) {
        /* Llegó el primer cuadro del relevo: pasa a sonar él, el otro se rebobina. */
        const viejo = video;
        video = v;
        siguiente = viejo;
        cambiando = false;
        viejo.pause();
        viejo.currentTime = 0;
      }
      if (v === video) subir(v);
      pedidos.set(v, v.requestVideoFrameCallback(alCuadro));
    };
    pedidos.set(v, v.requestVideoFrameCallback(alCuadro));
  };
  if (porCuadro) {
    escuchar(primero);
    if (relevo) escuchar(relevo);
  }
  const relevar = () => {
    if (!siguiente || cambiando || !video.duration) return;
    if (video.currentTime >= video.duration - 0.06 || video.ended) {
      cambiando = true;
      void siguiente.play();
    }
  };

  /* Luciérnagas: estado en coordenadas del video. */
  const L = aj.luciernagas;
  const N = L?.n ?? 0;
  const px = new Float32Array(N), py = new Float32Array(N), vx = new Float32Array(N), vy = new Float32Array(N);
  const pz = new Float32Array(N), fase = new Float32Array(N), ritmo = new Float32Array(N), curiosa = new Float32Array(N);
  const nacer = (i: number, todas = false) => {
    pz[i] = Math.random() ** 1.6;
    px[i] = Math.random();
    py[i] = todas ? 0.45 + Math.random() * 0.55 : 0.7 + pz[i] * 0.25 + Math.random() * 0.08;
    vx[i] = vy[i] = 0;
    fase[i] = Math.random() * Math.PI * 2;
    ritmo[i] = 0.6 + Math.random() * 1.4;
    curiosa[i] = 0;
  };
  for (let i = 0; i < N; i++) nacer(i, true);
  const datos = new Float32Array(N * 4);
  let bufP: WebGLBuffer | null = null, vaoP: WebGLVertexArrayObject | null = null, uDpr: WebGLUniformLocation | null = null;
  if (prP) {
    vaoP = gl.createVertexArray();
    gl.bindVertexArray(vaoP);
    bufP = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufP);
    const loc = gl.getAttribLocation(prP, "a");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 4, gl.FLOAT, false, 0, 0);
    uDpr = gl.getUniformLocation(prP, "uDpr");
  }

  const { p, soltar } = seguirPuntero(escena);
  const mirada = { x: 0, y: 0 };
  const ondas: number[][] = [];
  const dirs: number[][] = [];
  const t0 = performance.now();
  let antes = t0, ultima = -10, raf = 0;

  const cuadro = () => {
    raf = requestAnimationFrame(cuadro);
    const ahora = performance.now();
    const dt = Math.min((ahora - antes) / 1000, 0.05);
    antes = ahora;
    const t = (ahora - t0) / 1000;
    relevar();
    if (!porCuadro && video.readyState >= 2) subir(video);
    if (!hayCuadro) return;
    escena.dataset.gl = "1";

    const { w, h, d } = medir(lienzo);
    gl.viewport(0, 0, w, h);
    const vw = video.videoWidth || 16, vh = video.videoHeight || 9;
    const v = ventana(w, h, vw, vh, aj);
    const aspecto = vw / vh;

    /* La mirada sigue al cursor con inercia; sin cursor, deriva sola, lenta. */
    const ox = p.dentro ? p.x - 0.5 : Math.sin(t * 0.13) * 0.18;
    const oy = p.dentro ? p.y - 0.5 : Math.sin(t * 0.09 + 1) * 0.08;
    const k = 1 - Math.exp(-dt * 2.2);
    mirada.x += (ox * aj.paralaje - mirada.x) * k;
    mirada.y += (oy * aj.paralaje * 0.5 - mirada.y) * k;

    /* El cursor, en coordenadas del video (sin el paralaje: alcanza para decidir). */
    const cx = v.ix + p.x * v.ex, cy = v.iy + p.y * v.ey;

    if (capa) {
      const rapidez = Math.hypot(p.vx, p.vy);
      const sobre = leer(mascara, cx, cy);
      const cada = aj.pasto ? 0.07 : 0.16;
      if (p.dentro && rapidez > 0.05 && sobre > (aj.pasto ? 0.15 : 0.6) && t - ultima > cada) {
        ondas.push([cx, cy, t, Math.min(1, rapidez * (aj.pasto ? 0.9 : 0.6))]);
        dirs.push([p.vx / rapidez, (p.vy / rapidez) * 0.6]);
        ultima = t;
      }
      while (ondas.length && (t - ondas[0][2] > 3.5 || ondas.length > MAX_ONDAS)) {
        ondas.shift();
        dirs.shift();
      }
    }

    if (alEncuadre && aj.esfera) {
      const e = esferaEnEscena(aj, lienzo.clientWidth, lienzo.clientHeight, vw, vh, mirada, profEsfera);
      if (e) alEncuadre(e);
    }

    gl.useProgram(pr);
    gl.bindVertexArray(vaoFondo);
    gl.disable(gl.BLEND);
    gl.uniform2f(u("uInicio"), v.ix, v.iy);
    gl.uniform2f(u("uEscala"), v.ex, v.ey);
    gl.uniform2f(u("uMirada"), mirada.x, mirada.y);
    gl.uniform1f(u("uT"), t);
    gl.uniform1f(u("uGrano"), aj.grano ?? 0);
    gl.uniform1f(u("uGranoTam"), Math.max(1, 1.6 * (h / 1440)));
    /* El grano cambia a 24 cuadros por segundo, como el film, no a la del monitor. */
    gl.uniform1f(u("uSemilla"), Math.floor(t * 24) % 997);
    gl.uniform1f(u("uAspecto"), aspecto);
    gl.uniform1i(u("uN"), ondas.length);
    if (ondas.length) {
      gl.uniform4fv(u("uOndas"), new Float32Array(ondas.flat()));
      gl.uniform2fv(u("uDir"), new Float32Array(dirs.flat()));
    }
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    if (prP && L) {
      for (let i = 0; i < N; i++) {
        fase[i] += dt * ritmo[i];
        const dist = Math.hypot((px[i] - cx) * aspecto, py[i] - cy);
        /* Curiosidad: las cercanas se interesan de a poco y se olvidan de a poco. */
        const objetivo = p.dentro && dist < 0.16 + pz[i] * 0.05 ? 1 : 0;
        curiosa[i] += (objetivo - curiosa[i]) * (1 - Math.exp(-dt * (objetivo ? 1.5 : 0.6)));
        const rad = 0.05 + 0.08 * ((i * 0.618) % 1);
        const txc = cx + (Math.cos(fase[i] * 0.7) * rad) / aspecto, tyc = cy + Math.sin(fase[i] * 0.9) * rad * 0.7;
        const txa = L.arbol.x + (Math.cos(fase[i]) * 0.04) / aspecto, tya = L.arbol.y + 0.03;
        const tx = txa + (txc - txa) * curiosa[i], ty = tya + (tyc - tya) * curiosa[i];
        const fuerza = 0.12 + 0.1 * (1 - pz[i]) + 0.9 * curiosa[i];
        vx[i] += ((tx - px[i]) * fuerza + Math.sin(fase[i] * 2.1 + i) * 0.03) * dt;
        vy[i] += ((ty - py[i]) * fuerza + Math.cos(fase[i] * 1.6 + i) * 0.03) * dt;
        vx[i] *= 0.965;
        vy[i] *= 0.965;
        px[i] += vx[i] * dt;
        py[i] += vy[i] * dt;
        if (curiosa[i] < 0.1 && Math.hypot((px[i] - L.arbol.x) * aspecto, py[i] - L.arbol.y) < 0.035) nacer(i);
        const titila = Math.max(0, Math.sin(fase[i] * 2.4 + i * 1.7)) ** 1.6;
        /* La misma cuenta que el fondo: ventana del video y paralaje por profundidad. */
        const sx = (px[i] - v.ix + mirada.x * (pz[i] - 0.35)) / v.ex;
        const sy = (py[i] - v.iy + mirada.y * (pz[i] - 0.35)) / v.ey;
        datos.set([sx, sy, 2.2 + 15 * pz[i] ** 2, (0.18 + 0.82 * titila) * (0.45 + 0.55 * pz[i]) * (1 + 0.35 * curiosa[i])], i * 4);
      }
      gl.useProgram(prP);
      gl.bindVertexArray(vaoP);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.ONE, gl.ONE);
      gl.uniform1f(uDpr, d);
      gl.bindBuffer(gl.ARRAY_BUFFER, bufP);
      gl.bufferData(gl.ARRAY_BUFFER, datos, gl.DYNAMIC_DRAW);
      gl.drawArrays(gl.POINTS, 0, N);
    }
  };
  raf = requestAnimationFrame(cuadro);

  return () => {
    cancelAnimationFrame(raf);
    for (const [v, n] of pedidos) v.cancelVideoFrameCallback(n);
    soltar();
    delete escena.dataset.gl;
  };
}
