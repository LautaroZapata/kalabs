import fs from "node:fs";
import path from "node:path";

export type ProjectCategory = "cliente" | "propio" | "prospecto" | "interno";
export type ProjectStatus = "produccion" | "desarrollo" | "mantenimiento" | "pausado" | "archivado";
export type HealthStatus = "verde" | "amarillo" | "rojo";

export type HealthCheckRecord = {
  statusCode: number | null;
  latenciaMs: number | null;
  sslDiasRestantes: number | null;
  estaOnline: boolean;
  errorMensaje?: string | null;
  checkedAt: string;
};

export type MaintenanceLogEntry = {
  id: string;
  tipo: "dependencias" | "seguridad" | "preventivo" | "bugfix" | "infraestructura" | "otro";
  titulo: string;
  descripcion?: string;
  realizadoAt: string;
};

export type Project = {
  slug: string;
  nombre: string;
  url: string | null;
  categoria: ProjectCategory;
  estado: ProjectStatus;
  repoGithub?: string | null;
  pathLocal?: string | null;
  frecuenciaMantenimientoDias: number; // días máximos recomendados sin revisión (ej: 30 o 60)
  ultimoMantenimientoAt: string | null;
  notas?: string | null;
  ultimoCheck?: HealthCheckRecord | null;
  historialMantenimiento?: MaintenanceLogEntry[];
};

export type ProjectWithHealth = Project & {
  semaforo: HealthStatus;
  motivoSemaforo: string[];
  diasSinMantenimiento: number | null;
  necesitaMantenimiento: boolean;
};

// Proyectos sembrados por defecto basados en el ecosistema real de Kalabs y C:\development
export const PROYECTOS_INICIALES: Project[] = [
  // Producción / Clientes Activos
  {
    slug: "kalabs",
    nombre: "Kalabs Studio",
    url: "https://www.kalabs.dev",
    categoria: "propio",
    estado: "produccion",
    repoGithub: "kalabsuy/kalabs",
    pathLocal: "C:\\development\\kalabs",
    frecuenciaMantenimientoDias: 30,
    ultimoMantenimientoAt: "2026-10-15T12:00:00Z",
    notas: "Sitio principal de la agencia y panel administrativo central.",
  },
  {
    slug: "cupo",
    nombre: "Cupo.uy",
    url: "https://cupo.uy",
    categoria: "cliente",
    estado: "produccion",
    pathLocal: null,
    frecuenciaMantenimientoDias: 30,
    ultimoMantenimientoAt: "2026-10-10T14:30:00Z",
    notas: "Plataforma en producción para clientes.",
  },
  {
    slug: "viagrua",
    nombre: "ViaGrúa",
    url: "https://via-grua.vercel.app",
    categoria: "cliente",
    estado: "produccion",
    pathLocal: "C:\\development\\ViaGrua",
    frecuenciaMantenimientoDias: 30,
    ultimoMantenimientoAt: "2026-09-20T10:00:00Z",
    notas: "Aplicación y landing de auxilio mecánico y grúas.",
  },
  {
    slug: "oleocaceres",
    nombre: "Oleo Cáceres Web",
    url: "https://oleocaceres-web.vercel.app",
    categoria: "cliente",
    estado: "produccion",
    pathLocal: "C:\\development\\oleocaceres-web",
    frecuenciaMantenimientoDias: 45,
    ultimoMantenimientoAt: "2026-09-15T11:00:00Z",
    notas: "Portal web de Oleo Cáceres.",
  },
  {
    slug: "oleofin",
    nombre: "OleoFin",
    url: "https://oleocaceres.vercel.app",
    categoria: "cliente",
    estado: "produccion",
    pathLocal: "C:\\development\\OleoCaceresFin",
    frecuenciaMantenimientoDias: 45,
    ultimoMantenimientoAt: "2026-09-12T16:00:00Z",
    notas: "Sistema de finanzas y gestión de Oleo Cáceres.",
  },
  {
    slug: "miagendauy",
    nombre: "MiAgenda UY",
    url: null,
    categoria: "propio",
    estado: "desarrollo",
    pathLocal: "C:\\development\\miagendauy",
    frecuenciaMantenimientoDias: 30,
    ultimoMantenimientoAt: "2026-10-20T20:00:00Z",
    notas: "Next.js con Cloudflare Workers y Neon Postgres para reservas.",
  },
  {
    slug: "framextv_4k",
    nombre: "FramexTV 4K",
    url: null,
    categoria: "propio",
    estado: "desarrollo",
    pathLocal: "C:\\development\\framextv_4k",
    frecuenciaMantenimientoDias: 60,
    ultimoMantenimientoAt: "2026-10-21T04:00:00Z",
    notas: "Procesador y catálogo de medios y streaming 4K.",
  },
  {
    slug: "monteclaro",
    nombre: "MonteClaro (Godot)",
    url: null,
    categoria: "propio",
    estado: "desarrollo",
    pathLocal: "C:\\development\\MonteClaro",
    frecuenciaMantenimientoDias: 60,
    ultimoMantenimientoAt: "2026-10-21T14:00:00Z",
    notas: "Videojuego desarrollado en Godot Engine.",
  },
  {
    slug: "ai-job-search",
    nombre: "AI Job Search",
    url: null,
    categoria: "propio",
    estado: "desarrollo",
    pathLocal: "C:\\development\\ai-job-search",
    frecuenciaMantenimientoDias: 45,
    ultimoMantenimientoAt: "2026-10-15T10:00:00Z",
    notas: "Buscador inteligente de empleo con IA.",
  },
  {
    slug: "secuencestudio",
    nombre: "Secuence Studio",
    url: null,
    categoria: "propio",
    estado: "pausado",
    pathLocal: "C:\\development\\secuencestudio",
    frecuenciaMantenimientoDias: 90,
    ultimoMantenimientoAt: "2026-05-28T11:00:00Z",
    notas: "Estudio creativo y animación.",
  },
  // Prospectos Destacados
  {
    slug: "censopuerrul",
    nombre: "Censo Puerrul",
    url: null,
    categoria: "prospecto",
    estado: "mantenimiento",
    pathLocal: "C:\\development\\kalabs\\prospectos\\censopuerrul",
    frecuenciaMantenimientoDias: 60,
    ultimoMantenimientoAt: "2026-10-23T22:00:00Z",
    notas: "Prospecto reciente en desarrollo.",
  },
  {
    slug: "dr-martingentini",
    nombre: "Dr. Martín Gentini",
    url: null,
    categoria: "prospecto",
    estado: "desarrollo",
    pathLocal: "C:\\development\\kalabs\\prospectos\\dr.martingentini",
    frecuenciaMantenimientoDias: 60,
    ultimoMantenimientoAt: "2026-10-12T11:00:00Z",
    notas: "Sitio profesional médico.",
  },
  {
    slug: "automobile-uy",
    nombre: "Automobile UY",
    url: null,
    categoria: "prospecto",
    estado: "desarrollo",
    pathLocal: "C:\\development\\kalabs\\prospectos\\automobile-uy",
    frecuenciaMantenimientoDias: 60,
    ultimoMantenimientoAt: "2026-10-18T18:00:00Z",
    notas: "Catálogo automotriz.",
  },
  {
    slug: "bravastudio",
    nombre: "Brava Studio",
    url: null,
    categoria: "prospecto",
    estado: "desarrollo",
    pathLocal: "C:\\development\\kalabs\\prospectos\\bravastudio",
    frecuenciaMantenimientoDias: 60,
    ultimoMantenimientoAt: "2026-10-23T00:40:00Z",
    notas: "Estudio de diseño.",
  },
  {
    slug: "rocars",
    nombre: "Rocars",
    url: null,
    categoria: "prospecto",
    estado: "desarrollo",
    pathLocal: "C:\\development\\kalabs\\prospectos\\rocars",
    frecuenciaMantenimientoDias: 60,
    ultimoMantenimientoAt: "2026-10-18T18:00:00Z",
    notas: "Automotora.",
  },
];

const DATA_FILE = path.join(process.cwd(), "data", "projects-registry.json");
const TMP_FILE = path.join("/tmp", "projects-registry.json");
let memoriaProyectos: Project[] | null = null;

function asegurarDirectorioData() {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  } catch {
    // Si no se puede crear (ej: filesystem de solo lectura), se ignora
  }
}

/** Obtiene la lista actual de proyectos persistidos */
export function obtenerProyectos(): Project[] {
  if (memoriaProyectos && memoriaProyectos.length > 0) {
    return memoriaProyectos;
  }

  // 1. Probar en /tmp (escrituras en Vercel Serverless)
  try {
    if (fs.existsSync(TMP_FILE)) {
      const contenido = fs.readFileSync(TMP_FILE, "utf-8");
      const parsed = JSON.parse(contenido);
      if (Array.isArray(parsed) && parsed.length > 0) {
        memoriaProyectos = parsed;
        return parsed;
      }
    }
  } catch {
    // Ignorar y pasar al archivo empaquetado
  }

  // 2. Probar en data/projects-registry.json
  try {
    asegurarDirectorioData();
    if (fs.existsSync(DATA_FILE)) {
      const contenido = fs.readFileSync(DATA_FILE, "utf-8");
      const parsed = JSON.parse(contenido);
      if (Array.isArray(parsed) && parsed.length > 0) {
        memoriaProyectos = parsed;
        return parsed;
      }
    } else {
      guardarProyectos(PROYECTOS_INICIALES);
      memoriaProyectos = PROYECTOS_INICIALES;
      return PROYECTOS_INICIALES;
    }
  } catch (err) {
    console.error("[projects] Error leyendo data file:", err);
  }

  memoriaProyectos = PROYECTOS_INICIALES;
  return PROYECTOS_INICIALES;
}

/** Guarda la lista de proyectos en disco de manera segura */
export function guardarProyectos(proyectos: Project[]): void {
  memoriaProyectos = proyectos;

  // Intento 1: Guardar en el directorio local data/
  try {
    asegurarDirectorioData();
    fs.writeFileSync(DATA_FILE, JSON.stringify(proyectos, null, 2), "utf-8");
    return;
  } catch {
    // En entornos de solo lectura como AWS Lambda / Vercel, falla
  }

  // Intento 2: Guardar en /tmp (permitido en serverless)
  try {
    fs.writeFileSync(TMP_FILE, JSON.stringify(proyectos, null, 2), "utf-8");
  } catch (err) {
    console.error("[projects] Error guardando en /tmp:", err);
  }
}

/** Agrega o actualiza un proyecto por slug */
export function upsertProyecto(proyecto: Partial<Project> & { slug: string; nombre: string }): Project {
  const lista = obtenerProyectos();
  const idx = lista.findIndex((p) => p.slug === proyecto.slug);
  const now = new Date().toISOString();

  let resultado: Project;
  if (idx >= 0) {
    resultado = {
      ...lista[idx],
      ...proyecto,
      url: proyecto.url !== undefined ? proyecto.url : lista[idx].url,
    };
    lista[idx] = resultado;
  } else {
    resultado = {
      slug: proyecto.slug,
      nombre: proyecto.nombre,
      url: proyecto.url || null,
      categoria: proyecto.categoria || "cliente",
      estado: proyecto.estado || "desarrollo",
      repoGithub: proyecto.repoGithub || null,
      pathLocal: proyecto.pathLocal || null,
      frecuenciaMantenimientoDias: proyecto.frecuenciaMantenimientoDias || 30,
      ultimoMantenimientoAt: proyecto.ultimoMantenimientoAt || now,
      notas: proyecto.notas || null,
      ultimoCheck: null,
      historialMantenimiento: [],
    };
    lista.push(resultado);
  }

  guardarProyectos(lista);
  return resultado;
}

/** Actualiza el resultado del health check de un proyecto */
export function actualizarHealthCheck(slug: string, check: HealthCheckRecord): Project | null {
  const lista = obtenerProyectos();
  const p = lista.find((item) => item.slug === slug);
  if (!p) return null;

  p.ultimoCheck = check;
  guardarProyectos(lista);
  return p;
}

/** Registra una entrada en la bitácora de mantenimiento */
export function registrarMantenimiento(
  slug: string,
  log: Omit<MaintenanceLogEntry, "id" | "realizadoAt">
): Project | null {
  const lista = obtenerProyectos();
  const p = lista.find((item) => item.slug === slug);
  if (!p) return null;

  const entry: MaintenanceLogEntry = {
    id: `maint_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    tipo: log.tipo,
    titulo: log.titulo,
    descripcion: log.descripcion || "",
    realizadoAt: new Date().toISOString(),
  };

  if (!p.historialMantenimiento) {
    p.historialMantenimiento = [];
  }
  p.historialMantenimiento.unshift(entry);
  p.ultimoMantenimientoAt = entry.realizadoAt;

  guardarProyectos(lista);
  return p;
}

/** Elimina un proyecto */
export function eliminarProyecto(slug: string): boolean {
  const lista = obtenerProyectos();
  const nueva = lista.filter((p) => p.slug !== slug);
  if (nueva.length === lista.length) return false;
  guardarProyectos(nueva);
  return true;
}

/** Calcula el estado del semáforo y diagnósticos de mantenimiento de un proyecto */
export function calcularSaludProyecto(proyecto: Project): ProjectWithHealth {
  const motivos: string[] = [];
  let semaforo: HealthStatus = "verde";
  let diasSinMantenimiento: number | null = null;

  const ahora = Date.now();

  // 1. Días sin mantenimiento
  if (proyecto.ultimoMantenimientoAt) {
    const diffMs = ahora - new Date(proyecto.ultimoMantenimientoAt).getTime();
    diasSinMantenimiento = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
    if (diasSinMantenimiento > proyecto.frecuenciaMantenimientoDias * 1.5) {
      semaforo = "rojo";
      motivos.push(`Hace ${diasSinMantenimiento} días sin mantenimiento (límite: ${proyecto.frecuenciaMantenimientoDias}d)`);
    } else if (diasSinMantenimiento > proyecto.frecuenciaMantenimientoDias) {
      semaforo = "amarillo";
      motivos.push(`Requiere revisión preventiva (${diasSinMantenimiento}d sin registrar)`);
    }
  } else {
    semaforo = "amarillo";
    motivos.push("Sin registro de mantenimiento previo");
  }

  // 2. Health check de Uptime y SSL si tiene URL pública
  if (proyecto.url) {
    const check = proyecto.ultimoCheck;
    if (!check) {
      if (semaforo !== "rojo") semaforo = "amarillo";
      motivos.push("Sin verificación de salud ejecutada aún");
    } else {
      if (!check.estaOnline) {
        semaforo = "rojo";
        motivos.push(`Sitio offline (${check.errorMensaje || "Fallo de conexión"})`);
      } else if (check.statusCode && (check.statusCode < 200 || check.statusCode >= 400)) {
        semaforo = "rojo";
        motivos.push(`Código HTTP anómalo: ${check.statusCode}`);
      }

      if (check.sslDiasRestantes !== null) {
        if (check.sslDiasRestantes <= 7) {
          semaforo = "rojo";
          motivos.push(`Certificado SSL crítico: vence en ${check.sslDiasRestantes} días`);
        } else if (check.sslDiasRestantes <= 20) {
          if (semaforo !== "rojo") semaforo = "amarillo";
          motivos.push(`Certificado SSL vence pronto: ${check.sslDiasRestantes} días`);
        }
      }

      if (check.latenciaMs !== null && check.latenciaMs > 2500) {
        if (semaforo !== "rojo") semaforo = "amarillo";
        motivos.push(`Latencia elevada: ${check.latenciaMs}ms`);
      }
    }
  }

  const necesitaMantenimiento = semaforo === "rojo" || semaforo === "amarillo";

  return {
    ...proyecto,
    semaforo,
    motivoSemaforo: motivos.length > 0 ? motivos : ["Todos los parámetros en regla"],
    diasSinMantenimiento,
    necesitaMantenimiento,
  };
}
