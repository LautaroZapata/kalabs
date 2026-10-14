import { NextResponse } from "next/server";

import { supabaseServidor } from "@/lib/supabase";
import { PANEL_PROJECTS } from "@/lib/panel";
import { tokenDeRequest, tokenValido } from "@/lib/panel-acceso";

type Stats = {
  activos: number;
  visitasHoy: number;
  visitas7d: number;
  topPaths: { path: string; n: number }[];
  sesiones: { path: string }[];
};

const VACIO: Stats = {
  activos: 0,
  visitasHoy: 0,
  visitas7d: 0,
  topPaths: [],
  sesiones: [],
};

/* Pide ?token= o Authorization: Bearer. Tauri lo lleva en la URL fija.
   Los números salen de kalabs_stats, que vuelve a validar el token: las
   tablas no se leen directo con la anon key. */
export async function GET(req: Request) {
  const token = tokenDeRequest(req);
  if (!tokenValido(token)) return NextResponse.json({ ok: false }, { status: 401 });

  const { data, error } = await supabaseServidor().rpc("kalabs_stats", {
    p_token: token,
  });
  if (error || !data) {
    console.error("[panel] kalabs_stats falló", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
  const stats = data as Record<string, Stats>;

  return NextResponse.json(
    {
      ok: true,
      proyectos: PANEL_PROJECTS.map((p) => ({
        ...p,
        ...(stats[p.slug] ?? VACIO),
      })),
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
