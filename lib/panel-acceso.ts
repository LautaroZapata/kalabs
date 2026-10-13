import { createHash, timingSafeEqual } from "node:crypto";

/* SHA-256 del token del panel. Si KALABS_ADMIN_TOKEN está, manda la env;
   si no, se compara contra este hash. Nunca queda abierto. */
const TOKEN_SHA256 =
  "b114646494649f67a0484fa41517052a3af1edf4372d0be5cc92c7583686252f";

const sha = (s: string) => createHash("sha256").update(s).digest();

export function tokenValido(dado: string | null | undefined): boolean {
  if (!dado) return false;
  const env = process.env.KALABS_ADMIN_TOKEN;
  const esperado = env ? sha(env) : Buffer.from(TOKEN_SHA256, "hex");
  return timingSafeEqual(sha(dado), esperado);
}

export function tokenDeRequest(req: Request): string | null {
  const q = new URL(req.url).searchParams.get("token");
  if (q) return q;
  const auth = req.headers.get("authorization") ?? "";
  return auth.startsWith("Bearer ") ? auth.slice(7) : null;
}
