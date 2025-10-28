'use client'
import Link from 'next/link'
import { Search, Building2, GraduationCap, ShoppingCart, Stethoscope, Leaf } from 'lucide-react'

const proyectosEjemplo = [
  { id: 1, titulo: 'Sistema de Gestión Académica', descripcion: 'Plataforma integral para gestión de estudiantes, cursos y calificaciones', categoria: 'Educación', estado: 'En desarrollo' },
  { id: 2, titulo: 'App de Monitoreo Ambiental', descripcion: 'Sistema IoT para monitoreo de calidad del aire y condiciones ambientales', categoria: 'Medio Ambiente', estado: 'Completado' },
  { id: 3, titulo: 'Plataforma de E-commerce', descripcion: 'Tienda en línea con pagos e inventario', categoria: 'Comercio', estado: 'En desarrollo' },
  { id: 4, titulo: 'Sistema de Telemedicina', descripcion: 'Consultas médicas virtuales y gestión de historias clínicas', categoria: 'Salud', estado: 'En desarrollo' },
]

const SectorIcon = ({ sector }: { sector: string }) => {
  const cls = 'w-4 h-4'
  switch (sector) {
    case 'Educación':
      return <GraduationCap className={cls} />
    case 'Medio Ambiente':
      return <Leaf className={cls} />
    case 'Comercio':
      return <ShoppingCart className={cls} />
    case 'Salud':
      return <Stethoscope className={cls} />
    default:
      return <Building2 className={cls} />
  }
}

export default function SearchPage({ searchParams }: { searchParams?: { q?: string; categoria?: string } }) {
  const q = searchParams?.q?.toLowerCase?.() || ''
  const categoria = searchParams?.categoria
  const results = proyectosEjemplo.filter(p =>
    (!q || p.titulo.toLowerCase().includes(q) || p.descripcion.toLowerCase().includes(q)) &&
    (!categoria || p.categoria === categoria)
  )

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 text-white">
      <h1 className="text-3xl font-bold mb-6">Búsqueda de Proyectos</h1>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <form className="col-span-2">
          <div className="flex rounded-xl overflow-hidden border border-white/15 bg-white/10 backdrop-blur">
            <div className="pl-3 flex items-center text-cyan-300">
              <Search className="w-5 h-5" />
            </div>
            <input
              name="q"
              defaultValue={searchParams?.q || ''}
              placeholder="Buscar proyectos..."
              className="flex-1 bg-transparent px-3 py-3 outline-none text-slate-100 placeholder:text-slate-400"
            />
            <button className="px-4 py-3 bg-cyan-500/20 border-l border-white/10 hover:bg-cyan-500/30">Buscar</button>
          </div>
        </form>
        <form>
          <select name="categoria" defaultValue={categoria || ''} className="w-full bg-white/10 border border-white/15 rounded-xl px-3 py-3 backdrop-blur">
            <option value="">Todas las categorías</option>
            <option>Educación</option>
            <option>Medio Ambiente</option>
            <option>Comercio</option>
            <option>Salud</option>
          </select>
        </form>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {results.map((p) => (
          <div key={p.id} className="relative rounded-2xl p-6 bg-white/10 backdrop-blur-xl border border-white/15 shadow-lg">
            <div className="absolute -top-3 left-4 text-xs px-2 py-1 rounded-full bg-cyan-500 text-slate-900 font-bold">
              {p.estado}
            </div>
            <div className="flex items-center gap-3 mb-2">
              <SectorIcon sector={p.categoria} />
              <h3 className="text-lg font-semibold">{p.titulo}</h3>
              <span className="ml-auto text-xs px-2 py-1 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-200">{p.categoria}</span>
            </div>
            <p className="text-slate-200 text-sm mb-4">{p.descripcion}</p>
            <div className="flex gap-3 text-sm">
              <Link href={`/ongd`} className="text-cyan-200 hover:text-cyan-100">Ver ONGDs</Link>
              <Link href={`/financiador`} className="text-blue-200 hover:text-blue-100">Opciones de financiación</Link>
            </div>
          </div>
        ))}
      </div>

      {/* Separator */}
      <div className="my-12 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

      <p className="text-slate-200 text-sm">Resultados: {results.length}</p>
    </main>
  )
}
