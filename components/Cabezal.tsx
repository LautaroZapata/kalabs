import s from "./Cabezal.module.css";

/**
 * Cabezal de sección: antetítulo, título y bajada, con el folio al margen.
 *
 * Lo comparten las tres páginas interiores para que el sitio se lea como un
 * mismo impreso y no como tres secciones que se diseñaron por separado.
 */
export default function Cabezal({
  antetitulo,
  titulo,
  bajada,
  folio,
  id,
}: {
  antetitulo: string;
  titulo: string;
  bajada: string;
  folio: string;
  id: string;
}) {
  return (
    <header className={s.cabezal}>
      <p className={`${s.antetitulo} dato dato--caja`}>
        <span className={s.folio} aria-hidden="true">
          p.&nbsp;{folio}
        </span>
        {antetitulo}
      </p>
      <h2 id={id} className={`${s.titulo} titular`}>
        {titulo}
      </h2>
      <p className={`${s.bajada} bajada`}>{bajada}</p>
    </header>
  );
}
