'use client'
import { Shield, Rocket, TrendingUp } from 'lucide-react'
import Image from 'next/image'

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
          <Image
            src="/logo.png"
            alt="3SN Portal"
            width={120}
            height={120}
            style={{ borderRadius: '12px', margin: '0 auto 1.5rem' }}
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
            Plataforma de scoring automático que empareja ONGDs con financiadores. Calcula riesgo, proyecta ROI social y facilita desembolsos por hitos.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="/busqueda"
              style={{
                display: 'inline-block',
                padding: '1rem 2.5rem',
                background: 'linear-gradient(135deg, #FF9900, #FF7700)',
                color: '#000000',
                borderRadius: 8,
                fontWeight: 700,
                fontSize: 16,
                textDecoration: 'none',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 6px 24px rgba(255, 153, 0, 0.4)',
                transition: 'all 0.3s ease',
              }}
            >
              🔍 Explorar Portal
            </a>
            <a
              href="/financiador"
              style={{
                display: 'inline-block',
                padding: '1rem 2.5rem',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                color: '#FFFFFF',
                borderRadius: 8,
                fontWeight: 600,
                fontSize: 16,
                textDecoration: 'none',
                border: '1px solid rgba(255, 153, 0, 0.4)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              💼 Ver Financiadores
            </a>
          </div>
        </div>
      </section>

      {/* Features Section - Vertical Cards */}
      <section
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '4rem 1.25rem',
        }}
      >
        <h2
          style={{
            textAlign: 'center',
            fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
            fontWeight: 700,
            marginBottom: '3rem',
            color: '#FF9900',
          }}
        >
          ¿Por qué usar 3SN Portal RSC?
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
          }}
        >
          {/* Card 1 - Glassmorphism */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 153, 0, 0.2)',
              borderRadius: 16,
              padding: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: 16,
                display: 'grid',
                placeItems: 'center',
                background: 'linear-gradient(145deg, rgba(255,153,0,0.2), rgba(255,153,0,0.05))',
                border: '1px solid rgba(255,153,0,0.35)',
                color: '#FF9900',
              }}
            >
              <Shield size={36} />
            </div>
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ margin: 0, fontSize: 22, color: '#FFFFFF', marginBottom: '0.75rem' }}>
                Scoring Inteligente de Riesgo
              </h3>
              <p style={{ margin: 0, color: '#CCCCCC', lineHeight: 1.6 }}>
                Algoritmo avanzado que evalúa transparencia, capacidad operativa y trayectoria de ONGDs para maximizar confianza.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 153, 0, 0.2)',
              borderRadius: 16,
              padding: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: 16,
                display: 'grid',
                placeItems: 'center',
                background: 'linear-gradient(145deg, rgba(255,153,0,0.2), rgba(255,153,0,0.05))',
                border: '1px solid rgba(255,153,0,0.35)',
                color: '#FF9900',
              }}
            >
              <TrendingUp size={36} />
            </div>
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ margin: 0, fontSize: 22, color: '#FFFFFF', marginBottom: '0.75rem' }}>
                ROI Social Medible
              </h3>
              <p style={{ margin: 0, color: '#CCCCCC', lineHeight: 1.6 }}>
                Proyecciones de impacto social cuantificable: beneficiarios alcanzados, ODS cumplidos y eficiencia de cada euro.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 153, 0, 0.2)',
              borderRadius: 16,
              padding: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: 16,
                display: 'grid',
                placeItems: 'center',
                background: 'linear-gradient(145deg, rgba(255,153,0,0.2), rgba(255,153,0,0.05))',
                border: '1px solid rgba(255,153,0,0.35)',
                color: '#FF9900',
              }}
            >
              <Rocket size={36} />
            </div>
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ margin: 0, fontSize: 22, color: '#FFFFFF', marginBottom: '0.75rem' }}>
                Eficiencia de Financiación
              </h3>
              <p style={{ margin: 0, color: '#CCCCCC', lineHeight: 1.6 }}>
                Puentes entre ONGDs y financiadores con scoring de proyectos y desembolsos por hitos.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
