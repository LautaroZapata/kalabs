import type { CSSProperties } from "react";

/**
 * Greca — la geometría de la casa.
 *
 * Cuatro tramas ortogonales construidas a base de escalones, del mismo modo
 * en que se construye un tejido: sin curvas, sin diagonales reales, todo a
 * pasos rectos. Es geometría abstracta inspirada en el textil sudamericano,
 * no la cita de ningún símbolo concreto.
 *
 * No es adorno suelto: se usa como junta entre secciones, como lomo de las
 * fichas y como relleno de los contenedores vacíos de la grilla.
 */

export type GrecaVariant = "zigzag" | "rombo" | "escalera" | "trama";

type Props = {
  /** Identificador único del <pattern> dentro del documento. */
  id: string;
  variant?: GrecaVariant;
  /** Color del trazo principal. */
  line?: string;
  /** Color del detalle secundario. */
  accent?: string;
  /** Fondo del mosaico. Por defecto transparente. */
  bg?: string;
  /** Multiplicador del mosaico. 1 = 32px de paso en zigzag. */
  scale?: number;
  height?: number | string;
  width?: number | string;
  className?: string;
  style?: CSSProperties;
  /** Gira la trama. Útil para lomos verticales. */
  rotate?: number;
};

function Tile({ variant, line, accent }: { variant: GrecaVariant; line: string; accent: string }) {
  switch (variant) {
    /* Escalonado en zigzag: sube en cuatro pasos y baja en cuatro. */
    case "zigzag":
      return (
        <>
          <path
            d="M0 14 H2 V11 H6 V8 H10 V5 H14 V2 H18 V5 H22 V8 H26 V11 H30 V14 H32"
            fill="none"
            stroke={line}
            strokeWidth="2"
          />
          <rect x="15" y="10" width="2" height="2" fill={accent} />
        </>
      );

    /* Rombo escalonado: el módulo que se repite en los lomos y los vacíos. */
    case "rombo":
      return (
        <>
          <polygon
            points="10,2 14,2 14,6 18,6 18,10 22,10 22,14 18,14 18,18 14,18 14,22 10,22 10,18 6,18 6,14 2,14 2,10 6,10 6,6 10,6"
            fill="none"
            stroke={line}
            strokeWidth="2"
          />
          <rect x="10" y="10" width="4" height="4" fill={accent} />
        </>
      );

    /* Escalera maciza: bloques que arman una diagonal sin trazar una diagonal. */
    case "escalera":
      return (
        <>
          <rect x="0" y="12" width="4" height="4" fill={line} />
          <rect x="4" y="8" width="4" height="4" fill={line} />
          <rect x="8" y="4" width="4" height="4" fill={accent} />
          <rect x="12" y="0" width="4" height="4" fill={line} />
        </>
      );

    /* Trama: el tejido más cerrado, para grandes superficies. */
    default:
      return (
        <>
          <rect x="0" y="0" width="6" height="6" fill={line} />
          <rect x="6" y="6" width="6" height="6" fill={accent} />
        </>
      );
  }
}

const TILE: Record<GrecaVariant, [number, number]> = {
  zigzag: [32, 16],
  rombo: [24, 24],
  escalera: [16, 16],
  trama: [12, 12],
};

export default function Greca({
  id,
  variant = "zigzag",
  line = "var(--terra)",
  accent = "var(--terra)",
  bg = "transparent",
  scale = 1,
  height = 16,
  width = "100%",
  className,
  style,
  rotate = 0,
}: Props) {
  const [tw, th] = TILE[variant];
  const transform = [rotate ? `rotate(${rotate})` : "", scale !== 1 ? `scale(${scale})` : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <svg
      width={width}
      height={height}
      className={className}
      style={style}
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="none"
    >
      <defs>
        <pattern
          id={id}
          width={tw}
          height={th}
          patternUnits="userSpaceOnUse"
          patternTransform={transform || undefined}
        >
          {bg !== "transparent" && <rect width={tw} height={th} fill={bg} />}
          <Tile variant={variant} line={line} accent={accent} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
