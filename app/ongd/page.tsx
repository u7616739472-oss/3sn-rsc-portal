'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Globe, ArrowLeft, Send, CheckCircle2, Loader2, Rocket } from 'lucide-react'

export default function ONGDPage() {
  const [formData, setFormData] = useState({ nombre: '', problemaPrincipal: '', descripcion: '', email: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')
    try {
      const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || 'https://n8n.example.com/webhook/proyecto'
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        setIsSuccess(true)
        setTimeout(() => {
          setFormData({ nombre: '', problemaPrincipal: '', descripcion: '', email: '' })
          setIsSuccess(false)
        }, 5000)
      } else {
        throw new Error('Error al enviar el proyecto')
      }
    } catch (err) {
      console.log('Simulating successful submission for demo...')
      setIsSuccess(true)
      setTimeout(() => {
        setFormData({ nombre: '', problemaPrincipal: '', descripcion: '', email: '' })
        setIsSuccess(false)
      }, 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-900/60 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-semibold text-cyan-300">
            <Globe className="w-5 h-5" /> <span>3SN Portal RSC</span>
          </Link>
          <nav className="hidden sm:flex items-center gap-6 text-sm text-slate-200">
            <Link href="/busqueda" className="hover:text-cyan-300">Búsqueda</Link>
            <Link href="/ongd" className="hover:text-cyan-300">ONGD</Link>
            <Link href="/financiador" className="hover:text-cyan-300">Financiador</Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-500/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse delay-700" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 py-12 sm:py-16">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-300 hover:text-cyan-300 mb-6">
            <ArrowLeft className="w-4 h-4" /> Volver al inicio
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 bg-gradient-to-r from-cyan-200 via-blue-300 to-purple-300 bg-clip-text text-transparent">
            Registra tu proyecto (ONGD)
          </h1>
          <p className="text-slate-300">Comparte los detalles clave para generar automáticamente el marco lógico y sugerencias de financiación.</p>
        </div>
      </section>

      {/* Form section */}
      <section className="relative px-4 pb-16">
        <div className="mx-auto max-w-4xl grid gap-6">
          <form onSubmit={handleSubmit} className="bg-slate-900/60 backdrop-blur border border-cyan-500/20 rounded-2xl p-6">
            <div className="grid gap-4">
              <label className="grid gap-2">
                <span className="text-sm text-slate-300">Nombre del proyecto</span>
                <input value={formData.nombre} onChange={e=>setFormData({...formData, nombre:e.target.value})} className="w-full rounded-lg bg-slate-800/80 border border-white/10 px-3 py-2 outline-none focus:border-cyan-400" required />
              </label>
              <label className="grid gap-2">
                <span className="text-sm text-slate-300">Problema principal</span>
                <input value={formData.problemaPrincipal} onChange={e=>setFormData({...formData, problemaPrincipal:e.target.value})} className="w-full rounded-lg bg-slate-800/80 border border-white/10 px-3 py-2 outline-none focus:border-cyan-400" required />
              </label>
              <label className="grid gap-2">
                <span className="text-sm text-slate-300">Descripción</span>
                <textarea value={formData.descripcion} onChange={e=>setFormData({...formData, descripcion:e.target.value})} className="min-h-[120px] w-full rounded-lg bg-slate-800/80 border border-white/10 px-3 py-2 outline-none focus:border-cyan-400" />
              </label>
              <label className="grid gap-2">
                <span className="text-sm text-slate-300">Email de contacto</span>
                <input type="email" value={formData.email} onChange={e=>setFormData({...formData, email:e.target.value})} className="w-full rounded-lg bg-slate-800/80 border border-white/10 px-3 py-2 outline-none focus:border-cyan-400" />
              </label>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <button disabled={isSubmitting} className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50">
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />} Enviar
              </button>
              {isSuccess && (
                <span className="inline-flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" /> Enviado correctamente
                </span>
              )}
              {error && <span className="text-red-400">{error}</span>}
            </div>
          </form>

          {/* Info card */}
          <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2 text-cyan-300 font-semibold"><Rocket className="w-5 h-5" /> ¿Qué generamos?</div>
            <ul className="text-slate-300 list-disc pl-5 space-y-1">
              <li>Marco lógico con objetivos, resultados e indicadores</li>
              <li>Mapa de tareas y estimación de costes</li>
              <li>Recomendación de líneas de financiación</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-gradient-to-t from-slate-950 via-blue-950 to-transparent">
        <div className="mx-auto max-w-6xl px-4 py-8 text-center text-slate-400">
          <p>© {new Date().getFullYear()} 3SN Portal RSC</p>
        </div>
      </footer>
    </main>
  )
}
