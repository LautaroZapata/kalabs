import type { Metadata } from "next";

import { tokenValido } from "@/lib/panel-acceso";

import Panel from "./Panel";
import s from "./Panel.module.css";

export const metadata: Metadata = {
  title: "Panel",
  robots: { index: false, follow: false },
};

/* /admin es interno: no se enlaza del sitio ni sale en el sitemap.
   Siempre pide ?token= (ver lib/panel-acceso.ts). No se recuerda: la app
   de Tauri también abre /admin a secas y pide la clave. */
export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const dado = (await searchParams).token ?? "";
  const abierto = tokenValido(dado);
  return (
    <main id="contenido" className={`caja ${s.admin}`}>
      {abierto ? (
        <Panel token={dado} />
      ) : (
        <>
          <header className={s.cabeza}>
            <h1 className={s.titulo}>Panel Kalabs</h1>
          </header>
          <form method="get" action="/admin" className={s.acceso}>
            <label htmlFor="token">Clave del panel</label>
            <input
              id="token"
              name="token"
              type="password"
              autoComplete="current-password"
              required
            />
            {dado && <p className={s.error}>La clave no es correcta.</p>}
            <button type="submit">Entrar</button>
          </form>
        </>
      )}
    </main>
  );
}
