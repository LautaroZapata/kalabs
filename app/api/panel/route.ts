import { NextResponse } from "next/server";

import { supabaseServidor } from "@/lib/supabase";
import { PANEL_PROJECTS } from "@/lib/panel";

/* El token es opcional: si KALABS_ADMIN_TOKEN no está, el panel queda
   abierto (desarrollo). Si está, hay que mandar ?token= o
   Authorization: Bearer. Tauri lo lleva en la URL fija. */
export function tokenOk(req: Request): boolean {
  const esperado = process.env.KALABS_ADMIN_TOKEN;
  if (!esperado) return true;
  const url = new URL(req.url);
  if (url.searchParams.get("token") === esperado) return true;
  const auth = req.headers.get("authorization") ?? "";
  return auth === `Bearer ${esperado}`;
}

export async function GET(req: Request) {
  if (!tokenOk(req)) return NextResponse.json({ ok: false }, { status: 401 });
  const sb = supabaseServidor();
  const ahora = Date.now();
  const hace60s = new Date(ahora - 60_000).toISOString();
  const hoy0 = new Date();
  hoy0.setHours(0, 0, 0, 0);
  const hace7d = new Date(ahora - 7 * 24 * 3600_000).toISOString();

  const [pres, viewsHoy, views7d] = await Promise.all([
    sb
      .from("kalabs_presence")
      .select("project_slug,path,last_seen")
      .gte("last_seen", hace60s)
      .limit(500),
    sb
      .from("kalabs_page_views")
      .select("project_slug,path")
      .gte("created_at", hoy0.toISOString())
      .limit(2000),
    sb
      .from("kalabs_page_views")
      .select("project_slug")
      .gte("created_at", hace7d)
      .limit(5000),
  ]);

  const por = (slug: string) => {
    const activos = (pres.data ?? []).filter((r) => r.project_slug === slug);
    const hoy = (viewsHoy.data ?? []).filter((r) => r.project_slug === slug);
    const semana = (views7d.data ?? []).filter((r) => r.project_slug === slug);
    const top = new Map<string, number>();
    for (const v of hoy) top.set(v.path, (top.get(v.path) ?? 0) + 1);
    return {
      slug,
      activos: activos.length,
      visitasHoy: hoy.length,
      visitas7d: semana.length,
      topPaths: [...top.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([path, n]) => ({ path, n })),
      // Para el detalle live: hasta 8 sesiones con su path.
      sesiones: activos.slice(0, 8).map((a) => ({ path: a.path })),
    };
  };

  return NextResponse.json({
    ok: true,
    proyectos: PANEL_PROJECTS.map((p) => ({ ...p, ...por(p.slug) })),
  });
}
