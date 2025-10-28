'use client'

import Link from 'next/link'
import { Globe, Search, Building2, TrendingUp, Shield, Rocket } from 'lucide-react'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-900/60 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-semibold text-cyan-300">
            <Globe className="w-5 h-5" />
            <span>3SN Portal RSC</span>
          </Link>
          <nav className="hidden sm:flex items-center gap-6 text-sm text-slate-200">
            <Link href="/busqueda" className="hover:text-cyan-300">Búsqueda</Link>
            <Link href="/ongd" className="hover:text-cyan-300">ONGD</Link>
            <Link href="/financiador" className="hover:text-cyan-300">Financiador</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Animated background blobs */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-500/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse delay-700" />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:py-32">
          {/* Brand pill */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
              <Globe className="w-5 h-5 text-cyan-400" />
              <span className="text-cyan-300 font-semibold">3SN Portal RSC</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-center text-4xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-200 via-blue-300 to-purple-300 bg-clip-text text-transparent">
            Conectando Impacto Social con Financiación Sostenible
          </h1>
          <p className="text-center text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto mb-12">
            Plataforma integral para ONGDs y financiadores que transforma proyectos sociales en
            oportunidades de inversión con impacto medible y trazabilidad completa.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16 max-w-4xl mx-auto">
            <div className="bg-slate-900/60 backdrop-blur border border-cyan-500/20 rounded-xl p-6 text-center">
              <TrendingUp className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
              <div className="text-3xl font-bold text-cyan-300">150+</div>
              <div className="text-slate-400 text-sm">Proyectos Activos</div>
            </div>
            <div className="bg-slate-900/60 backdrop-blur border border-blue-500/20 rounded-xl p-6 text-center">
              <Building2 className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <div className="text-3xl font-bold text-blue-300">80+</div>
              <div className="text-slate-400 text-sm">Financiadores</div>
            </div>
            <div className="bg-slate-900/60 backdrop-blur border border-purple-500/20 rounded-xl p-6 text-center">
              <Shield className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <div className="text-3xl font-bold text-purple-300">€2.5M</div>
              <div className="text-slate-400 text-sm">Financiación Total</div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href="/ongd"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-medium shadow-lg shadow-cyan-900/30"
            >
              <Rocket className="w-5 h-5" /> Soy ONGD
            </Link>
            <Link
              href="/financiador"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium shadow-lg shadow-blue-900/30"
            >
              <Search className="w-5 h-5" /> Soy Financiador
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="relative py-16 px-4 bg-gradient-to-b from-transparent to-blue-950/40">
        <div className="mx-auto max-w-6xl grid gap-6 sm:grid-cols-2">
          {/* For ONGDs */}
          <div className="bg-slate-900/60 backdrop-blur border border-cyan-500/20 rounded-2xl p-8 hover:border-cyan-400/40 transition">
            <div className="bg-cyan-500/10 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
              <Rocket className="w-8 h-8 text-cyan-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Para ONGDs</h3>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-start gap-3"><span className="text-cyan-400 font-bold">1.</span> Registra tu proyecto con nombre, problema y descripción</li>
              <li className="flex items-start gap-3"><span className="text-cyan-400 font-bold">2.</span> Sistema genera automáticamente el Marco Lógico</li>
              <li className="flex items-start gap-3"><span className="text-cyan-400 font-bold">3.</span> Obtén líneas de financiación adaptadas a tu proyecto</li>
              <li className="flex items-start gap-3"><span className="text-cyan-400 font-bold">4.</span> Tu proyecto se publica para potenciales financiadores</li>
            </ul>
          </div>
          {/* For Financiadores */}
          <div className="bg-slate-900/60 backdrop-blur border border-purple-500/20 rounded-2xl p-8 hover:border-purple-400/40 transition">
            <div className="bg-purple-500/10 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Para Financiadores</h3>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-start gap-3"><span className="text-purple-400 font-bold">1.</span> Explora proyectos con búsqueda avanzada y filtros</li>
              <li className="flex items-start gap-3"><span className="text-purple-400 font-bold">2.</span> Visualiza desglose de tareas y costes estimados</li>
              <li className="flex items-start gap-3"><span className="text-purple-400 font-bold">3.</span> Consulta líneas de financiación disponibles</li>
              <li className="flex items-start gap-3"><span className="text-purple-400 font-bold">4.</span> Conecta directamente con ONGDs de tu interés</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="relative py-20 px-4">
        <div className="mx-auto max-w-6xl">
          <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur border border-cyan-500/20 rounded-3xl p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Impacto Social + Transparencia + Tecnología</h2>
            <p className="text-slate-300 text-lg max-w-3xl mx-auto">
              Utilizamos inteligencia artificial para generar marcos lógicos profesionales y
              conectar automáticamente proyectos con las mejores fuentes de financiación.
              Todo con trazabilidad completa y metodología probada.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-gradient-to-t from-slate-950 via-blue-950 to-transparent">
        <div className="mx-auto max-w-6xl px-4 py-8 text-center text-slate-400">
          <p className="mb-2">© {new Date().getFullYear()} 3SN Portal RSC - Plataforma de Impacto Social</p>
          <div className="flex items-center justify-center gap-4 text-slate-300">
            <Link href="#" className="hover:text-cyan-300">Twitter</Link>
            <Link href="#" className="hover:text-cyan-300">GitHub</Link>
            <Link href="#" className="hover:text-cyan-300">LinkedIn</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
