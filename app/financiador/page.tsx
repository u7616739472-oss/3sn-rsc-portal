"use client"
import Link from 'next/link'
import Image from 'next/image'
import { Search } from 'lucide-react'
import { useState } from 'react'

const financiadores = [
  {
    id: 1,
    name: "Fundación Aurora",
    description: "Convocatorias para educación y desarrollo digital",
    type: "Fundación",
    focus: "Educación",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop"
  },
  {
    id: 2,
    name: "Banco Solidario",
    description: "Líneas de crédito y grants para impacto social",
    type: "Banca",
    focus: "Finanzas",
    image: "https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=400&h=300&fit=crop"
  },
  {
    id: 3,
    name: "Agenda Global",
    description: "Cooperación internacional para salud y clima",
    type: "Agencia",
    focus: "Salud",
    image: "https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?w=400&h=300&fit=crop"
  },
  {
    id: 4,
    name: "EcoFund Ventures",
    description: "Inversión de impacto en proyectos ambientales",
    type: "Private Equity",
    focus: "Medio Ambiente",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=300&fit=crop"
  },
  {
    id: 5,
    name: "Instituto Social Tech",
    description: "Apoyo a ONGDs en transformación digital",
    type: "Instituto",
    focus: "Educación",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=300&fit=crop"
  },
  {
    id: 6,
    name: "GreenCapital Fund",
    description: "Financiamiento para proyectos de energía renovable",
    type: "Fondo de Inversión",
    focus: "Medio Ambiente",
    image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=400&h=300&fit=crop"
  }
]

export default function FinanciadoresPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('all')

  const types = ['all', ...Array.from(new Set(financiadores.map(f => f.type)))]

  const filteredFinanciadores = financiadores.filter(financiador => {
    const matchesSearch = financiador.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          financiador.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === 'all' || financiador.type === selectedType
    return matchesSearch && matchesType
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
            Financiadores
          </h1>
          <p style={{
            color: '#CCCCCC',
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            maxWidth: 820,
            margin: '0 auto 2.5rem',
            textAlign: 'center',
            lineHeight: 1.6
          }}>
            Explora entidades financiadoras comprometidas con el impacto social. Encuentra oportunidades de financiamiento para tu ONGD.
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
                placeholder="Buscar financiadores..."
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
        {/* Type Pills */}
        <div style={{
          display: 'flex',
          gap: '0.75rem',
          marginBottom: '2.5rem',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          {types.map(type => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              style={{
                padding: '0.625rem 1.5rem',
                background: selectedType === type 
                  ? 'linear-gradient(135deg, #FF9900, #FF7700)'
                  : 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: selectedType === type
                  ? 'none'
                  : '1px solid rgba(255, 153, 0, 0.3)',
                borderRadius: 8,
                color: selectedType === type ? '#000000' : '#FFFFFF',
                fontSize: 14,
                fontWeight: selectedType === type ? 700 : 500,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: selectedType === type 
                  ? '0 4px 16px rgba(255, 153, 0, 0.4)'
                  : 'none'
              }}
            >
              {type === 'all' ? 'Todos los tipos' : type}
            </button>
          ))}
        </div>

        {/* Financiadores Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '2rem'
        }}>
          {filteredFinanciadores.map(financiador => (
            <div
              key={financiador.id}
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
              {/* Financiador Image */}
              <div style={{ position: 'relative', height: 220, overflow: 'hidden' }}>
                <Image
                  src={financiador.image}
                  alt={financiador.name}
                  fill
                  style={{ objectFit: 'cover' }}
                />
                {/* Type Badge */}
                <span style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '1rem',
                  padding: '0.375rem 0.875rem',
                  background: 'rgba(99, 102, 241, 0.9)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: 6,
                  fontSize: 12,
                  fontWeight: 600,
                  color: '#FFFFFF'
                }}>
                  {financiador.type}
                </span>
              </div>

              {/* Financiador Content */}
              <div style={{ padding: '1.5rem' }}>
                {/* Focus Tag */}
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
                  {financiador.focus}
                </span>

                <h3 style={{
                  margin: '0 0 0.625rem 0',
                  fontSize: 20,
                  fontWeight: 700,
                  color: '#FFFFFF',
                  lineHeight: 1.3
                }}>
                  {financiador.name}
                </h3>

                <p style={{
                  margin: '0 0 1.25rem 0',
                  color: '#CCCCCC',
                  fontSize: 14,
                  lineHeight: 1.5
                }}>
                  {financiador.description}
                </p>

                {/* Link Button */}
                <Link
                  href={`/financiador/${financiador.id}`}
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
                  Ver convocatorias
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
