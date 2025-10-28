import './globals.css';
import Link from 'next/link';

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
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: -1,
            opacity: 0.15,
          }}
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-futuristic-data-49138-large.mp4" type="video/mp4" />
        </video>

        {/* Header */}
        <header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 50,
            background: 'rgba(0, 0, 0, 0.95)',
            borderBottom: '1px solid rgba(255, 153, 0, 0.2)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <div
            style={{
              maxWidth: '1280px',
              margin: '0 auto',
              padding: '1rem 2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
              <img
                src="/logo-portal.jpg"
                alt="3SN Portal"
                style={{
                  height: '50px',
                  width: 'auto',
                  marginRight: '1rem',
                }}
              />
              <span
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: '#FF9900',
                }}
              >
                3SN Portal RSC
              </span>
            </Link>
            <nav style={{ display: 'flex', gap: '2rem' }}>
              <Link href="/ongd" style={{ color: '#FFFFFF', textDecoration: 'none', fontWeight: 500 }}>
                ONGDs
              </Link>
              <Link href="/financiador" style={{ color: '#FFFFFF', textDecoration: 'none', fontWeight: 500 }}>
                Financiadores
              </Link>
              <Link href="/busqueda" style={{ color: '#FFFFFF', textDecoration: 'none', fontWeight: 500 }}>
                Búsqueda
              </Link>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main style={{ position: 'relative', zIndex: 1 }}>{children}</main>

        {/* Footer */}
        <footer
          style={{
            background: '#000000',
            borderTop: '1px solid rgba(255, 153, 0, 0.2)',
            marginTop: '4rem',
          }}
        >
          <div
            style={{
              maxWidth: '1280px',
              margin: '0 auto',
              padding: '3rem 2rem',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '3rem',
                marginBottom: '2rem',
              }}
            >
              <div>
                <img
                  src="/logo-portal.jpg"
                  alt="3SN Portal"
                  style={{
                    height: '60px',
                    width: 'auto',
                    marginBottom: '1rem',
                  }}
                />
                <p style={{ color: '#CCCCCC', lineHeight: 1.6, marginTop: '1rem' }}>
                  Conectando impacto social con financiación sostenible mediante transparencia y trazabilidad.
                </p>
              </div>

              <div>
                <h3 style={{ color: '#FF9900', marginBottom: '1rem', fontSize: '1.125rem' }}>Enlaces Rápidos</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <Link href="/ongd" style={{ color: '#FFFFFF', textDecoration: 'none' }}>
                      Portal ONGDs
                    </Link>
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <Link href="/financiador" style={{ color: '#FFFFFF', textDecoration: 'none' }}>
                      Portal Financiadores
                    </Link>
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <Link href="/busqueda" style={{ color: '#FFFFFF', textDecoration: 'none' }}>
                      Búsqueda de Proyectos
                    </Link>
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <Link href="/destacados" style={{ color: '#FFFFFF', textDecoration: 'none' }}>
                      Proyectos Destacados
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 style={{ color: '#FF9900', marginBottom: '1rem', fontSize: '1.125rem' }}>Síguenos</h3>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <a
                    href="https://twitter.com/3snportal"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: 'rgba(255, 153, 0, 0.1)',
                      border: '1px solid rgba(255, 153, 0, 0.3)',
                      color: '#FF9900',
                      textDecoration: 'none',
                    }}
                  >
                    𝕏
                  </a>
                  <a
                    href="https://linkedin.com/company/3snportal"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: 'rgba(255, 153, 0, 0.1)',
                      border: '1px solid rgba(255, 153, 0, 0.3)',
                      color: '#FF9900',
                      textDecoration: 'none',
                    }}
                  >
                    in
                  </a>
                  <a
                    href="https://github.com/3snportal"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: 'rgba(255, 153, 0, 0.1)',
                      border: '1px solid rgba(255, 153, 0, 0.3)',
                      color: '#FF9900',
                      textDecoration: 'none',
                    }}
                  >
                    GH
                  </a>
                </div>
              </div>
            </div>

            <div
              style={{
                paddingTop: '2rem',
                borderTop: '1px solid rgba(255, 153, 0, 0.1)',
                textAlign: 'center',
                color: '#4A4A4A',
              }}
            >
              <p>© 2025 3SN Portal RSC. Transformando el impacto social mediante tecnología.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
