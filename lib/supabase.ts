import { createClient } from "@supabase/supabase-js";

/* Cliente de servidor para el panel. Usa la anon key: las tablas kalabs_*
   tienen RLS abierto a anon en este mismo proyecto (son analítica propia,
   sin datos sensibles). No exponer service_role acá. */
export function supabaseServidor() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) throw new Error("Faltan NEXT_PUBLIC_SUPABASE_URL/ANON_KEY");
  return createClient(url, anon, { auth: { persistSession: false } });
}
