"use client"
import Link from 'next/link'
import Image from 'next/image'
import { Search, Building2, GraduationCap, ShoppingCart, Stethoscope, Leaf, BadgeCheck, ArrowRight } from 'lucide-react'
import { useState } from 'react'

const projects = [
  {
    id: 1,
    title: "Sistema de Gestión Académica",
    description: "Plataforma integral para gestión de estudiantes, cursos y calificaciones",
    category: "Educación",
    status: "En desarrollo",
    icon: GraduationCap,
  },
  {
    id: 2,
    title: "App de Monitoreo Ambiental",
    description: "Sistema IoT para monitoreo de calidad del aire y condiciones ambientales",
    category: "Medio Ambiente",
    status: "Completado",
    icon: Leaf,
  },
  {
    id: 3,
    title: "Plataforma de E-commerce",
    description: "Tienda en línea con pagos e inventario",
    category: "Comercio",
    status: "En desarrollo",
    icon: ShoppingCart,
  },
]

const categories = [
  "Todas las categorías",
  "Educación",
  "Medio Ambiente",
  "Comercio",
  "Salud",
  "Infraestructura",
]

export default function BusquedaPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Todas las categorías')

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-black text-white">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="fixed inset-0 h-full w-full object-cover opacity-30"
        src="/video/bg-loop.mp4"
      />
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/80" />

      {/* Header */}
      <header className="sticky top-0 z-20 w-full backdrop-blur supports-[backdrop-filter]:bg-black/30 bg-black/20">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <Link href="/" className="flex items-center gap-3">
            <Image
              alt="3SN"
              className="rounded-full ring-1 ring-white/20"
              height={36}
              src="/logo.svg"
              width={36}
            />
            <span className="text-lg font-semibold tracking-tight text-orange-500">3SN Portal RSC</span>
          </Link>
          <nav className="hidden gap-6 md:flex">
            <Link className="text-sm text-white transition-colors hover:text-orange-400" href="/">
              Inicio
            </Link>
            <Link className="text-sm text-orange-400 transition-colors" href="/busqueda">
              Búsqueda
            </Link>
            <Link className="text-sm text-white/80 hover:text-orange-400 transition-colors" href="/financiador">
              Financiadores
            </Link>
            <Link className="text-sm text-white/80 hover:text-orange-400 transition-colors" href="/ongd">
              ONGDs
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-24 pt-8 md:pt-16">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <div className="mb-6 flex justify-center">
            <Image
              alt="3SN"
              className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/20"
              height={100}
              src="/logo.svg"
              width={100}
            />
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
            Busca Proyectos de <span className="text-orange-500">Impacto Social</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-300">
            Explora proyectos verificados que generan impacto real. Filtra por categoría y encuentra oportunidades de financiamiento sostenible.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-12">
          <div className="mx-auto max-w-4xl">
            <div className="relative mb-4">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar proyectos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-12 py-4 text-white placeholder-gray-400 backdrop-blur-sm transition-all focus:border-orange-500/50 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
              />
            </div>
            <div className="flex justify-center">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="rounded-xl border border-white/10 bg-white/5 px-6 py-2 text-white backdrop-blur-sm transition-all focus:border-orange-500/50 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat} className="bg-gray-900">
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => {
            const Icon = project.icon
            return (
              <div
                key={project.id}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-orange-500/50 hover:bg-white/10 hover:shadow-xl hover:shadow-orange-500/10"
              >
                {/* Icon */}
                <div className="mb-4 inline-flex rounded-xl bg-orange-500/10 p-3 text-orange-500">
                  <Icon className="h-6 w-6" />
                </div>

                {/* Title & Category */}
                <h3 className="mb-2 text-xl font-semibold">{project.title}</h3>
                <p className="mb-1 text-sm text-orange-400">{project.category}</p>
                <span className="mb-4 inline-block rounded-full bg-white/10 px-3 py-1 text-xs text-gray-300">
                  {project.status}
                </span>

                {/* Description */}
                <p className="mb-6 text-sm leading-relaxed text-gray-300">
                  {project.description}
                </p>

                {/* CTA Button */}
                <button className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-orange-600 hover:gap-3">
                  Ver detalle
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )
          })}
        </div>

        {/* Empty State */}
        {projects.length === 0 && (
          <div className="py-20 text-center">
            <div className="mb-4 flex justify-center">
              <Search className="h-16 w-16 text-gray-600" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-400">No se encontraron proyectos</h3>
            <p className="text-gray-500">Intenta con otros términos de búsqueda o categorías</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-black/30 py-8 backdrop-blur">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-sm text-gray-400">
            © 2025 3SN Portal RSC. Conectando impacto social con financiación sostenible.
          </p>
        </div>
      </footer>
    </div>
  )
}
