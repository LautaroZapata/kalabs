/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    /* AVIF primero: las capturas de los proyectos son texto fino sobre fondos
       planos, y ahí pesa la mitad que WebP a la misma nitidez. */
    formats: ["image/avif", "image/webp"],
    /* 90 sólo para las capturas de la obra, donde se lee texto chico; el resto
       queda en el 75 de siempre. Desde Next 16 la lista es obligatoria. */
    qualities: [75, 90],
  },
};

export default nextConfig;
