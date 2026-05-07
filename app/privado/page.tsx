'use client';

import Link from 'next/link';

const stats = [
  { label: 'Proyectos Activos', value: '3', icon: '📁', color: 'blue', href: '/privado/proyectos' },
  { label: 'Líneas en Financiación', value: '7', icon: '💰', color: 'green', href: '/privado/financiacion' },
  { label: 'Evidencias en Blockchain', value: '12', icon: '⛓️', color: 'purple', href: '/privado/blockchain' },
  { label: 'Presupuesto Gestionado', value: '€84.500', icon: '📊', color: 'yellow', href: '/privado/proyectos' },
];

const proyectosRecientes = [
  {
    id: '1',
    titulo: 'Inserción Laboral Colectivos Vulnerables',
    estado: 'lineas_trabajo',
    estadoLabel: 'Líneas de Trabajo',
    presupuesto: '€32.000',
    lineas: 4,
    color: 'blue',
  },
  {
    id: '2',
    titulo: 'Alfabetización Digital Mayores',
    estado: 'arbol_soluciones',
    estadoLabel: 'Árbol de Soluciones',
    presupuesto: '€18.500',
    lineas: 3,
    color: 'indigo',
  },
  {
    id: '3',
    titulo: 'Redes de Apoyo Infancia en Riesgo',
    estado: 'arbol_problemas',
    estadoLabel: 'Árbol de Problemas',
    presupuesto: '€24.000',
    lineas: 2,
    color: 'violet',
  },
];

const pasos = [
  { n: 1, titulo: 'Problema a Resolver', desc: 'Define el problema central de tu proyecto con apoyo IA.', icon: '🔍' },
  { n: 2, titulo: 'Árbol de Problemas', desc: 'IA propone causas y efectos. Tú lo editas y perfeccionas.', icon: '🌳' },
  { n: 3, titulo: 'Árbol de Soluciones', desc: 'Convierte el árbol de problemas en objetivos alcanzables.', icon: '🌟' },
  { n: 4, titulo: 'Líneas de Trabajo', desc: 'IA genera líneas con actividades, indicadores y presupuesto.', icon: '📋' },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Panel de Gestión ONGD</h1>
          <p className="text-gray-400 mt-1">Plataforma Marco Lógico con IA y Blockchain</p>
        </div>
        <Link
          href="/privado/proyectos/nuevo"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
        >
          <span>+</span> Nuevo Proyecto
        </Link>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-gray-600 transition-colors block"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">{s.icon}</span>
              <span className={`w-2 h-2 rounded-full bg-${s.color}-400`} />
            </div>
            <div className="text-2xl font-bold text-white">{s.value}</div>
            <div className="text-sm text-gray-400 mt-1">{s.label}</div>
          </Link>
        ))}
      </div>

      {/* Proyectos recientes + Metodología */}
      <div className="grid grid-cols-3 gap-6">
        {/* Proyectos */}
        <div className="col-span-2 bg-gray-900 border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Proyectos Recientes</h2>
            <Link href="/privado/proyectos" className="text-sm text-blue-400 hover:text-blue-300">Ver todos</Link>
          </div>
          <div className="space-y-3">
            {proyectosRecientes.map((p) => (
              <Link
                key={p.id}
                href={`/privado/proyectos/${p.id}`}
                className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg hover:bg-gray-750 transition-colors block"
              >
                <div className={`w-10 h-10 bg-${p.color}-600/20 border border-${p.color}-500/30 rounded-lg flex items-center justify-center text-lg`}>
                  📁
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-white truncate">{p.titulo}</div>
                  <div className="text-xs text-gray-400 mt-0.5">
                    {p.estadoLabel} • {p.lineas} líneas • {p.presupuesto}
                  </div>
                </div>
                <span className="text-xs bg-blue-900/50 text-blue-300 px-2 py-1 rounded-full border border-blue-700/50">
                  {p.estadoLabel}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Metodología */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">🧠 Marco Lógico + IA</h2>
          <div className="space-y-3">
            {pasos.map((paso) => (
              <div key={paso.n} className="flex gap-3">
                <div className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 mt-0.5">
                  {paso.n}
                </div>
                <div>
                  <div className="text-sm font-medium text-white">{paso.titulo}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{paso.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <Link
            href="/privado/proyectos/nuevo"
            className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white text-sm py-2.5 rounded-lg text-center block font-medium transition-colors"
          >
            Iniciar Proyecto
          </Link>
        </div>
      </div>

      {/* SSO + Blockchain status */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">🔐 Integraciones SSO</h2>
          <div className="space-y-3">
            {[
              { nombre: 'Google Workspace', estado: 'Configurado', color: 'green', icon: '🟢' },
              { nombre: 'Microsoft Entra ID', estado: 'Configurado', color: 'green', icon: '🟢' },
              { nombre: 'AWS IAM', estado: 'Pendiente', color: 'yellow', icon: '🟡' },
            ].map((sso) => (
              <div key={sso.nombre} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <div className="flex items-center gap-2">
                  <span>{sso.icon}</span>
                  <span className="text-sm text-white">{sso.nombre}</span>
                </div>
                <span className={`text-xs text-${sso.color}-400`}>{sso.estado}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">⛓️ Red Blockchain</h2>
          <div className="space-y-3">
            {[
              { label: 'Red activa', value: '3SN-Simnet v1.0' },
              { label: 'Evidencias registradas', value: '12 hashes' },
              { label: 'Último bloque', value: `#${Math.floor(Date.now() / 1000).toString().slice(-6)}` },
              { label: 'Gas Price', value: '0 (Gratuito - Red Social 3SN)' },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <span className="text-xs text-gray-400">{item.label}</span>
                <span className="text-xs text-green-400 font-mono">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
