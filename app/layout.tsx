import './globals.css';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: '3SN Portal RSC',
  description: 'Conectando impacto social con financiación sostenible',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        style={{
          margin: 0,
          padding: 0,
          minHeight: '100vh',
          background: '#000000',
          color: '#ffffff',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Header */}
        <header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 50,
            width: '100%',
            backdropFilter: 'blur(20px)',
            background: 'rgba(0,0,0,0.7)',
            borderBottom: '1px solid rgba(255,153,0,0.2)',
          }}
        >
          <div
            style={{
              maxWidth: 1200,
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.75rem 1.5rem',
            }}
          >
            {/* Logo */}
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
              <Image
                alt="3SN Portal RSC Logo"
                src="/logo.png"
                width={40}
                height={40}
                style={{ borderRadius: '50%' }}
              />
              <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FF9900', letterSpacing: '-0.02em' }}>
                3SN Portal RSC
              </span>
            </Link>

            {/* Navigation */}
            <nav style={{ display: 'flex', gap: '2rem' }}>
              <Link href="/" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: 14, transition: 'color 0.2s' }}>
                Inicio
              </Link>
              <Link href="/busqueda" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: 14 }}>
                Búsqueda
              </Link>
              <Link href="/financiador" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: 14 }}>
                Financiadores
              </Link>
              <Link href="/ongd" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: 14 }}>
                ONGDs
              </Link>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main>{children}</main>

        {/* Footer */}
        <footer
          style={{
            borderTop: '1px solid rgba(255,255,255,0.1)',
            background: 'rgba(0,0,0,0.5)',
            padding: '2rem 1.5rem',
            marginTop: '4rem',
          }}
        >
          <div
            style={{
              maxWidth: 1200,
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Image alt="3SN" src="/logo.png" width={32} height={32} style={{ borderRadius: '50%' }} />
              <span style={{ fontWeight: 600, color: '#FF9900' }}>3SN Portal RSC</span>
            </div>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <Link href="/" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: 13 }}>Inicio</Link>
              <Link href="/busqueda" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: 13 }}>Búsqueda</Link>
              <Link href="/financiador" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: 13 }}>Financiadores</Link>
              <Link href="/ongd" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: 13 }}>ONGDs</Link>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>
              © 2025 3SN Portal RSC. Transformando el impacto social.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
