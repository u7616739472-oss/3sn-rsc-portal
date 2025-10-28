'use client'
import Link from 'next/link'
import Image from 'next/image'
import { Euro, Users, CheckCircle2, XCircle, ArrowRight } from 'lucide-react'

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-black text-white">
      <video autoPlay muted loop playsInline className="fixed inset-0 h-full w-full object-cover opacity-30" src="/video/bg-loop.mp4" />
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
      <main className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-24 pt-8 md:pt-16">{children}</main>
      <footer className="relative z-20 border-t border-white/10 bg-black/30 backdrop-blur supports-[backdrop-filter]:bg-black/30">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
          <Link href="/" className="flex items-center gap-2 text-white/70 hover:text-white">
            <Image src="/logo.svg" alt="3SN" width={24} height={24} />
            <span className="text-sm">© {new Date().getFullYear()} 3SN</span>
          </Link>
          <div className="flex items-center gap-4 text-xs text-white/60"><span>Privacidad</span><span>Términos</span></div>
        </div>
      </footer>
    </div>
  )
}

const oportunidades = [
  { id: 'f1', titulo: 'Convocatoria Impacto Social 2025', entidad: 'Fundación Horizonte', importe: '50.000€', estado: 'Abierta' },
  { id: 'f2', titulo: 'Innovación en Salud Comunitaria', entidad: 'Agencia Salud+', importe: '120.000€', estado: 'Próxima' },
  { id: 'f3', titulo: 'Educación Digital Rural', entidad: 'Programa EduTech', importe: '80.000€', estado: 'Abierta' },
]

export default function FinanciadorPage() {
  return (
    <Layout>
      <section className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight text-white">Financiador</h1>
      </section>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {oportunidades.map((o) => (
          <article key={o.id} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md transition hover:border-white/20 hover:bg-white/10">
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white/10 to-transparent opacity-0 transition group-hover:opacity-100" />
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/10">
                <Euro className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-orange-400">{o.titulo}</h3>
                <div className="mt-1 flex items-center gap-2 text-xs">
                  <span className="rounded-full bg-sky-500/20 px-2 py-0.5 text-sky-300">{o.entidad}</span>
                  <span className="rounded-full bg-violet-500/20 px-2 py-0.5 text-violet-300">{o.importe}</span>
                  <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-emerald-300">{o.estado}</span>
                </div>
              </div>
            </div>
            <p className="mb-4 text-sm text-white/80">Apoya proyectos con impacto medible, transparencia y foco en resultados.</p>
            <div className="flex items-center gap-2 text-xs text-white/70">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Elegible
              <Users className="h-4 w-4 text-white/70" /> Mentores disponibles
            </div>
            <div className="mt-4">
              <button className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-4 py-2 text-sm font-medium text-black shadow-lg shadow-orange-500/30 transition hover:bg-orange-400">
                Ver bases <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </article>
        ))}
      </div>
    </Layout>
  )
}
