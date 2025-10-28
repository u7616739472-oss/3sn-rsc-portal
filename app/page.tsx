'use client'
import Link from 'next/link'
import { Globe, Search, Building2, TrendingUp, Shield, Rocket } from 'lucide-react'

export default function HomePage() {
  return (
    <main className="min-h-screen text-white">
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
          <p className="text-center text-lg sm:text-xl text-slate-200 max-w-3xl mx-auto mb-12">
            Plataforma integral para ONGDs y financiadores que transforma proyectos sociales en
            oportunidades de inversión con impacto medible y trazabilidad completa.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16 max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur border border-cyan-500/20 rounded-xl p-6 text-center">
              <TrendingUp className="w-8 h-8 text-cyan-300 mx-auto mb-2" />
              <div className="text-3xl font-bold text-cyan-200">150+</div>
              <div className="text-slate-300 text-sm">Proyectos Activos</div>
            </div>
            <div className="bg-white/5 backdrop-blur border border-blue-500/20 rounded-xl p-6 text-center">
              <Building2 className="w-8 h-8 text-blue-300 mx-auto mb-2" />
              <div className="text-3xl font-bold text-blue-200">80+</div>
              <div className="text-slate-300 text-sm">Financiadores</div>
            </div>
            <div className="bg-white/5 backdrop-blur border border-purple-500/20 rounded-xl p-6 text-center">
              <Shield className="w-8 h-8 text-purple-300 mx-auto mb-2" />
              <div className="text-3xl font-bold text-purple-200">95%</div>
              <div className="text-slate-300 text-sm">Proyectos con KPIs</div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex justify-center gap-4">
            <Link href="/busqueda" className="px-5 py-3 rounded-lg bg-cyan-500/20 border border-cyan-500/30 text-cyan-100 hover:bg-cyan-500/30">
              Explorar Proyectos
            </Link>
            <Link href="/financiador" className="px-5 py-3 rounded-lg bg-blue-500/20 border border-blue-500/30 text-blue-100 hover:bg-blue-500/30">
              Soy Financiador
            </Link>
          </div>
        </div>
      </section>

      {/* Sections */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl font-semibold mb-6 text-cyan-200">Destacados</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-lg shadow-cyan-900/20"
            >
              <div className="absolute -top-3 -right-3 bg-cyan-500 text-slate-900 text-xs font-bold px-2 py-1 rounded-full">
                Nuevo
              </div>
              <div className="flex items-center gap-3 mb-3">
                <Rocket className="w-5 h-5 text-cyan-300" />
                <span className="text-slate-100 font-medium">Proyecto #{i}</span>
              </div>
              <p className="text-slate-300 text-sm mb-4">
                Iniciativa con alto impacto social en sostenibilidad, educación y comunidad.
              </p>
              <div className="flex items-center gap-2 text-xs">
                <span className="px-2 py-1 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-200">
                  Educación
                </span>
                <span className="px-2 py-1 rounded bg-blue-500/10 border border-blue-500/20 text-blue-200">
                  Sostenible
                </span>
                <span className="px-2 py-1 rounded bg-purple-500/10 border border-purple-500/20 text-purple-200">
                  KPI
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Separator */}
      <div className="mx-auto max-w-6xl px-4">
        <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
      </div>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl font-semibold mb-6 text-cyan-200">Secciones</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/busqueda" className="group rounded-2xl p-6 border border-white/15 bg-white/5 backdrop-blur hover:bg-white/10 transition">
            <div className="flex items-center gap-3 mb-2">
              <Search className="w-5 h-5 text-cyan-300" />
              <span className="text-slate-100 font-medium">Búsqueda</span>
            </div>
            <p className="text-slate-300 text-sm">Explora proyectos por área, impacto y necesidades.</p>
          </Link>
          <Link href="/ongd" className="group rounded-2xl p-6 border border-white/15 bg-white/5 backdrop-blur hover:bg-white/10 transition">
            <div className="flex items-center gap-3 mb-2">
              <Shield className="w-5 h-5 text-green-300" />
              <span className="text-slate-100 font-medium">ONGDs</span>
            </div>
            <p className="text-slate-300 text-sm">Directorio de organizaciones con verificación y métricas.</p>
          </Link>
          <Link href="/financiador" className="group rounded-2xl p-6 border border-white/15 bg-white/5 backdrop-blur hover:bg-white/10 transition">
            <div className="flex items-center gap-3 mb-2">
              <Building2 className="w-5 h-5 text-blue-300" />
              <span className="text-slate-100 font-medium">Financiadores</span>
            </div>
            <p className="text-slate-300 text-sm">Programas de financiación y convocatorias activas.</p>
          </Link>
        </div>
      </section>
    </main>
  )
}
