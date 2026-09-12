import { CORREO } from "./content";
import type { Valores } from "./consulta";

/**
 * La plantilla del único correo que dispara el formulario: el aviso que le
 * llega al estudio con la consulta.
 *
 * Hubo un segundo, un acuse automático para quien escribía, que iba con el
 * diseño del sitio —tarjeta de 600px, orla naranja, cintillo en versalitas—.
 * Se fue con Brevo. Mandarle un correo autenticado a un desconocido pide un
 * DKIM del dominio propio, y el dominio dejó de mandar: ahora sale por Gmail,
 * que firma como `gmail.com`. La confirmación la da la pantalla y la respuesta
 * la escribe una persona.
 *
 * Lo que queda va sin diseño, y ahí está la decisión. Aquel envoltorio —tarjeta,
 * banda de color, botón al final— es exactamente la silueta que Gmail aprendió
 * a leer como boletín, y el aviso terminaba en Promociones. Una consulta que
 * aparece en la pestaña equivocada se contesta dos días tarde, que para quien
 * escribió es lo mismo que no contestarla.
 *
 * Acá no hay nada que promocionar: es una alerta para adentro. Va como la
 * escribiría una persona —tipografía del sistema, alineado a la izquierda, sin
 * fondo— y sin un solo `a href`: un enlace a un dominio ajeno al remitente es
 * de las señales de promoción que más pesan, y el sitio propio no hace falta
 * enlazarlo en un correo que sólo leemos nosotros.
 *
 * Lleva versión de texto plano además de la HTML. No es un trámite: es lo que
 * ve quien lee en modo texto y lo que miran los filtros al decidir si esto es
 * legítimo.
 */

/* La tipografía del aviso es la que el lector ya tiene puesta en su cliente.
   Pedir una es una decisión de diseño, y el aviso no quiere parecer una pieza
   diseñada. */
const SISTEMA =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

/**
 * Escapa lo que escribió un desconocido antes de meterlo en el HTML.
 *
 * No es paranoia de manual: el cuerpo de este correo lo redacta cualquiera que
 * pase por el formulario. Sin esto, un `<style>` o un `<a>` en el campo mensaje
 * se interpreta al abrir el correo en la bandeja del estudio.
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
    .map((p) => `<p style="margin:0 0 12px;">${p.replace(/\n/g, "<br />")}</p>`)
    .join("");

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
      ${parrafos(datos.mensaje)}
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
