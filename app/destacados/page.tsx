'use client';
import { useState } from 'react';
import Image from 'next/image';

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
    title: 'Aulas Digitales Rurales',
    description: 'Dotación de tablets, formación docente y conectividad en 10 escuelas rurales.',
    category: 'Educación',
    image: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=800&h=400&fit=crop',
    author: 'Fundación Horizonte',
    likes: 312,
    views: 2890,
  },
  {
    id: 2,
    title: 'Clínica Móvil Comunitaria',
    description: 'Unidad móvil para prevención y chequeos en 15 comunidades.',
    category: 'Salud',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=400&fit=crop',
    author: 'Salud al Día',
    likes: 245,
    views: 1850,
  },
  {
    id: 3,
    title: 'Bosques Urbanos',
    description: 'Plantación de 5000 árboles en zonas urbanas de alta polución.',
    category: 'Medio Ambiente',
    image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&h=400&fit=crop',
    author: 'Verde Vivo',
    likes: 425,
    views: 4560,
  },
  {
    id: 4,
    title: 'IA para Educación Inclusiva',
    description: 'Plataforma de IA para personalizar educación y mejorar accesibilidad.',
    category: 'Tecnología',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=400&fit=crop',
    author: 'Telefonica + Microsoft',
    likes: 278,
    views: 3120,
  },
  {
    id: 5,
    title: 'Agua Limpia para Todos',
    description: 'Sistemas de purificación de agua en comunidades con acceso limitado.',
    category: 'Medioambiente',
    image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&h=400&fit=crop',
    author: 'Nestlé / UNICEF',
    likes: 198,
    views: 2670,
  },
  {
    id: 6,
    title: 'Conectividad Rural 5G',
    description: 'Expansión de redes 5G en áreas rurales para reducir la brecha digital.',
    category: 'Tecnología',
    image: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=800&h=400&fit=crop',
    author: 'Telefónica SA',
    likes: 189,
    views: 2340,
  },
];

const categories = ['Todos', 'Educación', 'Salud', 'Medio Ambiente', 'Tecnología', 'Medioambiente'];

export default function DestacadosPage() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [sortBy, setSortBy] = useState<'likes' | 'views'>('likes');

  const filtered = seedData
    .filter((p) => selectedCategory === 'Todos' || p.category === selectedCategory)
    .sort((a, b) => (sortBy === 'likes' ? b.likes - a.likes : b.views - a.views));

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 700, color: '#FF9900' }}>Proyectos Destacados</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginTop: '0.5rem' }}>Los proyectos de mayor impacto en la plataforma</p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.5rem', justifyContent: 'center' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '0.5rem 1.25rem',
                borderRadius: 8,
                border: selectedCategory === cat ? 'none' : '1px solid rgba(255,153,0,0.3)',
                background: selectedCategory === cat ? '#FF9900' : 'rgba(255,255,255,0.05)',
                color: selectedCategory === cat ? '#000' : '#fff',
                cursor: 'pointer',
                fontWeight: selectedCategory === cat ? 700 : 400,
              }}
            >
              {cat}
            </button>
          ))}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'likes' | 'views')}
            style={{ padding: '0.5rem 1rem', borderRadius: 8, background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,153,0,0.3)' }}
          >
            <option value="likes">Más likes</option>
            <option value="views">Más vistas</option>
          </select>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
          {filtered.map((project) => (
            <div
              key={project.id}
              style={{
                borderRadius: 16,
                overflow: 'hidden',
                border: '1px solid rgba(255,153,0,0.2)',
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(10px)',
                transition: 'transform 0.2s',
              }}
            >
              <div style={{ position: 'relative', height: 200 }}>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '1.25rem' }}>
                <span style={{ fontSize: 12, background: 'rgba(255,153,0,0.2)', color: '#FF9900', padding: '0.25rem 0.75rem', borderRadius: 20 }}>
                  {project.category}
                </span>
                <h3 style={{ marginTop: '0.75rem', fontSize: '1.1rem', fontWeight: 700 }}>{project.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, marginTop: '0.5rem' }}>{project.description}</p>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, marginTop: '0.5rem' }}>Por: {project.author}</p>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>
                  <span>❤️ {project.likes}</span>
                  <span>👁️ {project.views}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
