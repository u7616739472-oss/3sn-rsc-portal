'use client'
import { Shield, Rocket, TrendingUp } from 'lucide-react'

export default function HomePage() {
  return (
    <main style={{ minHeight: '100vh', color: '#FFFFFF' }}>
      {/* Hero Section with centered logo and tagline */}
      <section style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Mobile-friendly loop video as background (muted) */}
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
            opacity: 0.2,
          }}
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-futuristic-data-49138-large.mp4" type="video/mp4" />
        </video>

        <div
          style={{
            position: 'relative',
            zIndex: 1,
            maxWidth: '1100px',
            margin: '0 auto',
            padding: '6rem 1.25rem 4rem',
            textAlign: 'center',
          }}
        >
          <img
            src="/logo-portal.jpg"
            alt="3SN Portal"
            style={{ height: 80, width: 'auto', margin: '0 auto 1rem' }}
          />
          <h1
            style={{
              fontSize: 'clamp(2rem, 3.5vw, 3.5rem)',
              fontWeight: 800,
              marginBottom: '0.75rem',
              color: '#FFFFFF',
            }}
          >
            Conectando Impacto Social con Financiación Sostenible
          </h1>
          <p
            style={{
              color: '#CCCCCC',
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              maxWidth: 820,
              margin: '0 auto 1.5rem',
              lineHeight: 1.6,
            }}
          >
            Plataforma integral para ONGDs y financiadores: proyectos con impacto medible, trazabilidad total y confianza.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="#pilares"
              style={{
                background: '#FF9900',
                color: '#000000',
                padding: '0.75rem 1.25rem',
                borderRadius: 10,
                textDecoration: 'none',
                fontWeight: 700,
              }}
            >
              Explorar pilares
            </a>
            <a
              href="#contacto"
              style={{
                border: '1px solid #FF9900',
                color: '#FFFFFF',
                padding: '0.75rem 1.25rem',
                borderRadius: 10,
                textDecoration: 'none',
                fontWeight: 600,
              }}
            >
              Hablar con 3SN
            </a>
          </div>
        </div>
      </section>

      {/* Vertical stacked cards for the 3 pillars using glassmorphism */}
      <section id="pilares" style={{ maxWidth: 1100, margin: '0 auto', padding: '2rem 1.25rem 4rem' }}>
        <div style={{ display: 'grid', gap: '1.25rem' }}>
          {/* Pilar 1 */}
          <div
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,153,0,0.25)',
              borderRadius: 16,
              padding: '1.25rem',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
              display: 'grid',
              gridTemplateColumns: 'auto 1fr',
              gap: '0.75rem 1rem',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 12,
                display: 'grid',
                placeItems: 'center',
                background: 'linear-gradient(145deg, rgba(255,153,0,0.2), rgba(255,153,0,0.05))',
                border: '1px solid rgba(255,153,0,0.35)',
                color: '#FF9900',
              }}
            >
              <Shield size={28} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: 20, color: '#FFFFFF' }}>Transparencia y Confianza</h3>
              <p style={{ margin: '0.25rem 0 0', color: '#CCCCCC' }}>
                Trazabilidad completa en la cadena de valor con registros inmutables y auditorías simplificadas.
              </p>
            </div>
          </div>

          {/* Pilar 2 */}
          <div
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,153,0,0.25)',
              borderRadius: 16,
              padding: '1.25rem',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
              display: 'grid',
              gridTemplateColumns: 'auto 1fr',
              gap: '0.75rem 1rem',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 12,
                display: 'grid',
                placeItems: 'center',
                background: 'linear-gradient(145deg, rgba(255,153,0,0.2), rgba(255,153,0,0.05))',
                border: '1px solid rgba(255,153,0,0.35)',
                color: '#FF9900',
              }}
            >
              <TrendingUp size={28} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: 20, color: '#FFFFFF' }}>Impacto Medible</h3>
              <p style={{ margin: '0.25rem 0 0', color: '#CCCCCC' }}>
                KPIs alineados a estándares ESG y ODS, con paneles de control y reportes automáticos.
              </p>
            </div>
          </div>

          {/* Pilar 3 */}
          <div
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,153,0,0.25)',
              borderRadius: 16,
              padding: '1.25rem',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
              display: 'grid',
              gridTemplateColumns: 'auto 1fr',
              gap: '0.75rem 1rem',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 12,
                display: 'grid',
                placeItems: 'center',
                background: 'linear-gradient(145deg, rgba(255,153,0,0.2), rgba(255,153,0,0.05))',
                border: '1px solid rgba(255,153,0,0.35)',
                color: '#FF9900',
              }}
            >
              <Rocket size={28} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: 20, color: '#FFFFFF' }}>Eficiencia de Financiación</h3>
              <p style={{ margin: '0.25rem 0 0', color: '#CCCCCC' }}>
                Puentes entre ONGDs y financiadores con scoring de proyectos y desembolsos por hitos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA inferior */}
      <section id="contacto" style={{ maxWidth: 1100, margin: '0 auto', padding: '0 1.25rem 4rem' }}>
        <div
          style={{
            borderRadius: 16,
            padding: '1.25rem',
            background: 'linear-gradient(135deg, rgba(255,153,0,0.15), rgba(255,153,0,0.05))',
            border: '1px solid rgba(255,153,0,0.3)',
            textAlign: 'center',
          }}
        >
          <h3 style={{ margin: 0, fontSize: 20, color: '#FFFFFF' }}>¿Listo para impulsar tu impacto?</h3>
          <p style={{ margin: '0.5rem 0 1rem', color: '#4A4A4A' }}>
            Descubre cómo 3SN acelera la colaboración con transparencia y resultados.
          </p>
          <a
            href="mailto:contacto@3sn.org"
            style={{
              display: 'inline-block',
              background: '#FF9900',
              color: '#000000',
              padding: '0.75rem 1.25rem',
              borderRadius: 10,
              textDecoration: 'none',
              fontWeight: 700,
            }}
          >
            Solicitar demo
          </a>
        </div>
      </section>
    </main>
  )
}
