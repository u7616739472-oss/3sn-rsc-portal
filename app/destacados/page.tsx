'use client';

import { useState } from 'react';

interface FeaturedProject {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
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
    image: 'https://via.placeholder.com/400x250/667eea/ffffff?text=Facial+Recognition',
    author: 'Sofía López',
    likes: 245,
    views: 1850
  },
  {
    id: 2,
    title: 'Plataforma de E-commerce',
    description: 'Aplicación completa de comercio electrónico con carrito de compras, pagos y gestión de inventario.',
    category: 'Web Development',
    image: 'https://via.placeholder.com/400x250/764ba2/ffffff?text=E-commerce',
    author: 'Miguel Torres',
    likes: 189,
    views: 2340
  },
  {
    id: 3,
    title: 'Dashboard de Análisis Financiero',
    description: 'Herramienta interactiva para visualización y análisis de datos financieros en tiempo real.',
    category: 'Data Visualization',
    image: 'https://via.placeholder.com/400x250/f093fb/ffffff?text=Finance+Dashboard',
    author: 'Laura Jiménez',
    likes: 312,
    views: 2890
  },
  {
    id: 4,
    title: 'App de Fitness y Nutrición',
    description: 'Aplicación móvil para seguimiento de ejercicios, dietas personalizadas y metas de salud.',
    category: 'Mobile App',
    image: 'https://via.placeholder.com/400x250/4facfe/ffffff?text=Fitness+App',
    author: 'Roberto Sánchez',
    likes: 428,
    views: 3650
  },
  {
    id: 5,
    title: 'Sistema de Gestión Hospitalaria',
    description: 'Plataforma integral para gestión de pacientes, citas médicas y historiales clínicos.',
    category: 'Healthcare',
    image: 'https://via.placeholder.com/400x250/00f2fe/ffffff?text=Hospital+System',
    author: 'Elena Ramírez',
    likes: 276,
    views: 2150
  },
  {
    id: 6,
    title: 'Chatbot con IA',
    description: 'Asistente virtual inteligente con procesamiento de lenguaje natural y aprendizaje continuo.',
    category: 'Artificial Intelligence',
    image: 'https://via.placeholder.com/400x250/43e97b/ffffff?text=AI+Chatbot',
    author: 'Diego Morales',
    likes: 534,
    views: 4200
  }
];

export default function DestacadosPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('likes');

  const filteredProjects = seedData
    .filter(project => selectedCategory === 'all' || project.category === selectedCategory)
    .sort((a, b) => {
      if (sortBy === 'likes') return b.likes - a.likes;
      if (sortBy === 'views') return b.views - a.views;
      return 0;
    });

  const categories = ['all', ...Array.from(new Set(seedData.map(p => p.category)))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">🌟 Proyectos Destacados</h1>
          <p className="text-xl text-gray-600">Explora los proyectos más innovadores de nuestra comunidad</p>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <label className="text-gray-700 font-semibold">Categoría:</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === 'all' ? 'Todas las categorías' : cat}
                  </option>
                ))}
              </select>
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
              <div className="relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <span className="absolute top-3 right-3 px-3 py-1 text-xs font-semibold bg-white text-purple-600 rounded-full shadow-md">
                  {project.category}
                </span>
              </div>
              <div className="p-6">
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
