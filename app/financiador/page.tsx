'use client'
import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Globe, ArrowLeft, Search, Euro, Users, CheckCircle2, XCircle } from 'lucide-react'

type Tarea = { id: string; nombre: string; costeEstimado: number }
type Proyecto = {
  id: string
  nombre: string
  problemaPrincipal: string
  solucionPrincipal: string
  tareas: Tarea[]
  financiador?: string | null
  emailContacto?: string
  lineasFinanciacion?: string[]
}

const proyectosMock: Proyecto[] = [
  {
    id: 'p1',
    nombre: 'Educación Sostenible en Comunidades Rurales',
    problemaPrincipal: 'Bajo acceso a educación ambiental en zonas rurales',
    solucionPrincipal: 'Programa de capacitación docente y talleres comunitarios',
    tareas: [
      { id: 't1', nombre: 'Formación de 20 docentes', costeEstimado: 6000 },
      { id: 't2', nombre: 'Talleres a 300 familias', costeEstimado: 8000 },
      { id: 't3', nombre: 'Materiales y kits educativos', costeEstimado: 4000 },
    ],
    financiador: null,
    emailContacto: 'contacto@ongd.org',
    lineasFinanciacion: ['Educación', 'ODS4', 'Rural'],
  },
  {
    id: 'p2',
    nombre: 'Acceso a Agua Limpia - Región Sierra',
    problemaPrincipal: 'Contaminación de fuentes de agua locales',
    solucionPrincipal: 'Instalación de sistemas de filtración comunitaria',
    tareas: [
      { id: 't1', nombre: 'Estudio de calidad de agua', costeEstimado: 3000 },
      { id: 't2', nombre: 'Compra de filtros y repuestos', costeEstimado: 9000 },
      { id: 't3', nombre: 'Capacitación de comités de agua', costeEstimado: 3500 },
    ],
    financiador: 'Fundación Aqua',
    emailContacto: 'agua@ongd.org',
    lineasFinanciacion: ['Agua', 'Salud', 'ODS6'],
  },
  {
    id: 'p3',
    nombre: 'Economía Circular en Barrios Urbanos',
    problemaPrincipal: 'Baja tasa de reciclaje y educación ambiental',
    solucionPrincipal: 'Incentivos y campañas de reciclaje con comercios locales',
    tareas: [
      { id: 't1', nombre: 'Campaña de sensibilización', costeEstimado: 2500 },
      { id: 't2', nombre: 'App de incentivos y tokens', costeEstimado: 7000 },
      { id: 't3', nombre: 'Puntos de reciclaje inteligentes', costeEstimado: 10000 },
    ],
    financiador: null,
    emailContacto: 'reciclaje@ongd.org',
    lineasFinanciacion: ['Reciclaje', 'ODS12', 'Urbano'],
  },
]

export default function FinanciadorPage() {
  const totalPresupuesto = useMemo(
    () => proyectosMock.reduce((acc, p) => acc + p.tareas.reduce((a, t) => a + t.costeEstimado, 0), 0),
    []
  )

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 text-white">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Financiadores</h1>
        <Link href="/" className="text-cyan-200 hover:text-cyan-100 text-sm inline-flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Volver
        </Link>
      </div>

      {/* Overview cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <div className="rounded-xl p-5 bg-white/10 backdrop-blur border border-white/15">
          <Euro className="w-5 h-5 text-cyan-300" />
          <div className="mt-2 text-2xl font-semibold text-cyan-100">
            € {totalPresupuesto.toLocaleString('es-ES')}
          </div>
          <div className="text-slate-300 text-sm">Presupuesto total requerido</div>
        </div>
        <div className="rounded-xl p-5 bg-white/10 backdrop-blur border border-white/15">
          <Users className="w-5 h-5 text-blue-300" />
          <div className="mt-2 text-2xl font-semibold text-blue-100">3</div>
          <div className="text-slate-300 text-sm">Proyectos verificados</div>
        </div>
        <div className="rounded-xl p-5 bg-white/10 backdrop-blur border border-white/15">
          <CheckCircle2 className="w-5 h-5 text-green-300" />
          <div className="mt-2 text-2xl font-semibold text-green-100">2</div>
          <div className="text-slate-300 text-sm">Líneas de financiación sugeridas</div>
        </div>
      </div>

      {/* Projects list */}
      <div className="space-y-6">
        {proyectosMock.map((p) => {
          const coste = p.tareas.reduce((a, t) => a + t.costeEstimado, 0)
          return (
            <div key={p.id} className="rounded-2xl p-6 bg-white/10 backdrop-blur-xl border border-white/15 shadow-lg">
              <div className="flex items-center gap-3 mb-2">
                <Globe className="w-4 h-4 text-cyan-300" />
                <h3 className="text-lg font-semibold">{p.nombre}</h3>
                <span className="ml-auto text-xs px-2 py-1 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-200">
                  € {coste.toLocaleString('es-ES')}
                </span>
              </div>
              <p className="text-slate-200 text-sm mb-3">{p.problemaPrincipal}</p>
              <p className="text-slate-300 text-sm mb-4">{p.solucionPrincipal}</p>
              <div className="flex flex-wrap gap-2 text-xs mb-4">
                {p.lineasFinanciacion?.map((l) => (
                  <span key={l} className="px-2 py-1 rounded bg-blue-500/10 border border-blue-500/20 text-blue-200">
                    {l}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-3 text-sm">
                {p.financiador ? (
                  <span className="inline-flex items-center gap-1 text-green-300">
                    <CheckCircle2 className="w-4 h-4" /> Vinculado: {p.financiador}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-slate-300">
                    <XCircle className="w-4 h-4" /> Sin financiador asignado
                  </span>
                )}
                <a href={`mailto:${p.emailContacto}`} className="ml-auto text-cyan-200 hover:text-cyan-100">
                  Contactar
                </a>
              </div>
            </div>
          )
        })}
      </div>

      {/* Separator */}
      <div className="my-12 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

      <p className="text-slate-300 text-xs">Actualizado automáticamente con datos de ejemplo.</p>
    </main>
  )
}
