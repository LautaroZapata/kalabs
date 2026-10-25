# Kalabs — Reglas e Instrucciones para Agentes

## 🔒 Auditoría de Seguridad Obligatoria: Cloudflare security-audit-skill

**REGLA CRÍTICA Y OBLIGATORIA (SIEMPRE):**
Al terminar **cualquier prospecto o implementación nueva** que hagamos en el repositorio, es **estricta y obligatoriamente mandatorio** ejecutar la skill **`security-audit` de Cloudflare** (`cloudflare/security-audit-skill`) para auditar y comprobar **todas las vulnerabilidades** del código.

1. **Descarga y disponibilidad:**
   - La skill debe estar descargada y disponible en el entorno (ya ubicada en `.agents/skills/security-audit`, `~/.claude/skills/security-audit` y `~/.gemini/config/skills/security-audit`).
   - Si se inicializa en un entorno nuevo o máquina remota donde no esté presente, es obligatorio descargarla inmediatamente antes de continuar (`pnpm dlx skills add cloudflare/security-audit-skill -g -s security-audit` o clonando el repo en `.agents/skills/security-audit`).

2. **Uso sistemático en cada cierre:**
   - **SIEMPRE**, sin excepciones, al concluir el desarrollo de un prospecto, una landing page, un endpoint, un panel administrativo, una integración o cualquier nueva funcionalidad, se debe invocar `security-audit`.
   - Se debe inspeccionar y comprobar exhaustivamente todo vector de ataque: Server Actions, formularios, endpoints de API, inyecciones de código/SQL, Cross-Site Scripting (XSS), Server-Side Request Forgery (SSRF), Insecure Direct Object References (IDOR), exposición de API keys, credenciales o secretos en cliente/git, y políticas de autorización/autenticación.

3. **Criterio de no conformidad y cierre:**
   - **NINGÚN prospecto ni implementación se considera terminado, cerrado o listo para entrega sin haber completado la auditoría de seguridad y haber resuelto o remediado todas las vulnerabilidades detectadas.**

---

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
