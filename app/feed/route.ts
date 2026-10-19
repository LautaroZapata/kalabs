import { FEED } from "@/lib/feed";

/**
 * El índice de piezas, en JSON.
 *
 * Existe para que `scripts/feed.mjs` sepa qué bajar sin tener que leer el
 * TypeScript del catálogo desde Node.
 */
export const dynamic = "force-dynamic";

export function GET() {
  if (process.env.NODE_ENV === "production") {
    return new Response("No disponible.", { status: 404 });
  }

  return Response.json(FEED.map(({ slug, titulo, plantilla }) => ({ slug, titulo, plantilla })));
}
