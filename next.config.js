/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración optimizada para Vercel
  
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
            'images.unsplash.com',
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
      stream: require.resolve('stream-browserify'),
      url: require.resolve('url'),
      zlib: require.resolve('browserify-zlib'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      assert: require.resolve('assert'),
      os: require.resolve('os-browserify/browser'),
      path: require.resolve('path-browserify'),
      util: require.resolve('util/'),
    }
    
    // Importante para evitar problemas con módulos binarios
    config.module.rules.push({
      test: /\.node$/,
      use: 'node-loader',
    })
    
    return config
  },
  
  // Configuración de headers para seguridad
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ]
  },
  
  // Configuración de variables de entorno
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
  
  // Optimizaciones de producción
  swcMinify: true,
  compress: true,
  
  // Optimización de fuentes
  optimizeFonts: true,
}

module.exports = nextConfig
