'use client'
import { useState } from 'react'
import Link from 'next/link'

const proyectos = [
  { titulo: 'Aulas Digitales Rurales', ongd: 'Fundacion Horizonte', categoria: 'Educacion', financiado: 47000, objetivo: 60000, img: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80' },
  { titulo: 'Bosques Urbanos Madrid', ongd: 'Tierra Viva', categoria: 'Medio Ambiente', financiado: 82000, objetivo: 90000, img: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&q=80' },
  { titulo: 'Clinica Movil Comunitaria', ongd: 'Salud Para Todos', categoria: 'Salud', financiado: 31000, objetivo: 75000, img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80' },
]

const stats = [
  { valor: '127', label: 'Proyectos activos' },
  { valor: '43', label: 'ONGDs registradas' },
  { valor: '2.4M EUR', label: 'Financiados en 2024' },
  { valor: '18.500', label: 'Beneficiarios directos' },
]

const pasos = [
  { num: '01', titulo: 'Registra tu proyecto', desc: 'La ONGD publica su proyecto con objetivos, presupuesto y ODS asociados.' },
  { num: '02', titulo: 'Scoring automatico', desc: '3SN evalua transparencia, capacidad y trayectoria. El financiador ve el riesgo real.' },
  { num: '03', titulo: 'Conexion directa', desc: 'La empresa RSC elige el proyecto, aprueba hitos y libera fondos por avance.' },
  { num: '04', titulo: 'Impacto medible', desc: 'Seguimiento en tiempo real: beneficiarios, ODS cumplidos y ROI social verificado.' },
]

export default function HomePage() {
  const [email, setEmail] = useState('')
  const [tipo, setTipo] = useState('')
  const [enviado, setEnviado] = useState(false)

  function handleWaitlist(e: React.FormEvent) {
    e.preventDefault()
    setEnviado(true)
  }

  return (
    <main style={{ minHeight: '100vh', color: '#FFFFFF', background: '#0a0a0a' }}>

      {/* HERO */}
      <section style={{ position: 'relative', minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1200 50%, #0a0a0a 100%)' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1646223554770-4954987f9656?w=1600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15 }} />
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '4rem 2rem', maxWidth: 900 }}>
          <div style={{ display: 'inline-block', background: 'rgba(255,153,0,0.15)', border: '1px solid rgba(255,153,0,0.4)', borderRadius: 20, padding: '0.4rem 1.2rem', marginBottom: '2rem', fontSize: '0.85rem', color: '#FF9900' }}>
            Plataforma de impacto social verificado
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '1.5rem' }}>
            Financia proyectos sociales<br />
            <span style={{ color: '#FF9900' }}>con impacto real y medible</span>
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.3rem)', color: 'rgba(255,255,255,0.75)', maxWidth: 700, margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
            3SN conecta empresas con RSC activa y ONGDs verificadas. Scoring automatico, desembolso por hitos y ROI social cuantificado.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/busqueda" style={{ background: '#FF9900', color: '#000', padding: '1rem 2.5rem', borderRadius: 10, fontWeight: 700, fontSize: '1.1rem', textDecoration: 'none', display: 'inline-block' }}>
              Explorar proyectos
            </Link>
            <Link href="/ongd" style={{ background: 'transparent', color: '#FF9900', padding: '1rem 2.5rem', borderRadius: 10, fontWeight: 700, fontSize: '1.1rem', textDecoration: 'none', border: '2px solid #FF9900', display: 'inline-block' }}>
              Soy una ONGD
            </Link>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ background: '#111', borderTop: '1px solid rgba(255,153,0,0.2)', borderBottom: '1px solid rgba(255,153,0,0.2)', padding: '3rem 2rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', textAlign: 'center' }}>
          {stats.map(s => (
            <div key={s.label}>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#FF9900', marginBottom: '0.4rem' }}>{s.valor}</div>
              <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section style={{ padding: '5rem 2rem', maxWidth: 1100, margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: '0.75rem' }}>Como funciona</h2>
        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.55)', marginBottom: '3.5rem', fontSize: '1.05rem' }}>Cuatro pasos para pasar de intencion a impacto verificado</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
          {pasos.map(p => (
            <div key={p.num} style={{ background: '#161616', border: '1px solid rgba(255,153,0,0.15)', borderRadius: 12, padding: '2rem 1.5rem' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'rgba(255,153,0,0.25)', marginBottom: '0.75rem' }}>{p.num}</div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.6rem', color: '#FF9900' }}>{p.titulo}</h3>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', lineHeight: 1.6 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROYECTOS DESTACADOS */}
      <section style={{ padding: '4rem 2rem', background: '#0d0d0d' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800 }}>Proyectos que necesitan financiacion</h2>
            <Link href="/busqueda" style={{ color: '#FF9900', textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem' }}>Ver todos los proyectos</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {proyectos.map(p => {
              const pct = Math.round((p.financiado / p.objetivo) * 100)
              return (
                <div key={p.titulo} style={{ background: '#1a1a1a', borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ height: 180, backgroundImage: `url(${p.img})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
                    <span style={{ position: 'absolute', top: 12, left: 12, background: '#FF9900', color: '#000', padding: '0.25rem 0.7rem', borderRadius: 20, fontSize: '0.75rem', fontWeight: 700 }}>{p.categoria}</span>
                  </div>
                  <div style={{ padding: '1.25rem' }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.3rem' }}>{p.titulo}</h3>
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', marginBottom: '1rem' }}>{p.ongd}</p>
                    <div style={{ marginBottom: '0.5rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', marginBottom: '0.4rem' }}>
                        <span>{p.financiado.toLocaleString()} EUR recaudados</span>
                        <span style={{ color: pct >= 80 ? '#22c55e' : '#FF9900', fontWeight: 700 }}>{pct}%</span>
                      </div>
                      <div style={{ height: 6, background: 'rgba(255,255,255,0.1)', borderRadius: 3 }}>
                        <div style={{ height: '100%', width: `${pct}%`, background: pct >= 80 ? '#22c55e' : '#FF9900', borderRadius: 3 }} />
                      </div>
                    </div>
                    <Link href="/busqueda" style={{ display: 'block', textAlign: 'center', marginTop: '1rem', background: 'rgba(255,153,0,0.15)', color: '#FF9900', padding: '0.6rem', borderRadius: 8, textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600, border: '1px solid rgba(255,153,0,0.3)' }}>Ver proyecto</Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* DUAL CTA */}
      <section style={{ padding: '5rem 2rem' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          <div style={{ background: 'linear-gradient(135deg, #1a0f00, #2a1800)', border: '1px solid rgba(255,153,0,0.3)', borderRadius: 16, padding: '2.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏢</div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.75rem', color: '#FF9900' }}>Soy una empresa RSC</h3>
            <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.6, marginBottom: '1.5rem', fontSize: '0.95rem' }}>Encuentra proyectos verificados que se alinean con tus objetivos ESG. Transparencia total y ROI social medible.</p>
            <Link href="/busqueda" style={{ background: '#FF9900', color: '#000', padding: '0.85rem 2rem', borderRadius: 8, fontWeight: 700, textDecoration: 'none', display: 'inline-block' }}>Explorar proyectos</Link>
          </div>
          <div style={{ background: 'linear-gradient(135deg, #001a0f, #00281a)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 16, padding: '2.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🤝</div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.75rem', color: '#22c55e' }}>Soy una ONGD</h3>
            <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.6, marginBottom: '1.5rem', fontSize: '0.95rem' }}>Publica tus proyectos, gestiona hitos y conecta con financiadores que valoran el impacto real de tu trabajo.</p>
            <Link href="/ongd" style={{ background: '#22c55e', color: '#000', padding: '0.85rem 2rem', borderRadius: 8, fontWeight: 700, textDecoration: 'none', display: 'inline-block' }}>Gestionar proyectos</Link>
          </div>
        </div>
      </section>

      {/* WAITLIST */}
      <section style={{ background: '#111', borderTop: '1px solid rgba(255,153,0,0.15)', padding: '4rem 2rem' }}>
        <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, marginBottom: '0.75rem' }}>Unete a la lista de espera</h2>
          <p style={{ color: 'rgba(255,255,255,0.55)', marginBottom: '2rem', fontSize: '0.95rem' }}>3SN esta en beta. Se de los primeros en acceder cuando abramos registro completo.</p>
          {enviado ? (
            <div style={{ background: 'rgba(34,197,94,0.15)', border: '1px solid #22c55e', borderRadius: 10, padding: '1.5rem', color: '#22c55e', fontWeight: 600 }}>
              Apuntado. Te avisamos cuando abramos acceso completo.
            </div>
          ) : (
            <form onSubmit={handleWaitlist} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <select value={tipo} onChange={e => setTipo(e.target.value)} required style={{ padding: '0.85rem 1rem', borderRadius: 8, background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', fontSize: '0.95rem' }}>
                <option value="">Soy... (selecciona tu perfil)</option>
                <option value="empresa">Empresa con programa RSC</option>
                <option value="ongd">ONGD / Entidad social</option>
                <option value="inversor">Inversor de impacto</option>
                <option value="otro">Otro</option>
              </select>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <input type="email" placeholder="tu@email.com" value={email} onChange={e => setEmail(e.target.value)} required style={{ flex: 1, padding: '0.85rem 1rem', borderRadius: 8, background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', fontSize: '0.95rem' }} />
                <button type="submit" style={{ background: '#FF9900', color: '#000', padding: '0.85rem 1.5rem', borderRadius: 8, fontWeight: 700, border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}>Unirme</button>
              </div>
            </form>
          )}
        </div>
      </section>

    </main>
  )
}
