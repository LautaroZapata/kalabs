/** Proyectos que mira el panel. El slug tiene que existir en kalabs_projects. */
export const PANEL_PROJECTS = [
  { slug: "kalabs", nombre: "kalabs.dev", url: "https://www.kalabs.dev" },
  { slug: "cupo", nombre: "cupo.uy", url: "https://cupo.uy" },
  { slug: "viagrua", nombre: "ViaGrúa", url: "https://via-grua.vercel.app" },
  {
    slug: "oleocaceres",
    nombre: "Oleo Cáceres",
    url: "https://oleocaceres-web.vercel.app",
  },
  {
    slug: "oleofin",
    nombre: "OleoFin",
    url: "https://oleocaceres.vercel.app",
  },
] as const;

export type PanelSlug = (typeof PANEL_PROJECTS)[number]["slug"];

/** Activo = last_seen dentro de los últimos 60s. El cliente late cada 25s. */
export const ACTIVO_MS = 60_000;
export const LATIDO_MS = 25_000;
