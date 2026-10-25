import { NextResponse } from "next/server";
import { tokenDeRequest, tokenValido } from "@/lib/panel-acceso";
import {
  obtenerProyectos,
  upsertProyecto,
  eliminarProyecto,
  calcularSaludProyecto,
  type ProjectCategory,
  type ProjectStatus,
} from "@/lib/projects";

export async function GET(req: Request) {
  const token = tokenDeRequest(req);
  if (!tokenValido(token)) {
    return NextResponse.json({ ok: false, error: "No autorizado" }, { status: 401 });
  }

  const lista = obtenerProyectos();
  const proyectosConSalud = lista.map(calcularSaludProyecto);

  return NextResponse.json(
    { ok: true, proyectos: proyectosConSalud },
    { headers: { "Cache-Control": "no-store" } }
  );
}

export async function POST(req: Request) {
  const token = tokenDeRequest(req);
  if (!tokenValido(token)) {
    return NextResponse.json({ ok: false, error: "No autorizado" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const {
      slug,
      nombre,
      url,
      categoria,
      estado,
      repoGithub,
      pathLocal,
      frecuenciaMantenimientoDias,
      notas,
    } = body;

    if (!slug || typeof slug !== "string" || !/^[a-z0-9-_]+$/i.test(slug.trim())) {
      return NextResponse.json(
        { ok: false, error: "El slug es obligatorio y debe contener solo caracteres alfanuméricos, guiones o guiones bajos." },
        { status: 400 }
      );
    }

    if (!nombre || typeof nombre !== "string" || nombre.trim().length === 0) {
      return NextResponse.json(
        { ok: false, error: "El nombre es obligatorio." },
        { status: 400 }
      );
    }

    const categoriasValidas: ProjectCategory[] = ["cliente", "propio", "prospecto", "interno"];
    const estadosValidos: ProjectStatus[] = ["produccion", "desarrollo", "mantenimiento", "pausado", "archivado"];

    const cat: ProjectCategory = categoriasValidas.includes(categoria) ? categoria : "cliente";
    const est: ProjectStatus = estadosValidos.includes(estado) ? estado : "desarrollo";

    let urlLimpia: string | null = null;
    if (url && typeof url === "string" && url.trim().length > 0) {
      const u = url.trim();
      if (!/^https?:\/\//i.test(u)) {
        return NextResponse.json(
          { ok: false, error: "La URL debe comenzar con http:// o https://" },
          { status: 400 }
        );
      }
      urlLimpia = u;
    }

    const actualizado = upsertProyecto({
      slug: slug.trim().toLowerCase(),
      nombre: nombre.trim(),
      url: urlLimpia,
      categoria: cat,
      estado: est,
      repoGithub: typeof repoGithub === "string" ? repoGithub.trim() : null,
      pathLocal: typeof pathLocal === "string" ? pathLocal.trim() : null,
      frecuenciaMantenimientoDias:
        typeof frecuenciaMantenimientoDias === "number" && frecuenciaMantenimientoDias > 0
          ? Math.min(365, frecuenciaMantenimientoDias)
          : 30,
      notas: typeof notas === "string" ? notas.trim() : null,
    });

    return NextResponse.json({
      ok: true,
      proyecto: calcularSaludProyecto(actualizado),
    });
  } catch (err) {
    console.error("[api/projects] Error al procesar POST:", err);
    return NextResponse.json(
      { ok: false, error: "Error interno al guardar proyecto" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const token = tokenDeRequest(req);
  if (!tokenValido(token)) {
    return NextResponse.json({ ok: false, error: "No autorizado" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");
    if (!slug) {
      return NextResponse.json({ ok: false, error: "Slug requerido" }, { status: 400 });
    }

    const borrado = eliminarProyecto(slug);
    if (!borrado) {
      return NextResponse.json({ ok: false, error: "Proyecto no encontrado" }, { status: 404 });
    }

    return NextResponse.json({ ok: true, slug });
  } catch (err) {
    console.error("[api/projects] Error al procesar DELETE:", err);
    return NextResponse.json(
      { ok: false, error: "Error interno al eliminar proyecto" },
      { status: 500 }
    );
  }
}
