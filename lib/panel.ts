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

/* Config pública de Supabase, de respaldo cuando el build no trae las
   envs (el proyecto Vercel que sirve www no las tiene). La anon key es
   pública por diseño: el panel la manda igual al navegador. */
export const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://xcclonrcqwbcpqedzscf.supabase.co";
export const SUPABASE_ANON =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhjY2xvbnJjcXdiY3BxZWR6c2NmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA0MTM4NDcsImV4cCI6MjA5NTk4OTg0N30.ry574npFtG_YkM68k7o6JIgDeioG33fpQy-NQ9W381A";
