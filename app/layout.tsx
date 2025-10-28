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
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #000000 0%, #0a4a4a 50%, #000000 100%)',
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
            opacity: 0.4,
          }}
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-polygonal-glow-background-317.mp4" type="video/mp4" />
        </video>

        {/* Overlay for better text readability */}
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: -1,
          }}
        />

        {/* Sticky Header */}
        <header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            background: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(10px)',
            borderBottom: '2px solid #00d4ff',
            padding: '1rem 2rem',
            boxShadow: '0 4px 20px rgba(0, 212, 255, 0.3)',
          }}
        >
          <div
            style={{
              maxWidth: '1200px',
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '2rem',
            }}
          >
            {/* Logo */}
            <a
              href="/"
              style={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
              }}
            >
              <img
                src="/logo.png"
                alt="Portal RSC 3SN"
                style={{
                  height: '50px',
                  width: 'auto',
                  objectFit: 'contain',
                }}
              />
            </a>

            {/* Navigation */}
            <nav>
              <ul
                style={{
                  display: 'flex',
                  listStyle: 'none',
                  gap: '2rem',
                  margin: 0,
                  padding: 0,
                  flexWrap: 'wrap',
                }}
              >
                <li>
                  <a
                    href="/"
                    style={{
                      textDecoration: 'none',
                      color: '#ffffff',
                      fontSize: '1rem',
                      fontWeight: 500,
                      transition: 'color 0.3s ease',
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.color = '#00d4ff')}
                    onMouseOut={(e) => (e.currentTarget.style.color = '#ffffff')}
                  >
                    Inicio
                  </a>
                </li>
                <li>
                  <a
                    href="/busqueda"
                    style={{
                      textDecoration: 'none',
                      color: '#ffffff',
                      fontSize: '1rem',
                      fontWeight: 500,
                      transition: 'color 0.3s ease',
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.color = '#00d4ff')}
                    onMouseOut={(e) => (e.currentTarget.style.color = '#ffffff')}
                  >
                    Búsqueda
                  </a>
                </li>
                <li>
                  <a
                    href="/financiador"
                    style={{
                      textDecoration: 'none',
                      color: '#ffffff',
                      fontSize: '1rem',
                      fontWeight: 500,
                      transition: 'color 0.3s ease',
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.color = '#00d4ff')}
                    onMouseOut={(e) => (e.currentTarget.style.color = '#ffffff')}
                  >
                    Financiadores
                  </a>
                </li>
                <li>
                  <a
                    href="/ongd"
                    style={{
                      textDecoration: 'none',
                      color: '#ffffff',
                      fontSize: '1rem',
                      fontWeight: 500,
                      transition: 'color 0.3s ease',
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.color = '#00d4ff')}
                    onMouseOut={(e) => (e.currentTarget.style.color = '#ffffff')}
                  >
                    ONGDs
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main
          style={{
            minHeight: 'calc(100vh - 200px)',
            position: 'relative',
          }}
        >
          {children}
        </main>

        {/* Footer */}
        <footer
          style={{
            background: 'rgba(0, 0, 0, 0.9)',
            backdropFilter: 'blur(10px)',
            color: '#fff',
            padding: '3rem 2rem',
            marginTop: 'auto',
            borderTop: '2px solid #00d4ff',
          }}
        >
          <div
            style={{
              maxWidth: '1200px',
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '2rem',
            }}
          >
            {/* Logo & Description */}
            <div>
              <img
                src="/logo.png"
                alt="Portal RSC 3SN"
                style={{
                  height: '60px',
                  width: 'auto',
                  marginBottom: '1rem',
                  objectFit: 'contain',
                }}
              />
              <p style={{ fontSize: '0.9rem', lineHeight: 1.6, opacity: 0.9 }}>
                Portal de Responsabilidad Social Corporativa - Tercer Sector Sur Norte
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3
                style={{
                  fontSize: '1.1rem',
                  marginBottom: '1rem',
                  color: '#00d4ff',
                }}
              >
                Enlaces Rápidos
              </h3>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                }}
              >
                <li style={{ marginBottom: '0.5rem' }}>
                  <a
                    href="/"
                    style={{
                      color: '#fff',
                      textDecoration: 'none',
                      opacity: 0.9,
                      transition: 'opacity 0.3s',
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.opacity = '1')}
                    onMouseOut={(e) => (e.currentTarget.style.opacity = '0.9')}
                  >
                    Inicio
                  </a>
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <a
                    href="/busqueda"
                    style={{
                      color: '#fff',
                      textDecoration: 'none',
                      opacity: 0.9,
                      transition: 'opacity 0.3s',
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.opacity = '1')}
                    onMouseOut={(e) => (e.currentTarget.style.opacity = '0.9')}
                  >
                    Búsqueda de Proyectos
                  </a>
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <a
                    href="/financiador"
                    style={{
                      color: '#fff',
                      textDecoration: 'none',
                      opacity: 0.9,
                      transition: 'opacity 0.3s',
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.opacity = '1')}
                    onMouseOut={(e) => (e.currentTarget.style.opacity = '0.9')}
                  >
                    Financiadores
                  </a>
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <a
                    href="/ongd"
                    style={{
                      color: '#fff',
                      textDecoration: 'none',
                      opacity: 0.9,
                      transition: 'opacity 0.3s',
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.opacity = '1')}
                    onMouseOut={(e) => (e.currentTarget.style.opacity = '0.9')}
                  >
                    ONGDs
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3
                style={{
                  fontSize: '1.1rem',
                  marginBottom: '1rem',
                  color: '#00d4ff',
                }}
              >
                Contacto
              </h3>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.6, opacity: 0.9 }}>
                Email: info@portal3sn.org<br />
                Colaborando con organizaciones del Tercer Sector
              </p>
            </div>
          </div>

          {/* Copyright */}
          <div
            style={{
              maxWidth: '1200px',
              margin: '2rem auto 0',
              paddingTop: '2rem',
              borderTop: '1px solid rgba(0, 212, 255, 0.3)',
              textAlign: 'center',
              fontSize: '0.85rem',
              opacity: 0.8,
            }}
          >
            © {new Date().getFullYear()} Portal RSC 3SN. Todos los derechos reservados.
          </div>
        </footer>
      </body>
    </html>
  );
}
