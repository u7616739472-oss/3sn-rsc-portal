"use client"
import Link from 'next/link'
import Image from 'next/image'
import { Search } from 'lucide-react'
import { useState } from 'react'

const projects = [
  {
    id: 1,
    title: "Sistema de Gestión Académica",
    description: "Plataforma integral para gestión de estudiantes, cursos y calificaciones",
    category: "Educación",
    status: "En desarrollo",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=300&fit=crop"
  },
  {
    id: 2,
    title: "App de Monitoreo Ambiental",
    description: "Sistema IoT para monitoreo de calidad del aire y condiciones ambientales",
    category: "Medio Ambiente",
    status: "Completado",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&h=300&fit=crop"
  },
  {
    id: 3,
    title: "Plataforma de Microfinanzas",
    description: "Solución blockchain para facilitar microcréditos a comunidades rurales",
    category: "Finanzas",
    status: "En progreso",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=300&fit=crop"
  },
  {
    id: 4,
    title: "Red de Telemedicina",
    description: "Conecta pacientes rurales con profesionales de la salud",
    category: "Salud",
    status: "Activo",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=300&fit=crop"
  },
  {
    id: 5,
    title: "Gestión de Recursos Hídricos",
    description: "Sistema de monitoreo y optimización del uso de agua",
    category: "Medio Ambiente",
    status: "En desarrollo",
    image: "https://images.unsplash.com/photo-1583224964211-e5e84dc80e7f?w=400&h=300&fit=crop"
  },
  {
    id: 6,
    title: "Programa de Alfabetización Digital",
    description: "Iniciativa para enseñar habilidades tecnológicas básicas",
    category: "Educación",
    status: "Activo",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop"
  }
]

export default function BusquedaPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = ['all', ...Array.from(new Set(projects.map(p => p.category)))]

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Video Background */}
      <div className="fixed inset-0 w-full h-full overflow-hidden -z-10">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute w-full h-full object-cover opacity-20"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-futuristic-devices-99788-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 via-gray-900/70 to-gray-900/90" />
      </div>

      {/* Header */}
      <header className="relative bg-black/30 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-3">
              <Image src="/logo.png" alt="3SN Portal" width={40} height={40} className="rounded-lg" />
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-300 text-transparent bg-clip-text">
                3SN Portal RSC
              </span>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-300 hover:text-orange-500 transition-colors">Inicio</Link>
              <Link href="/busqueda" className="text-orange-500 font-semibold">Búsqueda</Link>
              <Link href="/financiadores" className="text-gray-300 hover:text-orange-500 transition-colors">Financiadores</Link>
              <Link href="/ongd" className="text-gray-300 hover:text-orange-500 transition-colors">ONGDs</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400 text-transparent bg-clip-text">
              Busca Proyectos
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explora proyectos verificados que generan impacto real. Filtra por categoría y encuentra oportunidades de financiamiento sostenible.
          </p>
        </div>

        {/* Search Bar - Centered */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-6 w-6 text-orange-500" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar proyectos..."
              className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white/5 backdrop-blur-md rounded-xl p-2 border border-white/10">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-lg transition-all ${
                  selectedCategory === category
                    ? 'bg-orange-500 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {category === 'all' ? 'Todas las categorías' : category}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-orange-500/50 transition-all duration-300 hover:transform hover:scale-105"
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
                
                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-orange-500/90 backdrop-blur-sm text-white text-sm font-semibold rounded-full">
                    {project.status}
                  </span>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <div className="mb-3">
                  <span className="inline-block px-3 py-1 bg-orange-500/20 text-orange-400 text-sm font-medium rounded-full">
                    {project.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>
                <Link
                  href={`/proyecto/${project.id}`}
                  className="inline-flex items-center text-orange-500 hover:text-orange-400 font-semibold transition-colors"
                >
                  Ver detalles
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-500/20 rounded-full mb-6">
              <Search className="w-10 h-10 text-orange-500" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No se encontraron proyectos</h3>
            <p className="text-gray-400">Intenta con otros términos de búsqueda o categorías</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative bg-black/30 backdrop-blur-md border-t border-white/10 py-8 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-400">
            <p>&copy; 2024 3SN Portal RSC. Conectando Impacto Social con Financiación Sostenible.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
