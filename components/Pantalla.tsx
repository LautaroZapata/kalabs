import s from "./Banner.module.css";

/**
 * Lo que se ve en el monitor del banner: esta misma portada, construida en
 * tres pasos a la par de las promesas. Primero el boceto (líneas que se
 * trazan), después la estructura (bloques planos) y al final la portada
 * terminada, con el lago, RESOLVER y la esfera en la O.
 *
 * Abajo a la derecha, tres luces de estado: se prende una por tramo, con el
 * brillo de la esfera. En reposo —sin scroll animado o con movimiento
 * reducido— se ve la portada terminada y las tres luces prendidas.
 *
 * Todo en coordenadas de la pantalla de la foto (657 × 362 px en el original,
 * 1000 × 551 acá). La esfera cae donde cae en el video del héroe.
 */

const ESFERA = { x: 516, y: 308, r: 43 };
const TEXTO_Y = ESFERA.y + 34;

export default function Pantalla() {
  return (
    <svg className={s.pantalla} viewBox="0 0 1000 551" aria-hidden="true">
      <defs>
        <clipPath id="pantalla-recorte">
          <rect x="0" y="40" width="1000" height="511" />
        </clipPath>
        <radialGradient id="pantalla-esfera" cx="0.42" cy="0.38" r="0.7">
          <stop offset="0" stopColor="#ffd49a" />
          <stop offset="0.45" stopColor="#ff8a3a" />
          <stop offset="1" stopColor="#c8460f" />
        </radialGradient>
      </defs>

      {/* El navegador: la barra con las tres luces y la dirección. */}
      <rect className={s.pVidrio} x="0" y="0" width="1000" height="551" />
      <rect className={s.pBarra} x="0" y="0" width="1000" height="40" />
      <circle className={s.pPuntoBrasa} cx="24" cy="20" r="6" />
      <circle className={s.pPunto} cx="44" cy="20" r="6" />
      <circle className={s.pPunto} cx="64" cy="20" r="6" />
      <rect className={s.pDireccion} x="380" y="10" width="240" height="20" rx="10" />
      <text className={s.pDireccionTexto} x="500" y="24.5" textAnchor="middle">
        kalabs.dev
      </text>

      {/* 1. El boceto: líneas que se trazan. */}
      <g className={s.pBoceto}>
        <rect className={s.pTrazo} pathLength={1} x="30" y="60" width="90" height="22" rx="4" />
        <rect className={s.pTrazo} pathLength={1} x="700" y="60" width="270" height="22" rx="11" />
        <rect className={s.pTrazo} pathLength={1} x="400" y="206" width="200" height="22" rx="4" />
        <rect className={s.pTrazo} pathLength={1} x="250" y="268" width="210" height="84" rx="4" />
        <circle className={s.pTrazo} pathLength={1} cx={ESFERA.x} cy={ESFERA.y} r={ESFERA.r} />
        <rect className={s.pTrazo} pathLength={1} x="572" y="268" width="250" height="84" rx="4" />
        <rect className={s.pTrazo} pathLength={1} x="330" y="392" width="340" height="38" rx="19" />
        <rect className={s.pTrazo} pathLength={1} x="370" y="448" width="260" height="12" rx="6" />
      </g>

      {/* 2. La estructura: los mismos lugares, en bloques. */}
      <g className={s.pEstructura}>
        <rect className={s.pBloque} x="30" y="60" width="90" height="22" rx="4" />
        <rect className={s.pBloque} x="700" y="60" width="62" height="22" rx="11" />
        <rect className={s.pBloque} x="770" y="60" width="62" height="22" rx="11" />
        <rect className={s.pBloque} x="840" y="60" width="62" height="22" rx="11" />
        <rect className={s.pBloqueBrasa} x="910" y="60" width="60" height="22" rx="11" />
        <rect className={s.pBloque} x="400" y="206" width="200" height="22" rx="4" />
        <rect className={s.pBloque} x="250" y="268" width="210" height="84" rx="4" />
        <circle className={s.pBloqueBrasa} cx={ESFERA.x} cy={ESFERA.y} r={ESFERA.r} />
        <rect className={s.pBloque} x="572" y="268" width="250" height="84" rx="4" />
        <rect className={s.pBloque} x="330" y="392" width="340" height="38" rx="19" />
        <rect className={s.pBloque} x="370" y="448" width="260" height="12" rx="6" />
      </g>

      {/* 3. La portada terminada. */}
      <g className={s.pTerminado}>
        <image
          href="/heroe/lago.jpg"
          x="0"
          y="40"
          width="1000"
          height="511"
          preserveAspectRatio="xMidYMid slice"
          clipPath="url(#pantalla-recorte)"
        />
        <text className={s.pMarca} x="30" y="77">
          Kalabs
        </text>
        {[700, 770, 840].map((x) => (
          <rect key={x} className={s.pPastilla} x={x} y="60" width="62" height="22" rx="11" />
        ))}
        <rect className={s.pPastillaBrasa} x="910" y="60" width="60" height="22" rx="11" />
        <text className={s.pEntrada} x={ESFERA.x} y="222" textAnchor="middle">
          Lo que necesitás es
        </text>
        <text className={s.pTitulo} x={ESFERA.x - ESFERA.r - 8} y={TEXTO_Y} textAnchor="end">
          RES
        </text>
        <circle cx={ESFERA.x} cy={ESFERA.y} r={ESFERA.r} fill="url(#pantalla-esfera)" />
        <text className={s.pTitulo} x={ESFERA.x + ESFERA.r + 8} y={TEXTO_Y}>
          LVER
        </text>
        <rect className={s.pCampo} x="330" y="392" width="340" height="38" rx="19" />
        <circle className={s.pPastillaBrasa} cx="650" cy="411" r="14" />
        <rect className={s.pLinea} x="370" y="448" width="260" height="6" rx="3" />
      </g>

      {/* Las luces de estado: una por tramo, con el brillo de la esfera. */}
      {[0, 1, 2].map((i) => (
        <circle key={i} className={s.pLed} data-tramo={i} cx={938 + i * 18} cy="533" r="5" />
      ))}
    </svg>
  );
}
