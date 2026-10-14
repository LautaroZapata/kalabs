"use client";

import { useEffect } from "react";

import { LATIDO_MS } from "@/lib/panel";

/* Tracker propio: un view al entrar + un ping cada 25s.
   Sin cookies de terceros, sin fingerprint: un id por pestaña en
   sessionStorage. Si /api/track no responde, no rompe la página. */
export default function Tracker({ project }: { project: string }) {
  useEffect(() => {
    // En dev no cuenta, y el panel (también abierto desde Tauri) tampoco.
    if (process.env.NODE_ENV !== "production") return;
    if (location.pathname.startsWith("/admin")) return;
    let id = sessionStorage.getItem("kalabs-sid");
    if (!id) {
      id = crypto.randomUUID();
      sessionStorage.setItem("kalabs-sid", id);
    }
    const mandar = (evento: "view" | "ping") => {
      const cuerpo = JSON.stringify({
        project,
        path: location.pathname,
        referrer: document.referrer.slice(0, 300),
        session: id,
        evento,
      });
      if (navigator.sendBeacon) {
        const blob = new Blob([cuerpo], { type: "application/json" });
        navigator.sendBeacon("/api/track", blob);
      } else {
        fetch("/api/track", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: cuerpo,
          keepalive: true,
        }).catch(() => {});
      }
    };
    mandar("view");
    const t = setInterval(() => mandar("ping"), LATIDO_MS);
    return () => clearInterval(t);
  }, [project]);
  return null;
}
