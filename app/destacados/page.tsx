'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

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
    views: 1850,
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
    views: 2340,
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
    views: 2890,
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
    views: 3120,
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
    views: 4560,
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
    views: 2670,
  },
];

const categoryStyles: Record<string, string> = {
  Todos: 'from-slate-500 to-slate-700 text-white',
  'Computer Vision': 'from-violet-500 to-fuchsia-600 text-white',
  'Web Development': 'from-sky-500 to-blue-600 text-white',
  Salud: 'from-emerald-500 to-teal-600 text-white',
  'Data Science': 'from-amber-500 to-orange-600 text-white',
  'Social Media': 'from-pink-500 to-rose-600 text-white',
  Educación: 'from-indigo-500 to-purple-600 text-white',
};

export default function DestacadosPage() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [sortBy, setSortBy] = useState<'likes' | 'views'>('likes');
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const categories = ['Todos', ...Array.from(new Set(seedData.map((p) => p.category)))];

  const filteredProjects = seedData
    .filter((project) => selectedCategory === 'Todos' || project.category === selectedCategory)
    .sort((a, b) => (sortBy === 'likes' ? b.likes - a.likes : b.views - a.views));

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Gradient background with subtle overlay */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-rose-50 to-sky-50" />
        <div className="absolute inset-0 bg-[radial-gradient(40%_60%_at_70%_10%,rgba(168,85,247,0.10),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(30%_40%_at_20%_80%,rgba(14,165,233,0.10),transparent)]" />
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className={`mb-8 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">🌟 Proyectos Destacados</span>
          </h1>
          <p className="text-base md:text-lg text-gray-600">Descubre los proyectos más populares y creativos de nuestra comunidad</p>
        </div>

        {/* Floating categories bar with icons */}
        <div className={`sticky top-4 z-20 mb-8 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/40 border border-white/40 shadow-md rounded-2xl p-3 transition-all duration-700 ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="flex flex-wrap gap-2 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`group inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-300 hover:shadow-lg ${
                    selectedCategory === cat
                      ? `bg-gradient-to-r ${categoryStyles[cat] ?? 'from-slate-600 to-slate-800 text-white'} shadow-lg scale-105`
                      : 'bg-white text-gray-700 hover:-translate-y-0.5 border border-gray-200'
                  }`}
                >
                  <span className="text-base">
                    {cat === 'Todos' && '🧭'}
                    {cat === 'Computer Vision' && '📷'}
                    {cat === 'Web Development' && '🕸️'}
                    {cat === 'Salud' && '🧠'}
                    {cat === 'Data Science' && '📊'}
                    {cat === 'Social Media' && '🎨'}
                    {cat === 'Educación' && '🎓'}
                  </span>
                  <span>{cat}</span>
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <label className="text-gray-700 font-semibold">Ordenar:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'likes' | 'views')}
                className="px-3 py-2 bg-white/80 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              >
                <option value="likes">Más likes</option>
                <option value="views">Más vistas</option>
              </select>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              className={`group bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${
                mounted ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                transitionDelay: `${Math.min(idx, 6) * 60}ms`,
              }}
            >
              {/* Main Image with Hover Zoom and stronger shadow */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* gradient inner shadow */}
                <div className="pointer-events-none absolute inset-0 shadow-[inset_0_-40px_60px_rgba(0,0,0,0.25)]" />

                {/* Category Badge */}
                <span className="absolute top-3 right-3 px-3 py-1 text-xs font-semibold bg-white/90 backdrop-blur rounded-full shadow-md">
                  {project.category}
                </span>

                {/* Circular Logo */}
                <div className="absolute bottom-0 left-6 translate-y-1/2">
                  <Image
                    src={project.logo}
                    alt={`${project.title} logo`}
                    width={64}
                    height={64}
                    className="rounded-full border-4 border-white shadow-xl object-cover bg-white"
                  />
                </div>
              </div>

              {/* Body */}
              <div className="p-6 pt-10">
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">{project.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span className="flex items-center gap-1">👤 {project.author}</span>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <span className="flex items-center gap-1 text-red-500 font-semibold">❤️ {project.likes}</span>
                  <span className="flex items-center gap-1 text-blue-500 font-semibold">👁️ {project.views}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <p className="text-gray-500 text-lg">No hay proyectos en esta categoría.</p>
          </div>
        )}
      </div>

      {/* Visual Footer */}
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
    </div>
  );
}
