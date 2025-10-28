'use client'
import Link from 'next/link'
import Image from 'next/image'
import { Rocket, Send, CheckCircle2, ArrowRight } from 'lucide-react'
import { useState } from 'react'

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
      <main className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-24 pt-8 md:pt-16">{children}</main>
      <footer className="relative z-20 border-t border-white/10 bg-black/30 backdrop-blur supports-[backdrop-filter]:bg-black/30">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
          <Link href="/" className="flex items-center gap-2 text-white/70 hover:text-white">
            <Image src="/logo.svg" alt="3SN" width={24} height={24} />
            <span className="text-sm">© {new Date().getFullYear()} 3SN</span>
          </Link>
          <div className="flex items-center gap-4 text-xs text-white/60"><span>Privacidad</span><span>Términos</span></div>
        </div>
      </footer>
    </div>
  )
}

export default function ONGDPage() {
  const [formData, setFormData] = useState({ nombre: '', problemaPrincipal: '', descripcion: '', email: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      // Demo submit
      await new Promise((res) => setTimeout(res, 800))
      setIsSuccess(true)
      setFormData({ nombre: '', problemaPrincipal: '', descripcion: '', email: '' })
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setIsSuccess(false), 3000)
    }
  }

  return (
    <Layout>
      <section className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight text-white">ONGD</h1>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
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

        <form onSubmit={handleSubmit} className="relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white/10 to-transparent" />
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/10">
              <Send className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-orange-400">Enviar proyecto</h3>
          </div>

          <div className="grid gap-3">
            <input value={formData.nombre} onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} placeholder="Nombre de la ONGD" className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/50 outline-none focus:border-white/20 focus:bg-white/10" />
            <input value={formData.problemaPrincipal} onChange={(e) => setFormData({ ...formData, problemaPrincipal: e.target.value })} placeholder="Problema principal" className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/50 outline-none focus:border-white/20 focus:bg-white/10" />
            <textarea value={formData.descripcion} onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })} placeholder="Descripción" className="min-h-[120px] rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/50 outline-none focus:border-white/20 focus:bg-white/10" />
            <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="Email de contacto" className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/50 outline-none focus:border-white/20 focus:bg-white/10" />
          </div>

          <div className="mt-4 flex items-center gap-3">
            <button disabled={isSubmitting} className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-2 text-sm font-medium text-black shadow-lg shadow-orange-500/30 transition hover:bg-orange-400 disabled:opacity-60">
              {isSubmitting ? 'Enviando...' : 'Enviar'} <ArrowRight className="h-4 w-4" />
            </button>
            {isSuccess && <span className="text-sm text-emerald-300">Enviado con éxito</span>}
          </div>
        </form>
      </div>
    </Layout>
  )
}
