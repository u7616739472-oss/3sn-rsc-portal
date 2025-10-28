'use client';
import { useState } from 'react';

interface FeaturedProject {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  logo: string;
  author: string;
  likes: number;
  views: number;
}

const seedData: FeaturedProject[] = [
  {
    id: 1,
    title: 'Sistema de Reconocimiento Facial',
    description: 'Implementación de un sistema de reconocimiento facial en tiempo real utilizando deep learning y OpenCV.',
    category: 'Computer Vision',
    image: 'https://images.unsplash.com/photo-1555421689-d68471e189f2?w=800&h=400&fit=crop',
    logo: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=100&h=100&fit=crop',
    author: 'Sofía López',
    likes: 245,
    views: 1850
  },
  {
    id: 2,
    title: 'Plataforma de E-commerce',
    description: 'Aplicación completa de comercio electrónico con carrito de compras, pagos y gestión de inventario.',
    category: 'Web Development',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=400&fit=crop',
    logo: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&h=100&fit=crop',
    author: 'Miguel Torres',
    likes: 189,
    views: 2340
  },
  {
    id: 3,
    title: 'App de Salud Mental',
    description: 'Aplicación móvil para seguimiento del bienestar emocional con recursos de autoayuda y terapia guiada.',
    category: 'Salud',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=400&fit=crop',
    logo: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=100&h=100&fit=crop',
    author: 'Ana Martínez',
    likes: 312,
    views: 2890
  },
  {
    id: 4,
    title: 'Dashboard de Análisis de Datos',
    description: 'Panel interactivo para visualización y análisis de grandes volúmenes de datos empresariales.',
    category: 'Data Science',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
    logo: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=100&h=100&fit=crop',
    author: 'Carlos Ruiz',
    likes: 278,
    views: 3120
  },
  {
    id: 5,
    title: 'Red Social para Artistas',
    description: 'Plataforma social exclusiva para artistas donde pueden compartir su trabajo y conectar con galerías.',
    category: 'Social Media',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=400&fit=crop',
    logo: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=100&h=100&fit=crop',
    author: 'Laura Gómez',
    likes: 425,
    views: 4560
  },
  {
    id: 6,
    title: 'Sistema de Gestión Educativa',
    description: 'Plataforma integral para instituciones educativas con gestión de estudiantes, cursos y evaluaciones.',
    category: 'Educación',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    author: 'Pedro Sánchez',
    likes: 198,
    views: 2670
  },
];

export default function DestacadosPage() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [sortBy, setSortBy] = useState('likes');

  const categories = ['Todos', ...Array.from(new Set(seedData.map(p => p.category)))];

  const filteredProjects = seedData
    .filter(project => selectedCategory === 'Todos' || project.category === selectedCategory)
    .sort((a, b) => {
      if (sortBy === 'likes') return b.likes - a.likes;
      if (sortBy === 'views') return b.views - a.views;
      return 0;
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            🌟 Proyectos Destacados
          </h1>
          <p className="text-lg text-gray-600">
            Descubre los proyectos más populares y creativos de nuestra comunidad
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                    selectedCategory === cat
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <label className="text-gray-700 font-semibold">Ordenar por:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              >
                <option value="likes">Más likes</option>
                <option value="views">Más vistas</option>
              </select>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <div
              key={project.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
            >
              {/* Main Image with Logo Overlay */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  style={{ boxShadow: 'inset 0 -30px 40px rgba(0,0,0,0.2)' }}
                />
                {/* Category Badge */}
                <span className="absolute top-3 right-3 px-3 py-1 text-xs font-semibold bg-white text-purple-600 rounded-full shadow-md">
                  {project.category}
                </span>
                {/* Circular Logo */}
                <div className="absolute bottom-0 left-6 transform translate-y-1/2">
                  <img
                    src={project.logo}
                    alt={`${project.title} logo`}
                    className="w-16 h-16 rounded-full border-4 border-white shadow-xl object-cover bg-white"
                  />
                </div>
              </div>

              <div className="p-6 pt-10">
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">{project.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span className="flex items-center gap-1">
                    👤 {project.author}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <span className="flex items-center gap-1 text-red-500 font-semibold">
                    ❤️ {project.likes}
                  </span>
                  <span className="flex items-center gap-1 text-blue-500 font-semibold">
                    👁️ {project.views}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <p className="text-gray-500 text-lg">No hay proyectos en esta categoría.</p>
          </div>
        )}
      </div>
    </div>
  );
}
