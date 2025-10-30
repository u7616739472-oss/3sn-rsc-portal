"use client"

import { useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Users, ArrowRight, PlusCircle, CheckCircle2, CircleDashed, Coins, ListTodo } from 'lucide-react'

// Draft structure for /app/ongd/page.tsx
// ------------------------------------------------------------
// Secciones:
// 1) Formulario de alta de proyecto (mock submit) -> listo para conectar a seed/endpoint
// 2) Listado de proyectos con % financiado y botón para ver tareas
// 3) Panel de detalle de tareas por proyecto con monto y estado de financiación
// Datos: mock "reales" con estructura coherente con posible seed/API
// Comentarios marcados con DRAFT: para facilitar futura implementación
// ------------------------------------------------------------

// DRAFT: Tipos base que podrían moverse a src/data/types.ts
export type Tarea = {
  id: string
  titulo: string
  monto: number // en EUR
  financiado: number // en EUR
}

export type Proyecto = {
  id: string
  nombre: string
  ongdId: string
  ongdNombre: string
  descripcion: string
  categoria: 'Educación' | 'Salud' | 'Medio Ambiente' | 'Desarrollo'
  imagen: string
  presupuesto: number // total proyecto
  financiado: number // total financiado
  tareas: Tarea[]
}

// DRAFT: MOCK DATA - listo para leer desde seed o endpoint
// Si se usa Prisma/seed, mantener la estructura clave para facilitar hydrate.
const proyectosMock: Proyecto[] = [
  {
    id: 'p-edu-001',
    nombre: 'Aulas Digitales Rurales',
    ongdId: 'ong-001',
    ongdNombre: 'Fundación Horizonte',
    descripcion: 'Dotación de kits de tablets, formación docente y conectividad en 10 escuelas rurales.',
    categoria: 'Educación',
    imagen: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop',
    presupuesto: 60000,
    financiado: 24500,
    tareas: [
      { id: 't-001', titulo: 'Compra de 100 tablets', monto: 30000, financiado: 18000 },
      { id: 't-002', titulo: 'Capacitación a 20 docentes', monto: 15000, financiado: 4500 },
      { id: 't-003', titulo: 'Routers y datos 12 meses', monto: 15000, financiado: 2000 },
    ],
  },
  {
    id: 'p-sal-002',
    nombre: 'Clínica Móvil Comunitaria',
    ongdId: 'ong-003',
    ongdNombre: 'Salud al Día',
    descripcion: 'Unidad móvil para prevención y chequeos en 15 comunidades.',
    categoria: 'Salud',
    imagen: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=1200&auto=format&fit=crop',
    presupuesto: 95000,
    financiado: 62000,
    tareas: [
      { id: 't-101', titulo: 'Equipamiento médico básico', monto: 40000, financiado: 32000 },
      { id: 't-102', titulo: 'Personal y viáticos', monto: 35000, financiado: 25000 },
      { id: 't-103', titulo: 'Medicamentos y descartables', monto: 20000, financiado: 5000 },
    ],
  },
  {
    id: 'p-amb-003',
    nombre: 'Bosques Urbanos',
    ongdId: 'ong-002',
    ongdNombre: 'Verde Vivo',
    descripcion: 'Plantación de 5000 árboles en zonas urbanas de alta polución.',
    categoria: 'Medio Ambiente',
    imagen: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=1200&auto=format&fit=crop',
    presupuesto: 120000,
    financiado: 41000,
    tareas: [
      { id: 't-201', titulo: 'Vivero y plantines', monto: 50000, financiado: 20000 },
      { id: 't-202', titulo: 'Logística y herramientas', monto: 30000, financiado: 12000 },
      { id: 't-203', titulo: 'Mantenimiento 12 meses', monto: 40000, financiado: 9000 },
    ],
  },
]

function percent(a: number, b: number) {
  return b <= 0 ? 0 : Math.min(100, Math.round((a / b) * 100))
}

function currency(n: number) {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)
}

// DRAFT: Componente Formulario de alta
function ProyectoForm({ onCreate }: { onCreate: (p: Proyecto) => void }) {
  const [form, setForm] = useState({
    nombre: '',
    ongdNombre: '',
    categoria: 'Educación' as Proyecto['categoria'],
    presupuesto: 0,
    descripcion: '',
    imagen: '',
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: name === 'presupuesto' ? Number(value) : value }))
  }

  function submitMock(e: React.FormEvent) {
    e.preventDefault()
    // DRAFT: aquí se conectará a acción server/endpoint o seed insert
    const nuevo: Proyecto = {
      id: 'p-' + Math.random().toString(36).slice(2, 8),
      nombre: form.nombre || 'Proyecto sin título',
      ongdId: 'ong-custom',
      ongdNombre: form.ongdNombre || 'ONGD',
      descripcion: form.descripcion || 'Descripción pendiente',
      categoria: form.categoria,
      imagen: form.imagen || '/og-default.jpg',
      presupuesto: form.presupuesto || 10000,
      financiado: 0,
      tareas: [
        { id: 't-a', titulo: 'Tarea inicial', monto: Math.max(1000, Math.round((form.presupuesto || 10000) * 0.3)), financiado: 0 },
        { id: 't-b', titulo: 'Tarea de soporte', monto: Math.max(1000, Math.round((form.presupuesto || 10000) * 0.2)), financiado: 0 },
      ],
    }
    onCreate(nuevo)
    setForm({ nombre: '', ongdNombre: '', categoria: 'Educación', presupuesto: 0, descripcion: '', imagen: '' })
  }

  return (
    <form onSubmit={submitMock} className="rounded-2xl border border-white/10 bg-white/5 p-4 md:p-6 backdrop-blur">
      <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
        <PlusCircle className="h-5 w-5 text-orange-400" /> Alta de proyecto (DRAFT)
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-1">
          <span className="text-xs text-white/70">Nombre del proyecto</span>
          <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Ej. Aulas Digitales Rurales" className="rounded-md border border-white/10 bg-black/20 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-500" />
        </label>
        <label className="grid gap-1">
          <span className="text-xs text-white/70">ONGD</span>
          <input name="ongdNombre" value={form.ongdNombre} onChange={handleChange} placeholder="Ej. Fundación Horizonte" className="rounded-md border border-white/10 bg-black/20 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-500" />
        </label>
        <label className="grid gap-1">
          <span className="text-xs text-white/70">Categoría</span>
          <select name="categoria" value={form.categoria} onChange={handleChange} className="rounded-md border border-white/10 bg-black/20 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-500">
            <option>Educación</option>
            <option>Salud</option>
            <option>Medio Ambiente</option>
            <option>Desarrollo</option>
          </select>
        </label>
        <label className="grid gap-1">
          <span className="text-xs text-white/70">Presupuesto (EUR)</span>
          <input type="number" name="presupuesto" value={form.presupuesto} onChange={handleChange} placeholder="60000" className="rounded-md border border-white/10 bg-black/20 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-500" />
        </label>
        <label className="md:col-span-2 grid gap-1">
          <span className="text-xs text-white/70">Descripción</span>
          <textarea name="descripcion" value={form.descripcion} onChange={handleChange} placeholder="Breve descripción del proyecto" className="rounded-md border border-white/10 bg-black/20 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-500" />
        </label>
        <label className="md:col-span-2 grid gap-1">
          <span className="text-xs text-white/70">URL de imagen</span>
          <input name="imagen" value={form.imagen} onChange={handleChange} placeholder="https://..." className="rounded-md border border-white/10 bg-black/20 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-500" />
        </label>
      </div>
      <div className="mt-4 flex justify-end">
        <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-4 py-2 text-sm font-medium text-black shadow-lg shadow-orange-500/30 transition hover:bg-orange-400">
          <ArrowRight className="h-4 w-4" /> Crear (mock)
        </button>
      </div>
    </form>
  )
}

// DRAFT: Lista de proyectos con % financiado
function ProyectoCard({ p, onSelect }: { p: Proyecto; onSelect: (id: string) => void }) {
  const pct = useMemo(() => percent(p.financiado, p.presupuesto), [p.financiado, p.presupuesto])
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition hover:border-white/20 hover:bg-white/10">
      <div className="relative h-40 w-full overflow-hidden">
        <Image alt={p.nombre} src={p.imagen} fill className="object-cover transition duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      </div>
      <div className="p-5">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
            <Users className="h-6 w-6 text-white" />
          </div>
          <span className="rounded-full bg-orange-500/20 px-2 py-0.5 text-xs text-orange-300">{p.categoria}</span>
        </div>
        <h3 className="text-lg font-semibold text-orange-400">{p.nombre}</h3>
        <p className="mt-1 text-xs text-white/70">{p.ongdNombre}</p>
        <p className="mt-2 text-sm text-white/80 line-clamp-2">{p.descripcion}</p>
        <div className="mt-4">
          <div className="mb-2 flex items-center justify-between text-xs text-white/70">
            <span>{currency(p.financiado)} / {currency(p.presupuesto)}</span>
            <span>{pct}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
            <div className="h-2 rounded-full bg-orange-500" style={{ width: `${pct}%` }} />
          </div>
          <div className="mt-4 flex gap-2">
            <button onClick={() => onSelect(p.id)} className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs hover:bg-white/20">
              <ListTodo className="h-4 w-4" /> Ver tareas
            </button>
            <Link href={`/proyecto/${p.id}`} className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-3 py-1.5 text-xs text-black hover:bg-orange-400">
              <ArrowRight className="h-4 w-4" /> Abrir
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}

// DRAFT: Detalle de tareas
function TareasPanel({ proyecto }: { proyecto: Proyecto }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 md:p-6">
      <h3 className="mb-4 flex items-center gap-2 text-base font-semibold">
        <ListTodo className="h-5 w-5 text-orange-400" /> Tareas de "{proyecto.nombre}"
      </h3>
      <ul className="space-y-3">
        {proyecto.tareas.map((t) => {
          const pct = percent(t.financiado, t.monto)
          const completa = pct >= 100
          return (
            <li key={t.id} className="rounded-lg border border-white/10 bg-black/20 p-3">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-white">{t.titulo}</p>
                  <p className="text-xs text-white/70">{currency(t.financiado)} / {currency(t.monto)} · {pct}%</p>
                </div>
                <div className="shrink-0">
                  {completa ? (
                    <CheckCircle2 className="h-5 w-5 text-green-400" />
                  ) : (
                    <CircleDashed className="h-5 w-5 text-white/60" />
                  )}
                </div>
              </div>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <div className={`h-1.5 rounded-full ${completa ? 'bg-green-400' : 'bg-orange-500'}`} style={{ width: `${pct}%` }} />
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

// Layout local de la página (manteniendo estilo actual)
function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-black text-white">
      <video autoPlay muted loop playsInline className="fixed inset-0 h-full w-full object-cover opacity-30" src="/video/bg-loop.mp4" />
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/80" />
      <header className="sticky top-0 z-20 w-full backdrop-blur supports-[backdrop-filter]:bg-black/30 bg-black/20">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <Link className="flex items-center gap-3" href="/">
