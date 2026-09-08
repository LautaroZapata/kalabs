import { SERVICIOS, UI } from "./content";

/**
 * Los tipos y las constantes del formulario, fuera de la Server Action.
 *
 * No es una separación decorativa: un módulo con `"use server"` sólo puede
 * exportar funciones async. Exportar de ahí un objeto o un array rompe en
 * runtime —el build no lo atrapa— y se lleva puesta la página entera, no sólo
 * el envío. Todo lo que el cliente necesita mirar vive acá.
 */

/** Los tres servicios más la salida para quien todavía no sabe cuál pedir. */
export const OPCIONES = [...SERVICIOS.map((s) => s.titulo), UI.form.servicioOtro];

/**
 * Lo que se escribe en la portada tiene que llegar al formulario, que está
 * cinco secciones más abajo y es otro componente.
 *
 * Va por un evento del documento y no por un estado compartido a propósito: no
 * hay nada que sincronizar ni que persistir —es un texto que viaja una vez, en
 * un solo sentido—, y montar un contexto para eso obligaría a volver cliente a
 * todo lo que quede en el medio.
 */
export const EVENTO_CONSULTA = "kalabs:consulta";

export type Valores = {
  nombre: string;
  negocio: string;
  correo: string;
  necesito: string;
  mensaje: string;
};

export type Estado =
  | { estado: "inicial" }
  | { estado: "ok" }
  /* El error vuelve con lo que la persona ya había escrito: sin JavaScript la
     página se rerenderiza entera, y perder el mensaje redactado por un campo
     mal puesto es la forma más rápida de que se vaya. */
  | { estado: "error"; mensaje: string; valores: Valores };

export const VALORES_VACIOS: Valores = {
  nombre: "",
  negocio: "",
  correo: "",
  necesito: OPCIONES[0],
  mensaje: "",
};

export const ESTADO_INICIAL: Estado = { estado: "inicial" };
