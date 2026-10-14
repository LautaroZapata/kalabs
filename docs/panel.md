# Panel de visitas

Usuarios en línea y visitas de kalabs.dev, cupo.uy, ViaGrúa, Oleo Cáceres y
OleoFin, en `https://www.kalabs.dev/admin`. También lo abre la app de escritorio
de `apps/desktop` (Tauri 2), que es una ventana fija sobre esa URL.

## Cómo funciona

1. Cada sitio manda un `view` al entrar y un `ping` cada 25 s a
   `https://www.kalabs.dev/api/track` (`sendBeacon`, un id por pestaña en
   `sessionStorage`, sin cookies).
2. `/api/track` valida el slug y llama a `kalabs_track` en Supabase: actualiza
   la presencia y, si es `view`, suma una visita. Ignora los pedidos con
   Origin `localhost`, así los dev servers no cuentan.
3. `/admin` pide la clave y consulta `/api/panel` cada 5 s. `/api/panel` llama a
   `kalabs_stats`, que devuelve por sitio: en línea (señal en los últimos 60 s),
   visitas de hoy (día de Montevideo), de los últimos 7 días, páginas más vistas
   y rutas de las sesiones activas.

| Pieza | Dónde |
| --- | --- |
| Tracker de kalabs.dev | `components/Tracker.tsx` (no cuenta en dev ni en `/admin`) |
| Snippet para sitios sin React | `snippets/tracker.js` |
| Endpoints | `app/api/track/route.ts`, `app/api/panel/route.ts` |
| Pantalla | `app/admin/page.tsx`, `app/admin/Panel.tsx`, `app/admin/Panel.module.css` |
| Lista de sitios | `lib/panel.ts` (el slug tiene que existir en `kalabs_projects`) |
| Clave | `lib/panel-acceso.ts` |
| Supabase | `lib/supabase.ts`, schema en `supabase/kalabs-panel.sql` |
| App de escritorio | `apps/desktop` |

## Supabase

Proyecto propio de la cuenta kalabsuy (`lnhpwzrbzteblexwzres`), separado de los
proyectos de clientes. La anon key no tiene ningún permiso sobre las tablas:
sólo ejecuta `kalabs_track` y `kalabs_stats`, que son `security definer`.
`kalabs_stats` vuelve a validar la clave contra el hash guardado en
`kalabs_config`, así que la anon key sola no alcanza para leer números.

Para cambiar el schema se edita `supabase/kalabs-panel.sql`, que es idempotente,
y se corre entero contra ese proyecto.

## Por qué la config está en el código

El proyecto Vercel que sirve www.kalabs.dev no tiene variables de entorno, y
ninguna cuenta del CLI lo ve. Por eso:

- `lib/supabase.ts` lleva la URL y la anon key escritas. La anon key es pública
  por diseño y no da acceso a las tablas.
- La clave del panel se compara contra un SHA-256 en `lib/panel-acceso.ts`. El
  mismo hash está en `kalabs_config`: **si se cambia la clave, hay que cambiarlo
  en los dos lugares.**

Se deploya con push a `main`, como el resto del sitio.

## Sumar un sitio

1. Agregarlo a `PANEL_PROJECTS` en `lib/panel.ts` y a `kalabs_projects` en
   `supabase/kalabs-panel.sql`; correr el SQL.
2. Poner el tracker: un componente cliente como `components/Tracker.tsx` con la
   URL absoluta del endpoint, o `snippets/tracker.js` con su slug.
3. Si el sitio tiene CSP, sumar `https://www.kalabs.dev` a `connect-src`. Si no,
   el navegador descarta el beacon sin avisar (pasó en ViaGrúa, `lib/csp.ts`).
4. Deployar el sitio. Cupo no deploya con el push: es Cloudflare Workers y se
   sube con `pnpm run deploy`.

## Detalles que costaron

- `sendBeacon` con un Blob `application/json` sale en modo CORS con
  credenciales: pide preflight y no acepta `*`. `/api/track` responde `OPTIONS`
  y devuelve el origin que llega.
- Activo es "con señal en los últimos 60 s": al cerrar una pestaña tarda hasta
  un minuto en bajar.
