import { NextResponse } from "next/server";
import { tokenDeRequest, tokenValido } from "@/lib/panel-acceso";
import {
  registrarMantenimiento,
  calcularSaludProyecto,
  type MaintenanceLogEntry,
} from "@/lib/projects";

export async function POST(req: Request) {
  const token = tokenDeRequest(req);
  if (!tokenValido(token)) {
    return NextResponse.json({ ok: false, error: "No autorizado" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { slug, tipo, titulo, descripcion } = body;

    if (!slug || typeof slug !== "string") {
      return NextResponse.json({ ok: false, error: "Slug requerido" }, { status: 400 });
    }

    if (!titulo || typeof titulo !== "string" || titulo.trim().length === 0) {
      return NextResponse.json(
        { ok: false, error: "El título de la intervención es obligatorio" },
        { status: 400 }
      );
    }

    const tiposValidos: MaintenanceLogEntry["tipo"][] = [
      "dependencias",
      "seguridad",
      "preventivo",
      "bugfix",
      "infraestructura",
      "otro",
    ];

    const tipoValido: MaintenanceLogEntry["tipo"] = tiposValidos.includes(tipo)
      ? tipo
      : "preventivo";

    const actualizado = registrarMantenimiento(slug, {
      tipo: tipoValido,
      titulo: titulo.trim(),
      descripcion: typeof descripcion === "string" ? descripcion.trim() : "",
    });

    if (!actualizado) {
      return NextResponse.json(
        { ok: false, error: "Proyecto no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ok: true,
      proyecto: calcularSaludProyecto(actualizado),
    });
  } catch (err) {
    console.error("[api/maintenance] Error:", err);
    return NextResponse.json(
      { ok: false, error: "Error interno al registrar mantenimiento" },
      { status: 500 }
    );
  }
}
