'use client'
import { useState } from 'react'
import Link from 'next/link'

const financiadores = [
  {
    id: 1, nombre: 'Fundacion Aurora', tipo: 'Fundacion', foco: 'Educacion',
    desc: 'Convocatorias abiertas para proyectos de educacion digital, formacion profesional y reduccion de brecha tecnologica en zonas rurales.',
    presupuesto: '20.000 - 80.000 EUR', plazo: '31 Mar 2025', proyectos: 14, ods: ['ODS 4', 'ODS 10'],
    img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80'
  },
  {
    id: 2, nombre: 'Banco Solidario', tipo: 'Banca', foco: 'Finanzas',
    desc: 'Lineas de credito blando y grants no reembolsables para proyectos de inclusion financiera, microemprendimiento y economia social.',
    presupuesto: '50.000 - 250.000 EUR', plazo: '15 Abr 2025', proyectos: 22, ods: ['ODS 1', 'ODS 8'],
    img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80'
  },
  {
    id: 3, nombre: 'Agenda Global', tipo: 'Agencia', foco: 'Salud',
    desc: 'Cooperacion internacional para proyectos de salud comunitaria, acceso a agua potable y adaptacion climatica en paises en desarrollo.',
    presupuesto: '100.000 - 500.000 EUR', plazo: '30 Jun 2025', proyectos: 8, ods: ['ODS 3', 'ODS 6', 'ODS 13'],
    img: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80'
  },
  {
    id: 4, nombre: 'Capital Verde', tipo: 'Private Equity', foco: 'Medio Ambiente',
    desc: 'Inversion de impacto en proyectos de economia circular, energias renovables y biodiversidad con retorno social medible.',
    presupuesto: '200.000 - 1.000.000 EUR', plazo: '01 May 2025', proyectos: 6, ods: ['ODS 7', 'ODS 12', 'ODS 15'],
    img: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600&q=80'
  },
  {
    id: 5, nombre: 'Instituto Progreso Social', tipo: 'Instituto', foco: 'Inclusion Social',
    desc: 'Programas de investigacion aplicada e innovacion social para reduccion de pobreza, igualdad de genero y acceso a vivienda digna.',
    presupuesto: '15.000 - 60.000 EUR', plazo: '28 Feb 2025', proyectos: 19, ods: ['ODS 5', 'ODS 10', 'ODS 11'],
    img: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=80'
  },
  {
    id: 6, nombre: 'Fondo Iberoamerica RSC', tipo: 'Fondo de Inversion', foco: 'Cultura',
    desc: 'Financiacion de proyectos culturales, preservacion del patrimonio y desarrollo comunitario a traves del arte y la educacion.',
    presupuesto: '10.000 - 40.000 EUR', plazo: '15 May 2025', proyectos: 31, ods: ['ODS 4', 'ODS 11'],
    img: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=600&q=80'
  },
]

const tipos = ['Todos', 'Fundacion', 'Banca', 'Agencia', 'Private Equity', 'Instituto', 'Fondo de Inversion']

export default function FinanciadoresPage() {
  const [filtro, setFiltro] = useState('Todos')
  const [busqueda, setBusqueda] = useState('')
  const [solicitudId, setSolicitudId] = useState<number | null>(null)

  const filtrados = financiadores.filter(f => {
    const matchTipo = filtro === 'Todos' || f.tipo === filtro
    const matchBusqueda = f.nombre.toLowerCase().includes(busqueda.toLowerCase()) || f.foco.toLowerCase().includes(busqueda.toLowerCase())
    return matchTipo && matchBusqueda
  })

  return (
    <main style={{ minHeight: '100vh', color: '#fff', background: '#0a0a0a' }}>

      {/* HERO */}
      <section style={{ background: 'linear-gradient(180deg, #0f0800 0%, #0a0a0a 100%)', padding: '5rem 2rem 3rem', textAlign: 'center', borderBottom: '1px solid rgba(255,153,0,0.15)' }}>
        <div style={{ display: 'inline-block', background: 'rgba(255,153,0,0.1)', border: '1px solid rgba(255,153,0,0.3)', borderRadius: 20, padding: '0.35rem 1rem', marginBottom: '1.5rem', fontSize: '0.8rem', color: '#FF9900' }}>Directorio verificado</div>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, marginBottom: '1rem' }}>Financiadores <span style={{ color: '#FF9900' }}>RSC y ESG</span></h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 600, margin: '0 auto 2.5rem', fontSize: '1.05rem', lineHeight: 1.7 }}>
          Entidades comprometidas con el impacto social. Encuentra convocatorias abiertas y conecta con el financiador que mejor se alinea con tu proyecto.
        </p>
        <input
          type="text"
          placeholder="Buscar por nombre o foco tematico..."
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
          style={{ width: '100%', maxWidth: 560, padding: '0.9rem 1.2rem', borderRadius: 10, background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', fontSize: '1rem', outline: 'none' }}
        />
      </section>

      {/* FILTROS */}
      <div style={{ padding: '1.5rem 2rem', maxWidth: 1100, margin: '0 auto', display: 'flex', gap: '0.6rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        {tipos.map(t => (
          <button key={t} onClick={() => setFiltro(t)} style={{ padding: '0.5rem 1.2rem', borderRadius: 20, border: '1px solid', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.2s', background: filtro === t ? '#FF9900' : 'transparent', color: filtro === t ? '#000' : 'rgba(255,255,255,0.7)', borderColor: filtro === t ? '#FF9900' : 'rgba(255,255,255,0.2)' }}>{t}</button>
        ))}
      </div>

      {/* GRID */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '1rem 2rem 4rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {filtrados.map(f => (
          <div key={f.id} style={{ background: '#161616', borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ height: 160, backgroundImage: `url(${f.img})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
              <span style={{ position: 'absolute', top: 10, left: 10, background: '#6366f1', color: '#fff', padding: '0.2rem 0.65rem', borderRadius: 20, fontSize: '0.72rem', fontWeight: 700 }}>{f.tipo}</span>
              <span style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(0,0,0,0.7)', color: '#FF9900', padding: '0.2rem 0.65rem', borderRadius: 20, fontSize: '0.72rem', fontWeight: 600 }}>{f.foco}</span>
            </div>
            <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.5rem' }}>{f.nombre}</h3>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.87rem', lineHeight: 1.6, marginBottom: '1rem', flex: 1 }}>{f.desc}</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', marginBottom: '1rem' }}>
                <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: '0.6rem 0.75rem' }}>
                  <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.2rem' }}>Presupuesto</div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#FF9900' }}>{f.presupuesto}</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: '0.6rem 0.75rem' }}>
                  <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.2rem' }}>Cierre convocatoria</div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#f87171' }}>{f.plazo}</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                {f.ods.map(o => <span key={o} style={{ background: 'rgba(255,153,0,0.1)', color: '#FF9900', border: '1px solid rgba(255,153,0,0.25)', borderRadius: 6, padding: '0.15rem 0.5rem', fontSize: '0.72rem', fontWeight: 600 }}>{o}</span>)}
                <span style={{ background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.5)', borderRadius: 6, padding: '0.15rem 0.5rem', fontSize: '0.72rem' }}>{f.proyectos} proyectos financiados</span>
              </div>
              {solicitudId === f.id ? (
                <div style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid #22c55e', borderRadius: 8, padding: '0.75rem', textAlign: 'center', color: '#22c55e', fontSize: '0.88rem', fontWeight: 600 }}>
                  Solicitud enviada. Te contactaran en 5-7 dias.
                </div>
              ) : (
                <button onClick={() => setSolicitudId(f.id)} style={{ background: '#FF9900', color: '#000', padding: '0.7rem', borderRadius: 8, fontWeight: 700, border: 'none', cursor: 'pointer', fontSize: '0.9rem', width: '100%' }}>
                  Solicitar financiacion
                </button>
              )}
            </div>
          </div>
        ))}
        {filtrados.length === 0 && (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem', color: 'rgba(255,255,255,0.35)' }}>
            <p style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>No hay resultados</p>
            <p>Prueba con otro tipo de financiador o cambia los terminos de busqueda.</p>
          </div>
        )}
      </div>
    </main>
  )
}
