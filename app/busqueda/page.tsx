'use client'
import Link from 'next/link'
import Image from 'next/image'

interface SearchPageProps {
  searchParams: {
    q?: string;
    categoria?: string;
  };
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
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  },
  {
    id: 2,
    titulo: 'App de Monitoreo Ambiental',
    descripcion: 'Sistema IoT para monitoreo de calidad del aire y condiciones ambientales',
    categoria: 'Medio Ambiente',
    tecnologias: ['Python', 'Arduino', 'MongoDB'],
    estado: 'Completado',
    imagen: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=1200&h=800&fit=crop',
    logo: 'https://images.unsplash.com/photo-1569163139394-de4798aa62b4?w=100&h=100&fit=crop',
  },
  {
    id: 3,
    titulo: 'Plataforma de E-commerce',
    descripcion: 'Tienda en línea con sistema de pagos y gestión de inventario',
    categoria: 'Comercio',
    tecnologias: ['Next.js', 'Stripe', 'MySQL'],
    estado: 'En desarrollo',
    imagen: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=1200&h=800&fit=crop',
    logo: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&h=100&fit=crop',
  },
  {
    id: 4,
    titulo: 'Sistema de Telemedicina',
    descripcion: 'Plataforma para consultas médicas virtuales y gestión de historias clínicas',
    categoria: 'Salud',
    tecnologias: ['Vue.js', 'Express', 'MongoDB'],
    estado: 'En desarrollo',
    imagen: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&h=800&fit=crop',
    logo: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=100&h=100&fit=crop',
  },
]

const categoryIcons: Record<string, string> = {
  'Educación': '🎓',
  'Medio Ambiente': '🌿',
  'Comercio': '🛒',
  'Salud': '🧑‍⚕️',
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const q = (searchParams?.q || '').toLowerCase().trim()
  const categoria = (searchParams?.categoria || '').toLowerCase().trim()

  const resultados = proyectosEjemplo.filter((p) => {
    const matchTexto = !q || p.titulo.toLowerCase().includes(q) || p.descripcion.toLowerCase().includes(q)
    const matchCategoria = !categoria || p.categoria.toLowerCase() === categoria
    return matchTexto && matchCategoria
  })

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Floating aurora gradients */}
      <div className="pointer-events-none absolute -top-1/3 left-1/2 h-[60rem] w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.15),transparent_60%)] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-1/3 right-1/3 h-[50rem] w-[50rem] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.12),transparent_60%)] blur-3xl" />

      {/* Top bar */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/5 border-b border-white/10">
        <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-4">
          <Link href="/" className="group inline-flex items-center gap-2 text-slate-200">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white shadow-lg shadow-indigo-900/30 ring-1 ring-white/20">✨</span>
            <span className="font-semibold tracking-tight">3SN RSC Portal</span>
          </Link>

          <div className="flex items-center gap-2">
            <div className="relative">
              <input
                placeholder="Buscar proyectos..."
                defaultValue={searchParams?.q || ''}
                name="q"
                className="peer h-11 w-[48vw] max-w-xl rounded-2xl border border-white/10 bg-white/5 px-4 pl-11 text-slate-100 placeholder:text-slate-400 shadow-inner shadow-black/20 outline-none transition focus:ring-2 focus:ring-indigo-500/60"
              />
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔎</span>
            </div>
            <button className="inline-flex h-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-rose-500 px-5 text-sm font-semibold text-white shadow-lg shadow-indigo-900/30 transition-all hover:scale-[1.02] hover:shadow-rose-900/30 active:scale-95">
              Buscar
            </button>
          </div>
        </div>

        {/* Filter chips */}
        <div className="container mx-auto flex flex-wrap items-center gap-2 px-4 pb-4">
          {['Educación','Medio Ambiente','Comercio','Salud'].map((c) => (
            <Link
              key={c}
              href={`?categoria=${encodeURIComponent(c.toLowerCase())}`}
              className="group relative inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-200 backdrop-blur-xl transition-all hover:bg-white/10 hover:shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
            >
              <span className="text-lg">{categoryIcons[c as keyof typeof categoryIcons]}</span>
              <span>{c}</span>
              <span className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-indigo-500/0 via-fuchsia-500/0 to-rose-500/0 opacity-0 blur-[2px] transition-all group-hover:opacity-40" />
            </Link>
          ))}
        </div>
      </header>

      <main className="container mx-auto px-4 pb-24 pt-8">
        {/* Results grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {resultados.length > 0 ? (
            resultados.map((proyecto) => (
              <div
                key={proyecto.id}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-3 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 hover:shadow-[0_40px_120px_-20px_rgba(59,130,246,0.25)]"
              >
                {/* Image + overlay */}
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
                  <Image src={proyecto.imagen} alt={proyecto.titulo} fill className="object-cover transition duration-500 group-hover:scale-105" />

                  {/* gradient overlay */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/10 to-transparent" />

                  {/* top-right icons */}
                  <div className="absolute right-3 top-3 flex items-center gap-2">
                    <span className="grid h-9 w-9 place-items-center rounded-xl bg-black/40 text-lg text-white/90 ring-1 ring-white/20 backdrop-blur-md shadow-md shadow-black/30">
                      {categoryIcons[proyecto.categoria]}
                    </span>
                    <span className="grid h-9 w-9 place-items-center rounded-xl bg-black/40 text-xs text-white/90 ring-1 ring-white/20 backdrop-blur-md shadow-md shadow-black/30">
                      {proyecto.estado === 'Completado' ? '✅' : '⚙️'}
                    </span>
                  </div>

                  {/* bottom info */}
                  <div className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-3">
                    <div className="max-w-[70%]">
                      <h3 className="line-clamp-1 text-lg font-semibold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
                        {proyecto.titulo}
                      </h3>
                      <p className="line-clamp-2 text-xs text-slate-200/90">
                        {proyecto.descripcion}
                      </p>
                    </div>
                    <span className="inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl ring-1 ring-white/20 shadow-md shadow-black/30">
                      {/* logo */}
                      <Image src={proyecto.logo} alt="logo" width={40} height={40} className="object-cover" />
                    </span>
                  </div>
                </div>

                {/* tech chips */}
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  {proyecto.tecnologias.map((tech, i) => (
                    <span
                      key={i}
                      className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-200 shadow-sm shadow-black/20 backdrop-blur-md transition-colors hover:bg-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-4 flex items-center justify-between">
                  <span className={`text-sm font-medium ${proyecto.estado === 'Completado' ? 'text-emerald-400' : 'text-sky-400'}`}>
                    {proyecto.estado}
                  </span>
                  <Link
                    href="#"
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-rose-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-900/30 transition-all hover:scale-[1.02] hover:shadow-rose-900/30 active:scale-95"
                  >
                    Ver más
                    <span className="transition-transform group-hover:translate-x-0.5">↗</span>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full grid place-items-center rounded-3xl border border-white/10 bg-white/5 p-12 text-center text-slate-200 shadow-2xl backdrop-blur-xl">
              <div className="mb-4 text-6xl">🔍</div>
              <h2 className="mb-2 text-2xl font-bold text-white">No se encontraron resultados</h2>
              <p className="mb-6 text-slate-300">No hay proyectos que coincidan con tu búsqueda. Intenta con otros términos.</p>
              <Link href="/" className="inline-block rounded-xl bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-rose-500 px-6 py-3 text-white shadow-lg transition-all hover:scale-[1.02] active:scale-95">
                Volver al inicio
              </Link>
            </div>
          )}
        </div>
      </main>

      {/* Sticky footer */}
      <footer className="sticky bottom-0 z-40 mt-6 bg-gradient-to-br from-slate-900/80 to-slate-800/80 text-slate-100 backdrop-blur-xl">
        <div className="container mx-auto grid grid-cols-1 items-center gap-6 px-4 py-4 md:grid-cols-3">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-white/10 text-2xl">✨</div>
            <div>
              <p className="text-lg font-semibold">3SN RSC Portal</p>
              <p className="text-sm text-slate-300">Resultados y búsqueda con estilo</p>
            </div>
          </div>
          <div className="text-center text-sm text-slate-300">
            © {new Date().getFullYear()} 3SN. Todos los derechos reservados.
          </div>
          <div className="flex justify-center gap-3 md:justify-end">
            {['🐦','🐙','💼'].map((icon, i) => (
              <a key={i} href="#" aria-label="social" className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition">
                <span>{icon}</span>
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* Subtle keyframes for global motion */}
      <style jsx>{`
        @keyframes fadein { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideup { from { transform: translateY(8px) } to { transform: translateY(0) } }
        @keyframes scalein { from { transform: scale(0.98) } to { transform: scale(1) } }
      `}</style>
    </div>
  )
}
