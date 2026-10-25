import { NextResponse } from "next/server";
import tls from "node:tls";
import { tokenDeRequest, tokenValido } from "@/lib/panel-acceso";
import {
  actualizarHealthCheck,
  calcularSaludProyecto,
  obtenerProyectos,
  type HealthCheckRecord,
} from "@/lib/projects";

/** Valida que la URL sea segura y no apunte a infraestructura interna o privada (Anti-SSRF) */
function esUrlSegura(urlStr: string): { segura: boolean; error?: string; parsed?: URL } {
  try {
    const parsed = new URL(urlStr);

    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return { segura: false, error: "Protocolo no permitido (solo http o https)" };
    }

    const host = parsed.hostname.toLowerCase();

    // Bloqueo de localhost, nombres reservados y metadatos en nube
    const hostsBloqueados = [
      "localhost",
      "0.0.0.0",
      "::1",
      "[::1]",
      "127.0.0.1",
      "169.254.169.254", // AWS/GCP/Azure metadata
      "metadata.google.internal",
      "instance-data",
    ];

    if (hostsBloqueados.includes(host)) {
      return { segura: false, error: "Host no permitido" };
    }

    if (
      host.endsWith(".local") ||
      host.endsWith(".internal") ||
      host.endsWith(".localhost") ||
      host.endsWith(".arpa")
    ) {
      return { segura: false, error: "Dominios internos no permitidos" };
    }

    // Bloqueo de rangos de IPs privadas IPv4
    const ipPrivadaRegex =
      /^(10\.\d{1,3}\.\d{1,3}\.\d{1,3}|127\.\d{1,3}\.\d{1,3}\.\d{1,3}|172\.(1[6-9]|2\d|3[01])\.\d{1,3}\.\d{1,3}|192\.168\.\d{1,3}\.\d{1,3}|169\.254\.\d{1,3}\.\d{1,3}|100\.(6[4-9]|[7-9]\d|1[01]\d|12[0-7])\.\d{1,3}\.\d{1,3})$/;

    if (ipPrivadaRegex.test(host)) {
      return { segura: false, error: "Rango de IP privado no permitido" };
    }

    // Solo puertos web estándar
    if (parsed.port && parsed.port !== "80" && parsed.port !== "443") {
      return { segura: false, error: "Puerto no permitido (solo 80 y 443)" };
    }

    return { segura: true, parsed };
  } catch {
    return { segura: false, error: "URL inválida" };
  }
}

/** Inspecciona los días restantes del certificado TLS/SSL mediante conexión TLS socket */
function obtenerDiasRestantesSSL(host: string, port = 443): Promise<number | null> {
  return new Promise((resolve) => {
    try {
      const socket = tls.connect(
        {
          host,
          port,
          servername: host,
          rejectUnauthorized: false,
          timeout: 5000,
        },
        () => {
          try {
            const cert = socket.getPeerCertificate();
            if (cert && cert.valid_to) {
              const vence = new Date(cert.valid_to).getTime();
              const ahora = Date.now();
              const dias = Math.floor((vence - ahora) / (1000 * 60 * 60 * 24));
              socket.destroy();
              resolve(dias);
              return;
            }
          } catch {
            // Ignorar y resolver null
          }
          socket.destroy();
          resolve(null);
        }
      );

      socket.on("error", () => {
        socket.destroy();
        resolve(null);
      });

      socket.on("timeout", () => {
        socket.destroy();
        resolve(null);
      });
    } catch {
      resolve(null);
    }
  });
}

/** Ejecuta la verificación completa de salud para un URL */
async function verificarSaludUrl(urlStr: string): Promise<HealthCheckRecord> {
  const { segura, error, parsed } = esUrlSegura(urlStr);
  const checkedAt = new Date().toISOString();

  if (!segura || !parsed) {
    return {
      statusCode: null,
      latenciaMs: null,
      sslDiasRestantes: null,
      estaOnline: false,
      errorMensaje: error || "URL insegura",
      checkedAt,
    };
  }

  let statusCode: number | null = null;
  let latenciaMs: number | null = null;
  let estaOnline = false;
  let errorMensaje: string | null = null;
  let sslDiasRestantes: number | null = null;

  // 1. Chequeo de SSL si es https
  if (parsed.protocol === "https:") {
    const port = parsed.port ? parseInt(parsed.port, 10) : 443;
    sslDiasRestantes = await obtenerDiasRestantesSSL(parsed.hostname, port);
  }

  // 2. Medición de Uptime y Latencia HTTP
  const t0 = performance.now();
  try {
    let targetUrl = urlStr;
    let redirectsCount = 0;
    const maxRedirects = 3;

    let res: Response | null = null;

    while (redirectsCount <= maxRedirects) {
      // Intentar HEAD primero
      let respuesta = await fetch(targetUrl, {
        method: "HEAD",
        signal: AbortSignal.timeout(8000),
        redirect: "manual",
        headers: {
          "User-Agent": "Kalabs-HealthCheck/1.0",
        },
      });

      // Si el servidor responde 405 Method Not Allowed a HEAD, intentar GET
      if (respuesta.status === 405) {
        respuesta = await fetch(targetUrl, {
          method: "GET",
          signal: AbortSignal.timeout(8000),
          redirect: "manual",
          headers: {
            "User-Agent": "Kalabs-HealthCheck/1.0",
          },
        });
      }

      // Si es una redirección (301, 302, 307, 308), validar que el destino siga siendo seguro (Anti-SSRF en redirecciones)
      if ([301, 302, 303, 307, 308].includes(respuesta.status)) {
        const location = respuesta.headers.get("location");
        if (!location) {
          res = respuesta;
          break;
        }

        const nuevaUrl = new URL(location, targetUrl).toString();
        const checkSegura = esUrlSegura(nuevaUrl);
        if (!checkSegura.segura) {
          throw new Error("Redirección a destino no permitido por seguridad");
        }

        targetUrl = nuevaUrl;
        redirectsCount++;
        res = respuesta;
      } else {
        res = respuesta;
        break;
      }
    }

    if (!res) throw new Error("Sin respuesta del servidor");

    latenciaMs = Math.round(performance.now() - t0);
    statusCode = res.status;
    estaOnline = res.status >= 200 && res.status < 400;
    if (!estaOnline) {
      errorMensaje = `HTTP ${res.status} ${res.statusText}`;
    }
  } catch (err: unknown) {
    latenciaMs = Math.round(performance.now() - t0);
    estaOnline = false;
    errorMensaje = err instanceof Error ? err.message : "Error de red";
  }

  return {
    statusCode,
    latenciaMs,
    sslDiasRestantes,
    estaOnline,
    errorMensaje,
    checkedAt,
  };
}

export async function POST(req: Request) {
  const token = tokenDeRequest(req);
  if (!tokenValido(token)) {
    return NextResponse.json({ ok: false, error: "No autorizado" }, { status: 401 });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const { slug, todos } = body;

    // Chequeo en lote de todos los proyectos con URL
    if (todos === true) {
      const lista = obtenerProyectos();
      const conUrl = lista.filter((p) => Boolean(p.url));

      // Procesar en lotes de 4 para no saturar sockets ni descriptores
      const chunkSize = 4;
      for (let i = 0; i < conUrl.length; i += chunkSize) {
        const chunk = conUrl.slice(i, i + chunkSize);
        await Promise.all(
          chunk.map(async (p) => {
            if (!p.url) return null;
            const check = await verificarSaludUrl(p.url);
            return actualizarHealthCheck(p.slug, check);
          })
        );
      }

      const actualizados = obtenerProyectos().map(calcularSaludProyecto);
      return NextResponse.json({ ok: true, proyectos: actualizados });
    }

    // Chequeo individual por slug
    if (!slug || typeof slug !== "string") {
      return NextResponse.json({ ok: false, error: "Slug requerido" }, { status: 400 });
    }

    const lista = obtenerProyectos();
    const proyecto = lista.find((p) => p.slug === slug);
    if (!proyecto) {
      return NextResponse.json({ ok: false, error: "Proyecto no encontrado" }, { status: 404 });
    }

    if (!proyecto.url) {
      return NextResponse.json(
        { ok: false, error: "El proyecto no tiene una URL pública configurada" },
        { status: 400 }
      );
    }

    const check = await verificarSaludUrl(proyecto.url);
    const actualizado = actualizarHealthCheck(slug, check);

    return NextResponse.json({
      ok: true,
      proyecto: actualizado ? calcularSaludProyecto(actualizado) : null,
    });
  } catch (err) {
    console.error("[api/health-check] Error:", err);
    return NextResponse.json(
      { ok: false, error: "Error interno al verificar salud" },
      { status: 500 }
    );
  }
}
