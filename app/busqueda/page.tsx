import Link from 'next/link';

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
  },
  {
    id: 2,
    titulo: 'App de Monitoreo Ambiental',
    descripcion: 'Sistema IoT para monitoreo de calidad del aire y condiciones ambientales',
    categoria: 'Medio Ambiente',
    tecnologias: ['Python', 'Arduino', 'MongoDB'],
    estado: 'Completado',
  },
  {
    id: 3,
    titulo: 'Plataforma de E-commerce',
    descripcion: 'Tienda en línea con sistema de pagos y gestión de inventario',
    categoria: 'Comercio',
    tecnologias: ['Next.js', 'Stripe', 'MySQL'],
    estado: 'En desarrollo',
  },
  {
    id: 4,
    titulo: 'Sistema de Telemedicina',
    descripcion: 'Plataforma para consultas médicas virtuales y gestión de historias clínicas',
    categoria: 'Salud',
    tecnologias: ['Vue.js', 'Express', 'MongoDB'],
    estado: 'En desarrollo',
  },
];

export default function BusquedaPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q?.toLowerCase() || '';
  const categoria = searchParams.categoria?.toLowerCase() || '';

  const proyectosFiltrados = proyectosEjemplo.filter(proyecto => {
    const matchQuery = query === '' || 
      proyecto.titulo.toLowerCase().includes(query) ||
      proyecto.descripcion.toLowerCase().includes(query) ||
      proyecto.tecnologias.some(tech => tech.toLowerCase().includes(query));
    
    const matchCategoria = categoria === '' || 
      proyecto.categoria.toLowerCase().includes(categoria);
    
    return matchQuery && matchCategoria;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-4"
          >
            ← Volver al inicio
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Resultados de búsqueda
          </h1>
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

        {/* Resultados */}
        {proyectosFiltrados.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {proyectosFiltrados.map(proyecto => (
              <div
                key={proyecto.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6"
              >
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 text-sm font-semibold rounded-full">
                    {proyecto.categoria}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {proyecto.titulo}
                </h3>
                <p className="text-gray-600 mb-4">
                  {proyecto.descripcion}
                </p>
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Tecnologías:</p>
                  <div className="flex flex-wrap gap-2">
                    {proyecto.tecnologias.map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium ${
                    proyecto.estado === 'Completado' 
                      ? 'text-green-600' 
                      : 'text-blue-600'
                  }`}>
                    {proyecto.estado}
                  </span>
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                    Ver más
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              No se encontraron resultados
            </h2>
            <p className="text-gray-600 mb-6">
              No hay proyectos que coincidan con tu búsqueda. Intenta con otros términos.
            </p>
            <Link 
              href="/"
              className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Volver al inicio
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
