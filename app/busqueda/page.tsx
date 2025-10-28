'use client'
import Link from 'next/link'
import Image from 'next/image'
import { Search, Building2, GraduationCap, ShoppingCart, Stethoscope, Leaf, BadgeCheck, ArrowRight } from 'lucide-react'

// Shared layout wrapper mimicking landing: video bg, header, footer
function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-black text-white">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="fixed inset-0 h-full w-full object-cover opacity-30"
        src="/video/bg-loop.mp4"
      />
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/80" />

      <header className="relative z-20 w-full">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.svg" alt="3SN" width={36} height={36} className="drop-shadow-lg" />
            <span className="text-lg font-semibold tracking-tight">3SN</span>
          </Link>
          <nav className="hidden gap-6 md:flex">
            <Link href="/busqueda" className="text-sm text-white/80 hover:text-white">Búsqueda</Link>
            <Link href="/financiador" className="text-sm text-white/80 hover:text-white">Financiador</Link>
            <Link href="/ongd" className="text-sm text-white/80 hover:text-white">ONGD</Link>
          </nav>
        </div>
      </header>

      <main className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-24 pt-8 md:pt-16">
        {children}
      </main>

      <footer className="relative z-20 border-t border-white/10 bg-black/30 backdrop-blur supports-[backdrop-filter]:bg-black/30">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
          <Link href="/" className="flex items-center gap-2 text-white/70 hover:text-white">
            <Image src="/logo.svg" alt="3SN" width={24} height={24} />
            <span className="text-sm">© {new Date().getFullYear()} 3SN</span>
          </Link>
          <div className="flex items-center gap-4 text-xs text-white/60">
            <span>Privacidad</span>
            <span>Términos</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

const proyectosEjemplo = [
  { id: 1, titulo: 'Sistema de Gestión Académica', descripcion: 'Plataforma integral para gestión de estudiantes, cursos y calificaciones', categoria: 'Educación', estado: 'En desarrollo' },
  { id: 2, titulo: 'App de Monitoreo Ambiental', descripcion: 'Sistema IoT para monitoreo de calidad del aire y condiciones ambientales', categoria: 'Medio Ambiente', estado: 'Completado' },
  { id: 3, titulo: 'Plataforma de E-commerce', descripcion: 'Tienda en línea con pagos e inventario', categoria: 'Comercio', estado: 'En desarrollo' },
  { id: 4, titulo: 'Sistema de Telemedicina', descripcion: 'Consultas médicas virtuales y gestión de historias clínicas', categoria: 'Salud', estado: 'En desarrollo' },
]

const SectorIcon = ({ sector }: { sector: string }) => {
  const cls = 'w-8 h-8 text-white'
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
  const results = proyectosEjemplo.filter(
    (p) => (!q || p.titulo.toLowerCase().includes(q) || p.descripcion.toLowerCase().includes(q)) && (!categoria || p.categoria === categoria)
  )

  return (
    <Layout>
      <section className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight text-white">Búsqueda</h1>
      </section>

      <div className="mb-6 grid gap-3 sm:grid-cols-2">
        <form className="group relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/60" />
          <input
            name="q"
            defaultValue={q}
            placeholder="Buscar proyectos..."
            className="w-full rounded-full border border-white/10 bg-white/5 px-12 py-3 text-white placeholder-white/50 outline-none transition focus:border-white/20 focus:bg-white/10 backdrop-blur"
          />
        </form>
        <select
          name="categoria"
          defaultValue={categoria}
          className="rounded-full border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-white/20 focus:bg-white/10 backdrop-blur"
        >
          <option value="">Todas las categorías</option>
          <option>Educación</option>
          <option>Medio Ambiente</option>
          <option>Comercio</option>
          <option>Salud</option>
        </select>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((p) => (
          <article
            key={p.id}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md transition hover:border-white/20 hover:bg-white/10"
          >
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white/10 to-transparent opacity-0 transition group-hover:opacity-100" />
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/10">
                <SectorIcon sector={p.categoria} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-orange-400">{p.titulo}</h3>
                <div className="mt-1 flex items-center gap-2 text-xs">
                  <span className="rounded-full bg-orange-500/20 px-2 py-0.5 text-orange-300">{p.categoria}</span>
                  <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-emerald-300">{p.estado}</span>
                </div>
              </div>
            </div>
            <p className="mb-4 text-sm text-white/80">{p.descripcion}</p>
            <button className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-4 py-2 text-sm font-medium text-black shadow-lg shadow-orange-500/30 transition hover:bg-orange-400">
              Ver detalle <ArrowRight className="h-4 w-4" />
            </button>
          </article>
        ))}
      </div>
    </Layout>
  )
}
