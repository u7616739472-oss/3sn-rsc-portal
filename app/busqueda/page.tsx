'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const proyectos = [
  {
    id: 1, titulo: 'Parque Eólico Comunitario',
    descripcion: 'Desarrollo de parques eólicos con participación comunitaria y beneficios locales en zonas rurales.',
    categoria: 'Energía', estado: 'En progreso', ods: ['ODS 7', 'ODS 13'],
    presupuesto: 2500000, financiado: 815000,
    empresa: 'Iberdrola + Santander',
    imagen: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600&h=350&fit=crop',
  },
  {
    id: 2, titulo: 'Textiles Circulares',
    descripcion: 'Programa de reciclaje y reutilización de textiles para economía circular en toda España.',
    categoria: 'Medioambiente', estado: 'Aprobado', ods: ['ODS 12', 'ODS 8'],
    presupuesto: 1800000, financiado: 630000,
    empresa: 'Inditex Group',
    imagen: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&h=350&fit=crop',
  },
  {
    id: 3, titulo: 'Smart Cities Sostenibles',
    descripcion: 'Implementación de tecnologías inteligentes para ciudades más sostenibles y eficientes.',
    categoria: 'Tecnología', estado: 'En progreso', ods: ['ODS 11', 'ODS 9'],
    presupuesto: 5000000, financiado: 1640000,
    empresa: 'Iberdrola + Acciona',
    imagen: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&h=350&fit=crop',
  },
  {
    id: 4, titulo: 'Microfinanzas Rurales',
    descripcion: 'Programa de microcréditos para emprendimiento en zonas rurales de España y Latinoamérica.',
    categoria: 'Finanzas', estado: 'Completado', ods: ['ODS 1', 'ODS 10'],
    presupuesto: 1500000, financiado: 1500000,
    empresa: 'Santander Bank',
    imagen: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&h=350&fit=crop',
  },
  {
    id: 5, titulo: 'IA para Educación Inclusiva',
    descripcion: 'Plataforma de inteligencia artificial para personalizar educación y mejorar accesibilidad.',
    categoria: 'Educación', estado: 'Aprobado', ods: ['ODS 4', 'ODS 10'],
    presupuesto: 3800000, financiado: 1026000,
    empresa: 'Telefónica + Microsoft',
    imagen: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=350&fit=crop',
  },
  {
    id: 6, titulo: 'Conectividad Rural 5G',
    descripcion: 'Expansión de redes 5G en áreas rurales para reducir la brecha digital en zonas aisladas.',
    categoria: 'Tecnología', estado: 'En progreso', ods: ['ODS 9', 'ODS 10'],
    presupuesto: 4500000, financiado: 900000,
    empresa: 'Telefónica SA',
    imagen: 'https://images.unsplash.com/photo-1560472355-536de3962603?w=600&h=350&fit=crop',
  },
  {
    id: 7, titulo: 'Agua Limpia para Todos',
    descripcion: 'Sistemas de purificación de agua en comunidades con acceso limitado en África y Asia.',
    categoria: 'Medioambiente', estado: 'En progreso', ods: ['ODS 6', 'ODS 3'],
    presupuesto: 2800000, financiado: 980000,
    empresa: 'Nestlé International',
    imagen: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=600&h=350&fit=crop',
  },
  {
    id: 8, titulo: 'Biodiversidad Urbana',
    descripcion: 'Proyectos de infraestructura verde para promover biodiversidad en ciudades europeas.',
    categoria: 'Medioambiente', estado: 'En progreso', ods: ['ODS 15', 'ODS 11'],
    presupuesto: 1900000, financiado: 665000,
    empresa: 'Acciona SA',
    imagen: 'https://images.unsplash.com/photo-1444492417251-9c84a5fa18e0?w=600&h=350&fit=crop',
  },
]

const ESTADOS: Record<string, string> = {
  'En progreso': '#FF9900',
  'Aprobado': '#3b82f6',
  'Completado': '#22c55e',
}

const CATS = ['Todas', 'Energía', 'Medioambiente', 'Tecnología', 'Finanzas', 'Educación']

export default function BusquedaPage() {
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState('Todas')

  const filtrados = proyectos.filter(p => {
    const matchSearch = p.titulo.toLowerCase().includes(search.toLowerCase()) ||
      p.descripcion.toLowerCase().includes(search.toLowerCase()) ||
      p.empresa.toLowerCase().includes(search.toLowerCase())
    const matchCat = cat === 'Todas' || p.categoria === cat
    return matchSearch && matchCat
  })

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fff' }}>
      {/* Header de sección */}
      <div style={{ background: 'linear-gradient(to bottom, rgba(255,153,0,0.06), transparent)', borderBottom: '1px solid rgba(255,153,0,0.1)', padding: '3rem 1.5rem 2rem' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <span style={{ background: 'rgba(255,153,0,0.12)', border: '1px solid rgba(255,153,0,0.3)', borderRadius: 20, padding: '0.3rem 1rem', fontSize: 13, color: '#FF9900' }}>Directorio de proyectos</span>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 800, marginTop: '0.75rem', marginBottom: '0.5rem' }}>Busca <span style={{ color: '#FF9900' }}>Proyectos RSC</span></h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1.05rem', marginBottom: '1.75rem' }}>Explora proyectos verificados de impacto real. Filtra por sector y encuentra la oportunidad adecuada.</p>
          {/* Barra de búsqueda */}
          <div style={{ position: 'relative', maxWidth: 560, margin: '0 auto' }}>
            <span style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#FF9900', fontSize: 18 }}>🔍</span>
            <input
              type="text" placeholder="Buscar por nombre, empresa u ODS..."
              value={search} onChange={e => setSearch(e.target.value)}
              style={{ width: '100%', padding: '0.875rem 1rem 0.875rem 3rem', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,153,0,0.3)', borderRadius: 12, color: '#fff', fontSize: 15, outline: 'none', boxSizing: 'border-box' }}
            />
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem 1.5rem' }}>
        {/* Filtros */}
        <div style={{ display: 'flex', gap: '0.625rem', flexWrap: 'wrap', marginBottom: '2rem', alignItems: 'center' }}>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, marginRight: '0.25rem' }}>Sector:</span>
          {CATS.map(c => (
            <button key={c} onClick={() => setCat(c)}
              style={{ padding: '0.45rem 1.1rem', borderRadius: 20, border: cat === c ? 'none' : '1px solid rgba(255,153,0,0.25)', background: cat === c ? '#FF9900' : 'rgba(255,255,255,0.04)', color: cat === c ? '#000' : 'rgba(255,255,255,0.8)', fontSize: 13, cursor: 'pointer', fontWeight: cat === c ? 700 : 400 }}>
              {c}
            </button>
          ))}
          <span style={{ marginLeft: 'auto', fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>{filtrados.length} resultado{filtrados.length !== 1 ? 's' : ''}</span>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
          {filtrados.map(p => {
            const pct = Math.round((p.financiado / p.presupuesto) * 100)
            return (
              <div key={p.id} style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.09)', background: 'rgba(255,255,255,0.04)', transition: 'border-color 0.2s' }}>
                <div style={{ position: 'relative', height: 190 }}>
                  <Image src={p.imagen} alt={p.titulo} fill style={{ objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.75), transparent)' }} />
                  <div style={{ position: 'absolute', top: 12, left: 12, right: 12, display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,153,0,0.35)', borderRadius: 20, padding: '0.2rem 0.7rem', fontSize: 12, color: '#FF9900' }}>{p.categoria}</span>
                    <span style={{ background: ESTADOS[p.estado] + '22', border: `1px solid ${ESTADOS[p.estado]}55`, borderRadius: 20, padding: '0.2rem 0.7rem', fontSize: 12, color: ESTADOS[p.estado] }}>{p.estado}</span>
                  </div>
                  <div style={{ position: 'absolute', bottom: 12, left: 12 }}>
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      {p.ods.map(o => <span key={o} style={{ background: 'rgba(0,0,0,0.6)', borderRadius: 4, padding: '0.15rem 0.5rem', fontSize: 11, color: 'rgba(255,255,255,0.8)' }}>{o}</span>)}
                    </div>
                  </div>
                </div>
                <div style={{ padding: '1.25rem' }}>
                  <h3 style={{ margin: '0 0 0.25rem', fontSize: '1.05rem', fontWeight: 700 }}>{p.titulo}</h3>
                  <p style={{ margin: '0 0 0.15rem', fontSize: 12, color: '#FF9900' }}>{p.empresa}</p>
                  <p style={{ margin: '0 0 1rem', fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>{p.descripcion}</p>
                  {/* Progreso financiación */}
                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'rgba(255,255,255,0.55)', marginBottom: '0.4rem' }}>
                      <span>{(p.financiado / 1000000).toFixed(1)}M€ recaudados</span>
                      <span style={{ color: pct >= 80 ? '#22c55e' : pct >= 40 ? '#FF9900' : '#f87171', fontWeight: 600 }}>{pct}%</span>
                    </div>
                    <div style={{ height: 5, background: 'rgba(255,255,255,0.1)', borderRadius: 3 }}>
                      <div style={{ height: '100%', width: `${pct}%`, background: pct >= 80 ? '#22c55e' : '#FF9900', borderRadius: 3 }} />
                    </div>
                  </div>
                  <button style={{ width: '100%', padding: '0.65rem', borderRadius: 8, background: '#FF9900', color: '#000', fontWeight: 700, border: 'none', fontSize: 14, cursor: 'pointer' }}>
                    Ver detalles →
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {filtrados.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: 'rgba(255,255,255,0.4)' }}>
            <p style={{ fontSize: '1.5rem' }}>🔍</p>
            <p>No se encontraron proyectos con ese criterio.</p>
          </div>
        )}
      </div>
    </div>
  )
}
