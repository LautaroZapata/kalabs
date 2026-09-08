import type { Servicio } from "@/lib/content";
import s from "./Servicios.module.css";

/**
 * Los tres dibujos de los servicios.
 *
 * Trazo, no ilustración: una línea de 2px en el color de la lámina y la brasa
 * como único relleno. Ninguno lleva texto —lo que hay que leer está al lado, en
 * el cuerpo— y ninguno usa imagen: son diez rectángulos y un círculo, así que
 * pesan lo que pesa el HTML y se ven nítidos a cualquier tamaño.
 *
 * Cada uno hace una sola cosa y la repite. La descripción de qué se ve vive en
 * `content.ts`, junto al resto del texto del sitio.
 */

/* El sitio se arma solo, bloque por bloque. */
function Sitio() {
  return (
    <>
      <rect className={s.trazo} x="30" y="26" width="340" height="178" rx="14" />
      <line className={`${s.trazo} ${s.tenue}`} x1="30" y1="58" x2="370" y2="58" />
      <circle className={s.brasa} cx="48" cy="42" r="4" />
      <circle className={`${s.trazo} ${s.tenue}`} cx="64" cy="42" r="4" />
      <circle className={`${s.trazo} ${s.tenue}`} cx="80" cy="42" r="4" />

      <rect className={`${s.brasa} ${s.bloque}`} x="50" y="76" width="160" height="36" rx="7" />
      <rect
        className={`${s.trazo} ${s.bloque}`}
        x="50" y="124" width="110" height="9" rx="4.5"
        style={{ animationDelay: "0.25s" }}
      />
      <rect
        className={`${s.trazo} ${s.bloque}`}
        x="50" y="143" width="146" height="9" rx="4.5"
        style={{ animationDelay: "0.4s" }}
      />
      <rect
        className={`${s.trazo} ${s.bloque}`}
        x="234" y="76" width="116" height="76" rx="9"
        style={{ animationDelay: "0.55s" }}
      />
      <rect
        className={`${s.trazo} ${s.bloque}`}
        x="50" y="166" width="88" height="20" rx="10"
        style={{ animationDelay: "0.7s" }}
      />
      <rect
        className={`${s.trazo} ${s.bloque}`}
        x="148" y="166" width="88" height="20" rx="10"
        style={{ animationDelay: "0.85s" }}
      />
      <rect
        className={`${s.brasa} ${s.bloque}`}
        x="246" y="166" width="104" height="20" rx="10"
        style={{ animationDelay: "1s" }}
      />
    </>
  );
}

/* Tres pasos, un dato que los recorre y la vuelta que empieza de nuevo. */
function Flujo() {
  return (
    <>
      <line className={`${s.trazo} ${s.tenue}`} x1="60" y1="100" x2="340" y2="100" />
      <rect className={`${s.trazo} ${s.nodo}`} x="24" y="76" width="72" height="48" rx="12" />
      <rect
        className={`${s.trazo} ${s.nodo}`}
        x="164" y="76" width="72" height="48" rx="12"
        style={{ animationDelay: "1.6s" }}
      />
      <rect
        className={`${s.trazo} ${s.nodo}`}
        x="304" y="76" width="72" height="48" rx="12"
        style={{ animationDelay: "3.2s" }}
      />

      <circle className={`${s.brasa} ${s.punto} ${s.puntoA}`} r="7" />
      <circle className={`${s.brasa} ${s.punto} ${s.puntoB}`} r="7" />

      <path className={s.brasaTrazo} d="M 76 162 A 124 54 0 0 0 324 162" />
      <path className={s.brasaTrazo} d="M 314 150 L 324 163 L 310 169" />

      <circle className={`${s.trazo} ${s.tenue}`} cx="60" cy="52" r="2.5" />
      <circle className={`${s.trazo} ${s.tenue}`} cx="200" cy="52" r="2.5" />
      <circle className={`${s.trazo} ${s.tenue}`} cx="340" cy="52" r="2.5" />
    </>
  );
}

/* La grilla que se llena: turnos tomados, stock cargado.
   Las casillas que se encienden van sueltas y con retardos desparejos: una
   grilla que se llena en orden se lee como una barra de progreso. */
const CASILLAS = [
  { x: 53, y: 87, d: 0.1 },
  { x: 113, y: 87, d: 0.9 },
  { x: 233, y: 87, d: 1.7 },
  { x: 113, y: 125, d: 0.5 },
  { x: 173, y: 125, d: 2.1 },
  { x: 293, y: 125, d: 1.3 },
  { x: 53, y: 163, d: 2.5 },
  { x: 233, y: 163, d: 0.7 },
];

function Grilla() {
  const columnas = [52, 112, 172, 232, 292];
  const filas = [86, 124, 162];

  return (
    <>
      <rect className={s.trazo} x="30" y="32" width="340" height="166" rx="14" />
      <line className={`${s.trazo} ${s.tenue}`} x1="30" y1="68" x2="370" y2="68" />
      <rect className={s.brasa} x="50" y="45" width="42" height="9" rx="4.5" />
      <rect className={`${s.trazo} ${s.tenue}`} x="102" y="45" width="30" height="9" rx="4.5" />

      {filas.map((y) =>
        columnas.map((x) => (
          <rect
            key={`${x}-${y}`}
            className={`${s.trazo} ${s.tenue}`}
            x={x} y={y} width="46" height="28" rx="7"
          />
        )),
      )}

      {CASILLAS.map((c) => (
        <rect
          key={`${c.x}-${c.y}`}
          className={s.casilla}
          x={c.x} y={c.y} width="44" height="26" rx="6"
          style={{ animationDelay: `${c.d}s` }}
        />
      ))}
    </>
  );
}

const DIBUJOS = { sitio: Sitio, flujo: Flujo, grilla: Grilla };

export default function Lamina({ serv }: { serv: Servicio }) {
  const Dibujo = DIBUJOS[serv.lamina];

  return (
    <div className={s.lamina}>
      <svg viewBox="0 0 400 230" role="img" aria-label={serv.laminaAlt}>
        <Dibujo />
      </svg>
    </div>
  );
}
