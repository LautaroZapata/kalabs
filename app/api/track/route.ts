import { NextResponse } from "next/server";

import { supabaseServidor } from "@/lib/supabase";
import { PANEL_PROJECTS } from "@/lib/panel";

const VALIDOS = new Set(PANEL_PROJECTS.map((p) => p.slug));

/* sendBeacon con Blob application/json sale en modo CORS con credenciales:
   pide preflight y no acepta "*", hay que devolver el origin. No filtra por
   origin porque el endpoint igual es público; valida el slug. */
function cors(req: Request): Record<string, string> {
  const origin = req.headers.get("origin");
  if (!origin) return {};
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "content-type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

export function OPTIONS(req: Request) {
  return new Response(null, { status: 204, headers: cors(req) });
}

/* Entrada única de analítica. Los sitios externos (ViaGrúa, Oleo, Cupo)
   pegan contra este endpoint: no necesitan clave de Supabase. */
export async function POST(req: Request) {
  const headers = cors(req);
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
    return NextResponse.json({ ok: false }, { status: 400, headers });
  }
  const project = String(dato.project ?? "").slice(0, 40);
  if (!VALIDOS.has(project as never))
    return NextResponse.json({ ok: false }, { status: 400, headers });
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
    return NextResponse.json({ ok: false }, { status: 500, headers });
  }
  return NextResponse.json({ ok: true }, { headers });
}
