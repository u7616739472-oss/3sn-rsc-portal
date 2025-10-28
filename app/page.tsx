'use client'

import Link from 'next/link'
import { Rocket, Search, Building2, Globe, TrendingUp, Shield } from 'lucide-react'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-500/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>

        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:py-32">
          {/* Logo/Brand */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6">
              <Globe className="w-5 h-5 text-cyan-400" />
              <span className="text-cyan-300 font-semibold">3SN Portal RSC</span>
            </div>
          </div>

          {/* Hero Title */}
          <h1 className="text-center text-4xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-200 via-blue-300 to-purple-300 bg-clip-text text-transparent">
            Conectando Impacto Social<br />con Financiación Sostenible
          </h1>
          
          <p className="text-center text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto mb-12">
            Plataforma integral para ONGDs y financiadores que transforma proyectos sociales en
            oportunidades de inversión con impacto medible y trazabilidad completa.
          </p>

          {/* Stats Cards */}
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

          {/* Main Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            {/* ONGD Button */}
            <Link
              href="/ongd"
              className="group relative w-full sm:w-auto"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition"></div>
              <div className="relative bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-8 py-6 rounded-2xl flex items-center gap-4 transition shadow-2xl">
                <div className="bg-white/20 p-3 rounded-xl">
                  <Rocket className="w-8 h-8" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-xl">Soy ONGD</div>
                  <div className="text-cyan-100 text-sm">Registra tu proyecto social</div>
                </div>
              </div>
            </Link>

            {/* Financiador Button */}
            <Link
              href="/financiador"
              className="group relative w-full sm:w-auto"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition"></div>
              <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-8 py-6 rounded-2xl flex items-center gap-4 transition shadow-2xl">
                <div className="bg-white/20 p-3 rounded-xl">
                  <Search className="w-8 h-8" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-xl">Soy Financiador</div>
                  <div className="text-purple-100 text-sm">Busca proyectos de impacto</div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 px-4">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-white">
            ¿Cómo Funciona el Portal?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* For ONGDs */}
            <div className="bg-slate-900/60 backdrop-blur border border-cyan-500/20 rounded-2xl p-8 hover:border-cyan-400/40 transition">
              <div className="bg-cyan-500/10 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
                <Rocket className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Para ONGDs</h3>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold">1.</span>
                  <span>Registra tu proyecto con nombre, problema y descripción</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold">2.</span>
                  <span>Sistema genera automáticamente el Marco Lógico</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold">3.</span>
                  <span>Obtén líneas de financiación adaptadas a tu proyecto</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold">4.</span>
                  <span>Tu proyecto se publica para potenciales financiadores</span>
                </li>
              </ul>
            </div>

            {/* For Financiadores */}
            <div className="bg-slate-900/60 backdrop-blur border border-purple-500/20 rounded-2xl p-8 hover:border-purple-400/40 transition">
              <div className="bg-purple-500/10 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Para Financiadores</h3>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 font-bold">1.</span>
                  <span>Explora proyectos con búsqueda avanzada y filtros</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 font-bold">2.</span>
                  <span>Visualiza desglose de tareas y costes estimados</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 font-bold">3.</span>
                  <span>Consulta líneas de financiación disponibles</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 font-bold">4.</span>
                  <span>Conecta directamente con ONGDs de tu interés</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="relative py-20 px-4">
        <div className="mx-auto max-w-6xl">
          <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur border border-cyan-500/20 rounded-3xl p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Impacto Social + Transparencia + Tecnología
            </h2>
            <p className="text-slate-300 text-lg max-w-3xl mx-auto">
              Utilizamos inteligencia artificial para generar marcos lógicos profesionales y
              conectar automáticamente proyectos con las mejores fuentes de financiación.
              Todo con trazabilidad completa y metodología probada.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/60 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-8 text-center text-slate-400">
          <p className="mb-2">© {new Date().getFullYear()} 3SN Portal RSC - Plataforma de Impacto Social</p>
          <p className="text-sm">Desarrollado con Next.js + Tailwind CSS + IA Generativa</p>
        </div>
      </footer>
    </main>
  )
}
