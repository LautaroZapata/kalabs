import type { Metadata } from "next";
import Banner from "@/components/Banner";
import Barra from "@/components/Barra";
import Contacto from "@/components/Contacto";
import Estudio from "@/components/Estudio";
import Obra from "@/components/Obra";
import Pie from "@/components/Pie";
import Portada from "@/components/Portada";
import Servicios from "@/components/Servicios";
import Escena from "@/components/heroe/Escena";

/* Vista previa local del héroe con video: no se enlaza ni se indexa. */
export const metadata: Metadata = { title: "Héroe · lago", robots: { index: false, follow: false } };

export default function Page() {
  return (
    <>
      <Barra />
      <main id="contenido">
        <Escena variante="lago">
          <Portada sobreEscena />
        </Escena>
        <div className="caja">
          <Obra />
          <Servicios />
          <Estudio />
        </div>
        <Banner />
        <div className="caja">
          <Contacto />
        </div>
      </main>
      <Pie />
    </>
  );
}
