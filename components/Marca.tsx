/**
 * El isotipo: la K de trazo del estudio.
 *
 * Un solo `path`. Va en `currentColor` y no en el naranja del archivo original
 * (`#f75e1b`) a propósito: el sitio tiene un solo naranja —`--ember`,
 * `#ff6b1a`— y dos naranjas casi iguales conviviendo se leen como un error de
 * impresión, no como dos colores. Así el mismo componente sirve en tinta sobre
 * papel, en papel sobre tinta y en tinta sobre el plano de brasa.
 *
 * `viewBox` recortado al trazo: el archivo venía con tres transformaciones
 * anidadas y el dibujo a 5.000 unidades del origen. Acá quedó una sola matriz
 * y la caja arranca en 0,0, que es lo que permite escalarlo sin calcular nada.
 */
export default function Marca({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1943 1894"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path
        transform="matrix(3.355663,0,0,3.355663,-1500.083401,-5850.937023)"
        d="M966.508,1743.601L1025.877,1802.97C1025.877,1802.97 995.231,1930.64 984.649,1994.269C974.162,2057.327 962.385,2184.745 962.385,2184.745C962.385,2184.745 977.731,2212.419 981.351,2227.622C986.161,2247.824 992.345,2294.137 991.245,2305.956C990.687,2311.958 979.206,2302.6 974.754,2298.535C962.111,2286.991 927.341,2249.611 915.385,2236.693C910.866,2231.809 906.04,2226.111 903.017,2221.026C900.304,2216.463 897.245,2206.183 897.245,2206.183C897.245,2206.183 901.917,2139.943 901.367,2123.727C901.18,2118.198 899.435,2108.201 893.946,2108.884C855.329,2113.694 733.843,2135.958 669.664,2152.587C614.716,2166.824 508.873,2208.657 508.873,2208.657L447.03,2148.464L597.926,2094.042L851.069,2042.919C851.069,2042.919 821.659,1962.524 813.963,1924.181C806.637,1887.681 804.206,1842.274 804.893,1812.864C805.41,1790.716 818.086,1747.724 818.086,1747.724C818.086,1747.724 870.171,1798.847 883.227,1813.689C889.081,1820.344 894.521,1828.119 896.42,1836.777C902.329,1863.713 918.683,1975.304 918.683,1975.304C918.683,1975.304 932.976,1862.201 940.947,1823.584C946.605,1796.172 966.508,1743.601 966.508,1743.601Z"
      />
    </svg>
  );
}
