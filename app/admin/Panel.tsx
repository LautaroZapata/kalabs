"use client";

import { useCallback, useEffect, useState } from "react";

import s from "./Panel.module.css";

type Proyecto = {
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

/* Panel interno: una ficha por proyecto, un número grande y nada más.
   Consulta /api/panel cada 5s; sin Realtime para no abrir las tablas a
   la anon key (ver supabase/kalabs-panel.sql). */
export default function Panel({ token }: { token: string }) {
  const [datos, setDatos] = useState<Proyecto[]>([]);
  const [hace, setHace] = useState("-");
  const [vivo, setVivo] = useState(false);

  const cargar = useCallback(async () => {
    const q = token ? `?token=${encodeURIComponent(token)}` : "";
    try {
      const r = await fetch(`/api/panel${q}`, { cache: "no-store" });
      if (!r.ok) throw new Error(String(r.status));
      const j = await r.json();
      setDatos(j.proyectos);
      setHace(HORA.format(new Date()));
      setVivo(true);
    } catch {
      setVivo(false);
    }
  }, [token]);

  useEffect(() => {
    cargar();
    const t = setInterval(cargar, 5_000);
    return () => clearInterval(t);
  }, [cargar]);

  const total = datos.reduce((a, p) => a + p.activos, 0);
  const hoy = datos.reduce((a, p) => a + p.visitasHoy, 0);
  const semana = datos.reduce((a, p) => a + p.visitas7d, 0);

  return (
    <>
      <header className={s.cabeza}>
        <div>
          <h1 className={s.titulo}>Panel Kalabs</h1>
          <p className={s.bajada}>Usuarios en línea y visitas de los cinco sitios.</p>
        </div>
        <p className={s.estado} data-vivo={vivo} aria-live="polite">
          <span className={s.luz} aria-hidden="true" />
          {vivo ? "En vivo" : "Sin conexión"} · actualizado {hace}
        </p>
      </header>

      <dl className={s.resumen} aria-label="Totales">
        <div>
          <dt>en línea ahora</dt>
          <dd>{total}</dd>
        </div>
        <div>
          <dt>visitas hoy</dt>
          <dd>{hoy}</dd>
        </div>
        <div>
          <dt>últimos 7 días</dt>
          <dd>{semana}</dd>
        </div>
      </dl>

      <ul className={s.lista}>
        {datos.length === 0 && <li className={s.cargando}>Cargando…</li>}
        {datos.map((p) => (
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
    </>
  );
}
