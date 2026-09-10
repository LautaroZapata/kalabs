import { CORREO, SITE } from "./content";
import type { Valores } from "./consulta";

/**
 * Las dos plantillas de correo del formulario: el aviso que recibe el estudio
 * y el acuse que recibe quien escribió.
 *
 * No comparten forma, y es a propósito. El acuse es la cara del estudio ante
 * un desconocido y va con el diseño del sitio. El aviso es una alerta interna
 * y va desnudo, por las razones que están anotadas más abajo.
 *
 * El acuse va en tablas y con todo el estilo en línea, que en 2026 sigue siendo
 * la única forma de que un correo se vea igual en Gmail, Apple Mail y Outlook.
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

/* La del aviso interno: la que el lector ya tiene puesta en su cliente. Pedir
   una tipografía es una decisión de diseño, y el aviso no quiere parecer una
   pieza diseñada. */
const SISTEMA =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

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

/** Los mismos saltos para el aviso, que hereda color y tipografía del cuerpo. */
const parrafosPlano = (texto: string) =>
  escapar(texto)
    .split(/\n{2,}/)
    .map((p) => `<p style="margin:0 0 12px;">${p.replace(/\n/g, "<br />")}</p>`)
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
          <!-- Cintillo. La palabra "KALABS" en versalitas y no el isotipo: acá
               hubo un <img> al PNG de la K y lo que veía casi todo el mundo era
               el ícono de imagen rota de Gmail. Gmail bloquea las imágenes de
               un remitente que no está en los contactos, que en un acuse es el
               caso normal y no la excepción, y sobre el bloqueo dibuja su
               propio recuadro: el texto alternativo no lo salva.

               Tampoco hay forma de incrustarla. Un cid: la mandaría en el
               cuerpo del mensaje, pero Brevo —lo que usa lib/enviar.ts— sólo
               adjunta archivos, y un adjunto suma el clip al lado del asunto.

               Así que el cintillo se apoya en lo único que ningún cliente
               puede bloquear, que es el texto. La K sigue viva en el sitio
               (components/Marca.tsx) y en el avatar del remitente. -->
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
          <!-- El pie nombra el dominio pero no lo enlaza. Brevo reescribe todo
               enlace con su dominio de tracking, y un enlace que no coincide
               con el remitente empuja el correo a Promociones. Escrito como
               texto, el cliente de correo lo autoenlaza si quiere y Brevo no
               llega a tocarlo. -->
          <p style="margin:0;font:400 13px/1.4 ${SERIF};letter-spacing:.08em;text-transform:uppercase;color:${TERRA_LIT};">
            ${SITE.nombre} &middot; ${SITE.url.replace(/^https?:\/\//, "")}
          </p>
        </td></tr>

      </table>

    </td></tr>
  </table>
</body></html>`;
}

/* --- el aviso que le llega al estudio ---

   Este no lleva diseño, y ahí está la decisión.

   Iba en el mismo envoltorio que el acuse: tarjeta de 600px centrada, orla
   naranja, cintillo en versalitas y un enlace al sitio al pie. Esa silueta
   —tarjeta, banda de color, botón al final— es exactamente la que Gmail
   aprendió a leer como boletín, y el aviso terminaba en Promociones. Una
   consulta que aparece en la pestaña equivocada se contesta dos días tarde,
   que para quien escribió es lo mismo que no contestarla.

   Acá no hay nada que promocionar: es una alerta para adentro. Va como la
   escribiría una persona —tipografía del sistema, alineado a la izquierda, sin
   fondo— y sobre todo sin un solo `a href`. Brevo reescribe cada enlace para
   contar clics, y un enlace que apunta a un dominio ajeno al remitente es de
   las señales de promoción que más pesan. El sitio propio no hace falta
   enlazarlo en un correo que sólo leemos nosotros.

   El diseño se lo queda el acuse, que sí es la cara del estudio. */

export function avisoHtml(datos: Valores) {
  const linea = (etiqueta: string, valor: string) =>
    `<div style="margin:0 0 4px;"><strong>${etiqueta}:</strong> ${escapar(valor)}</div>`;

  return `<!doctype html>
<html lang="es"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width" /></head>
<body style="margin:0;padding:0;">
  <div style="font:400 15px/1.6 ${SISTEMA};color:#1a1a1a;max-width:640px;">
    ${linea("Nombre", datos.nombre)}
    ${linea("Correo", datos.correo)}
    ${linea("Empresa", datos.negocio || "—")}
    ${linea("Servicio", datos.necesito)}

    <!-- El mensaje contra un filete al margen: es la única marca de imprenta
         que sobrevive, y sirve para separar lo que escribió otro. -->
    <div style="margin:18px 0 0;padding:0 0 0 14px;border-left:3px solid #d4d4d4;">
      ${parrafosPlano(datos.mensaje)}
    </div>

    <p style="margin:18px 0 0;font-size:14px;color:#6a6a6a;">${escapar(CORREO.aviso.pie)}</p>
  </div>
</body></html>`;
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
