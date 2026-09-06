/**
 * Filtro de rugosidad para los titulares.
 *
 * En vez de cambiar a una tipografía "distressed" —que además de romper el
 * límite de dos familias suele ser un display de novedad—, se erosiona el
 * borde de Fraunces con un desplazamiento por ruido. El efecto es el de una
 * letra entintada sobre papel poroso: el trazo pierde el filo perfecto que
 * delata a la pantalla.
 *
 * Va sobre texto vivo, así que sigue siendo seleccionable, indexable y
 * legible por un lector de pantalla. Si el navegador no aplica el filtro, la
 * letra se ve nítida y no se pierde nada.
 *
 * `scale` es bajo a propósito: pasado de 1.5 la letra se empasta y a cuerpos
 * chicos deja de leerse. Por eso el filtro sólo se usa en titulares grandes.
 */
export default function Rugosidad() {
  return (
    <svg className="sr" aria-hidden="true" focusable="false">
      <defs>
        <filter
          id="rugosidad"
          x="-3%"
          y="-3%"
          width="106%"
          height="106%"
          colorInterpolationFilters="sRGB"
        >
          {/* Grano grueso: a 10rem o más, un ruido fino se pierde y la letra
              vuelve a verse lisa. Acá la frecuencia es baja y el
              desplazamiento alto para que el borde se coma de a mordiscos. */}
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.045 0.09"
            numOctaves="4"
            seed="7"
            result="ruido"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="ruido"
            scale="7"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* Variante para los titulares de cuerpo medio: mismo carácter, con
            el desplazamiento contenido para no comerse la contraforma. */}
        <filter
          id="rugosidad-leve"
          x="-3%"
          y="-3%"
          width="106%"
          height="106%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.09 0.17"
            numOctaves="3"
            seed="3"
            result="ruido"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="ruido"
            scale="3.2"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}
