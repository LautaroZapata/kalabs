/**
 * Lo que comparten las dos escenas: el puntero, el tamaño del lienzo y la
 * cuenta del `object-fit: cover`, para que lo que dibuja WebGL caiga justo
 * encima del video.
 */

export type Piezas = {
  escena: HTMLDivElement;
  video: HTMLVideoElement;
  /** El relevo del loop: el mismo clip, listo en el cuadro 0. */
  relevo?: HTMLVideoElement;
  lienzo: HTMLCanvasElement;
};

export type Puntero = {
  /** Posición en coordenadas del lienzo, de 0 a 1. */
  x: number;
  y: number;
  /** Velocidad en esas coordenadas por segundo, suavizada. */
  vx: number;
  vy: number;
  dentro: boolean;
};

export function seguirPuntero(el: HTMLElement) {
  const p: Puntero = { x: 0.5, y: 0.5, vx: 0, vy: 0, dentro: false };
  let t = performance.now();
  const mover = (e: PointerEvent) => {
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    const ahora = performance.now();
    const dt = Math.max((ahora - t) / 1000, 1 / 240);
    t = ahora;
    if (p.dentro) {
      p.vx = p.vx * 0.6 + ((x - p.x) / dt) * 0.4;
      p.vy = p.vy * 0.6 + ((y - p.y) / dt) * 0.4;
    }
    p.x = x;
    p.y = y;
    p.dentro = true;
  };
  const salir = () => {
    p.dentro = false;
  };
  el.addEventListener("pointermove", mover);
  el.addEventListener("pointerdown", mover);
  el.addEventListener("pointerleave", salir);
  el.addEventListener("pointercancel", salir);
  return {
    p,
    soltar() {
      el.removeEventListener("pointermove", mover);
      el.removeEventListener("pointerdown", mover);
      el.removeEventListener("pointerleave", salir);
      el.removeEventListener("pointercancel", salir);
    },
  };
}

/** Ajusta el lienzo a su tamaño en pantalla, con la densidad acotada. */
export function medir(cv: HTMLCanvasElement, tope = 1.5) {
  const r = cv.getBoundingClientRect();
  const d = Math.min(devicePixelRatio || 1, tope);
  const w = Math.min(Math.round(r.width * d), 2560);
  const h = Math.round((w / Math.max(r.width, 1)) * r.height);
  if (cv.width !== w || cv.height !== h) {
    cv.width = w;
    cv.height = h;
  }
  return { w, h, d: w / Math.max(r.width, 1) };
}

export function programa(gl: WebGL2RenderingContext, vs: string, fs: string) {
  const sombreador = (tipo: number, src: string) => {
    const s = gl.createShader(tipo)!;
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) ?? "shader");
    return s;
  };
  const pr = gl.createProgram()!;
  gl.attachShader(pr, sombreador(gl.VERTEX_SHADER, vs));
  gl.attachShader(pr, sombreador(gl.FRAGMENT_SHADER, fs));
  gl.linkProgram(pr);
  if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(pr) ?? "programa");
  return pr;
}
