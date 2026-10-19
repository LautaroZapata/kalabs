/**
 * Las fuentes de las imágenes que compone Satori.
 *
 * Google Fonts contesta WOFF2 a los navegadores modernos y TTF a los que no lo
 * declaran. Satori sólo lee TTF, OTF y WOFF, así que se pide la hoja con un
 * User-Agent viejo para que conteste con el TTF. Es el mismo truco que hace
 * `app/opengraph-image.tsx` para su titular; acá queda en un módulo porque las
 * piezas del feed necesitan tres cortes y no uno.
 *
 * Los nombres de familia son `Display` y `Cuerpo` y no `Bricolage` y `Hanken`
 * a propósito: las piezas piden un rol, no una fuente. Si algún día se cambia
 * la tipografía del estudio, se cambia acá y no en cada pieza.
 */

type Peso = 600 | 700 | 800;

export type Corte = {
  name: "Display" | "Cuerpo" | "Mono";
  data: ArrayBuffer;
  weight: Peso;
  style: "normal";
};

async function ttf(consulta: string): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(`https://fonts.googleapis.com/css2?family=${consulta}`, {
      headers: { "User-Agent": "Mozilla/4.0" },
    }).then((r) => r.text());
    const url = css.match(/src:\s*url\((https:[^)]+)\)/)?.[1];
    if (!url) return null;
    return await fetch(url).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
}

export async function fuentes(): Promise<Corte[]> {
  const [display, cuerpo, cuerpoFuerte, mono] = await Promise.all([
    /* `opsz,wght@96,800`: el mismo eje óptico que usa `.titular` en
       globals.css. A este cuerpo Bricolage cierra el espaciado y afina las
       curvas; sin el eje, el titular sale blando. */
    ttf("Bricolage+Grotesque:opsz,wght@96,800"),
    ttf("Hanken+Grotesk:wght@600"),
    ttf("Hanken+Grotesk:wght@700"),
    /* El sitio no tiene monoespaciada y la regla dice que no la use. La pieza
       de consola la usa igual: ahí la monoespaciada no es tipografía de marca,
       es el dibujo de una terminal. Sólo la carga esa pieza. */
    ttf("JetBrains+Mono:wght@700"),
  ]);

  /* La imagen social se deja salir con la sans por defecto si Google no
     contesta: vale más una tarjeta fea que un build caído. Acá es al revés.
     Una pieza de feed en la fuente equivocada no sirve para nada y encima se
     publica, así que se corta el paso y se avisa. */
  if (!display || !cuerpo || !cuerpoFuerte || !mono) {
    throw new Error(
      "No se pudieron bajar las fuentes de Google. Sin Bricolage Grotesque, Hanken Grotesk y JetBrains Mono la pieza no sale. Revisá la conexión y volvé a intentar.",
    );
  }

  return [
    { name: "Display", data: display, weight: 800, style: "normal" },
    { name: "Cuerpo", data: cuerpo, weight: 600, style: "normal" },
    { name: "Cuerpo", data: cuerpoFuerte, weight: 700, style: "normal" },
    { name: "Mono", data: mono, weight: 700, style: "normal" },
  ];
}
