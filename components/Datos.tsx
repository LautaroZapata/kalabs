/**
 * Los datos estructurados de una página, en el HTML.
 *
 * Un `<script type="application/ld+json">` por bloque. Van sueltos y no dentro
 * de un `@graph`: es igual de válido, se lee mejor en el diff y si uno queda
 * mal armado no se lleva puestos a los otros.
 *
 * Lo que meten está armado en `lib/seo.ts`; acá solo se escribe.
 */
export default function Datos({ bloques }: { bloques: object[] }) {
  return (
    <>
      {bloques.map((bloque, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(bloque) }}
        />
      ))}
    </>
  );
}
