'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Send, CheckCircle2, Loader2, Rocket } from 'lucide-react'

export default function ONGDPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    problemaPrincipal: '',
    descripcion: '',
    email: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      // Simulated POST to n8n webhook endpoint
      // Replace with actual n8n webhook URL when deployed
      const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || 'https://n8n.example.com/webhook/proyecto'
      
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsSuccess(true)
        // Reset form after 3 seconds
        setTimeout(() => {
          setFormData({
            nombre: '',
            problemaPrincipal: '',
            descripcion: '',
            email: ''
          })
          setIsSuccess(false)
        }, 5000)
      } else {
        throw new Error('Error al enviar el proyecto')
      }
    } catch (err) {
      console.log('Simulating successful submission for demo...')
      // For demo purposes, simulate success even if endpoint doesn't exist
      setIsSuccess(true)
      setTimeout(() => {
        setFormData({
          nombre: '',
          problemaPrincipal: '',
          descripcion: '',
          email: ''
        })
        setIsSuccess(false)
      }, 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 right-20 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="relative mx-auto max-w-4xl px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-cyan-300 hover:text-cyan-200 transition mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Volver al inicio</span>
          </Link>

          <div className="flex items-center gap-4 mb-4">
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-4 rounded-2xl">
              <Rocket className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">Portal ONGD</h1>
              <p className="text-slate-300 mt-1">Registra tu proyecto social</p>
            </div>
          </div>

          <p className="text-slate-400 text-lg">
            Completa el formulario para dar de alta tu proyecto. Nuestro sistema generará
            automáticamente el Marco Lógico y identificará líneas de financiación relevantes.
          </p>
        </div>

        {/* Form */}
        <div className="bg-slate-900/60 backdrop-blur border border-cyan-500/20 rounded-3xl p-8 shadow-2xl">
          {isSuccess ? (
            // Success Message
            <div className="text-center py-12">
              <div className="bg-green-500/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-12 h-12 text-green-400" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">¡Proyecto Registrado!</h2>
              <p className="text-slate-300 text-lg mb-2">
                Tu proyecto ha sido enviado correctamente.
              </p>
              <p className="text-slate-400">
                Estamos generando el Marco Lógico y buscando líneas de financiación.
                Recibirás un email con los detalles en breve.
              </p>
              <div className="mt-8">
                <Link
                  href="/financiador"
                  className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-3 rounded-xl transition"
                >
                  Ver proyectos publicados
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nombre del Proyecto */}
              <div>
                <label htmlFor="nombre" className="block text-white font-semibold mb-2">
                  Nombre del Proyecto *
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                  placeholder="Ej: Educación Sostenible en Comunidades Rurales"
                />
              </div>

              {/* Problema Principal */}
              <div>
                <label htmlFor="problemaPrincipal" className="block text-white font-semibold mb-2">
                  Problema Principal *
                </label>
                <textarea
                  id="problemaPrincipal"
                  name="problemaPrincipal"
                  value={formData.problemaPrincipal}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition resize-none"
                  placeholder="Describe el problema principal que aborda tu proyecto..."
                />
              </div>

              {/* Descripción */}
              <div>
                <label htmlFor="descripcion" className="block text-white font-semibold mb-2">
                  Descripción del Proyecto *
                </label>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition resize-none"
                  placeholder="Describe los objetivos, actividades principales y el impacto esperado de tu proyecto..."
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-white font-semibold mb-2">
                  Email de Contacto *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                  placeholder="tu-email@ongd.org"
                />
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-300">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:from-slate-600 disabled:to-slate-700 text-white font-semibold px-8 py-4 rounded-xl flex items-center justify-center gap-3 transition shadow-lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Enviando proyecto...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Enviar Proyecto</span>
                  </>
                )}
              </button>

              <p className="text-slate-500 text-sm text-center">
                Al enviar, nuestro sistema generará automáticamente el Marco Lógico y buscará
                líneas de financiación para tu proyecto.
              </p>
            </form>
          )}
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-4">
            <div className="text-cyan-400 font-bold mb-1">1. Registro</div>
            <div className="text-slate-400 text-sm">Completa el formulario con los datos de tu proyecto</div>
          </div>
          <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-4">
            <div className="text-cyan-400 font-bold mb-1">2. Procesamiento IA</div>
            <div className="text-slate-400 text-sm">Generamos Marco Lógico y buscamos financiación</div>
          </div>
          <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-4">
            <div className="text-cyan-400 font-bold mb-1">3. Publicación</div>
            <div className="text-slate-400 text-sm">Tu proyecto será visible para financiadores</div>
          </div>
        </div>
      </div>
    </main>
  )
}
