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
    imagen: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg'
  },
  {
    id: 2,
    titulo: 'App de Monitoreo Ambiental',
    descripcion: 'Sistema IoT para monitoreo de calidad del aire y condiciones ambientales',
    categoria: 'Medio Ambiente',
    tecnologias: ['Python', 'Arduino', 'MongoDB'],
    estado: 'Completado',
    imagen: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800&h=400&fit=crop',
    logo: 'https://images.unsplash.com/photo-1569163139394-de4798aa62b4?w=100&h=100&fit=crop'
  },
  {
    id: 3,
    titulo: 'Plataforma de E-commerce',
    descripcion: 'Tienda en línea con sistema de pagos y gestión de inventario',
    categoria: 'Comercio',
    tecnologias: ['Next.js', 'Stripe', 'MySQL'],
    estado: 'En desarrollo',
    imagen: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=400&fit=crop',
    logo: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&h=100&fit=crop'
  },
  {
    id: 4,
    titulo: 'Sistema de Telemedicina',
    descripcion: 'Plataforma para consultas médicas virtuales y gestión de historias clínicas',
    categoria: 'Salud',
    tecnologias: ['Vue.js', 'Express', 'MongoDB'],
    estado: 'En desarrollo',
    imagen: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=400&fit=crop',
    logo: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=100&h=100&fit=crop'
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
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
              >
                {/* Imagen principal panorámica */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={proyecto.imagen} 
                    alt={proyecto.titulo}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    style={{ boxShadow: 'inset 0 -20px 30px rgba(0,0,0,0.1)' }}
                  />
                  {/* Logo circular superpuesto */}
                  <div className="absolute bottom-0 right-0 transform translate-y-1/2 translate-x-0 mr-6">
                    <img 
                      src={proyecto.logo} 
                      alt={`${proyecto.titulo} logo`}
                      className="w-20 h-20 rounded-full border-4 border-white shadow-xl object-cover bg-white"
                    />
                  </div>
                </div>

                <div className="p-6 pt-12">
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
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg">
                      Ver más
                    </button>
                  </div>
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
