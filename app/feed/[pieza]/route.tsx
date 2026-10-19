import { ImageResponse } from "next/og";
import { pieza } from "@/components/feed/Piezas";
import { FEED, LIENZO } from "@/lib/feed";
import { fuentes } from "@/lib/fuentes-og";

/**
 * Una pieza del feed, en PNG.
 *
 * No es una página del sitio: es el taller. Las piezas se bajan con
 * `pnpm feed` contra el servidor de desarrollo y se suben a Instagram a mano.
 * En producción la ruta no existe —ver el corte de abajo—, así que no se
 * prerenderiza nada ni se pelea con Google Fonts en el build.
 */
export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ pieza: string }> },
) {
  if (process.env.NODE_ENV === "production") {
    return new Response("No disponible.", { status: 404 });
  }

  const { pieza: slug } = await params;
  const ficha = FEED.find((p) => p.slug === slug);
  if (!ficha) {
    return new Response(`No hay ninguna pieza que se llame «${slug}».`, { status: 404 });
  }

  return new ImageResponse(pieza(ficha), { ...LIENZO, fonts: await fuentes() });
}
