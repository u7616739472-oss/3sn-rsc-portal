'use client'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0b1020] text-white">
      {/* Hero */}
      <section className="relative overflow-hidden min-h-[85vh]">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80" 
            alt="Professional team collaboration"
            className="w-full h-full object-cover"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-[#0b1020]"></div>
        </div>

        {/* Content */}
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:py-28 lg:py-32">
          <div className="flex flex-col items-center text-center gap-6">
            {/* Logo / Icon */}
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 shadow-lg shadow-cyan-500/20 grid place-items-center animate-pulse">
              <span className="text-2xl">🌐</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg">
              3SN Portal
            </h1>
            <p className="max-w-2xl text-white/90 text-lg sm:text-xl drop-shadow-md">
              Conecta empresas, ONGDs y ciudadanía para lanzar proyectos reales de impacto,
              RSC y trazabilidad en blockchain.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
              <a 
                href="#destacados"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-white font-semibold shadow-lg shadow-cyan-500/30 hover:from-cyan-400 hover:to-blue-500 transition"
              >
                Explorar proyectos
              </a>
            </div>
            {/* Center animation/icon placeholder */}
            <div className="mt-10 w-full max-w-3xl">
              <div className="aspect-[16/9] rounded-2xl bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur border border-cyan-500/30 grid place-items-center">
                <div className="h-16 w-16 rounded-full border-4 border-cyan-400/60 border-t-transparent animate-spin"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search */}
      <section className="mx-auto max-w-5xl px-4 -mt-10">
        <div className="rounded-2xl bg-slate-900/60 backdrop-blur border border-cyan-500/20 p-4 sm:p-6 shadow-lg shadow-cyan-500/10">
          <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
                          type="text"
              placeholder="Buscar proyectos o empresas..."
              className="flex-1 rounded-xl bg-slate-800/80 focus:bg-slate-800 border border-slate-700/60 focus:border-cyan-500/60 outline-none px-4 py-3 text-slate-100 placeholder:text-slate-400"
            />
            <button 
              type="submit"
              className="rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold px-6 py-3 transition"
            >
              Buscar
            </button>
          </form>
        </div>
      </section>

      {/* Featured projects */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:py-20" id="destacados">
        <div className="flex items-end justify-between mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold">Proyectos destacados</h2>
          <a className="text-cyan-400 hover:text-cyan-300" href="#">Ver todos →</a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <article className="group rounded-2xl bg-slate-900/60 border border-cyan-500/20 hover:border-cyan-400/40 transition overflow-hidden">
            <div className="h-36 bg-gradient-to-br from-cyan-500/20 to-blue-600/20"></div>
            <div className="p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs px-2 py-1 rounded bg-cyan-600/20 text-cyan-300">Energía</span>
                <span className="text-xs text-slate-400">Empresa: Solarity</span>
              </div>
              <h3 className="text-lg font-semibold">Paneles solares para escuelas rurales</h3>
              <p className="mt-2 text-slate-300 text-sm">
                Instalación fotovoltaica con medición on-chain del impacto y transparencia total de fondos.
              </p>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-cyan-300">Meta: 50.000€</span>
                <span className="text-slate-400">Impacto: 12 escuelas</span>
              </div>
            </div>
          </article>

          {/* Card 2 */}
          <article className="group rounded-2xl bg-slate-900/60 border border-cyan-500/20 hover:border-cyan-400/40 transition overflow-hidden">
            <div className="h-36 bg-gradient-to-br from-cyan-500/20 to-blue-600/20"></div>
            <div className="p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs px-2 py-1 rounded bg-cyan-600/20 text-cyan-300">Agua</span>
                <span className="text-xs text-slate-400">ONGD: AquaVida</span>
              </div>
              <h3 className="text-lg font-semibold">Pozos de agua con auditoría abierta</h3>
              <p className="mt-2 text-slate-300 text-sm">
                Construcción y mantenimiento con donaciones trazadas y reportes verificables por comunidad.
              </p>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-cyan-300">Meta: 30.000€</span>
                <span className="text-slate-400">Impacto: 5 comunidades</span>
              </div>
            </div>
          </article>

          {/* Card 3 */}
          <article className="group rounded-2xl bg-slate-900/60 border border-cyan-500/20 hover:border-cyan-400/40 transition overflow-hidden">
            <div className="h-36 bg-gradient-to-br from-cyan-500/20 to-blue-600/20"></div>
            <div className="p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs px-2 py-1 rounded bg-cyan-600/20 text-cyan-300">Reciclaje</span>
                <span className="text-xs text-slate-400">Empresa: UrbanLoop</span>
              </div>
              <h3 className="text-lg font-semibold">Economía circular en barrios</h3>
              <p className="mt-2 text-slate-300 text-sm">
                Incentivos tokenizados para separar residuos y canjear beneficios en comercios locales.
              </p>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-cyan-300">Meta: 20.000€</span>
                <span className="text-slate-400">Impacto: 3 distritos</span>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-5xl px-4 pb-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">¿Cómo funciona?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-2xl bg-slate-900/60 border border-cyan-500/20 p-5">
            <div className="text-2xl">🔍</div>
            <h3 className="mt-2 font-semibold">Explora</h3>
            <p className="text-sm text-slate-300">Encuentra iniciativas alineadas con tus valores e indicadores ESG.</p>
          </div>
          <div className="rounded-2xl bg-slate-900/60 border border-cyan-500/20 p-5">
            <div className="text-2xl">🤝</div>
            <h3 className="mt-2 font-semibold">Conecta</h3>
            <p className="text-sm text-slate-300">Colabora con empresas, ONGDs y ciudadanía para co-crear impacto.</p>
          </div>
          <div className="rounded-2xl bg-slate-900/60 border border-cyan-500/20 p-5">
            <div className="text-2xl">⛓️</div>
            <h3 className="mt-2 font-semibold">Verifica</h3>
            <p className="text-sm text-slate-300">Sigue la trazabilidad on-chain y mide resultados en tiempo real.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/40">
        <div className="mx-auto max-w-7xl px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-400">
          © {new Date().getFullYear()} 3SN Portal
          <span className="text-cyan-300">Hecho con Next.js + Tailwind</span>
        </div>
      </footer>
    </main>
  );
}
