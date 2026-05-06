import type { Metadata } from 'next'
import Link from 'next/link'
import './globals.css'

export const metadata: Metadata = {
  title: '3SN Portal RSC - Conectando Impacto Social con Financiacion',
  description: 'Plataforma que conecta empresas RSC con ONGDs verificadas. Scoring automatico, desembolso por hitos y ROI social cuantificado.',
  keywords: ['RSC', 'ONGD', 'impacto social', 'ESG', 'sostenibilidad', 'financiacion social'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body style={{ margin: 0, fontFamily: "'Inter', 'Segoe UI', sans-serif", background: '#0a0a0a', color: '#fff' }}>
        <header style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '0 2rem', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none' }}>
            <img src="/logo.png" alt="3SN" style={{ height: 36, width: 36, borderRadius: '50%', objectFit: 'cover' }} />
            <span style={{ fontWeight: 800, fontSize: '1.05rem', color: '#FF9900', letterSpacing: '-0.02em' }}>3SN Portal RSC</span>
          </Link>
          <nav style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', padding: '0.4rem 0.85rem', borderRadius: 8, fontSize: '0.9rem', fontWeight: 500 }}>Inicio</Link>
            <Link href="/busqueda" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', padding: '0.4rem 0.85rem', borderRadius: 8, fontSize: '0.9rem', fontWeight: 500 }}>Proyectos</Link>
            <Link href="/destacados" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', padding: '0.4rem 0.85rem', borderRadius: 8, fontSize: '0.9rem', fontWeight: 500 }}>Destacados</Link>
            <Link href="/financiador" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', padding: '0.4rem 0.85rem', borderRadius: 8, fontSize: '0.9rem', fontWeight: 500 }}>Financiadores</Link>
            <Link href="/ongd" style={{ background: '#FF9900', color: '#000', textDecoration: 'none', padding: '0.45rem 1rem', borderRadius: 8, fontSize: '0.9rem', fontWeight: 700, marginLeft: '0.5rem' }}>Panel ONGD</Link>
          </nav>
        </header>
        <div style={{ minHeight: 'calc(100vh - 64px)' }}>{children}</div>
        <footer style={{ background: '#0d0d0d', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '2.5rem 2rem' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <img src="/logo.png" alt="3SN" style={{ height: 28, width: 28, borderRadius: '50%' }} />
              <span style={{ fontWeight: 700, color: '#FF9900', fontSize: '0.95rem' }}>3SN Portal RSC</span>
            </div>
            <nav style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              <Link href="/" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: '0.85rem' }}>Inicio</Link>
              <Link href="/busqueda" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: '0.85rem' }}>Proyectos</Link>
              <Link href="/destacados" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: '0.85rem' }}>Destacados</Link>
              <Link href="/financiador" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: '0.85rem' }}>Financiadores</Link>
              <Link href="/ongd" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: '0.85rem' }}>Panel ONGD</Link>
            </nav>
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.82rem' }}>2025 3SN Portal RSC. Transformando el impacto social.</span>
          </div>
        </footer>
      </body>
    </html>
  )
}
