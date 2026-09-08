import { CORREO, SITE } from "./content";
import type { Valores } from "./consulta";

/**
 * Las dos plantillas de correo del formulario: el aviso que recibe el estudio
 * y el acuse que recibe quien escribió.
 *
 * Van en tablas y con todo el estilo en línea, que en 2026 sigue siendo la
 * única forma de que un correo se vea igual en Gmail, Apple Mail y Outlook.
 * Nada de flex, de grid ni de hojas de estilo: Outlook de escritorio compone
 * con el motor de Word y descarta casi todo lo demás.
 *
 * La tipografía es Georgia y no la del sitio: un correo no puede cargar fuentes
 * con garantías, así que se usa la serif que ya está instalada en todos lados.
 * Es la que más se parece a la voz del sitio sin depender de una descarga.
 *
 * Los dos llevan versión de texto plano además de la HTML. No es un trámite:
 * es lo que ve quien lee el correo en modo texto y lo que miran los filtros de
 * spam cuando deciden si esto es legítimo.
 */

/* --- paleta ---
   Los tokens de globals.css no llegan a un correo. Se repiten a mano. */
const INK = "#0f1214";
const INK_2 = "#161a1c";
const BONE = "#efe7d6";
const BONE_DIM = "#b9b2a4";
const EMBER = "#ff6b1a";
const TERRA = "#9c3f26";
const TERRA_DIM = "#6b2b1a";
const TERRA_LIT = "#cc7256";

const SERIF = "Georgia, 'Times New Roman', Times, serif";

/**
 * Escapa lo que escribió un desconocido antes de meterlo en el HTML.
 *
 * No es paranoia de manual: el cuerpo de estos correos lo redacta cualquiera
 * que pase por el formulario. Sin esto, un `<style>` o un `<a>` en el campo
 * mensaje se interpreta al abrir el correo en la bandeja del estudio.
 */
function escapar(texto: string) {
  return texto
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Los saltos de línea del mensaje, que en HTML no existen solos. */
const parrafos = (texto: string) =>
  escapar(texto)
    .split(/\n{2,}/)
    .map(
      (p) =>
        `<p style="margin:0 0 14px;color:${BONE};font:400 16px/1.65 ${SERIF};">${p.replace(
          /\n/g,
          "<br />",
        )}</p>`,
    )
    .join("");

/* --- piezas compartidas --- */

/** Versalitas de imprenta: el sitio usa este mismo tratamiento para los datos. */
const versalita = (texto: string, color = BONE_DIM) =>
  `<span style="font:400 12px/1.4 ${SERIF};letter-spacing:.16em;text-transform:uppercase;color:${color};">${texto}</span>`;

/** El filete doble que cierra cada bloque, con los grosores del sitio. */
const fileteDoble = `
  <div style="height:2px;background:${TERRA};font-size:0;line-height:0;">&nbsp;</div>
  <div style="height:3px;font-size:0;line-height:0;">&nbsp;</div>
  <div style="height:1px;background:${TERRA_DIM};font-size:0;line-height:0;">&nbsp;</div>`;

/**
 * El marco de los dos correos: orla naranja, cintillo, titular en caja baja y
 * filete doble. Es la portada del sitio reducida a lo que un correo aguanta.
 */
function envoltorio({
  preheader,
  kicker,
  titulo,
  cuerpo,
  pie,
}: {
  /** La línea que Gmail muestra al lado del asunto en la lista. */
  preheader: string;
  kicker: string;
  titulo: string;
  cuerpo: string;
  pie: string;
}) {
  return `<!doctype html>
<html lang="es"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width" /><meta name="color-scheme" content="dark light" /><title>${escapar(titulo)}</title></head>
<body style="margin:0;padding:0;background:${INK};">
  <!-- El preheader se muestra en la lista de correos y no en el cuerpo. -->
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapar(preheader)}</div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${INK};">
    <tr><td align="center" style="padding:28px 16px;">

      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:100%;background:${INK_2};">

        <!-- Orla superior: el único naranja pleno, igual que en la portada. -->
        <tr><td style="height:6px;background:${EMBER};font-size:0;line-height:0;">&nbsp;</td></tr>

        <tr><td style="padding:26px 32px 0;">
          <!-- Cintillo -->
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td align="left">${versalita(SITE.nombre.toUpperCase(), EMBER)}</td>
              <td align="right">${versalita(`${SITE.ciudad}, ${SITE.pais}`)}</td>
            </tr>
          </table>

          <div style="height:22px;font-size:0;line-height:0;">&nbsp;</div>
          <div style="margin:0 0 6px;">${versalita(kicker)}</div>

          <h1 style="margin:0 0 18px;font:400 30px/1.15 ${SERIF};color:${BONE};letter-spacing:-.01em;">${escapar(titulo)}</h1>
          ${fileteDoble}
          <div style="height:22px;font-size:0;line-height:0;">&nbsp;</div>

          ${cuerpo}
        </td></tr>

        <tr><td style="padding:26px 32px 30px;">
          <div style="height:1px;background:${TERRA_DIM};font-size:0;line-height:0;">&nbsp;</div>
          <div style="height:16px;font-size:0;line-height:0;">&nbsp;</div>
          <p style="margin:0 0 10px;font:italic 400 14px/1.6 ${SERIF};color:${BONE_DIM};">${escapar(pie)}</p>
          <p style="margin:0;">
            <a href="${SITE.url}" style="color:${EMBER};text-decoration:none;font:400 13px/1.4 ${SERIF};letter-spacing:.1em;text-transform:uppercase;">${CORREO.verSitio} &rarr;</a>
          </p>
        </td></tr>

      </table>

    </td></tr>
  </table>
</body></html>`;
}

/** Una fila de la ficha de datos: etiqueta en versalitas y el valor al lado. */
const fila = (etiqueta: string, valor: string) => `
  <tr>
    <td style="padding:0 14px 10px 0;vertical-align:top;white-space:nowrap;">${versalita(etiqueta, TERRA_LIT)}</td>
    <td style="padding:0 0 10px;vertical-align:top;font:400 16px/1.5 ${SERIF};color:${BONE};">${escapar(valor)}</td>
  </tr>`;

/* --- el aviso que le llega al estudio --- */

export function avisoHtml(datos: Valores) {
  const cuerpo = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      ${fila("Nombre", datos.nombre)}
      ${fila("Correo", datos.correo)}
      ${fila("Empresa", datos.negocio || "—")}
      ${fila("Servicio", datos.necesito)}
    </table>

    <div style="height:16px;font-size:0;line-height:0;">&nbsp;</div>
    <div style="margin:0 0 10px;">${versalita(CORREO.aviso.mensajeLabel, TERRA_LIT)}</div>

    <!-- El mensaje va contra un filete al margen, como una cita de diario. -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td style="width:3px;background:${TERRA};font-size:0;line-height:0;">&nbsp;</td>
        <td style="padding:0 0 0 16px;">${parrafos(datos.mensaje)}</td>
      </tr>
    </table>`;

  return envoltorio({
    preheader: `${datos.nombre} — ${datos.necesito}`,
    kicker: CORREO.aviso.kicker,
    titulo: CORREO.aviso.titulo,
    cuerpo,
    pie: CORREO.aviso.pie,
  });
}

export function avisoTexto(datos: Valores) {
  return [
    `Nombre:   ${datos.nombre}`,
    `Correo:   ${datos.correo}`,
    `Empresa:  ${datos.negocio || "—"}`,
    `Servicio: ${datos.necesito}`,
    "",
    datos.mensaje,
    "",
    "—",
    CORREO.aviso.pie,
  ].join("\n");
}

/* --- el acuse para quien escribió --- */

export function acuseHtml(datos: Valores) {
  const cuerpo = `
    <p style="margin:0 0 14px;font:400 17px/1.6 ${SERIF};color:${BONE};">${escapar(
      CORREO.acuse.saludo(datos.nombre),
    )}</p>
    ${CORREO.acuse.cuerpo
      .map(
        (p) =>
          `<p style="margin:0 0 14px;font:400 16px/1.65 ${SERIF};color:${BONE_DIM};">${escapar(p)}</p>`,
      )
      .join("")}

    <div style="height:20px;font-size:0;line-height:0;">&nbsp;</div>
    <div style="margin:0 0 10px;">${versalita(CORREO.acuse.copiaLabel, TERRA_LIT)}</div>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td style="width:3px;background:${TERRA};font-size:0;line-height:0;">&nbsp;</td>
        <td style="padding:0 0 0 16px;">
          <div style="margin:0 0 12px;">${versalita(datos.necesito, TERRA_LIT)}</div>
          ${parrafos(datos.mensaje)}
        </td>
      </tr>
    </table>`;

  return envoltorio({
    preheader: CORREO.acuse.cuerpo[0],
    kicker: CORREO.acuse.kicker,
    titulo: CORREO.acuse.titulo,
    cuerpo,
    pie: CORREO.acuse.pie,
  });
}

export function acuseTexto(datos: Valores) {
  return [
    CORREO.acuse.saludo(datos.nombre),
    "",
    ...CORREO.acuse.cuerpo,
    "",
    `${CORREO.acuse.copiaLabel}:`,
    `— ${datos.necesito}`,
    "",
    datos.mensaje,
    "",
    "—",
    `${SITE.nombre} · ${SITE.ciudad}, ${SITE.pais}`,
    SITE.url,
  ].join("\n");
}
