import './globals.css';
import Link from 'next/link';
import Image from 'next/image';

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
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-futuristic-data-49138-large.mp4"
            type="video/mp4"
          />
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
            {/* Logo */}
            <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Image
                src="/logo.png"
                alt="3SN Portal RSC Logo"
                width={60}
                height={60}
                style={{ borderRadius: '8px' }}
              />
              <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#FF9900' }}>3SN Portal RSC</span>
            </Link>

            {/* Navigation */}
            <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
              <Link
                href="/"
                style={{
                  color: '#ffffff',
                  textDecoration: 'none',
                  fontSize: '1rem',
                  fontWeight: 500,
                  transition: 'color 0.3s',
                }}
              >
                Inicio
              </Link>
              <Link
                href="/busqueda"
                style={{
                  color: '#ffffff',
                  textDecoration: 'none',
                  fontSize: '1rem',
                  fontWeight: 500,
                  transition: 'color 0.3s',
                }}
              >
                Búsqueda
              </Link>
              <Link
                href="/financiador"
                style={{
                  color: '#ffffff',
                  textDecoration: 'none',
                  fontSize: '1rem',
                  fontWeight: 500,
                  transition: 'color 0.3s',
                }}
              >
                Financiadores
              </Link>
              <Link
                href="/ongd"
                style={{
                  color: '#ffffff',
                  textDecoration: 'none',
                  fontSize: '1rem',
                  fontWeight: 500,
                  transition: 'color 0.3s',
                }}
              >
                ONGDs
              </Link>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main
          style={{
            position: 'relative',
            minHeight: 'calc(100vh - 200px)',
          }}
        >
          {children}
        </main>

        {/* Footer */}
        <footer
          style={{
            position: 'relative',
            background: 'rgba(0, 0, 0, 0.95)',
            borderTop: '1px solid rgba(255, 153, 0, 0.2)',
            backdropFilter: 'blur(12px)',
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
                gap: '2rem',
                marginBottom: '2rem',
              }}
            >
              {/* Logo Column */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <Image
                    src="/logo.png"
                    alt="3SN Portal RSC Logo"
                    width={50}
                    height={50}
                    style={{ borderRadius: '8px' }}
                  />
                  <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#FF9900' }}>3SN Portal RSC</span>
                </div>
                <p style={{ color: '#999', lineHeight: 1.6, margin: 0 }}>
                  Transformando el impacto social mediante tecnología y colaboración.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h3 style={{ color: '#FF9900', marginTop: 0, marginBottom: '1rem' }}>Enlaces Rápidos</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <Link href="/" style={{ color: '#999', textDecoration: 'none' }}>Inicio</Link>
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <Link href="/busqueda" style={{ color: '#999', textDecoration: 'none' }}>Búsqueda</Link>
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <Link href="/financiador" style={{ color: '#999', textDecoration: 'none' }}>Financiadores</Link>
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <Link href="/ongd" style={{ color: '#999', textDecoration: 'none' }}>ONGDs</Link>
                  </li>
                </ul>
              </div>

              {/* Social Links */}
              <div>
                <h3 style={{ color: '#FF9900', marginTop: 0, marginBottom: '1rem' }}>Síguenos</h3>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <a
                    href="https://github.com/u7616739472-oss/3sn-rsc-portal"
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
                      fontSize: '1.25rem',
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
              <p style={{ margin: 0 }}>© 2025 3SN Portal RSC. Transformando el impacto social mediante tecnología.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
