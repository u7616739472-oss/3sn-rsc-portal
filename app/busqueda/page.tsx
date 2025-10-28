'use client'
import Link from 'next/link'
import Image from 'next/image'
import { Globe, Search, Building2, GraduationCap, ShoppingCart, Stethoscope, Leaf } from 'lucide-react'

interface SearchPageProps {
  searchParams: { q?: string; categoria?: string }
}

const proyectosEjemplo = [
  {
    id: 1,
    titulo: 'Sistema de Gestión Académica',
    descripcion: 'Plataforma integral para gestión de estudiantes, cursos y calificaciones',
    categoria: 'Educación',
    tecnologias: ['React', 'Node.js', 'PostgreSQL'],
    estado: 'En desarrollo',
    imagen: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=800&fit=crop',
  },
  {
    id: 2,
    titulo: 'App de Monitoreo Ambiental',
    descripcion: 'Sistema IoT para monitoreo de calidad del aire y condiciones ambientales',
    categoria: 'Medio Ambiente',
    tecnologias: ['Python', 'Arduino', 'MongoDB'],
    estado: 'Completado',
    imagen: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=1200&h=800&fit=crop',
  },
  {
    id: 3,
    titulo: 'Plataforma de E-commerce',
    descripcion: 'Tienda en línea con sistema de pagos y gestión de inventario',
    categoria: 'Comercio',
    tecnologias: ['Next.js', 'Stripe', 'MySQL'],
    estado: 'En desarrollo',
    imagen: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=1200&h=800&fit=crop',
  },
  {
    id: 4,
    titulo: 'Sistema de Telemedicina',
    descripcion: 'Plataforma para consultas médicas virtuales y gestión de historias clínicas',
    categoria: 'Salud',
    tecnologias: ['Vue.js', 'Express', 'MongoDB'],
    estado: 'En desarrollo',
    imagen: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&h=800&fit=crop',
  },
]

const SectorIcon = ({ sector }: { sector: string }) => {
  const cls = 'w-5 h-5'
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

export default function SearchPage({ searchParams }: SearchPageProps) {
  const q = (searchParams.q || '').toLowerCase()
  const cat = searchParams.categoria || 'Todas'

  const filtered = proyectosEjemplo.filter(p => {
    const matchQ = q ? (p.titulo + ' ' + p.descripcion).toLowerCase().includes(q) : true
    const matchC = cat === 'Todas' ? true : p.categoria === cat
    return matchQ && matchC
  })

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

      {/* Hero/Search bar */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-500/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse delay-700" />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 py-10 sm:py-14">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 bg-gradient-to-r from-cyan-200 via-blue-300 to-purple-300 bg-clip-text text-transparent">Resultados de búsqueda</h1>
          <p className="text-slate-300">Explora proyectos por sector, tecnologías y estado.</p>

          {/* Filters */}
          <form className="mt-6 grid gap-3 sm:grid-cols-[1fr_220px]">
            <label className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input name="q" defaultValue={searchParams.q || ''} placeholder="Buscar proyectos..." className="w-full rounded-xl bg-slate-900/60 border border-white/10 pl-9 pr-3 py-2 outline-none focus:border-cyan-400" />
            </label>
            <select name="categoria" defaultValue={cat} className="rounded-xl bg-slate-900/60 border border-white/10 px-3 py-2 outline-none focus:border-cyan-400">
              <option>Todas</option>
              <option>Educación</option>
              <option>Medio Ambiente</option>
              <option>Comercio</option>
              <option>Salud</option>
            </select>
          </form>
        </div>
      </section>

      {/* Results */}
      <section className="relative px-4 pb-16">
        <div className="mx-auto max-w-6xl grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(p => (
            <article key={p.id} className="group overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur hover:border-cyan-400/40 transition">
              <div className="relative h-40">
                <Image src={p.imagen} alt={p.titulo} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 text-slate-300 mb-2">
                  <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs bg-white/5 border border-white/10">
                    <SectorIcon sector={p.categoria} />
                    {p.categoria}
                  </span>
                  <span className="text-xs px-2 py-1 rounded-full border border-white/10 text-slate-300">{p.estado}</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">{p.titulo}</h3>
                <p className="text-sm text-slate-300 mb-3 line-clamp-2">{p.descripcion}</p>
                <div className="flex flex-wrap gap-2 text-xs text-slate-300">
                  {p.tecnologias.map(t => (
                    <span key={t} className="px-2 py-1 rounded-md bg-white/5 border border-white/10">{t}</span>
                  ))}
                </div>
              </div>
              <div className="px-5 pb-5">
                <Link href="#" className="inline-flex items-center gap-2 text-cyan-300 hover:text-cyan-200">Ver más</Link>
              </div>
            </article>
          ))}
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
