# Enlaces — para Discord

Copiar y pegar **un bloque por mensaje**. Cada uno entra en el límite de 2000
caracteres y no usa tablas, que Discord no dibuja.

> **Sin enlaces profundos a los paneles a propósito.** Las URLs internas de
> Cloudflare y Vercel llevan el ID de cuenta adentro, y este archivo vive en un
> repo público. Los enlaces de abajo entran igual, sólo que por la puerta
> principal.

---

## MENSAJE 1

# Kalabs — Enlaces

## El sitio

**https://www.kalabs.dev**

El apex `kalabs.dev` redirige al `www`, que es el que Vercel tiene como principal. Las canónicas, el sitemap y la imagen OG nombran el `www`.

Rutas que genera el sitio solo:

```
/                  la página
/sitemap.xml       para Google Search Console
/robots.txt        apunta al sitemap
/opengraph-image   la imagen de 1200x630 que se ve al compartir
/icon.svg          el favicon
```

Para ver cómo queda el link antes de mandarlo a un cliente:
https://www.opengraph.xyz

---

## MENSAJE 2

## Correo

Todas las direcciones caen en la misma bandeja (`kalabsuy@gmail.com`), y todas pueden usarse como remitente desde Gmail.

```
hola@kalabs.dev      la publicada en el sitio y en el formulario
lautaro@kalabs.dev   Lautaro
matias@kalabs.dev    Matías
rxman@kalabs.dev     alias interno
sxsa@kalabs.dev      alias interno
```

**Cómo funciona:** entra por Cloudflare Email Routing y reenvía a Gmail. Sale por SMTP de Brevo con el "Enviar como" de Gmail. El dominio está autenticado con SPF, DKIM y DMARC.

⚠️ **Un dominio admite un solo registro SPF.** Si alguna vez hay que sumar otro servicio de correo, se **edita** la línea existente. Crear un segundo TXT de SPF invalida los dos y tira todo el correo a spam.

---

## MENSAJE 3

## Paneles

**Vercel** — hosting y despliegues
https://vercel.com/dashboard
Cada push a `main` despliega a producción solo. No hay preview.

**Cloudflare** — dominio, DNS y correo entrante
https://dash.cloudflare.com
El dominio se registró acá, al costo. Renovación automática: si vence, se caen el sitio y el correo el mismo día.

**Brevo** — correo saliente
https://app.brevo.com
- Claves SMTP: https://app.brevo.com/settings/keys/smtp
- Claves de API: https://app.brevo.com/settings/keys/api
- Dominios: https://app.brevo.com/senders/domain/list

⚠️ Las claves SMTP **expiran a los 90 días de inactividad**, además de su vencimiento. Si Gmail deja de enviar de golpe, es eso: se genera una nueva y se cambia en Ajustes.

**GitHub** — el código
https://github.com/LautaroZapata/kalabs

---

## MENSAJE 4

## Proyectos

**ViaGrúa** — flotas de grúas en tiempo real
https://via-grua.vercel.app

**ROG** (República Oriental de los Gastos) — finanzas personales
https://urugastos.vercel.app

**Oleohidráulica Cáceres** — institucional industrial
https://oleocaceres-web.vercel.app

> **Los tres siguen en subdominios `.vercel.app`.** Para un estudio que vende "sitios para negocios que necesitan que los encuentren", es una contradicción visible, y además no rankean para el cliente. Pasarlos a dominio propio es trabajo facturable y está pendiente.

---

## MENSAJE 5

## Perfiles

**LinkedIn — el canal principal.** El alcance real sale de los perfiles personales, no de la página de empresa.

- Lautaro Zapata: https://www.linkedin.com/in/lautarozc/
- Matías Sosa: https://www.linkedin.com/in/matiassxsa/

**GitHub:** https://github.com/LautaroZapata

**Google Business Profile:** https://business.google.com
Pendiente. Es gratis y es lo que pone al estudio en el mapa cuando alguien busca "desarrollo web Montevideo". De todo lo que queda por hacer, es lo de mejor retorno por hora.

---

## MENSAJE 6

## Herramientas de verificación

Para chequear que algo funciona antes de que lo note un cliente.

**Velocidad y Core Web Vitals**
https://pagespeed.web.dev

**Datos estructurados** (que Google entienda que somos un estudio de Montevideo)
https://search.google.com/test/rich-results

**Cómo se ve el link al compartirlo**
https://www.opengraph.xyz

**Puntaje de spam del correo** — se manda un mail a la dirección que da y devuelve el análisis
https://www.mail-tester.com

**Salud del DNS y del correo** (MX, SPF, DKIM, DMARC)
https://mxtoolbox.com/SuperTool.aspx

**Search Console** — qué busca la gente para llegar al sitio
https://search.google.com/search-console

---

## MENSAJE 7

## Recursos del sistema de diseño

**Fraunces** — titulares
https://fonts.google.com/specimen/Fraunces

**Newsreader** — cuerpo, bajadas y datos
https://fonts.google.com/specimen/Newsreader

**Motion** — las entradas por scroll
https://motion.dev

**Next.js** — el framework
https://nextjs.org/docs

-# El sistema de diseño completo está en el post fijado del canal. La documentación técnica vive en el README del repo.
