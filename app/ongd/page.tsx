'use client'
import { useState } from 'react'
import Image from 'next/image'

type Tarea = { id: string; titulo: string; monto: number; financiado: number }
type Proyecto = {
  id: string; nombre: string; ongd: string; categoria: string
  descripcion: string; imagen: string; presupuesto: number; financiado: number; tareas: Tarea[]
}

const proyectos: Proyecto[] = [
  {
    id: 'p1', nombre: 'Aulas Digitales Rurales', ongd: 'Fundación Horizonte',
    categoria: 'Educación',
    descripcion: 'Dotación de tablets, formación docente y conectividad en 10 escuelas rurales de España.',
    imagen: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=800&h=400&fit=crop',
    presupuesto: 60000, financiado: 24500,
    tareas: [
      { id: 't1', titulo: 'Compra de 100 tablets', monto: 30000, financiado: 18000 },
      { id: 't2', titulo: 'Capacitación a 20 docentes', monto: 15000, financiado: 4500 },
      { id: 't3', titulo: 'Routers y datos 12 meses', monto: 15000, financiado: 2000 },
    ],
  },
  {
    id: 'p2', nombre: 'Clínica Móvil Comunitaria', ongd: 'Salud al Día',
    categoria: 'Salud',
    descripcion: 'Unidad móvil para prevención y chequeos básicos en 15 comunidades vulnerables.',
    imagen: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=400&fit=crop',
    presupuesto: 95000, financiado: 62000,
    tareas: [
      { id: 't4', titulo: 'Equipamiento médico básico', monto: 40000, financiado: 32000 },
      { id: 't5', titulo: 'Personal y viáticos', monto: 35000, financiado: 25000 },
      { id: 't6', titulo: 'Medicamentos y descartables', monto: 20000, financiado: 5000 },
    ],
  },
  {
    id: 'p3', nombre: 'Bosques Urbanos Madrid', ongd: 'Verde Vivo',
    categoria: 'Medio Ambiente',
    descripcion: 'Plantación de 5.000 árboles en zonas urbanas de alta polución en Madrid y Barcelona.',
    imagen: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&h=400&fit=crop',
    presupuesto: 120000, financiado: 41000,
    tareas: [
      { id: 't7', titulo: 'Vivero y plantines', monto: 50000, financiado: 20000 },
      { id: 't8', titulo: 'Logística y herramientas', monto: 30000, financiado: 12000 },
      { id: 't9', titulo: 'Mantenimiento 12 meses', monto: 40000, financiado: 9000 },
    ],
  },
]

const pct = (a: number, b: number) => (b <= 0 ? 0 : Math.min(100, Math.round((a / b) * 100)))
const eur = (n: number) => new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)

const CATS = ['Todos', 'Educación', 'Salud', 'Medio Ambiente']

export default function ONGDPage() {
  const [catFiltro, setCatFiltro] = useState('Todos')
  const [selId, setSelId] = useState<string | null>(null)
  const [form, setForm] = useState({ nombre: '', ongd: '', categoria: 'Educación', presupuesto: '', descripcion: '' })
  const [lista, setLista] = useState(proyectos)
  const [enviado, setEnviado] = useState(false)

  const filtrados = lista.filter(p => catFiltro === 'Todos' || p.categoria === catFiltro)
  const seleccionado = lista.find(p => p.id === selId)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const nuevo: Proyecto = {
      id: 'p' + Date.now(), nombre: form.nombre || 'Nuevo proyecto',
      ongd: form.ongd || 'Mi ONGD', categoria: form.categoria,
      descripcion: form.descripcion || 'Proyecto de impacto social.',
      imagen: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&h=400&fit=crop',
      presupuesto: Number(form.presupuesto) || 10000, financiado: 0,
      tareas: [{ id: 'ta', titulo: 'Tarea inicial', monto: Number(form.presupuesto) || 10000, financiado: 0 }],
    }
    setLista(prev => [nuevo, ...prev])
    setEnviado(true)
    setForm({ nombre: '', ongd: '', categoria: 'Educación', presupuesto: '', descripcion: '' })
    setTimeout(() => setEnviado(false), 3000)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fff' }}>
      {/* Hero */}
      <div style={{ position: 'relative', height: 280, overflow: 'hidden' }}>
        <Image src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1400&h=400&fit=crop" alt="ONGDs" fill style={{ objectFit: 'cover', opacity: 0.35 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), #0a0a0a)' }} />
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center', padding: '0 1.5rem' }}>
          <span style={{ background: 'rgba(255,153,0,0.15)', border: '1px solid rgba(255,153,0,0.4)', borderRadius: 20, padding: '0.3rem 1rem', fontSize: 13, color: '#FF9900', marginBottom: '1rem' }}>Panel ONGD</span>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, margin: 0, lineHeight: 1.1 }}>Gestiona tus <span style={{ color: '#FF9900' }}>Proyectos</span></h1>
          <p style={{ marginTop: '0.75rem', color: 'rgba(255,255,255,0.7)', maxWidth: 520, fontSize: '1.05rem' }}>Publica proyectos, rastrea el avance de financiación por tareas y conecta con financiadores RSC.</p>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem 1.5rem' }}>

        {/* Formulario alta */}
        <div style={{ background: 'rgba(255,153,0,0.05)', border: '1px solid rgba(255,153,0,0.2)', borderRadius: 16, padding: '1.5rem', marginBottom: '3rem' }}>
          <h2 style={{ margin: '0 0 1.25rem', fontSize: '1.25rem', color: '#FF9900' }}>➕ Registrar nuevo proyecto</h2>
          {enviado && (
            <div style={{ background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.4)', borderRadius: 8, padding: '0.75rem 1rem', marginBottom: '1rem', color: '#4ade80', fontSize: 14 }}>
              ✓ Proyecto registrado correctamente
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
              {[{ label: 'Nombre del proyecto', key: 'nombre', placeholder: 'Ej. Aulas Digitales Rurales' },
                { label: 'ONGD responsable', key: 'ongd', placeholder: 'Ej. Fundación Horizonte' },
                { label: 'Presupuesto (EUR)', key: 'presupuesto', placeholder: 'Ej. 60000', type: 'number' }]
                .map(f => (
                  <label key={f.key} style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>{f.label}</span>
                    <input
                      type={f.type || 'text'}
                      placeholder={f.placeholder}
                      value={(form as any)[f.key]}
                      onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                      style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, padding: '0.6rem 0.875rem', color: '#fff', fontSize: 14, outline: 'none' }}
                    />
                  </label>
                ))}
              <label style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>Categoría</span>
                <select value={form.categoria} onChange={e => setForm(prev => ({ ...prev, categoria: e.target.value }))}
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, padding: '0.6rem 0.875rem', color: '#fff', fontSize: 14 }}>
                  <option>Educación</option><option>Salud</option><option>Medio Ambiente</option><option>Desarrollo</option>
                </select>
              </label>
              <label style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', gridColumn: '1 / -1' }}>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>Descripción</span>
                <textarea placeholder="Breve descripción del proyecto y su impacto..."
                  value={form.descripcion}
                  onChange={e => setForm(prev => ({ ...prev, descripcion: e.target.value }))}
                  rows={2}
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, padding: '0.6rem 0.875rem', color: '#fff', fontSize: 14, outline: 'none', resize: 'vertical' }}
                />
              </label>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
              <button type="submit" style={{ background: '#FF9900', color: '#000', fontWeight: 700, border: 'none', borderRadius: 8, padding: '0.7rem 1.5rem', fontSize: 14, cursor: 'pointer' }}>
                Publicar proyecto
              </button>
            </div>
          </form>
        </div>

        {/* Filtros */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.5rem', alignItems: 'center' }}>
          <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700, marginRight: '0.5rem' }}>Proyectos activos</h2>
          {CATS.map(c => (
            <button key={c} onClick={() => setCatFiltro(c)}
              style={{ padding: '0.4rem 1rem', borderRadius: 20, border: catFiltro === c ? 'none' : '1px solid rgba(255,153,0,0.3)', background: catFiltro === c ? '#FF9900' : 'transparent', color: catFiltro === c ? '#000' : 'rgba(255,255,255,0.7)', fontSize: 13, cursor: 'pointer', fontWeight: catFiltro === c ? 700 : 400 }}>
              {c}
            </button>
          ))}
        </div>

        {/* Grid proyectos */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          {filtrados.map(p => {
            const porcentaje = pct(p.financiado, p.presupuesto)
            const isSelected = selId === p.id
            return (
              <div key={p.id} style={{ borderRadius: 16, overflow: 'hidden', border: isSelected ? '2px solid #FF9900' : '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)', transition: 'border 0.2s' }}>
                <div style={{ position: 'relative', height: 180 }}>
                  <Image src={p.imagen} alt={p.nombre} fill style={{ objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)' }} />
                  <span style={{ position: 'absolute', top: 12, left: 12, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,153,0,0.4)', borderRadius: 20, padding: '0.25rem 0.75rem', fontSize: 12, color: '#FF9900' }}>{p.categoria}</span>
                </div>
                <div style={{ padding: '1.25rem' }}>
                  <h3 style={{ margin: '0 0 0.25rem', fontSize: '1.05rem', fontWeight: 700 }}>{p.nombre}</h3>
                  <p style={{ margin: '0 0 0.75rem', fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>por {p.ongd}</p>
                  <p style={{ margin: '0 0 1rem', fontSize: 13, color: 'rgba(255,255,255,0.75)', lineHeight: 1.5 }}>{p.descripcion}</p>
                  {/* Barra de progreso */}
                  <div style={{ marginBottom: '0.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'rgba(255,255,255,0.6)', marginBottom: '0.4rem' }}>
                      <span>{eur(p.financiado)} recaudados</span>
                      <span style={{ color: porcentaje >= 75 ? '#4ade80' : porcentaje >= 40 ? '#FF9900' : '#f87171' }}>{porcentaje}%</span>
                    </div>
                    <div style={{ height: 6, background: 'rgba(255,255,255,0.1)', borderRadius: 3, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${porcentaje}%`, background: porcentaje >= 75 ? '#4ade80' : '#FF9900', borderRadius: 3, transition: 'width 0.5s' }} />
                    </div>
                    <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', margin: '0.3rem 0 0' }}>Objetivo: {eur(p.presupuesto)}</p>
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
                    <button onClick={() => setSelId(isSelected ? null : p.id)}
                      style={{ flex: 1, padding: '0.6rem', borderRadius: 8, border: '1px solid rgba(255,153,0,0.4)', background: isSelected ? 'rgba(255,153,0,0.15)' : 'transparent', color: '#FF9900', fontSize: 13, cursor: 'pointer', fontWeight: 600 }}>
                      {isSelected ? 'Ocultar tareas' : 'Ver tareas'}
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Panel de tareas */}
        {seleccionado && (
          <div style={{ background: 'rgba(255,153,0,0.05)', border: '1px solid rgba(255,153,0,0.25)', borderRadius: 16, padding: '1.5rem', marginBottom: '2rem' }}>
            <h3 style={{ margin: '0 0 1.25rem', color: '#FF9900', fontSize: '1.15rem' }}>Tareas: {seleccionado.nombre}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {seleccionado.tareas.map(t => {
                const tp = pct(t.financiado, t.monto)
                return (
                  <div key={t.id} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                      <div>
                        <p style={{ margin: 0, fontWeight: 600, fontSize: 14 }}>{t.titulo}</p>
                        <p style={{ margin: '0.2rem 0 0', fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{eur(t.financiado)} / {eur(t.monto)}</p>
                      </div>
                      <span style={{ fontSize: 13, fontWeight: 700, color: tp >= 100 ? '#4ade80' : tp >= 50 ? '#FF9900' : '#f87171' }}>{tp}%</span>
                    </div>
                    <div style={{ height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 2 }}>
                      <div style={{ height: '100%', width: `${tp}%`, background: tp >= 100 ? '#4ade80' : '#FF9900', borderRadius: 2 }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
