"use server";

import nodemailer, { type Transporter } from "nodemailer";

import { SITE, UI } from "./content";
import { OPCIONES, type Estado, type Valores } from "./consulta";
import { avisoHtml, avisoTexto } from "./correos";

/**
 * El formulario manda un correo, y lo manda Gmail.
 *
 * Tuvo tres vidas. Primero armaba un `mailto:`, que no era un envío: abría el
 * cliente de correo del visitante y le dejaba a él la última tecla. En el
 * celular muchas veces no abría nada, y de lo que abría, buena parte no le daba
 * a enviar. Después lo mandó el servidor por la API de Brevo, en dos correos
 * —el aviso al estudio y un acuse automático—, y eso trajo una cuenta de
 * terceros, un DKIM más en el DNS y dos plantillas que había que pelear contra
 * el clasificador de Gmail.
 *
 * Ahora sale por `smtp.gmail.com` con la cuenta del estudio, que es la misma
 * bandeja donde caen `hola@`, `lautaro@` y `matias@` vía Cloudflare Email
 * Routing. No hay servicio en el medio ni cuota que vigilar: es Gmail
 * mandándose un correo a sí mismo.
 *
 * El acuse al visitante no volvió. Ese sí necesitaba un DKIM de `kalabs.dev`
 * para llegar a la casilla de un desconocido, y el dominio ya no firma nada:
 * Gmail gratis firma como `gmail.com`. La confirmación la da la pantalla y la
 * respuesta la escribe una persona.
 *
 * Este archivo exporta una sola cosa y es async, que es lo único que admite un
 * módulo `"use server"`. Los tipos y las constantes viven en `consulta.ts`.
 */

/* Validación deliberadamente laxa: la única forma de saber si una dirección
   existe es escribirle. Esto descarta lo que no puede ser un correo y nada
   más; rechazar de más es peor que dejar pasar una consulta con un typo. */
const ES_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const texto = (dato: FormDataEntryValue | null) =>
  typeof dato === "string" ? dato.trim() : "";

/**
 * El transporte vive en el módulo y no adentro de la función a propósito.
 *
 * Fluid Compute reutiliza la instancia entre invocaciones, así que dos consultas
 * seguidas comparten la conexión TLS en vez de rehacer el saludo con Gmail
 * cada vez. `pool` la mantiene abierta; el máximo en uno porque acá nunca hay
 * dos correos a la vez y Gmail corta las cuentas que abren conexiones de más.
 *
 * Los tres tiempos de espera no son decorativos. Sin ellos, un SMTP que acepta
 * el socket y después se queda mudo deja la Server Action colgada hasta el
 * tope de la función —300 segundos— con la persona mirando el botón en
 * «Enviando…». Diez segundos y se corta.
 */
let transporte: Transporter | null = null;

function obtenerTransporte(usuario: string, clave: string) {
  transporte ??= nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user: usuario, pass: clave },
    pool: true,
    maxConnections: 1,
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 10_000,
  });
  return transporte;
}

export async function enviarConsulta(_previo: Estado, form: FormData): Promise<Estado> {
  const valores: Valores = {
    nombre: texto(form.get("nombre")),
    negocio: texto(form.get("negocio")),
    correo: texto(form.get("correo")),
    necesito: texto(form.get("necesito")),
    mensaje: texto(form.get("mensaje")),
  };

  /* Trampa para robots: un campo que ningún humano ve ni puede tabular. Si
     viene lleno, es un bot rellenando todo lo que encuentra. Se responde que
     salió bien —discutir con un robot no sirve de nada— y no se manda nada. */
  if (texto(form.get("apellido"))) return { estado: "ok" };

  const error = (mensaje: string): Estado => ({ estado: "error", mensaje, valores });

  if (valores.nombre.length < 2) return error(UI.form.errorNombre);
  if (!ES_CORREO.test(valores.correo)) return error(UI.form.errorCorreo);
  if (valores.mensaje.length < 10) return error(UI.form.errorMensaje);
  if (valores.mensaje.length > 5000) return error(UI.form.errorLargo);
  /* El servicio llega de un radio, así que sólo puede venir mal si alguien
     falsea el envío. Se normaliza en vez de rechazar. */
  const necesito = OPCIONES.includes(valores.necesito) ? valores.necesito : OPCIONES[0];

  const usuario = process.env.GMAIL_USUARIO;
  const clave = process.env.GMAIL_CLAVE_APP;
  if (!usuario || !clave) {
    console.error("[contacto] faltan GMAIL_USUARIO o GMAIL_CLAVE_APP: la consulta no se envió");
    return error(UI.form.errorServidor);
  }

  const datos: Valores = { ...valores, necesito };

  /* El asunto tiene que servir en una lista de veinte: quién y de qué, sin
     abrir. El corchete con el nombre del estudio es lo que deja filtrarlos. */
  const asunto = `[${SITE.nombre}] ${necesito} — ${valores.negocio || valores.nombre}`;

  try {
    await obtenerTransporte(usuario, clave).sendMail({
      /* El `from` es la dirección publicada y no la casilla de Gmail. Gmail lo
         respeta porque `hola@kalabs.dev` está verificada como «Enviar como» en
         esa cuenta; si dejara de estarlo, reescribiría el remitente por el de
         la cuenta sin avisar. Ahí está el único hilo del que cuelga esto. */
      from: { name: SITE.nombre, address: SITE.email },
      to: usuario,
      /* Lo que hace que el aviso sirva: apretar «responder» en la bandeja le
         escribe a quien completó el formulario, no a nosotros mismos. */
      replyTo: { name: valores.nombre, address: valores.correo },
      subject: asunto,
      html: avisoHtml(datos),
      /* La versión plana no es un trámite: es lo que ve quien lee en modo texto
         y lo que miran los filtros al decidir si esto es legítimo. */
      text: avisoTexto(datos),
    });
  } catch (falla) {
    /* Este correo es el único rastro que deja una consulta: no hay base de
       datos ni copia en ningún lado. Si no sale, la consulta se perdió y hay
       que decirlo en pantalla —`errorServidor` manda a escribir directo a la
       casilla—, porque nadie del otro lado se va a enterar de otra forma.

       El transporte se descarta: si la conexión del pool quedó envenenada
       —Gmail cortó la sesión, la clave de aplicación se revocó—, guardarla hace
       que fallen también todas las consultas que vengan después. */
    console.error("[contacto] Gmail rechazó el envío", falla);
    transporte = null;
    return error(UI.form.errorServidor);
  }

  return { estado: "ok" };
}
