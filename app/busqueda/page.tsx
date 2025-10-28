import Link from 'next/link';
import Image from 'next/image';

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
    imagen: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  },
  {
    id: 2,
    titulo: 'App de Monitoreo Ambiental',
    descripcion: 'Sistema IoT para monitoreo de calidad del aire y condiciones ambientales',
    categoria: 'Medio Ambiente',
    tecnologias: ['Python', 'Arduino', 'MongoDB'],
    estado: 'Completado',
    imagen: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800&h=400&fit=crop',
    logo: 'https://images.unsplash.com/photo-1569163139394-de4798aa62b4?w=100&h=100&fit=crop',
  },
  {
    id: 3,
    titulo: 'Plataforma de E-commerce',
    descripcion: 'Tienda en línea con sistema de pagos y gestión de inventario',
    categoria: 'Comercio',
    tecnologias: ['Next.js', 'Stripe', 'MySQL'],
    estado: 'En desarrollo',
    imagen: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=400&fit=crop',
    logo: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&h=100&fit=crop',
  },
  {
    id: 4,
    titulo: 'Sistema de Telemedicina',
    descripcion: 'Plataforma para consultas médicas virtuales y gestión de historias clínicas',
    categoria: 'Salud',
    tecnologias: ['Vue.js', 'Express', 'MongoDB'],
    estado: 'En desarrollo',
    imagen: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=400&fit=crop',
    logo: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=100&h=100&fit=crop',
  },
];

const categoryIcons: Record<string, string> = {
  Educación: '🎓',
  'Medio Ambiente': '🌿',
  Comercio: '🛒',
  Salud: '🧑‍⚕️',
};

export default function BusquedaPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q?.toLowerCase() || '';
  const categoria = searchParams.categoria?.toLowerCase() || '';

  const proyectosFiltrados = proyectosEjemplo
    .filter((proyecto) => {
      const matchQuery =
        query === '' ||
        proyecto.titulo.toLowerCase().includes(query) ||
        proyecto.descripcion.toLowerCase().includes(query) ||
        proyecto.tecnologias.some((tech) => tech.toLowerCase().includes(query));

      const matchCategoria = categoria === '' || proyecto.categoria.toLowerCase().includes(categoria);

      return matchQuery && matchCategoria;
    });

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Gradient background with overlay */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50" />
        <div className="absolute inset-0 bg-[radial-gradient(45%_60%_at_80%_10%,rgba(99,102,241,0.10),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(35%_40%_at_15%_85%,rgba(236,72,153,0.10),transparent)]" />
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Header with slight slide-in */}
        <div className="mb-8 opacity-0 animate-[fadein_0.7s_ease-out_forwards,slideup_0.7s_ease-out_forwards] [animation-delay:100ms]">
          <Link href="/" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-4">← Volver al inicio</Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Resultados de búsqueda</h1>
          {query && (
            <p className="text-lg text-gray-600">
              Búsqueda: <span className="font-semibold">{searchParams.q}</span>
            </p>
          )}
          {categoria && (
            <p className="text-lg text-gray-600">
              Categoría: <span className="font-semibold">{searchParams.categoria}</span>
            </p>
          )}
        </div>

        {/* Floating categories chips (from results) */}
        <div className="sticky top-4 z-10 mb-8 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/40 border border-white/40 shadow rounded-2xl p-3">
          <div className="flex flex-wrap gap-2">
            {[...new Set(proyectosEjemplo.map((p) => p.categoria))].map((cat) => (
              <span key={cat} className="inline-flex items-center gap-2 px-3 py-1 rounded-xl text-sm bg-white text-gray-700 border border-gray-200">
                <span>{categoryIcons[cat] ?? '🏷️'}</span>
                {cat}
              </span>
            ))}
          </div>
        </div>

        {/* Resultados */}
        {proyectosFiltrados.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {proyectosFiltrados.map((proyecto, idx) => (
              <div
                key={proyecto.id}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl opacity-0 animate-[fadein_0.6s_ease-out_forwards,scalein_0.6s_ease-out_forwards]"
                style={{ animationDelay: `${Math.min(idx, 6) * 70}ms` }}
              >
                {/* Imagen principal panorámica con hover zoom */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={proyecto.imagen}
                    alt={proyecto.titulo}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="pointer-events-none absolute inset-0 shadow-[inset_0_-30px_50px_rgba(0,0,0,0.18)]" />

                  {/* Logo circular superpuesto */}
                  <div className="absolute bottom-0 right-0 translate-y-1/2 mr-6">
                    <Image
                      src={proyecto.logo}
                      alt={`${proyecto.titulo} logo`}
                      width={80}
                      height={80}
                      className="rounded-full border-4 border-white shadow-xl object-cover bg-white"
                    />
                  </div>
                </div>

                <div className="p-6 pt-12">
                  <div className="mb-3">
                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-100 text-indigo-700 text-sm font-semibold rounded-full">
                      <span>{categoryIcons[proyecto.categoria] ?? '🏷️'}</span>
                      {proyecto.categoria}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">{proyecto.titulo}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{proyecto.descripcion}</p>
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Tecnologías:</p>
                    <div className="flex flex-wrap gap-2">
                      {proyecto.tecnologias.map((tech, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-medium ${proyecto.estado === 'Completado' ? 'text-green-600' : 'text-blue-600'}`}>
                      {proyecto.estado}
                    </span>
                    <Link href="#" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg">
                      Ver más
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No se encontraron resultados</h2>
            <p className="text-gray-600 mb-6">No hay proyectos que coincidan con tu búsqueda. Intenta con otros términos.</p>
            <Link href="/" className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
              Volver al inicio
            </Link>
          </div>
        )}
      </div>

      {/* Footer visual */}
      <footer className="mt-12 bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100">
        <div className="container mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-white/10 grid place-items-center text-2xl">✨</div>
            <div>
              <p className="text-lg font-semibold">3SN RSC Portal</p>
              <p className="text-sm text-slate-300">Resultados y búsqueda con estilo</p>
            </div>
          </div>
          <div className="text-center text-sm text-slate-300">© {new Date().getFullYear()} 3SN. Todos los derechos reservados.</div>
          <div className="flex justify-center md:justify-end gap-3">
            <a className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition" href="#" aria-label="Twitter"><span>🐦</span></a>
            <a className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition" href="#" aria-label="GitHub"><span>🐙</span></a>
            <a className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition" href="#" aria-label="LinkedIn"><span>💼</span></a>
          </div>
        </div>
      </footer>

      {/* keyframes for simple fade/slide/scale */}
      <style jsx>{`
        @keyframes fadein { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideup { from { transform: translateY(8px) } to { transform: translateY(0) } }
        @keyframes scalein { from { transform: scale(0.98) } to { transform: scale(1) } }
      `}</style>
    </div>
  );
}
