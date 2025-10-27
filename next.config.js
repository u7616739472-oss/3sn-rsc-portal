/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración optimizada para Vercel
  experimental: {
    appDir: true,
  },
  
  // Configuración de imágenes
  images: {
    domains: [
      'localhost',
      'vercel.app',
      '*.vercel.app',
      'supabase.co',
      '*.supabase.co',
      'github.com',
      'avatars.githubusercontent.com'
    ],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Configuración para Web3 y blockchain
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Configuración para compatibilidad con Web3
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      url: require.resolve('url'),
      zlib: require.resolve('browserify-zlib'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      assert: require.resolve('assert'),
      os: require.resolve('os-browserify/browser'),
      path: require.resolve('path-browserify'),
    }
    
    config.plugins.push(
      new webpack.ProvidePlugin({
        process: 'process/browser',
        Buffer: ['buffer', 'Buffer'],
      })
    )
    
    return config
  },
  
  // Variables de entorno públicas
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
    PROJECT_NAME: '3SN RSC Portal',
    PROJECT_VERSION: '0.1.0',
  },
  
  // Configuración de headers para seguridad
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
  
  // Redirects para mejor SEO
  async redirects() {
    return [
      // Redirect de rutas legacy si las hubiera
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ]
  },
  
  // Configuración de compilación
  compiler: {
    // Eliminación de console.log en producción
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Configuración para i18n futuro
  i18n: {
    locales: ['es', 'en', 'ca'],
    defaultLocale: 'es',
  },
}

module.exports = nextConfig
