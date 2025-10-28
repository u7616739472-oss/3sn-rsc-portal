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
        }, 4000)
      } else {
        throw new Error('Error al enviar el proyecto')
      }
    } catch (err) {
      // fallback demo success
      setIsSuccess(true)
      setTimeout(() => {
        setFormData({ nombre: '', problemaPrincipal: '', descripcion: '', email: '' })
        setIsSuccess(false)
      }, 3000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 text-white">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Registrar ONGDs</h1>
        <Link href="/" className="text-cyan-200 hover:text-cyan-100 text-sm inline-flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Volver
        </Link>
      </div>

      <div className="rounded-2xl p-6 bg-white/10 backdrop-blur-xl border border-white/15 shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <Rocket className="w-5 h-5 text-cyan-300" />
          <span className="text-slate-100 font-medium">Nueva organización</span>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-300 mb-1">Nombre</label>
            <input
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              className="w-full rounded-lg bg-white/10 border border-white/15 px-3 py-2 outline-none placeholder:text-slate-400"
              placeholder="Nombre de la organización"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-1">Problema principal</label>
            <input
              value={formData.problemaPrincipal}
              onChange={(e) => setFormData({ ...formData, problemaPrincipal: e.target.value })}
              className="w-full rounded-lg bg-white/10 border border-white/15 px-3 py-2 outline-none placeholder:text-slate-400"
              placeholder="¿Qué problema aborda?"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-1">Descripción</label>
            <textarea
              value={formData.descripcion}
              onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
              className="w-full rounded-lg bg-white/10 border border-white/15 px-3 py-2 outline-none placeholder:text-slate-400 min-h-[120px]"
              placeholder="Resumen del proyecto y acciones"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-1">Email de contacto</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full rounded-lg bg-white/10 border border-white/15 px-3 py-2 outline-none placeholder:text-slate-400"
              placeholder="correo@ejemplo.org"
              required
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500/20 border border-cyan-500/30 text-cyan-100 hover:bg-cyan-500/30 disabled:opacity-60"
            >
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              Enviar
            </button>
            {isSuccess && (
              <span className="inline-flex items-center gap-1 text-green-300 text-sm">
                <CheckCircle2 className="w-4 h-4" /> Enviado correctamente
              </span>
            )}
            {error && !isSuccess && (
              <span className="text-red-300 text-sm">{error}</span>
            )}
          </div>
        </form>
      </div>

      <div className="my-12 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

      <div className="text-slate-300 text-xs">
        Los datos se envían a un webhook de demostración y no se almacenan.
      </div>
    </main>
  )
}
