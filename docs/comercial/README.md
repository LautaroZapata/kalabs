# Los papeles del estudio

Un solo documento: `contrato.html`, dos hojas A4. Se abre con doble click, no
hace falta levantar el proyecto.

La primera hoja es la que importa —qué se entrega y cuánto sale—; la segunda son
el soporte opcional y tres condiciones. Está escrito para un almacén, una
barbería o un taller: si una frase necesita que alguien la traduzca, está mal
escrita. Lo que el estudio hace y cómo trabaja ya está en kalabs.dev, así que acá
no se repite.

El resto del circuito ya estaba y sigue igual: las plantillas de correo de
`../plantillas/` —presupuesto, entrega y firma— se copian y pegan en Gmail.

## Cómo se completa

Todo lo que está `[entre corchetes]` se reemplaza antes de mandar. En pantalla
se ve en bordó y subrayado de puntos, así no se escapa ninguno; impreso queda
igual, que es a propósito: un corchete que llegó al cliente se ve de lejos.

Lo único que lleva tiempo escribir es la lista de **«qué incluye»**: ahí se
define el precio cerrado y todo lo demás cuelga de esa lista.

## Cómo se exporta el PDF

`Ctrl+P` → Destino **Guardar como PDF** → Tamaño **A4** → Márgenes **Ninguno** →
tildar **Gráficos de fondo**. Sin esa última tilde, los planos de color y el
filete de brasa salen en blanco.

Cada hoja mide exactamente 297 mm de alto. Si al completar los corchetes el
texto crece, la hoja se estira y el sobrante se va a la página siguiente en vez
de perderse; si eso pasa, hay que acortar el texto.

## Qué dice cada hoja

**Hoja 01 — qué se entrega y cuánto sale.** Las partes, la lista de «qué
incluye», la de «qué no incluye» y el precio final con la forma de pago. Es la
hoja que el cliente va a leer dos veces; el resto es respaldo.

**Hoja 02 — soporte y condiciones.** Los tres planes de soporte, la definición
de «cambio chico» y tres condiciones, escritas como se hablan:

| | |
| --- | --- |
| 1 Pagos | Mitad al empezar, mitad al terminar. Dominio y hosting van aparte, con el primer pago |
| 2 Propiedad | Cuentas, contraseñas, diseños, código y sistema quedan del cliente |
| 3 Exhibición | Kalabs puede mostrar el diseño y las pantallas, nunca el negocio ni la seguridad |

## El soporte, que es lo que más se abusa

Después de los 30 días de garantía hay tres caminos y el papel los muestra a la
par, para que elegir sea fácil: **sin plan** —cada pedido se cotiza aparte—,
**plan al día** con 2 cambios chicos por mes, y **plan acompañado** con 5.

Lo que evita el abuso no es el precio, es la definición. Un cambio chico es
cambiar textos, precios, horarios, fotos o datos de contacto, o sumar y sacar
ítems de una lista que ya existe: hasta una hora de trabajo. Una función nueva,
una pantalla nueva, un rediseño o conectar otro sistema no lo son, y se cotizan
por hora avisando antes.

Las otras tres reglas que sostienen el plan:

- Los pedidos entran por correo, no por WhatsApp a cualquier hora, y se hacen
  juntos una vez por semana. Si algo se cae, se atiende el mismo día.
- Lo que no se usa en el mes no se acumula para el siguiente.
- Se paga mes a mes y se corta avisando con 30 días.

## El sistema visual

El mismo del sitio, sin nada nuevo: tinta `#0f1214`, papel `#f7f2e7`, hueso
`#efe7d6`, brasa `#ff6b1a` y bordo `#9c3f26`. Bricolage Grotesque en titulares,
Hanken Grotesk en el resto, cargadas de Google Fonts.

## Antes de usarlo

Es una plantilla escrita por el estudio, no un dictamen. Las leyes que cita son
uruguayas y existen, pero el encaje con cada caso no lo garantiza un archivo
HTML: si el cliente es grande, que lo lea un abogado.

Faltan dos datos que no están en el repo y se completan una sola vez en la hoja
01: la razón social de Kalabs y su RUT.

## Figma

Hay un archivo empezado —«Kalabs · Propuesta comercial y contrato»— con páginas
y la paleta como variables, pero vacío: la cuenta está en plan Starter, que da
20 llamadas de MCP por mes y se agotaron armando eso. La fuente de verdad es el
HTML de esta carpeta.
