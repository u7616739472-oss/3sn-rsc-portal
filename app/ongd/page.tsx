"use client"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Rocket, Send, CheckCircle2, ArrowRight, Loader2, BadgeCheck, Wallet, Calendar, Users, ClipboardList } from "lucide-react"

// NOTE: Reemplaza este placeholder por tu URL real del webhook de n8n.
// Ejemplo: const N8N_WEBHOOK_URL = "https://mi-n8n.xyz/webhook/abc123";
const N8N_WEBHOOK_URL = "AQUI_TU_URL_WEBHOOK_N8N" // <- CAMBIA ESTO

export default function ONGDPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    problemaPrincipal: "",
    descripcion: "",
    email: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [tareas, setTareas] = useState<Array<{
    id: string
    titulo: string
    descripcion?: string
    responsable?: string
    coste?: number
    inicio?: string
    fin?: string
    estado?: string
    categoria?: string
  }>>([])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      // 1) Enviar al webhook de n8n
      // Espera un JSON de respuesta con un array de tareas
      const resp = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tipo: "ongd", proyecto: formData }),
      })

      if (!resp.ok) {
        throw new Error(`Webhook n8n respondió ${resp.status}`)
      }

      const data = await resp.json().catch(() => ({}))
      const tareasGeneradas = Array.isArray(data?.tareas)
        ? data.tareas
        : // Si aún no tienes el flujo en n8n, simulamos unas tareas demo
          [
            {
              id: "t1",
              titulo: "Definir objetivos del proyecto",
              descripcion: "Alinear metas con ODS y necesidades de la comunidad",
              responsable: "Equipo ONGD",
              coste: 0,
              inicio: new Date().toISOString().slice(0, 10),
              fin: new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10),
              estado: "pendiente",
              categoria: "planificación",
            },
            {
              id: "t2",
              titulo: "Identificar financiadores",
              descripcion: "Mapeo de convocatorias y donantes afines",
              responsable: "Fundraising",
              coste: 0,
              inicio: new Date().toISOString().slice(0, 10),
              fin: new Date(Date.now() + 14 * 86400000).toISOString().slice(0, 10),
              estado: "pendiente",
              categoria: "financiación",
            },
            {
              id: "t3",
              titulo: "Diseñar plan de implementación",
              descripcion: "Cronograma, roles, hitos y presupuesto",
              responsable: "PMO",
              coste: 500,
              inicio: new Date().toISOString().slice(0, 10),
              fin: new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10),
              estado: "pendiente",
              categoria: "gestión",
            },
          ]

      setTareas(tareasGeneradas)
      setIsSuccess(true)

      // 2) Guardar proyecto + tareas en la base de datos (o simular si no existe backend)
      try {
        await fetch("/api/add-proyecto", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ proyecto: formData, tareas: tareasGeneradas }),
        })
      } catch (e) {
        console.warn("/api/add-proyecto no disponible, simulamos almacenamiento")
      }

      // Limpieza del formulario
      setFormData({ nombre: "", problemaPrincipal: "", descripcion: "", email: "" })
    } catch (err: any) {
      setError(err?.message ?? "Error al enviar. Inténtalo de nuevo.")
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setIsSuccess(false), 3000)
    }
  }

  return (
    <Layout>
      {/* Encabezado sección */}
      <section className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight text-white">ONGD</h1>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Card izquierda: valor */}
        <article className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white/10 to-transparent" />
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/10">
              <Rocket className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-orange-400">Impulsa tu proyecto</h3>
              <p className="text-sm text-white/80">Cuéntanos tu reto y te conectamos con financiación y aliados.</p>
            </div>
          </div>
          <ul className="mt-2 grid gap-2 text-xs text-white/80">
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> Acompañamiento experto</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> Plantillas y herramientas</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> Comunidad activa</li>
          </ul>
        </article>

        {/* Card derecha: formulario */}
        <form onSubmit={handleSubmit} className="relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white/10 to-transparent" />
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/10">
              <Send className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-orange-400">Enviar proyecto</h3>
          </div>

          <div className="grid gap-3">
            <input
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              placeholder="Nombre de la ONGD"
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/50 outline-none focus:border-white/20 focus:bg-white/10 transition"
            />
            <input
              value={formData.problemaPrincipal}
              onChange={(e) => setFormData({ ...formData, problemaPrincipal: e.target.value })}
              placeholder="Problema principal"
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/50 outline-none focus:border-white/20 focus:bg-white/10 transition"
            />
            <textarea
              value={formData.descripcion}
              onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
              placeholder="Descripción"
              className="min-h-[120px] rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/50 outline-none focus:border-white/20 focus:bg-white/10 transition"
            />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Email de contacto"
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/50 outline-none focus:border-white/20 focus:bg-white/10 transition"
            />
          </div>

          <div className="mt-4 flex items-center gap-3">
            <button
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-2 text-sm font-medium text-black shadow-lg shadow-orange-500/30 transition hover:bg-orange-400 disabled:opacity-60"
            >
              {isSubmitting ? (<><Loader2 className="h-4 w-4 animate-spin" /> Enviando...</>) : (<>Enviar <ArrowRight className="h-4 w-4" /></>)}
            </button>
            {isSuccess && <span className="text-sm text-emerald-300 inline-flex items-center gap-1"><BadgeCheck className="h-4 w-4" /> Enviado con éxito</span>}
            {error && <span className="text-sm text-red-300">{error}</span>}
          </div>

          <p className="mt-2 text-xs text-white/60">Consejo: añade contexto claro sobre tu reto, público objetivo y resultados esperados.</p>
          <p className="mt-1 text-[11px] text-white/50">Recuerda editar la constante N8N_WEBHOOK_URL con tu URL de webhook real.</p>
        </form>
      </div>

      {/* Listado de tareas generadas */}
      {tareas.length > 0 && (
        <section className="mt-10">
          <h3 className="mb-4 text-lg font-semibold">Tareas generadas</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tareas.map((t) => (
              <article key={t.id} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md transition hover:border-white/20 hover:bg-white/10">
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white/5 to-transparent" />
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ClipboardList className="h-4 w-4 text-orange-300" />
                    <h4 className="font-medium">{t.titulo}</h4>
                  </div>
                  {t.estado && (
                    <span className="rounded-full bg-emerald-400/20 px-2 py-0.5 text-xs text-emerald-300">
                      {t.estado}
                    </span>
                  )}
                </div>
                {t.descripcion && <p className="mb-3 text-sm text-white/80">{t.descripcion}</p>}
                <div className="flex flex-wrap items-center gap-2 text-[11px] text-white/70">
                  {t.categoria && <span className="rounded-full bg-white/10 px-2 py-0.5">#{t.categoria}</span>}
                  {typeof t.coste === "number" && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5"><Wallet className="h-3 w-3" /> {t.coste.toLocaleString()} €</span>
                  )}
                  {t.inicio && <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5"><Calendar className="h-3 w-3" /> {t.inicio}</span>}
                  {t.fin && <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5"><Calendar className="h-3 w-3" /> {t.fin}</span>}
                  {t.responsable && <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5"><Users className="h-3 w-3" /> {t.responsable}</span>}
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </Layout>
  )
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-black text-white">
      <video autoPlay muted loop playsInline className="fixed inset-0 h-full w-full object-cover opacity-30" src="/video/bg-loop.mp4" />
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/80" />

      <header className="relative z-20 w-full">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.svg" alt="3SN" width={36} height={36} className="drop-shadow-lg" />
            <span className="text-lg font-semibold tracking-tight">3SN</span>
          </Link>
          <nav className="hidden gap-6 md:flex">
            <Link href="/busqueda" className="text-sm text-white/80 hover:text-white">Búsqueda</Link>
            <Link href="/financiador" className="text-sm text-white/80 hover:text-white">Financiador</Link>
            <Link href="/ongd" className="text-sm text-white/80 hover:text-white">ONGD</Link>
          </nav>
        </div>
      </header>

      <main className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-24 pt-8 md:pt-16">
        {children}
      </main>

      <footer className="relative z-20 border-t border-white/10 bg-black/30 backdrop-blur supports-[backdrop-filter]:bg-black/30">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
          <Link href="/" className="flex items-center gap-2 text-white/70 hover:text-white">
            <Image src="/logo.svg" alt="3SN" width={24} height={24} />
            <span className="text-sm">© {new Date().getFullYear()} 3SN</span>
          </Link>
          <div className="flex items-center gap-4 text-xs text-white/60">
            <span>Privacidad</span>
            <span>Términos</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
