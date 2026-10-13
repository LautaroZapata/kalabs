import { createClient } from "@supabase/supabase-js";

import { SUPABASE_ANON, SUPABASE_URL } from "@/lib/panel";

/* Cliente de servidor para el panel. Usa la anon key: las tablas kalabs_*
   tienen RLS abierto a anon en este mismo proyecto (son analítica propia,
   sin datos sensibles). No exponer service_role acá. */
export function supabaseServidor() {
  return createClient(SUPABASE_URL, SUPABASE_ANON, {
    auth: { persistSession: false },
  });
}
