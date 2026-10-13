"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

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

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/* Panel interno: 4 fichas, un número grande por ficha y nada más.
   Polling cada 10s + Realtime como gatillo: si el socket se cae,
   el polling sostiene los números. */
export default function Panel({ token }: { token: string }) {
  const [datos, setDatos] = useState<Proyecto[]>([]);
  const [hace, setHace] = useState("-");
  const [vivo, setVivo] = useState(false);

  const cargar = useCallback(async () => {
    const q = token ? `?token=${encodeURIComponent(token)}` : "";
    const r = await fetch(`/api/panel${q}`, { cache: "no-store" });
    if (!r.ok) return;
    const j = await r.json();
    setDatos(j.proyectos);
    setHace(new Date().toLocaleTimeString("es-UY"));
  }, [token]);

  useEffect(() => {
    cargar();
    const t = setInterval(cargar, 10_000);
    const sb = createClient(URL, ANON);
    const ch = sb
      .channel("kalabs-panel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "kalabs_presence" },
        () => cargar(),
      )
      .subscribe((s) => setVivo(s === "SUBSCRIBED"));
    return () => {
      clearInterval(t);
      sb.removeChannel(ch);
    };
  }, [cargar]);

  const total = datos.reduce((a, p) => a + p.activos, 0);

  return (
    <div>
      <p className="et">
        {vivo ? "En vivo" : "Conectando…"} · {total} activos ahora · act. {hace}
      </p>
      <div className="grilla">
        {datos.map((p) => (
          <article key={p.slug} className="ficha">
            <h2>
              <span className="punto" data-on={p.activos > 0} />
              {p.nombre}
            </h2>
            <p className="numero">
              {p.activos}
              <span> en línea</span>
            </p>
            <p className="meta">
              Hoy {p.visitasHoy} visitas · 7d {p.visitas7d}
            </p>
            <a href={p.url} target="_blank" rel="noreferrer">
              {p.url.replace("https://", "")}
            </a>
            {p.topPaths.length > 0 && (
              <ul>
                {p.topPaths.map((t) => (
                  <li key={t.path}>
                    <span>{t.path}</span>
                    <b>{t.n}</b>
                  </li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </div>
      <style jsx>{`
        .et {
          font-size: 0.7rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--terra);
          margin-bottom: 1rem;
        }
        .grilla {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1rem;
        }
        .ficha {
          background: var(--bone);
          border-radius: var(--r);
          padding: 1.2rem 1.3rem;
        }
        h2 {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.05rem;
        }
        .punto {
          width: 0.6rem;
          height: 0.6rem;
          border-radius: 50%;
          background: #bbb;
        }
        .punto[data-on="true"] {
          background: var(--ember);
        }
        .numero {
          font-size: 3rem;
          font-weight: 800;
          line-height: 1;
          margin: 0.6rem 0 0.2rem;
        }
        .numero span {
          font-size: 1rem;
          font-weight: 400;
        }
        .meta {
          color: var(--ink-4);
          margin-bottom: 0.4rem;
        }
        a {
          font-size: 0.85rem;
          text-decoration: underline;
        }
        ul {
          margin-top: 0.8rem;
          border-top: var(--linea);
          padding-top: 0.6rem;
        }
        li {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
          padding: 0.15rem 0;
        }
      `}</style>
    </div>
  );
}
