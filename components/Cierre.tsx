import { UI } from "@/lib/content";
import s from "./Sub.module.css";

/**
 * El cierre de toda página interior.
 *
 * Quien llegó al final ya sabe si le sirve, y en ese punto tiene que haber
 * dónde escribir sin volver a la home a buscarlo. Manda a `/#contacto`, que es
 * el formulario que ya existe: un segundo formulario acá sería un segundo lugar
 * donde se rompen los correos.
 */
export default function Cierre() {
  return (
    <section className={s.cierre}>
      <h2 className={`${s.cierreTitulo} titular titular--sec`}>
        {UI.subCierreTitulo}
      </h2>
      <p className={`${s.cierreCuerpo} parrafo`}>{UI.subCierreCuerpo}</p>
      <a className="pastilla pastilla--brasa" href="/#contacto">
        {UI.subCierreAccion}
      </a>
    </section>
  );
}
