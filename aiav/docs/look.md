# Look Kalabs: colorimetría y textura de todos los videos

Regla del lab, pedida el 2026-10-13: **todo video que sale de acá pasa por
`scripts/revelado.py`**. Lleva bloom moderado, efecto "sueño" (difusión) y
grano visible. Nada sale con el look digital crudo del modelo: nitidez de IA,
negros en cero, altas recortadas.

**Color: vivo, no apagado** (corrección del usuario, 2026-10-13, sobre el campo a
contraluz: "subir la intensidad de los colores, que queden intensos, vivos"). El
color de Gastón Luna sirve por la luz y el contraste, no por la desaturación. Se
logra con *vibrance* (sube más lo apagado que lo ya saturado) y no con saturación
bruta, y las altas siguen yendo a blanco como en el film, así no queda chillón.

## Referencias (mirar antes de decidir un look)

| Creador | Video | Qué tomar |
|---|---|---|
| Gastón Luna | [En busca de la inspiración, Feroe](https://www.youtube.com/watch?v=9MHLqJqgl1k) (y el resto de su canal) | La referencia principal por luz y contraste: luz suave y direccional, sombras profundas que no llegan a negro, altas que se apagan sin recortar. (Sus verdes apagados no: el usuario quiere color vivo.) |
| Leiti Sene | [Bitcoin (video oficial)](https://www.youtube.com/watch?v=0qKUw8XJwi4) | Foto analógica de 35 mm: grano grueso, dominante cálida y verdosa, flash directo con halación. |
| Okos | [Plataforma petrolera y huracán](https://www.youtube.com/watch?v=NmZlhBq7O3A) | Luz dramática de tormenta, paleta fría y desaturada. |
| Patrick Mainstone | [Por si te sientes perdido](https://www.youtube.com/watch?v=sZnb4XMS8XY) | Paisaje de montaña con luz direccional. |
| Jep | [Atrapado en la montaña por una tormenta de nieve](https://www.youtube.com/watch?v=8-jORsX5Ix4) | Nieve y luz difusa de alta montaña. |

Visto solo por las miniaturas (no se pueden reproducir desde acá), y las
miniaturas suelen estar retocadas para el clic. Antes de un look nuevo,
conviene que el usuario pase capturas de cuadros reales.

## Lo que se investigó

- **Cadena de film** ([pixeltoolspost](https://pixeltoolspost.com/blogs/resolve/film-emulation-explained)):
  negativo → positivo → halación → grano, en ese orden. La curva tiene *toe*
  y *shoulder* en vez de recortar: los tonos se comprimen en los extremos. El
  grano no es ruido encima: es más visible en medios y sombras, y depende del stock.
- **Bloom y halación** ([color.io](https://www.color.io/user-guide/film-halation),
  [Martin McGowan](https://martinrmcgowan.medium.com/emulating-film-aesthetics-building-a-custom-film-stock-57820186d24a)):
  el bloom hace que las altas se apaguen lindo en vez del recorte digital. La
  halación es luz que rebota en la base del film y vuelve a exponer sobre todo
  la capa roja: un brillo rojo anaranjado alrededor de las altas con mucho contraste.
- **Camino a blanco** ([darktable, AgX](https://docs.darktable.org/usermanual/development/en/module-reference/processing-modules/agx/)):
  los colores intensos se desaturan hacia blanco al acercarse al techo, como un
  sensor o un film sobreexpuesto. Sin eso, las altas digitales se ven chillonas.
- **Grano por luminancia** ([IPOL, Realistic Film Grain Rendering](https://www.ipol.im/pub/art/2017/192/article_lr.pdf)):
  ruido correlacionado (con tamaño, no por píxel) y dependiente de la señal.
- **El grano también hace de dithering** ([HolyGrain](https://www.holygrain.com/blog/film-grain-overlay-vs-film-emulation-plugins/)):
  suaviza los degradados (cielos) y unifica la imagen.

## Lo más importante: la luz se decide en la imagen, no en el color

Medido el 2026-10-13 con el mismo campo. Pedir "crisp fine detail,
photorealistic" dio luz plana de mediodía y look HDR, y ningún revelado lo
arregla. Pedir **luz con dirección** dio realismo de otro nivel: "late
afternoon, low sun to the right, warm side light rakes across the grass, rim
light, long soft shadows, deep but not black shadows, soft highlight rolloff,
35mm film, Kodak Portra 400, no HDR look, no oversharpening".

Para el prompt de la imagen:
- Nombrar la **fuente de luz, la hora y la dirección** (contraluz, luz rasante,
  nublado suave). Nunca "bright", "vivid", "crisp", "ultra detailed", "8k".
- Pedir **profundidad de campo** y algo desenfocado en primer plano: es lo que
  más separa una foto real de una imagen generada.
- Pedir film (Portra 400, 35mm) y "natural colors". No pedir "muted": el color vivo lo da el revelado y el usuario lo quiere intenso.
- Para el movimiento: cámara fija o dolly muy lento, y física chica (viento,
  partículas, agua). Nada de acción con cuerpos.

## Cadena del lab

1. Imagen (Z-Image) con la luz pedida como arriba. Se generan 4 y se elige.
2. Video (A14B I2V, `--rife 2`).
3. Escalado a 2K (2560×1440) con `upscale_video.py --mezcla 0.4 --grano 0`.
   Menos Real-ESRGAN (40 % en vez de 80 %) da menos "detail" artificial. El
   grano va recién en el revelado.
4. `revelado.py` (con `--fundido 0.3` si es un loop de héroe). Busca el cuadro del final más parecido al primero y hace la transición con flujo óptico: deforma los dos cuadros hacia el punto medio antes de mezclarlos. Con una mezcla simple de 1 s se veía una doble exposición, como blur, al arrancar (la nitidez caía al 65 %). Con flujo queda entre el 88 y el 100 %. Un corte seco no sirve: el salto es 3 veces un paso normal.
5. `heroe_web.py --fundido 0` para la versión web y el póster.

## Sombras negras, no azules (corrección del usuario, 2026-10-13)

"El ruido + las partes oscuras tiende al azul": se notaba el ruido en lo oscuro.
Medido en el lago de día, tres causas, en este orden de peso:

1. **Vibrance y saturación sobre las sombras.** El vibrance sube más lo apagado,
   y en las sombras el "color" es casi todo ruido: lo avivaba y lo volvía azul.
   Ahora saturación y vibrance pesan según la luz y no actúan en lo oscuro.
2. **Split toning con azul en las sombras.** Se sacó: las sombras quedan neutras
   y sólo las altas se entibian.
3. **Ruido de color del video y grano de color en lo oscuro.** Se limpia el
   ruido sólo en las sombras (`--limpiar_sombras`) y el grano baja casi a cero
   en los negros y es monocromo ahí.

Resultado sobre el mismo cuadro: tinte azul de las sombras 10,1 → 5,5,
saturación de las sombras 162 → 85, el resto de la imagen igual de vivo
(157 → 155). Negro de pantalla en 0,01.

## Loops de héroe (lo que funcionó, 2026-10-14)

Tres cosas hacían que el loop "se notara". Hay que resolver las tres:

1. **El empalme del contenido.** Cerrar un loop con una transición (aunque sea
   con flujo óptico) derrite el agua o el pasto mientras dura, porque mezcla
   dos estados distintos: eso era el "bug de las ondas al reiniciar". Lo que
   funcionó es el **vaivén** (`revelado.py --vaiven 1.3`): el clip va y vuelve
   con la velocidad frenando a cero en cada punta, como un péndulo. No hay
   empalme ni mezcla. Con agua calma, cámara fija y el paralaje encima, el ida y
   vuelta no se percibe.
2. **Los bordes del clip del A14B con `--loop`.** Los primeros ~10 cuadros
   "despegan" de la imagen fija y cerca del 70 % el modelo da un tirón para
   volver al inicio. Se usa el tramo limpio del medio (en el lago: 12–108 de 160).
3. **La compresión.** Con un solo cuadro clave al principio, la imagen se corre
   de a poco y al volver al cuadro 0 salta (medido: 0,05 adentro y 1,51 en el
   reinicio). `heroe_web.py` pone un cuadro clave cada 24 y calidad pareja
   entre cuadros (`ipratio=1:pbratio=1:aq-mode=0`). Sin picos.

Además, **el grano va en el shader** (`motor.ts`, misma fórmula que el
revelado), no quemado en el video: el video sin grano pesa una fracción (lago:
7,5 MB por 7,2 s en 1080p, contra 20 MB por 4 s con grano) y el grano cambia a
24 cuadros por segundo, independiente del loop. Revelar con `--grano 0`.

Y en la página, **dos copias del video que se pasan la posta** (`motor.ts`):
con `loop` el navegador se congela un instante al volver al principio.

La interacción que gustó es el **movimiento de cámara** (paralaje por
profundidad). Las ondas del mouse en el agua y el viento en el pasto no.

## Valores por defecto de `revelado.py` y por qué

| Parámetro | Valor | Qué hace |
|---|---|---|
| `suavidad` / `claridad` | 0,7 px / −0,15 | Saca el microdetalle de IA y baja el contraste local |
| `contraste` | 0,08 | Poco: con luz real la imagen ya trae contraste. Subirlo aplasta las sombras de un contraluz (probado) |
| `pie` / `negro` | 0,2 / 0,01 | Sombras suaves, negro casi puro |
| `hombro` / `blanco` | 0,22 / 0,965 | Las altas se apagan sin recortar |
| `altas_desat` | 0,3 | Camino a blanco, sin lavar el color |
| `verde_tono` / `verde_desat` | 6° / 0,06 | Verdes apenas hacia oliva, sin apagarlos |
| `azul_tono` / `azul_desat` | 3° / 0 | Cielo celeste. Con 8° se iba a teal |
| `saturacion` / `vibrancia` | 1,05 / 0,45 | Color vivo, sólo donde hay luz. Medido en el campo a contraluz: +44 % de saturación media |
| `sombras_desat` / `limpiar_sombras` | 0,6 / 0,8 | Sombras neutras y sin ruido de color |
| `split` | 0,008 | Toque cálido sólo en las altas; las sombras quedan neutras |
| `niebla` | 0,08 | Difusión tipo Pro-Mist: el efecto sueño |
| `bloom` / `umbral` | 0,4 / 0,4 | Bloom en tres radios, apenas cálido |
| `halacion` | 0,10 | Borde rojo anaranjado alrededor de las altas |
| `grano` / `grano_tam` / `grano_color` | 0,028 / 1,6 px / 0,1 | Visible, casi monocromo, más en medios. Con 0,045 y 0,25 de color el cielo parecía ruido de celular |

Los defaults son el look de la casa. Si una toma pide otra cosa, se cambia
por flag en esa toma, no el default.
