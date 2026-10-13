import { NextResponse } from "next/server";

import { supabaseServidor } from "@/lib/supabase";
import { PANEL_PROJECTS } from "@/lib/panel";

const VALIDOS = new Set(PANEL_PROJECTS.map((p) => p.slug));

/* Entrada única de analítica. Los sitios externos (ViaGrúa, Oleo, Cupo)
   pegan contra este endpoint: no necesitan clave de Supabase. */
export async function POST(req: Request) {
  let dato: {
    project?: string;
    path?: string;
    referrer?: string;
    session?: string;
    evento?: string;
  };
  try {
    dato = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const project = String(dato.project ?? "").slice(0, 40);
  if (!VALIDOS.has(project as never))
    return NextResponse.json({ ok: false }, { status: 400 });
  const path = String(dato.path ?? "/").slice(0, 300) || "/";
  const referrer = String(dato.referrer ?? "").slice(0, 300);
  const session = String(dato.session ?? "").slice(0, 64) || "anon";
  const evento = dato.evento === "ping" ? "ping" : "view";

  let ua = "";
  try {
    ua = (req.headers.get("user-agent") ?? "").slice(0, 300);
  } catch {}

  try {
    const sb = supabaseServidor();
    await sb.from("kalabs_presence").upsert(
      {
        project_slug: project,
        session_id: session,
        path,
        user_agent: ua,
        last_seen: new Date().toISOString(),
      },
      { onConflict: "project_slug,session_id" },
    );
    /* Solo el view cuenta visita. El ping solo refresca presencia:
       si no, cada pestaña abierta suma 2-3 visitas por minuto. */
    if (evento === "view") {
      await sb.from("kalabs_page_views").insert({
        project_slug: project,
        path,
        referrer,
        session_id: session,
      });
    }
  } catch (falla) {
    console.error("[track] supabase falló", falla);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
