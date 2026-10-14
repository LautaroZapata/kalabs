import { createHash, timingSafeEqual } from "node:crypto";

/* SHA-256 del token del panel. El mismo hash vive en kalabs_config
   (supabase/kalabs-panel.sql): kalabs_stats lo vuelve a chequear, así
   que si se cambia el token hay que cambiarlo en los dos lados. */
const TOKEN_SHA256 =
  "b114646494649f67a0484fa41517052a3af1edf4372d0be5cc92c7583686252f";

const sha = (s: string) => createHash("sha256").update(s).digest();

export function tokenValido(dado: string | null | undefined): boolean {
  if (!dado) return false;
  return timingSafeEqual(sha(dado), Buffer.from(TOKEN_SHA256, "hex"));
}

export function tokenDeRequest(req: Request): string | null {
  const q = new URL(req.url).searchParams.get("token");
  if (q) return q;
  const auth = req.headers.get("authorization") ?? "";
  return auth.startsWith("Bearer ") ? auth.slice(7) : null;
}
