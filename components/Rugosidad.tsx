/**
 * Filtro de rugosidad para la cabecera.
 *
 * En vez de cambiar a una tipografía "distressed" —que además de romper el
 * límite de dos familias suele ser un display de novedad—, se erosiona el
 * borde de Fraunces con un desplazamiento por ruido. El efecto es el de una
 * letra entintada sobre papel poroso: el trazo pierde el filo perfecto que
 * delata a la pantalla.
 *
 * Se usa en un solo lugar: el "Kalabs" de la cabecera. Aplicado a todos los
 * titulares del sitio la textura dejaba de ser un acento y se volvía ruido de
 * fondo —a esa escala compite con el texto en vez de sostenerlo—. Un elemento
 * rugoso contra tres páginas de letra limpia se nota más que veinte.
 *
 * Va sobre texto vivo, así que sigue siendo seleccionable, indexable y
 * legible por un lector de pantalla. Si el navegador no aplica el filtro, la
 * letra se ve nítida y no se pierde nada.
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
      </defs>
    </svg>
  );
}
