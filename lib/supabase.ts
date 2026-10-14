import { createClient } from "@supabase/supabase-js";

/* Proyecto Supabase propio del panel (cuenta kalabsuy), separado de las
   apps de clientes. Sirve de respaldo cuando el build no trae las envs: el
   proyecto Vercel que sirve www no las tiene. La anon key es pública por
   diseño y sólo puede ejecutar kalabs_track y kalabs_stats; las tablas no
   le son accesibles (ver supabase/kalabs-panel.sql). */
const URL_PANEL = "https://lnhpwzrbzteblexwzres.supabase.co";
const ANON_PANEL = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxuaHB3enJienRlYmxleHd6cmVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE5MDMwMTYsImV4cCI6MjEwNzQ3OTAxNn0.uM8njS0d7BXhdXDZJRSZKHnOvsHZY25plBga3Gc7GA4";

export function supabaseServidor() {
  return createClient(URL_PANEL, ANON_PANEL, {
    auth: { persistSession: false },
  });
}
