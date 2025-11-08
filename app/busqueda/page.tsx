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
    description: "Sistema de préstamos y gestión financiera para emprendedores",
    category: "Finanzas",
    status: "En desarrollo",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=300&fit=crop"
  },
  {
    id: 4,
    title: "Sistema de Telemedicina",
    description: "Consultas médicas remotas y gestión de historiales clínicos",
    category: "Salud",
    status: "Activo",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop"
  },
  {
    id: 5,
    title: "Programa de Alfabetización Digital",
    description: "Iniciativa para enseñar habilidades tecnológicas básicas",
    category: "Educación",
    status: "Activo",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop"
  },
  {
    id: 6,
    title: "Red de Reciclaje Comunitario",
    description: "Sistema de gestión y trazabilidad de materiales reciclables",
    category: "Medio Ambiente",
    status: "En desarrollo",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=300&fit=crop"
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
    <main style={{ minHeight: '100vh', color: '#FFFFFF' }}>
      {/* Header Section */}
      <section style={{ 
        background: 'linear-gradient(180deg, rgba(255,153,0,0.1) 0%, rgba(0,0,0,0) 100%)',
        padding: '3rem 1.25rem 4rem',
        borderBottom: '1px solid rgba(255, 153, 0, 0.1)'
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          {/* Title & Subtitle */}
          <h1 style={{
            fontSize: 'clamp(2rem, 3vw, 3rem)',
            fontWeight: 800,
            marginBottom: '0.75rem',
            textAlign: 'center',
            color: '#FFFFFF'
          }}>
            Busca Proyectos
          </h1>
          <p style={{
            color: '#CCCCCC',
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            maxWidth: 820,
            margin: '0 auto 2.5rem',
            textAlign: 'center',
            lineHeight: 1.6
          }}>
            Explora proyectos verificados que generan impacto real. Filtra por categoría y encuentra oportunidades de financiamiento sostenible.
          </p>
          
          {/* Search Bar - Centered */}
          <div style={{
            maxWidth: '650px',
            margin: '0 auto',
            position: 'relative'
          }}>
            <div style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center'
            }}>
              <Search 
                size={20} 
                style={{
                  position: 'absolute',
                  left: '1.25rem',
                  color: '#FF9900',
                  zIndex: 1
                }} 
              />
              <input
                type="text"
                placeholder="Buscar proyectos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '1rem 1rem 1rem 3.5rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 153, 0, 0.3)',
                  borderRadius: 12,
                  color: '#FFFFFF',
                  fontSize: 16,
                  outline: 'none'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '3rem 1.25rem'
      }}>
        {/* Category Pills */}
        <div style={{
          display: 'flex',
          gap: '0.75rem',
          marginBottom: '2.5rem',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '0.625rem 1.5rem',
                background: selectedCategory === cat 
                  ? 'linear-gradient(135deg, #FF9900, #FF7700)'
                  : 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: selectedCategory === cat
                  ? 'none'
                  : '1px solid rgba(255, 153, 0, 0.3)',
                borderRadius: 8,
                color: selectedCategory === cat ? '#000000' : '#FFFFFF',
                fontSize: 14,
                fontWeight: selectedCategory === cat ? 700 : 500,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: selectedCategory === cat 
                  ? '0 4px 16px rgba(255, 153, 0, 0.4)'
                  : 'none'
              }}
            >
              {cat === 'all' ? 'Todas las categorías' : cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '2rem'
        }}>
          {filteredProjects.map(project => (
            <div
              key={project.id}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 153, 0, 0.2)',
                borderRadius: 16,
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(255, 153, 0, 0.2)'
                e.currentTarget.style.borderColor = 'rgba(255, 153, 0, 0.4)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.borderColor = 'rgba(255, 153, 0, 0.2)'
              }}
            >
              {/* Project Image */}
              <div style={{ position: 'relative', height: 220, overflow: 'hidden' }}>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
                {/* Status Badge */}
                <span style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '1rem',
                  padding: '0.375rem 0.875rem',
                  background: project.status === 'Completado' || project.status === 'Activo'
                    ? 'rgba(34, 197, 94, 0.9)'
                    : 'rgba(234, 179, 8, 0.9)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: 6,
                  fontSize: 12,
                  fontWeight: 600,
                  color: '#FFFFFF'
                }}>
                  {project.status}
                </span>
              </div>

              {/* Project Content */}
              <div style={{ padding: '1.5rem' }}>
                {/* Category Tag */}
                <span style={{
                  display: 'inline-block',
                  padding: '0.25rem 0.75rem',
                  background: 'rgba(255, 153, 0, 0.15)',
                  border: '1px solid rgba(255, 153, 0, 0.3)',
                  borderRadius: 6,
                  fontSize: 12,
                  fontWeight: 600,
                  color: '#FF9900',
                  marginBottom: '0.875rem'
                }}>
                  {project.category}
                </span>

                <h3 style={{
                  margin: '0 0 0.625rem 0',
                  fontSize: 20,
                  fontWeight: 700,
                  color: '#FFFFFF',
                  lineHeight: 1.3
                }}>
                  {project.title}
                </h3>

                <p style={{
                  margin: '0 0 1.25rem 0',
                  color: '#CCCCCC',
                  fontSize: 14,
                  lineHeight: 1.5
                }}>
                  {project.description}
                </p>

                {/* Link Button */}
                <Link
                  href={`/proyecto/${project.id}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.625rem 1.25rem',
                    background: 'linear-gradient(135deg, #FF9900, #FF7700)',
                    color: '#000000',
                    borderRadius: 8,
                    fontSize: 14,
                    fontWeight: 700,
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 12px rgba(255, 153, 0, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 153, 0, 0.5)'
                    e.currentTarget.style.transform = 'translateX(2px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 153, 0, 0.3)'
                    e.currentTarget.style.transform = 'translateX(0)'
                  }}
                >
                  Ver detalles
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
