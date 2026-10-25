"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { ProjectWithHealth, ProjectCategory, ProjectStatus } from "@/lib/projects";
import s from "./Panel.module.css";

type ProyectoAnalitica = {
  slug: string;
  nombre: string;
  url: string;
  activos: number;
  visitasHoy: number;
  visitas7d: number;
  topPaths: { path: string; n: number }[];
  sesiones: { path: string }[];
};

const HORA = new Intl.DateTimeFormat("es-UY", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
});

const FECHA = new Intl.DateTimeFormat("es-UY", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

export default function Panel({ token }: { token: string }) {
  const [montado, setMontado] = useState(false);
  const [pestaña, setPestaña] = useState<"mantenimiento" | "analitica">("mantenimiento");

  // Estado: Mantenimiento & Proyectos
  const [proyectos, setProyectos] = useState<ProjectWithHealth[]>([]);
  const [cargandoProyectos, setCargandoProyectos] = useState(true);
  const [verificandoSalud, setVerificandoSalud] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [filtroSemaforo, setFiltroSemaforo] = useState<"todos" | "atencion" | "verde" | "rojo">("todos");
  const [filtroCategoria, setFiltroCategoria] = useState<"todas" | ProjectCategory>("todas");

  useEffect(() => {
    setMontado(true);
  }, []);

  // Modales
  const [modalMantenimiento, setModalMantenimiento] = useState<ProjectWithHealth | null>(null);
  const [modalBitacora, setModalBitacora] = useState<ProjectWithHealth | null>(null);
  const [modalEditar, setModalEditar] = useState<ProjectWithHealth | "nuevo" | null>(null);

  // Formulario de Mantenimiento
  const [maintTitulo, setMaintTitulo] = useState("");
  const [maintTipo, setMaintTipo] = useState<string>("preventivo");
  const [maintDesc, setMaintDesc] = useState("");
  const [guardandoMaint, setGuardandoMaint] = useState(false);

  // Formulario de Proyecto (Nuevo / Editar)
  const [editSlug, setEditSlug] = useState("");
  const [editNombre, setEditNombre] = useState("");
  const [editUrl, setEditUrl] = useState("");
  const [editCategoria, setEditCategoria] = useState<ProjectCategory>("cliente");
  const [editEstado, setEditEstado] = useState<ProjectStatus>("produccion");
  const [editRepo, setEditRepo] = useState("");
  const [editLocal, setEditLocal] = useState("");
  const [editFrecuencia, setEditFrecuencia] = useState(30);
  const [editNotas, setEditNotas] = useState("");
  const [guardandoProyecto, setGuardandoProyecto] = useState(false);
  const [errorForm, setErrorForm] = useState<string | null>(null);

  // Estado: Analítica (Original)
  const [datosAnalitica, setDatosAnalitica] = useState<ProyectoAnalitica[]>([]);
  const [hace, setHace] = useState("-");
  const [vivo, setVivo] = useState(false);

  // Cargar Proyectos para el Command Center
  const cargarProyectos = useCallback(async () => {
    setCargandoProyectos(true);
    try {
      const q = token ? `?token=${encodeURIComponent(token)}` : "";
      const r = await fetch(`/api/projects${q}`, { cache: "no-store" });
      if (!r.ok) throw new Error(String(r.status));
      const j = await r.json();
      if (j.ok && Array.isArray(j.proyectos)) {
        setProyectos(j.proyectos);
      }
    } catch (err) {
      console.error("[panel] Error al cargar proyectos:", err);
    } finally {
      setCargandoProyectos(false);
    }
  }, [token]);

  // Cargar Analítica en Vivo
  const cargarAnalitica = useCallback(async () => {
    const q = token ? `?token=${encodeURIComponent(token)}` : "";
    try {
      const r = await fetch(`/api/panel${q}`, { cache: "no-store" });
      if (!r.ok) throw new Error(String(r.status));
      const j = await r.json();
      setDatosAnalitica(j.proyectos);
      setHace(HORA.format(new Date()));
      setVivo(true);
    } catch {
      setVivo(false);
    }
  }, [token]);

  useEffect(() => {
    cargarProyectos();
  }, [cargarProyectos]);

  useEffect(() => {
    if (pestaña !== "analitica") return;
    cargarAnalitica();
    const t = setInterval(cargarAnalitica, 10_000);
    return () => clearInterval(t);
  }, [pestaña, cargarAnalitica]);

  // Ejecutar verificación de salud en lote o individual
  const verificarSalud = async (slug?: string) => {
    setVerificandoSalud(true);
    try {
      const q = token ? `?token=${encodeURIComponent(token)}` : "";
      const r = await fetch(`/api/health-check${q}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(slug ? { slug } : { todos: true }),
      });
      const j = await r.json();
      if (j.ok) {
        if (j.proyectos) {
          setProyectos(j.proyectos);
        } else if (j.proyecto) {
          setProyectos((prev) =>
            prev.map((p) => (p.slug === j.proyecto.slug ? j.proyecto : p))
          );
        }
      }
    } catch (err) {
      console.error("[panel] Error al verificar salud:", err);
    } finally {
      setVerificandoSalud(false);
    }
  };

  // Guardar Intervención de Mantenimiento
  const guardarMantenimiento = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalMantenimiento || !maintTitulo.trim()) return;

    setGuardandoMaint(true);
    try {
      const q = token ? `?token=${encodeURIComponent(token)}` : "";
      const r = await fetch(`/api/maintenance${q}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: modalMantenimiento.slug,
          tipo: maintTipo,
          titulo: maintTitulo.trim(),
          descripcion: maintDesc.trim(),
        }),
      });
      const j = await r.json();
      if (j.ok && j.proyecto) {
        setProyectos((prev) =>
          prev.map((p) => (p.slug === j.proyecto.slug ? j.proyecto : p))
        );
        setModalMantenimiento(null);
        setMaintTitulo("");
        setMaintDesc("");
      }
    } catch (err) {
      console.error("[panel] Error al guardar mantenimiento:", err);
    } finally {
      setGuardandoMaint(false);
    }
  };

  // Abrir Modal de Edición o Creación
  const abrirFormularioProyecto = (p: ProjectWithHealth | "nuevo") => {
    setErrorForm(null);
    if (p === "nuevo") {
      setEditSlug("");
      setEditNombre("");
      setEditUrl("");
      setEditCategoria("cliente");
      setEditEstado("produccion");
      setEditRepo("");
      setEditLocal("");
      setEditFrecuencia(30);
      setEditNotas("");
    } else {
      setEditSlug(p.slug);
      setEditNombre(p.nombre);
      setEditUrl(p.url || "");
      setEditCategoria(p.categoria);
      setEditEstado(p.estado);
      setEditRepo(p.repoGithub || "");
      setEditLocal(p.pathLocal || "");
      setEditFrecuencia(p.frecuenciaMantenimientoDias || 30);
      setEditNotas(p.notas || "");
    }
    setModalEditar(p);
  };

  // Guardar Proyecto (Nuevo o Editado)
  const guardarProyecto = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorForm(null);

    if (!editSlug.trim() || !editNombre.trim()) {
      setErrorForm("El slug y el nombre son requeridos.");
      return;
    }

    setGuardandoProyecto(true);
    try {
      const q = token ? `?token=${encodeURIComponent(token)}` : "";
      const r = await fetch(`/api/projects${q}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: editSlug.trim().toLowerCase(),
          nombre: editNombre.trim(),
          url: editUrl.trim() || null,
          categoria: editCategoria,
          estado: editEstado,
          repoGithub: editRepo.trim() || null,
          pathLocal: editLocal.trim() || null,
          frecuenciaMantenimientoDias: Number(editFrecuencia) || 30,
          notas: editNotas.trim() || null,
        }),
      });
      const j = await r.json();
      if (!r.ok || !j.ok) {
        setErrorForm(j.error || "Error al guardar proyecto");
      } else {
        setProyectos((prev) => {
          const existe = prev.some((p) => p.slug === j.proyecto.slug);
          if (existe) {
            return prev.map((p) => (p.slug === j.proyecto.slug ? j.proyecto : p));
          }
          return [j.proyecto, ...prev];
        });
        setModalEditar(null);
      }
    } catch (err) {
      setErrorForm("Error al conectar con el servidor.");
      console.error(err);
    } finally {
      setGuardandoProyecto(false);
    }
  };

  // Eliminar Proyecto
  const borrarProyecto = async (slug: string, nombre: string) => {
    if (!window.confirm(`¿Seguro que deseas eliminar "${nombre}" del panel?`)) return;

    try {
      const q = token
        ? `?token=${encodeURIComponent(token)}&slug=${encodeURIComponent(slug)}`
        : `?slug=${encodeURIComponent(slug)}`;
      const r = await fetch(`/api/projects${q}`, { method: "DELETE" });
      const j = await r.json();
      if (j.ok) {
        setProyectos((prev) => prev.filter((p) => p.slug !== slug));
      }
    } catch (err) {
      console.error("[panel] Error al eliminar:", err);
    }
  };

  // Filtrado reactivo de proyectos
  const proyectosFiltrados = useMemo(() => {
    return proyectos.filter((p) => {
      // Búsqueda de texto
      if (busqueda.trim()) {
        const query = busqueda.toLowerCase();
        const coincide =
          p.nombre.toLowerCase().includes(query) ||
          p.slug.toLowerCase().includes(query) ||
          (p.url && p.url.toLowerCase().includes(query)) ||
          (p.pathLocal && p.pathLocal.toLowerCase().includes(query)) ||
          (p.notas && p.notas.toLowerCase().includes(query));
        if (!coincide) return false;
      }

      // Filtro por semáforo
      if (filtroSemaforo === "atencion" && !p.necesitaMantenimiento) return false;
      if (filtroSemaforo === "verde" && p.semaforo !== "verde") return false;
      if (filtroSemaforo === "rojo" && p.semaforo !== "rojo") return false;

      // Filtro por categoría
      if (filtroCategoria !== "todas" && p.categoria !== filtroCategoria) return false;

      return true;
    });
  }, [proyectos, busqueda, filtroSemaforo, filtroCategoria]);

  // Contadores para métricas
  const totalProyectos = proyectos.length;
  const conteoVerde = proyectos.filter((p) => p.semaforo === "verde").length;
  const conteoAmarillo = proyectos.filter((p) => p.semaforo === "amarillo").length;
  const conteoRojo = proyectos.filter((p) => p.semaforo === "rojo").length;

  // Analítica original
  const totalActivos = datosAnalitica.reduce((a, p) => a + p.activos, 0);
  const hoyVisitas = datosAnalitica.reduce((a, p) => a + p.visitasHoy, 0);
  const semanaVisitas = datosAnalitica.reduce((a, p) => a + p.visitas7d, 0);

  return (
    <>
      <header className={s.cabeza}>
        <div>
          <h1 className={s.titulo}>Command Center Kalabs</h1>
          <p className={s.bajada}>Control central de proyectos, salud y mantenimiento del ecosistema.</p>
        </div>
        <p className={s.estado} data-vivo={vivo} aria-live="polite">
          <span className={s.luz} aria-hidden="true" />
          {vivo ? "En vivo" : "Sin conexión"} · actualizado {hace}
        </p>
      </header>

      {/* Pestañas de Navegación */}
      <nav className={s.pestanas} aria-label="Secciones del panel">
        <button
          type="button"
          className={s.pestanaBoton}
          data-activo={pestaña === "mantenimiento"}
          onClick={() => setPestaña("mantenimiento")}
        >
          🛠️ Centro de Mantenimiento ({totalProyectos})
        </button>
        <button
          type="button"
          className={s.pestanaBoton}
          data-activo={pestaña === "analitica"}
          onClick={() => setPestaña("analitica")}
        >
          📊 Analítica en Vivo ({totalActivos} activos)
        </button>
      </nav>

      {/* VISTA 1: CENTRO DE MANTENIMIENTO & CONTROL */}
      {pestaña === "mantenimiento" && (
        <section aria-label="Gestión de mantenimiento y proyectos">
          {/* Métricas Resumen */}
          <dl className={s.metricasMantenimiento} aria-label="Estado general de salud">
            <div className={s.tarjetaMetrica} data-tipo="total">
              <dt>Total Proyectos</dt>
              <dd>{totalProyectos}</dd>
            </div>
            <div className={s.tarjetaMetrica} data-tipo="verde">
              <dt>Al Día (Saludables)</dt>
              <dd>{conteoVerde}</dd>
            </div>
            <div className={s.tarjetaMetrica} data-tipo="amarillo">
              <dt>Atención Preventiva</dt>
              <dd>{conteoAmarillo}</dd>
            </div>
            <div className={s.tarjetaMetrica} data-tipo="rojo">
              <dt>Críticos / Caídos</dt>
              <dd>{conteoRojo}</dd>
            </div>
          </dl>

          {/* Barra de Filtros y Acciones */}
          <div className={s.barraAcciones}>
            <div className={s.grupoFiltros}>
              <input
                type="search"
                className={s.inputBusqueda}
                placeholder="Buscar proyecto, url, cliente..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
              <select
                className={s.selectFiltro}
                value={filtroSemaforo}
                onChange={(e) => setFiltroSemaforo(e.target.value as any)}
                aria-label="Filtrar por semáforo"
              >
                <option value="todos">Todos los estados</option>
                <option value="atencion">⚠️ Requieren Mantenimiento ({conteoAmarillo + conteoRojo})</option>
                <option value="rojo">🔴 Críticos ({conteoRojo})</option>
                <option value="verde">🟢 Al Día ({conteoVerde})</option>
              </select>
              <select
                className={s.selectFiltro}
                value={filtroCategoria}
                onChange={(e) => setFiltroCategoria(e.target.value as any)}
                aria-label="Filtrar por categoría"
              >
                <option value="todas">Todas las categorías</option>
                <option value="cliente">Clientes</option>
                <option value="propio">Propios / Labs</option>
                <option value="prospecto">Prospectos</option>
                <option value="interno">Internos</option>
              </select>
            </div>

            <div className={s.grupoBotones}>
              <button
                type="button"
                className={`${s.btnAccion} ${s.btnPrimario}`}
                disabled={verificandoSalud}
                onClick={() => verificarSalud()}
              >
                {verificandoSalud ? "⏳ Verificando..." : "⚡ Verificar Salud Ahora"}
              </button>
              <button
                type="button"
                className={s.btnAccion}
                onClick={() => abrirFormularioProyecto("nuevo")}
              >
                + Nuevo Proyecto
              </button>
            </div>
          </div>

          {/* Grilla de Proyectos */}
          {cargandoProyectos ? (
            <p className={s.cargando}>Cargando proyectos...</p>
          ) : proyectosFiltrados.length === 0 ? (
            <p className={s.nada} style={{ padding: "2rem", textAlign: "center" }}>
              No se encontraron proyectos con los filtros aplicados.
            </p>
          ) : (
            <div className={s.grillaProyectos}>
              {proyectosFiltrados.map((p) => {
                const check = p.ultimoCheck;
                const diasMaint = p.diasSinMantenimiento;
                const retrasado = diasMaint !== null && diasMaint > p.frecuenciaMantenimientoDias;

                return (
                  <article
                    key={p.slug}
                    className={s.tarjetaProyecto}
                    data-semaforo={p.semaforo}
                  >
                    <div>
                      {/* Cabecera de la Tarjeta */}
                      <div className={s.cabezaTarjeta}>
                        <h2 className={s.tituloProyecto}>
                          <span
                            className={s.puntoSemaforo}
                            data-color={p.semaforo}
                            title={`Estado: ${p.semaforo}`}
                          />
                          {p.nombre}
                        </h2>
                        <div className={s.badges}>
                          <span className={s.badge} data-tipo={p.categoria}>
                            {p.categoria}
                          </span>
                          <span className={s.badge}>{p.estado}</span>
                        </div>
                      </div>

                      {/* Cuerpo de la Tarjeta */}
                      <div className={s.cuerpoTarjeta}>
                        {p.url ? (
                          <div className={s.urlFila}>
                            <a href={p.url} target="_blank" rel="noreferrer">
                              {p.url.replace(/^https?:\/\//, "")} ↗
                            </a>
                          </div>
                        ) : (
                          <span className={s.sinUrl}>Sin URL web pública</span>
                        )}

                        {p.pathLocal && (
                          <div className={s.pathLocal} title={p.pathLocal}>
                            📁 {p.pathLocal}
                          </div>
                        )}

                        {/* Indicadores de Salud si tiene URL */}
                        {p.url && (
                          <div className={s.indicadorSalud}>
                            <span className={s.indicadorUptime}>
                              {check ? (
                                check.estaOnline ? (
                                  `🟢 ${check.statusCode || 200} OK (${check.latenciaMs || 0}ms)`
                                ) : (
                                  `🔴 ${check.errorMensaje || "Caído"}`
                                )
                              ) : (
                                "⚪ Sin chequear"
                              )}
                            </span>
                            {check?.sslDiasRestantes !== null && check?.sslDiasRestantes !== undefined && (
                              <span
                                className={s.indicadorSSL}
                                data-alerta={check.sslDiasRestantes <= 20}
                              >
                                🔒 SSL: {check.sslDiasRestantes}d
                              </span>
                            )}
                          </div>
                        )}

                        {/* Mantenimiento */}
                        <div className={s.mantenimientoFila} data-retrasado={retrasado}>
                          <span>Mantenimiento:</span>
                          <b>
                            {diasMaint === null
                              ? "Sin registrar"
                              : diasMaint === 0
                              ? "Hoy"
                              : `Hace ${diasMaint}d`}
                          </b>
                        </div>

                        {/* Motivos de alerta si no está en verde */}
                        {p.semaforo !== "verde" && (
                          <div className={s.motivosAlerta}>
                            {p.motivoSemaforo.map((m, i) => (
                              <p key={i}>⚠️ {m}</p>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Pie con Acciones */}
                    <div className={s.pieTarjeta}>
                      <div style={{ display: "flex", gap: "0.35rem" }}>
                        {p.url && (
                          <button
                            type="button"
                            className={s.btnMini}
                            title="Probar salud ahora"
                            onClick={() => verificarSalud(p.slug)}
                          >
                            ⚡ Probar
                          </button>
                        )}
                        <button
                          type="button"
                          className={s.btnMini}
                          data-primario="true"
                          title="Registrar intervención"
                          onClick={() => {
                            setModalMantenimiento(p);
                            setMaintTitulo("");
                            setMaintDesc("");
                          }}
                        >
                          🛠️ Mantenimiento
                        </button>
                        {p.historialMantenimiento && p.historialMantenimiento.length > 0 && (
                          <button
                            type="button"
                            className={s.btnMini}
                            title="Ver bitácora de intervenciones"
                            onClick={() => setModalBitacora(p)}
                          >
                            📝 ({p.historialMantenimiento.length})
                          </button>
                        )}
                      </div>
                      <div style={{ display: "flex", gap: "0.35rem" }}>
                        <button
                          type="button"
                          className={s.btnMini}
                          title="Editar proyecto"
                          onClick={() => abrirFormularioProyecto(p)}
                        >
                          ✏️
                        </button>
                        <button
                          type="button"
                          className={`${s.btnMini} ${s.btnMiniDanger}`}
                          title="Eliminar proyecto"
                          onClick={() => borrarProyecto(p.slug, p.nombre)}
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* MODAL: REGISTRAR MANTENIMIENTO */}
          {modalMantenimiento && (
            <div className={s.modalOverlay} onClick={() => setModalMantenimiento(null)}>
              <div className={s.modal} onClick={(e) => e.stopPropagation()}>
                <div className={s.modalCabeza}>
                  <h2>Registrar Mantenimiento: {modalMantenimiento.nombre}</h2>
                  <button
                    type="button"
                    className={s.btnCerrar}
                    onClick={() => setModalMantenimiento(null)}
                  >
                    ✕
                  </button>
                </div>
                <form onSubmit={guardarMantenimiento} className={s.formModal}>
                  <div className={s.campo}>
                    <label htmlFor="maintTipo">Tipo de intervención</label>
                    <select
                      id="maintTipo"
                      value={maintTipo}
                      onChange={(e) => setMaintTipo(e.target.value)}
                    >
                      <option value="preventivo">Revisión Preventiva General</option>
                      <option value="dependencias">Actualización de Dependencias (npm / packages)</option>
                      <option value="seguridad">Auditoría de Seguridad y Parche</option>
                      <option value="bugfix">Corrección de Error (Bugfix)</option>
                      <option value="infraestructura">Infraestructura / Dominio / Base de Datos</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>
                  <div className={s.campo}>
                    <label htmlFor="maintTitulo">Título del trabajo realizado *</label>
                    <input
                      id="maintTitulo"
                      type="text"
                      required
                      placeholder="Ej: Actualizadas dependencias a Next 16 y comprobado SSL"
                      value={maintTitulo}
                      onChange={(e) => setMaintTitulo(e.target.value)}
                    />
                  </div>
                  <div className={s.campo}>
                    <label htmlFor="maintDesc">Descripción / Notas adicionales</label>
                    <textarea
                      id="maintDesc"
                      rows={3}
                      placeholder="Detalles sobre lo que se modificó o verificó..."
                      value={maintDesc}
                      onChange={(e) => setMaintDesc(e.target.value)}
                    />
                  </div>
                  <div className={s.botonesModal}>
                    <button
                      type="button"
                      className={s.btnAccion}
                      onClick={() => setModalMantenimiento(null)}
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className={`${s.btnAccion} ${s.btnPrimario}`}
                      disabled={guardandoMaint}
                    >
                      {guardandoMaint ? "Guardando..." : "Guardar Intervención"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* MODAL: VER BITÁCORA HISTÓRICA */}
          {modalBitacora && (
            <div className={s.modalOverlay} onClick={() => setModalBitacora(null)}>
              <div className={s.modal} onClick={(e) => e.stopPropagation()}>
                <div className={s.modalCabeza}>
                  <h2>Bitácora de Mantenimiento: {modalBitacora.nombre}</h2>
                  <button
                    type="button"
                    className={s.btnCerrar}
                    onClick={() => setModalBitacora(null)}
                  >
                    ✕
                  </button>
                </div>
                {modalBitacora.historialMantenimiento &&
                modalBitacora.historialMantenimiento.length > 0 ? (
                  <ul className={s.listaBitacora}>
                    {modalBitacora.historialMantenimiento.map((item) => (
                      <li key={item.id} className={s.itemBitacora}>
                        <div className={s.itemBitacoraCabeza}>
                          <span className={s.badge}>{item.tipo}</span>
                          <span>{FECHA.format(new Date(item.realizadoAt))}</span>
                        </div>
                        <h3 className={s.itemBitacoraTitulo}>{item.titulo}</h3>
                        {item.descripcion && (
                          <p className={s.itemBitacoraDesc}>{item.descripcion}</p>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className={s.nada}>No hay intervenciones registradas todavía.</p>
                )}
                <div className={s.botonesModal}>
                  <button
                    type="button"
                    className={s.btnAccion}
                    onClick={() => setModalBitacora(null)}
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* MODAL: NUEVO O EDITAR PROYECTO */}
          {modalEditar && (
            <div className={s.modalOverlay} onClick={() => setModalEditar(null)}>
              <div className={s.modal} onClick={(e) => e.stopPropagation()}>
                <div className={s.modalCabeza}>
                  <h2>
                    {modalEditar === "nuevo"
                      ? "Agregar Proyecto al Panel"
                      : `Editar Proyecto: ${editNombre}`}
                  </h2>
                  <button
                    type="button"
                    className={s.btnCerrar}
                    onClick={() => setModalEditar(null)}
                  >
                    ✕
                  </button>
                </div>
                {errorForm && <p className={s.error}>{errorForm}</p>}
                <form onSubmit={guardarProyecto} className={s.formModal}>
                  <div className={s.campo}>
                    <label htmlFor="editSlug">Slug identificador *</label>
                    <input
                      id="editSlug"
                      type="text"
                      required
                      disabled={modalEditar !== "nuevo"}
                      placeholder="ej: viagrua"
                      value={editSlug}
                      onChange={(e) => setEditSlug(e.target.value)}
                    />
                  </div>
                  <div className={s.campo}>
                    <label htmlFor="editNombre">Nombre del Proyecto *</label>
                    <input
                      id="editNombre"
                      type="text"
                      required
                      placeholder="ej: ViaGrúa"
                      value={editNombre}
                      onChange={(e) => setEditNombre(e.target.value)}
                    />
                  </div>
                  <div className={s.campo}>
                    <label htmlFor="editUrl">URL en Producción (opcional)</label>
                    <input
                      id="editUrl"
                      type="url"
                      placeholder="https://..."
                      value={editUrl}
                      onChange={(e) => setEditUrl(e.target.value)}
                    />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                    <div className={s.campo}>
                      <label htmlFor="editCategoria">Categoría</label>
                      <select
                        id="editCategoria"
                        value={editCategoria}
                        onChange={(e) => setEditCategoria(e.target.value as any)}
                      >
                        <option value="cliente">Cliente</option>
                        <option value="propio">Propio / Lab</option>
                        <option value="prospecto">Prospecto</option>
                        <option value="interno">Interno</option>
                      </select>
                    </div>
                    <div className={s.campo}>
                      <label htmlFor="editEstado">Estado Ciclo de Vida</label>
                      <select
                        id="editEstado"
                        value={editEstado}
                        onChange={(e) => setEditEstado(e.target.value as any)}
                      >
                        <option value="produccion">En Producción</option>
                        <option value="desarrollo">En Desarrollo</option>
                        <option value="mantenimiento">En Mantenimiento</option>
                        <option value="pausado">Pausado</option>
                        <option value="archivado">Archivado</option>
                      </select>
                    </div>
                  </div>
                  <div className={s.campo}>
                    <label htmlFor="editLocal">Ruta Local (Disco)</label>
                    <input
                      id="editLocal"
                      type="text"
                      placeholder="C:\development\..."
                      value={editLocal}
                      onChange={(e) => setEditLocal(e.target.value)}
                    />
                  </div>
                  <div className={s.campo}>
                    <label htmlFor="editFrecuencia">
                      Frecuencia Máxima de Revisión Recomendada (días)
                    </label>
                    <input
                      id="editFrecuencia"
                      type="number"
                      min={7}
                      max={365}
                      value={editFrecuencia}
                      onChange={(e) => setEditFrecuencia(Number(e.target.value))}
                    />
                  </div>
                  <div className={s.campo}>
                    <label htmlFor="editNotas">Notas / Descripción</label>
                    <textarea
                      id="editNotas"
                      rows={2}
                      placeholder="Detalles sobre el cliente, hosting o arquitectura..."
                      value={editNotas}
                      onChange={(e) => setEditNotas(e.target.value)}
                    />
                  </div>
                  <div className={s.botonesModal}>
                    <button
                      type="button"
                      className={s.btnAccion}
                      onClick={() => setModalEditar(null)}
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className={`${s.btnAccion} ${s.btnPrimario}`}
                      disabled={guardandoProyecto}
                    >
                      {guardandoProyecto ? "Guardando..." : "Guardar Proyecto"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </section>
      )}

      {/* VISTA 2: ANALÍTICA EN VIVO (ORIGINAL) */}
      {pestaña === "analitica" && (
        <section aria-label="Analítica de tráfico en vivo">
          <dl className={s.resumen} aria-label="Totales de tráfico">
            <div>
              <dt>en línea ahora</dt>
              <dd>{totalActivos}</dd>
            </div>
            <div>
              <dt>visitas hoy</dt>
              <dd>{hoyVisitas}</dd>
            </div>
            <div>
              <dt>últimos 7 días</dt>
              <dd>{semanaVisitas}</dd>
            </div>
          </dl>

          <ul className={s.lista}>
            {datosAnalitica.length === 0 && <li className={s.cargando}>Cargando…</li>}
            {datosAnalitica.map((p) => (
              <li key={p.slug} className={s.fila} data-on={p.activos > 0}>
                <div className={s.sitio}>
                  <h2>
                    <span className={s.punto} aria-hidden="true" />
                    {p.nombre}
                  </h2>
                  <a href={p.url} target="_blank" rel="noreferrer">
                    {p.url.replace("https://", "")}
                  </a>
                </div>
                <dl className={s.numeros}>
                  <div className={s.principal}>
                    <dt>en línea</dt>
                    <dd>{p.activos}</dd>
                  </div>
                  <div>
                    <dt>hoy</dt>
                    <dd>{p.visitasHoy}</dd>
                  </div>
                  <div>
                    <dt>7 días</dt>
                    <dd>{p.visitas7d}</dd>
                  </div>
                </dl>
                <div className={s.paginas}>
                  {p.topPaths.length > 0 ? (
                    <ol aria-label={`Páginas más vistas hoy en ${p.nombre}`}>
                      {p.topPaths.map((t) => (
                        <li key={t.path}>
                          <span title={t.path}>{t.path}</span>
                          <b>{t.n}</b>
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <p className={s.nada}>Sin visitas hoy</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
