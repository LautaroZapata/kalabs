"use server";

import { CORREO, SITE, UI } from "./content";
import { OPCIONES, type Estado, type Valores } from "./consulta";
import { acuseHtml, acuseTexto, avisoHtml, avisoTexto } from "./correos";

/**
 * El formulario dejó de armar un `mailto:`.
 *
 * El `mailto:` no era un envío: abría el cliente de correo del visitante y le
 * dejaba a él la última tecla. En el celular muchas veces no abre nada, y de
 * los que abre, buena parte no le da a enviar. Cada consulta perdida ahí no
 * dejaba rastro: no había forma de saber cuántas hubo.
 *
 * Ahora lo manda el servidor por la API de Brevo, que es la misma cuenta que
 * ya autentica el dominio para el correo saliente. Sin dependencias nuevas
 * —es un `fetch`— y sin una cuenta más que mantener.
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

type Mensaje = {
  a: { email: string; name: string };
  responderA: { email: string; name: string };
  asunto: string;
  html: string;
  plano: string;
};

/**
 * Una llamada a Brevo. Devuelve si salió o no, sin tirar: quién decide qué
 * hacer con un fallo depende de cuál de los dos correos era.
 *
 * El remitente siempre es el dominio propio. Mandar con el `from` de un
 * tercero —el correo de quien completó el formulario, por ejemplo— es lo que
 * hace que el mensaje caiga en spam: el SPF y el DKIM de `kalabs.dev` no
 * firman a nombre de nadie más.
 */
async function mandar(clave: string, mensaje: Mensaje): Promise<boolean> {
  try {
    const respuesta = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": clave,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        sender: { name: SITE.nombre, email: SITE.email },
        to: [mensaje.a],
        replyTo: mensaje.responderA,
        subject: mensaje.asunto,
        htmlContent: mensaje.html,
        /* La versión plana no es un trámite: es lo que ve quien lee en modo
           texto y lo que miran los filtros al decidir si esto es legítimo. */
        textContent: mensaje.plano,
      }),
    });

    if (!respuesta.ok) {
      console.error("[contacto] Brevo respondió", respuesta.status, await respuesta.text());
      return false;
    }
    return true;
  } catch (falla) {
    console.error("[contacto] no se pudo llamar a Brevo", falla);
    return false;
  }
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

  const clave = process.env.BREVO_API_KEY;
  if (!clave) {
    console.error("[contacto] falta BREVO_API_KEY: la consulta no se envió");
    return error(UI.form.errorServidor);
  }

  const datos: Valores = { ...valores, necesito };
  const persona = { email: valores.correo, name: valores.nombre };
  const estudio = { email: SITE.email, name: SITE.nombre };

  /* El aviso al estudio es el que no puede fallar: si no sale, la consulta se
     perdió y hay que decírselo a quien la escribió. */
  const salio = await mandar(clave, {
    a: estudio,
    responderA: persona,
    asunto: `[${SITE.nombre}] ${necesito} — ${valores.negocio || valores.nombre}`,
    html: avisoHtml(datos),
    plano: avisoTexto(datos),
  });

  if (!salio) return error(UI.form.errorServidor);

  /* El acuse es cortesía: la consulta ya está en la bandeja del estudio. Si
     Brevo lo rechaza —una casilla que no existe, la cuota del día— queda en el
     log y no se le muestra un error a alguien cuyo mensaje sí llegó. */
  const acuse = await mandar(clave, {
    a: persona,
    responderA: estudio,
    asunto: `${CORREO.acuse.asunto} — ${SITE.nombre}`,
    html: acuseHtml(datos),
    plano: acuseTexto(datos),
  });

  if (!acuse) console.error("[contacto] el aviso salió pero el acuse no:", valores.correo);

  return { estado: "ok" };
}
