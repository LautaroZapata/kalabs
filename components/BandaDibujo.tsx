import type { CSSProperties } from "react";
import s from "./Banner.module.css";

type Tramo = [number, number];

/**
 * El dibujo de la banda: los dos del estudio armando un sitio a mano.
 *
 * Flat, con la paleta del sitio. La ventana lleva el trazo de tinta de la
 * lámina de Servicios; los personajes van sin contorno, que sobre la banda
 * oscura no se vería. Cada pieza se arma con el scroll y a la par de su
 * promesa en la frase: la tarjeta que entra desde la mano con «no se cobra», la lista que se
 * tilda con «se cierra antes de empezar», el globo de «24 h» con «en 24
 * horas». Sin scroll no pasa nada: nada se mueve solo.
 *
 * Los tramos llegan contados en palabras de la frase; ver `Banner`.
 */
export default function BandaDibujo({
  n,
  titulo,
  tarjeta,
  lista,
  globo,
}: {
  n: number;
  titulo: Tramo;
  tarjeta: Tramo;
  lista: Tramo;
  globo: Tramo;
}) {
  const tramo = ([desde, hasta]: Tramo) =>
    ({ "--desde": desde, "--hasta": hasta, "--n": n }) as CSSProperties;

  /* La lista se tilda de a una: el tramo de la promesa partido en tres. */
  const tilde = (i: number): Tramo => {
    const paso = (lista[1] - lista[0]) / 3;
    return [lista[0] + paso * i, lista[0] + paso * (i + 1)];
  };

  return (
    <svg
      className={s.dibujo}
      viewBox="0 0 560 440"
      aria-hidden="true"
      focusable="false"
    >
      {/* piso y chispas */}
      <path className={s.piso} d="M14 428 H546" />
      <circle className={s.piso} cx="536" cy="70" r="8" />
      <path className={s.trazoBrasa} d="M40 60 v18 M31 69 h18" />

      {/* la ventana del navegador */}
      <rect className={`${s.hueso} ${s.trazo}`} x="110" y="30" width="360" height="270" rx="16" />
      <path className={s.trazo} d="M110 62 H470" />
      <circle className={s.brasa} cx="132" cy="46" r="5" />
      <circle className={s.trazo} cx="150" cy="46" r="5" />
      <circle className={s.trazo} cx="168" cy="46" r="5" />

      {/* título: se tiende con las primeras palabras */}
      <g className={`${s.pieza} ${s.tender}`} style={tramo(titulo)}>
        <rect className={s.tinta} x="134" y="84" width="170" height="14" rx="7" />
        <rect className={s.gris} x="134" y="108" width="120" height="12" rx="6" />
      </g>

      {/* la lista: se tilda con «se cierra antes de empezar» */}
      {[150, 180, 210].map((y, i) => (
        <g key={y}>
          <rect className={`${s.papel} ${s.trazo}`} x="134" y={y} width="18" height="18" rx="4" />
          <rect className={s.gris} x="162" y={y + 5} width={[110, 86, 100][i]} height="8" rx="4" />
          <path
            className={`${s.pieza} ${s.tildar} ${s.trazoBrasa}`}
            style={tramo(tilde(i))}
            pathLength={1}
            d={`M138 ${y + 9} l4 4 l8 -9`}
          />
        </g>
      ))}

      <rect className={`${s.brasa} ${s.trazo}`} x="134" y="252" width="130" height="28" rx="14" />

      {/* la tarjeta: entra desde la mano con «no se cobra» */}
      <g className={`${s.pieza} ${s.entrar}`} style={tramo(tarjeta)}>
        <rect className={`${s.papel} ${s.trazo}`} x="318" y="84" width="128" height="150" rx="12" />
        <circle className={s.brasa} cx="352" cy="120" r="12" />
        <path className={s.terra} d="M326 222 L364 164 L392 200 L410 180 L438 222 Z" />
      </g>

      {/* Los personajes, de espaldas a quien mira: están trabajando en la
          pantalla. Proporción de ilustración (cabeza ≈ 1/6,5 del alto), brazos
          en dos tramos —manga y antebrazo— y el brazo de atrás en un tono más
          oscuro, dibujado antes que el torso para que asome detrás. */}

      {/* la de la derecha, poniendo la tarjeta */}
      <g>
        <path className={`${s.brazo} ${s.mangaBrasaOsc}`} d="M520 256 L532 294" />
        <path className={`${s.antebrazo} ${s.pielTrazo}`} d="M532 294 L529 328" />
        <ellipse className={s.piel} cx="529" cy="332" rx="5.5" ry="6.5" />

        <path
          className={s.pantalon}
          d="M475 326 H522 L520 418 H504 L499 352 L494 418 H478 Z"
        />
        <path className={s.zapato} d="M478 416 H495 V428 H468 Q468 418 478 416 Z" />
        <path className={s.zapato} d="M504 416 H521 V428 H494 Q494 418 504 416 Z" />

        <rect className={s.piel} x="492" y="226" width="12" height="20" rx="4" />
        <path
          className={s.brasa}
          d="M470 262 Q470 246 486 244 H510 Q526 246 526 262 L523 332 H473 Z"
        />
        <path className={s.brasaOsc} d="M473 324 H523 V332 H473 Z" />

        <path className={`${s.brazo} ${s.mangaBrasa}`} d="M478 258 L462 236" />
        <path className={`${s.antebrazo} ${s.pielTrazo}`} d="M462 236 L449 216" />
        <ellipse className={s.piel} cx="447" cy="212" rx="5.5" ry="6.5" transform="rotate(-30 447 212)" />

        <ellipse className={s.piel} cx="498" cy="214" rx="15" ry="18" />
        <ellipse className={s.piel} cx="483" cy="216" rx="3" ry="4.5" />
        <path
          className={s.pelo}
          d="M484 214 Q483 195 499 195 Q515 195 514 213 Q514 226 507 231 H491 Q484 225 484 214 Z"
        />
      </g>

      {/* la de la izquierda, marcando la lista */}
      <g>
        <path className={`${s.brazo} ${s.mangaTerraOsc}`} d="M56 262 L46 296" />
        <path className={`${s.antebrazo} ${s.piel2Trazo}`} d="M46 296 L52 326" />
        <rect className={s.papel} x="32" y="316" width="30" height="40" rx="4" transform="rotate(-8 47 336)" />
        <rect className={s.brasa} x="38" y="324" width="18" height="4" rx="2" transform="rotate(-8 47 336)" />
        <ellipse className={s.piel2} cx="52" cy="330" rx="5.5" ry="6.5" />

        <path
          className={s.pantalon2}
          d="M55 320 H99 L97 418 H82 L77 346 L72 418 H57 Z"
        />
        <path className={s.brasa} d="M57 416 H73 V428 H48 Q48 418 57 416 Z" />
        <path className={s.brasa} d="M82 416 H98 V428 H73 Q73 418 82 416 Z" />

        <rect className={s.piel2} x="71" y="232" width="11" height="20" rx="4" />
        <path
          className={s.terra}
          d="M50 266 Q50 251 65 249 H88 Q103 251 103 266 L100 326 H53 Z"
        />

        <path className={`${s.brazo} ${s.mangaTerra}`} d="M97 262 L113 236" />
        <path className={`${s.antebrazo} ${s.piel2Trazo}`} d="M113 236 L124 208" />
        <ellipse className={s.piel2} cx="126" cy="203" rx="5.5" ry="6.5" transform="rotate(20 126 203)" />

        <ellipse className={s.piel2} cx="76" cy="222" rx="14" ry="17" />
        <ellipse className={s.piel2} cx="91" cy="224" rx="3" ry="4.5" />
        <circle className={s.pelo2} cx="76" cy="198" r="9" />
        <path
          className={s.pelo2}
          d="M62 222 Q61 204 76 204 Q91 204 90 221 Q90 234 84 238 H68 Q62 233 62 222 Z"
        />
      </g>

      {/* el globo: aparece con «en 24 horas» */}
      <g className={`${s.pieza} ${s.brotar}`} style={tramo(globo)}>
        <path
          className={`${s.papel} ${s.trazo}`}
          d="M34 118 H90 Q104 118 104 132 V160 Q104 174 90 174 H66 L50 190 L52 174 H34 Q20 174 20 160 V132 Q20 118 34 118 Z"
        />
        <circle className={s.trazo} cx="44" cy="146" r="12" />
        <path className={s.trazoBrasa} d="M44 146 V139 M44 146 L50 150" />
        <text className={s.globoTexto} x="62" y="152">
          24 h
        </text>
      </g>
    </svg>
  );
}
