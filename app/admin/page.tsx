import type { Metadata } from "next";

import { tokenValido } from "@/lib/panel-acceso";

import Panel from "./Panel";

export const metadata: Metadata = {
  title: "Panel",
  robots: { index: false, follow: false },
};

/* /admin es interno: no se enlaza del sitio ni sale en el sitemap.
   Siempre pide ?token= (ver lib/panel-acceso.ts). Tauri lo abre con
   el token fijo en la URL y el navegador lo guarda en sessionStorage. */
export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const dado = (await searchParams).token ?? "";
  const abierto = tokenValido(dado);
  return (
    <main className="caja admin">
      <h1>Panel Kalabs</h1>
      <p className="bajada">
        Usuarios en línea y visitas de kalabs.dev, cupo.uy, ViaGrúa, Oleo
        Cáceres y OleoFin.
      </p>
      {abierto ? (
        <Panel token={dado} />
      ) : (
        <form method="get" action="/admin" className="ficha">
          <label htmlFor="token">Clave del panel</label>
          <input id="token" name="token" type="password" autoComplete="off" />
          <button type="submit">Entrar</button>
        </form>
      )}
      <style>{`
        .admin { padding: 3rem 0 5rem; }
        .admin h1 { font-size: clamp(1.8rem, 4vw, 2.6rem); }
        .bajada { color: var(--ink-4); margin: .4rem 0 1.6rem; }
        .ficha {
          background: var(--bone); border-radius: var(--r);
          padding: 1.4rem; display: grid; gap: .7rem; max-width: 22rem;
        }
        input {
          border: 1px solid rgba(15,18,20,.18); border-radius: var(--r-chico);
          background: var(--papel); padding: .7rem .9rem;
        }
        button {
          background: var(--ember); color: var(--ink);
          border-radius: 999px; padding: .7rem 1.2rem; font-weight: 700;
        }
      `}</style>
    </main>
  );
}
