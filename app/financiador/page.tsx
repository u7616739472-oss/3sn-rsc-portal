'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Search, Filter, Euro, Users, CheckCircle2, XCircle } from 'lucide-react'

// Types representing DB structure
export type Tarea = {
  id: string
  nombre: string
  costeEstimado: number
}

export type Proyecto = {
  id: string
  nombre: string
  problemaPrincipal: string
  solucionPrincipal: string
  tareas: Tarea[]
  financiador?: string | null // null = sin financiador
  emailContacto?: string
  lineasFinanciacion?: string[] // etiquetas de líneas
}

// Mock DB dataset (replace later with DB fetch)
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
    lineasFinanciacion: ['Educación', 'ODS4', 'Rural']
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
    lineasFinanciacion: ['Agua', 'Salud', 'ODS6']
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
    lineasFinanciacion: ['Reciclaje', 'ODS12', 'Urbano']
  },
]

export default function FinanciadorPage() {
  const [q, setQ] = useState('')
  const [soloSinFinanciador, setSoloSinFinanciador] = useState(false)
  const [etiqueta, setEtiqueta] = useState('')

  const resultados = useMemo(() => {
    return proyectosMock.filter((p) => {
      const matchTexto = [p.nombre, p.problemaPrincipal, p.solucionPrincipal, ...(p.lineasFinanciacion || [])]
        .join(' ') 
        .toLowerCase()
        .includes(q.toLowerCase())

      const matchFinanciador = !soloSinFinanciador ? true : !p.financiador
      const matchEtiqueta = etiqueta ? (p.lineasFinanciacion || []).includes(etiqueta) : true
      return matchTexto && matchFinanciador && matchEtiqueta
    })
  }, [q, soloSinFinanciador, etiqueta])

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-24 left-24 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-24 right-24 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-purple-300 hover:text-purple-200 transition mb-6">
            <ArrowLeft className="w-5 h-5" />
            <span>Volver al inicio</span>
          </Link>

          <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
            <div>
              <h1 className="text-4xl font-bold text-white">Buscador de Proyectos</h1>
              <p className="text-slate-300 mt-1">Explora proyectos y líneas de financiación</p>
            </div>
          </div>

          {/* Search + Filters */}
          <div className="bg-slate-900/60 backdrop-blur border border-purple-500/20 rounded-2xl p-4 flex flex-col md:flex-row gap-3 items-stretch md:items-center">
            <div className="flex-1 flex items-center gap-3 bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-2">
              <Search className="w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar por nombre, problema, solución o línea..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="w-full bg-transparent text-white placeholder-slate-500 outline-none"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-400 text-sm">Línea</span>
              <select
                value={etiqueta}
                onChange={(e) => setEtiqueta(e.target.value)}
                className="bg-slate-900/60 border border-slate-800 rounded-lg px-3 py-2 text-white"
              >
                <option value="">Todas</option>
                {Array.from(new Set(proyectosMock.flatMap(p => p.lineasFinanciacion || []))).map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
            </div>

            <label className="inline-flex items-center gap-2 bg-slate-900/60 border border-slate-800 rounded-xl px-3 py-2 text-white">
              <input
                type="checkbox"
                checked={soloSinFinanciador}
                onChange={(e) => setSoloSinFinanciador(e.target.checked)}
              />
              <span className="text-sm">Solo sin financiador</span>
            </label>
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resultados.map((p) => {
            const total = p.tareas.reduce((acc, t) => acc + t.costeEstimado, 0)
            const tieneFin = Boolean(p.financiador)
            return (
              <article key={p.id} className="group rounded-2xl bg-slate-900/60 border border-purple-500/20 hover:border-purple-400/40 transition overflow-hidden">
                <div className="h-28 bg-gradient-to-br from-purple-500/20 to-cyan-500/20"></div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex flex-wrap gap-2">
                      {(p.lineasFinanciacion || []).map(tag => (
                        <span key={tag} className="text-xs px-2 py-1 rounded bg-purple-600/20 text-purple-300">{tag}</span>
                      ))}
                    </div>
                    <span className={`inline-flex items-center gap-1 text-xs ${tieneFin ? 'text-green-300' : 'text-slate-400'}`}>
                      {tieneFin ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                      {tieneFin ? 'Con financiador' : 'Sin financiador'}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-white">{p.nombre}</h3>
                  <p className="mt-1 text-slate-300 text-sm">Problema: {p.problemaPrincipal}</p>
                  <p className="text-slate-400 text-sm">Solución: {p.solucionPrincipal}</p>

                  <div className="mt-3 space-y-1">
                    {p.tareas.map((t) => (
                      <div key={t.id} className="flex items-center justify-between text-sm text-slate-300">
                        <span className="truncate">• {t.nombre}</span>
                        <span className="inline-flex items-center gap-1 text-cyan-300"><Euro className="w-4 h-4" />{t.costeEstimado.toLocaleString()} €</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center justify-between text-sm">
                    <span className="inline-flex items-center gap-2 text-slate-400">
                      <Users className="w-4 h-4" /> {p.emailContacto || '—'}
                    </span>
                    <span className="inline-flex items-center gap-1 text-cyan-300"><Euro className="w-4 h-4" />Total: {total.toLocaleString()} €</span>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <a href={`mailto:${p.emailContacto || ''}`} className="flex-1 text-center bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg transition">
                      Contactar ONGD
                    </a>
                    <button className="px-4 py-2 rounded-lg border border-purple-500/30 text-purple-200 hover:bg-purple-500/10 transition">
                      Ver detalles
                    </button>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        {/* DB Schema Reference (visual) */}
        <div className="mt-12 bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-3">Estructura de Datos (para BD)</h2>
          <pre className="text-slate-300 text-sm overflow-auto">
{`Proyecto {
  id: string,
  nombre: string,
  problemaPrincipal: string,
  solucionPrincipal: string,
  tareas: Array<{ id: string, nombre: string, costeEstimado: number }>,
  financiador?: string | null,
  emailContacto?: string,
  lineasFinanciacion?: string[]
}
`}
          </pre>
        </div>
      </div>
    </main>
  )
}
