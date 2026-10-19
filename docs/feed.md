# El feed de Instagram

**Leer entero antes de crear publicaciones nuevas.** Es la guía y a la vez el
registro de lo que ya se dijo. Al terminar una tanda, se actualiza el registro
de abajo.

## Antes de empezar

1. **Mirar qué se publicó.** En Drive, `J:\Mi unidad\IG Feed\Publicadas\` tiene
   lo que ya salió; lo que está suelto en `IG Feed\` está hecho pero no
   publicado. Ninguna pieza nueva repite el tema de una de las dos carpetas.
2. **Leer el registro de temas** de este archivo y elegir ángulos que no estén.
3. **Repartir por rubro.** Una tanda mezcla los cuatro rubros, no se queda en
   uno.

## El tono

- **Formal, de usted.** «Complete su perfil», «su empresa», «le indicamos».
  Nada de voseo («contanos», «tu web»), ni guiños, ni frases de folleto.
- **Claro antes que ingenioso.** El titular se entiende sin la bajada.
- **Sin cifras inventadas.** Un número entra sólo si es una condición real del
  estudio (las de `docs/comercial/contrato.html` o `lib/content.ts`) o lo
  confirmó el cliente. Los consejos no citan estadísticas.
- **Sin clientes inventados.** Las obras que se pueden nombrar son las de
  `PROYECTOS` en `lib/content.ts`.

## De qué hablar

Los servicios ya se presentaron: webs, automatizaciones, sistemas a medida e
identidad de marca, más las condiciones (consulta sin costo, presupuesto
cerrado, garantía, propiedad del cliente, proceso). Repetirlos no suma.

Lo que sigue es **aportar**: consejos, errores comunes, qué tener en cuenta
antes de contratar, cómo evaluar lo que uno ya tiene. Que la pieza le sirva al
que la lee aunque no nos escriba nunca. Eso es lo que se guarda y se comparte.

Cada rubro da para mucho. Ángulos sin usar, para arrancar:

- **Webs:** qué pedir en un presupuesto web, el dominio a nombre propio, sitio
  vs. solo redes, qué revisar en el celular, textos que responden lo que el
  cliente pregunta, preguntas frecuentes, formularios cortos, velocidad, fotos
  propias vs. de stock, qué medir, accesibilidad básica.
- **Automatizaciones:** cómo detectar una tarea automatizable, recordatorios
  de turnos, avisos de stock bajo, reportes que llegan solos, qué no conviene
  automatizar, respuestas frecuentes en WhatsApp, un paso a la vez.
- **Sistemas a medida:** planilla vs. sistema (cuándo conviene cada uno),
  empezar por una función, quién va a usarlo todos los días, permisos por
  usuario, historial de cambios, qué datos guardar de cada cliente.
- **Identidad de marca:** logo vs. identidad, manual de uso, tipografía
  legible, la marca en el local y en el vehículo, coherencia entre redes y
  web, cuándo renovar y cuándo no, el isotipo en la foto de perfil.
- **Transversales:** seguridad de cuentas, quién tiene las contraseñas, cómo
  elegir un proveedor, qué preguntar antes de firmar, qué pasa si el
  proveedor desaparece.

## El diseño

La línea que funciona: **una forma plana grande** (disco, arco, candado,
grilla, pin, embudo…) que ocupa la parte de arriba, y abajo **titular, bajada
y firma** contra el margen. Paleta y tipografías del estudio, sin excepciones.

- Nada de UI dibujada, tickets, globos de chat ni capturas falsas: la forma
  sugiere, no ilustra.
- Sin rótulo sobre el título, sin fila de métricas, sin nada que se mueva solo
  (las excluyentes de `CLAUDE.md`).
- Los cortes de renglón del titular van a mano (`Titulo` recibe un arreglo),
  para que no quede una palabra sola.
- Lo que tiene que leerse vive entre los 135 px de arriba y de abajo: la
  grilla del perfil recorta el 4:5 a cuadrado.
- Alternar fondos (papel, tinta, brasa, hueso) dentro de una tanda.

Las primitivas (`Base`, `Titulo`, `Texto`, `Plano`) viven en
`components/feed/Institucional.tsx`; `Consejos.tsx` suma `Dibujo` (SVG plano) y
`Pie`. Satori: sólo flex, y **nada de fragmentos `<>`** como contenedor de
bloques, porque los acomoda en fila.

### Productos: la excepción a «nada de UI»

Para presentar un producto propio (Cupo) sí va interfaz, pero **sólo
capturas reales** del sitio en línea, nunca pantallas dibujadas. Viven en
`feed-capturas/<producto>/`, se sacan con Chrome por CDP a densidad 2 y se
recortan sin el aviso de demostración. Los negocios que se ven son los de
muestra del producto, y cada pieza lo aclara («Pantallas reales de Cupo, con
negocios de muestra»). Nunca texto encima de una captura.

El carrusel se compone como una sola tira de 5 × 1080 y cada lámina es una
ventana sobre ella (`CupoCarrusel`). **Sólo la banda de fondo cruza de una
lámina a otra**; titular, bajada y pantalla viven enteros en su lámina y en el
mismo lugar en todas. Un celular partido entre dos láminas se ve roto en cada
una (se probó y se descartó). Antes de darlo por bueno, medir que la última
columna de cada lámina coincida con la primera de la siguiente. Se sube como
carrusel, en orden del 1 al 5.

## Cómo se produce

1. Componente nuevo en `components/feed/` (o en el archivo de la serie).
2. Entrada en `FEED` y en el tipo `Pieza` de `lib/feed.ts`, y el `case` en
   `pieza()` de `components/feed/Piezas.tsx`.
3. `pnpm dev` y en otra terminal `pnpm feed <slug> <slug>…`: los PNG van
   directo a `J:\Mi unidad\IG Feed\`.
4. Mirar cada PNG antes de darlo por bueno: renglones sueltos, formas que
   pisan el texto, huecos.
5. Anotar los temas en el registro de acá abajo.

## Videos (Reels)

Viven en `videos/`, un paquete aparte con Remotion (gratis hasta 3 personas en
la empresa). Leen textos y marca de `lib/` y no tocan el deploy del sitio.

- Formato 1080×1920 a 30 cuadros. Lo que se lee va entre los 240 px de arriba
  y los 470 de abajo: el resto lo tapa la interfaz de Instagram.
- **Línea vigente: paneles de producto.** Tarjetas de interfaz que flotan en
  3D con sombras suaves, sobre un fondo blanco cálido que se apaga hacia el
  piso o sobre tinta. La cámara orbita despacio; cada panel llega desde la
  profundidad, se asienta sin rebotar y queda respirando. Titular arriba con
  palabras que golpean y una sola marcada en brasa; cierre con la firma.
- **Que no sean todos iguales.** El usuario pidió variedad y que no siempre
  haya un teléfono. Cada video usa un escenario distinto: la computadora con
  una grúa que se aleja del detalle al tablero, un mapa de flujo con pulsos,
  el despiece de una marca, una hoja que se completa, una matriz de accesos,
  una línea de tiempo que la cámara recorre. Referencias: el catálogo de
  tomas de video-shotcraft y las guías de estilo Apple de UI en movimiento.
- **Textos formales.** Nada de frases sueltas o de folleto («hecha para el
  dedo» se descartó por eso). Mismo tono que las piezas fijas.
- **Cada objeto en su propia capa 3D** (`Capa` en `paneles.tsx`). Si
  comparten un solo espacio, el navegador corta los planos que se cruzan y
  un panel que llega desde el fondo atraviesa a otro.
- **En los videos sí va interfaz**, al revés que en las piezas fijas: el
  usuario pidió paneles realistas. Los datos de pantalla son de muestra («Su
  negocio», horarios, apellidos comunes) y nunca se presentan como cliente ni
  como resultado. Sin métricas de relleno.
- Dos series, catalogadas en `src/escenas.tsx`: **promocionales** (`PROMOS`)
  y **consejos** (`CONSEJOS`: pregunta, demostración, consejo, firma). Las
  escenas nuevas viven en `src/promos.tsx` y `src/consejos.tsx`. Las piezas
  —`Escenario` (con `claves` de cámara y `oscuro`), `Panel` (con `vuelta`,
  `respira`, `desnudo`), `Telefono`, `Navegador`, `Portatil`, `Enlaces`,
  `LogoMuestra`, íconos, píldoras— están en `src/paneles.tsx`; las
  estructuras, en `src/comun.tsx`. La marca de muestra («Su marca») es un
  molinete de dos cuartos de círculo: no es la marca de nadie.
- Posproducción en `src/taller.tsx` (grano fino, viñeta leve, destello en los
  golpes) y desenfoque de movimiento promediando 8 subcuadros (`muestras`, 1
  para mirar cuadros sueltos rápido).
- `cd videos`, `pnpm studio` para verlos en el navegador y `pnpm render
  [id…]` para bajarlos. El MP4 y su portada en PNG van a
  `J:\Mi unidad\IG Feed\Videos\`.
- Sin música en el archivo: se elige al subir, de la biblioteca de Instagram.
- Descartadas el 2026-09-29, en orden: versión calma, tipografía cinética
  sola, y la «chispa» (un punto que dibujaba las formas con un trazo tipo
  láser; no gustó el efecto).

## Registro de temas ya usados

No repetir estos temas (con otra forma o con otras palabras sigue siendo el
mismo tema).

**Servicios y estudio**
- Qué es el estudio: tecnología a la medida (`semicirculo`)
- Los tres servicios juntos (`columnas`, `franjas`, `discos`, `torre`)
- Empezar por una sola función (`circulo`)
- Automatizar lo que se repite (`trama`, `puntos`, `planilla`)
- Sistemas: turnos, pedidos, stock (`fichas`)
- Identidad coherente en cada pieza (`arcos`)
- Integraciones entre herramientas (`cruz`)
- Diferenciarse de la web de todos (`trama`)

**Condiciones**
- Respuesta en 24 horas (`dato-24`)
- Primera consulta sin costo (`triangulo`)
- Presupuesto cerrado (`cuadrante`)
- Proceso consulta → entrega (`escalera`)
- Garantía de 30 días (`garantia`)
- Cuentas y código a nombre del cliente (`llaves`, `candado`)

**Consejos** (serie `Consejos.tsx`)
- Web: perfil de empresa en Google (`pin`)
- Web: correo con dominio propio (`sobre`)
- Web: una acción principal por pantalla (`circulos`)
- Automatizaciones: escribir el proceso antes de automatizar (`diagrama`)
- Automatizaciones: respuesta automática fuera de horario (`luna`)
- Sistemas: un solo lugar para cada dato (`embudo`)
- Sistemas: respaldos fuera del equipo (`copia`)
- Marca: el logo tiene que funcionar en chico (`reduccion`)
- Marca: paleta acotada y constante (`muestras`)
- Seguridad: verificación en dos pasos (`eslabones`)

**Productos** (serie `Productos.tsx`, en `IG Feed\Cupo\`)
- Cupo, la agenda en línea: vitrina de tres negocios (`cupo-vitrina`),
  horarios de cerca (`cupo-detalle`), panel y celular (`cupo-panel`), ficha
  técnica (`cupo-ficha`) y carrusel de cinco láminas (`cupo-carrusel-1…5`)

**Videos** (`videos/src/`)
- Promos: sistemas (`promo-sistemas`), automatizaciones
  (`promo-automatizaciones`), web (`promo-web`), identidad
  (`promo-identidad`)
- Sistemas: planilla o sistema (`consejo-planilla`)
- Sistemas: permisos por usuario (`consejo-permisos`)
- Web: revisar la web en el teléfono (`consejo-celular`)
- Web: qué debe incluir un presupuesto (`consejo-presupuesto`)
- Automatizaciones: recordatorio de turnos (`consejo-recordatorios`)
- Marca: manual de uso del logo (`consejo-manual`)
- Automatizaciones: qué conviene automatizar, y marca: logo o identidad —
  hechos en la línea «chispa» y descartados; se pueden rehacer en paneles.
