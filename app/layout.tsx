import './globals.css';

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
          background: 'linear-gradient(135deg, #0f2847 0%, #1a5490 50%, #22d3ee 100%)',
          minHeight: '100vh',
          color: '#fff',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Sticky Header */}
        <header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            background: 'rgba(15, 40, 71, 0.95)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid rgba(34, 211, 238, 0.2)',
            padding: '1rem 2rem',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              maxWidth: '1400px',
              margin: '0 auto',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  background: 'linear-gradient(135deg, #22d3ee, #0ea5e9)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                }}
              >
                3S
              </div>
              <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 'bold' }}>
                Portal RSC 3SN
              </h1>
            </div>
            <nav>
              <ul
                style={{
                  display: 'flex',
                  gap: '2rem',
                  listStyle: 'none',
                  margin: 0,
                  padding: 0,
                }}
              >
                <li>
                  <a
                    href="/"
                    style={{
                      color: '#22d3ee',
                      textDecoration: 'none',
                      fontWeight: '500',
                      transition: 'color 0.2s',
                    }}
                  >
                    Inicio
                  </a>
                </li>
                <li>
                  <a
                    href="/busqueda"
                    style={{
                      color: '#22d3ee',
                      textDecoration: 'none',
                      fontWeight: '500',
                    }}
                  >
                    Búsqueda
                  </a>
                </li>
                <li>
                  <a
                    href="/financiador"
                    style={{
                      color: '#22d3ee',
                      textDecoration: 'none',
                      fontWeight: '500',
                    }}
                  >
                    Financiadores
                  </a>
                </li>
                <li>
                  <a
                    href="/ongd"
                    style={{
                      color: '#22d3ee',
                      textDecoration: 'none',
                      fontWeight: '500',
                    }}
                  >
                    ONGDs
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main style={{ minHeight: 'calc(100vh - 200px)' }}>{children}</main>

        {/* Footer */}
        <footer
          style={{
            background: 'linear-gradient(135deg, #0f2847 0%, #1a5490 100%)',
            borderTop: '1px solid rgba(34, 211, 238, 0.2)',
            padding: '2rem',
            marginTop: '4rem',
          }}
        >
          <div
            style={{
              maxWidth: '1400px',
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '2rem',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    background: 'linear-gradient(135deg, #22d3ee, #0ea5e9)',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                  }}
                >
                  3S
                </div>
                <strong style={{ fontSize: '1.1rem' }}>Portal RSC 3SN</strong>
              </div>
              <p style={{ color: '#a0aec0', fontSize: '0.9rem' }}>
                Plataforma de Responsabilidad Social Corporativa
              </p>
            </div>
            <div>
              <h3 style={{ marginTop: 0, fontSize: '1rem', color: '#22d3ee' }}>Enlaces</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <a href="/" style={{ color: '#a0aec0', textDecoration: 'none' }}>
                    Inicio
                  </a>
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <a href="/busqueda" style={{ color: '#a0aec0', textDecoration: 'none' }}>
                    Búsqueda
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 style={{ marginTop: 0, fontSize: '1rem', color: '#22d3ee' }}>Redes Sociales</h3>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.75rem' }}>
                <a
                  href="#"
                  style={{
                    width: '36px',
                    height: '36px',
                    background: 'rgba(34, 211, 238, 0.1)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#22d3ee',
                    textDecoration: 'none',
                    border: '1px solid rgba(34, 211, 238, 0.3)',
                  }}
                >
                  f
                </a>
                <a
                  href="#"
                  style={{
                    width: '36px',
                    height: '36px',
                    background: 'rgba(34, 211, 238, 0.1)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#22d3ee',
                    textDecoration: 'none',
                    border: '1px solid rgba(34, 211, 238, 0.3)',
                  }}
                >
                  𝕏
                </a>
                <a
                  href="#"
                  style={{
                    width: '36px',
                    height: '36px',
                    background: 'rgba(34, 211, 238, 0.1)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#22d3ee',
                    textDecoration: 'none',
                    border: '1px solid rgba(34, 211, 238, 0.3)',
                  }}
                >
                  in
                </a>
              </div>
            </div>
          </div>
          <div
            style={{
              textAlign: 'center',
              marginTop: '2rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid rgba(34, 211, 238, 0.2)',
              color: '#a0aec0',
              fontSize: '0.875rem',
            }}
          >
            © 2025 Portal RSC 3SN. Todos los derechos reservados.
          </div>
        </footer>
      </body>
    </html>
  );
}
