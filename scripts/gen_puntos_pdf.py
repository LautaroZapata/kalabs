from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable

OUT = r"C:\Development\kalabs\docs\puntos-barrio-definicion.pdf"

styles = getSampleStyleSheet()
title_style = ParagraphStyle("Title2", parent=styles["Title"], fontSize=22, leading=26, textColor=HexColor("#111827"))
h1 = ParagraphStyle("H1", parent=styles["Heading1"], fontSize=14, leading=18, textColor=HexColor("#1F2937"), spaceBefore=14, spaceAfter=6)
h2 = ParagraphStyle("H2", parent=styles["Heading2"], fontSize=12, leading=15, textColor=HexColor("#374151"), spaceBefore=10, spaceAfter=4)
body = ParagraphStyle("Body", parent=styles["Normal"], fontSize=10, leading=14, textColor=HexColor("#1F2937"))
small = ParagraphStyle("Small", parent=styles["Normal"], fontSize=9, leading=12, textColor=HexColor("#6B7280"))
bullet = ParagraphStyle("Bullet", parent=body, leftIndent=14, bulletIndent=6, spaceBefore=2)

doc = SimpleDocTemplate(OUT, pagesize=A4, leftMargin=20*mm, rightMargin=20*mm, topMargin=18*mm, bottomMargin=18*mm,
                        title="Puntos Barrio - Definicion del proyecto", author="Estudio")
story = []
def p(t, s=body): story.append(Paragraph(t, s))
def b(t): story.append(Paragraph(t, bullet, bulletText="•"))
def sep(): story.append(HRFlowable(width="100%", thickness=0.5, color=HexColor("#E5E7EB"), spaceBefore=8, spaceAfter=8))

p("Puntos Barrio — Gastronomía local de Montevideo", title_style)
p("Documento de definición v2 · Solo salón, no delivery · Montevideo, Uruguay", small)
sep()

p("Frase de enfoque", h1)
p("<b>Puntos por salir a comer en gastronomía local e independiente de Montevideo, solo en salón. A más chico y barrial el local, más beneficio.</b>")

p("1. Enfoque", h1)
b("Vertical: gastronomía. Objetivo: fomentar salir como plan, no delivery.")
b("<b>Nivel 1 - Prioridad:</b> 1 local, emprendimiento chico. Más puntos y beneficios.")
b("<b>Nivel 2 - Acompaña:</b> cadena uruguaya pequeña (2-5 locales, ej. La Pasiva). Participa con menos puntos/beneficios.")
b("<b>Nivel 3 - Excluido:</b> cadena internacional o grande. No participa.")
b("Solo consumo en salón. Pedidos por delivery no suman.")

p("2. Registro y aprobación de comercios", h1)
b("El negocio se registra solo: nombre, RUT/DGI, dirección, foto, horario de salón.")
b("Estado inicial: pendiente. <b>Aprobación manual</b> por el fundador en v1.")
b("Cada sucursal es independiente: su QR, recompensas, sellos y suscripción propios.")
b("Valida que sea gastronomía salón local antes de activar.")

p("3. Ranking tipo ELO", h1)
p("Todos arrancan en 1200 puntos. Se ajusta semanalmente. Mejores arriba en home, peores abajo, sin desaparecer. Boost de novedad 14 días para locales nuevos.", body)
data = [
 ["Factor", "Peso", "Qué mide"],
 ["Beneficio real", "30%", "Valor / esfuerzo (ej. cortado cada 6 > 15% cada 10)."],
 ["Reseñas / satisfacción", "30%", "Solo de quien sumó sello en salón."],
 ["Cumplimiento", "25%", "Valida rápido, respeta stock, no rechaza abusivamente."],
 ["Actividad / novedad", "15%", "Locales activos y nuevos suben; inactivos bajan."],
]
t = Table(data, colWidths=[45*mm, 18*mm, 107*mm])
t.setStyle(TableStyle([
 ("BACKGROUND", (0,0), (-1,0), HexColor("#F3F4F6")),
 ("GRID", (0,0), (-1,-1), 0.5, HexColor("#D1D5DB")),
 ("FONTSIZE", (0,0), (-1,-1), 9),
 ("VALIGN", (0,0), (-1,-1), "TOP"),
 ("LEFTPADDING", (0,0), (-1,-1), 6),
 ("RIGHTPADDING", (0,0), (-1,-1), 6),
]))
story.append(t)
b("Principio: el ranking orgánico no se vende. Sin Vidriera paga. Ninguna posición se puede comprar.")

p("4. Sellos en salón por QR", h1)
b("QR estático impreso por local (1 QR por sucursal, pegado en mesa/mostrador).")
b("Usuario escanea → PWA abre <i>/s/&lt;local_id&gt;</i> → el servidor genera un <b>claim_id único</b> por scan (UUID + hora + usuario). Un solo uso.")
b("Reglas: 1 sello por usuario/local/día, máx. 3 sellos/día total, máx. 10/semana, cooldown 4 hs entre sellos.")
b("Sin GPS obligatorio, sin login por WhatsApp. Cuenta con Google 1-tap. Huella de navegador básica + límites + detección de velocidad.")
b("Picos anómalos (ej. 40 sellos un martes 3am) bajan ELO y generan alerta para revisión manual.")
b("Modelo de datos mínimo: claim_id | local_id | user_id | emitido_en | expira_en | usado | validado_por.")

p("5. Reseña para el claim + Google", h1)
b("Para validar el sello: <b>rating 1-5 obligatorio (10 segundos) + comentario opcional</b>. Esa reseña interna alimenta el ELO y el perfil del local.")
b("Google: NO se puede publicar por API y Google prohíbe incentivar reseñas en Google. Solo botón opcional post-sello: 'Ayudá a este local en Google' que abre su ficha. No da puntos extra ni es obligatorio.")

p("6. Canje de recompensas", h1)
b("El comercio publica sus propias recompensas: qué da + cuántos sellos pide + stock mensual + vigencia.")
b("Usuario con sellos completos toca Canjear → puntos bloqueados → se genera <b>código único de canje</b> (ej. CAFE-4F8K + QR) con vencimiento 15 min, 1 solo uso, atado a user + local + recompensa.")
b("<b>Validación obligatoria desde dispositivo del local</b> (celu/tablet/PC logueado, PWA). 1 tap Validar/Rechazar. Sin validación por WhatsApp.")
b("Si no hay respuesta en 15 min: expira, puntos devueltos solos.")
p("Estados del canje", h2)
b("<b>PENDIENTE</b> (15 min): esperando respuesta del local.")
b("<b>VALIDADO:</b> local validó. Puntos quemados, premio entregado. Suma a cumplimiento.")
b("<b>RECHAZADO:</b> con motivo obligatorio (Sin stock / Fuera de horario / No está en salón / Código inválido). Puntos devueltos al instante.")
b("<b>EXPIRADO:</b> sin respuesta en 15 min. Puntos devueltos. Baja ELO de cumplimiento del local.")
b("<b>EN_DISPUTA:</b> usuario puede denunciar dentro de 24 hs tras Rechazado/Expirado (Estuve en salón y no me lo dieron / Me trataron mal + foto opcional).")
b("<b>RESUELTO:</b> revisión manual del fundador. A favor usuario: solo devolución de puntos (sin bonus en dinero). A favor local: se cierra sin castigo extra.")
b("Tope mensual por recompensa definido por el local: sin stock, el botón se apaga solo.")

p("7. Monetización (cerrada v1)", h1)
data2 = [
 ["Plan", "Precio", "Incluye"],
 ["Plan 1 Free", "$0", "1 recompensa, 20 sellos/mes, 1 QR, perfil + reseñas internas."],
 ["Plan 2", "$450 UYU/mes", "Hasta 3 recompensas, 100 sellos/mes, 1 QR, perfil + reseñas."],
 ["Plan 3", "$700 UYU/mes", "Hasta 10 recompensas, sellos ilimitados, 1 QR, perfil + reseñas."],
]
t2 = Table(data2, colWidths=[30*mm, 32*mm, 108*mm])
t2.setStyle(TableStyle([
 ("BACKGROUND", (0,0), (-1,0), HexColor("#F3F4F6")),
 ("GRID", (0,0), (-1,-1), 0.5, HexColor("#D1D5DB")),
 ("FONTSIZE", (0,0), (-1,-1), 9),
 ("VALIGN", (0,0), (-1,-1), "TOP"),
 ("LEFTPADDING", (0,0), (-1,-1), 6),
 ("RIGHTPADDING", (0,0), (-1,-1), 6),
]))
story.append(t2)
b("Validación desde dispositivo igual para todos los planes (requisito de entrada).")
b("Cada sucursal paga y opera independiente.")
b("Cobro con Mercado Pago (v1). Impagas: bajan a Free limitado, no se borran.")
b("El premio lo fondea 100% el local. Sin subsidio del proyecto.")
b("Nota de margen: comisión MP ~5-6% + IVA en UY. A $450 quedan ~$410 netos aprox.")

p("8. Home (cerrado v1)", h1)
b("Selector de barrio manual por default (Pocitos, Cordón, Ciudad Vieja, etc.) + buscador. GPS 100% opcional solo para cercanía.")
b("Orden: <b>ELO primero, cercanía después</b>. Un 1300 lejos va antes que un 1200 a 2 cuadras. Cercanía solo desempata dentro del mismo rango.")
b("Tarjeta: foto, nombre + barrio, beneficio principal (mejor valor/esfuerzo), rating interno, <b>mis sellos</b> (ej. 4/8), badge 'Valida en local'.")
b("Sin stock: abajo + opaco 'sin stock este mes'. Cerrado: abajo + horario de apertura.")
b("Filtros v1: tipo (café/bar/heladería) + abierto ahora + solo barriales (Nivel 1). Sin Vidriera.")

p("9. Perfil del local (cerrado v1)", h1)
b("Cabecera: foto, nombre, badge Nivel (Barrial / Cadena UY), rating + cantidad, barrio + dirección, horario + estado abierto/cerrado.")
b("Mi progreso + botón principal siempre visible: <b>Escanear QR</b>.")
b("Beneficios ordenados por mejor valor/esfuerzo, con stock (ej. quedan 12/30). Sin stock: opaco sin botón.")
b("Reseñas: <b>promedio + últimas 5</b> de quienes sellaron. Local solo puede reportar, no responder.")
b("Botón secundario 'Ayudá en Google' (abre ficha, opcional, sin puntos). Mapa simple. Aclara 'solo en salón'. Link '¿Cómo funciona el ranking?' + Reportar problema.")

p("10. Cuenta de usuario (cerrada v1)", h1)
b("<b>Login solo con Google en 1 tap</b>, sin contraseña.")
b("Primer ingreso pide <b>apodo + barrio favorito</b> para ordenar el home.")
b("1 cuenta = 1 dispositivo, sesión abierta en PWA. Límites anti-farming atados a la cuenta.")

p("11. Panel admin (cerrado v1)", h1)
b("<b>1. Aprobar locales:</b> pendientes con nombre, RUT, dirección, foto, horario → Aprobar/Rechazar. Al aprobar genera QR único + perfil.")
b("<b>2. Disputas:</b> bandeja EN_DISPUTA con historia + motivo + foto → Resolver favor usuario (devuelve puntos, sin bonus dinero) / favor local.")
b("<b>3. Alertas:</b> solo dentro del panel, sin mail. Picos raros, multi-cuenta mismo dispositivo, canjes sin stock.")
b("<b>4. Planes y cobros:</b> plan por sucursal (Free/450/700), sellos del mes, estado Mercado Pago, bajar a Free si no paga.")

p("12. Pendiente: validación en calle", h1)
b("Hablar con 5 locales con guía de 5 preguntas ya definida (origen clientes, recompra, promos previas, interés en tarjeta barrial, frenos). Meta: 3/5 dispuestos a pagar $450-700 para validar.")

p("13. Nombre y marca (cerrado)", h1)
b("<b>Nombre: micuadra</b> (minúscula). Hero rotativo: micuadra / mibarrio / miesquina.")
b("Estética fastfood americana: rojo #D9271B + crema #FFF6E9 + borde negro 2px + sombra dura, damero, marquee 'SOLO EN SALÓN', badges circulares y starburst. Refs: Five Guys, Kiddo / Luisas / Matts (AR).")
b("Tipo: títulos cartel condensed uppercase (Anton/Archivo Black), logo minúscula gruesa redondeada (Poppins/Nunito), cuerpo Plus Jakarta Sans.")

p("14. Stack técnico (cerrado v1)", h1)
b("Repo nuevo: <b>C:/Development/micuadra</b> (git init, Next.js 16 + TS + Tailwind v4 + pnpm). Build con <b>--webpack</b> (PWA no es compatible con Turbopack).")
b("PWA: @ducanh2912/next-pwa + manifest.webmanifest (instalable, cámara para QR).")
b("DB/Auth/Realtime/Storage: <b>Supabase free</b>. Auth Google 1-tap. Realtime para aviso de canje al dispositivo del local. Migración base: supabase/migrations/0001_init.sql (profiles, locales, sucursales, recompensas, claims_sellos, resenas, canjes, disputas + RLS base).")
b("Pagos: Mercado Pago NO integrado en v1 (primero validación manual, después SDK + webhook /api/mp/webhook).")
b("Deploy: Vercel Hobby (.vercel.app ahora, dominio propio después sin cambiar código). Envs: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, NEXT_PUBLIC_SITE_URL.")

p("15. Estado de infraestructura (17/09/2026)", h1)
b("<b>Supabase:</b> pendiente definir cuenta. kalabsuy@gmail.com bloqueada por supresión de emails (hard bounce/spam). Otras cuentas del fundador al tope de proyectos free. Acción: crear/liberar proyecto + configurar SMTP propio (Resend gratis) para no depender del mail compartido.")
b("<b>Vercel:</b> conexión por CLI iniciada (vercel whoami pide login). Pendiente: vercel login + link + deploy del repo micuadra.")
b("Landing v0.1 construida y con build pasando (hero rotativo + secciones cómo funciona + planes).")

sep()
p("Decisiones cerradas el 17/09/2026: enfoque salón + niveles, aprobación manual, ELO 30/30/25/15, QR estático + claim único + límites, estrellas obligatorias + Google opcional, canje con estados + validación en dispositivo + sin bonus, planes Free/450/700 + MP + sucursal independiente, home ELO+cercanía + barrio manual + mis sellos, perfil promedio+5 + solo reportar + escanear arriba, cuenta Google 1-tap + apodo/barrio, admin 4 bloques + alertas solo panel, sin Vidriera, nombre micuadra + hero rotativo + estética rojo/crema/borde negro, stack Next16+PWA+Supabase+Vercel, Supabase pendiente (cuenta bloqueada/tope free), Vercel pendiente login.", small)

doc.build(story)
print("OK " + OUT)
