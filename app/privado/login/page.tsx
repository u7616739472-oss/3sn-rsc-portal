'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mode, setMode] = useState<'login' | 'magic'>('login');
  const [sent, setSent] = useState(false);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
    } else {
      router.push('/privado');
    }
    setLoading(false);
  };

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/privado` },
    });
    if (error) setError(error.message);
    else setSent(true);
    setLoading(false);
  };

  const handleOAuth = async (provider: 'google' | 'azure') => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/privado`,
        scopes: provider === 'azure' ? 'openid profile email' : undefined,
      },
    });
    if (error) setError(error.message);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center font-bold text-white text-2xl mx-auto mb-4">3N</div>
          <h1 className="text-2xl font-bold text-white">3SN Portal</h1>
          <p className="text-gray-400 mt-1">Area Privada para ONGDs</p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
          {/* SSO Providers */}
          <div className="space-y-3 mb-6">
            <button
              onClick={() => handleOAuth('google')}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-gray-900 font-medium py-3 px-4 rounded-xl transition-colors disabled:opacity-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continuar con Google Workspace
            </button>

            <button
              onClick={() => handleOAuth('azure')}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-[#0078d4] hover:bg-[#106ebe] text-white font-medium py-3 px-4 rounded-xl transition-colors disabled:opacity-50"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 23 23">
                <path d="M1 1h10v10H1zM12 1h10v10H12zM1 12h10v10H1zM12 12h10v10H12z"/>
              </svg>
              Continuar con Microsoft (Entra ID)
            </button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-gray-900 text-gray-500">o accede con email</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 bg-gray-800 rounded-lg p-1 mb-5">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-1.5 text-sm rounded-md transition-colors ${
                mode === 'login' ? 'bg-gray-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Contraseña
            </button>
            <button
              onClick={() => setMode('magic')}
              className={`flex-1 py-1.5 text-sm rounded-md transition-colors ${
                mode === 'magic' ? 'bg-gray-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Magic Link
            </button>
          </div>

          {sent ? (
            <div className="text-center py-4">
              <div className="text-4xl mb-3">📧</div>
              <p className="text-white font-medium">Revisa tu email</p>
              <p className="text-gray-400 text-sm mt-1">Te hemos enviado un enlace de acceso a {email}</p>
            </div>
          ) : (
            <form onSubmit={mode === 'login' ? handleEmailLogin : handleMagicLink} className="space-y-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">Email corporativo</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="tu@ongd.org"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500"
                />
              </div>
              {mode === 'login' && (
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5">Contraseña</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
              )}
              {error && (
                <p className="text-red-400 text-xs bg-red-900/20 border border-red-800 rounded px-3 py-2">{error}</p>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition-colors disabled:opacity-50"
              >
                {loading ? 'Accediendo...' : mode === 'login' ? 'Iniciar Sesión' : 'Enviar Magic Link'}
              </button>
            </form>
          )}
        </div>

        <p className="text-center text-xs text-gray-500 mt-6">

                  <div className="bg-blue-900/10 border border-blue-700/30 rounded-xl p-6 text-center">
          <p className="text-white font-medium mb-3">¿Tu ONGD aún no está registrada?</p>
          <Link
            href="/privado/registro"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
          >
            ✨ Registrar mi ONGD en 3SN
          </Link>
          <p className="text-xs text-gray-400 mt-3">Accede a Marco Lógico con IA, Blockchain y financiación</p>
        </div>

          <Link href="/" className="hover:text-gray-300">Volver al portal público</Link>
          {' • '}
          <span>AWS IAM: contacla a tu administrador</span>
        </p>
      </div>
    </div>
  );
}
