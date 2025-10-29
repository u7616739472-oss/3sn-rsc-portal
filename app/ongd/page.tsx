"use client"
import Link from 'next/link'
import Image from 'next/image'
import { Users, BadgeCheck, ArrowRight } from 'lucide-react'

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-black text-white">
      <video autoPlay muted loop playsInline className="fixed inset-0 h-full w-full object-cover opacity-30" src="/video/bg-loop.mp4" />
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/80" />

      <header className="sticky top-0 z-20 w-full backdrop-blur supports-[backdrop-filter]:bg-black/30 bg-black/20">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <Link href="/" className="flex items-center gap-3">
            <Image alt="3SN" className="rounded-full ring-1 ring-white/20" height={36} src="/logo.svg" width={36} />
            <span className="text-lg font-semibold tracking-tight">3SN</span>
          </Link>
          <nav className="hidden gap-6 md:flex">
            <Link className="text-sm text-white/80 hover:text-white transition-colors" href="/busqueda">Búsqueda</Link>
            <Link className="text-sm text-white/80 hover:text-white transition-colors" href="/financiador">Financiadores</Link>
            <Link className="text-sm text-white/80 hover:text-white transition-colors" href="/ongd">ONGDs</Link>
          </nav>
        </div>
      </header>

      <main className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-24 pt-8 md:pt-16">{children}</main>

      <footer className="relative z-20 border-t border-white/10 bg-black/30 backdrop-blur supports-[backdrop-filter]:bg-black/30">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
          <Link className="flex items-center gap-2 text-white/70 hover:text-white" href="/">
            <Image alt="3SN" height={24} src="/logo.svg" width={24} />
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

const ongs = [
  { id: 1, nombre: 'Fundación Horizonte', descripcion: 'ONG enfocada en educación básica y apoyo a docentes.', sector: 'Educación', image: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop' },
  { id: 2, nombre: 'Verde Vivo', descripcion: 'Conservación y proyectos de reforestación urbana.', sector: 'Medio Ambiente', image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=1200&auto=format&fit=crop' },
  { id: 3, nombre: 'Salud al Día', descripcion: 'Programas de prevención y telemedicina.', sector: 'Salud', image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=1200&auto=format&fit=crop' },
]

export default function ONGDPage() {
  return (
    <Layout>
      <section className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">ONGDs</h1>
      </section>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {ongs.map((o) => (
          <article key={o.id} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition hover:border-white/20 hover:bg-white/10">
            <div className="relative h-40 w-full overflow-hidden">
              <Image src={o.image} alt={o.nombre} fill className="object-cover transition duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            </div>
            <div className="p-5">
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <span className="rounded-full bg-orange-500/20 px-2 py-0.5 text-xs text-orange-300">{o.sector}</span>
              </div>
              <h3 className="text-lg font-semibold text-orange-400">{o.nombre}</h3>
              <p className="mt-2 text-sm text-white/80">{o.descripcion}</p>
              <div className="mt-4">
                <button className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-4 py-2 text-sm font-medium text-black shadow-lg shadow-orange-500/30 transition hover:bg-orange-400">
                  Ver perfil <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Layout>
  )
}
