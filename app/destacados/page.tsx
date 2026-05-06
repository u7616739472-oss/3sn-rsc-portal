'use client'
import { useState } from 'react'
import Link from 'next/link'

const destacados = [
  {
    id: 1,
    titulo: 'Aulas Digitales Rurales',
    ongd: 'Fundacion Horizonte',
    empresa: 'Telefonica',
    categoria: 'Educacion',
    financiado: 58000,
    objetivo: 60000,
    beneficiarios: 1200,
    inicio: 'Ene 2024',
    estado: 'Completado',
    impacto: '1.200 ninos con acceso a educacion digital en 8 municipios rurales de Castilla y Leon.',
    ods: ['ODS 4', 'ODS 10'],
    img: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80',
    hitos: [{ nombre: 'Equipamiento', pct: 100 }, { nombre: 'Formacion docente', pct: 100 }, { nombre: 'Seguimiento 6m', pct: 80 }]
  },
  {
    id: 2,
    titulo: 'Bosques Urbanos Madrid',
    ongd: 'Tierra Viva',
    empresa: 'Iberdrola',
    categoria: 'Medio Ambiente',
    financiado: 89000,
    objetivo: 90000,
    beneficiarios: 45000,
    inicio: 'Mar 2024',
    estado: 'En curso',
    impacto: 'Plantacion de 3.000 arboles en 12 barrios de Madrid. Reduccion de CO2 estimada: 180 toneladas/ano.',
    ods: ['ODS 11', 'ODS 13', 'ODS 15'],
    img: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80',
    hitos: [{ nombre: 'Planificacion', pct: 100 }, { nombre: 'Plantacion fase 1', pct: 100 }, { nombre: 'Mantenimiento', pct: 60 }]
  },
  {
    id: 3,
    titulo: 'Clinica Movil Comunitaria',
    ongd: 'Salud Para Todos',
    empresa: 'Mapfre',
    categoria: 'Salud',
    financiado: 31000,
    objetivo: 75000,
    beneficiarios: 800,
    inicio: 'Jun 2024',
    estado: 'En desarrollo',
    impacto: 'Atencion medica basica a 800 personas en zonas sin cobertura sanitaria de Extremadura.',
    ods: ['ODS 3', 'ODS 10'],
    img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
    hitos: [{ nombre: 'Vehiculo equipado', pct: 100 }, { nombre: 'Rutas activas', pct: 45 }, { nombre: 'Campana prevencion', pct: 10 }]
  },
  {
    id: 4,
    titulo: 'Microfinanzas para Emprendedoras',
    ongd: 'Mujeres en Accion',
    empresa: 'BBVA',
    categoria: 'Inclusion Social',
    financiado: 42000,
    objetivo: 50000,
    beneficiarios: 230,
    inicio: 'Feb 2024',
    estado: 'En curso',
    impacto: '230 mujeres con microemprendimiento activo y formacion financiera basica en Andalucia.',
    ods: ['ODS 1', 'ODS 5', 'ODS 8'],
    img: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80',
    hitos: [{ nombre: 'Seleccion beneficiarias', pct: 100 }, { nombre: 'Formacion', pct: 90 }, { nombre: 'Microcreditos', pct: 70 }]
  },
]

const estadoColor: Record<string, string> = {
  'Completado': '#22c55e',
  'En curso': '#FF9900',
  'En desarrollo': '#6366f1',
}

export default function DestacadosPage() {
  const [activo, setActivo] = useState<number | null>(null)
  const proyecto = activo !== null ? destacados.find(d => d.id === activo) : null

  return (
    <main style={{ minHeight: '100vh', color: '#fff', background: '#0a0a0a' }}>

      {/* HERO */}
      <section style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #0f0d00 50%, #0a0a0a 100%)', padding: '5rem 2rem 3rem', textAlign: 'center', borderBottom: '1px solid rgba(255,153,0,0.12)' }}>
        <div style={{ display: 'inline-block', background: 'rgba(255,153,0,0.1)', border: '1px solid rgba(255,153,0,0.3)', borderRadius: 20, padding: '0.35rem 1rem', marginBottom: '1.5rem', fontSize: '0.8rem', color: '#FF9900' }}>Casos de exito verificados</div>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, marginBottom: '1rem' }}>Proyectos <span style={{ color: '#FF9900' }}>Destacados</span></h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 620, margin: '0 auto', fontSize: '1.05rem', lineHeight: 1.7 }}>
          Los proyectos con mayor impacto verificado de nuestra plataforma. Transparencia total: empresa financiadora, ONGD ejecutora, hitos y beneficiarios reales.
        </p>
      </section>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '3rem 2rem', display: 'grid', gridTemplateColumns: proyecto ? '1fr 380px' : '1fr', gap: '2rem', alignItems: 'start' }}>

        {/* GRID PROYECTOS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {destacados.map(d => {
            const pct = Math.round((d.financiado / d.objetivo) * 100)
            const isActivo = activo === d.id
            return (
              <div
                key={d.id}
                onClick={() => setActivo(isActivo ? null : d.id)}
                style={{ background: isActivo ? '#1e1600' : '#161616', borderRadius: 14, overflow: 'hidden', border: `1px solid ${isActivo ? '#FF9900' : 'rgba(255,255,255,0.08)'}`, cursor: 'pointer', transition: 'all 0.2s' }}
              >
                <div style={{ height: 190, backgroundImage: `url(${d.img})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
                  <span style={{ position: 'absolute', top: 10, left: 10, background: estadoColor[d.estado], color: '#000', padding: '0.2rem 0.65rem', borderRadius: 20, fontSize: '0.72rem', fontWeight: 700 }}>{d.estado}</span>
                  <span style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(0,0,0,0.7)', color: '#FF9900', padding: '0.2rem 0.65rem', borderRadius: 20, fontSize: '0.72rem', fontWeight: 600 }}>{d.categoria}</span>
                </div>
                <div style={{ padding: '1.25rem' }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '0.3rem' }}>{d.titulo}</h3>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.75rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>
                    <span>{d.ongd}</span>
                    <span style={{ color: 'rgba(255,255,255,0.2)' }}>x</span>
                    <span style={{ color: '#FF9900' }}>{d.empresa}</span>
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.84rem', lineHeight: 1.5, marginBottom: '1rem' }}>{d.impacto}</p>
                  <div style={{ marginBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', marginBottom: '0.35rem' }}>
                      <span>{d.financiado.toLocaleString()} EUR financiados</span>
                      <span style={{ color: pct >= 80 ? '#22c55e' : '#FF9900', fontWeight: 700 }}>{pct}%</span>
                    </div>
                    <div style={{ height: 5, background: 'rgba(255,255,255,0.1)', borderRadius: 3 }}>
                      <div style={{ height: '100%', width: `${pct}%`, background: pct >= 80 ? '#22c55e' : '#FF9900', borderRadius: 3 }} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                    <span style={{ color: 'rgba(255,255,255,0.4)' }}>{d.beneficiarios.toLocaleString()} beneficiarios</span>
                    <span style={{ color: '#FF9900', fontWeight: 600 }}>Ver hitos</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* PANEL DETALLE */}
        {proyecto && (
          <div style={{ background: '#141414', border: '1px solid rgba(255,153,0,0.25)', borderRadius: 16, padding: '1.75rem', position: 'sticky', top: '1rem' }}>
            <button onClick={() => setActivo(null)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', marginBottom: '1rem', fontSize: '0.85rem' }}>x Cerrar</button>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.4rem', color: '#FF9900' }}>{proyecto.titulo}</h2>
            <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', marginBottom: '1.25rem' }}>{proyecto.ongd} + {proyecto.empresa} - desde {proyecto.inicio}</div>

            <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: '1rem', marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: 1 }}>Impacto verificado</div>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.8)' }}>{proyecto.impacto}</p>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: 1 }}>Avance por hitos</div>
              {proyecto.hitos.map(h => (
                <div key={h.nombre} style={{ marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '0.3rem' }}>
                    <span>{h.nombre}</span>
                    <span style={{ color: h.pct === 100 ? '#22c55e' : '#FF9900', fontWeight: 700 }}>{h.pct}%</span>
                  </div>
                  <div style={{ height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 3 }}>
                    <div style={{ height: '100%', width: `${h.pct}%`, background: h.pct === 100 ? '#22c55e' : '#FF9900', borderRadius: 3 }} />
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              {proyecto.ods.map(o => <span key={o} style={{ background: 'rgba(255,153,0,0.1)', color: '#FF9900', border: '1px solid rgba(255,153,0,0.25)', borderRadius: 6, padding: '0.2rem 0.6rem', fontSize: '0.75rem', fontWeight: 600 }}>{o}</span>)}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: '0.75rem', textAlign: 'center' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#FF9900' }}>{proyecto.beneficiarios.toLocaleString()}</div>
                <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)' }}>Beneficiarios</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: '0.75rem', textAlign: 'center' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#22c55e' }}>{Math.round((proyecto.financiado / proyecto.objetivo) * 100)}%</div>
                <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)' }}>Financiado</div>
              </div>
            </div>

            <Link href="/busqueda" style={{ display: 'block', textAlign: 'center', background: '#FF9900', color: '#000', padding: '0.8rem', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: '0.9rem' }}>Financiar proyectos similares</Link>
          </div>
        )}
      </div>
    </main>
  )
}
