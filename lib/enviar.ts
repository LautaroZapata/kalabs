"use server";

import { SERVICIOS, SITE, UI } from "./content";

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
 */

/** Las opciones válidas del campo «servicio», las mismas que dibuja el form. */
const OPCIONES = [...SERVICIOS.map((s) => s.titulo), UI.form.servicioOtro];

export type Estado =
  | { estado: "inicial" }
  | { estado: "ok" }
  /* El error vuelve con lo que la persona ya había escrito: sin JavaScript la
     página se rerenderiza entera, y perder el mensaje redactado por un campo
     mal puesto es la forma más rápida de que se vaya. */
  | { estado: "error"; mensaje: string; valores: Valores };

export type Valores = {
  nombre: string;
  negocio: string;
  correo: string;
  necesito: string;
  mensaje: string;
};

export const VALORES_VACIOS: Valores = {
  nombre: "",
  negocio: "",
  correo: "",
  necesito: OPCIONES[0],
  mensaje: "",
};

/* Validación deliberadamente laxa: la única forma de saber si una dirección
   existe es escribirle. Esto descarta lo que no puede ser un correo y nada
   más; rechazar de más es peor que dejar pasar una consulta con un typo. */
const CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const texto = (dato: FormDataEntryValue | null) =>
  typeof dato === "string" ? dato.trim() : "";

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
  if (!CORREO.test(valores.correo)) return error(UI.form.errorCorreo);
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

  const cuerpo = [
    `Nombre:   ${valores.nombre}`,
    `Correo:   ${valores.correo}`,
    `Empresa:  ${valores.negocio || "—"}`,
    `Servicio: ${necesito}`,
    "",
    valores.mensaje,
  ].join("\n");

  try {
    const respuesta = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": clave,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        /* Remite el dominio propio, no la persona: mandar con el `from` de un
           tercero es lo que hace que el correo caiga en spam. Quien escribió
           va en `replyTo`, así responder desde la bandeja le llega a él. */
        sender: { name: `${SITE.nombre} — formulario`, email: SITE.email },
        to: [{ email: SITE.email, name: SITE.nombre }],
        replyTo: { email: valores.correo, name: valores.nombre },
        subject: `[${SITE.nombre}] ${necesito} — ${valores.negocio || valores.nombre}`,
        textContent: cuerpo,
      }),
    });

    if (!respuesta.ok) {
      console.error("[contacto] Brevo respondió", respuesta.status, await respuesta.text());
      return error(UI.form.errorServidor);
    }
  } catch (falla) {
    console.error("[contacto] no se pudo llamar a Brevo", falla);
    return error(UI.form.errorServidor);
  }

  return { estado: "ok" };
}
